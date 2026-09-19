import React from 'react';
import { Sparkles, ShieldCheck, Feather } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {
  const materials = [
    {
      icon: Sparkles,
      title: 'لینن سنگ‌شور ارگانیک',
      tagline: 'سبک، خنک و تنفس‌پذیر',
      description:
        'الیاف کتان طبیعی با فرآوری سنگ‌شور ویژه جهت ایجاد لطافت بی‌نظیر و ممانعت از آبرفت؛ پایه‌ای ایده‌آل برای دوخت کت‌های تن‌پوش آزاد و شومیزهای چهارفصل.',
    },
    {
      icon: ShieldCheck,
      title: 'کرپ و گاباردین کتی',
      tagline: 'ایستایی ساختاریافته و بدون چروک',
      description:
        'بافت متراکم، خوش‌فرم و باوقار با ریزش شکیل بر روی اندام؛ طراحی‌شده برای دوخت کت و شلوارهای فرمال و پالتوهای پاییزه با ماندگاری چندساله.',
    },
    {
      icon: Feather,
      title: 'ساتن و حریر ابریشمی مات',
      tagline: 'لطافت مجلل و سازگار با پوست',
      description:
        'جلوه‌ای مات و اشرافی بدون درخشش زننده یا الکتریسیته ساکن؛ ایجاد لَختی رویایی و تنفس‌پذیری فوق‌العاده برای شومیزها و تاپ‌های کپسولی.',
    },
  ];

  return (
    <section
      id="atelier-philosophy"
      className="w-full bg-[#FAF6F0] py-16 sm:py-24 border-y border-[#E8DFD5] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          
          {/* Pure Latin Serif Subtitle */}
          <span 
            className="text-xs sm:text-[13px] text-[#A08875] tracking-[0.25em] uppercase font-serif font-medium block"
            dir="ltr"
          >
            ATELIER CRAFTSMANSHIP & NOBLE FABRICS
          </span>

          {/* Eye-catching Persian Luxury Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2A2421] font-bold tracking-tight">
            اصالت پارچه، امضای ماندگار وِلا لیبل
          </h2>

          {/* Refined Contextual Description */}
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed max-w-2xl mx-auto pt-1 font-light">
            در آتلیه ولا، پارچه‌ها صرفاً متریال نیستند؛ هر قطعه پوشاک با درک عمیق از ایستایی، راحتی و لطافت الیاف طبیعی خلق می‌شود تا احساس اعتماد‌به‌نفس و آرامش را توأمان تجربه کنید.
          </p>
        </div>

        {/* 3 Material Cards with Gradient Hover Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {materials.map((mat, idx) => {
            const Icon = mat.icon;
            return (
              <div
                key={idx}
                className="luxury-card-gradient p-7 sm:p-8 rounded-2xl border border-[#E8DFD5] flex flex-col space-y-4 group cursor-default"
              >
                {/* Icon with Gold/Espresso Accent */}
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875] group-hover:bg-[#2A2421] group-hover:text-[#FAF6F0] transition-all duration-300 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Card Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="font-display text-lg sm:text-xl text-[#2A2421] font-bold">
                    {mat.title}
                  </h3>
                  <span className="text-[11px] text-[#A08875] font-medium tracking-wide block">
                    {mat.tagline}
                  </span>
                </div>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-[#5A504B] leading-relaxed font-light">
                  {mat.description}
                </p>

                {/* Bottom subtle accent line */}
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