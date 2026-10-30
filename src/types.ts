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

export interface FactoryMachine {
  id: string;
  title: { en: string; fr: string };
  type: { en: string; fr: string };
  count: string;
  brand: string;
  description: { en: string; fr: string };
  specs: { en: string[]; fr: string[] };
  image: string;
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

