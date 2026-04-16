import React, { useState, useEffect } from 'react';
import {
  RefreshCw, Clock, CheckCircle2, XCircle,
  Download, Plus, Eye, Pencil, X,
  Warehouse, ChevronDown, Search, ArrowRight,
} from 'lucide-react';
import { getStockTransfers, type StockTransfer } from '../data/apiService';

// ─── Types ────────────────────────────────────────────────────────────────────

type TransferStatus = 'COMPLETED' | 'IN-TRANSIT' | 'PENDING' | 'CANCELLED';



// ─── Static Data ──────────────────────────────────────────────────────────────



const FILTER_TABS = ['All', 'Pending', 'In Transit', 'Completed', 'Cancelled'];

const PRODUCTS = [
  { id: 'p1', name: 'Paracetamol 500mg',  stock: 820 },
  { id: 'p2', name: 'Amoxicillin 250mg',  stock: 170 },
  { id: 'p3', name: 'Cetirizine 10mg',    stock: 335 },
];

const WAREHOUSES = [
  'Main Warehouse',
  'Central Store',
  'ABC Pharmacy Branch',
  'Retail Outlet #1',
  'Retail Outlet #2',
  'City Hospital',
  'Clinic Branch',
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: TransferStatus }> = ({ status }) => {
  const cfg = {
    COMPLETED:  { cls: 'bg-[var(--color-mint)]/15 text-[var(--color-mint)]',   label: '✓ Completed' },
    'IN-TRANSIT': { cls: 'bg-[#38bdf8]/15 text-[#38bdf8]',                    label: '🚚 In Transit' },
    PENDING:    { cls: 'bg-[#f59e0b]/15 text-[#f59e0b]',                       label: '⏳ Pending'   },
    CANCELLED:  { cls: 'bg-[#ef4444]/15 text-[#ef4444]',                       label: '✗ Cancelled'  },
  }[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
};

// ─── Row Actions ──────────────────────────────────────────────────────────────

const RowActions: React.FC<{ status: TransferStatus }> = ({ status }) => (
  <div className="flex items-center gap-1">
    <button className="p-1.5 rounded-lg hover:bg-[var(--color-mint)]/10 text-[var(--color-text-muted)] hover:text-[var(--color-mint)] transition-colors" title="View">
      <Eye className="w-4 h-4" />
    </button>
    {status === 'IN-TRANSIT' && (
      <button className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#38bdf8]/15 text-[#38bdf8] hover:bg-[#38bdf8]/25 transition-colors">
        Receive
      </button>
    )}
    {status === 'PENDING' && (
      <>
        <button className="p-1.5 rounded-lg hover:bg-[#38bdf8]/10 text-[var(--color-text-muted)] hover:text-[#38bdf8] transition-colors" title="Edit">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--color-mint)]/15 text-[var(--color-mint)] hover:bg-[var(--color-mint)]/25 transition-colors">
          Approve
        </button>
      </>
    )}
  </div>
);

// ─── New Transfer Drawer ──────────────────────────────────────────────────────

const NewTransferDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [productRows, setProductRows] = useState(
    PRODUCTS.map((p) => ({ ...p, qty: '' }))
  );
  const [productSearch, setProductSearch] = useState('');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        id="drawer-new-transfer"
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 440,
          background: 'var(--color-card-bg)',
          borderLeft: '2px solid var(--color-mint)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <h2 className="text-[16px] font-bold text-[var(--color-text-primary)]">
            New Stock Transfer
          </h2>
          <button
            id="drawer-close-btn"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* From Location */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
              From Location
            </label>
            <div className="relative">
              <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <select
                id="select-from-location"
                defaultValue="Main Warehouse"
                className="w-full appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-9 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
              >
                {WAREHOUSES.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          {/* Arrow divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-mint)' }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* To Location */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
              To Location
            </label>
            <div className="relative">
              <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <select
                id="select-to-location"
                defaultValue="ABC Pharmacy Branch"
                className="w-full appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-9 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
              >
                {WAREHOUSES.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          {/* Transfer Date */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
              Transfer Date
            </label>
            <input
              id="input-transfer-date"
              type="date"
              defaultValue="2026-03-31"
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1.5">
              Notes
            </label>
            <textarea
              id="input-transfer-notes"
              rows={2}
              placeholder="Optional notes..."
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all resize-none"
            />
          </div>

          {/* Products section */}
          <div>
            <label className="block text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
              Products to Transfer
            </label>

            {/* Product search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                id="product-search-input"
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
              />
            </div>

            {/* Product rows */}
            <div className="space-y-2">
              {productRows
                .filter(
                  (p) =>
                    !productSearch ||
                    p.name.toLowerCase().includes(productSearch.toLowerCase())
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                        Stock: {p.stock.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <label className="text-xs text-[var(--color-text-muted)]">Qty:</label>
                      <input
                        id={`qty-${p.id}`}
                        type="number"
                        min={1}
                        max={p.stock}
                        value={p.qty}
                        onChange={(e) =>
                          setProductRows((rows) =>
                            rows.map((r) =>
                              r.id === p.id ? { ...r, qty: e.target.value } : r
                            )
                          )
                        }
                        placeholder="0"
                        className="w-20 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-2 py-1.5 text-sm text-[var(--color-text-primary)] text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
                      />
                    </div>
                  </div>
                ))}
            </div>

            {/* Add product link */}
            <button
              id="btn-add-product"
              className="mt-3 flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-mint)' }}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="px-6 py-4 border-t border-[var(--color-border)] flex gap-3">
          <button
            id="drawer-cancel-btn"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-colors"
          >
            Cancel
          </button>
          <button
            id="drawer-create-btn"
            className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--color-mint)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Create Transfer
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const StockTransfers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showDrawer, setShowDrawer] = useState(false);
  const [transfers, setTransfers] = useState<StockTransfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await getStockTransfers();
      setTransfers(data);
    } catch (err) {
      console.error('Failed to fetch transfers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = transfers.filter((t) => {
    if (activeTab === 'All') return true;
    return t.status.toLowerCase() === activeTab.toLowerCase().replace(' ', '-');
  });

  const metrics = [
    {
      id: 'metric-total',
      icon: RefreshCw,
      label: 'Total Transfers',
      value: transfers.length.toString(),
      sub: null,
      iconBg: 'var(--color-surface-secondary)',
      iconColor: 'var(--color-text-muted)',
      valueColor: 'var(--color-text-primary)',
    },
    {
      id: 'metric-pending',
      icon: Clock,
      label: 'Pending',
      value: transfers.filter(t => t.status === 'PENDING').length.toString(),
      sub: 'Awaiting approval',
      iconBg: 'rgba(245,158,11,0.15)',
      iconColor: '#f59e0b',
      valueColor: '#f59e0b',
    },
    {
      id: 'metric-completed',
      icon: CheckCircle2,
      label: 'Completed',
      value: transfers.filter(t => t.status === 'COMPLETED').length.toString(),
      sub: 'This month',
      iconBg: 'rgba(29,185,122,0.15)',
      iconColor: 'var(--color-mint)',
      valueColor: 'var(--color-mint)',
    },
    {
      id: 'metric-cancelled',
      icon: XCircle,
      label: 'Cancelled',
      value: transfers.filter(t => t.status === 'CANCELLED').length.toString(),
      sub: 'Reversed',
      iconBg: 'rgba(239,68,68,0.15)',
      iconColor: '#ef4444',
      valueColor: '#ef4444',
    },
  ];

  return (
    <>
      <div className="p-4 sm:p-6 space-y-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>Home</span>
          <span>/</span>
          <span
            className="px-2 py-0.5 rounded-md font-medium"
            style={{ background: 'rgba(29,185,122,0.12)', color: 'var(--color-mint)' }}
          >
            Stock Transfers
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h1
              id="stock-transfers-title"
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontSize: 22 }}
            >
              Stock Transfers
            </h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
              Move inventory between warehouses and locations
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              id="btn-export-transfers"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] text-sm text-[var(--color-text-primary)] hover:border-[var(--color-mint)] transition-colors"
            >
              <Download className="w-4 h-4 text-[var(--color-text-muted)]" />
              Export
            </button>
            <button
              id="btn-new-transfer"
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-mint)] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Transfer
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                id={m.id}
                className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: m.iconBg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: m.iconColor }} />
                  </div>
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: m.valueColor }}
                >
                  {m.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">{m.label}</div>
                {m.sub && (
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{m.sub}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  active
                    ? { background: 'var(--color-mint)', color: '#fff' }
                    : {
                        background: 'var(--color-card-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Table Card */}
        <div
          id="transfers-table-card"
          className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
        >
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              48 Stock Transfers
            </h2>
            <div className="relative">
              <select
                id="filter-date-range"
                className="appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] pr-8"
              >
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                  {['Transfer #', 'From', '', 'To', 'Date', 'Items', 'Status', 'Actions'].map(
                    (h, i) => (
                      <th
                        key={i}
                        className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {loading ? (
                  <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-[var(--color-text-secondary)]">
                    <div className="flex justify-center mb-2"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                    Loading transfers...
                  </td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-[var(--color-text-secondary)]"
                    >
                      No transfers found
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-[var(--color-surface-secondary)] transition-colors group"
                    >
                      {/* Transfer # */}
                      <td className="px-5 py-4">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: 'var(--color-mint)' }}
                        >
                          TRF-{t.id}
                        </span>
                      </td>

                      {/* From */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🏭</span>
                          <span className="text-sm text-[var(--color-text-primary)] whitespace-nowrap">
                            {t.fromLocation}
                          </span>
                        </div>
                      </td>

                      {/* Arrow */}
                      <td className="px-2 py-4">
                        <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </td>

                      {/* To */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🏥</span>
                          <span className="text-sm text-[var(--color-text-primary)] whitespace-nowrap">
                            {t.toLocation}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                        {t.date}
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                        {t.items.length} {t.items.length === 1 ? 'item' : 'items'}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={t.status as TransferStatus} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <RowActions status={t.status as TransferStatus} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">
              1–6 of 48 transfers
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] disabled:opacity-40"
              >
                ‹ Prev
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-mint)] bg-[var(--color-mint)] text-white font-semibold">
                1
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] transition-colors">
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Drawer */}
      {showDrawer && <NewTransferDrawer onClose={() => setShowDrawer(false)} />}
    </>
  );
};
