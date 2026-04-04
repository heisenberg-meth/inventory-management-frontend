import React, { useState, useMemo } from 'react';
import { Plus, X, Search, Eye, FileText, Check, Trash2, AlertTriangle } from 'lucide-react';

interface Order {
  id: string;
  type: 'Sales' | 'Purchase';
  customer: string;
  date: string;
  items: number;
  amount: string;
  amountNum: number;
  status: string;
  statusColor: string;
}

const initialOrders: Order[] = [
  { id: 'ORD-1284', type: 'Sales', customer: 'Metro Hospital', date: '2024-03-21', items: 12, amount: '₹45,290', amountNum: 45290, status: 'Completed', statusColor: 'var(--color-mint)' },
  { id: 'ORD-1283', type: 'Purchase', customer: 'PharmaCorp Ltd', date: '2024-03-21', items: 8, amount: '₹128,450', amountNum: 128450, status: 'Pending', statusColor: 'var(--color-warning)' },
  { id: 'ORD-1282', type: 'Sales', customer: 'City Clinic', date: '2024-03-20', items: 5, amount: '₹12,180', amountNum: 12180, status: 'Completed', statusColor: 'var(--color-mint)' },
  { id: 'ORD-1281', type: 'Sales', customer: 'Health Plus', date: '2024-03-20', items: 15, amount: '₹67,720', amountNum: 67720, status: 'Pending', statusColor: 'var(--color-warning)' },
  { id: 'ORD-1280', type: 'Purchase', customer: 'MediSupply Inc', date: '2024-03-19', items: 20, amount: '₹89,910', amountNum: 89910, status: 'Overdue', statusColor: 'var(--color-danger)' },
  { id: 'ORD-1279', type: 'Sales', customer: 'Family Care', date: '2024-03-19', items: 6, amount: '₹23,450', amountNum: 23450, status: 'Completed', statusColor: 'var(--color-mint)' },
];

const CUSTOMERS = ['Metro Hospital', 'City Clinic', 'Health Plus', 'Family Care', 'Apollo Pharmacy', 'Sun Medical'];
const SUPPLIERS = ['PharmaCorp Ltd', 'MediSupply Inc', 'Global Pharma', 'HealthChem Corp'];
const ORDER_PRODUCTS = [
  { name: 'Paracetamol 500mg', price: 45 },
  { name: 'Amoxicillin 250mg', price: 120 },
  { name: 'Ibuprofen 400mg', price: 65 },
  { name: 'Cetirizine 10mg', price: 35 },
  { name: 'Vitamin D3 60K', price: 55 },
];

const TABS = ['All Orders', 'Sales Orders', 'Purchase Orders', 'Invoices', 'Payments'];

const INPUT_CLS = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

interface OrderItem {
  product: string;
  qty: number;
  price: number;
}

