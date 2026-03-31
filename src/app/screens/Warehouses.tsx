import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Check, Warehouse as WarehouseIcon } from 'lucide-react';
import { WAREHOUSES as INITIAL_WAREHOUSES } from '../data/mockData';

type Warehouse = typeof INITIAL_WAREHOUSES[number];

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const Warehouses: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Warehouse | null>(null);
  const [form, setForm] = useState({ name: '', location: '', capacity: '0', manager: '', type: 'Primary', status: 'Active' });
  const [deleteTarget, setDeleteTarget] = useState<Warehouse | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const openAdd = () => { setEditing(null); setForm({ name: '', location: '', capacity: '1000', manager: '', type: 'Primary', status: 'Active' }); setShowModal(true); };
  const openEdit = (w: Warehouse) => { setEditing(w); setForm({ name: w.name, location: w.location, capacity: String(w.capacity), manager: w.manager, type: w.type, status: w.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setWarehouses(prev => prev.map(w => w.id === editing.id ? { ...w, ...form, capacity: Number(form.capacity) } : w));
      showToast('Warehouse updated!');
    } else {
      setWarehouses(prev => [...prev, { id: Date.now(), used: 0, ...form, capacity: Number(form.capacity) }]);
      showToast('Warehouse added!');
    }
    setShowModal(false);
  };

  // const filtered = warehouses.filter(w => w.name.toLowerCase().includes(search.toLowerCase()) || w.location.toLowerCase().includes(search.toLowerCase()));
  const totalCapacity = warehouses.reduce((a, w) => a + w.capacity, 0);
  const totalUsed = warehouses.reduce((a, w) => a + w.used, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Warehouse Management</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage storage locations and capacity</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Warehouses', value: warehouses.length },
          { label: 'Active', value: warehouses.filter(w => w.status === 'Active').length },
          { label: 'Total Capacity', value: `${totalCapacity.toLocaleString()} units` },
          { label: 'Utilization', value: `${Math.round((totalUsed / totalCapacity) * 100)}%` },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {warehouses.map(w => {
          const pct = Math.round((w.used / w.capacity) * 100);
          const color = pct > 80 ? 'var(--color-danger)' : pct > 60 ? 'var(--color-warning)' : 'var(--color-mint)';
          return (
            <div key={w.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-mint)]/20 flex items-center justify-center">
                    <WarehouseIcon className="w-5 h-5 text-[var(--color-mint)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">{w.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{w.location}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(w)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(w)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[var(--color-surface-secondary)] rounded-lg p-2 text-center">
                  <div className="text-xs text-[var(--color-text-muted)]">Type</div>
                  <div className="text-xs font-semibold text-[var(--color-text-primary)] mt-1">{w.type}</div>
                </div>
                <div className="bg-[var(--color-surface-secondary)] rounded-lg p-2 text-center">
                  <div className="text-xs text-[var(--color-text-muted)]">Manager</div>
                  <div className="text-xs font-semibold text-[var(--color-text-primary)] mt-1 truncate">{w.manager}</div>
                </div>
                <div className="bg-[var(--color-surface-secondary)] rounded-lg p-2 text-center">
                  <div className="text-xs text-[var(--color-text-muted)]">Status</div>
                  <div className="text-xs font-semibold mt-1" style={{ color: w.status === 'Active' ? 'var(--color-mint)' : 'var(--color-danger)' }}>{w.status}</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-text-secondary)]">Capacity Used</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{w.used.toLocaleString()} / {w.capacity.toLocaleString()} ({pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="e.g., Main Warehouse" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} /></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Location</label>
                <input type="text" placeholder="City, State" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={IC} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Capacity</label>
                  <input type="number" placeholder="1000" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} className={IC} min="0" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={IC}>
                    <option>Primary</option><option>Secondary</option><option>Specialized</option>
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Manager</label>
                <input type="text" placeholder="Manager name" value={form.manager} onChange={e => setForm(f => ({ ...f, manager: e.target.value }))} className={IC} /></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={IC}>
                  <option>Active</option><option>Inactive</option>
                </select></div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">{editing ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete Warehouse</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={() => { setWarehouses(prev => prev.filter(w => w.id !== deleteTarget.id)); setDeleteTarget(null); showToast('Warehouse deleted.'); }} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
