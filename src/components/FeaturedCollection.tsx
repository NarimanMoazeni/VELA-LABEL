import React from 'react';
import { Eye, Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';

interface FeaturedCollectionProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onViewAllClick: () => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  onOpenModal,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
  onViewAllClick,
}) => {
  if (!products || products.length === 0) return null;

  const mainFeatured = products[0];
  const supportingProducts = products.slice(1, 4);
  const isMainWishlisted = wishlist.some((item) => item.id === mainFeatured.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 select-none">
      
      {/* Section Header with Minimal Divider */}
      <SectionHeader
        englishLabel="EDITORIAL SELECTION • CAPSULE 2026"
        title="منتخب استایلیست‌های مزون ولا"
        subtitle="نگاه تخصصی آتلیه ولا به ظرافت دوخت و هم‌نشینی الیاف در کالکشن کپسولی"
        actionText="مشاهده تمام آثار کالکشن"
        onAction={onViewAllClick}
        className="mb-6"
      />

      {/* Grid: 1 Dominant Showcase (5 cols) + 3 Supporting Items (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Dominant Featured Showcase Card (5 cols) */}
        <div
          onClick={() => onOpenModal(mainFeatured)}
          className="lg:col-span-5 group relative flex flex-col justify-between bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          {/* Main Visual with 3:4 Aspect Ratio */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE8]">
            <img
              src={mainFeatured.image}
              alt={mainFeatured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Editorial Badge */}
            <div className="absolute top-3 right-3 bg-[#2A2421]/90 backdrop-blur-md text-[#FAF6F0] text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs z-10">
              <span className="text-[#D4C5B9]">✦</span>
              <span>لوک برگزیده کپسول</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => onToggleWishlist(mainFeatured, e)}
              className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay ${
                isMainWishlisted
                  ? 'bg-[#FAF6F0] text-[#A08875] shadow-xs'
                  : 'bg-black/30 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#2A2421]'
              }`}
              title={isMainWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
            >
              <Heart
                className={`w-4 h-4 crossfade-icon ${
                  isMainWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''
                }`}
              />
            </button>

            {/* Quick View Hover Strip */}
            <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-250 hidden sm:flex z-10">
              <div className="w-full py-2.5 px-4 rounded-full bg-[#2A2421]/90 backdrop-blur-sm text-[#FAF6F0] text-xs flex items-center justify-center gap-2 shadow-md">
                <Eye className="w-3.5 h-3.5 text-[#D4C5B9]" />
                <span>بررسی جزییات و انتخاب سایز</span>
              </div>
            </div>
          </div>

          {/* Bottom Details Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-t border-[#E8DFD5]">
            <div className="space-y-0.5">
              <span className="text-[10.5px] text-[#A08875] font-medium">
                {mainFeatured.categoryLabel} • {mainFeatured.fabric}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1917]">
                {mainFeatured.title}
              </h3>
              <div className="text-xs sm:text-sm font-semibold text-[#2A2421] pt-0.5">
                {mainFeatured.priceFormatted}
              </div>
            </div>

            <button
              onClick={(e) => onQuickAdd(mainFeatured, e)}
              className="w-9 h-9 rounded-full bg-[#2A2421] text-white flex items-center justify-center hover:bg-[#140F0D] transition-transform active:scale-95 shadow-xs cursor-pointer skip-delay"
              title="افزودن سریع به سبد خرید"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Supporting Products (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {supportingProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onOpenModal={onOpenModal}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
