import React from 'react';
import { Sparkles, Layers, Truck, Ruler } from 'lucide-react';

export const WhyVela: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'انتخاب‌های خاص مزونی',
      description: 'مجموعه‌ای از مدل‌های منتخب و دست‌دوز برای استایل فاخر روزمره و رسمی.',
    },
    {
      icon: Layers,
      title: 'پارچه‌های اصیل و ارگانیک',
      description: 'استفاده از لینن سنگشور، ابریشم طبیعی توت و پشم مرینوس با تنفس‌پذیری بالا.',
    },
    {
      icon: Truck,
      title: 'ارسال اکسپرس و بیمه‌شده',
      description: 'تحویل مطمئن در سراسر کشور با بسته‌بندی نفیس و کاور اختصاصی مزون.',
    },
    {
      icon: Ruler,
      title: 'راهنمای تطابق سایز',
      description: 'مشاوره اختصاصی استایل قبل از ارسال و امکان شخصی‌دوزی قد و اندازه کمر.',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 select-none">
      <div className="bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Section Mini Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span
            className="text-[10px] text-[#A08875] font-serif font-medium tracking-[0.2em] uppercase"
            dir="ltr"
          >
            VELA ATELIER VALUES & TRUST
          </span>
          <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1917]">
            چرا خرید از آتلیه ولا لیبل؟
          </h2>
          <p className="text-xs text-[#786C65] font-normal">
            تعهد ما به کیفیت ماندگار، ظرافت دوخت و احترام به انتخاب شماست
          </p>
        </div>

        {/* 4 Benefits: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-4 sm:p-5 rounded-xl border border-[#E8DFD5]/80 flex flex-col items-center text-center space-y-2.5 transition-all duration-200 hover:border-[#A08875] hover:shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F0EB] border border-[#E8DFD5] flex items-center justify-center text-[#A08875] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="font-display text-xs sm:text-sm font-bold text-[#1C1917] leading-snug">
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-[#6B5F58] font-light leading-relaxed">
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
