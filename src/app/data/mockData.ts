// ─── SHARED MOCK DATA ─────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 1, name: 'Pain Relief', productCount: 24, description: 'Analgesics and pain management', status: 'Active' },
  { id: 2, name: 'Antibiotics', productCount: 18, description: 'Antimicrobial agents', status: 'Active' },
  { id: 3, name: 'Antihistamine', productCount: 9, description: 'Allergy medications', status: 'Active' },
  { id: 4, name: 'Diabetes', productCount: 15, description: 'Blood sugar management', status: 'Active' },
  { id: 5, name: 'Cholesterol', productCount: 11, description: 'Lipid-lowering medications', status: 'Active' },
  { id: 6, name: 'Gastric', productCount: 13, description: 'Digestive health products', status: 'Active' },
  { id: 7, name: 'Supplements', productCount: 22, description: 'Vitamins and nutritional supplements', status: 'Active' },
  { id: 8, name: 'Cardiac', productCount: 8, description: 'Heart medications', status: 'Inactive' },
];

export const BRANDS = [
  { id: 1, name: 'PharmaCo', productCount: 45, country: 'India', status: 'Active' },
  { id: 2, name: 'MedLife', productCount: 32, country: 'USA', status: 'Active' },
  { id: 3, name: 'HealthCare Plus', productCount: 28, country: 'Germany', status: 'Active' },
  { id: 4, name: 'BioSynth', productCount: 19, country: 'India', status: 'Active' },
  { id: 5, name: 'GlobalMed', productCount: 14, country: 'UK', status: 'Inactive' },
];

export const WAREHOUSES = [
  { id: 1, name: 'Main Warehouse', location: 'Mumbai, MH', capacity: 10000, used: 6800, manager: 'Raj Kumar', status: 'Active', type: 'Primary' },
  { id: 2, name: 'Branch A - Pune', location: 'Pune, MH', capacity: 5000, used: 3200, manager: 'Priya Shah', status: 'Active', type: 'Secondary' },
  { id: 3, name: 'Branch B - Delhi', location: 'Delhi, DL', capacity: 7500, used: 4100, manager: 'Amit Singh', status: 'Active', type: 'Secondary' },
  { id: 4, name: 'Cold Storage', location: 'Mumbai, MH', capacity: 2000, used: 1450, manager: 'Sara Patel', status: 'Active', type: 'Specialized' },
];

export const SUPPLIERS = [
  { id: 1, name: 'PharmaDist India Pvt Ltd', contact: 'Ramesh Gupta', email: 'ramesh@pharmadist.in', phone: '+91 98765 43210', address: '123, MIDC, Andheri, Mumbai', category: 'Medicines', status: 'Active', outstanding: 245000, totalOrders: 48 },
  { id: 2, name: 'MedSupply Corp', contact: 'John David', email: 'john@medsupply.com', phone: '+91 87654 32109', address: '456, Industrial Area, Pune', category: 'Medicines', status: 'Active', outstanding: 120000, totalOrders: 32 },
  { id: 3, name: 'HealthEquip Solutions', contact: 'Anjali Mehta', email: 'anjali@healthequip.in', phone: '+91 76543 21098', address: '789, Okhla, Delhi', category: 'Equipment', status: 'Active', outstanding: 0, totalOrders: 12 },
  { id: 4, name: 'BioChemicals Ltd', contact: 'Kumar Rajan', email: 'kumar@biochem.in', phone: '+91 65432 10987', address: '321, GIDC, Ahmedabad', category: 'Chemicals', status: 'Inactive', outstanding: 0, totalOrders: 5 },
];

