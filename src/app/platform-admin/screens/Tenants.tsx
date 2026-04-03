import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      case 'Pharmacy': return 'bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)]';
      case 'Supermarket': return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
      case 'Warehouse': return 'bg-[var(--pa-badge-trial-bg)] text-[var(--pa-badge-trial-text)]';
      case 'Retail': return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
      default: return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-500/10 text-purple-500';
      case 'Pro': return 'bg-[var(--pa-mint)]/10 text-[var(--pa-mint)]';
      case 'Free': return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
      default: return 'bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)]';
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-[var(--pa-mint)]';
      case 'Trial': return 'text-[var(--pa-amber)]';
      case 'Suspended': return 'text-[var(--pa-red)]';
      default: return 'text-[var(--pa-text-muted)]';
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[var(--pa-text-near-black)] leading-tight tracking-tight">Tenants</h1>
          <p className="text-[15px] font-medium text-[var(--pa-text-muted)] mt-1 opacity-85">
            Manage all registered business tenants on the platform.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="h-[46px] px-8 bg-[var(--pa-teal)] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          CREATE NEW TENANT
        </button>
      </div>

      {/* FILTER + SEARCH BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
          <input 
            type="text" 
            placeholder="Search tenants, domains, owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Types', 'All Plans', 'All Status'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[8px] text-[13px] font-[500] text-[var(--pa-text-near-black)] flex items-center gap-2 hover:border-[var(--pa-teal)] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
            </button>
          ))}
        </div>
      </div>

      {/* METRICS CHIPS */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { icon: Building2, value: '142', label: 'Total', color: 'text-[var(--pa-text-near-black)]' },
          { icon: CheckCircle2, value: '138', label: 'Active', color: 'text-[#1db97a]' },
          { icon: Clock, value: '3', label: 'Trial', color: 'text-[#f59e0b]' },
          { icon: XCircle, value: '1', label: 'Suspended', color: 'text-[#ef4444]' },
        ].map((chip, idx) => (
          <div key={idx} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[8px] p-[10px_16px] flex items-center gap-3">
            <chip.icon className={`w-[14px] h-[14px] ${chip.color}`} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[16px] font-[700] text-[var(--pa-text-near-black)]">{chip.value}</span>
              <span className="text-[12px] font-medium text-[var(--pa-text-muted)]">{chip.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TENANTS TABLE CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--pa-blue-gray-bg)]">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">TENANT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">BUSINESS TYPE</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">DOMAIN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">PLAN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">STATUS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">USERS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">CREATED</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--pa-border)]">
              {initialTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-[var(--pa-teal)]/10 flex items-center justify-center text-[var(--pa-teal)] text-[11px] font-[700]">
                        {tenant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-[600] text-[var(--pa-text-near-black)] group-hover:text-[var(--pa-teal)] transition-colors">{tenant.name}</div>
                        <div className="text-[12px] text-[var(--pa-text-muted)]">{tenant.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-[600] ${getPillColor(tenant.type)}`}>
                      {tenant.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-medium">{tenant.domain}</td>
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
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-bold">{tenant.users} users</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)]">{tenant.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-[var(--pa-text-light-gray)]">
                      <Link to={`/admin/tenants/${tenant.id}`} className="hover:text-[var(--pa-teal)] transition-colors"><Eye className="w-4 h-4" /></Link>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="hover:text-[var(--pa-red)] transition-colors"><ShieldAlert className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[var(--pa-blue-gray-bg)] border-t border-[var(--pa-border)] flex items-center justify-between">
           <span className="text-[13px] text-[var(--pa-text-muted)]">Showing 1–6 of 142 tenants</span>
           <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 24].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-[8px] text-[12px] font-[700] transition-all ${p === 1 ? 'bg-[var(--pa-teal)] text-white shadow-md' : 'text-[var(--pa-text-muted)] hover:bg-[var(--pa-row-hover)]'}`}>
                  {p}
                </button>
              ))}
              <button className="p-1 text-[var(--pa-text-muted)] hover:text-[var(--pa-teal)]"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      {/* CREATE TENANT MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-[var(--pa-card-bg)] w-full max-w-[560px] rounded-[16px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[var(--pa-border)]">
            {/* Header */}
            <div className="p-[24px_32px] border-b border-[var(--pa-border)] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--pa-mint)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--pa-text-muted)]">TENANT REGISTRATION</span>
                </div>
                <h2 className="text-[20px] font-[700] text-[var(--pa-text-near-black)]">Create New Tenant</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-[var(--pa-text-light-gray)] hover:text-[var(--pa-text-near-black)] transition-colors rounded-lg hover:bg-[var(--pa-row-hover)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-[32px] space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Business Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)] group-focus-within:text-[var(--pa-teal)] transition-colors" />
                    <input type="text" placeholder="e.g. ABC Pharmacy" className="w-full h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Owner Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)] group-focus-within:text-[var(--pa-teal)] transition-colors" />
                    <input type="text" placeholder="Full name" className="w-full h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Owner Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)] group-focus-within:text-[var(--pa-teal)] transition-colors" />
                    <input type="email" placeholder="owner@company.com" className="w-full h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Business Type</label>
                  <select className="w-full h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl px-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 appearance-none">
                    <option>Pharmacy</option>
                    <option>Supermarket</option>
                    <option>Warehouse</option>
                    <option>Retail</option>
                  </select>
                </div>

                <div className="col-span-1">
                   <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Plan</label>
                    <select className="w-full h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl px-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 appearance-none">
                      <option>Pro</option>
                      <option>Enterprise</option>
                      <option>Free</option>
                    </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Subdomain</label>
                  <div className="flex bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--pa-teal)]/10">
                    <div className="pl-4 flex items-center">
                      <Globe className="w-4 h-4 text-[var(--pa-text-light-gray)]" />
                    </div>
                    <input type="text" placeholder="abc-pharma" className="flex-1 h-11 bg-transparent border-none pl-3 pr-2 text-[13px] text-[var(--pa-text-near-black)] focus:ring-0" />
                    <div className="h-11 bg-[var(--pa-border)]/40 flex items-center px-4 text-[13px] font-[600] text-[var(--pa-text-muted)] border-l border-[var(--pa-border)]">
                      .app.com
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Country</label>
                  <div className="h-11 bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl px-4 flex items-center text-[13px] text-[var(--pa-text-near-black)]">
                    🇮🇳 India
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block text-[12px] font-[700] uppercase tracking-wider text-[var(--pa-text-muted)] mb-2 px-1">Phone</label>
                  <div className="flex bg-[var(--pa-blue-gray-bg)] border border-[var(--pa-border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--pa-teal)]/10">
                    <div className="bg-[var(--pa-border)]/40 flex items-center px-3.5 text-[13px] font-bold text-[var(--pa-text-muted)] border-r border-[var(--pa-border)]">
                      +91
                    </div>
                    <input type="text" placeholder="Number" className="flex-1 h-11 bg-transparent border-none px-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-[var(--pa-border)] flex items-center justify-end gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-[14px] border border-[var(--pa-border)] text-[var(--pa-text-muted)] text-[13px] font-[700] uppercase tracking-widest rounded-[12px] hover:bg-[var(--pa-row-hover)] transition-colors"
              >
                Cancel
              </button>
              <button className="px-8 py-[14px] bg-[var(--pa-teal)] text-white text-[13px] font-[700] uppercase tracking-widest rounded-[12px] shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all">
                CREATE TENANT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
