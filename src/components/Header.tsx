import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'all', label: 'همه کالکشن' },
    { id: 'coat', label: 'پالتو و بارانی' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'silk', label: 'شومیز و ابریشم' },
    { id: 'trousers', label: 'انواع شلوار' },
  ];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#F5F0EB]/95 shadow-xs backdrop-blur-md' : 'bg-[#F5F0EB]'
    } border-b border-[#E8DFD5]`}>
      
      {/* 1. Subtle Compact Top Announcement Bar */}
      <div className="w-full bg-[#2A2421] text-[#FAF6F0] py-1 px-4 text-center text-[10px] sm:text-[10.5px] font-normal tracking-normal flex items-center justify-center gap-2 select-none">
        <span className="text-[#D4C5B9] text-[8px]">✦</span>
        <span>کالکشن کپسولی آتلیه ولا • ارسال بیمه‌شده و شخصی‌دوزی در سراسر کشور</span>
        <span className="text-[#D4C5B9] text-[8px]">✦</span>
      </div>

      {/* 2. Main Navigation Bar (h-14 sm:h-16) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Right Section (in RTL): Mobile Menu Toggle & Desktop Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-8 h-8 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
            aria-label="منوی سایت"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop Categories Menu */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`text-xs font-medium transition-all duration-150 relative py-1 cursor-pointer skip-delay ${
                    isActive
                      ? 'text-[#2A2421] font-bold'
                      : 'text-[#6B5F58] hover:text-[#2A2421]'
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

        {/* Center Section: Dominant VELA LABEL Logo */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center justify-center cursor-pointer group select-none text-center"
          title="صفحه نخست VELA LABEL"
        >
          <span
            className="font-serif text-xl sm:text-2xl text-[#2A2421] font-normal uppercase transition-opacity duration-200 group-hover:opacity-80"
            style={{ letterSpacing: '0.22em' }}
            dir="ltr"
          >
            VELA LABEL
          </span>
          <span
            className="text-[8px] sm:text-[8.5px] uppercase text-[#A08875] font-sans font-medium"
            style={{ letterSpacing: '0.28em' }}
            dir="ltr"
          >
            ATELIER • TEHRAN
          </span>
        </div>

        {/* Left Section: Interactive Actions (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Search Toggle / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FAF6F0] border border-[#D4C5B9] rounded-full px-2.5 py-1 shadow-xs">
                <Search className="w-3.5 h-3.5 text-[#786C65] ml-1 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجوی مدل..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-[#2A2421] focus:outline-none w-24 sm:w-36 placeholder:text-[#978A7F]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#786C65] hover:text-[#2A2421] mr-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all cursor-pointer shadow-xs skip-delay"
                title="جستجو در کالکشن"
              >
                <Search className="w-3.5 h-3.5 text-[#5A504B]" />
              </button>
            )}
          </div>

          {/* Wishlist Button with Badge */}
          <button
            onClick={onOpenWishlist}
            className="w-8 h-8 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all relative cursor-pointer shadow-xs skip-delay"
            title="برگزیده‌ها"
          >
            <Heart className={`w-3.5 h-3.5 crossfade-icon ${wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : 'text-[#5A504B]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2A2421] text-[#FAF6F0] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FFFFFF]">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#2A2421] text-[#FAF6F0] px-3 py-1.5 rounded-full hover:bg-[#140F0D] transition-all shadow-xs active:scale-95 cursor-pointer skip-delay"
            title="سبد خرید"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4C5B9]" />
            <span className="text-xs font-medium hidden sm:inline">سبد خرید</span>
            <span className="bg-[#FAF6F0] text-[#2A2421] text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {toPersianDigits(cartCount)}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#2A2421]/60 backdrop-blur-sm md:hidden">
          <div className="fixed inset-0" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#FFFFFF] p-5 shadow-2xl flex flex-col justify-between z-10 border-l border-[#E8DFD5]">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E8DFD5]">
                <div className="flex flex-col">
                  <span
                    className="font-serif text-lg text-[#2A2421] uppercase"
                    style={{ letterSpacing: '0.18em' }}
                    dir="ltr"
                  >
                    VELA LABEL
                  </span>
                  <span
                    className="text-[8px] text-[#A08875] uppercase"
                    style={{ letterSpacing: '0.22em' }}
                    dir="ltr"
                  >
                    ATELIER • TEHRAN
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full border border-[#E8DFD5] flex items-center justify-center text-[#2A2421]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile Category Links */}
              <nav className="flex flex-col space-y-2.5">
                <span className="text-[10px] text-[#A08875] uppercase tracking-wider font-semibold">
                  دسته‌بندی‌های مزون
                </span>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right py-1.5 text-xs font-medium transition-colors ${
                      activeCategory === item.id ? 'text-[#2A2421] font-bold' : 'text-[#5A504B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Concierge in mobile drawer */}
            <div className="pt-4 border-t border-[#E8DFD5] space-y-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-xs text-[#2A2421] font-medium"
              >
                <Send className="w-3 h-3 text-[#A08875]" />
                <span>مشاوره استایل در تلگرام</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-[#2A2421] text-[#FAF6F0] text-xs font-medium"
              >
                <Instagram className="w-3 h-3 text-[#D4C5B9]" />
                <span>اینستاگرام ولا لیبل</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
