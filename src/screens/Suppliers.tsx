import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Users2, Phone, Mail } from 'lucide-react';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier, type Supplier as SupplierType } from '../data/apiService';

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SupplierType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SupplierType | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', address: '', category: 'Medicines', status: 'Active' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
      showToast('Connection to server failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const openAdd = () => { setEditing(null); setForm({ name: '', contact: '', email: '', phone: '', address: '', category: 'Medicines', status: 'Active' }); setShowModal(true); };
  const openEdit = (s: SupplierType) => { setEditing(s); setForm({ name: s.name, contact: s.contact, email: s.email, phone: s.phone, address: s.address, category: s.category, status: s.status }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      if (editing) {
        await updateSupplier(editing.id, form);
        showToast('Supplier updated!');
      } else {
        await createSupplier(form);
        showToast('Supplier added!');
      }
      setShowModal(false);
      fetchSuppliers();
    } catch (err) {
      console.error('Failed to save supplier:', err);
      alert('Failed to save supplier');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSupplier(deleteTarget.id);
      setDeleteTarget(null);
      showToast('Supplier deleted.');
      fetchSuppliers();
    } catch (err) {
      console.error('Failed to delete supplier:', err);
      alert('Failed to delete supplier');
    }
  };

  const filtered = suppliers.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Suppliers</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage your supplier directory</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Suppliers', value: suppliers.length },
          { label: 'Active', value: suppliers.filter(s => s.status === 'Active').length },
          { label: 'Total Orders', value: suppliers.reduce((a, s) => a + s.totalOrders, 0) },
          { label: 'Outstanding', value: `₹${(suppliers.reduce((a, s) => a + s.outstanding, 0) / 1000).toFixed(0)}K` },
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
          <input type="text" placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center">
            <div className="w-8 h-8 border-3 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)] bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl">
            No suppliers found
          </div>
        ) : filtered.map(supplier => (
          <div key={supplier.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-info)]/20 flex items-center justify-center">
                  <Users2 className="w-5 h-5 text-[var(--color-info)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">{supplier.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${supplier.status === 'Active' ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                    {supplier.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(supplier)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(supplier)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]"><Users2 className="w-3.5 h-3.5" /><span>{supplier.contact}</span></div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]"><Mail className="w-3.5 h-3.5" /><span className="truncate">{supplier.email}</span></div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]"><Phone className="w-3.5 h-3.5" /><span>{supplier.phone}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)] grid grid-cols-3 gap-2 text-center">
              <div><div className="text-xs text-[var(--color-text-muted)]">Category</div><div className="text-xs font-semibold text-[var(--color-text-primary)]">{supplier.category}</div></div>
              <div><div className="text-xs text-[var(--color-text-muted)]">Total Orders</div><div className="text-xs font-semibold text-[var(--color-text-primary)]">{supplier.totalOrders}</div></div>
              <div><div className="text-xs text-[var(--color-text-muted)]">Outstanding</div><div className="text-xs font-semibold" style={{ color: (supplier.outstanding ?? 0) > 0 ? 'var(--color-warning)' : 'var(--color-mint)' }}>₹{(supplier.outstanding ?? 0).toLocaleString()}</div></div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-card-bg)] z-10">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit Supplier' : 'Add Supplier'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Company Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="Supplier company name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Contact Person</label>
                  <input type="text" placeholder="Full name" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className={IC} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Phone</label>
                  <input type="text" placeholder="+91 ..." value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={IC} /></div>
              </div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email</label>
                <input type="email" placeholder="email@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={IC} /></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Address</label>
                <textarea placeholder="Full address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} rows={2} className={IC + ' resize-none'} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={IC}>
                    <option>Medicines</option><option>Equipment</option><option>Chemicals</option><option>Other</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={IC}>
                    <option>Active</option><option>Inactive</option>
                  </select></div>
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
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete Supplier</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
