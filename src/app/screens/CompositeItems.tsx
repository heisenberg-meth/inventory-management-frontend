import React, { useState, useMemo } from 'react';
import {
  Plus, Search, Edit, Trash2, Eye, X, Check, AlertTriangle,
  PackagePlus, Download, ArrowUpDown, Layers,
  Package, MinusCircle, Info
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ComponentItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

interface CompositeItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  description: string;
  sellingPrice: number;
  components: ComponentItem[];
  status: 'Active' | 'Inactive' | 'Draft';
  createdAt: string;
}

// ─── Available base products for selection ─────────────────────────────────────
const AVAILABLE_PRODUCTS = [
  { id: 1,  name: 'Paracetamol 500mg',      sku: 'BTH-2024-001', unit: 'Strip',  cost: 40  },
  { id: 2,  name: 'Amoxicillin 250mg',      sku: 'BTH-2024-002', unit: 'Strip',  cost: 110 },
  { id: 3,  name: 'Ibuprofen 400mg',        sku: 'BTH-2024-003', unit: 'Strip',  cost: 58  },
  { id: 4,  name: 'Cetirizine 10mg',        sku: 'BTH-2024-004', unit: 'Piece',  cost: 30  },
  { id: 5,  name: 'Metformin 500mg',        sku: 'BTH-2024-005', unit: 'Strip',  cost: 78  },
  { id: 6,  name: 'Atorvastatin 20mg',      sku: 'BTH-2024-006', unit: 'Strip',  cost: 130 },
  { id: 7,  name: 'Omeprazole 20mg',        sku: 'BTH-2024-007', unit: 'Strip',  cost: 88  },
  { id: 8,  name: 'Vitamin D3 60K',         sku: 'BTH-2024-008', unit: 'Box',    cost: 48  },
  { id: 9,  name: 'Bandage Roll 5cm',       sku: 'BTH-2024-009', unit: 'Piece',  cost: 25  },
  { id: 10, name: 'Antiseptic Cream 25g',   sku: 'BTH-2024-010', unit: 'Piece',  cost: 55  },
  { id: 11, name: 'Cotton Wool 100g',       sku: 'BTH-2024-011', unit: 'Box',    cost: 35  },
  { id: 12, name: 'Aspirin 75mg',           sku: 'BTH-2024-012', unit: 'Strip',  cost: 22  },
  { id: 13, name: 'Losartan 50mg',          sku: 'BTH-2024-013', unit: 'Strip',  cost: 95  },
  { id: 14, name: 'Glucometer Strips',      sku: 'BTH-2024-014', unit: 'Box',    cost: 320 },
  { id: 15, name: 'Disposable Gloves (50)', sku: 'BTH-2024-015', unit: 'Box',    cost: 120 },
];

const CATEGORIES = ['First Aid', 'Chronic Care', 'Diabetes Care', 'Cardiac Care', 'General Wellness', 'Pain Management', 'Other'];

