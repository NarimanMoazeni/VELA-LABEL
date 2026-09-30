import React from 'react';

export const WaveDivider: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px] transition-colors duration-700 ease-in-out"
      aria-hidden="true"
    >
      {/* Background container matches product section to prevent any seam */}
      <div className="w-full bg-[#F5F0EB] dark:bg-[#120E0C] transition-colors duration-700 ease-in-out">
        <svg
          className="w-full h-10 sm:h-16 lg:h-20 block text-[#EFE8DE] dark:text-[#181310] transition-colors duration-700 ease-in-out"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle Ambient Wave Crest 1 (Translucent Champagne/Bronze Glow) */}
          <path
            d="M0,40 C320,80 540,10 860,45 C1140,70 1340,30 1440,38 L1440,100 L0,100 Z"
            className="fill-[#8C6D46]/15 dark:fill-[#C5A880]/12 transition-all duration-700 ease-in-out"
            style={{
              transition: 'fill 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease',
            }}
          />

          {/* Subtle Ambient Wave Crest 2 (Secondary Harmonic Layer) */}
          <path
            d="M0,52 C260,25 600,75 920,40 C1180,15 1360,55 1440,48 L1440,100 L0,100 Z"
            className="fill-[#8C6D46]/8 dark:fill-[#C5A880]/6 transition-all duration-700 ease-in-out"
            style={{
              transition: 'fill 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease',
            }}
          />

          {/* Main Organic Wave Body — Seamlessly flows into Why VELA background */}
          <path
            d="M0,60 C360,95 680,30 1000,70 C1220,95 1360,52 1440,58 L1440,100 L0,100 Z"
            className="fill-[#EFE8DE] dark:fill-[#181310] transition-all duration-700 ease-in-out"
            style={{
              transition: 'fill 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
      </div>
    </div>
  );
};
