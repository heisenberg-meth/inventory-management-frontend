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
          <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            <span className="text-[14px]">⊙</span> Admin
          </span>
        );
      case 'Manager': 
        return (
          <span className="px-3 py-1 bg-[#a855f7] text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            Manager
          </span>
        );
      case 'Staff': 
        return (
          <span className="px-3 py-1 bg-[#0d6e5a] text-white rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            Staff
          </span>
        );
      case 'Viewer': 
        return (
          <span className="px-3 py-1 bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] rounded-full text-[11px] font-[700] flex items-center gap-1.5 w-fit">
            <span className="text-[14px] text-[#94a3b8]">◉</span> Viewer
          </span>
        );
      default: return null;
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'text-[#1db97a]';
      case 'Inactive': return 'text-[#94a3b8]';
      case 'Suspended': return 'text-[#ef4444]';
      default: return 'text-[#64748b]';
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[#0d1b2a] leading-tight tracking-tight">Tenant Users</h1>
          <p className="text-[15px] font-medium text-[#6b7a8d] mt-1 opacity-80">
            All users across every tenant on the platform.
          </p>
        </div>
        <button className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
          INVITE USER
        </button>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
          <input 
            type="text" 
            placeholder="Search users by name, email, tenant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[#0d1b2a] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Tenants', 'All Roles', 'All Status'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-white border border-[#e2e8f0] rounded-[8px] text-[13px] font-[500] text-[#0d1b2a] flex items-center gap-2 hover:border-[#0d6e5a] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[#9aa5b4]" />
            </button>
          ))}
        </div>
      </div>

      {/* METRIC CHIPS */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { icon: Users, value: '284', label: 'Total Users', color: 'text-[#0d1b2a]' },
          { icon: CheckCircle2, value: '271', label: 'Active', color: 'text-[#1db97a]' },
          { icon: ShieldCheck, value: '18', label: 'Admins', color: 'text-[#ef4444]' },
          { icon: UserCircle2, value: '198', label: 'Staff', color: 'text-[#0d6e5a]' },
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

      {/* USERS TABLE CARD */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">USER</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">TENANT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">ROLE</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">DEPARTMENT</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">STATUS</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">LAST LOGIN</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">CREATED</th>
                <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {initialUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8fbff] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#0d6e5a]/10 flex items-center justify-center text-[#0d6e5a] text-[11px] font-[700]">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-[600] text-[#0d1b2a] group-hover:text-[#0d6e5a] transition-colors">{user.name}</div>
                        <div className="text-[12px] text-[#6b7a8d]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[13px] font-[600] text-[#1a2535]">
                       <Building2 className="w-3.5 h-3.5 text-[#9aa5b4]" />
                       {user.tenant}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-[#6b7a8d] font-medium">{user.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-[13px] font-[600] ${getStatusStyle(user.status)}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(user.status).replace('text-', 'bg-')}`} />
                       {user.status === 'Active' ? '✓ Active' : user.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[13px] text-[#6b7a8d]">
                       <Clock className="w-3.5 h-3.5" />
                       {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d]">{user.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-[#9aa5b4]">
                      <button className="hover:text-[#0d6e5a] transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="hover:text-[#ef4444] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
           <span className="text-[13px] text-[#6b7a8d]">Showing 1–7 of 284 users</span>
           <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 41].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-[8px] text-[12px] font-[700] transition-all ${p === 1 ? 'bg-[#0d6e5a] text-white shadow-md' : 'text-[#6b7a8d] hover:bg-[#f1f5f9]'}`}>
                  {p}
                </button>
              ))}
              <button className="p-1 text-[#6b7a8d] hover:text-[#0d6e5a]"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};
