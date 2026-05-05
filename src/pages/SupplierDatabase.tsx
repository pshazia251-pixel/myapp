import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { getSuppliers } from '../services/api';
import type { Supplier } from '../types';

export default function SupplierDatabase() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    const data = await getSuppliers();
    setSuppliers(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await getSuppliers(searchQuery || undefined);
    setSuppliers(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-js-text-muted text-sm">
        Find verified suppliers and manufacturers for your products
      </p>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
          <input
            type="text"
            placeholder="Search suppliers by name or product category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-js-card border border-js-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-js-orange outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-2.5 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg font-medium text-sm transition-colors"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-js-card border border-js-border rounded-xl p-12 text-center">
              <div className="w-5 h-5 border-2 border-js-orange border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-js-text-muted">Loading suppliers...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  onClick={() => setSelectedSupplier(supplier)}
                  className={`bg-js-card border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedSupplier?.id === supplier.id
                      ? 'border-js-orange'
                      : 'border-js-border hover:border-js-orange/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{supplier.companyName}</h3>
                        {supplier.verified && (
                          <CheckCircle className="w-4 h-4 text-js-green" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-js-text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {supplier.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {supplier.avgLeadTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-js-yellow" />
                          {supplier.rating}/5.0
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {supplier.productCategories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 bg-js-darker rounded text-xs text-js-text-muted"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-js-text-muted">MOQ</p>
                      <p className="text-white font-semibold">{supplier.minOrderQty}+</p>
                      <p className="text-xs text-js-text-muted mt-1">Response Rate</p>
                      <p className="text-js-green font-semibold text-sm">{supplier.responseRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {selectedSupplier ? (
            <div className="bg-js-card border border-js-border rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Supplier Details</h3>
                <button className="p-1.5 rounded-lg hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium">{selectedSupplier.companyName}</h4>
                  {selectedSupplier.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-js-green mt-1">
                      <CheckCircle className="w-3 h-3" /> Verified Supplier
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Country</p>
                    <p className="text-white font-medium text-sm">{selectedSupplier.country}</p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Lead Time</p>
                    <p className="text-white font-medium text-sm">{selectedSupplier.avgLeadTime}</p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Min Order</p>
                    <p className="text-white font-medium text-sm">{selectedSupplier.minOrderQty} units</p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Response</p>
                    <p className="text-js-green font-medium text-sm">{selectedSupplier.responseRate}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-js-text-muted text-xs uppercase tracking-wider mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-js-yellow text-lg">
                      {'★'.repeat(Math.round(selectedSupplier.rating))}
                    </span>
                    <span className="text-white font-medium">{selectedSupplier.rating}/5.0</span>
                  </div>
                </div>

                <div>
                  <p className="text-js-text-muted text-xs uppercase tracking-wider mb-2">
                    Product Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSupplier.productCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 bg-js-orange/15 text-js-orange rounded text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-js-text-muted text-xs uppercase tracking-wider mb-2">
                    Top Products
                  </p>
                  <ul className="space-y-1">
                    {selectedSupplier.topProducts.map((prod) => (
                      <li key={prod} className="text-sm text-js-text truncate">
                        • {prod}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-2.5 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg font-medium text-sm transition-colors">
                  Contact Supplier
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-js-card border border-js-border rounded-xl p-8 text-center">
              <p className="text-js-text-muted text-sm">Select a supplier to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
