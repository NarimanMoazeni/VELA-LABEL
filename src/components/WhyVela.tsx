import React from 'react';
import { ShoppingBag, Clock, PackageCheck, Scissors } from 'lucide-react';

export const WhyVela: React.FC = () => {
  const benefits = [
    {
      icon: ShoppingBag,
      title: 'تضمین کیفیت دوخت',
      description: 'دوخت اختصاصی آتلیه تهران با پارچه‌های درجه یک وارداتی',
    },
    {
      icon: Clock,
      title: 'مشاوره سریع',
      description: 'راهنمایی انتخاب سایز و استایل در تلگرام — ۱۰ صبح تا ۸ شب',
    },
    {
      icon: PackageCheck,
      title: 'ارسال اکسپرس',
      description: 'تحویل سریع به سراسر ایران با کاور اختصاصی مزونی',
    },
    {
      icon: Scissors,
      title: 'شخصی‌دوزی',
      description: 'تنظیم قد و دور کمر و پرو حضوری در آتلیه تهران',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 select-none">
      {/* Section heading */}
      <div className="text-center mb-8 space-y-1">
        <span
          className="text-[9px] text-[#A08875] font-serif font-medium tracking-[0.2em] uppercase"
          dir="ltr"
        >
          WHY VELA LABEL
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">
          چرا از مزون ولا خرید کنیم؟
        </h2>
      </div>

      {/* 4 columns — simple text blocks, no cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="space-y-3 text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center text-[#A08875]">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-sm font-semibold text-[#1C1917]">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B5F58] leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
