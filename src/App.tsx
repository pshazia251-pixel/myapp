import { useState, useCallback } from 'react';
import { DeviceDashboard } from './pages/DeviceDashboard';
import { DeviceDetail } from './pages/DeviceDetail';
import { AddDevice } from './pages/AddDevice';
import { DeviceWhatsApp } from './pages/DeviceWhatsApp';
import { ChatView } from './pages/ChatView';
import { SettingsPage } from './pages/SettingsPage';
import { ApiSetup } from './pages/ApiSetup';
import { mockDevices, mockChats } from './data/mockData';
import type { VirtualDevice, Chat } from './types';

type Page = 'dashboard' | 'device-detail' | 'add-device' | 'device-whatsapp' | 'chat-view' | 'settings' | 'api-setup';

export default function App() {
  const [devices, setDevices] = useState<VirtualDevice[]>(mockDevices);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [selectedDevice, setSelectedDevice] = useState<VirtualDevice | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const handleSelectDevice = useCallback((device: VirtualDevice) => {
    setSelectedDevice(device);
    setActivePage('device-detail');
  }, []);

  const handleOpenWhatsApp = useCallback((device: VirtualDevice) => {
    setSelectedDevice(device);
    setActivePage('device-whatsapp');
  }, []);

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
    setActivePage('chat-view');
  }, []);

  const handleBack = useCallback(() => {
    if (activePage === 'chat-view') {
      setActiveChat(null);
      setActivePage('device-whatsapp');
    } else if (activePage === 'device-whatsapp' || activePage === 'api-setup') {
      setActivePage('device-detail');
    } else {
      setSelectedDevice(null);
      setActivePage('dashboard');
    }
  }, [activePage]);

  const handleToggleDevice = useCallback((deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      const newStatus = d.status === 'online' ? 'offline' : 'online';
      return {
        ...d,
        status: newStatus,
        signalStrength: newStatus === 'online' ? 4 : 0,
        uptime: newStatus === 'online' ? 0 : d.uptime,
      };
    }));
  }, []);

  const handleRemoveDevice = useCallback((deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    setSelectedDevice(null);
    setActivePage('dashboard');
  }, []);

  const handleAddDevice = useCallback((device: VirtualDevice) => {
    setDevices(prev => [...prev, device]);
    setActivePage('dashboard');
  }, []);

  const handleUpdateDevice = useCallback((updated: VirtualDevice) => {
    setDevices(prev => prev.map(d => d.id === updated.id ? updated : d));
    setSelectedDevice(updated);
  }, []);

  const handleOpenApiSetup = useCallback((device: VirtualDevice) => {
    setSelectedDevice(device);
    setActivePage('api-setup');
  }, []);

  const handleDeviceStatusChange = useCallback((deviceId: string, status: VirtualDevice['status']) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      return {
        ...d,
        status,
        whatsappStatus: status === 'online' ? 'active' as const : 'not_registered' as const,
        signalStrength: status === 'online' ? 4 : 0,
      };
    }));
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <DeviceDashboard
            devices={devices}
            onSelectDevice={handleSelectDevice}
            onOpenWhatsApp={handleOpenWhatsApp}
            onToggleDevice={handleToggleDevice}
            onAddDevice={() => setActivePage('add-device')}
            onOpenSettings={() => setActivePage('settings')}
          />
        );
      case 'device-detail':
        return selectedDevice ? (
          <DeviceDetail
            device={selectedDevice}
            onBack={handleBack}
            onOpenWhatsApp={() => handleOpenWhatsApp(selectedDevice)}
            onToggleDevice={() => handleToggleDevice(selectedDevice.id)}
            onRemoveDevice={() => handleRemoveDevice(selectedDevice.id)}
            onUpdateDevice={handleUpdateDevice}
            onOpenApiSetup={() => handleOpenApiSetup(selectedDevice)}
          />
        ) : null;
      case 'add-device':
        return (
          <AddDevice
            onBack={handleBack}
            onAddDevice={handleAddDevice}
            existingCount={devices.length}
          />
        );
      case 'device-whatsapp':
        return selectedDevice ? (
          <DeviceWhatsApp
            device={selectedDevice}
            chats={mockChats}
            onBack={handleBack}
            onSelectChat={handleSelectChat}
          />
        ) : null;
      case 'chat-view':
        return activeChat && selectedDevice ? (
          <ChatView
            chat={activeChat}
            device={selectedDevice}
            onBack={handleBack}
          />
        ) : null;
      case 'settings':
        return (
          <SettingsPage
            devices={devices}
            onBack={handleBack}
            onToggleDevice={handleToggleDevice}
          />
        );
      case 'api-setup':
        return selectedDevice ? (
          <ApiSetup
            device={selectedDevice}
            onBack={handleBack}
            onDeviceStatusChange={handleDeviceStatusChange}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {renderPage()}
    </div>
  );
}
