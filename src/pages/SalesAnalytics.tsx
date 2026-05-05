import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import {
  mockSalesMetrics,
  mockSalesHistory,
  mockProfitHistory,
  mockUnitsHistory,
} from '../data/mockData';

type DateRange = '7d' | '14d' | '30d' | '90d';

export default function SalesAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const getSlice = (data: { date: string; value: number }[]) => {
    const days = { '7d': 7, '14d': 14, '30d': 30, '90d': 90 }[dateRange];
    return data.slice(-days);
  };

  const salesData = getSlice(mockSalesHistory);
  const profitData = getSlice(mockProfitHistory);
  const unitsData = getSlice(mockUnitsHistory);

  const combinedData = salesData.map((s, i) => ({
    date: s.date,
    sales: s.value,
    profit: profitData[i]?.value ?? 0,
    units: unitsData[i]?.value ?? 0,
  }));

  const metrics = [
    {
      label: 'Total Sales',
      value: `$${mockSalesMetrics.totalSales.toLocaleString()}`,
      change: 12.5,
      color: 'text-js-orange',
    },
    {
      label: 'Total Profit',
      value: `$${mockSalesMetrics.totalProfit.toLocaleString()}`,
      change: 8.3,
      color: 'text-js-green',
    },
    {
      label: 'Units Sold',
      value: mockSalesMetrics.unitsSold.toLocaleString(),
      change: 5.7,
      color: 'text-js-blue',
    },
    { label: 'ROI', value: `${mockSalesMetrics.roi}%`, change: 2.1, color: 'text-js-purple' },
    {
      label: 'Net Margin',
      value: `${mockSalesMetrics.netMargin}%`,
      change: -1.2,
      color: 'text-js-yellow',
    },
    {
      label: 'PPC Spend',
      value: `$${mockSalesMetrics.ppcSpend.toLocaleString()}`,
      change: -3.8,
      color: 'text-js-red',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-js-text-muted text-sm">
          Track your sales performance and profitability over time
        </p>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-js-text-muted" />
          {(['7d', '14d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                dateRange === range
                  ? 'bg-js-orange text-white'
                  : 'bg-js-card text-js-text-muted hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-js-card border border-js-border rounded-xl p-4 hover:border-js-orange/30 transition-colors"
          >
            <p className="text-js-text-muted text-xs mb-1">{metric.label}</p>
            <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
            <div
              className={`flex items-center gap-1 text-xs mt-1 ${
                metric.change >= 0 ? 'text-js-green' : 'text-js-red'
              }`}
            >
              {metric.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(metric.change)}% vs prev period
            </div>
          </div>
        ))}
      </div>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Sales vs Profit</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={combinedData}>
            <defs>
              <linearGradient id="salesG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f5a623" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="profitG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#27ae60" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#27ae60" stopOpacity={0} />
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
              formatter={(value, name) => [`$${Number(value).toLocaleString()}`, String(name)]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#f5a623"
              fill="url(#salesG)"
              strokeWidth={2}
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#27ae60"
              fill="url(#profitG)"
              strokeWidth={2}
              name="Profit"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-js-card border border-js-border rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Units Sold</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={unitsData.slice(-14)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis
                dataKey="date"
                stroke="#8888aa"
                fontSize={11}
                tickFormatter={(v: string) => v.slice(8)}
              />
              <YAxis stroke="#8888aa" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#1e1e3a', border: '1px solid #2a2a4a', borderRadius: '8px' }}
                formatter={(value) => [Number(value).toLocaleString(), 'Units']}
              />
              <Bar dataKey="value" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-js-card border border-js-border rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">PPC Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
              data={salesData.slice(-14).map((d) => ({
                date: d.date,
                organic: Math.round(d.value * 0.75),
                ppc: Math.round(d.value * 0.25),
                acos: Math.round(Math.random() * 15 + 15),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis
                dataKey="date"
                stroke="#8888aa"
                fontSize={11}
                tickFormatter={(v: string) => v.slice(8)}
              />
              <YAxis yAxisId="left" stroke="#8888aa" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" stroke="#8888aa" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#1e1e3a', border: '1px solid #2a2a4a', borderRadius: '8px' }}
              />
              <Bar yAxisId="left" dataKey="organic" fill="#27ae60" name="Organic" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="ppc" fill="#9b59b6" name="PPC Sales" radius={[2, 2, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="acos"
                stroke="#e74c3c"
                strokeWidth={2}
                dot={false}
                name="ACoS %"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
