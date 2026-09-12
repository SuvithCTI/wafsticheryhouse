import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { storageService } from '../services/storageService';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { ProductModal } from '../components/ProductModal';
import {
  Sparkles,
  Scissors,
  Ruler,
  Clock,
  ShieldCheck,
  Star,
  Instagram,
  ArrowRight,
  Heart,
  CheckCircle2,
  Crown,
  Package,
  Layers,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  cartItems?: CartItem[];
  wishlistIds?: string[];
  onAddToCart?: (product: Product, size?: string) => void;
  onToggleWishlist?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  wishlistIds = [],
  onAddToCart,
  onToggleWishlist
}) => {
  const reviews = storageService.getReviews();
  const gallery = storageService.getGallery().slice(0, 4);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFabricTab, setSelectedFabricTab] = useState<number>(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);

  // Auto-play review loop for mobile single column slider
  useEffect(() => {
    if (!reviews || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reviews]);

  const stats = [
    { value: '1,500+', label: 'Bespoke Outfits Crafted', sub: 'Blouses & gowns' },
    { value: '99.4%', label: 'First-Fit Perfection', sub: 'Custom contouring' },
    { value: '40+ Hrs', label: 'Hand Needlework', sub: 'Per bridal blouse' },
    { value: '4.9 ★', label: 'Loved by 800+ Brides', sub: 'Across Madurai & TN' }
  ];

  const fabrics = [
    {
      name: 'Pure Mulberry Silk',
      type: 'Bridal Blouses',
      desc: 'High-lustre South Indian silk woven specifically to hold heavy Aari and Kundan embroidery without puckering or sagging.',
      features: ['Heavy Zari Support', 'Padded Cup Compatible', 'Pure Cotton Inner Lining']
    },
    {
      name: 'Handloom Kanchipuram Brocade',
      type: 'Traditional Blouses',
      desc: 'Intricate gold and silver thread brocade designed to harmonize seamlessly with heirloom wedding Kanjeevaram sarees.',
      features: ['2-Inch Seam Margin', 'Cutwork Sleeve Ready', 'Sweat-Proof Lining']
    },
    {
      name: 'Imperial Micro Velvet',
      type: 'Reception Gowns',
      desc: 'Rich, dense-pile velvet with supple drape, providing royal depth and grandeur for evening reception dresses and lehenga blouses.',
      features: ['Sculpted Structure', 'Zardozi Embellished', 'Royal Matte Sheen']
    },
    {
      name: 'Featherlight Sheer Organza',
      type: 'Flared Anarkalis & Combos',
      desc: 'Translucent, crisp yet soft organza tailored into high-volume tiered skirts and festive twinning frocks.',
      features: ['Dramatic Volume', 'Scalloped Borders', 'Featherweight Comfort']
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Consultation & Silhouette',
      desc: 'Share your saree photos, neckline inspirations, and measurements with our master stylists on WhatsApp or at our KK Nagar boutique.'
    },
    {
      num: '02',
      title: 'Master Aari Needlecraft',
      desc: 'Experienced Madurai artisans spend 30 to 50 hours hand-embroidering zardozi, kundan, pearls, and cutdana into bespoke motifs.'
    },
    {
      num: '03',
      title: 'Couture Cut & Stitched',
      desc: 'Tailored to millimeter precision with reinforced armholes, comfortable padding, and generous 2-inch side seams for lifetime flexibility.'
    },
    {
      num: '04',
      title: 'Doorstep Delivery & Fit Guarantee',
      desc: 'Dispatched securely to your door across India. Enjoy our 100% flawless fit guarantee or complimentary alterations.'
    }
  ];



  const categories = [
    {
      title: 'Bridal & Designer Blouses',
      subtitle: 'Aari, Maggam, Zardozi & Cutwork on Pure Silk',
      tag: 'Most Popular',
      image: '/images/products/waf-b01-aari-bridal.jpg',
      action: () => onNavigate('shop')
    },
    {
      title: 'Customised Dresses & Gowns',
      subtitle: 'Reception Gowns, Alia-Cut & Tiered Anarkalis',
      tag: 'Bespoke Haute Couture',
      image: '/images/products/waf-d01-crimson-velvet-gown.jpg',
      action: () => onNavigate('shop')
    },
    {
      title: 'Mother-Daughter Combos',
      subtitle: 'Coordinated Festive Outfits for You & Your Little One',
      tag: 'Festive Twinning',
      image: '/images/products/waf-d04-mother-daughter-combo.jpg',
      action: () => onNavigate('shop')
    }
  ];

  return (
    <div className="relative pt-20 sm:pt-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION WITH 3D MANNEQUIN & RUNWAY EXPERIENCE */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
          {/* Left: Text & Haute Couture Highlights */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left z-10">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase">
                <Crown className="w-3.5 h-3.5 text-gold-400" />
                <span>KK Nagar, Madurai Atelier</span>
              </div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                <span>4.9 (800+ Brides)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Handcrafted Bridal Blouses &{' '}
              <span className="text-gold-gradient block mt-1">
                Bespoke Custom Dresses
              </span>
            </h1>

            {/* Narrative */}
            <p className="text-xs sm:text-sm lg:text-base text-zinc-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to <strong className="text-gold-300 font-semibold">WAF Stitchery House</strong>. We bring your dream attire to life with authentic hand Aari & Maggam needlecraft, royal wedding blouses, and custom-sculpted designer dresses. Every seam is cut to your body contour with our signature 100% Fit Guarantee.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs tracking-wider uppercase shadow-gold-intense hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>


              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 font-semibold text-xs tracking-wider uppercase transition-all duration-300"
              >
                <span>Book Fitting</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-zinc-400">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>100% Fit Guarantee</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>48-72h Express Available</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Package className="w-4 h-4 text-gold-400" />
                <span>Courier Saree Service</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Canvas with Framed Luxury Runway */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full">
            <Hero3DCanvas />
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-gold-400/20">
          {stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
                {st.value}
              </p>
              <p className="text-xs text-zinc-300 uppercase tracking-wider font-semibold">
                {st.label}
              </p>
              <p className="text-[11px] text-zinc-500 font-light">
                {st.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURATED ATELIER CATEGORIES (PORTFOLIO SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-4 h-4" />
            <span>Atelier Specialities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Curated Couture Portfolios
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Designed and handcrafted exclusively at our KK Nagar, Madurai boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={cat.action}
              className="group relative rounded-3xl overflow-hidden border border-gold-400/20 hover:border-gold-400/60 shadow-xl cursor-pointer transition-all duration-500 flex flex-col h-[320px] sm:h-[380px]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 backdrop-blur-md">
                  {cat.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-200 transition">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 font-light line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:text-gold-200">
                  <span>Explore Shop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 5. COUTURE FABRICS & CRAFTSMANSHIP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-gold-400/25">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-semibold tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>The Atelier Standards</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Pure Silks, Brocades & Structural Linings
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Every WAF outfit is built with generous 2-inch margins, sweat-absorbing cotton lining, and padded cup framing.
            </p>
          </div>

          {/* Fabric Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {fabrics.map((fab, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFabricTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
                  selectedFabricTab === idx
                    ? 'bg-gold-500 text-black shadow-gold-intense font-bold'
                    : 'bg-[#2a1024]/70 text-zinc-200 hover:bg-[#3d1734] border border-gold-400/25'
                }`}
              >
                {fab.name}
              </button>
            ))}
          </div>

          {/* Selected Fabric Card */}
          <div className="bg-gradient-to-br from-[#2f1228]/90 via-[#1c0a18]/95 to-[#240e20]/90 rounded-2xl p-6 border border-gold-400/30 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  {fabrics[selectedFabricTab].type}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {fabrics[selectedFabricTab].name}
              </h3>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {fabrics[selectedFabricTab].desc}
              </p>
            </div>
            <div className="space-y-2 bg-[#1b0817]/90 p-4 rounded-xl border border-gold-400/20">
              <p className="text-[10px] uppercase tracking-wider text-gold-400 font-bold">
                Couture Standard:
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {fabrics[selectedFabricTab].features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE CRAFTSMANSHIP JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-semibold tracking-wider uppercase">
            <Ruler className="w-4 h-4" />
            <span>The Atelier Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            From Needle to Masterpiece
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Every stitch is placed with intention, ensuring your garment complements your silhouette like a second skin.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative glass-panel rounded-2xl p-3.5 sm:p-6 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="font-serif text-2xl sm:text-4xl font-bold text-gold-500/30 group-hover:text-gold-400/60 transition mb-1 sm:mb-3">
                  {st.num}
                </div>
                <h3 className="font-serif text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-gold-200 transition">
                  {st.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 8. INSTAGRAM LOOKBOOK SHOWCASE (@waf_stitcheryhouse) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Instagram className="w-4 h-4" />
              <span>Direct From Our Madurai Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {BRAND_CONFIG.instagramHandle} on Instagram
            </h2>
          </div>
          <a
            href={BRAND_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-500/20 text-xs tracking-wider uppercase font-semibold transition"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @waf_stitcheryhouse</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-gold-400/20 cursor-pointer"
              onClick={() => onNavigate('gallery')}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-xs font-serif font-bold text-white line-clamp-1">
                  {item.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gold-300 mt-1">
                  <span>{item.category.replace('_', ' ').toUpperCase()}</span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-gold-400 text-gold-400" />
                    <span>{item.likes}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. VERIFIED CLIENT REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1 text-gold-400 text-xs font-semibold tracking-wider uppercase">
            <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Loved by Brides & Connoisseurs
          </h2>
        </div>

        {/* MOBILE VIEW ONLY: Single Column Slider with Automatic Loop & Manual Control */}
        {reviews.length > 0 && (
          <div className="block md:hidden relative px-2">
            <div className="glass-panel rounded-2xl p-6 border border-gold-400/30 min-h-[220px] flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gold-400">
                    {Array.from({ length: reviews[currentReviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Verified Client
                  </span>
                </div>
                <p className="text-xs text-zinc-200 font-light italic leading-relaxed min-h-[72px]">
                  "{reviews[currentReviewIndex].comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-gold-400/20 flex items-center justify-between">
                <div>
                  <p className="font-serif text-sm font-bold text-white">
                    {reviews[currentReviewIndex].name}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {reviews[currentReviewIndex].occasion}
                  </p>
                </div>

                {/* Manual Navigation Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                    className="p-2 rounded-full bg-black/60 border border-gold-400/30 text-gold-300 hover:text-white transition"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)}
                    className="p-2 rounded-full bg-black/60 border border-gold-400/30 text-gold-300 hover:text-white transition"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination Dots for Mobile Loop */}
            <div className="flex items-center justify-center space-x-2 pt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentReviewIndex
                      ? 'w-6 bg-gold-400 shadow-gold-glow'
                      : 'w-2 bg-gold-400/30 hover:bg-gold-400/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP VIEW: Full Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-2xl p-6 border border-gold-400/20 flex flex-col justify-between space-y-4 hover:border-gold-400/40 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-1 text-gold-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-300 font-light italic leading-relaxed line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-gold-400/10">
                <p className="font-serif text-sm font-bold text-white">
                  {rev.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-0.5">
                  <span>{rev.occasion}</span>
                  <span className="text-emerald-400 text-[10px]">Verified Order</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* QUICK VIEW MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={() => onNavigate('contact')}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

