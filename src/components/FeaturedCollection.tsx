import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';

interface FeaturedCollectionProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onViewAllClick: () => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  onOpenModal,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
  onViewAllClick,
}) => {
  if (!products || products.length === 0) return null;

  const mainFeatured = products.find((p) => p.category === 'set') || products[0];
  const supportingProducts = products.filter((p) => p.id !== mainFeatured.id);
  const isMainWishlisted = wishlist.some((item) => item.id === mainFeatured.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 select-none">
      <SectionHeader
        englishLabel="FEATURED LOOK • VELA ATELIER"
        title="لوک شاخص کالکشن پاییز"
        subtitle="ست دست‌دوز وست و شلوار شکلاتی با دوخت انحصاری مزون ولا"
        actionText="مشاهده همه"
        onAction={onViewAllClick}
        className="mb-8"
      />

      {/* Editorial 2-column: dominant showcase + supporting pieces */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Dominant Featured — 7 cols */}
        <div
          onClick={() => onOpenModal(mainFeatured)}
          className="lg:col-span-7 group relative cursor-pointer"
        >
          <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-[#F5F0EB]">
            <img
              src={mainFeatured.image}
              alt={mainFeatured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />

            {/* Wishlist */}
            <button
              onClick={(e) => onToggleWishlist(mainFeatured, e)}
              className={`absolute top-4 left-4 w-8 h-8 flex items-center justify-center z-10 cursor-pointer transition-all ${
                isMainWishlisted
                  ? 'text-[#A08875]'
                  : 'text-white opacity-0 group-hover:opacity-100'
              }`}
            >
              <Heart
                className={`w-4 h-4 drop-shadow-sm ${
                  isMainWishlisted ? 'fill-[#A08875]' : ''
                }`}
              />
            </button>

            {/* Quick view strip on hover */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-end justify-between">
              <div>
                <div className="text-[10px] text-[#D4C5B9] font-medium mb-1">
                  {mainFeatured.categoryLabel} • {mainFeatured.code}
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {mainFeatured.title}
                </h3>
                <div className="text-sm font-bold text-white mt-0.5">
                  {mainFeatured.priceFormatted}
                </div>
              </div>
              <button
                onClick={(e) => onQuickAdd(mainFeatured, e)}
                className="w-10 h-10 bg-white text-[#2A2421] flex items-center justify-center cursor-pointer hover:bg-[#FAF6F0]"
                title="خرید سریع"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile info below image */}
          <div className="sm:hidden py-3 space-y-1">
            <div className="text-[10px] text-[#8E827A]">{mainFeatured.categoryLabel}</div>
            <h3 className="font-display text-sm font-semibold text-[#1C1917]">{mainFeatured.title}</h3>
            <div className="text-sm font-bold text-[#2A2421]">{mainFeatured.priceFormatted}</div>
          </div>
        </div>

        {/* Supporting — 5 cols, 2 stacked cards */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {supportingProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onOpenModal={onOpenModal}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
