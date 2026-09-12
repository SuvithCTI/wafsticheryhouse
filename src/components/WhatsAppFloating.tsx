import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/initialData';
import { MessageCircle, X, Scissors, Sparkles } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = "Hello WAF Stitchery House! I would like to inquire about custom tailoring & bridal collections.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Popup dialog */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#16141d] border border-gold-400/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-gold-400/20">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-emerald-400 -rotate-45" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white">WAF Atelier Concierge</h4>
                <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Online • Ready to assist</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-300 py-3 font-light leading-relaxed">
            Namaste! Want to discuss a custom blouse design, bridal trousseau, or send a reference image? Chat directly with our master tailor.
          </p>

          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase shadow-lg shadow-emerald-900/40 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-xl shadow-emerald-950/60 hover:scale-105 transition-all duration-300 border-2 border-gold-400/60 focus:outline-none"
        aria-label="WhatsApp Concierge"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-400 rounded-full flex items-center justify-center text-[9px] font-bold text-black border-2 border-[#09080c]">
          1
        </span>
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};
