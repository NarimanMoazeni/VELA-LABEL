import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Ruler, Sparkles, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2A2421]/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 border border-[#E8DFD5] flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] flex items-center justify-center hover:bg-[#E8DFD5] transition-colors"
          aria-label="بستن پنجره"
        >
          <X className="w-4 h-4" />
        </button>

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
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
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
            <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Picker */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-[#786C65]">
                <span>انتخاب رنگ پارچه:</span>
                <span className="font-medium text-[#2A2421]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative p-0.5 rounded-full transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-[#2A2421] scale-110'
                        : 'hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    <span
                      className={`block w-6 h-6 rounded-full shadow-sm ${
                        color.border ? 'border border-[#D4C5B9]' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-[#786C65]">
                <span>انتخاب سایز مزونی:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-[#A08875] hover:text-[#2A2421] text-xs underline decoration-dotted transition-colors"
                >
                  <Ruler className="w-3 h-3" />
                  <span>راهنمای سایز مزون</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                      selectedSize === sz
                        ? 'bg-[#2A2421] text-[#FAF6F0] shadow-sm scale-102'
                        : 'bg-[#FAF6F0] text-[#5A504B] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible Size Guide Table */}
            {isSizeGuideOpen && (
              <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-xs space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between font-bold text-[#2A2421] border-b border-[#E8DFD5] pb-1">
                  <span>جدول استاندارد آتلیه ولا (سانتی‌متر)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A08875]" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#5A504B] text-[11px] pt-1">
                  <div>• سایز ۳۶: دور سینه ۸۴ / دور کمر ۶۶</div>
                  <div>• سایز ۳۸: دور سینه ۸۸ / دور کمر ۷۰</div>
                  <div>• سایز ۴۰: دور سینه ۹۲ / دور کمر ۷۴</div>
                  <div>• سایز ۴۲: دور سینه ۹۶ / دور کمر ۷۸</div>
                </div>
                <p className="text-[10px] text-[#A08875] pt-1">
                  * امکان دوخت سفارشی با اندازه‌های دقیق شما از طریق پشتیبانی تلگرام وجود دارد.
                </p>
              </div>
            )}

            {/* Key Features bullet points */}
            {product.features && product.features.length > 0 && (
              <div className="pt-1">
                <ul className="grid grid-cols-1 gap-1 text-xs text-[#5A504B]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#A08875] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#E8DFD5] flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#FAF6F0] border border-[#E8DFD5] rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#2A2421] font-bold text-sm hover:bg-[#E8DFD5] rounded-full transition-colors"
                aria-label="کاهش تعداد"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#2A2421]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#2A2421] font-bold text-sm hover:bg-[#E8DFD5] rounded-full transition-colors"
                aria-label="افزایش تعداد"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              disabled={isAddedAnimation}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 text-xs sm:text-sm font-medium"
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>به سبد افزوده شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
                  <span>افزودن به سبد خرید مزون</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
