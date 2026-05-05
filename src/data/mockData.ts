import type { WhatsAppAccount, Contact, Chat, Message, StatusUpdate, CallRecord, DeviceSession } from '../types';

export const mockAccounts: WhatsAppAccount[] = [
  {
    id: 'acc-1',
    phoneNumber: '+92 301 234 5678',
    displayName: 'Personal',
    avatar: 'https://picsum.photos/seed/acc1/200/200',
    status: 'Hey there! I am using WhatsApp',
    deviceName: 'Samsung Galaxy S24',
    deviceType: 'android',
    ipAddress: '192.168.1.101',
    proxyEnabled: false,
    proxyAddress: '',
    isActive: true,
    lastSeen: '2026-05-05T22:00:00Z',
    unreadCount: 5,
    batteryLevel: 78,
  },
  {
    id: 'acc-2',
    phoneNumber: '+92 333 987 6543',
    displayName: 'Business',
    avatar: 'https://picsum.photos/seed/acc2/200/200',
    status: 'Available for business inquiries',
    deviceName: 'iPhone 15 Pro',
    deviceType: 'iphone',
    ipAddress: '10.0.0.45',
    proxyEnabled: true,
    proxyAddress: '103.152.112.xx:8080',
    isActive: true,
    lastSeen: '2026-05-05T21:55:00Z',
    unreadCount: 12,
    batteryLevel: 45,
  },
  {
    id: 'acc-3',
    phoneNumber: '+1 555 123 4567',
    displayName: 'US Number',
    avatar: 'https://picsum.photos/seed/acc3/200/200',
    status: 'On vacation 🌴',
    deviceName: 'Cloned Device #1',
    deviceType: 'clone',
    ipAddress: '45.33.32.156',
    proxyEnabled: true,
    proxyAddress: '45.33.32.xx:3128',
    isActive: false,
    lastSeen: '2026-05-05T18:30:00Z',
    unreadCount: 0,
    batteryLevel: 92,
  },
  {
    id: 'acc-4',
    phoneNumber: '+44 7911 123456',
    displayName: 'UK Work',
    avatar: 'https://picsum.photos/seed/acc4/200/200',
    status: 'In a meeting',
    deviceName: 'Pixel 8',
    deviceType: 'android',
    ipAddress: '51.140.12.xx',
    proxyEnabled: true,
    proxyAddress: '51.140.12.xx:1080',
    isActive: true,
    lastSeen: '2026-05-05T22:02:00Z',
    unreadCount: 3,
    batteryLevel: 61,
  },
];

export const mockContacts: Contact[] = [
  { id: 'c-1', name: 'Ahmed Khan', phoneNumber: '+92 300 111 2222', avatar: 'https://picsum.photos/seed/c1/100/100', status: 'Available', lastSeen: '2026-05-05T22:00:00Z', isOnline: true },
  { id: 'c-2', name: 'Sara Ali', phoneNumber: '+92 321 333 4444', avatar: 'https://picsum.photos/seed/c2/100/100', status: 'Busy', lastSeen: '2026-05-05T21:45:00Z', isOnline: true },
  { id: 'c-3', name: 'Usman Malik', phoneNumber: '+92 345 555 6666', avatar: 'https://picsum.photos/seed/c3/100/100', status: 'At work', lastSeen: '2026-05-05T20:00:00Z', isOnline: false },
  { id: 'c-4', name: 'Fatima Zahra', phoneNumber: '+92 312 777 8888', avatar: 'https://picsum.photos/seed/c4/100/100', status: 'Hey there!', lastSeen: '2026-05-05T21:30:00Z', isOnline: true },
  { id: 'c-5', name: 'Ali Raza', phoneNumber: '+92 331 999 0000', avatar: 'https://picsum.photos/seed/c5/100/100', status: 'Gym time 💪', lastSeen: '2026-05-05T19:00:00Z', isOnline: false },
  { id: 'c-6', name: 'Ayesha Noor', phoneNumber: '+92 302 222 3333', avatar: 'https://picsum.photos/seed/c6/100/100', status: 'Reading 📚', lastSeen: '2026-05-05T22:01:00Z', isOnline: true },
  { id: 'c-7', name: 'Hassan Iqbal', phoneNumber: '+92 311 444 5555', avatar: 'https://picsum.photos/seed/c7/100/100', status: 'Gaming 🎮', lastSeen: '2026-05-05T21:00:00Z', isOnline: false },
  { id: 'c-8', name: 'Zainab Bibi', phoneNumber: '+92 322 666 7777', avatar: 'https://picsum.photos/seed/c8/100/100', status: 'Cooking 🍳', lastSeen: '2026-05-05T20:30:00Z', isOnline: false },
  { id: 'c-9', name: 'Bilal Ahmad', phoneNumber: '+92 333 888 9999', avatar: 'https://picsum.photos/seed/c9/100/100', status: 'Working from home', lastSeen: '2026-05-05T22:03:00Z', isOnline: true },
  { id: 'c-10', name: 'Mehwish Shah', phoneNumber: '+92 344 000 1111', avatar: 'https://picsum.photos/seed/c10/100/100', status: 'On a trip ✈️', lastSeen: '2026-05-04T18:00:00Z', isOnline: false },
  { id: 'c-11', name: 'Imran Hussain', phoneNumber: '+1 555 234 5678', avatar: 'https://picsum.photos/seed/c11/100/100', status: 'NYC life 🗽', lastSeen: '2026-05-05T15:00:00Z', isOnline: false },
  { id: 'c-12', name: 'Nadia Jamil', phoneNumber: '+44 7700 123456', avatar: 'https://picsum.photos/seed/c12/100/100', status: 'London calling 🇬🇧', lastSeen: '2026-05-05T21:50:00Z', isOnline: true },
];

