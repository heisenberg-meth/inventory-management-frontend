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
          <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <ShieldAlert className="w-3 h-3" /> Root
          </span>
        );
      case 'Platform Admin': 
        return (
          <span className="px-3 py-1 bg-[#f59e0b] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <ShieldCheck className="w-3 h-3" /> Platform Admin
          </span>
        );
      case 'Support Admin': 
        return (
          <span className="px-3 py-1 bg-[#3b82f6] text-white rounded-full text-[11px] font-[700] uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-sm">
             <Shield className="w-3 h-3" /> Support Admin
          </span>
        );
      default: return null;
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[36px] font-[800] text-[#0d1b2a] leading-tight tracking-tight">Platform Admins</h1>
          <p className="text-[15px] font-medium text-[#6b7a8d] mt-1 opacity-80">
            Manage super admins and platform-level access.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          ADD PLATFORM ADMIN
        </button>
      </div>

      {/* ROLE PERMISSION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Root */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[#ef4444]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[#ef4444]/10 rounded-full flex items-center justify-center text-[#ef4444] group-hover:scale-110 transition-transform">
             <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Root</h3>
                <p className="text-[13px] text-[#6b7a8d] font-medium mt-0.5">Full system control</p>
                <p className="text-[12px] text-[#9aa5b4] mt-1">All permissions — unrestricted</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[#0d6e5a]/10 text-[#0d6e5a] text-[11px] font-[700] rounded-full uppercase tracking-widest">1 user</span>
             </div>
          </div>
        </div>

        {/* Card 2: Platform Admin */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[#f59e0b]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[#f59e0b]/10 rounded-full flex items-center justify-center text-[#f59e0b] group-hover:scale-110 transition-transform">
             <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Platform Admin</h3>
                <p className="text-[13px] text-[#6b7a8d] font-medium mt-0.5">Manage tenants and assign plans</p>
                <p className="text-[12px] text-[#9aa5b4] mt-1">12 permissions</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[#0d6e5a]/10 text-[#0d6e5a] text-[11px] font-[700] rounded-full uppercase tracking-widest">3 users</span>
             </div>
          </div>
        </div>

        {/* Card 3: Support Admin */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px_24px] shadow-sm flex items-start gap-4 hover:border-[#3b82f6]/30 transition-all group">
          <div className="w-[40px] min-w-[40px] h-[40px] bg-[#3b82f6]/10 rounded-full flex items-center justify-center text-[#3b82f6] group-hover:scale-110 transition-transform">
             <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
             <div>
                <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Support Admin</h3>
                <p className="text-[13px] text-[#6b7a8d] font-medium mt-0.5">View tenant data, provide support</p>
                <p className="text-[12px] text-[#9aa5b4] mt-1">8 permissions</p>
             </div>
             <div className="mt-4">
                <span className="px-3 py-1 bg-[#0d6e5a]/10 text-[#0d6e5a] text-[11px] font-[700] rounded-full uppercase tracking-widest">2 users</span>
             </div>
          </div>
        </div>
      </div>

      {/* PLATFORM ADMINS TABLE */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">ADMIN</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">ROLE</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">EMAIL</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">LAST LOGIN</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">STATUS</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">CREATED</th>
                <th className="px-6 py-[16px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {initialAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[#f8fbff] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#0d6e5a]/10 flex items-center justify-center text-[#0d6e5a] text-[12px] font-[700]">
                        {admin.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <div className="text-[14px] font-[600] text-[#0d1b2a]">{admin.name}</div>
                           {admin.isAuthorized && (
                             <span className="px-2 py-0.5 bg-[#dcfce7] text-[#15803d] text-[10px] font-bold rounded uppercase tracking-[0.05em] border border-[#15803d]/20">AUTHORIZED</span>
                           )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {getRoleBadge(admin.role)}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6b7a8d] font-medium">{admin.email}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[13px] text-[#6b7a8d]">
                       <Clock className="w-3.5 h-3.5 text-[#9aa5b4]" />
                       {admin.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`flex items-center gap-1.5 text-[13px] font-[600] ${admin.status === 'Active' ? 'text-[#1db97a]' : 'text-[#94a3b8]'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active' ? 'bg-[#1db97a]' : 'bg-[#94a3b8]'}`} />
                       {admin.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[13px] text-[#6b7a8d] font-medium">{admin.created}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 text-[#9aa5b4]">
                      <button className="hover:text-[#0d6e5a] transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-[#0ea5e9] transition-colors"><Edit3 className="w-4 h-4" /></button>
                      {admin.role !== 'Root' && (
                        <button className="hover:text-[#ef4444] transition-colors"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white w-full max-w-[480px] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-8 border-b border-[#f0f4f8] flex items-center justify-between">
               <h2 className="text-[22px] font-[800] text-[#0d1b2a] tracking-tight">Add Platform Admin</h2>
               <button onClick={() => setShowModal(false)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] transition-colors rounded-xl hover:bg-[#f1f5f9]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Full Name</label>
                    <input type="text" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" placeholder="e.g. John Doe" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
                       <input type="email" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" placeholder="admin@ims.com" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Role</label>
                    <div className="relative group">
                       <select 
                         className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10 appearance-none cursor-pointer"
                         value={selectedRoleForPreview}
                         onChange={(e) => setSelectedRoleForPreview(e.target.value as any)}
                       >
                          <option value="Root">🔴 Root (Full system control)</option>
                          <option value="Platform Admin">🟠 Platform Admin (Manage tenants)</option>
                          <option value="Support Admin">🔵 Support Admin (View & support)</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4] pointer-events-none" />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Password</label>
                    <div className="relative">
                       <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
                       <input type="password" placeholder="••••••••" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-[800] uppercase tracking-widest text-[#9aa5b4] mb-2 px-1">Confirm</label>
                    <div className="relative">
                       <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
                       <input type="password" placeholder="••••••••" className="w-full h-12 bg-[#f8f9fb] border-none rounded-xl pl-11 pr-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10" />
                    </div>
                  </div>
               </div>

               {/* Permission Preview */}
               <div className="bg-[#1db97a]/5 border border-[#1db97a]/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                     <ShieldCheck className="w-4 h-4 text-[#1db97a]" />
                     <span className="text-[11px] font-[800] uppercase tracking-widest text-[#1db97a]">Permissions Preview</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                     {selectedRoleForPreview === 'Root' && (
                       <div className="text-[13px] font-[600] text-[#0d6e5a]">Unrestricted - Full system control across all modules.</div>
                     )}
                     {selectedRoleForPreview !== 'Root' && ['Manage tenants', 'View all data', 'Assign plans', 'Configure billing', 'Support access'].map((p, idx) => (
                       <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1db97a]" />
                          <span className="text-[12px] text-[#1db97a] font-medium">{p}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-0 flex items-center justify-end gap-3">
               <button 
                 onClick={() => setShowModal(false)}
                 className="px-6 py-3 border border-[#e2e8f0] text-[#6b7a8d] text-[12px] font-[800] uppercase tracking-widest rounded-xl hover:bg-[#f8f9fb] transition-colors"
               >
                 Cancel
               </button>
               <button className="px-10 py-3 bg-[#0d6e5a] text-white text-[12px] font-[800] uppercase tracking-widest rounded-xl shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all">
                 ADD ADMIN
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
