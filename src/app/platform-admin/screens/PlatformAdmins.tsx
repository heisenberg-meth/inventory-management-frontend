import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Shield, 
  Mail, Clock,
  Eye, Edit3, Trash2, X, ChevronDown,
  Lock, Key, Check
} from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'Root' | 'Platform Admin' | 'Support Admin';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  created: string;
  isAuthorized?: boolean;
}

const initialAdmins: AdminUser[] = [
  { id: 1, name: 'Admin Root', email: 'admin@ims-platform.com', role: 'Root', status: 'Active', lastLogin: 'Now', created: 'Jan 1, 2026', isAuthorized: true },
  { id: 2, name: 'Platform Admin 1', email: 'padmin@ims.com', role: 'Platform Admin', status: 'Active', lastLogin: '2h ago', created: 'Jan 15', isAuthorized: false },
  { id: 3, name: 'Support Admin 1', email: 'support1@ims.com', role: 'Support Admin', status: 'Active', lastLogin: '1d ago', created: 'Feb 1', isAuthorized: false },
  { id: 4, name: 'Platform Admin 2', email: 'padmin2@ims.com', role: 'Platform Admin', status: 'Active', lastLogin: '3d ago', created: 'Feb 20', isAuthorized: false },
  { id: 5, name: 'Support Admin 2', email: 'support2@ims.com', role: 'Support Admin', status: 'Inactive', lastLogin: '5d ago', created: 'Mar 1', isAuthorized: false },
];

