import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Copy, Wifi, Shield, CheckCircle, Loader, ArrowRight } from 'lucide-react';
import type { WhatsAppAccount } from '../types';

interface Props {
  account: WhatsAppAccount;
}

type Step = 'setup' | 'scanning' | 'connected';

export function CloneDevicePage({ account }: Props) {
  const [step, setStep] = useState<Step>('setup');
  const [deviceName, setDeviceName] = useState('');
  const [proxyIp, setProxyIp] = useState('');
  const [proxyPort, setProxyPort] = useState('');
  const [useProxy, setUseProxy] = useState(false);

  const qrData = JSON.stringify({
    action: 'clone',
    source: account.phoneNumber,
    device: deviceName || 'New Device',
    proxy: useProxy ? `${proxyIp}:${proxyPort}` : null,
    timestamp: Date.now(),
  });

  const handleStartClone = () => {
    setStep('scanning');
    setTimeout(() => setStep('connected'), 5000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '12px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>
          <Copy size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Clone to New Device
        </h1>
        <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
          Clone {account.displayName} ({account.phoneNumber}) to another device
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '24px 16px' }}>
        {step === 'setup' && (
          <div className="fade-in">
            {/* Steps Guide */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--wa-teal)' }}>
                How it works
              </h3>
              {[
                { num: 1, text: 'Enter device name and optional proxy settings' },
                { num: 2, text: 'Scan QR code on the target device' },
                { num: 3, text: 'WhatsApp session cloned with unique IP' },
              ].map(s => (
                <div key={s.num} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: '1px solid var(--wa-border)',
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--wa-teal)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    flexShrink: 0,
                  }}>
                    {s.num}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--wa-text-secondary)' }}>{s.text}</span>
                </div>
              ))}
            </div>

            {/* Config Form */}
            <div style={{ background: 'var(--wa-bg-panel)', borderRadius: 12, padding: 20, border: '1px solid var(--wa-border)' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 6 }}>
                  Device Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--wa-text-muted)' }} />
                  <input
                    className="input-field"
                    placeholder="e.g. Samsung Galaxy S24, Clone #2"
                    value={deviceName}
                    onChange={e => setDeviceName(e.target.value)}
                    style={{ paddingLeft: 36 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  color: 'var(--wa-text)',
                }}>
                  <input
                    type="checkbox"
                    checked={useProxy}
                    onChange={e => setUseProxy(e.target.checked)}
                    style={{ accentColor: 'var(--wa-teal)' }}
                  />
                  <Shield size={16} color="var(--wa-teal)" />
                  Use Different IP (Proxy/VPN)
                </label>
              </div>

              {useProxy && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 4 }}>Proxy IP</label>
                    <div style={{ position: 'relative' }}>
                      <Wifi size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--wa-text-muted)' }} />
                      <input
                        className="input-field"
                        placeholder="103.152.112.xxx"
                        value={proxyIp}
                        onChange={e => setProxyIp(e.target.value)}
                        style={{ paddingLeft: 32, fontSize: 13 }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 4 }}>Port</label>
                    <input
                      className="input-field"
                      placeholder="8080"
                      value={proxyPort}
                      onChange={e => setProxyPort(e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  </div>
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handleStartClone}
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, fontWeight: 600 }}
              >
                Generate QR Code <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 'scanning' && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Scan QR Code</h3>
            <p style={{ fontSize: 13, color: 'var(--wa-text-muted)', marginBottom: 24 }}>
              Open WhatsApp on the target device → Settings → Linked Devices → Scan this code
            </p>

            <div style={{
              display: 'inline-block',
              padding: 20,
              background: 'white',
              borderRadius: 16,
              marginBottom: 24,
            }}>
              <QRCodeSVG value={qrData} size={220} level="M" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--wa-teal)', marginBottom: 16 }}>
              <Loader size={16} className="pulse" />
              <span style={{ fontSize: 14 }}>Waiting for scan...</span>
            </div>

            <div style={{
              background: 'var(--wa-bg-panel)',
              borderRadius: 12,
              padding: 16,
              maxWidth: 360,
              margin: '0 auto',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Clone Details</div>
              <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'grid', gap: 6 }}>
                <div>Source: <span style={{ color: 'var(--wa-text)' }}>{account.phoneNumber}</span></div>
                <div>Target Device: <span style={{ color: 'var(--wa-text)' }}>{deviceName || 'New Device'}</span></div>
                {useProxy && <div>Proxy: <span style={{ color: 'var(--wa-teal)' }}>{proxyIp}:{proxyPort}</span></div>}
              </div>
            </div>

            <button
              onClick={() => setStep('setup')}
              className="btn btn-secondary"
              style={{ marginTop: 16 }}
            >
              Cancel
            </button>
          </div>
        )}

        {step === 'connected' && (
          <div className="fade-in" style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(37, 211, 102, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle size={40} color="var(--wa-teal)" />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Device Cloned!</h3>
            <p style={{ fontSize: 14, color: 'var(--wa-text-muted)', marginBottom: 32 }}>
              {account.displayName} is now active on "{deviceName || 'New Device'}"
              {useProxy && ` with IP ${proxyIp}`}
            </p>

            <div style={{
              background: 'var(--wa-bg-panel)',
              borderRadius: 12,
              padding: 20,
              maxWidth: 360,
              margin: '0 auto 24px',
              textAlign: 'left',
            }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--wa-text-muted)' }}>Phone Number</span>
                  <span>{account.phoneNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--wa-text-muted)' }}>Device</span>
                  <span>{deviceName || 'New Device'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--wa-text-muted)' }}>IP Address</span>
                  <span style={{ color: 'var(--wa-teal)' }}>{useProxy ? proxyIp : account.ipAddress}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--wa-text-muted)' }}>Status</span>
                  <span style={{ color: 'var(--wa-teal)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Wifi size={14} /> Connected
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setStep('setup'); setDeviceName(''); setProxyIp(''); setProxyPort(''); setUseProxy(false); }}
              className="btn btn-primary"
            >
              Clone Another Device
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
