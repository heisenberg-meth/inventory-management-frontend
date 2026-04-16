import React, { useState, useEffect } from 'react';
import { Plus, Eye, Printer, X, Search, ChevronDown, Download, Edit2, ArrowRight } from 'lucide-react';
import { getBills, type BillItem } from '../data/apiService';

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  Draft:   { label: '📝 Draft',   cls: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border)]' },
  Unpaid:  { label: '⏳ Unpaid',  cls: 'bg-[var(--color-warning)] text-white' },
  Partial: { label: '◑ Partial',  cls: 'bg-[var(--color-warning)] text-white' },
  Paid:    { label: '✓ Paid',     cls: 'bg-[var(--color-mint)] text-white' },
  Overdue: { label: '⚠ Overdue', cls: 'bg-[var(--color-danger)] text-white' },
};

const ACTIONS_FOR_STATUS: Record<string, string[]> = {
  Draft:   ['view', 'edit', 'confirm'],
  Unpaid:  ['view', 'edit', 'pay'],
  Overdue: ['view', 'pay_urgent'],
  Paid:    ['view', 'print'],
  Partial: ['view', 'pay_balance'],
};

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const Bills: React.FC = () => {
  const [bills, setBills] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Bills');
  const [search, setSearch] = useState('');
  const [isNewBillModalOpen, setIsNewBillModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setBills(await getBills());
      } catch (err) {
        console.error('Failed to fetch bills:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = bills.filter(b => {
    const matchTab = activeTab === 'All Bills' || b.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || b.supplier.toLowerCase().includes(q) || b.id.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const total      = bills.length;
  const paidAmt    = bills.filter(b => b.status === 'Paid').reduce((s, b) => s + b.amount, 0);
  const unpaidAmt  = bills.filter(b => b.status === 'Unpaid' || b.status === 'Partial').reduce((s, b) => s + b.amount, 0);
  const overdueAmt = bills.filter(b => b.status === 'Overdue').reduce((s, b) => s + b.amount, 0);

  const tabs = ['All Bills', 'Draft', 'Unpaid', 'Partial', 'Paid', 'Overdue'];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)] leading-tight flex items-center gap-2">
            Bills
          </h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-1">Manage supplier invoices and payables</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-surface-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsNewBillModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white font-medium rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Bill
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '💰', title: 'Total Bills',  value: total,                                                                         sub: 'This month',    color: 'text-[var(--color-text-muted)]'  },
          { icon: '✅', title: 'Paid',          value: bills.filter(b => b.status === 'Paid').length,                                  sub: fmt(paidAmt),    color: 'text-[var(--color-mint)]'        },
          { icon: '⏳', title: 'Unpaid',        value: bills.filter(b => b.status === 'Unpaid' || b.status === 'Partial').length,      sub: fmt(unpaidAmt),  color: 'text-[var(--color-warning)]'     },
          { icon: '⚠',  title: 'Overdue',       value: bills.filter(b => b.status === 'Overdue').length,                              sub: fmt(overdueAmt), color: 'text-[var(--color-danger)]'      },
        ].map((metric, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)]">{metric.title}</div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{metric.value}</div>
            <div className={`text-xs font-medium ${i === 0 ? 'text-[var(--color-text-muted)] font-normal' : metric.color}`}>{metric.sub}</div>
          </div>
        ))}
      </div>

      {/* FILTER TABS */}
      <div className="flex overflow-x-auto border-b border-[var(--color-border)] no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-[var(--color-mint)] text-[var(--color-mint)]' 
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BILLS TABLE CARD */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl flex flex-col">
        {/* Table Header Area */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)]">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{filtered.length} Bills</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search supplier..."
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                {['Bill #', 'Supplier', 'Purchase Order', 'Bill Date', 'Due Date', 'Amount', 'Status', 'Actions'].map(col => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-[var(--color-text-muted)]">Loading bills...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-[var(--color-text-muted)]">No bills found</td></tr>
              ) : filtered.map((bill) => {
                const { label: statusLabel, cls: statusClass } = STATUS_CONFIG[bill.status] ?? { label: bill.status, cls: '' };
                const actions = ACTIONS_FOR_STATUS[bill.status] ?? ['view'];
                return (
                  <tr key={bill.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-[var(--color-mint)]">{bill.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-[var(--color-text-primary)]">{bill.supplier}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {bill.po ? (
                        <span className="text-sm text-[var(--color-mint)] hover:underline cursor-pointer">{bill.po}</span>
                      ) : (
                        <span className="text-sm text-[var(--color-text-muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-[var(--color-text-secondary)]">{bill.billDate}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-[var(--color-text-secondary)]">{bill.dueDate}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{fmt(bill.amount)}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-2">
                        <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        {actions.includes('edit') && (
                          <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {actions.includes('print') && (
                          <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="Print">
                            <Printer className="w-4 h-4" />
                          </button>
                        )}
                        {actions.includes('pay') && (
                          <button className="text-sm font-medium text-[var(--color-mint)] hover:underline transition-colors whitespace-nowrap">Pay Now</button>
                        )}
                        {actions.includes('pay_urgent') && (
                          <button className="text-sm font-medium text-[var(--color-danger)] hover:underline transition-colors whitespace-nowrap">Pay Now</button>
                        )}
                        {actions.includes('pay_balance') && (
                          <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-mint)] transition-colors whitespace-nowrap">
                            <Plus className="w-3 h-3" /> Pay Balance
                          </button>
                        )}
                        {actions.includes('confirm') && (
                          <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-mint)] transition-colors whitespace-nowrap pl-1">
                            <ArrowRight className="w-3.5 h-3.5" /> Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[var(--color-border)] flex items-center justify-end">
          <span className="text-sm text-[var(--color-text-muted)]">{filtered.length} of {total}</span>
        </div>
      </div>

      {/* NEW BILL MODAL */}
      {isNewBillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-mint)] rounded-[16px] w-full max-w-[540px] shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-[32px] pb-4 border-b border-[var(--color-border)] shrink-0">
              <h2 className="text-[18px] font-bold text-[var(--color-text-primary)]">Create New Bill</h2>
              <button 
                onClick={() => setIsNewBillModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-[32px] py-6 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Supplier */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Supplier</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <select defaultValue="" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] appearance-none">
                      <option disabled value="">Search supplier...</option>
                      <option>MedSupply Co.</option>
                      <option>PharmaDist Ltd.</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
                  </div>
                </div>

                {/* Purchase Order */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Purchase Order (Optional)</label>
                  <div className="relative">
                    <select defaultValue="" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] appearance-none">
                      <option disabled value="">Link to PO...</option>
                      <option>PO-2024-001</option>
                      <option>PO-2024-002</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Bill Date */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Bill Date</label>
                    <input type="date" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                  </div>
                  {/* Due Date */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Due Date</label>
                    <input type="date" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Bill # */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Bill #</label>
                    <input type="text" placeholder="Enter bill number" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                  </div>
                  {/* Currency */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Currency</label>
                    <div className="relative">
                      <select className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] appearance-none">
                        <option>INR ₹</option>
                        <option>USD $</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 pt-2">
                <label className="block text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">ITEMS</label>
                <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border)] rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Description</th>
                        <th className="px-3 py-2 font-medium w-20">Qty</th>
                        <th className="px-3 py-2 font-medium text-right w-24">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)] text-sm">
                      <tr>
                        <td className="px-3 py-2 text-[var(--color-text-primary)]">Paracetamol 500mg × 500 strips</td>
                        <td className="px-3 py-2 text-[var(--color-text-secondary)]">500</td>
                        <td className="px-3 py-2 text-[var(--color-text-primary)] text-right">₹6,250</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-[var(--color-text-primary)]">Amoxicillin 250mg × 200 caps</td>
                        <td className="px-3 py-2 text-[var(--color-text-secondary)]">200</td>
                        <td className="px-3 py-2 text-[var(--color-text-primary)] text-right">₹7,600</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                    <button className="text-sm font-medium text-[var(--color-mint)] hover:underline flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="bg-[var(--color-surface-secondary)] rounded-[10px] p-4 font-medium flex flex-col items-end space-y-2 border border-[var(--color-border)]">
                <div className="flex justify-between w-48 text-sm text-[var(--color-text-secondary)]">
                  <span>Subtotal:</span>
                  <span className="text-[var(--color-text-primary)]">₹13,850</span>
                </div>
                <div className="flex justify-between w-48 text-sm text-[var(--color-text-secondary)]">
                  <span>Tax (18%):</span>
                  <span className="text-[var(--color-text-primary)]">₹2,493</span>
                </div>
                <div className="w-48 h-px bg-[var(--color-border)] my-1 relative right-0" />
                <div className="flex justify-between w-48">
                  <span className="text-sm text-[var(--color-text-secondary)] mt-1">Total:</span>
                  <span className="text-[18px] font-bold text-[var(--color-mint)]">₹16,343</span>
                </div>
              </div>

              {/* Notes Context */}
              <div className="space-y-1.5 pb-2">
                <textarea 
                  rows={2} 
                  placeholder="Notes" 
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] resize-none"
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-[32px] py-6 border-t border-[var(--color-border)] bg-[var(--color-card-bg)] rounded-b-[16px] flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsNewBillModalOpen(false)}
                className="px-4 py-2 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors text-sm"
              >
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-[var(--color-mint)] text-white font-medium rounded-lg hover:bg-[var(--color-mint-hover)] shadow-sm shadow-[var(--color-mint)]/20 transition-all text-sm">
                Confirm Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
