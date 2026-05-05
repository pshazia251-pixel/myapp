import { useState } from 'react';
import { Key, Globe, Bell, User, Shield, Save } from 'lucide-react';

export default function Settings() {
  const [apiKeyName, setApiKeyName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiType, setApiType] = useState<'junglescout' | 'cobalt'>('junglescout');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    rankAlerts: true,
    reviewAlerts: false,
    weeklyReport: true,
  });

  const handleSaveApi = () => {
    if (apiKeyName && apiKey) {
      localStorage.setItem(
        'js_api_config',
        JSON.stringify({ keyName: apiKeyName, apiKey, apiType })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-js-orange" />
          API Configuration
        </h3>
        <p className="text-js-text-muted text-sm mb-4">
          Connect your JungleScout API key to get real-time data. Get your API key from{' '}
          <a
            href="https://developer.junglescout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-js-orange hover:underline"
          >
            developer.junglescout.com
          </a>
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
              API Key Name
            </label>
            <input
              type="text"
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              placeholder="Your API key name"
              className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-2.5 text-sm text-white focus:border-js-orange outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Your API key"
              className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-2.5 text-sm text-white focus:border-js-orange outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
              API Type
            </label>
            <div className="flex gap-2">
              {(['junglescout', 'cobalt'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setApiType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    apiType === type
                      ? 'bg-js-orange text-white'
                      : 'bg-js-darker text-js-text-muted hover:text-white'
                  }`}
                >
                  {type === 'junglescout' ? 'Jungle Scout (JS)' : 'Cobalt (Enterprise)'}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSaveApi}
            className="flex items-center gap-2 px-4 py-2 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save API Key'}
          </button>
        </div>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-js-blue" />
          Default Marketplace
        </h3>
        <select className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-2.5 text-sm text-white focus:border-js-orange outline-none">
          <option value="US">🇺🇸 United States</option>
          <option value="UK">🇬🇧 United Kingdom</option>
          <option value="DE">🇩🇪 Germany</option>
          <option value="CA">🇨🇦 Canada</option>
          <option value="FR">🇫🇷 France</option>
          <option value="IT">🇮🇹 Italy</option>
          <option value="ES">🇪🇸 Spain</option>
          <option value="JP">🇯🇵 Japan</option>
          <option value="IN">🇮🇳 India</option>
          <option value="AU">🇦🇺 Australia</option>
        </select>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-js-yellow" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-js-text group-hover:text-white transition-colors capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setNotifications({ ...notifications, [key]: e.target.checked })
                }
                className="w-4 h-4 rounded border-js-border bg-js-darker accent-js-orange"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-js-purple" />
          Account
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-js-text-muted">
            Plan: <span className="text-js-orange font-medium">Professional</span>
          </p>
          <p className="text-js-text-muted">
            API Calls Today: <span className="text-white font-medium">247 / 500</span>
          </p>
          <p className="text-js-text-muted">
            Tracked Products: <span className="text-white font-medium">15 / 150</span>
          </p>
        </div>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-js-green" />
          Data &amp; Privacy
        </h3>
        <div className="space-y-3">
          <button className="text-sm text-js-text-muted hover:text-white transition-colors">
            Export All Data
          </button>
          <br />
          <button className="text-sm text-js-red hover:text-js-red/80 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
