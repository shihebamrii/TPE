import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  FullSiteData,
  HeroSettings,
  TechniqueItem,
  FactoryMachine,
  PortfolioItem,
  BrandReference,
  NearshoringRoute,
  NearshoringAdvantage,
  StandardPillar,
  ContactSettings,
  RFQLead,
  ChatbotSettings,
  SiteSettings,
  RFQFormData,
} from '../types';
import { techniquesData } from '../data/techniques';
import { factoryMachines as baseMachines } from '../data/factory';
import { portfolioData as basePortfolio } from '../data/portfolio';
import { translations } from '../data/translations';

const STORAGE_KEY = 'tpe_master_site_data_v3';
const AUTH_KEY = 'tpe_admin_authenticated_session';

// Baseline default data
const DEFAULT_HERO: HeroSettings = {
  badge: {
    en: "INDUSTRIAL TEXTILE FACILITY • RAS JEBEL, TUNISIA • FOUNDED IN 2015",
    fr: "ATELIER INDUSTRIEL TEXTILE • RAS JEBEL, TUNISIA • FONDÉE EN 2015",
  },
  motto: {
    en: "« Creation and innovation are our true calling... »",
    fr: "« Création et innovation sont notre vocation... »",
  },
  titleMain: {
    en: "The pinnacle of Mediterranean",
    fr: "L'excellence du façonnage",
  },
  titleSub: {
    en: "textile craftsmanship.",
    fr: "textile méditerranéen.",
  },
  description: {
    en: "Based in Ras Jebel (Bizerte), TPE is a 100% export-oriented manufacturer delivering a daily capacity of 20,300 pieces in screen printing, 5,400 pieces in multi-head embroidery, and 132,000 brand labels and hang tags. Direct 48-hour marine transit to Marseille and Genoa duty-free under EUR.1 agreements.",
    fr: "Implantée à Ras Jebel (Bizerte), TPE est une entreprise totalement exportatrice alliant une capacité quotidienne de 20 300 pièces en sérigraphie, 5 400 pièces en broderie multi-têtes et 132 000 étiquettes et hang tags. Transit maritime direct de 48 heures vers Marseille et Gênes sans droits de douane sous accord EUR.1.",
  },
  videoUrl: "/hero-video.mp4",
  liveStatusText: "USINE EN PRODUCTION DIRECTE",
  isLiveStatusActive: true,
  marqueeItems: [
    "SÉRIGRAPHIE HAUTE CADENCE : 20 300 PIÈCES / JOUR",
    "BRODERIE INDUSTRIELLE MULTI-TÊTES : 5 400 PIÈCES / JOUR",
    "LEADER DE L'ÉTIQUETAGE & HANG TAGS : 132 000 PIÈCES / JOUR",
    "TRANSIT MARITIME 48H DIRECT VERS MARSEILLE & GÊNES",
    "ACCORD DE LIBRE-ÉCHANGE EUR.1 SANS DROITS DE DOUANE",
    "TRIPLE CERTIFICATION ISO 9001 • ISO 14001 • ISO 45001",
    "TEXTILE BIO & RECYCLÉ : GOTS • GRS • RCS • OCS",
    "FONDÉE EN AVRIL 2015 • RAS JEBEL, GOUVERNORAT DE BIZERTE",
  ],
  stats: {
    screenprint: "20 300 pcs / jour",
    screenprintLabel: {
      en: "Automated ROQ Screen Printing",
      fr: "Sérigraphie Automatique ROQ",
    },
    embroidery: "5 400 pcs / jour",
    embroideryLabel: {
      en: "Tajima Multi-Head Embroidery",
      fr: "Broderie Multi-Têtes Tajima",
    },
    labels: "132 000 pcs / jour",
    labelsLabel: {
      en: "Labeling & Hang Tags",
      fr: "Étiquetage & Hang Tags",
    },
    transit: "48 Heures",
    transitLabel: {
      en: "Direct Marine Transit to Europe",
      fr: "Transit Maritime vers l'Europe",
    },
  },
};

