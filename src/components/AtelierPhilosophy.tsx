import React from 'react';
import { ShieldCheck, Sparkles, Scissors } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی و آسترکشی کامل',
      subtitle: 'ایستایی ساختاریافته بدون تغییر فرم',
      description:
        'استفاده از لایی‌های مرغوب اتویی و آستر دوزی ابریشمی در تمامی کت‌ها، جهت حفظ استایل و مقاومت کار در استفاده‌های طولانی‌مدت.',
    },
    {
      icon: ShieldCheck,
      title: 'پارچه‌های درجه یک کرپ و فاستونی',
      subtitle: 'بافت متراکم، بدون پرز و بدون چروک',
      description:
        'انتخاب دقیق پارچه‌های باکیفیت وارداتی با تنفس‌پذیری عالی و ریزش شکیل روی اندام برای تضمین راحتی و وقار در هر موقعیت.',
    },
    {
      icon: Sparkles,
      title: 'الگوهای اختصاصی و فیت مزونی',
      subtitle: 'تناسب با اندام و راحتی حرکت',
      description:
        'الگوسازی دقیق در آتلیه تهران متناسب با سلیقه و اندام بانوان ایرانی، همراه با امکان تنظیم قد و سایزبندی سفارشی قبل از ارسال.',
    },
  ];

  return (
    <section
      id="atelier-philosophy"
      className="w-full bg-[#FAF6F0] py-10 sm:py-14 border-y border-[#E8DFD5] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-1.5">
          <span 
            className="text-[9.5px] text-[#A08875] tracking-[0.22em] uppercase font-serif font-semibold block"
            dir="ltr"
          >
            ATELIER CRAFTSMANSHIP • VELA LABEL
          </span>

          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#2A2421] font-bold tracking-tight">
            اصالت دوخت و کیفیت در آتلیه ولا لیبل
          </h2>

          <p className="text-xs sm:text-[13px] text-[#5A504B] leading-relaxed max-w-2xl mx-auto font-normal">
            هر اثر در ولا لیبل، حاصل دقت در انتخاب پارچه، کنترل کیفیت موشکافانه و دوخت شخصی‌دوزی با چرخ‌های صنعتی پیشرفته است.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E8DFD5] flex flex-col space-y-3 group cursor-default shadow-xs hover:border-[#A08875] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#2A2421] group-hover:bg-[#2A2421] group-hover:text-[#FAF6F0] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-display text-sm sm:text-base text-[#2A2421] font-bold">
                    {item.title}
                  </h3>
                  <span className="text-[10.5px] text-[#A08875] font-semibold block">
                    {item.subtitle}
                  </span>
                </div>

                <p className="text-xs text-[#6B5F58] leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="pt-2 mt-auto">
                  <div className="w-8 h-0.5 bg-[#D4C5B9] group-hover:w-16 group-hover:bg-[#A08875] transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
