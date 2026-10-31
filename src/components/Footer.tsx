import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  MessageSquare,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { useSiteData } from '../context/SiteContext';

interface FooterProps {
  currentLang: Language;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenRFQ }) => {
  const t = translations[currentLang].footer;
  const nav = translations[currentLang].nav;
  const { data, setViewMode } = useSiteData();
  const contact = data.contact;

  // Real-time Factory Clock in Ras Jebel (UTC+1)
  const [factoryTime, setFactoryTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', {
          timeZone: 'Africa/Tunis',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setFactoryTime(timeStr);
      } catch {
        setFactoryTime('17:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const techniquesLinks = [
    { href: '#techniques', label: 'Sérigraphie Carrousel ROQ', badge: '20k/j' },
    { href: '#techniques', label: 'Broderie Multi-Têtes Tajima', badge: '5.4k/j' },
    { href: '#techniques', label: 'Impression Direct Textile / DTF', badge: 'HD' },
    { href: '#techniques', label: 'Étiquettes, Cavaliers & Tags', badge: '132k/j' },
    { href: '#techniques', label: 'Bureau CAO Lectra & Laser', badge: 'CAO' },
    { href: '#lookbook', label: 'Finitions Spéciales & 3D', badge: 'Luxe' },
  ];

  const complianceLinks = [
    { href: '#standards', label: 'Triple ISO (9001/14001/45001)' },
    { href: '#standards', label: 'Coton Biologique GOTS' },
    { href: '#standards', label: 'Sécurité Chimique OEKO-TEX®' },
    { href: '#standards', label: 'Matières Recyclées GRS' },
    { href: '#nearshore', label: 'Transit Ro-Ro 48h (EUR.1)' },
    { href: '#references', label: 'Accords NDA Donneurs d\'Ordres' },
  ];

  const standardsBadges = [
    {
      name: 'Triple ISO',
      sub: '9001 • 14001 • 45001',
      logo: '/assets/logos/certifications/iso_9001.svg',
      alt: 'Certification Triple ISO 9001 14001 45001',
    },
    {
      name: currentLang === 'fr' ? 'GOTS Bio' : 'GOTS Organic',
      sub: currentLang === 'fr' ? 'Coton Biologique' : 'Organic Cotton',
      logo: '/assets/logos/certifications/gots.svg',
      alt: 'Global Organic Textile Standard GOTS',
    },
    {
      name: 'OEKO-TEX®',
      sub: currentLang === 'fr' ? 'Standard 100 Classe I' : 'Standard 100 Class I',
      logo: '/assets/logos/certifications/oeko_tex.svg',
      alt: 'OEKO-TEX Standard 100',
    },
    {
      name: 'GRS',
      sub: currentLang === 'fr' ? 'Fibres Recyclées' : 'Recycled Standard',
      logo: '/assets/logos/certifications/grs.png',
      alt: 'Global Recycled Standard GRS',
    },
    {
      name: currentLang === 'fr' ? 'Accord EUR.1' : 'EUR.1 Treaty',
      sub: currentLang === 'fr' ? '0% Douane UE' : '0% EU Customs',
      logo: '/assets/logos/certifications/eu_flag.svg',
      alt: 'Accord EUR.1 Union Européenne',
      highlight: true,
    },
  ];

  return (
    <footer className="bg-[#0A0E17] text-slate-300 pt-12 pb-10 relative overflow-hidden border-t border-slate-800">
      
      {/* 4-Color Signature CMYK Micro Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex">
        <div className="flex-1 bg-tpe-cyan" />
        <div className="flex-1 bg-tpe-magenta" />
        <div className="flex-1 bg-tpe-yellow" />
        <div className="flex-1 bg-tpe-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* MAIN 4-COLUMN ARCHITECTURAL SITEMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Column 1: Brand, Mission & Offshore Status (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-sm inline-flex items-center shadow-xs">
                <img
                  src="/logo_transparent.png"
                  alt="TPE Textil Print & Embroidery Tunisie"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
              <span className="font-script text-base sm:text-lg text-tpe-red font-bold">
                « {t.slogan} »
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              {currentLang === 'fr'
                ? 'Entreprise totalement exportatrice fondée en 2015 à Ras Jebel (Bizerte). Façonnage textile d\'excellence (broderie multi-têtes, sérigraphie haute cadence et étiquetage) pour les marques européennes de prêt-à-porter et du luxe.'
                : '100% export industrial textile embellishment facility founded in 2015 in Ras Jebel (Bizerte). High-volume screen printing, embroidery, and luxury labeling for European brands.'}
            </p>

            <div className="pt-1 space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Statut Totalement Exportateur • Accord EUR.1 (0% Douane)</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-tpe-cyan shrink-0" />
                <span>37°13'08.3"N 10°07'04.6"E • Ras Jebel (Bizerte)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Pôles Techniques Industriels (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold block pb-1 border-b border-slate-800">
              Savoir-Faire
            </span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-400">
              {techniquesLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-white transition-colors flex items-center justify-between group py-0.5">
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-600 group-hover:text-tpe-magenta shrink-0 ml-1.5">
                      {item.badge}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Conformité & Logistique (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold block pb-1 border-b border-slate-800">
              Conformité & Flux
            </span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-400">
              {complianceLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-white transition-colors block py-0.5">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Usine & Action Directe (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold block pb-1 border-b border-slate-800">
              Permanence Usine
            </span>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <a
                href={`tel:${contact.phoneStandard.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-tpe-cyan shrink-0" />
                <span className="font-bold">{contact.phoneStandard}</span>
                <span className="text-[10px] text-slate-500">(Standard)</span>
              </a>

              <a
                href={`https://wa.me/${contact.whatsappNumberOnly || contact.phoneWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{contact.phoneWhatsapp}</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-xs">
                  WhatsApp Usine
                </span>
              </a>

              <a
                href={`mailto:${contact.emailStandard}`}
                className="flex items-center gap-2 text-slate-300 hover:text-tpe-magenta transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-tpe-yellow shrink-0" />
                <span>{contact.emailStandard}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRFQ}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-tpe-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-md transition-all hover:scale-101"
              >
                <span>{nav.requestQuote}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. REFINED ACCREDITATIONS & RSE STRIP WITH AUTHENTIC LOGOS */}
        <div className="my-6 p-4 bg-white/[0.02] border border-white/5 rounded-sm space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {currentLang === 'fr' ? 'Normes & Audits :' : 'Standards & Audits :'}
              </span>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                {currentLang === 'fr'
                  ? '• Conformité RSE & Cahiers des Charges Européens'
                  : '• CSR Compliance & European Buyer Specs'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-sm w-fit">
              <span>✓</span>
              <span>
                {currentLang === 'fr'
                  ? "Certificats & Rapports d'audit disponibles sous 24h"
                  : 'Certificates & Audit reports available within 24h'}
              </span>
            </div>
          </div>

          {/* 5-item Micro-Badge Matrix with Authentic Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {standardsBadges.map((badge, idx) => (
              <a
                key={idx}
                href="#standards"
                className="flex items-center gap-2.5 p-2 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all group"
                title={`${badge.name} - ${badge.sub}`}
              >
                <div className="w-8 h-8 rounded-xs bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <img
                    src={badge.logo}
                    alt={badge.alt}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-white group-hover:text-emerald-400 transition-colors truncate leading-tight">
                    {badge.name}
                  </span>
                  <span
                    className={`text-[9.5px] truncate leading-tight mt-0.5 ${
                      badge.highlight ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {badge.sub}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 4. EXECUTIVE LEGAL & BEACON BOTTOM STRIP */}
        <div className="pt-4 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          
          <div className="space-y-0.5 text-center lg:text-left">
            <p className="text-slate-400">
              © {new Date().getFullYear()} TPE Textil Print & Embroider Tunisie. Tous droits réservés.
            </p>
            <p className="text-[10px] text-slate-600">
              Matricule Fiscal & RC Bizerte : 1397455/M/A/M/000 • Code Douane EUR.1
            </p>
          </div>

          {/* Center: Live Factory Beacon */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.03] border border-white/5 text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">
              Heure Usine Ras Jebel : <strong className="text-white font-bold">{factoryTime || 'UTC+1'}</strong> • Ateliers en cadence
            </span>
          </div>

          {/* Right: Legal Links, Admin Access & Back to Top */}
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">{t.confidentiality}</span>
            <span>•</span>
            <button
              onClick={() => setViewMode('admin')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-tpe-magenta transition-colors"
              title="Console d'Administration TPE"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Administration</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/10 px-2.5 py-1 rounded-sm border border-white/10"
              title={t.scrollTop}
            >
              <span>{t.scrollTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