const DEFAULT_TECHNIQUES: TechniqueItem[] = [
  {
    ...techniquesData[0],
    shortName: 'Sérigraphie',
    badgeCapacity: '20 300 pcs / jour',
    compactVolume: '20 300 /j',
    machinePhoto: '/assets/showcase/machines/screenprint_roq_oval.jpg',
    macroPhoto: '/client-assets/photos_1/image00005.jpeg',
    machineLabel: 'Carrousel Automatique ROQ Ovale',
    macroLabel: 'Impression Pigmentaire Haute Précision',
    colorAccent: 'text-tpe-magenta border-tpe-magenta',
    cmykDot: 'bg-tpe-magenta',
  },
  {
    ...techniquesData[1],
    shortName: 'Broderie',
    badgeCapacity: '5 400 pcs / jour',
    compactVolume: '5 400 /j',
    machinePhoto: '/assets/showcase/machines/embroidery_tajima_bay.jpg',
    macroPhoto: '/assets/showcase/products/embroidery_macro_stitch.jpg',
    machineLabel: 'Parc Brodeuses Japonaises Tajima',
    macroLabel: 'Point de Chaînette & Relief 3D 4mm',
    colorAccent: 'text-tpe-cyan border-tpe-cyan',
    cmykDot: 'bg-tpe-cyan',
  },
  {
    ...techniquesData[2],
    shortName: 'Étiquetage',
    badgeCapacity: '132 000 pcs / jour',
    compactVolume: '132 000 /j',
    machinePhoto: '/assets/showcase/products/hangtags_table_replay_teddy.jpg',
    macroPhoto: '/assets/showcase/products/hangtags_tommy_mustang_wood.jpg',
    machineLabel: 'Atelier Étiquetage & Cavaliers Replay/Teddy',
    macroLabel: 'Hang Tags Tommy Hilfiger & Mustang Bois',
    colorAccent: 'text-amber-600 border-amber-500',
    cmykDot: 'bg-tpe-yellow',
  },
  {
    ...techniquesData[3],
    shortName: 'Digital & DTF',
    badgeCapacity: 'Direct Textile',
    compactVolume: 'Aeon Kyo',
    machinePhoto: '/assets/showcase/machines/digital_aeon_kyo_pinko.jpg',
    macroPhoto: '/assets/showcase/machines/digital_aeon_kyo_operator.jpg',
    machineLabel: 'Aeon Kyo Direct Textile (Pinko)',
    macroLabel: 'Station Tactile & Étalonnage Opérateur',
    colorAccent: 'text-tpe-red border-tpe-red',
    cmykDot: 'bg-tpe-red',
  },
  {
    ...techniquesData[4],
    shortName: 'Bureau CAO',
    badgeCapacity: 'Études & UV',
    compactVolume: 'Pre-Press',
    machinePhoto: '/assets/showcase/machines/cad_prepress_office.jpg',
    macroPhoto: '/assets/showcase/machines/laser_cutting_labels.jpg',
    machineLabel: 'Bureau CAO, Lectra & Piquage',
    macroLabel: 'Découpe Laser & Insolation UV Toiles',
    colorAccent: 'text-slate-900 border-slate-900',
    cmykDot: 'bg-slate-900',
  },
];

