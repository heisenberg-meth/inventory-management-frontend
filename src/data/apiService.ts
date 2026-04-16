const BASE_URL = 'http://localhost:8080/api';

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export interface Product {
  id: number;
  name: string;
  sku?: string;
  batch_number: string;
  category_id?: number;
  category?: string;
  sale_price: number;
  purchase_price: number;
  stock: number;
  expiry_date: string;
  unit: string;
  reorder_level: number;
  status?: string;
  price?: string;
  batch?: string;
  expiry?: string;
  threshold?: number;
  max?: number;
  storage_location?: string;
  zone?: string;
  rack?: string;
  bin?: string;
  batchNumber?: string;
  expiryDate?: string;
  salePrice?: number;
  reorderLevel?: number;
  categoryId?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  scope?: string;
}

export interface Tenant {
  id: number;
  name: string;
  type: string;
  address?: string;
  gstin?: string;
  plan: string;
  companyCode: string;
  workspaceSlug: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  tenant?: Tenant;
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
  totalProducts: number;
  lowStockCount: number;
  totalRevenue: number;
  totalOrders: number;
  weeklySales: { day: string; sales: number }[];
  stockLevels: { category: string; level: number }[];
  recentSales: {
    id: string;
    total: number;
    status: string;
    paymentStatus: string;
  }[];
  recentActivity: {
    action: string;
    detail: string;
    time: string;
    color: string;
  }[];
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
  signupTrend: { month: string; signups: number }[];
  planDistribution: { name: string; value: number; color: string }[];
  supportTickets: {
    id: string;
    priority: 'High' | 'Medium' | 'Low';
    subject: string;
    tenant: string;
    time: string;
  }[];
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
  // Bypass ngrok interstitial warning page
  headers.set('ngrok-skip-browser-warning', 'true');
  
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
    let err = "API failed";
    try {
      err = await response.text();
    } catch {
      // ignore
    }
    console.error("API ERROR:", err);
    throw new Error(err);
  }

  const text = await response.text();
  
  if (!text) {
    return {} as T;
  }

  let parsedData;
  try {
    parsedData = JSON.parse(text);
  } catch {
    console.error("Failed to parse JSON. Response text:", text.substring(0, 200));
    throw new Error(`Invalid JSON from backend: ${text.substring(0, 50)}...`);
  }
  
  return parsedData as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'POST', data }),
  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'PUT', data }),
  delete: <T>(endpoint: string, options?: RequestOptions) => apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

// Auth
export const login = (credentials: Record<string, string>) => api.post<ApiResponse<null>>('/auth/login', credentials);
export const signup = (userData: Record<string, unknown>) => api.post<ApiResponse<null>>('/auth/signup', userData);
export const getProfile = () => api.get<ApiResponse<null>>('/auth/me');

// Tenant Products
export const getProducts = async (page = 0, size = 10): Promise<Product[]> => {
  const data = await api.get<PagedResponse<Product> | Product[]>(`/tenant/products?page=${page}&size=${size}`);
  const products = Array.isArray(data) ? data : data?.content;
  
  if (!products) return [];

  return (products as Product[]).map((p) => ({
    ...p,
    id: p.id,
    name: p.name,
    batch: p.batchNumber || p.batch_number,
    expiry: p.expiryDate || p.expiry_date,
    price: p.salePrice || p.sale_price ? `₹${(p.salePrice || p.sale_price).toLocaleString()}` : undefined,
    threshold: p.reorderLevel || p.reorder_level,
    max: 1000,
    status: p.status
  }));
};

export const createProduct = (data: unknown) => api.post<Product>('/tenant/products', data);
export const updateProduct = (id: number | string, data: unknown) => api.put<Product>(`/tenant/products/${id}`, data);
export const deleteProduct = (id: number | string) => api.delete(`/tenant/products/${id}`);

export const getLowStockProducts = async (): Promise<Product[]> => {
  const products = await getProducts(0, 500); 
  return products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');
};
export const getCategories = async (): Promise<Category[]> => {
  const data = await api.get<PagedResponse<Category> | Category[]>('/tenant/categories');
  const categories = Array.isArray(data) ? data : data?.content;
  return categories || [];
};
export const getBrands = () => Promise.resolve([]);

// Tenant Suppliers & Customers
export const getSuppliers = () => api.get<PagedResponse<Supplier> | Supplier[]>('/tenant/suppliers').then(res => Array.isArray(res) ? res : (res as PagedResponse<Supplier>).content || []);
export const getCustomers = () => api.get<PagedResponse<Customer> | Customer[]>('/tenant/customers').then(res => Array.isArray(res) ? res : (res as PagedResponse<Customer>).content || []);

// Tenant Orders & Invoices
export const getSalesOrders = () => api.get<PagedResponse<SalesOrder>>('/tenant/orders?type=sale').then(res => res.content || []);
export const getPurchaseOrders = () => api.get<PagedResponse<SalesOrder>>('/tenant/orders?type=purchase').then(res => res.content || []);
export const getInvoices = () => api.get<Invoice[]>('/tenant/invoices');
export const getPayments = () => api.get<Payment[]>('/tenant/payments');

// Tenant Reports & Dashboard
export const getDashboardStats = () => api.get<DashboardKPIs>('/tenant/reports/dashboard');
export const getStockReport = () => api.get<Record<string, unknown>>('/tenant/reports/stock');

// Tenant Stock
export const getStockTransfers = () => api.get<StockTransfer[]>('/tenant/stock/transfers');
export const getStockByLocation = (locId: string | number) => api.get<Record<string, unknown>>(`/tenant/stock/by-location?locationId=${locId}`);
export const getTenantAuditLogs = (page = 0, size = 10) => api.get<PagedResponse<unknown>>(`/tenant/audit?page=${page}&size=${size}`).then(res => res.content || []);

// Platform
export const getPlatformStats = async (): Promise<PlatformStats> => {
  return await api.get<PlatformStats>('/platform/stats');
};

export const getTenants = () => api.get<Tenant[]>('/platform/tenants');
export const createTenant = (data: unknown) => api.post<Tenant>('/platform/tenants', data);
export const getAuditLogs = () => api.get<AuditLog[]>('/platform/audit/logs');
