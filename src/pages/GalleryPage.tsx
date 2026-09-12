import React, { useState } from 'react';
import { PageView, GalleryItem } from '../types';
import { storageService } from '../services/storageService';
import { BRAND_CONFIG } from '../data/initialData';
import { Sparkles, Heart, Instagram, MessageCircle, X, ExternalLink, Scissors } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageView) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const galleryItems = storageService.getGallery();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const tabs = [
    { id: 'all', label: 'All Lookbook' },
    { id: 'bridal', label: 'Bridal Grandeur' },
    { id: 'blouses', label: 'Designer Blouses' },
    { id: 'craftsmanship', label: 'Atelier Craftsmanship' },
    { id: 'real_brides', label: 'Real Brides' }
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Haute Couture Lookbook</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          The Atelier Gallery
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          A visual chronicle of bespoke bridal lehengas, hand-embroidered aari blouses, and heirloom tailoring from our atelier.
        </p>

        <div className="pt-2">
          <a
            href={BRAND_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-500/20 text-xs font-semibold uppercase tracking-wider transition"
          >
            <Instagram className="w-4 h-4 text-gold-400" />
            <span>Visit {BRAND_CONFIG.instagramHandle} on Instagram</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition ${
              activeTab === tab.id
                ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                : 'glass-panel text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid - 2 COLUMNS ON MOBILE */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredItems.map((item) => {
          const totalLikes = (item.likes || 120) + (likesMap[item.id] || 0);
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden border border-gold-400/20 hover:border-gold-400/60 shadow-lg hover:shadow-gold-glow cursor-pointer transition-all duration-300 bg-[#14121a]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-6 flex flex-col justify-end">
                <span className="text-[9px] sm:text-[10px] text-gold-400 uppercase tracking-widest font-semibold mb-0.5 sm:mb-1">
                  {item.category.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="font-serif text-xs sm:text-lg font-bold text-white line-clamp-1 sm:line-clamp-none mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-300 font-light line-clamp-2 mb-2 sm:mb-4 hidden sm:block">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-gold-400/20">
                  <span className="text-[9px] sm:text-[11px] text-gold-300 font-medium">
                    View
                  </span>

                  <button
                    onClick={(e) => handleLike(e, item.id)}
                    className="flex items-center space-x-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-gold-400/30 text-[10px] sm:text-xs text-gold-300 hover:scale-105 transition"
                  >
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold-400 text-gold-400" />
                    <span>{totalLikes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
          />

          {/* Fixed Top-Right Close Button for Mobile & Desktop */}
          <button
            onClick={() => setActiveItem(null)}
            className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/90 border border-gold-400/60 text-gold-300 hover:text-white hover:bg-gold-500/20 flex items-center justify-center shadow-2xl backdrop-blur-lg transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-3xl bg-[#14121a] rounded-3xl border border-gold-400/30 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/5] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30">
                      {activeItem.category.replace('_', ' ').toUpperCase()}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-3">
                      {activeItem.title}
                    </h2>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {activeItem.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-serif font-bold text-gold-300 uppercase tracking-wider">
                      Atelier Details:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-black/40 px-3 py-1 rounded-lg border border-gold-400/20 text-zinc-300"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-gold-400/20">
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello WAF Stitchery House, I loved this design from your gallery: "${activeItem.title}". Could you please provide stitching details and a quotation?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire About This Design</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onNavigate('contact');
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xs font-semibold tracking-wider uppercase transition"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Book Atelier Consultation</span>
                  </button>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="w-full py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition text-center"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
