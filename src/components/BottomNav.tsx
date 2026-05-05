import { MessageCircle, CircleDot, Phone, Monitor, Settings, Copy } from 'lucide-react';

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'status', label: 'Status', icon: CircleDot },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'clone', label: 'Clone', icon: Copy },
  { id: 'devices', label: 'Devices', icon: Monitor },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function BottomNav({ activePage, onNavigate }: Props) {
  const effectivePage = activePage === 'chat-view' ? 'chats' : activePage;
  return (
    <nav style={{
      display: 'flex',
      background: 'var(--wa-header)',
      borderTop: '1px solid var(--wa-border)',
      padding: '4px 0',
      flexShrink: 0,
    }}>
      {navItems.map(item => {
        const isActive = effectivePage === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '8px 0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--wa-teal)' : 'var(--wa-text-muted)',
              transition: 'color 0.2s',
              position: 'relative',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 32,
                height: 3,
                borderRadius: '0 0 3px 3px',
                background: 'var(--wa-teal)',
              }} />
            )}
            <Icon size={22} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
