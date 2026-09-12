import React from 'react';
import { CartItem } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, selectedSize: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedSize: string) => void;
  onClearCart: () => void;
  onExploreClick: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreClick,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const cartSummaryMessage = `Hello WAF Stitchery House! I would like to order/inquire about the following items in my cart:\n\n${items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*\n   Size: ${item.selectedSize}\n   Qty: ${item.quantity}\n   Price: ₹${(
          item.product.price * item.quantity
        ).toLocaleString('en-IN')}`
    )
    .join('\n\n')}\n\n*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}\n\nPlease confirm availability and measurement consultation details.`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen max-w-full sm:max-w-md bg-[#131119] border-l border-gold-400/30 text-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gold-400/20 flex items-center justify-between bg-[#191622]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-white">Your Atelier Cart</h2>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-200">Your Cart is Empty</h3>
                  <p className="text-xs text-zinc-400 max-w-xs font-light">
                    Explore our bespoke bridal blouses, reception gowns, and festive custom dresses.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreClick();
                  }}
                  className="mt-2 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-black text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-gold-intense transition"
                >
                  <span>Browse Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#1a1724] border border-gold-400/20 flex space-x-3 items-center relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-gold-400/30 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5 pr-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold-400 font-medium">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-white truncate pr-2">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-black/50 text-gold-300 border border-gold-400/30">
                          Size: {item.selectedSize}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 flex-wrap gap-1">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 bg-black/60 rounded-lg p-0.5 border border-gold-400/20">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
                        >
                          <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                        <span className="text-[11px] sm:text-xs font-semibold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
                        >
                          <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif text-xs sm:text-sm font-bold text-gold-gradient">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gold-400/20 bg-[#171421] space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Items Subtotal:</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Custom Fitting & Alterations:</span>
                  <span className="text-emerald-400 font-medium">Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gold-400/20">
                  <span>Total Amount:</span>
                  <span className="font-serif text-base text-gold-gradient">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs tracking-wider uppercase shadow-gold-intense hover:scale-[1.02] transition duration-300"
                >
                  <span>Proceed to Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-[11px] text-zinc-400 hover:text-red-400 transition text-center font-medium uppercase tracking-wider"
                >
                  Clear Entire Cart
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-zinc-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Guaranteed Bespoke Fit by WAF Master Tailors</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
