import React from 'react';
import { useNavigate } from 'react-router';
import { 
  ShieldCheck, 
  Building2, 
  ArrowRight
} from 'lucide-react';
const ViyanLogo = '/viyan-logo.png';

export const PortalSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[var(--color-primary-bg)] flex flex-col font-sans overflow-x-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-mint)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-mint)]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="h-20 px-6 sm:px-12 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img src={ViyanLogo} alt="Viyan Info Tech" className="h-12 w-12 rounded-xl object-cover" style={{ boxShadow: '0 0 0 1.5px rgba(13,110,90,0.6), 0 0 6px rgba(13,110,90,0.35)' }} />
          <div className="flex flex-col leading-none">
            <span className="font-black text-[22px] tracking-wide text-[var(--color-text-primary)]" style={{ WebkitTextStroke: '1px rgba(13,110,90,0.6)', paintOrder: 'stroke fill' }}>VIYAN</span>
            <span className="text-[11px] font-bold tracking-[0.22em]" style={{ color: "var(--color-mint)", WebkitTextStroke: '0.5px rgba(13,110,90,0.5)' }}>INFO TECH</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors">
            Documentation
          </button>
          <button className="px-5 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] hover:border-[var(--color-mint)] transition-all bg-[var(--color-card-bg)]/50">
            Support
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 z-10">
        {/* Hero */}
        <div className="text-center max-w-4xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--color-text-primary)] mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-[var(--color-mint)] to-[#34D399] bg-clip-text text-transparent">StockFlow</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
            Choose your login portal to manage your inventory ecosystem with precision and peak efficiency.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Card 1: Platform Admin */}
          <div 
            className="group relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-[var(--color-mint)]/30 overflow-hidden flex flex-col h-full"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] group-hover:bg-blue-500/10 transition-colors" />

            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Platform Admin</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed opacity-70">
                Access the master control panel to manage multiple tenants, configure global subscription plans, and monitor system-wide platform health and settings.
              </p>
            </div>

            <div className="mt-auto pt-4">
              <button 
                onClick={() => navigate('/login?role=platform-admin')}
                className="w-full h-14 bg-[#0a1f18] hover:bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
              >
                Login as Admin <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Tenant Portal */}
          <div 
            className="group relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(29,185,122,0.15)] hover:border-[var(--color-mint)]/50 overflow-hidden flex flex-col h-full"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-mint)]/5 blur-[40px] group-hover:bg-[var(--color-mint)]/10 transition-colors" />

            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-mint)]/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="w-8 h-8 text-[var(--color-mint)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Tenant Portal</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed opacity-70">
                The core business interface. Manage your catalog of products, real-time stock levels, supplier relationships, warehouse logistics, and comprehensive sales reporting.
              </p>
            </div>

            <div className="mt-auto pt-4">
              <button 
                onClick={() => navigate('/login?role=tenant-admin')}
                className="w-full h-14 bg-gradient-to-r from-[var(--color-mint)] to-[#34D399] hover:opacity-90 text-[#0a1f18] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_10px_25px_rgba(29,185,122,0.2)]"
              >
                Login as Tenant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="h-16 flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)] z-10 px-8">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)] opacity-40 animate-pulse" />
        <span>Secured by Advanced Encryption Standard</span>
        <div className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
        <span>© 2026 StockFlow Systems</span>
      </footer>
    </div>
  );
};
