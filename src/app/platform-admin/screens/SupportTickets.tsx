import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Ticket, Clock, CheckCircle2, Star,
  Search, ChevronDown, Eye, UserPlus,
  X, Plus
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

type Priority = 'High' | 'Medium' | 'Low' | 'Urgent';
type Status = 'Open' | 'In Progress' | 'Resolved' | 'Urgent';

interface Message {
  sender: string;
  isAdmin: boolean;
  text: string;
  time: string;
}

interface TicketData {
  id: string;
  subject: string;
  tenant: string;
  priority: Priority;
  assignedTo: string | null;
  status: Status;
  created: string;
  contact: string;
  email: string;
  phone: string;
  description: string;
  messages: Message[];
}

const initialTickets: TicketData[] = [
  {
    id: 'TKT-001', subject: 'Cannot access billing module', tenant: 'ABC Pharmacy',
    priority: 'High', assignedTo: 'Support Admin 1', status: 'Open', created: '2h ago',
    contact: 'Ravi Kumar', email: 'ravi.kumar@abcpharmacy.com', phone: '+91 98765 43210',
    description: 'Users at ABC Pharmacy are reporting a 403 Forbidden error when attempting to navigate to the billing module. This issue affects all user roles within the tenant.',
    messages: [
      { sender: 'Ravi Kumar', isAdmin: false, text: 'I am getting a 403 error when clicking on the billing section. This has been happening since this morning.', time: '2h ago' },
      { sender: 'Support Admin 1', isAdmin: true, text: 'Hi Ravi, can you try clearing your browser cache and cookies, then logging in again?', time: '1h ago' },
      { sender: 'Ravi Kumar', isAdmin: false, text: 'Still not working after clearing cache. The issue persists on both Chrome and Firefox.', time: '45m ago' },
    ],
  },
  {
    id: 'TKT-002', subject: 'Stock transfer not working', tenant: 'FreshMart',
    priority: 'Medium', assignedTo: null, status: 'Urgent', created: '4h ago',
    contact: 'Suresh Mehta', email: 'suresh@freshmart.in', phone: '+91 87654 32109',
    description: 'Stock transfer between warehouses is failing with a timeout error. Multiple attempts have resulted in the same failure.',
    messages: [
      { sender: 'Suresh Mehta', isAdmin: false, text: 'Whenever I try to transfer stock between Warehouse A and B, I get a timeout error.', time: '4h ago' },
    ],
  },
  {
    id: 'TKT-003', subject: 'Invoice PDF not generating', tenant: 'Central WH',
    priority: 'Medium', assignedTo: 'Support Admin 2', status: 'Open', created: '1d ago',
    contact: 'Anjali Patel', email: 'anjali.patel@centralwh.com', phone: '+91 76543 21098',
    description: 'PDF generation for invoices returns a blank page. This started after the most recent platform update.',
    messages: [
      { sender: 'Anjali Patel', isAdmin: false, text: 'Invoice PDFs are generating as blank pages. This started after the last update.', time: '1d ago' },
    ],
  },
  {
    id: 'TKT-004', subject: 'How to add custom domain?', tenant: 'QuickRetail',
    priority: 'Low', assignedTo: 'Support Admin 1', status: 'Resolved', created: '2d ago',
    contact: 'Dev Sharma', email: 'dev.sharma@quickretail.com', phone: '+91 65432 10987',
    description: 'Tenant wants to configure a custom domain for their store portal.',
    messages: [
      { sender: 'Dev Sharma', isAdmin: false, text: 'How can I set up a custom domain for my store portal?', time: '2d ago' },
      { sender: 'Support Admin 1', isAdmin: true, text: 'You can configure this under Settings → Domain. Add a CNAME record pointing to our servers and it will propagate within 24 hours.', time: '2d ago' },
      { sender: 'Dev Sharma', isAdmin: false, text: 'Got it working, thank you!', time: '1d ago' },
    ],
  },
  {
    id: 'TKT-005', subject: 'API rate limit exceeded', tenant: 'MedPlus',
    priority: 'High', assignedTo: 'Platform Admin', status: 'In Progress', created: '2d ago',
    contact: 'Priya Nair', email: 'priya.nair@medplus.in', phone: '+91 54321 09876',
    description: 'Tenant is hitting API rate limits during peak business hours causing integration failures.',
    messages: [
      { sender: 'Priya Nair', isAdmin: false, text: 'We are getting 429 errors during 10am–2pm every day. Our integrations are failing.', time: '2d ago' },
      { sender: 'Platform Admin', isAdmin: true, text: 'We are investigating and will temporarily increase your rate limit while we optimize the underlying service.', time: '1d ago' },
    ],
  },
  {
    id: 'TKT-006', subject: 'Data export not working', tenant: 'ABC Pharmacy',
    priority: 'Medium', assignedTo: 'Support Admin 2', status: 'Resolved', created: '3d ago',
    contact: 'Ravi Kumar', email: 'ravi.kumar@abcpharmacy.com', phone: '+91 98765 43210',
    description: 'CSV export for inventory data was timing out for large datasets.',
    messages: [
      { sender: 'Ravi Kumar', isAdmin: false, text: 'Export button just spins and never downloads the file for datasets over 10k rows.', time: '3d ago' },
      { sender: 'Support Admin 2', isAdmin: true, text: 'We have fixed the timeout issue for large exports. Please try again and let us know.', time: '3d ago' },
    ],
  },
];