export const CUSTOMERS = [
  { id: 1, name: 'City Hospital', contact: 'Dr. Sharma', email: 'procurement@cityhospital.in', phone: '+91 22 1234 5678', type: 'Hospital', outstanding: 48000, totalOrders: 124, status: 'Active' },
  { id: 2, name: 'MedPlus Retail', contact: 'Sunita Rao', email: 'orders@medplus.in', phone: '+91 20 2345 6789', type: 'Retail', outstanding: 22000, totalOrders: 76, status: 'Active' },
  { id: 3, name: 'Apollo Pharmacy', contact: 'Vikram Nair', email: 'vikram@apollo.in', phone: '+91 11 3456 7890', type: 'Pharmacy', outstanding: 0, totalOrders: 45, status: 'Active' },
  { id: 4, name: 'Rural Health Clinic', contact: 'Dr. Patel', email: 'rhc@clinic.in', phone: '+91 79 4567 8901', type: 'Clinic', outstanding: 8500, totalOrders: 23, status: 'Active' },
];

export const PURCHASE_ORDERS = [
  { id: 'PO-2024-001', supplier: 'PharmaDist India Pvt Ltd', date: '2024-03-20', expectedDelivery: '2024-03-27', items: 8, total: 124500, status: 'Delivered' },
  { id: 'PO-2024-002', supplier: 'MedSupply Corp', date: '2024-03-18', expectedDelivery: '2024-03-25', items: 5, total: 89000, status: 'In Transit' },
  { id: 'PO-2024-003', supplier: 'BioChemicals Ltd', date: '2024-03-15', expectedDelivery: '2024-03-22', items: 3, total: 45600, status: 'Pending' },
  { id: 'PO-2024-004', supplier: 'HealthEquip Solutions', date: '2024-03-12', expectedDelivery: '2024-03-19', items: 2, total: 180000, status: 'Delivered' },
  { id: 'PO-2024-005', supplier: 'PharmaDist India Pvt Ltd', date: '2024-03-10', expectedDelivery: '2024-03-17', items: 12, total: 267000, status: 'Cancelled' },
];

export const SALES_ORDERS = [
  { id: 'SO-2024-001', customer: 'City Hospital', date: '2024-03-21', items: 12, total: 48200, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'SO-2024-002', customer: 'MedPlus Retail', date: '2024-03-21', items: 5, total: 22100, status: 'Processing', paymentStatus: 'Pending' },
  { id: 'SO-2024-003', customer: 'Apollo Pharmacy', date: '2024-03-20', items: 8, total: 15600, status: 'Shipped', paymentStatus: 'Paid' },
  { id: 'SO-2024-004', customer: 'Rural Health Clinic', date: '2024-03-20', items: 3, total: 8900, status: 'Pending', paymentStatus: 'Pending' },
  { id: 'SO-2024-005', customer: 'City Hospital', date: '2024-03-19', items: 18, total: 89500, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'SO-2024-006', customer: 'MedPlus Retail', date: '2024-03-18', items: 4, total: 12300, status: 'Cancelled', paymentStatus: 'Refunded' },
];

