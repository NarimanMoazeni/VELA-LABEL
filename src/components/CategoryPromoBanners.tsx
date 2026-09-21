import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CategoryPromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  onSelectCategory,
}) => {
  const promos = [
    {
      id: 'coat',
      tag: 'OUTERWEAR CAPSULE',
      title: 'پالتو، ترنچ و بارانی',
      description: 'دوخت ظریف با پشم مرینوس گرم‌بالا و پارچه ایتالیایی',
      cta: 'مشاهده مجموعه پالتو',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=85',
      bgClass: 'bg-[#F2ECE4]',
      badge: 'پاییز و زمستان',
    },
    {
      id: 'blazer',
      tag: 'ATELIER TAILORING',
      title: 'کت و بلیزرهای شخصی‌دوز',
      description: 'طراحی ساختاریافته با کرپ مرغوب و آستر دوزی اختصاصی',
      cta: 'مشاهده مجموعه کت',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
      bgClass: 'bg-[#EDE6DE]',
      badge: 'سفارشی‌دوزی',
    },
    {
      id: 'silk',
      tag: 'PURE SILK & LINEN',
      title: 'شومیز و تاپ‌های ابریشم',
      description: 'لطافت ۱۰۰٪ ابریشم طبیعی و لینن تنفس‌پذیر سنگ‌شور',
      cta: 'مشاهده مجموعه شومیز',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85',
      bgClass: 'bg-[#EDE8E1]',
      badge: 'کپسولی تابستان و پاییز',
    },
    {
      id: 'trousers',
      tag: 'MONOCHROME TROUSERS',
      title: 'انواع شلوارهای کپسولی',
      description: 'الگوی اختصاصی راسته و واید با ریزش شکیل روی اندام',
      cta: 'مشاهده مجموعه شلوار',
      image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85',
      bgClass: 'bg-[#F0EBE3]',
      badge: 'فیت بی‌نقص',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 select-none">
      
      {/* 2-Column Responsive Banner Grid on Tablet/Desktop, 1-Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            onClick={() => onSelectCategory(promo.id)}
            className={`group relative ${promo.bgClass} rounded-2xl overflow-hidden border border-[#E8DFD5] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300`}
          >
            {/* Right/Top: Content Block */}
            <div className="flex-1 flex flex-col justify-between space-y-3 z-10 w-full sm:w-auto">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9.5px] sm:text-[10px] uppercase font-serif text-[#A08875] tracking-[0.2em] font-medium"
                    dir="ltr"
                  >
                    {promo.tag}
                  </span>
                  <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#786C65] border border-[#E8DFD5]">
                    {promo.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight group-hover:text-[#A08875] transition-colors leading-snug">
                  {promo.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#6B5F58] font-normal leading-relaxed line-clamp-2">
                  {promo.description}
                </p>
              </div>

              {/* Small Refined CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#2A2421] text-[#FAF6F0] group-hover:bg-[#140F0D] text-xs font-medium transition-all shadow-xs group-hover:gap-2.5 active:scale-95"
                >
                  <span>{promo.cta}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D4C5B9]" />
                </button>
              </div>

            </div>

            {/* Left/Bottom: Layered Fashion Image with 3:4 Aspect Ratio */}
            <div className="relative w-full sm:w-44 md:w-52 shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E8DFD5]/60 shadow-xs">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
