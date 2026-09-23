import React from 'react';
import { Send, Clock } from 'lucide-react';

interface BespokeBannerProps {
  onOpenCart?: () => void;
}

export const BespokeBanner: React.FC<BespokeBannerProps> = () => {
  return (
    <section id="bespoke-appointment" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 select-none">
      <div className="bg-[#2A2421] text-[#FAF6F0] p-8 sm:p-12 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content */}
          <div className="lg:col-span-8 space-y-4">
            <span
              className="text-[10px] text-[#D4C5B9] uppercase tracking-[0.18em] font-serif font-medium"
              dir="ltr"
            >
              ATELIER CONCIERGE
            </span>

            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white">
              مشاوره سایز و شخصی‌دوزی
            </h2>

            <p className="text-xs sm:text-sm text-[#D4C5B9]/90 leading-relaxed max-w-xl">
              راهنمایی انتخاب سایز، درخواست تغییر قد و دور کمر، و ثبت سفارش اختصاصی از طریق تلگرام مشاور مزون ولا.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 bg-white text-[#2A2421] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#A08875]" />
                <span>گفتگو در تلگرام</span>
              </a>

              <div className="flex items-center gap-1.5 text-[11px] text-[#D4C5B9]">
                <Clock className="w-3.5 h-3.5" />
                <span>۱۰ صبح تا ۸ شب</span>
              </div>
            </div>
          </div>

          {/* Minimal info panel */}
          <div className="lg:col-span-4">
            <div className="border border-white/15 p-5 space-y-3">
              <div className="text-xs font-semibold text-[#D4C5B9]">
                خدمات آتلیه
              </div>
              <ul className="space-y-2 text-[11px] text-[#D4C5B9]/80">
                <li>• پرو حضوری در تهران</li>
                <li>• تنظیم قد و سایز قبل از ارسال</li>
                <li>• بسته‌بندی نفیس مزونی</li>
                <li>• ارسال بیمه‌شده سراسر کشور</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
