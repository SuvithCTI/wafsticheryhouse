import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { Scissors, Menu, X, Shield, ShoppingBag, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'About Us', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f0e13]/90 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-[#0b0a0d]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full border border-gold-400/60 flex items-center justify-center bg-gradient-to-br from-[#1d1a24] to-[#0c0a10] group-hover:border-gold-300 transition-all shadow-gold-glow">
            <Scissors className="w-5 h-5 text-gold-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient">
                WAF
              </span>
              <span className="w-1 h-1 rounded-full bg-gold-400 inline-block"></span>
            </div>
            <p className="text-[9px] tracking-[0.22em] text-zinc-400 uppercase font-medium">
              Stitchery House
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links - EXACTLY 5 PAGES */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative text-xs tracking-wider uppercase font-medium transition-all py-1 ${
                  isActive
                    ? 'text-gold-300 font-semibold'
                    : 'text-zinc-300 hover:text-gold-200'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-300 via-gold-500 to-transparent rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Wishlist, Cart & Consultation */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full bg-black/40 border border-gold-400/30 text-rose-300 hover:text-rose-400 hover:border-rose-400/50 transition"
            title="View Wishlist"
          >
            <Heart className="w-4 h-4 fill-rose-500/20" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-black/40 border border-gold-400/30 text-gold-300 hover:text-gold-200 hover:border-gold-400 transition"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-black text-[9px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Action Controls */}
        <div className="lg:hidden flex items-center space-x-2">
          {/* Mobile Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full bg-black/40 border border-gold-400/30 text-rose-300"
            title="View Wishlist"
          >
            <Heart className="w-4 h-4 fill-rose-500/20" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Mobile Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-black/40 border border-gold-400/30 text-gold-300"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold-400 text-black text-[8px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900/80 border border-gold-400/30 text-zinc-200 hover:text-gold-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#110f17] border-b border-gold-400/30 px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-xs tracking-wider uppercase ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-400/30 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