const PRIORITIES: Priority[] = ['High', 'Medium', 'Low', 'Urgent'];
const STATUSES: Status[] = ['Open', 'In Progress', 'Resolved', 'Urgent'];
const ASSIGNEES = ['Support Admin 1', 'Support Admin 2', 'Platform Admin'];
const TENANTS = ['ABC Pharmacy', 'FreshMart', 'Central WH', 'QuickRetail', 'MedPlus', 'BioLife Diag'];

const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case 'High': return 'bg-[#fee2e2] text-[#dc2626]';
    case 'Medium': return 'bg-[#fef3c7] text-[#92400e]';
    case 'Low': return 'bg-[#eff6ff] text-[#2563eb]';
    case 'Urgent': return 'bg-transparent border-2 border-[#ef4444] text-[#ef4444] animate-pulse';
  }
};

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case 'High': return '🔴';
    case 'Medium': return '🟡';
    case 'Low': return '🔵';
    case 'Urgent': return '🔴';
  }
};

const getStatusBadge = (status: Status) => {
  switch (status) {
    case 'Open': return 'bg-[#fef3c7] text-[#92400e]';
    case 'In Progress': return 'bg-[#dbeafe] text-[#1d4ed8]';
    case 'Resolved': return 'bg-[#dcfce7] text-[#15803d]';
    case 'Urgent': return 'bg-[#fee2e2] text-[#dc2626]';
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case 'Open': return '⏳';
    case 'In Progress': return '🔄';
    case 'Resolved': return '✓';
    case 'Urgent': return '🔴';
  }
};

