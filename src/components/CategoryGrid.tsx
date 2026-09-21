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
      title: 'همه کالکشن',
      subtitle: 'ALL PIECES',
      count: '۶ آیتم',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'coat',
      title: 'پالتو و بارانی',
      subtitle: 'COATS',
      count: '۲ مدل',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'blazer',
      title: 'کت و بلیزر',
      subtitle: 'SUITS',
      count: '۲ مدل',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'silk',
      title: 'شومیز و تاپ',
      subtitle: 'SHIRTS',
      count: '۱ مدل',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'trousers',
      title: 'انواع شلوار',
      subtitle: 'TROUSERS',
      count: '۱ مدل',
      image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'bespoke',
      title: 'سفارشی‌دوزی',
      subtitle: 'BESPOKE',
      count: 'آتلیه تهران',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
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
      
      {/* Small Section Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#A08875]" />
          <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1917]">
            دسترسی سریع به دسته‌بندی‌ها
          </h3>
        </div>
        <span className="text-[11px] text-[#8E827A] font-normal">
          انتخاب فوری برای مرور کاتالوگ
        </span>
      </div>

      {/* 2 Columns on Mobile, 3 on Tablet, 6 on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer border p-3 flex flex-col justify-between h-28 sm:h-32 transition-all duration-200 active:scale-97 ${
                isActive
                  ? 'border-[#2A2421] ring-2 ring-[#2A2421]/20 bg-[#FAF6F0] shadow-sm'
                  : 'border-[#E8DFD5] bg-[#FFFFFF] hover:border-[#A08875] hover:shadow-xs'
              }`}
            >
              {/* Background Watermark/Image with Low Opacity */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40"></div>
              </div>

              {/* Top Subtitle / Latin Label */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="text-[9px] text-[#A08875] font-serif font-medium tracking-[0.16em] uppercase"
                  dir="ltr"
                >
                  {cat.subtitle}
                </span>
                <span className="text-[9.5px] text-[#8E827A] font-medium">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Main Title & Indicator */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#E8DFD5]/50">
                <h4 className={`font-display text-xs sm:text-[13px] font-bold transition-colors ${
                  isActive ? 'text-[#2A2421]' : 'text-[#2A2421] group-hover:text-[#A08875]'
                }`}>
                  {cat.title}
                </h4>
                <ArrowLeft className={`w-3 h-3 text-[#A08875] transition-transform group-hover:-translate-x-0.5 ${
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
