import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'all',
      title: 'همه محصولات',
      subtitle: 'ALL PIECES',
      count: '۳ اثر موجود',
      image: '/products/vla-st-002.webp',
      badge: 'کالکشن کامل',
    },
    {
      id: 'set',
      title: 'ست وست و شلوار',
      subtitle: 'VEST & TROUSERS',
      count: '۱ ست کامل',
      image: '/products/vla-st-002.webp',
      badge: 'لوک اختصاصی',
    },
    {
      id: 'blazer',
      title: 'کت و بلیزر تک',
      subtitle: 'TAILORED BLAZERS',
      count: '۲ مدل آدل و لورن',
      image: '/products/vla-adl-001.webp',
      badge: 'پرفروش‌ترین',
    },
    {
      id: 'bespoke',
      title: 'شخصی‌دوزی مزون',
      subtitle: 'BESPOKE ATELIER',
      count: 'آتلیه تهران',
      image: '/products/vla-lrn-001.webp',
      badge: 'پرو اختصاصی',
    },
  ];

  const handleClick = (id: string) => {
    if (id === 'bespoke') {
      const el = document.getElementById('bespoke-appointment');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectCategory(id);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 select-none">
      
      {/* 2 Columns on Mobile, 4 Columns on Desktop (Inspired by Reference 6) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border p-3.5 sm:p-4 flex flex-col justify-between h-32 sm:h-36 transition-all duration-200 active:scale-97 ${
                isActive
                  ? 'border-[#2A2421] ring-2 ring-[#2A2421]/20 bg-[#FAF6F0] shadow-sm'
                  : 'border-[#E8DFD5] bg-[#FFFFFF] hover:border-[#A08875] hover:shadow-xs'
              }`}
            >
              {/* Soft Watermark Image */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40"></div>
              </div>

              {/* Top Subtitle */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="text-[9px] text-[#A08875] font-serif font-medium tracking-[0.16em] uppercase"
                  dir="ltr"
                >
                  {cat.subtitle}
                </span>
                <span className="text-[9px] text-[#8E827A] px-1.5 py-0.5 rounded bg-[#FAF6F0] border border-[#E8DFD5]/60 font-medium">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Title & Action */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#E8DFD5]/60">
                <h4 className={`font-display text-xs sm:text-sm font-bold transition-colors ${
                  isActive ? 'text-[#2A2421]' : 'text-[#2A2421] group-hover:text-[#A08875]'
                }`}>
                  {cat.title}
                </h4>
                <ArrowLeft className={`w-3.5 h-3.5 text-[#A08875] transition-transform group-hover:-translate-x-0.5 ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
