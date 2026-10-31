export type Language = 'en' | 'fr';

export interface TechniqueItem {
  id: string;
  category: 'embroidery' | 'screenprint' | 'digital' | 'finishing' | 'cad';
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
  specs: {
    capacity: string;
    maxColorsOrHeads: string;
    bestFor: { en: string; fr: string };
    leadTimeSample: string;
  };
  image: string;
  macroImage: string;
  videoPreview?: string;
  badge: { en: string; fr: string };
  // Visual presentation helpers
  shortName?: string;
  badgeCapacity?: string;
  compactVolume?: string;
  machinePhoto?: string;
  macroPhoto?: string;
  machineLabel?: string;
  macroLabel?: string;
  colorAccent?: string;
  cmykDot?: string;
}

export interface PortfolioItem {
  id: string;
  title: { en: string; fr: string };
  category: 'streetwear' | 'workwear' | 'fashion' | 'badges' | 'special';
  technique: { en: string; fr: string };
  garment: { en: string; fr: string };
  year: string;
  image: string;
  macroImage: string;
  tags: string[];
  description: { en: string; fr: string };
}

export interface MachineHotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  desc: string;
}

export interface FactoryMachine {
  id: string;
  title: { en: string; fr: string };
  type: { en: string; fr: string };
  count: string;
  brand: string;
  description: { en: string; fr: string };
  specs: { en: string[]; fr: string[] };
  image: string;
  // Extended interactive properties
  stationNum?: string;
  zone?: string;
  brandBadge?: string;
  capacityMetric?: string;
  speedMetric?: string;
  precisionMetric?: string;
  regulationMetric?: string;
  hotspots?: MachineHotspot[];
}

export interface RFQFormData {
  technique: string;
  quantityRange: string;
  productType: string;
  targetMarket: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectNotes: string;
  hasTechPack: boolean;
  fileName?: string;
}

export interface RFQLead extends RFQFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'in_review' | 'quoted' | 'in_production' | 'completed' | 'archived';
  internalNotes?: string;
  estimatedQuote?: string;
  priority?: 'normal' | 'high' | 'urgent';
}

export interface BrandReference {
  id: string;
  name: string;
  logo: string;
  category: string;
  technique: string;
  heightClass?: string;
  active: boolean;
}

export interface NearshoringRoute {
  id: string;
  destination: string;
  time: string;
  mode: string;
  port: string;
  customs: string;
  frequency: string;
  badge: string;
}

export interface NearshoringAdvantage {
  id: string;
  num: string;
  title: { en: string; fr: string };
  desc: { en: string; fr: string };
}

export interface StandardPillarLogo {
  src: string;
  alt: string;
  hClass: string;
}

export interface StandardPillar {
  id: string;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  logos: StandardPillarLogo[];
  highlights: string[];
  auditInfo: string;
}

export interface HeroSettings {
  badge: { en: string; fr: string };
  motto: { en: string; fr: string };
  titleMain: { en: string; fr: string };
  titleSub: { en: string; fr: string };
  description: { en: string; fr: string };
  videoUrl: string;
  liveStatusText: string;
  isLiveStatusActive: boolean;
  marqueeItems: string[];
  stats: {
    screenprint: string;
    screenprintLabel: { en: string; fr: string };
    embroidery: string;
    embroideryLabel: { en: string; fr: string };
    labels: string;
    labelsLabel: { en: string; fr: string };
    transit: string;
    transitLabel: { en: string; fr: string };
  };
}

export interface ContactSettings {
  factoryAddress: string;
  mapsUrl: string;
  phoneStandard: string;
  phoneWhatsapp: string;
  whatsappNumberOnly: string;
  emailStandard: string;
  emailCommercial: string;
  openingHours: { en: string; fr: string };
}

export interface ChatbotQA {
  id: string;
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
  tags: string[];
}

export interface ChatbotSettings {
  isEnabled: boolean;
  botName: string;
  welcomeMessage: { en: string; fr: string };
  quickPrompts: { en: string[]; fr: string[] };
  knowledgeBase: ChatbotQA[];
}

export interface SiteSettings {
  siteName: string;
  adminPin: string;
  maintenanceMode: boolean;
  maintenanceMessage: { en: string; fr: string };
  sloganFooter: { en: string; fr: string };
  footerBadge: { en: string; fr: string };
  footerDesc: { en: string; fr: string };
}

export interface FullSiteData {
  hero: HeroSettings;
  techniques: TechniqueItem[];
  machines: FactoryMachine[];
  portfolio: PortfolioItem[];
  brands: BrandReference[];
  nearshoringRoutes: NearshoringRoute[];
  nearshoringAdvantages: NearshoringAdvantage[];
  standardsPillars: StandardPillar[];
  contact: ContactSettings;
  rfqLeads: RFQLead[];
  chatbot: ChatbotSettings;
  siteSettings: SiteSettings;
}
