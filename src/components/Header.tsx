import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Instagram, Send, X } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-[#F5F0EB]/90 backdrop-blur-md border-b border-[#E8DFD5]/80 transition-colors">
      {/* Top Utility & Brand Bar */}
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        
        {/* Right side in RTL: Social & Atelier Support */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://instagram.com/velalabel"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#5A504B] hover:text-[#2A2421] transition-colors group"
            title="اینستاگرام ولا لیبل"
          >
            <Instagram className="w-3.5 h-3.5 text-[#A08875] group-hover:text-[#2A2421] transition-colors" />
            <span className="hidden sm:inline-block font-sans text-[11px] tracking-wider uppercase">@velalabel</span>
          </a>
          <span className="hidden sm:inline-block w-px h-3 bg-[#E8DFD5]"></span>
          <a
            href="https://t.me/velalabel"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#5A504B] hover:text-[#2A2421] transition-colors group"
            title="پشتیبانی تلگرام مزون"
          >
            <Send className="w-3.5 h-3.5 text-[#A08875] group-hover:text-[#2A2421] transition-colors" />
            <span className="text-[11px] font-medium">پشتیبانی تلگرام</span>
          </a>
        </div>

        {/* Center: VELA LABEL Logo & Sparkle */}
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => onSelectCategory('all')}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#A08875]/50 flex items-center justify-center text-[10px] text-[#A08875] bg-[#FAF6F0]">
              ✦
            </div>
            <span className="font-brand text-2xl sm:text-3xl tracking-widest text-[#2A2421] font-normal uppercase">
              VELA LABEL
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9.5px] text-[#786C65] tracking-[0.24em] uppercase -mt-0.5 font-sans font-medium">
            WOMEN&apos;S WEAR • MEZON
          </span>
        </div>

        {/* Left side in RTL: Search, Wishlist, Cart & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FAF6F0] border border-[#E8DFD5] rounded-full px-3 py-1 text-xs">
                <input
                  type="text"
                  placeholder="جستجوی پالتو، کت، شومیز..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent outline-none w-32 sm:w-44 text-[#2A2421] text-xs placeholder:text-[#978A7F]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#786C65] hover:text-[#2A2421] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="جستجو"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5A504B] hover:text-[#2A2421] hover:bg-[#FAF6F0] transition-all"
                title="جستجو در محصولات"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="علاقه‌مندی‌ها"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5A504B] hover:text-[#2A2421] hover:bg-[#FAF6F0] transition-all relative"
            title="لیست برگزیده‌ها"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#A08875] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Pill with Reactive Counter */}
          <button
            onClick={onOpenCart}
            aria-label="سبد خرید"
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all shadow-sm group active:scale-95"
            id="header-cart-button"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4C5B9] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium hidden xs:inline-block">سبد خرید</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#FAF6F0] text-[#2A2421] text-[10.5px] font-bold min-w-5 h-4.5">
              {toPersianDigits(cartCount)}
            </span>
          </button>

          {/* User Icon */}
          <div
            className="w-8 h-8 rounded-full bg-[#2A2421] flex items-center justify-center text-[#FAF6F0] hover:bg-[#140F0D] transition-colors cursor-pointer"
            title="پروفایل کاربری و سفارشات مزون"
            onClick={onOpenCart}
          >
            <User className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Editorial Category Links Bar (Desktop) */}
      <div className="hidden md:flex items-center justify-center py-2.5 border-t border-[#E8DFD5]/60 bg-[#FAF6F0]/60 text-xs">
        <nav className="flex items-center gap-8">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors tracking-wide ${
              activeCategory === 'all'
                ? 'text-[#2A2421] font-bold border-b border-[#2A2421] pb-0.5'
                : 'text-[#786C65] hover:text-[#2A2421]'
            }`}
          >
            صفحه اصلی
          </button>
          <button
            onClick={() => onSelectCategory('blazer')}
            className={`transition-colors tracking-wide ${
              activeCategory === 'blazer'
                ? 'text-[#2A2421] font-bold border-b border-[#2A2421] pb-0.5'
                : 'text-[#786C65] hover:text-[#2A2421]'
            }`}
          >
            کت و بلیزر
          </button>
          <button
            onClick={() => onSelectCategory('coat')}
            className={`transition-colors tracking-wide ${
              activeCategory === 'coat'
                ? 'text-[#2A2421] font-bold border-b border-[#2A2421] pb-0.5'
                : 'text-[#786C65] hover:text-[#2A2421]'
            }`}
          >
            پالتو و بارانی
          </button>
          <button
            onClick={() => onSelectCategory('silk')}
            className={`transition-colors tracking-wide ${
              activeCategory === 'silk'
                ? 'text-[#2A2421] font-bold border-b border-[#2A2421] pb-0.5'
                : 'text-[#786C65] hover:text-[#2A2421]'
            }`}
          >
            ابریشم و بافت
          </button>
          <button
            onClick={() => onSelectCategory('trousers')}
            className={`transition-colors tracking-wide ${
              activeCategory === 'trousers'
                ? 'text-[#2A2421] font-bold border-b border-[#2A2421] pb-0.5'
                : 'text-[#786C65] hover:text-[#2A2421]'
            }`}
          >
            شلوار و مونوکروم
          </button>
          <a
            href="#atelier-philosophy"
            className="text-[#786C65] hover:text-[#2A2421] transition-colors tracking-wide"
          >
            داستان ولا و اصالت پارچه
          </a>
          <a
            href="#bespoke-appointment"
            className="text-[#786C65] hover:text-[#2A2421] transition-colors tracking-wide"
          >
            سفارش مزونی
          </a>
        </nav>
      </div>
    </header>
  );
};
