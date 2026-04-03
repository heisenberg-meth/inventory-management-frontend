import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CreditCard } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  section: string;
  description: string;
}

export const PlaceholderScreen: React.FC<PlaceholderProps> = ({ title, section, description }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        section={section}
        title={title}
        description={description}
        ctaText="SYSTEM ACTION"
        onCtaClick={() => console.log('Action...')}
      />

      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm p-24 flex flex-col items-center justify-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#f0f4f8] flex items-center justify-center mb-6">
           <CreditCard className="w-[28px] h-[28px] text-[#9aa5b4]" />
        </div>
        <h3 className="text-[20px] font-bold text-[var(--pa-text-near-black)] mb-2 uppercase tracking-tight">NO {section} DATA CORE FOUND</h3>
        <p className="text-[14px] text-[#6b7a8d] max-w-sm text-center">
          The global data core for {section.toLowerCase()} has not been initialized or is currently synchronization pending.
        </p>
      </div>
    </div>
  );
};
