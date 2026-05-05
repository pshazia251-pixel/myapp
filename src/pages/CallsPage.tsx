import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, Plus } from 'lucide-react';
import { mockCalls } from '../data/mockData';
import type { WhatsAppAccount } from '../types';

interface Props {
  account: WhatsAppAccount;
}

function formatCallTime(ts: string): string {
  const date = new Date(ts);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now.getTime() - 86400000).toDateString() === date.toDateString();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + `, ${time}`;
}

function formatDuration(secs: number): string {
  if (secs === 0) return 'Missed';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function CallsPage({ account }: Props) {
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
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Calls</h1>
          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
            {account.displayName} • {account.phoneNumber}
          </div>
        </div>
        <button style={{
          background: 'var(--wa-teal)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
        }}>
          <Plus size={20} />
        </button>
      </div>

      {/* Create call link */}
      <button style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--wa-border)',
        cursor: 'pointer',
        color: 'var(--wa-text)',
        textAlign: 'left',
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'var(--wa-teal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Phone size={22} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Create call link</div>
          <div style={{ fontSize: 13, color: 'var(--wa-text-muted)' }}>Share a link for your WhatsApp call</div>
        </div>
      </button>

      {/* Recent label */}
      <div style={{ padding: '12px 16px 8px', fontSize: 13, fontWeight: 600, color: 'var(--wa-text-muted)' }}>
        RECENT
      </div>

      {/* Call list */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {mockCalls.map(call => {
          const isMissed = call.direction === 'missed';
          return (
            <div
              key={call.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                borderBottom: '1px solid var(--wa-border)',
              }}
            >
              <img src={call.contact.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: isMissed ? 'var(--wa-danger)' : 'var(--wa-text)',
                }}>
                  {call.contact.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--wa-text-muted)' }}>
                  {call.direction === 'incoming' && <PhoneIncoming size={14} color="var(--wa-teal)" />}
                  {call.direction === 'outgoing' && <PhoneOutgoing size={14} color="var(--wa-teal)" />}
                  {call.direction === 'missed' && <PhoneMissed size={14} color="var(--wa-danger)" />}
                  <span>{formatCallTime(call.timestamp)}</span>
                  <span style={{ marginLeft: 4 }}>• {formatDuration(call.duration)}</span>
                </div>
              </div>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-teal)' }}>
                {call.type === 'video' ? <Video size={22} /> : <Phone size={22} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
