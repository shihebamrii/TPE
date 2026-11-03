import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Sparkles,
  Layers,
  Cpu,
  Image,
  Award,
  Navigation,
  ShieldCheck,
  Phone,
  Bot,
  Settings,
  Eye,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Mail,
  ChevronRight,
  MoveUp,
  MoveDown,
  X,
  Lock,
  KeyRound,
  Check,
  DollarSign,
  Clock,
  Building2,
  Tag,
  HelpCircle,
  RefreshCw,
  Loader2,
  Film,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { Hero } from '../components/Hero';
import { TechniquesMatrix } from '../components/TechniquesMatrix';
import { FactoryTour } from '../components/FactoryTour';
import { PortfolioLookbook } from '../components/PortfolioLookbook';
import { ClientReferences } from '../components/ClientReferences';
import { NearshoringMap } from '../components/NearshoringMap';
import { EcoQualityStandards } from '../components/EcoQualityStandards';
import { ContactLocation } from '../components/ContactLocation';
import { AIChatBot } from '../components/AIChatBot';
import type {
  TechniqueItem,
  FactoryMachine,
  PortfolioItem,
  BrandReference,
  NearshoringRoute,
  NearshoringAdvantage,
  StandardPillar,
  RFQLead,
  ChatbotQA,
  Language,
} from '../types';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => Promise<string>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  onUpload,
  showToast,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await onUpload(file);
      onChange(url);
      showToast('Image téléversée avec succès sur le serveur');
    } catch (err) {
      console.error(err);
      showToast("Échec du téléversement de l'image", 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono text-slate-400">{label}</label>
        {value && (
          <span className="text-[10px] font-mono text-tpe-cyan">
            {value.startsWith('/uploads/') ? '✓ Fichier Local' : 'URL externe'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/assets/... ou /uploads/... ou https://..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-tpe-cyan focus:outline-none pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              title="Effacer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-xl text-xs font-mono border border-slate-700 shrink-0 transition-colors"
          title="Choisir une image depuis votre ordinateur"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-tpe-cyan" />
              <span>Envoi...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-tpe-cyan" />
              <span>Uploader</span>
            </>
          )}
        </button>
      </div>

      {value && (
        <div className="flex items-center gap-2.5 pt-1 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
          <div className="w-9 h-9 rounded-md overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
          </div>
          <div className="text-[11px] text-slate-300 font-mono truncate flex-1">
            {value}
          </div>
        </div>
      )}
    </div>
  );
};

interface VideoUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => Promise<string>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const VideoUploadField: React.FC<VideoUploadFieldProps> = ({
  label,
  value,
  onChange,
  onUpload,
  showToast,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      showToast('Le fichier vidéo dépasse la limite autorisée de 100 Mo', 'error');
      return;
    }

    setIsUploading(true);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setUploadInfo(`Téléversement de ${sizeMb} Mo en cours...`);
    try {
      const url = await onUpload(file);
      onChange(url);
      showToast(`Vidéo ${file.name} téléversée avec succès`);
    } catch (err) {
      console.error(err);
      showToast('Échec du téléversement de la vidéo', 'error');
    } finally {
      setIsUploading(false);
      setUploadInfo('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono text-slate-400">{label}</label>
        {value && (
          <span className="text-[10px] font-mono text-tpe-cyan">
            {value.startsWith('/uploads/') ? '✓ Fichier Hébergé sur le Serveur' : 'URL Statique / Externe'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/hero-video.mp4 ou /uploads/... ou URL HTTPS"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-tpe-cyan focus:outline-none pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              title="Effacer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-tpe-cyan/20 to-blue-600/20 hover:from-tpe-cyan/30 hover:to-blue-600/30 disabled:opacity-50 text-white rounded-xl text-xs font-mono border border-tpe-cyan/40 shrink-0 transition-all font-bold"
          title="Sélectionner une vidéo MP4 ou WebM depuis votre ordinateur"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-tpe-cyan" />
              <span>Envoi vidéo...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-tpe-cyan" />
              <span>Uploader Vidéo</span>
            </>
          )}
        </button>
      </div>

      {uploadInfo && (
        <div className="text-[11px] font-mono text-tpe-cyan flex items-center gap-2 bg-tpe-cyan/10 p-2.5 rounded-lg border border-tpe-cyan/20 animate-pulse">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-tpe-cyan" />
          <span>{uploadInfo}</span>
        </div>
      )}

      {/* Video Preview */}
      {value && (
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Film className="w-3.5 h-3.5 text-tpe-cyan" />
              Aperçu Vidéo en Direct :
            </span>
            <span className="truncate max-w-[240px] text-[11px] text-slate-400">{value}</span>
          </div>

          <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-slate-800 bg-black">
            <video
              key={value}
              src={value}
              controls
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            💡 Astuce : Privilégiez un format MP4 H.264 (720p ou 1080p, 15-30 secondes en boucle) pour un affichage ultra-fluide.
          </p>
        </div>
      )}
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const {
    data,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    setViewMode,
    updateHero,
    addTechnique,
    updateTechnique,
    deleteTechnique,
    reorderTechniques,
    addMachine,
    updateMachine,
    deleteMachine,
    reorderMachines,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    addBrand,
    updateBrand,
    deleteBrand,
    updateNearshoringRoute,
    addNearshoringRoute,
    deleteNearshoringRoute,
    updateNearshoringAdvantage,
    updateStandardPillar,
    addStandardPillar,
    deleteStandardPillar,
    updateContact,
    addRFQLead,
    updateRFQLead,
    deleteRFQLead,
    updateChatbot,
    addChatbotQA,
    deleteChatbotQA,
    updateSiteSettings,
    resetToDefaults,
    exportDataAsJSON,
    importDataFromJSON,
    uploadFile,
  } = useSiteData();

  // Authentication State
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  type AdminTab =
    | 'overview'
    | 'leads'
    | 'hero'
    | 'techniques'
    | 'machines'
    | 'portfolio'
    | 'brands'
    | 'nearshoring'
    | 'standards'
    | 'contact'
    | 'chatbot'
    | 'settings';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [langTab, setLangTab] = useState<Language>('fr');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Preview System State
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    section:
      | 'hero'
      | 'techniques'
      | 'machines'
      | 'portfolio'
      | 'brands'
      | 'nearshoring'
      | 'standards'
      | 'contact'
      | 'chatbot'
      | 'full';
    device: 'desktop' | 'tablet' | 'mobile';
    lang: Language;
  }>({
    isOpen: false,
    section: 'hero',
    device: 'desktop',
    lang: 'fr',
  });

  const openPreview = (
    section?:
      | 'hero'
      | 'techniques'
      | 'machines'
      | 'portfolio'
      | 'brands'
      | 'nearshoring'
      | 'standards'
      | 'contact'
      | 'chatbot'
      | 'full'
  ) => {
    const defaultSection =
      section ||
      (activeTab === 'hero'
        ? 'hero'
        : activeTab === 'techniques'
        ? 'techniques'
        : activeTab === 'machines'
        ? 'machines'
        : activeTab === 'portfolio'
        ? 'portfolio'
        : activeTab === 'brands'
        ? 'brands'
        : activeTab === 'nearshoring'
        ? 'nearshoring'
        : activeTab === 'standards'
        ? 'standards'
        : activeTab === 'contact'
        ? 'contact'
        : activeTab === 'chatbot'
        ? 'chatbot'
        : 'full');

    setPreviewModal({
      isOpen: true,
      section: defaultSection,
      device: 'desktop',
      lang: langTab,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewModal.isOpen) {
        setPreviewModal((prev) => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewModal.isOpen]);

  // Notification Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preview Section Renderer Helper
  const renderPreviewSection = (
    section:
      | 'hero'
      | 'techniques'
      | 'machines'
      | 'portfolio'
      | 'brands'
      | 'nearshoring'
      | 'standards'
      | 'contact'
      | 'chatbot'
      | 'full',
    lang: Language
  ) => {
    switch (section) {
      case 'hero':
        return (
          <Hero
            currentLang={lang}
            onOpenRFQ={() => showToast('Simulation ouverture devis')}
            overrideHero={heroForm}
          />
        );
      case 'techniques':
        return (
          <TechniquesMatrix
            currentLang={lang}
            onSelectMacro={() => {}}
            onSelectRFQTechnique={() => showToast('Technique sélectionnée pour devis')}
          />
        );
      case 'machines':
        return (
          <FactoryTour
            currentLang={lang}
            onSelectPhoto={() => {}}
          />
        );
      case 'portfolio':
        return (
          <PortfolioLookbook
            currentLang={lang}
            onSelectProject={() => {}}
          />
        );
      case 'brands':
        return <ClientReferences currentLang={lang} />;
      case 'nearshoring':
        return <NearshoringMap currentLang={lang} />;
      case 'standards':
        return <EcoQualityStandards currentLang={lang} />;
      case 'contact':
        return (
          <ContactLocation
            currentLang={lang}
            onOpenRFQ={() => showToast('Simulation ouverture devis')}
            overrideContact={contactForm}
          />
        );
      case 'chatbot':
        return (
          <div className="min-h-[550px] p-6 relative flex flex-col items-center justify-center bg-slate-950/90 text-center">
            <div className="max-w-md space-y-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-tpe-magenta/20 border border-tpe-magenta/30 flex items-center justify-center mx-auto text-tpe-magenta">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Simulation Assistant IA Concierge
              </h3>
              <p className="text-xs text-slate-400">
                Le concierge IA ci-dessous est ouvert et actif avec votre base FAQ ({data.chatbot.knowledgeBase?.length || 0} réponses) et vos suggestions personnalisées ({(data.chatbot.quickPrompts?.[lang] || []).length} raccourcis).
              </p>
            </div>
            <AIChatBot
              currentLang={lang}
              onOpenRFQ={() => showToast('Simulation ouverture devis')}
              defaultOpen={true}
            />
          </div>
        );
      case 'full':
      default:
        return (
          <div className="space-y-0">
            <Hero
              currentLang={lang}
              onOpenRFQ={() => showToast('Simulation ouverture devis')}
              overrideHero={heroForm}
            />
            <ClientReferences currentLang={lang} />
            <TechniquesMatrix
              currentLang={lang}
              onSelectMacro={() => {}}
              onSelectRFQTechnique={() => showToast('Technique sélectionnée pour devis')}
            />
            <FactoryTour
              currentLang={lang}
              onSelectPhoto={() => {}}
            />
            <PortfolioLookbook
              currentLang={lang}
              onSelectProject={() => {}}
            />
            <NearshoringMap currentLang={lang} />
            <EcoQualityStandards currentLang={lang} />
            <ContactLocation
              currentLang={lang}
              onOpenRFQ={() => showToast('Simulation ouverture devis')}
              overrideContact={contactForm}
            />
            <AIChatBot
              currentLang={lang}
              onOpenRFQ={() => showToast('Simulation ouverture devis')}
              defaultOpen={false}
            />
          </div>
        );
    }
  };

  // RFQ Leads CRM States
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<RFQLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState<Partial<RFQLead>>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    technique: data.techniques[0]?.title.fr || 'Sérigraphie',
    quantityRange: '1 000 – 5 000 pcs',
    productType: 'Sweats & Molleton',
    targetMarket: 'France / UE',
    projectNotes: '',
    status: 'new',
    priority: 'normal',
    estimatedQuote: '',
  });

  // Modal editing states
  const [editingTechnique, setEditingTechnique] = useState<TechniqueItem | null>(null);
  const [isNewTechnique, setIsNewTechnique] = useState(false);

  const [editingMachine, setEditingMachine] = useState<FactoryMachine | null>(null);
  const [isNewMachine, setIsNewMachine] = useState(false);

  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isNewPortfolio, setIsNewPortfolio] = useState(false);

  const [editingBrand, setEditingBrand] = useState<BrandReference | null>(null);
  const [isNewBrand, setIsNewBrand] = useState(false);

  const [editingRoute, setEditingRoute] = useState<NearshoringRoute | null>(null);
  const [isNewRoute, setIsNewRoute] = useState(false);

  const [editingPillar, setEditingPillar] = useState<StandardPillar | null>(null);

  const [newQAPair, setNewQAPair] = useState<ChatbotQA>({
    id: '',
    question: { fr: '', en: '' },
    answer: { fr: '', en: '' },
    tags: [],
  });
  const [isNewQAModalOpen, setIsNewQAModalOpen] = useState(false);

  // Hero form local state
  const [heroForm, setHeroForm] = useState(data.hero);
  // Contact form local state
  const [contactForm, setContactForm] = useState(data.contact);
  // Site settings local state
  const [settingsForm, setSettingsForm] = useState(data.siteSettings);
  // Chatbot form local state
  const [chatbotForm, setChatbotForm] = useState(data.chatbot);

  // Sync when data updates
  React.useEffect(() => {
    setHeroForm(data.hero);
    setContactForm(data.contact);
    setSettingsForm(data.siteSettings);
    setChatbotForm(data.chatbot);
  }, [data]);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(pinInput)) {
      setLoginError('');
      showToast('Connexion réussie à la console d\'administration TPE');
    } else {
      setLoginError('Code d\'accès incorrect. Veuillez réessayer.');
    }
  };

  // If NOT logged in, show secure admin login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-tpe-magenta selection:text-white">
        {/* Background decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-tpe-magenta/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-tpe-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo & CMYK identifiers */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-tpe-cyan"></span>
              <span className="w-2 h-2 rounded-full bg-tpe-magenta"></span>
              <span className="w-2 h-2 rounded-full bg-tpe-yellow"></span>
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 font-bold ml-1">
                TPE TUNISIE • DIRECTION
              </span>
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Console d'Administration
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Contrôle total du site, catalogue, machines, devis & RSE
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                Code Secret Administrateur
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Entrez le mot de passe admin..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 pl-11 text-white text-sm focus:outline-none focus:border-tpe-magenta focus:ring-1 focus:ring-tpe-magenta transition-all"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {loginError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-sans">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
              <p className="text-[11px] font-mono text-slate-500 mt-2">
                Astuce premier accès : mot de passe par défaut <span className="text-tpe-cyan font-bold">admin2026</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-tpe-magenta to-rose-600 hover:from-tpe-magenta/90 hover:to-rose-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-tpe-magenta/25 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Ouvrir la Console Admin</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => setViewMode('public')}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Retourner sur le site public en tant que visiteur</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Count new RFQ leads
  const newLeadsCount = data.rfqLeads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-tpe-magenta selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-sans font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center">
              <img src="/logo.png" alt="TPE" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white tracking-wide">TPE ADMIN</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE SYNC
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Atelier Ras Jebel • Contrôle Intégral du Site
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle for Admin */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-mono">
            <button
              onClick={() => setLangTab('fr')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                langTab === 'fr' ? 'bg-tpe-magenta text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLangTab('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                langTab === 'en' ? 'bg-tpe-magenta text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Quick Export JSON Backup */}
          <button
            onClick={() => {
              exportDataAsJSON();
              showToast('Sauvegarde complète du site téléchargée (JSON)');
            }}
            title="Télécharger une sauvegarde complète"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sauvegarde</span>
          </button>

          {/* Quick Live Preview Modal Trigger */}
          <button
            onClick={() => openPreview()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-tpe-cyan/20 to-blue-600/20 hover:from-tpe-cyan/30 hover:to-blue-600/30 text-white text-xs font-bold border border-tpe-cyan/40 transition-all shadow-sm group"
            title="Prévisualiser la section active en direct"
          >
            <Eye className="w-4 h-4 text-tpe-cyan group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Aperçu en Direct</span>
          </button>

          {/* Switch to Public Site */}
          <button
            onClick={() => setViewMode('public')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Site Public</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              adminLogout();
              showToast('Session administrateur fermée');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800/40 transition-all"
            title="Fermer la session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between overflow-y-auto">
          <div className="p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold px-3 py-2 block hidden md:block">
              Gestion de la Plateforme
            </span>

            {/* Nav items */}
            {[
              { id: 'overview', label: 'Tableau de Bord', icon: LayoutDashboard },
              {
                id: 'leads',
                label: 'Demandes de Devis (CRM)',
                icon: Inbox,
                badge: newLeadsCount > 0 ? newLeadsCount : undefined,
              },
              { id: 'hero', label: 'Hero & Entête', icon: Sparkles },
              { id: 'techniques', label: 'Savoir-Faire', icon: Layers },
              { id: 'machines', label: 'Parc Machines', icon: Cpu },
              { id: 'portfolio', label: 'Lookbook / Projets', icon: Image },
              { id: 'brands', label: 'Marques Clientes', icon: Tag },
              { id: 'nearshoring', label: 'Nearshoring & Transit', icon: Navigation },
              { id: 'standards', label: 'Normes & RSE', icon: ShieldCheck },
              { id: 'contact', label: 'Coordonnées & Usine', icon: Phone },
              { id: 'chatbot', label: 'Assistant IA Concierge', icon: Bot },
              { id: 'settings', label: 'Sauvegardes & PIN', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-tpe-magenta text-white shadow-lg shadow-tpe-magenta/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden md:inline font-sans">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick status bar at bottom of sidebar */}
          <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono hidden md:block">
            <div className="flex items-center justify-between mb-1">
              <span>Statut Stockage :</span>
              <span className="text-emerald-400 font-bold">Actif (Local)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Heure Usine :</span>
              <span className="text-slate-300 font-bold">Ras Jebel (UTC+1)</span>
            </div>
          </div>
        </aside>

        {/* Right Main Content Pane */}
        <main className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                    Vue d'Ensemble & Indicateurs Clés
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Suivi en temps réel des demandes de devis, du parc industriel et des contenus publiés.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openPreview('full')}
                    className="px-4 py-2 bg-gradient-to-r from-tpe-cyan/20 to-blue-600/20 hover:from-tpe-cyan/30 hover:to-blue-600/30 text-white text-xs font-bold font-mono rounded-xl transition-all flex items-center gap-1.5 border border-tpe-cyan/40"
                    title="Prévisualiser le site complet"
                  >
                    <Eye className="w-4 h-4 text-tpe-cyan" />
                    <span>Aperçu Site Complet</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('leads')}
                    className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Gérer les Devis ({data.rfqLeads.length})</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Demandes de Devis (RFQ)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">{data.rfqLeads.length}</span>
                    {newLeadsCount > 0 && (
                      <span className="text-xs font-mono text-rose-400 font-bold bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded-full">
                        {newLeadsCount} nouveaux
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Savoir-Faire Actifs
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-tpe-cyan">{data.techniques.length}</span>
                    <span className="text-xs font-mono text-slate-400">Techniques</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Parc Machines Usine
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-tpe-yellow">{data.machines.length}</span>
                    <span className="text-xs font-mono text-slate-400">Postes</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Marques Donneurs d'Ordres
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-emerald-400">
                      {data.brands.filter((b) => b.active).length}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Partenaires</span>
                  </div>
                </div>
              </div>

              {/* Centre de Prévisualisation Visuelle en Direct */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <Eye className="w-4 h-4 text-tpe-cyan" />
                      <span>Centre de Prévisualisation en Direct</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Vérifiez instantanément le rendu de chaque section sur Ordinateur, Tablette et Mobile sans quitter le dashboard.
                    </p>
                  </div>
                  <button
                    onClick={() => openPreview('full')}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold border border-slate-700 transition-all flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Monitor className="w-3.5 h-3.5 text-tpe-cyan" />
                    <span>Aperçu Page Entière</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
                  {[
                    { id: 'hero', label: 'Hero & Vidéo', icon: Film, color: 'text-tpe-magenta' },
                    { id: 'techniques', label: 'Savoir-Faire', icon: Layers, color: 'text-tpe-cyan' },
                    { id: 'machines', label: 'Parc Machines', icon: Cpu, color: 'text-tpe-yellow' },
                    { id: 'portfolio', label: 'Lookbook', icon: Image, color: 'text-emerald-400' },
                    { id: 'brands', label: 'Marques Clientes', icon: Tag, color: 'text-rose-400' },
                    { id: 'nearshoring', label: 'Nearshoring 48h', icon: Navigation, color: 'text-blue-400' },
                    { id: 'standards', label: 'Normes & RSE', icon: ShieldCheck, color: 'text-emerald-300' },
                    { id: 'contact', label: 'Contact & Usine', icon: Phone, color: 'text-amber-400' },
                    { id: 'chatbot', label: 'Assistant IA', icon: Bot, color: 'text-purple-400' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openPreview(item.id as any)}
                        className="flex items-center gap-2 p-2.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
                      >
                        <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform shrink-0`} />
                        <span className="text-xs text-slate-200 group-hover:text-white font-medium truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgent Inquiries Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-tpe-magenta" />
                    <span>Dernières Demandes de Devis Reçues</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-mono text-tpe-cyan hover:underline flex items-center gap-1"
                  >
                    <span>Voir toutes les demandes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {data.rfqLeads.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">Aucune demande enregistrée.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Client & Marque</th>
                          <th className="py-2.5 px-3">Technique</th>
                          <th className="py-2.5 px-3">Volume</th>
                          <th className="py-2.5 px-3">Statut</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {data.rfqLeads.slice(0, 5).map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 font-mono text-slate-400">
                              {new Date(lead.createdAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                              })}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-white">{lead.companyName || 'Non spécifié'}</div>
                              <div className="text-[11px] text-slate-400">{lead.contactName}</div>
                            </td>
                            <td className="py-3 px-3 text-slate-300">{lead.technique}</td>
                            <td className="py-3 px-3 font-mono text-slate-400">{lead.quantityRange}</td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                  lead.status === 'new'
                                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                    : lead.status === 'in_review'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : lead.status === 'quoted'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                }`}
                              >
                                {lead.status === 'new'
                                  ? 'Nouveau'
                                  : lead.status === 'in_review'
                                  ? 'En Étude'
                                  : lead.status === 'quoted'
                                  ? 'Devis Prêt'
                                  : lead.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setActiveTab('leads');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-mono"
                              >
                                Détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Fast Action Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setEditingTechnique({
                      id: `technique-${Date.now()}`,
                      category: 'screenprint',
                      title: { fr: 'Nouvelle Technique', en: 'New Technique' },
                      subtitle: { fr: 'Sous-titre technique', en: 'Technical Subtitle' },
                      description: { fr: 'Description détaillée', en: 'Detailed description' },
                      highlights: { fr: ['Avantage clé 1'], en: ['Key Highlight 1'] },
                      specs: {
                        capacity: '10 000 pcs / jour',
                        maxColorsOrHeads: '8 couleurs',
                        bestFor: { fr: 'Prêt-à-porter', en: 'Ready to wear' },
                        leadTimeSample: '48 Heures',
                      },
                      image: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      macroImage: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      badge: { fr: '10k / jour', en: '10k / day' },
                    });
                    setIsNewTechnique(true);
                    setActiveTab('techniques');
                  }}
                  className="p-4 bg-slate-900 border border-slate-800 hover:border-tpe-magenta rounded-2xl text-left transition-all group"
                >
                  <Plus className="w-5 h-5 text-tpe-magenta mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm">Ajouter un Savoir-Faire</div>
                  <div className="text-xs text-slate-400 mt-0.5">Créer une nouvelle technique de finition</div>
                </button>

                <button
                  onClick={() => {
                    setEditingPortfolio({
                      id: `portfolio-${Date.now()}`,
                      title: { fr: 'Nouveau Projet', en: 'New Project' },
                      category: 'fashion',
                      technique: { fr: 'Broderie & Sérigraphie', en: 'Embroidery & Screenprint' },
                      garment: { fr: 'Sweats & Denim', en: 'Sweatshirt & Denim' },
                      year: 'Production TPE 2026',
                      image: '/assets/showcase/products/hangtags_replay_pantone.jpg',
                      macroImage: '/assets/showcase/products/hangtags_table_replay_teddy.jpg',
                      tags: ['Collection 2026', 'Haute Précision'],
                      description: { fr: 'Description de la réalisation...', en: 'Project description...' },
                    });
                    setIsNewPortfolio(true);
                    setActiveTab('portfolio');
                  }}
                  className="p-4 bg-slate-900 border border-slate-800 hover:border-tpe-cyan rounded-2xl text-left transition-all group"
                >
                  <Image className="w-5 h-5 text-tpe-cyan mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm">Ajouter une Réalisation</div>
                  <div className="text-xs text-slate-400 mt-0.5">Enrichir le Lookbook avec des photos HD</div>
                </button>

                <button
                  onClick={() => {
                    setEditingMachine({
                      id: `machine-${Date.now()}`,
                      title: { fr: 'Nouvelle Machine', en: 'New Machine' },
                      type: { fr: 'Unité Automatique', en: 'Automated Unit' },
                      brand: 'Constructeur International',
                      count: 'Flux Continu',
                      description: { fr: 'Descriptif technique du poste...', en: 'Technical specs...' },
                      specs: { fr: ['Spécification 1'], en: ['Specification 1'] },
                      image: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      stationNum: '07',
                      zone: 'ATELIER PRINCIPAL',
                      brandBadge: 'NOUVEL ÉQUIPEMENT',
                    });
                    setIsNewMachine(true);
                    setActiveTab('machines');
                  }}
                  className="p-4 bg-slate-900 border border-slate-800 hover:border-tpe-yellow rounded-2xl text-left transition-all group"
                >
                  <Cpu className="w-5 h-5 text-tpe-yellow mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm">Ajouter une Machine</div>
                  <div className="text-xs text-slate-400 mt-0.5">Présenter un nouvel équipement d'atelier</div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RFQ LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Inbox className="w-6 h-6 text-tpe-magenta" />
                    <span>Gestion des Devis & Prospects (CRM)</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Centralisation des demandes soumises via le formulaire Tech-Pack du site web.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNewLeadModalOpen(true)}
                    className="px-3.5 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouveau Prospect</span>
                  </button>

                  <button
                    onClick={() => {
                      const csvContent =
                        'data:text/csv;charset=utf-8,' +
                        ['Date,Entreprise,Contact,Email,Telephone,Technique,Quantite,Statut,Devis']
                          .concat(
                            data.rfqLeads.map(
                              (l) =>
                                `"${l.createdAt}","${l.companyName}","${l.contactName}","${l.email}","${l.phone}","${l.technique}","${l.quantityRange}","${l.status}","${l.estimatedQuote || ''}"`
                            )
                          )
                          .join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `leads_tpe_${new Date().toISOString().split('T')[0]}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast('Fichier CSV des prospects exporté');
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl border border-slate-700 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    placeholder="Rechercher par marque, contact, email..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-tpe-magenta"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
                  {['all', 'new', 'in_review', 'quoted', 'completed', 'archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setLeadFilterStatus(status)}
                      className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-all ${
                        leadFilterStatus === status
                          ? 'bg-tpe-magenta text-white font-bold'
                          : 'text-slate-400 hover:text-white bg-slate-950/50'
                      }`}
                    >
                      {status === 'all'
                        ? 'Tous'
                        : status === 'new'
                        ? 'Nouveaux'
                        : status === 'in_review'
                        ? 'En Étude'
                        : status === 'quoted'
                        ? 'Devisés'
                        : status === 'completed'
                        ? 'Validés'
                        : 'Archivés'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase bg-slate-950/40">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Société / Contact</th>
                        <th className="py-3 px-4">Technique Requise</th>
                        <th className="py-3 px-4">Volume & Support</th>
                        <th className="py-3 px-4">Devis Estimé</th>
                        <th className="py-3 px-4">Statut</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {data.rfqLeads
                        .filter((l) => {
                          if (leadFilterStatus !== 'all' && l.status !== leadFilterStatus) return false;
                          if (leadSearchQuery) {
                            const q = leadSearchQuery.toLowerCase();
                            return (
                              l.companyName.toLowerCase().includes(q) ||
                              l.contactName.toLowerCase().includes(q) ||
                              l.email.toLowerCase().includes(q) ||
                              l.technique.toLowerCase().includes(q)
                            );
                          }
                          return true;
                        })
                        .map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-slate-400">
                              {new Date(lead.createdAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                              })}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white">{lead.companyName || 'Particulier'}</div>
                              <div className="text-[11px] text-slate-400">
                                {lead.contactName} • <span className="font-mono">{lead.phone}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate" title={lead.technique}>
                              {lead.technique}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-400">
                              <div>{lead.quantityRange}</div>
                              <div className="text-[10px] text-slate-500">{lead.productType}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                              {lead.estimatedQuote || '—'}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => {
                                  updateRFQLead(lead.id, {
                                    status: e.target.value as RFQLead['status'],
                                  });
                                  showToast(`Statut mis à jour : ${e.target.value}`);
                                }}
                                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-tpe-magenta"
                              >
                                <option value="new">Nouveau</option>
                                <option value="in_review">En Étude</option>
                                <option value="quoted">Devis Transmis</option>
                                <option value="in_production">En Production</option>
                                <option value="completed">Validé / Livré</option>
                                <option value="archived">Archivé</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-mono"
                              >
                                Fiche Complète
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Supprimer le dossier de ${lead.companyName} ?`)) {
                                    deleteRFQLead(lead.id);
                                    showToast('Dossier prospect supprimé');
                                  }
                                }}
                                className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & GENERAL SETTINGS */}
          {activeTab === 'hero' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-tpe-magenta" />
                    <span>Hero & Bandeau Opérationnel</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Modifiez les titres principaux, le bandeau défilant, la vidéo d'arrière-plan et les chiffres clés.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('hero')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser le Hero avec vos modifications en direct"
                  >
                    <Eye className="w-4 h-4 text-tpe-cyan" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      updateHero(heroForm);
                      showToast('Hero et bandeau enregistrés avec succès');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25"
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>

              {/* Live Status Switcher */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Pastille de Statut Atelier en Direct
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Texte du statut (affiché sur le lecteur vidéo)
                    </label>
                    <input
                      type="text"
                      value={heroForm.liveStatusText}
                      onChange={(e) => setHeroForm({ ...heroForm, liveStatusText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="liveActive"
                      checked={heroForm.isLiveStatusActive}
                      onChange={(e) => setHeroForm({ ...heroForm, isLiveStatusActive: e.target.checked })}
                      className="w-4 h-4 rounded text-tpe-magenta focus:ring-0 bg-slate-950 border-slate-800"
                    />
                    <label htmlFor="liveActive" className="text-xs text-slate-300 font-medium">
                      Activer le voyant vert clignotant "Usine en production"
                    </label>
                  </div>
                </div>
              </div>

              {/* Video Cinématique avec Upload */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <Film className="w-4 h-4 text-tpe-cyan" />
                    <span>Vidéo Cinématique d'Arrière-Plan</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Fond du Hero 4K / HD
                  </span>
                </div>

                <VideoUploadField
                  label="Fichier Vidéo (MP4 / WebM / QuickTime)"
                  value={heroForm.videoUrl}
                  onChange={(url) => setHeroForm({ ...heroForm, videoUrl: url })}
                  onUpload={uploadFile}
                  showToast={showToast}
                />
              </div>

              {/* Editorial Titles FR / EN */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Textes & Titres du Hero ({langTab.toUpperCase()})
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    Bilingue Français & Anglais
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Badge d'en-tête</label>
                    <input
                      type="text"
                      value={heroForm.badge[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          badge: { ...heroForm.badge, [langTab]: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Devise / Slogan</label>
                    <input
                      type="text"
                      value={heroForm.motto[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          motto: { ...heroForm.motto, [langTab]: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Titre Monumental - Ligne 1 (ex: L'excellence du façonnage)
                    </label>
                    <input
                      type="text"
                      value={heroForm.titleMain[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          titleMain: { ...heroForm.titleMain, [langTab]: e.target.value },
                        })
                      }
                      placeholder="L'excellence du façonnage"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Titre Monumental - Ligne 2 Italique (ex: textile méditerranéen.)
                    </label>
                    <input
                      type="text"
                      value={heroForm.titleSub[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          titleSub: { ...heroForm.titleSub, [langTab]: e.target.value },
                        })
                      }
                      placeholder="textile méditerranéen."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description Développée</label>
                    <textarea
                      rows={3}
                      value={heroForm.description[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          description: { ...heroForm.description, [langTab]: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Operational Stats 4 Cards */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  4 Chiffres Clés Opérationnels
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      1. Sérigraphie ROQ
                    </label>
                    <input
                      type="text"
                      value={heroForm.stats.screenprint}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: { ...heroForm.stats, screenprint: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={heroForm.stats.screenprintLabel[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: {
                            ...heroForm.stats,
                            screenprintLabel: {
                              ...heroForm.stats.screenprintLabel,
                              [langTab]: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      2. Broderie Tajima
                    </label>
                    <input
                      type="text"
                      value={heroForm.stats.embroidery}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: { ...heroForm.stats, embroidery: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={heroForm.stats.embroideryLabel[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: {
                            ...heroForm.stats,
                            embroideryLabel: {
                              ...heroForm.stats.embroideryLabel,
                              [langTab]: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      3. Étiquettes & Hang Tags
                    </label>
                    <input
                      type="text"
                      value={heroForm.stats.labels}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: { ...heroForm.stats, labels: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={heroForm.stats.labelsLabel[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: {
                            ...heroForm.stats,
                            labelsLabel: {
                              ...heroForm.stats.labelsLabel,
                              [langTab]: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      4. Transit Maritime
                    </label>
                    <input
                      type="text"
                      value={heroForm.stats.transit}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: { ...heroForm.stats, transit: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={heroForm.stats.transitLabel[langTab]}
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          stats: {
                            ...heroForm.stats,
                            transitLabel: {
                              ...heroForm.stats.transitLabel,
                              [langTab]: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Marquee Ticker Editor */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Bandeau Défilant Supérieur (Ticker Marquee)
                  </h3>
                  <button
                    onClick={() => {
                      setHeroForm({
                        ...heroForm,
                        marqueeItems: [...heroForm.marqueeItems, 'NOUVELLE ANNONCE USINE'],
                      });
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une ligne</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {heroForm.marqueeItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 w-5">{idx + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...heroForm.marqueeItems];
                          updated[idx] = e.target.value;
                          setHeroForm({ ...heroForm, marqueeItems: updated });
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <button
                        onClick={() => {
                          const updated = heroForm.marqueeItems.filter((_, i) => i !== idx);
                          setHeroForm({ ...heroForm, marqueeItems: updated });
                        }}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TECHNIQUES CRUD */}
          {activeTab === 'techniques' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Layers className="w-6 h-6 text-tpe-magenta" />
                    <span>Savoir-Faire & Techniques de Finition</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Ajoutez, modifiez ou réorganisez les procédés textiles affichés dans la matrice interactive.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('techniques')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser la section Savoir-Faire"
                  >
                    <Eye className="w-4 h-4 text-tpe-cyan" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingTechnique({
                      id: `tech-${Date.now()}`,
                      category: 'screenprint',
                      title: { fr: 'Nouveau Savoir-Faire', en: 'New Expertise' },
                      subtitle: { fr: 'Sous-titre descriptif', en: 'Descriptive subtitle' },
                      description: { fr: 'Description technique complète...', en: 'Full description...' },
                      highlights: {
                        fr: ['Cadence élevée', 'Certifié Oeko-Tex'],
                        en: ['High daily throughput', 'Oeko-Tex compliant'],
                      },
                      specs: {
                        capacity: '15 000 pcs / jour',
                        maxColorsOrHeads: '10 couleurs',
                        bestFor: { fr: 'Hoodies et T-shirts', en: 'Hoodies and tees' },
                        leadTimeSample: '48 Heures',
                      },
                      image: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      macroImage: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      badge: { fr: '15 000 pcs / j', en: '15 000 pcs / d' },
                      shortName: 'Technique',
                      badgeCapacity: '15 000 pcs / jour',
                      colorAccent: 'text-tpe-magenta border-tpe-magenta',
                      cmykDot: 'bg-tpe-magenta',
                    });
                    setIsNewTechnique(true);
                  }}
                  className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter une Technique</span>
                </button>
              </div>
            </div>

              {/* Grid of Techniques */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.techniques.map((tech, idx) => (
                  <div
                    key={tech.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                          {tech.category}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              const list = [...data.techniques];
                              const temp = list[idx - 1];
                              list[idx - 1] = list[idx];
                              list[idx] = temp;
                              reorderTechniques(list);
                              showToast('Ordre mis à jour');
                            }}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === data.techniques.length - 1}
                            onClick={() => {
                              const list = [...data.techniques];
                              const temp = list[idx + 1];
                              list[idx + 1] = list[idx];
                              list[idx] = temp;
                              reorderTechniques(list);
                              showToast('Ordre mis à jour');
                            }}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <img
                          src={tech.image}
                          alt=""
                          className="w-20 h-20 rounded-xl object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                        <div>
                          <h3 className="font-extrabold text-white text-base leading-snug">
                            {tech.title[langTab] || tech.title.fr}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                            {tech.subtitle[langTab] || tech.subtitle.fr}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-slate-950 text-tpe-cyan font-bold border border-slate-800">
                              {tech.specs.capacity}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {tech.specs.maxColorsOrHeads}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          setEditingTechnique(tech);
                          setIsNewTechnique(false);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la technique "${tech.title.fr}" ?`)) {
                            deleteTechnique(tech.id);
                            showToast('Technique supprimée');
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FACTORY MACHINES CRUD */}
          {activeTab === 'machines' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-tpe-yellow" />
                    <span>Parc Machines & Atelier Ras Jebel</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Gérez la flotte de machines industrielles (ROQ, Tajima, Aeon Kyo, Laser, etc.) et leurs points interactifs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('machines')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser le Parc Machines"
                  >
                    <Eye className="w-4 h-4 text-tpe-yellow" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                    setEditingMachine({
                      id: `machine-${Date.now()}`,
                      title: { fr: 'Nouveau Poste Industriel', en: 'New Industrial Workstation' },
                      type: { fr: 'Série Haute Cadence', en: 'High Speed Fleet' },
                      count: 'Flux Continu',
                      brand: 'Constructeur International',
                      description: { fr: 'Spécifications de la machine...', en: 'Machine specifications...' },
                      specs: { fr: ['Performance 1'], en: ['Feature 1'] },
                      image: '/assets/showcase/machines/screenprint_roq_oval.jpg',
                      stationNum: `0${data.machines.length + 1}`,
                      zone: 'ATELIER PRINCIPAL',
                      brandBadge: 'NOUVEL ÉQUIPEMENT',
                      capacityMetric: 'Capacité Haute Vitesse',
                      speedMetric: 'Cadence industrielle continue',
                      precisionMetric: 'Précision micrométrique',
                      regulationMetric: 'Normes de sécurité CE',
                      hotspots: [],
                    });
                    setIsNewMachine(true);
                  }}
                  className="px-4 py-2 bg-tpe-yellow text-slate-950 font-black text-xs rounded-xl hover:bg-tpe-yellow/90 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter une Machine</span>
                </button>
                </div>
              </div>

              {/* Machines List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.machines.map((machine, idx) => (
                  <div
                    key={machine.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-tpe-yellow font-bold px-2 py-0.5 rounded-full bg-tpe-yellow/10 border border-tpe-yellow/20">
                          Poste {machine.stationNum || idx + 1} • {machine.brand}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              const list = [...data.machines];
                              const temp = list[idx - 1];
                              list[idx - 1] = list[idx];
                              list[idx] = temp;
                              reorderMachines(list);
                              showToast('Ordre mis à jour');
                            }}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === data.machines.length - 1}
                            onClick={() => {
                              const list = [...data.machines];
                              const temp = list[idx + 1];
                              list[idx + 1] = list[idx];
                              list[idx] = temp;
                              reorderMachines(list);
                              showToast('Ordre mis à jour');
                            }}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <img
                          src={machine.image}
                          alt=""
                          className="w-24 h-24 rounded-xl object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                        <div>
                          <h3 className="font-extrabold text-white text-base leading-snug">
                            {machine.title[langTab] || machine.title.fr}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                            {machine.description[langTab] || machine.description.fr}
                          </p>
                          <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold">
                            {machine.count}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          setEditingMachine(machine);
                          setIsNewMachine(false);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le poste "${machine.title.fr}" ?`)) {
                            deleteMachine(machine.id);
                            showToast('Poste machine supprimé');
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LOOKBOOK PORTFOLIO CRUD */}
          {activeTab === 'portfolio' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Image className="w-6 h-6 text-tpe-cyan" />
                    <span>Lookbook & Réalisations d'Atelier</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Gérez les photographies haute résolution des productions réelles pour les marques partenaires.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('portfolio')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser le Lookbook Réalisations"
                  >
                    <Eye className="w-4 h-4 text-tpe-cyan" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingPortfolio({
                        id: `portfolio-${Date.now()}`,
                        title: { fr: 'Nouvelle Pièce d\'Atelier', en: 'New Garment Piece' },
                        category: 'fashion',
                        technique: { fr: 'Broderie 3D & Sérigraphie', en: '3D Embroidery & Screenprint' },
                        garment: { fr: 'Sweats & Denim Export', en: 'Sweatshirts & Export Denim' },
                        year: 'Production TPE 2026',
                        image: '/assets/showcase/products/hangtags_replay_pantone.jpg',
                        macroImage: '/assets/showcase/products/hangtags_table_replay_teddy.jpg',
                        tags: ['Collection 2026', 'Éco-Responsable'],
                        description: {
                          fr: 'Finitions soignées réalisées dans les ateliers TPE de Ras Jebel.',
                          en: 'High-precision craftsmanship executed at TPE workshops in Ras Jebel.',
                        },
                      });
                      setIsNewPortfolio(true);
                    }}
                    className="px-4 py-2 bg-tpe-cyan text-slate-950 font-black text-xs rounded-xl hover:bg-tpe-cyan/90 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter une Réalisation</span>
                  </button>
                </div>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-slate-950 overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase text-white font-bold">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-white text-sm line-clamp-1">
                          {item.title[langTab] || item.title.fr}
                        </h3>
                        <p className="text-xs text-tpe-cyan font-mono line-clamp-1">
                          {item.technique[langTab] || item.technique.fr}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {item.description[langTab] || item.description.fr}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          setEditingPortfolio(item);
                          setIsNewPortfolio(false);
                        }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le projet "${item.title.fr}" ?`)) {
                            deletePortfolioItem(item.id);
                            showToast('Projet supprimé du lookbook');
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BRANDS CRUD */}
          {activeTab === 'brands' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Tag className="w-6 h-6 text-tpe-magenta" />
                    <span>Marques Clientes & Références Donneurs d'Ordres</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Gérez la liste et les logos des maisons de mode européennes qui confient leur confection à TPE.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('brands')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser les Références Marques"
                  >
                    <Eye className="w-4 h-4 text-tpe-magenta" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingBrand({
                        id: `brand-${Date.now()}`,
                        name: 'NOUVELLE MARQUE',
                        logo: '/assets/logos/brands/lacoste.svg',
                        category: 'Prêt-à-Porter Européen',
                        technique: 'Sérigraphie & Broderie',
                        active: true,
                      });
                      setIsNewBrand(true);
                    }}
                    className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter une Marque</span>
                  </button>
                </div>
              </div>

              {/* Brands Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="h-16 bg-white rounded-xl p-3 flex items-center justify-center mb-3">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain filter invert"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-white text-sm">{brand.name}</h4>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            brand.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {brand.active ? 'Actif' : 'Masqué'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{brand.category}</p>
                      <p className="text-[10px] font-mono text-tpe-cyan mt-1">{brand.technique}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <button
                        onClick={() => {
                          updateBrand(brand.id, { active: !brand.active });
                          showToast(`Visibilité modifiée pour ${brand.name}`);
                        }}
                        className="text-slate-400 hover:text-white text-[11px]"
                      >
                        {brand.active ? 'Désactiver' : 'Activer'}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingBrand(brand);
                            setIsNewBrand(false);
                          }}
                          className="text-slate-300 hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Supprimer la marque ${brand.name} ?`)) {
                              deleteBrand(brand.id);
                              showToast('Marque supprimée');
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: NEARSHORING & LOGISTICS */}
          {activeTab === 'nearshoring' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-tpe-cyan" />
                    <span>Nearshoring Méditerranéen & Logistique</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Paramétrez les liaisons maritimes directes 48h (Marseille, Gênes, Barcelone) et les avantages douaniers EUR.1.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('nearshoring')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser la Carte Nearshoring"
                  >
                    <Eye className="w-4 h-4 text-tpe-cyan" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingRoute({
                        id: `route-${Date.now()}`,
                        destination: 'Nouvelle Destination Europe',
                        time: '48 Heures',
                        mode: 'Ferry Ro-Ro Quotidien',
                        port: 'Port de Radès vers Port Européen',
                        customs: 'Accord EUR.1 : 0% droit de douane',
                        frequency: 'Départs réguliers',
                        badge: 'LIAISON EXPRESS',
                      });
                      setIsNewRoute(true);
                    }}
                    className="px-3.5 py-2 bg-tpe-cyan text-slate-950 font-black text-xs rounded-xl hover:bg-tpe-cyan/90 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter une Route</span>
                  </button>
                </div>
              </div>

              {/* Routes List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Liaisons Maritimes & Aériennes Régulières
                </h3>
                {data.nearshoringRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-tpe-cyan/15 text-tpe-cyan border border-tpe-cyan/20 font-bold">
                          {route.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{route.time}</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{route.destination}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{route.mode} • {route.port}</p>
                      <p className="text-[11px] font-mono text-slate-500 mt-1">{route.customs}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingRoute(route);
                          setIsNewRoute(false);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la route vers ${route.destination} ?`)) {
                            deleteNearshoringRoute(route.id);
                            showToast('Liaison maritime supprimée');
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Advantages */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Les 4 Piliers Stratégiques du Nearshoring ({langTab.toUpperCase()})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.nearshoringAdvantages.map((adv) => (
                    <div key={adv.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-mono text-tpe-magenta font-bold">Pilier {adv.num}</span>
                      <input
                        type="text"
                        value={adv.title[langTab] || adv.title.fr}
                        onChange={(e) => {
                          updateNearshoringAdvantage(adv.id, {
                            title: { ...adv.title, [langTab]: e.target.value },
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                      <textarea
                        rows={2}
                        value={adv.desc[langTab] || adv.desc.fr}
                        onChange={(e) => {
                          updateNearshoringAdvantage(adv.id, {
                            desc: { ...adv.desc, [langTab]: e.target.value },
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: STANDARDS & CSR */}
          {activeTab === 'standards' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span>Normes Internationales, Chimie & RSE</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Gérez les accréditations ISO 9001/14001/45001, GOTS Bio, OEKO-TEX et accords douaniers EUR.1.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openPreview('standards')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                  title="Prévisualiser les Normes & RSE"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Prévisualiser</span>
                </button>
              </div>

              {/* Pillars List */}
              <div className="space-y-4">
                {data.standardsPillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          {pillar.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{pillar.tag}</span>
                      </div>
                      <button
                        onClick={() => setEditingPillar(pillar)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono"
                      >
                        Modifier
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">{pillar.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{pillar.subtitle}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1">
                        Engagements & Points Clés :
                      </span>
                      {pillar.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                      Audit : {pillar.auditInfo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: CONTACT & FACTORY INFO */}
          {activeTab === 'contact' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Phone className="w-6 h-6 text-tpe-magenta" />
                    <span>Coordonnées Officielles & Localisation Usine</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Gérez l'adresse physique à Ras Jebel, les numéros de standard, WhatsApp et courriels.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('contact')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Prévisualiser les Coordonnées & Contact"
                  >
                    <Eye className="w-4 h-4 text-tpe-magenta" />
                    <span>Prévisualiser</span>
                  </button>

                  <button
                    onClick={() => {
                      updateContact(contactForm);
                      showToast('Coordonnées enregistrées avec succès');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Adresse & Géolocalisation
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Adresse Complète</label>
                    <input
                      type="text"
                      value={contactForm.factoryAddress}
                      onChange={(e) => setContactForm({ ...contactForm, factoryAddress: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Lien Google Maps</label>
                    <input
                      type="text"
                      value={contactForm.mapsUrl}
                      onChange={(e) => setContactForm({ ...contactForm, mapsUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Téléphones & Lignes Directes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Standard Fixe</label>
                    <input
                      type="text"
                      value={contactForm.phoneStandard}
                      onChange={(e) => setContactForm({ ...contactForm, phoneStandard: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">WhatsApp Commercial</label>
                    <input
                      type="text"
                      value={contactForm.phoneWhatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, phoneWhatsapp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Adresses Emails & Horaires
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email Standard</label>
                    <input
                      type="email"
                      value={contactForm.emailStandard}
                      onChange={(e) => setContactForm({ ...contactForm, emailStandard: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email Commercial</label>
                    <input
                      type="email"
                      value={contactForm.emailCommercial}
                      onChange={(e) => setContactForm({ ...contactForm, emailCommercial: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Horaires d'Ouverture ({langTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={contactForm.openingHours[langTab] || contactForm.openingHours.fr}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          openingHours: {
                            ...contactForm.openingHours,
                            [langTab]: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: AI CHATBOT & CONCIERGE */}
          {activeTab === 'chatbot' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    <Bot className="w-6 h-6 text-tpe-magenta" />
                    <span>Assistant IA Industriel & Concierge</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Configurez le comportement du bot de messagerie, les suggestions rapides et sa base de connaissances.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview('chatbot')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-sm"
                    title="Tester et Prévisualiser le Concierge IA"
                  >
                    <Eye className="w-4 h-4 text-tpe-magenta" />
                    <span>Tester le Bot</span>
                  </button>

                  <button
                    onClick={() => {
                      updateChatbot(chatbotForm);
                      showToast('Paramètres du bot enregistrés');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>

              {/* Bot status */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-mono">
                      Activation du Concierge IA
                    </h3>
                    <p className="text-xs text-slate-400">
                      Affiche la bulle d'assistance intelligente en bas à droite du site.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={chatbotForm.isEnabled}
                    onChange={(e) => setChatbotForm({ ...chatbotForm, isEnabled: e.target.checked })}
                    className="w-5 h-5 rounded text-tpe-magenta bg-slate-950 border-slate-800 focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Message d'Accueil ({langTab.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={chatbotForm.welcomeMessage[langTab] || chatbotForm.welcomeMessage.fr}
                    onChange={(e) =>
                      setChatbotForm({
                        ...chatbotForm,
                        welcomeMessage: {
                          ...chatbotForm.welcomeMessage,
                          [langTab]: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              {/* Knowledge Base */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Base de Connaissances Spécifique (FAQ Intelligente)
                  </h3>
                  <button
                    onClick={() => {
                      setNewQAPair({
                        id: `qa-${Date.now()}`,
                        question: { fr: '', en: '' },
                        answer: { fr: '', en: '' },
                        tags: [],
                      });
                      setIsNewQAModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une Question / Réponse</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {chatbotForm.knowledgeBase.map((qa) => (
                    <div key={qa.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="font-bold text-white text-xs">
                          Q : {qa.question[langTab] || qa.question.fr}
                        </div>
                        <button
                          onClick={() => {
                            deleteChatbotQA(qa.id);
                            showToast('Entrée FAQ supprimée');
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        R : {qa.answer[langTab] || qa.answer.fr}
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {qa.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SYSTEM, PIN & BACKUP */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-slate-800">
                <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                  <Settings className="w-6 h-6 text-slate-400" />
                  <span>Sécurité, Sauvegardes & Paramètres Globaux</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Gestion du code d'accès administrateur, maintenance et exports de sauvegarde.
                </p>
              </div>

              {/* Admin PIN change */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-tpe-magenta" />
                  <span>Changer le Mot de Passe Administrateur</span>
                </h3>
                <div className="max-w-sm space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Nouveau Code / PIN</label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!settingsForm.adminPin.trim()) {
                        alert('Le mot de passe ne peut pas être vide.');
                        return;
                      }
                      updateSiteSettings({ adminPin: settingsForm.adminPin.trim() });
                      showToast('Nouveau code PIN administrateur enregistré');
                    }}
                    className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white text-xs font-bold rounded-xl"
                  >
                    Mettre à Jour le Mot de Passe
                  </button>
                </div>
              </div>

              {/* Backup & Restore */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4 text-tpe-cyan" />
                  <span>Sauvegardes & Restauration du Site</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Exportez l'intégralité du site (textes, machines, portfolio, devis, paramètres) dans un fichier JSON unique et autonome.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => {
                      exportDataAsJSON();
                      showToast('Fichier JSON de sauvegarde téléchargé');
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 border border-slate-700"
                  >
                    <Download className="w-4 h-4 text-tpe-cyan" />
                    <span>Télécharger la Sauvegarde Complète (JSON)</span>
                  </button>

                  <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 border border-slate-700 cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Restaurer depuis un Fichier JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result as string;
                            if (importDataFromJSON(content)) {
                              showToast('Site restauré avec succès depuis le fichier JSON');
                            } else {
                              alert('Le fichier sélectionné n\'est pas un fichier de sauvegarde TPE valide.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Factory Defaults Reset */}
              <div className="bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-rose-400 uppercase font-mono tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-500" />
                  <span>Réinitialisation aux Données d'Usine</span>
                </h3>
                <p className="text-xs text-rose-300/80">
                  Attention : cette action réinitialisera tous les textes, machines et réalisations à leur configuration d'origine officielle.
                </p>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        'Êtes-vous certain de vouloir réinitialiser l\'ensemble des données du site aux valeurs par défaut d\'origine ?'
                      )
                    ) {
                      resetToDefaults();
                      showToast('Données réinitialisées aux valeurs initiales d\'usine');
                    }
                  }}
                  className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-mono font-bold rounded-xl"
                >
                  Réinitialiser le Site aux Valeurs d'Origine
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Full Lead Details & Response */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-tpe-magenta font-bold tracking-widest block mb-1">
                  Dossier Devis Tech-Pack
                </span>
                <h3 className="text-xl font-black text-white">
                  {selectedLead.companyName || 'Prospect sans marque'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Contact :</span>
                <span className="font-bold text-white">{selectedLead.contactName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Email :</span>
                <a href={`mailto:${selectedLead.email}`} className="text-tpe-cyan hover:underline">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Téléphone :</span>
                <a href={`tel:${selectedLead.phone}`} className="text-white font-mono">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Procédé :</span>
                <span className="text-white">{selectedLead.technique}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Volume :</span>
                <span className="text-white font-mono">{selectedLead.quantityRange}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">Support :</span>
                <span className="text-white">{selectedLead.productType}</span>
              </div>
            </div>

            {/* Tech pack file indicator */}
            {selectedLead.fileName && (
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">📁 Fichier Tech-Pack déposé :</span>
                <span className="text-emerald-400 font-bold">{selectedLead.fileName}</span>
              </div>
            )}

            {/* Project Notes */}
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">Cahier des charges & Notes :</span>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                {selectedLead.projectNotes || 'Aucune note spécifique fournie par le client.'}
              </div>
            </div>

            {/* Internal Management (Status, Quote, Private notes) */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                Suivi Interne & Chiffrage
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Statut du Dossier</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      const updated = {
                        ...selectedLead,
                        status: e.target.value as RFQLead['status'],
                      };
                      setSelectedLead(updated);
                      updateRFQLead(selectedLead.id, { status: updated.status });
                      showToast(`Statut mis à jour`);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="new">Nouveau Lead</option>
                    <option value="in_review">En Cours d'Étude Bureau CAO</option>
                    <option value="quoted">Devis Transmis au Client</option>
                    <option value="in_production">Validé / En Production</option>
                    <option value="completed">Projet Livré</option>
                    <option value="archived">Archivé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Montant Estimé du Devis (€)</label>
                  <input
                    type="text"
                    value={selectedLead.estimatedQuote || ''}
                    placeholder="Ex: 8 500 € HT"
                    onChange={(e) => {
                      const updated = { ...selectedLead, estimatedQuote: e.target.value };
                      setSelectedLead(updated);
                      updateRFQLead(selectedLead.id, { estimatedQuote: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Notes Internes de l'Atelier</label>
                  <textarea
                    rows={2}
                    value={selectedLead.internalNotes || ''}
                    placeholder="Ajouter des remarques de fabrication, tests fils..."
                    onChange={(e) => {
                      const updated = { ...selectedLead, internalNotes: e.target.value };
                      setSelectedLead(updated);
                      updateRFQLead(selectedLead.id, { internalNotes: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Bonjour ${selectedLead.contactName}, suite à votre demande de devis chez TPE Tunisie pour ${selectedLead.companyName} concernant : ${selectedLead.technique}, nous avons analysé votre projet...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Répondre par WhatsApp</span>
                </a>

                <a
                  href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(
                    `TPE Tunisie - Étude Tech-Pack & Devis : ${selectedLead.companyName}`
                  )}&body=${encodeURIComponent(
                    `Bonjour ${selectedLead.contactName},\n\nNous faisons suite à votre demande de cotation pour vos volumes de ${selectedLead.quantityRange} en ${selectedLead.technique}.\n\nCordialement,\nDirection Commerciale TPE Ras Jebel`
                  )}`}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Envoyer un Email</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Technique */}
      {editingTechnique && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">
                {isNewTechnique ? 'Ajouter une Nouvelle Technique' : 'Modifier la Technique'}
              </h3>
              <button
                onClick={() => setEditingTechnique(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Catégorie</label>
                <select
                  value={editingTechnique.category}
                  onChange={(e) =>
                    setEditingTechnique({
                      ...editingTechnique,
                      category: e.target.value as TechniqueItem['category'],
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="screenprint">Sérigraphie Carrousel</option>
                  <option value="embroidery">Broderie Industrielle</option>
                  <option value="digital">Numérique & DTF</option>
                  <option value="finishing">Étiquetage & Finition</option>
                  <option value="cad">Bureau CAO & Pré-presse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Capacité Quotidienne</label>
                <input
                  type="text"
                  value={editingTechnique.specs.capacity}
                  onChange={(e) =>
                    setEditingTechnique({
                      ...editingTechnique,
                      specs: { ...editingTechnique.specs, capacity: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Titre (Français)</label>
                <input
                  type="text"
                  value={editingTechnique.title.fr}
                  onChange={(e) =>
                    setEditingTechnique({
                      ...editingTechnique,
                      title: { ...editingTechnique.title, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Titre (Anglais)</label>
                <input
                  type="text"
                  value={editingTechnique.title.en}
                  onChange={(e) =>
                    setEditingTechnique({
                      ...editingTechnique,
                      title: { ...editingTechnique.title, en: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Description (Français)</label>
                <textarea
                  rows={3}
                  value={editingTechnique.description.fr}
                  onChange={(e) =>
                    setEditingTechnique({
                      ...editingTechnique,
                      description: { ...editingTechnique.description, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <ImageUploadField
                label="Photo Machine Principale"
                value={editingTechnique.image}
                onChange={(url) => setEditingTechnique({ ...editingTechnique, image: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />

              <ImageUploadField
                label="Photo Macro Texture (Zoom)"
                value={editingTechnique.macroImage}
                onChange={(url) => setEditingTechnique({ ...editingTechnique, macroImage: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingTechnique(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (isNewTechnique) {
                    addTechnique(editingTechnique);
                    showToast('Nouvelle technique ajoutée');
                  } else {
                    updateTechnique(editingTechnique.id, editingTechnique);
                    showToast('Technique modifiée avec succès');
                  }
                  setEditingTechnique(null);
                }}
                className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Machine */}
      {editingMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">
                {isNewMachine ? 'Ajouter une Machine' : 'Modifier la Fiche Machine'}
              </h3>
              <button
                onClick={() => setEditingMachine(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">N° de Poste / Station</label>
                <input
                  type="text"
                  value={editingMachine.stationNum || ''}
                  onChange={(e) => setEditingMachine({ ...editingMachine, stationNum: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Constructeur / Marque</label>
                <input
                  type="text"
                  value={editingMachine.brand}
                  onChange={(e) => setEditingMachine({ ...editingMachine, brand: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Nom / Titre (Français)</label>
                <input
                  type="text"
                  value={editingMachine.title.fr}
                  onChange={(e) =>
                    setEditingMachine({
                      ...editingMachine,
                      title: { ...editingMachine.title, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Nom / Titre (Anglais)</label>
                <input
                  type="text"
                  value={editingMachine.title.en}
                  onChange={(e) =>
                    setEditingMachine({
                      ...editingMachine,
                      title: { ...editingMachine.title, en: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Capacité Quotidienne</label>
                <input
                  type="text"
                  value={editingMachine.count}
                  onChange={(e) => setEditingMachine({ ...editingMachine, count: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <ImageUploadField
                label="Photo Machine Parc Industriel"
                value={editingMachine.image}
                onChange={(url) => setEditingMachine({ ...editingMachine, image: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingMachine.description.fr}
                  onChange={(e) =>
                    setEditingMachine({
                      ...editingMachine,
                      description: { ...editingMachine.description, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingMachine(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (isNewMachine) {
                    addMachine(editingMachine);
                    showToast('Nouvelle machine enregistrée');
                  } else {
                    updateMachine(editingMachine.id, editingMachine);
                    showToast('Fiche machine mise à jour');
                  }
                  setEditingMachine(null);
                }}
                className="px-4 py-2 bg-tpe-yellow text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Portfolio */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">
                {isNewPortfolio ? 'Ajouter une Pièce au Lookbook' : 'Modifier la Réalisation'}
              </h3>
              <button
                onClick={() => setEditingPortfolio(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Catégorie</label>
                <select
                  value={editingPortfolio.category}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      category: e.target.value as PortfolioItem['category'],
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="fashion">Mode & Broderie</option>
                  <option value="streetwear">Sérigraphie & Streetwear</option>
                  <option value="badges">Étiquettes & Hang Tags</option>
                  <option value="special">Finitions Spéciales & Digital</option>
                  <option value="workwear">Vêtements de Travail</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Année / Client</label>
                <input
                  type="text"
                  value={editingPortfolio.year}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, year: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Titre (Français)</label>
                <input
                  type="text"
                  value={editingPortfolio.title.fr}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      title: { ...editingPortfolio.title, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Titre (Anglais)</label>
                <input
                  type="text"
                  value={editingPortfolio.title.en}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      title: { ...editingPortfolio.title, en: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <ImageUploadField
                label="Photo Principale du Projet"
                value={editingPortfolio.image}
                onChange={(url) => setEditingPortfolio({ ...editingPortfolio, image: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />

              <ImageUploadField
                label="Photo Macro Zoom HD / Texture"
                value={editingPortfolio.macroImage}
                onChange={(url) => setEditingPortfolio({ ...editingPortfolio, macroImage: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Description (Français)</label>
                <textarea
                  rows={2}
                  value={editingPortfolio.description.fr}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      description: { ...editingPortfolio.description, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingPortfolio(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (isNewPortfolio) {
                    addPortfolioItem(editingPortfolio);
                    showToast('Nouvelle pièce ajoutée au lookbook');
                  } else {
                    updatePortfolioItem(editingPortfolio.id, editingPortfolio);
                    showToast('Réalisation mise à jour');
                  }
                  setEditingPortfolio(null);
                }}
                className="px-4 py-2 bg-tpe-cyan text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Brand */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">
                {isNewBrand ? 'Ajouter une Marque Partenaire' : 'Modifier la Marque'}
              </h3>
              <button
                onClick={() => setEditingBrand(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nom de la Marque</label>
                <input
                  type="text"
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>

              <ImageUploadField
                label="Logo de la Marque (SVG ou PNG)"
                value={editingBrand.logo}
                onChange={(url) => setEditingBrand({ ...editingBrand, logo: url })}
                onUpload={uploadFile}
                showToast={showToast}
              />

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Secteur / Catégorie</label>
                <input
                  type="text"
                  value={editingBrand.category}
                  onChange={(e) => setEditingBrand({ ...editingBrand, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Techniques Réalisées</label>
                <input
                  type="text"
                  value={editingBrand.technique}
                  onChange={(e) => setEditingBrand({ ...editingBrand, technique: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingBrand(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (isNewBrand) {
                    addBrand(editingBrand);
                    showToast('Nouvelle marque partenaire ajoutée');
                  } else {
                    updateBrand(editingBrand.id, editingBrand);
                    showToast('Marque mise à jour');
                  }
                  setEditingBrand(null);
                }}
                className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: New Manual Lead */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">Créer un Nouveau Prospect Manuel</h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Nom de la Marque / Société *</label>
                <input
                  type="text"
                  value={newLeadForm.companyName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                  placeholder="Ex: Lacoste Sportswear"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Nom du Contact *</label>
                <input
                  type="text"
                  value={newLeadForm.contactName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, contactName: e.target.value })}
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Email Professionnel *</label>
                <input
                  type="email"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  placeholder="contact@marque.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Téléphone / WhatsApp *</label>
                <input
                  type="text"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-mono mb-1">Procédé de Finition Souhaité</label>
                <select
                  value={newLeadForm.technique}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, technique: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {data.techniques.map((t) => (
                    <option key={t.id} value={t.title.fr}>
                      {t.title.fr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Volume Prévisionnel</label>
                <input
                  type="text"
                  value={newLeadForm.quantityRange}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, quantityRange: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Chiffrage Devis (€)</label>
                <input
                  type="text"
                  value={newLeadForm.estimatedQuote}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedQuote: e.target.value })}
                  placeholder="Ex: 5 400 €"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-mono mb-1">Cahier des charges / Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.projectNotes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, projectNotes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (!newLeadForm.companyName || !newLeadForm.contactName) {
                    alert('Veuillez remplir au moins le nom de la marque et le nom du contact.');
                    return;
                  }
                  addRFQLead({
                    technique: newLeadForm.technique || 'Sérigraphie',
                    quantityRange: newLeadForm.quantityRange || '1 000 pcs',
                    productType: newLeadForm.productType || 'Sweats',
                    targetMarket: newLeadForm.targetMarket || 'France',
                    companyName: newLeadForm.companyName,
                    contactName: newLeadForm.contactName,
                    email: newLeadForm.email || '',
                    phone: newLeadForm.phone || '',
                    projectNotes: newLeadForm.projectNotes || '',
                    hasTechPack: false,
                  });
                  showToast('Prospect ajouté au carnet de devis');
                  setIsNewLeadModalOpen(false);
                }}
                className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Créer le Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: New Chatbot QA Pair */}
      {isNewQAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">Ajouter une Question / Réponse IA</h3>
              <button
                onClick={() => setIsNewQAModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Question (Français)</label>
                <input
                  type="text"
                  value={newQAPair.question.fr}
                  onChange={(e) =>
                    setNewQAPair({
                      ...newQAPair,
                      question: { ...newQAPair.question, fr: e.target.value },
                    })
                  }
                  placeholder="Ex: Quels sont vos minima de commande ?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Question (Anglais)</label>
                <input
                  type="text"
                  value={newQAPair.question.en}
                  onChange={(e) =>
                    setNewQAPair({
                      ...newQAPair,
                      question: { ...newQAPair.question, en: e.target.value },
                    })
                  }
                  placeholder="Ex: What are your minimum order quantities?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Réponse du Bot (Français)</label>
                <textarea
                  rows={3}
                  value={newQAPair.answer.fr}
                  onChange={(e) =>
                    setNewQAPair({
                      ...newQAPair,
                      answer: { ...newQAPair.answer, fr: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Mots-clés / Tags (séparés par des virgules)</label>
                <input
                  type="text"
                  placeholder="moq, quantité, minimum"
                  onChange={(e) =>
                    setNewQAPair({
                      ...newQAPair,
                      tags: e.target.value.split(',').map((s) => s.trim().toLowerCase()),
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewQAModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (!newQAPair.question.fr || !newQAPair.answer.fr) {
                    alert('Veuillez renseigner au moins la question et la réponse en français.');
                    return;
                  }
                  addChatbotQA(newQAPair);
                  showToast('Question / réponse ajoutée au bot');
                  setIsNewQAModalOpen(false);
                }}
                className="px-4 py-2 bg-tpe-magenta hover:bg-tpe-magenta/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LIVE IN-DASHBOARD SECTION & FULL-SITE PREVIEW MODAL            */}
      {/* ============================================================== */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 flex-shrink-0 z-10 shadow-lg">
            {/* Left: Section Selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-tpe-cyan" />
                  <span>Aperçu en Direct</span>
                </span>
              </div>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-mono text-slate-400 hidden md:inline">Section :</label>
                <select
                  value={previewModal.section}
                  onChange={(e) =>
                    setPreviewModal((prev) => ({
                      ...prev,
                      section: e.target.value as any,
                    }))
                  }
                  className="bg-slate-950 border border-slate-700 text-white text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-tpe-cyan cursor-pointer"
                >
                  <option value="full">🌐 Site Public Complet</option>
                  <option value="hero">⚡ Hero & Bandeau Marquee</option>
                  <option value="techniques">🔬 Savoir-Faire (Matrice)</option>
                  <option value="machines">⚙️ Parc Machines (Atelier)</option>
                  <option value="portfolio">📸 Lookbook Réalisations</option>
                  <option value="brands">🏷️ Références Marques</option>
                  <option value="nearshoring">🚢 Nearshoring & Logistique</option>
                  <option value="standards">🛡️ Normes, Chimie & RSE</option>
                  <option value="contact">📍 Coordonnées & Usine</option>
                  <option value="chatbot">🤖 Concierge IA (Chatbot)</option>
                </select>
              </div>
            </div>

            {/* Center: Device Viewport Switcher */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewModal((prev) => ({ ...prev, device: 'desktop' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  previewModal.device === 'desktop'
                    ? 'bg-tpe-cyan text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Affichage Ordinateur (Plein Écran)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewModal((prev) => ({ ...prev, device: 'tablet' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  previewModal.device === 'tablet'
                    ? 'bg-tpe-yellow text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Affichage Tablette (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablette (768px)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewModal((prev) => ({ ...prev, device: 'mobile' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  previewModal.device === 'mobile'
                    ? 'bg-tpe-magenta text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Affichage Mobile (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile (390px)</span>
              </button>
            </div>

            {/* Right: Language Switcher, Draft Save & Close */}
            <div className="flex items-center gap-2">
              {/* Language Switch */}
              <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPreviewModal((prev) => ({ ...prev, lang: 'fr' }))}
                  className={`px-2 py-1 rounded font-bold transition-colors ${
                    previewModal.lang === 'fr'
                      ? 'bg-tpe-cyan text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModal((prev) => ({ ...prev, lang: 'en' }))}
                  className={`px-2 py-1 rounded font-bold transition-colors ${
                    previewModal.lang === 'en'
                      ? 'bg-tpe-cyan text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Quick Save for drafts if on hero or contact */}
              {previewModal.section === 'hero' && (
                <button
                  type="button"
                  onClick={() => {
                    updateHero(heroForm);
                    showToast('Modifications du Hero enregistrées avec succès');
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1 shadow-sm transition-colors"
                  title="Enregistrer les modifications en cours"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Enregistrer le Hero</span>
                </button>
              )}

              {previewModal.section === 'contact' && (
                <button
                  type="button"
                  onClick={() => {
                    updateContact(contactForm);
                    showToast('Coordonnées enregistrées avec succès');
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1 shadow-sm transition-colors"
                  title="Enregistrer les coordonnées en cours"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Enregistrer Contact</span>
                </button>
              )}

              {/* Live Public Site link */}
              <button
                type="button"
                onClick={() => setViewMode('public')}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Aller sur le site public réel"
              >
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPreviewModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-rose-600/80 rounded-lg transition-colors flex items-center gap-1"
                title="Fermer la prévisualisation (Échap)"
              >
                <X className="w-4 h-4" />
                <span className="text-[10px] font-mono hidden lg:inline">Échap</span>
              </button>
            </div>
          </div>

          {/* Viewport Workspace */}
          <div className="flex-1 overflow-auto bg-slate-950/95 flex justify-center items-start p-2 sm:p-6">
            {/* DESKTOP VIEWPORT */}
            {previewModal.device === 'desktop' && (
              <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Simulated Desktop Browser Chrome */}
                <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-1 rounded-full border border-slate-800 text-[11px] text-slate-300">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>https://tpe-factory.com</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-tpe-cyan font-bold">{previewModal.section}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">100% Largeur Plein Écran</div>
                </div>

                {/* Desktop Content Canvas */}
                <div className="relative bg-tpe-navy text-slate-100 overflow-x-hidden min-h-[500px]">
                  {renderPreviewSection(previewModal.section, previewModal.lang)}
                </div>
              </div>
            )}

            {/* TABLET VIEWPORT (768px iPad Chassis) */}
            {previewModal.device === 'tablet' && (
              <div className="w-[768px] my-4 rounded-[36px] border-[12px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col flex-shrink-0">
                {/* Tablet Top Frame */}
                <div className="bg-slate-950 h-8 flex items-center justify-center relative border-b border-slate-800 px-4">
                  <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
                  <div className="absolute right-4 text-[10px] font-mono text-slate-500">
                    iPad (768 x 1024)
                  </div>
                </div>

                {/* Tablet Scrollable Canvas */}
                <div className="relative bg-tpe-navy text-slate-100 overflow-y-auto max-h-[80vh] min-h-[600px]">
                  {renderPreviewSection(previewModal.section, previewModal.lang)}
                </div>

                {/* Tablet Bottom Frame */}
                <div className="bg-slate-950 h-6 flex items-center justify-center border-t border-slate-800">
                  <div className="w-28 h-1 bg-slate-700 rounded-full" />
                </div>
              </div>
            )}

            {/* MOBILE VIEWPORT (390px iPhone Chassis) */}
            {previewModal.device === 'mobile' && (
              <div className="w-[390px] my-4 rounded-[44px] border-[10px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col flex-shrink-0">
                {/* Mobile Top Frame & Dynamic Island */}
                <div className="bg-slate-950 h-10 flex items-center justify-between px-6 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span>09:41</span>
                  <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center border border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Mobile Scrollable Canvas */}
                <div className="relative bg-tpe-navy text-slate-100 overflow-y-auto max-h-[75vh] min-h-[580px]">
                  {renderPreviewSection(previewModal.section, previewModal.lang)}
                </div>

                {/* Mobile Bottom Frame */}
                <div className="bg-slate-950 h-7 flex items-center justify-center border-t border-slate-800">
                  <div className="w-32 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

