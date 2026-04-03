import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeDashboard } from "./screens/HomeDashboard";
import { ProductManagement } from "./screens/ProductManagement";
import { StockManagement } from "./screens/StockManagement";
import { PlatformDashboard } from "./screens/PlatformDashboard";

// New screens
import { Categories } from "./screens/Categories";
import { Brands } from "./screens/Brands";
import { Warehouses } from "./screens/Warehouses";
import { LowStockAlerts } from "./screens/LowStockAlerts";
import { PurchaseOrders } from "./screens/PurchaseOrders";
import { Suppliers } from "./screens/Suppliers";
import { Customers } from "./screens/Customers";
import { SalesOrders } from "./screens/SalesOrders";
import { ReportsDashboard } from "./screens/ReportsDashboard";
import { UsersRoles } from "./screens/UsersRoles";
import { Settings } from "./screens/Settings";
import { ActivityLog } from "./screens/ActivityLog";
import { Invoices } from "./screens/Invoices";
import { NotFound, AccessDenied } from "./screens/ErrorPages";
import { PaymentsReceived } from "./screens/PaymentsReceived";
import { Bills } from "./screens/Bills";
import { CompositeItems } from "./screens/CompositeItems";
import { AIDashboard } from "./screens/AIDashboard";
import { Analytics } from "./screens/Analytics";
import { PriceLists } from "./screens/PriceLists";
import { StockTransfers } from "./screens/StockTransfers";
import { Shipments } from "./screens/Shipments";
import { LandingPage } from "./screens/Landingpage";
import { PortalSelection } from "./screens/PortalSelection";

import { PlatformAdminLayout } from "./platform-admin/PlatformAdminLayout";
import { Subscriptions } from "./platform-admin/screens/Subscriptions";
import { GlobalDashboard } from "./platform-admin/screens/GlobalDashboard";
import { Tenants } from "./platform-admin/screens/Tenants";
import { TenantUsers } from "./platform-admin/screens/TenantUsers";
import { PlatformAdmins } from "./platform-admin/screens/PlatformAdmins";
import { Payments } from "./platform-admin/screens/Payments";
import { TenantProfile } from "./platform-admin/screens/TenantProfile";
import { PlaceholderScreen } from "./platform-admin/screens/PlaceholderScreen";
import { SupportTickets } from './platform-admin/screens/SupportTickets';
import { AuditLogs } from './platform-admin/screens/AuditLogs';
import { PlatformReports } from './platform-admin/screens/PlatformReports';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/portal",
    Component: PortalSelection,
  },
  {
    path: "/admin",
    Component: PlatformAdminLayout,
    children: [
      { index: true, element: <GlobalDashboard /> },
      { path: "dashboard", element: <GlobalDashboard /> },
      { path: "tenants", element: <Tenants /> },
      { path: "tenants/:id", element: <TenantProfile /> },
      { path: "tenant-users", element: <TenantUsers /> },
      { path: "platform-admins", element: <PlatformAdmins /> },
      { path: "payments", element: <Payments /> },
      { path: "subscriptions", element: <Subscriptions /> },
<<<<<<< HEAD
      { path: "audit-logs", element: <PlaceholderScreen section="AUDIT LOGS" title="System Traceability" description="Immutable audit trails for all root-level and cluster actions across the ecosystem." /> },
      { path: "reports", element: <PlaceholderScreen section="REPORTS" title="Data Analytics Hub" description="Generate cross-cluster reports and visualize global performance metrics." /> },
      { path: "support", element: <PlaceholderScreen section="SUPPORT" title="Global Support Tickets" description="Handle L2/L3 support escalations and communicate with tenant administrators." /> },
=======
      { path: "tenant-users", element: <PlaceholderScreen section="TENANT USERS" title="Global Identity Pool" description="Manage user identities across all provisioned clusters and monitor access patterns." /> },
      { path: "platform-admins", element: <PlaceholderScreen section="PLATFORM ADMINS" title="Super Admin Registry" description="Manage core platform administrators and define root-level access permissions." /> },
      { path: "payments", element: <PlaceholderScreen section="PAYMENTS" title="Financial Data Core" description="Transaction logs, payout orchestrations, and revenue leakage detection." /> },
      { path: "audit-logs", element: <AuditLogs /> },
      { path: "reports", element: <PlatformReports /> },
      { path: "support", element: <SupportTickets /> },
>>>>>>> 9fbab388d5f8311cc40bdec89afeb260b74d8f2a
    ],
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: HomeDashboard },

      // Products
      { path: "products", Component: ProductManagement },
      { path: "categories", Component: Categories },
      { path: "item-groups", element: <Brands /> },
      { path: "composite", Component: CompositeItems },
      { path: "price-lists", Component: PriceLists },

      // Inventory / Stock
      { path: "stock", Component: StockManagement },
      { path: "warehouses", Component: Warehouses },
      { path: "transfers", Component: StockTransfers },
      { path: "alerts", Component: LowStockAlerts },

      // Sales
      { path: "customers", Component: Customers },
      { path: "orders", Component: SalesOrders },
      { path: "shipments", Component: Shipments },
      { path: "invoices", Component: Invoices },
      { path: "payments", Component: PaymentsReceived },

      // Purchases
      { path: "suppliers", Component: Suppliers },
      { path: "purchase-orders", Component: PurchaseOrders },
      { path: "bills", Component: Bills },

      // Reports
      { path: "reports", Component: ReportsDashboard },
      { path: "activity", Component: ActivityLog },

      // Users & Settings
      { path: "users", Component: UsersRoles },
      { path: "settings", Component: Settings },

      // Platform
      { path: "platform", Component: PlatformDashboard },
      { path: "ai", Component: AIDashboard },
      { path: "analytics", Component: Analytics },

      // Error pages
      { path: "access-denied", Component: AccessDenied },

      // Catch-all
      { path: "*", Component: NotFound },
    ],
  },
]);