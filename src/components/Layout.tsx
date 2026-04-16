import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { 
  Search, Bell, Sun, Moon, Menu, X, LogOut,
  ChevronDown, ChevronRight,
  Home, Package, Grid3x3, ShoppingBag, ShoppingCart, BarChart3, Settings,
  Building, Bell as BellIcon, CreditCard, Globe
} from 'lucide-react';
import { Suspense } from 'react';
import { PageLoader } from './PageLoader';
import { useAuth } from '../context/AuthContext';
import { getProducts, getSalesOrders } from '../data/apiService';

interface AppNotification {
  id: string;
  text: string;
  type: 'warning' | 'info' | 'danger';
}

interface NavItem {
  icon?: React.ElementType; // Optional icon for sub-items
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, tenant, logout } = useAuth();
  
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('ims-theme');
    return saved !== null ? saved === 'dark' : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifs: AppNotification[] = [];
      try {
        const allProducts = await getProducts(0, 500);
        const now = new Date();
        const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        // Products expiring within 30 days
        const expiring = allProducts.filter(p => {
          const exp = p.expiry || p.expiry_date || '';
          if (!exp) return false;
          const d = new Date(exp);
          return d >= now && d <= in30;
        });
        if (expiring.length > 0) {
          notifs.push({
            id: 'expiry',
            text: `${expiring.length} product${expiring.length > 1 ? 's' : ''} expiring within 30 days`,
            type: 'warning',
          });
        }

        // Low stock / out of stock items
        const lowStock = allProducts.filter(
          p => p.status === 'Low Stock' || p.status === 'Out of Stock'
        );
        lowStock.slice(0, 5).forEach(p => {
          notifs.push({ id: `low-${p.id}`, text: `Low stock: ${p.name}`, type: 'danger' });
        });

        // Recent orders
        const orders = await getSalesOrders();
        orders.slice(0, 3).forEach(o => {
          notifs.push({ id: `order-${o.id}`, text: `New order ${o.id} received`, type: 'info' });
        });
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
      setNotifications(notifs);
    };
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  // Apply theme class to document
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    localStorage.setItem('ims-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const navSections: NavSection[] = [
    {
      title: 'Home',
      icon: Home,
      items: [
        { label: 'Dashboard', path: '/app' },
        { label: 'AI Dashboard', path: '/app/ai' },
        { label: 'Analytics', path: '/app/analytics' },
      ]
    },
    {
      title: 'Inventory',
      icon: Package,
      items: [
        { label: 'Products', path: '/app/products' },
        { label: 'Stock Adjustments', path: '/app/stock' },
        { label: 'Warehouses', path: '/app/warehouses' },
        { label: 'Shipments', path: '/app/shipments' },
        { label: 'Stock Transfers', path: '/app/transfers' },
        { label: 'Low Stock Alerts', path: '/app/alerts', badge: '23', badgeColor: 'bg-[var(--color-danger)]' },
      ]
    },
    {
      title: 'Items',
      icon: Grid3x3,
      items: [
        { label: 'Item Groups', path: '/app/item-groups' },
        { label: 'Composite Items', path: '/app/composite' },
        { label: 'Price Lists', path: '/app/price-lists' },
        { label: 'Product List', path: '/app/products' },
        { label: 'Categories', path: '/app/categories' },
      ]
    },
    {
      title: 'Sales',
      icon: ShoppingBag,
      items: [
        { label: 'Customers', path: '/app/customers' },
        { label: 'Sales Orders', path: '/app/orders' },
        { label: 'Invoices', path: '/app/invoices' },
        { label: 'Payments Received', path: '/app/payments' },
      ]
    },
    {
      title: 'Purchases',
      icon: ShoppingCart,
      items: [
        { label: 'Suppliers', path: '/app/suppliers' },
        { label: 'Purchase Orders', path: '/app/purchase-orders' },
        { label: 'Bills', path: '/app/bills' },
      ]
    },
    {
      title: 'Reports',
      icon: BarChart3,
      items: [
        { label: 'Activity Log', path: '/app/activity' },
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      items: [
        { label: 'User Roles', path: '/app/users' },
        { label: 'Settings', path: '/app/settings' },
      ]
    },
  ];

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    const currentSection = navSections.find(section =>
      section.items.some(item => isActive(item.path))
    );
    if (currentSection && currentSection.title !== expandedSection) {
      setExpandedSection(currentSection.title);
    }
  }

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-primary-bg)]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Overlay */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setNotifOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[228px] bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)] 
        flex flex-col transition-transform duration-300 ease-in-out flex-shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors"
        >
          <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </button>

        {/* Logo */}
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-mint)] flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[var(--color-text-primary)] text-sm font-semibold">
                Inventory
              </div>
              <div className="text-[var(--color-text-secondary)] text-xs">
                Management
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-[var(--color-border)]">
          {navSections.map((section, idx) => {
            const isExpanded = expandedSection === section.title;
            const ParentIcon = section.icon;
            const hasActiveChild = section.items.some((item) =>
              isActive(item.path),
            );

            return (
              <div key={idx} className="mb-1">
                {/* Parent Menu Item */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                    ${
                      hasActiveChild && !isExpanded
                        ? "text-[var(--color-mint)] font-medium"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                    }
                  `}
                >
                  <ParentIcon
                    className={`w-4 h-4 flex-shrink-0 ${hasActiveChild ? "text-[var(--color-mint)]" : ""}`}
                  />
                  <span className="flex-1 text-left font-medium">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Submenu Items */}
                <div
                  className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                  <div className="space-y-0.5 py-1">
                    {section.items.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setSidebarOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 pl-11 pr-4 py-2 text-[13px] transition-all
                            ${
                              active
                                ? "text-[var(--color-mint)] font-medium bg-[var(--color-mint)]/5 rounded-r-full"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]/50"
                            }
                          `}
                        >
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`${item.badgeColor} text-white text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {active && (
                            <div className="w-1 h-1 rounded-full bg-[var(--color-mint)] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-mint)] flex items-center justify-center text-white font-semibold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                {user?.name || 'Loading...'}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] truncate">
                {user?.role || 'User'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-[var(--color-card-bg)] border-b border-[var(--color-border)] px-4 lg:px-6 flex items-center justify-between flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors"
          >
            <Menu className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Tenant Switcher */}
            <div className="hidden sm:flex items-center gap-2 bg-[var(--color-surface-secondary)] px-3 py-1.5 rounded-full border border-[var(--color-border)]">
              <span className="text-xs sm:text-sm text-[var(--color-text-primary)]">
                {tenant?.name || 'No Business'}
              </span>
              <span className="px-2 py-0.5 bg-[var(--color-danger)] text-white text-xs rounded-full">
                {tenant?.plan || 'production'}
              </span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors"
              >
                <Bell className="w-5 h-5 text-[var(--color-text-secondary)]" />
                {notifications.length > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[var(--color-danger)] rounded-full flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold px-0.5">{notifications.length}</span>
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl z-50">
                  <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      Notifications
                    </span>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs text-[var(--color-mint)] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-[var(--color-border)] max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-[var(--color-text-muted)]">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-4 hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                n.type === 'warning'
                                  ? 'bg-[var(--color-warning)]'
                                  : n.type === 'danger'
                                    ? 'bg-[var(--color-danger)]'
                                    : 'bg-[var(--color-info)]'
                              }`}
                            />
                            <p className="text-sm text-[var(--color-text-primary)]">{n.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <button
                      onClick={() => {
                        setNotifOpen(false);
                        navigate("/app/alerts");
                      }}
                      className="text-sm text-[var(--color-mint)] hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="hidden sm:flex p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[var(--color-text-secondary)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--color-text-secondary)]" />
              )}
            </button>

            {/* User Avatar + Profile Dropdown */}
            <div ref={profileRef} style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setProfileOpen((p) => !p);
                  setNotifOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: profileOpen
                    ? "rgba(29,185,122,0.10)"
                    : "transparent",
                  border:
                    "1px solid " +
                    (profileOpen ? "rgba(29,185,122,0.25)" : "transparent"),
                  borderRadius: 10,
                  padding: "4px 10px 4px 4px",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1db97a, #0d6e5a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  {getInitials(user?.name)}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    display: "none",
                  }}
                  className="sm:inline"
                >
                  {user?.name || 'Loading...'}
                </span>
                <ChevronDown
                  size={13}
                  color="var(--color-text-muted)"
                  style={{
                    transition: "transform 150ms",
                    transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: 48,
                    right: 0,
                    width: 280,
                    background: "var(--color-card-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.20)",
                    zIndex: 1000,
                    overflow: "hidden",
                    animation: "profileDropIn 180ms ease-out",
                  }}
                >
                  <style>{`
                    @keyframes profileDropIn {
                      from { opacity: 0; transform: translateY(-8px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>

                  {/* User Card */}
                  <div
                    style={{
                      padding: "18px 18px 14px",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          background:
                            "linear-gradient(135deg, #1db97a, #0d6e5a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        {getInitials(user?.name)}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {user?.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "white",
                              background: "#ef4444",
                              padding: "2px 8px",
                              borderRadius: 20,
                            }}
                          >
                            ⊙ {user?.role}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--color-text-muted)",
                            marginTop: 3,
                          }}
                        >
                          {user?.email}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--color-text-secondary)",
                            marginTop: 2,
                          }}
                        >
                          {tenant?.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: 8 }}>
                    {[
                      {
                        icon: Settings,
                        label: "General Settings",
                        action: () => {
                          setProfileOpen(false);
                          navigate("/app/settings");
                        },
                        chevron: true,
                      },
                      {
                        icon: Building,
                        label: "Company Profile",
                        action: () => {
                          setProfileOpen(false);
                          navigate("/app/settings");
                        },
                        chevron: true,
                      },
                      {
                        icon: BellIcon,
                        label: "Notifications",
                        action: () => {
                          setProfileOpen(false);
                          navigate("/app/settings");
                        },
                        chevron: true,
                      },
                      {
                        icon: CreditCard,
                        label: "Subscriptions",
                        action: () => {
                          setProfileOpen(false);
                          navigate("/app/settings");
                        },
                        chevron: true,
                      },
                    ].map(({ icon: Icon, label, action, chevron }) => (
                      <button
                        key={label}
                        onClick={action}
                        style={{
                          width: "100%",
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "0 12px",
                          borderRadius: 8,
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          color: "var(--color-text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "var(--color-surface-secondary)";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--color-text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--color-text-secondary)";
                        }}
                      >
                        <Icon size={16} />
                        <span
                          style={{ fontSize: 13, fontWeight: 500, flex: 1 }}
                        >
                          {label}
                        </span>
                        {chevron && <ChevronRight size={12} />}
                      </button>
                    ))}

                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background: "var(--color-border)",
                        margin: "4px 0",
                      }}
                    />

                    {/* Dark Mode toggle */}
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "0 12px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {isDark ? <Moon size={16} /> : <Sun size={16} />}
                      <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                        Dark Mode
                      </span>
                      <button
                        onClick={() => setIsDark((p) => !p)}
                        style={{
                          width: 44,
                          height: 24,
                          borderRadius: 12,
                          background: isDark
                            ? "var(--color-mint)"
                            : "var(--color-surface-secondary)",
                          border: "none",
                          cursor: "pointer",
                          position: "relative",
                          transition: "background 200ms",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: isDark
                              ? "white"
                              : "var(--color-text-secondary)",
                            position: "absolute",
                            top: 2,
                            left: isDark ? 22 : 2,
                            transition: "left 200ms ease",
                          }}
                        />
                      </button>
                    </div>

                    {/* Language */}
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "0 12px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <Globe size={16} />
                      <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                        Language
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--color-text-muted)",
                        }}
                      >
                        English
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background: "var(--color-border)",
                        margin: "4px 0",
                      }}
                    />

                    {/* Sign Out */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "0 12px",
                        borderRadius: 8,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(239,68,68,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                    >
                      <LogOut size={16} color="#ef4444" />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#ef4444",
                        }}
                      >
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-primary-bg)]">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
