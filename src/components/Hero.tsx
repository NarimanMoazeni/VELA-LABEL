import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpLeft, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, toPersianDigits } from '../data/products';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts?: Product[];
  featuredProduct?: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProducts = [],
  featuredProduct,
}) => {
  const pool =
    featuredProducts.length > 0
      ? featuredProducts
      : featuredProduct
      ? [featuredProduct]
      : PRODUCTS.slice(0, 3);

  // Character shots only (SafeImage falls back to the product shot if missing)
  const slides = pool.map((p) => ({
    product: p,
    src: p.gallery && p.gallery.length > 0 ? p.gallery[0] : p.image,
  }));

  const [index, setIndex] = useState(0);
  // Last navigation direction — inactive layers rest posed toward it (RTL: next flows left)
  const [dir, setDir] = useState<1 | -1>(1);

  const go = useCallback(
    (d: 1 | -1) => {
      if (slides.length < 2) return;
      setDir(d);
      setIndex((prev) => (prev + d + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index || slides.length < 2) return;
      // Shortest-path direction for the resting pose
      const forward = (i - index + slides.length) % slides.length;
      setDir(forward <= slides.length / 2 ? 1 : -1);
      setIndex(i);
    },
    [index, slides.length]
  );

  const safeIndex = Math.min(index, slides.length - 1);
  const current = slides[safeIndex];

  // 3D tilt parallax (desktop mouse)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch {
      // ignore
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setTilt({ x: px, y: py }));
  }, []);

  const handleLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  if (!current) return null;

  return (
    <section className="w-full bg-[#F5F0EB] select-none overflow-hidden" aria-label="کمپین فصل ولا لیبل">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">

        {/* 3D stage */}
        <div
          className="relative mx-auto w-fit max-w-full"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {/* Backdrop: giant centered brand wordmark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              transform: `translate3d(${(tilt.x * -30).toFixed(1)}px, ${(tilt.y * -20).toFixed(1)}px, 0)`,
            }}
          >
            <span
              dir="ltr"
              className="font-serif font-bold uppercase leading-none text-[30vw] sm:text-[180px] lg:text-[240px] text-transparent whitespace-nowrap"
              style={{
                WebkitTextStroke: '1.5px rgba(160, 136, 117, 0.5)',
                letterSpacing: '0.08em',
              }}
            >
              VELA
            </span>
          </div>

          {/* Backdrop glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[70%] rounded-full bg-[#A08875]/15 blur-3xl"
          />

          {/* The calling card */}
          <div
            className="relative w-[min(88vw,420px)] sm:w-[480px] aspect-[3/4] max-h-[560px] sm:max-h-none sm:h-[600px] sm:aspect-auto rounded-[28px] overflow-hidden border border-[#E8DFD5] bg-[#1C1917] shadow-[0_40px_80px_-24px_rgba(42,36,33,0.45)] will-change-transform"
            style={{
              transform: `perspective(1100px) rotateX(${(-tilt.y * 5).toFixed(2)}deg) rotateY(${(tilt.x * 7).toFixed(2)}deg) translate3d(${(tilt.x * 10).toFixed(1)}px, ${(tilt.y * 8).toFixed(1)}px, 0)`,
            }}
          >
            {/* Persistent slide layers — crossfade only, never unmounted: no black flash possible */}
            {slides.map((s, i) => {
              const active = i === safeIndex;
              return (
                <SafeImage
                  key={s.src}
                  src={s.src}
                  fallback={s.product.image}
                  alt={active ? s.product.title : ''}
                  aria-hidden={!active}
                  loading="eager"
                  className="hero-layer absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active
                      ? 'none'
                      : `perspective(1000px) rotateY(${dir === 1 ? 18 : -18}deg) translateX(${dir === 1 ? 60 : -60}px) scale(0.98)`,
                    zIndex: active ? 10 : 0,
                  }}
                />
              );
            })}

            {/* Readability: single soft gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

            {/* Campaign label */}
            <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-center z-30">
              <span
                className="text-[10px] text-[#EDE6DE]/90 tracking-[0.24em] uppercase font-medium"
                dir="ltr"
                style={{ fontFamily: 'Italiana, serif' }}
              >
                AUTUMN / WINTER 2026
              </span>
            </div>

            {/* Slide arrows */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors cursor-pointer active:scale-90 z-30"
                  aria-label="اسلاید قبلی"
                  title="قبلی"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors cursor-pointer active:scale-90 z-30"
                  aria-label="اسلاید بعدی"
                  title="بعدی"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
              </>
            )}

            {/* Bottom campaign content (keyed = soft crossfade per slide) */}
            <div key={current.product.id} className="absolute bottom-0 inset-x-0 p-5 sm:p-7 space-y-3 animate-fade-in z-30">
              <div className="space-y-1">
                <h1 className="font-display text-[30px] sm:text-4xl text-white font-bold leading-[1.25]">
                  اصالت، وقار و سادگی
                </h1>
                <p className="font-display text-sm sm:text-base text-[#EDE6DE] font-semibold">
                  {current.product.title}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto justify-center py-3 px-7 rounded-full bg-[#FAF6F0] text-[#2A2421] hover:bg-white transition-colors text-sm sm:text-[15px] font-bold shadow-md active:scale-95 cursor-pointer flex items-center"
                >
                  مشاهده کالکشن
                </button>
                <button
                  onClick={() => onOpenQuickView(current.product)}
                  className="w-full sm:w-auto justify-center py-3 px-5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm transition-colors text-sm sm:text-[15px] font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <span>بررسی {current.product.title}</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4C5B9]" />
                  ضمانت دوخت مزونی
                </span>
                {slides.length > 1 && (
                  <span className="flex items-center gap-1.5" dir="ltr">
                    {slides.map((s, i) => (
                      <button
                        key={s.product.id}
                        onClick={() => goTo(i)}
                        aria-label={`اسلاید ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                          i === safeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-white/80 mr-1">
                      {toPersianDigits(safeIndex + 1)} / {toPersianDigits(slides.length)}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Floating glass chips crossing the card edges (stronger parallax) */}
          <div
            className="pointer-events-none absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(${(tilt.x * 24).toFixed(1)}px, ${(tilt.y * 20).toFixed(1)}px, 0)`,
            }}
          >
            <div key={current.product.id} className="absolute inset-0 animate-fade-in">
              {current.product.badge && (
                <span className="absolute -top-4 right-6 sm:right-10 animate-float">
                  <span className="inline-block text-[11px] font-bold px-4 py-1.5 rounded-full bg-[#2A2421]/90 backdrop-blur-md text-[#FADDCE] border border-white/15 shadow-lg">
                    {current.product.badge}
                  </span>
                </span>
              )}
              <span className="absolute top-1/3 -left-2 sm:-left-5 animate-float-delayed">
                <span className="inline-block text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md text-[#2A2421] border border-[#E8DFD5] shadow-lg">
                  {current.product.fabric}
                </span>
              </span>
              <span className="absolute -bottom-5 left-6 sm:left-10 animate-float">
                <span className="inline-block text-sm font-extrabold px-5 py-2 rounded-full bg-[#FAF6F0] text-[#2A2421] border border-[#E8DFD5] shadow-xl">
                  {current.product.priceFormatted}
                </span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
