import { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getTrackedProducts } from '../services/api';
import type { TrackedProduct } from '../types';

type ChartMetric = 'sales' | 'price' | 'rank';

export default function ProductTracker() {
  const [products, setProducts] = useState<TrackedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<TrackedProduct | null>(null);
  const [chartMetric, setChartMetric] = useState<ChartMetric>('sales');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsin, setNewAsin] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getTrackedProducts();
    setProducts(data);
    if (data.length > 0) setSelectedProduct(data[0]);
    setLoading(false);
  };

  const getChartData = (product: TrackedProduct) => {
    switch (chartMetric) {
      case 'sales':
        return product.salesHistory;
      case 'price':
        return product.priceHistory;
      case 'rank':
        return product.rankHistory;
    }
  };

  const getChartColor = () => {
    switch (chartMetric) {
      case 'sales':
        return '#27ae60';
      case 'price':
        return '#f5a623';
      case 'rank':
        return '#3498db';
    }
  };

  const formatValue = (value: number) => {
    switch (chartMetric) {
      case 'sales':
        return `${Math.round(value)} units`;
      case 'price':
        return `$${value.toFixed(2)}`;
      case 'rank':
        return `#${Math.round(value).toLocaleString()}`;
    }
  };

  const groups = [...new Set(products.map((p) => p.group).filter(Boolean))];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-js-text-muted text-sm">Track product performance over time</p>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showAddModal && (
        <div className="bg-js-card border border-js-border rounded-xl p-5">
          <h3 className="text-white font-semibold mb-3">Add Product to Tracker</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter ASIN (e.g., B08N5WRWNW)"
              value={newAsin}
              onChange={(e) => setNewAsin(e.target.value)}
              className="flex-1 bg-js-darker border border-js-border rounded-lg px-4 py-2.5 text-sm text-white focus:border-js-orange outline-none"
            />
            <button
              onClick={() => {
                setShowAddModal(false);
                setNewAsin('');
              }}
              className="px-4 py-2 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg text-sm font-medium"
            >
              Track Product
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-js-darker border border-js-border rounded-lg text-sm text-js-text-muted hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-js-card border border-js-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-js-border">
            <h3 className="text-white font-semibold text-sm">
              Tracked Products ({products.length})
            </h3>
          </div>

          {groups.length > 0 && (
            <div className="flex gap-2 p-3 border-b border-js-border overflow-x-auto">
              <button className="px-3 py-1 rounded-full text-xs bg-js-orange text-white whitespace-nowrap">
                All
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  className="px-3 py-1 rounded-full text-xs bg-js-darker border border-js-border text-js-text-muted whitespace-nowrap hover:border-js-orange/50"
                >
                  {g}
                </button>
              ))}
            </div>
          )}

          <div className="max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-js-text-muted">
                <div className="w-5 h-5 border-2 border-js-orange border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading...
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.asin}
                  onClick={() => setSelectedProduct(product)}
                  className={`p-3 border-b border-js-border/30 cursor-pointer transition-colors ${
                    selectedProduct?.asin === product.asin
                      ? 'bg-js-orange/10 border-l-2 border-l-js-orange'
                      : 'hover:bg-js-card-hover'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-lg bg-js-border object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{product.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-js-green text-xs font-medium">
                          ${product.monthlyRevenue.toLocaleString()}/mo
                        </span>
                        <span className="text-js-text-muted text-xs">
                          {product.monthlySales.toLocaleString()} sales
                        </span>
                      </div>
                      <p className="text-js-text-muted text-xs mt-0.5 font-mono">{product.asin}</p>
                    </div>
                    <button className="p-1 rounded hover:bg-js-red/20 text-js-text-muted hover:text-js-red transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selectedProduct ? (
            <>
              <div className="bg-js-card border border-js-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProduct.imageUrl}
                      alt=""
                      className="w-16 h-16 rounded-xl bg-js-border object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{selectedProduct.title}</h3>
                      <p className="text-js-text-muted text-sm">
                        {selectedProduct.brand} &middot; {selectedProduct.category} &middot;{' '}
                        {selectedProduct.asin}
                      </p>
                      <p className="text-js-text-muted text-xs mt-1">
                        Tracking since {selectedProduct.trackingSince}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Price</p>
                    <p className="text-white font-bold text-lg">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Monthly Sales</p>
                    <p className="text-white font-bold text-lg flex items-center gap-1">
                      {selectedProduct.monthlySales.toLocaleString()}
                      <TrendingUp className="w-4 h-4 text-js-green" />
                    </p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">Revenue/mo</p>
                    <p className="text-js-green font-bold text-lg">
                      ${selectedProduct.monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-js-darker rounded-lg p-3">
                    <p className="text-js-text-muted text-xs">BSR</p>
                    <p className="text-white font-bold text-lg flex items-center gap-1">
                      #{selectedProduct.bsr.toLocaleString()}
                      <TrendingDown className="w-4 h-4 text-js-green" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-js-card border border-js-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Performance History</h3>
                  <div className="flex gap-2">
                    {(['sales', 'price', 'rank'] as const).map((metric) => (
                      <button
                        key={metric}
                        onClick={() => setChartMetric(metric)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                          chartMetric === metric
                            ? 'bg-js-orange text-white'
                            : 'bg-js-darker text-js-text-muted hover:text-white'
                        }`}
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getChartData(selectedProduct)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis
                      dataKey="date"
                      stroke="#8888aa"
                      fontSize={11}
                      tickFormatter={(v: string) => v.slice(5)}
                    />
                    <YAxis stroke="#8888aa" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: '#1e1e3a',
                        border: '1px solid #2a2a4a',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [formatValue(Number(value)), chartMetric]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={getChartColor()}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="bg-js-card border border-js-border rounded-xl p-12 text-center">
              <p className="text-js-text-muted">Select a product to view its tracking data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
