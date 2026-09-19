import React from 'react';
import { ArrowLeft, Sparkles, Eye, Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

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
      
      {/* Section Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8DFD5] gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#A08875] tracking-[0.24em] uppercase font-serif font-medium" dir="ltr">
              EDITORIAL SELECTION • CAPSULE 2026
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#1C1917] font-bold tracking-tight">
            منتخب کالکشن مزون
          </h2>
          <p className="text-xs text-[#786C65] font-light">
            نگاه اختصاصی استایلیست‌های آتلیه ولا به استایل پاییز و زمستان
          </p>
        </div>

        <button
          onClick={onViewAllClick}
          className="flex items-center gap-2 text-xs font-medium text-[#2A2421] hover:text-[#A08875] transition-colors self-start md:self-auto cursor-pointer skip-delay"
        >
          <span>مشاهده تمام آثار کالکشن</span>
          <ArrowLeft className="w-4 h-4 text-[#A08875]" />
        </button>
      </div>

      {/* Editorial Grid: 1 Dominant Feature (5 cols) + 3 Supporting Items (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Dominant Featured Showcase Card (5 cols) */}
        <div
          onClick={() => onOpenModal(mainFeatured)}
          className="lg:col-span-5 group relative flex flex-col justify-between bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          {/* Main Visual */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE8]">
            <img
              src={mainFeatured.image}
              alt={mainFeatured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Editorial Badge */}
            <div className="absolute top-3.5 right-3.5 bg-[#2A2421]/90 backdrop-blur-md text-[#FAF6F0] text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-xs z-10">
              <Sparkles className="w-3 h-3 text-[#D4C5B9]" />
              <span>لوک برگزیده مزون</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => onToggleWishlist(mainFeatured, e)}
              className={`absolute top-3.5 left-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay ${
                isMainWishlisted
                  ? 'bg-[#FAF6F0] text-[#A08875] shadow-xs'
                  : 'bg-black/25 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#2A2421]'
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
              <div className="w-full py-2.5 px-4 rounded-full bg-[#2A2421]/90 backdrop-blur-sm text-[#FAF6F0] text-xs flex items-center justify-center gap-2 shadow-lg">
                <Eye className="w-3.5 h-3.5 text-[#D4C5B9]" />
                <span>بررسی جزییات لوک و انتخاب سایز</span>
              </div>
            </div>
          </div>

          {/* Details Bar */}
          <div className="p-5 flex items-center justify-between border-t border-[#E8DFD5]">
            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A08875] font-sans font-medium">
                {mainFeatured.categoryLabel} • {mainFeatured.fabric}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917]">
                {mainFeatured.title}
              </h3>
              <div className="text-sm font-bold text-[#2A2421] pt-0.5">
                {mainFeatured.priceFormatted}
              </div>
            </div>

            <button
              onClick={(e) => onQuickAdd(mainFeatured, e)}
              className="w-10 h-10 rounded-full bg-[#2A2421] text-white flex items-center justify-center hover:bg-[#140F0D] transition-transform active:scale-95 shadow-xs cursor-pointer skip-delay"
              title="افزودن سریع به سبد خرید"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Supporting Products Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
