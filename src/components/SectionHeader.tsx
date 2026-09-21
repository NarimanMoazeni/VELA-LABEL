import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  englishLabel?: string;
  actionText?: string;
  onAction?: () => void;
  hasTopDivider?: boolean;
  hasBottomDivider?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  englishLabel,
  actionText,
  onAction,
  hasTopDivider = false,
  hasBottomDivider = true,
  className = '',
}) => {
  return (
    <div className={`w-full select-none ${className}`}>
      {/* Subtle Top Divider if requested */}
      {hasTopDivider && (
        <div className="w-full flex items-center justify-center mb-6">
          <div className="w-full h-px bg-[#E8DFD5]/80"></div>
        </div>
      )}

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4">
        <div className="space-y-1">
          {englishLabel && (
            <span
              className="text-[10px] text-[#A08875] uppercase font-serif font-medium tracking-[0.22em] block"
              dir="ltr"
            >
              {englishLabel}
            </span>
          )}
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1917] tracking-tight leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-[#786C65] font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-1.5 text-xs font-medium text-[#2A2421] hover:text-[#A08875] transition-colors self-start sm:self-auto cursor-pointer skip-delay group"
          >
            <span>{actionText}</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#A08875] group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Subtle Minimal Bottom Divider */}
      {hasBottomDivider && (
        <div className="w-full flex items-center justify-center">
          <div className="w-full h-px bg-[#E8DFD5]/80"></div>
        </div>
      )}
    </div>
  );
};
