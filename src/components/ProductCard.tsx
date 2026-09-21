import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

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
  const [isHovered, setIsHovered] = useState(false);
  const secondaryImage = product.gallery && product.gallery.length > 1 ? product.gallery[1] : null;

  return (
    <div
      onClick={() => onOpenModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:border-[#A08875]/80 hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1.5 cursor-pointer stagger-item select-none"
      id={`product-card-${product.id}`}
    >
      {/* 1. Visual Frame: Large 3:4 Aspect Ratio Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF6F0]">
        
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            secondaryImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image Swap on Hover (Desktop only) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.title} - زاویه دیگر`}
            className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge Indicator (Top Right in RTL) */}
        {product.badge && (
          <div
            className={`absolute top-2.5 right-2.5 backdrop-blur-md text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full z-10 shadow-xs ${
              product.badgeType === 'limited'
                ? 'bg-[#2A2421]/90 text-[#FADDCE]'
                : 'bg-[#A08875] text-[#FFFFFF]'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button (Top Left in RTL) */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay ${
            isWishlisted
              ? 'bg-[#FAF6F0] text-[#A08875] shadow-xs'
              : 'bg-black/25 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#2A2421]'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`w-4 h-4 crossfade-icon ${
              isWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''
            }`}
          />
        </button>

        {/* Circular Floating Quick-Add Button (Matching Reference 3 & 4) */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer z-10 skip-delay"
          title="افزودن سریع به سبد خرید"
          aria-label="خرید سریع"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
        </button>

      </div>

      {/* 2. Product Information Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2 text-center">
        <div className="space-y-1">
          {/* Category / Code */}
          <div className="text-[10px] text-[#8E827A] font-medium">
            {product.categoryLabel} • {product.code}
          </div>

          {/* Product Title */}
          <h3 className="font-display text-xs sm:text-sm font-bold text-[#1C1917] group-hover:text-[#A08875] transition-colors leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Price & Size */}
        <div className="pt-2 border-t border-[#E8DFD5]/70 flex flex-col items-center gap-1">
          <div className="text-xs sm:text-[13px] font-bold text-[#2A2421]">
            {product.priceFormatted}
          </div>
          <div className="text-[10px] text-[#8E827A]">
            سایزبندی: <span className="font-medium text-[#2A2421]">{product.sizes.join(' • ')}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
