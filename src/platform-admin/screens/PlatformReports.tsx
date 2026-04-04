import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown,
  Building2, Users, CreditCard, Shield, Calendar
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const revenueData = [
  { month: "Oct", value: 180000 },
  { month: "Nov", value: 210000 },
  { month: "Dec", value: 240000 },
  { month: "Jan", value: 310000 },
  { month: "Feb", value: 370000 },
  { month: "Mar", value: 430000 },
];

const tenantTypeData = [
  { name: 'Pharmacy', value: 45, color: 'var(--pa-teal)' },
  { name: 'Supermarket', value: 25, color: 'var(--pa-blue)' },
  { name: 'Warehouse', value: 18, color: 'var(--pa-amber)' },
  { name: 'Retail', value: 12, color: 'var(--pa-text-light-gray)' },
];

const planData = [
  { plan: 'Free', tenants: 71 },
  { plan: 'Pro', tenants: 43 },
  { plan: 'Enterprise', tenants: 28 },
];

type FilterTab = 'All' | 'Revenue' | 'Tenants' | 'Users' | 'System';

interface ReportCard {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
}

const reportCards: ReportCard[] = [
  { icon: BarChart3, title: 'Revenue Summary', description: 'Monthly revenue across all tenants', badge: 'Revenue', badgeColor: 'bg-[var(--pa-mint)]/10 text-[var(--pa-mint)]' },
  { icon: Building2, title: 'Tenant Growth', description: 'New tenant signups over time', badge: 'Tenants', badgeColor: 'bg-[var(--pa-blue)]/10 text-[var(--pa-blue)]' },
  { icon: Users, title: 'User Activity', description: 'Login and activity patterns', badge: 'Users', badgeColor: 'bg-purple-500/10 text-purple-500' },
  { icon: CreditCard, title: 'Payment Analytics', description: 'Success, failure, pending rates', badge: 'Revenue', badgeColor: 'bg-[var(--pa-mint)]/10 text-[var(--pa-mint)]' },
  { icon: Shield, title: 'Audit Summary', description: 'Top actions and events log', badge: 'System', badgeColor: 'bg-[var(--pa-border)] text-[var(--pa-text-muted)]' },
  { icon: TrendingUp, title: 'Churn Analysis', description: 'Tenant retention and churn trends', badge: 'Tenants', badgeColor: 'bg-[var(--pa-blue)]/10 text-[var(--pa-blue)]' },
];

const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