function makeMessages(chatId: string, contactId: string): Message[] {
  const conversations: Record<string, Array<{ text: string; out: boolean; mins: number }>> = {
    'chat-1': [
      { text: 'Assalam o alaikum bhai!', out: false, mins: 45 },
      { text: 'Walaikum assalam! Kya haal hai?', out: true, mins: 44 },
      { text: 'Alhamdulillah theek hoon. Kal meeting hai na?', out: false, mins: 42 },
      { text: 'Haan 3 baje. Office aana hai', out: true, mins: 40 },
      { text: 'Ok bhai, me aa jaonga InshaAllah', out: false, mins: 38 },
      { text: 'Presentation ready hai?', out: true, mins: 35 },
      { text: 'Almost done, raat tak complete ho jayegi', out: false, mins: 33 },
      { text: '👍 Perfect. See you tomorrow', out: true, mins: 30 },
    ],
    'chat-2': [
      { text: 'Hey! Did you see the new collection?', out: false, mins: 120 },
      { text: 'No which one?', out: true, mins: 118 },
      { text: 'The spring collection at Khaadi', out: false, mins: 115 },
      { text: 'Send me photos!', out: true, mins: 113 },
      { text: 'Check their website, its amazing 😍', out: false, mins: 110 },
      { text: 'Ok let me see', out: true, mins: 108 },
    ],
    'chat-3': [
      { text: 'Usman bhai parking lot pe aajao', out: true, mins: 200 },
      { text: 'Abhi aa raha hoon 5 min', out: false, mins: 198 },
      { text: 'Jaldi aao late ho rahe hain', out: true, mins: 195 },
    ],
    'chat-4': [
      { text: 'Recipe bhejo na biryani ki', out: true, mins: 60 },
      { text: 'Abhi send karti hoon', out: false, mins: 58 },
      { text: 'Step 1: Chawal dhoke bhigao 30 min\nStep 2: Chicken masala laga ke marinate\nStep 3: Dum pe lagao 45 min', out: false, mins: 55 },
      { text: 'Thank you! 🙏', out: true, mins: 53 },
      { text: 'Photo bhejna ban ke 😄', out: false, mins: 50 },
    ],
    'chat-5': [
      { text: 'Bro gym chalein aaj?', out: false, mins: 300 },
      { text: 'Nahi yaar aaj rest day hai', out: true, mins: 298 },
      { text: 'Kal phir pakka?', out: false, mins: 295 },
      { text: 'Done! 6 baje', out: true, mins: 293 },
    ],
    'chat-6': [
      { text: 'Ayesha ye book padhi hai tumne?', out: true, mins: 15 },
      { text: 'Konsi book?', out: false, mins: 13 },
      { text: 'Atomic Habits by James Clear', out: true, mins: 11 },
      { text: 'Yes! Bahut achi hai. Must read 📖', out: false, mins: 9 },
      { text: 'Send me the PDF if you have it', out: true, mins: 7 },
      { text: 'Ok sending now...', out: false, mins: 5 },
    ],
    'chat-7': [
      { text: 'Gaming tonight?', out: false, mins: 180 },
      { text: 'Yeah lets go! 10 PM?', out: true, mins: 178 },
      { text: 'Done. PUBG ya Valorant?', out: false, mins: 175 },
      { text: 'PUBG erangle', out: true, mins: 173 },
    ],
  };
  const msgs = conversations[chatId] ?? [
    { text: 'Hello!', out: false, mins: 60 },
    { text: 'Hi, how are you?', out: true, mins: 58 },
  ];
  const now = Date.now();
  return msgs.map((m, i) => ({
    id: `${chatId}-msg-${i}`,
    chatId,
    senderId: m.out ? 'me' : contactId,
    text: m.text,
    timestamp: new Date(now - m.mins * 60000).toISOString(),
    status: m.out ? ('read' as const) : ('delivered' as const),
    type: 'text' as const,
    isOutgoing: m.out,
  }));
}

