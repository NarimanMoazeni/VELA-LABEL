import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpLeft } from 'lucide-react';
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
    ? featuredProducts.slice(0, 3)
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
    <section className="relative w-full overflow-hidden bg-[#F5F0EB] py-6 sm:py-10 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column (in RTL): Tighter Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* 1. Campaign Label */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[10.5px] text-[#A08875] tracking-[0.26em] uppercase font-serif font-medium" dir="ltr">
                AUTUMN / WINTER 2026 • ATELIER CAPSULE
              </span>
            </div>

            {/* 2. Main Headline */}
            <div className="space-y-1.5">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-bold tracking-tight leading-[1.18]">
                اصالت، وقار و سادگی
              </h1>
              <p className="font-sans text-base sm:text-lg text-[#6B5F58] font-normal">
                کالکشن دست‌دوز کت، پالتو و شومیزهای فاخر زنانه
              </p>
            </div>

            {/* 3. Short Supporting Text */}
            <p className="text-xs sm:text-[13px] text-[#786C65] font-light leading-relaxed max-w-lg">
              توازن میان خطوط مینیمال معاصر، الیاف ارگانیک و ظرافت دوخت شخصی‌دوزی مزونی. طراحی شده برای کمد کپسولی بانوان جهت تجربه وقار در نهایت آرامش.
            </p>

            {/* 4 & 5. Primary and Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary Dominant CTA */}
              <button
                onClick={onExploreClick}
                className="py-3 px-7 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all text-xs sm:text-sm font-medium shadow-md active:scale-95 cursor-pointer skip-delay"
              >
                مشاهده کالکشن مزون
              </button>

              {/* Secondary Quieter CTA */}
              {currentLook && (
                <button
                  onClick={() => onOpenQuickView(currentLook)}
                  className="py-3 px-5 rounded-full bg-[#FAF6F0] border border-[#D4C5B9] text-[#2A2421] hover:border-[#2A2421] transition-all text-xs sm:text-sm font-normal flex items-center gap-1.5 cursor-pointer skip-delay"
                >
                  <span>بررسی مدل لوک {toPersianDigits(currentIndex + 1)}</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 text-[#A08875]" />
                </button>
              )}
            </div>

            {/* 6. Subtle Trust / Shipping Information */}
            <div className="pt-3 border-t border-[#E8DFD5]/70 flex items-center gap-5 text-[11px] text-[#8E827A]">
              <span>✦ الیاف ۱۰۰٪ طبیعی</span>
              <span>✦ تطابق دقیق سایز</span>
              <span>✦ ارسال بیمه‌شده مزون</span>
            </div>

          </div>

          {/* Left Column (in RTL): Dominant Editorial Fashion Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[3/4] w-full max-w-md lg:max-w-none mx-auto rounded-xl overflow-hidden bg-[#EAE4D7] border border-[#E8DFD5] shadow-sm">
              
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
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none"></div>
                </div>
              ))}

              {/* Subtle Lookbook Controls at Bottom */}
              <div className="absolute inset-x-3.5 bottom-3.5 z-20 flex items-center justify-between text-white p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
                
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#D4C5B9] tracking-wider uppercase font-sans">
                    LOOK {toPersianDigits(currentIndex + 1)} OF {toPersianDigits(looks.length)}
                  </span>
                  <span className="text-xs font-semibold text-white truncate max-w-[170px] sm:max-w-[210px]">
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
