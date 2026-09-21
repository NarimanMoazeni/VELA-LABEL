import React from 'react';
import { ShoppingBag, Clock, PackageCheck, Scissors } from 'lucide-react';

export const WhyVela: React.FC = () => {
  const benefits = [
    {
      icon: ShoppingBag,
      title: 'تضمین کیفیت دوخت و پارچه',
      description: 'دوخت اختصاصی و تمیز در آتلیه تهران با پارچه‌های درجه یک، بدون چروک و بدون آبرفت.',
    },
    {
      icon: Clock,
      title: 'مشاوره و پاسخگویی سریع',
      description: 'راهنمایی دقیق انتخاب سایز و مشاوره استایل در تلگرام و اینستاگرام از ۱۰ صبح تا ۸ شب.',
    },
    {
      icon: PackageCheck,
      title: 'ارسال اکسپرس و بسته‌بندی نفیس',
      description: 'تحویل سریع به سراسر ایران همراه با کاور اختصاصی مزونی و چوب‌لباسی استاندارد.',
    },
    {
      icon: Scissors,
      title: 'شخصی‌دوزی و تنظیم قد',
      description: 'امکان سفارشی‌سازی اندازه دور کمر و قد کارها و پرو حضوری در محل آتلیه تهران.',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 select-none">
      <div className="bg-[#FAF6F0] rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Section Heading matching Reference 8 */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span
            className="text-[9.5px] text-[#A08875] font-serif font-medium tracking-[0.2em] uppercase"
            dir="ltr"
          >
            WHY CHOOSE VELA LABEL
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1917]">
            چرا از مزون ولا خرید کنیم؟
          </h2>
          <p className="text-xs sm:text-[13px] text-[#786C65] font-normal">
            تعهد به کیفیت ماندگار، احترام به سلیقه شما و تجربه خریدی مطمئن
          </p>
        </div>

        {/* 4 Cards: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8DFD5]/80 flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:border-[#A08875] hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0EB] border border-[#E8DFD5] flex items-center justify-center text-[#2A2421] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#6B5F58] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
