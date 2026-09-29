import React from 'react';
import { ArrowLeft, BadgeCheck, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Reveal } from './Reveal';

interface CategoryPromoBannersProps {
  selectedCategory?: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  const trustItems = [
    {
      icon: BadgeCheck,
      title: 'ضمانت اصالت و دوخت',
      desc: 'دوخت تمیز تمام‌مزونی در آتلیه اصفهان',
    },
    {
      icon: ShieldCheck,
      title: 'پرداخت امن و مطمئن',
      desc: 'درگاه‌های معتبر بانکی و کارت‌به‌کارت',
    },
    {
      icon: Truck,
      title: 'ارسال سریع به سراسر کشور',
      desc: 'تحویل با کاور اختصاصی و چوب‌لباسی نفیس',
    },
  ];

  const categoryCards = [
    {
      id: 'set',
      enBadge: 'NEW CAPSULE SET',
      faBadge: 'لوک اختصاصی ولا',
      title: 'ست وست و شلوار شکلاتی',
      subtitle: 'جلیقه بافت‌دار + شلوار واید + کمربند چرم',
      btnText: 'مشاهده ست',
      image: '/products/category-set-card.webp',
      alt: 'ست وست و شلوار شکلاتی ولا',
    },
    {
      id: 'blazer',
      enBadge: 'TAILORED ATELIER',
      faBadge: 'پرفروش‌ترین آتلیه',
      title: 'کت‌های تک آدل و لورن',
      subtitle: 'کرپ مازراتی و فاستونی اعلا',
      btnText: 'مشاهده کت‌ها',
      image: '/products/category-blazer-card.webp',
      alt: 'کت‌های تک آدل و لورن ولا',
    },
  ];

  const handleCardClick = (cardId: string) => {
    if (selectedCategory === cardId) {
      onSelectCategory('all');
    } else {
      onSelectCategory(cardId);
    }
  };

  return (
    <section className="w-full select-none" aria-label="دسته‌بندی و خدمات ولا">
      
      {/* 1. Refined, Decompressed Trust / Service Strip */}
      <div className="w-full bg-[#EFE9E0] dark:bg-[#14100D] border-y border-stone-300/60 dark:border-white/10 py-4 sm:py-5 px-4 sm:px-8 transition-colors duration-300">
        <div className="w-full max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-around gap-5 sm:gap-0">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={idx}>
                <div className="flex items-center justify-center gap-3.5 sm:gap-4 px-4 sm:px-6">
                  {/* Right-Aligned Text Hierarchy in Persian RTL */}
                  <div className="flex flex-col text-right">
                    <span className="text-xs sm:text-[13.5px] font-bold text-[#1C1613] dark:text-white leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#6B5D52] dark:text-[#9E9287] mt-0.5 leading-tight">
                      {item.desc}
                    </span>
                  </div>

                  {/* Minimalist Line Icon */}
                  <div className="w-9 h-9 rounded-full bg-[#E4DBD0] dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Icon
                      className="w-4.5 h-4.5 text-[#8C6D46] dark:text-[#D2B998]"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>

                {/* Vertical Divider between items */}
                {idx < trustItems.length - 1 && (
                  <div
                    className="hidden sm:block h-6 w-[1px] bg-stone-300/60 dark:bg-white/10 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Category Cards Section (Directly matching reference media_1790599930481.png) */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categoryCards.map((card, idx) => {
            const isActive = selectedCategory === card.id;
            return (
              <Reveal key={card.id} delay={idx * 90} className="h-full">
                <div
                  onClick={() => handleCardClick(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }
                  }}
                  aria-pressed={isActive}
                  className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 transition-all duration-300 cursor-pointer overflow-hidden flex flex-row items-center justify-between gap-4 sm:gap-6 ${
                    isActive
                      ? 'bg-[#E7DFC4]/60 dark:bg-[#231B16] border-2 border-[#8C6D46] dark:border-[#C5A880] shadow-xl ring-2 ring-[#C5A880]/30'
                      : 'bg-[#EDE6DC] dark:bg-[#1C1714] border border-[#DDD3C6] dark:border-white/10 hover:border-[#8C6D46]/70 dark:hover:border-[#C5A880]/70 shadow-xs hover:shadow-xl'
                  }`}
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8C6D46]/5 to-transparent dark:from-[#C5A880]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Right Side in RTL: Editorial Typography Hierarchy */}
                  <div className="relative z-10 flex flex-col items-start text-right flex-1 min-w-0 pr-1">
                    
                    {/* Badge Row: Latin tracked label + Persian pill badge */}
                    <div className="flex items-center flex-wrap gap-2 mb-2 sm:mb-2.5">
                      <span
                        className="font-latin text-[10px] sm:text-[11px] font-bold text-[#8C6D46] dark:text-[#C5A880] tracking-[0.16em] uppercase"
                        dir="ltr"
                      >
                        {card.enBadge}
                      </span>
                      <span className="text-stone-400 dark:text-stone-600 text-xs">•</span>
                      <span className="bg-white/90 dark:bg-white/10 text-[#2B231D] dark:text-[#F2E9DC] px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-stone-300/60 dark:border-white/10 shadow-2xs">
                        {card.faBadge}
                      </span>
                    </div>

                    {/* Headline: Persian Display Font (Estedad) */}
                    <h3
                      className={`font-display text-lg sm:text-xl lg:text-[22px] font-bold transition-colors leading-tight mb-1 sm:mb-1.5 ${
                        isActive
                          ? 'text-[#8C6D46] dark:text-[#C5A880]'
                          : 'text-[#181310] dark:text-white group-hover:text-[#8C6D46] dark:group-hover:text-[#C5A880]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Subtitle / Fabric info */}
                    <p className="font-sans text-xs sm:text-[13px] text-[#6B5D52] dark:text-[#A89C92] leading-normal mb-3 sm:mb-4">
                      {card.subtitle}
                    </p>

                    {/* Pill Button CTA */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[12.5px] font-bold transition-all duration-200 shadow-2xs group-hover:shadow-sm ${
                        isActive
                          ? 'bg-[#181310] text-[#FAF7F2] dark:bg-[#C5A880] dark:text-[#120E0C]'
                          : 'bg-white hover:bg-[#FAF7F2] text-[#181310] dark:bg-[#2A221D] dark:hover:bg-[#342B24] dark:text-white border border-stone-300/70 dark:border-white/10 group-hover:border-[#8C6D46]/50 dark:group-hover:border-[#C5A880]/50'
                      }`}
                    >
                      <span>{card.btnText}</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                    </div>

                  </div>

                  {/* Left Side in RTL: Inset Rounded High-Res Image Box */}
                  <div className="relative z-10 w-[112px] sm:w-[130px] lg:w-[150px] aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-black/5 dark:border-white/10 shadow-xs bg-[#E5DCD2] dark:bg-[#251E1A]">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Reset Filter Pill when a category is active */}
        {selectedCategory !== 'all' && (
          <div className="mt-3 flex items-center justify-end">
            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D46] dark:text-[#C5A880] hover:underline cursor-pointer px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>نمایش همه آثار مزون ولا</span>
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
