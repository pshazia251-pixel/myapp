import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  LineChart,
  Search,
  BarChart3,
  Calculator,
  Factory,
  FileText,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/product-database', icon: Database, label: 'Product Database' },
  { path: '/product-tracker', icon: LineChart, label: 'Product Tracker' },
  { path: '/keyword-scout', icon: Search, label: 'Keyword Scout' },
  { path: '/sales-analytics', icon: BarChart3, label: 'Sales Analytics' },
  { path: '/profit-calculator', icon: Calculator, label: 'FBA Calculator' },
  { path: '/supplier-database', icon: Factory, label: 'Supplier Database' },
  { path: '/listing-builder', icon: FileText, label: 'Listing Builder' },
  { path: '/review-automation', icon: Star, label: 'Review Automation' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-js-sidebar border-r border-js-border z-50 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-5 border-b border-js-border">
        <div className="w-8 h-8 bg-js-orange rounded-lg flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">
            Jungle<span className="text-js-orange">Scout</span>
          </span>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-js-orange/15 text-js-orange'
                  : 'text-js-text-muted hover:bg-js-card hover:text-js-text'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-js-border p-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2.5 mx-0 rounded-lg text-js-text-muted hover:bg-js-card hover:text-js-text transition-all"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-js-text-muted hover:bg-js-card hover:text-js-text transition-all"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
