export interface VirtualDevice {
  id: string;
  phoneNumber: string;
  label: string;
  avatar: string;
  deviceModel: string;
  osVersion: string;
  ipAddress: string;
  proxyAddress: string;
  proxyPort: number;
  proxyEnabled: boolean;
  location: {
    city: string;
    country: string;
    flag: string;
    lat: number;
    lng: number;
  };
  status: 'online' | 'offline' | 'connecting' | 'error';
  whatsappStatus: 'active' | 'banned' | 'not_registered' | 'verifying';
  batteryLevel: number;
  signalStrength: number;
  uptime: number; // seconds
  messagesTotal: number;
  messagesToday: number;
  contactsCount: number;
  groupsCount: number;
  lastActivity: string;
  createdAt: string;
  autoReconnect: boolean;
  vpnProtocol: 'http' | 'socks5' | 'wireguard' | 'none';
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar: string;
  status: string;
  lastSeen: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'voice' | 'video' | 'document';
  isOutgoing: boolean;
  replyTo?: string;
}

export interface Chat {
  id: string;
  contact: Contact;
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
}

export interface DeviceStats {
  totalDevices: number;
  onlineDevices: number;
  totalMessages: number;
  messagesToday: number;
  uniqueLocations: number;
  avgUptime: number;
  bannedDevices: number;
  errorDevices: number;
}

export interface ActivityLog {
  id: string;
  deviceId: string;
  deviceLabel: string;
  action: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
}
