import React from 'react';
import { ExternalLink, ArrowUpRight, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import type { Language, ContactSettings } from '../types';
import { translations } from '../data/translations';
import { useSiteData } from '../context/SiteContext';
import { ScrollReveal } from './common/ScrollReveal';

interface ContactLocationProps {
  currentLang: Language;
  onOpenRFQ: () => void;
  overrideContact?: ContactSettings;
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ currentLang, onOpenRFQ, overrideContact }) => {
  const t = translations[currentLang].contact;
  const { data } = useSiteData();
  const contact = overrideContact || data.contact;

  return (
    <section id="contact" className="py-24 bg-[#FAFAFB] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-slate-200 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-tpe-red"></span>
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

        {/* Directory & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 items-start">
          
          {/* Left Column: Official Contact Ledger */}
          <ScrollReveal animation="fade-up" delay={100} className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm space-y-6">
            
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                {t.addressTitle}
              </span>
              <p className="font-sans font-extrabold text-lg text-slate-950 leading-snug">
                {contact.factoryAddress || t.addressText}
              </p>
              <a
                href={contact.mapsUrl || "https://www.google.com/maps/place/TPE+TUNISIE/@37.2189777,10.1179318,915m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12e2e98602f32867:0xd2378773985b40ff!8m2!3d37.2189777!4d10.1179318"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-tpe-magenta font-bold mt-2 hover:underline"
              >
                <span>{t.mapsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                {t.phonesTitle}
              </span>
              <div className="space-y-1.5">
                <a
                  href={`tel:${contact.phoneStandard.replace(/\s+/g, '')}`}
                  className="font-sans font-bold text-base text-slate-950 hover:text-tpe-magenta transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{contact.phoneStandard}</span>
                  <span className="text-xs font-mono text-slate-400 font-normal">(Standard)</span>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsappNumberOnly || contact.phoneWhatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-black text-base text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>{contact.phoneWhatsapp}</span>
                  <span className="text-xs font-mono text-emerald-600 font-normal">(WhatsApp Commercial)</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                {t.emailsTitle}
              </span>
              <div className="space-y-1 font-mono text-xs">
                <a href={`mailto:${contact.emailStandard}`} className="text-slate-950 font-bold hover:text-tpe-magenta block">
                  {contact.emailStandard}
                </a>
                <a href={`mailto:${contact.emailCommercial}`} className="text-slate-500 hover:text-tpe-magenta block">
                  {contact.emailCommercial}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                {t.hoursTitle}
              </span>
              <p className="text-xs font-sans text-slate-600">
                {contact.openingHours[currentLang] || t.hoursText}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenRFQ}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-tpe-magenta text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all shadow-md"
              >
                <span>{t.ctaRfq}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </ScrollReveal>

          {/* Right Column: Google Maps & Location Map Card */}
          <ScrollReveal animation="fade-up" delay={180} className="lg:col-span-7 bg-white border border-slate-200 rounded-sm overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
              <span className="font-bold text-slate-900">GPS : 37°13'08.3"N 10°07'04.6"E</span>
              <span className="uppercase text-slate-500">ZONE INDUSTRIELLE RAS JEBEL</span>
            </div>

            <div className="w-full h-[440px] relative bg-slate-100">
              <iframe
                title="TPE Tunisie Ras Jebel Map"
                src="https://maps.google.com/maps?q=37.2189777,10.1179318&hl=fr&z=14&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="eager"
              />
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
