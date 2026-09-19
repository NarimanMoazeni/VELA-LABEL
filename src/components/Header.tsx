import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Instagram, Send, X, Menu } from 'lucide-react';
import { toPersianDigits } from '../data/products';
import { VELA_LOGO_SRC } from '../assets/logo';

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
    { id: 'all', label: 'همه محصولات' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'silk', label: 'شومیز و تاپ' },
    { id: 'trousers', label: 'انواع شلوار' },
    { id: 'coat', label: 'پالتو و بارانی' },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#F5F0EB]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all duration-300">
      
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-[#2A2421] text-[#FAF6F0] py-1.5 px-4 text-center text-[10.5px] sm:text-[11px] font-light tracking-wide flex items-center justify-center gap-2 select-none">
        <span className="text-[#D4C5B9]">✦</span>
        <span>ارسال اکسپرس مزونی به سراسر کشور • تضمین تطابق سایز و شخصی‌دوزی در آتلیه</span>
        <span className="text-[#D4C5B9]">✦</span>
      </div>

      {/* 2. Main Balanced Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        
        {/* Right Section (in RTL): Real VELA Circular Badge Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0" 
          onClick={() => onSelectCategory('all')}
          title="بازگشت به صفحه اصلی ولا لیبل"
        >
          {/* Authentic Circular VELA Badge */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D4C5B9] shadow-sm transition-transform duration-300 group-hover:scale-105 bg-[#1C1B1A]">
            <img 
              src={VELA_LOGO_SRC} 
              alt="VELA LABEL" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Typography next to logo */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-[#2A2421] font-medium uppercase leading-none">
                VELA
              </span>
              <span className="text-[9px] text-[#A08875] tracking-widest font-serif uppercase">
                LABEL
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#786C65] tracking-[0.2em] uppercase font-sans mt-1">
              WOMEN&apos;S WEAR • MEZON
            </span>
          </div>
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-[#5A504B]">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectCategory(link.id)}
                className={`relative py-1 tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-[#2A2421] font-bold' : 'hover:text-[#2A2421]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2A2421] rounded-full"></span>
                )}
              </button>
            );
          })}
          
          <a
            href="#atelier-philosophy"
            className="text-[#786C65] hover:text-[#2A2421] transition-colors tracking-wide py-1"
          >
            اصالت پارچه‌ها
          </a>
        </nav>

        {/* Left Section (in RTL): Utilities, Social & Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Instagram Link (Desktop) */}
          <a
            href="https://instagram.com/velalabel"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[#5A504B] hover:text-[#2A2421] px-2.5 py-1.5 rounded-full hover:bg-[#FAF6F0] transition-colors"
            title="پیج اینستاگرام ولا لیبل"
          >
            <Instagram className="w-4 h-4 text-[#A08875]" />
            <span className="text-[11px] font-sans">@velalabel</span>
          </a>

          {/* Telegram Support Link (Desktop) */}
          <a
            href="https://t.me/velalabel"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-[#5A504B] hover:text-[#2A2421] px-2.5 py-1.5 rounded-full hover:bg-[#FAF6F0] transition-colors"
            title="پشتیبانی و سفارش تلگرام"
          >
            <Send className="w-3.5 h-3.5 text-[#A08875]" />
            <span className="text-[11px]">پشتیبانی</span>
          </a>

          {/* Search Bar / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FFFFFF] border border-[#D4C5B9] rounded-full px-3 py-1 text-xs shadow-xs">
                <input
                  type="text"
                  placeholder="جستجوی کت، شومیز، شلوار..."
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
                  className="text-[#786C65] hover:text-[#2A2421] ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="جستجو در محصولات"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5A504B] hover:text-[#2A2421] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                title="جستجو"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="لیست علاقه‌مندی‌ها"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5A504B] hover:text-[#2A2421] hover:bg-[#FAF6F0] transition-colors relative cursor-pointer"
            title="علاقه‌مندی‌ها"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#A08875] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Pill Button */}
          <button
            onClick={onOpenCart}
            aria-label="سبد خرید"
            className="flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all shadow-sm active:scale-95 cursor-pointer"
            id="header-cart-button"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
            <span className="text-xs font-medium hidden sm:inline-block">سبد خرید</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#FAF6F0] text-[#2A2421] text-[11px] font-bold min-w-5 h-4.5">
              {toPersianDigits(cartCount)}
            </span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#2A2421] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
            aria-label="منوی دسته‌بندی‌ها"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-t border-[#E8DFD5] px-6 py-4 space-y-3 transition-all">
          <div className="flex flex-col gap-2.5 text-xs font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectCategory(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-right py-1.5 transition-colors ${
                  activeCategory === link.id
                    ? 'text-[#2A2421] font-bold'
                    : 'text-[#786C65]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#atelier-philosophy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-right py-1.5 text-[#786C65] border-t border-[#E8DFD5]/60 pt-2"
            >
              اصالت پارچه‌ها و مواد اولیه
            </a>
          </div>

          <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#5A504B]">
            <a
              href="https://instagram.com/velalabel"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-[#A08875]" />
              <span>اینستاگرام ولا</span>
            </a>
            <a
              href="https://t.me/velalabel"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#A08875]" />
              <span>پشتیبانی تلگرام</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
