import React, { useState } from 'react';
import { 
  CreditCard, X,
  Layers,
  IndianRupee, Eye, Edit3, Trash2
} from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  cycle: string;
  features: string[];
  status: 'Active' | 'Draft' | 'Inactive';
  color: string;
}

const initialPlans: Plan[] = [
  { id: 1, name: 'Starter', description: 'Free tier for individuals', price: '₹0', cycle: '/month', features: ['500 products', '1 warehouse', '2 users'], status: 'Active', color: 'bg-gray-400' },
  { id: 2, name: 'Business', description: 'Small to medium business', price: '₹2,499', cycle: '/month billed annually', features: ['Unlimited products', '5 warehouses', '10 users'], status: 'Active', color: 'bg-[#0d6e5a]' },
  { id: 3, name: 'Premium', description: 'Advanced operations', price: '₹4,999', cycle: '/month', features: ['Everything + AI', 'Custom domain', 'Priority support'], status: 'Active', color: 'bg-[#f59e0b]' },
  { id: 4, name: 'Enterprise', description: 'Large scale management', price: 'Custom', cycle: 'Contact sales', features: ['Unlimited everything', 'SSO', 'SLA'], status: 'Active', color: 'bg-[#a855f7]' },
];

export const Subscriptions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-1.5 px-0.5">
            <div className="w-2 h-2 rounded-full bg-[#1db97a] shadow-[0_0_8px_rgba(29,185,122,0.4)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b7a8d]">PLANS & PRICING</span>
          </div>
          <h1 className="text-[42px] font-[800] text-[#0d1b2a] leading-tight tracking-tighter">Plans</h1>
          <p className="text-[16px] font-medium text-[#6b7a8d] mt-1 opacity-80 max-w-lg">
            Define and manage pricing tiers for the platform.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          CREATE NEW PLAN
        </button>
      </div>

      {/* PLANS TABLE CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[#e8edf2] rounded-[16px] shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-[18px] text-[11px] font-[800] uppercase text-[#9aa5b4] tracking-[0.1em] border-b border-[#f0f4f8]">PLAN DETAILS</th>
                <th className="px-6 py-[18px] text-[11px] font-[800] uppercase text-[#9aa5b4] tracking-[0.1em] border-b border-[#f0f4f8]">PRICE</th>
                <th className="px-6 py-[18px] text-[11px] font-[800] uppercase text-[#9aa5b4] tracking-[0.1em] border-b border-[#f0f4f8]">FEATURES</th>
                <th className="px-6 py-[18px] text-[11px] font-[800] uppercase text-[#9aa5b4] tracking-[0.1em] border-b border-[#f0f4f8]">STATUS</th>
                <th className="px-6 py-[18px] text-[11px] font-[800] uppercase text-[#9aa5b4] tracking-[0.1em] border-b border-[#f0f4f8] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {initialPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[#f8fbff]/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-[42px] h-[42px] rounded-full ${plan.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[15px] font-[700] text-[#0d1b2a] transition-colors">{plan.name}</div>
                        <div className="text-[12px] text-[#6b7a8d] font-medium leading-tight">{plan.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-[800] text-[#0d1b2a]">{plan.price}</span>
                      <span className="text-[12px] text-[#9aa5b4] font-[600] tracking-tight">{plan.cycle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-2">
                       {plan.features.map((f, i) => (
                         <span key={i} className="px-2.5 py-1 bg-[#f1f5f9] text-[#475569] text-[11px] font-[700] rounded-[6px] border border-[#e2e8f0]/60">
                           {f}
                         </span>
                       ))}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-[12px] font-[700] text-[#1db97a] uppercase tracking-widest">
                       <div className="w-2 h-2 rounded-full bg-[#1db97a]" />
                       Active
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-3.5 text-[#9aa5b4]">
                      <button className="hover:text-[#0d6e5a] transition-colors"><Eye className="w-4.5 h-4.5" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4.5 h-4.5" /></button>
                      <button className="hover:text-[#ef4444] transition-colors"><Trash2 className="w-4.5 h-4.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPTY STATE VARIANT */}
      <div className="bg-[var(--pa-card-bg)] border border-dashed border-[#e8edf2] rounded-[16px] p-12 flex flex-col items-center justify-center text-center max-w-lg mx-auto opacity-60">
         <div className="w-[72px] h-[72px] bg-[#f0f4f8] rounded-full flex items-center justify-center text-[#9aa5b4] mb-4">
            <CreditCard className="w-7 h-7" />
         </div>
         <h4 className="text-[12px] font-[800] text-[#9aa5b4] uppercase tracking-[0.2em] mb-1">NO SUBSCRIPTION PLANS FOUND</h4>
         <p className="text-[13px] text-[#adb5bd] font-medium px-4">Create your first plan to start monetizing clusters.</p>
      </div>

      {/* CREATE PLAN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0d1b2a]/45 backdrop-blur-md z-[110] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-[540px] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Header */}
              <div className="p-8 border-b border-[#f0f4f8] flex items-center justify-between">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#1db97a]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d]">PLAN CONFIGURATION</span>
                   </div>
                   <h2 className="text-[22px] font-[800] text-[#0d1b2a] tracking-tight">Create New Plan</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-[#adb5bd] hover:text-[#0d1b2a] transition-colors rounded-xl hover:bg-[#f8f9fb]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-7 max-h-[70vh] overflow-y-auto scrollbar-none">
                 <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                       <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Plan Name</label>
                       <input type="text" placeholder="e.g. Business Pro" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl px-4 text-[14px] text-[#0d1b2a] font-medium outline-none focus:ring-2 focus:ring-[#0d6e5a]/10 transition-all font-sans" />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Price (₹/month)</label>
                       <div className="relative">
                          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9aa5b4]" />
                          <input type="number" placeholder="2499" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl pl-10 pr-4 text-[14px] text-[#0d1b2a] font-[700] outline-none focus:ring-2 focus:ring-[#0d6e5a]/10 transition-all" />
                       </div>
                    </div>
                    <div className="col-span-1">
                       <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Billing Cycle</label>
                       <select className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl px-4 text-[14px] text-[#0d1b2a] font-[600] outline-none focus:ring-2 focus:ring-[#0d6e5a]/10 appearance-none cursor-pointer">
                          <option>Monthly</option>
                          <option>Yearly</option>
                          <option>Both</option>
                       </select>
                    </div>
                    <div className="col-span-2">
                       <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Description</label>
                       <textarea placeholder="Brief description..." rows={2} className="w-full bg-[#f8f9fb] border-none rounded-xl p-4 text-[14px] text-[#0d1b2a] font-medium outline-none focus:ring-2 focus:ring-[#0d6e5a]/10 transition-all resize-none" />
                    </div>
                 </div>

                 {/* FEATURES SECTION */}
                 <div>
                    <h3 className="text-[11px] font-[800] uppercase tracking-widest text-[#0d6e5a] mb-5 border-b border-[#0d6e5a]/10 pb-2">PLAN FEATURES</h3>
                    <div className="space-y-4">
                       {[
                         { name: 'Products Limit', type: 'number', val: '500' },
                         { name: 'Warehouses', type: 'number', val: '1' },
                         { name: 'Users', type: 'number', val: '2' },
                         { name: 'API Access', type: 'toggle', on: false },
                         { name: 'Custom Domain', type: 'toggle', on: false },
                         { name: 'AI Dashboard', type: 'toggle', on: false },
                         { name: 'Priority Support', type: 'toggle', on: false },
                       ].map((f, i) => (
                         <div key={i} className="flex items-center justify-between group">
                            <span className="text-[14px] font-[600] text-[#0d1b2a]">{f.name}</span>
                            {f.type === 'number' ? (
                              <input type="number" defaultValue={f.val} className="w-16 h-8 bg-[#f8f9fb] border-none rounded-lg text-center text-[13px] font-bold text-[#0d6e5a]" />
                            ) : (
                              <button className={`w-10 h-5 rounded-full p-1 transition-all flex items-center ${f.on ? 'bg-[#1db97a]' : 'bg-[#e2e8f0]'}`}>
                                 <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all ${f.on ? 'translate-x-5' : 'translate-x-0'}`} />
                              </button>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* STATUS */}
                 <div>
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-3 px-1">Plan Status</label>
                    <div className="flex items-center gap-6">
                       {['Active', 'Draft', 'Inactive'].map((s) => (
                         <label key={s} className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${s === 'Active' ? 'border-[#0d6e5a]' : 'border-[#e2e8f0] group-hover:border-[#adb5bd]'}`}>
                               {s === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-[#0d6e5a]" />}
                            </div>
                            <span className={`text-[13px] font-[600] ${s === 'Active' ? 'text-[#0d1b2a]' : 'text-[#adb5bd]'}`}>{s}</span>
                         </label>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="p-8 pt-0 border-t border-[#f0f4f8] flex items-center justify-end gap-3">
                 <button 
                   onClick={() => setShowModal(false)}
                   className="px-6 py-3 border border-[#e2e8f0] text-[#6b7a8d] text-[12px] font-[800] uppercase tracking-widest rounded-xl hover:bg-[#f8f9fb] transition-colors"
                 >
                   Save as Draft
                 </button>
                 <button className="px-10 py-3 bg-[#0d6e5a] text-white text-[12px] font-[800] uppercase tracking-widest rounded-xl shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all">
                   CREATE PLAN
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
