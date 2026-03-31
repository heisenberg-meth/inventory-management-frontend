import React, { useState, useMemo } from 'react';
import { Plus, ArrowLeftRight, Calendar, User, X, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface StockMovement {
  id: number;
  date: string;
  product: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT' | 'TRANSFER';
  quantity: number;
  before: number;
  after: number;
  reference: string;
  user: string;
}

const initialMovements: StockMovement[] = [
  { id: 1, date: '2024-03-21', product: 'Paracetamol 500mg', type: 'IN', quantity: 200, before: 450, after: 650, reference: 'PO-1245', user: 'John Doe' },
  { id: 2, date: '2024-03-21', product: 'Amoxicillin 250mg', type: 'OUT', quantity: 50, before: 139, after: 89, reference: 'SO-2134', user: 'Jane Smith' },
  { id: 3, date: '2024-03-20', product: 'Ibuprofen 400mg', type: 'ADJUSTMENT', quantity: -20, before: 20, after: 0, reference: 'ADJ-445', user: 'Admin' },
  { id: 4, date: '2024-03-20', product: 'Cetirizine 10mg', type: 'IN', quantity: 150, before: 470, after: 620, reference: 'PO-1243', user: 'John Doe' },
  { id: 5, date: '2024-03-19', product: 'Metformin 500mg', type: 'OUT', quantity: 80, before: 390, after: 310, reference: 'SO-2130', user: 'Jane Smith' },
  { id: 6, date: '2024-03-19', product: 'Vitamin D3 60K', type: 'TRANSFER', quantity: 100, before: 880, after: 780, reference: 'TRF-089', user: 'John Doe' },
];

const stockData = [
  { name: 'In Stock', value: 856, color: 'var(--color-mint)', id: 'in-stock' },
  { name: 'Low Stock', value: 89, color: 'var(--color-warning)', id: 'low-stock' },
  { name: 'Out of Stock', value: 23, color: 'var(--color-danger)', id: 'out-of-stock' },
];

const lowStockItems = [
  { name: 'Amoxicillin 250mg', stock: 89, max: 500 },
  { name: 'Atorvastatin 20mg', stock: 42, max: 400 },
  { name: 'Aspirin 75mg', stock: 55, max: 600 },
  { name: 'Losartan 50mg', stock: 67, max: 500 },
];

const PRODUCTS = ['Paracetamol 500mg', 'Amoxicillin 250mg', 'Ibuprofen 400mg', 'Cetirizine 10mg', 'Metformin 500mg', 'Atorvastatin 20mg', 'Vitamin D3 60K'];
const TABS = ['All Movements', 'Stock In', 'Stock Out', 'Adjustments', 'Transfers'];

const INPUT_CLS = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

interface AdjFormData {
  product: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason: string;
  reference: string;
}

export const StockManagement: React.FC = () => {
  const [movements, setMovements] = useState<StockMovement[]>(initialMovements);
  const [activeTab, setActiveTab] = useState('All Movements');
  const [showAdjModal, setShowAdjModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [adjForm, setAdjForm] = useState<AdjFormData>({
    product: PRODUCTS[0], type: 'IN', quantity: 0, reason: '', reference: ''
  });

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filtered = useMemo(() => {
    return movements.filter(m => {
      if (activeTab === 'All Movements') return true;
      if (activeTab === 'Stock In') return m.type === 'IN';
      if (activeTab === 'Stock Out') return m.type === 'OUT';
      if (activeTab === 'Adjustments') return m.type === 'ADJUSTMENT';
      if (activeTab === 'Transfers') return m.type === 'TRANSFER';
      return true;
    });
  }, [movements, activeTab]);

  const handleAddAdjustment = () => {
    if (!adjForm.product || adjForm.quantity <= 0) return;
    const newMovement: StockMovement = {
      id: movements.length + 1,
      date: new Date().toISOString().split('T')[0],
      product: adjForm.product,
      type: adjForm.type,
      quantity: adjForm.type === 'OUT' ? -adjForm.quantity : adjForm.quantity,
      before: Math.floor(Math.random() * 400) + 100,
      after: Math.floor(Math.random() * 400) + 100,
      reference: adjForm.reference || `ADJ-${Math.floor(Math.random() * 1000)}`,
      user: 'John Doe'
    };
    setMovements(prev => [newMovement, ...prev]);
    setShowAdjModal(false);
    setAdjForm({ product: PRODUCTS[0], type: 'IN', quantity: 0, reason: '', reference: '' });
    showSuccess('Stock adjustment recorded successfully!');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IN': return { bg: 'var(--color-mint)', text: 'var(--color-mint)' };
      case 'OUT': return { bg: 'var(--color-danger)', text: 'var(--color-danger)' };
      case 'ADJUSTMENT': return { bg: 'var(--color-info)', text: 'var(--color-info)' };
      case 'TRANSFER': return { bg: 'var(--color-warning)', text: 'var(--color-warning)' };
      default: return { bg: 'var(--color-mint)', text: 'var(--color-mint)' };
    }
  };

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
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">Stock Management</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Track stock movements and adjustments</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span className="hidden sm:inline">Stock Transfer</span>
          </button>
          <button 
            onClick={() => setShowAdjModal(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Adjustment</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Stock Value', value: '₹12.4M' },
          { label: 'Items In Today', value: '350' },
          { label: 'Items Out Today', value: '130' },
          { label: 'Adjustments This Week', value: movements.filter(m => m.type === 'ADJUSTMENT').length.toString() },
        ].map((metric, idx) => (
          <div key={idx} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-3 sm:px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{metric.label}</div>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-text-primary)] mt-1">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-border)] overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'text-[var(--color-mint)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint)]" />
                )}
              </button>
            ))}
          </div>

          {/* Movements Table */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Date</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Product</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Type</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Qty</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Before/After</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Reference</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Done By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-[var(--color-text-secondary)] text-sm">No movements found for this filter</td></tr>
                  ) : filtered.map((movement) => {
                    const typeColor = getTypeColor(movement.type);
                    const isNeg = movement.type === 'OUT' || movement.quantity < 0;
                    return (
                      <tr key={movement.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            {movement.date}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] max-w-[120px] truncate">{movement.product}</td>
                        <td className="px-3 sm:px-4 py-3">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                            style={{ backgroundColor: `${typeColor.bg}20`, color: typeColor.text }}
                          >
                            {movement.type}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap" style={{ color: isNeg ? 'var(--color-danger)' : 'var(--color-mint)' }}>
                          {isNeg ? '-' : '+'}{Math.abs(movement.quantity)}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:table-cell">
                          {movement.before} → {movement.after}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:table-cell">{movement.reference}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 flex-shrink-0" />
                            {movement.user}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Stock Summary Pie */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-4">Stock Summary</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={stockData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {stockData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[var(--color-text-primary)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-4">Top Low Stock Items</h3>
            <div className="space-y-4">
              {lowStockItems.map((item, idx) => {
                const percent = (item.stock / item.max) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs sm:text-sm text-[var(--color-text-primary)] truncate pr-2">{item.name}</span>
                      <span className="text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap">{item.stock}/{item.max}</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: 'var(--color-warning)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={() => setShowAdjModal(true)}
              className="w-full mt-4 bg-[var(--color-mint)] text-white py-2 rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
            >
              Quick Reorder
            </button>
          </div>
        </div>
      </div>

      {/* New Adjustment Modal */}
      {showAdjModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">New Stock Adjustment</h2>
              <button onClick={() => setShowAdjModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Product</label>
                <select value={adjForm.product} onChange={e => setAdjForm(f => ({ ...f, product: e.target.value }))} className={INPUT_CLS}>
                  {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Movement Type</label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-[var(--color-surface-secondary)] rounded-lg">
                  {(['IN', 'OUT', 'ADJUSTMENT'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setAdjForm(f => ({ ...f, type: t }))}
                      className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${adjForm.type === t ? 'bg-[var(--color-mint)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Quantity *</label>
                <input type="number" placeholder="0" value={adjForm.quantity || ''} onChange={e => setAdjForm(f => ({ ...f, quantity: Number(e.target.value) }))} className={INPUT_CLS} min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Reference No.</label>
                <input type="text" placeholder="ADJ-2024-XXX" value={adjForm.reference} onChange={e => setAdjForm(f => ({ ...f, reference: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Reason</label>
                <textarea placeholder="Reason for adjustment..." value={adjForm.reason} onChange={e => setAdjForm(f => ({ ...f, reason: e.target.value }))} rows={3} className={INPUT_CLS + ' resize-none'} />
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowAdjModal(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">Cancel</button>
              <button onClick={handleAddAdjustment} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">Save Adjustment</button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Stock Transfer</h2>
              <button onClick={() => setShowTransferModal(false)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Product</label>
                <select className={INPUT_CLS}>{PRODUCTS.map(p => <option key={p}>{p}</option>)}</select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">From Warehouse</label>
                  <select className={INPUT_CLS}>
                    <option>Main Warehouse</option><option>Branch A</option><option>Branch B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">To Warehouse</label>
                  <select className={INPUT_CLS}>
                    <option>Branch A</option><option>Branch B</option><option>Main Warehouse</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Quantity</label>
                <input type="number" placeholder="0" className={INPUT_CLS} min="1" />
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setShowTransferModal(false)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">Cancel</button>
              <button onClick={() => { setShowTransferModal(false); showSuccess('Stock transfer initiated!'); }} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">Confirm Transfer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
