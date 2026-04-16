import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Plus, X, Mail, Shield, Edit, Trash2, Check, AlertTriangle, Search, UserCheck, UserX } from 'lucide-react';
import { getUsers, createUser, updateUser, deleteUser, type User } from '../data/apiService';

interface Role {
  name: string;
  description: string;
  permissions: string;
  color: string;
}

const roles: Role[] = [
  { name: 'Root', description: 'Full system access across all tenants', permissions: 'All', color: 'var(--color-danger)' },
  { name: 'Platform Admin', description: 'Manage platform and all tenants', permissions: '145', color: 'var(--color-warning)' },
  { name: 'Support Admin', description: 'Customer support and assistance', permissions: '78', color: 'var(--color-info)' },
  { name: 'Tenant Admin', description: 'Full access within tenant organization', permissions: '92', color: 'var(--color-mint)' },
  { name: 'Manager', description: 'Manage inventory and team members', permissions: '56', color: 'var(--color-info)' },
  { name: 'Staff', description: 'Basic inventory operations only', permissions: '24', color: 'var(--color-text-muted)' },
];

const INPUT_CLS = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Invite form
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('Staff');

  // Edit form
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' as 'Active' | 'Inactive' });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return users.filter(u =>
      !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Root': return 'var(--color-danger)';
      case 'Platform Admin': return 'var(--color-warning)';
      case 'Tenant Admin': return 'var(--color-mint)';
      case 'Manager': return 'var(--color-info)';
      case 'Staff': return 'var(--color-text-muted)';
      default: return 'var(--color-mint)';
    }
  };

  const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

  const handleInvite = async () => {
    if (!inviteEmail || !inviteName) return;
    try {
      await createUser({
        name: inviteName,
        email: inviteEmail,
        role: inviteRole,
        status: 'Active'
      });
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteName('');
      setInviteRole('Staff');
      showSuccess(`Invitation sent to ${inviteEmail}`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to invite user:', err);
      alert('Failed to invite user');
    }
  };

  const openEdit = (user: User) => {
    setEditUser(user);
    setEditForm({ name: user.name || '', email: user.email || '', role: user.role || '', status: user.scope === 'INACTIVE' ? 'Inactive' : 'Active' });
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;
    try {
      await updateUser(editUser.id, {
        ...editForm,
        scope: editForm.status === 'Inactive' ? 'INACTIVE' : 'ACTIVE'
      });
      setEditUser(null);
      showSuccess('User updated successfully!');
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser(deleteTarget.id);
      setDeleteTarget(null);
      showSuccess('User removed.');
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  const toggleStatus = async (user: User) => {
    try {
      const newStatus = user.scope === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
      await updateUser(user.id, { scope: newStatus });
      showSuccess(`${user.name} ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'}`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    }
  };

  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Active', value: users.filter(u => u.scope !== 'INACTIVE').length },
    { label: 'Inactive', value: users.filter(u => u.scope === 'INACTIVE').length },
    { label: 'Roles', value: roles.length },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">Users & Roles</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage users and role-based access control</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Users List */}
        <div className="lg:col-span-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)]">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Users ({filteredUsers.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">User</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Role</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Last Login</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center"><div className="w-8 h-8 border-3 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--color-text-secondary)] text-sm">No users found</td></tr>
                ) : filteredUsers.map((user) => {
                  const roleColor = getRoleColor(user.role);
                  const isActive = user.scope !== 'INACTIVE';
                  return (
                    <tr key={user.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0"
                            style={{ backgroundColor: roleColor }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] truncate">{user.name}</div>
                            <div className="text-xs text-[var(--color-text-secondary)] truncate hidden sm:block">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: `${roleColor}20`, color: roleColor }}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span 
                          className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            backgroundColor: isActive ? 'rgba(29,185,122,0.15)' : 'rgba(100,116,139,0.15)',
                            color: isActive ? 'var(--color-mint)' : 'var(--color-text-muted)'
                          }}
                          onClick={() => toggleStatus(user)}
                          title={`Click to ${isActive ? 'deactivate' : 'activate'}`}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden md:table-cell">{'N/A'}</td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex gap-1 sm:gap-2">
                          <button 
                            onClick={() => openEdit(user)}
                            className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleStatus(user)}
                            className="p-1.5 rounded hover:bg-[var(--color-warning)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-warning)] transition-colors"
                            title={isActive ? 'Deactivate' : 'Activate'}
                          >
                            {isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => setDeleteTarget(user)}
                            className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roles Panel */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Roles</h3>
            <button className="text-sm text-[var(--color-mint)] hover:text-[var(--color-mint-hover)] font-medium">
              + Add Role
            </button>
          </div>
          <div className="p-4 space-y-3">
            {roles.map((role, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRole(selectedRole?.name === role.name ? null : role)}
                className={`w-full p-4 rounded-lg text-left transition-all border ${selectedRole?.name === role.name ? 'border-[var(--color-mint)] bg-[var(--color-mint-glow)]' : 'border-transparent bg-[var(--color-surface-secondary)] hover:border-[var(--color-border)]'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 flex-shrink-0" style={{ color: role.color }} />
                    <span className="text-sm font-semibold" style={{ color: role.color }}>{role.name}</span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap ml-2">{role.permissions} perms</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">{role.description}</p>
                {selectedRole?.name === role.name && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-mint)]">
                      {users.filter(u => u.role === role.name).length} user(s) assigned this role
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Invite User</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    className={INPUT_CLS + ' pl-10'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Select Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className={INPUT_CLS}>
                  {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </select>
                {inviteRole && (
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                    {roles.find(r => r.name === inviteRole)?.description}
                  </p>
                )}
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                User will receive an email invitation to join the organization
              </p>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex justify-end gap-3">
              <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">Cancel</button>
              <button 
                onClick={handleInvite} 
                disabled={!inviteEmail || !inviteName}
                className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm disabled:opacity-50"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Edit User</h2>
              <button onClick={() => setEditUser(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Full Name</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} className={INPUT_CLS + ' pl-10'} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Role</label>
                <select value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} className={INPUT_CLS}>
                  {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Status</label>
                <div className="flex gap-2 p-1 bg-[var(--color-surface-secondary)] rounded-lg">
                  {(['Active', 'Inactive'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setEditForm(f => ({ ...f, status: s }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${editForm.status === s ? 'bg-[var(--color-mint)] text-white' : 'text-[var(--color-text-secondary)]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex justify-end gap-3">
              <button onClick={() => setEditUser(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-[var(--color-danger)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Remove User</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-primary)] mb-6">
              Remove <strong>{deleteTarget.name}</strong> from the organization?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
