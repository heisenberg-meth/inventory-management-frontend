import React, { useState } from 'react';
import { Search, Plus, Eye, Pencil, ArrowRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ShipmentStatus = 'Pending' | 'Packed' | 'Shipped' | 'In Transit' | 'Delivered';

interface Shipment {
  id: string;
  shipmentId: string;
  orderId: string;
  customer: string;
  courier: string;
  tracking: string;
  dispatchDate: string;
  status: ShipmentStatus;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const SHIPMENTS: Shipment[] = [
  {
    id: 'shp-1',
    shipmentId: 'SHP-001',
    orderId: 'SO-2024-003',
    customer: 'Stark Industries',
    courier: 'FedEx',
    tracking: 'FX-784521-IN',
    dispatchDate: 'Feb 05, 2026',
    status: 'Shipped',
  },
  {
    id: 'shp-2',
    shipmentId: 'SHP-002',
    orderId: 'SO-2024-002',
    customer: 'Wayne Enterprises',
    courier: 'DHL',
    tracking: 'DH-442891',
    dispatchDate: 'Feb 03, 2026',
    status: 'Packed',
  },
  {
    id: 'shp-3',
    shipmentId: 'SHP-003',
    orderId: 'SO-2024-001',
    customer: 'Acme Corp',
    courier: 'BlueDart',
    tracking: 'BD-991234',
    dispatchDate: 'Feb 01, 2026',
    status: 'Delivered',
  },
  {
    id: 'shp-4',
    shipmentId: 'SHP-004',
    orderId: 'SO-2024-005',
    customer: 'Initech',
    courier: 'DTDC',
    tracking: '—',
    dispatchDate: 'Pending',
    status: 'Pending',
  },
  {
    id: 'shp-5',
    shipmentId: 'SHP-005',
    orderId: 'SO-2024-004',
    customer: 'Globex Corp',
    courier: 'FedEx',
    tracking: 'FX-882341',
    dispatchDate: 'Feb 08, 2026',
    status: 'In Transit',
  },
  {
    id: 'shp-6',
    shipmentId: 'SHP-006',
    orderId: 'SO-2024-006',
    customer: 'Umbrella Corp',
    courier: 'DHL',
    tracking: 'DH-119283',
    dispatchDate: 'Feb 10, 2026',
    status: 'Delivered',
  },
  {
    id: 'shp-7',
    shipmentId: 'SHP-007',
    orderId: 'SO-2024-007',
    customer: 'Cyberdyne Systems',
    courier: 'BlueDart',
    tracking: '—',
    dispatchDate: 'Pending',
    status: 'Pending',
  },
];

const FILTER_TABS = ['All', 'Pending', 'Packed', 'Shipped', 'In Transit', 'Delivered'];

// ─── Components ───────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  switch (status) {
    case 'Pending':
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#f59e0b] text-white">
          ⏳ Pending
        </span>
      );
    case 'Packed':
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-[#f59e0b] border border-[#f59e0b] bg-transparent">
          📦 Packed
        </span>
      );
    case 'Shipped':
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#38bdf8] text-white">
          🚚 Shipped
        </span>
      );
    case 'In Transit':
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-[#38bdf8] bg-transparent">
          🚛 In Transit
        </span>
      );
    case 'Delivered':
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-mint)] text-white">
          ✓ Delivered
        </span>
      );
    default:
      return null;
  }
};

const RowActions: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] transition-colors" title="View">
        <Eye className="w-4 h-4" />
      </button>

      {status === 'Pending' && (
        <>
          <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] transition-colors" title="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 ml-1 px-2 py-1 text-sm font-semibold text-[var(--color-mint)] hover:bg-[var(--color-mint-glow)] rounded-md transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> Pack
          </button>
        </>
      )}

      {status === 'Packed' && (
        <button className="flex items-center gap-1 ml-1 px-2 py-1 text-sm font-semibold text-[var(--color-mint)] hover:bg-[var(--color-mint-glow)] rounded-md transition-colors">
          <ArrowRight className="w-3.5 h-3.5" /> Ship
        </button>
      )}

      {(status === 'Shipped' || status === 'In Transit') && (
        <button className="flex items-center gap-1 ml-1 px-2 py-1 text-sm font-semibold text-[var(--color-mint)] hover:bg-[var(--color-mint-glow)] rounded-md transition-colors">
          <ArrowRight className="w-3.5 h-3.5" /> Mark Delivered
        </button>
      )}
    </div>
  );
};

