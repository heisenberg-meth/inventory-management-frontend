import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Grid3x3 } from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/mockData';
import { getCategories } from '../data/apiService';

type Category = typeof INITIAL_CATEGORIES[number];

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const Categories: React.FC = () => {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '', status: 'Active' });
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCats(data as Category[]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      // Fallback to mock data if API fails during initial connection Phase
      setCats(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => { setEditing(null); setForm({ name: '', description: '', status: 'Active' }); setShowModal(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, description: c.description, status: c.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setCats(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c));
      showToast('Category updated!');
    } else {
      setCats(prev => [...prev, { id: Date.now(), productCount: 0, ...form }]);
      showToast('Category added!');
    }
    setShowModal(false);
  };

  const filtered = cats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Categories</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage product categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Categories', value: cats.length },
          { label: 'Active', value: cats.filter(c => c.status === 'Active').length },
          { label: 'Inactive', value: cats.filter(c => c.status === 'Inactive').length },
          { label: 'Total Products', value: cats.reduce((a, c) => a + c.productCount, 0) },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                {['Category Name', 'Description', 'Products', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No categories found</td></tr>
              ) : filtered.map(cat => (
                <tr key={cat.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center">
                        <Grid3x3 className="w-4 h-4 text-[var(--color-mint)]" />
                      </div>
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{cat.description}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-primary)] font-medium">{cat.productCount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cat.status === 'Active' ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(cat)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(cat)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="e.g., Pain Relief" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Description</label>
                <textarea placeholder="Brief description..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className={IC + ' resize-none'} />
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

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete Category</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={() => { setCats(prev => prev.filter(c => c.id !== deleteTarget.id)); setDeleteTarget(null); showToast('Category deleted.'); }} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
