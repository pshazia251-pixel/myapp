import { Bell, HelpCircle, Globe, User } from 'lucide-react';
import { useState } from 'react';
import type { Marketplace } from '../types';

const marketplaces: { code: Marketplace; name: string; flag: string }[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

interface TopBarProps {
  title: string;
  marketplace: Marketplace;
  onMarketplaceChange: (m: Marketplace) => void;
}

export default function TopBar({ title, marketplace, onMarketplaceChange }: TopBarProps) {
  const [showMarketplaces, setShowMarketplaces] = useState(false);
  const current = marketplaces.find((m) => m.code === marketplace)!;

  return (
    <header className="h-14 bg-js-darker/80 backdrop-blur-sm border-b border-js-border flex items-center justify-between px-6 sticky top-0 z-40">
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowMarketplaces(!showMarketplaces)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-js-card border border-js-border hover:border-js-orange/50 transition-colors text-sm"
          >
            <Globe className="w-4 h-4 text-js-text-muted" />
            <span>{current.flag}</span>
            <span className="text-js-text">{current.code}</span>
          </button>

          {showMarketplaces && (
            <div className="absolute right-0 top-full mt-1 bg-js-card border border-js-border rounded-lg shadow-xl py-1 w-48 z-50">
              {marketplaces.map((m) => (
                <button
                  key={m.code}
                  onClick={() => {
                    onMarketplaceChange(m.code);
                    setShowMarketplaces(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-js-card-hover transition-colors ${
                    m.code === marketplace ? 'text-js-orange' : 'text-js-text'
                  }`}
                >
                  <span>{m.flag}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-js-card transition-colors relative">
          <Bell className="w-5 h-5 text-js-text-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-js-red rounded-full" />
        </button>

        <button className="p-2 rounded-lg hover:bg-js-card transition-colors">
          <HelpCircle className="w-5 h-5 text-js-text-muted" />
        </button>

        <button className="w-8 h-8 rounded-full bg-js-orange/20 border border-js-orange/30 flex items-center justify-center">
          <User className="w-4 h-4 text-js-orange" />
        </button>
      </div>
    </header>
  );
}
