import React, { useState } from 'react';
import { Product } from '../types';
import { X, Scissors, Check, ShieldCheck, Ruler, ShoppingBag, Heart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire?: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onInquire,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart
}) => {
  if (!product) return null;

  const allImages = [product.image, ...(product.additionalImages || [])];
  const [selectedImg, setSelectedImg] = useState(allImages[0]);
  const [selectedSize, setSelectedSize] = useState<string>('Custom Sizing');

  const sizes = ['XS (32)', 'S (34)', 'M (36)', 'L (38)', 'XL (40)', 'Custom Sizing'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pt-24 sm:pt-28 pb-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Container - Single Unified Box on Mobile */}
      <div className="relative w-full max-w-4xl max-h-[82vh] sm:max-h-[85vh] bg-[#14121a] rounded-3xl border-2 border-gold-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-y-auto md:overflow-hidden z-10 my-auto flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 border border-gold-400/40 text-gold-300 hover:text-white hover:bg-gold-500/20 hover:border-gold-400 transition-all flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Images & Sizing Section (Top on Mobile, Left on Desktop) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#14121a] md:bg-[#0e0c14] flex flex-col justify-between md:border-r border-gold-400/20 space-y-4 overflow-visible md:overflow-y-auto md:max-h-[85vh]">
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-full md:min-h-[260px] md:max-h-[380px] rounded-2xl overflow-hidden border border-gold-400/20 bg-zinc-900 shadow-inner flex items-center justify-center">
            <img
              src={selectedImg}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-gold-300 border border-gold-400/30 shadow-sm">
              100% Handcrafted Atelier Piece
            </div>
          </div>

          {/* Thumbnail selector */}
          {allImages.length > 1 && (
            <div className="flex items-center space-x-3 pt-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shadow-md ${
                    selectedImg === img
                      ? 'border-gold-400 ring-2 ring-gold-400/30 scale-105'
                      : 'border-gold-400/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Sizing options below image */}
          <div className="w-full pt-1">
            <div className="flex items-center justify-between text-xs text-zinc-300 mb-2">
              <span className="flex items-center space-x-1.5 font-medium">
                <Ruler className="w-3.5 h-3.5 text-gold-400" />
                <span>Select Sizing:</span>
              </span>
              <span className="text-[11px] text-gold-400 font-medium">Custom Available</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium transition ${
                    selectedSize === s
                      ? 'bg-gold-500/20 border-2 border-gold-400 text-gold-300 font-semibold shadow-sm'
                      : 'bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section (Bottom on Mobile, Right on Desktop) */}
        <div className="w-full md:w-1/2 p-4 sm:p-7 pr-4 sm:pr-14 flex flex-col justify-between space-y-4 overflow-visible md:overflow-y-auto md:max-h-[85vh]">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30">
                {product.category.toUpperCase()}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3 leading-snug">
                {product.name}
              </h2>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium">Inclusive of all tailoring</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-light text-justify">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-black/40 border border-gold-400/20 text-xs">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Fabric Material</span>
                <span className="text-zinc-200 font-medium">{product.fabric}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Needlework Type</span>
                <span className="text-zinc-200 font-medium">{product.embroidery}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-1.5 pt-1 text-[11px] text-zinc-400">
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Guaranteed Bespoke Fit or Free Alterations</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Premium Handcrafted Quality by Master Artisans</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-4 border-t border-gold-400/20">
            <div className="grid grid-cols-2 gap-3">
              {onAddToCart && (
                <button
                  onClick={() => {
                    onAddToCart(product, selectedSize);
                  }}
                  className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-gold-400/20 hover:bg-gold-400/30 border border-gold-400/50 text-gold-200 font-semibold text-xs tracking-wider uppercase transition shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>Add to Cart</span>
                </button>
              )}
              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-xl border font-semibold text-xs tracking-wider uppercase transition shadow-md ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500/80 text-rose-300'
                      : 'bg-black/50 border-gold-400/30 text-zinc-300 hover:text-rose-300 hover:border-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              )}
            </div>

            {onInquire && (
              <button
                onClick={() => {
                  onClose();
                  onInquire();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-black/40 hover:bg-gold-400/10 border border-gold-400/30 text-gold-300 font-medium text-xs tracking-wider uppercase transition"
              >
                <Scissors className="w-4 h-4" />
                <span>Book In-Person Fitting / Consultation</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition text-center"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

