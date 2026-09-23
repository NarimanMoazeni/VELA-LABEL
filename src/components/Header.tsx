import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, X, Menu, Send, Instagram } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'set', label: 'ست وست و شلوار' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'bespoke', label: 'شخصی‌دوزی' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#F5F0EB]/95 backdrop-blur-md border-[#E8DFD5] shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-[#F5F0EB] border-[#E8DFD5]'
      }`}
    >
      {/* Notification Bar — slim, dark, simple */}
      <div className="w-full bg-[#2A2421] text-[#FAF6F0] py-1.5 px-4 text-center text-[10px] sm:text-[10.5px] font-normal select-none">
        <span>ارسال رایگان سفارشات بالای ۳ میلیون تومان • کالکشن پاییز و زمستان ۲۰۲۶</span>
      </div>

      {/* Main Nav */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-between gap-4">
        {/* Right: Mobile menu + Desktop nav */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#2A2421] cursor-pointer"
            aria-label="منوی سایت"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`text-xs font-medium relative py-1 cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#2A2421] font-semibold'
                      : 'text-[#786C65] hover:text-[#2A2421]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 right-0 left-0 h-px bg-[#2A2421]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Logo */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 cursor-pointer select-none"
          title="VELA LABEL"
        >
          <img
            src="/products/logo.webp"
            alt="ولا لیبل"
            className="w-8 h-8 rounded-full object-cover border border-[#D4C5B9]/50"
          />
          <div className="flex flex-col items-start">
            <span
              className="font-serif text-[15px] sm:text-base text-[#2A2421] font-bold uppercase leading-none tracking-[0.14em]"
              dir="ltr"
            >
              VELA
            </span>
            <span
              className="text-[7px] uppercase text-[#A08875] font-medium tracking-[0.2em]"
              dir="ltr"
            >
              ATELIER TEHRAN
            </span>
          </div>
        </div>

        {/* Left: Search, Wishlist, Cart */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FAF6F0] border border-[#D4C5B9] px-2.5 py-1">
                <Search className="w-3.5 h-3.5 text-[#786C65] ml-1 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-[#2A2421] focus:outline-none w-24 sm:w-32 placeholder:text-[#978A7F]"
                  autoFocus
                />
                <button
                  onClick={() => { setIsSearchOpen(false); onSearchChange(''); }}
                  className="text-[#786C65] hover:text-[#2A2421] mr-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 flex items-center justify-center text-[#5A504B] hover:text-[#2A2421] transition-colors cursor-pointer"
                title="جستجو"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="w-8 h-8 flex items-center justify-center relative cursor-pointer"
            title="برگزیده‌ها"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : 'text-[#5A504B] hover:text-[#2A2421]'
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#2A2421] text-[#FAF6F0] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#2A2421] text-[#FAF6F0] px-3 py-1.5 text-xs font-medium hover:bg-[#1a1715] transition-colors cursor-pointer"
            title="سبد خرید"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">سبد خرید</span>
            <span className="bg-[#FAF6F0] text-[#2A2421] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {toPersianDigits(cartCount)}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#2A2421]/50 backdrop-blur-sm md:hidden">
          <div className="fixed inset-0" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white p-5 shadow-2xl flex flex-col justify-between z-10 border-l border-[#E8DFD5]">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
                <div className="flex items-center gap-2">
                  <img src="/products/logo.webp" alt="ولا لیبل" className="w-7 h-7 rounded-full object-cover border border-[#D4C5B9]" />
                  <span className="font-serif text-sm text-[#2A2421] font-bold" dir="ltr">VELA LABEL</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-[#2A2421] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                <span className="text-[10px] text-[#A08875] uppercase tracking-wider font-semibold mb-2">
                  دسته‌بندی‌ها
                </span>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onSelectCategory(item.id); setIsMobileMenuOpen(false); }}
                    className={`text-right py-2 px-2 text-sm transition-colors cursor-pointer ${
                      activeCategory === item.id
                        ? 'text-[#2A2421] font-semibold bg-[#FAF6F0]'
                        : 'text-[#5A504B] hover:text-[#2A2421]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] space-y-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#FAF6F0] border border-[#E8DFD5] text-xs text-[#2A2421] font-medium"
              >
                <Send className="w-3 h-3 text-[#A08875]" />
                <span>مشاوره در تلگرام</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#2A2421] text-[#FAF6F0] text-xs font-medium"
              >
                <Instagram className="w-3 h-3" />
                <span>اینستاگرام ولا لیبل</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
