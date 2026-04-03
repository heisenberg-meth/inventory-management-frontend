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
          <span className="px-2.5 py-1 bg-[#dcfce7] text-[#15803d] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Check className="w-3 h-3" /> Paid
          </span>
        );
      case 'Free': 
        return (
          <span className="px-2.5 py-1 bg-[#f1f5f9] text-[#475569] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider w-fit">
            Free
          </span>
        );
      case 'Pending': 
        return (
          <span className="px-2.5 py-1 bg-[#fef9c3] text-[#92400e] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'Failed': 
        return (
          <span className="px-2.5 py-1 bg-[#fee2e2] text-[#ef4444] rounded-[6px] text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit">
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root relative overflow-hidden">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[#0d1b2a] leading-tight tracking-tight">Payments</h1>
          <p className="text-[15px] font-medium text-[#6b7a8d] mt-1 opacity-80">
            Track all subscription payments across tenants.
          </p>
        </div>
        <button className="h-[46px] px-8 border-2 border-[#0d6e5a] text-[#0d6e5a] rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-[#0d6e5a]/5 transition-all duration-200 flex items-center gap-2">
          <Download className="w-4 h-4" /> EXPORT REPORT
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { icon: IndianRupee, value: '₹4,28,500', label: 'Total Revenue', change: '↑ 18% this month', color: '#1db97a' },
          { icon: CheckCircle2, value: '284', label: 'Successful', change: 'This month', color: '#1db97a' },
          { icon: Clock, value: '8', label: 'Pending', change: 'Awaiting confirmation', color: '#f59e0b' },
          { icon: XCircle, value: '3', label: 'Failed', change: 'Requires attention', color: '#ef4444' },
        ].map((m, idx) => (
          <div key={idx} className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px_24px] shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 text-[11px] font-[800] uppercase tracking-widest text-[#6b7a8d] mb-4">
               <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} /> {m.label}
             </div>
             <div className="text-[28px] font-[800] text-[#0d1b2a] mb-1">{m.value}</div>
             <div className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: m.color }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
          <input 
            type="text" 
            placeholder="Search by tenant, invoice, transaction ID..."
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[#0d1b2a] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Status', 'All Plans', 'Mar 2026'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-white border border-[#e2e8f0] rounded-[8px] text-[13px] font-[500] text-[#0d1b2a] flex items-center gap-2 hover:border-[#0d6e5a] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[#9aa5b4]" />
            </button>
          ))}
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">TRANSACTION ID</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">TENANT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">PLAN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">AMOUNT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">DATE</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">METHOD</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">STATUS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {initialPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#f8fbff] transition-colors cursor-pointer group" onClick={() => handleOpenDrawer(payment)}>
                  <td className="px-6 py-4 text-[13px] font-[700] text-[#1db97a] uppercase tracking-wide">{payment.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] font-[600] text-[#0d1b2a]">{payment.tenant}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-[600] text-[#6b7a8d]">{payment.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[700] text-[#0d1b2a]">{payment.amount}</td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-medium">{payment.date}</td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-medium">{payment.method}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3.5 text-[#9aa5b4]">
                      <button className="hover:text-[#0d6e5a] transition-colors"><Eye className="w-4 h-4" /></button>
                      {(payment.status === 'Paid' || payment.status === 'Free') ? (
                        <button className="hover:text-[#0d1b2a] transition-colors"><Printer className="w-4 h-4" /></button>
                      ) : (
                        <button className="flex items-center gap-1.5 text-[11px] font-[700] text-[#0d6e5a] hover:underline px-2 py-1 bg-[#1db97a]/5 rounded transition-all">
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
        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
           <span className="text-[13px] text-[#6b7a8d]">Showing 1–7 of 284 payments</span>
        </div>
      </div>

      {/* PAYMENT DETAIL DRAWER */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[100]" onClick={() => setShowDrawer(false)} />
          <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[110] border-l-[3px] border-[#0d6e5a] animate-in slide-in-from-right duration-300">
             <div className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-[18px] font-[800] text-[#0d1b2a]">Payment Details</h2>
                   <button onClick={() => setShowDrawer(false)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] transition-colors rounded-xl hover:bg-[#f1f5f9]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-10 scrollbar-none pb-12">
                   {/* Main Transaction Info */}
                   <div className="space-y-6">
                      <div className="flex flex-col">
                         <span className="text-[11px] font-[800] uppercase tracking-[0.15em] text-[#9aa5b4] mb-1">AMOUNT</span>
                         <span className="text-[32px] font-[800] text-[#0d6e5a]">{selectedPayment?.amount}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-6">
                         {[
                           { label: 'Transaction ID', value: selectedPayment?.id },
                           { label: 'Tenant', value: selectedPayment?.tenant },
                           { label: 'Plan', value: selectedPayment?.plan },
                           { label: 'Date', value: 'March 23, 2026' },
                           { label: 'Method', value: selectedPayment?.method + ' — Razorpay' },
                           { label: 'Reference', value: 'RZP-882341XYZ' },
                         ].map((item, i) => (
                           <div key={i} className="flex flex-col">
                              <span className="text-[10px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-1">{item.label}</span>
                              <span className="text-[14px] font-[700] text-[#0d1b2a]">{item.value}</span>
                           </div>
                         ))}
                      </div>

                      <div className="pt-2">
                         <span className="text-[10px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 block">STATUS</span>
                         {getStatusBadge(selectedPayment?.status || 'Paid')}
                      </div>
                   </div>

                   {/* Invoice Section */}
                   <div className="p-6 bg-[#f8fbff] rounded-2xl border border-[#e2e8f0]">
                      <div className="flex items-center gap-2 mb-4">
                         <FileText className="w-4 h-4 text-[#0d6e5a]" />
                         <span className="text-[12px] font-[800] uppercase tracking-widest text-[#0d1b2a]">INVOICE</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[14px] font-[700] text-[#6b7a8d] hover:text-[#0d6e5a] cursor-pointer underline decoration-dotted transition-colors">INV-2026-10042</span>
                         <button className="flex items-center gap-1.5 text-[12px] font-bold text-[#0d6e5a] hover:underline uppercase tracking-wide">
                            Download PDF <ArrowUpRight className="w-3.5 h-3.5" />
                         </button>
                      </div>
                   </div>

                   {/* Timeline */}
                   <div>
                      <h3 className="text-[12px] font-[800] uppercase tracking-widest text-[#0d1b2a] mb-6">Timeline</h3>
                      <div className="space-y-6 pl-2">
                         {[
                           { title: 'Payment initiated', time: 'Mar 23, 10:42 AM', done: true },
                           { title: 'Payment processing', time: 'Mar 23, 10:42 AM', done: true },
                           { title: 'Payment confirmed', time: 'Mar 23, 10:43 AM', done: true, final: true },
                         ].map((step, i) => (
                           <div key={i} className="flex items-start gap-4 relative">
                              {i !== 2 && (
                                <div className="absolute left-[7px] top-[20px] bottom-[-24px] w-px bg-[#e2e8f0]" />
                              )}
                              <div className={`w-[15px] h-[15px] rounded-full border-2 bg-white z-10 flex items-center justify-center ${step.done ? 'border-[#1db97a]' : 'border-[#cbd5e1]'}`}>
                                 {step.final && <Check className="w-2.5 h-2.5 text-[#1db97a] stroke-[4]" />}
                                 {!step.final && step.done && <div className="w-1.5 h-1.5 rounded-full bg-[#1db97a]" />}
                              </div>
                              <div>
                                 <div className={`text-[13px] font-[700] ${step.done ? 'text-[#0d1b2a]' : 'text-[#6b7a8d]'}`}>{step.title}</div>
                                 <div className="text-[11px] text-[#9aa5b4] font-medium">{step.time}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="pt-8 mt-auto border-t border-[#f0f4f8]">
                    <button className="w-full h-12 bg-[#0d6e5a] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 transition-all">
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
