import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from './Reveal';

interface CategoryPromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  onSelectCategory,
}) => {
  const banners = [
    {
      id: 'set',
      tag: 'NEW CAPSULE SET',
      title: 'ست وست و شلوار شکلاتی',
      subtitle: 'جلیقه بافت‌دار + شلوار واید + کمربند چرم',
      cta: 'مشاهده ست',
      image: '/products/vla-st-002.webp',
      badge: 'لوک اختصاصی ولا',
      bgClass: 'bg-[#EDE6DE]',
    },
    {
      id: 'blazer',
      tag: 'TAILORED ATELIER',
      title: 'کت‌های تک آدل و لورن',
      subtitle: 'کرپ مازراتی و فاستونی اعلا',
      cta: 'مشاهده کت‌ها',
      image: '/products/vla-adl-001.webp',
      badge: 'پرفروش‌ترین آتلیه',
      bgClass: 'bg-[#F2ECE4]',
    },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-8 select-none">
      
      {/* 2-Column Responsive Banner Grid on Desktop/Tablet, 1-Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {banners.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 100} className="h-full">
          <div
            onClick={() => onSelectCategory(item.id)}
            className={`group relative h-full ${item.bgClass} rounded-2xl overflow-hidden border border-[#E8DFD5] p-5 sm:p-7 flex flex-row items-center justify-between gap-4 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300`}
          >
            {/* Content Side */}
            <div className="flex-1 flex flex-col justify-between space-y-3 z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9.5px] uppercase font-serif text-[#A08875] tracking-[0.2em] font-medium"
                    dir="ltr"
                  >
                    {item.tag}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFFFFF]/90 text-[#2A2421] border border-[#E8DFD5] font-semibold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-[28px] font-bold text-[#1C1917] tracking-tight group-hover:text-[#A08875] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#6B5F58] font-normal leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              {/* White Pill CTA Button (Inspired by Reference 1) */}
              <div className="pt-1">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[#FFFFFF] text-[#2A2421] group-hover:bg-[#2A2421] group-hover:text-[#FAF6F0] text-sm font-bold border border-[#D4C5B9] transition-all shadow-xs active:scale-95"
                >
                  <span>{item.cta}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#A08875] group-hover:text-[#FAF6F0]" />
                </button>
              </div>
            </div>

            {/* Layered Image Frame */}
            <div className="relative w-36 sm:w-44 md:w-48 shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#E8DFD5]/70 shadow-xs">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
};
