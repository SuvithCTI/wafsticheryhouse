import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import {
  X,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Phone,
  User,
  Mail
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');

  // Address Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('Madurai');
  const [state, setState] = useState('Tamil Nadu');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pincode || !address || !city) {
      alert('Please fill in all required address fields.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const orderId = `WAF-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      id: orderId,
      customerName: fullName,
      phone,
      email,
      pincode,
      address,
      city,
      state,
      customNotes: notes,
      paymentMethod,
      items: [...items],
      totalAmount,
      status: 'waiting_for_confirmation',
      createdAt: new Date().toISOString()
    };

    setPlacedOrder(newOrder);
    setStep('confirmation');
  };

  const handleFinish = () => {
    onOrderCompleted();
    setStep('address');
    setFullName('');
    setPhone('');
    setEmail('');
    setPincode('');
    setAddress('');
    setNotes('');
    setPlacedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#16121f] border border-gold-400/30 rounded-3xl text-white shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-gold-400/20 bg-[#1c1728] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                {step === 'address' && 'Delivery Address & Contact'}
                {step === 'payment' && 'Select Payment Method'}
                {step === 'confirmation' && 'Order Placed Status'}
              </h2>
              <p className="text-[11px] text-zinc-400">
                WAF Stitchery House • Atelier Checkout
              </p>
            </div>
          </div>

          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Navigation Progress Bar */}
        <div className="bg-[#110e19] px-6 py-3 border-b border-gold-400/10 flex items-center justify-between text-xs text-zinc-400 flex-shrink-0">
          <div className={`flex items-center space-x-2 ${step === 'address' ? 'text-gold-300 font-bold' : step === 'payment' || step === 'confirmation' ? 'text-emerald-400' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">1</span>
            <span>Address Details</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-gold-400/20" />
          <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-gold-300 font-bold' : step === 'confirmation' ? 'text-emerald-400' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">2</span>
            <span>Payment</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-gold-400/20" />
          <div className={`flex items-center space-x-2 ${step === 'confirmation' ? 'text-gold-300 font-bold' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">3</span>
            <span>Order Placed</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {/* STEP 1: ADDRESS & CUSTOMER DETAILS */}
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-serif text-base font-bold text-gold-300 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>Shipping Address & Customer Info</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sundaram"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-black/40 border border-gold-400/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98450 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black/40 border border-gold-400/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        placeholder="e.g. ananya@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-gold-400/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 625020"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">City / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Madurai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1 font-medium">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tamil Nadu"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">Complete Street Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House / Flat No., Building Name, Street, Landmark..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-black/40 border border-gold-400/30 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">Custom Sizing / Fitting Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Sleeve length 10.5 inches, padded cups needed"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/40 border border-gold-400/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-7 py-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-gold-intense hover:scale-105 transition"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-[#1c1728] border border-gold-400/20 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs text-gold-400 font-normal">{items.length} items</span>
                  </h4>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-xs border-b border-gold-400/10 pb-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover rounded-lg border border-gold-400/30"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-white truncate">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-400">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                        </div>
                        <span className="font-serif font-bold text-gold-300">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gold-400/20 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Items Subtotal</span>
                      <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Custom Tailoring & Alteration</span>
                      <span className="text-emerald-400">Included</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Insured Express Shipping</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gold-400/20">
                      <span>Total Amount</span>
                      <span className="font-serif text-base text-gold-gradient">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center space-x-2 text-[11px] text-gold-300">
                    <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>100% Fit Guarantee & Master Craftsmanship</span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD PAGE */}
          {step === 'payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Payment Options */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="font-serif text-base font-bold text-gold-300 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gold-400" />
                  <span>Choose Preferred Payment Option</span>
                </h3>

                <div className="space-y-3">
                  {/* Option 1: UPI Online */}
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`block p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'upi'
                        ? 'bg-gold-400/10 border-gold-400 text-white shadow-gold-glow'
                        : 'bg-black/30 border-gold-400/20 text-zinc-300 hover:border-gold-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="accent-gold-400"
                        />
                        <div>
                          <p className="font-serif text-sm font-bold text-white">Instant UPI / NetBanking / Cards</p>
                          <p className="text-[11px] text-zinc-400">GPay, PhonePe, Paytm, BHIM UPI or Cards</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-semibold">Fastest</span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-gold-400/20 text-xs text-zinc-300 space-y-2">
                        <p className="font-medium text-gold-300">Official Atelier UPI ID: <code className="bg-black/60 px-2 py-0.5 rounded text-white border border-gold-400/30">wafstitchery@upi</code></p>
                        <p className="text-[11px] text-zinc-400">Payment details and instant confirmation link will be shared after order placement.</p>
                      </div>
                    )}
                  </label>

                  {/* Option 2: Pay on Delivery / Atelier Confirmation */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`block p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-gold-400/10 border-gold-400 text-white shadow-gold-glow'
                        : 'bg-black/30 border-gold-400/20 text-zinc-300 hover:border-gold-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-gold-400"
                        />
                        <div>
                          <p className="font-serif text-sm font-bold text-white">Pay on Delivery / Fitting Confirmation</p>
                          <p className="text-[11px] text-zinc-400">Pay after size check and tailor confirmation</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-gold-400/20 text-gold-300 font-semibold">Flexible</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gold-400/30 text-gold-300 text-xs font-semibold hover:bg-gold-400/10 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Address</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-gold-intense hover:scale-105 transition"
                  >
                    <span>Place Order</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Order Summary Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-[#1c1728] border border-gold-400/20 space-y-3">
                  <h4 className="font-serif text-xs uppercase tracking-wider text-gold-400 font-bold">Delivery Preview</h4>
                  <div className="text-xs text-zinc-300 space-y-1">
                    <p className="font-bold text-white">{fullName}</p>
                    <p>{phone}</p>
                    <p className="text-zinc-400">{address}, {city}, {state} - {pincode}</p>
                  </div>

                  <div className="pt-3 border-t border-gold-400/20 space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Total Amount:</span>
                      <span className="font-serif font-bold text-gold-gradient text-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER PLACED POPUP (WAITING FOR CONFIRMATION) */}
          {step === 'confirmation' && placedOrder && (
            <div className="max-w-xl mx-auto text-center space-y-6 py-4 animate-in zoom-in-95 duration-300">
              
              {/* Success Badge & Status Banner */}
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-white">
                  Order Placed Successfully!
                </h3>
                
                {/* WAITING FOR CONFIRMATION POPUP BADGE */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-md">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Status: Waiting for Confirmation</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light bg-black/40 p-4 rounded-2xl border border-gold-400/20">
                Thank you, <strong className="text-gold-300 font-semibold">{placedOrder.customerName}</strong>! Your order reference <strong className="text-white font-serif">{placedOrder.id}</strong> has been logged into our atelier system. Our Master Tailor will review your sizing and contact you within 2-4 hours to confirm your custom measurements & order specifications.
              </p>

              {/* Order Specs Summary Card */}
              <div className="p-4 rounded-2xl bg-[#1c1728] border border-gold-400/20 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gold-400/20">
                  <span className="text-zinc-400">Order Reference:</span>
                  <span className="font-serif font-bold text-gold-300 text-sm">{placedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Paid / Payable:</span>
                  <span className="font-serif font-bold text-white">₹{placedOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Payment Method:</span>
                  <span className="uppercase text-gold-400 font-semibold">{placedOrder.paymentMethod === 'upi' ? 'UPI / Online' : 'Pay on Delivery'}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gold-400/10">
                  <span className="text-zinc-400">Estimated Delivery:</span>
                  <span className="text-emerald-400 font-semibold">5 - 7 Business Days</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-gold-intense hover:scale-105 transition"
                >
                  Back to Shopping
                </button>

                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello WAF Stitchery House! I have placed order ${placedOrder.id} for ₹${placedOrder.totalAmount.toLocaleString('en-IN')}. Please confirm my order.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full border border-emerald-500/50 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40 text-xs font-semibold uppercase tracking-wider transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Master Tailor on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
