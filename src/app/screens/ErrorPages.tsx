import React from 'react';
import { useNavigate } from 'react-router';
import { ShieldOff, Home, ArrowLeft } from 'lucide-react';

export const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
      <div className="w-24 h-24 rounded-full bg-[var(--color-danger)]/20 flex items-center justify-center mb-6">
        <ShieldOff className="w-12 h-12 text-[var(--color-danger)]" />
      </div>
      <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">403</h1>
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Access Denied</h2>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-8">
        You do not have permission to view this page. Contact your administrator if you believe this is a mistake.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">
          <ArrowLeft className="w-4 h-4" />Go Back
        </button>
        <button onClick={() => navigate('/app')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
          <Home className="w-4 h-4" />Dashboard
        </button>
      </div>
    </div>
  );
};

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
      <div className="text-8xl font-black text-[var(--color-border)] mb-4">404</div>
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Page Not Found</h2>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-card-bg)] transition-colors">
          <ArrowLeft className="w-4 h-4" />Go Back
        </button>
        <button onClick={() => navigate('/app')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
          <Home className="w-4 h-4" />Dashboard
        </button>
      </div>
    </div>
  );
};
