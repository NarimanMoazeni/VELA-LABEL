import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
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
      className="group relative flex flex-col bg-white cursor-pointer stagger-item select-none"
      id={`product-card-${product.id}`}
    >
      {/* Image Frame — 3:4 aspect, flat, no rounded corners, no shadows */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EB]">
        {/* Primary image */}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            secondaryImage && isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Secondary image swap (desktop) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.title} - نمای دیگر`}
            className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge — simple text, no pill */}
        {product.badge && (
          <div className="absolute top-3 right-3 text-[10px] font-medium text-white bg-[#2A2421]/80 px-2 py-0.5 z-10">
            {product.badge}
          </div>
        )}

        {/* Wishlist — appears on hover (desktop), always visible (mobile) */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3 left-3 w-7 h-7 flex items-center justify-center z-10 cursor-pointer transition-all ${
            isWishlisted
              ? 'text-[#A08875] opacity-100'
              : 'text-white opacity-0 group-hover:opacity-100 md:opacity-0'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="برگزیده"
        >
          <Heart
            className={`w-4 h-4 drop-shadow-sm ${
              isWishlisted ? 'fill-[#A08875]' : ''
            }`}
          />
        </button>

        {/* Quick-add button — bottom center, appears on hover */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 w-9 h-9 bg-[#2A2421] text-white flex items-center justify-center cursor-pointer z-10 hover:bg-[#1a1715]"
          title="افزودن به سبد"
          aria-label="خرید سریع"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Product info — minimal, left-aligned (RTL: right-aligned) */}
      <div className="py-3 space-y-1">
        {/* Category label */}
        <div className="text-[10px] text-[#8E827A] font-medium">
          {product.categoryLabel}
        </div>

        {/* Title */}
        <h3 className="font-display text-sm font-semibold text-[#1C1917] leading-snug group-hover:text-[#A08875] transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="text-sm font-bold text-[#2A2421]">
          {product.priceFormatted}
        </div>
      </div>
    </div>
  );
};
