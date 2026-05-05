import { useState } from 'react';
import {
  ArrowLeft, Key, Shield, CheckCircle2, AlertTriangle, ExternalLink,
  Copy, Check, Eye, EyeOff, Plug, Unplug
} from 'lucide-react';
import { saveCredentials, connectDevice, disconnectDevice } from '../services/api';
import type { VirtualDevice } from '../types';

interface Props {
  device: VirtualDevice;
  onBack: () => void;
  onDeviceStatusChange: (deviceId: string, status: VirtualDevice['status']) => void;
}

export function ApiSetup({ device, onBack, onDeviceStatusChange }: Props) {
  const [accessToken, setAccessToken] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [businessAccountId, setBusinessAccountId] = useState('');
  const [wabaId, setWabaId] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [saving, setSaving] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connected' | 'error'>('idle');
  const [copied, setCopied] = useState('');

  const webhookUrl = window.location.origin + '/api/webhook';
  const verifyToken = 'whatsapp_multi_device_verify';

  const handleSave = async () => {
    if (!accessToken || !phoneNumberId || !businessAccountId) {
      setError('All fields are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveCredentials(device.id, {
        access_token: accessToken,
        phone_number_id: phoneNumberId,
        business_account_id: businessAccountId,
        waba_id: wabaId || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save credentials');
    } finally {
      setSaving(false);
    }
  };

  const handleConnect = async () => {
    setConnecting(true);
    setError('');
    try {
      await connectDevice(device.id);
      setConnectionStatus('connected');
      onDeviceStatusChange(device.id, 'online');
    } catch (e) {
      setConnectionStatus('error');
      setError(e instanceof Error ? e.message : 'Connection failed');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectDevice(device.id);
      setConnectionStatus('idle');
      onDeviceStatusChange(device.id, 'offline');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Disconnect failed');
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg)' }}>
      <div style={{
        background: 'var(--wa-header)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <button className="btn btn-ghost" onClick={onBack}><ArrowLeft size={20} /></button>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>WhatsApp API Setup</h2>
          <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>
            {device.location.flag} {device.label} • {device.phoneNumber}
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24, maxWidth: 800, margin: '0 auto', width: '100%' }}>
        {/* Step 1: Get API credentials */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: '#25d366',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'white',
            }}>1</div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Get WhatsApp Business API Credentials</h3>
          </div>
          <div style={{ fontSize: 13, color: 'var(--wa-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            Go to Meta Developer Portal and create a WhatsApp Business app:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href="https://developers.facebook.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 8,
                background: 'var(--wa-bg)', color: 'var(--wa-blue)',
                textDecoration: 'none', fontSize: 13,
              }}
            >
              <ExternalLink size={14} /> Meta Developer Portal - Create App
            </a>
            <a
              href="https://developers.facebook.com/docs/whatsapp/cloud-api/get-started"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 8,
                background: 'var(--wa-bg)', color: 'var(--wa-blue)',
                textDecoration: 'none', fontSize: 13,
              }}
            >
              <ExternalLink size={14} /> WhatsApp Cloud API - Getting Started Guide
            </a>
          </div>
        </div>

        {/* Step 2: Enter credentials */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: '#25d366',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'white',
            }}>2</div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Enter API Credentials</h3>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 16,
              background: '#ea433520', color: '#ea4335',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
            }}>
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {saved && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 16,
              background: '#25d36620', color: '#25d366',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
            }}>
              <CheckCircle2 size={16} /> Credentials saved successfully!
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Key size={12} /> Access Token (Permanent)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  type={showToken ? 'text' : 'password'}
                  value={accessToken}
                  onChange={e => setAccessToken(e.target.value)}
                  placeholder="EAAxxxxxxx..."
                  style={{ paddingRight: 40 }}
                />
                <button
                  onClick={() => setShowToken(!showToken)}
                  style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--wa-text-muted)',
                  }}
                >
                  {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 6, display: 'block' }}>
                Phone Number ID
              </label>
              <input
                className="input-field"
                value={phoneNumberId}
                onChange={e => setPhoneNumberId(e.target.value)}
                placeholder="e.g. 1234567890123456"
              />
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 6, display: 'block' }}>
                WhatsApp Business Account ID
              </label>
              <input
                className="input-field"
                value={businessAccountId}
                onChange={e => setBusinessAccountId(e.target.value)}
                placeholder="e.g. 9876543210123456"
              />
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 6, display: 'block' }}>
                WABA ID (optional)
              </label>
              <input
                className="input-field"
                value={wabaId}
                onChange={e => setWabaId(e.target.value)}
                placeholder="Same as Business Account ID if not different"
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px 0' }}
              onClick={handleSave}
              disabled={saving || !accessToken || !phoneNumberId || !businessAccountId}
            >
              <Shield size={16} /> {saving ? 'Saving...' : 'Save Credentials'}
            </button>
          </div>
        </div>

        {/* Step 3: Configure Webhook */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: '#25d366',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'white',
            }}>3</div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Configure Webhook (for incoming messages)</h3>
          </div>
          <div style={{ fontSize: 13, color: 'var(--wa-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            In your Meta App Dashboard, go to WhatsApp &gt; Configuration and set these webhook values:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--wa-bg)' }}>
              <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginBottom: 4 }}>Callback URL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ fontSize: 13, color: 'var(--wa-teal)', flex: 1 }}>{webhookUrl}</code>
                <button
                  className="btn btn-ghost"
                  style={{ padding: 4 }}
                  onClick={() => copyText(webhookUrl, 'webhook')}
                >
                  {copied === 'webhook' ? <Check size={14} color="#25d366" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--wa-bg)' }}>
              <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginBottom: 4 }}>Verify Token</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ fontSize: 13, color: 'var(--wa-teal)', flex: 1 }}>{verifyToken}</code>
                <button
                  className="btn btn-ghost"
                  style={{ padding: 4 }}
                  onClick={() => copyText(verifyToken, 'verify')}
                >
                  {copied === 'verify' ? <Check size={14} color="#25d366" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Connect */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: '#25d366',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'white',
            }}>4</div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Connect Device</h3>
          </div>

          {connectionStatus === 'connected' && (
            <div style={{
              padding: '12px 16px', borderRadius: 8, marginBottom: 16,
              background: '#25d36620',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#25d366', fontSize: 14, fontWeight: 600 }}>
                <CheckCircle2 size={18} /> Connected to WhatsApp
              </div>
              <button className="btn btn-secondary" style={{ fontSize: 12 }} onClick={handleDisconnect}>
                <Unplug size={14} /> Disconnect
              </button>
            </div>
          )}

          {connectionStatus !== 'connected' && (
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15 }}
              onClick={handleConnect}
              disabled={connecting}
            >
              <Plug size={18} /> {connecting ? 'Connecting...' : 'Test Connection & Go Live'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
