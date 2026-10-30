import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import type { Language } from '../types';

interface FloatingWhatsAppProps {
  currentLang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentLang }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prompt = currentLang === 'fr'
    ? 'Bonjour TPE Tunisie, je souhaite me renseigner sur vos prestations de broderie et sérigraphie.'
    : 'Hello TPE Tunisie, I would like to inquire about your embroidery and screen printing finishing services.';

  const waUrl = `https://wa.me/21698761003?text=${encodeURIComponent(prompt)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Subtle Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        title={currentLang === 'fr' ? 'Retour en haut' : 'Back to top'}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      </button>

      {/* Persistent WhatsApp Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
        title="Chat on WhatsApp"
        aria-label="Direct WhatsApp Support"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30"></span>
        <MessageSquare className="w-7 h-7 relative z-10" />

        {/* Hover Pill Label */}
        <span className="absolute right-16 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl">
          {currentLang === 'fr' ? 'WhatsApp Direct Usine' : 'WhatsApp Factory Direct'}
        </span>
      </a>
    </div>
  );
};
