import React, { useState, useEffect } from 'react';
import {
  DollarSign, ShoppingCart, Package, Users, Calendar, Download,
  TrendingUp, ChevronDown
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  getDashboardStats, type DashboardKPIs,
  getRevenueTrend, getTopProducts, getCategoryStats, getOrderStatusStats, getQuickStats,
  type RevenueTrendPoint, type TopProduct, type CategoryStat, type OrderStatusStat, type QuickStat,
} from '../data/apiService';

// ─── UI config (not data) ───────────────────────────────────────────────────
const CATEGORY_COLORS = ['#1db97a', '#38bdf8', '#f59e0b', '#a78bfa', '#6b7280'];

const STATUS_BADGE: Record<string, { color: string; badge: string }> = {
  Completed: { color: '#1db97a', badge: 'bg-[#1db97a]/20 text-[#1db97a]' },
  Pending:   { color: '#f59e0b', badge: 'bg-[#f59e0b]/20 text-[#f59e0b]' },
  Overdue:   { color: '#ef4444', badge: 'bg-[#ef4444]/20 text-[#ef4444]' },
  Draft:     { color: '#6b7280', badge: 'bg-gray-500/20 text-gray-400'   },
};

const DATE_PILLS = ['7 Days', '30 Days', '3 Months', '6 Months', '1 Year', 'Custom'];

// ─── Donut chart (pure SVG) ─────────────────────────────────────────────
const DonutChart: React.FC<{ categories: (CategoryStat & { color: string })[] }> = ({ categories }) => {
  const r = 46;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  const segments = categories.map((d, i) => {
    const start = categories.slice(0, i).reduce((sum, item) => sum + item.pct, 0);
    return { ...d, start };
  });

  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      {/* bg track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-surface-secondary)" strokeWidth={14} />
      {segments.map((seg, i) => {
        const rotation = (seg.start / 100) * 360 - 90;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={14}
            strokeDasharray={`${(seg.pct / 100) * circumference} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="butt"
            transform={`rotate(${rotation} ${cx} ${cy})`}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        );
      })}
      {/* center label */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={11} fill="var(--color-text-muted)" fontFamily="inherit">Total</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--color-text-primary)" fontFamily="inherit">100%</text>
    </svg>
  );
};

// ─── Custom Tooltip ─────────────────────────────────────────────────────
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-[var(--color-text-muted)] mb-1">{label}</p>
      <p className="font-bold text-[var(--color-text-primary)]">
        ₹{(payload[0].value / 1000).toFixed(0)}K
      </p>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────
