import { Smartphone, ChevronLeft, ChevronRight, Wifi, WifiOff, Shield } from 'lucide-react';
import type { WhatsAppAccount } from '../types';

interface Props {
  accounts: WhatsAppAccount[];
  activeAccountId: string;
  onSelectAccount: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AccountSidebar({ accounts, activeAccountId, onSelectAccount, collapsed, onToggleCollapse }: Props) {
  return (
    <aside style={{
      width: collapsed ? 68 : 240,
      background: 'var(--wa-bg-darker)',
      borderRight: '1px solid var(--wa-border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      flexShrink: 0,
    }}>
      <div style={{
        padding: collapsed ? '16px 8px' : '16px',
        borderBottom: '1px solid var(--wa-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minHeight: 60,
      }}>
        <Smartphone size={24} color="var(--wa-teal)" />
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--wa-text)' }}>Devices</div>
            <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{accounts.length} accounts</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {accounts.map(acc => {
          const isActive = acc.id === activeAccountId;
          return (
            <button
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 8px' : '10px 16px',
                background: isActive ? 'var(--wa-bg-active)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid var(--wa-teal)' : '3px solid transparent',
                cursor: 'pointer',
                color: 'var(--wa-text)',
                transition: 'all 0.2s',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={acc.avatar} alt="" className="avatar-sm" style={{ borderRadius: '50%', width: 36, height: 36, objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: acc.isActive ? 'var(--wa-online)' : 'var(--wa-text-muted)',
                  border: '2px solid var(--wa-bg-darker)',
                }} />
              </div>
              {!collapsed && (
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {acc.displayName}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--wa-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {acc.proxyEnabled ? <Shield size={10} /> : null}
                    {acc.phoneNumber}
                  </div>
                </div>
              )}
              {!collapsed && acc.unreadCount > 0 && (
                <span className="badge badge-green" style={{ fontSize: 10 }}>{acc.unreadCount}</span>
              )}
              {!collapsed && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {acc.isActive
                    ? <Wifi size={14} color="var(--wa-teal)" />
                    : <WifiOff size={14} color="var(--wa-text-muted)" />
                  }
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onToggleCollapse}
        style={{
          padding: 12,
          background: 'transparent',
          border: 'none',
          borderTop: '1px solid var(--wa-border)',
          color: 'var(--wa-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 12,
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> Collapse</>}
      </button>
    </aside>
  );
}
