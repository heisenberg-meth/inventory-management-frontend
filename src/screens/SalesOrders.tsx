import React, { useState, useEffect } from 'react';
import { Plus, Eye, Search, X, Check, ShoppingCart, FileText } from 'lucide-react';
import { getSalesOrders, getCustomers, type Customer } from '../data/apiService';

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: string;
  paymentStatus: string;
}

const statusColor = (s: string) => {
  switch (s) {
    case "Delivered":
      return "bg-[var(--color-mint)]/20 text-[var(--color-mint)]";
    case "Processing":
      return "bg-[var(--color-info)]/20 text-[var(--color-info)]";
    case "Shipped":
      return "bg-purple-500/20 text-purple-400";
    case "Pending":
      return "bg-[var(--color-warning)]/20 text-[var(--color-warning)]";
    case "Cancelled":
      return "bg-[var(--color-danger)]/20 text-[var(--color-danger)]";
    default:
      return "bg-[var(--color-mint)]/20 text-[var(--color-mint)]";
  }
};

const paymentColor = (s: string) => {
  switch (s) {
    case 'Paid': return 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]';
    case 'Pending': return 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]';
    case 'Refunded': return 'bg-[var(--color-info)]/20 text-[var(--color-info)]';
    default: return '';
  }
};

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

export const SalesOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ customerId: '', notes: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [orderData, customerData] = await Promise.all([
        getSalesOrders(),
        getCustomers()
      ]);
      setOrders(orderData as Order[]);
      setCustomers(customerData);
      if (customerData.length > 0) {
        setForm(f => ({ ...f, customerId: String(customerData[0].id) }));
      }
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
    } finally {
      setLoading(false);
    }
  };



  const handleCreate = () => {
    const selectedCustomer = customers.find(c => String(c.id) === form.customerId);
    if (!selectedCustomer) return;
    const newOrder: Order = {
      id: `SO-2024-00${orders.length + 1}`,
      customer: selectedCustomer.name,
      date: new Date().toISOString().split('T')[0],
      items: 0,
      total: 0,
      status: 'Pending',
      paymentStatus: 'Pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    setShowCreate(false);
    showToast('Sales order created!');
  };

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.paymentStatus === 'Paid').reduce((a, o) => a + o.total, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Sales Orders</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Track customer orders and revenue</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />New Order
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
          { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
          { label: 'Revenue (Paid)', value: `₹${(totalRevenue / 1000).toFixed(0)}K` },
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
          <option>All</option><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
        </select>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>{['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Payment', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No orders found</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[var(--color-mint)]" />
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{order.date}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-primary)] font-medium">{order.items}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]">₹{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>{order.status}</span></td>
                  <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentColor(order.paymentStatus)}`}>{order.paymentStatus}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setViewingOrder(order)} className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded hover:bg-[var(--color-info)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors" title="Invoice"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">New Sales Order</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Customer <span className="text-[var(--color-danger)]">*</span></label>
                <select value={form.customerId} onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))} className={IC}>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select></div>
              <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Notes</label>
                <textarea placeholder="Order notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className={IC + ' resize-none'} /></div>
              <div className="bg-[var(--color-surface-secondary)] rounded-lg p-3 text-sm text-[var(--color-text-secondary)]">
                💡 After creating the order, you can add products and quantities in the order detail view.
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">Create Order</button>
            </div>
          </div>
        </div>
      )}

      {viewingOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{viewingOrder.id}</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(viewingOrder.status)}`}>{viewingOrder.status}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${paymentColor(viewingOrder.paymentStatus)}`}>{viewingOrder.paymentStatus}</span>
                </div>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Customer', value: viewingOrder.customer },
                  { label: 'Order Date', value: viewingOrder.date },
                  { label: 'Total Items', value: String(viewingOrder.items) },
                  { label: 'Total Amount', value: `₹${viewingOrder.total.toLocaleString()}` },
                  { label: 'Order Status', value: viewingOrder.status },
                  { label: 'Payment', value: viewingOrder.paymentStatus },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewingOrder(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">Close</button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                <FileText className="w-4 h-4" />View Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
