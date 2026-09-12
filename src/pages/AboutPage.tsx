import React from 'react';
import { PageView } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { Sparkles, Scissors, Crown, Heart, ShieldCheck, Clock, Award, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      icon: Scissors,
      title: 'Precision Needlecraft',
      desc: 'Every seam, pleat, and dart is tailored to within millimeters of your anatomical proportions for an effortless drape.'
    },
    {
      icon: Award,
      title: 'Heritage Aari & Maggam',
      desc: 'Preserving authentic South Asian needlework traditions using genuine metallic zari, French dabka wire, and cut crystals.'
    },
    {
      icon: ShieldCheck,
      title: 'Flawless Fit Guarantee',
      desc: 'We never compromise. If your bespoke garment doesn’t fit like a glove on delivery, alterations are completely on us.'
    },
    {
      icon: Users,
      title: 'Empowering Artisans',
      desc: 'Our atelier directly sustains families of hereditary master embroiderers and seamstresses with dignified, fair-wage craft.'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase">
          <Crown className="w-3.5 h-3.5 text-gold-400" />
          <span>Our Atelier Story</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          The Heritage of WAF Stitchery House
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          Rooted in the timeless romance of bespoke Indian couture, WAF Stitchery House is an artisanal fashion boutique where personal style meets royal craftsmanship.
        </p>
      </div>

      {/* Story Section with Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-gold-400/30 shadow-2xl">
            <img
              src="/images/products/waf-b03-cutwork-artisan.jpg"
              alt="Atelier Craftsmanship"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Master Cutters & Artisans</span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                Handcrafted with Pride & Passion
              </h3>
            </div>
          </div>

          {/* Floating Monogram Card */}
          <div className="absolute -bottom-6 -right-6 glass-panel rounded-2xl p-4 border border-gold-400/40 hidden sm:block shadow-2xl">
            <p className="font-serif text-2xl font-bold text-gold-gradient">100%</p>
            <p className="text-[11px] text-zinc-300 uppercase tracking-wider">Custom Tailored Fit</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Where Every Thread Tells a Tale of Elegance
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            Founded with an enduring passion for authentic hand embroidery, WAF Stitchery House began as an intimate tailoring studio dedicated to creating heirloom bridal blouses that match the majesty of traditional Kanjeevarams, Paithanis, and Banarasis.
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            Over the years, we have evolved into a complete fashion house offering custom stitching for festive lehengas, contemporary fusion kurtis, and designer ethnic ensembles. While fashion trends shift, our dedication to immaculate silhouette cuts, padded structure, and hand aari precision remains unshakeable.
          </p>

          <div className="pt-2 flex items-center space-x-6 text-xs text-zinc-400">
            <div>
              <span className="font-serif text-2xl font-bold text-gold-300 block">1,500+</span>
              <span>Happy Brides</span>
            </div>
            <div className="w-px h-8 bg-gold-400/20" />
            <div>
              <span className="font-serif text-2xl font-bold text-gold-300 block">45+ Hrs</span>
              <span>Per Bridal Blouse</span>
            </div>
            <div className="w-px h-8 bg-gold-400/20" />
            <div>
              <span className="font-serif text-2xl font-bold text-gold-300 block">8+</span>
              <span>Artisan Masters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Our Atelier Principles
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            The values that guide every needle stroke and every customer consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                {v.title}
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 text-center border border-gold-400/30 max-w-3xl mx-auto space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Experience Bespoke Tailoring Firsthand
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
          Whether you need a statement bridal blouse for your wedding or a chic kurti for festive celebrations, our atelier is ready to craft your vision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-black font-semibold text-xs tracking-wider uppercase shadow-gold-glow hover:scale-105 transition"
          >
            Explore Collections
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 font-semibold text-xs tracking-wider uppercase transition"
          >
            Book Atelier Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
