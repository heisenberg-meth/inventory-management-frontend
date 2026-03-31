import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, Fingerprint, Lock, ShieldCheck, Mail, Sun, Moon } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<'biometric' | 'password' | '2fa'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Tenant Admin');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ims-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('ims-theme', next ? 'dark' : 'light');
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) { setError('Email is required'); return; }
    if (authMethod === 'password' && !password) { setError('Password is required'); return; }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-primary-bg)] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Theme toggle - top right */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-mint)] transition-all"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="w-4 h-4 text-[var(--color-text-secondary)]" /> : <Moon className="w-4 h-4 text-[var(--color-text-secondary)]" />}
      </button>

      {/* Mint Glow Effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(29,185,122,0.3) 0%, transparent 70%)' }}
      />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div 
          className="bg-[var(--color-card-bg)] rounded-xl p-6 sm:p-8 border border-[var(--color-border)]"
          style={{ boxShadow: '0 0 40px rgba(29,185,122,0.15)' }}
        >
          {/* Logo & Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--color-mint)] flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Inventory Management
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Secure Identity Gateway
            </p>

            {/* Online Status */}
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-[var(--color-mint-glow)] border border-[var(--color-mint)]">
              <div className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
              <span className="text-xs text-[var(--color-mint)] font-medium">Online</span>
            </div>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-[var(--color-surface-secondary)] rounded-lg">
            {[
              { id: 'biometric', label: 'Biometric', icon: Fingerprint },
              { id: 'password', label: 'Password', icon: Lock },
              { id: '2fa', label: '2FA', icon: ShieldCheck },
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => { setAuthMethod(method.id as 'biometric' | 'password' | '2fa'); setError(''); }}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
                    ${authMethod === method.id
                      ? 'bg-[var(--color-mint)] text-white shadow-lg'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{method.label}</span>
                </button>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 rounded-lg text-sm text-[var(--color-danger)]">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Biometric UI */}
            {authMethod === 'biometric' && (
              <div className="py-6 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[var(--color-mint-glow)] border-2 border-[var(--color-mint)] flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-[var(--color-mint)]" />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                  Place your finger on the scanner or use your device's biometric authentication
                </p>
              </div>
            )}

            {/* 2FA UI */}
            {authMethod === '2fa' && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)] tracking-[0.3em] text-center"
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-2 text-center">Check your authenticator app</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  placeholder="admin@pharmacy.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
                />
              </div>
            </div>

            {/* Password */}
            {authMethod === 'password' && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
                  />
                </div>
              </div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Role
              </label>
              <select 
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]"
              >
                <option>Tenant Admin</option>
                <option>Manager</option>
                <option>Staff</option>
                <option>Platform Admin</option>
              </select>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--color-mint)]"
                />
                <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">Remember me</span>
              </label>
              <button type="button" className="text-xs sm:text-sm text-[var(--color-mint)] hover:text-[var(--color-mint-hover)]">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-mint)] hover:bg-[var(--color-mint-hover)] text-white font-semibold py-3 rounded-lg transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <p className="text-center text-xs text-[var(--color-text-muted)]">
              <ShieldCheck className="inline w-3 h-3 mr-1" />
              Secured by multi-factor authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
