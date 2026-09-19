import React from 'react';
import { Feather, Sparkles, Gem } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {
  return (
    <section
      id="atelier-philosophy"
      className="w-full bg-[#FAF6F0] py-14 sm:py-20 border-y border-[#E8DFD5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 space-y-2">
          <span className="text-xs text-[#A08875] tracking-widest uppercase font-semibold font-sans">
            ATELIER PHILOSOPHY • مواد اولیه اصیل
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#2A2421] font-semibold">
            اصالت پارچه، زبان گویای ولا لیبل
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed max-w-2xl mx-auto pt-1 font-light">
            ما پارچه‌ها را به عنوان مجسمه‌ای زنده می‌نگریم. هر متر از الیاف مورد استفاده در مزون ولا
            مستقیماً از کارگاه‌های بافندگی معتبر ایتالیا و فرانسه دست‌چین می‌شود.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-3 group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875] group-hover:bg-[#2A2421] group-hover:text-white transition-colors">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base sm:text-lg text-[#2A2421] font-semibold">
              ابریشم ۱۰۰٪ طبیعی توت
            </h3>
            <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
              بافته شده در لیون فرانسه با جلای ابریشمی مات و تنفس‌پذیری فوق‌العاده؛ سازگار با
              حساس‌ترین پوست‌ها بدون کوچک‌ترین الکتریسیته ساکن.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-3 group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875] group-hover:bg-[#2A2421] group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base sm:text-lg text-[#2A2421] font-semibold">
              لینن سنگ‌شور توسکانی
            </h3>
            <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
              فرآوری شده به شیوه سنتی با سنگ‌های طبیعی جهت خلق زیردست بسیار نرم و ریزش ساختاریافته بدون
              از دست دادن فرم دوخت‌های کتی.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-3 group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875] group-hover:bg-[#2A2421] group-hover:text-white transition-colors">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base sm:text-lg text-[#2A2421] font-semibold">
              کشمیر گرم‌بالای زمستانه
            </h3>
            <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
              ترکیب الیاف موی نرم بز کوهی و پشم مرینوس خالص با تراکم ۵۰۰ گرم در مترمربع برای خلق سبکی
              بی‌وزن در کنار حداکثر گرمایش مطبوع.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
