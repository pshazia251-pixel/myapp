import { useState } from 'react';
import { Search, MoreVertical, Pin, VolumeX, Check, CheckCheck, Archive } from 'lucide-react';
import type { WhatsAppAccount, Chat } from '../types';

interface Props {
  account: WhatsAppAccount;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export function ChatsPage({ account, chats, onSelectChat }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'groups'>('all');

  const filtered = chats
    .filter(c => {
      if (search) {
        const q = search.toLowerCase();
        return c.contact.name.toLowerCase().includes(q) || c.lastMessage.text.toLowerCase().includes(q);
      }
      return true;
    })
    .filter(c => {
      if (filter === 'unread') return c.unreadCount > 0;
      return true;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Chats</h1>
          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: account.isActive ? 'var(--wa-online)' : 'var(--wa-text-muted)',
              display: 'inline-block',
            }} />
            {account.displayName} • {account.phoneNumber}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 16px', background: 'var(--wa-bg)' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--wa-text-muted)' }} />
          <input
            className="input-field"
            placeholder="Search or start new chat"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 8 }}>
        {(['all', 'unread', 'groups'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              background: filter === f ? 'var(--wa-teal)' : 'var(--wa-input-bg)',
              color: filter === f ? 'white' : 'var(--wa-text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : 'Groups'}
          </button>
        ))}
      </div>

      {/* Archived */}
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--wa-border)',
        color: 'var(--wa-teal)',
        cursor: 'pointer',
        width: '100%',
        fontSize: 14,
        fontWeight: 500,
      }}>
        <Archive size={18} />
        Archived
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--wa-text-muted)' }}>4</span>
      </button>

      {/* Chat List */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {filtered.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            style={{
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
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--wa-bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={chat.contact.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
              {chat.contact.isOnline && <div className="online-dot" />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{chat.contact.name}</span>
                <span style={{
                  fontSize: 11,
                  color: chat.unreadCount > 0 ? 'var(--wa-teal)' : 'var(--wa-text-muted)',
                }}>
                  {timeAgo(chat.lastMessage.timestamp)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <div style={{
                  fontSize: 13,
                  color: 'var(--wa-text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '80%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {chat.lastMessage.isOutgoing && (
                    chat.lastMessage.status === 'read'
                      ? <CheckCheck size={14} color="var(--wa-blue)" />
                      : <Check size={14} />
                  )}
                  {chat.lastMessage.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {chat.isPinned && <Pin size={12} color="var(--wa-text-muted)" />}
                  {chat.isMuted && <VolumeX size={12} color="var(--wa-text-muted)" />}
                  {chat.unreadCount > 0 && (
                    <span className="badge badge-green">{chat.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
