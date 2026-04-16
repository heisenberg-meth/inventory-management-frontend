import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { PlatformAdminLayout } from "./platform-admin/PlatformAdminLayout";
import { PageLoader } from "./components/PageLoader";
import * as Screens from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Screens.LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Screens.LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/platform/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Screens.LoginScreen />
      </Suspense>
    ),
    loader: () => {
      const url = new URL(window.location.href);
      if (url.searchParams.get('role') !== 'platform-admin') {
        url.searchParams.set('role', 'platform-admin');
        window.history.replaceState({}, '', url.pathname + url.search);
      }
      return null;
    }
  },
  {
    path: "/portal",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Screens.PortalSelection />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    Component: PlatformAdminLayout,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.GlobalDashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.GlobalDashboard />
          </Suspense>
        ),
      },
      {
        path: "tenants",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Tenants />
          </Suspense>
        ),
      },
      {
        path: "tenants/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.TenantProfile />
          </Suspense>
        ),
      },
      {
        path: "tenant-users",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.TenantUsers />
          </Suspense>
        ),
      },
      {
        path: "platform-admins",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PlatformAdmins />
          </Suspense>
        ),
      },
      {
        path: "payments",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Payments />
          </Suspense>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Subscriptions />
          </Suspense>
        ),
      },
      {
        path: "audit-logs",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.AuditLogs />
          </Suspense>
        ),
      },
      {
        path: "reports",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PlatformReports />
          </Suspense>
        ),
      },
      {
        path: "support",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.SupportTickets />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.HomeDashboard />
          </Suspense>
        ),
      },

      // Products
      {
        path: "products",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.ProductManagement />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Categories />
          </Suspense>
        ),
      },
      {
        path: "item-groups",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Brands />
          </Suspense>
        ),
      },
      {
        path: "composite",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.CompositeItems />
          </Suspense>
        ),
      },
      {
        path: "price-lists",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PriceLists />
          </Suspense>
        ),
      },

      // Inventory / Stock
      {
        path: "stock",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.StockManagement />
          </Suspense>
        ),
      },
      {
        path: "warehouses",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Warehouses />
          </Suspense>
        ),
      },
      {
        path: "transfers",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.StockTransfers />
          </Suspense>
        ),
      },
      {
        path: "alerts",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.LowStockAlerts />
          </Suspense>
        ),
      },

      // Sales
      {
        path: "customers",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Customers />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.SalesOrders />
          </Suspense>
        ),
      },
      {
        path: "shipments",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Shipments />
          </Suspense>
        ),
      },
      {
        path: "invoices",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Invoices />
          </Suspense>
        ),
      },
      {
        path: "payments",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PaymentsReceived />
          </Suspense>
        ),
      },

      // Purchases
      {
        path: "suppliers",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Suppliers />
          </Suspense>
        ),
      },
      {
        path: "purchase-orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PurchaseOrders />
          </Suspense>
        ),
      },
      {
        path: "bills",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Bills />
          </Suspense>
        ),
      },

      // Reports
      {
        path: "reports",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.ReportsDashboard />
          </Suspense>
        ),
      },
      {
        path: "activity",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.ActivityLog />
          </Suspense>
        ),
      },

      // Users & Settings
      {
        path: "users",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.UsersRoles />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Settings />
          </Suspense>
        ),
      },

      // Platform
      {
        path: "platform",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.PlatformDashboard />
          </Suspense>
        ),
      },
      {
        path: "ai",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.AIDashboard />
          </Suspense>
        ),
      },
      {
        path: "analytics",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.Analytics />
          </Suspense>
        ),
      },

      // Error pages
      {
        path: "access-denied",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.AccessDenied />
          </Suspense>
        ),
      },

      // Catch-all
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Screens.NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