export const PlatformAdmins: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoleForPreview, setSelectedRoleForPreview] = useState<'Root' | 'Platform Admin' | 'Support Admin'>('Platform Admin');

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Root': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-red)] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <ShieldAlert className="w-3 h-3" /> Root
          </span>
        );
      case 'Platform Admin': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-amber)] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <ShieldCheck className="w-3 h-3" /> Platform Admin
          </span>
        );
      case 'Support Admin': 
        return (
          <span className="px-3 py-1 bg-[var(--pa-blue)] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <Shield className="w-3 h-3" /> Support Admin
          </span>
        );
      default: return null;
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[var(--pa-text-near-black)] leading-tight tracking-tight">Platform Admins</h1>
          <p className="text-[15px] font-medium text-[var(--pa-text-muted)] mt-1 opacity-80">
            Manage super admins and platform-level access.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="h-[46px] px-8 bg-[var(--pa-teal)] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          ADD PLATFORM ADMIN
        </button>
      </div>

      {/* ROLE PERMISSION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Root */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[var(--pa-red)]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[var(--pa-red)]/10 rounded-full flex items-center justify-center text-[var(--pa-red)] group-hover:scale-110 transition-transform">
             <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Root</h3>
                <p className="text-[13px] text-[var(--pa-text-muted)] font-medium mt-0.5">Full system control</p>
                <p className="text-[12px] text-[var(--pa-text-light-gray)] mt-1">All permissions — unrestricted</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[var(--pa-teal)]/10 text-[var(--pa-teal)] text-[11px] font-[700] rounded-full uppercase tracking-widest">1 user</span>
             </div>
          </div>
        </div>

        {/* Card 2: Platform Admin */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[var(--pa-amber)]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[var(--pa-amber)]/10 rounded-full flex items-center justify-center text-[var(--pa-amber)] group-hover:scale-110 transition-transform">
             <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Platform Admin</h3>
                <p className="text-[13px] text-[var(--pa-text-muted)] font-medium mt-0.5">Manage tenants and assign plans</p>
                <p className="text-[12px] text-[var(--pa-text-light-gray)] mt-1">12 permissions</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[var(--pa-teal)]/10 text-[var(--pa-teal)] text-[11px] font-[700] rounded-full uppercase tracking-widest">3 users</span>
             </div>
          </div>
        </div>

        {/* Card 3: Support Admin */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[var(--pa-blue)]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[var(--pa-blue)]/10 rounded-full flex items-center justify-center text-[var(--pa-blue)] group-hover:scale-110 transition-transform">
             <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Support Admin</h3>
                <p className="text-[13px] text-[var(--pa-text-muted)] font-medium mt-0.5">View tenant data, provide support</p>
                <p className="text-[12px] text-[var(--pa-text-light-gray)] mt-1">8 permissions</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[var(--pa-teal)]/10 text-[var(--pa-teal)] text-[11px] font-[700] rounded-full uppercase tracking-widest">2 users</span>
             </div>
          </div>
        </div>
      </div>

      {/* PLATFORM ADMINS TABLE */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--pa-blue-gray-bg)]">
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">ADMIN</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--pa-border)]">
              {initialAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[var(--pa-row-hover)] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-[36px] h-[36px] rounded-full bg-[var(--pa-teal)]/10 flex items-center justify-center text-[var(--pa-teal)] text-[12px] font-[700]">
                        {admin.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <div className="text-[14px] font-[600] text-[var(--pa-text-near-black)]">{admin.name}</div>
                           {admin.isAuthorized && (
                             <span className="px-2 py-0.5 bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)] text-[10px] font-bold rounded uppercase tracking-[0.05em] border border-[var(--pa-badge-active-text)]/20">AUTHORIZED</span>
                           )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {getRoleBadge(admin.role)}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[var(--pa-text-muted)] font-medium">{admin.email}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[13px] text-[var(--pa-text-muted)]">
                       <Clock className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
                       {admin.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <div className={`flex items-center gap-1.5 text-[13px] font-[600] ${admin.status === 'Active' ? 'text-[var(--pa-mint)]' : 'text-[var(--pa-text-light-gray)]'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active' ? 'bg-[var(--pa-mint)]' : 'bg-[var(--pa-text-light-gray)]'}`} />
                       {admin.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[13px] text-[var(--pa-text-muted)] font-medium">{admin.created}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 text-[var(--pa-text-light-gray)]">
                      <button className="hover:text-[var(--pa-teal)] transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      {admin.role !== 'Root' && (
                        <button className="hover:text-[var(--pa-red)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PLATFORM ADMIN MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-[var(--pa-card-bg)] w-full max-w-[480px] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[var(--pa-border)]">
            {/* Header */}
            <div className="p-8 border-b border-[var(--pa-border)] flex items-center justify-between">
               <h2 className="text-[22px] font-[800] text-[var(--pa-text-near-black)] tracking-tight">Add Platform Admin</h2>
               <button onClick={() => setShowModal(false)} className="p-2 text-[var(--pa-text-light-gray)] hover:text-[var(--pa-text-near-black)] transition-colors rounded-xl hover:bg-[var(--pa-row-hover)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 px-1">Full Name</label>
                    <input type="text" className="w-full h-12 bg-[var(--pa-blue-gray-bg)] border-none rounded-xl px-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" placeholder="e.g. John Doe" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 px-1">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
                       <input type="email" className="w-full h-12 bg-[var(--pa-blue-gray-bg)] border-none rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" placeholder="admin@ims.com" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 px-1">Role</label>
                    <div className="relative group">
                       <select 
                         className="w-full h-12 bg-[var(--pa-blue-gray-bg)] border-none rounded-xl px-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 appearance-none cursor-pointer overflow-hidden transition-all"
                         value={selectedRoleForPreview}
                         onChange={(e) => setSelectedRoleForPreview(e.target.value as 'Root' | 'Platform Admin' | 'Support Admin')}
                       >
                          <option value="Root" className="bg-[var(--pa-card-bg)]">🔴 Root (Full system control)</option>
                          <option value="Platform Admin" className="bg-[var(--pa-card-bg)]">🟠 Platform Admin (Manage tenants)</option>
                          <option value="Support Admin" className="bg-[var(--pa-card-bg)]">🔵 Support Admin (View & support)</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)] pointer-events-none" />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 px-1">Password</label>
                    <div className="relative">
                       <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
                       <input type="password" placeholder="••••••••" className="w-full h-12 bg-[var(--pa-blue-gray-bg)] border-none rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2 px-1">Confirm</label>
                    <div className="relative">
                       <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
                       <input type="password" placeholder="••••••••" className="w-full h-12 bg-[var(--pa-blue-gray-bg)] border-none rounded-xl pl-11 pr-4 text-[13px] text-[var(--pa-text-near-black)] focus:ring-2 focus:ring-[var(--pa-teal)]/10 transition-all" />
                    </div>
                  </div>
               </div>

               {/* Permission Preview */}
               <div className="bg-[var(--pa-mint)]/5 border border-[var(--pa-mint)]/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                     <ShieldCheck className="w-4 h-4 text-[var(--pa-mint)]" />
                     <span className="text-[11px] font-[800] uppercase tracking-widest text-[var(--pa-mint)]">Permissions Preview</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                     {selectedRoleForPreview === 'Root' && (
                       <div className="text-[13px] font-[600] text-[var(--pa-teal)]">Unrestricted - Full system control across all modules.</div>
                     )}
                     {selectedRoleForPreview !== 'Root' && ['Manage tenants', 'View all data', 'Assign plans', 'Configure billing', 'Support access'].map((p, idx) => (
                       <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[var(--pa-mint)]" />
                          <span className="text-[12px] text-[var(--pa-mint)] font-medium">{p}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-0 flex items-center justify-end gap-3">
               <button 
                 onClick={() => setShowModal(false)}
                 className="px-6 py-3 border border-[var(--pa-border)] text-[var(--pa-text-muted)] text-[12px] font-[800] uppercase tracking-widest rounded-xl hover:bg-[var(--pa-row-hover)] transition-colors"
               >
                 Cancel
               </button>
               <button className="px-10 py-3 bg-[var(--pa-teal)] text-white text-[12px] font-[800] uppercase tracking-widest rounded-xl shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all">
                 ADD ADMIN
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
