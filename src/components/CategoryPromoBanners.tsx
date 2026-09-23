import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CategoryPromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  onSelectCategory,
}) => {
  const banners = [
    {
      id: 'set',
      tag: 'CAPSULE SET',
      title: 'ست وست و شلوار شکلاتی',
      subtitle: 'جلیقه بافت‌دار + شلوار واید + کمربند چرم',
      image: '/products/vla-st-002.webp',
    },
    {
      id: 'blazer',
      tag: 'TAILORED BLAZERS',
      title: 'کت‌های تک کلاسیک مزونی',
      subtitle: 'مدل‌های آدل و لورن — کرپ مازراتی و فاستونی',
      image: '/products/vla-adl-001.webp',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className="group relative overflow-hidden cursor-pointer bg-[#FAF6F0] border border-[#E8DFD5] hover:border-[#A08875] transition-colors"
          >
            <div className="flex items-stretch">
              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span
                    className="text-[9px] uppercase font-serif text-[#A08875] tracking-[0.18em] font-medium"
                    dir="ltr"
                  >
                    {item.tag}
                  </span>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917] group-hover:text-[#A08875] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6B5F58] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A2421] group-hover:text-[#A08875] transition-colors"
                >
                  <span>مشاهده</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Image */}
              <div className="w-36 sm:w-44 shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
