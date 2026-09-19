import React from 'react';
import { Plus, Heart, Eye } from 'lucide-react';
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
  return (
    <div
      onClick={() => onOpenModal(product)}
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer stagger-item select-none"
      id={`product-card-${product.id}`}
    >
      {/* Visual Container (3:4 Ratio) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EDE8]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Minimalist Floating Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 right-3 backdrop-blur-md text-[10px] font-medium px-2.5 py-1 rounded-full shadow-xs z-10 ${
              product.badgeType === 'limited'
                ? 'bg-[#2A2421]/85 text-[#FADDCE]'
                : product.badgeType === 'new'
                ? 'bg-[#A08875] text-white'
                : 'bg-[#FAF6F0]/90 text-[#2A2421] border border-[#E8DFD5]'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button with Cross-Fade (Top Left) */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay ${
            isWishlisted
              ? 'bg-[#FAF6F0] text-[#A08875] shadow-sm'
              : 'bg-black/25 backdrop-blur-md text-white hover:bg-[#FAF6F0] hover:text-[#2A2421]'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="افزودن به برگزیده‌ها"
        >
          <Heart
            className={`w-4 h-4 crossfade-icon ${
              isWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''
            }`}
          />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250 hidden sm:flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className="flex-1 py-2 px-3 rounded-full bg-[#2A2421]/90 backdrop-blur-sm text-[#FAF6F0] text-xs hover:bg-[#140F0D] transition-colors text-center shadow-lg flex items-center justify-center gap-1.5 cursor-pointer skip-delay"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4C5B9]" />
            <span>مشاهده جزییات لوک</span>
          </button>
        </div>
      </div>

      {/* Product Details Box */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[#786C65] text-[11px] mb-1 font-sans">
            <span>{product.categoryLabel}</span>
            <span className="tracking-widest font-semibold">{product.code}</span>
          </div>

          <h3 className="font-display text-base sm:text-lg text-[#1C1917] font-semibold tracking-tight group-hover:text-[#A08875] transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-[#786C65] mt-1 line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Sizing Chips Preview */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[10px] text-[#786C65] ml-1">سایز:</span>
          {product.sizes.map((sz) => (
            <span
              key={sz}
              className="px-2 py-0.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-[10px] font-medium"
            >
              {sz}
            </span>
          ))}
        </div>

        {/* Price & Quick Add */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5]/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#786C65]">قیمت آتلیه:</span>
            <span className="text-sm sm:text-base font-bold text-[#2A2421]">
              {product.priceFormatted}
            </span>
          </div>

          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2A2421] text-[#FAF6F0] flex items-center justify-center hover:bg-[#140F0D] transition-transform active:scale-95 shadow-xs group/btn cursor-pointer skip-delay"
            title="افزودن سریع به سبد"
            aria-label="افزودن سریع به سبد خرید"
          >
            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
