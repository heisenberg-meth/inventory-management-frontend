import React, { useState } from 'react';
import { 
  Users, Search, 
  CheckCircle2, ShieldCheck, UserCircle2,
  Eye, Edit3, Trash2, ChevronDown,
  Building2, Clock, ChevronRight
} from 'lucide-react';

interface TenantUser {
  id: number;
  name: string;
  email: string;
  tenant: string;
  role: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  created: string;
}

const initialUsers: TenantUser[] = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi@abcpharma.com', tenant: 'ABC Pharmacy', role: 'Admin', department: 'Operations', status: 'Active', lastLogin: '2 min ago', created: 'Jan 15' },
  { id: 2, name: 'Arjun Joshi', email: 'arjun@abcpharma.com', tenant: 'ABC Pharmacy', role: 'Manager', department: 'Inventory', status: 'Active', lastLogin: '2h ago', created: 'Feb 20' },
  { id: 3, name: 'Suresh Mehta', email: 'suresh@freshmart.com', tenant: 'FreshMart', role: 'Admin', department: 'Operations', status: 'Active', lastLogin: '1h ago', created: 'Dec 5' },
  { id: 4, name: 'Priya Reddy', email: 'priya@abcpharma.com', tenant: 'ABC Pharmacy', role: 'Staff', department: 'Billing', status: 'Active', lastLogin: '4h ago', created: 'Mar 10' },
  { id: 5, name: 'Alice Chen', email: 'alice@central.com', tenant: 'Central WH', role: 'Viewer', department: 'Finance', status: 'Active', lastLogin: '1d ago', created: 'Apr 1' },
  { id: 6, name: 'David Lee', email: 'david@quickretail.com', tenant: 'QuickRetail', role: 'Staff', department: 'Operations', status: 'Inactive', lastLogin: '5d ago', created: 'Feb 28' },
  { id: 7, name: 'Kiran Shah', email: 'kiran@biolife.com', tenant: 'BioLife Diagnostics', role: 'Admin', department: 'Management', status: 'Suspended', lastLogin: '20d ago', created: 'Dec 10' },
];

export const TenantUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-red)] text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            <span className="text-[14px]">⊙</span> Admin
          </span>
        );
      case 'Manager': 
        return (
          <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            Manager
          </span>
        );
      case 'Staff': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-teal)] text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            Staff
          </span>
        );
      case 'Viewer': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-badge-inactive-bg)] text-[var(--pa-badge-inactive-text)] border border-[var(--pa-border)] rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            <span className="text-[14px] opacity-60">◉</span> Viewer
          </span>
        );
      default: return null;
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'text-[var(--pa-mint)]';
      case 'Inactive': return 'text-[var(--pa-text-light-gray)]';
      case 'Suspended': return 'text-[var(--pa-red)]';
      default: return 'text-[var(--pa-text-muted)]';
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[var(--pa-text-near-black)] leading-tight tracking-tight">Tenant Users</h1>
          <p className="text-[15px] font-medium text-[var(--pa-text-muted)] mt-1 opacity-80">
            All users across every tenant on the platform.
          </p>
        </div>
        <button className="h-[46px] px-8 bg-[var(--pa-teal)] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
          INVITE USER
        </button>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
          <input 
            type="text" 
            placeholder="Search users by name, email, tenant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Tenants', 'All Roles', 'All Status'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[8px] text-[13px] font-[500] text-[var(--pa-text-near-black)] flex items-center gap-2 hover:border-[var(--pa-teal)] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
            </button>
          ))}
        </div>
      </div>

      {/* METRIC CHIPS */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { icon: Users, value: '284', label: 'Total Users', color: 'text-[var(--pa-text-near-black)]' },
          { icon: CheckCircle2, value: '271', label: 'Active', color: 'text-[var(--pa-mint)]' },
          { icon: ShieldCheck, value: '18', label: 'Admins', color: 'text-[var(--pa-red)]' },
          { icon: UserCircle2, value: '198', label: 'Staff', color: 'text-[var(--pa-teal)]' },
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

      {/* USERS TABLE CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--pa-blue-gray-bg)]">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">USER</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--pa-border)]">
              {initialUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-[var(--pa-teal)]/10 flex items-center justify-center text-[var(--pa-teal)] text-[11px] font-[700]">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-[600] text-[var(--pa-text-near-black)] group-hover:text-[var(--pa-teal)] transition-colors">{user.name}</div>
                        <div className="text-[12px] text-[var(--pa-text-muted)]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[13px] font-[600] text-[var(--pa-text-near-black)]">
                       <Building2 className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
                       {user.tenant}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-[var(--pa-text-muted)] font-medium">{user.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-[13px] font-[600] ${getStatusStyle(user.status)}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(user.status).replace('text-', 'bg-')}`} />
                       {user.status === 'Active' ? '✓ Active' : user.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[13px] text-[var(--pa-text-muted)]">
                       <Clock className="w-3.5 h-3.5" />
                       {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)]">{user.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-[var(--pa-text-light-gray)]">
                      <button className="hover:text-[var(--pa-teal)] transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="hover:text-[var(--pa-red)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[var(--pa-blue-gray-bg)] border-t border-[var(--pa-border)] flex items-center justify-between">
           <span className="text-[13px] text-[var(--pa-text-muted)]">Showing 1–7 of 284 users</span>
           <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 41].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-[8px] text-[12px] font-[700] transition-all ${p === 1 ? 'bg-[var(--pa-teal)] text-white shadow-md' : 'text-[var(--pa-text-muted)] hover:bg-[var(--pa-row-hover)]'}`}>
                  {p}
                </button>
              ))}
              <button className="p-1 text-[var(--pa-text-muted)] hover:text-[var(--pa-teal)]"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};