export const PlatformReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const tabs: FilterTab[] = ['All', 'Revenue', 'Tenants', 'Users', 'System'];

  const filteredCards = activeTab === 'All'
    ? reportCards
    : reportCards.filter((c) => c.badge === activeTab);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--pa-mint)] shadow-[0_0_8px_rgba(29,185,122,0.4)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--pa-text-muted)]">PLATFORM ANALYTICS</span>
          </div>
          <h1 className="text-[36px] font-extrabold text-[var(--pa-text-near-black)] leading-tight tracking-tight">Reports</h1>
          <p className="text-[15px] font-medium text-[var(--pa-text-muted)] mt-2 max-w-2xl leading-relaxed opacity-85">
            Platform-wide analytics and business intelligence.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="h-[46px] px-6 border border-[var(--pa-border)] text-[var(--pa-text-near-black)] rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] hover:border-[var(--pa-teal)] hover:text-[var(--pa-teal)] transition-all flex items-center gap-2 transition-colors">
            <Calendar className="w-4 h-4" />
            SCHEDULE REPORT
          </button>
          <button className="h-[46px] px-8 bg-[var(--pa-teal)] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            EXPORT ALL
          </button>
        </div>
      </div>

      {/* ━━━ FILTER PILLS ROW ━━━ */}
      <div className="flex items-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-[36px] px-5 rounded-[20px] text-[12px] font-[700] uppercase tracking-[0.06em] transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[var(--pa-teal)] text-white shadow-md shadow-[#0d6e5a]/15'
                : 'bg-[var(--pa-card-bg)] border border-[var(--pa-border)] text-[var(--pa-text-near-black)] hover:border-[var(--pa-teal)] hover:text-[var(--pa-teal)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ━━━ TOP METRIC ROW (4 cards) ━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Platform GMV', value: '₹92L', change: '↑ 24% this quarter', up: true, color: 'text-[var(--pa-mint)]' },
          { label: 'Total Tenants', value: '142', change: 'Active businesses', up: null, color: 'text-[var(--pa-teal)]' },
          { label: 'Avg Revenue/Tenant', value: '₹3,003', change: 'Per month', up: null, color: 'text-[var(--pa-text-near-black)]' },
          { label: 'Churn Rate', value: '1.4%', change: '↓ 0.3% improvement', up: false, color: 'text-[var(--pa-mint)]' },
        ].map((m, i) => (
          <div key={i} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-[12px] font-medium text-[var(--pa-text-muted)] mb-2 uppercase tracking-wider">{m.label}</div>
            <div className={`text-[28px] font-bold ${m.color}`}>{m.value}</div>
            <div className={`text-[12px] font-semibold mt-1 flex items-center gap-1 ${
              m.up === true ? 'text-[var(--pa-mint)]' : m.up === false ? 'text-[var(--pa-mint)]' : 'text-[var(--pa-text-muted)]'
            }`}>
              {m.up === true && <TrendingUp className="w-3 h-3" />}
              {m.up === false && <TrendingDown className="w-3 h-3" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* ━━━ CHARTS ROW (3 columns) ━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* LEFT — Monthly Revenue */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[14px] font-bold text-[var(--pa-text-near-black)] mb-1">Monthly Revenue</h3>
          <p className="text-[11px] text-[var(--pa-text-muted)] mb-4">Last 6 months trend</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--pa-teal)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--pa-teal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pa-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--pa-text-light-gray)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--pa-text-light-gray)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                <Tooltip
                  formatter={(value: unknown) => [formatCurrency(typeof value === 'number' ? value : 0), 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'var(--pa-card-bg)',
                    borderRadius: 8, 
                    border: '1px solid var(--pa-border)', 
                    fontSize: 12,
                    color: 'var(--pa-text-near-black)'
                  }}
                  itemStyle={{ color: 'var(--pa-text-near-black)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--pa-mint)" strokeWidth={2.5} fill="url(#revGradient)" dot={{ r: 3, fill: 'var(--pa-mint)', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CENTER — Tenant Type Breakdown */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex flex-col items-center">
          <h3 className="text-[14px] font-bold text-[var(--pa-text-near-black)] mb-1 self-start">Tenant Type Breakdown</h3>
          <p className="text-[11px] text-[var(--pa-text-muted)] mb-4 self-start">Distribution by business type</p>
          <div className="h-[130px] w-[130px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tenantTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {tenantTypeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color.startsWith('var') ? `url(#color-${index})` : entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: unknown, name: unknown) => [`${String(value)}%`, String(name || '')]}
                  contentStyle={{ 
                    backgroundColor: 'var(--pa-card-bg)',
                    borderRadius: 8, 
                    border: '1px solid var(--pa-border)', 
                    fontSize: 12,
                    color: 'var(--pa-text-near-black)'
                  }}
                  itemStyle={{ color: 'var(--pa-text-near-black)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom legends to handle variable colors better */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full">
            {tenantTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color.startsWith('var') ? `var(${item.color.match(/var\(([^)]+)\)/)?.[1] || ''})` : item.color }} />
                <span className="text-[11px] text-[var(--pa-text-muted)] font-medium">{item.name}</span>
                <span className="text-[11px] font-bold text-[var(--pa-text-near-black)] ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Plan Distribution */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[14px] font-bold text-[var(--pa-text-near-black)] mb-1">Plan Distribution</h3>
          <p className="text-[11px] text-[var(--pa-text-muted)] mb-4">Tenants by subscription plan</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pa-border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--pa-text-light-gray)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="plan" tick={{ fontSize: 12, fill: 'var(--pa-text-near-black)', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  formatter={(value: unknown) => [`${String(value)} tenants`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'var(--pa-card-bg)',
                    borderRadius: 8, 
                    border: '1px solid var(--pa-border)', 
                    fontSize: 12,
                    color: 'var(--pa-text-near-black)'
                  }}
                  itemStyle={{ color: 'var(--pa-text-near-black)' }}
                />
                <Bar dataKey="tenants" fill="var(--pa-teal)" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ━━━ REPORT CARDS GRID (3×2) ━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm hover:border-[var(--pa-teal)] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-[var(--pa-blue-gray-bg)] flex items-center justify-center group-hover:bg-[var(--pa-teal)]/10 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--pa-text-muted)] group-hover:text-[var(--pa-teal)] transition-colors" />
                </div>
                <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <h4 className="text-[15px] font-bold text-[var(--pa-text-near-black)] mb-1 group-hover:text-[var(--pa-teal)] transition-colors">{card.title}</h4>
              <p className="text-[13px] text-[var(--pa-text-muted)]">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
