import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AtelierPhilosophy } from './components/AtelierPhilosophy';
import { BespokeBanner } from './components/BespokeBanner';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WishlistModal } from './components/WishlistModal';
import { PRODUCTS, CATEGORIES, toPersianDigits } from './data/products';
import { Product, CartItem, CustomerOrderData, ToastData } from './types';
import { SlidersHorizontal, ShoppingBag } from 'lucide-react';

export default function App() {
  // Products & Filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals and Drawers
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

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
    // Default initial sample item matching Stitch design
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
    }, 3200);
  };

  const handleDismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
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
      showToast(`«${product.title}» از لیست علاقه‌مندی‌ها حذف شد`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`«${product.title}» به لیست علاقه‌مندی‌ها اضافه شد`);
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast(`«${product.title}» از علاقه‌مندی‌ها حذف شد`);
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
      return 0; // default featured order
    });
  }, [selectedCategory, sortBy, searchQuery]);

  // Total items in cart
  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Scroll to catalog section
  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0EB] text-[#2A2421] selection:bg-[#FADDCE] selection:text-[#27180B]">
      
      {/* 1. Header Component */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 md:pt-28">
        
        {/* 2. Hero Editorial Section */}
        <Hero
          onExploreClick={handleScrollToCatalog}
          onOpenQuickView={handleOpenModal}
          featuredProduct={PRODUCTS[3]} // کت مونوکروم سند اوور سایز (Look 01)
        />

        {/* 3. Sticky Filter & Sorting Bar */}
        <section
          id="catalog-filter-bar"
          className="sticky top-20 z-30 bg-[#F5F0EB]/95 backdrop-blur-md py-3.5 border-y border-[#E8DFD5] shadow-xs"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Category Filter Pills (Horizontal scrollable) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                      isActive
                        ? 'bg-[#2A2421] text-[#FAF6F0] shadow-sm'
                        : 'bg-[#FAF6F0] text-[#5A504B] hover:text-[#2A2421] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {cat.hasStar && (
                      <span className="text-[#D4C5B9] text-[11px]">✦</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sorting Dropdown & Items Count */}
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto text-xs">
              <span className="text-[#786C65] whitespace-nowrap">
                <strong className="text-[#2A2421] font-bold">
                  {toPersianDigits(filteredProducts.length)}
                </strong>{' '}
                آیتم دست‌دوز مزون
              </span>

              <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E8DFD5] px-3 py-1.5 rounded-full shadow-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A08875]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-[#2A2421] focus:outline-none cursor-pointer"
                >
                  <option value="featured">ترتیب: جدیدترین کالکشن</option>
                  <option value="price-desc">قیمت: از بیشترین به کمترین</option>
                  <option value="price-asc">قیمت: از کمترین به بیشترین</option>
                  <option value="popular">محبوب‌ترین نگاه استایلیست‌ها</option>
                </select>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Product Catalog Grid (Mobile 2-columns, Desktop 4-columns) */}
        <section
          id="catalog-grid"
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16"
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] space-y-3">
              <p className="font-display text-lg text-[#2A2421]">
                هیچ محصولی با مشخصات جستجوی شما یافت نشد.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="py-2 px-5 rounded-full bg-[#2A2421] text-white text-xs font-medium"
              >
                نمایش همه محصولات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={handleOpenModal}
                  onQuickAdd={handleQuickAdd}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Atelier Fabric Origins & Craftsmanship Section */}
        <AtelierPhilosophy />

        {/* 6. Bespoke Appointment & Styling Consultation Banner */}
        <BespokeBanner />

      </main>

      {/* 7. Footer Component */}
      <Footer onSelectCategory={(cat) => {
        setSelectedCategory(cat);
        handleScrollToCatalog();
      }} />

      {/* Product Detail & Sizing Modal */}
      <ProductModal
        product={activeModalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer & Telegram Checkout */}
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

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p, p.sizes[0] || '۳۸', p.colors[0]?.name || 'کرم نود', 1);
        }}
      />

      {/* Floating Quick Cart Button for Mobile Ease */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 py-3 px-5 rounded-full bg-[#2A2421] text-[#FAF6F0] shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/15"
        id="floating-cart-trigger"
        aria-label="مشاهده سبد خرید"
      >
        <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
        <span className="text-xs font-medium">سبد مزون</span>
        <span className="w-5 h-5 rounded-full bg-[#A08875] text-white text-[10px] font-bold flex items-center justify-center">
          {toPersianDigits(cartTotalCount)}
        </span>
      </button>

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
