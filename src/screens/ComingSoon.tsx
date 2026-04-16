import React from 'react';
import { useNavigate } from 'react-router';
import { Construction, ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title = 'Coming Soon' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--color-mint)]/10 mb-6">
          <Construction className="w-12 h-12 text-[var(--color-mint)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          This feature is currently under development and will be available soon.
        </p>
        <button
          onClick={() => navigate('/app')}
          className="inline-flex items-center gap-2 bg-[var(--color-mint)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
