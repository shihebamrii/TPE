import type { TechniqueItem } from '../types';

export const techniquesData: TechniqueItem[] = [
  {
    id: 'serigraphie-carrousel',
    category: 'screenprint',
    title: {
      en: 'High-Volume Rotary Screen Printing (Sublimation, Embossing, Strass)',
      fr: 'Sérigraphie Haute Cadence (Sublimation, Embossage, Strass & Transfert)'
    },
    subtitle: {
      en: '20,300 pieces daily capacity with automated carousels and quartz flash curing',
      fr: 'Capacité de 20 300 pièces / jour sur carrousels automatiques et séchage flash'
    },
    description: {
      en: 'Specialized in high-volume contract textile screen printing on cut panels and assembled garments. Complete mastery of water-based eco-inks, discharge (rongeant), high-density embossing, sublimation, strass rhinestones, and high-tenacity thermal transfers.',
      fr: 'Leader en sérigraphie industrielle sur pièces coupées et confections montées. Maîtrise exhaustive des encres à l\'eau écologiques, rongeant, embossage en relief, sublimation textile, pose de strass et transferts thermiques haute ténacité.'
    },
    highlights: {
      en: [
        'Capacity of 20,300 pieces per day across automatic carousels',
        'Specialty finishes: Embossing, Sublimation, Strass rhinestones & Foil',
        'Certified GOTS & OEKO-TEX compliant water-based formulation',
        'In-house UV exposure darkroom with precision 120T mesh tensioning'
      ],
      fr: [
        'Capacité industrielle de 20 300 pièces / jour sur carrousels automatiques ROQ',
        'Finitions de spécialités : Embossage relief, Sublimation, Strass et Foil',
        'Encres à l\'eau écologiques certifiées GOTS et OEKO-TEX sans phtalates',
        'Chambre noire d\'insolation UV intégrée avec tension pneumatique des toiles'
      ]
    },
    specs: {
      capacity: '20 300 pièces / jour',
      maxColorsOrHeads: 'Jusqu\'à 12 couleurs indexées',
      bestFor: {
        en: 'High-volume apparel collections, streetwear, corporate merchandising',
        fr: 'Grandes séries prêt-à-porter, streetwear, réassorts rapides Europe'
      },
      leadTimeSample: '48 Heures'
    },
    image: '/assets/showcase/machines/screenprint_roq_oval.jpg',
    macroImage: '/assets/showcase/machines/screenprint_roq_oval.jpg',
    badge: {
      en: '20,300 pcs / day',
      fr: '20 300 pcs / jour'
    }
  },
  {
    id: 'broderie-industrielle',
    category: 'embroidery',
    title: {
      en: 'Multi-Head Industrial Embroidery & 3D High Relief',
      fr: 'Broderie Industrielle Multi-Têtes & Relief 3D'
    },
    subtitle: {
      en: '5,400 pieces daily capacity on Japanese multi-head embroidery systems',
      fr: 'Capacité de 5 400 pièces / jour sur parc de brodeuses japonaises'
    },
    description: {
      en: 'Our Japanese multi-head embroidery fleet transforms Madeira and Gunold threads with micron precision. High-density 3D EVA foam embroidery, chain stitching, metallic lurex threads, and laser-contoured crests on any garment support.',
      fr: 'Notre parc de brodeuses industrielles multi-têtes façonne les fils haut de gamme Madeira et Gunold. Réalisation de broderies 3D en relief sur mousse EVA, broderie bouclette, fils métalliques lurex et écussons découpés laser.'
    },
    highlights: {
      en: [
        'Production capacity of 5,400 embroidered pieces per day',
        '3D foam relief up to 4mm with crisp edge retention after wash',
        'Direct embroidery on heavy fleece, denim, piqué polos, and caps',
        'Automatic thread trimming and laser optical alignment'
      ],
      fr: [
        'Capacité de production de 5 400 pièces brodées / jour',
        'Relief 3D sur mousse technique jusqu\'à 4 mm sans affaissement au lavage',
        'Broderie directe sur molleton lourd, denim, polos piqués et casquettes',
        'Coupe-fils automatique et repérage optique par pointeur laser'
      ]
    },
    specs: {
      capacity: '5 400 pièces / jour',
      maxColorsOrHeads: 'Jusqu\'à 15 couleurs par tête',
      bestFor: {
        en: 'Hoodies, polo crests, luxury outerwear, tactical badges, caps',
        fr: 'Sweats molleton, écussons polos, uniformes de travail, casquettes'
      },
      leadTimeSample: '48 Heures'
    },
    image: '/assets/showcase/machines/embroidery_tajima_bay.jpg',
    macroImage: '/assets/showcase/products/embroidery_macro_stitch.jpg',
    badge: {
      en: '5,400 pcs / day',
      fr: '5 400 pcs / jour'
    }
  },
  {
    id: 'etiquettes-vignettes-hangtags',
    category: 'finishing',
    title: {
      en: 'Garment Labeling, Hang Tags, Metal Rivets & Pocket Cards',
      fr: 'Étiquettes, Hang Tags, Cavaliers, Rivets & Cartons de Poche'
    },
    subtitle: {
      en: '132,000 pieces daily capacity - European fashion labeling market leader',
      fr: 'Capacité de 132 000 pièces / jour - Leader de l\'étiquetage export'
    },
    description: {
      en: 'Comprehensive labeling division producing luxury hang tags, pocket cards, woven brand vignettes, care labels, and cavaliers. Automated flat die-cutting, 6-head collator with touchscreen interface, and dual industrial punchers for brass and nickel rivets.',
      fr: 'Division étiquetage intégrée confectionnant hang tags haut de gamme, cartons de poche, étiquettes tissées, vignettes de composition et cavaliers. Découpe automatique à plat, assembleuse 6 têtes tactile et double perforeuses de rivets métalliques.'
    },
    highlights: {
      en: [
        'National leader in labeling: 132,000 pieces per day',
        'Automated flat die-cutter with vacuum feed & precision registration',
        '6-head collator with straight & criss-cross stacking programs',
        'Metal rivets, eyelets, wax cords, FSC recycled cardboard stocks'
      ],
      fr: [
        'Leader national de l\'étiquetage textile : 132 000 pièces / jour',
        'Découpe à plat automatisée avec margeur à têtes d\'aspiration',
        'Assembleuse de papier 6 têtes avec empilage droit et croisé tactile',
        'Pose de rivets, œillets métalliques, cordons cirés et cartons recyclés FSC'
      ]
    },
    specs: {
      capacity: '132 000 pièces / jour',
      maxColorsOrHeads: 'Découpe & assemblage 6 têtes',
      bestFor: {
        en: 'Denim jeans pocket flashers, retail hang tags, woven size vignettes',
        fr: 'Cartons de poche jeans denim, hang tags prêt-à-porter, cavaliers chaussettes'
      },
      leadTimeSample: '24-48 Heures'
    },
    image: '/assets/showcase/products/hangtags_table_replay_teddy.jpg',
    macroImage: '/assets/showcase/products/hangtags_tommy_mustang_wood.jpg',
    badge: {
      en: '132,000 pcs / day',
      fr: '132 000 pcs / jour'
    }
  },
  {
    id: 'impression-digitale-dtf',
    category: 'digital',
    title: {
      en: 'High-Definition Industrial Digital & DTF (Direct Transfer)',
      fr: 'Impression Numérique Industrielle & DTF Haute Définition'
    },
    subtitle: {
      en: 'Aeon Kyo Series digital flatbed printers for photo-realistic reproduction',
      fr: 'Imprimantes industrielles Aeon Kyo Series pour rendus photographiques'
    },
    description: {
      en: 'Latest generation Aeon Kyo Series digital printers reproducing multi-color photo gradients, micro-line contours, and complex artwork directly onto garment panels. Zero color-limitations with high wash stability.',
      fr: 'Dernière génération de machines Digital & DTF (Digital Transfert) Aeon Kyo. Reproduction photographique exacte, dégradés complexes, ombrages fins et contours ultra-précis sans aucune limite de couleurs.'
    },
    highlights: {
      en: [
        'Ultra-precise digital resolution reproducing photorealistic gradients',
        'Aeon Kyo industrial platform with wet-on-wet direct printing',
        'No plate or screen creation needed for express prototyping',
        'Eco-certified pigment inks with exceptional color vibrancy'
      ],
      fr: [
        'Résolution photographique ultra-précise avec fidélité absolue des dégradés',
        'Parc industriel Aeon Kyo direct textile et transfert DTF',
        'Zéro coût de cliché ou d\'écran pour prototypage immédiat',
        'Encres pigmentaires certifiées OEKO-TEX résistant aux cycles de lavage intensifs'
      ]
    },
    specs: {
      capacity: 'Cadence industrielle rapide',
      maxColorsOrHeads: 'Spectre CMJN + Blanc couvrant',
      bestFor: {
        en: 'Capsule collections, multi-color artistic graphics, express sampling',
        fr: 'Collections capsules, visuels artistiques complexes, prototypes rapides'
      },
      leadTimeSample: '24 Heures'
    },
    image: '/assets/showcase/machines/digital_aeon_kyo_pinko.jpg',
    macroImage: '/assets/showcase/machines/digital_aeon_kyo_operator.jpg',
    badge: {
      en: 'Digital & DTF',
      fr: 'Digital & DTF'
    }
  },
  {
    id: 'bureau-etudes-prepresse',
    category: 'cad',
    title: {
      en: 'CAD Design Studio, Grading & UV Pre-Press Darkroom',
      fr: 'Bureau d\'Études CAO, Patronage & Laboratoire Pré-Presse'
    },
    subtitle: {
      en: 'Computer-aided design, vector placement, and pneumatic frame tensioning',
      fr: 'Conception assistée par ordinateur, placement millimétré et insolation UV'
    },
    description: {
      en: 'Dedicated design studio equipped with Lectra, Gerber, and specialized embroidery digitizing suites. Integrated UV vacuum exposure darkroom, pneumatic silk mesh tensioning up to 120T, and laser plotters.',
      fr: 'Bureau d\'études intégré équipé des suites de numérisation de broderie et séparation de couleurs sérigraphie. Laboratoire d\'insolation UV sous vide, tables pneumatiques de tension de soie jusqu\'à 120 fils/cm et traceurs haute précision.'
    },
    highlights: {
      en: [
        'CAD digitizing for Tajima/Barudan multi-head embroidery',
        'Color separation and film plotting for tight screen registration',
        'Vacuum UV frame insolation room with tension inspection gauges',
        'Tech-pack analysis and feasibility validation under 24 hours'
      ],
      fr: [
        'Numérisation et piquage CAO pour parcs de broderie Tajima/Barudan',
        'Séparation chromatique et tirage de films pour repérage micrométrique',
        'Chambre d\'insolation UV sous vide avec contrôle pneumatique de tension',
        'Analyse de tech-packs et études de faisabilité sous 24 heures'
      ]
    },
    specs: {
      capacity: 'Études & Prototypage 24/48h',
      maxColorsOrHeads: 'Systèmes CAO & Traceurs HD',
      bestFor: {
        en: 'Designers, technical apparel managers, production directors',
        fr: 'Bureaux de style, chefs de produit et directeurs de production'
      },
      leadTimeSample: '24-48 Heures'
    },
    image: '/assets/showcase/machines/cad_prepress_office.jpg',
    macroImage: '/assets/showcase/machines/laser_cutting_labels.jpg',
    badge: {
      en: 'Bureau Technique',
      fr: 'Bureau Technique'
    }
  }
];
