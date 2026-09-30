import React, { useState } from 'react';
import { Eye, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';
import { toPersianDigits } from '../data/products';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenModal,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
  index = 0,
}) => {
  // Gallery: character shot first, hanger shot second.
  // Missing uploads are filtered out at runtime so nothing ever looks broken.
  const all = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [bad, setBad] = useState<string[]>([]);
  const [gIndex, setGIndex] = useState(0);
  const list = all.filter((g) => !bad.includes(g));
  const safeList = list.length > 0 ? list : [product.image];
  const current = Math.min(gIndex, safeList.length - 1);

  const markBad = (src: string) => {
    setBad((prev) => (prev.includes(src) ? prev : [...prev, src]));
  };

  const stepGallery = (d: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    setGIndex((safeList.length + current + d) % safeList.length);
  };

  return (
    <div
      onClick={() => onOpenModal(product)}
      style={{ animationDelay: `${index * 70}ms` }}
      className="group relative flex flex-col w-full max-w-[340px] h-full bg-[#FFFFFF] dark:bg-[#1C1714] rounded-2xl overflow-hidden border border-[#E8DFD5] dark:border-white/10 shadow-xs hover:border-[#8C6D46] dark:hover:border-[#C5A880] hover:shadow-[0_20px_44px_-20px_rgba(42,36,33,0.35)] transition-all duration-300 cursor-pointer stagger-item select-none"
      id={`product-card-${product.id}`}
    >
      {/* 1. Visual Frame: Large 3:4 Aspect Ratio Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF6F0] dark:bg-[#14100D]">

        <SafeImage
          key={safeList[current]}
          src={safeList[current]}
          fallback={product.image}
          alt={product.title}
          onError={() => markBad(safeList[current])}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gallery arrows (character <-> hanger) */}
        {safeList.length > 1 && (
          <>
            <button
              onClick={(e) => stepGallery(1, e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-md text-white flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 hover:bg-black/55 cursor-pointer z-10"
              title="عکس قبلی"
              aria-label="عکس قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => stepGallery(-1, e)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-md text-white flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 hover:bg-black/55 cursor-pointer z-10"
              title="عکس بعدی"
              aria-label="عکس بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="absolute bottom-3 right-2.5 text-[10px] font-semibold text-white bg-black/35 backdrop-blur-md rounded-full px-2 py-0.5 z-10" dir="ltr">
              {toPersianDigits(current + 1)} / {toPersianDigits(safeList.length)}
            </span>
          </>
        )}

        {/* Badge Indicator (Top Right in RTL) */}
        {product.badge && (
          <div
            className={`absolute top-2.5 right-2.5 backdrop-blur-md text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full z-10 shadow-xs ${
              product.badgeType === 'limited'
                ? 'bg-[#181310]/90 dark:bg-black/70 text-[#FAF7F2] border border-white/15'
                : 'bg-[#8C6D46] dark:bg-[#C5A880] text-white dark:text-[#120E0C]'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button (Top Left in RTL) */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay active:scale-125 ${
            isWishlisted
              ? 'bg-[#FAF6F0] dark:bg-[#251E1A] text-[#8C6D46] dark:text-[#C5A880] shadow-xs'
              : 'bg-black/25 dark:bg-black/40 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#181310]'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`w-4 h-4 crossfade-icon ${
              isWishlisted ? 'fill-[#8C6D46] dark:fill-[#C5A880] text-[#8C6D46] dark:text-[#C5A880]' : ''
            }`}
          />
        </button>

        {/* Quick view: opens product modal */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#181310] dark:bg-[#C5A880] text-[#FAF6F0] dark:text-[#120E0C] hover:bg-[#2C231E] dark:hover:bg-[#D4B890] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer z-10 skip-delay"
          title="مشاهده و افزودن به سبد"
          aria-label="مشاهده محصول"
        >
          <Eye className="w-4 h-4 text-[#D4C5B9] dark:text-[#120E0C]" />
        </button>

      </div>

      {/* 2. Product Information Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2 text-center">
        <div className="space-y-1">
          {/* Category / Code */}
          <div className="text-[11px] text-[#8E827A] dark:text-[#A89C92] font-semibold">
            {product.categoryLabel} • {product.code}
          </div>

          {/* Product Title: high contrast in Light Mode (#181310 -> #7A5833 on hover) and Dark Mode (white -> #D4B890) */}
          <h3 className="font-display text-sm sm:text-[15px] font-bold text-[#181310] dark:text-white group-hover:text-[#7A5833] dark:group-hover:text-[#D4B890] transition-colors leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Price & Size */}
        <div className="pt-2 border-t border-[#E8DFD5]/70 dark:border-white/10 flex flex-col items-center gap-1">
          <div className="text-sm sm:text-base font-extrabold text-[#181310] dark:text-[#E5CCA8]">
            {product.priceFormatted}
          </div>
          <div className="text-xs text-[#8E827A] dark:text-[#A89C92]">
            سایز: <span className="font-bold text-[#181310] dark:text-white">{product.sizes.join(' • ')}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