export const Shipments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = SHIPMENTS.filter((s) => {
    const matchTab = activeTab === 'All' || s.status === activeTab;
    const matchSearch =
      s.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tracking.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span>Home</span>
        <span>/</span>
        <span
          className="px-2 py-0.5 rounded-md font-medium"
          style={{ background: 'var(--color-mint-glow, rgba(29,185,122,0.12))', color: 'var(--color-mint)' }}
        >
          Shipments
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-bold text-[var(--color-text-primary)]" style={{ fontSize: '22px' }}>
            Shipments
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
            Track and manage all outbound shipments
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex-shrink-0">
          <Plus className="w-4 h-4" />
          New Shipment
        </button>
      </div>

      {/* Status Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Pending', count: '3', colorClass: 'text-[#f59e0b]' },
          { label: 'Packed', count: '5', colorClass: 'text-[var(--color-text-primary)]' },
          { label: 'Shipped', count: '8', colorClass: 'text-[#38bdf8]' },
          { label: 'In Transit', count: '6', colorClass: 'text-[#38bdf8]' },
          { label: 'Delivered', count: '24', colorClass: 'text-[var(--color-mint)]' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 text-center transition-all hover:shadow-md"
          >
            <div className="text-[13px] text-[var(--color-text-muted)] mb-1">{stat.label}</div>
            <div className={`text-[28px] font-bold ${stat.colorClass}`}>{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search shipments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
          />
        </div>

        {/* Right: Pill buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {FILTER_TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  active
                    ? { background: 'var(--color-mint)', color: '#fff' }
                    : {
                        background: 'transparent',
                        color: 'var(--color-text-secondary)',
                      }
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shipments Table Card */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
        {/* Card Header */}
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
            46 Shipments
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                <th className="px-5 py-3 whitespace-nowrap">Shipment #</th>
                <th className="px-5 py-3 whitespace-nowrap">Order #</th>
                <th className="px-5 py-3 whitespace-nowrap">Customer</th>
                <th className="px-5 py-3 whitespace-nowrap">Courier</th>
                <th className="px-5 py-3 whitespace-nowrap">Tracking</th>
                <th className="px-5 py-3 whitespace-nowrap">Dispatch Date</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-[var(--color-text-secondary)]">
                    No shipments found matching the criteria
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors group">
                    {/* Shipment # */}
                    <td className="px-5 py-4 text-sm font-semibold" style={{ color: 'var(--color-mint)' }}>
                      {s.shipmentId}
                    </td>
                    {/* Order # */}
                    <td className="px-5 py-4 text-sm font-medium hover:underline cursor-pointer" style={{ color: 'var(--color-mint)' }}>
                      {s.orderId}
                    </td>
                    {/* Customer */}
                    <td className="px-5 py-4 text-sm text-[var(--color-text-primary)] whitespace-nowrap">
                      {s.customer}
                    </td>
                    {/* Courier */}
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                      {s.courier}
                    </td>
                    {/* Tracking */}
                    <td className="px-5 py-4 text-sm text-[var(--color-text-primary)] whitespace-nowrap">
                      {s.tracking}
                    </td>
                    {/* Dispatch Date */}
                    <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                      {s.dispatchDate}
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge status={s.status} />
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-2">
                      <RowActions status={s.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)]">
            1–7 of 46
          </span>
          <div className="flex items-center gap-1">
            <button disabled className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] disabled:opacity-40">
              ‹ Prev
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-mint)] bg-[var(--color-mint)] text-white font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] transition-colors">
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
