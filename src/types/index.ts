export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  displayName: string;
  avatar: string;
  status: string;
  deviceName: string;
  deviceType: 'android' | 'iphone' | 'clone';
  ipAddress: string;
  proxyEnabled: boolean;
  proxyAddress: string;
  isActive: boolean;
  lastSeen: string;
  unreadCount: number;
  batteryLevel: number;
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

export interface StatusUpdate {
  id: string;
  contact: Contact;
  media: string;
  caption: string;
  timestamp: string;
  viewed: boolean;
  type: 'image' | 'text' | 'video';
  backgroundColor?: string;
}

export interface CallRecord {
  id: string;
  contact: Contact;
  type: 'voice' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
  duration: number;
}

export interface DeviceSession {
  id: string;
  accountId: string;
  deviceName: string;
  deviceType: 'android' | 'iphone' | 'web' | 'desktop';
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrentDevice: boolean;
  browser?: string;
}
