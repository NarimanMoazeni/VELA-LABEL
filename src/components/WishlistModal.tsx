import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: Product[];
  wishlist?: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  items,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const activeItems = items || wishlist || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2421]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col z-10 border border-[#E8DFD5] animate-pop">
        {/* Header */}
        <div className="p-5 bg-[#FAF6F0] border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#A08875] fill-[#A08875]" />
            <h3 className="font-display text-lg text-[#2A2421] font-bold">
              برگزیده‌ها
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E8DFD5] text-[#2A2421] flex items-center justify-center hover:bg-[#E8DFD5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {activeItems.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Heart className="w-10 h-10 text-[#D4C5B9] mx-auto" />
              <p className="text-sm text-[#786C65]">هنوز چیزی اضافه نکرده‌اید.</p>
            </div>
          ) : (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-18 object-cover rounded-lg border border-[#E8DFD5]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#2A2421] truncate">
                    {item.title}
                  </h4>
                  <div className="text-xs text-[#786C65]">{item.fabric}</div>
                  <div className="text-sm font-extrabold text-[#2A2421] mt-1">{item.priceFormatted}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-colors"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="p-2 rounded-full bg-[#FFFFFF] border border-[#E8DFD5] text-[#786C65] hover:text-red-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
