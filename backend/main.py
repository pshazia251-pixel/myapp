from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx
import json
import os
from datetime import datetime

app = FastAPI(title="WhatsApp Multi-Device API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for devices and messages
devices_db: dict[str, dict] = {}
messages_db: dict[str, list[dict]] = {}
credentials_db: dict[str, dict] = {}

WHATSAPP_API_URL = "https://graph.facebook.com/v21.0"


# --- Models ---

class WhatsAppCredentials(BaseModel):
    access_token: str
    phone_number_id: str
    business_account_id: str
    waba_id: Optional[str] = None

class DeviceCreate(BaseModel):
    phone_number: str
    label: str
    device_model: str
    location_city: str
    location_country: str
    location_flag: str
    proxy_address: Optional[str] = None
    proxy_port: int = 8080
    vpn_protocol: str = "socks5"

class SendMessage(BaseModel):
    device_id: str
    to: str
    message: str
    message_type: str = "text"

class SendTemplate(BaseModel):
    device_id: str
    to: str
    template_name: str
    language_code: str = "en_US"
    components: Optional[list[dict]] = None


# --- Health ---

@app.get("/")
async def root():
    return {
        "status": "running",
        "service": "WhatsApp Multi-Device API",
        "version": "1.0.0",
        "devices": len(devices_db),
        "timestamp": datetime.utcnow().isoformat(),
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}


# --- Credentials ---

@app.post("/api/credentials")
async def save_credentials(device_id: str, creds: WhatsAppCredentials):
    credentials_db[device_id] = creds.model_dump()
    return {"status": "saved", "device_id": device_id}

@app.get("/api/credentials/{device_id}")
async def get_credentials(device_id: str):
    if device_id not in credentials_db:
        raise HTTPException(status_code=404, detail="No credentials for this device")
    creds = credentials_db[device_id]
    masked = {
        "phone_number_id": creds["phone_number_id"],
        "business_account_id": creds["business_account_id"],
        "has_token": bool(creds.get("access_token")),
    }
    return masked

@app.delete("/api/credentials/{device_id}")
async def delete_credentials(device_id: str):
    if device_id in credentials_db:
        del credentials_db[device_id]
    return {"status": "deleted"}


# --- Devices ---

@app.post("/api/devices")
async def create_device(device: DeviceCreate):
    device_id = f"dev-{len(devices_db) + 1}-{int(datetime.utcnow().timestamp())}"
    device_data = {
        "id": device_id,
        **device.model_dump(),
        "status": "offline",
        "whatsapp_status": "not_registered",
        "created_at": datetime.utcnow().isoformat(),
        "last_activity": datetime.utcnow().isoformat(),
        "messages_total": 0,
        "messages_today": 0,
        "contacts_count": 0,
    }
    devices_db[device_id] = device_data
    messages_db[device_id] = []
    return device_data

@app.get("/api/devices")
async def list_devices():
    return list(devices_db.values())

@app.get("/api/devices/{device_id}")
async def get_device(device_id: str):
    if device_id not in devices_db:
        raise HTTPException(status_code=404, detail="Device not found")
    return devices_db[device_id]

@app.put("/api/devices/{device_id}")
async def update_device(device_id: str, updates: dict):
    if device_id not in devices_db:
        raise HTTPException(status_code=404, detail="Device not found")
    devices_db[device_id].update(updates)
    devices_db[device_id]["last_activity"] = datetime.utcnow().isoformat()
    return devices_db[device_id]

@app.delete("/api/devices/{device_id}")
async def delete_device(device_id: str):
    if device_id in devices_db:
        del devices_db[device_id]
    if device_id in messages_db:
        del messages_db[device_id]
    if device_id in credentials_db:
        del credentials_db[device_id]
    return {"status": "deleted"}

@app.post("/api/devices/{device_id}/connect")
async def connect_device(device_id: str):
    if device_id not in devices_db:
        raise HTTPException(status_code=404, detail="Device not found")
    if device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No WhatsApp credentials configured. Add API credentials first.")

    creds = credentials_db[device_id]
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                f"{WHATSAPP_API_URL}/{creds['phone_number_id']}",
                headers={"Authorization": f"Bearer {creds['access_token']}"},
                timeout=10,
            )
            if resp.status_code == 200:
                phone_info = resp.json()
                devices_db[device_id]["status"] = "online"
                devices_db[device_id]["whatsapp_status"] = "active"
                devices_db[device_id]["last_activity"] = datetime.utcnow().isoformat()
                return {
                    "status": "connected",
                    "phone_info": phone_info,
                }
            else:
                devices_db[device_id]["status"] = "error"
                return {
                    "status": "error",
                    "detail": resp.json(),
                }
        except httpx.RequestError as e:
            devices_db[device_id]["status"] = "error"
            raise HTTPException(status_code=502, detail=f"Failed to reach WhatsApp API: {str(e)}")

