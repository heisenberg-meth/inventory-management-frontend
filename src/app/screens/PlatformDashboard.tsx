import React, { useState } from 'react';
import { Building2, Users, DollarSign, Headphones, TrendingUp, Eye, X, AlertTriangle, Check, Plus, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Tenant {
  id: number;
  name: string;
  type: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Suspended';
  users: number;
  lastActive: string;
  revenue: string;
}

const initialTenants: Tenant[] = [
  { id: 1, name: 'Metro Pharmacy', type: 'Pharmacy', plan: 'Enterprise', status: 'Active', users: 24, lastActive: '5 mins ago', revenue: '₹2.4M' },
  { id: 2, name: 'City Supermarket', type: 'Supermarket', plan: 'Pro', status: 'Active', users: 18, lastActive: '1 hour ago', revenue: '₹1.8M' },
  { id: 3, name: 'Warehouse Plus', type: 'Warehouse', plan: 'Pro', status: 'Active', users: 12, lastActive: '2 hours ago', revenue: '₹1.2M' },
  { id: 4, name: 'Fashion Retail Co', type: 'Retail', plan: 'Free', status: 'Active', users: 5, lastActive: '3 hours ago', revenue: '₹0' },
  { id: 5, name: 'Health Store', type: 'Pharmacy', plan: 'Pro', status: 'Suspended', users: 8, lastActive: '2 days ago', revenue: '₹890K' },
];

const signupData = [
  { month: 'Oct', signups: 12, id: '2023-10' },
  { month: 'Nov', signups: 18, id: '2023-11' },
  { month: 'Dec', signups: 24, id: '2023-12' },
  { month: 'Jan', signups: 31, id: '2024-01' },
  { month: 'Feb', signups: 38, id: '2024-02' },
  { month: 'Mar', signups: 45, id: '2024-03' },
];

const planDistribution = [
  { name: 'Free', value: 145, color: 'var(--color-text-muted)', id: 'plan-free' },
  { name: 'Pro', value: 89, color: 'var(--color-info)', id: 'plan-pro' },
  { name: 'Enterprise', value: 34, color: 'var(--color-mint)', id: 'plan-enterprise' },
];

const supportTickets = [
  { id: 'TKT-4521', tenant: 'Metro Pharmacy', subject: 'Invoice generation issue', priority: 'High', time: '10 mins ago' },
  { id: 'TKT-4520', tenant: 'City Supermarket', subject: 'User permission question', priority: 'Medium', time: '1 hour ago' },
  { id: 'TKT-4519', tenant: 'Warehouse Plus', subject: 'Stock sync problem', priority: 'High', time: '2 hours ago' },
];

const INPUT_CLS = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const PlatformDashboard: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [viewTenant, setViewTenant] = useState<Tenant | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<Tenant | null>(null);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvedTickets, setResolvedTickets] = useState<string[]>([]);

  // New tenant form
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantType, setNewTenantType] = useState('Pharmacy');
  const [newTenantPlan, setNewTenantPlan] = useState<'Free' | 'Pro' | 'Enterprise'>('Free');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSuspend = () => {
    if (!suspendTarget) return;
    setTenants(prev => prev.map(t => t.id === suspendTarget.id ? { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' } : t));
    if (viewTenant?.id === suspendTarget.id) {
      setViewTenant(prev => prev ? { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' } : null);
    }
    showSuccess(`${suspendTarget.name} ${suspendTarget.status === 'Active' ? 'suspended' : 'reactivated'}`);
    setSuspendTarget(null);
  };

  const handleAddTenant = () => {
    if (!newTenantName) return;
    const newTenant: Tenant = {
      id: Math.max(...tenants.map(t => t.id)) + 1,
      name: newTenantName,
      type: newTenantType,
      plan: newTenantPlan,
      status: 'Active',
      users: 1,
      lastActive: 'Just now',
      revenue: '₹0',
    };
    setTenants(prev => [newTenant, ...prev]);
    setShowAddTenant(false);
    setNewTenantName('');
    showSuccess(`Tenant "${newTenantName}" created!`);
  };

  const handleResolveTicket = (id: string) => {
    setResolvedTickets(prev => [...prev, id]);
    showSuccess(`Ticket ${id} marked as resolved`);
  };

  const filteredTenants = tenants.filter(t =>
    !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBusinessTypeColor = (type: string) => {
    switch (type) {
      case 'Pharmacy': return 'var(--color-mint)';
      case 'Supermarket': return 'var(--color-info)';
      case 'Warehouse': return 'var(--color-warning)';
      case 'Retail': return 'var(--color-danger)';
      default: return 'var(--color-mint)';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Free': return 'var(--color-text-muted)';
      case 'Pro': return 'var(--color-info)';
      case 'Enterprise': return 'var(--color-mint)';
      default: return 'var(--color-mint)';
    }
  };

  const metrics = [
    { icon: Building2, label: 'Total Tenants', value: tenants.length.toString(), iconBg: 'var(--color-mint)', change: '+12%' },
    { icon: Users, label: 'Active Tenants', value: tenants.filter(t => t.status === 'Active').length.toString(), iconBg: 'var(--color-info)', change: '+8%' },
    { icon: DollarSign, label: 'Total Revenue (MRR)', value: '₹8.4M', iconBg: 'var(--color-mint)', change: '+24%' },
    { icon: Headphones, label: 'Open Tickets', value: supportTickets.filter(t => !resolvedTickets.includes(t.id)).length.toString(), iconBg: 'var(--color-warning)', change: '-5%' },
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
          <div className="inline-block px-3 py-1 bg-[var(--color-mint)]/20 border border-[var(--color-mint)]/30 rounded-full mb-2">
            <span className="text-xs font-semibold text-[var(--color-mint)] uppercase tracking-wider">Platform Admin</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">Platform Dashboard</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Monitor all tenants and platform metrics</p>
        </div>
        <button
          onClick={() => setShowAddTenant(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Tenant
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-5">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${metric.iconBg}20` }}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: metric.iconBg }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-mint)]">
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </div>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-1">{metric.value}</div>
              <div className="text-xs sm:text-sm text-[var(--color-text-secondary)]">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search Tenants */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search tenants..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
        />
      </div>

      {/* Tenants Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Tenants ({filteredTenants.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Tenant Name</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Business Type</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Plan</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Users</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Last Active</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTenants.map((tenant) => {
                const typeColor = getBusinessTypeColor(tenant.type);
                const planColor = getPlanColor(tenant.plan);
                return (
                  <tr key={tenant.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-[var(--color-text-primary)]">{tenant.name}</td>
                    <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
                        {tenant.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: `${planColor}20`, color: planColor }}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span 
                        className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ 
                          backgroundColor: tenant.status === 'Active' ? 'rgba(29,185,122,0.15)' : 'rgba(239,68,68,0.15)',
                          color: tenant.status === 'Active' ? 'var(--color-mint)' : 'var(--color-danger)'
                        }}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] hidden sm:table-cell">{tenant.users}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden md:table-cell">{tenant.lastActive}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex gap-1 sm:gap-2">
                        <button 
                          onClick={() => setViewTenant(tenant)}
                          className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setSuspendTarget(tenant)}
                          className={`p-1.5 rounded transition-colors text-[var(--color-text-secondary)] ${tenant.status === 'Active' ? 'hover:bg-[var(--color-danger)]/20 hover:text-[var(--color-danger)]' : 'hover:bg-[var(--color-mint)]/20 hover:text-[var(--color-mint)]'}`}
                          title={tenant.status === 'Active' ? 'Suspend' : 'Reactivate'}
                        >
                          <AlertTriangle className="w-4 h-4" />
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Platform Activity */}
        <div className="lg:col-span-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-4">Platform Activity (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-primary)' }} />
              <Line type="monotone" dataKey="signups" stroke="var(--color-mint)" strokeWidth={2} dot={{ fill: 'var(--color-mint)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right Panel */}
        <div className="space-y-4 sm:space-y-6">
          {/* Plan Distribution */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-4">Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                  {planDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {planDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[var(--color-text-primary)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Support Tickets */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-4">Support Tickets</h3>
            <div className="space-y-3">
              {supportTickets.map((ticket) => {
                const isResolved = resolvedTickets.includes(ticket.id);
                return (
                  <div key={ticket.id} className={`p-3 rounded-lg transition-all ${isResolved ? 'opacity-50' : 'bg-[var(--color-surface-secondary)]'}`}>
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-semibold text-[var(--color-mint)]">{ticket.id}</span>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: ticket.priority === 'High' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                          color: ticket.priority === 'High' ? 'var(--color-danger)' : 'var(--color-warning)'
                        }}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="text-sm text-[var(--color-text-primary)] mb-1">{ticket.subject}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--color-text-muted)]">{ticket.tenant} · {ticket.time}</span>
                      {!isResolved && (
                        <button
                          onClick={() => handleResolveTicket(ticket.id)}
                          className="text-xs text-[var(--color-mint)] hover:underline"
                        >
                          Resolve
                        </button>
                      )}
                      {isResolved && <span className="text-xs text-[var(--color-mint)]">✓ Resolved</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* View Tenant Modal */}
      {viewTenant && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{viewTenant.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: viewTenant.status === 'Active' ? 'rgba(29,185,122,0.15)' : 'rgba(239,68,68,0.15)', color: viewTenant.status === 'Active' ? 'var(--color-mint)' : 'var(--color-danger)' }}>{viewTenant.status}</span>
              </div>
              <button onClick={() => setViewTenant(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Business Type', value: viewTenant.type },
                  { label: 'Subscription Plan', value: viewTenant.plan },
                  { label: 'Active Users', value: viewTenant.users.toString() },
                  { label: 'Last Active', value: viewTenant.lastActive },
                  { label: 'Revenue', value: viewTenant.revenue },
                  { label: 'Status', value: viewTenant.status },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewTenant(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Close</button>
              <button 
                onClick={() => { setSuspendTarget(viewTenant); setViewTenant(null); }}
                className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${viewTenant.status === 'Active' ? 'bg-[var(--color-danger)] hover:opacity-90 text-white' : 'bg-[var(--color-mint)] hover:bg-[var(--color-mint-hover)] text-white'}`}
              >
                {viewTenant.status === 'Active' ? 'Suspend Tenant' : 'Reactivate Tenant'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend/Reactivate Confirm */}
      {suspendTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${suspendTarget.status === 'Active' ? 'bg-[var(--color-danger)]/10' : 'bg-[var(--color-mint)]/10'}`}>
                <AlertTriangle className={`w-6 h-6 ${suspendTarget.status === 'Active' ? 'text-[var(--color-danger)]' : 'text-[var(--color-mint)]'}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {suspendTarget.status === 'Active' ? 'Suspend Tenant' : 'Reactivate Tenant'}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{suspendTarget.name}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-primary)] mb-6">
              {suspendTarget.status === 'Active' 
                ? `Suspending this tenant will disable access for all ${suspendTarget.users} users. Are you sure?`
                : `Reactivating will restore access for all ${suspendTarget.users} users.`
              }
            </p>
            <div className="flex gap-3">
              <button onClick={() => setSuspendTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Cancel</button>
              <button 
                onClick={handleSuspend}
                className={`flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium text-sm text-white ${suspendTarget.status === 'Active' ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-mint)]'}`}
              >
                {suspendTarget.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddTenant && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Add New Tenant</h2>
              <button onClick={() => setShowAddTenant(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Business Name *</label>
                <input type="text" placeholder="e.g., Metro Pharmacy" value={newTenantName} onChange={e => setNewTenantName(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Business Type</label>
                <select value={newTenantType} onChange={e => setNewTenantType(e.target.value)} className={INPUT_CLS}>
                  <option>Pharmacy</option>
                  <option>Supermarket</option>
                  <option>Warehouse</option>
                  <option>Retail</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Subscription Plan</label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-[var(--color-surface-secondary)] rounded-lg">
                  {(['Free', 'Pro', 'Enterprise'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setNewTenantPlan(p)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${newTenantPlan === p ? 'bg-[var(--color-mint)] text-white' : 'text-[var(--color-text-secondary)]'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowAddTenant(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Cancel</button>
              <button onClick={handleAddTenant} disabled={!newTenantName} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm disabled:opacity-50">Create Tenant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
