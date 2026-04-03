import React, { useState } from 'react';
import {
  Search, ChevronDown, Eye, X, Download
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

type ActionType =
  | 'TENANT_CREATED'
  | 'PLAN_ASSIGNED'
  | 'STOCK_UPDATED'
  | 'USER_INVITED'
  | 'LOGIN'
  | 'TENANT_SUSPENDED'
  | 'PAYMENT_FAILED'
  | 'INVOICE_GENERATED';

type LogStatus = 'Success' | 'Failed';

interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: ActionType;
  tenant: string;
  ip: string;
  status: LogStatus;
  userAgent: string;
  payload: string;
  responseCode: string;
}

const logs: AuditLog[] = [
  {
    id: 1, timestamp: 'Mar 23, 10:43 AM', user: 'Admin Root', action: 'TENANT_CREATED',
    tenant: 'ABC Pharmacy', ip: '192.168.1.1', status: 'Success',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0',
    payload: '{\n  "tenant_name": "ABC Pharmacy",\n  "plan": "Enterprise",\n  "owner": "Dr. Ravi Kumar",\n  "domain": "inventory.abcpharma.com"\n}',
    responseCode: '200 OK',
  },
  {
    id: 2, timestamp: 'Mar 23, 10:41 AM', user: 'Admin Root', action: 'PLAN_ASSIGNED',
    tenant: 'ABC Pharmacy', ip: '192.168.1.1', status: 'Success',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0',
    payload: '{\n  "tenant_id": "T-001",\n  "plan": "Enterprise",\n  "billing_cycle": "yearly"\n}',
    responseCode: '200 OK',
  },
  {
    id: 3, timestamp: 'Mar 23, 09:15 AM', user: 'Ravi Kumar', action: 'STOCK_UPDATED',
    tenant: 'ABC Pharmacy', ip: '10.0.0.4', status: 'Success',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1',
    payload: '{\n  "item_id": "SKU-4821",\n  "warehouse": "WH-001",\n  "qty_before": 150,\n  "qty_after": 230\n}',
    responseCode: '200 OK',
  },
  {
    id: 4, timestamp: 'Mar 22, 05:30 PM', user: 'Platform Admin 1', action: 'USER_INVITED',
    tenant: 'FreshMart', ip: '192.168.2.1', status: 'Success',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0',
    payload: '{\n  "email": "manager@freshmart.com",\n  "role": "Warehouse Manager",\n  "tenant": "FreshMart"\n}',
    responseCode: '200 OK',
  },
  {
    id: 5, timestamp: 'Mar 22, 03:20 PM', user: 'Suresh Mehta', action: 'LOGIN',
    tenant: 'FreshMart', ip: '203.0.113.5', status: 'Success',
    userAgent: 'Mozilla/5.0 (Linux; Android 14) Mobile Chrome/124.0',
    payload: '{\n  "method": "password",\n  "mfa": false\n}',
    responseCode: '200 OK',
  },
  {
    id: 6, timestamp: 'Mar 22, 11:00 AM', user: 'Admin Root', action: 'TENANT_SUSPENDED',
    tenant: 'BioLife Diag', ip: '192.168.1.1', status: 'Success',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0',
    payload: '{\n  "tenant_id": "T-006",\n  "reason": "Payment overdue 90+ days",\n  "grace_period_expired": true\n}',
    responseCode: '200 OK',
  },
  {
    id: 7, timestamp: 'Mar 21, 08:45 PM', user: 'System', action: 'PAYMENT_FAILED',
    tenant: 'BioLife Diag', ip: '—', status: 'Failed',
    userAgent: 'Internal/PaymentProcessor v2.4',
    payload: '{\n  "invoice_id": "INV-9921",\n  "amount": "$890.00",\n  "gateway": "Stripe",\n  "error": "card_declined"\n}',
    responseCode: '402 Payment Required',
  },
  {
    id: 8, timestamp: 'Mar 21, 06:30 PM', user: 'Priya Reddy', action: 'INVOICE_GENERATED',
    tenant: 'ABC Pharmacy', ip: '10.0.0.6', status: 'Success',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1',
    payload: '{\n  "invoice_id": "INV-10042",\n  "amount": "$12,400.00",\n  "items": 48\n}',
    responseCode: '200 OK',
  },
];

const getActionBadge = (action: ActionType) => {
  switch (action) {
    case 'TENANT_CREATED': return 'bg-[#0d6e5a] text-white';
    case 'PLAN_ASSIGNED': return 'bg-[#2563eb] text-white';
    case 'STOCK_UPDATED': return 'bg-[#f59e0b] text-white';
    case 'USER_INVITED': return 'bg-[#7c3aed] text-white';
    case 'LOGIN': return 'bg-[#e2e8f0] text-[#334155]';
    case 'TENANT_SUSPENDED': return 'bg-[#ef4444] text-white';
    case 'PAYMENT_FAILED': return 'bg-[#ef4444] text-white';
    case 'INVOICE_GENERATED': return 'bg-[#e2e8f0] text-[#334155]';
  }
};

