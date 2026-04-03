import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Download, Calendar } from 'lucide-react';

const salesData = [
  { month: 'Oct', sales: 185000, purchases: 120000, profit: 65000 },
  { month: 'Nov', sales: 220000, purchases: 145000, profit: 75000 },
  { month: 'Dec', sales: 310000, purchases: 195000, profit: 115000 },
  { month: 'Jan', sales: 245000, purchases: 160000, profit: 85000 },
  { month: 'Feb', sales: 280000, purchases: 175000, profit: 105000 },
  { month: 'Mar', sales: 348000, purchases: 212000, profit: 136000 },
];

const categoryData = [
  { name: 'Pain Relief', value: 32, color: '#1db97a' },
  { name: 'Antibiotics', value: 24, color: '#38bdf8' },
  { name: 'Supplements', value: 18, color: '#f59e0b' },
  { name: 'Diabetes', value: 14, color: '#a78bfa' },
  { name: 'Others', value: 12, color: '#ef4444' },
];

const stockMovement = [
  { day: 'Mon', in: 120, out: 85 },
  { day: 'Tue', in: 180, out: 130 },
  { day: 'Wed', in: 90, out: 110 },
  { day: 'Thu', in: 220, out: 170 },
  { day: 'Fri', in: 150, out: 140 },
  { day: 'Sat', in: 80, out: 60 },
  { day: 'Sun', in: 40, out: 30 },
];

const topProducts = [
  { name: 'Paracetamol 500mg', sales: 1240, revenue: 55800 },
  { name: 'Amoxicillin 250mg', sales: 890, revenue: 106800 },
  { name: 'Vitamin D3 60K', sales: 760, revenue: 41800 },
  { name: 'Metformin 500mg', sales: 680, revenue: 57800 },
  { name: 'Cetirizine 10mg', sales: 540, revenue: 18900 },
];

const CHART_TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: 'var(--color-surface-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-primary)' }
};

export const ReportsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [activeReport, setActiveReport] = useState('Sales');

  const metrics = [
    { label: 'Total Revenue', value: '₹3.48L', change: '+18.2%', up: true, icon: DollarSign, color: 'var(--color-mint)' },
    { label: 'Total Orders', value: '1,248', change: '+12.5%', up: true, icon: ShoppingCart, color: 'var(--color-info)' },
    { label: 'Products Sold', value: '4,110', change: '+8.7%', up: true, icon: Package, color: '#a78bfa' },
    { label: 'New Customers', value: '24', change: '-3.2%', up: false, icon: Users, color: 'var(--color-warning)' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Reports & Analytics</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="bg-transparent text-sm text-[var(--color-text-primary)] focus:outline-none">
              <option>This Week</option><option>This Month</option><option>Last 3 Months</option><option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] text-sm">
            <Download className="w-4 h-4" />Export
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex border-b border-[var(--color-border)] overflow-x-auto">
        {['Sales', 'Inventory', 'Stock Movement', 'Profit/Loss'].map(tab => (
          <button key={tab} onClick={() => setActiveReport(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0 ${activeReport === tab ? 'text-[var(--color-mint)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
            {tab}
            {activeReport === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint)]" />}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${m.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${m.up ? 'text-[var(--color-mint)]' : 'text-[var(--color-danger)]'}`}>
                  {m.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {m.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{m.value}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales vs Purchases */}
        <div className="lg:col-span-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Sales vs Purchases</h3>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-mint)]" /><span className="text-[var(--color-text-secondary)]">Sales</span></div>
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-info)]" /><span className="text-[var(--color-text-secondary)]">Purchases</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Sales']} />
              <Area type="monotone" dataKey="sales" stroke="var(--color-mint)" fill="rgba(29,185,122,0.12)" strokeWidth={2} />
              <Area type="monotone" dataKey="purchases" stroke="var(--color-info)" fill="rgba(56,189,248,0.12)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-5">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={2} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(v) => [`${v}%`, 'Value']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                </div>
                <span className="font-semibold text-[var(--color-text-primary)]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stock Movement */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-5">Weekly Stock Movement</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockMovement} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Bar dataKey="in" fill="var(--color-mint)" radius={[4, 4, 0, 0]} name="Stock In" />
              <Bar dataKey="out" fill="var(--color-danger)" radius={[4, 4, 0, 0]} name="Stock Out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Trend */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-5">Profit Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Profit']} />
              <Line type="monotone" dataKey="profit" stroke="var(--color-warning)" strokeWidth={2.5} dot={{ fill: 'var(--color-warning)', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Top Selling Products</h3>
          <button className="text-sm text-[var(--color-mint)] hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {topProducts.map((product, i) => {
            const maxSales = topProducts[0].sales;
            const pct = (product.sales / maxSales) * 100;
            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">{i + 1}</span>
                    <span className="font-medium text-[var(--color-text-primary)]">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[var(--color-text-secondary)]">{product.sales} units</span>
                    <span className="ml-3 font-semibold text-[var(--color-mint)]">₹{product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--color-mint)] transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
