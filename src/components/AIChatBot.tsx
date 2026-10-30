import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  ArrowUp, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ArrowUpRight, 
  RefreshCw, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import type { Language } from '../types';

interface AIChatBotProps {
  currentLang: Language;
  onOpenRFQ: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    type: 'rfq' | 'whatsapp' | 'scroll' | 'call';
    target?: string;
  }>;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ currentLang, onOpenRFQ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [factoryTime, setFactoryTime] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play subtle luxury audio chime via Web Audio API
  const playChime = (frequency = 880) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Factory local time in Ras Jebel (Tunisia UTC+1)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
          timeZone: 'Africa/Tunis',
          hour: '2-digit',
          minute: '2-digit',
        });
        setFactoryTime(timeStr);
      } catch {
        setFactoryTime('18:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [currentLang]);

  // Scroll to top button visibility threshold
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial welcome greeting
  const getInitialMessages = (): ChatMessage[] => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: currentLang === 'fr'
        ? "Bonjour et bienvenue chez **TPE Tunisie** ! Je suis le Concierge Technique de notre usine de confection & ennoblissement à Ras Jebel (Bizerte).\n\nComment puis-je vous accompagner sur vos productions aujourd'hui ?"
        : "Hello and welcome to **TPE Tunisia**! I am the Technical Concierge of our industrial embellishment facility in Ras Jebel (Bizerte).\n\nHow can I assist your apparel production and sourcing today?",
      timestamp: factoryTime || 'En direct',
      actions: [
        { label: currentLang === 'fr' ? '⚡ Capacités & Cadences' : '⚡ Capacities & Volumes', type: 'scroll', target: '#techniques' },
        { label: currentLang === 'fr' ? '🚢 Transit 48h (EUR.1)' : '🚢 48h Shipping (EUR.1)', type: 'scroll', target: '#nearshore' },
        { label: currentLang === 'fr' ? '📋 Demande de Devis' : '📋 Request a Quote', type: 'rfq' },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);

  // Suggested quick prompts
  const quickPrompts = currentLang === 'fr' ? [
    '⚡ Capacités journalières ROQ & Tajima ?',
    '🚢 Délais de livraison en Europe (EUR.1) ?',
    '🧵 Broderie 3D ou sérigraphie silicone ?',
    '🌿 Certifications GOTS & OEKO-TEX® ?',
    '📋 Comment envoyer mon Tech-Pack ?',
    '👨‍💼 Parler à un ingénieur usine',
  ] : [
    '⚡ Daily capacity for ROQ & Tajima?',
    '🚢 Shipping times to Europe (EUR.1)?',
    '🧵 3D embroidery vs silicone print?',
    '🌿 GOTS & OEKO-TEX® certificates?',
    '📋 How to submit a Tech-Pack?',
    '👨‍💼 Talk to a factory engineer',
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnreadPrompt(false);
      playChime(750);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Reset conversation
  const handleResetChat = () => {
    setMessages(getInitialMessages());
    playChime(600);
  };

  // Execute interactive message actions
  const handleActionClick = (action: { label: string; type: 'rfq' | 'whatsapp' | 'scroll' | 'call'; target?: string }) => {
    playChime(950);
    switch (action.type) {
      case 'rfq':
        onOpenRFQ();
        break;
      case 'whatsapp': {
        const text = currentLang === 'fr'
          ? "Bonjour TPE Tunisie, je viens d'échanger avec votre concierge IA sur le site et je souhaite parler à un ingénieur."
          : "Hello TPE Tunisia, I just consulted your factory AI on your website and would like to speak with an engineer.";
        window.open(`https://wa.me/21698761003?text=${encodeURIComponent(text)}`, '_blank');
        break;
      }
      case 'call':
        window.location.href = 'tel:+21672457143';
        break;
      case 'scroll':
        if (action.target) {
          const el = document.querySelector(action.target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
    }
  };

  // Knowledge base intent processor
  const processUserQuery = (query: string): { text: string; actions?: ChatMessage['actions'] } => {
    const q = query.toLowerCase().trim();

    // 1. Capacities / Machines / Volumes / MOQ
    if (q.includes('capacité') || q.includes('cadence') || q.includes('machine') || q.includes('roq') || q.includes('tajima') || q.includes('volume') || q.includes('moq') || q.includes('quantité') || q.includes('capacity')) {
      if (currentLang === 'fr') {
        return {
          text: "🏭 **Capacités & Parc Machine TPE (Ras Jebel) :**\n\n• **Sérigraphie Carrousel ROQ :** 20 300 pièces/jour (encres à l'eau, rongeant, silicone, puff 3D, foil, paillettes).\n• **Broderie Multi-Têtes Tajima :** 5 400 pièces/jour (point mousse, chenille, relief 3D EVA, fil lurex métallisé).\n• **Étiquettes & Hangtags :** 132 000 pièces/jour (griffes tissées, cavaliers, RFID).\n• **Bureau CAO Lectra :** Numérisation & découpe laser.\n• **MOQ :** Séries tests flexibles dès 250 pcs / grand volume jusqu'à 100 000+ pcs.",
          actions: [
            { label: '📋 Configurer mon devis', type: 'rfq' },
            { label: '🔍 Voir le détail des machines', type: 'scroll', target: '#techniques' },
            { label: '📲 WhatsApp Usine', type: 'whatsapp' },
          ],
        };
      }
      return {
        text: "🏭 **TPE Factory Machinery & Daily Capacity (Ras Jebel):**\n\n• **ROQ Screen Printing Carousel:** 20,300 pcs/day (water-based, discharge, high-density silicone, 3D puff).\n• **Tajima Multi-Head Embroidery:** 5,400 pcs/day (chenille, 3D foam relief, lurex metallic thread).\n• **Labeling & Hangtags:** 132,000 pcs/day (woven labels, necktags, RFID).\n• **Lectra CAD Suite:** Digitization & laser cutting.\n• **MOQ:** Flexible sampling from 250 pcs up to 100,000+ volume runs.",
        actions: [
          { label: '📋 Request a Quote', type: 'rfq' },
          { label: '🔍 View Techniques Matrix', type: 'scroll', target: '#techniques' },
          { label: '📲 WhatsApp Factory', type: 'whatsapp' },
        ],
      };
    }

    // 2. Shipping / Transit / Marseille / Gênes / EUR.1 / Douane
    if (q.includes('délai') || q.includes('livraison') || q.includes('transit') || q.includes('marseille') || q.includes('gênes') || q.includes('douane') || q.includes('eur.1') || q.includes('taxe') || q.includes('shipping') || q.includes('customs')) {
      if (currentLang === 'fr') {
        return {
          text: "🚢 **Nearshoring Méditerranéen & Logistique Express :**\n\n• **Transit Maritime Direct Ro-Ro :** 48 heures depuis le Port de Radès vers Marseille et Gênes.\n• **Franchise Douanière Accord EUR.1 :** 0% de droits de douane à l'importation dans l'Union Européenne.\n• **Statut 100% Exportateur :** Aucun droit d'accise local répercuté.\n• **Délais Échantillonnage :** Lab-dips et strike-offs expédiés sous 48h à 72h via DHL/FedEx.\n• **Production série :** 5 à 10 jours ouvrés selon le volume.",
          actions: [
            { label: '🗺️ Voir la carte maritime 48h', type: 'scroll', target: '#nearshore' },
            { label: '📋 Lancer un échantillon test', type: 'rfq' },
            { label: '📲 Contacter la logistique', type: 'whatsapp' },
          ],
        };
      }
      return {
        text: "🚢 **Mediterranean Nearshoring & Express Logistics:**\n\n• **Direct Ro-Ro Maritime Transit:** 48 hours from Port of Radès directly to Marseille & Genoa.\n• **EUR.1 Customs Agreement:** 0% import duty into the European Union (duty-free trade).\n• **100% Export Offshore Status:** Streamlined clearance procedures.\n• **Prototyping:** Lab-dips and strike-offs dispatched in 48h–72h via DHL/FedEx.\n• **Bulk Production:** 5 to 10 business days based on run size.",
        actions: [
          { label: '🗺️ View 48h Nearshoring Map', type: 'scroll', target: '#nearshore' },
          { label: '📋 Request Prototyping', type: 'rfq' },
          { label: '📲 Chat with Logistics', type: 'whatsapp' },
        ],
      };
    }

    // 3. Technique comparison / Embroidery vs Screen printing / 3D / Silicone
    if (q.includes('broderie') || q.includes('sérigraphie') || q.includes('embroidery') || q.includes('print') || q.includes('silicone') || q.includes('chenille') || q.includes('relief') || q.includes('3d') || q.includes('technique')) {
      if (currentLang === 'fr') {
        return {
          text: "🧵 **Conseil Technique Finitions & Matières :**\n\n• **Broderie 3D Tajima :** Recommandée pour le molleton lourd (sweats 350-500 gsm), casquettes et surchemises. Insertion de mousse EVA indéformable au lavage.\n• **Sérigraphie Silicone HD ROQ :** Idéale pour un relief tactile moderne, ultra-élastique et sans fissuration sur jersey ou matières techniques.\n• **Encres Rongeantes (Discharge) :** Teinte directe dans la fibre du coton sans toucher de plastique (toucher zéro gramme).\n• **Finitions Mix-Média :** Nous pouvons combiner sérigraphie et broderie sur une même pièce.",
          actions: [
            { label: '✨ Explorer le Lookbook Photos', type: 'scroll', target: '#lookbook' },
            { label: '📋 Demander un devis technique', type: 'rfq' },
          ],
        };
      }
      return {
        text: "🧵 **Technical Fabric & Embellishment Advice:**\n\n• **3D Foam Tajima Embroidery:** Ideal for heavy fleece (350–500 gsm hoodies), caps and overshirts. High-density EVA foam holds its shape through hundreds of wash cycles.\n• **HD Silicone Screen Printing:** Crisp tactile relief, extreme stretchability without cracking on jersey and activewear.\n• **Discharge (Water-Based) Printing:** Bleaches and dyes the organic cotton fibers directly for a zero-hand breathable feel.\n• **Mixed-Media:** Combination of screen print base with metallic embroidery overlay.",
        actions: [
          { label: '✨ Explore Photo Lookbook', type: 'scroll', target: '#lookbook' },
          { label: '📋 Request Technical Quote', type: 'rfq' },
        ],
      };
    }

    // 4. Standards / GOTS / OEKO-TEX / ISO / RSE / Audits
    if (q.includes('gots') || q.includes('oeko') || q.includes('iso') || q.includes('rse') || q.includes('certif') || q.includes('audit') || q.includes('bio') || q.includes('ecol') || q.includes('recyc') || q.includes('grs')) {
      if (currentLang === 'fr') {
        return {
          text: "🌿 **Conformité & Certifications Internationales :**\n\n• **Triple ISO :** ISO 9001 (Qualité), ISO 14001 (Environnement), ISO 45001 (Santé & Sécurité au travail).\n• **Coton Bio GOTS :** Ennoblissement certifié avec émission de Transaction Certificates (TC).\n• **OEKO-TEX® Standard 100 (Classe I) :** Absence totale de substances nocives, métaux lourds et phtalates.\n• **GRS (Global Recycled Standard) :** Traçabilité des fibres et polyesters recyclés.\n• **Audit RSE & Social :** Conformité aux audits Smeta/BSCI des grandes marques européennes.\n\n✓ Certificats et rapports complets disponibles sous 24h.",
          actions: [
            { label: '🛡️ Voir les 4 piliers de normes', type: 'scroll', target: '#standards' },
            { label: '📄 Demander un rapport d\'audit', type: 'rfq' },
          ],
        };
      }
      return {
        text: "🌿 **International Compliance & Accreditations:**\n\n• **Triple ISO Certified:** ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Health & Safety).\n• **GOTS Organic Cotton:** Certified processing with chain-of-custody Transaction Certificates (TC).\n• **OEKO-TEX® Standard 100 (Class I):** Free from heavy metals, phthalates, and restricted chemicals (certified infant-safe).\n• **GRS (Global Recycled Standard):** Recycled polyester and nylon verification.\n• **CSR Audits:** Full readiness for Smeta/BSCI buyer audits.\n\n✓ Audit reports and certificates available within 24h.",
        actions: [
          { label: '🛡️ View All 4 Quality Pillars', type: 'scroll', target: '#standards' },
          { label: '📄 Request Audit Documentation', type: 'rfq' },
        ],
      };
    }

    // 5. RFQ / Quote / Price / Tech-Pack / Devis / Tarif
    if (q.includes('devis') || q.includes('prix') || q.includes('tarif') || q.includes('quote') || q.includes('price') || q.includes('tech-pack') || q.includes('techpack') || q.includes('commander')) {
      if (currentLang === 'fr') {
        return {
          text: "📋 **Chiffrage Express & Étude de Tech-Pack :**\n\nPour vous fournir un devis unitaire précis sous 24h, nous analysons :\n1. La technique souhaitée (broderie, sérigraphie, étiquettes)\n2. Le nombre de couleurs ou de points de broderie\n3. La quantité par modèle et coloris\n4. Votre tech-pack ou fichier vectoriel (AI, PDF, EPS)\n\nVous pouvez lancer le formulaire de devis interactif en 3 étapes :",
          actions: [
            { label: '⚡ Ouvrir le configurateur de devis', type: 'rfq' },
            { label: '📲 Envoyer mon tech-pack sur WhatsApp', type: 'whatsapp' },
          ],
        };
      }
      return {
        text: "📋 **Fast Quoting & Tech-Pack Review:**\n\nTo provide an exact unit cost calculation within 24 hours, our engineering office evaluates:\n1. Desired embellishment technique (embroidery, screen print, labeling)\n2. Number of ink colors or embroidery stitch count\n3. Order quantities per design/colorway\n4. Your vector tech-pack file (AI, PDF, EPS, DST)\n\nYou can submit your specs in 3 simple steps:",
        actions: [
          { label: '⚡ Open RFQ Tech-Pack Builder', type: 'rfq' },
          { label: '📲 Send Tech-Pack via WhatsApp', type: 'whatsapp' },
        ],
      };
    }

    // 6. Direct Contact / WhatsApp / Phone / Location / Visite
    if (q.includes('contact') || q.includes('whatsapp') || q.includes('téléphone') || q.includes('phone') || q.includes('adresse') || q.includes('visite') || q.includes('humain') || q.includes('ingénieur') || q.includes('engineer') || q.includes('mail')) {
      if (currentLang === 'fr') {
        return {
          text: "👨‍💼 **Coordonnées Directes de l'Usine :**\n\n• **Directeur Technique WhatsApp :** +216 98 761 003\n• **Standard Téléphonique :** +216 72 457 143\n• **Email Industriel :** contact@tpe-sa.com\n• **Adresse Usine :** Zone Industrielle, 7070 Ras Jebel, Gouvernorat de Bizerte (Tunisie)\n• **Accès Visite :** À 45 minutes de l'Aéroport International de Tunis-Carthage (navette assurée pour les donneurs d'ordres).",
          actions: [
            { label: '📲 Ouvrir WhatsApp Usine', type: 'whatsapp' },
            { label: '📞 Appeler le standard', type: 'call' },
            { label: '📍 Voir la localisation GPS', type: 'scroll', target: '#contact' },
          ],
        };
      }
      return {
        text: "👨‍💼 **Direct Factory Contacts:**\n\n• **Technical Director WhatsApp:** +216 98 761 003\n• **Office Phone:** +216 72 457 143\n• **Industrial Inquiries:** contact@tpe-sa.com\n• **Facility Address:** Industrial Zone, 7070 Ras Jebel, Bizerte Governorate (Tunisia)\n• **Factory Visits:** 45 minutes from Tunis-Carthage International Airport (VIP shuttle provided for European brand audits).",
        actions: [
          { label: '📲 Open Factory WhatsApp', type: 'whatsapp' },
          { label: '📞 Call Factory Office', type: 'call' },
          { label: '📍 View GPS Coordinates', type: 'scroll', target: '#contact' },
        ],
      };
    }

    // Default Fallback
    if (currentLang === 'fr') {
      return {
        text: "Merci pour votre message ! En tant qu'atelier certifié 100% export, nous prenons en charge la sérigraphie haute cadence (ROQ 20k/j), la broderie multi-têtes (Tajima 5.4k/j) et le conditionnement sous statut EUR.1 (0% taxe vers l'UE).\n\nSouhaitez-vous déposer un tech-pack pour chiffrage ou échanger directement avec un ingénieur textile ?",
        actions: [
          { label: '📋 Déposer un Tech-Pack (Devis)', type: 'rfq' },
          { label: '📲 WhatsApp Ingénieur', type: 'whatsapp' },
          { label: '📞 Joindre l\'Usine', type: 'call' },
        ],
      };
    }

    return {
      text: "Thank you for reaching out! As a 100% offshore certified facility, we specialize in high-volume screen printing (ROQ 20k/day), multi-head embroidery (Tajima 5.4k/day) and packaging with 0% customs duty under the EUR.1 agreement.\n\nWould you like to submit your tech-pack for pricing or talk directly with an engineer?",
      actions: [
        { label: '📋 Submit Tech-Pack (Quote)', type: 'rfq' },
        { label: '📲 WhatsApp Engineer', type: 'whatsapp' },
        { label: '📞 Call Factory Desk', type: 'call' },
      ],
    };
  };

  // Handle sending a message
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: factoryTime || 'À l\'instant',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    playChime(640);

    // Simulate realistic typing delay
    setTimeout(() => {
      const reply = processUserQuery(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        timestamp: factoryTime || 'À l\'instant',
        actions: reply.actions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playChime(880);
    }, 700 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Staggered Action Cluster (Bottom Right) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* 1. Subtle Scroll-to-Top Button */}
        <button
          onClick={scrollToTop}
          className={`pointer-events-auto w-10 h-10 rounded-full bg-white/95 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group ${
            showScrollTop
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          title={currentLang === 'fr' ? 'Retour en haut' : 'Back to top'}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>

        {/* 2. Bespoke Luxury Chatbot Trigger Button (Light Mode) */}
        <div className="relative pointer-events-auto flex items-center">
          
          {/* Unread Teaser Notification Pill (Displays when closed) */}
          {!isOpen && hasUnreadPrompt && (
            <div 
              onClick={() => setIsOpen(true)}
              className="mr-3 cursor-pointer hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 border border-slate-200/90 text-slate-900 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-300 hover:scale-102 transition-transform group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-mono font-bold text-slate-900 flex items-center gap-1">
                  <span>{currentLang === 'fr' ? 'Concierge Usine IA' : 'Factory AI Concierge'}</span>
                  <span className="text-tpe-red text-[9px] font-bold">24/7</span>
                </span>
                <span className="text-[10px] text-slate-500 font-sans">
                  {currentLang === 'fr' ? 'Cadences, devis & conseils techniques' : 'Capacities, quotes & technical advice'}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
            </div>
          )}

          {/* Launcher Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden ${
              isOpen
                ? 'bg-slate-950 text-white border border-slate-800 rotate-90'
                : 'bg-white text-slate-900 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
            }`}
            aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat technique'}
          >
            {/* CMYK Signature Rim */}
            <div className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity p-[1.5px] bg-gradient-to-tr from-tpe-cyan via-tpe-magenta via-tpe-yellow to-tpe-red pointer-events-none" />

            {/* Icon Inside */}
            <div className={`relative z-10 flex items-center justify-center w-full h-full rounded-full transition-colors ${
              isOpen ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
            }`}>
              {isOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <div className="relative">
                  <Bot className="w-6 h-6 text-slate-900 group-hover:text-tpe-red transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
              )}
            </div>
          </button>

        </div>

      </div>

      {/* 3. Luxury Chat Window Modal (Light Mode) */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.06)] flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 origin-bottom-right ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-auto md:bottom-6 md:right-6 md:w-[620px] md:h-[82vh] rounded-2xl'
              : 'bottom-20 right-3 left-3 sm:left-auto sm:right-6 w-auto sm:w-[410px] md:w-[440px] h-[560px] max-h-[82vh] rounded-2xl'
          }`}
        >
          {/* CMYK 4-Color Top Micro Header Strip */}
          <div className="h-[2.5px] w-full flex shrink-0">
            <div className="flex-1 bg-tpe-cyan" />
            <div className="flex-1 bg-tpe-magenta" />
            <div className="flex-1 bg-tpe-yellow" />
            <div className="flex-1 bg-tpe-red" />
          </div>

          {/* Window Header */}
          <div className="px-3.5 sm:px-4 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs p-1.5 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-tpe-red" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider truncate">
                    {currentLang === 'fr' ? 'TPE Concierge Atelier' : 'TPE Factory Concierge'}
                  </span>
                  <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[8.5px] sm:text-[9px] font-mono font-bold rounded-xs border border-emerald-200/80 shrink-0">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-mono text-slate-500 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Ras Jebel: <strong className="text-slate-700">{factoryTime || 'UTC+1'}</strong></span>
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* Action Icons in Header */}
            <div className="flex items-center gap-0.5 sm:gap-1 text-slate-500 shrink-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleResetChat}
                className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors"
                title={currentLang === 'fr' ? 'Réinitialiser la conversation' : 'Reset chat'}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden md:inline-flex p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors"
                title={isExpanded ? 'Réduire' : 'Agrandir'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors"
                title={currentLang === 'fr' ? 'Fermer' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice Pill in Header */}
          <div className="px-3.5 sm:px-4 py-1.5 bg-emerald-50/90 border-b border-emerald-100 flex items-center justify-between text-[10px] sm:text-[10.5px] font-mono text-emerald-800 shrink-0">
            <span className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Statut EUR.1 • 0% Douane vers l'UE</span>
            </span>
            <button
              onClick={onOpenRFQ}
              className="text-tpe-red hover:text-red-700 font-bold underline shrink-0 ml-2"
            >
              Devis 24h →
            </button>
          </div>

          {/* Scrollable Messages Stream (Light Mode) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs custom-scrollbar bg-slate-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[82%] rounded-2xl p-3.5 leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-tpe-red to-red-700 text-white rounded-tr-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs whitespace-pre-line shadow-xs'
                  }`}
                >
                  {/* Markdown formatting simulation */}
                  <div>
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (!line.trim()) return <div key={lIdx} className="h-2" />;
                      
                      // Bold formatting
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={lIdx} className={line.startsWith('•') ? 'pl-2 text-slate-700' : ''}>
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className={msg.sender === 'user' ? 'text-white font-bold' : 'text-slate-950 font-bold'}>
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Interactive Action Pills */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleActionClick(act)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 hover:border-slate-300 text-[11px] font-mono font-bold transition-all hover:scale-102 active:scale-98 shadow-2xs"
                        >
                          <span>{act.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Micro Timestamp */}
                <span className="text-[9.5px] font-mono text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-600 text-xs font-mono bg-white border border-slate-200 shadow-2xs w-fit px-3 py-2 rounded-2xl rounded-tl-xs">
                <Sparkles className="w-3.5 h-3.5 text-tpe-red animate-spin" />
                <span>Ingénieur TPE en train d'écrire</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Bar (Light Mode) */}
          <div className="px-3 py-2 bg-slate-50/80 border-t border-slate-200 overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-1.5 w-max">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-[10.5px] font-mono text-slate-700 hover:text-slate-950 transition-all whitespace-nowrap active:scale-95 disabled:opacity-50 shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Formulation Bar (Light Mode) */}
          <div className="p-3 border-t border-slate-200 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  currentLang === 'fr'
                    ? 'Posez une question technique ou sur vos productions...'
                    : 'Ask about machinery, lead times, or quotes...'
                }
                className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-tpe-red focus:ring-1 focus:ring-tpe-red/30 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-sans"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center shrink-0 ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-tpe-red hover:bg-red-700 text-white shadow-xs hover:scale-105 active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span>IA Usine TPE • Ras Jebel Bizerte</span>
              <a
                href="https://wa.me/21698761003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <MessageSquare className="w-2.5 h-2.5" />
                <span>WhatsApp Usine direct</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatBot;
