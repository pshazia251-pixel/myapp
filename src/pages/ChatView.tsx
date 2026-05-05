import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, Phone, Video, MoreVertical, Smile, Paperclip, Mic, Send,
  Check, CheckCheck
} from 'lucide-react';
import type { Chat, Message, VirtualDevice } from '../types';

interface Props {
  chat: Chat;
  device: VirtualDevice;
  onBack: () => void;
}

export function ChatView({ chat, device, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupByDate = (msgs: Message[]) => {
    const groups: Array<{ date: string; messages: Message[] }> = [];
    let currentDate = '';
    msgs.forEach(msg => {
      const date = new Date(msg.timestamp).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
      if (date !== currentDate) {
        currentDate = date;
        groups.push({ date, messages: [] });
      }
      groups[groups.length - 1]!.messages.push(msg);
    });
    return groups;
  };

  const grouped = groupByDate(messages);

  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--wa-bg-chat)',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--wa-header)',
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--wa-text)', padding: 0 }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ position: 'relative' }}>
          <img src={chat.contact.avatar} alt="" className="avatar avatar-sm" />
          {chat.contact.isOnline && <div className="online-dot" style={{ width: 8, height: 8 }} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{chat.contact.name}</div>
          <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>
            {chat.contact.isOnline ? 'online' : `last seen ${formatTime(chat.contact.lastSeen)}`}
            {' • '}{device.location.flag} {device.ipAddress}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Video size={18} color="var(--wa-text-secondary)" style={{ cursor: 'pointer' }} />
          <Phone size={18} color="var(--wa-text-secondary)" style={{ cursor: 'pointer' }} />
          <MoreVertical size={18} color="var(--wa-text-secondary)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px' }}>
        {grouped.map((group, gi) => (
          <div key={gi}>
            <div style={{
              display: 'flex', justifyContent: 'center', margin: '12px 0',
            }}>
              <span style={{
                padding: '4px 14px', borderRadius: 8,
                background: 'var(--wa-bg-panel)', fontSize: 12, color: 'var(--wa-text-muted)',
              }}>
                {group.date}
              </span>
            </div>
            {group.messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.isOutgoing ? 'flex-end' : 'flex-start',
                  marginBottom: 3,
                }}
              >
                <div style={{
                  maxWidth: '65%',
                  padding: '6px 10px 4px',
                  borderRadius: msg.isOutgoing ? '8px 0 8px 8px' : '0 8px 8px 8px',
                  background: msg.isOutgoing ? 'var(--wa-bg-message-out)' : 'var(--wa-bg-message-in)',
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.4, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {msg.text}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    gap: 4, marginTop: 2,
                  }}>
                    <span style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.isOutgoing && (
                      msg.status === 'read' ?
                        <CheckCheck size={14} color="var(--wa-blue)" /> :
                      msg.status === 'delivered' ?
                        <CheckCheck size={14} color="var(--wa-text-muted)" /> :
                        <Check size={14} color="var(--wa-text-muted)" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: 'var(--wa-header)',
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderTop: '1px solid var(--wa-border)',
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)', padding: 4 }}>
          <Smile size={22} />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--wa-text-secondary)', padding: 4 }}>
          <Paperclip size={22} />
        </button>
        <input
          className="input-field"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          style={{ borderRadius: 20, flex: 1 }}
        />
        {input.trim() ? (
          <button
            onClick={handleSend}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--wa-teal)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Send size={18} color="white" />
          </button>
        ) : (
          <button style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--wa-teal)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mic size={18} color="white" />
          </button>
        )}
      </div>
    </div>
  );
}
