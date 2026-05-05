import { useState } from 'react';
import {
  ArrowLeft, Smartphone, MapPin, Globe, Battery, Signal, Clock, Shield,
  MessageCircle, Power, Trash2, RefreshCw, Copy, Check,
  Wifi, WifiOff, Edit2, Save, X, AlertTriangle, Key
} from 'lucide-react';
import type { VirtualDevice } from '../types';

interface Props {
  device: VirtualDevice;
  onBack: () => void;
  onOpenWhatsApp: () => void;
  onToggleDevice: () => void;
  onRemoveDevice: () => void;
  onUpdateDevice: (device: VirtualDevice) => void;
  onOpenApiSetup: () => void;
}

export function DeviceDetail({ device, onBack, onOpenWhatsApp, onToggleDevice, onRemoveDevice, onUpdateDevice, onOpenApiSetup }: Props) {
  const [editing, setEditing] = useState(false);
  const [proxyAddr, setProxyAddr] = useState(device.proxyAddress);
  const [proxyPort, setProxyPort] = useState(String(device.proxyPort));
  const [vpnProto, setVpnProto] = useState(device.vpnProtocol);
  const [copied, setCopied] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);

  const statusColor = device.status === 'online' ? '#25d366' : device.status === 'connecting' ? '#f59e0b' : device.status === 'error' ? '#ea4335' : '#8696a0';

  const formatUptime = (seconds: number) => {
    if (seconds === 0) return 'Offline';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return `${d} days, ${h} hours`;
    if (h > 0) return `${h} hours, ${m} mins`;
    return `${m} mins`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSaveProxy = () => {
    onUpdateDevice({
      ...device,
      proxyAddress: proxyAddr,
      proxyPort: parseInt(proxyPort) || device.proxyPort,
      vpnProtocol: vpnProto,
    });
    setEditing(false);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--wa-header)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <button className="btn btn-ghost" onClick={onBack}><ArrowLeft size={20} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--wa-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${statusColor}`,
          }}>
            <span style={{ fontSize: 22 }}>{device.location.flag}</span>
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>{device.label}</h2>
            <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>{device.phoneNumber}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-secondary"
            onClick={onOpenApiSetup}
            style={{ fontSize: 13 }}
          >
            <Key size={16} /> API Setup
          </button>
          <button
            className="btn btn-primary"
            onClick={onOpenWhatsApp}
            disabled={device.status !== 'online'}
            style={{ fontSize: 13 }}
          >
            <MessageCircle size={16} /> Open WhatsApp
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        {/* Status Banner */}
        <div className="card" style={{
          padding: 20, marginBottom: 20,
          background: `linear-gradient(135deg, ${statusColor}15, var(--wa-bg-panel))`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `${statusColor}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {device.status === 'online' ? <Wifi size={28} color={statusColor} /> :
               device.status === 'error' ? <AlertTriangle size={28} color={statusColor} /> :
               <WifiOff size={28} color={statusColor} />}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: statusColor, textTransform: 'capitalize' }}>
                {device.status}
              </div>
              <div style={{ fontSize: 13, color: 'var(--wa-text-secondary)' }}>
                WhatsApp: {device.whatsappStatus === 'active' ? 'Connected' :
                  device.whatsappStatus === 'banned' ? 'Banned' :
                  device.whatsappStatus === 'verifying' ? 'Verifying...' : 'Not Registered'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={onToggleDevice}>
              {device.status === 'online' ? <><Power size={16} /> Stop</> : <><Wifi size={16} /> Start</>}
            </button>
            <button className="btn btn-secondary"><RefreshCw size={16} /> Restart</button>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {/* Device Info */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 13, color: 'var(--wa-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
              Device Info
            </h3>
            {[
              { icon: Smartphone, label: 'Model', value: device.deviceModel },
              { icon: Smartphone, label: 'OS', value: device.osVersion },
              { icon: Clock, label: 'Uptime', value: formatUptime(device.uptime) },
              { icon: Clock, label: 'Created', value: new Date(device.createdAt).toLocaleDateString() },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid var(--wa-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <item.icon size={14} color="var(--wa-text-muted)" />
                  <span style={{ fontSize: 13, color: 'var(--wa-text-secondary)' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Network Info */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 13, color: 'var(--wa-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
              Network Info
            </h3>
            {[
              { icon: MapPin, label: 'Location', value: `${device.location.city}, ${device.location.country}` },
              { icon: Globe, label: 'IP Address', value: device.ipAddress, copyable: true },
              { icon: Shield, label: 'Protocol', value: device.vpnProtocol.toUpperCase() },
              { icon: Signal, label: 'Signal', value: `${device.signalStrength}/5` },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid var(--wa-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <item.icon size={14} color="var(--wa-text-muted)" />
                  <span style={{ fontSize: 13, color: 'var(--wa-text-secondary)' }}>{item.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, fontFamily: item.copyable ? 'monospace' : 'inherit' }}>{item.value}</span>
                  {item.copyable && (
                    <button
                      className="btn btn-ghost"
                      style={{ padding: 2 }}
                      onClick={() => copyToClipboard(item.value, item.label)}
                    >
                      {copied === item.label ? <Check size={12} color="#25d366" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, color: 'var(--wa-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            WhatsApp Statistics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { label: 'Total Messages', value: device.messagesTotal.toLocaleString(), color: '#25d366' },
              { label: 'Today', value: device.messagesToday.toString(), color: '#34b7f1' },
              { label: 'Contacts', value: device.contactsCount.toString(), color: '#128c7e' },
              { label: 'Groups', value: device.groupsCount.toString(), color: '#8e44ad' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Battery & Signal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Battery size={16} color={device.batteryLevel > 20 ? '#25d366' : '#ea4335'} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Battery</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: device.batteryLevel > 20 ? '#25d366' : '#ea4335' }}>
              {device.batteryLevel}%
            </div>
            <div style={{
              width: '100%', height: 8, borderRadius: 4,
              background: 'var(--wa-bg)', marginTop: 8,
            }}>
              <div style={{
                width: `${device.batteryLevel}%`, height: '100%', borderRadius: 4,
                background: device.batteryLevel > 20 ? '#25d366' : '#ea4335',
              }} />
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Signal size={16} color="#34b7f1" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Connection</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'end' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{
                  width: 12, height: 8 + i * 6, borderRadius: 2,
                  background: i <= device.signalStrength ? '#34b7f1' : 'var(--wa-bg)',
                }} />
              ))}
              <span style={{ fontSize: 28, fontWeight: 700, color: '#34b7f1', marginLeft: 12 }}>
                {device.signalStrength}/5
              </span>
            </div>
          </div>
        </div>

        {/* Proxy Settings */}
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Proxy / VPN Settings
            </h3>
            {!editing ? (
              <button className="btn btn-secondary" style={{ fontSize: 12 }} onClick={() => setEditing(true)}>
                <Edit2 size={14} /> Edit
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={handleSaveProxy}>
                  <Save size={14} /> Save
                </button>
                <button className="btn btn-secondary" style={{ fontSize: 12 }} onClick={() => { setEditing(false); setProxyAddr(device.proxyAddress); setProxyPort(String(device.proxyPort)); setVpnProto(device.vpnProtocol); }}>
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 4, display: 'block' }}>Proxy Address</label>
                <input className="input-field" value={proxyAddr} onChange={e => setProxyAddr(e.target.value)} placeholder="e.g. 103.152.112.25" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 4, display: 'block' }}>Port</label>
                <input className="input-field" value={proxyPort} onChange={e => setProxyPort(e.target.value)} placeholder="e.g. 8080" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 4, display: 'block' }}>Protocol</label>
                <select
                  className="input-field"
                  value={vpnProto}
                  onChange={e => setVpnProto(e.target.value as VirtualDevice['vpnProtocol'])}
                >
                  <option value="http">HTTP</option>
                  <option value="socks5">SOCKS5</option>
                  <option value="wireguard">WireGuard</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginBottom: 4 }}>Address</div>
                <div style={{ fontSize: 14, fontFamily: 'monospace' }}>{device.proxyAddress}:{device.proxyPort}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginBottom: 4 }}>Protocol</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{device.vpnProtocol.toUpperCase()}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginBottom: 4 }}>Status</div>
                <div style={{ fontSize: 14, color: device.proxyEnabled ? '#25d366' : '#8696a0', fontWeight: 600 }}>
                  {device.proxyEnabled ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="card" style={{ padding: 16, borderColor: '#ea433540' }}>
          <h3 style={{ fontSize: 13, color: '#ea4335', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            Danger Zone
          </h3>
          {!confirmRemove ? (
            <button className="btn btn-danger" onClick={() => setConfirmRemove(true)}>
              <Trash2 size={16} /> Remove This Device
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#ea4335' }}>Are you sure? This cannot be undone.</span>
              <button className="btn btn-danger" onClick={onRemoveDevice}>
                <Trash2 size={14} /> Yes, Remove
              </button>
              <button className="btn btn-secondary" onClick={() => setConfirmRemove(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
