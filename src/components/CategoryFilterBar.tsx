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
    { value: 'featured', label: 'جدیدترین' },
    { value: 'price-desc', label: 'گران‌ترین' },
    { value: 'price-asc', label: 'ارزان‌ترین' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'جدیدترین';

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
      className="sticky top-[72px] sm:top-[76px] z-30 bg-[#F5F0EB]/95 backdrop-blur-md py-3 border-b border-[#E8DFD5] select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Category tabs — clean underline style */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'text-[#2A2421] font-semibold border-b-2 border-[#2A2421]'
                    : 'text-[#786C65] hover:text-[#2A2421] border-b-2 border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Count + Sort */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          <span className="text-[#786C65] hidden sm:inline">
            {toPersianDigits(productCount)} اثر
          </span>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 text-xs text-[#2A2421] font-medium cursor-pointer hover:text-[#A08875] transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A08875]" />
              <span>{currentSortLabel}</span>
              <ChevronDown className="w-3 h-3 text-[#786C65]" />
            </button>

            {isSortOpen && (
              <div className="absolute left-0 mt-2 w-36 bg-white border border-[#E8DFD5] shadow-lg py-1 z-50 text-xs">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { onSortChange(opt.value); setIsSortOpen(false); }}
                    className={`w-full text-right px-3 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                      sortBy === opt.value
                        ? 'bg-[#FAF6F0] text-[#2A2421] font-semibold'
                        : 'text-[#5A504B] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && <Check className="w-3 h-3 text-[#A08875]" />}
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
