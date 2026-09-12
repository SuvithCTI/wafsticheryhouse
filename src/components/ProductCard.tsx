import React, { useRef, useState } from 'react';
import { Product } from '../types';
import { Eye, Sparkles, Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onCustomStitchClick?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -9;
    const rY = ((x - centerX) / centerX) * 9;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="group relative bg-[#15131b] rounded-2xl overflow-hidden border border-gold-400/20 hover:border-gold-400/60 shadow-lg hover:shadow-gold-glow transition-colors duration-300 flex flex-col"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15131b] via-transparent to-black/30 opacity-80" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-300 border border-gold-400/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Top-Right Wishlist Heart Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md border transition ${
              isWishlisted
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'bg-black/60 border-gold-400/30 text-zinc-300 hover:text-rose-400 hover:border-rose-400'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        )}

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] z-20">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 text-black font-semibold text-xs tracking-wider uppercase shadow-xl hover:bg-gold-400 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between space-y-2 sm:space-y-3">
        <div>
          <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-400/90 font-medium mb-1 flex items-center space-x-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-400" />
            <span>{product.fabric}</span>
          </div>
          <h3 className="font-serif text-xs sm:text-base font-bold text-zinc-100 line-clamp-1 group-hover:text-gold-200 transition">
            {product.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2 mt-0.5 sm:mt-1 font-light leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        <div className="pt-2 sm:pt-3 border-t border-gold-400/10">
          <div className="flex items-baseline justify-between mb-2 sm:mb-3">
            <div className="flex items-baseline space-x-1.5 sm:space-x-2">
              <span className="font-serif text-sm sm:text-lg font-bold text-gold-gradient">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-zinc-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider hidden sm:inline">
              Custom Fit
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {onAddToCart ? (
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl bg-gold-400/20 hover:bg-gold-400/30 border border-gold-400/40 text-gold-200 text-[10px] sm:text-xs font-semibold tracking-wide transition"
              >
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <button
                onClick={() => onQuickView(product)}
                className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-300 text-[10px] sm:text-xs font-medium transition"
              >
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Details</span>
              </button>
            )}

            {onToggleWishlist ? (
              <button
                onClick={() => onToggleWishlist(product)}
                className={`flex items-center justify-center space-x-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl border text-[10px] sm:text-xs font-semibold tracking-wide transition ${
                  isWishlisted
                    ? 'bg-rose-500/20 border-rose-500/80 text-rose-300'
                    : 'bg-rose-950/30 hover:bg-rose-900/50 border-rose-500/40 text-rose-300 hover:border-rose-400'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            ) : (
              <button
                onClick={() => onQuickView(product)}
                className="flex items-center justify-center space-x-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-300 text-[10px] sm:text-xs font-medium transition"
              >
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>View</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
