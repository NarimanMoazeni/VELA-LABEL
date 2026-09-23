import React from 'react';
import { Scissors, ShieldCheck, Sparkles } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی و آسترکشی کامل',
      description: 'لایی‌های مرغوب اتویی و آستردوزی ابریشمی در تمام کت‌ها جهت ایستایی ماندگار.',
    },
    {
      icon: ShieldCheck,
      title: 'پارچه‌های درجه یک وارداتی',
      description: 'کرپ مازراتی و فاستونی اعلا — بافت متراکم، بدون پرز و بدون چروک.',
    },
    {
      icon: Sparkles,
      title: 'الگوهای اختصاصی مزونی',
      description: 'الگوسازی دقیق متناسب با اندام بانوان ایرانی و امکان تنظیم سایز.',
    },
  ];

  return (
    <section id="atelier-philosophy" className="w-full bg-[#FAF6F0] border-y border-[#E8DFD5] py-12 sm:py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-1.5">
          <span
            className="text-[9px] text-[#A08875] tracking-[0.2em] uppercase font-serif font-medium block"
            dir="ltr"
          >
            ATELIER CRAFTSMANSHIP
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#2A2421]">
            اصالت دوخت و کیفیت
          </h2>
        </div>

        {/* 3 text columns — no cards, no borders, no hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center space-y-3">
                <div className="w-10 h-10 mx-auto flex items-center justify-center text-[#A08875]">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#2A2421]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B5F58] leading-relaxed max-w-xs mx-auto">
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
