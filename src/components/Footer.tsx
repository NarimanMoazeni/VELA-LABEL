import React from 'react';
import { Send, Instagram, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#FAF6F0] border-t border-[#E8DFD5] pt-12 pb-8 text-[#5A504B] select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 mb-10">
          
          {/* Col 1: Brand Info with Real Circular Logo */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <img
                src="/products/logo.webp"
                alt="لوگوی رسمی ولا لیبل"
                className="w-10 h-10 rounded-full object-cover border border-[#D4C5B9] shadow-xs"
              />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg tracking-wider text-[#2A2421] font-bold uppercase">
                  VELA LABEL
                </span>
                <span className="text-[8px] uppercase text-[#A08875] tracking-widest font-sans font-medium">
                  WOMEN'S WEAR • ATELIER
                </span>
              </div>
            </div>
            <p className="text-xs text-[#786C65] leading-relaxed">
              مزون تخصصی پوشاک زنانه ولا لیبل؛ طراحی و دوخت کت‌های تک مزونی و ست‌های اختصاصی با متریال باکیفیت و ایستایی شکیل در تهران.
            </p>
          </div>

          {/* Col 2: Real Categories */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-[#2A2421] uppercase block">
              دسته‌بندی‌های کالکشن
            </span>
            <ul className="space-y-2 text-xs text-[#786C65]">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('all')}
                  className="hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  همه محصولات مزون
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('set')}
                  className="hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  ست وست و شلوار شکلاتی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('blazer')}
                  className="hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  کت و بلیزرهای تک (آدل و لورن)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('bespoke-appointment');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#2A2421] transition-colors cursor-pointer"
                >
                  مشاوره و شخصی‌دوزی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Real Boutique Services */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-[#2A2421] uppercase block">
              خدمات و پشتیبانی
            </span>
            <ul className="space-y-2 text-xs text-[#786C65]">
              <li>ارسال اکسپرس به سراسر کشور با کاور اختصاصی</li>
              <li>امکان تنظیم قد و اندازه دور کمر قبل از ارسال</li>
              <li>هماهنگی وقت پرو حضوری در آتلیه تهران</li>
              <li>پشتیبانی همه‌روزه از ۱۰ صبح تا ۸ شب</li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-[#2A2421] uppercase block">
              ارتباط مستقیم با آتلیه
            </span>
            <p className="text-xs text-[#786C65] leading-relaxed">
              جهت استعلام موجودی، انتخاب دقیق سایز یا ثبت سفارش اختصاصی با ما در ارتباط باشید.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] text-[#2A2421] hover:border-[#2A2421] transition-all text-xs font-medium w-fit"
              >
                <Send className="w-3.5 h-3.5 text-[#A08875]" />
                <span>پشتیبانی تلگرام: velalabel@</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] text-[#2A2421] hover:border-[#2A2421] transition-all text-xs font-medium w-fit"
              >
                <Instagram className="w-3.5 h-3.5 text-[#A08875]" />
                <span>اینستاگرام ولا: velalabel@</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#786C65]">
          <div>
            © ۲۰۲۶ مزون زنانه VELA LABEL • تمامی حقوق محفوظ است.
          </div>
          <div className="flex items-center gap-3">
            <span>طراحی و دوخت مزونی در تهران</span>
            <span>✦</span>
            <span>ارسال ایمن و بیمه‌شده</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
