import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ProductDatabase from './pages/ProductDatabase';
import ProductTracker from './pages/ProductTracker';
import KeywordScout from './pages/KeywordScout';
import SalesAnalytics from './pages/SalesAnalytics';
import ProfitCalculator from './pages/ProfitCalculator';
import SupplierDatabase from './pages/SupplierDatabase';
import ListingBuilder from './pages/ListingBuilder';
import ReviewAutomation from './pages/ReviewAutomation';
import Settings from './pages/Settings';
import type { Marketplace } from './types';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/product-database': 'Product Database',
  '/product-tracker': 'Product Tracker',
  '/keyword-scout': 'Keyword Scout',
  '/sales-analytics': 'Sales Analytics',
  '/profit-calculator': 'FBA Profit Calculator',
  '/supplier-database': 'Supplier Database',
  '/listing-builder': 'Listing Builder',
  '/review-automation': 'Review Automation',
  '/settings': 'Settings',
};

export default function App() {
  const [marketplace, setMarketplace] = useState<Marketplace>('US');

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-js-dark">
        <Sidebar />
        <div className="flex-1 ml-60">
          <TopBar
            title={pageTitles[window.location.pathname] || 'Jungle Scout'}
            marketplace={marketplace}
            onMarketplaceChange={setMarketplace}
          />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product-database" element={<ProductDatabase />} />
              <Route path="/product-tracker" element={<ProductTracker />} />
              <Route path="/keyword-scout" element={<KeywordScout />} />
              <Route path="/sales-analytics" element={<SalesAnalytics />} />
              <Route path="/profit-calculator" element={<ProfitCalculator />} />
              <Route path="/supplier-database" element={<SupplierDatabase />} />
              <Route path="/listing-builder" element={<ListingBuilder />} />
              <Route path="/review-automation" element={<ReviewAutomation />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
