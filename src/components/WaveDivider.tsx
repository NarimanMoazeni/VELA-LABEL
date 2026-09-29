import React from 'react';

export const WaveDivider: React.FC = () => {
  return (
    <div
      className="w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px] transition-colors duration-300"
      aria-hidden="true"
    >
      <svg
        className="w-full h-9 sm:h-14 lg:h-16 block text-[#EFE8DE] dark:text-[#181310] transition-colors duration-300"
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Subtle champagne crest highlight */}
        <path
          d="M0,45 C280,75 520,15 840,40 C1120,60 1320,25 1440,35 L1440,90 L0,90 Z"
          className="fill-[#8C6D46]/10 dark:fill-[#C5A880]/8"
        />

        {/* Layer 2: Main organic wave body merging into Why VELA background */}
        <path
          d="M0,55 C320,85 640,25 960,60 C1200,85 1360,45 1440,50 L1440,90 L0,90 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
