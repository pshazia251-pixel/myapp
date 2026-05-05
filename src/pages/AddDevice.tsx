import { useState } from 'react';
import { ArrowLeft, Globe, Shield, Plus, Check } from 'lucide-react';
import type { VirtualDevice } from '../types';

interface Props {
  onBack: () => void;
  onAddDevice: (device: VirtualDevice) => void;
  existingCount: number;
}

const LOCATIONS = [
  { city: 'Lahore', country: 'Pakistan', flag: '🇵🇰', lat: 31.55, lng: 74.35 },
  { city: 'Karachi', country: 'Pakistan', flag: '🇵🇰', lat: 24.86, lng: 67.01 },
  { city: 'Islamabad', country: 'Pakistan', flag: '🇵🇰', lat: 33.69, lng: 73.04 },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', lat: 25.20, lng: 55.27 },
  { city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', lat: 24.71, lng: 46.67 },
  { city: 'London', country: 'UK', flag: '🇬🇧', lat: 51.51, lng: -0.13 },
  { city: 'New York', country: 'USA', flag: '🇺🇸', lat: 40.71, lng: -74.01 },
  { city: 'Berlin', country: 'Germany', flag: '🇩🇪', lat: 52.52, lng: 13.40 },
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', lat: 41.01, lng: 28.98 },
  { city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', lat: 3.14, lng: 101.69 },
  { city: 'Toronto', country: 'Canada', flag: '🇨🇦', lat: 43.65, lng: -79.38 },
  { city: 'Sydney', country: 'Australia', flag: '🇦🇺', lat: -33.87, lng: 151.21 },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.68, lng: 139.69 },
  { city: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.35, lng: 103.82 },
  { city: 'Doha', country: 'Qatar', flag: '🇶🇦', lat: 25.29, lng: 51.53 },
];

const DEVICE_MODELS = [
  'Samsung Galaxy S24', 'Samsung Galaxy S23', 'Samsung Galaxy A55',
  'iPhone 15 Pro', 'iPhone 15', 'iPhone 14',
  'Pixel 8 Pro', 'Pixel 8', 'Xiaomi 14',
  'OnePlus 12', 'Oppo Reno 11', 'Redmi Note 13',
];

export function AddDevice({ onBack, onAddDevice, existingCount }: Props) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [label, setLabel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [deviceModel, setDeviceModel] = useState(DEVICE_MODELS[0]);
  const [proxyAddress, setProxyAddress] = useState('');
  const [proxyPort, setProxyPort] = useState('8080');
  const [vpnProtocol, setVpnProtocol] = useState<VirtualDevice['vpnProtocol']>('socks5');
  const [autoReconnect, setAutoReconnect] = useState(true);

  const location = LOCATIONS[selectedLocation]!;

  const generateIP = () => {
    return `${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const handleCreate = () => {
    const ip = proxyAddress || generateIP();
    const device: VirtualDevice = {
      id: `dev-${existingCount + 1}`,
      phoneNumber,
      label: label || `${location.city} Device`,
      avatar: `https://picsum.photos/seed/dev${existingCount + 1}/200/200`,
      deviceModel: deviceModel!,
      osVersion: deviceModel!.includes('iPhone') ? 'iOS 18.2' : 'Android 14',
      ipAddress: ip,
      proxyAddress: ip,
      proxyPort: parseInt(proxyPort) || 8080,
      proxyEnabled: true,
      location,
      status: 'connecting',
      whatsappStatus: 'verifying',
      batteryLevel: 100,
      signalStrength: 0,
      uptime: 0,
      messagesTotal: 0,
      messagesToday: 0,
      contactsCount: 0,
      groupsCount: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      autoReconnect,
      vpnProtocol,
    };
    onAddDevice(device);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wa-bg)' }}>
      <div style={{
        background: 'var(--wa-header)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        borderBottom: '1px solid var(--wa-border)',
      }}>
        <button className="btn btn-ghost" onClick={onBack}><ArrowLeft size={20} /></button>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Add New Device</h2>
          <span style={{ fontSize: 12, color: 'var(--wa-text-secondary)' }}>Step {step} of 3</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', padding: '0 24px', marginTop: 16, gap: 8 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: s <= step ? 'var(--wa-teal)' : 'var(--wa-bg-panel)',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24, maxWidth: 700, margin: '0 auto', width: '100%' }}>
        {step === 1 && (
          <>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Phone Number & Label</h3>
            <p style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 24 }}>
              Enter the WhatsApp phone number and give this device a label
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>Phone Number</label>
              <input
                className="input-field"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+92 300 123 4567"
                style={{ fontSize: 16 }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>Device Label</label>
              <input
                className="input-field"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="e.g. Pakistan - Personal"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>Device Model</label>
              <select className="input-field" value={deviceModel} onChange={e => setDeviceModel(e.target.value)}>
                {DEVICE_MODELS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: '12px 0' }}
              onClick={() => setStep(2)}
              disabled={!phoneNumber}
            >
              Next: Choose Location
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Choose Location</h3>
            <p style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 24 }}>
              Select the location / country for this device's IP address
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10,
              marginBottom: 24,
            }}>
              {LOCATIONS.map((loc, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedLocation(i)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: `2px solid ${selectedLocation === i ? 'var(--wa-teal)' : 'var(--wa-border)'}`,
                    background: selectedLocation === i ? 'var(--wa-teal)10' : 'var(--wa-bg-panel)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 10,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{loc.flag}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{loc.city}</div>
                    <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{loc.country}</div>
                  </div>
                  {selectedLocation === i && <Check size={16} color="var(--wa-teal)" style={{ marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => setStep(3)}>
                Next: Proxy Settings
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Proxy / VPN Settings</h3>
            <p style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 24 }}>
              Configure the proxy or VPN for {location.flag} {location.city} IP address
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>
                <Globe size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Proxy IP Address (leave blank to auto-generate)
              </label>
              <input
                className="input-field"
                value={proxyAddress}
                onChange={e => setProxyAddress(e.target.value)}
                placeholder="Auto-generated if empty"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>Port</label>
              <input
                className="input-field"
                value={proxyPort}
                onChange={e => setProxyPort(e.target.value)}
                placeholder="8080"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--wa-text-secondary)', marginBottom: 6, display: 'block' }}>
                <Shield size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                VPN Protocol
              </label>
              <select className="input-field" value={vpnProtocol} onChange={e => setVpnProtocol(e.target.value as VirtualDevice['vpnProtocol'])}>
                <option value="socks5">SOCKS5</option>
                <option value="http">HTTP</option>
                <option value="wireguard">WireGuard</option>
                <option value="none">None (Direct)</option>
              </select>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderRadius: 8, background: 'var(--wa-bg-panel)',
              marginBottom: 24,
            }}>
              <span style={{ fontSize: 13 }}>Auto-reconnect on disconnect</span>
              <div
                onClick={() => setAutoReconnect(!autoReconnect)}
                style={{
                  width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                  background: autoReconnect ? 'var(--wa-teal)' : 'var(--wa-border)',
                  position: 'relative', transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 2,
                  left: autoReconnect ? 22 : 2,
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>

            {/* Summary Card */}
            <div className="card" style={{ padding: 16, marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, color: 'var(--wa-text-muted)', marginBottom: 12 }}>DEVICE SUMMARY</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Number', value: phoneNumber },
                  { label: 'Label', value: label || `${location.city} Device` },
                  { label: 'Location', value: `${location.flag} ${location.city}` },
                  { label: 'Model', value: deviceModel },
                  { label: 'IP', value: proxyAddress || 'Auto-generated' },
                  { label: 'Protocol', value: vpnProtocol.toUpperCase() },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '6px 0' }}>
                    <div style={{ fontSize: 11, color: 'var(--wa-text-muted)' }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(2)}>
                Back
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 2, justifyContent: 'center', fontSize: 14, padding: '12px 0' }}
                onClick={handleCreate}
                disabled={!phoneNumber}
              >
                <Plus size={16} /> Create Device
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