export const USERS = [
  { id: 1, name: 'John Doe', email: 'john@pharmacy.in', role: 'Admin', status: 'Active', lastLogin: '2024-03-21 09:45', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@pharmacy.in', role: 'Manager', status: 'Active', lastLogin: '2024-03-21 08:30', avatar: 'JS' },
  { id: 3, name: 'Bob Wilson', email: 'bob@pharmacy.in', role: 'Staff', status: 'Active', lastLogin: '2024-03-20 17:00', avatar: 'BW' },
  { id: 4, name: 'Priya Kumar', email: 'priya@pharmacy.in', role: 'Manager', status: 'Inactive', lastLogin: '2024-03-15 11:20', avatar: 'PK' },
  { id: 5, name: 'Raj Shah', email: 'raj@pharmacy.in', role: 'Staff', status: 'Active', lastLogin: '2024-03-21 10:00', avatar: 'RS' },
];

export const ROLES = [
  { id: 1, name: 'Admin', description: 'Full system access', userCount: 1, color: '#ef4444' },
  { id: 2, name: 'Manager', description: 'Manage inventory, orders, reports', userCount: 2, color: '#f59e0b' },
  { id: 3, name: 'Staff', description: 'View and basic operations', userCount: 2, color: '#38bdf8' },
  { id: 4, name: 'Viewer', description: 'Read-only access', userCount: 0, color: '#8b5cf6' },
];

export const PERMISSIONS = [
  'View Products', 'Add Products', 'Edit Products', 'Delete Products',
  'View Orders', 'Create Orders', 'Edit Orders', 'Cancel Orders',
  'View Reports', 'Export Reports',
  'Manage Users', 'Manage Roles',
  'View Inventory', 'Adjust Stock', 'Transfer Stock',
  'View Suppliers', 'Manage Suppliers',
  'View Customers', 'Manage Customers',
  'View Settings', 'Edit Settings',
];

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  Admin: PERMISSIONS,
  Manager: ['View Products', 'Add Products', 'Edit Products', 'View Orders', 'Create Orders', 'Edit Orders', 'View Reports', 'Export Reports', 'View Inventory', 'Adjust Stock', 'Transfer Stock', 'View Suppliers', 'View Customers', 'Manage Customers'],
  Staff: ['View Products', 'View Orders', 'View Inventory', 'View Suppliers', 'View Customers'],
  Viewer: ['View Products', 'View Orders', 'View Reports', 'View Inventory'],
};

export const LOW_STOCK_ITEMS = [
  { id: 1, name: 'Amoxicillin 250mg', sku: 'BTH-2024-002', category: 'Antibiotics', stock: 89, reorderLevel: 100, max: 500, unit: 'Strip', supplier: 'PharmaDist India Pvt Ltd', severity: 'warning' },
  { id: 2, name: 'Atorvastatin 20mg', sku: 'BTH-2024-006', category: 'Cholesterol', stock: 42, reorderLevel: 40, max: 400, unit: 'Strip', supplier: 'MedSupply Corp', severity: 'critical' },
  { id: 3, name: 'Ibuprofen 400mg', sku: 'BTH-2024-003', category: 'Pain Relief', stock: 0, reorderLevel: 80, max: 800, unit: 'Strip', supplier: 'PharmaDist India Pvt Ltd', severity: 'critical' },
  { id: 4, name: 'Aspirin 75mg', sku: 'BTH-2024-009', category: 'Cardiac', stock: 55, reorderLevel: 60, max: 600, unit: 'Strip', supplier: 'BioChemicals Ltd', severity: 'warning' },
  { id: 5, name: 'Losartan 50mg', sku: 'BTH-2024-010', category: 'Cardiac', stock: 67, reorderLevel: 100, max: 500, unit: 'Strip', supplier: 'MedSupply Corp', severity: 'warning' },
];

export const ACTIVITY_LOGS = [
  { id: 1, user: 'John Doe', action: 'Added new product', target: 'Pantoprazole 40mg', time: '2024-03-21 10:32', type: 'create', ip: '192.168.1.1' },
  { id: 2, user: 'Jane Smith', action: 'Created purchase order', target: 'PO-2024-006', time: '2024-03-21 09:58', type: 'create', ip: '192.168.1.2' },
  { id: 3, user: 'Bob Wilson', action: 'Updated stock adjustment', target: 'Paracetamol 500mg', time: '2024-03-21 09:30', type: 'update', ip: '192.168.1.3' },
  { id: 4, user: 'John Doe', action: 'Deleted customer', target: 'Old Clinic', time: '2024-03-21 09:00', type: 'delete', ip: '192.168.1.1' },
  { id: 5, user: 'Jane Smith', action: 'Exported sales report', target: 'March 2024 Sales', time: '2024-03-20 17:45', type: 'export', ip: '192.168.1.2' },
  { id: 6, user: 'Raj Shah', action: 'Logged in', target: 'System', time: '2024-03-20 09:00', type: 'auth', ip: '192.168.1.5' },
];
