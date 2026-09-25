import React from 'react';
import { Gem, Scissors, Ruler } from 'lucide-react';
import { Reveal } from './Reveal';

export const AtelierPhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی',
      subtitle: 'ایستایی بدون تغییر فرم',
      description:
        'لایی اتویی مرغوب و آستر ابریشمی در همه کت‌ها.',
    },
    {
      icon: Gem,
      title: 'پارچه کرپ و فاستونی',
      subtitle: 'بدون پرز و بدون چروک',
      description:
        'پارچه وارداتی باکیفیت با ریزش شکیل روی اندام.',
    },
    {
      icon: Ruler,
      title: 'فیت مزونی',
      subtitle: 'متناسب با اندام شما',
      description:
        'الگوی اختصاصی آتلیه اصفهان با امکان تنظیم قد و سایز.',
    },
  ];

  return (
    <section
      id="atelier-philosophy"
      className="w-full bg-[#FAF6F0] py-10 sm:py-14 border-y border-[#E8DFD5] select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-1.5">
          <span 
            className="text-[9.5px] text-[#A08875] tracking-[0.22em] uppercase font-serif font-semibold block"
            dir="ltr"
          >
            ATELIER CRAFTSMANSHIP • VELA LABEL
          </span>

          <h2 className="font-display text-2xl sm:text-3xl text-[#2A2421] font-bold tracking-tight">
            کیفیت آتلیه ولا
          </h2>

          <p className="text-sm sm:text-[15px] text-[#5A504B] leading-relaxed max-w-2xl mx-auto font-normal">
            انتخاب دقیق پارچه و دوخت تمیز، امضای کار ماست.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 90} className="h-full">
              <div
                className="bg-[#FFFFFF] h-full p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] flex flex-col space-y-3 group cursor-default shadow-xs hover:border-[#A08875] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#2A2421] group-hover:bg-[#2A2421] group-hover:text-[#FAF6F0] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-display text-base sm:text-lg text-[#2A2421] font-bold">
                    {item.title}
                  </h3>
                  <span className="text-[10.5px] text-[#A08875] font-semibold block">
                    {item.subtitle}
                  </span>
                </div>

                <p className="text-sm text-[#6B5F58] leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="pt-2 mt-auto">
                  <div className="w-8 h-0.5 bg-[#D4C5B9] group-hover:w-16 group-hover:bg-[#A08875] transition-all duration-300 rounded-full"></div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
