import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#14121a] rounded-3xl border border-gold-400/30 shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gold-400/20 flex items-center justify-between bg-[#191622]">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Your Saved Wishlist</h2>
              <p className="text-xs text-zinc-400 font-light">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Design Saved' : 'Designs Saved'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/50 border border-gold-400/30 flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-zinc-200">Your Wishlist is Empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto font-light">
                  Save your favorite bridal blouses, gowns, and custom dresses to view them later.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-[#1a1724] border border-gold-400/20 flex space-x-3.5 items-center relative group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-gold-400/30 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold-400 font-medium">
                        {product.category}
                      </span>
                      <h4
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="font-serif text-xs font-bold text-white truncate cursor-pointer hover:text-gold-200"
                      >
                        {product.name}
                      </h4>
                      <p className="font-serif text-sm font-bold text-gold-gradient mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-gold-400/20 hover:bg-gold-400/30 border border-gold-400/40 text-gold-200 text-[11px] font-medium transition"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 transition"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gold-400/20 bg-[#171421] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium uppercase tracking-wider transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
