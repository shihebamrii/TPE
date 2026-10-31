import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import { SiteProvider, useSiteData } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientReferences } from './components/ClientReferences';
import { NearshoringMap } from './components/NearshoringMap';
import { TechniquesMatrix } from './components/TechniquesMatrix';
import { FactoryTour } from './components/FactoryTour';
import { PortfolioLookbook } from './components/PortfolioLookbook';
import { EcoQualityStandards } from './components/EcoQualityStandards';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { AIChatBot } from './components/AIChatBot';
import { TechPackRFQModal } from './components/TechPackRFQModal';
import { LightboxModal } from './components/LightboxModal';
import { AdminDashboard } from './admin/AdminDashboard';
import { Lock, LayoutDashboard, Settings } from 'lucide-react';

const MainPublicSite: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);
  const [selectedRFQTechnique, setSelectedRFQTechnique] = useState<string>('Broderie Industrielle Multi-Têtes & Relief 3D');
  const { viewMode, setViewMode, isAdminLoggedIn, data } = useSiteData();

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    description: string;
    macroImage?: string;
  }>({
    isOpen: false,
    image: '',
    title: '',
    description: '',
    macroImage: undefined,
  });

  // Hotkey to quickly open Admin Dashboard (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setViewMode(viewMode === 'admin' ? 'public' : 'admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, setViewMode]);

  const openRFQWithTechnique = (techTitle: string) => {
    setSelectedRFQTechnique(techTitle);
    setIsRFQOpen(true);
  };

  const openLightbox = (image: string, title: string, description: string, macroImage?: string) => {
    setLightboxState({
      isOpen: true,
      image,
      title,
      description,
      macroImage,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // If Admin View is active, render full Admin Dashboard
  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-tpe-magenta selection:text-white relative">
      
      {/* Top Fixed Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenRFQ={() => setIsRFQOpen(true)}
      />

      {/* Main Showcase Flow */}
      <main className="flex-1">
        
        {/* Luminous Hero with Cinematic Machinery Video & Operational Metrics */}
        <Hero
          currentLang={currentLang}
          onOpenRFQ={() => setIsRFQOpen(true)}
        />

        {/* Interactive Textile Embellishment & Finishes Matrix (Real Machine Photos & Specs) */}
        <TechniquesMatrix
          currentLang={currentLang}
          onSelectMacro={(img, title, desc) => openLightbox(img, title, desc)}
          onSelectRFQTechnique={openRFQWithTechnique}
        />

        {/* Ras Jebel Manufacturing Facility & Machinery Ledger (ROQ, Tajima, Aeon Kyo, Laser) */}
        <FactoryTour
          currentLang={currentLang}
          onSelectPhoto={(img, title, desc) => openLightbox(img, title, desc)}
        />

        {/* Real Production Lookbook & Macro Textures (Tommy, Replay, Pinko, Tajima) */}
        <PortfolioLookbook
          currentLang={currentLang}
          onSelectProject={(img, title, desc, macroImg) => openLightbox(img, title, desc, macroImg)}
        />

        {/* International Standards, Triple ISO & Eco Certifications (GOTS, GRS, OEKO-TEX) */}
        <EcoQualityStandards
          currentLang={currentLang}
        />

        {/* International Fashion Client References Ribbon (Lacoste, Tommy, Armani, Sandro...) */}
        <ClientReferences
          currentLang={currentLang}
        />

        {/* Mediterranean Nearshoring Strategic Timetable (48h Marseille/Gênes, EUR.1 0% Douane) */}
        <NearshoringMap
          currentLang={currentLang}
        />

        {/* Facility Location, Official Contacts & Interactive Map */}
        <ContactLocation
          currentLang={currentLang}
          onOpenRFQ={() => setIsRFQOpen(true)}
        />

      </main>

      {/* Executive Clean Footer */}
      <Footer
        currentLang={currentLang}
        onOpenRFQ={() => setIsRFQOpen(true)}
      />

      {/* Executive Industrial AI Concierge & Chatbot */}
      <AIChatBot 
        currentLang={currentLang} 
        onOpenRFQ={() => setIsRFQOpen(true)} 
      />

      {/* Interactive 3-Step Tech-Pack RFQ Modal */}
      <TechPackRFQModal
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        currentLang={currentLang}
        initialTechnique={selectedRFQTechnique}
      />

      {/* 200% Macro Inspection Lightbox */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        image={lightboxState.image}
        title={lightboxState.title}
        description={lightboxState.description}
        macroImage={lightboxState.macroImage}
      />

      {/* Floating Admin Switcher Dock (Visible when authenticated) */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-6 left-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            onClick={() => setViewMode('admin')}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-950/90 hover:bg-slate-900 text-white rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all group hover:border-tpe-magenta"
            title="Ouvrir la console d'administration (Ctrl + Shift + A)"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div className="text-left">
              <div className="text-xs font-bold font-sans flex items-center gap-1.5">
                <span>Console Admin Active</span>
                <span className="text-[10px] font-mono text-slate-400">(Ctrl+Shift+A)</span>
              </div>
              <div className="text-[10px] font-mono text-tpe-magenta">
                {data.rfqLeads.filter(l => l.status === 'new').length} nouveau(x) devis
              </div>
            </div>
            <LayoutDashboard className="w-4 h-4 text-tpe-magenta ml-1 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SiteProvider>
      <MainPublicSite />
    </SiteProvider>
  );
};

export default App;
