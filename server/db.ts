import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { FullSiteData, RFQLead } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

// Baseline default data for initial seeding if database.json does not exist
export const DEFAULT_INITIAL_DATA: FullSiteData = {
  hero: {
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
  },
  techniques: [
    {
      id: "serigraphie-carrousel",
      category: "screenprint",
      title: {
        en: "High-Volume Rotary Screen Printing (Sublimation, Embossing, Strass)",
        fr: "Sérigraphie Haute Cadence (Sublimation, Embossage, Strass & Transfert)",
      },
      subtitle: {
        en: "20,300 pieces daily capacity with automated carousels and quartz flash curing",
        fr: "Capacité de 20 300 pièces / jour sur carrousels automatiques et séchage flash",
      },
      description: {
        en: "Specialized in high-volume contract textile screen printing on cut panels and assembled garments. Complete mastery of water-based eco-inks, discharge (rongeant), high-density embossing, sublimation, strass rhinestones, and high-tenacity thermal transfers.",
        fr: "Leader en sérigraphie industrielle sur pièces coupées et confections montées. Maîtrise exhaustive des encres à l'eau écologiques, rongeant, embossage en relief, sublimation textile, pose de strass et transferts thermiques haute ténacité.",
      },
      highlights: {
        en: [
          "Capacity of 20,300 pieces per day across automatic carousels",
          "Specialty finishes: Embossing, Sublimation, Strass rhinestones & Foil",
          "Certified GOTS & OEKO-TEX compliant water-based formulation",
          "In-house UV exposure darkroom with precision 120T mesh tensioning",
        ],
        fr: [
          "Capacité industrielle de 20 300 pièces / jour sur carrousels automatiques ROQ",
          "Finitions de spécialités : Embossage relief, Sublimation, Strass et Foil",
          "Encres à l'eau écologiques certifiées GOTS et OEKO-TEX sans phtalates",
          "Chambre noire d'insolation UV intégrée avec tension pneumatique des toiles",
        ],
      },
      specs: {
        capacity: "20 300 pièces / jour",
        maxColorsOrHeads: "Jusqu'à 12 couleurs indexées",
        bestFor: {
          en: "High-volume apparel collections, streetwear, corporate merchandising",
          fr: "Grandes séries prêt-à-porter, streetwear, réassorts rapides Europe",
        },
        leadTimeSample: "48 Heures",
      },
      image: "/assets/showcase/machines/screenprint_roq_oval.jpg",
      macroImage: "/client-assets/photos_1/image00005.jpeg",
      badge: {
        en: "20,300 pcs / day",
        fr: "20 300 pcs / jour",
      },
      shortName: "Sérigraphie",
      badgeCapacity: "20 300 pcs / jour",
      compactVolume: "20 300 /j",
      machinePhoto: "/assets/showcase/machines/screenprint_roq_oval.jpg",
      macroPhoto: "/client-assets/photos_1/image00005.jpeg",
      machineLabel: "Carrousel Automatique ROQ Ovale",
      macroLabel: "Impression Pigmentaire Haute Précision",
      colorAccent: "text-tpe-magenta border-tpe-magenta",
      cmykDot: "bg-tpe-magenta",
    },
    {
      id: "broderie-industrielle",
      category: "embroidery",
      title: {
        en: "Multi-Head Industrial Embroidery & 3D High Relief",
        fr: "Broderie Industrielle Multi-Têtes & Relief 3D",
      },
      subtitle: {
        en: "5,400 pieces daily capacity on Japanese multi-head embroidery systems",
        fr: "Capacité de 5 400 pièces / jour sur parc de brodeuses japonaises",
      },
      description: {
        en: "Our Japanese multi-head embroidery fleet transforms Madeira and Gunold threads with micron precision. High-density 3D EVA foam embroidery, chain stitching, metallic lurex threads, and laser-contoured crests on any garment support.",
        fr: "Notre parc de brodeuses industrielles multi-têtes façonne les fils haut de gamme Madeira et Gunold. Réalisation de broderies 3D en relief sur mousse EVA, broderie bouclette, fils métalliques lurex et écussons découpés laser.",
      },
      highlights: {
        en: [
          "Production capacity of 5,400 embroidered pieces per day",
          "3D foam relief up to 4mm with crisp edge retention after wash",
          "Direct embroidery on heavy fleece, denim, piqué polos, and caps",
          "Automatic thread trimming and laser optical alignment",
        ],
        fr: [
          "Capacité de production de 5 400 pièces brodées / jour",
          "Relief 3D sur mousse technique jusqu'à 4 mm sans affaissement au lavage",
          "Broderie directe sur molleton lourd, denim, polos piqués et casquettes",
          "Coupe-fils automatique et repérage optique par pointeur laser",
        ],
      },
      specs: {
        capacity: "5 400 pièces / jour",
        maxColorsOrHeads: "Jusqu'à 15 couleurs par tête",
        bestFor: {
          en: "Hoodies, polo crests, luxury outerwear, tactical badges, caps",
          fr: "Sweats molleton, écussons polos, uniformes de travail, casquettes",
        },
        leadTimeSample: "48 Heures",
      },
      image: "/assets/showcase/machines/embroidery_tajima_bay.jpg",
      macroImage: "/assets/showcase/products/embroidery_macro_stitch.jpg",
      badge: {
        en: "5,400 pcs / day",
        fr: "5 400 pcs / jour",
      },
      shortName: "Broderie",
      badgeCapacity: "5 400 pcs / jour",
      compactVolume: "5 400 /j",
      machinePhoto: "/assets/showcase/machines/embroidery_tajima_bay.jpg",
      macroPhoto: "/assets/showcase/products/embroidery_macro_stitch.jpg",
      machineLabel: "Parc Brodeuses Japonaises Tajima",
      macroLabel: "Point de Chaînette & Relief 3D 4mm",
      colorAccent: "text-tpe-cyan border-tpe-cyan",
      cmykDot: "bg-tpe-cyan",
    },
    {
      id: "etiquettes-vignettes-hangtags",
      category: "finishing",
      title: {
        en: "Garment Labeling, Hang Tags, Metal Rivets & Pocket Cards",
        fr: "Étiquettes, Hang Tags, Cavaliers, Rivets & Cartons de Poche",
      },
      subtitle: {
        en: "132,000 pieces daily capacity with automatic flat die-cutting and eyeletting",
        fr: "Capacité de 132 000 pièces / jour en découpe automatique à plat et rivetage",
      },
      description: {
        en: "Specialized industrial trim department producing luxury garment labels, woven necktags, pocket cards, printed and embossed hang tags with metallic rivets and brass eyelets for leading European denim and fashion brands.",
        fr: "Pôle spécialisé dans le façonnage d'étiquettes de marque, cavaliers, cartons de poche, hang tags imprimés et embossés avec pose automatique d'œillets et rivets en laiton.",
      },
      highlights: {
        en: [
          "Massive throughput of 132,000 pieces daily",
          "Automated collation, brass eyelet punch, and ribbon attachment",
          "Strict pantone matching and luxury UV varnish",
          "Official trim producer for Tommy Jeans, Mustang and Replay",
        ],
        fr: [
          "Capacité record de 132 000 pièces / jour",
          "Assemblage automatique 6 têtes avec pose d'œillets et rivets laiton",
          "Étalonnage Pantone certifié et vernis sélectif relief",
          "Fournisseur officiel des accessoires denim Tommy, Mustang et Replay",
        ],
      },
      specs: {
        capacity: "132 000 pièces / jour",
        maxColorsOrHeads: "Découpe & Piquage 6 têtes",
        bestFor: {
          en: "Denim collections, retail packaging, luxury hang tags, brand security trims",
          fr: "Collections jeans denim, conditionnement export, étiquetage de marque",
        },
        leadTimeSample: "24 Heures",
      },
      image: "/assets/showcase/products/hangtags_table_replay_teddy.jpg",
      macroImage: "/assets/showcase/products/hangtags_tommy_mustang_wood.jpg",
      badge: {
        en: "132,000 pcs / day",
        fr: "132 000 pcs / jour",
      },
      shortName: "Étiquetage",
      badgeCapacity: "132 000 pcs / jour",
      compactVolume: "132 000 /j",
      machinePhoto: "/assets/showcase/products/hangtags_table_replay_teddy.jpg",
      macroPhoto: "/assets/showcase/products/hangtags_tommy_mustang_wood.jpg",
      machineLabel: "Atelier Étiquetage & Cavaliers Replay/Teddy",
      macroLabel: "Hang Tags Tommy Hilfiger & Mustang Bois",
      colorAccent: "text-amber-600 border-amber-500",
      cmykDot: "bg-tpe-yellow",
    },
    {
      id: "impression-numerique-dtf",
      category: "digital",
      title: {
        en: "Direct-to-Garment (DTG) & Direct-to-Film (DTF) Industrial Printing",
        fr: "Impression Numérique Direct Textile (DTG) & DTF Haute Définition",
      },
      subtitle: {
        en: "Photographic high-resolution textile printing on Aeon Kyo systems",
        fr: "Résolution photographique 1200 dpi sur imprimante industrielle Aeon Kyo",
      },
      description: {
        en: "Industrial direct-to-garment printer Aeon Kyo configured for high-definition full-color prints on light and dark textiles, complex multi-color photorealistic artwork, and micro-gradients with zero hand-feel.",
        fr: "Imprimante industrielle direct textile Aeon Kyo dédiée aux tirages complexes quadrichromie haute définition, dégradés photographiques et petites séries de prestige avec encres pigmentaires écologiques.",
      },
      highlights: {
        en: [
          "Resolution up to 1200 x 1200 dpi photographic clarity",
          "Soft touch water-based certified pigment inks",
          "Production runs executed for luxury brand Pinko",
          "Fast turnarounds for prototypes and limited capsules",
        ],
        fr: [
          "Résolution photographique jusqu'à 1200 x 1200 dpi",
          "Toucher ultra-souple avec encres pigmentaires écologiques",
          "Ligne de production dédiée aux collections Pinko",
          "Réactivité absolue pour prototypes et séries capsules",
        ],
      },
      specs: {
        capacity: "Production Continue HD",
        maxColorsOrHeads: "CMYK + Double Blanc Piézo",
        bestFor: {
          en: "Artistic fashion garments, photo tees, limited drops, capsule collections",
          fr: "Visuels artistiques complexes, dégradés photos, capsules mode Pinko",
        },
        leadTimeSample: "24 Heures",
      },
      image: "/assets/showcase/machines/digital_aeon_kyo_pinko.jpg",
      macroImage: "/assets/showcase/machines/digital_aeon_kyo_operator.jpg",
      badge: {
        en: "Aeon Kyo Direct",
        fr: "Direct Textile HD",
      },
      shortName: "Digital & DTF",
      badgeCapacity: "Direct Textile",
      compactVolume: "Aeon Kyo",
      machinePhoto: "/assets/showcase/machines/digital_aeon_kyo_pinko.jpg",
      macroPhoto: "/assets/showcase/machines/digital_aeon_kyo_operator.jpg",
      machineLabel: "Aeon Kyo Direct Textile (Pinko)",
      macroLabel: "Station Tactile & Étalonnage Opérateur",
      colorAccent: "text-tpe-red border-tpe-red",
      cmykDot: "bg-tpe-red",
    },
    {
      id: "bureau-cao-prepresse",
      category: "cad",
      title: {
        en: "CAD Engineering Studio, Laser Cutting & UV Screen Room",
        fr: "Bureau d'Études CAO, Découpe Laser & Insolation UV",
      },
      subtitle: {
        en: "Integrated pre-press studio with Lectra CAD software and pneumatic mesh tensioning",
        fr: "Bureau de méthode intégré, CAO Lectra, découpe optique laser et chambre noire UV",
      },
      description: {
        en: "Complete technical engineering office ensuring zero-defect manufacturing: Lectra CAD digitization, automatic embroidery punch programming, CNC laser contouring, and darkroom UV stencil exposure.",
        fr: "Bureau d'études intégré assurant la préparation rigoureuse de la production : numérisation vectorielle Lectra, programmation de piquage broderie, découpe laser au micron et insolation sous vide des cadres de sérigraphie.",
      },
      highlights: {
        en: [
          "Lectra & Gerber CAD workstations for pattern engineering",
          "Automated CNC laser cutting with optical CCD camera guidance",
          "Precision pneumatic screen stretchers calibrated in Newtons",
          "Vacuum computer-controlled UV exposure darkroom",
        ],
        fr: [
          "Postes CAO Lectra et logiciels de piquage broderie",
          "Découpeuse laser optique avec caméra CCD haute précision",
          "Table de tension pneumatique des toiles 120T contrôlée en Newtons",
          "Chambre noire d'insolation UV sous vide pour pochoirs ultra-nets",
        ],
      },
      specs: {
        capacity: "Flux Pré-Presse Continu",
        maxColorsOrHeads: "Lectra CAO & Laser CNC",
        bestFor: {
          en: "Tech-pack audits, punch programming, laser-cut badges, film separations",
          fr: "Audits tech-packs, programmation de piquage, écussons découpés laser",
        },
        leadTimeSample: "24 Heures",
      },
      image: "/assets/showcase/machines/cad_prepress_office.jpg",
      macroImage: "/assets/showcase/machines/laser_cutting_labels.jpg",
      badge: {
        en: "CAD & Laser Studio",
        fr: "Bureau CAO & Laser",
      },
      shortName: "Bureau CAO",
      badgeCapacity: "Études & UV",
      compactVolume: "Pre-Press",
      machinePhoto: "/assets/showcase/machines/cad_prepress_office.jpg",
      macroPhoto: "/assets/showcase/machines/laser_cutting_labels.jpg",
      machineLabel: "Bureau CAO, Lectra & Piquage",
      macroLabel: "Découpe Laser & Insolation UV Toiles",
      colorAccent: "text-slate-900 border-slate-900",
      cmykDot: "bg-slate-900",
    },
  ],
  machines: [
    {
      id: "carrousel-serigraphie-roq",
      title: {
        en: "ROQ Oval Pro Automatic Rotary Screen Printing Carousels",
        fr: "Carrousels Automatiques de Sérigraphie ROQ Oval Pro",
      },
      type: {
        en: "High-Speed Automated Industrial Carousels",
        fr: "Lignes Sérigraphie Haute Cadence & Séchage Flash",
      },
      count: "20 300 pièces / jour",
      brand: "ROQ International & Roqdry Eco",
      description: {
        en: "High-speed automated industrial carousels with pneumatic squeegees, Roqdry Eco quartz flash curing modules, and micro-metric mechanical registration.",
        fr: "Carrousels industriels haute cadence équipés de racles pneumatiques calibrées, sécheurs intermédiaires flash Roqdry Eco et repérage mécanique micrométrique.",
      },
      specs: {
        en: [
          "Massive daily capacity: 20,300 pieces per day",
          "Up to 12 spot color stations with micro-alignment",
          "Continuous hot-air and infrared temperature-controlled tunnels",
          "Special finishes: Embossing, Sublimation, Strass, and Heat Transfer",
        ],
        fr: [
          "Capacité de production : 20 300 pièces / jour",
          "Jusqu'à 12 couleurs indexées avec calage micrométrique",
          "Tunnels de séchage continu infrarouge et air chaud régulé",
          "Finitions : Embossage relief, Sublimation, Strass et Transfert thermique",
        ],
      },
      image: "/assets/showcase/machines/screenprint_roq_oval.jpg",
      stationNum: "01",
      zone: "PÔLE SÉRIGRAPHIE ROTATIVE",
      brandBadge: "ROQ INTERNATIONAL • PORTUGAL",
      capacityMetric: "20 300 pcs / jour",
      speedMetric: "Cadence automatique 900 pcs/h",
      precisionMetric: "Indexation ±0.02 mm (12 stations)",
      regulationMetric: "Séchage quartz flash Roqdry Eco",
      hotspots: [
        { x: 32, y: 42, label: "Racles Pneumatiques", desc: "Pression calibrée et angle constant pour dépôt uniforme des encres à l'eau" },
        { x: 68, y: 36, label: "Flash Roqdry Eco Quartz", desc: "Gélification ultra-rapide basse consommation entre chaque passe couleur" },
        { x: 48, y: 78, label: "Table Indexée 12 Postes", desc: "Repérage micrométrique continu pour superpositions complexes" },
      ],
    },
    {
      id: "parc-broderie-tajima",
      title: {
        en: "Tajima & Barudan Japanese Multi-Head Industrial Embroidery Bays",
        fr: "Bateaux de Broderie Industrielle Multi-Têtes Tajima & Barudan",
      },
      type: {
        en: "Precision Japanese Multi-Head Embroidery Units",
        fr: "Parc Haute Cadence Broderie Industrielle",
      },
      count: "5 400 pièces / jour",
      brand: "Tajima & Barudan Japan",
      description: {
        en: "High-precision Japanese multi-head bays operating up to 1,000 stitches per minute with automated thread trimmers and 3D puff needles.",
        fr: "Bateaux de broderie japonaise Tajima tournant jusqu'à 1 000 points/min. Équipés de coupe-fils automatique et barres d'aiguilles renforcées pour relief 3D.",
      },
      specs: {
        en: [
          "Daily embroidery volume: 5,400 pieces per day",
          "High-speed operation up to 1,000 stitches / minute per head",
          "Direct embroidery on cut panels, finished hoodies, caps & denim",
          "Premium high-tensile Madeira and Gunold embroidery threads",
        ],
        fr: [
          "Capacité de production : 5 400 pièces brodées / jour",
          "Vitesse de pointe jusqu'à 1 000 points / minute par tête",
          "Broderie sur pièces coupées, vêtements montés, casquettes et denim",
          "Fils haut de gamme certifiés Madeira et Gunold résistants au lavage",
        ],
      },
      image: "/assets/showcase/machines/embroidery_tajima_bay.jpg",
      stationNum: "02",
      zone: "BATEAUX BRODERIE MULTI-TÊTES",
      brandBadge: "TAJIMA & BARUDAN • JAPON",
      capacityMetric: "5 400 pcs / jour",
      speedMetric: "Jusqu'à 1 000 points / min / tête",
      precisionMetric: "Aiguilles haute résistance titane",
      regulationMetric: "Fils techniques Madeira & Gunold",
      hotspots: [
        { x: 42, y: 35, label: "Têtes Japonaises Tajima", desc: "Vitesse de pointe 1 000 pts/min avec coupe-fils automatique rasant" },
        { x: 62, y: 55, label: "Barres Spéciales Relief 3D", desc: "Maintien rigide pour piquage sur mousse EVA 4mm sans écrasement" },
        { x: 28, y: 68, label: "Pointeur Optique Laser", desc: "Centrage et alignement micrométrique sur panneaux coupés et pièces montées" },
      ],
    },
    {
      id: "imprimante-aeon-kyo-digital",
      title: {
        en: "Aeon Kyo Industrial Direct-to-Garment Printer (Pinko Series)",
        fr: "Imprimante Industrielle Direct Textile Aeon Kyo (Série Pinko)",
      },
      type: {
        en: "High-Definition Direct Digital Textile Printer",
        fr: "Impression Directe Numérique Textile & DTF",
      },
      count: "Direct Textile HD",
      brand: "Aeon Kyo Digital Systems",
      description: {
        en: "High-definition industrial inkjet printer running piezoelectric printheads with automated circulation to prevent nozzle clogging.",
        fr: "Imprimante à jet d'encre industriel haute définition dotée de têtes piézoélectriques à recirculation continue garantissant une fidélité couleur absolue.",
      },
      specs: {
        en: [
          "Photographic reproduction up to 1200 dpi",
          "Automated ink degassing and temperature-regulated platen",
          "Dedicated live production for Italian fashion label Pinko",
          "Certified safe chemistry compliant with OEKO-TEX Eco Passport",
        ],
        fr: [
          "Reproduction photographique jusqu'à 1200 dpi",
          "Dégazage automatisé des encres et plateau régulé en température",
          "Ligne active pour les séries de prêt-à-porter Pinko",
          "Encres à l'eau écologiques certifiées OEKO-TEX Eco Passport",
        ],
      },
      image: "/assets/showcase/machines/digital_aeon_kyo_pinko.jpg",
      stationNum: "03",
      zone: "IMPRESSION DIRECTE TEXTILE & DTF",
      brandBadge: "AEON KYO SERIES • TECHNOLOGIE",
      capacityMetric: "Direct Textile HD",
      speedMetric: "Injection piézoélectrique continue",
      precisionMetric: "Résolution photographique 1200 dpi",
      regulationMetric: "Encres pigmentaires certifiées OEKO-TEX",
      hotspots: [
        { x: 48, y: 38, label: "Têtes Piézoélectriques Industrielles", desc: "Gouttelettes microscopiques pour dégradés photographiques continus" },
        { x: 28, y: 52, label: "Encres Pigmentaires Écologiques", desc: "Formulation sans solvants résistant aux cycles de lavage intensifs" },
        { x: 72, y: 62, label: "Plateau d'Impression Numérique", desc: "Production en cours pour les collections de la marque Pinko" },
      ],
    },
    {
      id: "ligne-etiquettes-faconnage",
      title: {
        en: "Automated Trims, Eyeletting & Die-Cutting Finishing Plant",
        fr: "Ligne Automatisée d'Étiquetage, Pose d'Œillets & Cavaliers",
      },
      type: {
        en: "Automatic Collation, Punching & Riveting Fleet",
        fr: "Assembleuses 6 Têtes, Perforeuses & Riveteuses",
      },
      count: "132 000 pièces / jour",
      brand: "TPE Custom Engineering & Flat Die-Cutters",
      description: {
        en: "Dedicated trims finishing floor running flat die-cutters with vacuum feed, automated 6-station collation, and dual-head pneumatic eyeletting machines.",
        fr: "Division dédiée au conditionnement d'accessoires de marque : découpe automatique à plat, assembleuses 6 têtes et riveteuses pneumatiques.",
      },
      specs: {
        en: [
          "Extreme throughput of 132,000 labels / hang tags per day",
          "Automated brass and blackened copper rivet punching",
          "High-volume trim producer for Replay, Mustang, and Tommy Hilfiger",
          "Inline optical counter with batch strapping",
        ],
        fr: [
          "Cadence record de 132 000 étiquettes et hang tags par jour",
          "Sertissage automatique d'œillets en laiton vieilli et cuivre noirci",
          "Confectionneur agréé pour Replay, Mustang et Tommy Hilfiger",
          "Comptage optique unitaire et banderolage automatique",
        ],
      },
      image: "/assets/showcase/products/hangtags_table_replay_teddy.jpg",
      stationNum: "04",
      zone: "ÉTIQUETAGE, HANG TAGS & RIVETS",
      brandBadge: "DIVISION FAÇONNAGE TPE",
      capacityMetric: "132 000 pcs / jour",
      speedMetric: "Découpe automatique par aspiration",
      precisionMetric: "Assembleuse 6 têtes tactile",
      regulationMetric: "Double perforeuses rivets laiton/nickel",
      hotspots: [
        { x: 38, y: 44, label: "Assembleuse 6 Têtes Tactile", desc: "Empilage droit et croisé programmé pour liasses de cavaliers et hang tags" },
        { x: 72, y: 36, label: "Perforeuses Industrielles", desc: "Sertissage de rivets métalliques et œillets laiton pour denim et jeans" },
        { x: 52, y: 72, label: "Contrôle Qualité Export", desc: "Conditionnement sous scellé pour Replay, Teddy Smith et Tommy Hilfiger" },
      ],
    },
    {
      id: "laser-decoupe-etiquettes",
      title: {
        en: "High-Precision CNC Laser Cutting & Thermal Edge Sealing Units",
        fr: "Unités de Découpe Laser CNC & Soudure Thermique Anti-Effilochage",
      },
      type: {
        en: "Laser Optical Cutting Tables with CCD Cameras",
        fr: "Tables Découpe Laser Optique Guidée",
      },
      count: "Cadence Élevée",
      brand: "Laser CNC Opto-Electronic",
      description: {
        en: "Computerized CO2 laser cutting beds equipped with high-resolution CCD cameras for mark registration and simultaneous edge-sealing.",
        fr: "Tables laser CO2 robotisées avec caméras CCD pour repérage automatique des motifs et thermo-soudure instantanée des lisières synthétiques.",
      },
      specs: {
        en: [
          "Sub-millimeter cutting accuracy on woven badges and appliques",
          "Simultaneous thermal edge sealing preventing fraying during sewing",
          "Automatic recognition of distortion on elastic substrates",
          "Direct interface with CAD patterns and embroidery software",
        ],
        fr: [
          "Précision sub-millimétrique sur écussons tissés et découpes de cuir",
          "Soudure thermique simultanée empêchant tout effilochage au piquage",
          "Reconnaissance optique automatique des déformations des tissus",
          "Liaison directe avec les patrons CAO et programmes de broderie",
        ],
      },
      image: "/assets/showcase/machines/laser_cutting_labels.jpg",
      stationNum: "05",
      zone: "DÉCOUPE LASER & SOUDURE THERMIQUE",
      brandBadge: "SYSTÈME LASER CNC OPTIQUE",
      capacityMetric: "Cadence Haute Vitesse",
      speedMetric: "Faisceau laser CO2 haute précision",
      precisionMetric: "Guidage optique par caméra CCD",
      regulationMetric: "Soudure simultanée anti-effilochage",
      hotspots: [
        { x: 46, y: 40, label: "Faisceau Laser Micro-Focalisé", desc: "Découpe nette au micron des étiquettes tissées, écussons et badges" },
        { x: 66, y: 56, label: "Soudure Thermique Instantanée", desc: "Fusion thermique des lisières empêchant tout effilochage lors du piquage" },
        { x: 26, y: 66, label: "Système Caméra Optique", desc: "Reconnaissance automatique des repères et correction géométrique" },
      ],
    },
  ],
  portfolio: [
    {
      id: "portfolio-replay-tags",
      title: {
        en: "Replay Hyperflex Eco Plus Luxury Hang Tags & Pantone Swatches",
        fr: "Hang Tags Replay Hyperflex Eco Plus & Échantillonnage Pantone",
      },
      category: "badges",
      technique: {
        en: "Embossed Spot UV & Offset Print on Heavy Artboard",
        fr: "Vernis Sélectif Relief, Gaufrage & Impression Offset",
      },
      garment: {
        en: "Denim Collection Trims • Replay Jeans",
        fr: "Accessoires Denim • Replay Jeans Europe",
      },
      year: "Production TPE",
      image: "/assets/showcase/products/hangtags_replay_pantone.jpg",
      macroImage: "/assets/showcase/products/hangtags_table_replay_teddy.jpg",
      tags: ["Replay Jeans", "Vernis UV", "Pantone Matching", "Éco-Responsable"],
      description: {
        en: "Complete series of luxury hang tags, pocket cards, and cavaliers produced for Replay Hyperflex Eco Plus.",
        fr: "Série complète d'étiquettes de marque, cavaliers et cartes de poche pour Replay Hyperflex Eco Plus. Étalonnage rigoureux aux nuanciers Pantone.",
      },
    },
    {
      id: "portfolio-tommy-mustang",
      title: {
        en: "Tommy Jeans & Mustang True Denim Official Hang Tags",
        fr: "Hang Tags Officiels Tommy Jeans & Mustang True Denim",
      },
      category: "fashion",
      technique: {
        en: "Flat Die-Cut & Metallic Rivet Insertion (132,000 pcs/day)",
        fr: "Découpe Automatique à Plat & Pose de Rivets Métalliques",
      },
      garment: {
        en: "Mom Jeans & Denim Range • Tommy Jeans & Mustang",
        fr: "Gammes Denim & Mom Jeans • Tommy Jeans & Mustang",
      },
      year: "Production TPE",
      image: "/assets/showcase/products/hangtags_tommy_mustang_wood.jpg",
      macroImage: "/assets/showcase/products/hangtags_table_replay_teddy.jpg",
      tags: ["Tommy Jeans", "Mustang", "Teddy Smith", "Rivets Laiton"],
      description: {
        en: "Industrial packaging and hang tags produced on TPE flat die-cutting machines with automated vacuum feed.",
        fr: "Hang tags et cartons de poche confectionnés sur nos lignes de découpe automatique à plat avec rivets laiton.",
      },
    },
    {
      id: "portfolio-pinko-digital",
      title: {
        en: "Pinko Luxury Garment Panels on Aeon Kyo Digital Printer",
        fr: "Impression Direct Textile Panneaux Pinko sur Aeon Kyo",
      },
      category: "fashion",
      technique: {
        en: "High-Definition Industrial Direct-to-Garment Digital Print",
        fr: "Impression Directe Numérique Textile Quadrichromie HD",
      },
      garment: {
        en: "Silk & Cotton Capsule Panels • Pinko Italy",
        fr: "Panneaux Coton Peigné & Soie • Pinko Italie",
      },
      year: "Production TPE",
      image: "/assets/showcase/machines/digital_aeon_kyo_pinko.jpg",
      macroImage: "/assets/showcase/machines/digital_aeon_kyo_operator.jpg",
      tags: ["Pinko", "Direct Textile", "1200 dpi", "Encres Éco"],
      description: {
        en: "High-definition multi-color industrial digital textile prints executed on Aeon Kyo for Italian luxury label Pinko.",
        fr: "Impression numérique industrielle haute définition sur panneaux de coton pour la marque de mode italienne Pinko.",
      },
    },
  ],
  brands: [
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
  ],
  nearshoringRoutes: [
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
  ],
  nearshoringAdvantages: [
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
  ],
  standardsPillars: [
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
  ],
  contact: {
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
  },
  rfqLeads: [
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
  ],
  chatbot: {
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
  },
  siteSettings: {
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
  },
};

