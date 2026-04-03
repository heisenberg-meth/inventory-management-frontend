import React, { useState } from 'react';
import { 
  Building2, Search, 
  CheckCircle2, XCircle, Clock,
  Eye, Edit3, ShieldAlert, X, ChevronDown,
  Mail, User, Globe, ChevronRight
} from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
  owner: string;
  type: string;
  domain: string;
  plan: 'Enterprise' | 'Pro' | 'Free';
  status: 'Active' | 'Trial' | 'Suspended';
  users: number;
  created: string;
}

const initialTenants: Tenant[] = [
  { id: 1, name: 'ABC Pharmacy', owner: 'Dr. Ravi Kumar', type: 'Pharmacy', domain: 'inventory.abcpharma.com', plan: 'Enterprise', status: 'Active', users: 6, created: 'Mar 1, 2026' },
  { id: 2, name: 'FreshMart Super', owner: 'Suresh Mehta', type: 'Supermarket', domain: 'freshmart.app.com', plan: 'Pro', status: 'Active', users: 12, created: 'Feb 15, 2026' },
  { id: 3, name: 'Central Warehouse', owner: 'Anjali Patel', type: 'Warehouse', domain: 'central.app.com', plan: 'Pro', status: 'Active', users: 8, created: 'Feb 8, 2026' },
  { id: 4, name: 'QuickRetail Store', owner: 'Dev Sharma', type: 'Retail', domain: 'quickretail.app.com', plan: 'Free', status: 'Trial', users: 2, created: 'Mar 20, 2026' },
  { id: 5, name: 'MedPlus Pharma', owner: 'Priya Nair', type: 'Pharmacy', domain: 'medplus.app.com', plan: 'Pro', status: 'Active', users: 5, created: 'Jan 22, 2026' },
  { id: 6, name: 'BioLife Diagnostics', owner: 'Kiran Shah', type: 'Pharmacy', domain: 'biolife.app.com', plan: 'Enterprise', status: 'Suspended', users: 0, created: 'Dec 10, 2025' },
];

