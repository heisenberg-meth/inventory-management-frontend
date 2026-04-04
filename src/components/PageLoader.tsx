import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[var(--color-mint)]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-[var(--color-mint)] rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-[var(--color-text-secondary)] animate-pulse">
        Loading...
      </p>
    </div>
  );
};
