import { useState, useCallback } from 'react';
import { AccountSidebar } from './components/AccountSidebar';
import { BottomNav } from './components/BottomNav';
import { ChatsPage } from './pages/ChatsPage';
import { StatusPage } from './pages/StatusPage';
import { CallsPage } from './pages/CallsPage';
import { DevicesPage } from './pages/DevicesPage';
import { SettingsPage } from './pages/SettingsPage';
import { CloneDevicePage } from './pages/CloneDevicePage';
import { ChatView } from './pages/ChatView';
import { mockAccounts, mockChats } from './data/mockData';
import type { WhatsAppAccount, Chat } from './types';

type Page = 'chats' | 'status' | 'calls' | 'devices' | 'settings' | 'clone' | 'chat-view';

export default function App() {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>(mockAccounts);
  const [activeAccountId, setActiveAccountId] = useState(mockAccounts[0]!.id);
  const [activePage, setActivePage] = useState<Page>('chats');
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeAccount = accounts.find(a => a.id === activeAccountId) ?? accounts[0]!;

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
    setActivePage('chat-view');
  }, []);

  const handleBackFromChat = useCallback(() => {
    setActiveChat(null);
    setActivePage('chats');
  }, []);

  const handleToggleAccount = useCallback((accountId: string) => {
    setAccounts(prev => prev.map(a =>
      a.id === accountId ? { ...a, isActive: !a.isActive } : a
    ));
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'chats':
        return <ChatsPage account={activeAccount} chats={mockChats} onSelectChat={handleSelectChat} />;
      case 'chat-view':
        return activeChat ? <ChatView chat={activeChat} onBack={handleBackFromChat} /> : null;
      case 'status':
        return <StatusPage account={activeAccount} />;
      case 'calls':
        return <CallsPage account={activeAccount} />;
      case 'devices':
        return <DevicesPage account={activeAccount} />;
      case 'settings':
        return <SettingsPage account={activeAccount} accounts={accounts} onToggleAccount={handleToggleAccount} />;
      case 'clone':
        return <CloneDevicePage account={activeAccount} />;
      default:
        return <ChatsPage account={activeAccount} chats={mockChats} onSelectChat={handleSelectChat} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <AccountSidebar
        accounts={accounts}
        activeAccountId={activeAccountId}
        onSelectAccount={setActiveAccountId}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {renderPage()}
        </div>
        <BottomNav
          activePage={activePage}
          onNavigate={(page) => {
            if (page !== 'chat-view') {
              setActiveChat(null);
            }
            setActivePage(page as Page);
          }}
        />
      </div>
    </div>
  );
}
