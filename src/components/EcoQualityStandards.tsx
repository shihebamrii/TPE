import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ScrollReveal } from './common/ScrollReveal';

interface EcoQualityStandardsProps {
  currentLang: Language;
}

interface StandardPillar {
  id: string;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  logos: { src: string; alt: string; hClass: string }[];
  highlights: string[];
  auditInfo: string;
}

export const EcoQualityStandards: React.FC<EcoQualityStandardsProps> = ({ currentLang }) => {
  const t = translations[currentLang].standards;
  const [selectedPillar, setSelectedPillar] = useState<StandardPillar | null>(null);

  const pillars: StandardPillar[] = [
    {
      id: "triple-iso",
      tag: "PILLIER 01 • QUALITÉ & RSE",
      badge: "TRIPLE ISO",
      title: "ISO 9001 • 14001 • 45001",
      subtitle: "Management Qualité, Environnement & Santé",
      logos: [
        { src: "/assets/logos/certifications/iso_9001.svg", alt: "ISO 9001:2015 Qualité", hClass: "h-9 sm:h-10" },
        { src: "/assets/logos/certifications/iso_14001.svg", alt: "ISO 14001:2015 Environnement", hClass: "h-9 sm:h-10" },
        { src: "/assets/logos/certifications/iso_45001.png", alt: "ISO 45001:2018 Sécurité", hClass: "h-8 sm:h-9" },
      ],
      highlights: [
        "Traçabilité statistique unitaire zéro défaut",
        "Filtration et recyclage des eaux de rinçage",
        "Ateliers climatisés & sécurité de 140+ collaborateurs",
      ],
      auditInfo: "Certifié par organismes accrédités internationaux. Audits annuels.",
    },
    {
      id: "gots-bio",
      tag: "PILLIER 02 • FILIÈRE BIOLOGIQUE",
      badge: "COTON GOTS",
      title: "GOTS (Global Organic)",
      subtitle: "Coton Biologique Certifié d'Origine",
      logos: [
        { src: "/assets/logos/certifications/gots.svg", alt: "GOTS Global Organic Textile Standard", hClass: "h-12 sm:h-14" },
      ],
      highlights: [
        "Homologation ennoblissement sur cotons 100% bio",
        "Traçabilité sous Transaction Certificate (TC)",
        "Audit des critères sociaux et environnementaux",
      ],
      auditInfo: "Chaîne de contrôle certifiée de la filature à la finition finale.",
    },
    {
      id: "chimie-recyclage",
      tag: "PILLIER 03 • CHIMIE SÛRE & RECYCLÉ",
      badge: "SANS PHTALATE",
      title: "OEKO-TEX® & GRS",
      subtitle: "Chimie Saine & Fibres Recyclées",
      logos: [
        { src: "/assets/logos/certifications/oeko_tex.svg", alt: "OEKO-TEX Standard 100", hClass: "h-11 sm:h-12" },
        { src: "/assets/logos/certifications/grs.png", alt: "GRS Global Recycled Standard", hClass: "h-9 sm:h-10" },
      ],
      highlights: [
        "Encres à l'eau sans métaux lourds ni phtalates",
        "Certification contact direct avec la peau Classe I/II",
        "Global Recycled Standard pour fils polyester/nylon",
      ],
      auditInfo: "Conformité stricte aux listes RSL des plus grandes marques européennes.",
    },
    {
      id: "accord-eur1",
      tag: "PILLIER 04 • DOUANE 0% TAXE",
      badge: "ACCORD EUR.1",
      title: "Franchise Douanière UE",
      subtitle: "Exonération Totale des Droits de Douane",
      logos: [
        { src: "/assets/logos/certifications/eu_flag.svg", alt: "Drapeau Union Européenne Accord EUR.1", hClass: "h-8 sm:h-9" },
      ],
      highlights: [
        "0% de droits de douane à l'importation dans l'UE",
        "Statut Entreprise Totalement Exportatrice (Offshore)",
        "Transit maritime express 48h (Marseille & Gênes)",
      ],
      auditInfo: "Bénéfice immédiat des accords bilatéraux Union Européenne - Tunisie.",
    },
  ];

  return (
    <section id="standards" className="py-12 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Top Emerald Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Editorial Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  {t.tag}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black text-slate-950 uppercase tracking-tight">
                {t.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pillars in a Single Compact Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-6">
          {pillars.map((p, idx) => (
            <ScrollReveal key={p.id} animation="fade-up" delay={idx * 75} className="h-full">
              <div
                className="group bg-[#FAFAFB] border border-slate-200/90 rounded-sm p-4 sm:p-5 hover:border-slate-400 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/60">
                      {p.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Compact Embedded Logo Frame */}
                  <div className="h-16 w-full bg-white border border-slate-200/80 rounded-sm px-3 py-1.5 mb-3.5 flex items-center justify-center gap-3 shadow-2xs group-hover:border-slate-300 transition-colors">
                    {p.logos.map((logo, lIdx) => (
                      <img
                        key={lIdx}
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className={`${logo.hClass} max-w-[85px] object-contain filter grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
                      />
                    ))}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-sans font-black text-base text-slate-950 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                    {p.subtitle}
                  </p>

                  {/* Bullets (Compact) */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1.5">
                    {p.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5 text-[11px] font-sans text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Status Tag */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-700 font-semibold truncate">
                    ✓ Certifié Auditable
                  </span>
                  <span className="text-slate-400">EUR.1</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Compact 1-Line Audit Strip */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div className="mt-6 p-4 sm:p-4.5 bg-slate-950 text-white rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-800">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-sans text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="leading-snug">
                <strong className="text-white font-bold">Dossier d'Audit RSE & Acheteurs :</strong> Certificats ISO, GOTS et rapports OEKO-TEX originaux transmis sous 24h ouvrées.
              </p>
            </div>

            <a
              href="mailto:contact@tpe-sa.com?subject=Demande%20des%20Certificats%20ISO%20et%20GOTS%20TPE%20Ras%20Jebel"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-400 text-slate-950 text-xs font-mono uppercase tracking-wider font-bold rounded-sm shadow-xs transition-all flex-shrink-0 group"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Demander Dossier d'Audit</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
