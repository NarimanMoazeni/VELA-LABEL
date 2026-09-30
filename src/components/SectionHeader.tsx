import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  englishLabel?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  englishLabel,
  className = '',
}) => {
  return (
    <div className={`w-full text-center select-none ${className}`}>
      {/* 1. Latin Editorial Season Tracker */}
      {englishLabel && (
        <span
          className="font-latin text-[10px] sm:text-[11.5px] text-[#8C6D46] dark:text-[#C5A880] uppercase font-bold tracking-[0.22em] block mb-2 sm:mb-2.5"
          dir="ltr"
        >
          {englishLabel}
        </span>
      )}

      {/* 2. Main Persian Display Headline */}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#181310] dark:text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
        {title}
      </h2>

      {/* 3. Supporting Persian Subtitle */}
      {subtitle && (
        <p className="font-sans text-xs sm:text-sm text-[#6B5D52] dark:text-[#A89C92] font-normal leading-relaxed max-w-md mx-auto">
          {subtitle}
        </p>
      )}

      {/* Subtle Centered Accent Line */}
      <div className="w-12 h-[1.5px] mx-auto mt-3.5 bg-gradient-to-r from-transparent via-[#8C6D46]/70 dark:via-[#C5A880]/70 to-transparent rounded-full" />
    </div>
  );
};
