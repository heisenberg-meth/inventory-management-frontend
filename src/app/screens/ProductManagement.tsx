import React, { useState, useMemo } from 'react';
import { Plus, Upload, Search, ArrowUpDown, Download, Edit, Eye, Trash2, X, Calendar, Package, AlertTriangle, Check } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  batch: string;
  category: string;
  price: string;
  priceNum: number;
  stock: number;
  max: number;
  expiry: string;
  status: string;
  unit: string;
  threshold: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Paracetamol 500mg', batch: 'BTH-2024-001', category: 'Pain Relief', price: '₹45', priceNum: 45, stock: 450, max: 1000, expiry: '2025-12-15', status: 'Active', unit: 'Strip', threshold: 100 },
  { id: 2, name: 'Amoxicillin 250mg', batch: 'BTH-2024-002', category: 'Antibiotics', price: '₹120', priceNum: 120, stock: 89, max: 500, expiry: '2024-08-20', status: 'Low Stock', unit: 'Strip', threshold: 100 },
  { id: 3, name: 'Ibuprofen 400mg', batch: 'BTH-2024-003', category: 'Pain Relief', price: '₹65', priceNum: 65, stock: 0, max: 800, expiry: '2025-06-10', status: 'Out of Stock', unit: 'Strip', threshold: 80 },
  { id: 4, name: 'Cetirizine 10mg', batch: 'BTH-2024-004', category: 'Antihistamine', price: '₹35', priceNum: 35, stock: 620, max: 1000, expiry: '2025-09-25', status: 'Active', unit: 'Piece', threshold: 100 },
  { id: 5, name: 'Metformin 500mg', batch: 'BTH-2024-005', category: 'Diabetes', price: '₹85', priceNum: 85, stock: 310, max: 600, expiry: '2026-01-18', status: 'Active', unit: 'Strip', threshold: 60 },
  { id: 6, name: 'Atorvastatin 20mg', batch: 'BTH-2024-006', category: 'Cholesterol', price: '₹145', priceNum: 145, stock: 42, max: 400, expiry: '2024-05-30', status: 'Expiring', unit: 'Strip', threshold: 40 },
  { id: 7, name: 'Omeprazole 20mg', batch: 'BTH-2024-007', category: 'Gastric', price: '₹95', priceNum: 95, stock: 520, max: 800, expiry: '2025-11-12', status: 'Active', unit: 'Strip', threshold: 80 },
  { id: 8, name: 'Vitamin D3 60K', batch: 'BTH-2024-008', category: 'Supplements', price: '₹55', priceNum: 55, stock: 780, max: 1000, expiry: '2026-03-08', status: 'Active', unit: 'Box', threshold: 100 },
];

const CATEGORIES = ['Pain Relief', 'Antibiotics', 'Antihistamine', 'Diabetes', 'Cholesterol', 'Gastric', 'Supplements', 'Cardiac', 'Vitamins', 'Other'];
const UNITS = ['Piece', 'Box', 'Strip', 'Bottle', 'Vial', 'Sachet'];

interface FormData {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: number;
  max: number;
  threshold: number;
  batch: string;
  expiry: string;
}

const emptyForm: FormData = {
  name: '', category: 'Pain Relief', price: '', unit: 'Strip',
  stock: 0, max: 1000, threshold: 100, batch: '', expiry: ''
};

