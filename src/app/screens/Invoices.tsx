import React, { useState } from 'react';
import { FileText, Printer, Download, X, Eye } from 'lucide-react';
import { SALES_ORDERS } from '../data/mockData';

const statusColor = (s: string) => {
  switch (s) {
    case 'Paid': return 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]';
    case 'Pending': return 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]';
    case 'Refunded': return 'bg-[var(--color-info)]/20 text-[var(--color-info)]';
    default: return '';
  }
};

const MOCK_INVOICE_ITEMS = [
  { name: 'Paracetamol 500mg', qty: 50, unit: 'Strip', rate: 45, amount: 2250 },
  { name: 'Amoxicillin 250mg', qty: 20, unit: 'Strip', rate: 120, amount: 2400 },
  { name: 'Vitamin D3 60K', qty: 30, unit: 'Box', rate: 55, amount: 1650 },
];

export const Invoices: React.FC = () => {
  const [viewingInvoice, setViewingInvoice] = useState<typeof SALES_ORDERS[number] | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const invoices = SALES_ORDERS.filter(o => o.paymentStatus !== 'Refunded' || filter !== 'Paid');

  const filtered = invoices.filter(inv => {
    const matchSearch = !search || inv.id.toLowerCase().includes(search.toLowerCase()) || inv.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || inv.paymentStatus === filter;
    return matchSearch && matchFilter;
  });

  const subtotal = MOCK_INVOICE_ITEMS.reduce((a, i) => a + i.amount, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Invoices</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">View and manage billing invoices</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Invoices', value: invoices.length },
          { label: 'Paid', value: invoices.filter(i => i.paymentStatus === 'Paid').length },
          { label: 'Pending Payment', value: invoices.filter(i => i.paymentStatus === 'Pending').length },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]">
          <option>All</option><option>Paid</option><option>Pending</option>
        </select>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['Invoice #', 'Customer', 'Date', 'Amount', 'Payment', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[var(--color-mint)]" />
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">INV-{inv.id.split('-').pop()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{inv.customer}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{inv.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]">₹{inv.total.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(inv.paymentStatus)}`}>{inv.paymentStatus}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setViewingInvoice(inv)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded hover:bg-[var(--color-info)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded hover:bg-[var(--color-warning)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-warning)] transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {viewingInvoice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-card-bg)] z-10">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Invoice Preview</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">
                  <Printer className="w-3.5 h-3.5" />Print
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-mint)] text-white rounded-lg text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                  <Download className="w-3.5 h-3.5" />PDF
                </button>
                <button onClick={() => setViewingInvoice(null)} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-mint)] flex items-center justify-center text-white font-bold text-sm">PI</div>
                    <span className="font-bold text-lg text-[var(--color-text-primary)]">Pharmacy Inc</span>
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)] space-y-0.5">
                    <div>123, Main Street, Mumbai, MH 400001</div>
                    <div>admin@pharmacy.in | +91 22 1234 5678</div>
                    <div>GSTIN: 27AABCP1234A1Z5</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--color-mint)]">INVOICE</div>
                  <div className="text-sm font-semibold text-[var(--color-text-primary)] mt-1">INV-{viewingInvoice.id.split('-').pop()}</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">Date: {viewingInvoice.date}</div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium mt-2 inline-block ${statusColor(viewingInvoice.paymentStatus)}`}>{viewingInvoice.paymentStatus}</span>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-[var(--color-surface-secondary)] rounded-lg p-4">
                <div className="text-xs text-[var(--color-text-muted)] mb-1">BILL TO</div>
                <div className="font-semibold text-[var(--color-text-primary)]">{viewingInvoice.customer}</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">procurement@{viewingInvoice.customer.toLowerCase().replace(/\s/g, '')}.in</div>
              </div>

              {/* Items */}
              <div>
                <table className="w-full">
                  <thead className="bg-[var(--color-surface-secondary)]">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Item</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Qty</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Rate</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {MOCK_INVOICE_ITEMS.map((item, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2.5 text-sm text-[var(--color-text-primary)]">{item.name}</td>
                        <td className="px-3 py-2.5 text-sm text-[var(--color-text-secondary)] text-right">{item.qty} {item.unit}</td>
                        <td className="px-3 py-2.5 text-sm text-[var(--color-text-secondary)] text-right">₹{item.rate}</td>
                        <td className="px-3 py-2.5 text-sm font-medium text-[var(--color-text-primary)] text-right">₹{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-[var(--color-border)] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="font-medium text-[var(--color-text-primary)]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">GST (18%)</span>
                  <span className="font-medium text-[var(--color-text-primary)]">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-[var(--color-border)] pt-2 mt-2">
                  <span className="text-[var(--color-text-primary)]">Total</span>
                  <span className="text-[var(--color-mint)]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
                Terms: Payment due within 30 days. Bank: HDFC Bank | Account: 12345678901234 | IFSC: HDFC0001234
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
