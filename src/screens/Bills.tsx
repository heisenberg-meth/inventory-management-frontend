import React, { useState } from 'react';
import { Plus, Eye, Printer, X, Search, ChevronDown, Download, Edit2, ArrowRight } from 'lucide-react';

const MOCK_BILLS = [
  { id: 'BILL-001', supplier: 'MedSupply Co.', po: 'PO-2024-003', poLink: true, billDate: 'Mar 20, 2026', dueDate: 'Mar 30, 2026', amount: '₹42,000', status: 'Unpaid', statusLabel: '⏳ Unpaid', statusClass: 'bg-[var(--color-warning)] text-white', actions: ['view', 'edit', 'pay'] },
  { id: 'BILL-002', supplier: 'PharmaDist Ltd.', po: 'PO-2024-002', poLink: false, billDate: 'Mar 15, 2026', dueDate: 'Mar 25, 2026', amount: '₹18,500', status: 'Overdue', statusLabel: '⚠ Overdue', statusClass: 'bg-[var(--color-danger)] text-white', actions: ['view', 'pay_urgent'] },
  { id: 'BILL-003', supplier: 'GlobalMed Suppliers', po: 'PO-2024-001', poLink: false, billDate: 'Mar 10, 2026', dueDate: 'Apr 10, 2026', amount: '₹85,000', status: 'Paid', statusLabel: '✓ Paid', statusClass: 'bg-[var(--color-mint)] text-white', actions: ['view', 'print'] },
  { id: 'BILL-004', supplier: 'ABC Distributors', po: 'PO-2024-004', poLink: false, billDate: 'Mar 8, 2026', dueDate: 'Apr 8, 2026', amount: '₹32,400', status: 'Partial', statusLabel: '◑ Partial', statusClass: 'bg-[var(--color-warning)] text-white', actions: ['view', 'pay_balance'] },
  { id: 'BILL-005', supplier: 'SunPharma Wholesale', po: 'PO-2024-005', poLink: false, billDate: 'Mar 5, 2026', dueDate: 'Apr 5, 2026', amount: '₹1,24,000', status: 'Paid', statusLabel: '✓ Paid', statusClass: 'bg-[var(--color-mint)] text-white', actions: ['view', 'print'] },
  { id: 'BILL-006', supplier: 'MedSupply Co.', po: '—', poLink: false, billDate: 'Mar 1, 2026', dueDate: 'Mar 20, 2026', amount: '₹22,000', status: 'Overdue', statusLabel: '⚠ Overdue', statusClass: 'bg-[var(--color-danger)] text-white', actions: ['view', 'pay'] },
  { id: 'BILL-007', supplier: 'HealthFirst Dist.', po: 'PO-2024-006', poLink: false, billDate: 'Feb 28, 2026', dueDate: 'Mar 28, 2026', amount: '₹58,600', status: 'Draft', statusLabel: '📝 Draft', statusClass: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border)]', actions: ['view', 'edit', 'confirm'] },
];

export const Bills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Bills');
  const [isNewBillModalOpen, setIsNewBillModalOpen] = useState(false);

  const tabs = ["All Bills", "Draft", "Unpaid", "Partial", "Paid", "Overdue"];

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
          { icon: '💰', title: 'Total Bills', value: '₹4,82,500', trend: 'This month', color: 'text-[var(--color-text-muted)]' },
          { icon: '✅', title: 'Paid', value: '₹2,40,000', trend: '12 bills settled', color: 'text-[var(--color-mint)]' },
          { icon: '⏳', title: 'Unpaid', value: '₹1,82,500', trend: '8 bills pending', color: 'text-[var(--color-warning)]' },
          { icon: '⚠', title: 'Overdue', value: '₹60,000', trend: '3 bills past due', color: 'text-[var(--color-danger)]' },
        ].map((metric, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)]">{metric.title}</div>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{metric.value}</div>
            <div className={`text-xs font-medium ${metric.color === 'text-[var(--color-text-muted)]' ? 'text-[var(--color-text-muted)] font-normal' : metric.color}`}>{metric.trend}</div>
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
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">23 Bills</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] w-4 h-4" />
            <input 
              type="text" 
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
              {MOCK_BILLS.map((bill, i) => (
                <tr key={i} className="hover:bg-[var(--color-surface-secondary)] transition-colors group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-mint)]">{bill.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[var(--color-text-primary)]">{bill.supplier}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {bill.po !== '—' ? (
                      <span className={`text-sm ${bill.poLink ? 'text-[var(--color-mint)] hover:underline cursor-pointer' : 'text-[var(--color-text-secondary)]'}`}>
                        {bill.po}
                      </span>
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
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{bill.amount}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md ${bill.statusClass}`}>
                      {bill.statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-start gap-2">
                       <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="View">
                         <Eye className="w-4 h-4" />
                       </button>
                       {bill.actions.includes('edit') && (
                         <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="Edit">
                           <Edit2 className="w-4 h-4" />
                         </button>
                       )}
                       {bill.actions.includes('print') && (
                         <button className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors" title="Print">
                           <Printer className="w-4 h-4" />
                         </button>
                       )}
                       {bill.actions.includes('pay') && (
                         <button className="text-sm font-medium text-[var(--color-mint)] hover:underline transition-colors whitespace-nowrap">
                           Pay Now
                         </button>
                       )}
                       {bill.actions.includes('pay_urgent') && (
                         <button className="text-sm font-medium text-[var(--color-danger)] hover:underline transition-colors whitespace-nowrap">
                           Pay Now
                         </button>
                       )}
                       {bill.actions.includes('pay_balance') && (
                         <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-mint)] transition-colors whitespace-nowrap">
                           <Plus className="w-3 h-3" /> Pay Balance
                         </button>
                       )}
                       {bill.actions.includes('confirm') && (
                         <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-mint)] transition-colors whitespace-nowrap pl-1">
                           <ArrowRight className="w-3.5 h-3.5" /> Confirm
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[var(--color-border)] flex items-center justify-end">
          <span className="text-sm text-[var(--color-text-muted)]">1-7 of 23</span>
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
