import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { 
  Home, BarChart3, Brain, TrendingUp, Package, Grid3x3, Layers, 
  PackagePlus, DollarSign, Sliders, Warehouse, ArrowLeftRight, 
  AlertTriangle, Users, ShoppingCart, Truck, FileText, Receipt,
  Users2, ShoppingBag, File, Activity, UserCog, Settings,
  Search, Bell, Sun, Moon, Menu, X, LogOut
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('ims-theme');
    return saved !== null ? saved === 'dark' : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

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
      title: 'HOME',
      items: [
        { icon: Home, label: 'Overview', path: '/app' },
        { icon: Brain, label: 'AI Dashboard', path: '/app/ai' },
        { icon: TrendingUp, label: 'Analytics', path: '/app/analytics' },
      ]
    },
    {
      title: 'INVENTORY',
      items: [
        { icon: Package, label: 'Products', path: '/app/products' },
        { icon: Grid3x3, label: 'Categories', path: '/app/categories' },
        { icon: Layers, label: 'Item Groups', path: '/app/item-groups' },
        { icon: PackagePlus, label: 'Composite Items', path: '/app/composite' },
        { icon: DollarSign, label: 'Price Lists', path: '/app/price-lists' },
        { icon: Sliders, label: 'Stock Adjustments', path: '/app/stock' },
        { icon: Warehouse, label: 'Warehouses', path: '/app/warehouses' },
        { icon: ArrowLeftRight, label: 'Stock Transfers', path: '/app/transfers' },
        { icon: AlertTriangle, label: 'Low Stock Alerts', path: '/app/alerts', badge: '23', badgeColor: 'bg-[var(--color-danger)]' },
      ]
    },
    {
      title: 'SALES',
      items: [
        { icon: Users, label: 'Customers', path: '/app/customers' },
        { icon: ShoppingCart, label: 'Sales Orders', path: '/app/orders' },
        { icon: Truck, label: 'Shipments', path: '/app/shipments' },
        { icon: FileText, label: 'Invoices', path: '/app/invoices' },
        { icon: Receipt, label: 'Payments Received', path: '/app/payments' },
      ]
    },
    {
      title: 'PURCHASES',
      items: [
        { icon: Users2, label: 'Suppliers', path: '/app/suppliers' },
        { icon: ShoppingBag, label: 'Purchase Orders', path: '/app/purchase-orders' },
        { icon: File, label: 'Bills', path: '/app/bills' },
      ]
    },
    {
      title: 'REPORTS',
      items: [
        { icon: BarChart3, label: 'Reports', path: '/app/reports' },
        { icon: Activity, label: 'Activity Log', path: '/app/activity' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: UserCog, label: 'Users & Roles', path: '/app/users' },
        { icon: Settings, label: 'Settings', path: '/app/settings' },
      ]
    },
  ];

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  const notifications = [
    { id: 1, text: '7 products expiring within 30 days', time: '5m ago', type: 'warning' },
    { id: 2, text: 'New order ORD-1285 received', time: '12m ago', type: 'info' },
    { id: 3, text: 'Low stock: Amoxicillin 250mg', time: '25m ago', type: 'danger' },
  ];

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
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[228px] bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)] 
        flex flex-col transition-transform duration-300 ease-in-out flex-shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
              <div className="text-[var(--color-text-primary)] text-sm font-semibold">Inventory</div>
              <div className="text-[var(--color-text-secondary)] text-xs">Management</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {navSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-4 mb-2 text-[10px] font-semibold tracking-widest text-[var(--color-text-muted)] uppercase">
                {section.title}
              </div>
              <div className="space-y-1 px-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                        ${active 
                          ? 'bg-[var(--color-mint)] text-white' 
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
                      {item.badge && !active && (
                        <span className={`${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-mint)] flex items-center justify-center text-white font-semibold flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">John Doe</div>
              <div className="text-xs text-[var(--color-text-secondary)] truncate">Tenant Admin</div>
            </div>
            <button
              onClick={() => navigate('/login')}
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
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Tenant Switcher */}
            <div className="hidden sm:flex items-center gap-2 bg-[var(--color-surface-secondary)] px-3 py-1.5 rounded-full border border-[var(--color-border)]">
              <span className="text-xs sm:text-sm text-[var(--color-text-primary)]">Pharmacy Inc</span>
              <span className="px-2 py-0.5 bg-[var(--color-danger)] text-white text-xs rounded-full">
                production
              </span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors"
              >
                <Bell className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
              </button>

              {/* Notifications Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl z-50">
                  <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                    <span className="font-semibold text-[var(--color-text-primary)]">Notifications</span>
                    <span className="text-xs text-[var(--color-mint)] cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-[var(--color-border)]">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            n.type === 'warning' ? 'bg-[var(--color-warning)]' :
                            n.type === 'danger' ? 'bg-[var(--color-danger)]' :
                            'bg-[var(--color-info)]'
                          }`} />
                          <div>
                            <p className="text-sm text-[var(--color-text-primary)]">{n.text}</p>
                            <p className="text-xs text-[var(--color-text-muted)] mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button 
                      onClick={() => { setNotifOpen(false); navigate('/app/alerts'); }}
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
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[var(--color-text-secondary)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--color-text-secondary)]" />
              )}
            </button>

            {/* User Avatar */}
            <button 
              onClick={() => navigate('/app/users')}
              className="w-8 h-8 rounded-full bg-[var(--color-mint)] flex items-center justify-center text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              JD
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-primary-bg)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
