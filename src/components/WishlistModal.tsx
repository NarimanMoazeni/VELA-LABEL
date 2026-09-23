import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#2A2421]/50 backdrop-blur-sm animate-fade-in select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white border border-[#E8DFD5] flex flex-col max-h-screen sm:max-h-[80vh] overflow-hidden z-10">
        {/* Header */}
        <div className="px-5 py-4 bg-[#FAF6F0] border-b border-[#E8DFD5] flex items-center justify-between shrink-0">
          <h2 className="font-display text-sm font-bold text-[#2A2421]">
            برگزیده‌ها ({items.length > 0 ? items.length : '۰'})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#786C65] hover:text-[#2A2421] cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-[#786C65]">لیست برگزیده‌ها خالی است</p>
              <button onClick={onClose} className="py-2 px-5 bg-[#2A2421] text-white text-xs font-medium cursor-pointer">
                مشاهده کالکشن
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-[#FAF6F0] border border-[#E8DFD5]">
                  <img src={product.image} alt={product.title} className="w-14 h-[72px] object-cover border border-[#E8DFD5] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#2A2421] truncate">{product.title}</h4>
                    <div className="text-xs font-bold text-[#2A2421] mt-1">{product.priceFormatted}</div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-8 h-8 bg-[#2A2421] text-white flex items-center justify-center cursor-pointer hover:bg-[#1a1715]"
                      title="افزودن به سبد"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="w-8 h-8 border border-[#E8DFD5] text-[#978A7F] flex items-center justify-center cursor-pointer hover:text-red-600"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
