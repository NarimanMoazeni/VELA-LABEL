import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  englishLabel?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  hasTopDivider?: boolean;
  hasBottomDivider?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  englishLabel,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`w-full select-none ${className}`}>
      {/* Simple editorial header — no gradient lines */}
      <div className="flex items-end justify-between gap-4 border-b border-[#E8DFD5] pb-4">
        <div className="space-y-1">
          {englishLabel && (
            <span
              className="text-[9px] text-[#A08875] uppercase font-serif font-medium tracking-[0.18em] block"
              dir="ltr"
            >
              {englishLabel}
            </span>
          )}
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#1C1917] leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#786C65] font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2A2421] hover:text-[#A08875] transition-colors cursor-pointer shrink-0 pb-0.5"
          >
            <span>{actionText}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
