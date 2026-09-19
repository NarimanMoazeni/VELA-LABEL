import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Instagram, Send, X, Menu } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'all', label: 'همه کالکشن' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'silk', label: 'شومیز ابریشم' },
    { id: 'trousers', label: 'انواع شلوار' },
    { id: 'coat', label: 'پالتو و بارانی' },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#F5F0EB]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all duration-300">
      
      {/* 1. Minimal Top Announcement Bar */}
      <div className="w-full bg-[#2A2421] text-[#FAF6F0] py-1.5 px-4 text-center text-[10px] sm:text-[11px] font-light tracking-wide flex items-center justify-center gap-2 select-none">
        <span className="text-[#D4C5B9] text-[9px]">✦</span>
        <span>کالکشن کپسولی آتلیه ولا • ارسال بیمه‌شده و شخصی‌دوزی در تهران و سراسر کشور</span>
        <span className="text-[#D4C5B9] text-[9px]">✦</span>
      </div>

      {/* 2. Main 3-Column Balanced Luxury Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Right Section (in RTL): Clean Desktop Menu & Mobile Trigger */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-9 h-9 rounded-full border border-[#E8DFD5] flex items-center justify-center text-[#2A2421] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
            aria-label="منوی سایت"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop Categories Menu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`text-xs font-medium tracking-wide transition-all duration-150 relative py-1 cursor-pointer skip-delay ${
                    isActive
                      ? 'text-[#2A2421] font-bold'
                      : 'text-[#5A504B] hover:text-[#2A2421]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-[#2A2421] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Section: Iconic Pure High-Fashion Logo */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center justify-center cursor-pointer group select-none text-center"
          title="صفحه نخست VELA LABEL"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] text-[#2A2421] font-normal uppercase transition-opacity duration-200 group-hover:opacity-75">
              VELA LABEL
            </span>
          </div>
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#A08875] font-sans font-medium mt-0.5">
            ATELIER • TEHRAN
          </span>
        </div>

        {/* Left Section: Interactive Actions (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Toggle / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FAF6F0] border border-[#D4C5B9] rounded-full px-3 py-1 animate-fade-in shadow-xs">
                <Search className="w-3.5 h-3.5 text-[#786C65] ml-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجوی مدل یا جنس..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-[#2A2421] focus:outline-none w-28 sm:w-40 placeholder:text-[#978A7F]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#786C65] hover:text-[#2A2421] mr-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all cursor-pointer shadow-xs skip-delay"
                title="جستجو در کالکشن"
              >
                <Search className="w-4 h-4 text-[#5A504B]" />
              </button>
            )}
          </div>

          {/* Wishlist Button with Badge & Crossfade */}
          <button
            onClick={onOpenWishlist}
            className="w-9 h-9 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all relative cursor-pointer shadow-xs skip-delay"
            title="برگزیده‌ها"
          >
            <Heart className={`w-4 h-4 crossfade-icon ${wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : 'text-[#5A504B]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2A2421] text-[#FAF6F0] text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FFFFFF]">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#2A2421] text-[#FAF6F0] px-3 sm:px-4 py-2 rounded-full hover:bg-[#140F0D] transition-all shadow-sm active:scale-95 cursor-pointer skip-delay"
            title="سبد خرید"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4C5B9]" />
            <span className="text-xs font-medium hidden sm:inline">سبد خرید</span>
            <span className="bg-[#FAF6F0] text-[#2A2421] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {toPersianDigits(cartCount)}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#2A2421]/60 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#FFFFFF] p-6 shadow-2xl flex flex-col justify-between z-10 border-l border-[#E8DFD5]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5]">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.18em] text-[#2A2421] uppercase">
                    VELA LABEL
                  </span>
                  <span className="text-[8.5px] tracking-[0.25em] text-[#A08875] uppercase">
                    ATELIER • TEHRAN
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E8DFD5] flex items-center justify-center text-[#2A2421]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-3">
                <span className="text-[11px] text-[#A08875] uppercase tracking-wider font-semibold">
                  دسته‌بندی‌های مزون
                </span>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right py-2 text-sm font-medium transition-colors ${
                      activeCategory === item.id ? 'text-[#2A2421] font-bold' : 'text-[#5A504B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Concierge & Instagram links in mobile drawer */}
            <div className="pt-6 border-t border-[#E8DFD5] space-y-3">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-xs text-[#2A2421] font-medium"
              >
                <Send className="w-3.5 h-3.5 text-[#A08875]" />
                <span>مشاوره استایل در تلگرام</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#2A2421] text-[#FAF6F0] text-xs font-medium"
              >
                <Instagram className="w-3.5 h-3.5 text-[#D4C5B9]" />
                <span>صفحه اینستاگرام ولا لیبل</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