const computeStatus = (stock: number, max: number, expiry: string): string => {
  if (stock === 0) return 'Out of Stock';
  const today = new Date();
  const expDate = new Date(expiry);
  const days = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (days > 0 && days <= 30) return 'Expiring';
  const pct = (stock / max) * 100;
  if (pct < 20) return 'Low Stock';
  return 'Active';
};

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortField, setSortField] = useState<keyof Product>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name, category: p.category, price: p.priceNum.toString(),
      unit: p.unit, stock: p.stock, max: p.max, threshold: p.threshold,
      batch: p.batch, expiry: p.expiry
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) errors.price = 'Valid price required';
    if (!formData.batch.trim()) errors.batch = 'Batch number is required';
    if (!formData.expiry) errors.expiry = 'Expiry date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const priceNum = Number(formData.price);
    const status = computeStatus(formData.stock, formData.max, formData.expiry);

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p, name: formData.name, category: formData.category,
        price: `₹${priceNum}`, priceNum, stock: formData.stock, max: formData.max,
        threshold: formData.threshold, batch: formData.batch, expiry: formData.expiry,
        unit: formData.unit, status
      } : p));
      showSuccess('Product updated successfully!');
    } else {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, {
        id: newId, name: formData.name, category: formData.category,
        price: `₹${priceNum}`, priceNum, stock: formData.stock, max: formData.max,
        threshold: formData.threshold, batch: formData.batch, expiry: formData.expiry,
        unit: formData.unit, status
      }]);
      showSuccess('Product added successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    showSuccess('Product deleted.');
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.batch.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = categoryFilter === 'All Categories' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'All Status' || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
    result = [...result].sort((a, b) => {
      const va = a[sortField]; const vb = b[sortField];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [products, searchQuery, categoryFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const stats = [
    { label: 'Total Products', value: products.length.toLocaleString() },
    { label: 'Active', value: products.filter(p => p.status === 'Active').length.toLocaleString() },
    { label: 'Low Stock', value: products.filter(p => p.status === 'Low Stock').length.toLocaleString() },
    { label: 'Expiring Soon', value: products.filter(p => p.status === 'Expiring').length.toLocaleString() },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: 'var(--color-mint)', text: 'var(--color-mint)' };
      case 'Low Stock': return { bg: 'var(--color-warning)', text: 'var(--color-warning)' };
      case 'Out of Stock': return { bg: 'var(--color-danger)', text: 'var(--color-danger)' };
      case 'Expiring': return { bg: 'var(--color-danger)', text: 'var(--color-danger)' };
      default: return { bg: 'var(--color-mint)', text: 'var(--color-mint)' };
    }
  };

  const inputClass = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl animate-fade-in">
          <Check className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">Product Management</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Manage your inventory products and stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg px-3 sm:px-4 py-2">
            <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
            <div className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">
          <Upload className="w-4 h-4" />
          Import CSV
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
        <button 
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search products, batch number..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:flex gap-2">
            <select 
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 sm:px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
            >
              <option>All Categories</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 sm:px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
              <option>Expiring</option>
            </select>
            <button 
              onClick={() => handleSort('name')}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-surface-secondary)] accent-[var(--color-mint)]" />
                </th>
                {[
                  { label: 'Product', field: 'name' },
                  { label: 'Batch No.', field: 'batch' },
                  { label: 'Category', field: 'category' },
                  { label: 'Price', field: 'priceNum' },
                  { label: 'Stock', field: 'stock' },
                  { label: 'Expiry Date', field: 'expiry' },
                  { label: 'Status', field: 'status' },
                ].map(col => (
                  <th
                    key={col.field}
                    className={`px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-[var(--color-mint)] transition-colors ${col.field === 'category' ? 'hidden sm:table-cell' : ''}`}
                    onClick={() => handleSort(col.field as keyof Product)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortField === col.field && <ArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Package className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3" />
                    <p className="text-[var(--color-text-secondary)]">No products found</p>
                    <button onClick={openAdd} className="mt-3 text-sm text-[var(--color-mint)] hover:underline">Add a product</button>
                  </td>
                </tr>
              ) : paginated.map((product) => {
                const statusColor = getStatusColor(product.status);
                const stockPercent = product.max > 0 ? (product.stock / product.max) * 100 : 0;
                return (
                  <tr key={product.id} className="hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <td className="px-3 sm:px-4 py-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-surface-secondary)] accent-[var(--color-mint)]" />
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-mint)]/20 flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-mint)]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] truncate max-w-[120px] sm:max-w-none">{product.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)] truncate sm:hidden">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap">{product.batch}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:table-cell">{product.category}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">{product.price}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">{product.stock.toLocaleString()} {product.unit}s</div>
                        <div className="w-16 sm:w-20 h-1.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${Math.min(stockPercent, 100)}%`, 
                              backgroundColor: stockPercent > 50 ? 'var(--color-mint)' : stockPercent > 20 ? 'var(--color-warning)' : 'var(--color-danger)'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-nowrap">{product.expiry}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <span 
                        className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ backgroundColor: `${statusColor.bg}20`, color: statusColor.text }}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex gap-1 sm:gap-2">
                        <button 
                          onClick={() => setViewingProduct(product)}
                          className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEdit(product)}
                          className="p-1.5 rounded hover:bg-[var(--color-mint)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteTarget(product)}
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

        {/* Pagination */}
        <div className="px-3 sm:px-4 py-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} products
          </div>
          {totalPages > 1 && (
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded hover:bg-[var(--color-card-bg)] transition-colors text-xs sm:text-sm disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-2 sm:px-3 py-1.5 rounded transition-colors text-xs sm:text-sm ${currentPage === p ? 'bg-[var(--color-mint)] text-white' : 'bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-card-bg)]'}`}
                >
                  {p}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded hover:bg-[var(--color-card-bg)] transition-colors text-xs sm:text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-card-bg)] z-10">
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Product Name <span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Paracetamol 500mg"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    className={inputClass + (formErrors.name ? ' border-[var(--color-danger)]' : '')}
                  />
                  {formErrors.name && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                    className={inputClass}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Price (₹) <span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={e => setFormData(f => ({ ...f, price: e.target.value }))}
                    className={inputClass + (formErrors.price ? ' border-[var(--color-danger)]' : '')}
                  />
                  {formErrors.price && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Unit</label>
                  <select 
                    value={formData.unit}
                    onChange={e => setFormData(f => ({ ...f, unit: e.target.value }))}
                    className={inputClass}
                  >
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Initial Stock</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))}
                    className={inputClass}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Max Stock</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={formData.max}
                    onChange={e => setFormData(f => ({ ...f, max: Number(e.target.value) }))}
                    className={inputClass}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Low Stock Threshold</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.threshold}
                    onChange={e => setFormData(f => ({ ...f, threshold: Number(e.target.value) }))}
                    className={inputClass}
                    min="0"
                  />
                </div>
              </div>

              {/* Pharmacy Fields */}
              <div className="bg-[var(--color-mint-glow)] border border-[var(--color-mint)]/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[var(--color-mint)] mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Pharmacy Domain Fields
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Batch Number <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="BTH-2024-XXX"
                      value={formData.batch}
                      onChange={e => setFormData(f => ({ ...f, batch: e.target.value }))}
                      className={inputClass + (formErrors.batch ? ' border-[var(--color-danger)]' : '')}
                    />
                    {formErrors.batch && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.batch}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Expiry Date <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.expiry}
                      onChange={e => setFormData(f => ({ ...f, expiry: e.target.value }))}
                      className={inputClass + (formErrors.expiry ? ' border-[var(--color-danger)]' : '')}
                    />
                    {formErrors.expiry && <p className="text-xs text-[var(--color-danger)] mt-1">{formErrors.expiry}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm"
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Product Details</h2>
              <button onClick={() => setViewingProduct(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-mint)]/20 flex items-center justify-center">
                  <Package className="w-8 h-8 text-[var(--color-mint)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{viewingProduct.name}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${getStatusColor(viewingProduct.status).bg}20`, color: getStatusColor(viewingProduct.status).text }}
                  >{viewingProduct.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Category', value: viewingProduct.category },
                  { label: 'Price', value: viewingProduct.price },
                  { label: 'Batch No.', value: viewingProduct.batch },
                  { label: 'Expiry Date', value: viewingProduct.expiry },
                  { label: 'Current Stock', value: `${viewingProduct.stock.toLocaleString()} ${viewingProduct.unit}s` },
                  { label: 'Max Stock', value: `${viewingProduct.max.toLocaleString()} ${viewingProduct.unit}s` },
                ].map(item => (
                  <div key={item.label} className="bg-[var(--color-surface-secondary)] rounded-lg p-3">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-secondary)]">Stock Level</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{Math.round((viewingProduct.stock / viewingProduct.max) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${(viewingProduct.stock / viewingProduct.max) * 100}%`,
                      backgroundColor: viewingProduct.stock / viewingProduct.max > 0.5 ? 'var(--color-mint)' : viewingProduct.stock / viewingProduct.max > 0.2 ? 'var(--color-warning)' : 'var(--color-danger)'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] flex gap-3 justify-end">
              <button onClick={() => setViewingProduct(null)} className="px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">Close</button>
              <button onClick={() => { openEdit(viewingProduct); setViewingProduct(null); }} className="px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg hover:bg-[var(--color-mint-hover)] transition-colors font-medium text-sm">Edit Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[var(--color-danger)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Delete Product</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-primary)] mb-6">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-card-bg)] transition-colors text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
