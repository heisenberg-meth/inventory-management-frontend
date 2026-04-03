import React from 'react';

interface PageHeaderProps {
  section: string;
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ section, title, description, ctaText, onCtaClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1db97a] shadow-[0_0_8px_rgba(29,185,122,0.4)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b7a8d]">
            {section}
          </span>
        </div>
        <h1 className="text-[36px] font-extrabold text-[var(--pa-text-near-black)] leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-[15px] font-medium text-[#6b7a8d] mt-2 max-w-2xl leading-relaxed opacity-85">
          {description}
        </p>
      </div>

      {ctaText && (
        <button
          onClick={onCtaClick}
          className="h-[46px] px-8 bg-[#0d6e5a] text-white rounded-[10px] text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-[#0d6e5a]/10 hover:shadow-[#0d6e5a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex-shrink-0"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};
