import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories: Array<{ id: string; label: string; hasStar?: boolean }>;
  productCount: number;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categories,
  productCount,
  sortBy,
  onSortChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'featured', label: 'جدیدترین کالکشن مزون' },
    { value: 'price-desc', label: 'قیمت: از بیشترین به کمترین' },
    { value: 'price-asc', label: 'قیمت: از کمترین به بیشترین' },
    { value: 'popular', label: 'محبوب‌ترین نگاه استایلیست‌ها' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'جدیدترین کالکشن';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      id="catalog-filter-bar"
      className="sticky top-28 z-30 bg-[#F5F0EB]/95 backdrop-blur-md py-3 border-y border-[#E8DFD5] shadow-xs transition-all select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Categories Navigation (Horizontal Scroll with Clean Luxury Style) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#2A2421] text-[#FAF6F0] shadow-sm'
                    : 'bg-[#FAF6F0] text-[#5A504B] hover:text-[#2A2421] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                }`}
              >
                <span>{cat.label}</span>
                {cat.hasStar && (
                  <span className="text-[#D4C5B9] text-[10px]">✦</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Info & Custom Sort Selector */}
        <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto text-xs">
          
          {/* Active Product Count */}
          <span className="text-[#786C65] text-xs whitespace-nowrap">
            نمایش <strong className="text-[#2A2421] font-bold">{toPersianDigits(productCount)}</strong> آیتم کالکشن
          </span>

          {/* Custom Luxury Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#FFFFFF] border border-[#D4C5B9] px-3.5 py-1.5 rounded-full text-xs text-[#2A2421] font-medium hover:border-[#2A2421] transition-all shadow-xs cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A08875]" />
              <span>{currentSortLabel}</span>
              <ChevronDown className="w-3 h-3 text-[#786C65]" />
            </button>

            {isSortOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl shadow-xl py-1.5 z-50 overflow-hidden text-xs">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-right px-3.5 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                      sortBy === opt.value
                        ? 'bg-[#FAF6F0] text-[#2A2421] font-bold'
                        : 'text-[#5A504B] hover:bg-[#FAF6F0] hover:text-[#2A2421]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && (
                      <Check className="w-3.5 h-3.5 text-[#A08875]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};