import React from 'react';
import { Sparkles, ShieldCheck, ArrowDownLeft } from 'lucide-react';
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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Narrative Column (order 2 on mobile, 1 on desktop) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-5 order-2 lg:order-1">
          {/* Collection Capsule Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#A08875] animate-ping"></span>
            <span className="text-[11px] sm:text-xs text-[#A08875] tracking-widest uppercase font-semibold font-sans">
              AUTUMN / WINTER CAPSULE COLLECTION • EXCLUSIVE EDITION ✦
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2A2421] font-normal tracking-tight leading-[1.2]">
              کالکشن کپسولی
            </h1>
            <p className="font-brand text-2xl sm:text-3xl lg:text-4xl text-[#A08875] italic font-normal">
              کت، بارانی و شومیز دست‌دوز
            </p>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg text-[#5A504B] leading-relaxed max-w-xl font-light">
            روایت تعادل میان معماری پارچه‌های الیاف طبیعی و هنر دوخت شخصی‌دوزی پاریسی. هر قطعه با تیراژ محدود در آتلیه تهران دوخته شده و حامل شناسه انحصاری است.
          </p>

          {/* Atelier Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#5A504B] text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A08875]" />
              <span>دوخت مزونی و پارچه‌های وارداتی</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#5A504B] text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A08875]" />
              <span>طراحی مینیمال و فاخر</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all shadow-md group active:scale-95"
              id="hero-explore-btn"
            >
              <span className="text-sm font-medium tracking-wide">مشاهده کالکشن</span>
              <span className="text-[#D4C5B9] transition-transform group-hover:translate-x-[-3px]">✦</span>
            </button>

            <button
              onClick={() => onOpenQuickView(featuredProduct)}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] hover:bg-[#F2EDE8] transition-all text-sm font-medium active:scale-95"
            >
              <span>بررسی استایل کپسولی</span>
              <ArrowDownLeft className="w-4 h-4 text-[#A08875]" />
            </button>
          </div>

          {/* Metrics Micro Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 sm:pt-6 border-t border-[#E8DFD5]/80 max-w-md">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-[#2A2421] font-semibold">۱۰۰٪</span>
              <span className="text-[11px] text-[#786C65] mt-0.5">الیاف طبیعی و پشم خالص</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-[#2A2421] font-semibold">۴۸h</span>
              <span className="text-[11px] text-[#786C65] mt-0.5">ارسال اکسپرس مزونی</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-[#2A2421] font-semibold">۳۰</span>
              <span className="text-[11px] text-[#786C65] mt-0.5">سهمیه کل هر نسخه کپسولی</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Column (order 1 on mobile, 2 on desktop) */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            
            {/* Main Portrait Frame with 3:4 Aspect Ratio */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-[#E8DFD5] border border-[#E8DFD5] group cursor-pointer" onClick={() => onOpenQuickView(featuredProduct)}>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle top brand imprint like Vogue */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/80 font-display tracking-[0.25em] text-sm uppercase select-none drop-shadow-md">
                VELA • ATELIER
              </div>

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-transparent to-transparent"></div>
              
              {/* Overlay Metadata */}
              <div className="absolute bottom-6 right-6 left-6 text-white flex items-end justify-between">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#D4C5B9] font-medium block">
                    Look 01 / Winter 24
                  </span>
                  <p className="text-base sm:text-lg font-medium mt-0.5 text-[#FAF6F0]">
                    {featuredProduct.title}
                  </p>
                  <p className="text-xs text-[#E5D7CA]/90 font-light mt-0.5">
                    {featuredProduct.fabric}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2A2421]/90 backdrop-blur-md text-[#D4C5B9] text-[11px] font-medium border border-white/10">
                  پاریس — تهران
                </span>
              </div>
            </div>

            {/* Decorative Floating Frame */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-[#FFFFFF] p-4 rounded-xl shadow-xl border border-[#E8DFD5] max-w-[210px] animate-delicate">
              <p className="text-[11px] text-[#A08875] uppercase font-bold tracking-wider">
                سفارشی‌دوزی اختصاصی
              </p>
              <p className="text-xs text-[#5A504B] mt-1 leading-normal">
                تطابق کامل با اندازه‌های منحصر‌به‌فرد شما در آتلیه ولا
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
