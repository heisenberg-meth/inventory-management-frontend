import React, { useState } from 'react';
import { BarChart3, Package, Users, ShoppingBag, Clock, TrendingUp, Download, Play, X, Check } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Report {
  icon: React.ElementType;
  name: string;
  description: string;
  category: string;
  lastRun: string;
}

const reports: Report[] = [
  { icon: BarChart3, name: 'Inventory Valuation Summary', description: 'Total value of current inventory', category: 'Inventory', lastRun: '2 hours ago' },
  { icon: Package, name: 'Stock Summary', description: 'Overview of stock levels and movements', category: 'Inventory', lastRun: '1 day ago' },
  { icon: Users, name: 'Sales by Customer', description: 'Revenue breakdown by customer', category: 'Sales', lastRun: '3 hours ago' },
  { icon: ShoppingBag, name: 'Sales by Item', description: 'Top selling products analysis', category: 'Sales', lastRun: '5 hours ago' },
  { icon: Users, name: 'Purchase by Vendor', description: 'Purchase analysis by supplier', category: 'Purchases', lastRun: '1 day ago' },
  { icon: Clock, name: 'Inventory Aging', description: 'Age analysis of inventory items', category: 'Inventory', lastRun: '2 days ago' },
  { icon: TrendingUp, name: 'Receivables Summary', description: 'Outstanding customer payments', category: 'Receivables', lastRun: '6 hours ago' },
  { icon: TrendingUp, name: 'Payables Summary', description: 'Outstanding supplier payments', category: 'Payables', lastRun: '6 hours ago' },
  { icon: BarChart3, name: 'Profit & Loss', description: 'P&L statement for selected period', category: 'All', lastRun: '1 day ago' },
];

const salesTrendData = [
  { date: 'Feb 19', sales: 24500, id: '2024-02-19' },
  { date: 'Feb 22', sales: 28200, id: '2024-02-22' },
  { date: 'Feb 25', sales: 31800, id: '2024-02-25' },
  { date: 'Feb 28', sales: 29500, id: '2024-02-28' },
  { date: 'Mar 3', sales: 35200, id: '2024-03-03' },
  { date: 'Mar 6', sales: 38900, id: '2024-03-06' },
  { date: 'Mar 9', sales: 42100, id: '2024-03-09' },
  { date: 'Mar 12', sales: 39800, id: '2024-03-12' },
  { date: 'Mar 15', sales: 45600, id: '2024-03-15' },
  { date: 'Mar 18', sales: 48200, id: '2024-03-18' },
  { date: 'Mar 21', sales: 51300, id: '2024-03-21' },
];

const topProductsData = [
  { product: 'Paracetamol', revenue: 45200, id: 'prod-1' },
  { product: 'Amoxicillin', revenue: 38900, id: 'prod-2' },
  { product: 'Metformin', revenue: 32100, id: 'prod-3' },
  { product: 'Vitamin D3', revenue: 28400, id: 'prod-4' },
  { product: 'Ibuprofen', revenue: 25800, id: 'prod-5' },
];

const TABS = ['All', 'Inventory', 'Sales', 'Purchases', 'Receivables', 'Payables'];

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [runningReport, setRunningReport] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [viewReport, setViewReport] = useState<Report | null>(null);
  const [dateRange, setDateRange] = useState('last30');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRunReport = (report: Report) => {
    setRunningReport(report.name);
    setTimeout(() => {
      setRunningReport(null);
      setViewReport(report);
    }, 1500);
  };

  const filteredReports = reports.filter(r =>
    activeTab === 'All' || r.category === activeTab || r.category === 'All'
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Inventory': return 'var(--color-mint)';
      case 'Sales': return 'var(--color-info)';
      case 'Purchases': return 'var(--color-warning)';
      case 'Receivables': return 'var(--color-danger)';
      case 'Payables': return 'var(--color-danger)';
      default: return 'var(--color-mint)';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">
            Reports
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Detailed analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="thisYear">This Year</option>
          </select>
          <button
            onClick={() => showSuccess("Reports exported successfully!")}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export All</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[var(--color-border)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0 ${
              activeTab === tab
                ? "text-[var(--color-mint)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint)]" />
            )}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report, idx) => {
          const Icon = report.icon;
          const color = getCategoryColor(report.category);
          const isRunning = runningReport === report.name;
          return (
            <div
              key={idx}
              className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6 hover:border-[var(--color-mint)] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--color-text-primary)] mb-1 leading-snug">
                    {report.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {report.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {report.category}
                </span>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Last run: {report.lastRun}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRunReport(report)}
                  disabled={isRunning}
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-mint)] text-white py-2 rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm disabled:opacity-70"
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      Run Report
                    </>
                  )}
                </button>
                <button
                  onClick={() => showSuccess(`${report.name} downloaded!`)}
                  className="p-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-[var(--color-text-secondary)]"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Analytics */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Featured Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
                Sales Trend (Last 30 Days)
              </h3>
              <button
                onClick={() => showSuccess("Chart data exported!")}
                className="text-xs text-[var(--color-mint)] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesTrendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="date"
                  stroke="var(--color-text-muted)"
                  fontSize={11}
                />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-text-primary)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-mint)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-mint)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
                Top Products by Revenue
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  type="number"
                  stroke="var(--color-text-muted)"
                  fontSize={11}
                />
                <YAxis
                  dataKey="product"
                  type="category"
                  stroke="var(--color-text-muted)"
                  fontSize={11}
                  width={75}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-text-primary)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-mint)"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Report Result Modal */}
      {viewReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {viewReport.name}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Generated just now
                </p>
              </div>
              <button
                onClick={() => setViewReport(null)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  {
                    label: "Report Period",
                    value:
                      dateRange === "last7"
                        ? "Last 7 days"
                        : dateRange === "last30"
                          ? "Last 30 days"
                          : dateRange === "last90"
                            ? "Last 90 days"
                            : "This Year",
                  },
                  { label: "Category", value: viewReport.category },
                  { label: "Total Records", value: "1,248" },
                  { label: "Total Value", value: "₹4,52,000" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-b border-[var(--color-border)]"
                  >
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[var(--color-mint-glow)] border border-[var(--color-mint)]/30 rounded-lg">
                <p className="text-sm text-[var(--color-mint)]">
                  ✓ Report generated successfully. Download to view full data.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button
                onClick={() => setViewReport(null)}
                className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showSuccess(`${viewReport.name} downloaded!`);
                  setViewReport(null);
                }}
                className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
