import { lazy } from "react";

// Lazy-loaded common screens
export const LandingPage = lazy(() => import("./screens/Landingpage").then(m => ({ default: m.LandingPage })));
export const LoginScreen = lazy(() => import("./screens/LoginScreen").then(m => ({ default: m.LoginScreen })));
export const PortalSelection = lazy(() => import("./screens/PortalSelection").then(m => ({ default: m.PortalSelection })));

// Lazy-loaded Tenant screens
export const HomeDashboard = lazy(() => import("./screens/HomeDashboard").then(m => ({ default: m.HomeDashboard })));
export const AIDashboard = lazy(() => import("./screens/AIDashboard").then(m => ({ default: m.AIDashboard })));
export const Analytics = lazy(() => import("./screens/Analytics").then(m => ({ default: m.Analytics })));
export const ProductManagement = lazy(() => import("./screens/ProductManagement").then(m => ({ default: m.ProductManagement })));
export const Categories = lazy(() => import("./screens/Categories").then(m => ({ default: m.Categories })));
export const Brands = lazy(() => import("./screens/Brands").then(m => ({ default: m.Brands })));
export const CompositeItems = lazy(() => import("./screens/CompositeItems").then(m => ({ default: m.CompositeItems })));
export const PriceLists = lazy(() => import("./screens/PriceLists").then(m => ({ default: m.PriceLists })));
export const StockManagement = lazy(() => import("./screens/StockManagement").then(m => ({ default: m.StockManagement })));
export const Warehouses = lazy(() => import("./screens/Warehouses").then(m => ({ default: m.Warehouses })));
export const StockTransfers = lazy(() => import("./screens/StockTransfers").then(m => ({ default: m.StockTransfers })));
export const LowStockAlerts = lazy(() => import("./screens/LowStockAlerts").then(m => ({ default: m.LowStockAlerts })));
export const Shipments = lazy(() => import("./screens/Shipments").then(m => ({ default: m.Shipments })));
export const Customers = lazy(() => import("./screens/Customers").then(m => ({ default: m.Customers })));
export const SalesOrders = lazy(() => import("./screens/SalesOrders").then(m => ({ default: m.SalesOrders })));
export const Invoices = lazy(() => import("./screens/Invoices").then(m => ({ default: m.Invoices })));
export const PaymentsReceived = lazy(() => import("./screens/PaymentsReceived").then(m => ({ default: m.PaymentsReceived })));
export const Suppliers = lazy(() => import("./screens/Suppliers").then(m => ({ default: m.Suppliers })));
export const PurchaseOrders = lazy(() => import("./screens/PurchaseOrders").then(m => ({ default: m.PurchaseOrders })));
export const Bills = lazy(() => import("./screens/Bills").then(m => ({ default: m.Bills })));
export const ReportsDashboard = lazy(() => import("./screens/ReportsDashboard").then(m => ({ default: m.ReportsDashboard })));
export const ActivityLog = lazy(() => import("./screens/ActivityLog").then(m => ({ default: m.ActivityLog })));
export const UsersRoles = lazy(() => import("./screens/UsersRoles").then(m => ({ default: m.UsersRoles })));
export const Settings = lazy(() => import("./screens/Settings").then(m => ({ default: m.Settings })));
export const PlatformDashboard = lazy(() => import("./screens/PlatformDashboard").then(m => ({ default: m.PlatformDashboard })));
export const NotFound = lazy(() => import("./screens/ErrorPages").then(m => ({ default: m.NotFound })));
export const AccessDenied = lazy(() => import("./screens/ErrorPages").then(m => ({ default: m.AccessDenied })));

// Lazy-loaded Platform Admin screens
export const GlobalDashboard = lazy(() => import("./platform-admin/screens/GlobalDashboard").then(m => ({ default: m.GlobalDashboard })));
export const Tenants = lazy(() => import("./platform-admin/screens/Tenants").then(m => ({ default: m.Tenants })));
export const TenantProfile = lazy(() => import("./platform-admin/screens/TenantProfile").then(m => ({ default: m.TenantProfile })));
export const TenantUsers = lazy(() => import("./platform-admin/screens/TenantUsers").then(m => ({ default: m.TenantUsers })));
export const PlatformAdmins = lazy(() => import("./platform-admin/screens/PlatformAdmins").then(m => ({ default: m.PlatformAdmins })));
export const Payments = lazy(() => import("./platform-admin/screens/Payments").then(m => ({ default: m.Payments })));
export const Subscriptions = lazy(() => import("./platform-admin/screens/Subscriptions").then(m => ({ default: m.Subscriptions })));
export const AuditLogs = lazy(() => import("./platform-admin/screens/AuditLogs").then(m => ({ default: m.AuditLogs })));
export const PlatformReports = lazy(() => import("./platform-admin/screens/PlatformReports").then(m => ({ default: m.PlatformReports })));
export const SupportTickets = lazy(() => import("./platform-admin/screens/SupportTickets").then(m => ({ default: m.SupportTickets })));