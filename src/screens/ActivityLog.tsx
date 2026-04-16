import React, { useState, useEffect } from 'react';
import { User, Plus, Edit, Trash2, Download, Search } from 'lucide-react';
import { getAuditLogs, type AuditLog } from '../data/apiService';

const actionColor = (type: string) => {
  switch (type) {
    case "create":
      return "bg-[var(--color-mint)]/20 text-[var(--color-mint)]";
    case "update":
      return "bg-[var(--color-info)]/20 text-[var(--color-info)]";
    case "delete":
      return "bg-[var(--color-danger)]/20 text-[var(--color-danger)]";
    case "export":
      return "bg-[var(--color-warning)]/20 text-[var(--color-warning)]";
    case "auth":
      return "bg-purple-500/20 text-purple-400";
    default:
      return "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]";
  }
};

const ActionIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'create') return <Plus className="w-3.5 h-3.5" />;
  if (type === 'update') return <Edit className="w-3.5 h-3.5" />;
  if (type === 'delete') return <Trash2 className="w-3.5 h-3.5" />;
  if (type === 'export') return <Download className="w-3.5 h-3.5" />;
  return <User className="w-3.5 h-3.5" />;
};

export const ActivityLog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = logs.filter(log => {
    const matchSearch = !search || 
      log.action.toLowerCase().includes(search.toLowerCase()) || 
      log.user.toLowerCase().includes(search.toLowerCase()) || 
      log.target.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || log.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Activity Log</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Audit trail of all system actions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] text-sm">
          <Download className="w-4 h-4" />Export Log
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[['All', 'Total'], ['create', 'Created'], ['update', 'Updated'], ['delete', 'Deleted'], ['auth', 'Auth']].map(([type, label]) => (
          <button key={type} onClick={() => setTypeFilter(type as string)}
            className={`p-3 rounded-xl border transition-all text-left ${typeFilter === type ? 'bg-[var(--color-mint)] border-[var(--color-mint)] text-white' : 'bg-[var(--color-card-bg)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'}`}>
            <div className="text-xs opacity-80">{label}</div>
            <div className="text-lg font-bold mt-0.5">
              {type === 'All' ? logs.length : logs.filter(l => l.type === type).length}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['User', 'Action', 'Target', 'Type', 'IP Address', 'Time'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">
                  <div className="flex justify-center mb-2"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                  Loading logs...
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No activity found</td></tr>
              ) : filtered.map(log => (
                <tr key={log.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--color-mint)] flex items-center justify-center text-white text-xs font-bold">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{log.action}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">{log.target}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-xs font-medium ${actionColor(log.type)}`}>
                      <ActionIcon type={log.type} />{log.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] font-mono">{log.ip}</td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-muted)]">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
