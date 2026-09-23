import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { toPersianDigits } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts?: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProducts = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLook = featuredProducts[currentIndex] || featuredProducts[0];

  // Auto-advance every 5s
  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0EB] select-none">
      {/* ─── DESKTOP: Wide Cinematic 16:9 Hero ─── */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: '16/7' }}>
        {/* Full-bleed background images with crossfade */}
        {featuredProducts.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Editorial gradient overlay — darker at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Content overlay — bottom-aligned editorial layout */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-10 lg:pb-14">
            <div className="max-w-xl space-y-4">
              {/* Campaign label */}
              <span
                className="text-[11px] text-[#D4C5B9] tracking-[0.2em] uppercase font-serif font-medium"
                dir="ltr"
              >
                AUTUMN / WINTER 2026
              </span>

              {/* Headline */}
              <h1 className="font-display text-3xl lg:text-5xl text-white font-bold leading-[1.2]">
                اصالت، وقار و سادگی
              </h1>

              <p className="text-sm text-white/80 font-normal leading-relaxed max-w-md">
                طراحی اختصاصی و دوخت مزونی در آتلیه تهران. ست‌های پاییزی و کت‌های تک با پارچه‌های مرغوب وارداتی.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={onExploreClick}
                  className="py-3 px-7 bg-white text-[#2A2421] hover:bg-[#FAF6F0] text-sm font-semibold transition-colors cursor-pointer"
                >
                  مشاهده کالکشن
                </button>

                {currentLook && (
                  <button
                    onClick={() => onOpenQuickView(currentLook)}
                    className="py-3 px-6 border border-white/40 text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {currentLook.title}
                  </button>
                )}
              </div>
            </div>

            {/* Look indicator dots */}
            {featuredProducts.length > 1 && (
              <div className="flex items-center gap-2 mt-6" dir="ltr">
                {featuredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-0.5 transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`لوک ${toPersianDigits(idx + 1)}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── MOBILE: 4:5 Portrait Hero ─── */}
      <div className="md:hidden relative w-full" style={{ aspectRatio: '4/5' }}>
        {featuredProducts.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          </div>
        ))}

        {/* Mobile content overlay */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-5 pb-8 space-y-3">
            <span
              className="text-[10px] text-[#D4C5B9] tracking-[0.18em] uppercase font-serif font-medium"
              dir="ltr"
            >
              VELA ATELIER • F/W 2026
            </span>

            <h1 className="font-display text-2xl text-white font-bold leading-tight">
              اصالت، وقار و سادگی
            </h1>

            <p className="text-xs text-white/75 leading-relaxed">
              کالکشن کپسولی پاییز و زمستان ولا لیبل — دوخت مزونی در تهران
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={onExploreClick}
                className="py-2.5 px-5 bg-white text-[#2A2421] text-xs font-semibold cursor-pointer"
              >
                مشاهده کالکشن
              </button>
              {currentLook && (
                <button
                  onClick={() => onOpenQuickView(currentLook)}
                  className="py-2.5 px-4 border border-white/40 text-white text-xs font-medium cursor-pointer"
                >
                  {currentLook.title}
                </button>
              )}
            </div>

            {/* Mobile dots */}
            {featuredProducts.length > 1 && (
              <div className="flex items-center gap-2 pt-2" dir="ltr">
                {featuredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-[2px] transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'w-6 bg-white' : 'w-3 bg-white/40'
                    }`}
                    aria-label={`لوک ${toPersianDigits(idx + 1)}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
