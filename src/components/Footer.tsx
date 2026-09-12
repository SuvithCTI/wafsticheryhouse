import React from 'react';
import { PageView } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { Scissors, Instagram, MessageCircle, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#09080c] border-t border-gold-400/20 text-zinc-400 pt-16 pb-8 overflow-hidden z-10">
      {/* Decorative Gold Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-gold-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gold-400/10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full border border-gold-400/60 flex items-center justify-center bg-[#181620] shadow-gold-glow">
                <Scissors className="w-4 h-4 text-gold-400 -rotate-45" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-gold-gradient">
                WAF Stitchery House
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 font-light max-w-md">
              Where heritage needlecraft meets modern bespoke tailoring. Specialists in handcrafted bridal blouses, royal maggam embroidery, and made-to-measure designer wear.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BRAND_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-300 hover:bg-gold-500/20 hover:text-white transition"
                title="Follow @waf_stitcheryhouse on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.email}`}
                className="w-9 h-9 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-300 hover:bg-gold-500/20 transition"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 md:pl-4 lg:pl-8">
            <h4 className="font-serif text-sm tracking-wider uppercase text-gold-300 mb-4 font-semibold">
              Explore Atelier
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-gold-200 transition flex items-center space-x-1.5 text-zinc-300"
                >
                  <span className="text-gold-400/60 font-mono">›</span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-gold-200 transition flex items-center space-x-1.5 text-zinc-300"
                >
                  <span className="text-gold-400/60 font-mono">›</span>
                  <span>Shop</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-gold-200 transition flex items-center space-x-1.5 text-zinc-300"
                >
                  <span className="text-gold-400/60 font-mono">›</span>
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-gold-200 transition flex items-center space-x-1.5 text-zinc-300"
                >
                  <span className="text-gold-400/60 font-mono">›</span>
                  <span>Gallery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-gold-200 transition flex items-center space-x-1.5 text-zinc-300"
                >
                  <span className="text-gold-400/60 font-mono">›</span>
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Timings */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-sm tracking-wider uppercase text-gold-300 mb-4 font-semibold">
              Visit The Atelier
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300 leading-relaxed">{BRAND_CONFIG.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-zinc-300">{BRAND_CONFIG.whatsappDisplay}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Instagram className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a
                  href={BRAND_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-300 hover:underline"
                >
                  {BRAND_CONFIG.instagramHandle}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400">{BRAND_CONFIG.openingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} WAF Stitchery House. All Rights Reserved. Crafted with bespoke precision.</p>
          <div className="flex flex-wrap items-center justify-center space-x-4">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Couture</span>
            <span>•</span>
            <a
              href={BRAND_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300"
            >
              Instagram @waf_stitcheryhouse
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
