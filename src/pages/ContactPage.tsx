import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PageView, Inquiry } from '../types';
import { BRAND_CONFIG } from '../data/initialData';
import { storageService } from '../services/storageService';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Send,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Bridal Blouse Custom Stitching');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the online custom stitching process work?',
      a: 'You can select from our ready designs or send your own reference photos on WhatsApp. We guide you step-by-step through our video measurement guide or accept standard blouse sizes. You can courier your saree fabric to our Madurai address, or we can source premium silks on your behalf!'
    },
    {
      q: 'Can I courier my own wedding saree or fabric to WAF Stitchery House?',
      a: 'Yes, absolutely! Over 60% of our bridal clients courier their wedding sarees or dress materials directly to our KK Nagar, Madurai atelier. We send you an immediate receipt acknowledgement, discuss necklines and embroidery swatches, and begin your bespoke work.'
    },
    {
      q: 'What is the turnaround time for bespoke bridal blouses?',
      a: 'Standard bridal blouses with detailed Aari or Maggam needlework take 7 to 12 days. For urgent wedding dates, we offer an Express 48-72 hour rush tailoring service.'
    },
    {
      q: 'What if the blouse needs minor alterations after delivery?',
      a: 'Every WAF creation is constructed with 2+ inches of inner margin seam allowance. If you ever need fine-tuning, we provide complimentary adjustments within 15 days of delivery.'
    },
    {
      q: 'Do you create matching mother-daughter dresses or family combos?',
      a: 'Yes! We specialize in custom-tailored mother-daughter twinning outfits, matching reception gowns, and festive family ensembles designed with coordinated fabrics and embroidery.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('Please fill out your name, phone number, and message.');
      return;
    }

    const inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'> = {
      name,
      email,
      phone,
      serviceType,
      message,
      preferredContact: 'whatsapp'
    };

    storageService.createInquiry(inquiryData);
    setIsSent(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const whatsappDirectText = `Hello WAF Stitchery House! My name is ${name || 'a customer'}. I would like to inquire about: ${serviceType}. ${message ? `Message: "${message}"` : ''}`;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Atelier Concierge</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Connect with Our Master Artisans
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          Book an in-person boutique consultation, request doorstep measurement, or chat directly on WhatsApp to design your dream outfit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Cards & Location */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Connect Channels */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-400/20 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">
              Direct Channels
            </h3>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello WAF Stitchery House! I want to book a custom tailoring consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 hover:bg-emerald-900/40 transition group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-emerald-300 transition">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-xs text-zinc-400">Fastest response for design & quotes</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">Open ›</span>
            </a>

            {/* Instagram Card */}
            <a
              href={BRAND_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-pink-950/20 border border-pink-500/30 hover:bg-pink-900/30 transition group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-pink-300 transition">
                    Instagram DMs
                  </h4>
                  <p className="text-xs text-zinc-400">{BRAND_CONFIG.instagramHandle}</p>
                </div>
              </div>
              <span className="text-xs text-pink-400 font-semibold">Follow ›</span>
            </a>

            {/* Phone & Address Details */}
            <div className="space-y-4 pt-4 border-t border-gold-400/10 text-xs">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block">Phone Inquiries:</span>
                  <span className="text-zinc-200 font-medium">{BRAND_CONFIG.whatsappDisplay}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block">Email:</span>
                  <span className="text-zinc-200 font-medium">{BRAND_CONFIG.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block">Atelier Boutique:</span>
                  <span className="text-zinc-200 font-medium">{BRAND_CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block">Working Hours:</span>
                  <span className="text-zinc-400">{BRAND_CONFIG.openingHours}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Consultation & Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-gold-400/30 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-white">
                Book a Consultation or Send an Inquiry
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Fill in your details below and our head designer will respond within 4 business hours.
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. We have logged your request. You can also send this inquiry directly to our WhatsApp for immediate confirmation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappDirectText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setMessage('');
                    }}
                    className="px-6 py-3 rounded-xl border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xs font-semibold uppercase tracking-wider transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/20 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/20 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      placeholder="radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-gold-400/20 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Service Required</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-black/50 border border-gold-400/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400"
                    >
                      <option>Bridal Blouse Custom Stitching</option>
                      <option>Complete Bridal Trousseau</option>
                      <option>Designer Festive Kurti</option>
                      <option>Lehenga Choli Tailoring</option>
                      <option>In-Person Atelier Consultation</option>
                      <option>Virtual Video Consultation</option>
                      <option>Other Custom Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Your Message or Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the occasion, design preferences, or if you have reference fabrics..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black/40 border border-gold-400/20 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-black font-bold text-xs tracking-wider uppercase shadow-gold-glow hover:scale-[1.02] transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Atelier Inquiry</span>
                  </button>

                  <a
                    href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappDirectText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 font-semibold text-xs tracking-wider uppercase hover:bg-emerald-900/50 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="mt-20 max-w-4xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Everything you need to know about our custom tailoring & bridal services in Madurai.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-gold-400/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-serif text-base font-semibold text-zinc-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 font-light leading-relaxed border-t border-gold-400/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