export const AuditLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pa-root">
      {/* PAGE HEADER */}
      <PageHeader
        section="SYSTEM AUDIT"
        title="Audit Logs"
        description="Track every action performed across the platform."
        ctaText="EXPORT LOGS"
        onCtaClick={() => console.log('Export logs...')}
      />

      {/* ━━━ FILTER BAR ━━━ */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[16px_20px] shadow-sm mb-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa5b4]" />
          <input
            type="text"
            placeholder="Search by user, action, tenant, IP address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-transparent border-none focus:ring-0 text-[13px] text-[var(--pa-text-near-black)] placeholder-[#9aa5b4]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All Users', 'All Actions', 'All Tenants', 'Last 7 Days'].map((f) => (
            <button key={f} className="h-[36px] px-4 bg-white border border-[#e2e8f0] rounded-[8px] text-[13px] font-[500] text-[#0d1b2a] flex items-center gap-2 hover:border-[#0d6e5a] transition-all">
              {f} <ChevronDown className="w-3.5 h-3.5 text-[#9aa5b4]" />
            </button>
          ))}
          <button className="h-[36px] px-4 border border-[#e2e8f0] rounded-[8px] text-[12px] font-[600] text-[#6b7a8d] flex items-center gap-1.5 hover:border-[#0d6e5a] hover:text-[#0d6e5a] transition-all ml-1">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* ━━━ AUDIT LOGS TABLE ━━━ */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcfdfe]">
                {['TIMESTAMP', 'USER', 'ACTION', 'TENANT', 'IP ADDRESS', 'STATUS', 'DETAILS'].map((col) => (
                  <th key={col} className={`px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8] ${col === 'DETAILS' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fb]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group">
                  <td className="px-6 py-3">
                    <span className="text-[12px] text-[#6b7a8d] font-medium whitespace-nowrap">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[13px] font-[600] text-[var(--pa-text-near-black)]">{log.user}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-[700] uppercase tracking-wider ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#6b7a8d] font-medium">{log.tenant}</td>
                  <td className="px-6 py-3">
                    <span className="text-[12px] text-[#6b7a8d] font-mono">{log.ip}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider ${
                      log.status === 'Success'
                        ? 'bg-[#dcfce7] text-[#15803d]'
                        : 'bg-[#fee2e2] text-[#dc2626]'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="hover:text-[#0d6e5a] text-[#9aa5b4] transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#fcfdfe] border-t border-[#f0f4f8] flex items-center justify-between">
          <span className="text-[13px] text-[#6b7a8d]">Showing 1–8 of 4,284 log entries</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 536].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-[8px] text-[12px] font-[700] transition-all ${p === 1 ? 'bg-[#0d6e5a] text-white shadow-md' : 'text-[#6b7a8d] hover:bg-[#f1f5f9]'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ LOG DETAIL DRAWER (380px) ━━━ */}
      {selectedLog && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[50]" onClick={() => setSelectedLog(null)} />

          <div className="fixed top-0 right-0 h-full w-[380px] z-[60] bg-[var(--pa-card-bg)] border-l border-[var(--pa-border)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-[var(--pa-border)] flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-[700] text-[var(--pa-text-near-black)]">Log Details</h3>
              <button onClick={() => setSelectedLog(null)} className="p-2 text-[#9aa5b4] hover:text-[#0d1b2a] rounded-lg hover:bg-[#f1f5f9] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fields */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {[
                { label: 'Timestamp', value: selectedLog.timestamp },
                { label: 'User', value: selectedLog.user },
                { label: 'Tenant', value: selectedLog.tenant },
                { label: 'IP Address', value: selectedLog.ip },
              ].map((field) => (
                <div key={field.label}>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#9aa5b4] mb-1">{field.label}</div>
                  <div className="text-[14px] font-[600] text-[var(--pa-text-near-black)]">{field.value}</div>
                </div>
              ))}

              {/* Action */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9aa5b4] mb-1">Action</div>
                <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-[700] uppercase tracking-wider inline-block ${getActionBadge(selectedLog.action)}`}>
                  {selectedLog.action}
                </span>
              </div>

              {/* User Agent */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9aa5b4] mb-1">User Agent</div>
                <div className="text-[12px] text-[#6b7a8d] leading-relaxed break-all">{selectedLog.userAgent}</div>
              </div>

              {/* Request Payload */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9aa5b4] mb-2">Request Payload</div>
                <pre className="bg-[#0d6e5a]/10 text-[#0d6e5a] rounded-[8px] p-4 text-[12px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
                  {selectedLog.payload}
                </pre>
              </div>

              {/* Response */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9aa5b4] mb-1">Response</div>
                <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider inline-block ${
                  selectedLog.status === 'Success'
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : 'bg-[#fee2e2] text-[#dc2626]'
                }`}>
                  {selectedLog.responseCode}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
