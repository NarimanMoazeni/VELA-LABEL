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
  // Products & Filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Modals and Drawers
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vela_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'vela-804-۳۸-کمل برنز',
        product: PRODUCTS[0],
        size: '۳۸',
        color: 'کمل برنز',
        quantity: 1,
      },
    ];
  });

  // Customer order form with localStorage persistence
  const [customerData, setCustomerData] = useState<CustomerOrderData>(() => {
    try {
      const saved = localStorage.getItem('vela_customer_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      fullName: '',
      phone: '',
      address: '',
      postalCode: '',
    };
  });

  // Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vela_wishlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vela_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  // Sync customerData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vela_customer_data', JSON.stringify(customerData));
    } catch {
      // Ignore storage errors
    }
  }, [customerData]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vela_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore storage errors
    }
  }, [wishlist]);

  // Toast dispatch helper
  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleDismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Category change with quick skeleton loading & smooth scroll
  const handleCategorySelect = (cat: string) => {
    setIsCategoryLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsCategoryLoading(false), 200);
    handleScrollToCatalog();
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
    showToast(`«${product.title}» به سبد خرید اضافه شد`);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || '۳۸';
    const defaultColor = product.colors[0]?.name || 'کرم نود';
    handleAddToCart(product, defaultSize, defaultColor, 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('محصول از سبد خرید حذف شد');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`«${product.title}» از لیست برگزیده‌ها حذف شد`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`«${product.title}» به لیست برگزیده‌ها اضافه شد`);
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast(`«${product.title}» از برگزیده‌ها حذف شد`);
  };

  // Modal handlers
  const handleOpenModal = (product: Product) => {
    setActiveModalProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0;
    });
  }, [selectedCategory, sortBy, searchQuery]);

  // Total items in cart
  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Scroll to catalog section
  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-filter-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0EB] text-[#2A2421] selection:bg-[#E8DFD5] selection:text-[#2A2421]">
      
      {/* 1. Header: Fixed, compact, sticky on scroll */}
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

      {/* Main Homepage Flow */}
      <main className="flex-1 pt-18 sm:pt-20">
        
        {/* 2. Hero / Campaign Section (50/50 Desktop, Compact Mobile) */}
        <Hero
          onExploreClick={handleScrollToCatalog}
          onOpenQuickView={handleOpenModal}
          featuredProducts={PRODUCTS.slice(0, 3)}
        />

        {/* 3. Featured Category Promotional Banners */}
        <CategoryPromoBanners onSelectCategory={handleCategorySelect} />

        {/* 4. Fast Category Discovery Grid (2 cols mobile, 6 cols desktop) */}
        <CategoryGrid
          activeCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 5. Why VELA / Benefits & Trust Section */}
        <WhyVela />

        {/* 6. Main Catalog & New Arrivals */}
        <section id="catalog-section" className="w-full">
          
          {/* Section Heading with subtle divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
            <SectionHeader
              englishLabel="NEW ARRIVALS • FALL/WINTER 2026"
              title="جدیدترین آثار کالکشن مزون"
              subtitle="دست‌دوزهای منتخب این هفته با دوخت سفارشی و الیاف طبیعی وارداتی"
              actionText="نمایش همه"
              onAction={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                handleScrollToCatalog();
              }}
              hasTopDivider={true}
              hasBottomDivider={false}
              className="mb-4"
            />
          </div>

          {/* Sticky Category Filter & Sort Bar */}
          <CategoryFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            categories={CATEGORIES}
            productCount={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Product Grid */}
          <div
            id="catalog-grid"
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10"
          >
            {isCategoryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-14 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] space-y-3 px-4">
                <p className="font-display text-sm sm:text-base text-[#2A2421]">
                  هیچ اثری با مشخصات انتخابی شما یافت نشد.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="py-2.5 px-6 rounded-full bg-[#2A2421] text-white text-xs font-medium cursor-pointer hover:bg-stone-800 transition shadow-xs"
                >
                  نمایش همه محصولات مزون
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
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

        {/* 7. Featured Collection Showcase */}
        <FeaturedCollection
          products={PRODUCTS}
          onOpenModal={handleOpenModal}
          onQuickAdd={handleQuickAdd}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onViewAllClick={handleScrollToCatalog}
        />

        {/* 8. Atelier Craftsmanship Philosophy */}
        <AtelierPhilosophy />

        {/* 9. Private Atelier Appointment Consultation Banner */}
        <BespokeBanner onOpenCart={() => setIsCartOpen(true)} />

      </main>

      {/* 10. Minimalist Boutique Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 w-9 h-9 rounded-full bg-[#2A2421] text-[#FAF6F0] flex items-center justify-center shadow-lg border border-[#E8DFD5]/40 hover:bg-[#140F0D] transition-all duration-200 active:scale-95 cursor-pointer skip-delay"
          title="بازگشت به ابتدای صفحه"
          aria-label="بازگشت به بالا"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 4-Step Linear Checkout Drawer */}
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

      {/* Product Quick View & Detail Modal */}
      {activeModalProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={activeModalProduct}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some(
            (item) => item.id === activeModalProduct.id
          )}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(product) => {
          handleAddToCart(
            product,
            product.sizes[0] || '۳۸',
            product.colors[0]?.name || 'کرم نود',
            1
          );
        }}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