/* ────────────────────── Dropdown component ────────────────────── */
const Dropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  allLabel?: string;
}> = ({ label, value, options, onChange, allLabel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const display = value || allLabel || label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-[36px] px-4 bg-white border border-[#e2e8f0] rounded-[8px] text-[13px] font-[500] text-[#0d1b2a] flex items-center gap-2 hover:border-[#0d6e5a] transition-all whitespace-nowrap"
      >
        {display} <ChevronDown className={`w-3.5 h-3.5 text-[#9aa5b4] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e2e8f0] rounded-[10px] shadow-xl z-[70] min-w-[160px] py-1 animate-in fade-in zoom-in-95 duration-150">
          {allLabel && (
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f8f9fb] transition-colors ${!value ? 'text-[#0d6e5a] font-bold' : 'text-[#334155]'}`}
            >
              {allLabel}
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f8f9fb] transition-colors ${value === opt ? 'text-[#0d6e5a] font-bold' : 'text-[#334155]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ────────────────────── Main component ────────────────────── */
export const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>(initialTickets);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterTenant, setFilterTenant] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTenant, setNewTenant] = useState(TENANTS[0]);

  // Edit state for the View Ticket modal
  const [editForm, setEditForm] = useState<Partial<TicketData>>({});

  const selectedTicket = tickets.find(t => t.id === selectedId) || null;

  const updateTicket = useCallback((id: string, patch: Partial<TicketData>) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const openDrawer = (id: string) => {
    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
      setEditForm({
        subject: ticket.subject,
        status: ticket.status,
        tenant: ticket.tenant,
        priority: ticket.priority,
        contact: ticket.contact,
        assignedTo: ticket.assignedTo,
        email: ticket.email,
        phone: ticket.phone,
        description: ticket.description,
      });
    }
    setSelectedId(id);
    setReplyText('');
  };

  const handleSaveChanges = () => {
    if (!selectedTicket) return;
    updateTicket(selectedTicket.id, editForm);
    if (replyText.trim()) {
      const newMsg: Message = { sender: 'Admin Root', isAdmin: true, text: replyText.trim(), time: 'Just now' };
      updateTicket(selectedTicket.id, { messages: [...selectedTicket.messages, newMsg] });
      if (selectedTicket.status === 'Open' && !editForm.status) {
        updateTicket(selectedTicket.id, { status: 'In Progress' });
      }
    }
    setReplyText('');
    setSelectedId(null);
  };

  const handleCreateTicket = () => {
    if (!newSubject.trim()) return;
    const nextNum = tickets.length + 1;
    const newTicket: TicketData = {
      id: `TKT-${String(nextNum).padStart(3, '0')}`,
      subject: newSubject.trim(),
      tenant: newTenant,
      priority: 'Medium',
      assignedTo: null,
      status: 'Open',
      created: 'Just now',
      contact: 'New User',
      email: 'user@example.com',
      phone: '+91 00000 00000',
      description: newSubject.trim(),
      messages: [],
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowCreateModal(false);
    setNewSubject('');
    openDrawer(newTicket.id);
  };

  // Compute metrics from live data
  const openCount = tickets.filter(t => t.status === 'Open' || t.status === 'Urgent').length;
  const pendingCount = tickets.filter(t => (t.status === 'Open' || t.status === 'Urgent') && t.messages.length > 0 && !t.messages[t.messages.length - 1].isAdmin).length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  // Filter logic
  const query = searchQuery.toLowerCase();
  const filtered = tickets.filter(t => {
    if (query && !(t.id.toLowerCase().includes(query) || t.subject.toLowerCase().includes(query) || t.tenant.toLowerCase().includes(query))) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    if (filterTenant && t.tenant !== filterTenant) return false;
    return true;
  });

  const uniqueTenants = [...new Set(tickets.map(t => t.tenant))];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      {/* PAGE HEADER */}
      <PageHeader
        section="CUSTOMER SUPPORT"
        title="Support"
        description="Manage support tickets from all tenants."
        ctaText="CREATE TICKET"
        onCtaClick={() => setShowCreateModal(true)}
      />

      {/* ━━━ SUPPORT METRIC CARDS (4) ━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Ticket, label: 'Open Tickets', value: String(openCount), color: 'text-[#f59e0b]', iconBg: 'bg-[#fef3c7]', sub: null },
          { icon: Clock, label: 'Pending Response', value: String(pendingCount), color: 'text-[#ef4444]', iconBg: 'bg-[#fee2e2]', sub: 'Needs attention' },
          { icon: CheckCircle2, label: 'Resolved Today', value: String(resolvedCount), color: 'text-[#1db97a]', iconBg: 'bg-[#dcfce7]', sub: null },
          { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-[#1db97a]', iconBg: 'bg-[#dcfce7]', sub: 'From closed tickets' },
        ].map((m, i) => (
          <div key={i} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-[12px] font-medium text-[#6b7a8d] mb-2 uppercase tracking-wider">{m.label}</div>
              <div className={`text-[28px] font-bold ${m.color}`}>{m.value}</div>
              {m.sub && <div className="text-[11px] font-medium text-[#6b7a8d] mt-1">{m.sub}</div>}
            </div>
            <div className={`w-11 h-11 ${m.iconBg} rounded-[10px] flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* ━━━ FILTER BAR ━━━ */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
          <input
            type="text"
            placeholder="Search tickets by subject, tenant, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Dropdown label="Status" value={filterStatus} options={STATUSES} onChange={setFilterStatus} allLabel="All Status" />
          <Dropdown label="Priority" value={filterPriority} options={PRIORITIES} onChange={setFilterPriority} allLabel="All Priority" />
          <Dropdown label="Tenant" value={filterTenant} options={uniqueTenants} onChange={setFilterTenant} allLabel="All Tenants" />
        </div>
      </div>

      {/* ━━━ TICKETS TABLE ━━━ */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                {['TICKET ID', 'SUBJECT', 'TENANT', 'PRIORITY', 'ASSIGNED TO', 'STATUS', 'CREATED', 'ACTIONS'].map((col) => (
                  <th key={col} className={`px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] ${col === 'ACTIONS' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => openDrawer(ticket.id)}
                  className={`hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group ${selectedId === ticket.id ? 'bg-[#f0fdf4]' : ''}`}
                >
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-bold text-[#0d6e5a] tracking-wider">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-[600] text-[var(--pa-text-near-black)] group-hover:text-[#0d6e5a] transition-colors">
                      {ticket.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-medium">{ticket.tenant}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold tracking-wider inline-flex items-center gap-1 ${getPriorityBadge(ticket.priority)}`}>
                      {getPriorityIcon(ticket.priority)} {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.assignedTo ? (
                      <span className="text-[13px] text-[var(--pa-text-near-black)] font-medium">{ticket.assignedTo}</span>
                    ) : (
                      <span className="text-[13px] text-[#ef4444] font-medium italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${getStatusBadge(ticket.status)}`}>
                      {getStatusIcon(ticket.status)} {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7a8d]">{ticket.created}</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDrawer(ticket.id)}
                        className="hover:text-[#0d6e5a] text-[#9aa5b4] transition-colors"
                        title="View ticket"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'Resolved' && ticket.assignedTo && (
                        <button
                          onClick={() => openDrawer(ticket.id)}
                          className="text-[11px] font-bold text-[#0d6e5a] hover:underline"
                        >
                          Reply
                        </button>
                      )}
                      {!ticket.assignedTo && (
                        <button
                          onClick={() => openDrawer(ticket.id)}
                          className="text-[11px] font-bold text-[#f59e0b] hover:underline flex items-center gap-1"
                        >
                          <UserPlus className="w-3 h-3" /> Assign
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[14px] text-[#9aa5b4]">
                    No tickets match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
          <span className="text-[13px] text-[#6b7a8d]">Showing {filtered.length} of {tickets.length} tickets</span>
        </div>
      </div>

      {/* ━━━ VIEW TICKET MODAL (light themed) ━━━ */}
      {selectedTicket && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]" onClick={() => setSelectedId(null)} />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[720px] rounded-[16px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-[20px_28px] border-b border-[#e2e8f0] flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#1db97a]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d]">TICKET DETAILS</span>
                  </div>
                  <h2 className="text-[18px] font-[700] text-[#0d1b2a]">
                    View Ticket — <span className="text-[#0d6e5a]">{selectedTicket.id}</span>
                  </h2>
                </div>
                <button onClick={() => setSelectedId(null)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] transition-colors rounded-lg hover:bg-[#f1f5f9]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body — scrollable form */}
              <div className="flex-1 overflow-y-auto p-[28px] space-y-5">
                {/* Row 1: Ticket ID | Status */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Ticket ID</label>
                    <input
                      type="text"
                      value={selectedTicket.id}
                      readOnly
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#6b7a8d] font-mono cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Status</label>
                    <select
                      value={editForm.status || selectedTicket.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as Status }))}
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#0d1b2a] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20"
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 2: Subject (full width) */}
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Subject</label>
                  <input
                    type="text"
                    value={editForm.subject ?? selectedTicket.subject}
                    onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#0d1b2a] focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20"
                  />
                </div>

                {/* Row 3: Tenant | Priority */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Tenant</label>
                    <input
                      type="text"
                      value={editForm.tenant ?? selectedTicket.tenant}
                      readOnly
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#6b7a8d] cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Priority</label>
                    <select
                      value={editForm.priority || selectedTicket.priority}
                      onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#0d1b2a] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20"
                    >
                      {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 4: Reported By | Assigned To */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Reported By</label>
                    <input
                      type="text"
                      value={editForm.contact ?? selectedTicket.contact}
                      readOnly
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#6b7a8d] cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Assigned To</label>
                    <select
                      value={editForm.assignedTo ?? selectedTicket.assignedTo ?? ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, assignedTo: e.target.value || null }))}
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#0d1b2a] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20"
                    >
                      <option value="">Unassigned</option>
                      {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 5: Contact Email | Phone */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={editForm.email ?? selectedTicket.email}
                      readOnly
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#6b7a8d] cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Phone</label>
                    <input
                      type="text"
                      value={editForm.phone ?? selectedTicket.phone}
                      readOnly
                      className="w-full h-11 bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] px-4 text-[13px] text-[#6b7a8d] cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Row 6: Description */}
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Description</label>
                  <textarea
                    value={editForm.description ?? selectedTicket.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full h-[100px] bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] p-4 text-[13px] text-[#0d1b2a] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20 resize-none"
                  />
                </div>

                {/* Row 7: Add Reply */}
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2">Add Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to the tenant..."
                    className="w-full h-[80px] bg-[#f8f9fb] border border-[#e2e8f0] rounded-[10px] p-4 text-[13px] text-[#0d1b2a] placeholder-[#9aa5b4] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20 resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-[20px_28px] border-t border-[#e2e8f0] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#6b7a8d]">Created {selectedTicket.created} · Last updated just now</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    selectedTicket.priority === 'High' || selectedTicket.priority === 'Urgent'
                      ? 'border-[#ef4444] text-[#ef4444]'
                      : selectedTicket.priority === 'Medium'
                        ? 'border-[#f59e0b] text-[#f59e0b]'
                        : 'border-[#3b82f6] text-[#3b82f6]'
                  }`}>
                    {selectedTicket.priority} priority
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    selectedTicket.status === 'Resolved'
                      ? 'border-[#1db97a] text-[#1db97a]'
                      : selectedTicket.status === 'In Progress'
                        ? 'border-[#3b82f6] text-[#3b82f6]'
                        : selectedTicket.status === 'Urgent'
                          ? 'border-[#ef4444] text-[#ef4444]'
                          : 'border-[#f59e0b] text-[#f59e0b]'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-6 py-[10px] border border-[#e2e8f0] text-[#6b7a8d] text-[12px] font-[700] uppercase tracking-widest rounded-[10px] hover:bg-[#f1f5f9] hover:text-[#0d1b2a] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-[10px] bg-[#0d6e5a] text-white text-[12px] font-[700] uppercase tracking-widest rounded-[10px] shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ━━━ CREATE TICKET MODAL ━━━ */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[480px] rounded-[16px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-[24px_32px] border-b border-[#f0f4f8] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#1db97a]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7a8d]">NEW TICKET</span>
                </div>
                <h2 className="text-[20px] font-[700] text-[#0d1b2a]">Create Support Ticket</h2>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] transition-colors rounded-lg hover:bg-[#f1f5f9]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-[32px] space-y-6">
              <div>
                <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCreateTicket(); }}
                  placeholder="Describe the issue..."
                  className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[12px] font-[700] uppercase tracking-wider text-[#6b7a8d] mb-2 px-1">Tenant</label>
                <select
                  value={newTenant}
                  onChange={(e) => setNewTenant(e.target.value)}
                  className="w-full h-11 bg-[#f8f9fb] border-none rounded-xl px-4 text-[13px] text-[#0d1b2a] focus:ring-2 focus:ring-[#0d6e5a]/10 appearance-none"
                >
                  {TENANTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="p-8 border-t border-[#f0f4f8] flex items-center justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-[14px] border border-[#e2e8f0] text-[#6b7a8d] text-[13px] font-[700] uppercase tracking-widest rounded-[12px] hover:bg-[#f8f9fb] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                disabled={!newSubject.trim()}
                className="px-8 py-[14px] bg-[#0d6e5a] text-white text-[13px] font-[700] uppercase tracking-widest rounded-[12px] shadow-lg shadow-[#0d6e5a]/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                CREATE TICKET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
