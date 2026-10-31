import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  Layers, 
  LayoutGrid, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { useSiteData } from '../context/SiteContext';
import { ScrollReveal } from './common/ScrollReveal';

interface TechniquesMatrixProps {
  currentLang: Language;
  onSelectMacro: (image: string, title: string, description: string) => void;
  onSelectRFQTechnique: (techniqueName: string) => void;
}

interface TechniqueEnriched {
  id: string;
  shortName: string;
  badgeCapacity: string;
  compactVolume: string;
  machinePhoto: string;
  macroPhoto: string;
  machineLabel: string;
  macroLabel: string;
  colorAccent: string;
  cmykDot: string;
  category: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
  specs: {
    capacity: string;
    maxColorsOrHeads: string;
    bestFor: { en: string; fr: string };
    leadTimeSample: string;
  };
  badge: { en: string; fr: string };
}

export const TechniquesMatrix: React.FC<TechniquesMatrixProps> = ({
  currentLang,
  onSelectMacro,
  onSelectRFQTechnique,
}) => {
  const t = translations[currentLang].techniques;
  const { data } = useSiteData();

  const TECHNIQUES_ENRICHED: TechniqueEnriched[] = data.techniques.map((tech, idx) => ({
    ...tech,
    shortName: tech.shortName || tech.title[currentLang]?.split(' ')[0] || tech.title.fr.split(' ')[0],
    badgeCapacity: tech.badgeCapacity || tech.specs.capacity,
    compactVolume: tech.compactVolume || tech.specs.capacity.split(' ')[0],
    machinePhoto: tech.machinePhoto || tech.image,
    macroPhoto: tech.macroPhoto || tech.macroImage || tech.image,
    machineLabel: tech.machineLabel || tech.title[currentLang] || tech.title.fr,
    macroLabel: tech.macroLabel || 'Macro Texture Haute Définition',
    colorAccent: tech.colorAccent || (idx % 2 === 0 ? 'text-tpe-magenta border-tpe-magenta' : 'text-tpe-cyan border-tpe-cyan'),
    cmykDot: tech.cmykDot || (idx % 2 === 0 ? 'bg-tpe-magenta' : 'bg-tpe-cyan'),
  }));

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showMacroMap, setShowMacroMap] = useState<Record<number, boolean>>({});
  
  // Animation key tracker to restart CSS keyframe smoothly
  const [animKey, setAnimKey] = useState<number>(0);

  const SLIDE_DURATION_MS = 5000;

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TECHNIQUES_ENRICHED.length);
      setAnimKey((k) => k + 1);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, isAutoPlay, isHovered]);

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
    setAnimKey((k) => k + 1);
  };

  const handleRestartReplay = () => {
    setActiveIndex(0);
    setAnimKey((k) => k + 1);
    setIsAutoPlay(true);
  };

  const toggleMacroPhoto = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setShowMacroMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const activeTech = TECHNIQUES_ENRICHED[activeIndex] || TECHNIQUES_ENRICHED[0];
  if (!activeTech) return null;
  const activeIsMacro = showMacroMap[activeIndex] || false;
  const activePhoto = activeIsMacro ? activeTech.macroPhoto : activeTech.machinePhoto;
  const activeLabel = activeIsMacro ? activeTech.macroLabel : activeTech.machineLabel;

  return (
    <section 
      id="techniques" 
      className="py-20 sm:py-24 bg-[#FAFAFB] border-t border-slate-200 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top 4-Color CMYK Ambient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tpe-cyan via-tpe-magenta via-tpe-yellow to-tpe-red opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-slate-200 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tpe-magenta animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold">
                  {t.tag}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-slate-950 uppercase tracking-tight">
                {t.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-sans leading-relaxed mt-2.5">
                {t.subtitle}
              </p>
            </div>

            {/* Top Controls: Replay State + View Toggle */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              
              {/* Auto-Replay Controller Pill */}
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-sm shadow-xs">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-800 hover:text-slate-950"
                  title={isAutoPlay ? 'Pause le défilement automatique' : 'Activer le défilement automatique'}
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      <span className="font-semibold text-emerald-700">
                        {isHovered ? 'En Pause (Survol)' : 'Auto-Replay Actif'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-slate-500" />
                      <span>Auto-Replay Pausé</span>
                    </>
                  )}
                </button>

                <span className="text-slate-300">|</span>

                <button
                  onClick={handleRestartReplay}
                  className="text-[11px] font-mono text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                  title="Recommencer depuis la technique 01"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">01 / 05</span>
                </button>
              </div>

              {/* View Switcher: Deck vs Grid */}
              <div className="inline-flex items-center rounded-sm bg-slate-200/80 p-0.5 border border-slate-300/60">
                <button
                  onClick={() => setViewMode('deck')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                    viewMode === 'deck'
                      ? 'bg-white text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Deck Animé</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grille (5)</span>
                </button>
              </div>

            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={120}>
          {/* Linear 5-Segment Progress Bar */}
        <div className="grid grid-cols-5 gap-2.5 my-6 sm:my-7">
          {TECHNIQUES_ENRICHED.map((tech, idx) => {
            const isActive = activeIndex === idx;
            const isPassed = idx < activeIndex;

            return (
              <button
                key={tech.id}
                onClick={() => handleSelectSlide(idx)}
                className="group flex flex-col text-left focus:outline-none cursor-pointer"
              >
                {/* Visual Progress Bar Strip */}
                <div className="w-full h-1.5 bg-slate-200/90 rounded-full overflow-hidden mb-2">
                  <div
                    key={`${tech.id}-${animKey}-${isActive ? 'active' : 'idle'}`}
                    className={`h-full rounded-full ${
                      isActive
                        ? isHovered || !isAutoPlay
                          ? 'bg-slate-950 w-full'
                          : 'bg-slate-950 animate-progress'
                        : isPassed
                        ? 'bg-slate-400 w-full'
                        : 'bg-transparent w-0'
                    }`}
                    style={
                      isActive && isAutoPlay && !isHovered
                        ? {
                            animation: `progressKeyframe ${SLIDE_DURATION_MS}ms linear forwards`,
                          }
                        : {}
                    }
                  />
                </div>

                {/* Subtitle Label */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold transition-colors ${
                    isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-700'
                  }`}>
                    0{idx + 1} • {tech.shortName}
                  </span>
                  <span className="hidden md:inline text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                    {tech.compactVolume}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: EXPANDING CARDS DECK (ALL PHOTOS VISIBLE)        */}
        {/* ======================================================== */}
        {viewMode === 'deck' && (
          <div className="flex flex-col lg:flex-row gap-3 min-h-[580px] lg:h-[620px] w-full">
            {TECHNIQUES_ENRICHED.map((tech, idx) => {
              const isActive = activeIndex === idx;
              const isMacro = showMacroMap[idx] || false;
              const displayPhoto = isMacro ? tech.macroPhoto : tech.machinePhoto;

              return (
                <div
                  key={tech.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative rounded-sm overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none group ${
                    isActive
                      ? 'lg:flex-[3.8] flex-1 bg-slate-950 border-slate-900 shadow-2xl'
                      : 'lg:flex-[0.9] h-28 lg:h-auto bg-slate-900 border-slate-200/90 hover:border-slate-400 hover:lg:flex-[1.1]'
                  }`}
                >
                  {/* Background Photo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={displayPhoto}
                      alt={tech.title[currentLang]}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isActive
                          ? 'scale-100 group-hover:scale-102 filter contrast-105'
                          : 'scale-105 filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-90'
                      }`}
                    />
                    {/* Dark gradient scrim */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20'
                        : 'bg-slate-950/65 group-hover:bg-slate-950/45'
                    }`} />
                  </div>

                  {/* COLLAPSED STATE (Narrow luxury vertical spine) */}
                  {!isActive && (
                    <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                      {/* Top: Circle Department Number + CMYK Dot */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/15">
                          <span className={`w-2 h-2 rounded-full ${tech.cmykDot}`} />
                          <span className="font-mono text-xs font-bold text-white">
                            0{idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Vertical or clean Title */}
                      <div className="my-auto py-2">
                        <span className="font-sans font-black text-white text-base lg:text-lg block tracking-tight group-hover:text-white transition-colors">
                          {tech.shortName}
                        </span>
                        <span className="font-mono text-[10px] text-white/70 uppercase tracking-wider block mt-1">
                          {tech.compactVolume}
                        </span>
                      </div>

                      {/* Bottom Hint */}
                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Explorer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* EXPANDED ACTIVE STATE */}
                  {isActive && (
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7">
                      
                      {/* Top Action Bar */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black tracking-widest text-white uppercase bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 inline-flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${tech.cmykDot}`} />
                            <span>DÉPARTEMENT 0{idx + 1} • {tech.badgeCapacity}</span>
                          </span>
                        </div>

                        {/* Photo Toggle & Fullscreen Zoom Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleMacroPhoto(e, idx)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-950 text-xs font-mono uppercase tracking-wider font-bold rounded-sm shadow-md backdrop-blur-md transition-all hover:scale-102"
                            title="Basculer entre machine d'atelier et macro textile"
                          >
                            <RotateCcw className="w-3 h-3 text-tpe-magenta" />
                            <span>{isMacro ? 'Vue Machine' : 'Vue Macro'}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectMacro(
                                tech.macroPhoto,
                                tech.title[currentLang],
                                tech.description[currentLang]
                              );
                            }}
                            className="p-1.5 bg-black/60 hover:bg-white text-white hover:text-slate-950 rounded-sm border border-white/20 backdrop-blur-md transition-colors"
                            title="Agrandir en 200% Haute Définition"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Editorial Specifications Panel */}
                      <div className="bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-sm p-4 sm:p-6 shadow-2xl space-y-4">
                        
                        {/* Status Label & Title */}
                        <div>
                          <div className="inline-flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                              {activeLabel}
                            </span>
                          </div>
                          
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-black text-white uppercase tracking-tight leading-tight">
                            {tech.title[currentLang]}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-relaxed max-w-3xl line-clamp-2">
                            {tech.subtitle[currentLang]}
                          </p>
                        </div>

                        {/* 3-Column Micro Specifications */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2 border-t border-white/10">
                          <div className="bg-white/5 p-2 sm:p-2.5 rounded-sm border border-white/10 overflow-hidden">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block truncate">
                              Capacité Jour
                            </span>
                            <span className="text-[11px] sm:text-xs xl:text-sm font-mono font-bold text-white block mt-0.5 truncate">
                              {tech.specs.capacity.replace(' pièces / jour', ' pcs/j').replace(' pièces/jour', ' pcs/j')}
                            </span>
                          </div>

                          <div className="bg-white/5 p-2 sm:p-2.5 rounded-sm border border-white/10 overflow-hidden">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block truncate">
                              Nuances / Têtes
                            </span>
                            <span className="text-[11px] sm:text-xs xl:text-sm font-mono font-bold text-white block mt-0.5 truncate">
                              {tech.specs.maxColorsOrHeads}
                            </span>
                          </div>

                          <div className="bg-white/5 p-2 sm:p-2.5 rounded-sm border border-white/10 overflow-hidden">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block truncate">
                              Délai Proto
                            </span>
                            <span className="text-[11px] sm:text-xs xl:text-sm font-mono font-bold text-emerald-400 block mt-0.5 truncate">
                              {tech.specs.leadTimeSample}
                            </span>
                          </div>
                        </div>

                        {/* Highlights & RFQ Action Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="truncate max-w-sm">Conforme Cahier des Charges Luxe & Normes EUR.1</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRFQTechnique(tech.title[currentLang]);
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-tpe-red hover:bg-red-700 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm shadow-lg transition-all hover:translate-x-0.5"
                          >
                            <span>{t.actionRfq}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: MULTI-IMAGE PANORAMIC GRID (ALL 5 VISIBLE)       */}
        {/* ======================================================== */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNIQUES_ENRICHED.map((tech, idx) => {
              const isMacro = showMacroMap[idx] || false;
              const displayPhoto = isMacro ? tech.macroPhoto : tech.machinePhoto;

              return (
                <div
                  key={tech.id}
                  className="group bg-white rounded-sm border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Image Box */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={displayPhoto}
                      alt={tech.title[currentLang]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/20">
                        0{idx + 1} • {tech.badgeCapacity}
                      </span>

                      <button
                        onClick={(e) => toggleMacroPhoto(e, idx)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 hover:bg-white text-slate-950 text-[10px] font-mono uppercase tracking-wider font-bold rounded-sm shadow backdrop-blur-md transition-all"
                        title="Basculer photo machine / macro"
                      >
                        <RotateCcw className="w-3 h-3 text-tpe-magenta" />
                        <span>{isMacro ? 'Machine' : 'Macro'}</span>
                      </button>
                    </div>

                    {/* Bottom Image Caption */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                      <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded truncate max-w-[200px]">
                        {isMacro ? tech.macroLabel : tech.machineLabel}
                      </span>
                      <button
                        onClick={() => onSelectMacro(
                          tech.macroPhoto,
                          tech.title[currentLang],
                          tech.description[currentLang]
                        )}
                        className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-slate-950 rounded backdrop-blur-sm transition-all"
                        title="Agrandir en plein écran"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono font-bold uppercase ${tech.colorAccent}`}>
                          {tech.specs.capacity}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {tech.specs.leadTimeSample}
                        </span>
                      </div>

                      <h3 className="font-sans font-black text-lg text-slate-950 group-hover:text-tpe-magenta transition-colors leading-snug">
                        {tech.title[currentLang]}
                      </h3>

                      <p className="text-xs font-sans text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {tech.description[currentLang]}
                      </p>

                      {/* Technical bullets */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
                        {tech.highlights[currentLang].slice(0, 2).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] font-sans text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {tech.specs.maxColorsOrHeads}
                      </span>
                      <button
                        onClick={() => onSelectRFQTechnique(tech.title[currentLang])}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 group-hover:text-tpe-red transition-colors"
                      >
                        <span>Étude Devis</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        </ScrollReveal>
      </div>

      {/* Embedded CSS Keyframe for linear GPU-accelerated progress bar */}
      <style>{`
        @keyframes progressKeyframe {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
