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
  // Editorial looks fallback
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
    <section className="relative w-full overflow-hidden bg-[#F5F0EB] py-10 sm:py-16 lg:py-20 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Right Column (in RTL): Clean Minimalist Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Latin Subtitle / Kicker */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] text-[#A08875] tracking-[0.28em] uppercase font-serif font-medium" dir="ltr">
                AUTUMN / WINTER 2026 • ATELIER CAPSULE
              </span>
            </div>

            {/* Quiet Luxury Persian Headline - Pure Yekan Bakh / Sans, No Cursive */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-bold tracking-tight leading-[1.15]">
                اصالت، وقار و سادگی
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[#786C65] font-light pt-1">
                کالکشن دست‌دوز کت، پالتو و شومیزهای فاخر زنانه
              </p>
            </div>

            {/* Understated Editorial Description */}
            <p className="text-xs sm:text-sm text-[#5A504B] font-light leading-relaxed max-w-lg">
              توازن میان خطوط مینیمال پاریسی، الیاف ارگانیک و ظرافت دوخت شخصی‌دوزی مزونی. هر لباس برای کمد کپسولی بانوان مستقل طراحی شده تا زیبایی را در نهایت آرامش تجربه کنند.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="py-3.5 px-8 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all duration-200 text-xs sm:text-sm font-medium shadow-md active:scale-95 cursor-pointer skip-delay"
              >
                مشاهده کالکشن مزون
              </button>

              {currentLook && (
                <button
                  onClick={() => onOpenQuickView(currentLook)}
                  className="py-3.5 px-6 rounded-full bg-[#FAF6F0] border border-[#D4C5B9] text-[#2A2421] hover:border-[#2A2421] transition-all duration-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-xs cursor-pointer skip-delay"
                >
                  <span>بررسی مدل لوک {toPersianDigits(currentIndex + 1)}</span>
                  <ArrowUpLeft className="w-4 h-4 text-[#A08875]" />
                </button>
              )}
            </div>

            {/* Minimalist Trust Indicator Line */}
            <div className="pt-4 border-t border-[#E8DFD5] flex items-center gap-6 text-[11px] text-[#786C65]">
              <span>✦ الیاف ۱۰۰٪ طبیعی</span>
              <span>✦ ضمانت تطابق سایز</span>
              <span>✦ ارسال بیمه‌شده مزون</span>
            </div>

          </div>

          {/* Left Column (in RTL): Interactive Morph Lookbook Slider */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-[#EAE4D7] shadow-xl border border-[#E8DFD5]">
              
              {/* Morphing Image with Smooth Scale & Opacity Transition */}
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
                  {/* Subtle vignette gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none"></div>
                </div>
              ))}

              {/* Slider Controls & Look Caption (Bottom Overlay) */}
              <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between text-white p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                
                {/* Current Look Title & Fabric */}
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#D4C5B9] tracking-wider uppercase font-sans">
                    LOOK {toPersianDigits(currentIndex + 1)} OF {toPersianDigits(looks.length)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-xs truncate max-w-[180px] sm:max-w-[220px]">
                    {currentLook?.title}
                  </span>
                </div>

                {/* Next / Previous Controls */}
                <div className="flex items-center gap-1.5" dir="ltr">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="لوک قبلی"
                    aria-label="لوک قبلی"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="لوک بعدی"
                    aria-label="لوک بعدی"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
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
