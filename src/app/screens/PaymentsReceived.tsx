import React, { useState } from 'react';
import { Plus, Eye, Printer, X, ChevronDown, Calendar } from 'lucide-react';

const MOCK_PAYMENTS = [
  { id: 'PAY-001', inv: 'INV-881', customer: 'Dr. Sharma Clinic', date: 'Mar 23, 2026', amount: '₹3,780', amountDesc: '', mode: 'UPI', modeIcon: '💳', status: 'Paid', statusLabel: '✓ Paid', statusColor: 'bg-[var(--color-mint)]', actions: ['view', 'print'] },
  { id: 'PAY-002', inv: 'INV-879', customer: 'ABC Hospital', date: 'Mar 22, 2026', amount: '₹18,500', amountDesc: '', mode: 'Bank Transfer', modeIcon: '🏦', status: 'Paid', statusLabel: '✓ Paid', statusColor: 'bg-[var(--color-mint)]', actions: ['view', 'print'] },
  { id: 'PAY-003', inv: 'INV-876', customer: 'City Pharmacy Chain', date: 'Mar 20, 2026', amount: '₹12,400', amountDesc: '(partial of ₹24,800)', mode: 'Cash', modeIcon: '💵', status: 'Partial', statusLabel: '◑ Partial', statusColor: 'bg-[var(--color-warning)]', actions: ['view', 'record'] },
  { id: 'PAY-004', inv: 'INV-872', customer: 'MedPlus Outlet', date: 'Mar 18, 2026', amount: '₹8,200', amountDesc: '', mode: 'Credit Card', modeIcon: '💳', status: 'Paid', statusLabel: '✓ Paid', statusColor: 'bg-[var(--color-mint)]', actions: ['view', 'print'] },
  { id: 'PAY-005', inv: 'INV-868', customer: 'Government Dispensary', date: 'Mar 15, 2026', amount: '—', amountDesc: '', mode: '—', modeIcon: '', status: 'Unpaid', statusLabel: '✗ Unpaid', statusColor: 'bg-[var(--color-danger)]', actions: ['view', 'remind'] },
  { id: 'PAY-006', inv: 'INV-865', customer: 'Sunrise Clinic', date: 'Mar 12, 2026', amount: '—', amountDesc: '', mode: '—', modeIcon: '', status: 'Overdue', statusLabel: '⚠ Overdue', statusColor: 'bg-[var(--color-danger)]', actions: ['view', 'remind'] },
  { id: 'PAY-007', inv: 'INV-860', customer: 'Wellness Hospital', date: 'Mar 10, 2026', amount: '₹6,200', amountDesc: '', mode: 'Cheque', modeIcon: '🔄', status: 'Paid', statusLabel: '✓ Paid', statusColor: 'bg-[var(--color-mint)]', actions: ['view', 'print'] },
];

export const PaymentsReceived: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Payments');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const tabs = ["All Payments", "Paid", "Partial", "Unpaid", "Overdue"];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)] leading-tight">Payments Received</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-1">Track all incoming payments from customers</p>
        </div>
        <button 
          onClick={() => setIsRecordModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white font-medium rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '💰', title: 'Total Received', value: '₹2,84,290', trend: 'This month', color: 'text-[var(--color-mint)]' },
          { icon: '✅', title: 'Paid Invoices', value: '48', trend: 'Fully settled', color: 'text-[var(--color-mint)]' },
          { icon: '⏳', title: 'Outstanding', value: '₹42,800', trend: 'Awaiting payment', color: 'text-[var(--color-warning)]' },
          { icon: '❌', title: 'Overdue', value: '₹18,400', trend: 'Past due date', color: 'text-[var(--color-danger)]' },
        ].map((metric, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)]">{metric.title}</div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{metric.value}</div>
            <div className={`text-xs font-medium ${metric.color}`}>{metric.trend}</div>
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

      {/* PAYMENTS TABLE CARD */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl flex flex-col">
        {/* Table Header Area */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)]">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{activeTab}</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] bg-[var(--color-card-bg)]">
            <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>This Month</span>
            <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                {['Payment #', 'Invoice #', 'Customer', 'Date', 'Amount', 'Mode', 'Status', 'Actions'].map(col => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {MOCK_PAYMENTS.map((payment, i) => (
                <tr key={i} className="hover:bg-[var(--color-surface-secondary)] transition-colors group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-mint)]">{payment.id}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <a href="#" className="text-sm font-medium text-[var(--color-mint)] hover:underline">{payment.inv}</a>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[var(--color-text-primary)]">{payment.customer}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-[var(--color-text-secondary)]">{payment.date}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{payment.amount}</span>
                      {payment.amountDesc && (
                        <span className="text-xs text-[var(--color-text-muted)]">{payment.amountDesc}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {payment.mode !== '—' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] rounded-full">
                        <span>{payment.modeIcon}</span>
                        {payment.mode}
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--color-text-muted)]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold text-white rounded-md ${payment.statusColor}`}>
                      {payment.statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-start gap-2">
                       <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="View">
                         <Eye className="w-4 h-4" />
                       </button>
                       {payment.actions.includes('print') && (
                         <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="Print">
                           <Printer className="w-4 h-4" />
                         </button>
                       )}
                       {payment.actions.includes('record') && (
                         <button className="text-xs font-medium text-[var(--color-mint)] hover:bg-[var(--color-mint)]/10 px-2 py-1 rounded transition-colors whitespace-nowrap">
                           + Record Balance
                         </button>
                       )}
                       {payment.actions.includes('remind') && (
                         <button className="text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] px-2 py-1 border border-[var(--color-border)] rounded transition-colors whitespace-nowrap">
                           Send Reminder
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl w-full max-w-[500px] shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--color-border)]">
              <h2 className="text-[18px] font-bold text-[var(--color-text-primary)]">Record Payment</h2>
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              {/* Form Grid */}
              <div className="space-y-4">
                {/* Invoice # */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Invoice #</label>
                  <select className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] appearance-none">
                    <option>INV-868 (₹8,200 due)</option>
                    <option>INV-865 (₹2,150 due)</option>
                  </select>
                </div>

                {/* Customer */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Customer</label>
                  <input type="text" readOnly value="Government Dispensary" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] cursor-not-allowed outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Outstanding */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Outstanding Amount</label>
                    <input type="text" readOnly value="₹8,200" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-danger)] cursor-not-allowed outline-none" />
                  </div>
                  
                  {/* Payment Date */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Payment Date</label>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Amount Received */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Amount Received</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">₹</span>
                      <input type="number" placeholder="0.00" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-7 pr-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Payment Mode</label>
                    <select className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] appearance-none">
                      <option>UPI</option>
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                      <option>Credit Card</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                </div>

                {/* Reference # */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Reference #</label>
                  <input type="text" placeholder="UTR or cheque number" className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)]" />
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Notes (Optional)</label>
                  <textarea rows={2} placeholder="Add any relevant notes..." className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/50 focus:border-[var(--color-mint)] resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-4 border-t border-[var(--color-border)] bg-[var(--color-surface-primary)] rounded-b-2xl flex justify-end gap-3">
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-lg hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[var(--color-mint)] text-white font-medium rounded-lg hover:bg-[var(--color-mint-hover)] shadow-sm shadow-[var(--color-mint)]/20 transition-all text-sm">
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
