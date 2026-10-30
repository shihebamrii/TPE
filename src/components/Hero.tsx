import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onOpenRFQ: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenRFQ }) => {
  const t = translations[currentLang].hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const marqueeItems = [
    "SÉRIGRAPHIE HAUTE CADENCE : 20 300 PIÈCES / JOUR",
    "BRODERIE INDUSTRIELLE MULTI-TÊTES : 5 400 PIÈCES / JOUR",
    "LEADER DE L'ÉTIQUETAGE & HANG TAGS : 132 000 PIÈCES / JOUR",
    "TRANSIT MARITIME 48H DIRECT VERS MARSEILLE & GÊNES",
    "ACCORD DE LIBRE-ÉCHANGE EUR.1 SANS DROITS DE DOUANE",
    "TRIPLE CERTIFICATION ISO 9001 • ISO 14001 • ISO 45001",
    "TEXTILE BIO & RECYCLÉ : GOTS • GRS • RCS • OCS",
    "FONDÉE EN AVRIL 2015 • RAS JEBEL, GOUVERNORAT DE BIZERTE",
  ];

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-0 overflow-hidden bg-black text-white">
      
      {/* Background Video Layer (Cinematic, Vivid & Richly Saturated) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.03] opacity-80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* High-Contrast Luxury Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      </div>

      {/* Floating Video Controls in Bottom Right */}
      <div className="absolute bottom-16 right-6 sm:right-12 z-20 flex items-center gap-2.5">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all"
          title={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
          aria-label="Pause/Play Video"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all"
          title={isMuted ? "Activer le son" : "Couper le son"}
          aria-label="Mute/Unmute Video"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>USINE EN PRODUCTION</span>
        </div>
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 sm:pt-16 my-auto">
        
        {/* CMYK & Corporate Identifier Header Strip */}
        <div className="flex flex-wrap items-center gap-3.5 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 px-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tpe-cyan"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-tpe-magenta"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-tpe-yellow"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
          </div>

          <span className="text-xs uppercase tracking-widest font-mono font-bold text-white/90">
            TEXTILE PRINT & EMBROIDER • RAS JEBEL, TUNISIE
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold hidden sm:inline">
            ACCORD EUR.1 SANS DROITS DE DOUANE
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.06] tracking-tight">
            L'excellence du façonnage <br />
            <span className="italic font-normal text-slate-200">textile méditerranéen.</span>
          </h1>

          {/* Official Handwritten Red Slogan */}
          <div className="pt-2">
            <span className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#FF4D4D] font-bold drop-shadow-md">
              {t.motto}
            </span>
          </div>

          {/* Descriptive Body */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed font-sans pt-2 font-normal">
            {t.description}
          </p>
        </div>

        {/* Call-to-Action Group */}
        <div className="flex flex-wrap items-center gap-5 pt-8 pb-12">
          <button
            onClick={onOpenRFQ}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-tpe-magenta hover:text-white text-xs font-mono uppercase tracking-widest font-bold transition-all shadow-xl"
          >
            <span>{t.ctaSecondary}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="#techniques"
            className="inline-flex items-center gap-2 px-6 py-4 text-xs font-mono uppercase tracking-widest font-bold text-white hover:text-tpe-cyan transition-colors border-b-2 border-white/60 hover:border-tpe-cyan"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          {/* 3 Real Production Capacities Ticker (From TPE Presentation) */}
          <div className="hidden lg:flex items-center gap-6 pl-8 border-l border-white/20 text-xs font-mono">
            <div>
              <span className="block font-black text-white text-base">20 300</span>
              <span className="text-[11px] text-slate-300 uppercase">Sérigraphie / jour</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="block font-black text-white text-base">5 400</span>
              <span className="text-[11px] text-slate-300 uppercase">Broderie / jour</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="block font-black text-tpe-yellow text-base">132 000</span>
              <span className="text-[11px] text-slate-300 uppercase">Hang Tags / jour</span>
            </div>
          </div>
        </div>

      </div>

      {/* Fluid Continuous Running Marquee Banner */}
      <div className="relative z-10 w-full bg-white text-slate-950 py-3.5 overflow-hidden border-t border-white/30">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="flex items-center text-xs font-mono uppercase tracking-widest font-bold px-8 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-tpe-magenta mr-4"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
