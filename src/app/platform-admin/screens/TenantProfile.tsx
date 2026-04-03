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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      
      {/* BACK LINK */}
      <div className="mb-6">
        <Link 
          to="/admin/tenants" 
          className="flex items-center gap-2 text-[#0d6e5a] text-[13px] font-[700] hover:translate-x-[-4px] transition-transform w-fit uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tenants
        </Link>
      </div>

      {/* TENANT HEADER CARD */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-[64px] h-[64px] rounded-full bg-[#0d6e5a]/10 flex items-center justify-center text-[#0d6e5a] text-[20px] font-[800] border-2 border-[#0d6e5a]/10">
                AP
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-3">
                    <h1 className="text-[24px] font-[800] text-[#0d1b2a] tracking-tight">ABC Pharmacy</h1>
                    <div className="flex items-center gap-2">
                       <span className="px-2.5 py-1 bg-[#1db97a]/10 text-[#1db97a] rounded-[6px] text-[10px] font-[800] uppercase tracking-wider">Pharmacy</span>
                       <span className="px-2.5 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded-[6px] text-[10px] font-[800] uppercase tracking-wider">Enterprise</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-[14px] text-[#6b7a8d] font-medium">
                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> inventory.abcpharma.com</span>
                    <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                    <span>Created March 1, 2026 by Admin Root</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#dcfce7] text-[#15803d] rounded-[10px] text-[13px] font-[700] uppercase tracking-wider border border-[#15803d]/10">
                 <div className="w-2 h-2 rounded-full bg-[#15803d]" />
                 Active
              </div>
              <button className="h-[46px] px-6 border-2 border-[#ef4444] text-[#ef4444] rounded-[10px] text-[12px] font-bold uppercase tracking-widest hover:bg-[#ef4444]/5 transition-all">
                SUSPEND TENANT
              </button>
              <button className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all duration-200">
                EDIT TENANT
              </button>
           </div>
        </div>
      </div>

      {/* TABS ROW */}
      <div className="flex items-center gap-10 border-b border-[#e2e8f0] mb-10 px-2 transition-all">
         {tabs.map((tab) => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`
               pb-4 text-[13px] font-[700] uppercase tracking-[0.12em] transition-all relative
               ${activeTab === tab ? 'text-[#0d6e5a]' : 'text-[#9aa5b4] hover:text-[#6b7a8d]'}
             `}
           >
             {tab}
             {activeTab === tab && (
               <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0d6e5a] rounded-t-full shadow-[0_-2px_6px_rgba(13,110,90,0.2)]" />
             )}
           </button>
         ))}
      </div>

      {/* OVERVIEW TAB CONTENT */}
      {activeTab === 'Overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* COL 1 - Stats */}
              <div className="bg-white border border-[#e2e8f0] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#0d6e5a]/10 rounded-xl flex items-center justify-center text-[#0d6e5a]">
                       <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[#0d1b2a] uppercase tracking-wider">Tenant Stats</h3>
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
                         <span className="text-[14px] text-[#6b7a8d] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[#0d1b2a]">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-[#f0f4f8]">
                       <div className="flex items-center justify-between mb-3 text-[13px]">
                          <span className="text-[#6b7a8d] font-medium flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> Storage Used</span>
                          <span className="font-[700] text-[#0d1b2a]">2.4 GB / 50 GB</span>
                       </div>
                       <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0d6e5a] rounded-full shadow-[0_0_8px_rgba(13,110,90,0.3)] transition-all duration-1000" style={{ width: '5%' }} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* COL 2 - Billing */}
              <div className="bg-white border border-[#e2e8f0] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#a855f7]/10 rounded-xl flex items-center justify-center text-[#a855f7]">
                       <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[#0d1b2a] uppercase tracking-wider">Billing</h3>
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
                         <span className="text-[14px] text-[#6b7a8d] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[#0d1b2a] text-right">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-6 mt-6 border-t border-[#f0f4f8]">
                       <button className="flex items-center gap-2 text-[13px] font-[800] text-[#0d6e5a] hover:underline uppercase tracking-widest w-full justify-center">
                          <FileText className="w-4 h-4" /> VIEW INVOICES
                       </button>
                    </div>
                 </div>
              </div>

              {/* COL 3 - Quick Info */}
              <div className="bg-white border border-[#e2e8f0] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center text-[#0ea5e9]">
                       <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-[700] text-[#0d1b2a] uppercase tracking-wider">Quick Info</h3>
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
                         <span className="text-[14px] text-[#6b7a8d] font-medium">{stat.label}</span>
                         <span className="text-[14px] font-[700] text-[#0d1b2a] text-right truncate overflow-hidden max-w-[140px] ml-4">{stat.value}</span>
                      </div>
                    ))}
                    <div className="pt-6 mt-6 border-t border-[#f0f4f8]">
                       <button className="flex items-center gap-2 text-[13px] font-[800] text-[#0d6e5a] hover:underline uppercase tracking-widest w-full justify-center">
                          <Mail className="w-4 h-4" /> SEND EMAIL
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* RECENT ACTIVITY */}
           <div className="bg-white border border-[#e2e8f0] rounded-[20px] shadow-sm overflow-hidden">
              <div className="p-6 px-8 border-b border-[#f0f4f8] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#0d6e5a]" />
                    <h3 className="text-[15px] font-[800] text-[#0d1b2a] uppercase tracking-widest">Recent Activity</h3>
                 </div>
                 <button className="text-[13px] font-[700] text-[#0d6e5a] hover:underline flex items-center gap-1 transition-all">
                   View all activity <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
              <div className="divide-y divide-[#f8f9fb]">
                 {[
                   { user: 'Admin Root', action: 'Modified plan features for Enterprise cluster', date: '2 min ago', type: 'Config' },
                   { user: 'Ravi Kumar', action: 'Added 2 new staff users to inventory module', date: '15 min ago', type: 'Access' },
                   { user: 'System', action: 'Scheduled automated backup for SQL cluster 42', date: '1h ago', type: 'System' },
                   { user: 'Admin Root', action: 'Verified payment confirmation TXN-10042', date: '4h ago', type: 'Finance' },
                   { user: 'System', action: 'Initiated routine health check for primary cluster', date: '1d ago', type: 'Health' },
                 ].map((activity, i) => (
                   <div key={i} className="px-8 py-4 flex items-start justify-between group hover:bg-[#f8fbff] transition-colors">
                      <div className="flex items-start gap-4">
                         <div className="w-[32px] h-[32px] rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#6b7a8d] text-[10px] font-[800] uppercase mt-0.5 group-hover:bg-[#0d6e5a]/10 group-hover:text-[#0d6e5a] transition-colors">
                            {activity.user[0]}
                         </div>
                         <div>
                            <div className="text-[14px] font-[700] text-[#0d1b2a] group-hover:text-[#0d6e5a] transition-colors">{activity.user}</div>
                            <div className="text-[13px] text-[#6b7a8d] font-medium">{activity.action}</div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <span className="text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4]">{activity.date}</span>
                         <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#9aa5b4] text-[9px] font-[800] rounded uppercase tracking-widest">{activity.type}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* PLACEHOLDERS FOR OTHER TABS */}
      {activeTab !== 'Overview' && (
        <div className="p-20 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 animate-in fade-in zoom-in-95 duration-500">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-400 mb-4">
              {activeTab === 'Users' && <User className="w-8 h-8" />}
              {activeTab === 'Billing' && <CreditCard className="w-8 h-8" />}
              {activeTab === 'Audit Logs' && <FileText className="w-8 h-8" />}
              {activeTab === 'Settings' && <Settings2 className="w-8 h-8" />}
           </div>
           <h3 className="text-[18px] font-bold text-gray-800 uppercase tracking-widest mb-1">{activeTab} Details</h3>
           <p className="text-gray-500 font-medium max-w-sm mb-6">Detailed management for this cluster will be provisioned in the next deployment cycle.</p>
           <button className="px-8 py-3 bg-[#0d6e5a] text-white rounded-xl text-[11px] font-[800] uppercase tracking-widest hover:shadow-lg transition-all" onClick={() => setActiveTab('Overview')}>
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
