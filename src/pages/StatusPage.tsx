import { Plus, Camera } from 'lucide-react';
import { mockStatuses } from '../data/mockData';
import type { WhatsAppAccount } from '../types';

interface Props {
  account: WhatsAppAccount;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return 'Yesterday';
}

export function StatusPage({ account }: Props) {
  const viewed = mockStatuses.filter(s => s.viewed);
  const unviewed = mockStatuses.filter(s => !s.viewed);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '12px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Status</h1>
        <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
          {account.displayName} • {account.phoneNumber}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* My Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px',
          borderBottom: '1px solid var(--wa-border)',
        }}>
          <div style={{ position: 'relative' }}>
            <img src={account.avatar} alt="" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'var(--wa-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--wa-bg)',
            }}>
              <Plus size={12} color="white" />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>My Status</div>
            <div style={{ fontSize: 13, color: 'var(--wa-text-muted)' }}>Tap to add status update</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button style={{
              background: 'var(--wa-input-bg)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--wa-teal)',
            }}>
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Recent Updates (unviewed) */}
        {unviewed.length > 0 && (
          <>
            <div style={{ padding: '12px 16px 8px', fontSize: 13, fontWeight: 600, color: 'var(--wa-text-muted)' }}>
              RECENT UPDATES
            </div>
            {unviewed.map(status => (
              <button
                key={status.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--wa-text)',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  padding: 2,
                  background: 'conic-gradient(var(--wa-teal) 0deg, var(--wa-teal) 360deg)',
                }}>
                  <img
                    src={status.contact.avatar}
                    alt=""
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--wa-bg)' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{status.contact.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{timeAgo(status.timestamp)}</div>
                </div>
              </button>
            ))}
          </>
        )}

        {/* Viewed Updates */}
        {viewed.length > 0 && (
          <>
            <div style={{ padding: '12px 16px 8px', fontSize: 13, fontWeight: 600, color: 'var(--wa-text-muted)' }}>
              VIEWED UPDATES
            </div>
            {viewed.map(status => (
              <button
                key={status.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--wa-text)',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  padding: 2,
                  background: 'conic-gradient(var(--wa-text-muted) 0deg, var(--wa-text-muted) 360deg)',
                }}>
                  <img
                    src={status.contact.avatar}
                    alt=""
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--wa-bg)' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, opacity: 0.7 }}>{status.contact.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{timeAgo(status.timestamp)}</div>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
