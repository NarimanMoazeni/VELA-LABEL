import React from 'react';
import { Send, Clock, Sparkles } from 'lucide-react';

export const BespokeBanner: React.FC = () => {
  return (
    <section id="bespoke-appointment" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
      <div className="bg-[#2A2421] text-[#FAF6F0] rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-[#A08875]/20">
        
        {/* Soft Ambient Radiance */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#A08875]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#D4C5B9]/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs text-[#D4C5B9] uppercase tracking-widest font-sans font-semibold">
              PRIVATE ATELIER APPOINTMENT ✦
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white">
              درخواست مشاوره استایل شخصی با طراح مزون
            </h2>
            <p className="text-xs sm:text-sm text-[#D4C5B9]/90 leading-relaxed max-w-2xl font-light">
              اگر برای مراسم خاص یا تکمیل کمد کپسولی خود به اندازه مشخص یا پارچه‌سازی اختصاصی نیاز
              دارید، کانسیرژ مزون آماده رزرو جلسه پرو حضوری یا هدایت اندازه‌گیری دقیق است.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#FAF6F0] text-[#2A2421] hover:bg-[#FFFFFF] transition-all text-xs sm:text-sm font-medium shadow-md group active:scale-95"
              >
                <Send className="w-4 h-4 text-[#A08875] group-hover:translate-x-[-2px] transition-transform" />
                <span>هماهنگی وقت با مشاور در تلگرام</span>
              </a>

              <div className="flex items-center gap-1.5 text-[11px] text-[#D4C5B9]">
                <Clock className="w-3.5 h-3.5" />
                <span>پاسخگویی سریع آتلیه: ۱۰ صبح الی ۸ شب</span>
              </div>
            </div>
          </div>

          {/* Right Status Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-[#FAF6F0]/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3 max-w-xs w-full shadow-lg">
              <div className="flex items-center gap-2 text-[#D4C5B9]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">خدمات شخصی‌دوزی</span>
              </div>
              <p className="text-xs text-[#E5D7CA] leading-relaxed">
                پرو رایگان مجدد برای اصلاح نهایی در محل آتلیه تهران یا ارسال اختصاصی کانسیرژ
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D4C5B9]">
                <span>رزرو هفتگی فعال</span>
                <span className="font-bold text-amber-200">تنها ۵ جایگاه باقی‌مانده</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