export const Analytics: React.FC = () => {
  const [activePill, setActivePill] = useState('30 Days');
  const [loading, setLoading] = useState(true);
  const [stats, setStats]               = useState<DashboardKPIs | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrendPoint[]>([]);
  const [topProducts, setTopProducts]   = useState<TopProduct[]>([]);
  const [categories, setCategories]     = useState<(CategoryStat & { color: string })[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatusStat[]>([]);
  const [quickStats, setQuickStats]     = useState<QuickStat[]>([]);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [kpis, trend, products, cats, orders, quick] = await Promise.all([
        getDashboardStats(),
        getRevenueTrend(),
        getTopProducts(),
        getCategoryStats(),
        getOrderStatusStats(),
        getQuickStats(),
      ]);
      setStats(kpis);
      setRevenueTrend(trend);
      setTopProducts(products);
      setCategories(cats.map((c, i) => ({ ...c, color: CATEGORY_COLORS[i % CATEGORY_COLORS.length] })));
      setOrderStatuses(orders);
      setQuickStats(quick);
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  const metricCards = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: stats ? `₹${stats.totalRevenue?.toLocaleString()}` : '...',
      change: '↑ 18.4% vs last period',
      accent: true,
      id: 'metric-revenue',
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats ? stats.totalOrders?.toLocaleString() : '...',
      change: '↑ 12.1% vs last period',
      accent: false,
      id: 'metric-orders',
    },
    {
      icon: Package,
      label: 'Low Stock',
      value: stats ? stats.lowStockCount?.toLocaleString() : '...',
      change: '↓ 8.3% vs last period',
      accent: false,
      id: 'metric-products',
    },
    {
      icon: Users,
      label: 'Out of Stock',
      value: stats ? stats.outOfStockCount?.toLocaleString() : '...',
      change: '↑ 5.2% vs last period',
      accent: false,
      id: 'metric-customers',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span>Home</span>
        <span>/</span>
        <span
          className="px-2 py-0.5 rounded-md font-medium text-[var(--color-mint)]"
          style={{ background: 'var(--color-mint-glow, rgba(29,185,122,0.12))' }}
        >
          Analytics
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1
            id="analytics-page-title"
            className="font-bold text-[var(--color-text-primary)]"
            style={{ fontSize: '22px' }}
          >
            Analytics
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
            Business performance insights and trends
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="btn-date-range"
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] hover:border-[var(--color-mint)] transition-colors"
          >
            <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          </button>
          <button
            id="btn-export"
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] hover:border-[var(--color-mint)] transition-colors"
          >
            <Download className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Date Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {DATE_PILLS.map((pill) => (
          <button
            key={pill}
            id={`pill-${pill.replace(' ', '-').toLowerCase()}`}
            onClick={() => setActivePill(pill)}
            className="px-4 py-1.5 text-sm font-medium transition-all"
            style={{
              borderRadius: '20px',
              ...(activePill === pill
                ? { background: 'var(--color-mint)', color: '#fff', border: 'none' }
                : {
                    background: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }),
            }}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              className="bg-[var(--color-card-bg)] border rounded-xl p-5 transition-all hover:shadow-lg"
              style={{
                borderColor: card.accent ? 'var(--color-mint)' : 'var(--color-border)',
                boxShadow: card.accent ? '0 0 0 1px var(--color-mint)' : undefined,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: card.accent
                      ? 'var(--color-mint)'
                      : 'var(--color-surface-secondary)',
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: card.accent ? '#fff' : 'var(--color-text-secondary)' }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-mint)]">
                  <TrendingUp className="w-3 h-3" />
                </div>
              </div>
              <div
                className="font-bold text-[var(--color-text-primary)] mb-0.5"
                style={{ fontSize: '22px' }}
              >
                {card.value}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{card.label}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--color-mint)' }}>
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row — 60/40 split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* LEFT — Revenue Trend (60%) */}
        <div
          id="chart-revenue-trend"
          className="lg:col-span-3 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontSize: '14px' }}>
              Revenue Trend
            </h2>
            <select
              id="revenue-period-select"
              className="text-xs bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--color-mint)]"
            >
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend} margin={{ top: 6, right: 6, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1db97a" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1db97a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--color-text-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-text-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1db97a"
                strokeWidth={2.5}
                fill="url(#mintGrad)"
                dot={{ fill: '#1db97a', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#1db97a', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT — Top Products (40%) */}
        <div
          id="chart-top-products"
          className="lg:col-span-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontSize: '14px' }}>
            Top Products by Revenue
          </h2>
          <div className="space-y-4">
            {topProducts.length === 0 ? (
              <div className="py-6 text-center text-sm text-[var(--color-text-muted)]">
                {loading ? 'Loading…' : 'No data available'}
              </div>
            ) : (() => {
              const max = Math.max(...topProducts.map(p => p.value), 1);
              return topProducts.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[var(--color-text-primary)] truncate pr-2">
                      {p.name}
                    </span>
                    <span
                      className="text-[13px] font-semibold flex-shrink-0"
                      style={{ color: 'var(--color-mint)' }}
                    >
                      ₹{p.value.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{ height: '8px', background: 'var(--color-surface-secondary)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(p.value / max) * 100}%`, background: 'var(--color-mint)' }}
                    />
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Bottom Row — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Sales by Category — Donut */}
        <div
          id="chart-category-donut"
          className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontSize: '14px' }}>
            Sales by Category
          </h2>
          <div className="flex justify-center mb-4">
            <DonutChart categories={categories} />
          </div>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <div className="py-4 text-center text-xs text-[var(--color-text-muted)]">
                {loading ? 'Loading…' : 'No data'}
              </div>
            ) : categories.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: c.color }}
                  />
                  <span className="text-xs text-[var(--color-text-secondary)]">{c.name}</span>
                </div>
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                  {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div
          id="card-order-status"
          className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontSize: '14px' }}>
            Order Status
          </h2>
          <div className="space-y-4">
            {orderStatuses.length === 0 ? (
              <div className="py-6 text-center text-sm text-[var(--color-text-muted)]">
                {loading ? 'Loading…' : 'No data available'}
              </div>
            ) : orderStatuses.map((s, i) => {
              const style = STATUS_BADGE[s.label] ?? { color: '#6b7280', badge: 'bg-gray-500/20 text-gray-400' };
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                      {s.label}
                    </span>
                    <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ lineHeight: 1 }}>
                      {s.count}
                    </span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: '6px', background: 'var(--color-surface-secondary)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, background: style.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div
          id="card-quick-stats"
          className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontSize: '14px' }}>
            Quick Stats
          </h2>
          <div className="divide-y divide-[var(--color-border)]">
            {quickStats.length === 0 ? (
              <div className="py-6 text-center text-sm text-[var(--color-text-muted)]">
                {loading ? 'Loading…' : 'No data available'}
              </div>
            ) : quickStats.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <span className="text-xs text-[var(--color-text-secondary)]">{s.label}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: s.highlight ? 'var(--color-mint)' : 'var(--color-text-primary)' }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
