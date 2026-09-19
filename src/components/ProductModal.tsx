import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Ruler, Sparkles, ChevronDown, Heart } from 'lucide-react';
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
      setIsAddedAnimation(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2A2421]/60 backdrop-blur-sm animate-fade-in select-none">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 border border-[#E8DFD5] flex flex-col md:flex-row relative">
        
        {/* Top Actions: Close & Wishlist */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {onToggleWishlist && (
            <button
              onClick={(e) => onToggleWishlist(product, e)}
              className={`w-8 h-8 rounded-full border border-[#E8DFD5] flex items-center justify-center transition-colors ${
                isWishlisted
                  ? 'bg-[#FAF6F0] text-[#A08875] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#2A2421] hover:bg-[#FAF6F0]'
              }`}
              title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
              aria-label="افزودن به برگزیده‌ها"
            >
              <Heart
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''
                }`}
              />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] flex items-center justify-center hover:bg-[#E8DFD5] transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Column */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col items-center justify-between bg-[#FAF6F0]/50 border-b md:border-b-0 md:border-l border-[#E8DFD5]">
          {/* Main Image Frame */}
          <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#F2EDE8] border border-[#E8DFD5] shadow-inner relative group">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-3 right-3 bg-[#2A2421]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px]">
              {product.code}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2.5 mt-3 overflow-x-auto w-full pb-1 no-scrollbar justify-center">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img ? 'border-[#2A2421] shadow-md scale-105' : 'border-[#E8DFD5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`تصویر ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Configuration Column */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            {/* Category and Code */}
            <div className="flex items-center justify-between border-b border-[#E8DFD5]/60 pb-2">
              <span className="text-xs uppercase text-[#A08875] font-semibold tracking-wider font-sans">
                {product.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-[11px] font-sans font-medium">
                {product.fabric}
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-[#2A2421] font-semibold leading-tight">
                {product.title}
              </h2>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-lg sm:text-xl font-bold text-[#2A2421]">
                  {product.priceFormatted}
                </span>
                <span className="text-xs text-[#786C65]">قیمت تحویل در آتلیه و سراسر کشور</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-[#5A504B] leading-relaxed">
              {product.description}
            </p>

            {/* Origin & Atelier Badge */}
            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#A08875] shrink-0" />
              <div className="text-[11px] text-[#786C65]">
                <strong className="text-[#2A2421] font-medium">خاستگاه الیاف: </strong>
                {product.origin}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#2A2421]">
                  سایز تن‌پوش: <span className="text-[#A08875]">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-[11px] text-[#786C65] hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>راهنمای سایز مزونی</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#2A2421] text-white border-[#2A2421] shadow-xs'
                        : 'bg-white text-[#2A2421] border-[#E8DFD5] hover:border-[#2A2421]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Accordion Size Guide */}
              {isSizeGuideOpen && (
                <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] text-[11px] text-[#786C65] space-y-1.5 animate-fade-in">
                  <div className="font-semibold text-[#2A2421]">جدول استاندارد آتلیه ولا:</div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-white p-1.5 rounded-lg border border-[#E8DFD5]">۳۶: دور سینه ۸۴-۸۸</div>
                    <div className="bg-white p-1.5 rounded-lg border border-[#E8DFD5]">۳۸: دور سینه ۸۸-۹۲</div>
                    <div className="bg-white p-1.5 rounded-lg border border-[#E8DFD5]">۴۰: دور سینه ۹۲-۹۶</div>
                  </div>
                  <div className="text-[10px] text-[#A08875] pt-1">
                    ✦ امکان شخصی‌دوزی بر اساس اندازه‌های ارسالی در تلگرام فراهم است.
                  </div>
                </div>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#2A2421]">
                رنگ پارچه: <span className="text-[#A08875]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'bg-[#2A2421] text-white border-[#2A2421] shadow-xs'
                        : 'bg-white text-[#2A2421] border-[#E8DFD5] hover:border-[#2A2421]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    ></span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-[#E8DFD5]/60">
              {product.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11.5px] text-[#786C65]">
                  <Check className="w-3.5 h-3.5 text-[#A08875] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Add to Cart CTA */}
          <div className="pt-3 border-t border-[#E8DFD5]">
            <button
              onClick={handleAdd}
              disabled={isAddedAnimation}
              className={`w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer ${
                isAddedAnimation
                  ? 'bg-emerald-700 text-white scale-98'
                  : 'bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
              <span>{isAddedAnimation ? 'به سبد خرید افزوده شد...' : 'افزودن قطعه به سبد خرید'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
