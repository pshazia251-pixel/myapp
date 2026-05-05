import {
  DollarSign,
  TrendingUp,
  Package,
  BarChart3,
  Percent,
  ShoppingCart,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import MetricCard from '../components/MetricCard';
import { mockSalesMetrics, mockSalesHistory, mockTrackedProducts } from '../data/mockData';

const COLORS = ['#f5a623', '#27ae60', '#3498db', '#9b59b6', '#e74c3c'];

const pieData = [
  { name: 'Organic Sales', value: mockSalesMetrics.organicSales },
  { name: 'PPC Sales', value: mockSalesMetrics.ppcSales },
  { name: 'Refunds', value: mockSalesMetrics.refunds },
];

const topProducts = mockTrackedProducts.slice(0, 5);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Sales"
          value={`$${mockSalesMetrics.totalSales.toLocaleString()}`}
          change={12.5}
          icon={<DollarSign className="w-5 h-5 text-js-orange" />}
        />
        <MetricCard
          title="Total Profit"
          value={`$${mockSalesMetrics.totalProfit.toLocaleString()}`}
          change={8.3}
          icon={<TrendingUp className="w-5 h-5 text-js-green" />}
          color="js-green"
        />
        <MetricCard
          title="Units Sold"
          value={mockSalesMetrics.unitsSold.toLocaleString()}
          change={5.7}
          icon={<Package className="w-5 h-5 text-js-blue" />}
          color="js-blue"
        />
        <MetricCard
          title="ROI"
          value={`${mockSalesMetrics.roi}%`}
          change={2.1}
          icon={<BarChart3 className="w-5 h-5 text-js-purple" />}
          color="js-purple"
        />
        <MetricCard
          title="Net Margin"
          value={`${mockSalesMetrics.netMargin}%`}
          change={-1.2}
          icon={<Percent className="w-5 h-5 text-js-yellow" />}
          color="js-yellow"
        />
        <MetricCard
          title="Avg. Price"
          value={`$${mockSalesMetrics.avgSalesPrice}`}
          change={3.4}
          icon={<ShoppingCart className="w-5 h-5 text-js-red" />}
          color="js-red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-js-card border border-js-border rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Sales Overview (Last 90 Days)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mockSalesHistory}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f5a623" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis
                dataKey="date"
                stroke="#8888aa"
                fontSize={11}
                tickFormatter={(v: string) => v.slice(5)}
              />
              <YAxis stroke="#8888aa" fontSize={11} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1e1e3a', border: '1px solid #2a2a4a', borderRadius: '8px' }}
                labelStyle={{ color: '#e0e0f0' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']}
              />
              <Area type="monotone" dataKey="value" stroke="#f5a623" fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-js-card border border-js-border rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1e1e3a', border: '1px solid #2a2a4a', borderRadius: '8px' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-js-text-muted">{item.name}</span>
                </div>
                <span className="text-white font-medium">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Top Tracked Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-js-border">
                <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">Product</th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">Price</th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">Sales/mo</th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">Revenue</th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">BSR</th>
                <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.asin} className="border-b border-js-border/50 hover:bg-js-card-hover transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl} alt="" className="w-10 h-10 rounded-lg bg-js-border object-cover" />
                      <div>
                        <p className="text-white text-sm font-medium truncate max-w-xs">{product.title}</p>
                        <p className="text-js-text-muted text-xs">{product.asin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-white text-sm">${product.price.toFixed(2)}</td>
                  <td className="text-right py-3 px-4 text-white text-sm">{product.monthlySales.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-js-green text-sm font-medium">
                    ${product.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-white text-sm">#{product.bsr.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">
                    <span className="text-js-yellow text-sm">{'★'.repeat(Math.round(product.rating))}</span>
                    <span className="text-js-text-muted text-xs ml-1">{product.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
