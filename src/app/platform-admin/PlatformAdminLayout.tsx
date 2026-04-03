import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router';
import { 
  LayoutDashboard, Building2, Users, ShieldCheck, CreditCard, 
  Wallet, FileText, BarChart3, LifeBuoy, LogOut, Search, Bell, 
  Sun, Moon, Menu
} from 'lucide-react';
import '../../styles/platform-admin.css';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  red?: boolean;
}

export const PlatformAdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('ims-theme');
    return saved !== null ? saved === 'dark' : false; // Default light for Platform Admin? Or follow system?
  });

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

  const navItems: NavItem[] = [
    { label: 'DASHBOARD', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'TENANTS', path: '/admin/tenants', icon: Building2 },
    { label: 'TENANT USERS', path: '/admin/tenant-users', icon: Users },
    { label: 'PLATFORM ADMINS', path: '/admin/platform-admins', icon: ShieldCheck },
    { label: 'SUBSCRIPTIONS', path: '/admin/subscriptions', icon: CreditCard },
    { label: 'PAYMENTS', path: '/admin/payments', icon: Wallet },
    { label: 'AUDIT LOGS', path: '/admin/audit-logs', icon: FileText },
    { label: 'REPORTS', path: '/admin/reports', icon: BarChart3 },
    { label: 'SUPPORT', path: '/admin/support', icon: LifeBuoy },
  ];

  const isActive = (path: string) => {
    if (path === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/')) return true;
    return location.pathname === path;
  };

  const headerMap: Record<string, { title: string; breadcrumb: string }> = {
    '/admin': { title: 'Command Center', breadcrumb: 'GLOBAL WORKSPACE' },
    '/admin/dashboard': { title: 'Command Center', breadcrumb: 'GLOBAL WORKSPACE' },
    '/admin/tenants': { title: 'Tenants', breadcrumb: 'TENANT MANAGEMENT' },
    '/admin/tenants/1': { title: 'Tenant Profile', breadcrumb: 'TENANTS / ABC PHARMACY' },
    '/admin/tenant-users': { title: 'Tenant Users', breadcrumb: 'USER MANAGEMENT' },
    '/admin/platform-admins': { title: 'Platform Admins', breadcrumb: 'PLATFORM ADMINISTRATION' },
    '/admin/payments': { title: 'Payments', breadcrumb: 'PAYMENT MANAGEMENT' },
    '/admin/subscriptions': { title: 'Plans', breadcrumb: 'PLANS & PRICING' },

    '/admin/support': { title: 'Support', breadcrumb: 'CUSTOMER SUPPORT' },
    '/admin/audit-logs': { title: 'Audit Logs', breadcrumb: 'SYSTEM AUDIT' },
    '/admin/reports': { title: 'Reports', breadcrumb: 'PLATFORM ANALYTICS' },
  };

  const currentHeader = headerMap[location.pathname] || { title: 'Command Center', breadcrumb: 'GLOBAL WORKSPACE' };

  return (
    <div className={`pa-root ${isDark ? 'dark' : 'light'} flex h-screen w-full overflow-hidden bg-[var(--pa-page-bg)] transition-colors duration-300`}>
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] bg-[var(--pa-sidebar-bg)] 
          flex flex-col transition-transform duration-300 ease-in-out flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Area */}
        <div className="h-[72px] flex items-center px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/viyan-logo.png" alt="Viyan Info Tech" className="h-10 w-10 object-contain rounded-lg" style={{ boxShadow: '0 0 0 1.5px rgba(13,110,90,0.6), 0 0 6px rgba(13,110,90,0.35)' }} />
            <div className="flex flex-col leading-none">
              <span className="text-white text-[14px] font-extrabold tracking-widest" style={{ WebkitTextStroke: '1px rgba(13,110,90,0.6)', paintOrder: 'stroke fill' }}>VIYAN</span>
              <span className="text-[#1db97a] text-[9px] font-bold tracking-[0.2em] mt-0.5" style={{ WebkitTextStroke: '0.5px rgba(13,110,90,0.5)' }}>INFO TECH</span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-none">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-200
                  ${active 
                    ? 'bg-white text-[#0d6e5a] shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                    : 'text-white/55 hover:text-white/80 hover:bg-white/5 group'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-[#0d6e5a]' : 'text-current opacity-70 group-hover:opacity-100'}`} />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                  {item.label}
                </span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0d6e5a]" />}
              </Link>
            );
          })}

          <div className="my-6 h-px bg-white/12" />

          {/* Logout */}
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-lg bg-[#ef4444]/15 text-[#ef4444] hover:bg-[#ef4444]/25 transition-all font-bold group"
          >
            <LogOut className="w-[18px] h-[18px] opacity-80" />
            <span className="text-[11px] uppercase tracking-[0.1em]">LOGOUT SESSION</span>
          </button>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-white/5 bg-black/5">
           <div className="flex items-center justify-between">
              <div className="text-[9px] font-extrabold text-white/20 uppercase tracking-[0.2em]">PLATFORM v4.2.0</div>
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-[72px] bg-[var(--pa-topbar-bg)] border-b border-[var(--pa-border)] px-10 flex items-center justify-between flex-shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-6">
            <button
               onClick={() => setSidebarOpen(true)}
               className="lg:hidden p-2 rounded-lg hover:bg-[var(--pa-blue-gray-bg)] transition-colors"
            >
              <Menu className="w-5 h-5 text-[var(--pa-text-muted)]" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-[#1db97a] shadow-[0_0_8px_rgba(29,185,122,0.4)] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--pa-text-muted)]">{currentHeader.breadcrumb}</span>
              </div>
              <h2 className="text-[18px] font-extrabold text-[var(--pa-text-near-black)] tracking-tight -mt-0.5">{currentHeader.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pa-text-light-gray)]" />
              <input
                type="text"
                placeholder="SEARCH DATA CORE..."
                className="w-[360px] h-11 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-lg pl-12 pr-4 text-[13px] font-medium text-[var(--pa-text-near-black)] placeholder-[#9aa5b4] focus:outline-none focus:ring-2 focus:ring-[#0d6e5a]/20 transition-all"
              />
            </div>

            <button className="w-10 h-10 flex items-center justify-center border border-[var(--pa-border)] rounded-lg text-[var(--pa-text-muted)] hover:bg-[var(--pa-row-hover)] transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pl-4 border-l border-[var(--pa-border)]">
              <div className="text-right hidden sm:block">
                <div className="text-[13px] font-semibold text-[var(--pa-text-near-black)]">Admin Root</div>
                <div className="text-[10px] font-semibold text-[#1db97a] uppercase tracking-wider">AUTHORIZED</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--pa-teal)] flex items-center justify-center text-white text-[14px] font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 overflow-y-auto bg-[var(--pa-page-bg)] p-8 lg:p-10 transition-colors duration-300">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
