import React, { useState } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

interface ClientReferencesProps {
  currentLang: Language;
}

interface BrandItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  technique: string;
  heightClass: string;
}

export const ClientReferences: React.FC<ClientReferencesProps> = ({ currentLang }) => {
  const t = translations[currentLang].hero;
  const [activeTab, setActiveTab] = useState<'marquee' | 'grid'>('marquee');

  const brands: BrandItem[] = [
    {
      id: "lacoste",
      name: "LACOSTE",
      logo: "/assets/logos/brands/lacoste.svg",
      category: "Sportswear & Polos",
      technique: "Sérigraphie pigmentaire & Écussons",
      heightClass: "h-7 sm:h-8",
    },
    {
      id: "tommy",
      name: "TOMMY HILFIGER",
      logo: "/assets/logos/brands/tommy_hilfiger.svg",
      category: "Premium Denim & Casual",
      technique: "Broderie poitrine & Sérigraphie",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "calvin-klein",
      name: "CALVIN KLEIN",
      logo: "/assets/logos/brands/calvin_klein.svg",
      category: "Denim & Sous-vêtements",
      technique: "Impression discharge & Transfert silicone",
      heightClass: "h-5 sm:h-6",
    },
    {
      id: "emporio-armani",
      name: "EMPORIO ARMANI",
      logo: "/assets/logos/brands/emporio_armani.svg",
      category: "Haute Confection & Mode",
      technique: "Broderie fine & Griffes tissées",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "sandro",
      name: "SANDRO PARIS",
      logo: "/assets/logos/brands/sandro.svg",
      category: "Prêt-à-Porter Contemporain",
      technique: "Sérigraphie à l'eau & Hang tags",
      heightClass: "h-5 sm:h-6",
    },
    {
      id: "karl-lagerfeld",
      name: "KARL LAGERFELD",
      logo: "/assets/logos/brands/karl_lagerfeld.svg",
      category: "Design & Maroquinerie",
      technique: "Broderie haute densité & Ennoblissemnt",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "american-vintage",
      name: "AMERICAN VINTAGE",
      logo: "/assets/logos/brands/american_vintage.png",
      category: "Maille & Couleurs Végétales",
      technique: "Effet délavé vintage & Teinture pièce",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "replay",
      name: "REPLAY JEANS",
      logo: "/assets/logos/brands/replay.svg",
      category: "Denim Haute Technologie",
      technique: "Sérigraphie rongeant & Broderie 3D",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "mustang",
      name: "MUSTANG TRUE DENIM",
      logo: "/assets/logos/brands/mustang.svg",
      category: "Heritage Denim",
      technique: "Étiquettes cuir & Broderie poches",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "pepe-jeans",
      name: "PEPE JEANS LONDON",
      logo: "/assets/logos/brands/pepe_jeans.svg",
      category: "Denim & Confection",
      technique: "Sérigraphie multi-couleurs & Patchs",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "pinko",
      name: "PINKO",
      logo: "/assets/logos/brands/pinko.svg",
      category: "Mode Contemporaine Italienne",
      technique: "Impression numérique Aeon Kyo",
      heightClass: "h-5 sm:h-6",
    },
    {
      id: "teddy-smith",
      name: "TEDDY SMITH",
      logo: "/assets/logos/brands/teddy-smith.svg",
      category: "Streetwear & Finitions",
      technique: "Sérigraphie gonflante & Transfert",
      heightClass: "h-6 sm:h-7",
    },
    {
      id: "benetton",
      name: "UNITED COLORS OF BENETTON",
      logo: "/assets/logos/brands/benetton.svg",
      category: "Maille & Casualwear",
      technique: "Broderie point de chaînette & Griffes",
      heightClass: "h-7 sm:h-8",
    },
    {
      id: "lee-cooper",
      name: "LEE COOPER",
      logo: "/assets/logos/brands/lee-cooper.svg",
      category: "Heritage Denim & Workwear",
      technique: "Broderie heavy stitch & Écussons tissés",
      heightClass: "h-7 sm:h-8",
    },
    {
      id: "marc-opolo",
      name: "MARC O'POLO",
      logo: "/assets/logos/brands/marc_opolo.svg",
      category: "Premium Casual Nordic",
      technique: "Sérigraphie éco-responsable GOTS",
      heightClass: "h-5 sm:h-6",
    },
    {
      id: "north-sails",
      name: "NORTH SAILS",
      logo: "/assets/logos/brands/north_sails.svg",
      category: "Performance & Nautique",
      technique: "Broderie technique & Badges étanches",
      heightClass: "h-8 sm:h-9",
    },
    {
      id: "club-med",
      name: "CLUB MED",
      logo: "/assets/logos/brands/club_med.svg",
      category: "Resortwear & Équipement",
      technique: "Broderie trident & Sérigraphie grand format",
      heightClass: "h-7 sm:h-8",
    },
    {
      id: "van-laack",
      name: "VAN LAACK",
      logo: "/assets/logos/brands/van_laack.svg",
      category: "Chemiserie de Luxe",
      technique: "Monogrammes fins & Broderie micro-point",
      heightClass: "h-7 sm:h-8",
    },
    {
      id: "sansibar",
      name: "SANSIBAR SYLT",
      logo: "/assets/logos/brands/sansibar.png",
      category: "Lifestyle & Maritime",
      technique: "Broderie sabres croisés & Hang tags",
      heightClass: "h-8 sm:h-9",
    },
    {
      id: "school-rag",
      name: "SCHOOL RAG",
      logo: "/assets/logos/brands/school_rag.png",
      category: "Denim & Streetwear",
      technique: "Sérigraphie & Étiquetage export",
      heightClass: "h-6 sm:h-7",
    },
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...brands, ...brands];

  return (
    <section id="references" className="border-y border-slate-200/90 bg-[#FBFBFC] py-8 sm:py-10 relative overflow-hidden select-none">
      {/* Subtle background ambient styling */}
      <div className="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-60 pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal animation="fade-up">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-6 sm:mb-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tpe-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tpe-red"></span>
              </span>
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-800 font-bold">
                {t.trustLabel}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Accords EUR.1 • Exonération Totale Douane • Audits Directs</span>
              </div>

              {/* Toggle Marquee / Grid */}
              <div className="inline-flex items-center rounded-sm bg-slate-200/70 p-0.5 border border-slate-300/50">
                <button
                  onClick={() => setActiveTab('marquee')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all ${
                    activeTab === 'marquee'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Défilé Continu
                </button>
                <button
                  onClick={() => setActiveTab('grid')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all ${
                    activeTab === 'grid'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grille ({brands.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* VIEW 1: Infinite Marquee View */}
      {activeTab === 'marquee' && (
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient scrim on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FBFBFC] via-[#FBFBFC]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FBFBFC] via-[#FBFBFC]/90 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track (Loops horizontally) */}
          <div className="flex items-center gap-6 sm:gap-8 animate-marquee hover:[animation-play-state:paused] w-max py-2">
            {marqueeList.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="group relative flex flex-col items-center justify-center min-w-[150px] sm:min-w-[170px] h-20 sm:h-22 px-5 py-3 rounded-sm bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                {/* Official Vector Logo */}
                <div className="flex items-center justify-center w-full h-10">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo officiel`}
                    loading="lazy"
                    className={`max-w-[125px] sm:max-w-[140px] ${brand.heightClass} object-contain transition-all duration-300 filter grayscale contrast-125 opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100`}
                  />
                </div>

                {/* Subtitle info on hover */}
                <div className="mt-1 text-center">
                  <span className="text-[10px] font-sans font-semibold tracking-tight text-slate-700 block whitespace-nowrap">
                    {brand.name}
                  </span>
                  <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-tight block truncate max-w-[130px]">
                    {brand.category}
                  </span>
                </div>

                {/* Subtle highlight bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tpe-cyan via-tpe-magenta to-tpe-yellow opacity-0 group-hover:opacity-100 transition-opacity rounded-b-sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Full Responsive Grid View */}
      {activeTab === 'grid' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-sm bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                {/* Top Badge */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-slate-400">
                    Export Ref.
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Logo Image */}
                <div className="flex items-center justify-center w-full h-12 my-2">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo officiel`}
                    loading="lazy"
                    className={`max-w-[130px] sm:max-w-[145px] ${brand.heightClass} object-contain transition-all duration-300 filter grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105`}
                  />
                </div>

                {/* Info Text */}
                <div className="w-full text-center pt-2 border-t border-slate-100">
                  <p className="font-sans font-bold text-xs text-slate-900 group-hover:text-tpe-magenta transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {brand.category}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-slate-50 rounded text-[9px] font-mono text-slate-600 border border-slate-200/60">
                    {brand.technique}
                  </span>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tpe-red opacity-0 group-hover:opacity-100 transition-opacity rounded-b-sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Verification Footer Bar */}
      <ScrollReveal animation="fade-up" delay={150}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-6 sm:mt-7 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-tpe-red" />
            <span>Contrats de Façonnage B2B Régis par des Accords de Confidentialité Stricte (NDA)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Capacités Dédiées Grandes Séries & Réassorts Express</span>
            <span className="text-slate-300">•</span>
            <a
              href="#contact"
              className="text-slate-700 hover:text-tpe-magenta font-semibold inline-flex items-center gap-1 group transition-colors"
            >
              <span>Demander un audit marque</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
