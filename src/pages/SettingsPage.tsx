import { useState } from 'react';
import { User, Shield, Bell, Lock, Palette, Database, HelpCircle, LogOut, ChevronRight, Wifi, WifiOff, Power, Globe, Copy } from 'lucide-react';
import type { WhatsAppAccount } from '../types';

interface Props {
  account: WhatsAppAccount;
  accounts: WhatsAppAccount[];
  onToggleAccount: (id: string) => void;
}

export function SettingsPage({ account, accounts, onToggleAccount }: Props) {
  const [proxyIp, setProxyIp] = useState(account.proxyAddress.split(':')[0] ?? '');
  const [proxyPort, setProxyPort] = useState(account.proxyAddress.split(':')[1] ?? '');
  const [autoConnect, setAutoConnect] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', sublabel: account.displayName, action: 'profile' },
        { icon: Lock, label: 'Privacy', sublabel: 'Last seen, profile photo, about', action: 'privacy' },
        { icon: Bell, label: 'Notifications', sublabel: notifications ? 'Enabled' : 'Disabled', action: 'notif' },
        { icon: Database, label: 'Storage and data', sublabel: '2.4 GB used', action: 'storage' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { icon: Palette, label: 'Theme', sublabel: 'Dark', action: 'theme' },
        { icon: Globe, label: 'Language', sublabel: 'English', action: 'lang' },
      ],
    },
    {
      title: 'Help',
      items: [
        { icon: HelpCircle, label: 'Help center', sublabel: '', action: 'help' },
      ],
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '12px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Settings</h1>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Profile Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px',
          borderBottom: '1px solid var(--wa-border)',
          cursor: 'pointer',
        }}>
          <img src={account.avatar} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{account.displayName}</div>
            <div style={{ fontSize: 13, color: 'var(--wa-text-muted)' }}>{account.status}</div>
            <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginTop: 2 }}>{account.phoneNumber}</div>
          </div>
          <ChevronRight size={20} color="var(--wa-text-muted)" />
        </div>

        {/* Account Manager */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--wa-border)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--wa-teal)', marginBottom: 12 }}>
            MULTI-ACCOUNT MANAGER
          </div>
          {accounts.map(acc => (
            <div
              key={acc.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 0',
                borderBottom: '1px solid var(--wa-border)',
              }}
            >
              <img src={acc.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{acc.displayName}</div>
                <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {acc.phoneNumber}
                  {acc.proxyEnabled && <Shield size={10} color="var(--wa-teal)" />}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  color: acc.isActive ? 'var(--wa-teal)' : 'var(--wa-text-muted)',
                }}>
                  {acc.isActive ? <Wifi size={12} /> : <WifiOff size={12} />}
                  {acc.isActive ? 'Active' : 'Offline'}
                </span>
                <button
                  onClick={() => onToggleAccount(acc.id)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    background: acc.isActive ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
                    position: 'relative',
                    transition: 'background 0.3s',
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: acc.isActive ? 23 : 3,
                    transition: 'left 0.3s',
                  }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Proxy Config for Current Account */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--wa-border)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--wa-teal)', marginBottom: 12 }}>
            <Shield size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            IP / PROXY SETTINGS — {account.displayName}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 4 }}>Current IP</label>
              <div style={{
                padding: '8px 12px',
                background: 'var(--wa-input-bg)',
                borderRadius: 8,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                {account.ipAddress}
                <Copy size={12} color="var(--wa-text-muted)" style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 4 }}>Status</label>
              <div style={{
                padding: '8px 12px',
                background: 'var(--wa-input-bg)',
                borderRadius: 8,
                fontSize: 13,
                color: account.proxyEnabled ? 'var(--wa-teal)' : 'var(--wa-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <Shield size={14} />
                {account.proxyEnabled ? 'Proxy Active' : 'Direct Connection'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'block', marginBottom: 4 }}>Proxy IP</label>
              <input
                className="input-field"
                placeholder="xxx.xxx.xxx.xxx"
                value={proxyIp}
                onChange={e => setProxyIp(e.target.value)}
                style={{ fontSize: 13 }}
              />
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

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
            <Shield size={14} /> Apply Proxy Settings
          </button>
        </div>

        {/* Auto Connect */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--wa-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Power size={20} color="var(--wa-text-secondary)" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Auto-connect on startup</div>
                <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>Automatically connect all active accounts</div>
              </div>
            </div>
            <button
              onClick={() => setAutoConnect(!autoConnect)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                background: autoConnect ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
                position: 'relative',
                transition: 'background 0.3s',
              }}
            >
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: 3,
                left: autoConnect ? 23 : 3,
                transition: 'left 0.3s',
              }} />
            </button>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map(group => (
          <div key={group.title}>
            <div style={{ padding: '12px 16px 8px', fontSize: 13, fontWeight: 600, color: 'var(--wa-text-muted)' }}>
              {group.title.toUpperCase()}
            </div>
            {group.items.map(item => (
              <button
                key={item.action}
                onClick={() => { if (item.action === 'notif') setNotifications(n => !n); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--wa-border)',
                  cursor: 'pointer',
                  color: 'var(--wa-text)',
                  textAlign: 'left',
                }}
              >
                <item.icon size={20} color="var(--wa-text-secondary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{item.label}</div>
                  {item.sublabel && <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{item.sublabel}</div>}
                </div>
                <ChevronRight size={16} color="var(--wa-text-muted)" />
              </button>
            ))}
          </div>
        ))}

        {/* Logout */}
        <div style={{ padding: '16px' }}>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(234, 67, 53, 0.1)',
            color: 'var(--wa-danger)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <LogOut size={18} /> Log Out — {account.displayName}
          </button>
        </div>
      </div>
    </div>
  );
}
