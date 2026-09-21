import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Ruler, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product, e: React.MouseEvent) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState<boolean>(false);

  // Initialize state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedSize(product.sizes[0] || '۳۸');
      setSelectedColor(product.colors[0]?.name || 'کرم نود');
      setQuantity(1);
      setIsSizeGuideOpen(false);
      setIsAddedAnimation(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    setIsAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, selectedColor, quantity);
      setTimeout(() => {
        setIsAddedAnimation(false);
        onClose();
      }, 350);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A2421]/60 backdrop-blur-sm animate-fade-in select-none">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#E8DFD5] flex flex-col md:flex-row relative">
        
        {/* Left Column (in RTL: Lookbook Gallery) */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between bg-[#FAF6F0]/60 border-b md:border-b-0 md:border-l border-[#E8DFD5]">
          
          {/* Main Visual Frame */}
          <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#EAE4D7] border border-[#E8DFD5] shadow-xs relative group">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.badge && (
              <div className="absolute top-3 right-3 bg-[#2A2421]/85 backdrop-blur-md text-[#FAF6F0] text-[10px] font-medium px-2.5 py-1 rounded-full">
                {product.badge}
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar justify-center">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#2A2421] shadow-sm scale-105'
                      : 'border-[#E8DFD5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`لوک ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Clean, Decluttered Purchase Interface */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          
          <div className="space-y-4">
            
            {/* Dedicated Top Toolbar: Category on Right, Actions on Left (Zero Overlap Bug!) */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
              <span className="text-[11px] uppercase tracking-wider text-[#A08875] font-semibold font-sans">
                {product.categoryLabel} • {product.code}
              </span>

              {/* Action Buttons Cleanly Grouped Together */}
              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="w-8 h-8 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all cursor-pointer shadow-xs skip-delay"
                    title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
                    aria-label="افزودن به برگزیده‌ها"
                  >
                    <Heart
                      className={`w-4 h-4 crossfade-icon ${
                        isWishlisted ? 'fill-[#A08875] text-[#A08875]' : 'text-[#786C65]'
                      }`}
                    />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:bg-[#E8DFD5] transition-colors cursor-pointer shadow-xs skip-delay"
                  aria-label="بستن پنجره"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Price Header */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#1C1917] font-bold tracking-tight">
                {product.title}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl sm:text-2xl font-bold text-[#2A2421]">
                  {product.priceFormatted}
                </span>
                <span className="text-[11px] text-[#A08875] bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#E8DFD5]">
                  {product.fabric}
                </span>
              </div>
            </div>

            {/* Editorial Description (Clean, Single Sentence) */}
            <p className="text-xs sm:text-[13px] text-[#5A504B] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Minimalist Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2A2421]">
                  سایز: <strong className="text-[#A08875]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-[11px] text-[#786C65] hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#A08875]" />
                  <span>راهنمای سایز</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer skip-delay ${
                      selectedSize === sz
                        ? 'bg-[#2A2421] text-white border-[#2A2421] shadow-xs'
                        : 'bg-white text-[#2A2421] border-[#E8DFD5] hover:border-[#2A2421]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Minimal Size Guide Accordion */}
              {isSizeGuideOpen && (
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] text-[11px] text-[#786C65] space-y-1 animate-fade-in">
                  <div className="font-semibold text-[#2A2421]">استاندارد دور سینه و کمر آتلیه:</div>
                  <div className="text-[10.5px]">۳۶ (۸۴-۸۸) • ۳۸ (۸۸-۹۲) • ۴۰ (۹۲-۹۶) • ۴۲ (۹۶-۱۰۰)</div>
                  <div className="text-[10px] text-[#A08875]">✦ امکان تغییر قد طبق درخواست در تلگرام فراهم است.</div>
                </div>
              )}
            </div>

            {/* Minimalist Color Swatches */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#2A2421]">
                رنگ: <strong className="text-[#A08875]">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer skip-delay ${
                        isSelected
                          ? 'bg-[#FAF6F0] border-[#2A2421] text-[#2A2421] font-bold shadow-xs'
                          : 'bg-white border-[#E8DFD5] text-[#5A504B] hover:border-[#2A2421]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Crossfade Add to Cart Action */}
          <div className="pt-4 border-t border-[#E8DFD5]">
            <button
              onClick={handleAdd}
              disabled={isAddedAnimation}
              className={`w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer ${
                isAddedAnimation
                  ? 'bg-emerald-800 text-white scale-98'
                  : 'bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] active:scale-95'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>به سبد خرید افزوده شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
                  <span>افزودن قطعه به سبد خرید</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
