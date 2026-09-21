import React from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
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

  const mainFeatured = products.find((p) => p.category === 'set') || products[0];
  const supportingProducts = products.filter((p) => p.id !== mainFeatured.id);
  const isMainWishlisted = wishlist.some((item) => item.id === mainFeatured.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 select-none">
      
      {/* Centered Decorative Section Header */}
      <SectionHeader
        englishLabel="FEATURED LOOK • VELA ATELIER"
        title="لوک شاخص کالکشن پاییز"
        subtitle="ست دست‌دوز وست و شلوار شکلاتی با دوخت انحصاری مزون ولا"
        actionText="مشاهده تمام آثار"
        onAction={onViewAllClick}
        className="mb-6"
      />

      {/* 1 Dominant Showcase (6 cols) + 2 Supporting Blazers (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Dominant Featured Showcase Card (6 cols) */}
        <div
          onClick={() => onOpenModal(mainFeatured)}
          className="lg:col-span-6 group relative flex flex-col justify-between bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-sm hover:shadow-xl hover:border-[#A08875] transition-all duration-300 cursor-pointer"
        >
          {/* Main Visual Frame */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF6F0]">
            <img
              src={mainFeatured.image}
              alt={mainFeatured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Top Badge */}
            <div className="absolute top-3 right-3 bg-[#2A2421]/90 backdrop-blur-md text-[#FAF6F0] text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs z-10">
              <span className="text-[#D4C5B9]">✦</span>
              <span>لوک برگزیده فصل</span>
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
                <span>بررسی مشخصات ست و انتخاب سایز</span>
              </div>
            </div>
          </div>

          {/* Bottom Details Bar */}
          <div className="p-5 flex items-center justify-between border-t border-[#E8DFD5]">
            <div className="space-y-1">
              <span className="text-[10.5px] text-[#A08875] font-semibold">
                {mainFeatured.categoryLabel} • {mainFeatured.code}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1917]">
                {mainFeatured.title}
              </h3>
              <div className="text-sm sm:text-base font-bold text-[#2A2421]">
                {mainFeatured.priceFormatted}
              </div>
            </div>

            <button
              onClick={(e) => onQuickAdd(mainFeatured, e)}
              className="w-10 h-10 rounded-full bg-[#2A2421] text-white flex items-center justify-center hover:bg-[#140F0D] transition-transform active:scale-95 shadow-md cursor-pointer skip-delay"
              title="افزودن سریع به سبد خرید"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
            </button>
          </div>
        </div>

        {/* 2 Supporting Blazers (6 cols: 2 cols side-by-side) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
