import {
  ArrowLeft, Shield, Globe, RefreshCw, Bell, Palette, HelpCircle,
  LogOut, MapPin, Smartphone, Clock
} from 'lucide-react';
import type { VirtualDevice } from '../types';

interface Props {
  devices: VirtualDevice[];
  onBack: () => void;
  onToggleDevice: (deviceId: string) => void;
}

export function SettingsPage({ devices, onBack, onToggleDevice }: Props) {
  const onlineCount = devices.filter(d => d.status === 'online').length;

  const formatUptime = (seconds: number) => {
    if (seconds === 0) return 'Offline';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    if (d > 0) return `${d}d ${h}h`;
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const getStatusColor = (status: VirtualDevice['status']) => {
    switch (status) {
      case 'online': return '#25d366';
      case 'offline': return '#8696a0';
      case 'connecting': return '#f59e0b';
      case 'error': return '#ea4335';
    }
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
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Settings</h2>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24, maxWidth: 800, margin: '0 auto', width: '100%' }}>
        {/* All Devices Manager */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{
            padding: '14px 16px', borderBottom: '1px solid var(--wa-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Smartphone size={16} color="var(--wa-teal)" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>All Devices ({devices.length})</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{onlineCount} online</span>
          </div>

          {devices.map(device => (
            <div
              key={device.id}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--wa-border)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--wa-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${getStatusColor(device.status)}`,
              }}>
                <span style={{ fontSize: 18 }}>{device.location.flag}</span>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{device.label}</span>
                  <span style={{
                    fontSize: 10, padding: '1px 6px', borderRadius: 6,
                    background: `${getStatusColor(device.status)}20`,
                    color: getStatusColor(device.status),
                    fontWeight: 600,
                  }}>
                    {device.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{device.phoneNumber}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'monospace' }}>{device.ipAddress}</span>
                  <span>•</span>
                  <span>{device.location.city}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ textAlign: 'right', marginRight: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>
                    <Clock size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />
                    {formatUptime(device.uptime)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>
                    {device.vpnProtocol.toUpperCase()}
                  </div>
                </div>
                <div
                  onClick={() => onToggleDevice(device.id)}
                  style={{
                    width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                    background: device.status === 'online' ? 'var(--wa-teal)' : 'var(--wa-border)',
                    position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                    position: 'absolute', top: 2,
                    left: device.status === 'online' ? 22 : 2,
                    transition: 'left 0.2s',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Groups */}
        {[
          {
            title: 'Network',
            items: [
              { icon: Shield, label: 'Default Proxy Protocol', value: 'SOCKS5' },
              { icon: Globe, label: 'DNS Configuration', value: 'Auto' },
              { icon: RefreshCw, label: 'Auto-Reconnect', value: 'Enabled' },
            ],
          },
          {
            title: 'Notifications',
            items: [
              { icon: Bell, label: 'Push Notifications', value: 'All devices' },
              { icon: Bell, label: 'Error Alerts', value: 'Enabled' },
              { icon: Bell, label: 'Status Alerts', value: 'Online/Offline only' },
            ],
          },
          {
            title: 'Appearance',
            items: [
              { icon: Palette, label: 'Theme', value: 'Dark' },
              { icon: Globe, label: 'Language', value: 'English' },
              { icon: MapPin, label: 'Show Locations', value: 'On cards' },
            ],
          },
          {
            title: 'Help',
            items: [
              { icon: HelpCircle, label: 'Documentation', value: '' },
              { icon: HelpCircle, label: 'Support', value: '' },
            ],
          },
        ].map((group, gi) => (
          <div key={gi} className="card" style={{ marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--wa-border)' }}>
              <span style={{ fontSize: 12, color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                {group.title}
              </span>
            </div>
            {group.items.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderBottom: i < group.items.length - 1 ? '1px solid var(--wa-border)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--wa-bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <item.icon size={18} color="var(--wa-text-secondary)" />
                <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                {item.value && (
                  <span style={{ fontSize: 13, color: 'var(--wa-text-muted)' }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Logout */}
        <button
          className="btn btn-danger"
          style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }}
        >
          <LogOut size={16} /> Log Out All Devices
        </button>
      </div>
    </div>
  );
}