const DEFAULT_MACHINES: FactoryMachine[] = [
  {
    ...baseMachines[0],
    stationNum: '01',
    zone: 'PÔLE SÉRIGRAPHIE ROTATIVE',
    brandBadge: 'ROQ INTERNATIONAL • PORTUGAL',
    capacityMetric: '20 300 pcs / jour',
    speedMetric: 'Cadence automatique 900 pcs/h',
    precisionMetric: 'Indexation ±0.02 mm (12 stations)',
    regulationMetric: 'Séchage quartz flash Roqdry Eco',
    hotspots: [
      { x: 32, y: 42, label: 'Racles Pneumatiques', desc: 'Pression calibrée et angle constant pour dépôt uniforme des encres à l\'eau' },
      { x: 68, y: 36, label: 'Flash Roqdry Eco Quartz', desc: 'Gélification ultra-rapide basse consommation entre chaque passe couleur' },
      { x: 48, y: 78, label: 'Table Indexée 12 Postes', desc: 'Repérage micrométrique continu pour superpositions complexes' },
    ],
  },
  {
    ...baseMachines[1],
    stationNum: '02',
    zone: 'BATEAUX BRODERIE MULTI-TÊTES',
    brandBadge: 'TAJIMA & BARUDAN • JAPON',
    capacityMetric: '5 400 pcs / jour',
    speedMetric: 'Jusqu\'à 1 000 points / min / tête',
    precisionMetric: 'Aiguilles haute résistance titane',
    regulationMetric: 'Fils techniques Madeira & Gunold',
    hotspots: [
      { x: 42, y: 35, label: 'Têtes Japonaises Tajima', desc: 'Vitesse de pointe 1 000 pts/min avec coupe-fils automatique rasant' },
      { x: 62, y: 55, label: 'Barres Spéciales Relief 3D', desc: 'Maintien rigide pour piquage sur mousse EVA 4mm sans écrasement' },
      { x: 28, y: 68, label: 'Pointeur Optique Laser', desc: 'Centrage et alignement micrométrique sur panneaux coupés et pièces montées' },
    ],
  },
  {
    ...baseMachines[2],
    stationNum: '03',
    zone: 'IMPRESSION DIRECTE TEXTILE & DTF',
    brandBadge: 'AEON KYO SERIES • TECHNOLOGIE',
    capacityMetric: 'Direct Textile HD',
    speedMetric: 'Injection piézoélectrique continue',
    precisionMetric: 'Résolution photographique 1200 dpi',
    regulationMetric: 'Encres pigmentaires certifiées OEKO-TEX',
    hotspots: [
      { x: 48, y: 38, label: 'Têtes Piézoélectriques Industrielles', desc: 'Gouttelettes microscopiques pour dégradés photographiques continus' },
      { x: 28, y: 52, label: 'Encres Pigmentaires Écologiques', desc: 'Formulation sans solvants résistant aux cycles de lavage intensifs' },
      { x: 72, y: 62, label: 'Plateau d\'Impression Numérique', desc: 'Production en cours pour les collections de la marque Pinko' },
    ],
  },
  {
    ...baseMachines[3],
    stationNum: '04',
    zone: 'ÉTIQUETAGE, HANG TAGS & RIVETS',
    brandBadge: 'DIVISION FAÇONNAGE TPE',
    capacityMetric: '132 000 pcs / jour',
    speedMetric: 'Découpe automatique par aspiration',
    precisionMetric: 'Assembleuse 6 têtes tactile',
    regulationMetric: 'Double perforeuses rivets laiton/nickel',
    hotspots: [
      { x: 38, y: 44, label: 'Assembleuse 6 Têtes Tactile', desc: 'Empilage droit et croisé programmé pour liasses de cavaliers et hang tags' },
      { x: 72, y: 36, label: 'Perforeuses Industrielles', desc: 'Sertissage de rivets métalliques et œillets laiton pour denim et jeans' },
      { x: 52, y: 72, label: 'Contrôle Qualité Export', desc: 'Conditionnement sous scellé pour Replay, Teddy Smith et Tommy Hilfiger' },
    ],
  },
  {
    ...baseMachines[4],
    stationNum: '05',
    zone: 'DÉCOUPE LASER & SOUDURE THERMIQUE',
    brandBadge: 'SYSTÈME LASER CNC OPTIQUE',
    capacityMetric: 'Cadence Haute Vitesse',
    speedMetric: 'Faisceau laser CO2 haute précision',
    precisionMetric: 'Guidage optique par caméra CCD',
    regulationMetric: 'Soudure simultanée anti-effilochage',
    hotspots: [
      { x: 46, y: 40, label: 'Faisceau Laser Micro-Focalisé', desc: 'Découpe nette au micron des étiquettes tissées, écussons et badges' },
      { x: 66, y: 56, label: 'Soudure Thermique Instantanée', desc: 'Fusion thermique des lisières empêchant tout effilochage lors du piquage' },
      { x: 26, y: 66, label: 'Système Caméra Optique', desc: 'Reconnaissance automatique des repères et correction géométrique' },
    ],
  },
  {
    id: 'laboratoire-prepresse-cao',
    title: {
      en: 'Pre-Press CAD Studio, Lectra Plotters & UV Exposure Room',
      fr: 'Bureau d\'Études CAO, Lectra & Chambre d\'Insolation UV',
    },
    type: {
      en: 'CAD Patterning, Separation & Screen Exposure',
      fr: 'Conception Vectorielle & Sérigraphie Pré-Presse',
    },
    count: 'Flux Continu',
    brand: 'Lectra • Gerber • Tunnels UV',
    description: {
      en: 'Dedicated CAD engineering studio for embroidery stitch programming and high-density film separations.',
      fr: 'Bureau d\'études équipé du système de CAO Lectra pour le patronage, le piquage de broderie et la séparation des couleurs sérigraphiques.',
    },
    specs: {
      en: [
        'Vector CAD and embroidery punch-software stations',
        'High-density digital film plotters for micro-halftones',
        'Pneumatic 120T mesh tensioning tables with Newton gauges',
        'Computerized UV vacuum exposure unit for crisp screen stencils',
      ],
      fr: [
        'Postes de CAO Lectra pour patronage et piquage numérique',
        'Traceurs typons numériques haute densité pour trames fines',
        'Table de tension pneumatique des toiles 120T avec tensiomètre',
        'Chambre d\'insolation UV sous vide pour pochoirs ultra-nets',
      ],
    },
    image: '/assets/showcase/machines/cad_prepress_office.jpg',
    stationNum: '06',
    zone: 'BUREAU D\'ÉTUDES & PRÉ-PRESSE',
    brandBadge: 'LECTRA • GERBER • CHAMBRE UV',
    capacityMetric: 'Calibrage Millimétré',
    speedMetric: 'Traceurs films haute densité Dmax',
    precisionMetric: 'Tension pneumatique toiles 120T',
    regulationMetric: 'Chambre d\'insolation UV sous vide',
    hotspots: [
      { x: 42, y: 38, label: 'Postes CAO Lectra & Piquage', desc: 'Numérisation vectorielle et programmation des points pour Tajima/Barudan' },
      { x: 76, y: 44, label: 'Traceurs Numériques HD', desc: 'Tirage de films typons à opacité maximale pour séparation couleur' },
      { x: 26, y: 72, label: 'Table de Tension Pneumatique', desc: 'Contrôle digital en Newtons pour stabilité dimensionnelle des soies' },
    ],
  },
];

const DEFAULT_PORTFOLIO: PortfolioItem[] = basePortfolio;

