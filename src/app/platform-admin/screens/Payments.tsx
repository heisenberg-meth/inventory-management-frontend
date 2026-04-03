import React, { useState } from 'react';
import { 
  Search, Download, CheckCircle2, XCircle, Clock,
  Eye, Printer, X, ChevronDown,
  IndianRupee, FileText, ArrowUpRight, Check
} from 'lucide-react';

interface Payment {
  id: string;
  tenant: string;
  plan: string;
  amount: string;
  date: string;
  method: string;
  status: 'Paid' | 'Free' | 'Pending' | 'Failed';
}

const initialPayments: Payment[] = [
  { id: 'TXN-10042', tenant: 'ABC Pharmacy', plan: 'Enterprise', amount: '₹7,499', date: 'Mar 23', method: 'UPI', status: 'Paid' },
  { id: 'TXN-10041', tenant: 'FreshMart', plan: 'Pro', amount: '₹2,499', date: 'Mar 22', method: 'Bank Transfer', status: 'Paid' },
  { id: 'TXN-10040', tenant: 'Central WH', plan: 'Pro', amount: '₹2,499', date: 'Mar 20', method: 'Credit Card', status: 'Paid' },
  { id: 'TXN-10039', tenant: 'QuickRetail', plan: 'Free', amount: '₹0', date: 'Mar 18', method: '—', status: 'Free' },
  { id: 'TXN-10038', tenant: 'MedPlus', plan: 'Pro', amount: '₹2,499', date: 'Mar 15', method: 'UPI', status: 'Pending' },
  { id: 'TXN-10037', tenant: 'BioLife', plan: 'Enterprise', amount: '₹7,499', date: 'Mar 10', method: 'Bank Transfer', status: 'Failed' },
  { id: 'TXN-10036', tenant: 'New Tenant', plan: 'Business', amount: '₹2,499', date: 'Mar 8', method: 'Card', status: 'Paid' },
];

