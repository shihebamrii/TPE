import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRFQ: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange, onOpenRFQ }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang].nav;

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number | null = null;
    let isMounted = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Physics-smoothed animation frame loop (lerp)
    // Eliminates notched mouse-wheel stepping and CSS layout reflow
    const updateSmoothProgress = () => {
      if (!isMounted) return;

      const diff = targetProgress - currentProgress;

      if (Math.abs(diff) > 0.0001 && !prefersReducedMotion) {
        // 0.18 dampening factor gives instantaneous response with liquid deceleration
        currentProgress += diff * 0.18;
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `translate3d(${(currentProgress - 1) * 100}%, 0, 0)`;
        }
        rafId = requestAnimationFrame(updateSmoothProgress);
      } else {
        currentProgress = targetProgress;
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `translate3d(${(currentProgress - 1) * 100}%, 0, 0)`;
        }
        rafId = null;
      }
    };

    const handleScroll = (immediate = false) => {
      // 1. Navbar elevation threshold
      const scrolled = window.scrollY > 15;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // 2. Hardware-accelerated Reading Progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / docHeight));
        if (immediate || prefersReducedMotion) {
          currentProgress = targetProgress;
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `translate3d(${(currentProgress - 1) * 100}%, 0, 0)`;
          }
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        } else if (!rafId) {
          rafId = requestAnimationFrame(updateSmoothProgress);
        }
      }

      // 3. Active Section Detection
      const sectionIds = ['techniques', 'plant', 'lookbook', 'standards', 'nearshore', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection((prev) => (prev !== sectionIds[i] ? sectionIds[i] : prev));
            break;
          }
        }
      }
    };

    const onScroll = () => handleScroll(false);
    const onResize = () => handleScroll(true);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    handleScroll(true);

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const navLinks = [
    { href: '#techniques', label: t.techniques },
    { href: '#plant', label: t.plant },
    { href: '#lookbook', label: t.lookbook },
    { href: '#standards', label: t.standards },
    { href: '#nearshore', label: t.nearshore },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
        isScrolled
          ? 'border-b border-slate-200 py-2.5 sm:py-3 shadow-sm'
          : 'border-b border-slate-200/80 py-3.5 sm:py-4 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Brand Logo & Factory Coordinates */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            {/* High-Impact Authentic TPE Logo */}
            <img
              src="/logo_transparent.png"
              alt="TPE Textil Print & Embroidery Tunisie"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-102 ${
                isScrolled
                  ? 'h-10 sm:h-11 md:h-12 max-w-[190px] sm:max-w-[210px]'
                  : 'h-12 sm:h-13 md:h-14 max-w-[210px] sm:max-w-[230px]'
              }`}
            />

            {/* Industrial Tagline beside Logo */}
            <div className="hidden 2xl:flex flex-col border-l border-slate-200 pl-3 py-0.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-tight">
                Ras Jebel • Bizerte
              </span>
              <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider leading-tight mt-0.5">
                Usine 100% Export • EUR.1
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] xl:text-[11.5px] uppercase tracking-wider font-mono font-bold transition-colors whitespace-nowrap relative py-1 group ${
                    isActive ? 'text-tpe-red' : 'text-slate-700 hover:text-tpe-magenta'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-tpe-magenta transition-all duration-200 rounded-full ${
                      isActive ? 'w-full bg-tpe-red' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            
            {/* CMYK Registration Assurance Dots */}
            <div 
              className="hidden xl:flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-sm border border-slate-200" 
              title="CMYK Print & Color Standards"
            >
              <span className="w-2 h-2 rounded-full bg-tpe-cyan" />
              <span className="w-2 h-2 rounded-full bg-tpe-magenta" />
              <span className="w-2 h-2 rounded-full bg-tpe-yellow" />
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>

            {/* Direct Phone / Contact Link */}
            <a
              href="tel:+21672457143"
              className="hidden xl:inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-800 hover:text-tpe-magenta transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+216 72 457 143</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center border border-slate-200 rounded-sm text-xs font-mono font-bold overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 transition-all ${
                  currentLang === 'fr'
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-950'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 transition-all ${
                  currentLang === 'en'
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-950'
                }`}
              >
                EN
              </button>
            </div>

            {/* High-Visibility Tech-Pack RFQ Button */}
            <button
              onClick={onOpenRFQ}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-tpe-red hover:bg-red-700 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm shadow-xs transition-all hover:translate-x-0.5 whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.requestQuote}</span>
              <span className="sm:hidden">Devis</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 rounded-sm focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Logo in Mobile Menu */}
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <img
              src="/logo_transparent.png"
              alt="TPE Tunisie"
              className="h-10 w-auto object-contain"
            />
            <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">
              100% Export EUR.1
            </span>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest font-mono font-bold text-slate-800 hover:text-tpe-magenta py-1.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-400">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:+21672457143"
              className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Standard : +216 72 457 143</span>
            </a>
            <a
              href="https://wa.me/21698761003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Usine : +216 98 761 003</span>
            </a>
          </div>
        </div>
      )}

      {/* Ultra-Smooth CMYK Scroll Progress Ribbon */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-100/90 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={progressBarRef}
          className="relative h-full w-full bg-gradient-to-r from-tpe-cyan via-tpe-magenta via-tpe-yellow to-tpe-red will-change-transform"
          style={{ transform: 'translate3d(-100%, 0, 0)' }}
        >
          {/* Luminous leading-edge tip for fluid visual feedback */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-[3px] rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.9),0_0_10px_rgba(225,29,72,0.8)]" />
        </div>
      </div>
    </header>
  );
};