// In-memory cache for fast read/writes
let memoryData: FullSiteData | null = null;

export const initDatabase = (): FullSiteData => {
  // Ensure data and uploads directory exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Load from disk if exists, otherwise create with default seed
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryData = {
        ...DEFAULT_INITIAL_DATA,
        ...parsed,
        hero: { ...DEFAULT_INITIAL_DATA.hero, ...(parsed.hero || {}) },
        contact: { ...DEFAULT_INITIAL_DATA.contact, ...(parsed.contact || {}) },
        chatbot: { ...DEFAULT_INITIAL_DATA.chatbot, ...(parsed.chatbot || {}) },
        siteSettings: { ...DEFAULT_INITIAL_DATA.siteSettings, ...(parsed.siteSettings || {}) },
      };
      return memoryData;
    } catch (e) {
      console.error('Error parsing database.json, seeding defaults', e);
    }
  }

  memoryData = DEFAULT_INITIAL_DATA;
  saveDatabase(memoryData);
  return memoryData;
};

export const getDatabase = (): FullSiteData => {
  if (!memoryData) {
    return initDatabase();
  }
  return memoryData;
};

export const saveDatabase = (newData: FullSiteData): void => {
  memoryData = newData;
  const tempFile = `${DB_FILE}.tmp`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(newData, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to write database file', err);
  }
};

export const addLead = (lead: RFQLead): RFQLead => {
  const current = getDatabase();
  const updated = {
    ...current,
    rfqLeads: [lead, ...current.rfqLeads],
  };
  saveDatabase(updated);
  return lead;
};

export const updateLead = (id: string, updates: Partial<RFQLead>): RFQLead | null => {
  const current = getDatabase();
  let found: RFQLead | null = null;
  const updatedLeads = current.rfqLeads.map((l) => {
    if (l.id === id) {
      found = { ...l, ...updates };
      return found;
    }
    return l;
  });

  if (found) {
    saveDatabase({ ...current, rfqLeads: updatedLeads });
  }
  return found;
};

export const deleteLead = (id: string): boolean => {
  const current = getDatabase();
  const initialLen = current.rfqLeads.length;
  const filtered = current.rfqLeads.filter((l) => l.id !== id);
  if (filtered.length !== initialLen) {
    saveDatabase({ ...current, rfqLeads: filtered });
    return true;
  }
  return false;
};

