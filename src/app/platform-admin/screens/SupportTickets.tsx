import React, { useState } from 'react';
import {
  Ticket, Clock, CheckCircle2, Star,
  Search, ChevronDown, Eye, UserPlus,
  X, Send
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
  description: string;
  messages: Message[];
}

const tickets: TicketData[] = [
  {
    id: 'TKT-001', subject: 'Cannot access billing module', tenant: 'ABC Pharmacy',
    priority: 'High', assignedTo: 'Support Admin 1', status: 'Open', created: '2h ago',
    contact: 'Ravi Kumar',
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
    contact: 'Suresh Mehta',
    description: 'Stock transfer between warehouses is failing with a timeout error. Multiple attempts have resulted in the same failure.',
    messages: [
      { sender: 'Suresh Mehta', isAdmin: false, text: 'Whenever I try to transfer stock between Warehouse A and B, I get a timeout error.', time: '4h ago' },
    ],
  },
  {
    id: 'TKT-003', subject: 'Invoice PDF not generating', tenant: 'Central WH',
    priority: 'Medium', assignedTo: 'Support Admin 2', status: 'Open', created: '1d ago',
    contact: 'Anjali Patel',
    description: 'PDF generation for invoices returns a blank page. This started after the most recent platform update.',
    messages: [
      { sender: 'Anjali Patel', isAdmin: false, text: 'Invoice PDFs are generating as blank pages. This started after the last update.', time: '1d ago' },
    ],
  },
  {
    id: 'TKT-004', subject: 'How to add custom domain?', tenant: 'QuickRetail',
    priority: 'Low', assignedTo: 'Support Admin 1', status: 'Resolved', created: '2d ago',
    contact: 'Dev Sharma',
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
    contact: 'Priya Nair',
    description: 'Tenant is hitting API rate limits during peak business hours causing integration failures.',
    messages: [
      { sender: 'Priya Nair', isAdmin: false, text: 'We are getting 429 errors during 10am–2pm every day. Our integrations are failing.', time: '2d ago' },
      { sender: 'Platform Admin', isAdmin: true, text: 'We are investigating and will temporarily increase your rate limit while we optimize the underlying service.', time: '1d ago' },
    ],
  },
  {
    id: 'TKT-006', subject: 'Data export not working', tenant: 'ABC Pharmacy',
    priority: 'Medium', assignedTo: 'Support Admin 2', status: 'Resolved', created: '3d ago',
    contact: 'Ravi Kumar',
    description: 'CSV export for inventory data was timing out for large datasets.',
    messages: [
      { sender: 'Ravi Kumar', isAdmin: false, text: 'Export button just spins and never downloads the file for datasets over 10k rows.', time: '3d ago' },
      { sender: 'Support Admin 2', isAdmin: true, text: 'We have fixed the timeout issue for large exports. Please try again and let us know.', time: '3d ago' },
    ],
  },
];

const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case 'High': return 'bg-[var(--pa-red)]/10 text-[var(--pa-red)]';
    case 'Medium': return 'bg-[var(--pa-amber)]/10 text-[var(--pa-amber)]';
    case 'Low': return 'bg-[var(--pa-blue)]/10 text-[var(--pa-blue)]';
    case 'Urgent': return 'bg-transparent border-2 border-[var(--pa-red)] text-[var(--pa-red)] animate-pulse';
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
    case 'Open': return 'bg-[var(--pa-amber)]/10 text-[var(--pa-amber)]';
    case 'In Progress': return 'bg-[var(--pa-blue)]/10 text-[var(--pa-blue)]';
    case 'Resolved': return 'bg-[var(--pa-mint)]/10 text-[var(--pa-mint)]';
    case 'Urgent': return 'bg-[var(--pa-red)]/10 text-[var(--pa-red)]';
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

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

