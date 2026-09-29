import React from 'react';
import { Send, Instagram, MapPin } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#FAF7F2] dark:bg-[#120E0C] border-t border-[#DDD3C6] dark:border-white/10 pt-12 pb-8 text-[#6B5D52] dark:text-[#A89C92] select-none transition-colors duration-300">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8">
        
        {/* Main Streamlined Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10">
          
          {/* Col 1 (5 cols): Brand Identity */}
          <div className="md:col-span-5 space-y-3.5 text-right">
            <div className="flex items-center gap-3">
              <img
                src="/products/logo.webp"
                alt="لوگوی رسمی ولا لیبل"
                className="w-11 h-11 rounded-full object-cover border border-[#8C6D46]/40 dark:border-[#C5A880]/50 shadow-2xs"
              />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg tracking-wider text-[#181310] dark:text-white font-bold uppercase">
                  VELA LABEL
                </span>
                <span className="font-latin text-[9px] uppercase text-[#8C6D46] dark:text-[#C5A880] tracking-[0.2em] font-semibold">
                  WOMEN'S WEAR • ATELIER
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-[13px] text-[#6B5D52] dark:text-[#A89C92] leading-relaxed max-w-sm">
              مزون پوشاک زنانه ولا؛ تمرکز بر برش‌های ساختاریافته، وقار در سیلوئت و دوخت تمام‌مزونی با پارچه‌های باکیفیت وارداتی در آتلیه اصفهان.
            </p>
          </div>

          {/* Col 2 (3 cols): Categories / Navigation */}
          <div className="md:col-span-3 space-y-3 text-right">
            <span className="font-display text-sm font-bold text-[#181310] dark:text-white block">
              کالکشن‌ها
            </span>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('all')}
                  className="hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  همه محصولات مزون
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('set')}
                  className="hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  ست وست و شلوار شکلاتی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('blazer')}
                  className="hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  کت و بلیزر تک (آدل و لورن)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('why-vela-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  مشاوره سایز و شخصی‌دوزی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (4 cols): Direct Communication */}
          <div className="md:col-span-4 space-y-3 text-right">
            <span className="font-display text-sm font-bold text-[#181310] dark:text-white block">
              ارتباط مستقیم
            </span>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-300 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#8C6D46] dark:hover:border-[#C5A880] text-[#181310] dark:text-white hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-all text-xs font-medium w-fit"
              >
                <Send className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880]" />
                <span>پشتیبانی و سفارش تلگرام: velalabel@</span>
              </a>

              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-300 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#8C6D46] dark:hover:border-[#C5A880] text-[#181310] dark:text-white hover:text-[#8C6D46] dark:hover:text-[#C5A880] transition-all text-xs font-medium w-fit"
              >
                <Instagram className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880]" />
                <span>اینستاگرام ولا: velalabel@</span>
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#8E827A] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880] shrink-0" />
              <span>ایران، اصفهان • آتلیه طراحی و دوخت ولا</span>
            </div>
          </div>

        </div>

        {/* Clean, Single Separator Bottom Bar */}
        <div className="pt-6 border-t border-stone-300/50 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-[#8E827A]">
          <div>
            © ۲۰۲۶ مزون زنانه VELA LABEL • تمامی حقوق محفوظ است.
          </div>
          <div className="flex items-center gap-2">
            <span>طراحی و دوخت در آتلیه اصفهان</span>
            <span className="text-[#8C6D46] dark:text-[#C5A880]">✦</span>
            <span>ارسال با کاور اختصاصی به سراسر ایران</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
