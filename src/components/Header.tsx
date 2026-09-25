import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Search, Heart, ShoppingBag, Instagram, Send, X, Menu, Sun, Moon } from 'lucide-react';
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
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return document.documentElement.classList.contains('dark');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (dark: boolean) => {
    try {
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('vela_theme', dark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  // Circular-reveal theme switch (View Transitions API with graceful fallback)
  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (doc.startViewTransition) {
      try {
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || 120;
        const endR = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        const transition = doc.startViewTransition(() => {
          flushSync(() => setIsDark(next));
        });
        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endR}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {});
        return;
      } catch {
        // fall through to instant toggle
      }
    }
    // Fallback: brief soft crossfade
    try {
      const root = document.documentElement;
      root.classList.add('theme-fade');
      setIsDark(next);
      setTimeout(() => root.classList.remove('theme-fade'), 450);
    } catch {
      setIsDark(next);
    }
  };

  // Cart bump animation whenever an item is added
  const [cartBump, setCartBump] = useState(false);
  const firstCartRender = useRef(true);
  useEffect(() => {
    if (firstCartRender.current) {
      firstCartRender.current = false;
      return;
    }
    setCartBump(true);
    const t = setTimeout(() => setCartBump(false), 500);
    return () => clearTimeout(t);
  }, [cartCount]);

  const navLinks = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'set', label: 'ست وست و شلوار' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'bespoke', label: 'شخصی‌دوزی مزون' },
  ];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#F5F0EB]/95 shadow-xs backdrop-blur-md' : 'bg-[#F5F0EB]'
    } border-b border-[#E8DFD5]`}>

      {/* Top announcement bar — single short line */}
      <div className="w-full bg-[#2A2421] text-[#FAF6F0] py-1.5 px-4 text-center text-[11px] font-normal select-none">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full align-middle">
          ارسال فوری با کاور اختصاصی مزون ولا
        </span>
      </div>

      {/* Main bar: true 3-zone grid so the logo is optically centered */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 h-16 sm:h-20 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">

        {/* Right zone (RTL start): mobile menu + desktop nav */}
        <div className="flex items-center justify-start gap-3 sm:gap-6 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:bg-[#FAF6F0] transition-colors cursor-pointer shrink-0"
            aria-label="منوی سایت"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`text-sm font-medium transition-all duration-150 relative py-1.5 cursor-pointer skip-delay ${
                    isActive
                      ? 'text-[#2A2421] font-bold'
                      : 'text-[#6B5F58] hover:text-[#2A2421]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#2A2421] dark:bg-[#D7B98F] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center zone: bigger badge logo, always centered */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center justify-center gap-3 cursor-pointer group select-none"
          title="صفحه نخست VELA LABEL"
        >
          <img
            src="/products/logo.webp"
            alt="لوگوی رسمی ولا لیبل"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#D4C5B9]/70 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="hidden min-[420px]:flex flex-col text-right">
            <span
              className="font-serif text-lg sm:text-xl text-[#2A2421] font-bold uppercase leading-none tracking-[0.16em]"
              dir="ltr"
            >
              VELA
            </span>
            <span
              className="text-[8.5px] sm:text-[9px] uppercase text-[#A08875] font-sans font-medium tracking-[0.24em] mt-1"
              dir="ltr"
            >
              ATELIER • ISFAHAN
            </span>
          </div>
        </div>

        {/* Left zone (RTL end): search, theme, wishlist, cart */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 min-w-0">

          {/* Search Toggle / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#FAF6F0] border border-[#D4C5B9] rounded-full px-3 py-1.5 shadow-xs">
                <Search className="w-4 h-4 text-[#786C65] ml-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجوی مدل..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-sm text-[#2A2421] focus:outline-none w-28 sm:w-40 placeholder:text-[#978A7F]"
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
                className="w-10 h-10 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all cursor-pointer shadow-xs skip-delay"
                title="جستجو در کالکشن"
                aria-label="جستجو در کالکشن"
              >
                <Search className="w-4 h-4 text-[#5A504B]" />
              </button>
            )}
          </div>

          {/* Theme toggle (hidden on mobile while searching to save space) */}
          <button
            onClick={handleThemeToggle}
            className={`${isSearchOpen ? 'hidden sm:flex' : 'flex'} w-10 h-10 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all cursor-pointer shadow-xs skip-delay`}
            title={isDark ? 'حالت روشن' : 'حالت تیره'}
            aria-label={isDark ? 'فعال‌سازی حالت روشن' : 'فعال‌سازی حالت تیره'}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#D4C5B9]" /> : <Moon className="w-4 h-4 text-[#5A504B]" />}
          </button>

          {/* Wishlist Button with Badge */}
          <button
            onClick={onOpenWishlist}
            className="w-10 h-10 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-center text-[#2A2421] hover:border-[#2A2421] transition-all relative cursor-pointer shadow-xs skip-delay"
            title="برگزیده‌ها"
            aria-label="برگزیده‌ها"
          >
            <Heart className={`w-4 h-4 crossfade-icon ${wishlistCount > 0 ? 'text-[#A08875] fill-[#A08875]' : 'text-[#5A504B]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2A2421] text-[#FAF6F0] dark:bg-[#D7B98F] dark:text-[#1A1512] dark:border-transparent text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border border-[#FFFFFF]">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-2 bg-[#2A2421] text-[#FAF6F0] pl-3 pr-4 py-2 rounded-full hover:bg-[#140F0D] transition-all shadow-xs active:scale-95 cursor-pointer skip-delay ${cartBump ? 'animate-cart-bump' : ''}`}
            title="سبد خرید"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
            <span className="text-sm font-semibold hidden sm:inline">سبد خرید</span>
            <span className="bg-[#FAF6F0] text-[#2A2421] dark:bg-[#E9DCC8] dark:text-[#1A1512] text-[11px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
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
                <div className="flex items-center gap-2.5">
                  <img
                    src="/products/logo.webp"
                    alt="لوگوی ولا لیبل"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D4C5B9]"
                  />
                  <div className="flex flex-col text-right">
                    <span className="font-serif text-base text-[#2A2421] font-bold">VELA LABEL</span>
                    <span className="text-[8px] text-[#A08875] tracking-wider uppercase">ATELIER ISFAHAN</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#E8DFD5] flex items-center justify-center text-[#2A2421]"
                  aria-label="بستن منو"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                <span className="text-[11px] text-[#A08875] uppercase tracking-wider font-semibold pb-1">
                  دسته‌بندی‌های کالکشن
                </span>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right py-2.5 text-sm font-medium transition-colors ${
                      activeCategory === item.id ? 'text-[#2A2421] font-bold' : 'text-[#5A504B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-right py-2.5 text-sm font-medium text-[#5A504B]"
                >
                  برگزیده‌ها ({toPersianDigits(wishlistCount)})
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] space-y-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-sm text-[#2A2421] font-medium"
              >
                <Send className="w-3.5 h-3.5 text-[#A08875]" />
                <span>مشاوره سایز در تلگرام</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#2A2421] text-[#FAF6F0] text-sm font-medium"
              >
                <Instagram className="w-3.5 h-3.5 text-[#D4C5B9]" />
                <span>اینستاگرام ولا لیبل</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