function buildChats(): Chat[] {
  const chatConfigs: Array<{ contactIdx: number; pinned: boolean; muted: boolean }> = [
    { contactIdx: 0, pinned: true, muted: false },
    { contactIdx: 1, pinned: true, muted: false },
    { contactIdx: 2, pinned: false, muted: false },
    { contactIdx: 3, pinned: false, muted: false },
    { contactIdx: 4, pinned: false, muted: true },
    { contactIdx: 5, pinned: false, muted: false },
    { contactIdx: 6, pinned: false, muted: true },
    { contactIdx: 7, pinned: false, muted: false },
    { contactIdx: 8, pinned: false, muted: false },
    { contactIdx: 9, pinned: false, muted: false },
    { contactIdx: 10, pinned: false, muted: false },
    { contactIdx: 11, pinned: false, muted: false },
  ];
  return chatConfigs.map((cfg, i) => {
    const contact = mockContacts[cfg.contactIdx]!;
    const chatId = `chat-${i + 1}`;
    const messages = makeMessages(chatId, contact.id);
    const lastMessage = messages[messages.length - 1]!;
    return {
      id: chatId,
      contact,
      messages,
      lastMessage,
      unreadCount: cfg.pinned ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 3),
      isPinned: cfg.pinned,
      isMuted: cfg.muted,
      isArchived: false,
    };
  });
}

export const mockChats: Chat[] = buildChats();

export const mockStatuses: StatusUpdate[] = [
  { id: 's-1', contact: mockContacts[0]!, media: 'https://picsum.photos/seed/s1/400/600', caption: 'Beautiful sunset 🌅', timestamp: '2026-05-05T20:00:00Z', viewed: false, type: 'image' },
  { id: 's-2', contact: mockContacts[1]!, media: '', caption: 'Life is beautiful when you stop comparing ✨', timestamp: '2026-05-05T19:30:00Z', viewed: false, type: 'text', backgroundColor: '#075e54' },
  { id: 's-3', contact: mockContacts[3]!, media: 'https://picsum.photos/seed/s3/400/600', caption: 'Cooking biryani today!', timestamp: '2026-05-05T18:00:00Z', viewed: true, type: 'image' },
  { id: 's-4', contact: mockContacts[5]!, media: '', caption: 'Currently reading: Atomic Habits 📚', timestamp: '2026-05-05T17:00:00Z', viewed: true, type: 'text', backgroundColor: '#128c7e' },
  { id: 's-5', contact: mockContacts[8]!, media: 'https://picsum.photos/seed/s5/400/600', caption: 'Work from home setup 💻', timestamp: '2026-05-05T16:00:00Z', viewed: false, type: 'image' },
  { id: 's-6', contact: mockContacts[11]!, media: 'https://picsum.photos/seed/s6/400/600', caption: 'London Bridge 🌉', timestamp: '2026-05-05T15:00:00Z', viewed: true, type: 'image' },
];