@app.post("/api/devices/{device_id}/disconnect")
async def disconnect_device(device_id: str):
    if device_id not in devices_db:
        raise HTTPException(status_code=404, detail="Device not found")
    devices_db[device_id]["status"] = "offline"
    devices_db[device_id]["last_activity"] = datetime.utcnow().isoformat()
    return {"status": "disconnected"}


# --- Messages ---

@app.post("/api/messages/send")
async def send_message(msg: SendMessage):
    if msg.device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No WhatsApp credentials for this device")

    creds = credentials_db[msg.device_id]

    payload = {
        "messaging_product": "whatsapp",
        "to": msg.to,
        "type": "text",
        "text": {"body": msg.message},
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{WHATSAPP_API_URL}/{creds['phone_number_id']}/messages",
                headers={
                    "Authorization": f"Bearer {creds['access_token']}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=15,
            )

            result = resp.json()

            message_record = {
                "id": f"msg-{int(datetime.utcnow().timestamp())}",
                "device_id": msg.device_id,
                "to": msg.to,
                "text": msg.message,
                "type": msg.message_type,
                "status": "sent" if resp.status_code == 200 else "failed",
                "wa_message_id": result.get("messages", [{}])[0].get("id", ""),
                "timestamp": datetime.utcnow().isoformat(),
                "direction": "outgoing",
            }

            if msg.device_id not in messages_db:
                messages_db[msg.device_id] = []
            messages_db[msg.device_id].append(message_record)

            if msg.device_id in devices_db:
                devices_db[msg.device_id]["messages_total"] = devices_db[msg.device_id].get("messages_total", 0) + 1
                devices_db[msg.device_id]["messages_today"] = devices_db[msg.device_id].get("messages_today", 0) + 1

            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=result)

            return {
                "status": "sent",
                "message": message_record,
                "wa_response": result,
            }
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Failed to send message: {str(e)}")

@app.post("/api/messages/send-template")
async def send_template(tmpl: SendTemplate):
    if tmpl.device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No WhatsApp credentials for this device")

    creds = credentials_db[tmpl.device_id]

    payload = {
        "messaging_product": "whatsapp",
        "to": tmpl.to,
        "type": "template",
        "template": {
            "name": tmpl.template_name,
            "language": {"code": tmpl.language_code},
        },
    }
    if tmpl.components:
        payload["template"]["components"] = tmpl.components

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                f"{WHATSAPP_API_URL}/{creds['phone_number_id']}/messages",
                headers={
                    "Authorization": f"Bearer {creds['access_token']}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=15,
            )
            result = resp.json()
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=result)
            return {"status": "sent", "wa_response": result}
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Failed to send template: {str(e)}")

@app.get("/api/messages/{device_id}")
async def get_messages(device_id: str, limit: int = Query(50, ge=1, le=500)):
    return messages_db.get(device_id, [])[-limit:]


# --- Webhook for incoming messages ---

