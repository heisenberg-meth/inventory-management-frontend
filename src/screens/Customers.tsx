import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Users, Phone, Mail, Eye } from 'lucide-react';
import { CUSTOMERS as INITIAL_CUSTOMERS } from '../data/mockData';
import { getCustomers, type Customer as CustomerType } from '../data/apiService';



const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CustomerType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CustomerType | null>(null);
  const [viewing, setViewing] = useState<CustomerType | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', type: 'Hospital', status: 'Active' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setCustomers(INITIAL_CUSTOMERS as CustomerType[]);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => { setEditing(null); setForm({ name: '', contact: '', email: '', phone: '', type: 'Hospital', status: 'Active' }); setShowModal(true); };
  const openEdit = (c: CustomerType) => { setEditing(c); setForm({ name: c.name, contact: c.contact, email: c.email, phone: c.phone, type: c.type, status: c.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setCustomers(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c));
      showToast('Customer updated!');
    } else {
      setCustomers(prev => [...prev, { id: Date.now(), outstanding: 0, totalOrders: 0, ...form }]);
      showToast('Customer added!');
    }
    setShowModal(false);
  };

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const typeColors: Record<string, string> = {
    Hospital: 'bg-[var(--color-info)]/20 text-[var(--color-info)]',
    Retail: 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]',
    Pharmacy: 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]',
    Clinic: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Customers</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage your customer directory</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Add Customer
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Customers', value: customers.length },
          { label: 'Active', value: customers.filter(c => c.status === 'Active').length },
          { label: 'Total Orders', value: customers.reduce((a, c) => a + c.totalOrders, 0) },
          { label: 'Outstanding', value: `₹${(customers.reduce((a, c) => a + c.outstanding, 0) / 1000).toFixed(0)}K` },
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
          <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['Customer', 'Type', 'Contact', 'Total Orders', 'Outstanding', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No customers found</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[var(--color-mint)]" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[var(--color-text-primary)]">{c.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{c.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[c.type] || 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]'}`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]"><Mail className="w-3 h-3" />{c.email}</div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]"><Phone className="w-3 h-3" />{c.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">{c.totalOrders}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: c.outstanding > 0 ? 'var(--color-warning)' : 'var(--color-mint)' }}>
                    ₹{c.outstanding.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setViewing(c)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(c)} className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{editing ? 'Edit Customer' : 'Add Customer'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Customer Name <span className="text-[var(--color-danger)]">*</span></label>
                <input type="text" placeholder="Hospital/pharmacy name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IC} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Contact Person</label>
                  <input type="text" placeholder="Full name" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className={IC} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Customer Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={IC}>
                    <option>Hospital</option><option>Pharmacy</option><option>Clinic</option><option>Retail</option>
                  </select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email</label>
                  <input type="email" placeholder="email@customer.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={IC} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Phone</label>
                  <input type="text" placeholder="+91 ..." value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={IC} /></div>
              </div>
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

      {viewing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Customer Details</h2>
              <button onClick={() => setViewing(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-mint)]/20 flex items-center justify-center"><Users className="w-7 h-7 text-[var(--color-mint)]" /></div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{viewing.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[viewing.type] || ''}`}>{viewing.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Contact', value: viewing.contact },
                  { label: 'Email', value: viewing.email },
                  { label: 'Phone', value: viewing.phone },
                  { label: 'Status', value: viewing.status },
                  { label: 'Total Orders', value: String(viewing.totalOrders) },
                  { label: 'Outstanding', value: `₹${viewing.outstanding.toLocaleString()}` },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)] break-all">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewing(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Close</button>
              <button onClick={() => { openEdit(viewing); setViewing(null); }} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">Edit</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Delete Customer</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={() => { setCustomers(prev => prev.filter(c => c.id !== deleteTarget.id)); setDeleteTarget(null); showToast('Customer deleted.'); }} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