export const OrdersBilling: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [orderType, setOrderType] = useState<'sale' | 'purchase'>('sale');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // New order form
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([
    { product: ORDER_PRODUCTS[0].name, qty: 10, price: ORDER_PRODUCTS[0].price },
  ]);
  const [addProductSearch, setAddProductSearch] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filtered = useMemo(() => {
    const result = orders.filter(o => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
      const matchTab = activeTab === 'All Orders' || activeTab === 'Invoices' || activeTab === 'Payments'
        || (activeTab === 'Sales Orders' && o.type === 'Sales')
        || (activeTab === 'Purchase Orders' && o.type === 'Purchase');
      return matchSearch && matchTab;
    });
    return result;
  }, [orders, activeTab, searchQuery]);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    overdue: orders.filter(o => o.status === 'Overdue').length,
  }), [orders]);

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const addItemToOrder = (product: { name: string; price: number }) => {
    const existing = selectedItems.find(i => i.product === product.name);
    if (existing) {
      setSelectedItems(prev => prev.map(i => i.product === product.name ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setSelectedItems(prev => [...prev, { product: product.name, qty: 1, price: product.price }]);
    }
    setAddProductSearch('');
  };

  const removeItem = (product: string) => {
    setSelectedItems(prev => prev.filter(i => i.product !== product));
  };

  const updateQty = (product: string, qty: number) => {
    if (qty <= 0) { removeItem(product); return; }
    setSelectedItems(prev => prev.map(i => i.product === product ? { ...i, qty } : i));
  };

  const handleCreateOrder = () => {
    if (!customerName || selectedItems.length === 0) return;
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      type: orderType === 'sale' ? 'Sales' : 'Purchase',
      customer: customerName,
      date: new Date().toISOString().split('T')[0],
      items: selectedItems.reduce((s, i) => s + i.qty, 0),
      amount: `₹${total.toLocaleString()}`,
      amountNum: total,
      status: 'Pending',
      statusColor: 'var(--color-warning)',
    };
    setOrders(prev => [newOrder, ...prev]);
    setShowDrawer(false);
    setCustomerName('');
    setSelectedItems([{ product: ORDER_PRODUCTS[0].name, qty: 10, price: ORDER_PRODUCTS[0].price }]);
    showSuccess(`Order ${newOrder.id} created successfully!`);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const colorMap: Record<string, string> = {
      'Completed': 'var(--color-mint)',
      'Pending': 'var(--color-warning)',
      'Overdue': 'var(--color-danger)',
      'Cancelled': 'var(--color-danger)',
    };
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, statusColor: colorMap[newStatus] || 'var(--color-warning)' } : o));
    if (viewOrder?.id === orderId) setViewOrder(prev => prev ? { ...prev, status: newStatus, statusColor: colorMap[newStatus] } : null);
    showSuccess(`Order status updated to ${newStatus}`);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setOrders(prev => prev.filter(o => o.id !== deleteTarget.id));
    setDeleteTarget(null);
    showSuccess('Order deleted.');
  };

  const filteredProducts = ORDER_PRODUCTS.filter(p =>
    !addProductSearch || p.name.toLowerCase().includes(addProductSearch.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">Orders & Billing</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage sales and purchase orders</p>
        </div>
        <button 
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0 ${
              activeTab === tab ? 'text-[var(--color-mint)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint)]" />}
          </button>
        ))}
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Orders', value: stats.total.toLocaleString(), color: 'var(--color-mint)' },
          { label: 'Pending', value: stats.pending.toString(), color: 'var(--color-warning)' },
          { label: 'Completed', value: stats.completed.toLocaleString(), color: 'var(--color-mint)' },
          { label: 'Overdue', value: stats.overdue.toString(), color: 'var(--color-danger)' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-3 sm:px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{metric.label}</div>
            <div className="text-lg sm:text-2xl font-bold mt-1" style={{ color: metric.color }}>{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Order ID</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Customer/Supplier</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Date</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Items</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-[var(--color-text-secondary)] text-sm">No orders found</td></tr>
              ) : filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">{order.id}</td>
                  <td className="px-3 sm:px-4 py-3">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{ 
                        backgroundColor: order.type === 'Sales' ? 'rgba(29,185,122,0.15)' : 'rgba(56,189,248,0.15)',
                        color: order.type === 'Sales' ? 'var(--color-mint)' : 'var(--color-info)'
                      }}
                    >
                      {order.type}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-primary)] max-w-[120px] truncate">{order.customer}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:table-cell">{order.date}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:table-cell">{order.items} items</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{order.amount}</td>
                  <td className="px-3 sm:px-4 py-3">
                    <span 
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{ backgroundColor: `${order.statusColor}20`, color: order.statusColor }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <div className="flex gap-1 sm:gap-2">
                      <button 
                        onClick={() => setViewOrder(order)}
                        className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteTarget(order)}
                        className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Order Drawer */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowDrawer(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--color-card-bg)] border-l border-[var(--color-border)] z-50 overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between sticky top-0 bg-[var(--color-card-bg)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">New Order</h2>
              <button onClick={() => setShowDrawer(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Order Type</label>
                <div className="flex gap-2 p-1 bg-[var(--color-surface-secondary)] rounded-lg">
                  {(['sale', 'purchase'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => { setOrderType(t); setCustomerName(''); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${orderType === t ? 'bg-[var(--color-mint)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                    >
                      {t === 'sale' ? 'Sale' : 'Purchase'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer/Supplier */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  {orderType === 'sale' ? 'Customer' : 'Supplier'} *
                </label>
                <select value={customerName} onChange={e => setCustomerName(e.target.value)} className={INPUT_CLS}>
                  <option value="">Select {orderType === 'sale' ? 'customer' : 'supplier'}...</option>
                  {(orderType === 'sale' ? CUSTOMERS : SUPPLIERS).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Add Products */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Add Products</label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={addProductSearch}
                    onChange={e => setAddProductSearch(e.target.value)}
                    className={INPUT_CLS + ' pl-10'}
                  />
                </div>

                {/* Product Suggestions */}
                {addProductSearch && (
                  <div className="mb-3 bg-[var(--color-surface-secondary)] rounded-lg border border-[var(--color-border)] overflow-hidden">
                    {filteredProducts.map(p => (
                      <button
                        key={p.name}
                        onClick={() => addItemToOrder(p)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--color-card-bg)] transition-colors text-sm text-left"
                      >
                        <span className="text-[var(--color-text-primary)]">{p.name}</span>
                        <span className="text-[var(--color-mint)] font-medium">₹{p.price}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Selected Products */}
                <div className="space-y-2">
                  {selectedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--color-surface-secondary)] rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">{item.product}</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">₹{item.price} × {item.qty}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.product, item.qty - 1)} className="w-6 h-6 rounded bg-[var(--color-card-bg)] text-[var(--color-text-primary)] text-xs hover:bg-[var(--color-border)] transition-colors flex items-center justify-center">-</button>
                        <span className="text-sm font-medium text-[var(--color-text-primary)] w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.product, item.qty + 1)} className="w-6 h-6 rounded bg-[var(--color-card-bg)] text-[var(--color-text-primary)] text-xs hover:bg-[var(--color-border)] transition-colors flex items-center justify-center">+</button>
                      </div>
                      <div className="text-sm font-semibold text-[var(--color-text-primary)] w-16 text-right">₹{(item.price * item.qty).toLocaleString()}</div>
                      <button onClick={() => removeItem(item.product)} className="p-1 hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] rounded transition-colors flex-shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedItems.length === 0 && (
                    <div className="py-6 text-center text-sm text-[var(--color-text-muted)]">Search and add products above</div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[var(--color-surface-secondary)] rounded-lg p-4 space-y-2">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="text-[var(--color-text-primary)]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Tax (18% GST)</span>
                  <span className="text-[var(--color-text-primary)]">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-[var(--color-border)] pt-2 mt-2 flex justify-between">
                  <span className="font-semibold text-[var(--color-text-primary)]">Total</span>
                  <span className="font-bold text-lg text-[var(--color-mint)]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button 
                  onClick={handleCreateOrder}
                  disabled={!customerName || selectedItems.length === 0}
                  className="w-full bg-[var(--color-mint)] text-white py-3 rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Order & Generate Invoice
                </button>
                <button 
                  onClick={handleCreateOrder}
                  disabled={!customerName || selectedItems.length === 0}
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] py-3 rounded-lg hover:bg-[var(--color-card-bg)] transition-colors disabled:opacity-50"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{viewOrder.id}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">{viewOrder.date}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Type', value: viewOrder.type },
                  { label: 'Customer/Supplier', value: viewOrder.customer },
                  { label: 'Items', value: `${viewOrder.items} items` },
                  { label: 'Total Amount', value: viewOrder.amount },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] mb-2">Current Status</div>
                <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: `${viewOrder.statusColor}20`, color: viewOrder.statusColor }}>
                  {viewOrder.status}
                </span>
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Completed', 'Overdue', 'Cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(viewOrder.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${viewOrder.status === s ? 'bg-[var(--color-mint)] text-white border-[var(--color-mint)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewOrder(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Close</button>
              <button className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-[var(--color-danger)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Delete Order</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-primary)] mb-6">
              Are you sure you want to delete order <strong>{deleteTarget.id}</strong>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg transition-colors text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
