import React, { useState } from 'react';
import type { Language } from './types';
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

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);
  const [selectedRFQTechnique, setSelectedRFQTechnique] = useState<string>('Broderie Industrielle Multi-Têtes & Relief 3D');

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

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-tpe-magenta selection:text-white">
      
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

    </div>
  );
};

export default App;