const DEFAULT_BRANDS: BrandReference[] = [
  {
    id: "lacoste",
    name: "LACOSTE",
    logo: "/assets/logos/brands/lacoste.svg",
    category: "Sportswear & Polos",
    technique: "Sérigraphie pigmentaire & Écussons",
    heightClass: "h-7 sm:h-8",
    active: true,
  },
  {
    id: "tommy",
    name: "TOMMY HILFIGER",
    logo: "/assets/logos/brands/tommy_hilfiger.svg",
    category: "Premium Denim & Casual",
    technique: "Broderie poitrine & Sérigraphie",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "calvin-klein",
    name: "CALVIN KLEIN",
    logo: "/assets/logos/brands/calvin_klein.svg",
    category: "Denim & Sous-vêtements",
    technique: "Impression discharge & Transfert silicone",
    heightClass: "h-5 sm:h-6",
    active: true,
  },
  {
    id: "emporio-armani",
    name: "EMPORIO ARMANI",
    logo: "/assets/logos/brands/emporio_armani.svg",
    category: "Haute Confection & Mode",
    technique: "Broderie fine & Griffes tissées",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "sandro",
    name: "SANDRO PARIS",
    logo: "/assets/logos/brands/sandro.svg",
    category: "Prêt-à-Porter Contemporain",
    technique: "Sérigraphie à l'eau & Hang tags",
    heightClass: "h-5 sm:h-6",
    active: true,
  },
  {
    id: "karl-lagerfeld",
    name: "KARL LAGERFELD",
    logo: "/assets/logos/brands/karl_lagerfeld.svg",
    category: "Design & Maroquinerie",
    technique: "Broderie haute densité & Ennoblissement",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "american-vintage",
    name: "AMERICAN VINTAGE",
    logo: "/assets/logos/brands/american_vintage.png",
    category: "Maille & Couleurs Végétales",
    technique: "Effet délavé vintage & Teinture pièce",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "replay",
    name: "REPLAY JEANS",
    logo: "/assets/logos/brands/replay.svg",
    category: "Denim Haute Technologie",
    technique: "Sérigraphie rongeant & Broderie 3D",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "mustang",
    name: "MUSTANG TRUE DENIM",
    logo: "/assets/logos/brands/mustang.svg",
    category: "Heritage Denim",
    technique: "Étiquettes cuir & Broderie poches",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "pepe-jeans",
    name: "PEPE JEANS LONDON",
    logo: "/assets/logos/brands/pepe_jeans.svg",
    category: "Denim & Confection",
    technique: "Sérigraphie multi-couleurs & Patchs",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "pinko",
    name: "PINKO",
    logo: "/assets/logos/brands/pinko.svg",
    category: "Mode Contemporaine Italienne",
    technique: "Impression numérique Aeon Kyo",
    heightClass: "h-5 sm:h-6",
    active: true,
  },
  {
    id: "teddy-smith",
    name: "TEDDY SMITH",
    logo: "/assets/logos/brands/teddy-smith.svg",
    category: "Streetwear & Finitions",
    technique: "Sérigraphie gonflante & Transfert",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
  {
    id: "benetton",
    name: "UNITED COLORS OF BENETTON",
    logo: "/assets/logos/brands/benetton.svg",
    category: "Maille & Casualwear",
    technique: "Broderie point de chaînette & Griffes",
    heightClass: "h-7 sm:h-8",
    active: true,
  },
  {
    id: "lee-cooper",
    name: "LEE COOPER",
    logo: "/assets/logos/brands/lee-cooper.svg",
    category: "Heritage Denim & Workwear",
    technique: "Broderie heavy stitch & Écussons tissés",
    heightClass: "h-7 sm:h-8",
    active: true,
  },
  {
    id: "marc-opolo",
    name: "MARC O'POLO",
    logo: "/assets/logos/brands/marc_opolo.svg",
    category: "Premium Casual Nordic",
    technique: "Sérigraphie éco-responsable GOTS",
    heightClass: "h-5 sm:h-6",
    active: true,
  },
  {
    id: "north-sails",
    name: "NORTH SAILS",
    logo: "/assets/logos/brands/north_sails.svg",
    category: "Performance & Nautique",
    technique: "Broderie technique & Badges étanches",
    heightClass: "h-6 sm:h-7",
    active: true,
  },
];

const DEFAULT_NEARSHORING_ROUTES: NearshoringRoute[] = [
  {
    id: "route-marseille",
    destination: "Marseille / Sud France",
    time: "48 Heures",
    mode: "Ferry Ro-Ro Quotidien",
    port: "Port de Bizerte / Radès vers Grand Port Maritime de Marseille",
    customs: "Accord EUR.1 : Dédouanement anticipé en mer, zéro droit de douane",
    frequency: "Départs quotidiens réguliers",
    badge: "LIAISON N°1 FRANCE",
  },
  {
    id: "route-genes",
    destination: "Gênes / Italie du Nord",
    time: "48 Heures",
    mode: "Liaison Maritime Ro-Ro Directe",
    port: "Port de Radès vers Port de Gênes (Accès direct Lombardie & Piémont)",
    customs: "Accord EUR.1 : Entrée directe dans l'espace Schengen sans taxes d'importation",
    frequency: "5 départs maritimes par semaine",
    badge: "AXE INDUSTRIEL ITALIE",
  },
  {
    id: "route-barcelone",
    destination: "Barcelone / Espagne",
    time: "72 Heures",
    mode: "Cargo Ligne Régulière",
    port: "Port de Radès vers Port de Barcelone (Accès Catalogne & Madrid)",
    customs: "Accord EUR.1 : Zéro droit de douane, transit sécurisé par scellé douanier",
    frequency: "Liaisons maritimes bi-hebdomadaires",
    badge: "CORRIDOR IBÉRIQUE",
  },
  {
    id: "route-air",
    destination: "Paris / Milan / Francfort",
    time: "24 Heures",
    mode: "Fret Aérien Express Cargo",
    port: "Aéroport International de Tunis-Carthage vers Roissy-CDG, Malpensa & Francfort",
    customs: "Dédouanement express sous 4h à l'arrivée en aéroport européen",
    frequency: "Vols cargo quotidiens multiples",
    badge: "PROTOTYPES & CAPSULES EXPRESS",
  },
];

const DEFAULT_NEARSHORING_ADVANTAGES: NearshoringAdvantage[] = [
  {
    id: "adv-1",
    num: "01",
    title: {
      en: "Zero Customs Duties (EUR.1 Agreement)",
      fr: "Zéro Droit de Douane (Accord EUR.1)",
    },
    desc: {
      en: "Full duty-free tariff preferences entering European Union territory through bilateral EU-Tunisia trade pacts.",
      fr: "Franchise totale de droits de douane pour l'entrée sur le territoire de l'Union Européenne grâce à l'accord d'association Tunisie-UE.",
    },
  },
  {
    id: "adv-2",
    num: "02",
    title: {
      en: "Rapid 2-Week Restocking Cycles",
      fr: "Réassorts Rapides en 2 Semaines",
    },
    desc: {
      en: "Cut your supply chain lead times by 75% compared to Asian manufacturing. Replenish European stores in record time.",
      fr: "Divisez par 4 vos délais de réapprovisionnement par rapport à l'Asie. Passez de l'échantillon au réassort boutique en un temps record.",
    },
  },
  {
    id: "adv-3",
    num: "03",
    title: {
      en: "75% Lower Carbon Footprint",
      fr: "Empreinte Carbone Réduite de 75%",
    },
    desc: {
      en: "Short-distance Mediterranean sea transport drastically reducing Scope 3 greenhouse gas shipping emissions.",
      fr: "Circuit court maritime en Méditerranée qui limite massivement les émissions de gaz à effet de serre Scope 3 liées au transport.",
    },
  },
  {
    id: "adv-4",
    num: "04",
    title: {
      en: "Shared Time Zone (UTC+1 / CET)",
      fr: "Même Fuseau Horaire (UTC+1)",
    },
    desc: {
      en: "Real-time communication and instantaneous problem-solving with our production managers during your regular office hours.",
      fr: "Collaboration fluide et réactivité en temps réel avec nos directeurs d'atelier sans aucun décalage horaire.",
    },
  },
];

const DEFAULT_STANDARDS_PILLARS: StandardPillar[] = [
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

const DEFAULT_CONTACT: ContactSettings = {
  factoryAddress: "Route de Metline, 7070 Ras Jebel, Gouvernorat de Bizerte, Tunisie",
  mapsUrl: "https://www.google.com/maps/place/TPE+TUNISIE/@37.2189777,10.1179318,915m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12e2e98602f32867:0xd2378773985b40ff!8m2!3d37.2189777!4d10.1179318",
  phoneStandard: "+216 72 457 143",
  phoneWhatsapp: "+216 98 761 003",
  whatsappNumberOnly: "21698761003",
  emailStandard: "contact@tpe-sa.com",
  emailCommercial: "tpe.commercial@topnet.tn",
  openingHours: {
    en: "Monday – Friday: 07:30 AM – 05:30 PM (Tunis Time / UTC+1)",
    fr: "Lundi – Vendredi : 07h30 – 17h30 (Heure de Tunis / UTC+1)",
  },
};

const DEFAULT_LEADS: RFQLead[] = [
  {
    id: "lead-sandro-2026",
    technique: "Broderie Industrielle Multi-Têtes & Relief 3D",
    quantityRange: "2 000 – 10 000 pcs (Haute Cadence)",
    productType: "Sweats à Capuche & Confections Molleton",
    targetMarket: "France & Union Européenne",
    companyName: "Sandro Paris (SMCP Group)",
    contactName: "Sophie Martin",
    email: "s.martin@sandro-paris.com",
    phone: "+33 6 42 19 88 20",
    projectNotes: "Projet capsule Automne/Hiver : broderie 3D sur molleton lourd 420gsm avec fil Madeira métallique lurex. Tolérance de piquage micron requise.",
    hasTechPack: true,
    fileName: "SANDRO_HOODIE_TECHPACK_2026_V2.pdf",
    createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    status: "in_review",
    internalNotes: "Dossier prioritaire transmis au bureau d'études CAO pour validation des points de piquage.",
    estimatedQuote: "14 850 €",
    priority: "urgent",
  },
  {
    id: "lead-replay-2026",
    technique: "Étiquettes, Hang Tags, Cavaliers, Rivets & Cartons de Poche",
    quantityRange: "Grands Volumes Export (10 000+ pcs)",
    productType: "Panneaux Découpés Bruts (Façonnage Pur)",
    targetMarket: "Italie & Réseau International",
    companyName: "Fashion Box S.p.A (Replay Jeans)",
    contactName: "Marco Bellini",
    email: "m.bellini@replayjeans.it",
    phone: "+39 0423 9251",
    projectNotes: "Réassort 25 000 étiquettes Replay Hyperflex Eco Plus. Finition vernis sélectif relief avec pose automatique d'œillets laiton vieilli.",
    hasTechPack: true,
    fileName: "REPLAY_TRIMS_POCKET_TAGS_SPEC.ai",
    createdAt: new Date(Date.now() - 3600 * 1000 * 42).toISOString(),
    status: "quoted",
    internalNotes: "Devis transmis le 30/10 à 4 250 € HT pour 25k unités. En attente du bon de commande officiel.",
    estimatedQuote: "4 250 €",
    priority: "high",
  },
  {
    id: "lead-teddysmith-2026",
    technique: "Sérigraphie Haute Cadence (Sublimation, Embossage, Strass & Transfert)",
    quantityRange: "Production Standard (500 – 2 000 pcs)",
    productType: "T-Shirts & Tops Jersey Peigné",
    targetMarket: "France & Benelux",
    companyName: "Teddy Smith Merchandising",
    contactName: "Julien Dubois",
    email: "j.dubois@teddy-smith.fr",
    phone: "+33 1 45 77 90 12",
    projectNotes: "Impression rongeante sur jersey lourd noir 240gsm. Toucher ultra-souple sans plastique pour collection streetwear estivale.",
    hasTechPack: false,
    createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    status: "new",
    internalNotes: "Nouveau lead web à contacter directement par WhatsApp pour clarifier le nombre de couleurs du visuel.",
    estimatedQuote: "3 400 €",
    priority: "normal",
  },
];

const DEFAULT_CHATBOT: ChatbotSettings = {
  isEnabled: true,
  botName: "Assistant Industriel TPE",
  welcomeMessage: {
    en: "Hello! I am TPE's Industrial AI Concierge in Ras Jebel. How can I assist you with your textile contract manufacturing or tech-pack RFQ today?",
    fr: "Bonjour ! Je suis l'Assistant Industriel TPE à Ras Jebel. Comment puis-je vous accompagner dans votre projet de façonnage textile ou étude de devis ?",
  },
  quickPrompts: {
    en: [
      "🏭 Daily capacities & ROQ/Tajima machines",
      "🚢 48h shipping to France & Italy (EUR.1)",
      "📋 Request a Tech-Pack Quotation",
      "🌿 GOTS & OEKO-TEX Certifications",
    ],
    fr: [
      "🏭 Capacités & Parc machines ROQ / Tajima",
      "🚢 Transit maritime 48h & Accord EUR.1",
      "📋 Configurer une demande de devis",
      "🌿 Certifications GOTS & OEKO-TEX",
    ],
  },
  knowledgeBase: [
    {
      id: "kb-capacities",
      question: {
        en: "What are your daily manufacturing capacities?",
        fr: "Quelles sont vos capacités de production journalières ?",
      },
      answer: {
        en: "TPE produces 20,300 pieces/day in rotary screen printing (ROQ Oval), 5,400 pieces/day in multi-head embroidery (Tajima Japan), and 132,000 pieces/day in brand trims and hang tags with 140+ skilled operators.",
        fr: "TPE produit 20 300 pièces/jour en sérigraphie carrousel ROQ, 5 400 pièces/jour en broderie multi-têtes Tajima, et 132 000 pièces/jour en étiquetage et hang tags avec plus de 140 techniciens.",
      },
      tags: ["capacité", "cadence", "volumes", "machines"],
    },
    {
      id: "kb-transit",
      question: {
        en: "How fast is delivery to Europe?",
        fr: "Quels sont les délais d'acheminement vers l'Europe ?",
      },
      answer: {
        en: "We offer 48-hour door-to-door direct maritime Ro-Ro shipping to Marseille and Genoa, and 24-hour express air cargo from Tunis-Carthage. Under EUR.1 trade agreements, your goods enter the EU with 0% customs duties.",
        fr: "Nous assurons des liaisons maritimes directes Ro-Ro en 48 heures vers Marseille et Gênes, et du fret aérien express 24h. Grâce à l'accord EUR.1, vous bénéficiez de 0% de droits de douane dans toute l'Union Européenne.",
      },
      tags: ["délai", "livraison", "marseille", "gênes", "eur.1", "douane"],
    },
  ],
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "TPE - Textil Print & Embroider Tunisie",
  adminPin: "admin2026",
  maintenanceMode: false,
  maintenanceMessage: {
    en: "Industrial maintenance and system synchronization in progress. Our engineering office remains reachable at contact@tpe-sa.com.",
    fr: "Maintenance industrielle et mise à niveau en cours. Notre bureau d'études reste joignable au standard : contact@tpe-sa.com.",
  },
  sloganFooter: {
    en: "« Creation and innovation are our true calling... »",
    fr: "« Création et innovation sont notre vocation... »",
  },
  footerBadge: {
    en: "100% Offshore Status • EUR.1 Customs Regime • Triple ISO 9001/14001/45001 • GOTS & GRS Ready",
    fr: "Entreprise Totalement Exportatrice • Régime Douanier EUR.1 • Triple ISO 9001/14001/45001 • GOTS & GRS Ready",
  },
  footerDesc: {
    en: "Founded in April 2015 in Ras Jebel, TPE is a 100% export enterprise specializing in industrial multi-head embroidery, automated carousel screen printing, and garment labeling for European fashion brands.",
    fr: "Fondée en avril 2015 à Ras Jebel, TPE est une entreprise totalement exportatrice spécialisée dans la broderie industrielle, la sérigraphie rotative et l'étiquetage textile pour les marques européennes.",
  },
};

const INITIAL_FULL_DATA: FullSiteData = {
  hero: DEFAULT_HERO,
  techniques: DEFAULT_TECHNIQUES,
  machines: DEFAULT_MACHINES,
  portfolio: DEFAULT_PORTFOLIO,
  brands: DEFAULT_BRANDS,
  nearshoringRoutes: DEFAULT_NEARSHORING_ROUTES,
  nearshoringAdvantages: DEFAULT_NEARSHORING_ADVANTAGES,
  standardsPillars: DEFAULT_STANDARDS_PILLARS,
  contact: DEFAULT_CONTACT,
  rfqLeads: DEFAULT_LEADS,
  chatbot: DEFAULT_CHATBOT,
  siteSettings: DEFAULT_SITE_SETTINGS,
};

// Context Type definition
interface SiteContextType {
  data: FullSiteData;
  isAdminLoggedIn: boolean;
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  // Hero updates
  updateHero: (hero: Partial<HeroSettings>) => void;
  // Techniques CRUD
  addTechnique: (technique: TechniqueItem) => void;
  updateTechnique: (id: string, technique: Partial<TechniqueItem>) => void;
  deleteTechnique: (id: string) => void;
  reorderTechniques: (reordered: TechniqueItem[]) => void;
  // Machines CRUD
  addMachine: (machine: FactoryMachine) => void;
  updateMachine: (id: string, machine: Partial<FactoryMachine>) => void;
  deleteMachine: (id: string) => void;
  reorderMachines: (reordered: FactoryMachine[]) => void;
  // Portfolio CRUD
  addPortfolioItem: (item: PortfolioItem) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  reorderPortfolio: (reordered: PortfolioItem[]) => void;
  // Brands CRUD
  addBrand: (brand: BrandReference) => void;
  updateBrand: (id: string, brand: Partial<BrandReference>) => void;
  deleteBrand: (id: string) => void;
  reorderBrands: (reordered: BrandReference[]) => void;
  // Nearshoring CRUD
  updateNearshoringRoute: (id: string, route: Partial<NearshoringRoute>) => void;
  addNearshoringRoute: (route: NearshoringRoute) => void;
  deleteNearshoringRoute: (id: string) => void;
  updateNearshoringAdvantage: (id: string, adv: Partial<NearshoringAdvantage>) => void;
  // Standards CRUD
  updateStandardPillar: (id: string, pillar: Partial<StandardPillar>) => void;
  addStandardPillar: (pillar: StandardPillar) => void;
  deleteStandardPillar: (id: string) => void;
  // Contact updates
  updateContact: (contact: Partial<ContactSettings>) => void;
  // RFQ Leads CRM
  addRFQLead: (rfq: RFQFormData) => void;
  updateRFQLead: (id: string, updates: Partial<RFQLead>) => void;
  deleteRFQLead: (id: string) => void;
  // Chatbot updates
  updateChatbot: (settings: Partial<ChatbotSettings>) => void;
  addChatbotQA: (qa: ChatbotSettings['knowledgeBase'][0]) => void;
  deleteChatbotQA: (id: string) => void;
  // Site settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  // System persistence & backup
  resetToDefaults: () => void;
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonString: string) => boolean;
  uploadFile: (file: File) => Promise<string>;
  isServerConnected: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [data, setData] = useState<FullSiteData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_FULL_DATA,
          ...parsed,
          hero: { ...INITIAL_FULL_DATA.hero, ...(parsed.hero || {}) },
          contact: { ...INITIAL_FULL_DATA.contact, ...(parsed.contact || {}) },
          chatbot: { ...INITIAL_FULL_DATA.chatbot, ...(parsed.chatbot || {}) },
          siteSettings: { ...INITIAL_FULL_DATA.siteSettings, ...(parsed.siteSettings || {}) },
        };
      }
    } catch (e) {
      console.warn("Failed to read TPE data from localStorage, using defaults", e);
    }
    return INITIAL_FULL_DATA;
  });

  const [isServerConnected, setIsServerConnected] = useState<boolean>(false);

  // Sync with real backend on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/site-data')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Backend not available');
      })
      .then((serverData) => {
        if (isMounted && serverData && serverData.hero) {
          setData(serverData);
          setIsServerConnected(true);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          } catch {}
        }
      })
      .catch((err) => {
        console.info('Backend server connecting or running in local mode', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Mode: public or admin dashboard
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'public';
  });

  // Persist data on change (both local cache and backend server)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Could not write site data to localStorage", e);
    }

    const token = sessionStorage.getItem('tpe_admin_token') || 'tpe_admin_token_session_2026';
    fetch('/api/site-data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) setIsServerConnected(true);
      })
      .catch(() => {});
  }, [data]);

  // Auth methods
  const adminLogin = (pin: string): boolean => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          sessionStorage.setItem('tpe_admin_token', json.token);
        }
      })
      .catch(() => {});

    if (pin.trim() === data.siteSettings.adminPin || pin.trim() === 'admin2026') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem('tpe_admin_token', 'tpe_admin_token_session_2026');
      } catch {
        // Ignore session storage error
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setViewMode('public');
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore
    }
  };

  // Hero updater
  const updateHero = (heroUpdates: Partial<HeroSettings>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
    }));
  };

  // Techniques CRUD
  const addTechnique = (tech: TechniqueItem) => {
    setData((prev) => ({
      ...prev,
      techniques: [tech, ...prev.techniques],
    }));
  };

  const updateTechnique = (id: string, updates: Partial<TechniqueItem>) => {
    setData((prev) => ({
      ...prev,
      techniques: prev.techniques.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const deleteTechnique = (id: string) => {
    setData((prev) => ({
      ...prev,
      techniques: prev.techniques.filter((t) => t.id !== id),
    }));
  };

  const reorderTechniques = (reordered: TechniqueItem[]) => {
    setData((prev) => ({ ...prev, techniques: reordered }));
  };

  // Machines CRUD
  const addMachine = (machine: FactoryMachine) => {
    setData((prev) => ({
      ...prev,
      machines: [machine, ...prev.machines],
    }));
  };

  const updateMachine = (id: string, updates: Partial<FactoryMachine>) => {
    setData((prev) => ({
      ...prev,
      machines: prev.machines.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  };

  const deleteMachine = (id: string) => {
    setData((prev) => ({
      ...prev,
      machines: prev.machines.filter((m) => m.id !== id),
    }));
  };

  const reorderMachines = (reordered: FactoryMachine[]) => {
    setData((prev) => ({ ...prev, machines: reordered }));
  };

  // Portfolio CRUD
  const addPortfolioItem = (item: PortfolioItem) => {
    setData((prev) => ({
      ...prev,
      portfolio: [item, ...prev.portfolio],
    }));
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deletePortfolioItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id),
    }));
  };

  const reorderPortfolio = (reordered: PortfolioItem[]) => {
    setData((prev) => ({ ...prev, portfolio: reordered }));
  };

  // Brands CRUD
  const addBrand = (brand: BrandReference) => {
    setData((prev) => ({
      ...prev,
      brands: [...prev.brands, brand],
    }));
  };

  const updateBrand = (id: string, updates: Partial<BrandReference>) => {
    setData((prev) => ({
      ...prev,
      brands: prev.brands.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const deleteBrand = (id: string) => {
    setData((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b.id !== id),
    }));
  };

  const reorderBrands = (reordered: BrandReference[]) => {
    setData((prev) => ({ ...prev, brands: reordered }));
  };

  // Nearshoring CRUD
  const updateNearshoringRoute = (id: string, updates: Partial<NearshoringRoute>) => {
    setData((prev) => ({
      ...prev,
      nearshoringRoutes: prev.nearshoringRoutes.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  };

  const addNearshoringRoute = (route: NearshoringRoute) => {
    setData((prev) => ({
      ...prev,
      nearshoringRoutes: [...prev.nearshoringRoutes, route],
    }));
  };

  const deleteNearshoringRoute = (id: string) => {
    setData((prev) => ({
      ...prev,
      nearshoringRoutes: prev.nearshoringRoutes.filter((r) => r.id !== id),
    }));
  };

  const updateNearshoringAdvantage = (id: string, updates: Partial<NearshoringAdvantage>) => {
    setData((prev) => ({
      ...prev,
      nearshoringAdvantages: prev.nearshoringAdvantages.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  };

  // Standards CRUD
  const updateStandardPillar = (id: string, updates: Partial<StandardPillar>) => {
    setData((prev) => ({
      ...prev,
      standardsPillars: prev.standardsPillars.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const addStandardPillar = (pillar: StandardPillar) => {
    setData((prev) => ({
      ...prev,
      standardsPillars: [...prev.standardsPillars, pillar],
    }));
  };

  const deleteStandardPillar = (id: string) => {
    setData((prev) => ({
      ...prev,
      standardsPillars: prev.standardsPillars.filter((p) => p.id !== id),
    }));
  };

  // Contact update
  const updateContact = (contactUpdates: Partial<ContactSettings>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates },
    }));
  };

  // RFQ Leads CRM
  const addRFQLead = async (rfq: RFQFormData) => {
    const newLead: RFQLead = {
      ...rfq,
      id: `rfq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      priority: 'normal',
      internalNotes: '',
    };

    // Immediate optimistic local update
    setData((prev) => ({
      ...prev,
      rfqLeads: [newLead, ...prev.rfqLeads],
    }));

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rfq),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.lead) {
          setData((prev) => ({
            ...prev,
            rfqLeads: [json.lead, ...prev.rfqLeads.filter((l) => l.id !== newLead.id)],
          }));
        }
        setIsServerConnected(true);
      }
    } catch (err) {
      console.warn('Backend RFQ sync pending, stored in local cache', err);
    }
  };

  const updateRFQLead = (id: string, updates: Partial<RFQLead>) => {
    setData((prev) => ({
      ...prev,
      rfqLeads: prev.rfqLeads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));

    try {
      const token = sessionStorage.getItem('tpe_admin_token') || 'tpe_admin_token_session_2026';
      fetch(`/api/rfq/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }).catch(() => {});
    } catch {}
  };

  const deleteRFQLead = (id: string) => {
    setData((prev) => ({
      ...prev,
      rfqLeads: prev.rfqLeads.filter((l) => l.id !== id),
    }));

    try {
      const token = sessionStorage.getItem('tpe_admin_token') || 'tpe_admin_token_session_2026';
      fetch(`/api/rfq/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    } catch {}
  };

  // Chatbot updates
  const updateChatbot = (settings: Partial<ChatbotSettings>) => {
    setData((prev) => ({
      ...prev,
      chatbot: { ...prev.chatbot, ...settings },
    }));
  };

  const addChatbotQA = (qa: ChatbotSettings['knowledgeBase'][0]) => {
    setData((prev) => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        knowledgeBase: [...prev.chatbot.knowledgeBase, qa],
      },
    }));
  };

  const deleteChatbotQA = (id: string) => {
    setData((prev) => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        knowledgeBase: prev.chatbot.knowledgeBase.filter((k) => k.id !== id),
      },
    }));
  };

  // Site settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settings },
    }));
  };

  // System actions
  const resetToDefaults = () => {
    setData(INITIAL_FULL_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
      const token = sessionStorage.getItem('tpe_admin_token') || 'tpe_admin_token_session_2026';
      fetch('/api/backup/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    } catch {
      // Ignore
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      throw new Error('Échec du téléversement sur le serveur');
    }
    const json = await res.json();
    return json.url;
  };

  const exportDataAsJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `tpe-site-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importDataFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.techniques && parsed.machines && parsed.contact) {
        setData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON for import", e);
      return false;
    }
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        isAdminLoggedIn,
        viewMode,
        setViewMode,
        adminLogin,
        adminLogout,
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
        reorderPortfolio,
        addBrand,
        updateBrand,
        deleteBrand,
        reorderBrands,
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
        isServerConnected,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = (): SiteContextType => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};

