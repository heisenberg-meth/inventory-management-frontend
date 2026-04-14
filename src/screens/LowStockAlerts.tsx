import React, { useState, useEffect } from 'react';
import { ShoppingBag, AlertTriangle, TrendingDown, Package, Search, RefreshCw } from 'lucide-react';
import { getLowStockProducts, type Product } from '../data/apiService';

export const LowStockAlerts: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLowStockProducts();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch low stock products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = items.filter((item: Product) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || (item.category || '').toLowerCase().includes(search.toLowerCase());
    const isCritical = item.stock <= (item.threshold || 0) * 0.5;
    const matchFilter = filter === 'All' || (filter === 'Critical' && isCritical) || (filter === 'Warning' && !isCritical);
    return matchSearch && matchFilter;
  });

  const criticalCount = items.filter((item: Product) => item.stock <= (item.threshold || 0) * 0.5).length;
  const warningCount = items.length - criticalCount;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Low Stock Alerts</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Monitor critical inventory levels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">
          <ShoppingBag className="w-4 h-4" />Create Purchase Orders
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-danger)]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[var(--color-danger)]" />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-secondary)]">Critical Items</div>
              <div className="text-2xl font-bold text-[var(--color-danger)]">{criticalCount}</div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-warning)]/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[var(--color-warning)]" />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-secondary)]">Warning Items</div>
              <div className="text-2xl font-bold text-[var(--color-warning)]">{warningCount}</div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-mint)]/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-[var(--color-mint)]" />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-secondary)]">Total Items</div>
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{items.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]" />
        </div>
        <div className="flex gap-2">
          {['All', 'Critical', 'Warning'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[var(--color-mint)] text-white' : 'bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-card-bg)]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                {['Product', 'Category', 'Current Stock', 'Reorder Level', 'Supplier', 'Severity', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-[var(--color-text-secondary)]">No alerts found</td></tr>
              ) : filtered.map((item: Product) => {
                const isCritical = item.stock <= (item.threshold || 0) * 0.5;
                const barColor = isCritical ? 'var(--color-danger)' : 'var(--color-warning)';
                return (
                  <tr key={item.id} className={`hover:bg-[var(--color-surface-secondary)] transition-colors ${isCritical ? 'border-l-4 border-l-[var(--color-danger)]' : 'border-l-4 border-l-[var(--color-warning)]'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isCritical ? 'bg-[var(--color-danger)]/20' : 'bg-[var(--color-warning)]/20'}`}>
                          <AlertTriangle className="w-4 h-4" style={{ color: barColor }} />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[var(--color-text-primary)]">{item.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{item.batch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{item.category}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold" style={{ color: barColor }}>{item.stock} {item.unit}s</div>
                        <div className="w-20 h-1.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${Math.min((item.stock / (item.max || 1000)) * 100, 100)}%`, backgroundColor: barColor }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{item.threshold} {item.unit}s</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)] max-w-[130px] truncate">Multiple</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isCritical ? 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]' : 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'}`}>
                        {isCritical ? 'Critical' : 'Warning'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-mint)] text-white rounded-lg text-xs font-medium hover:bg-[var(--color-mint-hover)] transition-colors">
                        <RefreshCw className="w-3 h-3" />Reorder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
