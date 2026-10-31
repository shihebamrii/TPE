import React, { useState } from 'react';
import { ZoomIn, ArrowUpRight } from 'lucide-react';
import type { Language, PortfolioItem } from '../types';
import { translations } from '../data/translations';
import { useSiteData } from '../context/SiteContext';
import { ScrollReveal } from './common/ScrollReveal';

interface PortfolioLookbookProps {
  currentLang: Language;
  onSelectProject: (image: string, title: string, description: string, macroImage?: string) => void;
}

export const PortfolioLookbook: React.FC<PortfolioLookbookProps> = ({ currentLang, onSelectProject }) => {
  const t = translations[currentLang].lookbook;
  const { data } = useSiteData();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: t.filterAll },
    { id: 'fashion', label: t.filterFashion },
    { id: 'badges', label: t.filterBadges },
    { id: 'streetwear', label: t.filterStreetwear },
    { id: 'special', label: t.filterSpecial },
  ];

  const filteredItems = activeFilter === 'all'
    ? data.portfolio
    : data.portfolio.filter((item) => item.category === activeFilter);

  return (
    <section id="lookbook" className="py-24 bg-[#FAFAFB] border-t border-slate-200">
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

            {/* Filter Links */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider font-bold">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`pb-1 transition-all ${
                    activeFilter === f.id
                      ? 'text-slate-950 border-b-2 border-tpe-magenta'
                      : 'text-slate-400 hover:text-slate-900 border-b-2 border-transparent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Lookbook Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filteredItems.map((item: PortfolioItem, idx: number) => (
            <ScrollReveal key={item.id} animation="fade-up" delay={(idx % 3) * 100} className="h-full">
              <div
                onClick={() => onSelectProject(
                  item.macroImage || item.image,
                  item.title[currentLang],
                  item.description[currentLang],
                  item.image
                )}
                className="cursor-pointer group flex flex-col justify-between bg-white border border-slate-200 p-4 rounded-sm transition-all duration-300 hover:border-slate-900 hover:shadow-md h-full"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title[currentLang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />

                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-slate-900 rounded-xs border border-slate-200 shadow-xs">
                    {item.technique[currentLang]}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950 text-white p-2 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Editorial Caption */}
                <div className="pt-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{item.garment[currentLang]}</span>
                      <span className="text-tpe-magenta font-bold">{item.year}</span>
                    </div>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-950 mt-1 group-hover:text-tpe-magenta transition-colors">
                      {item.title[currentLang]}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 2).map((tg, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs">
                          {tg}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-950 transition-colors inline-flex items-center gap-1 font-bold">
                      <span>Inspecter</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
