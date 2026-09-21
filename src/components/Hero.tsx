import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { toPersianDigits } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts?: Product[];
  featuredProduct?: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProducts = [],
  featuredProduct,
}) => {
  const looks = featuredProducts.length > 0
    ? featuredProducts
    : featuredProduct
    ? [featuredProduct]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLook = looks[currentIndex] || looks[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % looks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + looks.length) % looks.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0EB] py-4 sm:py-8 lg:py-10 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Right Column (in RTL): Tighter Content Block (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3.5 sm:space-y-4 order-2 lg:order-1">
            
            {/* 1. Campaign Label */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] text-[#A08875] tracking-[0.22em] uppercase font-serif font-semibold"
                dir="ltr"
              >
                AUTUMN / WINTER 2026 • VELA ATELIER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A08875]"></span>
            </div>

            {/* 2. Main Headline */}
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] font-bold tracking-tight leading-[1.25]">
                اصالت، وقار و سادگی
              </h1>
              <p className="font-display text-sm sm:text-base lg:text-lg text-[#6B5F58] font-semibold">
                کالکشن پاییز و زمستان ولا لیبل
              </p>
            </div>

            {/* 3. Short Authentic Commercial Description (Zero AI Slop) */}
            <p className="text-xs sm:text-[13px] text-[#786C65] font-normal leading-relaxed max-w-lg">
              طراحی اختصاصی و دوخت تمیز مزونی در آتلیه تهران. عرضه مستقیم ست‌های پاییزی و کت‌های تک با فیت بی‌نقص و پارچه‌های مرغوب بدون چروک.
            </p>

            {/* 4 & 5. Primary and Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Primary Dominant CTA */}
              <button
                onClick={onExploreClick}
                className="py-2.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all text-xs sm:text-sm font-semibold shadow-xs active:scale-95 cursor-pointer skip-delay"
              >
                مشاهده کالکشن مزون
              </button>

              {/* Secondary CTA */}
              {currentLook && (
                <button
                  onClick={() => onOpenQuickView(currentLook)}
                  className="py-2.5 px-4 rounded-full bg-[#FAF6F0] border border-[#D4C5B9] text-[#2A2421] hover:border-[#2A2421] transition-all text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer skip-delay"
                >
                  <span>بررسی {currentLook.title}</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-[#A08875]" />
                </button>
              )}
            </div>

            {/* 6. Trust Bar */}
            <div className="pt-3 border-t border-[#E8DFD5] flex items-center gap-4 text-[11px] text-[#8E827A]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A08875]" />
                ضمانت کیفیت دوخت مزونی
              </span>
              <span>✦ ارسال سریع با کاور اختصاصی</span>
              <span>✦ پرو و شخصی‌دوزی در تهران</span>
            </div>

          </div>

          {/* Left Column (in RTL): Dominant Lookbook Fashion Image (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#E8DFD5] shadow-md">
              
              {/* Morphing Editorial Image */}
              {looks.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    idx === currentIndex
                      ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                      : 'opacity-0 scale-105 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>
                </div>
              ))}

              {/* Lookbook Controls Overlay */}
              <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between text-white p-2.5 sm:p-3 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15">
                <div className="flex flex-col">
                  <span
                    className="text-[9px] text-[#D4C5B9] tracking-wider uppercase font-serif font-medium"
                    dir="ltr"
                  >
                    LOOK {toPersianDigits(currentIndex + 1)} OF {toPersianDigits(looks.length)}
                  </span>
                  <span className="text-xs font-semibold text-white truncate max-w-[150px] sm:max-w-[200px]">
                    {currentLook?.title}
                  </span>
                </div>

                <div className="flex items-center gap-1" dir="ltr">
                  <button
                    onClick={handlePrev}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="لوک قبلی"
                    aria-label="لوک قبلی"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="لوک بعدی"
                    aria-label="لوک بعدی"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
