import React from 'react';
import { Award, MessagesSquare, Package, Ruler, Send, Sparkles, Clock } from 'lucide-react';
import { Reveal } from './Reveal';

export const WhyVela: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'دوخت و پارچه درجه‌یک',
      description: 'دوخت تمیز در آتلیه اصفهان با پارچه‌های وارداتی، لایی‌کشی سنتی اتویی و بدون چروک.',
    },
    {
      icon: MessagesSquare,
      title: 'مشاوره سریع سایز',
      description: 'راهنمای تخصصی انتخاب سایز و استایل در تلگرام و اینستاگرام، ۱۰ صبح تا ۸ شب.',
    },
    {
      icon: Package,
      title: 'ارسال سریع و مطمئن',
      description: 'تحویل به سراسر ایران با کاور اختصاصی مزون ولا و بسته‌بندی ایمن نفیس.',
    },
    {
      icon: Ruler,
      title: 'تنظیم قد و سایز',
      description: 'سفارشی‌سازی قد کت، شلوار و وست متناسب با اندام شما در آتلیه تخصصی.',
    },
  ];

  return (
    <section
      id="why-vela-section"
      className="w-full bg-[#EFE8DE] dark:bg-[#181310] py-12 sm:py-16 lg:py-20 select-none transition-colors duration-300"
      aria-label="چرا ولا لیبل"
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8">
        
        {/* Section Header: Matching Reference media_1790599941469.png */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span
            className="font-latin text-[10.5px] sm:text-[11.5px] text-[#8C6D46] dark:text-[#C5A880] font-bold tracking-[0.2em] uppercase inline-block"
            dir="ltr"
          >
            WHY CHOOSE VELA LABEL
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181310] dark:text-white">
            چرا ولا؟
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B5D52] dark:text-[#A89C92]">
            کیفیت ماندگار و خرید مطمئن • اصالت دوخت تمام‌مزونی
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 80} className="h-full">
                <div className="bg-[#FAF7F2] dark:bg-[#1F1915] h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#DDD3C6] dark:border-white/10 flex flex-col items-center text-center space-y-3.5 transition-all duration-300 hover:border-[#8C6D46]/60 dark:hover:border-[#C5A880]/60 shadow-2xs hover:shadow-lg group">
                  
                  {/* Circular Icon Frame */}
                  <div className="w-12 h-12 rounded-full bg-[#EAE2D7] dark:bg-white/5 border border-[#DDD3C6]/60 dark:border-white/10 flex items-center justify-center text-[#8C6D46] dark:text-[#C5A880] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base sm:text-[17px] font-bold text-[#181310] dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#6B5D52] dark:text-[#A89C92] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Integrated Telegram Size Consultation & Bespoke Atelier CTA */}
        <Reveal delay={350}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#DDD3C6] dark:border-white/10 p-5 sm:p-7 shadow-xs">
            
            {/* Ambient subtle glow */}
            <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-[#8C6D46]/8 dark:bg-[#C5A880]/8 blur-2xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#8C6D46]/6 dark:bg-[#C5A880]/6 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-right">
              
              {/* Info Column */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C6D46] dark:text-[#C5A880]" />
                  <span
                    className="font-latin text-[10px] sm:text-xs text-[#8C6D46] dark:text-[#C5A880] tracking-[0.18em] uppercase font-bold"
                    dir="ltr"
                  >
                    BESPOKE ATELIER CONCIERGE
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-[#181310] dark:text-white leading-snug">
                  نیاز به مشاوره سایز یا تنظیم قد لباس دارید؟
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B5D52] dark:text-[#A89C92] leading-relaxed">
                  مشاوران و خیاطان آتلیه ولا آماده‌اند تا پیش از خرید، قد مانتو یا شلوار را مطابق ابعاد شما تنظیم کنند یا مناسب‌ترین سایز را پیشنهاد دهند.
                </p>
              </div>

              {/* Action Column */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-end gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="https://t.me/velalabel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#181310] hover:bg-[#2C231E] dark:bg-[#C5A880] dark:hover:bg-[#D4B890] text-[#FAF7F2] dark:text-[#120E0C] font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#FAF7F2] dark:text-[#120E0C]" />
                  <span>مشاوره و ثبت سفارش در تلگرام</span>
                </a>

                <div className="flex items-center gap-2 text-[11px] text-[#6B5D52] dark:text-[#A89C92]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Clock className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880]" />
                  <span>پاسخگویی فعال: ۱۰ صبح الی ۸ شب</span>
                </div>
              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};