// ─── Seed Data ─────────────────────────────────────────────────────────────────
const INITIAL_COMPOSITES: CompositeItem[] = [
  {
    id: 1,
    name: 'Basic First Aid Kit',
    sku: 'COMP-001',
    category: 'First Aid',
    description: 'Essential first aid supplies for minor injuries and emergencies. Ideal for offices and homes.',
    sellingPrice: 350,
    status: 'Active',
    createdAt: '2024-03-01',
    components: [
      { productId: 9,  productName: 'Bandage Roll 5cm',     sku: 'BTH-2024-009', quantity: 3, unit: 'Piece', unitCost: 25  },
      { productId: 10, productName: 'Antiseptic Cream 25g', sku: 'BTH-2024-010', quantity: 1, unit: 'Piece', unitCost: 55  },
      { productId: 11, productName: 'Cotton Wool 100g',     sku: 'BTH-2024-011', quantity: 1, unit: 'Box',   unitCost: 35  },
      { productId: 1,  productName: 'Paracetamol 500mg',    sku: 'BTH-2024-001', quantity: 1, unit: 'Strip', unitCost: 40  },
    ],
  },
  {
    id: 2,
    name: 'Diabetes Care Bundle',
    sku: 'COMP-002',
    category: 'Diabetes Care',
    description: 'Comprehensive diabetes management kit including medication and monitoring supplies.',
    sellingPrice: 850,
    status: 'Active',
    createdAt: '2024-03-05',
    components: [
      { productId: 5,  productName: 'Metformin 500mg',      sku: 'BTH-2024-005', quantity: 2, unit: 'Strip', unitCost: 78  },
      { productId: 14, productName: 'Glucometer Strips',    sku: 'BTH-2024-014', quantity: 1, unit: 'Box',   unitCost: 320 },
      { productId: 15, productName: 'Disposable Gloves (50)',sku: 'BTH-2024-015', quantity: 1, unit: 'Box',  unitCost: 120 },
    ],
  },
  {
    id: 3,
    name: 'Pain Relief Pack',
    sku: 'COMP-003',
    category: 'Pain Management',
    description: 'Combined pain relief medication pack for acute and mild chronic pain.',
    sellingPrice: 220,
    status: 'Active',
    createdAt: '2024-03-10',
    components: [
      { productId: 1, productName: 'Paracetamol 500mg', sku: 'BTH-2024-001', quantity: 2, unit: 'Strip', unitCost: 40 },
      { productId: 3, productName: 'Ibuprofen 400mg',   sku: 'BTH-2024-003', quantity: 1, unit: 'Strip', unitCost: 58 },
    ],
  },
  {
    id: 4,
    name: 'Cardiac Wellness Kit',
    sku: 'COMP-004',
    category: 'Cardiac Care',
    description: 'Essential medications for cardiac patients to manage cholesterol, blood pressure, and clotting.',
    sellingPrice: 680,
    status: 'Active',
    createdAt: '2024-03-12',
    components: [
      { productId: 6,  productName: 'Atorvastatin 20mg', sku: 'BTH-2024-006', quantity: 1, unit: 'Strip', unitCost: 130 },
      { productId: 13, productName: 'Losartan 50mg',     sku: 'BTH-2024-013', quantity: 1, unit: 'Strip', unitCost: 95  },
      { productId: 12, productName: 'Aspirin 75mg',      sku: 'BTH-2024-012', quantity: 2, unit: 'Strip', unitCost: 22  },
    ],
  },
  {
    id: 5,
    name: 'Allergy & Immunity Combo',
    sku: 'COMP-005',
    category: 'General Wellness',
    description: 'Supplements and antihistamines for seasonal allergy management and immune support.',
    sellingPrice: 195,
    status: 'Draft',
    createdAt: '2024-03-15',
    components: [
      { productId: 4, productName: 'Cetirizine 10mg',  sku: 'BTH-2024-004', quantity: 2, unit: 'Piece', unitCost: 30 },
      { productId: 8, productName: 'Vitamin D3 60K',   sku: 'BTH-2024-008', quantity: 1, unit: 'Box',   unitCost: 48 },
    ],
  },
  {
    id: 6,
    name: 'Gastric Relief Bundle',
    sku: 'COMP-006',
    category: 'General Wellness',
    description: 'Combination therapy for acid reflux and gastric discomfort.',
    sellingPrice: 310,
    status: 'Inactive',
    createdAt: '2024-02-28',
    components: [
      { productId: 7, productName: 'Omeprazole 20mg',   sku: 'BTH-2024-007', quantity: 2, unit: 'Strip', unitCost: 88 },
      { productId: 1, productName: 'Paracetamol 500mg', sku: 'BTH-2024-001', quantity: 1, unit: 'Strip', unitCost: 40 },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const calcCOGS = (components: ComponentItem[]) =>
  components.reduce((sum, c) => sum + c.unitCost * c.quantity, 0);

const IC = 'w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]';

const statusStyle = (status: string) => {
  switch (status) {
    case 'Active':   return 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]';
    case 'Inactive': return 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]';
    case 'Draft':    return 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]';
    default:         return 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]';
  }
};

interface FormState {
  name: string; sku: string; category: string; description: string;
  sellingPrice: string; status: 'Active' | 'Inactive' | 'Draft';
}

const emptyForm = (): FormState => ({
  name: '', sku: '', category: 'First Aid', description: '', sellingPrice: '', status: 'Active',
});

