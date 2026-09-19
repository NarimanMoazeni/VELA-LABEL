import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface EditorialCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const EditorialCategories: React.FC<EditorialCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'coat',
      label: 'پالتو و بارانی',
      subtitle: 'COATS & OUTERWEAR',
      description: 'پشم مرینوس و کشمیر گرم‌بالا',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'blazer',
      label: 'کت و بلیزر',
      subtitle: 'SUITS & TAILORING',
      description: 'لینن سنگشور و کرپ ارگانیک',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 'silk',
      label: 'شومیز و تاپ',
      subtitle: 'SHIRTS & BLOUSES',
      description: 'ابریشم ۱۰۰٪ طبیعی توت فرانسه',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 select-none">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer border border-[#E8DFD5] bg-[#EAE4D7] shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Background Fashion Photo */}
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5 transition-opacity duration-300"></div>

            {/* Content Layer (Bottom Anchored) */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white space-y-1.5">
              <span className="text-[9.5px] sm:text-[10px] tracking-[0.24em] uppercase text-[#D4C5B9] font-sans font-medium">
                {cat.subtitle}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F5F0EB] transition-colors">
                {cat.label}
              </h3>
              <p className="text-[11px] text-[#E8DFD5]/90 font-light line-clamp-1">
                {cat.description}
              </p>

              {/* Minimal View Link */}
              <div className="flex items-center gap-1.5 pt-2 text-xs text-[#FAF6F0] font-medium group-hover:gap-2.5 transition-all">
                <span>مشاهده دسته‌بندی</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#D4C5B9]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
