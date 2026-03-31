import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Tag } from 'lucide-react';
import { BRANDS as INITIAL_BRANDS } from '../data/mockData';

type Brand = typeof INITIAL_BRANDS[number];

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState({ name: '', country: '', status: 'Active' });
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const openAdd = () => { setEditing(null); setForm({ name: '', country: '', status: 'Active' }); setShowModal(true); };
  const openEdit = (b: Brand) => { setEditing(b); setForm({ name: b.name, country: b.country, status: b.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setBrands(prev => prev.map(b => b.id === editing.id ? { ...b, ...form } : b));
      showToast('Brand updated!');
    } else {
      setBrands(prev => [...prev, { id: Date.now(), productCount: 0, ...form }]);
      showToast('Brand added!');
    }
    setShowModal(false);
  };

  const filtered = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Brand Management</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage product brands and manufacturers</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Add Brand
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Brands', value: brands.length },
          { label: 'Active', value: brands.filter(b => b.status === 'Active').length },
          { label: 'Inactive', value: brands.filter(b => b.status === 'Inactive').length },
          { label: 'Total Products', value: brands.reduce((a, b) => a + b.productCount, 0) },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search brands..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['Brand Name', 'Country', 'Products', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No brands found</td></tr>
              ) : filtered.map(brand => (
                <tr key={brand.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-info)]/20 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-[var(--color-info)]" />
                      </div>
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{brand.country}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">{brand.productCount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${brand.status === 'Active' ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(brand)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(brand)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit Brand' : 'Add Brand'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Brand Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="e.g., PharmaCo" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Country</label>
                <input type="text" placeholder="e.g., India" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className={IC} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={IC}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
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
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete Brand</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={() => { setBrands(prev => prev.filter(b => b.id !== deleteTarget.id)); setDeleteTarget(null); showToast('Brand deleted.'); }} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
