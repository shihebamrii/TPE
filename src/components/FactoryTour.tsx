import React, { useState } from 'react';
import { 
  Eye, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Gauge, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  MapPin, 
  Users, 
  ZoomIn, 
  Building2,
  CheckCircle2,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { factoryMachines } from '../data/factory';
import { ScrollReveal } from './common/ScrollReveal';

interface FactoryTourProps {
  currentLang: Language;
  onSelectPhoto: (image: string, title: string, description: string) => void;
}

interface MachineHotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  desc: string;
}

interface MachineExtended {
  id: string;
  brandBadge: string;
  stationNum: string;
  zone: string;
  capacityMetric: string;
  speedMetric: string;
  precisionMetric: string;
  regulationMetric: string;
  hotspots: MachineHotspot[];
}

const MACHINES_EXTENDED: Record<string, MachineExtended> = {
  'carrousel-serigraphie-roq': {
    id: 'carrousel-serigraphie-roq',
    brandBadge: 'ROQ INTERNATIONAL • PORTUGAL',
    stationNum: '01',
    zone: 'PÔLE SÉRIGRAPHIE ROTATIVE',
    capacityMetric: '20 300 pcs / jour',
    speedMetric: 'Cadence automatique 900 pcs/h',
    precisionMetric: 'Indexation ±0.02 mm (12 stations)',
    regulationMetric: 'Séchage quartz flash Roqdry Eco',
    hotspots: [
      { x: 32, y: 42, label: 'Racles Pneumatiques', desc: 'Pression calibrée et angle constant pour dépôt uniforme des encres à l\'eau' },
      { x: 68, y: 36, label: 'Flash Roqdry Eco Quartz', desc: 'Gélification ultra-rapide basse consommation entre chaque passe couleur' },
      { x: 48, y: 78, label: 'Table Indexée 12 Postes', desc: 'Repérage micrométrique continu pour superpositions complexes' },
    ],
  },
  'parc-broderie-tajima': {
    id: 'parc-broderie-tajima',
    brandBadge: 'TAJIMA & BARUDAN • JAPON',
    stationNum: '02',
    zone: 'BATEAUX BRODERIE MULTI-TÊTES',
    capacityMetric: '5 400 pcs / jour',
    speedMetric: 'Jusqu\'à 1 000 points / min / tête',
    precisionMetric: 'Aiguilles haute résistance titane',
    regulationMetric: 'Fils techniques Madeira & Gunold',
    hotspots: [
      { x: 42, y: 35, label: 'Têtes Japonaises Tajima', desc: 'Vitesse de pointe 1 000 pts/min avec coupe-fils automatique rasant' },
      { x: 62, y: 55, label: 'Barres Spéciales Relief 3D', desc: 'Maintien rigide pour piquage sur mousse EVA 4mm sans écrasement' },
      { x: 28, y: 68, label: 'Pointeur Optique Laser', desc: 'Centrage et alignement micrométrique sur panneaux coupés et pièces montées' },
    ],
  },
  'imprimante-aeon-kyo-digital': {
    id: 'imprimante-aeon-kyo-digital',
    brandBadge: 'AEON KYO SERIES • TECHNOLOGIE',
    stationNum: '03',
    zone: 'IMPRESSION DIRECTE TEXTILE & DTF',
    capacityMetric: 'Direct Textile HD',
    speedMetric: 'Injection piézoélectrique continue',
    precisionMetric: 'Résolution photographique 1200 dpi',
    regulationMetric: 'Encres pigmentaires certifiées OEKO-TEX',
    hotspots: [
      { x: 48, y: 38, label: 'Têtes Piézoélectriques Industrielles', desc: 'Gouttelettes microscopiques pour dégradés photographiques continus' },
      { x: 28, y: 52, label: 'Encres Pigmentaires Écologiques', desc: 'Formulation sans solvants résistant aux cycles de lavage intensifs' },
      { x: 72, y: 62, label: 'Plateau d\'Impression Numérique', desc: 'Production en cours pour les collections de la marque Pinko' },
    ],
  },
  'ligne-etiquettes-faconnage': {
    id: 'ligne-etiquettes-faconnage',
    brandBadge: 'DIVISION FAÇONNAGE TPE',
    stationNum: '04',
    zone: 'ÉTIQUETAGE, HANG TAGS & RIVETS',
    capacityMetric: '132 000 pcs / jour',
    speedMetric: 'Découpe automatique par aspiration',
    precisionMetric: 'Assembleuse 6 têtes tactile',
    regulationMetric: 'Double perforeuses rivets laiton/nickel',
    hotspots: [
      { x: 38, y: 44, label: 'Assembleuse 6 Têtes Tactile', desc: 'Empilage droit et croisé programmé pour liasses de cavaliers et hang tags' },
      { x: 72, y: 36, label: 'Perforeuses Industrielles', desc: 'Sertissage de rivets métalliques et œillets laiton pour denim et jeans' },
      { x: 52, y: 72, label: 'Contrôle Qualité Export', desc: 'Conditionnement sous scellé pour Replay, Teddy Smith et Tommy Hilfiger' },
    ],
  },
  'laser-decoupe-etiquettes': {
    id: 'laser-decoupe-etiquettes',
    brandBadge: 'SYSTÈME LASER CNC OPTIQUE',
    stationNum: '05',
    zone: 'DÉCOUPE LASER & SOUDURE THERMIQUE',
    capacityMetric: 'Cadence Haute Vitesse',
    speedMetric: 'Faisceau laser CO2 haute précision',
    precisionMetric: 'Guidage optique par caméra CCD',
    regulationMetric: 'Soudure simultanée anti-effilochage',
    hotspots: [
      { x: 46, y: 40, label: 'Faisceau Laser Micro-Focalisé', desc: 'Découpe nette au micron des étiquettes tissées, écussons et badges' },
      { x: 66, y: 56, label: 'Soudure Thermique Instantanée', desc: 'Fusion thermique des lisières empêchant tout effilochage lors du piquage' },
      { x: 26, y: 66, label: 'Système Caméra Optique', desc: 'Reconnaissance automatique des repères et correction géométrique' },
    ],
  },
  'laboratoire-prepresse-cao': {
    id: 'laboratoire-prepresse-cao',
    brandBadge: 'LECTRA • GERBER • CHAMBRE UV',
    stationNum: '06',
    zone: 'BUREAU D\'ÉTUDES & PRÉ-PRESSE',
    capacityMetric: 'Calibrage Millimétré',
    speedMetric: 'Traceurs films haute densité Dmax',
    precisionMetric: 'Tension pneumatique toiles 120T',
    regulationMetric: 'Chambre d\'insolation UV sous vide',
    hotspots: [
      { x: 42, y: 38, label: 'Postes CAO Lectra & Piquage', desc: 'Numérisation vectorielle et programmation des points pour Tajima/Barudan' },
      { x: 76, y: 44, label: 'Traceurs Numériques HD', desc: 'Tirage de films typons à opacité maximale pour séparation couleur' },
      { x: 26, y: 72, label: 'Table de Tension Pneumatique', desc: 'Contrôle digital en Newtons pour stabilité dimensionnelle des soies' },
    ],
  },
};

