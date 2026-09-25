import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  // Last navigation direction — 1 for forward (in RTL, advances left), -1 for backwards
  const [dir, setDir] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);

  // Navigation helpers
  const go = useCallback(
    (d: 1 | -1) => {
      if (slides.length < 2) return;
      setDir(d);
      setPrevIndex(index);
      setIndex((prev) => (prev + d + slides.length) % slides.length);
    },
    [slides.length, index]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index || slides.length < 2) return;
      const forward = (i - index + slides.length) % slides.length;
      setDir(forward <= slides.length / 2 ? 1 : -1);
      setPrevIndex(index);
      setIndex(i);
    },
    [index, slides.length]
  );

  // Auto-play timer — pauses when user hovers or interacts
  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      go(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered, go]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal motion exceeds vertical and is > 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) {
        // Swipe Left: in RTL next slide
        go(1);
      } else {
        // Swipe Right: in RTL previous slide
        go(-1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

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
    setIsHovered(false);
  }, []);

  if (!current) return null;

  return (
    <section className="w-full bg-[#F5F0EB] select-none overflow-hidden" aria-label="کمپین فصل ولا لیبل">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">

        {/* 3D stage */}
        <div
          className="relative mx-auto w-fit max-w-full"
          onMouseMove={handleMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop: giant centered brand wordmark with depth parallax */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              transform: `translate3d(${(tilt.x * -28).toFixed(1)}px, ${(tilt.y * -18).toFixed(1)}px, 0)`,
            }}
          >
            <span
              dir="ltr"
              className="font-serif font-bold uppercase leading-none text-[30vw] sm:text-[180px] lg:text-[240px] text-transparent whitespace-nowrap"
              style={{
                WebkitTextStroke: '1.5px rgba(160, 136, 117, 0.45)',
                letterSpacing: '0.08em',
              }}
            >
              VELA
            </span>
          </div>

          {/* Backdrop ambient gold radiance */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[75%] rounded-full bg-[#A08875]/15 blur-3xl"
          />

          {/* The calling card */}
          <div
            className="relative w-[min(88vw,420px)] sm:w-[480px] aspect-[3/4] max-h-[560px] sm:max-h-none sm:h-[600px] sm:aspect-auto rounded-[28px] overflow-hidden border border-[#E8DFD5] bg-[#1C1917] shadow-[0_40px_80px_-24px_rgba(42,36,33,0.45)] will-change-transform"
            style={{
              transform: `perspective(1100px) rotateX(${(-tilt.y * 5).toFixed(2)}deg) rotateY(${(tilt.x * 7).toFixed(2)}deg) translate3d(${(tilt.x * 10).toFixed(1)}px, ${(tilt.y * 8).toFixed(1)}px, 0)`,
            }}
          >
            {/* Persistent slide layers — smooth 3D depth-aware crossfade */}
            {slides.map((s, i) => {
              const isActive = i === safeIndex;
              const isOutgoing = i === prevIndex && !isActive;

              // Compute precise 3D transform and opacity
              let opacity = 0;
              let transform = `perspective(1100px) rotateY(${dir === 1 ? -16 : 16}deg) translate3d(${dir === 1 ? -55 : 55}px, 0, -40px) scale(1.04)`;
              let filter = 'blur(4px)';
              let zIndex = 1;

              if (isActive) {
                opacity = 1;
                transform = 'perspective(1100px) rotateY(0deg) translate3d(0, 0, 0) scale(1)';
                filter = 'blur(0px)';
                zIndex = 10;
              } else if (isOutgoing) {
                opacity = 0;
                transform = `perspective(1100px) rotateY(${dir === 1 ? 16 : -16}deg) translate3d(${dir === 1 ? 55 : -55}px, 0, -40px) scale(0.96)`;
                filter = 'blur(2px)';
                zIndex = 9;
              }

              return (
                <SafeImage
                  key={s.src}
                  src={s.src}
                  fallback={s.product.image}
                  alt={isActive ? s.product.title : ''}
                  aria-hidden={!isActive}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="hero-layer absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    opacity,
                    transform,
                    filter,
                    zIndex,
                  }}
                />
              );
            })}

            {/* Creative Glint: Subtle luxury optical light sweep on slide change */}
            <div
              key={`glint-${safeIndex}`}
              className="hero-glint absolute inset-0 z-15 pointer-events-none bg-gradient-to-r from-transparent via-white/12 to-transparent w-[200%] h-full -top-1/4 -left-1/2"
            />

            {/* ULTRA-SMOOTH EDITORIAL BLACK GRADIENT — z-20 for maximum text legibility */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(14, 11, 9, 0.96) 0%, rgba(14, 11, 9, 0.88) 18%, rgba(14, 11, 9, 0.68) 38%, rgba(14, 11, 9, 0.36) 58%, rgba(14, 11, 9, 0.12) 74%, rgba(14, 11, 9, 0) 88%)',
              }}
            />

            {/* Subtle top vignette for campaign tag clarity */}
            <div
              className="absolute inset-x-0 top-0 h-24 z-20 pointer-events-none bg-gradient-to-b from-black/55 via-black/15 to-transparent"
            />

            {/* Top Campaign Season Tag */}
            <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-center z-30 pointer-events-none">
              <span
                className="text-[10px] text-[#FAF6F0] tracking-[0.24em] uppercase font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                dir="ltr"
                style={{ fontFamily: 'Italiana, serif' }}
              >
                AUTUMN / WINTER 2026
              </span>
            </div>

            {/* Slide Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-90 z-30 shadow-md text-white"
                  aria-label="اسلاید قبلی"
                  title="قبلی"
                >
                  <ChevronRight className="w-5 h-5 text-white drop-shadow-sm" />
                </button>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-90 z-30 shadow-md text-white"
                  aria-label="اسلاید بعدی"
                  title="بعدی"
                >
                  <ChevronLeft className="w-5 h-5 text-white drop-shadow-sm" />
                </button>
              </>
            )}

            {/* Bottom Campaign Content Block */}
            <div
              key={current.product.id}
              className="absolute bottom-0 inset-x-0 p-5 sm:p-7 space-y-3 animate-fade-in z-30"
            >
              <div className="space-y-1.5">
                <h1 className="font-display text-[28px] sm:text-4xl text-white font-bold leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  اصالت، وقار و سادگی
                </h1>
                <p className="font-display text-sm sm:text-base text-[#FAF6F0] font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A08875] inline-block shadow-xs"></span>
                  <span>{current.product.title}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-0.5">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto justify-center py-3 px-7 rounded-full bg-[#FAF6F0] text-[#2A2421] hover:bg-white transition-colors text-sm sm:text-[15px] font-bold shadow-lg active:scale-95 cursor-pointer flex items-center"
                >
                  مشاهده کالکشن
                </button>
                <button
                  onClick={() => onOpenQuickView(current.product)}
                  className="w-full sm:w-auto justify-center py-3 px-5 rounded-full border border-white/40 bg-black/25 text-white hover:border-white hover:bg-white/15 backdrop-blur-md transition-all text-sm sm:text-[15px] font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>بررسی {current.product.title}</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Guarantee Tag & Interactive Progress Dots */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/15">
                <span className="flex items-center gap-1.5 text-[11px] text-white/90 drop-shadow-sm font-medium">
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
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === safeIndex
                            ? 'w-7 bg-white shadow-sm'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-white/90 mr-1.5 drop-shadow-sm">
                      {toPersianDigits(safeIndex + 1)} / {toPersianDigits(slides.length)}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Floating glass chips crossing the card edges (stronger parallax) */}
          <div
            className="pointer-events-none absolute inset-0 will-change-transform z-35"
            style={{
              transform: `translate3d(${(tilt.x * 24).toFixed(1)}px, ${(tilt.y * 20).toFixed(1)}px, 0)`,
            }}
          >
            <div key={current.product.id} className="absolute inset-0 animate-fade-in">
              {current.product.badge && (
                <span className="absolute -top-4 right-6 sm:right-10 animate-float">
                  <span className="inline-block text-[11px] font-bold px-4 py-1.5 rounded-full bg-[#2A2421]/92 backdrop-blur-md text-[#FADDCE] border border-white/20 shadow-xl">
                    {current.product.badge}
                  </span>
                </span>
              )}
              <span className="absolute top-1/3 -left-2 sm:-left-5 animate-float-delayed">
                <span className="inline-block text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-[#FAF6F0]/92 backdrop-blur-md text-[#2A2421] border border-[#E8DFD5] shadow-xl">
                  {current.product.fabric}
                </span>
              </span>
              <span className="absolute -bottom-5 left-6 sm:left-10 animate-float">
                <span className="inline-block text-sm font-extrabold px-5 py-2 rounded-full bg-[#FAF6F0] text-[#2A2421] border border-[#E8DFD5] shadow-2xl">
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
