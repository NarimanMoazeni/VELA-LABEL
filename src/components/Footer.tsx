import React from 'react';
import { Send, Instagram } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#2A2421] text-[#D4C5B9] pt-14 pb-8 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/products/logo.webp"
                alt="ولا لیبل"
                className="w-9 h-9 rounded-full object-cover border border-[#D4C5B9]/30"
              />
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-wider text-white font-bold uppercase" dir="ltr">
                  VELA LABEL
                </span>
                <span className="text-[7px] uppercase text-[#A08875] tracking-widest font-medium" dir="ltr">
                  WOMEN'S ATELIER
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A08875] leading-relaxed">
              مزون تخصصی پوشاک زنانه — طراحی و دوخت کت‌های تک و ست‌های اختصاصی در تهران.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white block">دسته‌بندی‌ها</span>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'all', label: 'همه محصولات' },
                { id: 'set', label: 'ست وست و شلوار' },
                { id: 'blazer', label: 'کت و بلیزر' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('bespoke-appointment');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  مشاوره و شخصی‌دوزی
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white block">خدمات</span>
            <ul className="space-y-2 text-xs">
              <li>ارسال اکسپرس سراسر کشور</li>
              <li>تنظیم قد و سایز قبل از ارسال</li>
              <li>پرو حضوری در آتلیه تهران</li>
              <li>پشتیبانی ۱۰ صبح تا ۸ شب</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white block">ارتباط با ما</span>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs hover:text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#A08875]" />
                <span>تلگرام: velalabel@</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#A08875]" />
                <span>اینستاگرام: velalabel@</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#D4C5B9]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#A08875]">
          <span>© ۲۰۲۶ مزون ولا لیبل — تمامی حقوق محفوظ</span>
          <span>طراحی و دوخت مزونی در تهران</span>
        </div>
      </div>
    </footer>
  );
};
