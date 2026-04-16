import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Globe, CreditCard, 
  User, ChevronRight,
  TrendingUp, HardDrive, FileText, Activity
} from 'lucide-react';

export const TenantProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Users', 'Billing', 'Audit Logs', 'Settings'];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* BACK LINK */}
      <div className="mb-6">
        <Link 
          to="/admin/tenants" 
          className="flex items-center gap-2 text-[var(--pa-teal)] text-[13px] font-[700] hover:translate-x-[-4px] transition-transform w-fit uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tenants
        </Link>
      </div>

      {/* TENANT HEADER CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-[64px] h-[64px] rounded-full bg-[var(--pa-teal)]/10 flex items-center justify-center text-[var(--pa-teal)] text-[20px] font-[800] border-2 border-[var(--pa-teal)]/10">
                AP
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-3">
                    <h1 className="text-[24px] font-[800] text-[var(--pa-text-near-black)] tracking-tight">ABC Pharmacy</h1>
                    <div className="flex items-center gap-2">
                       <span className="px-2.5 py-1 bg-[var(--pa-teal)]/10 text-[var(--pa-teal)] rounded-[6px] text-[10px] font-[800] uppercase tracking-wider">Pharmacy</span>
                       <span className="px-2.5 py-1 bg-purple-500/10 text-purple-500 rounded-[6px] text-[10px] font-[800] uppercase tracking-wider">Enterprise</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-[14px] text-[var(--pa-text-muted)] font-medium">
                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> inventory.abcpharma.com</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--pa-border)]" />
                    <span>Created March 1, 2026 by Admin Root</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--pa-teal)]/10 text-[var(--pa-teal)] rounded-[10px] text-[13px] font-[700] uppercase tracking-wider border border-[var(--pa-teal)]/10">
                 <div className="w-2 h-2 rounded-full bg-[var(--pa-teal)]" />
                 Active
              </div>
              <button className="h-[46px] px-6 border-2 border-[var(--pa-red)] text-[var(--pa-red)] rounded-[10px] text-[12px] font-bold uppercase tracking-widest hover:bg-[var(--pa-red)]/5 transition-all">
                SUSPEND TENANT
              </button>
              <button className="h-[46px] px-8 bg-[var(--pa-teal)] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all duration-200">
                EDIT TENANT
              </button>
           </div>
        </div>
      </div>

      {/* TABS ROW */}
      <div className="flex items-center gap-10 border-b border-[var(--pa-border)] mb-10 px-2 transition-all">
         {tabs.map((tab) => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`
               pb-4 text-[13px] font-[700] uppercase tracking-[0.12em] transition-all relative
               ${activeTab === tab ? 'text-[var(--pa-teal)]' : 'text-[var(--pa-text-light-gray)] hover:text-[var(--pa-text-muted)]'}
             `}
           >
             {tab}
             {activeTab === tab && (
               <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--pa-teal)] rounded-t-full shadow-[0_-2px_6px_rgba(13,110,90,0.2)]" />
             )}
           </button>
         ))}
      </div>

      {/* OVERVIEW TAB CONTENT */}
      {activeTab === 'Overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* COL 1 - Stats */}
              <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[var(--pa-teal)]/10 rounded-xl flex items-center justify-center text-[var(--pa-teal)]">
                       <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[var(--pa-text-near-black)] uppercase tracking-wider">Tenant Stats</h3>
                 </div>
                 <div className="space-y-5">
                    {[
                      { label: 'Total Users', value: '6' },
                      { label: 'Active Users', value: '6' },
                      { label: 'Plan', value: 'Enterprise' },
                      { label: 'Joined', value: 'March 1, 2026' },
                      { label: 'Last Active', value: '2 min ago' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-[14px] text-[var(--pa-text-muted)] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[var(--pa-text-near-black)]">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-[var(--pa-border)]">
                       <div className="flex items-center justify-between mb-3 text-[13px]">
                          <span className="text-[var(--pa-text-muted)] font-medium flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> Storage Used</span>
                          <span className="font-[700] text-[var(--pa-text-near-black)]">2.4 GB / 50 GB</span>
                       </div>
                       <div className="h-2 w-full bg-[var(--pa-blue-gray-bg)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--pa-teal)] rounded-full shadow-[0_0_8px_rgba(13,110,90,0.3)] transition-all duration-1000" style={{ width: '5%' }} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* COL 2 - Billing */}
              <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-xl flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                       <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[var(--pa-text-near-black)] uppercase tracking-wider">Billing</h3>
                 </div>
                 <div className="space-y-5">
                    {[
                      { label: 'Current Plan', value: 'Enterprise ₹7,499/mo' },
                      { label: 'Billing Cycle', value: 'Annual' },
                      { label: 'Next Billing', value: 'April 1, 2026' },
                      { label: 'Total Paid', value: '₹7,499' },
                      { label: 'Payment Method', value: 'UPI — Razorpay' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-[14px] text-[var(--pa-text-muted)] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[var(--pa-text-near-black)] text-right">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-6 mt-6 border-t border-[var(--pa-border)]">
                       <button className="flex items-center gap-2 text-[13px] font-[800] text-[var(--pa-teal)] hover:underline uppercase tracking-widest w-full justify-center transition-colors">
                          <FileText className="w-4 h-4" /> VIEW INVOICES
                       </button>
                    </div>
                 </div>
              </div>

              {/* COL 3 - Quick Info */}
              <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[var(--pa-blue)]/10 rounded-xl flex items-center justify-center text-[var(--pa-blue)]">
                       <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[var(--pa-text-near-black)] uppercase tracking-wider">Quick Info</h3>
                 </div>
                 <div className="space-y-5">
                    {[
                      { label: 'Owner', value: 'Ravi Kumar' },
                      { label: 'Email', value: 'ravi@abcpharma.com' },
                      { label: 'Phone', value: '+91-9876543210' },
                      { label: 'Country', value: 'India' },
                      { label: 'Domain', value: 'inventory.abcpharma.com' },
                      { label: 'Business Type', value: 'Pharmacy' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-[14px] text-[var(--pa-text-muted)] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[var(--pa-text-near-black)] text-right truncate overflow-hidden max-w-[140px] ml-4">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-6 mt-6 border-t border-[var(--pa-border)]">
                       <button className="flex items-center gap-2 text-[13px] font-[800] text-[var(--pa-teal)] hover:underline uppercase tracking-widest w-full justify-center transition-colors">
                          <Mail className="w-4 h-4" /> SEND EMAIL
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* RECENT ACTIVITY */}
           <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[20px] shadow-sm overflow-hidden">
              <div className="p-6 px-8 border-b border-[var(--pa-border)] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[var(--pa-teal)]" />
                    <h3 className="text-[15px] font-[800] text-[var(--pa-text-near-black)] uppercase tracking-widest">Recent Activity</h3>
                 </div>
                 <button className="text-[13px] font-[700] text-[var(--pa-teal)] hover:underline flex items-center gap-1 transition-all">
                   View all activity <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
              <div className="divide-y divide-[var(--pa-border)]">
                 {[
                   { user: 'Admin Root', action: 'Modified plan features for Enterprise cluster', date: '2 min ago', type: 'Config' },
                   { user: 'Ravi Kumar', action: 'Added 2 new staff users to inventory module', date: '15 min ago', type: 'Access' },
                   { user: 'System', action: 'Scheduled automated backup for SQL cluster 42', date: '1h ago', type: 'System' },
                   { user: 'Admin Root', action: 'Verified payment confirmation TXN-10042', date: '4h ago', type: 'Finance' },
                   { user: 'System', action: 'Initiated routine health check for primary cluster', date: '1d ago', type: 'Health' },
                 ].map((activity, i) => (
                   <div key={i} className="px-8 py-4 flex items-start justify-between group hover:bg-[var(--pa-row-hover)] transition-colors">
                      <div className="flex items-start gap-4">
                         <div className="w-[32px] h-[32px] rounded-full bg-[var(--pa-blue-gray-bg)] flex items-center justify-center text-[var(--pa-text-muted)] text-[10px] font-[800] uppercase mt-0.5 group-hover:bg-[var(--pa-teal)]/10 group-hover:text-[var(--pa-teal)] transition-colors">
                            {activity.user[0]}
                         </div>
                         <div>
                            <div className="text-[14px] font-[700] text-[var(--pa-text-near-black)] group-hover:text-[var(--pa-teal)] transition-colors">{activity.user}</div>
                            <div className="text-[13px] text-[var(--pa-text-muted)] font-medium">{activity.action}</div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <span className="text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)]">{activity.date}</span>
                         <span className="px-2 py-0.5 bg-[var(--pa-blue-gray-bg)] text-[var(--pa-text-light-gray)] text-[9px] font-[800] rounded uppercase tracking-widest">{activity.type}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* PLACEHOLDERS FOR OTHER TABS */}
      {activeTab !== 'Overview' && (
        <div className="p-20 flex flex-col items-center justify-center text-center bg-[var(--pa-blue-gray-bg)] rounded-3xl border-2 border-dashed border-[var(--pa-border)] animate-in fade-in zoom-in-95 duration-500">
           <div className="w-16 h-16 bg-[var(--pa-card-bg)] rounded-full flex items-center justify-center shadow-lg text-[var(--pa-text-light-gray)] mb-4">
              {activeTab === 'Users' && <User className="w-8 h-8" />}
              {activeTab === 'Billing' && <CreditCard className="w-8 h-8" />}
              {activeTab === 'Audit Logs' && <FileText className="w-8 h-8" />}
              {activeTab === 'Settings' && <Settings2 className="w-8 h-8" />}
           </div>
           <h3 className="text-[18px] font-bold text-[var(--pa-text-near-black)] uppercase tracking-widest mb-1">{activeTab} Details</h3>
           <p className="text-[var(--pa-text-muted)] font-medium max-w-sm mb-6">Detailed management for this cluster will be provisioned in the next deployment cycle.</p>
           <button className="px-8 py-3 bg-[var(--pa-teal)] text-white rounded-xl text-[11px] font-[800] uppercase tracking-widest hover:shadow-lg transition-all" onClick={() => setActiveTab('Overview')}>
              Back to Overview
           </button>
        </div>
      )}
    </div>
  );
};

const Settings2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
