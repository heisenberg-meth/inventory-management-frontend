const BASE_URL = '/api';

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export interface Product {
  id: number;
  name: string;
  batch_number: string;
  category_id?: number;
  category?: string; // We'll map this if possible
  sale_price: number;
  purchase_price: number;
  stock: number;
  expiry_date: string;
  unit: string;
  reorder_level: number;
  status?: string; // Calculated on frontend
  price?: string; // Frontend expects "₹XXX"
  batch?: string; // Frontend shortcut
  expiry?: string; // Frontend shortcut
  threshold?: number; // Frontend shortcut
  max?: number; // Not in backend, we'll default to 1000
  storage_location?: string;
  zone?: string;
  rack?: string;
  bin?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  token?: string;
  user?: User;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
}

export interface Category {
  id: number | string;
  name: string;
  description: string;
  productCount: number;
  status: string;
}

export interface Supplier {
  id: number | string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: string;
  outstanding: number;
  totalOrders: number;
}

export interface Customer {
  id: number | string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  type: string;
  outstanding: number;
  totalOrders: number;
  status: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  orderId: number;
  customerId: number;
  customerName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'VOID' | 'PARTIAL';
}

export interface Payment {
  id: number;
  invoiceId: number;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  date: string;
  method: string;
  reference: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';
}

export interface StockTransfer {
  id: number;
  fromLocation: string;
  toLocation: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  date: string;
  items: StockItem[];
}

export interface SalesOrder {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: string;
  paymentStatus: string;
}

export interface DashboardKPIs {
  totalRevenue: number;
  totalOrders: number;
  lowStockCount: number;
  outOfStockCount: number;
  recentSales: SalesOrder[];
  stockValuation: number;
}

export interface Tenant {
  id: number;
  name: string;
  type: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Suspended";
  users: number;
  lastActive: string;
  revenue: string;
}

export interface StockItem {
  productId: number;
  quantity: number;
}
export interface PlatformStats {
  totalTenants: number;
  activeTenants: number;
  totalSubscriptions: number;
  systemHealth: string;
}
export interface AuditLog {
  id: number;
  user: string;
  action: string;
  target: string;
  type: string;
  ip: string;
  time: string;
}

export interface Brand {
  id: number;
  name: string;
  country?: string;
  status: 'Active' | 'Inactive';
  productCount: number;
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, ...rest } = options;
  const token = localStorage.getItem('ims-token');

  const headers = new Headers(rest.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (data && !(data instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...rest,
    headers,
    body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'POST', data }),
  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'PUT', data }),
  delete: <T>(endpoint: string, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

// Auth
export const login = (credentials: Record<string, string>) => api.post<ApiResponse<null>>('/auth/login', credentials);
export const signup = (userData: Record<string, unknown>) => api.post<ApiResponse<null>>('/api/auth/signup', userData);

// Tenant Products
export const getProducts = async (): Promise<Product[]> => {
  const data = await api.get<PagedResponse<Product> | Product[]>('/tenant/products');
  const products = Array.isArray(data) ? data : data?.content;
  
  if (!products) return [];

  return products.map((p) => ({
    ...p,
    id: p.id,
    name: p.name,
    batch: p.batch_number,
    expiry: p.expiry_date,
    price: `₹${p.sale_price}`,
    threshold: p.reorder_level,
    max: 1000,
    status: p.stock === 0 ? 'Out of Stock' : (p.stock <= (p.reorder_level || 50) ? 'Low Stock' : 'Active')
  }));
};
export const getCategories = () => api.get<Category[]>('/tenant/products/categories');
export const getBrands = () => api.get<Brand[]>('/tenant/products/brands');

// Tenant Suppliers & Customers
export const getSuppliers = () => api.get<Supplier[]>('/tenant/suppliers');
export const getCustomers = () => api.get<Customer[]>('/tenant/customers');

// Tenant Orders & Invoices
export const getSalesOrders = () => api.get<unknown[]>('/tenant/orders/sales');
export const getPurchaseOrders = () => api.get<unknown[]>('/tenant/orders/purchase');
export const getInvoices = () => api.get<Invoice[]>('/tenant/invoices');
export const getPayments = () => api.get<Payment[]>('/tenant/payments');

// Tenant Reports & Dashboard
export const getDashboardStats = () => api.get<DashboardKPIs>('/tenant/reports/dashboard');
export const getStockReport = () => api.get<Record<string, unknown>>('/tenant/reports/stock');

// Tenant Stock
export const getStockTransfers = () => api.get<StockTransfer[]>('/tenant/stock/transfers');
export const getStockByLocation = (locId: string | number) => api.get<Record<string, unknown>>(`/tenant/stock/by-location?locationId=${locId}`);

// Platform
export const getPlatformStats = () => api.get<PlatformStats>('/platform/stats');
export const getTenants = () => api.get<Tenant[]>('/platform/tenants');
export const getAuditLogs = () => api.get<AuditLog[]>('/platform/audit/logs');