export const mockCalls: CallRecord[] = [
  { id: 'call-1', contact: mockContacts[0]!, type: 'voice', direction: 'incoming', timestamp: '2026-05-05T21:30:00Z', duration: 320 },
  { id: 'call-2', contact: mockContacts[1]!, type: 'video', direction: 'outgoing', timestamp: '2026-05-05T20:15:00Z', duration: 180 },
  { id: 'call-3', contact: mockContacts[3]!, type: 'voice', direction: 'missed', timestamp: '2026-05-05T19:00:00Z', duration: 0 },
  { id: 'call-4', contact: mockContacts[5]!, type: 'voice', direction: 'outgoing', timestamp: '2026-05-05T17:45:00Z', duration: 540 },
  { id: 'call-5', contact: mockContacts[8]!, type: 'video', direction: 'incoming', timestamp: '2026-05-05T16:00:00Z', duration: 120 },
  { id: 'call-6', contact: mockContacts[2]!, type: 'voice', direction: 'missed', timestamp: '2026-05-05T14:30:00Z', duration: 0 },
  { id: 'call-7', contact: mockContacts[4]!, type: 'voice', direction: 'outgoing', timestamp: '2026-05-05T12:00:00Z', duration: 60 },
  { id: 'call-8', contact: mockContacts[11]!, type: 'video', direction: 'incoming', timestamp: '2026-05-04T22:00:00Z', duration: 900 },
  { id: 'call-9', contact: mockContacts[6]!, type: 'voice', direction: 'incoming', timestamp: '2026-05-04T20:00:00Z', duration: 240 },
  { id: 'call-10', contact: mockContacts[7]!, type: 'voice', direction: 'missed', timestamp: '2026-05-04T18:00:00Z', duration: 0 },
];

export const mockDeviceSessions: DeviceSession[] = [
  { id: 'dev-1', accountId: 'acc-1', deviceName: 'Samsung Galaxy S24', deviceType: 'android', ipAddress: '192.168.1.101', location: 'Lahore, Pakistan', lastActive: '2026-05-05T22:00:00Z', isCurrentDevice: true },
  { id: 'dev-2', accountId: 'acc-1', deviceName: 'Chrome - Windows', deviceType: 'web', ipAddress: '192.168.1.50', location: 'Lahore, Pakistan', lastActive: '2026-05-05T21:00:00Z', isCurrentDevice: false, browser: 'Chrome 125' },
  { id: 'dev-3', accountId: 'acc-1', deviceName: 'WhatsApp Desktop', deviceType: 'desktop', ipAddress: '192.168.1.50', location: 'Lahore, Pakistan', lastActive: '2026-05-05T20:30:00Z', isCurrentDevice: false },
  { id: 'dev-4', accountId: 'acc-2', deviceName: 'iPhone 15 Pro', deviceType: 'iphone', ipAddress: '10.0.0.45', location: 'Islamabad, Pakistan', lastActive: '2026-05-05T21:55:00Z', isCurrentDevice: true },
  { id: 'dev-5', accountId: 'acc-2', deviceName: 'Safari - MacBook', deviceType: 'web', ipAddress: '10.0.0.22', location: 'Islamabad, Pakistan', lastActive: '2026-05-05T19:00:00Z', isCurrentDevice: false, browser: 'Safari 18' },
  { id: 'dev-6', accountId: 'acc-3', deviceName: 'Cloned Device #1', deviceType: 'android', ipAddress: '45.33.32.156', location: 'New York, USA', lastActive: '2026-05-05T18:30:00Z', isCurrentDevice: true },
  { id: 'dev-7', accountId: 'acc-4', deviceName: 'Pixel 8', deviceType: 'android', ipAddress: '51.140.12.88', location: 'London, UK', lastActive: '2026-05-05T22:02:00Z', isCurrentDevice: true },
  { id: 'dev-8', accountId: 'acc-4', deviceName: 'Firefox - Ubuntu', deviceType: 'web', ipAddress: '51.140.12.90', location: 'London, UK', lastActive: '2026-05-05T20:00:00Z', isCurrentDevice: false, browser: 'Firefox 130' },
];