@app.get("/api/webhook")
async def verify_webhook(
    hub_mode: Optional[str] = Query(None, alias="hub.mode"),
    hub_challenge: Optional[str] = Query(None, alias="hub.challenge"),
    hub_verify_token: Optional[str] = Query(None, alias="hub.verify_token"),
):
    verify_token = os.getenv("WHATSAPP_VERIFY_TOKEN", "whatsapp_multi_device_verify")
    if hub_mode == "subscribe" and hub_verify_token == verify_token:
        return int(hub_challenge) if hub_challenge else 0
    raise HTTPException(status_code=403, detail="Verification failed")

@app.post("/api/webhook")
async def receive_webhook(request: Request):
    body = await request.json()

    if body.get("object") != "whatsapp_business_account":
        return {"status": "ignored"}

    for entry in body.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            phone_number_id = value.get("metadata", {}).get("phone_number_id", "")

            target_device_id = None
            for dev_id, creds in credentials_db.items():
                if creds.get("phone_number_id") == phone_number_id:
                    target_device_id = dev_id
                    break

            if not target_device_id:
                continue

            for message in value.get("messages", []):
                msg_record = {
                    "id": f"msg-in-{int(datetime.utcnow().timestamp())}",
                    "device_id": target_device_id,
                    "from": message.get("from", ""),
                    "text": message.get("text", {}).get("body", ""),
                    "type": message.get("type", "text"),
                    "wa_message_id": message.get("id", ""),
                    "timestamp": datetime.utcnow().isoformat(),
                    "direction": "incoming",
                    "status": "received",
                }
                if target_device_id not in messages_db:
                    messages_db[target_device_id] = []
                messages_db[target_device_id].append(msg_record)

                if target_device_id in devices_db:
                    devices_db[target_device_id]["messages_total"] = devices_db[target_device_id].get("messages_total", 0) + 1
                    devices_db[target_device_id]["messages_today"] = devices_db[target_device_id].get("messages_today", 0) + 1

            for status in value.get("statuses", []):
                wa_msg_id = status.get("id", "")
                new_status = status.get("status", "")
                if target_device_id in messages_db:
                    for msg in messages_db[target_device_id]:
                        if msg.get("wa_message_id") == wa_msg_id:
                            msg["status"] = new_status
                            break

    return {"status": "processed"}


# --- Business Profile ---

@app.get("/api/devices/{device_id}/profile")
async def get_business_profile(device_id: str):
    if device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No credentials configured")

    creds = credentials_db[device_id]
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                f"{WHATSAPP_API_URL}/{creds['phone_number_id']}/whatsapp_business_profile",
                headers={"Authorization": f"Bearer {creds['access_token']}"},
                params={"fields": "about,address,description,email,profile_picture_url,websites,vertical"},
                timeout=10,
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=resp.json())
            return resp.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=str(e))


# --- Templates ---

@app.get("/api/devices/{device_id}/templates")
async def list_templates(device_id: str):
    if device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No credentials configured")

    creds = credentials_db[device_id]
    waba_id = creds.get("waba_id") or creds.get("business_account_id")

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                f"{WHATSAPP_API_URL}/{waba_id}/message_templates",
                headers={"Authorization": f"Bearer {creds['access_token']}"},
                timeout=10,
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=resp.json())
            return resp.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=str(e))


# --- Phone Numbers ---

@app.get("/api/devices/{device_id}/phone-numbers")
async def list_phone_numbers(device_id: str):
    if device_id not in credentials_db:
        raise HTTPException(status_code=400, detail="No credentials configured")

    creds = credentials_db[device_id]
    waba_id = creds.get("waba_id") or creds.get("business_account_id")

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                f"{WHATSAPP_API_URL}/{waba_id}/phone_numbers",
                headers={"Authorization": f"Bearer {creds['access_token']}"},
                timeout=10,
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=resp.json())
            return resp.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=str(e))
