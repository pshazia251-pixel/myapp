import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, Check, CheckCheck } from 'lucide-react';
import type { Chat, Message } from '../types';

interface Props {
  chat: Chat;
  onBack: () => void;
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatView({ chat, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId: chat.id,
      senderId: 'me',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text',
      isOutgoing: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' as const } : m));
    }, 1000);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' as const } : m));
    }, 2500);
  };

  const renderTick = (status: string) => {
    if (status === 'read') return <CheckCheck size={14} color="var(--wa-blue)" />;
    if (status === 'delivered') return <CheckCheck size={14} color="var(--wa-text-muted)" />;
    return <Check size={14} color="var(--wa-text-muted)" />;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg-chat)' }}>
      {/* Header */}
      <div style={{
        padding: '8px 16px',
        background: 'var(--wa-header)',
        borderBottom: '1px solid var(--wa-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ position: 'relative' }}>
          <img src={chat.contact.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
          {chat.contact.isOnline && <div className="online-dot" style={{ width: 10, height: 10 }} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{chat.contact.name}</div>
          <div style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>
            {chat.contact.isOnline ? 'online' : `last seen ${formatTime(chat.contact.lastSeen)}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}><Video size={20} /></button>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}><Phone size={20} /></button>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23ffffff08\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23p)\'/%3E%3C/svg%3E")',
        }}
      >
        {messages.map((msg, i) => {
          const showDate = i === 0 || new Date(messages[i - 1]!.timestamp).toDateString() !== new Date(msg.timestamp).toDateString();
          return (
            <div key={msg.id}>
              {showDate && (
                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                  <span style={{
                    background: 'var(--wa-bg-panel)',
                    padding: '4px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    color: 'var(--wa-text-muted)',
                  }}>
                    {new Date(msg.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: msg.isOutgoing ? 'flex-end' : 'flex-start',
                marginBottom: 4,
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '8px 12px',
                  borderRadius: msg.isOutgoing ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                  background: msg.isOutgoing ? 'var(--wa-bg-message-out)' : 'var(--wa-bg-message-in)',
                  position: 'relative',
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.4, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {msg.text}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4,
                    marginTop: 2,
                  }}>
                    <span style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{formatTime(msg.timestamp)}</span>
                    {msg.isOutgoing && renderTick(msg.status)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 16px',
        background: 'var(--wa-header)',
        borderTop: '1px solid var(--wa-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}>
          <Smile size={22} />
        </button>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}>
          <Paperclip size={22} />
        </button>
        <input
          className="input-field"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          style={{ flex: 1, borderRadius: 20 }}
        />
        {input.trim() ? (
          <button
            onClick={handleSend}
            style={{ background: 'var(--wa-teal)', border: 'none', cursor: 'pointer', color: 'white', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Send size={18} />
          </button>
        ) : (
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)' }}>
            <Mic size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