export const FactoryTour: React.FC<FactoryTourProps> = ({ currentLang, onSelectPhoto }) => {
  const t = translations[currentLang].plant;
  const [activeMachineIndex, setActiveMachineIndex] = useState<number>(0);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const currentMachine = factoryMachines[activeMachineIndex] || factoryMachines[0];
  const currentMeta = MACHINES_EXTENDED[currentMachine.id] || MACHINES_EXTENDED['carrousel-serigraphie-roq'];

  const handlePrev = () => {
    setActiveMachineIndex((prev) => (prev > 0 ? prev - 1 : factoryMachines.length - 1));
    setActiveHotspotIndex(null);
  };

  const handleNext = () => {
    setActiveMachineIndex((prev) => (prev < factoryMachines.length - 1 ? prev + 1 : 0));
    setActiveHotspotIndex(null);
  };

  return (
    <section id="plant" className="py-20 sm:py-28 bg-[#FAFAFB] border-t border-slate-200 relative overflow-hidden">
      
      {/* Decorative subtle background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0A0A0A 1px, transparent 1px)`,
          backgroundSize: `24px 24px`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 sm:pb-10 border-b border-slate-200 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tpe-yellow animate-pulse"></span>
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

            {/* Plant Badge & Navigation Arrows */}
            <div className="flex items-center gap-3 self-start lg:self-end">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs font-mono text-slate-700 shadow-xs">
                <Building2 className="w-4 h-4 text-tpe-magenta" />
                <span className="font-bold">Ras Jebel • 3 200 m² Couverts</span>
              </div>

              <div className="inline-flex items-center rounded-sm bg-white border border-slate-200 p-0.5 shadow-xs">
                <button
                  onClick={handlePrev}
                  className="p-1.5 hover:bg-slate-100 text-slate-700 rounded-sm transition-colors"
                  title="Machine précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2.5 text-xs font-mono font-bold text-slate-900">
                  0{activeMachineIndex + 1} / 0{factoryMachines.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1.5 hover:bg-slate-100 text-slate-700 rounded-sm transition-colors"
                  title="Machine suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. FACTORY TELEMETRY HUD BAR (Live Workshop Conditions) */}
        <ScrollReveal animation="fade-up" delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 my-6 sm:my-8">
            
            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-amber-50 text-amber-600">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Température Usine
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                  21.0°C ± 0.5°
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-blue-50 text-blue-600">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Contrôle Hygrométrique
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                  55% RH Constant
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-emerald-50 text-emerald-600">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Cadence Globale
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                  157 700 pcs / j
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-purple-50 text-purple-600">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Effectif Qualifié
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                  140+ Opérateurs
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-rose-50 text-tpe-red">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Certification
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                  ISO 9001 • GOTS
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-3 sm:p-3.5 rounded-sm shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-sm bg-emerald-50 text-emerald-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                  Régime Douanier
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-700 block">
                  EUR.1 (0% Taxe)
                </span>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* 2. THE DUAL-WING INDUSTRIAL COMMAND HUB STAGE */}
        <ScrollReveal animation="fade-up" delay={140}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-2">
          
          {/* LEFT WING: Photographic Viewport with Interactive Component Hotspots (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-sm overflow-hidden border border-slate-200/90 bg-slate-950 shadow-xl relative min-h-[460px] sm:min-h-[520px]">
            
            {/* Real Machine Photo with Smooth Scale on Hover */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={currentMachine.image}
                alt={currentMachine.title[currentLang]}
                className="w-full h-full object-cover transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />
            </div>

            {/* Top Overlay Bar */}
            <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 uppercase tracking-widest">
                  STATION {currentMeta.stationNum} • {currentMeta.brandBadge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPhoto(
                    currentMachine.image,
                    currentMachine.title[currentLang],
                    currentMachine.description[currentLang]
                  )}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-950 text-xs font-mono uppercase font-bold rounded-sm shadow-md backdrop-blur-md transition-all hover:scale-102"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Zoom HD 200%</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE COMPONENT HOTSPOTS ON MACHINE */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {currentMeta.hotspots.map((hs, idx) => {
                const isSelected = activeHotspotIndex === idx;

                return (
                  <div
                    key={idx}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Pulsing Hotspot Target Button */}
                    <button
                      onClick={() => setActiveHotspotIndex(isSelected ? null : idx)}
                      onMouseEnter={() => setActiveHotspotIndex(idx)}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ${
                        isSelected ? 'scale-115' : ''
                      }`}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tpe-magenta opacity-75"></span>
                      <span className="relative inline-flex items-center justify-center rounded-full h-7 w-7 bg-tpe-magenta border-2 border-white shadow-lg text-white font-mono text-[10px] font-bold">
                        {idx + 1}
                      </span>
                    </button>

                    {/* Interactive Component Tooltip Popover */}
                    {isSelected && (
                      <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 bg-slate-950/95 text-white p-3 rounded-sm border border-white/20 shadow-2xl backdrop-blur-md z-30 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                          <span className="text-[10px] font-mono text-tpe-magenta font-bold uppercase tracking-wider">
                            Composant 0{idx + 1}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">
                            Calibré Usine
                          </span>
                        </div>
                        <p className="font-sans font-bold text-xs text-white">
                          {hs.label}
                        </p>
                        <p className="font-sans text-[11px] text-slate-300 mt-1 leading-snug">
                          {hs.desc}
                        </p>
                        {/* Triangle arrow */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Photo Caption & Interactive Prompt */}
            <div className="relative z-20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  ZONE D'ATELIER : {currentMeta.zone}
                </span>
                <p className="font-sans font-black text-lg sm:text-xl text-white">
                  {currentMachine.title[currentLang]}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15 self-start sm:self-auto">
                <Info className="w-3.5 h-3.5 text-tpe-magenta" />
                <span>Cliquez sur les points [1-3] pour inspecter</span>
              </div>
            </div>

          </div>

          {/* RIGHT WING: The Engineering Machine Ledger & Specifications Card (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-7 rounded-sm shadow-md flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Manufacturer & Station Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-tpe-magenta">
                  {currentMeta.brandBadge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-sm">
                  {currentMachine.count}
                </span>
              </div>

              {/* Title & Editorial Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-950 leading-snug">
                  {currentMachine.title[currentLang]}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-600 mt-2 leading-relaxed">
                  {currentMachine.description[currentLang]}
                </p>
              </div>

              {/* 4 Technical Parameters Bento Box */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                
                <div className="bg-[#FAFAFB] border border-slate-200/80 p-3 rounded-sm">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                    Cadence / Vitesse
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 block mt-1">
                    {currentMeta.speedMetric}
                  </span>
                </div>

                <div className="bg-[#FAFAFB] border border-slate-200/80 p-3 rounded-sm">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                    Précision Mécanique
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 block mt-1 leading-snug">
                    {currentMeta.precisionMetric}
                  </span>
                </div>

                <div className="bg-[#FAFAFB] border border-slate-200/80 p-3 rounded-sm">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                    Régulation Technique
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 block mt-1 leading-snug">
                    {currentMeta.regulationMetric}
                  </span>
                </div>

                <div className="bg-[#FAFAFB] border border-slate-200/80 p-3 rounded-sm">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                    Capacité Quotidienne
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 block mt-1">
                    {currentMeta.capacityMetric}
                  </span>
                </div>

              </div>

              {/* Manufacturer Specs Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Spécifications Constructeur & Conformité :
                </span>
                {currentMachine.specs[currentLang].slice(0, 3).map((sp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-sans text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-tpe-magenta text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm shadow-md transition-all group"
              >
                <span>Planifier une Visite de l'Atelier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={() => onSelectPhoto(
                  currentMachine.image,
                  currentMachine.title[currentLang],
                  currentMachine.description[currentLang]
                )}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono uppercase font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.ctaView}</span>
              </button>
            </div>

          </div>

        </div>
        </ScrollReveal>

        {/* 3. SYNCHRONIZED MACHINERY FILMSTRIP / CAROUSEL RACK */}
        <ScrollReveal animation="fade-up" delay={180}>
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-tpe-yellow" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-800 font-bold">
                PARC MACHINES COMPLET • SÉLECTIONNEZ UNE STATION INDUSTRIELLE (06)
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] font-mono text-slate-400">
              Cliquez pour inspecter la station sur le poste de commande
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {factoryMachines.map((m, idx) => {
              const isSelected = activeMachineIndex === idx;
              const meta = MACHINES_EXTENDED[m.id];

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setActiveMachineIndex(idx);
                    setActiveHotspotIndex(null);
                  }}
                  className={`group relative rounded-sm overflow-hidden border p-2.5 bg-white cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-slate-950 shadow-md ring-2 ring-slate-950/10'
                      : 'border-slate-200/90 hover:border-slate-400 hover:shadow-xs'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xs bg-slate-900 mb-2">
                    <img
                      src={m.image}
                      alt={m.title[currentLang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-xs ${
                        isSelected ? 'bg-slate-950 text-white' : 'bg-black/70 text-white/90 backdrop-blur-xs'
                      }`}>
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Brand & Title */}
                  <div>
                    <span className="text-[9px] font-mono uppercase text-tpe-magenta font-bold block truncate">
                      {m.brand.split(' ')[0]}
                    </span>
                    <p className={`font-sans font-bold text-xs line-clamp-1 mt-0.5 ${
                      isSelected ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'
                    }`}>
                      {m.title[currentLang].split(' ')[0]} {m.title[currentLang].split(' ')[1] || ''}
                    </p>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold block mt-0.5 truncate">
                      {meta?.capacityMetric || m.count}
                    </span>
                  </div>

                  {/* Active Indicator Bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all ${
                    isSelected ? 'bg-slate-950' : 'bg-transparent group-hover:bg-slate-300'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
