import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeDashboard } from "./screens/HomeDashboard";
import { ProductManagement } from "./screens/ProductManagement";
import { StockManagement } from "./screens/StockManagement";
import { PlatformDashboard } from "./screens/PlatformDashboard";
import { Navigate } from "react-router";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginScreen,
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