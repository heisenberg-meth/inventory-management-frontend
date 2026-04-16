import React, { useState } from 'react';
import {
  DollarSign, CheckCircle2, Users, Package2, Plus, Search,
  Eye, Pencil, Trash2, X, ChevronDown,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PriceList {
  id: string;
  name: string;
  sub: string;
  type: string;
  typeBg: string;
  typeText: string;
  currency: string;
  discount: string;
  products: string;
  status: "active" | "scheduled" | "inactive";
  validUntil: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const PRICE_LISTS: PriceList[] = [
  {
    id: 'pl-1',
    name: 'Standard Retail',
    sub: 'Default price list',
    type: 'Standard',
    typeBg: 'bg-[var(--color-surface-secondary)]',
    typeText: 'text-[var(--color-text-secondary)]',
    currency: 'INR ₹',
    discount: '0%',
    products: '1,284',
    status: 'active',
    validUntil: 'No expiry',
  },
  {
    id: 'pl-2',
    name: 'Hospital Bulk',
    sub: 'For hospitals & clinics',
    type: 'Percentage',
    typeBg: 'bg-[var(--color-mint)]/10',
    typeText: 'text-[var(--color-mint)]',
    currency: 'INR ₹',
    discount: '15% off',
    products: '842',
    status: 'active',
    validUntil: 'Dec 2026',
  },
  {
    id: 'pl-3',
    name: 'Pharmacy Chain',
    sub: 'Chain pharmacy pricing',
    type: 'Fixed Price',
    typeBg: 'bg-[#38bdf8]/10',
    typeText: 'text-[#38bdf8]',
    currency: 'INR ₹',
    discount: 'Custom',
    products: '623',
    status: 'active',
    validUntil: 'Jun 2026',
  },
  {
    id: 'pl-4',
    name: 'Government Supply',
    sub: 'Govt. tender pricing',
    type: 'Percentage',
    typeBg: 'bg-[#f59e0b]/10',
    typeText: 'text-[#f59e0b]',
    currency: 'INR ₹',
    discount: '25% off',
    products: '290',
    status: 'active',
    validUntil: 'Mar 2026',
  },
  {
    id: 'pl-5',
    name: 'Seasonal Offer',
    sub: 'Summer discount',
    type: 'Percentage',
    typeBg: 'bg-[#a78bfa]/10',
    typeText: 'text-[#a78bfa]',
    currency: 'INR ₹',
    discount: '10% off',
    products: '156',
    status: 'scheduled',
    validUntil: 'May 2026',
  },
  {
    id: 'pl-6',
    name: 'Clearance Sale',
    sub: 'Expiry clearance',
    type: 'Percentage',
    typeBg: 'bg-[#f97316]/10',
    typeText: 'text-[#f97316]',
    currency: 'INR ₹',
    discount: '40% off',
    products: '23',
    status: 'inactive',
    validUntil: 'Expired',
  },
];

const CUSTOMER_GROUPS = ['All Customers', 'Hospitals', 'Pharmacies', 'Retail'];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: PriceList['status'] }> = ({ status }) => {
  if (status === 'active')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-mint)]/15 text-[var(--color-mint)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)] inline-block" />
        Active
      </span>
    );
  if (status === 'scheduled')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/15 text-[#f59e0b]">
        ⏱ Scheduled
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/15 text-gray-400">
      ● Inactive
    </span>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const NewPriceListModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [priceType, setPriceType] = useState('Standard');
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['All Customers']);

  const toggleGroup = (g: string) => {
    setSelectedGroups((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        id="modal-new-price-list"
        className="w-full max-w-[520px] rounded-2xl p-8 shadow-2xl"
        style={{
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-mint)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[var(--color-text-primary)]">
            Create Price List
          </h2>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Price List Name */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
              Price List Name
            </label>
            <input
              id="input-price-list-name"
              type="text"
              placeholder="e.g. Hospital Bulk Pricing"
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
              Type
            </label>
            <div className="relative">
              <select
                id="select-price-type"
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="w-full appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all pr-9"
              >
                <option>Standard</option>
                <option>Percentage</option>
                <option>Fixed Price</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          {/* Currency + Rounding */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
                Currency
              </label>
              <div className="relative">
                <select
                  id="select-currency"
                  className="w-full appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all pr-9"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
                Rounding
              </label>
              <div className="relative">
                <select
                  id="select-rounding"
                  className="w-full appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all pr-9"
                >
                  <option>No rounding</option>
                  <option>Round up</option>
                  <option>Round down</option>
                  <option>Round nearest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Discount % — only when Percentage */}
          {priceType === 'Percentage' && (
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
                Discount %
              </label>
              <div className="relative">
                <input
                  id="input-discount-pct"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-muted)]">
                  %
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              id="input-description"
              rows={2}
              placeholder="Optional notes..."
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all resize-none"
            />
          </div>

          {/* Valid From / Until */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
                Valid From
              </label>
              <div className="relative">
                <input
                  id="input-valid-from"
                  type="date"
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">
                Valid Until
              </label>
              <div className="relative">
                <input
                  id="input-valid-until"
                  type="date"
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Customer Groups */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-widest">
              Apply To
            </label>
            <div className="flex flex-wrap gap-2">
              {CUSTOMER_GROUPS.map((g) => {
                const active = selectedGroups.includes(g);
                return (
                  <button
                    key={g}
                    id={`group-chip-${g.toLowerCase().replace(' ', '-')}`}
                    onClick={() => toggleGroup(g)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={
                      active
                        ? { background: 'var(--color-mint)', color: '#fff', border: 'none' }
                        : {
                            background: 'var(--color-surface-secondary)',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                          }
                    }
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-7 pt-5 border-t border-[var(--color-border)]">
          <button
            id="modal-cancel-btn"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-colors"
          >
            Cancel
          </button>
          <button
            id="modal-create-btn"
            className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--color-mint)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Create Price List
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export const PriceLists: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered = PRICE_LISTS.filter((pl) => {
    const matchSearch =
      !search ||
      pl.name.toLowerCase().includes(search.toLowerCase()) ||
      pl.sub.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'All Status' || pl.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const chips = [
    {
      id: 'chip-total',
      icon: DollarSign,
      value: '5',
      label: 'Total Price Lists',
      accent: true,
    },
    {
      id: 'chip-active',
      icon: CheckCircle2,
      value: '4',
      label: 'Active Lists',
      accent: true,
    },
    {
      id: 'chip-groups',
      icon: Users,
      value: '3',
      label: 'Customer Groups',
      accent: false,
    },
    {
      id: 'chip-products',
      icon: Package2,
      value: '1,284',
      label: 'Products Covered',
      accent: false,
    },
  ];

  const TABLE_HEADERS = [
    'Name', 'Type', 'Currency', 'Discount', 'Products', 'Status', 'Valid Until', 'Actions',
  ];

  return (
    <>
      <div className="p-4 sm:p-6 space-y-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>Home</span>
          <span>/</span>
          <span
            className="px-2 py-0.5 rounded-md font-medium text-[var(--color-mint)]"
            style={{ background: 'rgba(29,185,122,0.12)' }}
          >
            Price Lists
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h1
              id="price-lists-title"
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontSize: '22px' }}
            >
              Price Lists
            </h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
              Manage custom pricing rules for customers and segments
            </p>
          </div>
          <button
            id="btn-new-price-list"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-mint)] text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Price List
          </button>
        </div>

        {/* Metric Chips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <div
                key={chip.id}
                id={chip.id}
                className="flex items-center gap-3 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl px-5 py-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: chip.accent
                      ? 'rgba(29,185,122,0.15)'
                      : 'var(--color-surface-secondary)',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: chip.accent ? 'var(--color-mint)' : 'var(--color-text-muted)' }}
                  />
                </div>
                <div>
                  <div
                    className="font-bold leading-none mb-0.5"
                    style={{
                      fontSize: '20px',
                      color: chip.accent ? 'var(--color-mint)' : 'var(--color-text-primary)',
                    }}
                  >
                    {chip.value}
                  </div>
                  <div className="text-[12px] text-[var(--color-text-muted)]">{chip.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Card */}
        <div
          id="price-lists-table-card"
          className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
        >
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              All Price Lists
            </h2>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative" style={{ width: 200 }}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  id="search-price-lists"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
                />
              </div>
              {/* Status filter */}
              <div className="relative">
                <select
                  id="filter-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] pr-8"
                >
                  <option>All Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-[var(--color-text-secondary)]"
                    >
                      No price lists found
                    </td>
                  </tr>
                ) : (
                  filtered.map((pl) => (
                    <tr
                      key={pl.id}
                      className="hover:bg-[var(--color-surface-secondary)] transition-colors group"
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {pl.name}
                        </div>
                        <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">
                          {pl.sub}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${pl.typeBg} ${pl.typeText}`}
                        >
                          {pl.type}
                        </span>
                      </td>

                      {/* Currency */}
                      <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                        {pl.currency}
                      </td>

                      {/* Discount */}
                      <td className="px-5 py-4 text-sm font-medium text-[var(--color-text-primary)]">
                        {pl.discount}
                      </td>

                      {/* Products */}
                      <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                        {pl.products}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={pl.status} />
                      </td>

                      {/* Valid Until */}
                      <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                        {pl.validUntil === 'Expired' ? (
                          <span className="text-[#ef4444]">{pl.validUntil}</span>
                        ) : (
                          pl.validUntil
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            id={`btn-view-${pl.id}`}
                            className="p-1.5 rounded-lg hover:bg-[var(--color-mint)]/10 text-[var(--color-text-muted)] hover:text-[var(--color-mint)] transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            id={`btn-edit-${pl.id}`}
                            className="p-1.5 rounded-lg hover:bg-[#38bdf8]/10 text-[var(--color-text-muted)] hover:text-[#38bdf8] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            id={`btn-delete-${pl.id}`}
                            className="p-1.5 rounded-lg hover:bg-[#ef4444]/10 text-[var(--color-text-muted)] hover:text-[#ef4444] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
              1–{filtered.length} of {filtered.length} price lists
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] disabled:opacity-40"
              >
                ‹ Prev
              </button>
              <button
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-mint)] bg-[var(--color-mint)] text-white font-semibold"
              >
                1
              </button>
              <button
                disabled
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] disabled:opacity-40"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <NewPriceListModal onClose={() => setShowModal(false)} />}
    </>
  );
};
