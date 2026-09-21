import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
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
      style={{ animationDelay: `${index * 50}ms` }}
      className="group flex flex-col bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer stagger-item select-none"
      id={`product-card-${product.id}`}
    >
      {/* 1. Visual Priority: Large Image with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EDE8]">
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

        {/* Single Refined Badge */}
        {product.badge && (
          <div
            className={`absolute top-2.5 right-2.5 backdrop-blur-md text-[9px] font-medium px-2 py-0.5 rounded-full z-10 ${
              product.badgeType === 'limited'
                ? 'bg-[#2A2421]/90 text-[#FADDCE]'
                : product.badgeType === 'new'
                ? 'bg-[#A08875] text-white'
                : 'bg-[#FAF6F0]/90 text-[#2A2421] border border-[#E8DFD5]'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 left-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay ${
            isWishlisted
              ? 'bg-[#FAF6F0] text-[#A08875] shadow-xs'
              : 'bg-black/30 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#2A2421]'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="علاقه‌مندی"
        >
          <Heart
            className={`w-3.5 h-3.5 crossfade-icon ${
              isWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''
            }`}
          />
        </button>
      </div>

      {/* 2 - 5. Clean Information Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          {/* Category / Fabric Meta */}
          <div className="text-[10px] text-[#8E827A] font-medium mb-1">
            {product.categoryLabel}
          </div>

          {/* Product Name */}
          <h3 className="font-display text-xs sm:text-sm font-semibold text-[#1C1917] line-clamp-1 group-hover:text-[#A08875] transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Compact Size Chips */}
          <div className="flex items-center gap-1 text-[9.5px] text-[#8E827A] pt-1">
            <span>سایز:</span>
            <span className="font-medium text-[#2A2421]">
              {product.sizes.join(' • ')}
            </span>
          </div>
        </div>

        {/* Price & Quick Add */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5]/60">
          <span className="text-xs sm:text-sm font-semibold text-[#2A2421]">
            {product.priceFormatted}
          </span>

          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="w-7 h-7 rounded-full bg-[#2A2421] text-[#FAF6F0] flex items-center justify-center hover:bg-[#140F0D] transition-transform active:scale-95 shadow-xs cursor-pointer skip-delay"
            title="افزودن سریع به سبد"
            aria-label="افزودن سریع"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
