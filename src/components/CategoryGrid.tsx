import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'all', title: 'همه محصولات', subtitle: 'ALL PIECES', count: '۳ اثر' },
    { id: 'set', title: 'ست وست و شلوار', subtitle: 'VEST & TROUSERS', count: '۱ ست' },
    { id: 'blazer', title: 'کت و بلیزر', subtitle: 'BLAZERS', count: '۲ مدل' },
    { id: 'bespoke', title: 'شخصی‌دوزی', subtitle: 'BESPOKE', count: 'آتلیه' },
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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-6 select-none">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8DFD5]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`relative flex flex-col justify-between p-4 sm:p-5 h-24 sm:h-28 cursor-pointer transition-colors text-right ${
                isActive
                  ? 'bg-[#2A2421] text-white'
                  : 'bg-white text-[#2A2421] hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[8px] uppercase font-serif tracking-[0.15em] font-medium ${
                    isActive ? 'text-[#D4C5B9]' : 'text-[#A08875]'
                  }`}
                  dir="ltr"
                >
                  {cat.subtitle}
                </span>
                <span
                  className={`text-[9px] font-medium ${
                    isActive ? 'text-[#D4C5B9]' : 'text-[#8E827A]'
                  }`}
                >
                  {cat.count}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h4
                  className={`font-display text-xs sm:text-sm font-semibold ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {cat.title}
                </h4>
                <ArrowLeft
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-[#D4C5B9]' : 'text-[#A08875]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
