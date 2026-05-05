const API_BASE = import.meta.env.VITE_API_URL || '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = API_BASE ? `${API_BASE}${path}` : path;
  const resp = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ detail: resp.statusText }));
    throw new Error(err.detail || `API error ${resp.status}`);
  }
  return resp.json();
}

// --- Credentials ---

export interface WhatsAppCredentials {
  access_token: string;
  phone_number_id: string;
  business_account_id: string;
  waba_id?: string;
}

export async function saveCredentials(deviceId: string, creds: WhatsAppCredentials) {
  return request(`/api/credentials?device_id=${encodeURIComponent(deviceId)}`, {
    method: 'POST',
    body: JSON.stringify(creds),
  });
}

export async function getCredentials(deviceId: string) {
  return request<{ phone_number_id: string; business_account_id: string; has_token: boolean }>(
    `/api/credentials/${encodeURIComponent(deviceId)}`
  );
}

export async function deleteCredentials(deviceId: string) {
  return request(`/api/credentials/${encodeURIComponent(deviceId)}`, { method: 'DELETE' });
}

// --- Devices ---

export interface DeviceCreateInput {
  phone_number: string;
  label: string;
  device_model: string;
  location_city: string;
  location_country: string;
  location_flag: string;
  proxy_address?: string;
  proxy_port?: number;
  vpn_protocol?: string;
}

export async function createDevice(device: DeviceCreateInput) {
  return request('/api/devices', { method: 'POST', body: JSON.stringify(device) });
}

export async function listDevices() {
  return request<unknown[]>('/api/devices');
}

export async function getDevice(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}`);
}

export async function updateDevice(deviceId: string, updates: Record<string, unknown>) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteDevice(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}`, { method: 'DELETE' });
}

export async function connectDevice(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}/connect`, { method: 'POST' });
}

export async function disconnectDevice(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}/disconnect`, { method: 'POST' });
}

// --- Messages ---

export interface SendMessageInput {
  device_id: string;
  to: string;
  message: string;
  message_type?: string;
}

export async function sendMessage(msg: SendMessageInput) {
  return request('/api/messages/send', { method: 'POST', body: JSON.stringify(msg) });
}

export interface SendTemplateInput {
  device_id: string;
  to: string;
  template_name: string;
  language_code?: string;
  components?: unknown[];
}

export async function sendTemplate(tmpl: SendTemplateInput) {
  return request('/api/messages/send-template', { method: 'POST', body: JSON.stringify(tmpl) });
}

export async function getMessages(deviceId: string, limit = 50) {
  return request<unknown[]>(`/api/messages/${encodeURIComponent(deviceId)}?limit=${limit}`);
}

// --- Templates ---

export async function listTemplates(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}/templates`);
}

// --- Business Profile ---

export async function getBusinessProfile(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}/profile`);
}

// --- Phone Numbers ---

export async function listPhoneNumbers(deviceId: string) {
  return request(`/api/devices/${encodeURIComponent(deviceId)}/phone-numbers`);
}
