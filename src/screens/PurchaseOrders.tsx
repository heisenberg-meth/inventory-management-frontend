import React, { useState, useEffect } from 'react';
import { Plus, Eye, Search, X, Check, ShoppingBag, Truck } from 'lucide-react';
import { PURCHASE_ORDERS as INITIAL_POS, SUPPLIERS } from '../data/mockData';
import { getPurchaseOrders } from '../data/apiService';

type PO = typeof INITIAL_POS[number];

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

const statusColor = (s: string) => {
  switch (s) {
    case 'Delivered': return 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]';
    case 'In Transit': return 'bg-[var(--color-info)]/20 text-[var(--color-info)]';
    case 'Pending': return 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]';
    case 'Cancelled': return 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]';
    default: return 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]';
  }
};

export const PurchaseOrders: React.FC = () => {
  const [orders, setOrders] = useState<PO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<PO | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ supplier: SUPPLIERS[0].name, expectedDelivery: '', notes: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getPurchaseOrders();
      setOrders(data as PO[]);
    } catch (err) {
      console.error('Failed to fetch purchase orders:', err);
      setOrders(INITIAL_POS);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (!form.supplier) return;
    const newPO: PO = {
      id: `PO-2024-00${orders.length + 1}`,
      supplier: form.supplier,
      date: new Date().toISOString().split('T')[0],
      expectedDelivery: form.expectedDelivery || '2024-04-01',
      items: 0,
      total: 0,
      status: 'Pending',
    };
    setOrders(prev => [newPO, ...prev]);
    setShowCreate(false);
    showToast('Purchase order created!');
  };

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.supplier.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalValue = orders.reduce((a, o) => a + o.total, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Purchase Orders</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Track and manage supplier purchase orders</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />Create Order
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
          { label: 'In Transit', value: orders.filter(o => o.status === 'In Transit').length },
          { label: 'Total Value', value: `₹${(totalValue / 1000).toFixed(0)}K` },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]">
          <option>All</option><option>Pending</option><option>In Transit</option><option>Delivered</option><option>Cancelled</option>
        </select>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['Order ID', 'Supplier', 'Date', 'Expected Delivery', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No purchase orders found</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[var(--color-mint)]" />
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)] max-w-[160px] truncate">{order.supplier}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{order.date}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{order.expectedDelivery}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-primary)] font-medium">{order.items}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]">₹{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setViewingOrder(order)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Create Purchase Order</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Supplier <span className="text-[var(--color-danger)]">*</span></label>
                <select value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} className={IC}>
                  {SUPPLIERS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Expected Delivery</label>
                <input type="date" value={form.expectedDelivery} onChange={e => setForm(f => ({ ...f, expectedDelivery: e.target.value }))} className={IC} /></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Notes</label>
                <textarea placeholder="Additional notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className={IC + ' resize-none'} /></div>
              <div className="bg-[var(--color-surface-secondary)] rounded-lg p-3 text-sm text-[var(--color-text-secondary)]">
                💡 After creating the order, you can add line items in the order detail view.
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">Create Order</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{viewingOrder.id}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(viewingOrder.status)}`}>{viewingOrder.status}</span>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Supplier', value: viewingOrder.supplier },
                  { label: 'Order Date', value: viewingOrder.date },
                  { label: 'Expected Delivery', value: viewingOrder.expectedDelivery },
                  { label: 'Total Items', value: String(viewingOrder.items) },
                  { label: 'Total Value', value: `₹${viewingOrder.total.toLocaleString()}` },
                  { label: 'Status', value: viewingOrder.status },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/20 rounded-lg">
                <Truck className="w-4 h-4 text-[var(--color-mint)]" />
                <span className="text-sm text-[var(--color-mint)]">
                  {viewingOrder.status === 'Delivered' ? 'This order has been delivered successfully.' : `Order is currently ${viewingOrder.status.toLowerCase()}.`}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewingOrder(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