export const Payments: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': 
        return (
          <span className="px-2.5 py-1 bg-[var(--pa-mint)]/10 text-[var(--pa-mint)] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Check className="w-3 h-3" /> Paid
          </span>
        );
      case 'Free': 
        return (
          <span className="px-2.5 py-1 bg-[var(--pa-blue-gray-bg)] text-[var(--pa-text-muted)] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider w-fit">
            Free
          </span>
        );
      case 'Pending': 
        return (
          <span className="px-2.5 py-1 bg-[var(--pa-amber)]/10 text-[var(--pa-amber)] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'Failed': 
        return (
          <span className="px-2.5 py-1 bg-[var(--pa-red)]/10 text-[var(--pa-red)] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      default: return null;
    }
  }

  const handleOpenDrawer = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDrawer(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[var(--pa-text-near-black)] leading-tight tracking-tight">Payments</h1>
          <p className="text-[15px] font-medium text-[var(--pa-text-muted)] mt-1 opacity-80">
            Track all subscription payments across tenants.
          </p>
        </div>
        <button className="h-[46px] px-8 border-2 border-[var(--pa-teal)] text-[var(--pa-teal)] rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--pa-teal)]/5 transition-all duration-200 flex items-center gap-2">
          <Download className="w-4 h-4" /> EXPORT REPORT
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { icon: IndianRupee, value: '₹4,28,500', label: 'Total Revenue', change: '↑ 18% this month', color: 'var(--pa-mint)' },
          { icon: CheckCircle2, value: '284', label: 'Successful', change: 'This month', color: 'var(--pa-mint)' },
          { icon: Clock, value: '8', label: 'Pending', change: 'Awaiting confirmation', color: 'var(--pa-amber)' },
          { icon: XCircle, value: '3', label: 'Failed', change: 'Requires attention', color: 'var(--pa-red)' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-muted)] mb-4">
               <m.icon className="w-3.5 h-3.5" style={{ color: m.color.startsWith('var') ? `var(${m.color.match(/var\(([^)]+)\)/)?.[1] || ''})` : m.color }} /> {m.label}
             </div>
             <div className="text-[28px] font-[800] text-[var(--pa-text-near-black)] mb-1">{m.value}</div>
             <div className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: m.color.startsWith('var') ? `var(${m.color.match(/var\(([^)]+)\)/)?.[1] || ''})` : m.color }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
          <input 
            type="text" 
            placeholder="Search by tenant, invoice, transaction ID..."
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[var(--pa-text-light-gray)]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Status', 'All Plans', 'Mar 2026'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[8px] text-[13px] font-[500] text-[var(--pa-text-near-black)] flex items-center gap-2 hover:border-[var(--pa-teal)] hover:text-[var(--pa-teal)] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
            </button>
          ))}
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--pa-blue-gray-bg)]/50">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">TRANSACTION ID</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">TENANT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">PLAN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">AMOUNT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">DATE</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">METHOD</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">STATUS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--pa-border)]">
              {initialPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group" onClick={() => handleOpenDrawer(payment)}>
                  <td className="px-6 py-4 text-[13px] font-[700] text-[var(--pa-teal)] uppercase tracking-wide">{payment.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] font-[600] text-[var(--pa-text-near-black)]">{payment.tenant}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-[600] text-[var(--pa-text-muted)]">{payment.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[700] text-[var(--pa-text-near-black)]">{payment.amount}</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-medium">{payment.date}</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-medium">{payment.method}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3.5 text-[var(--pa-text-light-gray)]">
                      <button className="hover:text-[var(--pa-teal)] transition-colors"><Eye className="w-4 h-4" /></button>
                      {(payment.status === 'Paid' || payment.status === 'Free') ? (
                        <button className="hover:text-[var(--pa-text-near-black)] transition-colors"><Printer className="w-4 h-4" /></button>
                      ) : (
                        <button className="flex items-center gap-1.5 text-[11px] font-[700] text-[var(--pa-teal)] hover:underline px-2 py-1 bg-[var(--pa-teal)]/5 rounded transition-all">
                          RETRY
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[var(--pa-blue-gray-bg)]/50 border-t border-[var(--pa-border)] flex items-center justify-between">
           <span className="text-[13px] text-[var(--pa-text-muted)]">Showing 1–7 of 284 payments</span>
        </div>
      </div>

      {/* PAYMENT DETAIL DRAWER */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[100]" onClick={() => setShowDrawer(false)} />
          <div className="fixed top-0 right-0 h-full w-[420px] bg-[var(--pa-card-bg)] shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[110] border-l-[3px] border-[var(--pa-teal)] animate-in slide-in-from-right duration-300">
             <div className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-[18px] font-[800] text-[var(--pa-text-near-black)]">Payment Details</h2>
                   <button onClick={() => setShowDrawer(false)} className="p-2 text-[var(--pa-text-light-gray)] hover:text-[var(--pa-text-near-black)] transition-colors rounded-xl hover:bg-[var(--pa-blue-gray-bg)]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-10 scrollbar-none pb-12">
                   {/* Main Transaction Info */}
                   <div className="space-y-6">
                      <div className="flex flex-col">
                         <span className="text-[11px] font-[800] uppercase tracking-[0.15em] text-[var(--pa-text-light-gray)] mb-1">AMOUNT</span>
                         <span className="text-[32px] font-[800] text-[var(--pa-teal)]">{selectedPayment?.amount}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-6">
                         {[
                           { label: 'Transaction ID', value: selectedPayment?.id },
                           { label: 'Tenant', value: selectedPayment?.tenant },
                           { label: 'Plan', value: selectedPayment?.plan },
                           { label: 'Date', value: 'March 23, 2026' },
                           { label: 'Method', value: (selectedPayment?.method || '') + ' — Razorpay' },
                           { label: 'Reference', value: 'RZP-882341XYZ' },
                         ].map((item, i) => (
                           <div key={i} className="flex flex-col">
                              <span className="text-[10px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-1">{item.label}</span>
                              <span className="text-[14px] font-[700] text-[var(--pa-text-near-black)]">{item.value}</span>
                           </div>
                         ))}
                      </div>

                      <div className="pt-2">
                         <span className="text-[10px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 block">STATUS</span>
                         {getStatusBadge(selectedPayment?.status || 'Paid')}
                      </div>
                   </div>

                   {/* Invoice Section */}
                   <div className="p-6 bg-[var(--pa-blue-gray-bg)]/50 rounded-2xl border border-[var(--pa-border)]">
                      <div className="flex items-center gap-2 mb-4">
                         <FileText className="w-4 h-4 text-[var(--pa-teal)]" />
                         <span className="text-[12px] font-[800] uppercase tracking-widest text-[var(--pa-text-near-black)]">INVOICE</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[14px] font-[700] text-[var(--pa-text-muted)] hover:text-[var(--pa-teal)] cursor-pointer underline decoration-dotted transition-colors">INV-2026-10042</span>
                         <button className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--pa-teal)] hover:underline uppercase tracking-wide">
                            Download PDF <ArrowUpRight className="w-3.5 h-3.5" />
                         </button>
                      </div>
                   </div>

                   {/* Timeline */}
                   <div>
                      <h3 className="text-[12px] font-[800] uppercase tracking-widest text-[var(--pa-text-near-black)] mb-6">Timeline</h3>
                      <div className="space-y-6 pl-2">
                         {[
                           { title: 'Payment initiated', time: 'Mar 23, 10:42 AM', done: true },
                           { title: 'Payment processing', time: 'Mar 23, 10:42 AM', done: true },
                           { title: 'Payment confirmed', time: 'Mar 23, 10:43 AM', done: true, final: true },
                         ].map((step, i) => (
                           <div key={i} className="flex items-start gap-4 relative">
                              {i !== 2 && (
                                <div className="absolute left-[7px] top-[20px] bottom-[-24px] w-px bg-[var(--pa-border)]" />
                              )}
                              <div className={`w-[15px] h-[15px] rounded-full border-2 bg-[var(--pa-card-bg)] z-10 flex items-center justify-center ${step.done ? 'border-[var(--pa-mint)]' : 'border-[var(--pa-border)]'}`}>
                                 {step.final && <Check className="w-2.5 h-2.5 text-[var(--pa-mint)] stroke-[4]" />}
                                 {!step.final && step.done && <div className="w-1.5 h-1.5 rounded-full bg-[var(--pa-mint)]" />}
                              </div>
                              <div>
                                 <div className={`text-[13px] font-[700] ${step.done ? 'text-[var(--pa-text-near-black)]' : 'text-[var(--pa-text-muted)]'}`}>{step.title}</div>
                                 <div className="text-[11px] text-[var(--pa-text-light-gray)] font-medium">{step.time}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="pt-8 mt-auto border-t border-[var(--pa-border)]">
                    <button className="w-full h-12 bg-[var(--pa-teal)] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 transition-all" onClick={() => setShowDrawer(false)}>
                       CLOSE DETAILS
                    </button>
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
};
