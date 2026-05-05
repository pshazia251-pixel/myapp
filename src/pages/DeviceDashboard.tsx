import { useState, useMemo } from 'react';
import {
  Smartphone, Plus, Settings, Signal, SignalZero, Battery, MapPin,
  MessageCircle, Wifi, WifiOff, Power, MoreVertical, Search,
  Activity, Globe, AlertTriangle, CheckCircle2, Clock, Shield,
  BarChart3, Zap, RefreshCw
} from 'lucide-react';
import { mockActivityLogs } from '../data/mockData';
import type { VirtualDevice, DeviceStats } from '../types';

interface Props {
  devices: VirtualDevice[];
  onSelectDevice: (device: VirtualDevice) => void;
  onOpenWhatsApp: (device: VirtualDevice) => void;
  onToggleDevice: (deviceId: string) => void;
  onAddDevice: () => void;
  onOpenSettings: () => void;
}

export function DeviceDashboard({ devices, onSelectDevice, onOpenWhatsApp, onToggleDevice, onAddDevice, onOpenSettings }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'error'>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const stats: DeviceStats = useMemo(() => {
    const online = devices.filter(d => d.status === 'online').length;
    const locations = new Set(devices.map(d => `${d.location.city},${d.location.country}`));
    const totalUptime = devices.filter(d => d.status === 'online').reduce((sum, d) => sum + d.uptime, 0);
    return {
      totalDevices: devices.length,
      onlineDevices: online,
      totalMessages: devices.reduce((sum, d) => sum + d.messagesTotal, 0),
      messagesToday: devices.reduce((sum, d) => sum + d.messagesToday, 0),
      uniqueLocations: locations.size,
      avgUptime: online > 0 ? totalUptime / online : 0,
      bannedDevices: devices.filter(d => d.whatsappStatus === 'banned').length,
      errorDevices: devices.filter(d => d.status === 'error').length,
    };
  }, [devices]);

  const filtered = useMemo(() => {
    let result = devices;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(d =>
        d.label.toLowerCase().includes(s) ||
        d.phoneNumber.includes(s) ||
        d.location.city.toLowerCase().includes(s) ||
        d.location.country.toLowerCase().includes(s) ||
        d.ipAddress.includes(s)
      );
    }
    if (filter !== 'all') {
      result = result.filter(d => d.status === filter);
    }
    return result;
  }, [devices, search, filter]);

  const formatUptime = (seconds: number) => {
    if (seconds === 0) return '0s';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    if (d > 0) return `${d}d ${h}h`;
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const getStatusColor = (status: VirtualDevice['status']) => {
    switch (status) {
      case 'online': return '#25d366';
      case 'offline': return '#8696a0';
      case 'connecting': return '#f59e0b';
      case 'error': return '#ea4335';
    }
  };

  const getWaStatusBadge = (ws: VirtualDevice['whatsappStatus']) => {
    switch (ws) {
      case 'active': return { bg: '#25d366', text: 'Active' };
      case 'banned': return { bg: '#ea4335', text: 'Banned' };
      case 'not_registered': return { bg: '#8696a0', text: 'Not Registered' };
      case 'verifying': return { bg: '#f59e0b', text: 'Verifying' };
    }
  };

  const recentLogs = mockActivityLogs.slice(0, 5);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--wa-header)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Smartphone size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--wa-text)' }}>WhatsApp Multi-Device</h1>
            <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>
              {stats.onlineDevices}/{stats.totalDevices} devices online
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={onAddDevice} style={{ fontSize: 13 }}>
            <Plus size={16} /> Add Device
          </button>
          <button className="btn btn-ghost" onClick={onOpenSettings}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}>
          {[
            { label: 'Total Devices', value: stats.totalDevices, icon: Smartphone, color: '#25d366' },
            { label: 'Online Now', value: stats.onlineDevices, icon: Wifi, color: '#34b7f1' },
            { label: 'Messages Today', value: stats.messagesToday, icon: MessageCircle, color: '#128c7e' },
            { label: 'Locations', value: stats.uniqueLocations, icon: Globe, color: '#8e44ad' },
            { label: 'Total Messages', value: stats.totalMessages.toLocaleString(), icon: BarChart3, color: '#f59e0b' },
            { label: 'Avg Uptime', value: formatUptime(stats.avgUptime), icon: Clock, color: '#075e54' },
            { label: 'Errors', value: stats.errorDevices, icon: AlertTriangle, color: stats.errorDevices > 0 ? '#ea4335' : '#8696a0' },
            { label: 'Banned', value: stats.bannedDevices, icon: Shield, color: stats.bannedDevices > 0 ? '#ea4335' : '#8696a0' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <stat.icon size={20} color={stat.color} />
                <span style={{ fontSize: 10, color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  {stat.label}
                </span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--wa-text)' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--wa-text-muted)' }} />
            <input
              className="input-field"
              placeholder="Search devices by name, number, location, IP..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'online', 'offline', 'error'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  background: filter === f ? 'var(--wa-teal)' : 'var(--wa-bg-panel)',
                  color: filter === f ? 'white' : 'var(--wa-text-secondary)',
                }}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, background: 'var(--wa-bg-panel)', borderRadius: 8, padding: 2 }}>
            <button
              onClick={() => setView('grid')}
              style={{
                padding: '6px 10px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: view === 'grid' ? 'var(--wa-teal)' : 'transparent',
                color: view === 'grid' ? 'white' : 'var(--wa-text-secondary)',
              }}
            >Grid</button>
            <button
              onClick={() => setView('list')}
              style={{
                padding: '6px 10px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: view === 'list' ? 'var(--wa-teal)' : 'transparent',
                color: view === 'list' ? 'white' : 'var(--wa-text-secondary)',
              }}
            >List</button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button
            className="btn btn-secondary"
            style={{ fontSize: 12 }}
            onClick={() => devices.forEach(d => { if (d.status === 'offline') onToggleDevice(d.id); })}
          >
            <Zap size={14} /> Start All Offline
          </button>
          <button
            className="btn btn-secondary"
            style={{ fontSize: 12 }}
            onClick={() => devices.forEach(d => { if (d.status === 'online') onToggleDevice(d.id); })}
          >
            <Power size={14} /> Stop All
          </button>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>
            <RefreshCw size={14} /> Sync All
          </button>
        </div>

        {/* Devices Grid/List */}
        {view === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
            marginBottom: 24,
          }}>
            {filtered.map(device => {
              const waBadge = getWaStatusBadge(device.whatsappStatus);
              return (
                <div
                  key={device.id}
                  className="card fade-in"
                  style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  {/* Card Header */}
                  <div style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--wa-border)',
                    background: `linear-gradient(90deg, ${getStatusColor(device.status)}15, transparent)`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => onSelectDevice(device)}>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: 'var(--wa-bg)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: `2px solid ${getStatusColor(device.status)}`,
                        }}>
                          <span style={{ fontSize: 22 }}>{device.location.flag}</span>
                        </div>
                        <div style={{
                          position: 'absolute', bottom: -2, right: -2,
                          width: 14, height: 14, borderRadius: '50%',
                          background: getStatusColor(device.status),
                          border: '2px solid var(--wa-bg-panel)',
                        }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--wa-text)' }}>{device.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>{device.phoneNumber}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: 6 }}
                        onClick={(e) => { e.stopPropagation(); onToggleDevice(device.id); }}
                        title={device.status === 'online' ? 'Stop' : 'Start'}
                      >
                        {device.status === 'online' ? <WifiOff size={16} /> : <Wifi size={16} />}
                      </button>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: 6 }}
                        onClick={(e) => { e.stopPropagation(); onSelectDevice(device); }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: 16 }} onClick={() => onSelectDevice(device)}>
                    {/* Location + IP */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={13} color="var(--wa-text-muted)" />
                        <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>
                          {device.location.city}, {device.location.country}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Globe size={13} color="var(--wa-text-muted)" />
                        <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)', fontFamily: 'monospace' }}>
                          {device.ipAddress}
                        </span>
                      </div>
                    </div>

                    {/* Device info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{device.deviceModel}</span>
                      <span style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 10,
                        background: `${waBadge.bg}20`, color: waBadge.bg, fontWeight: 600,
                      }}>
                        {waBadge.text}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
                      padding: '10px 0', borderTop: '1px solid var(--wa-border)',
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wa-text)' }}>{device.messagesToday}</div>
                        <div style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>Today</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wa-text)' }}>{device.contactsCount}</div>
                        <div style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>Contacts</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                          <Battery size={12} color={device.batteryLevel > 20 ? '#25d366' : '#ea4335'} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wa-text)' }}>{device.batteryLevel}%</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>Battery</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                          {device.signalStrength > 0 ? <Signal size={12} color="#25d366" /> : <SignalZero size={12} color="#8696a0" />}
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--wa-text)' }}>{device.signalStrength}/5</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>Signal</div>
                      </div>
                    </div>

                    {/* Uptime + Proxy */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: 10, borderTop: '1px solid var(--wa-border)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} color="var(--wa-text-muted)" />
                        <span style={{ fontSize: 11, color: 'var(--wa-text-secondary)' }}>
                          Uptime: {formatUptime(device.uptime)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Shield size={12} color={device.proxyEnabled ? '#25d366' : '#8696a0'} />
                        <span style={{ fontSize: 11, color: 'var(--wa-text-secondary)' }}>
                          {device.vpnProtocol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div style={{
                    padding: '10px 16px',
                    borderTop: '1px solid var(--wa-border)',
                    display: 'flex', gap: 8,
                  }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '8px 0', fontSize: 12, justifyContent: 'center' }}
                      onClick={(e) => { e.stopPropagation(); onOpenWhatsApp(device); }}
                      disabled={device.status !== 'online'}
                    >
                      <MessageCircle size={14} /> Open WhatsApp
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '8px 12px', fontSize: 12 }}
                      onClick={(e) => { e.stopPropagation(); onSelectDevice(device); }}
                    >
                      <Settings size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="card" style={{ marginBottom: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--wa-border)' }}>
                  {['Device', 'Number', 'Location', 'IP Address', 'Status', 'Messages', 'Battery', 'Uptime', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontSize: 11, color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: 1,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(device => (
                  <tr
                    key={device.id}
                    style={{ borderBottom: '1px solid var(--wa-border)', cursor: 'pointer' }}
                    onClick={() => onSelectDevice(device)}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--wa-bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{device.location.flag}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{device.label}</div>
                          <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{device.deviceModel}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontFamily: 'monospace' }}>{device.phoneNumber}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{device.location.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'monospace', color: 'var(--wa-text-secondary)' }}>{device.ipAddress}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, padding: '3px 10px', borderRadius: 10,
                        background: `${getStatusColor(device.status)}20`,
                        color: getStatusColor(device.status), fontWeight: 600,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: getStatusColor(device.status) }} />
                        {device.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{device.messagesToday}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{device.batteryLevel}%</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--wa-text-secondary)' }}>{formatUptime(device.uptime)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button
                          className="btn btn-ghost"
                          style={{ padding: 4 }}
                          onClick={(e) => { e.stopPropagation(); onOpenWhatsApp(device); }}
                        >
                          <MessageCircle size={14} />
                        </button>
                        <button
                          className="btn btn-ghost"
                          style={{ padding: 4 }}
                          onClick={(e) => { e.stopPropagation(); onToggleDevice(device.id); }}
                        >
                          <Power size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Activity Log */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--wa-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={16} color="var(--wa-teal)" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>Recent Activity</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--wa-text-muted)' }}>{mockActivityLogs.length} events</span>
          </div>
          {recentLogs.map(log => (
            <div
              key={log.id}
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--wa-border)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: log.type === 'success' ? '#25d36620' : log.type === 'error' ? '#ea433520' : log.type === 'warning' ? '#f59e0b20' : '#34b7f120',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {log.type === 'success' ? <CheckCircle2 size={16} color="#25d366" /> :
                 log.type === 'error' ? <AlertTriangle size={16} color="#ea4335" /> :
                 log.type === 'warning' ? <AlertTriangle size={16} color="#f59e0b" /> :
                 <Activity size={16} color="#34b7f1" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--wa-text)' }}>{log.action}</div>
                <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{log.deviceLabel}</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>

        {/* Location Map Placeholder */}
        <div className="card" style={{ padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <MapPin size={16} color="var(--wa-teal)" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>Device Locations</span>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12,
          }}>
            {Array.from(new Map(devices.map(d => [`${d.location.city}`, d])).values()).map(device => (
              <div
                key={device.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 20,
                  background: 'var(--wa-bg)',
                  border: `1px solid ${getStatusColor(device.status)}40`,
                }}
              >
                <span style={{ fontSize: 16 }}>{device.location.flag}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{device.location.city}</div>
                  <div style={{ fontSize: 10, color: 'var(--wa-text-muted)' }}>
                    {devices.filter(d => d.location.city === device.location.city).length} device(s)
                  </div>
                </div>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: getStatusColor(device.status),
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
