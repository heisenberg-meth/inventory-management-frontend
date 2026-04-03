import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import {
  Building2, Mail, Lock, Eye, EyeOff, LayoutGrid,
  Shield, ShieldCheck, Fingerprint, Info, Star, ChevronLeft, Zap, Sun, Moon
} from 'lucide-react';

// Import images for Vite
import WarehouseImg from '../../assets/warehouse_platform_bg.png';
import TenantImg from '../../assets/tenant_login_hero.png';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'tenant-admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ims-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const isPlatformAdmin = initialRole === 'platform-admin';

  // Apply theme class on mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('ims-theme', next ? 'dark' : 'light');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isPlatformAdmin && !orgId)) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      if (isPlatformAdmin) {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    }, 1500);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-primary-bg p-4 sm:p-6 lg:p-10 transition-colors duration-500 selection:bg-mint/20"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Unified Split-Screen Layout (Athletica-inspired) */}
      <div className="w-full max-w-[960px] h-[75vh] min-h-[640px] max-h-[820px] bg-card-bg rounded-[2.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)] flex flex-row overflow-hidden relative animate-in fade-in zoom-in-95 duration-1000 border border-white/5">

        {/* LEFT PANEL: FORM SIDE (Fixed Width) */}
        <div className="w-[440px] h-full flex flex-col bg-card-bg relative z-20 border-r border-text-muted/10 transition-colors duration-500">

          {/* TOP NAVBAR */}
          <nav className="h-[64px] min-h-[64px] px-8 flex items-center justify-between border-b border-text-muted/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-mint flex items-center justify-center shadow-md">
                <BoxIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[15px] font-[700] text-text-primary tracking-tight">InventoryPro</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-surface-secondary text-text-secondary hover:text-mint transition-all"
                title={isDark ? "Light Mode" : "Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <div className="w-[1px] h-3 bg-text-muted/20" />
              <button className="h-7 px-3 border border-text-muted/20 text-text-secondary text-[12px] font-[600] rounded-lg hover:bg-surface-secondary transition-colors">
                Help
              </button>
            </div>
          </nav>

          {/* BACK LINK */}
          <div className="pl-8 pt-5 text-left">
            <button
              onClick={() => navigate('/portal')}
              className="flex items-center gap-1.5 text-[12px] font-[500] text-text-secondary hover:text-mint transition-all group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Return to selection
            </button>
          </div>

          {/* FORM CONTAINER */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 px-10">
            <div className="w-full -mt-12">

              {/* ICON BLOCK */}
              <div className="flex justify-center mb-5">
                <div className={`w-[60px] h-[60px] rounded-2xl bg-surface-secondary flex items-center justify-center shadow-sm border border-text-muted/10`}>
                  {isPlatformAdmin ? (
                    <Fingerprint className="w-7 h-7 text-mint stroke-[1.5]" />
                  ) : (
                    <Building2 className="w-7 h-7 text-mint stroke-[1.5]" />
                  )}
                </div>
              </div>

              {/* TITLE BLOCK */}
              <div className="text-center mb-7">
                <h1 className="text-[24px] font-[800] text-text-primary leading-tight animate-in fade-in slide-in-from-bottom-2 duration-700">
                  {isPlatformAdmin ? 'Platform Admin' : 'Tenant Login'}
                </h1>
                <p className="text-[13px] font-[400] text-text-secondary mt-1">
                  {isPlatformAdmin ? 'Global operations & system access' : 'Manage your business operations'}
                </p>

                {/* STATUS BADGES */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`flex items-center gap-1 px-2 py-0.5 bg-mint/10 text-mint rounded-md text-[9px] font-[700] uppercase tracking-widest`}>
                    <Shield className="w-2.5 h-2.5" /> SECURE
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 bg-mint/10 text-mint rounded-md text-[9px] font-[700] uppercase tracking-widest`}>
                    <Lock className="w-2.5 h-2.5" /> ENCRYPTED
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleLogin} className={`space-y-4 ${error ? 'animate-shake' : ''}`}>

                {/* ORG ID (Only for Tenant) */}
                {!isPlatformAdmin && (
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-[600] text-text-primary ml-1">
                      Organization ID
                    </label>
                    <div className="relative group">
                      <LayoutGrid className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-mint transition-colors" />
                      <input
                        type="text"
                        placeholder="org_id_101"
                        value={orgId}
                        onChange={e => { setOrgId(e.target.value); setError(false); }}
                        className={`w-full h-11 bg-surface-secondary border ${error && !orgId ? 'border-danger' : 'border-text-muted/10 focus:border-mint'} rounded-xl pl-11 pr-4 text-[13px] text-text-primary outline-none transition-all shadow-sm`}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[12px] font-[600] text-text-primary ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-mint transition-colors" />
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(false); }}
                      className={`w-full h-11 bg-surface-secondary border ${error && !email ? 'border-danger' : 'border-text-muted/10 focus:border-mint'} rounded-xl pl-11 pr-4 text-[13px] text-text-primary outline-none transition-all shadow-sm`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[12px] font-[600] text-text-primary">
                      Password
                    </label>
                    {!isPlatformAdmin && <button type="button" className="text-[11px] text-mint font-medium hover:underline">Forgot?</button>}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-mint transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(false); }}
                      className={`w-full h-11 bg-surface-secondary border ${error && !password ? 'border-danger' : 'border-text-muted/10 focus:border-mint'} rounded-xl pl-11 pr-11 text-[13px] text-text-primary outline-none transition-all shadow-sm`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-[14px] top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {error && (
                    <p className="flex items-center gap-1.5 text-[11px] font-[500] text-danger pl-1 mt-1.5">
                      <Info className="w-3 h-3" /> Please check details and try again.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 text-[12px] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-text-muted/30 text-mint focus:ring-mint/20 cursor-pointer"
                    />
                    <span className="text-text-secondary">Stay signed in</span>
                  </label>
                  {isPlatformAdmin && <button type="button" className="text-mint font-[600] hover:underline">Support</button>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 bg-mint hover:bg-mint-hover text-white font-[700] text-[14px] rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-3`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRightIcon /></>
                  )}
                </button>
              </form>

              {/* SECURITY STATUS FOOTER */}
              <div className="flex items-center justify-center gap-2.5 mt-10 opacity-60">
                <div className="flex items-center gap-1.5 text-[9px] font-[700] text-text-muted tracking-[0.08em]">
                  <div className="w-1 h-1 rounded-full bg-mint" />
                  {isPlatformAdmin ? 'KERNEL_V4.2' : 'SECURE_NODE'}
                </div>
                {!isPlatformAdmin && (
                  <div className="text-[9px] font-[700] text-text-muted tracking-[0.08em]">
                    © 2026 StockFlow Systems
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: BRAND SIDE (Flexible / Image) */}
        <div className={`flex-1 h-full relative overflow-hidden bg-primary-bg`}>
          {/* Overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-primary-bg/10 bg-gradient-to-b from-transparent to-black/40" />

          <img
            src={isPlatformAdmin ? WarehouseImg : TenantImg}
            alt="Dashboard Context"
            className="absolute inset-0 w-full h-full object-cover animate-image-reveal brightness-[0.8] saturate-[0.8]"
          />

          {/* Top Brand Tag */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            <div className="w-4 h-4 rounded-md bg-white flex items-center justify-center">
              <BoxIcon className={`w-3 text-mint`} />
            </div>
            <span className="text-[11px] font-[600] text-white">StockFlow <span className="opacity-70 font-normal italic">Operations</span></span>
          </div>

          {/* FEATURE HIGHLIGHTS */}
          <div className="absolute top-6 right-6 z-20 space-y-3">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-2.5 px-3.5 shadow-2xl animate-float">
              <div className="text-[12px] font-[700] text-white flex items-center gap-2">
                {isPlatformAdmin ? <ShieldCheck className="w-4 h-4 text-mint" /> : <Building2 className="w-3.5 h-3.5 text-mint" />}
                {isPlatformAdmin ? '140+ Active Tenants' : 'Store Inventory Portal'}
              </div>
            </div>
            {!isPlatformAdmin && (
              <div className="ml-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-2.5 px-3.5 shadow-xl animate-float-delayed">
                <div className="text-[12px] font-[700] text-white">Live Tracking Active</div>
              </div>
            )}
          </div>

          {/* BOTTOM GLASSMORPHISM CARD */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className={`backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden bg-black/40`}>
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-mint text-mint" />)}
              </div>
              <h3 className="text-[18px] font-[700] text-white leading-tight mb-2">
                {isPlatformAdmin ? 'Centralized tenant control.' : 'Precision inventory management.'}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-white/70">
                  <Zap className="w-3 h-3 text-mint fill-mint" />
                  {isPlatformAdmin ? 'Real-time global monitoring.' : 'Integrated store dashboard.'}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 3s infinite ease-in-out; }
        .animate-float-delayed { animation: float 3s infinite ease-in-out 1s; }
        @keyframes image-reveal {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-image-reveal {
          animation: image-reveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />
    </div>
  );
};

// Helper components
const BoxIcon = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" />
    <path d="M3 8L12 13L21 8" />
    <path d="M12 13V21" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12H19" />
    <path d="M12 5L19 12L12 19" />
  </svg>
);
