import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { searchProducts } from '../services/api';
import { amazonCategories } from '../data/mockData';
import type { Product, FilterState, Marketplace } from '../types';

const defaultFilters: FilterState = {
  categories: [],
  minPrice: 0,
  maxPrice: 500,
  minRevenue: 0,
  maxRevenue: 1000000,
  minSales: 0,
  maxSales: 50000,
  minReviews: 0,
  maxReviews: 100000,
  minRating: 0,
  maxRating: 5,
  sellerType: [],
  marketplace: 'US',
};

type SortField = 'price' | 'monthlySales' | 'monthlyRevenue' | 'bsr' | 'reviews' | 'rating';

export default function ProductDatabase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [sortField, setSortField] = useState<SortField>('monthlyRevenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchProducts(filters, filters.marketplace as Marketplace);
    setProducts(results);
    setLoading(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedProducts = [...products]
    .filter(
      (p) =>
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.asin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      return (a[sortField] - b[sortField]) * mul;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-js-orange" />
    ) : (
      <ChevronDown className="w-3 h-3 text-js-orange" />
    );
  };

  const toggleCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-js-text-muted text-sm">
            Search through 475M+ products from Amazon&apos;s catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-js-card border border-js-border rounded-lg text-sm hover:border-js-orange/50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-js-card border border-js-border rounded-lg text-sm hover:border-js-orange/50 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-js-card border border-js-border rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Price Range ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Monthly Revenue ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minRevenue || ''}
                  onChange={(e) => setFilters({ ...filters, minRevenue: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxRevenue || ''}
                  onChange={(e) => setFilters({ ...filters, maxRevenue: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Monthly Sales
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minSales || ''}
                  onChange={(e) => setFilters({ ...filters, minSales: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxSales || ''}
                  onChange={(e) => setFilters({ ...filters, maxSales: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Reviews
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minReviews || ''}
                  onChange={(e) => setFilters({ ...filters, minReviews: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxReviews || ''}
                  onChange={(e) => setFilters({ ...filters, maxReviews: +e.target.value })}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {amazonCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filters.categories.includes(cat)
                      ? 'bg-js-orange text-white'
                      : 'bg-js-darker border border-js-border text-js-text-muted hover:border-js-orange/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Seller Type
              </label>
              <div className="flex gap-2">
                {['FBA', 'FBM', 'AMZ'].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sellerType: prev.sellerType.includes(type)
                          ? prev.sellerType.filter((t) => t !== type)
                          : [...prev.sellerType, type],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filters.sellerType.includes(type)
                        ? 'bg-js-orange text-white'
                        : 'bg-js-darker border border-js-border text-js-text-muted hover:border-js-orange/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                Min Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilters({ ...filters, minRating: r })}
                    className={`text-lg ${r <= (filters.minRating || 0) ? 'text-js-yellow' : 'text-js-border'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-6 py-2.5 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Search className="w-4 h-4" />
                Search Products
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
          <input
            type="text"
            placeholder="Filter results by keyword, ASIN, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-js-card border border-js-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-js-orange outline-none"
          />
        </div>
        <span className="text-js-text-muted text-sm">{sortedProducts.length} products found</span>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-js-border bg-js-darker/50">
                <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider w-[300px]">
                  Product
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Price <SortIcon field="price" />
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('monthlySales')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Sales/mo <SortIcon field="monthlySales" />
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('monthlyRevenue')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Revenue <SortIcon field="monthlyRevenue" />
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('bsr')}
                >
                  <div className="flex items-center justify-end gap-1">
                    BSR <SortIcon field="bsr" />
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('reviews')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Reviews <SortIcon field="reviews" />
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Rating <SortIcon field="rating" />
                  </div>
                </th>
                <th className="text-center py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="text-center py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                  LQS
                </th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-js-text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-js-orange border-t-transparent rounded-full animate-spin" />
                      Searching products...
                    </div>
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product) => (
                  <tr
                    key={product.asin}
                    className="border-b border-js-border/30 hover:bg-js-card-hover transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-12 h-12 rounded-lg bg-js-border object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate max-w-[220px]">
                            {product.title}
                          </p>
                          <p className="text-js-text-muted text-xs">
                            {product.brand} &middot; {product.category}
                          </p>
                          <p className="text-js-text-muted text-xs font-mono">{product.asin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 text-white text-sm font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="text-right py-3 px-4 text-white text-sm">
                      {product.monthlySales.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-js-green text-sm font-semibold">
                      ${product.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-white text-sm">
                      #{product.bsr.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-white text-sm">
                      {product.reviews.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-js-yellow text-sm">
                          {'★'.repeat(Math.round(product.rating))}
                        </span>
                        <span className="text-js-text-muted text-xs">{product.rating}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          product.sellerType === 'FBA'
                            ? 'bg-js-orange/15 text-js-orange'
                            : product.sellerType === 'AMZ'
                              ? 'bg-js-blue/15 text-js-blue'
                              : 'bg-js-purple/15 text-js-purple'
                        }`}
                      >
                        {product.sellerType}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            product.lqs >= 8
                              ? 'bg-js-green/20 text-js-green'
                              : product.lqs >= 5
                                ? 'bg-js-yellow/20 text-js-yellow'
                                : 'bg-js-red/20 text-js-red'
                          }`}
                        >
                          {product.lqs}
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
