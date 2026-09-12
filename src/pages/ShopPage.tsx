import React, { useState, useMemo } from 'react';
import { PageView, Product, CartItem } from '../types';
import { storageService } from '../services/storageService';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Search, Sparkles } from 'lucide-react';

interface ShopPageProps {
  onNavigate: (page: PageView) => void;
  cartItems?: CartItem[];
  wishlistIds?: string[];
  onAddToCart?: (product: Product, size?: string) => void;
  onToggleWishlist?: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  wishlistIds = [],
  onAddToCart,
  onToggleWishlist
}) => {
  const allProducts = storageService.getProducts();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'blouses', label: 'Bridal Blouses' },
    { id: 'dresses', label: 'Customised Dresses' },
    { id: 'bridal', label: 'Bridal Couture & Gowns' }
  ];

  const fabrics = ['all', 'Pure Raw Silk', 'Velvet', 'Organza', 'Brocade', 'Modal Silk'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        // Search
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Fabric
        if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [allProducts, activeCategory, searchQuery, selectedFabric, sortBy]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>WAF Stitchery House Collections</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Bridal Blouses & Customised Dresses
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          Explore handcrafted bridal blouses with intricate Aari & Maggam needlework, alongside bespoke tailored dresses, flared anarkalis, and reception gowns from our Madurai atelier.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-black font-bold shadow-gold-glow scale-105'
                  : 'glass-panel text-zinc-400 hover:text-white hover:border-gold-400/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filters Bar: Search, Fabric, Sort */}
      <div className="glass-panel rounded-2xl p-4 mb-10 border border-gold-400/20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search blouses, kurtis, zardozi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-gold-400/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3 text-xs">
          {/* Fabric filter */}
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 hidden sm:inline">Fabric:</span>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="bg-black/50 border border-gold-400/20 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-gold-400"
            >
              <option value="all">All Fabrics</option>
              <option value="Raw Silk">Raw Silk</option>
              <option value="Velvet">Velvet</option>
              <option value="Organza">Organza</option>
              <option value="Brocade">Brocade / Zari</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/50 border border-gold-400/20 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-gold-400"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-gold-400/20 space-y-4 max-w-lg mx-auto">
          <p className="font-serif text-lg text-gold-300 font-bold">No designs match your filter</p>
          <p className="text-xs text-zinc-400 font-light">
            Try resetting your search or contact our atelier for personalized bespoke wear.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setSelectedFabric('all');
            }}
            className="px-5 py-2.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 text-xs font-semibold uppercase tracking-wider hover:bg-gold-400/30 transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={() => {
          setSelectedProduct(null);
          onNavigate('contact');
        }}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};
