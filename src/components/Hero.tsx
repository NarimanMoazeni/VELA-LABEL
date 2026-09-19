import React from 'react';
import { Ruler, Sparkles, Package, ArrowDownLeft } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProduct,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-12 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Text Narrative Column (order 2 on mobile, 1 on desktop) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2 lg:order-1">
          
          {/* Collection Capsule Tag */}
          <div className="flex items-center gap-2 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-[#A08875] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs text-[#A08875] tracking-widest uppercase font-semibold font-sans">
              AUTUMN CAPSULE COLLECTION • VELA LABEL ✦
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2A2421] font-bold tracking-tight leading-[1.25]">
              اصالت، وقار و سادگی
            </h1>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#A08875] italic font-normal">
              کالکشن اختصاصی کت، شومیز و شلوارهای دست‌دوز زنانه
            </p>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-sm sm:text-base text-[#5A504B] leading-relaxed max-w-xl font-light">
            تعادل میان معماری پارچه‌های الیاف طبیعی و ظرافت دوخت شخصی‌دوزی مزونی. هر لباس برای کمد کپسولی بانوان مستقل طراحی شده تا هم در محیط رسمی و هم قرارهای روزمره، استایلی بی‌نقص و آرام داشته باشید.
          </p>

          {/* Discreet Luxury Trust Micro-Strip (Non-selectable, elegant) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#786C65] select-none pt-1">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E8DFD5]">
              <span className="text-[#A08875]">✦</span>
              <span className="font-medium text-[#4A403A]">شخصی‌دوزی مزونی</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E8DFD5]">
              <span className="text-[#A08875]">✦</span>
              <span className="font-medium text-[#4A403A]">پارچه‌های اصیل الیاف طبیعی</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E8DFD5]">
              <span className="text-[#A08875]">✦</span>
              <span className="font-medium text-[#4A403A]">تیراژ محدود آتلیه</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all shadow-md group active:scale-95 cursor-pointer"
              id="hero-explore-btn"
            >
              <span className="text-sm font-medium tracking-wide">مشاهده محصولات کالکشن</span>
              <span className="text-[#D4C5B9] transition-transform group-hover:translate-x-[-3px]">✦</span>
            </button>

            <button
              onClick={() => onOpenQuickView(featuredProduct)}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FAF6F0] border border-[#D4C5B9] text-[#2A2421] hover:bg-[#E8DFD5] transition-all text-sm font-medium active:scale-95 cursor-pointer"
            >
              <span>بررسی استایل مدل نگاه اول</span>
              <ArrowDownLeft className="w-4 h-4 text-[#A08875]" />
            </button>
          </div>

          {/* Real Boutique Guarantees (Replacing arbitrary fake metrics) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#E8DFD5] select-none">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6F0]/80 border border-[#E8DFD5]/60">
              <Ruler className="w-5 h-5 text-[#A08875] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#2A2421]">تطابق دقیق سایز</h4>
                <p className="text-[11px] text-[#786C65] mt-0.5">امکان شخصی‌سازی قد کت و دور کمر</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6F0]/80 border border-[#E8DFD5]/60">
              <Sparkles className="w-5 h-5 text-[#A08875] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#2A2421]">پارچه بدون آبرفت</h4>
                <p className="text-[11px] text-[#786C65] mt-0.5">الیاف طبیعی فرآوری‌شده و تنفس‌پذیر</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6F0]/80 border border-[#E8DFD5]/60">
              <Package className="w-5 h-5 text-[#A08875] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#2A2421]">بسته‌بندی نفیس</h4>
                <p className="text-[11px] text-[#786C65] mt-0.5">همراه با کاور مخصوص و شناسنامه لباس</p>
              </div>
            </div>
          </div>

        </div>

        {/* Hero Visual Column (order 1 on mobile, 2 on desktop) */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            
            {/* Main Portrait Frame with 3:4 Aspect Ratio */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-[#E8DFD5] border border-[#E8DFD5] group cursor-pointer" 
              onClick={() => onOpenQuickView(featuredProduct)}
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle top brand imprint */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/90 font-serif tracking-[0.25em] text-xs sm:text-sm uppercase select-none drop-shadow-md">
                VELA • ATELIER
              </div>

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/85 via-transparent to-transparent"></div>
              
              {/* Overlay Metadata */}
              <div className="absolute bottom-6 right-6 left-6 text-white flex items-end justify-between select-none">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#D4C5B9] font-medium block">
                    LOOK 01 • AUTUMN 2026
                  </span>
                  <p className="text-base sm:text-lg font-bold mt-0.5 text-[#FAF6F0]">
                    {featuredProduct.title}
                  </p>
                  <p className="text-xs text-[#E5D7CA]/90 font-light mt-0.5">
                    {featuredProduct.fabric}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2A2421]/90 backdrop-blur-md text-[#D4C5B9] text-[11px] font-medium border border-white/10">
                  دست‌دوز در تهران
                </span>
              </div>
            </div>

            {/* Decorative Floating Badge */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-[#FFFFFF] p-3.5 rounded-xl shadow-xl border border-[#E8DFD5] max-w-[220px] select-none">
              <p className="text-[11px] text-[#A08875] uppercase font-bold tracking-wider">
                سفارشی‌دوزی مزون وِلا
              </p>
              <p className="text-xs text-[#5A504B] mt-1 leading-normal">
                امکان تطابق قد و سایز کت طبق راهنمای اندازه‌گیری
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
