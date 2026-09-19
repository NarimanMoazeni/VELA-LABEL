import React from 'react';
import { Send } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#FAF6F0] border-t border-[#E8DFD5] pt-14 pb-10 text-[#5A504B]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#A08875]/60 flex items-center justify-center text-[11px] text-[#A08875] bg-white">
                ✦
              </div>
              <span className="font-brand text-2xl tracking-widest text-[#2A2421] uppercase">
                VELA LABEL
              </span>
            </div>
            <p className="text-xs text-[#786C65] leading-relaxed">
              روایت پاریسی از خطوط مینیمال، برش‌های بی‌نقص و پارچه‌های اعلا. مزون زنانه ولا مقصدی
              اختصاصی برای بانوانی که زیبایی را در سکوت و اصالت بازمی‌یابند.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#2A2421] uppercase block font-sans">
              بخش‌های مزون
            </span>
            <ul className="space-y-2 text-xs text-[#786C65]">
              <li>
                <button
                  onClick={() => onSelectCategory('coat')}
                  className="hover:text-[#2A2421] transition-colors"
                >
                  کالکشن پاییز و زمستان
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('blazer')}
                  className="hover:text-[#2A2421] transition-colors"
                >
                  کت و بلیزر دست‌دوز
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('silk')}
                  className="hover:text-[#2A2421] transition-colors"
                >
                  شومیز و پیراهن‌های ابریشم
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('trousers')}
                  className="hover:text-[#2A2421] transition-colors"
                >
                  شلوار و استایل مونوکروم
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#2A2421] uppercase block font-sans">
              خدمات و اصالت
            </span>
            <ul className="space-y-2 text-xs text-[#786C65]">
              <li className="cursor-pointer hover:text-[#2A2421] transition-colors">
                پرو اختصاصی و سفارشی‌دوزی
              </li>
              <li className="cursor-pointer hover:text-[#2A2421] transition-colors">
                ضمانت تبادل سایز تا ۴۸ ساعت
              </li>
              <li className="cursor-pointer hover:text-[#2A2421] transition-colors">
                ارسال اکسپرس در تهران و شهرستان
              </li>
              <li className="cursor-pointer hover:text-[#2A2421] transition-colors">
                راهنمای نگهداری الیاف نفیس
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#2A2421] uppercase block font-sans">
              آتلیه و ارتباط مستقیم
            </span>
            <p className="text-xs text-[#786C65] leading-relaxed">
              کانسیرژ آنلاین مزون در تلگرام آماده هماهنگی وقت پرو حضوری و مشاوره استایل شخصی است.
            </p>
            <a
              href="https://t.me/velalabel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full border border-[#E8DFD5] bg-[#FFFFFF] text-[#2A2421] hover:border-[#2A2421] transition-all text-xs font-medium"
            >
              <Send className="w-3.5 h-3.5 text-[#A08875]" />
              <span>گفتگو با مشاور مزون</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#786C65]">
          <div>
            © ۲۰۲۶ مزون زنانه VELA LABEL • تمامی حقوق طراحی و محتوا محفوظ است.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#2A2421] cursor-pointer">شرایط استفاده و حریم خصوصی</span>
            <span className="text-[#A08875] font-serif">پاریس — تهران</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
