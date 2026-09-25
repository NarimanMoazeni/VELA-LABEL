import React from 'react';
import { Send, Clock, CalendarCheck } from 'lucide-react';

interface BespokeBannerProps {
  onOpenCart?: () => void;
}

export const BespokeBanner: React.FC<BespokeBannerProps> = () => {
  return (
    <section id="bespoke-appointment" className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-10 sm:py-14 select-none scroll-mt-28">
      <div className="bg-[#2A2421] text-[#FAF6F0] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-[#A08875]/20">
        
        {/* Soft Ambient Radiance */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#A08875]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#D4C5B9]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#D4C5B9] uppercase tracking-[0.2em] font-serif font-semibold">
                ATELIER CONCIERGE & SIZING ✦
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
              مشاوره سایز در تلگرام
            </h2>

            <p className="text-sm sm:text-[15px] text-[#D4C5B9]/90 leading-relaxed max-w-2xl font-light">
              برای انتخاب سایز یا تغییر قد، در تلگرام پیام بدهید.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#FAF6F0] text-[#2A2421] hover:bg-[#FFFFFF] transition-all text-sm sm:text-base font-bold shadow-sm group active:scale-95"
              >
                <Send className="w-4 h-4 text-[#A08875] group-hover:translate-x-[-2px] transition-transform" />
                <span>گفتگو در تلگرام</span>
              </a>

              <div className="flex items-center gap-1.5 text-[11px] text-[#D4C5B9]">
                <Clock className="w-3.5 h-3.5" />
                <span>ساعات پاسخگویی: ۱۰ صبح الی ۸ شب</span>
              </div>
            </div>
          </div>

          {/* Right Status Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-[#FAF6F0]/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2.5 max-w-xs w-full shadow-md text-right">
              <div className="flex items-center gap-2 text-[#D4C5B9]">
                <CalendarCheck className="w-4 h-4" />
                <span className="text-xs font-semibold">خدمات پرو اختصاصی</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#E5D7CA] leading-relaxed">
                امکان هماهنگی جهت پرو حضوری در آتلیه اصفهان و تحویل در بسته‌بندی نفیس مزونی
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10.5px] text-[#D4C5B9]">
                <span>پشتیبانی سفارشات</span>
                <span className="font-semibold text-emerald-300">آنلاین و فعال</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