export const SupportTickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      {/* PAGE HEADER */}
      <PageHeader
        section="CUSTOMER SUPPORT"
        title="Support"
        description="Manage support tickets from all tenants."
        ctaText="CREATE TICKET"
        onCtaClick={() => console.log('Create ticket...')}
      />

      {/* ━━━ SUPPORT METRIC CARDS (4) ━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Ticket, label: 'Open Tickets', value: '12', color: 'text-[var(--pa-amber)]', iconBg: 'bg-[var(--pa-amber)]/10', sub: null },
          { icon: Clock, label: 'Pending Response', value: '4', color: 'text-[var(--pa-red)]', iconBg: 'bg-[var(--pa-red)]/10', sub: 'Needs attention' },
          { icon: CheckCircle2, label: 'Resolved Today', value: '8', color: 'text-[var(--pa-mint)]', iconBg: 'bg-[var(--pa-mint)]/10', sub: null },
          { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-[var(--pa-mint)]', iconBg: 'bg-[var(--pa-mint)]/10', sub: 'From closed tickets' },
        ].map((m, i) => (
          <div key={i} className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-[12px] font-medium text-[var(--pa-text-muted)] mb-2 uppercase tracking-wider">{m.label}</div>
              <div className={`text-[28px] font-bold ${m.color}`}>{m.value}</div>
              {m.sub && <div className="text-[11px] font-medium text-[var(--pa-text-muted)] mt-1">{m.sub}</div>}
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
          <input
            type="text"
            placeholder="Search tickets by subject, tenant, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[var(--pa-text-light-gray)]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Status', 'All Priority', 'All Tenants'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[8px] text-[13px] font-[500] text-[var(--pa-text-near-black)] flex items-center gap-2 hover:border-[var(--pa-teal)] hover:text-[var(--pa-teal)] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[var(--pa-text-light-gray)]" />
            </button>
          ))}
        </div>
      </div>

      {/* ━━━ TICKETS TABLE ━━━ */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--pa-blue-gray-bg)]/50">
                {['TICKET ID', 'SUBJECT', 'TENANT', 'PRIORITY', 'ASSIGNED TO', 'STATUS', 'CREATED', 'ACTIONS'].map((col) => (
                  <th key={col} className={`px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)] ${col === 'ACTIONS' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--pa-border)]">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-bold text-[var(--pa-teal)] tracking-wider">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-[600] text-[var(--pa-text-near-black)] group-hover:text-[var(--pa-teal)] transition-colors">
                      {ticket.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-medium">{ticket.tenant}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold tracking-wider inline-flex items-center gap-1 ${getPriorityBadge(ticket.priority)}`}>
                      {getPriorityIcon(ticket.priority)} {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.assignedTo ? (
                      <span className="text-[13px] text-[var(--pa-text-near-black)] font-medium">{ticket.assignedTo}</span>
                    ) : (
                      <span className="text-[13px] text-[var(--pa-red)] font-medium italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${getStatusBadge(ticket.status)}`}>
                      {getStatusIcon(ticket.status)} {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)]">{ticket.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[var(--pa-text-light-gray)]">
                      <button
                        onClick={() => { setSelectedTicket(ticket); setReplyText(''); }}
                        className="hover:text-[var(--pa-teal)] transition-colors"
                        title="View ticket"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'Resolved' && ticket.assignedTo && (
                        <button
                          onClick={() => { setSelectedTicket(ticket); setReplyText(''); }}
                          className="text-[11px] font-bold text-[var(--pa-teal)] hover:underline"
                        >
                          Reply
                        </button>
                      )}
                      {!ticket.assignedTo && (
                        <button className="text-[11px] font-bold text-amber-600 hover:underline flex items-center gap-1">
                          <UserPlus className="w-3 h-3" /> Assign
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[var(--pa-blue-gray-bg)]/50 border-t border-[var(--pa-border)] flex items-center justify-between">
          <span className="text-[13px] text-[var(--pa-text-muted)]">Showing 1–6 of 6 tickets</span>
        </div>
      </div>

      {/* ━━━ TICKET DETAIL DRAWER (440px) ━━━ */}
      {selectedTicket && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/30 z-[50]" onClick={() => setSelectedTicket(null)} />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-[440px] z-[60] bg-[var(--pa-card-bg)] border-l border-[var(--pa-border)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-[var(--pa-border)] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-[700] text-[var(--pa-text-near-black)]">{selectedTicket.id}</span>
                <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-wider ${getPriorityBadge(selectedTicket.priority)}`}>
                  {selectedTicket.priority}
                </span>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 text-[var(--pa-text-light-gray)] hover:text-[var(--pa-text-near-black)] rounded-lg hover:bg-[var(--pa-blue-gray-bg)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tenant Info Row */}
            <div className="px-6 py-4 bg-[var(--pa-blue-gray-bg)]/50 border-b border-[var(--pa-border)] flex items-center gap-4 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[var(--pa-teal)]/10 flex items-center justify-center text-[var(--pa-teal)] text-[10px] font-[700]">
                {initials(selectedTicket.tenant)}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-[600] text-[var(--pa-text-near-black)]">{selectedTicket.tenant}</div>
                <div className="text-[11px] text-[var(--pa-text-muted)]">{selectedTicket.contact}</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadge(selectedTicket.status)}`}>
                {selectedTicket.status}
              </span>
            </div>

            {/* Subject & Description */}
            <div className="px-6 py-4 border-b border-[var(--pa-border)] flex-shrink-0">
              <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)] mb-2">{selectedTicket.subject}</h3>
              <p className="text-[14px] text-[var(--pa-text-muted)] leading-relaxed">{selectedTicket.description}</p>
            </div>

            {/* Chat Timeline */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-none">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2">Conversation</div>
              {selectedTicket.messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.isAdmin ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    msg.isAdmin ? 'bg-[var(--pa-teal)] text-white' : 'bg-[var(--pa-blue-gray-bg)] text-[var(--pa-text-muted)]'
                  }`}>
                    {initials(msg.sender)}
                  </div>
                  <div className={`max-w-[300px] ${msg.isAdmin ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 mb-1 ${msg.isAdmin ? 'justify-end' : ''}`}>
                      <span className="text-[11px] font-[600] text-[var(--pa-text-near-black)]">{msg.sender}</span>
                      <span className="text-[10px] text-[var(--pa-text-light-gray)]">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-[12px] text-[13px] leading-relaxed ${
                      msg.isAdmin
                        ? 'bg-[var(--pa-teal)]/10 text-[var(--pa-teal)]'
                        : 'bg-[var(--pa-blue-gray-bg)]/80 text-[var(--pa-text-near-black)]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box (hidden for Resolved tickets) */}
            {selectedTicket.status !== 'Resolved' && (
              <div className="p-4 border-t border-[var(--pa-border)] flex-shrink-0">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full h-[80px] bg-[var(--pa-blue-gray-bg)]/50 border border-[var(--pa-border)] rounded-[10px] p-3 text-[13px] text-[var(--pa-text-near-black)] placeholder-[var(--pa-text-light-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--pa-teal)]/20 resize-none transition-all"
                />
                <div className="flex justify-end mt-3">
                  <button className="h-[40px] px-6 bg-[var(--pa-teal)] text-white rounded-[8px] text-[11px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 transition-colors">
                    <Send className="w-3.5 h-3.5" />
                    SEND REPLY
                  </button>
                </div>
              </div>
            )}

            {/* Meta Panel */}
            <div className="px-6 py-4 border-t border-[var(--pa-border)] bg-[var(--pa-blue-gray-bg)]/30 space-y-3 flex-shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--pa-text-light-gray)] mb-2">Details</div>
              {[
                { label: 'Priority', value: selectedTicket.priority },
                { label: 'Assigned To', value: selectedTicket.assignedTo || 'Unassigned' },
                { label: 'Status', value: selectedTicket.status },
                { label: 'Tenant', value: selectedTicket.tenant },
                { label: 'Created', value: selectedTicket.created },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[var(--pa-text-muted)]">{item.label}</span>
                  <span className="text-[12px] font-[600] text-[var(--pa-text-near-black)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
