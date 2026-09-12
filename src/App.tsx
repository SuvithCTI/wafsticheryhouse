import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { GoldSparklesBackground } from './components/3d/GoldSparklesBackground';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => storageService.getCart());
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => storageService.getWishlist());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Cart handlers
  const handleAddToCart = (product: Product, size: string = 'Custom Sizing') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1
        };
      } else {
        updated = [...prev, { product, quantity: 1, selectedSize: size }];
      }
      storageService.saveCart(updated);
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, size: string, delta: number) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) => {
          if (item.product.id === id && item.selectedSize === size) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      storageService.saveCart(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.product.id === id && item.selectedSize === size)
      );
      storageService.saveCart(updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    storageService.saveCart([]);
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      const updated = exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      storageService.saveWishlist(updated);
      return updated;
    });
  };

  const handleRemoveWishlistId = (id: string) => {
    setWishlistIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      storageService.saveWishlist(updated);
      return updated;
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const allProducts = storageService.getProducts();
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={setCurrentPage}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        );
      case 'shop':
        return (
          <ShopPage
            onNavigate={setCurrentPage}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        );
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'gallery':
        return <GalleryPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return (
          <HomePage
            onNavigate={setCurrentPage}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c0b19] via-[#120610] to-[#180a15] text-[#FAF7F2] font-sans relative selection:bg-gold-400 selection:text-black overflow-x-hidden">
      {/* Warm Royal Atelier Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18),rgba(142,41,74,0.14)_45%,transparent_75%)] pointer-events-none z-0" />
      <div className="fixed top-1/4 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,88,116,0.16),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed top-2/3 -left-32 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(212,175,55,0.12),rgba(142,41,74,0.10)_45%,transparent_70%)] pointer-events-none z-0" />

      {/* Subtle 3D Golden Sparkles & Bokeh Ambient Field */}
      <GoldSparklesBackground />

      {/* Global Navigation Bar with strictly 5 Pages & Cart/Wishlist Modals */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Page Body: Home, Shop, About Us, Gallery, Contact */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onExploreClick={() => {
          setIsCartOpen(false);
          setCurrentPage('shop');
        }}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleClearCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveWishlistId}
        onAddToCart={(product) => {
          handleAddToCart(product, 'Custom Sizing');
        }}
        onQuickView={() => {
          setIsWishlistOpen(false);
          setCurrentPage('shop');
        }}
      />

      {/* Floating Concierge WhatsApp Button */}
      <WhatsAppFloating />

      {/* Global Footer */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