export const Tenants: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPillColor = (type: string) => {
    switch (type) {
      case 'Pharmacy': return 'bg-[#dcfce7] text-[#15803d]';
      case 'Supermarket': return 'bg-[#eff6ff] text-[#1d4ed8]';
      case 'Warehouse': return 'bg-[#fef3c7] text-[#92400e]';
      case 'Retail': return 'bg-[#f1f5f9] text-[#475569]';
      default: return 'bg-[#f1f5f9] text-[#475569]';
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-[#f3e8ff] text-[#7e22ce]';
      case 'Pro': return 'bg-[#ccfbf1] text-[#0f766e]';
      case 'Free': return 'bg-[#f1f5f9] text-[#475569]';
      default: return 'bg-[#f1f5f9] text-[#475569]';
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-[#1db97a]';
      case 'Trial': return 'text-[#f59e0b]';
      case 'Suspended': return 'text-[#ef4444]';
      default: return 'text-[#6b7a8d]';
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[#0d1b2a] leading-tight tracking-tight">Tenants</h1>
          <p className="text-[15px] font-medium text-[#6b7a8d] mt-1 opacity-85">
            Manage all registered business tenants on the platform.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          CREATE NEW TENANT
        </button>
      </div>

      {/* FILTER + SEARCH BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
          <input 
            type="text" 
            placeholder="Search tenants, domains, owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[#0d1b2a] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Types', 'All Plans', 'All Status'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-white border border-[#e2e8f0] rounded-[8px] text-[13px] font-[500] text-[#0d1b2a] flex items-center gap-2 hover:border-[#0d6e5a] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[#9aa5b4]" />
            </button>
          ))}
        </div>
      </div>

      {/* METRICS CHIPS */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { icon: Building2, value: '142', label: 'Total', color: 'text-[#0d1b2a]' },
          { icon: CheckCircle2, value: '138', label: 'Active', color: 'text-[#1db97a]' },
          { icon: Clock, value: '3', label: 'Trial', color: 'text-[#f59e0b]' },
          { icon: XCircle, value: '1', label: 'Suspended', color: 'text-[#ef4444]' },
        ].map((chip, idx) => (
          <div key={idx} className="bg-white border border-[#e2e8f0] rounded-[8px] p-[10px_16px] flex items-center gap-3">
            <chip.icon className={`w-[14px] h-[14px] ${chip.color}`} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[16px] font-[700] text-[#0d1b2a]">{chip.value}</span>
              <span className="text-[12px] font-medium text-[#6b7a8d]">{chip.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TENANTS TABLE CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">TENANT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">BUSINESS TYPE</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">DOMAIN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">PLAN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">STATUS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">USERS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">CREATED</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {initialTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[#f8fbff] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#0d6e5a]/10 flex items-center justify-center text-[#0d6e5a] text-[11px] font-[700]">
                        {tenant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-[600] text-[#0d1b2a] group-hover:text-[#0d6e5a] transition-colors">{tenant.name}</div>
                        <div className="text-[12px] text-[#6b7a8d]">{tenant.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-[600] ${getPillColor(tenant.type)}`}>
                      {tenant.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-medium">{tenant.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-[600] ${getPlanColor(tenant.plan)}`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-[13px] font-[600] ${getStatusColor(tenant.status)}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(tenant.status).replace('text-', 'bg-')}`} />
                       {tenant.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-bold">{tenant.users} users</td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d]">{tenant.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-[#9aa5b4]">
                      <button className="hover:text-[#0d6e5a] transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="hover:text-[#ef4444] transition-colors"><ShieldAlert className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
           <span className="text-[13px] text-[#6b7a8d]">Showing 1–6 of 142 tenants</span>
           <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 24].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-[8px] text-[12px] font-[700] transition-all ${p === 1 ? 'bg-[#0d6e5a] text-white shadow-md' : 'text-[#6b7a8d] hover:bg-[#f1f5f9]'}`}>
                  {p}
                </button>
              ))}
              <button className="p-1 text-[#6b7a8d] hover:text-[#0d6e5a]"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      {/* CREATE TENANT MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-white w-full max-w-[560px] rounded-[16px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-[24px_32px] border-b border-[#f0f4f8] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#1db97a]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d]">TENANT REGISTRATION</span>
                </div>
                <h2 className="text-[20px] font-[700] text-[#0d1b2a]">Create New Tenant</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] transition-colors rounded-lg hover:bg-[#f1f5f9]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-[32px] space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Business Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4] group-focus-within:text-[#0d6e5a] transition-colors" />
                    <input type="text" placeholder="e.g. ABC Pharmacy" className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Owner Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4] group-focus-within:text-[#0d6e5a] transition-colors" />
                    <input type="text" placeholder="Full name" className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Owner Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4] group-focus-within:text-[#0d6e5a] transition-colors" />
                    <input type="email" placeholder="owner@company.com" className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Business Type</label>
                  <select className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10 appearance-none">
                    <option>Pharmacy</option>
                    <option>Supermarket</option>
                    <option>Warehouse</option>
                    <option>Retail</option>
                  </select>
                </div>

                <div className="col-span-1">
                   <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Plan</label>
                    <select className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10 appearance-none">
                      <option>Pro</option>
                      <option>Enterprise</option>
                      <option>Free</option>
                    </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Subdomain</label>
                  <div className="flex bg-[#f8f9fb] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0d6e5a]/10">
                    <div className="pl-4 flex items-center">
                      <Globe className="w-4 h-4 text-[#9aa5b4]" />
                    </div>
                    <input type="text" placeholder="abc-pharma" className="flex-1 h-11 bg-transparent border-none pl-3 pr-2 text-[13px] text-[#0d1b2a] focus:ring-0" />
                    <div className="h-11 bg-[#e2e8f0]/40 flex items-center px-4 text-[13px] font-[600] text-[#6b7a8d]">
                      .app.com
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Country</label>
                  <div className="h-11 bg-[#f8f9fb] rounded-xl px-4 flex items-center text-[13px] text-[#0d1b2a]">
                    🇮🇳 India
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Phone</label>
                  <div className="flex bg-[#f8f9fb] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0d6e5a]/10">
                    <div className="bg-[#e2e8f0]/40 flex items-center px-3.5 text-[13px] font-bold text-[#6b7a8d] border-r border-[#e2e8f0]">
                      +91
                    </div>
                    <input type="text" placeholder="Number" className="flex-1 h-11 bg-transparent border-none px-4 text-[13px] text-[#0d1b2a] focus:ring-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-[#f0f4f8] flex items-center justify-end gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-[14px] border border-[#e2e8f0] text-[#6b7a8d] text-[13px] font-[700] uppercase tracking-widest rounded-[12px] hover:bg-[#f8f9fb] transition-colors"
              >
                Cancel
              </button>
              <button className="px-8 py-[14px] bg-[#0d6e5a] text-white text-[13px] font-[700] uppercase tracking-widest rounded-[12px] shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all">
                CREATE TENANT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
