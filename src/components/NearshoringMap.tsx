import React, { useState } from 'react';
import { Ship, Plane, Clock, ShieldCheck, ArrowRight, Anchor, Globe, CheckCircle2 } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { useSiteData } from '../context/SiteContext';
import { ScrollReveal } from './common/ScrollReveal';

interface NearshoringMapProps {
  currentLang: Language;
}

export const NearshoringMap: React.FC<NearshoringMapProps> = ({ currentLang }) => {
  const t = translations[currentLang].nearshore;
  const { data } = useSiteData();
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);

  const routeDetails = data.nearshoringRoutes && data.nearshoringRoutes.length > 0 ? data.nearshoringRoutes : [
    {
      id: "route-marseille",
      destination: "Marseille / Sud France",
      time: "48 Heures",
      mode: "Ferry Ro-Ro Quotidien",
      port: "Port de Bizerte / Radès vers Grand Port Maritime de Marseille",
      customs: "Accord EUR.1 : Dédouanement anticipé en mer, zéro droit de douane",
      frequency: "Départs quotidiens réguliers",
      badge: "LIAISON N°1 FRANCE",
    },
    {
      id: "route-genes",
      destination: "Gênes / Italie du Nord",
      time: "48 Heures",
      mode: "Liaison Maritime Ro-Ro Directe",
      port: "Port de Radès vers Port de Gênes (Accès direct Lombardie & Piémont)",
      customs: "Accord EUR.1 : Entrée directe dans l'espace Schengen sans taxes d'importation",
      frequency: "5 départs maritimes par semaine",
      badge: "AXE INDUSTRIEL ITALIE",
    },
  ];

  const currentRoute = routeDetails[selectedRouteIdx] || routeDetails[0];

  return (
    <section id="nearshore" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-slate-200 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-tpe-cyan"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                  {t.tag}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-slate-950 uppercase tracking-tight">
                {t.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Strategic Mediterranean Logistics Grid */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Shipping Routes Ledger */}
          <ScrollReveal animation="fade-up" delay={100} className="lg:col-span-5 space-y-3">
            <div className="pb-3 flex items-center justify-between border-b border-slate-200">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                LIGNES MARITIMES & AÉRIENNES RÉGULIÈRES
              </span>
              <span className="text-[11px] font-mono text-emerald-600 font-bold">
                DÉPARTS HEBDOMADAIRES MULTIPLES
              </span>
            </div>

            <div className="space-y-2">
              {routeDetails.map((route, idx) => {
                const isSelected = selectedRouteIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRouteIdx(idx)}
                    className={`p-4 rounded-sm border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-slate-950 bg-[#FAFAFB] shadow-xs'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-tpe-magenta">
                        {route.badge}
                      </span>
                      <span className="text-xs font-mono font-black text-slate-950 bg-slate-100 px-2 py-0.5 rounded-xs">
                        {route.time}
                      </span>
                    </div>

                    <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900">
                      {route.destination}
                    </h3>

                    <p className="text-xs font-sans text-slate-500 mt-1">
                      {route.mode}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Column: Detailed Hub Overview & Customs Clearance */}
          <ScrollReveal animation="fade-up" delay={180} className="lg:col-span-7 bg-[#FAFAFB] border border-slate-200 p-6 sm:p-8 rounded-sm">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                  HUB LOGISTIQUE SÉLECTIONNÉ
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-slate-950 uppercase tracking-tight">
                  {currentRoute.destination}
                </h3>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100/70 border border-emerald-300 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Accord EUR.1 : 0% Douane
                </span>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                  ITINÉRAIRE & PORTS DE TRANSIT
                </span>
                <p className="text-sm font-sans text-slate-800 font-medium">
                  {currentRoute.port}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                  RÉGIME DOUANIER & EXONÉRATION
                </span>
                <p className="text-sm font-sans text-slate-800 font-medium">
                  {currentRoute.customs}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                  FRÉQUENCE DES EXPÉDITIONS
                </span>
                <p className="text-sm font-sans text-slate-800 font-medium">
                  {currentRoute.frequency}
                </p>
              </div>
            </div>

            {/* Visual Route Indicator Strip */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                  TN
                </div>
                <div className="h-0.5 w-16 bg-gradient-to-r from-slate-900 to-tpe-magenta"></div>
                <div className="w-8 h-8 rounded-full bg-tpe-magenta text-white flex items-center justify-center text-xs font-mono font-bold">
                  EU
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  Transit Port-à-Port garanti {currentRoute.time}
                </span>
              </div>

              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Départ : Ras Jebel (37°13'N)
              </span>
            </div>

          </ScrollReveal>

        </div>

        {/* The 4 Nearshoring Strategic Advantages (Clean 4-Column Architectural Ledger) */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(data.nearshoringAdvantages || t.advantages).map((adv: any, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-xs font-mono font-bold text-tpe-magenta block">
                  /{adv.num}
                </span>
                <h4 className="font-sans font-black text-lg text-slate-950 uppercase tracking-tight">
                  {typeof adv.title === 'string' ? adv.title : (adv.title[currentLang] || adv.title.fr)}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                  {typeof adv.desc === 'string' ? adv.desc : (adv.desc[currentLang] || adv.desc.fr)}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
