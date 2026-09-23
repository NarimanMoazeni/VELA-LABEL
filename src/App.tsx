import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryPromoBanners } from './components/CategoryPromoBanners';
import { CategoryGrid } from './components/CategoryGrid';
import { WhyVela } from './components/WhyVela';
import { SectionHeader } from './components/SectionHeader';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductSkeleton } from './components/ProductSkeleton';
import { FeaturedCollection } from './components/FeaturedCollection';
import { AtelierPhilosophy } from './components/AtelierPhilosophy';
import { BespokeBanner } from './components/BespokeBanner';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WishlistModal } from './components/WishlistModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CartItem, CustomerOrderData, ToastData } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vela_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [{
      id: 'vla-st-002-۳۸-شکلاتی پاییزی',
      product: PRODUCTS[0],
      size: '۳۸',
      color: 'شکلاتی پاییزی',
      quantity: 1,
    }];
  });

  const [customerData, setCustomerData] = useState<CustomerOrderData>(() => {
    try {
      const saved = localStorage.getItem('vela_customer_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { fullName: '', phone: '', address: '', postalCode: '' };
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vela_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => { try { localStorage.setItem('vela_cart', JSON.stringify(cartItems)); } catch {} }, [cartItems]);
  useEffect(() => { try { localStorage.setItem('vela_customer_data', JSON.stringify(customerData)); } catch {} }, [customerData]);
  useEffect(() => { try { localStorage.setItem('vela_wishlist', JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const handleDismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleCategorySelect = (cat: string) => {
    setIsCategoryLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsCategoryLoading(false), 200);
    handleScrollToCatalog();
  };

  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: compositeId, product, size, color, quantity }];
    });
    showToast(`«${product.title}» به سبد خرید اضافه شد`);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, product.sizes[0] || '۳۸', product.colors[0]?.name || 'کرم نود', 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('محصول حذف شد');
  };

  const handleClearCart = () => { setCartItems([]); showToast('سبد خالی شد'); };

  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`«${product.title}» از برگزیده‌ها حذف شد`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`«${product.title}» به برگزیده‌ها اضافه شد`);
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast(`حذف شد`);
  };

  const handleOpenModal = (product: Product) => { setActiveModalProduct(product); setIsModalOpen(true); };
  const handleCloseModal = () => setIsModalOpen(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0;
    });
  }, [selectedCategory, sortBy, searchQuery]);

  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-filter-bar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0EB] text-[#2A2421]">
      {/* Header */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* 1. Hero — Full-width cinematic */}
        <Hero
          onExploreClick={handleScrollToCatalog}
          onOpenQuickView={handleOpenModal}
          featuredProducts={PRODUCTS.slice(0, 3)}
        />

        {/* 2. Category Promo Banners */}
        <CategoryPromoBanners onSelectCategory={handleCategorySelect} />

        {/* 3. Category Quick Grid */}
        <CategoryGrid
          activeCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 4. Why VELA */}
        <WhyVela />

        {/* 5. Catalog */}
        <section id="catalog-section" className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
            <SectionHeader
              englishLabel="NEW ARRIVALS • F/W 2026"
              title="جدیدترین آثار کالکشن"
              subtitle="دست‌دوزهای منتخب با دوخت سفارشی و الیاف طبیعی وارداتی"
              actionText="نمایش همه"
              onAction={() => { setSelectedCategory('all'); setSearchQuery(''); handleScrollToCatalog(); }}
              className="mb-4"
            />
          </div>

          <CategoryFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            categories={CATEGORIES}
            productCount={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div id="catalog-grid" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
            {isCategoryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-14 space-y-3 px-4">
                <p className="text-sm text-[#2A2421]">اثری با این مشخصات یافت نشد.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="py-2.5 px-6 bg-[#2A2421] text-white text-xs font-medium cursor-pointer"
                >
                  نمایش همه محصولات
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onOpenModal={handleOpenModal}
                    onQuickAdd={handleQuickAdd}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 6. Featured Collection */}
        <FeaturedCollection
          products={PRODUCTS}
          onOpenModal={handleOpenModal}
          onQuickAdd={handleQuickAdd}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onViewAllClick={handleScrollToCatalog}
        />

        {/* 7. Atelier Philosophy */}
        <AtelierPhilosophy />

        {/* 8. Bespoke Banner */}
        <BespokeBanner onOpenCart={() => setIsCartOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 w-9 h-9 bg-[#2A2421] text-white flex items-center justify-center hover:bg-[#1a1715] transition-colors cursor-pointer"
          title="بالا"
          aria-label="بازگشت به بالا"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        customerData={customerData}
        onCustomerDataChange={setCustomerData}
        onShowToast={showToast}
      />

      {/* Product Modal */}
      {activeModalProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={activeModalProduct}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((item) => item.id === activeModalProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(product) => handleAddToCart(product, product.sizes[0] || '۳۸', product.colors[0]?.name || 'کرم نود', 1)}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
