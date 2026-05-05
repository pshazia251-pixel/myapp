import { useState, useMemo } from 'react';
import {
  ArrowLeft, Search, MessageCircle, Phone, Video, MoreVertical,
  Pin, Volume2, Check, CheckCheck, Clock
} from 'lucide-react';
import type { VirtualDevice, Chat } from '../types';

interface Props {
  device: VirtualDevice;
  chats: Chat[];
  onBack: () => void;
  onSelectChat: (chat: Chat) => void;
}

export function DeviceWhatsApp({ device, chats, onBack, onSelectChat }: Props) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'calls' | 'status'>('chats');

  const filteredChats = useMemo(() => {
    if (!search) return chats;
    const s = search.toLowerCase();
    return chats.filter(c =>
      c.contact.name.toLowerCase().includes(s) ||
      c.lastMessage.text.toLowerCase().includes(s)
    );
  }, [chats, search]);

  const sortedChats = useMemo(() => {
    return [...filteredChats].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    });
  }, [filteredChats]);

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diff < 172800000) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--wa-green)',
        padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 0 }}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>WhatsApp</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                {device.location.flag} {device.label} • {device.ipAddress}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Search size={18} color="white" style={{ cursor: 'pointer' }} />
            <MoreVertical size={18} color="white" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex' }}>
          {(['chats', 'status', 'calls'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer',
                background: 'transparent', color: 'white',
                fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1,
                borderBottom: activeTab === tab ? '3px solid white' : '3px solid transparent',
                opacity: activeTab === tab ? 1 : 0.7,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'chats' && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Search */}
          <div style={{ padding: '8px 12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--wa-text-muted)' }} />
              <input
                className="input-field"
                placeholder="Search or start new chat"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36, borderRadius: 20, fontSize: 13 }}
              />
            </div>
          </div>

          {/* Chat List */}
          {sortedChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px', cursor: 'pointer',
                borderBottom: '1px solid var(--wa-border)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--wa-bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={chat.contact.avatar} alt="" className="avatar" />
                {chat.contact.isOnline && <div className="online-dot" />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{chat.contact.name}</span>
                  <span style={{
                    fontSize: 11,
                    color: chat.unreadCount > 0 ? 'var(--wa-teal)' : 'var(--wa-text-muted)',
                  }}>
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    fontSize: 13, color: 'var(--wa-text-secondary)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    maxWidth: '80%', display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {chat.lastMessage.isOutgoing && (
                      chat.lastMessage.status === 'read' ?
                        <CheckCheck size={14} color="var(--wa-blue)" /> :
                      chat.lastMessage.status === 'delivered' ?
                        <CheckCheck size={14} color="var(--wa-text-muted)" /> :
                        <Check size={14} color="var(--wa-text-muted)" />
                    )}
                    {chat.lastMessage.text}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {chat.isPinned && <Pin size={12} color="var(--wa-text-muted)" />}
                    {chat.isMuted && <Volume2 size={12} color="var(--wa-text-muted)" />}
                    {chat.unreadCount > 0 && (
                      <span className="badge badge-green">{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'status' && (
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {/* My Status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0', borderBottom: '1px solid var(--wa-border)', marginBottom: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'var(--wa-bg-panel)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed var(--wa-teal)',
            }}>
              <span style={{ fontSize: 24 }}>+</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>My Status</div>
              <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>Tap to add status update</div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Recent Updates
          </div>
          {chats.slice(0, 5).map(chat => (
            <div key={chat.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0', borderBottom: '1px solid var(--wa-border)',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                padding: 2,
                background: 'linear-gradient(135deg, var(--wa-teal), var(--wa-green))',
              }}>
                <img src={chat.contact.avatar} alt="" style={{
                  width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                  border: '2px solid var(--wa-bg)',
                }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{chat.contact.name}</div>
                <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
                  <Clock size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {formatTime(chat.lastMessage.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'calls' && (
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', borderRadius: 8,
            background: 'var(--wa-bg-panel)', marginBottom: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--wa-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Phone size={18} color="white" />
            </div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Create call link</span>
          </div>

          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Recent
          </div>
          {chats.slice(0, 8).map((chat, i) => {
            const isVideo = i % 3 === 0;
            const isMissed = i % 4 === 0;
            return (
              <div key={chat.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0', borderBottom: '1px solid var(--wa-border)',
              }}>
                <img src={chat.contact.avatar} alt="" className="avatar" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: isMissed ? '#ea4335' : 'var(--wa-text)' }}>
                    {chat.contact.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--wa-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isMissed ? '↙ Missed' : i % 2 === 0 ? '↗ Outgoing' : '↙ Incoming'}
                    <span>•</span>
                    {formatTime(chat.lastMessage.timestamp)}
                  </div>
                </div>
                {isVideo ? <Video size={18} color="var(--wa-teal)" /> : <Phone size={18} color="var(--wa-teal)" />}
              </div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: 16,
          background: 'var(--wa-teal)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <MessageCircle size={24} color="white" />
      </button>
    </div>
  );
}
