import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Shield, Key } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  lastLogin: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  color: string;
}

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

const roleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-[var(--color-danger)]/20 text-[var(--color-danger)]";
    case "Manager":
      return "bg-[var(--color-warning)]/20 text-[var(--color-warning)]";
    case "Staff":
      return "bg-[var(--color-info)]/20 text-[var(--color-info)]";
    default:
      return "bg-purple-500/20 text-purple-400";
  }
};

export const UsersRoles: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles] = useState<Role[]>([]);
  const [permissions] = useState<string[]>([]);
  const [rolePermissions] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Users');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: 'Staff', status: 'Active' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const openAdd = () => { setEditing(null); setForm({ name: '', email: '', role: 'Staff', status: 'Active' }); setShowModal(true); };
  const openEdit = (u: User) => { setEditing(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editing) {
      setUsers(prev => prev.map(u => u.id === editing.id ? { ...u, ...form } : u));
      showToast('User updated!');
    } else {
      const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      setUsers(prev => [...prev, { id: Date.now(), avatar: initials, lastLogin: 'Never', ...form }]);
      showToast('User added!');
    }
    setShowModal(false);
  };

  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  // const currentRolePerms = ROLE_PERMISSIONS[selectedRole] || [];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Users & Roles</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage team members and access control</p>
        </div>
        {activeTab === 'Users' && (
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" />Add User
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Users', value: users.length },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length },
          { label: 'Roles', value: roles.length },
          { label: 'Admins', value: users.filter(u => u.role === 'Admin').length },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {['Users', 'Roles', 'Permissions Matrix'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-[var(--color-mint)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint)]" />}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {activeTab === 'Users' && (
        <>
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
            </div>
          </div>

          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                  <tr>{['User', 'Email', 'Role', 'Last Login', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filtered.map(user => (
                    <tr key={user.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[var(--color-mint)] flex items-center justify-center text-white font-semibold text-sm">
                            {user.avatar}
                          </div>
                          <span className="font-medium text-sm text-[var(--color-text-primary)]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{user.email}</td>
                      <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColor(user.role)}`}>{user.role}</span></td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(user)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteTarget(user)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ROLES TAB */}
      {activeTab === 'Roles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map(role => (
            <div key={role.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${role.color}20` }}>
                    <Shield className="w-5 h-5" style={{ color: role.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">{role.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{role.userCount} user{role.userCount !== 1 ? 's' : ''}</div>
                  </div>
                </div>
                <button className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{role.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(rolePermissions[role.name] || []).slice(0, 4).map(perm => (
                  <span key={perm} className="px-2 py-0.5 bg-[var(--color-surface-secondary)] text-xs text-[var(--color-text-secondary)] rounded-full">{perm}</span>
                ))}
                {(rolePermissions[role.name] || []).length > 4 && (
                  <span className="px-2 py-0.5 bg-[var(--color-mint)]/20 text-xs text-[var(--color-mint)] rounded-full">+{(rolePermissions[role.name] || []).length - 4} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PERMISSIONS MATRIX TAB */}
      {activeTab === 'Permissions Matrix' && (
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
            <Key className="w-4 h-4 text-[var(--color-mint)]" />
            <span className="font-semibold text-sm text-[var(--color-text-primary)]">Role Permissions Matrix</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase whitespace-nowrap">Permission</th>
                  {roles.map(r => (
                    <th key={r.id} className="px-4 py-3 text-center text-xs font-semibold uppercase whitespace-nowrap" style={{ color: r.color }}>{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {permissions.map(perm => (
                  <tr key={perm} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <td className="px-4 py-2.5 text-sm text-[var(--color-text-primary)]">{perm}</td>
                    {roles.map(role => {
                      const hasPerm = (rolePermissions[role.name] || []).includes(perm);
                      return (
                        <td key={role.id} className="px-4 py-2.5 text-center">
                          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center text-xs ${hasPerm ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]'}`}>
                            {hasPerm ? '✓' : '—'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit User' : 'Add User'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Full Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} /></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email <span className="text-[var(--color-danger)]">*</span></label>
                <input type="email" placeholder="user@pharmacy.in" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={IC} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Role</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={IC}>
                    <option>Admin</option><option>Manager</option><option>Staff</option><option>Viewer</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={IC}>
                    <option>Active</option><option>Inactive</option>
                  </select></div>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">{editing ? 'Save' : 'Add User'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete User</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={() => { setUsers(prev => prev.filter(u => u.id !== deleteTarget.id)); setDeleteTarget(null); showToast('User deleted.'); }} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
