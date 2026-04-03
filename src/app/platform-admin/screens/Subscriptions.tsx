import React from 'react';
import { CreditCard, TrendingUp, TrendingDown, DollarSign, MoreVertical, Search, Filter } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

interface SubscriptionData {
  id: string;
  tenant: string;
  plan: 'Enterprise' | 'Pro' | 'Trial' | 'Free';
  status: 'Active' | 'Suspended' | 'Trial' | 'Inactive';
  billing: 'Monthly' | 'Yearly' | 'None';
  amount: string;
  renewalDate: string;
}

const dummySubs: SubscriptionData[] = [
  { id: 'SUB-4821', tenant: 'Metro Pharmacy Global', plan: 'Enterprise', status: 'Active', billing: 'Yearly', amount: '$12,400', renewalDate: 'Oct 24, 2026' },
  { id: 'SUB-4820', tenant: 'City Supermarket LLC', plan: 'Pro', status: 'Active', billing: 'Monthly', amount: '$890', renewalDate: 'May 12, 2026' },
  { id: 'SUB-4819', tenant: 'Warehouse Plus', plan: 'Pro', status: 'Trial', billing: 'Monthly', amount: '$0', renewalDate: 'Apr 18, 2026' },
  { id: 'SUB-4818', tenant: 'Fashion Retail Co', plan: 'Free', status: 'Inactive', billing: 'None', amount: '$0', renewalDate: '-' },
  { id: 'SUB-4817', tenant: 'Health Store India', plan: 'Pro', status: 'Suspended', billing: 'Monthly', amount: '$890', renewalDate: 'Jun 30, 2026' },
  { id: 'SUB-4816', tenant: 'Apex Logistics', plan: 'Enterprise', status: 'Active', billing: 'Yearly', amount: '$24,000', renewalDate: 'Jan 15, 2027' },
  { id: 'SUB-4815', tenant: 'Nova Diagnostics', plan: 'Pro', status: 'Active', billing: 'Monthly', amount: '$890', renewalDate: 'Dec 05, 2026' },
];

export const Subscriptions: React.FC = () => {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)]';
      case 'Suspended': return 'bg-[var(--pa-badge-suspended-bg)] text-[var(--pa-badge-suspended-text)]';
      case 'Trial': return 'bg-[var(--pa-badge-trial-bg)] text-[var(--pa-badge-trial-text)]';
      default: return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
    }
  };

  const getPlanColor = (plan: string) => {
     switch (plan) {
       case 'Enterprise': return 'text-[#0d6e5a] font-bold';
       case 'Pro': return 'text-[#1db97a] font-semibold';
       default: return 'text-[#64748b]';
     }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        section="SUBSCRIPTIONS"
        title="Revenue Engine"
        description="Monitor platform recurring revenue, manage tenant licensing, and oversee subscription lifecycle across the global ecosystem."
        ctaText="EXPORT DATA CORE"
        onCtaClick={() => console.log('Exporting...')}
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Platform MRR', value: '$248,500', change: '+12.4%', up: true, icon: DollarSign },
          { label: 'Active Licenses', value: '1,422', change: '+8%', up: true, icon: CreditCard },
          { label: 'Expiring 30d', value: '48', change: '-2%', up: false, icon: TrendingDown },
          { label: 'Conversion Rate', value: '24.2%', change: '+3.1%', up: true, icon: TrendingUp },
        ].map((m, i) => (
          <div key={i} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-[12px] font-medium text-[#6b7a8d] mb-2 uppercase tracking-wider">{m.label}</div>
              <div className="text-[28px] font-bold text-[var(--pa-text-near-black)]">{m.value}</div>
              <div className={`text-[12px] font-semibold flex items-center gap-1 mt-1 ${m.up ? 'text-[#1db97a]' : 'text-[#ef4444]'}`}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.change}
              </div>
            </div>
            <div className="w-11 h-11 bg-[#0d6e5a] text-white rounded-[10px] flex items-center justify-center shadow-lg shadow-[#0d6e5a]/10 group-hover:scale-110 transition-transform">
              <m.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#f0f4f8] flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h3 className="text-[20px] font-bold text-[var(--pa-text-near-black)]">Subscription List</h3>
              <p className="text-[13px] text-[#6b7a8d]">Showing {dummySubs.length} active licenses in the cluster</p>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
                <input 
                  type="text" 
                  placeholder="Filter tenants..." 
                  className="h-10 pl-10 pr-4 bg-[#f8f9fb] border-none rounded-lg text-sm text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[#0d6e5a]/10 w-[240px]"
                />
              </div>
              <button className="h-10 px-4 bg-[#f8f9fb] text-[#6b7a8d] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#f0f4f8] transition-colors">
                 <Filter className="w-4 h-4" />
                 FILTERS
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Subscription ID</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Tenant Entity</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Plan Deck</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Cycle</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Next Renewal</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {dummySubs.length > 0 ? (
                dummySubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[var(--pa-row-hover)] active:bg-[#f0f4f8] transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <span className="text-[12px] font-bold text-[#0d6e5a] tracking-wider">{sub.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[var(--pa-text-near-black)] group-hover:text-[#0d6e5a] transition-colors">{sub.tenant}</span>
                        <span className="text-[11px] text-[#6b7a8d] uppercase tracking-tighter">Global Enterprise</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[13px] ${getPlanColor(sub.plan)}`}>{sub.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-[#2c3e50] font-medium">{sub.billing}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] font-bold text-[#1a2535]">{sub.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider ${getBadgeStyle(sub.status)}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#1a2535]">{sub.renewalDate}</span>
                        <span className="text-[10px] text-[#9aa5b4] font-medium uppercase tracking-tighter">Automatic</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 rounded-lg hover:bg-white text-[#9aa5b4] hover:text-[#0d6e5a] transition-all">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-[72px] h-[72px] rounded-full bg-[#f0f4f8] flex items-center justify-center mb-4">
                         <CreditCard className="w-[28px] h-[28px] text-[#9aa5b4]" />
                      </div>
                      <span className="text-[11px] font-bold uppercase text-[#9aa5b4] tracking-[0.1em]">NO SUBSCRIPTIONS FOUND</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
           <span className="text-[12px] text-[#6b7a8d]">Page 1 of 48</span>
           <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-all ${p === 1 ? 'bg-[#0d6e5a] text-white' : 'text-[#6b7a8d] hover:bg-[#f0f4f8]'}`}
                >
                  {p}
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
