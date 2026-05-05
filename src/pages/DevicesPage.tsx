import { useState } from 'react';
import { Monitor, Smartphone, Globe, Laptop, Wifi, WifiOff, Shield, Copy, Trash2, Plus, RefreshCw, MapPin, Clock } from 'lucide-react';
import { mockDeviceSessions, mockAccounts } from '../data/mockData';
import type { WhatsAppAccount, DeviceSession } from '../types';

interface Props {
  account: WhatsAppAccount;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 5) return 'Active now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function getDeviceIcon(type: string) {
  switch (type) {
    case 'android': return <Smartphone size={20} />;
    case 'iphone': return <Smartphone size={20} />;
    case 'web': return <Globe size={20} />;
    case 'desktop': return <Laptop size={20} />;
    default: return <Monitor size={20} />;
  }
}

export function DevicesPage({ account }: Props) {
  const [sessions, setSessions] = useState<DeviceSession[]>(mockDeviceSessions);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

  const filtered = selectedAccount === 'all'
    ? sessions
    : sessions.filter(s => s.accountId === selectedAccount);

  const handleRemoveSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '12px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>
            <Monitor size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Linked Devices
          </h1>
          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
            {filtered.length} active sessions across {new Set(filtered.map(s => s.accountId)).size} accounts
          </div>
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
          <Plus size={16} /> Link Device
        </button>
      </div>

      {/* Account Filter */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: 8, borderBottom: '1px solid var(--wa-border)', overflow: 'auto' }}>
        <button
          onClick={() => setSelectedAccount('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            background: selectedAccount === 'all' ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
            color: selectedAccount === 'all' ? 'white' : 'var(--wa-text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          All Accounts
        </button>
        {mockAccounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => setSelectedAccount(acc.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              background: selectedAccount === acc.id ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
              color: selectedAccount === acc.id ? 'white' : 'var(--wa-text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            {acc.displayName}
          </button>
        ))}
      </div>

      {/* Current Device Info */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--wa-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'var(--wa-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            <Smartphone size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>This Device</div>
            <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{account.deviceName}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {account.proxyEnabled && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 6,
                background: 'rgba(37, 211, 102, 0.15)',
                color: 'var(--wa-teal)',
                fontSize: 11,
              }}>
                <Shield size={12} /> VPN
              </span>
            )}
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 12, color: 'var(--wa-teal)',
            }}>
              <Wifi size={14} /> Connected
            </span>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}>
          <div style={{ background: 'var(--wa-input-bg)', padding: '8px 12px', borderRadius: 8, fontSize: 12 }}>
            <div style={{ color: 'var(--wa-text-muted)', marginBottom: 2 }}>IP Address</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {account.ipAddress}
              <Copy size={12} color="var(--wa-text-muted)" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ background: 'var(--wa-input-bg)', padding: '8px 12px', borderRadius: 8, fontSize: 12 }}>
            <div style={{ color: 'var(--wa-text-muted)', marginBottom: 2 }}>Phone Number</div>
            <div>{account.phoneNumber}</div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {filtered.map(session => (
          <div
            key={session.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderBottom: '1px solid var(--wa-border)',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: session.isCurrentDevice ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: session.isCurrentDevice ? 'white' : 'var(--wa-text-secondary)',
            }}>
              {getDeviceIcon(session.deviceType)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{session.deviceName}</span>
                {session.isCurrentDevice && (
                  <span style={{
                    fontSize: 10, padding: '2px 6px',
                    borderRadius: 4, background: 'var(--wa-teal)',
                    color: 'white',
                  }}>
                    This device
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--wa-text-muted)', marginTop: 2 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <MapPin size={11} /> {session.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Clock size={11} /> {timeAgo(session.lastActive)}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', marginTop: 2 }}>
                IP: {session.ipAddress}
                {session.browser ? ` • ${session.browser}` : ''}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {session.isCurrentDevice ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--wa-teal)', fontSize: 12 }}>
                  <Wifi size={14} /> Active
                </span>
              ) : (
                <>
                  <button
                    style={{
                      background: 'var(--wa-input-bg)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 8px',
                      cursor: 'pointer',
                      color: 'var(--wa-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                    }}
                  >
                    <RefreshCw size={12} />
                  </button>
                  <button
                    onClick={() => handleRemoveSession(session.id)}
                    style={{
                      background: 'rgba(234, 67, 53, 0.15)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 8px',
                      cursor: 'pointer',
                      color: 'var(--wa-danger)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Log out all */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--wa-border)' }}>
        <button
          onClick={() => setSessions(prev => prev.filter(s => s.isCurrentDevice))}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            border: '1px solid var(--wa-danger)',
            background: 'transparent',
            color: 'var(--wa-danger)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <WifiOff size={16} /> Log Out All Other Devices
        </button>
      </div>
    </div>
  );
}
