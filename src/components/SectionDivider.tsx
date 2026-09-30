import React from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

export const SectionDivider: React.FC = () => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none" aria-hidden="true">
      <Reveal>
        <div className="relative flex items-center justify-center">
          {/* Right Gradient Rule in RTL */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-[#8C6D46]/40 dark:from-[#C5A880]/30 via-stone-300/40 dark:via-white/10 to-transparent transition-colors duration-500" />

          {/* Centered Luxury Emblem with Subtle Ambient Glow */}
          <div className="relative mx-4 sm:mx-6 flex items-center justify-center">
            {/* Soft Ambient Radiance */}
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-[#8C6D46]/15 dark:bg-[#C5A880]/20 blur-md pointer-events-none animate-pulse" />

            <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F2] dark:bg-[#1C1714] border border-[#8C6D46]/30 dark:border-[#C5A880]/40 flex items-center justify-center shadow-xs transition-all duration-300 hover:scale-110 group cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880] transition-transform duration-700 group-hover:rotate-45" />
            </div>
          </div>

          {/* Left Gradient Rule in RTL */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#8C6D46]/40 dark:from-[#C5A880]/30 via-stone-300/40 dark:via-white/10 to-transparent transition-colors duration-500" />
        </div>
      </Reveal>
    </div>
  );
};
