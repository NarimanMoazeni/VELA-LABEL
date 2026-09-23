import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Ruler, Heart } from 'lucide-react';
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
      }, 300);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#2A2421]/50 backdrop-blur-sm animate-fade-in select-none">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal — sharp corners, clean split layout */}
      <div className="bg-white max-w-4xl w-full max-h-screen sm:max-h-[90vh] overflow-y-auto z-10 border border-[#E8DFD5] flex flex-col md:flex-row relative">
        {/* Gallery side */}
        <div className="md:w-1/2 bg-[#FAF6F0] p-4 sm:p-6 border-b md:border-b-0 md:border-l border-[#E8DFD5]">
          {/* Main image */}
          <div className="w-full aspect-[3/4] overflow-hidden bg-[#EDE6DE] group">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2 mt-3 justify-start">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-12 h-16 overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#2A2421]'
                      : 'border-[#E8DFD5] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase side */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Top toolbar — properly positioned, no overlap */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
              <span className="text-[10px] uppercase tracking-wider text-[#A08875] font-medium">
                {product.categoryLabel} • {product.code}
              </span>
              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="w-8 h-8 flex items-center justify-center text-[#786C65] hover:text-[#A08875] cursor-pointer"
                    title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#A08875] text-[#A08875]' : ''}`} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-[#786C65] hover:text-[#2A2421] cursor-pointer"
                  aria-label="بستن"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title + Price */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-[#1C1917] font-bold">
                {product.title}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg sm:text-xl font-bold text-[#2A2421]">
                  {product.priceFormatted}
                </span>
                <span className="text-[10px] text-[#A08875] bg-[#FAF6F0] px-2 py-0.5 border border-[#E8DFD5]">
                  {product.fabric}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#5A504B] leading-relaxed">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2A2421]">
                  سایز: <strong className="text-[#A08875]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-[11px] text-[#786C65] hover:text-[#2A2421] cursor-pointer"
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
                    className={`py-2 text-xs font-medium border cursor-pointer transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#2A2421] text-white border-[#2A2421]'
                        : 'bg-white text-[#2A2421] border-[#E8DFD5] hover:border-[#2A2421]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {isSizeGuideOpen && (
                <div className="p-3 bg-[#FAF6F0] border border-[#E8DFD5] text-[11px] text-[#786C65] space-y-1 animate-fade-in">
                  <div className="font-semibold text-[#2A2421]">استاندارد دور سینه و کمر:</div>
                  <div>۳۶ (۸۴-۸۸) • ۳۸ (۸۸-۹۲) • ۴۰ (۹۲-۹۶) • ۴۲ (۹۶-۱۰۰)</div>
                  <div className="text-[10px] text-[#A08875]">امکان تغییر قد در تلگرام</div>
                </div>
              )}
            </div>

            {/* Color swatches */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#2A2421]">
                رنگ: <strong className="text-[#A08875]">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs border cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-[#2A2421] text-[#2A2421] font-semibold bg-[#FAF6F0]'
                          : 'border-[#E8DFD5] text-[#5A504B] hover:border-[#2A2421]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add to cart */}
          <div className="pt-4 border-t border-[#E8DFD5]">
            <button
              onClick={handleAdd}
              disabled={isAddedAnimation}
              className={`w-full py-3.5 px-6 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer transition-colors ${
                isAddedAnimation
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#2A2421] text-white hover:bg-[#1a1715]'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>اضافه شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد خرید</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