// ─── Main Component ────────────────────────────────────────────────────────────
export const CompositeItems: React.FC = () => {
  const [items, setItems]             = useState<CompositeItem[]>(INITIAL_COMPOSITES);
  const [search, setSearch]           = useState('');
  const [catFilter, setCatFilter]     = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortField, setSortField]     = useState<'name' | 'sku' | 'sellingPrice' | 'status'>('name');
  const [sortDir, setSortDir]         = useState<'asc' | 'desc'>('asc');
  const [toast, setToast]             = useState('');

  // Modals
  const [showForm, setShowForm]           = useState(false);
  const [editing, setEditing]             = useState<CompositeItem | null>(null);
  const [viewing, setViewing]             = useState<CompositeItem | null>(null);
  const [deleteTarget, setDeleteTarget]   = useState<CompositeItem | null>(null);

  // Form state
  const [form, setForm]               = useState(emptyForm());
  const [formErrors, setFormErrors]   = useState<Record<string, string>>({});
  const [components, setComponents]   = useState<ComponentItem[]>([]);
  const [compSearch, setCompSearch]   = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Sort & Filter ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = items.filter(item => {
      const q = search.toLowerCase();
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      const matchCat    = catFilter === 'All Categories'  || item.category === catFilter;
      const matchStatus = statusFilter === 'All Status'   || item.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
    result = [...result].sort((a, b) => {
      const va = a[sortField]; const vb = b[sortField];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [items, search, catFilter, statusFilter, sortField, sortDir]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  // ── Form helpers ────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setComponents([]);
    setFormErrors({});
    setCompSearch('');
    setShowForm(true);
  };

  const openEdit = (item: CompositeItem) => {
    setEditing(item);
    setForm({ name: item.name, sku: item.sku, category: item.category, description: item.description, sellingPrice: String(item.sellingPrice), status: item.status });
    setComponents([...item.components]);
    setFormErrors({});
    setCompSearch('');
    setShowForm(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim())        errors.name         = 'Name is required';
    if (!form.sku.trim())         errors.sku          = 'SKU is required';
    if (!form.sellingPrice || isNaN(Number(form.sellingPrice)) || Number(form.sellingPrice) <= 0)
                                  errors.sellingPrice = 'Valid selling price required';
    if (components.length === 0)  errors.components   = 'Add at least one component';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (editing) {
      setItems(prev => prev.map(it => it.id === editing.id
        ? { ...it, ...form, sellingPrice: Number(form.sellingPrice), components }
        : it
      ));
      showToast('Composite item updated!');
    } else {
      const newId = Math.max(0, ...items.map(i => i.id)) + 1;
      setItems(prev => [...prev, {
        id: newId,
        ...form,
        sellingPrice: Number(form.sellingPrice),
        components,
        createdAt: new Date().toISOString().split('T')[0],
      }]);
      showToast('Composite item created!');
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast('Composite item deleted.');
  };

  // ── Component management ────────────────────────────────────────────────────
  const addComponent = (prod: typeof AVAILABLE_PRODUCTS[number]) => {
    if (components.find(c => c.productId === prod.id)) return; // already added
    setComponents(prev => [...prev, {
      productId: prod.id, productName: prod.name, sku: prod.sku,
      quantity: 1, unit: prod.unit, unitCost: prod.cost,
    }]);
  };

  const updateQty = (productId: number, qty: number) => {
    setComponents(prev => prev.map(c => c.productId === productId ? { ...c, quantity: Math.max(1, qty) } : c));
  };

  const removeComponent = (productId: number) => {
    setComponents(prev => prev.filter(c => c.productId !== productId));
  };

  const filteredProducts = AVAILABLE_PRODUCTS.filter(p =>
    !compSearch || p.name.toLowerCase().includes(compSearch.toLowerCase()) || p.sku.toLowerCase().includes(compSearch.toLowerCase())
  ).filter(p => !components.find(c => c.productId === p.id));

  const cogs = calcCOGS(components);
  const margin = form.sellingPrice && Number(form.sellingPrice) > 0
    ? (((Number(form.sellingPrice) - cogs) / Number(form.sellingPrice)) * 100).toFixed(1)
    : '—';

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = [
    { label: 'Total Composite Items', value: items.length },
    { label: 'Active',   value: items.filter(i => i.status === 'Active').length },
    { label: 'Draft',    value: items.filter(i => i.status === 'Draft').length },
    { label: 'Inactive', value: items.filter(i => i.status === 'Inactive').length },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl animate-fade-in">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Composite Items</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            Bundle multiple products into kits, packs, or combo offerings
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            New Composite
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3">
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search composite items, SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
            >
              <option>All Categories</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Inactive</option>
            </select>
            <button
              onClick={() => toggleSort('name')}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-mint)]" />
                </th>
                {[
                  { label: 'Item Name',     field: 'name' as const },
                  { label: 'SKU',           field: 'sku' as const },
                  { label: 'Category',      field: null },
                  { label: 'Components',    field: null },
                  { label: 'COGS',          field: null },
                  { label: 'Selling Price', field: 'sellingPrice' as const },
                  { label: 'Margin',        field: null },
                  { label: 'Status',        field: 'status' as const },
                ].map((col, i) => (
                  <th
                    key={i}
                    onClick={col.field ? () => toggleSort(col.field!) : undefined}
                    className={`px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap ${col.field ? 'cursor-pointer hover:text-[var(--color-mint)]' : ''} ${i > 2 ? 'hidden md:table-cell' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.field && sortField === col.field && <ArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <Layers className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3" />
                    <p className="text-[var(--color-text-secondary)] font-medium">No composite items found</p>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Try adjusting your filters or create a new composite item</p>
                    <button onClick={openAdd} className="mt-4 text-sm text-[var(--color-mint)] hover:underline">
                      + Create Composite Item
                    </button>
                  </td>
                </tr>
              ) : filtered.map(item => {
                const itemCogs = calcCOGS(item.components);
                const itemMargin = item.sellingPrice > 0
                  ? (((item.sellingPrice - itemCogs) / item.sellingPrice) * 100).toFixed(1)
                  : '0.0';
                const marginNum = parseFloat(itemMargin);
                return (
                  <tr key={item.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-mint)]" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center flex-shrink-0">
                          <PackagePlus className="w-4 h-4 text-[var(--color-mint)]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)] md:hidden">{item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)] font-mono">{item.sku}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded bg-[var(--color-surface-secondary)] text-xs text-[var(--color-text-secondary)]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1">
                          {item.components.slice(0, 3).map((_, ci) => (
                            <div key={ci} className="w-6 h-6 rounded-full bg-[var(--color-mint)]/30 border border-[var(--color-card-bg)] flex items-center justify-center">
                              <Package className="w-3 h-3 text-[var(--color-mint)]" />
                            </div>
                          ))}
                          {item.components.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-[var(--color-surface-secondary)] border border-[var(--color-card-bg)] flex items-center justify-center text-[10px] font-semibold text-[var(--color-text-secondary)]">
                              +{item.components.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-[var(--color-text-secondary)]">{item.components.length} items</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)] hidden md:table-cell">
                      ₹{itemCogs.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] hidden md:table-cell">
                      ₹{item.sellingPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-sm font-medium ${marginNum >= 25 ? 'text-[var(--color-mint)]' : marginNum >= 10 ? 'text-[var(--color-warning)]' : 'text-[var(--color-danger)]'}`}>
                        {itemMargin}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setViewing(item)}
                          className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-secondary)]">
            Showing {filtered.length} of {items.length} composite items
          </span>
        </div>
      </div>

      {/* ── Add / Edit Modal ─────────────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-3xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-card-bg)] rounded-t-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center">
                  <PackagePlus className="w-5 h-5 text-[var(--color-mint)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {editing ? 'Edit Composite Item' : 'New Composite Item'}
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)]">Bundle products into a sellable package</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Basic Details */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">Basic Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                      Item Name <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Basic First Aid Kit"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={IC + (formErrors.name ? ' border-[var(--color-danger)]' : '')}
                    />
                    {formErrors.name && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                      SKU / Code <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., COMP-007"
                      value={form.sku}
                      onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                      className={IC + (formErrors.sku ? ' border-[var(--color-danger)]' : '')}
                    />
                    {formErrors.sku && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.sku}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={IC}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                      Selling Price (₹) <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      value={form.sellingPrice}
                      onChange={e => setForm(f => ({ ...f, sellingPrice: e.target.value }))}
                      className={IC + (formErrors.sellingPrice ? ' border-[var(--color-danger)]' : '')}
                    />
                    {formErrors.sellingPrice && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.sellingPrice}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Active' | 'Inactive' | 'Draft' }))} className={IC}>
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Description</label>
                    <textarea
                      placeholder="Brief description of this composite item..."
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      rows={2}
                      className={IC + ' resize-none'}
                    />
                  </div>
                </div>
              </div>

              {/* Components Builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
                    Component Products <span className="text-[var(--color-danger)]">*</span>
                  </h3>
                  {formErrors.components && (
                    <p className="text-xs text-[var(--color-danger)]">{formErrors.components}</p>
                  )}
                </div>

                {/* Added Components */}
                {components.length > 0 && (
                  <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg overflow-hidden mb-3">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[var(--color-border)]">
                          {['Product', 'SKU', 'Unit Cost', 'Qty', 'Total', ''].map((h, i) => (
                            <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {components.map(c => (
                          <tr key={c.productId}>
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2">
                                <Package className="w-3.5 h-3.5 text-[var(--color-mint)] flex-shrink-0" />
                                <span className="text-xs font-medium text-[var(--color-text-primary)]">{c.productName}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-xs text-[var(--color-text-muted)] font-mono">{c.sku}</td>
                            <td className="px-3 py-2 text-xs text-[var(--color-text-secondary)]">₹{c.unitCost}</td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                min={1}
                                value={c.quantity}
                                onChange={e => updateQty(c.productId, Number(e.target.value))}
                                className="w-16 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-mint)]"
                              />
                            </td>
                            <td className="px-3 py-2 text-xs font-medium text-[var(--color-text-primary)]">
                              ₹{(c.unitCost * c.quantity).toLocaleString()}
                            </td>
                            <td className="px-3 py-2">
                              <button
                                onClick={() => removeComponent(c.productId)}
                                className="p-1 rounded hover:bg-[var(--color-danger)]/20 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors"
                              >
                                <MinusCircle className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="border-t border-[var(--color-border)]">
                        <tr>
                          <td colSpan={4} className="px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] text-right">
                            Total COGS:
                          </td>
                          <td className="px-3 py-2 text-sm font-bold text-[var(--color-text-primary)]">
                            ₹{cogs.toLocaleString()}
                          </td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}

                {/* Margin preview */}
                {components.length > 0 && form.sellingPrice && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-mint-glow)] border border-[var(--color-mint)]/30 mb-3">
                    <Info className="w-4 h-4 text-[var(--color-mint)] flex-shrink-0" />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      COGS: <strong className="text-[var(--color-text-primary)]">₹{cogs}</strong>
                      &nbsp;·&nbsp; Selling Price: <strong className="text-[var(--color-text-primary)]">₹{form.sellingPrice}</strong>
                      &nbsp;·&nbsp; Gross Margin: <strong className={`${parseFloat(margin as string) >= 20 ? 'text-[var(--color-mint)]' : 'text-[var(--color-warning)]'}`}>{margin}%</strong>
                    </span>
                  </div>
                )}

                {/* Product Search / Picker */}
                <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
                  <div className="p-3 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <input
                        type="text"
                        placeholder="Search products to add..."
                        value={compSearch}
                        onChange={e => setCompSearch(e.target.value)}
                        className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
                      />
                    </div>
                  </div>
                  <div className="max-h-44 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <p className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">
                        {compSearch ? 'No matching products' : 'All products already added'}
                      </p>
                    ) : filteredProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => addComponent(p)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--color-surface-secondary)] transition-colors text-left border-b border-[var(--color-border)] last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-[var(--color-text-muted)]" />
                          <div>
                            <div className="text-sm font-medium text-[var(--color-text-primary)]">{p.name}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{p.sku} · {p.unit}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[var(--color-text-secondary)]">₹{p.cost}</span>
                          <div className="flex items-center gap-1 text-[var(--color-mint)] text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--color-mint)]/10">
                            <Plus className="w-3 h-3" /> Add
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
              >
                {editing ? 'Save Changes' : 'Create Composite Item'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Modal ───────────────────────────────────────────────────────── */}
      {viewing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center">
                  <PackagePlus className="w-5 h-5 text-[var(--color-mint)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{viewing.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle(viewing.status)}`}>{viewing.status}</span>
                </div>
              </div>
              <button onClick={() => setViewing(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'SKU',           value: viewing.sku },
                  { label: 'Category',      value: viewing.category },
                  { label: 'Selling Price', value: `₹${viewing.sellingPrice.toLocaleString()}` },
                  { label: 'COGS',          value: `₹${calcCOGS(viewing.components).toLocaleString()}` },
                  { label: 'Gross Margin',  value: `${(((viewing.sellingPrice - calcCOGS(viewing.components)) / viewing.sellingPrice) * 100).toFixed(1)}%` },
                  { label: 'Created',       value: viewing.createdAt },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>

              {viewing.description && (
                <div className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Description</div>
                  <div className="text-sm text-[var(--color-text-primary)]">{viewing.description}</div>
                </div>
              )}

              {/* Components */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--color-mint)]" />
                  Components ({viewing.components.length})
                </h3>
                <div className="space-y-2">
                  {viewing.components.map(c => (
                    <div key={c.productId} className="flex items-center justify-between bg-[var(--color-surface-secondary)] rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-[var(--color-mint)] flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-[var(--color-text-primary)]">{c.productName}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{c.sku}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {c.quantity} × ₹{c.unitCost}
                        </div>
                        <div className="text-xs text-[var(--color-text-secondary)]">₹{(c.quantity * c.unitCost).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2 px-3 py-2 bg-[var(--color-mint)]/10 rounded-lg border border-[var(--color-mint)]/20">
                  <span className="text-sm font-semibold text-[var(--color-mint)]">
                    Total COGS: ₹{calcCOGS(viewing.components).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewing(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">
                Close
              </button>
              <button
                onClick={() => { openEdit(viewing); setViewing(null); }}
                className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors"
              >
                Edit Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[var(--color-danger)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Delete Composite Item</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-primary)] mb-6">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? All component associations will be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
