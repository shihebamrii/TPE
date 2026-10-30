import type { FactoryMachine } from '../types';

export const factoryMachines: FactoryMachine[] = [
  {
    id: 'carrousel-serigraphie-roq',
    title: {
      en: 'ROQ Oval Pro Automatic Rotary Screen Printing Carousels',
      fr: 'Carrousels Automatiques de Sérigraphie ROQ Oval Pro'
    },
    type: {
      en: 'High-Speed Automated Industrial Carousels',
      fr: 'Lignes Sérigraphie Haute Cadence & Séchage Flash'
    },
    count: '20 300 pièces / jour',
    brand: 'ROQ International & Roqdry Eco',
    description: {
      en: 'High-speed automated industrial carousels with pneumatic squeegees, Roqdry Eco quartz flash curing modules, and micro-metric mechanical registration. Handles water-based inks, discharge, puff embossing, strass, and sublimation.',
      fr: 'Carrousels industriels haute cadence équipés de racles pneumatiques calibrées, sécheurs intermédiaires flash Roqdry Eco et repérage mécanique micrométrique. Prise en charge des encres à l\'eau, rongeant, embossage relief, strass et sublimation.'
    },
    specs: {
      en: [
        'Massive daily capacity: 20,300 pieces per day',
        'Up to 12 spot color stations with micro-alignment',
        'Continuous hot-air and infrared temperature-controlled tunnels',
        'Special finishes: Embossing, Sublimation, Strass, and Heat Transfer'
      ],
      fr: [
        'Capacité de production : 20 300 pièces / jour',
        'Jusqu\'à 12 couleurs indexées avec calage micrométrique',
        'Tunnels de séchage continu infrarouge et air chaud régulé',
        'Finitions : Embossage relief, Sublimation, Strass et Transfert thermique'
      ]
    },
    image: '/assets/showcase/machines/screenprint_roq_oval.jpg'
  },
  {
    id: 'parc-broderie-tajima',
    title: {
      en: 'Tajima & Barudan Japanese Multi-Head Industrial Embroidery Bays',
      fr: 'Bateaux de Broderie Industrielle Multi-Têtes Tajima & Barudan'
    },
    type: {
      en: 'Precision Japanese Multi-Head Embroidery Units',
      fr: 'Parc Haute Cadence Broderie Industrielle'
    },
    count: '5 400 pièces / jour',
    brand: 'Tajima & Barudan Japan',
    description: {
      en: 'High-precision Japanese multi-head bays operating up to 1,000 stitches per minute. Equipped with automated thread trimmers, reinforced needle bars for 3D puff foam, and optical laser crosshair positioning.',
      fr: 'Bateaux de broderie japonaise Tajima tournant jusqu\'à 1 000 points/min. Équipés de coupe-fils automatique, barres d\'aiguilles renforcées pour relief 3D sur mousse EVA et pointeurs optiques laser de centrage.'
    },
    specs: {
      en: [
        'Daily embroidery volume: 5,400 pieces per day',
        'High-speed operation up to 1,000 stitches / minute per head',
        'Direct embroidery on cut panels, finished hoodies, caps & denim',
        'Premium high-tensile Madeira and Gunold embroidery threads'
      ],
      fr: [
        'Capacité de production : 5 400 pièces brodées / jour',
        'Vitesse d\'exécution jusqu\'à 1 000 points / minute par tête',
        'Broderie directe sur panneaux coupés, sweats montés, casquettes et denim',
        'Fils techniques haute résistance Madeira et Gunold'
      ]
    },
    image: '/assets/showcase/machines/embroidery_tajima_bay.jpg'
  },
  {
    id: 'imprimante-aeon-kyo-digital',
    title: {
      en: 'Aeon Kyo Series Industrial Digital Direct-to-Garment Printer',
      fr: 'Imprimante Numérique Industrielle Aeon Kyo Series'
    },
    type: {
      en: 'High-Definition Industrial Textile Digital Flatbed',
      fr: 'Direct Textile Haute Définition & DTF'
    },
    count: 'Production Continue HD',
    brand: 'Aeon Kyo Series Technology',
    description: {
      en: 'State-of-the-art flatbed digital printer producing multi-color photorealistic graphics on garment pieces with zero screen setup costs. Used for luxury brand contracts including Pinko.',
      fr: 'Plateforme numérique industrielle dernière génération pour reproduction photographique directe sur pièces textiles. Zéro coût de cliché ou d\'écran, utilisée notamment pour les collections de la marque italienne Pinko.'
    },
    specs: {
      en: [
        'True continuous-tone photographic color gradient resolution',
        'Industrial printheads with wet-on-wet direct fabric injection',
        'Certified eco-friendly water-based pigment inks',
        'Zero setup cost for express capsule runs and sampling'
      ],
      fr: [
        'Résolution photographique continue pour dégradés subtils et ombrages',
        'Têtes piézoélectriques industrielles haute cadence',
        'Encres pigmentaires certifiées OEKO-TEX sans solvants toxiques',
        'Idéal pour collections capsules et prototypage immédiat 24h'
      ]
    },
    image: '/assets/showcase/machines/digital_aeon_kyo_pinko.jpg'
  },
  {
    id: 'ligne-etiquettes-faconnage',
    title: {
      en: 'Automated Flat Die-Cutter, 6-Head Label Collator & Rivet Punchers',
      fr: 'Découpe Automatique à Plat, Assembleuse 6 Têtes & Perforeuses'
    },
    type: {
      en: 'Integrated Labeling, Hang Tags & Packaging Production',
      fr: 'Ligne d\'Étiquetage, Hang Tags, Cavaliers & Packaging'
    },
    count: '132 000 pièces / jour',
    brand: 'Atelier Façonnage & Finition TPE',
    description: {
      en: 'Heavy-duty automatic flat die-cutting machine with suction feeder heads, combined with a 6-head collator with touchscreen control (straight and criss-cross stacking), and dual industrial punchers for metal eyelets and rivets.',
      fr: 'Machine entièrement automatique de découpe à plat avec margeur à têtes d\'aspiration, assembleuse de papier 6 têtes tactile avec empilage droit et croisé, et 2 perforeuses industrielles pour rivets et œillets métalliques.'
    },
    specs: {
      en: [
        'Massive labeling capacity: 132,000 pieces per day',
        '6-head collating station with straight & criss-cross stacking',
        'Two heavy-duty industrial punchers for brass and nickel rivets',
        'Pocket cards, cavaliers, care labels, and luxury hang tags'
      ],
      fr: [
        'Capacité record de 132 000 étiquettes et hang tags / jour',
        'Assembleuse 6 têtes d\'assemblage avec écran tactile',
        'Deux perforeuses pour pose de rivets et œillets métalliques',
        'Cartons de poche, cavaliers, étiquettes tissées et hang tags'
      ]
    },
    image: '/assets/showcase/products/hangtags_table_replay_teddy.jpg'
  },
  {
    id: 'laser-decoupe-etiquettes',
    title: {
      en: 'High-Precision Automated CNC Laser Cutting Station',
      fr: 'Station de Découpe Laser Industrielle CNC pour Vignettes'
    },
    type: {
      en: 'Thermal Edge-Sealing Laser Equipment',
      fr: 'Découpe Laser & Soudure Thermique Anti-Effilochage'
    },
    count: 'Cadence Haute Vitesse',
    brand: 'Système Laser Optique Intégré',
    description: {
      en: 'Automated laser cutting unit delivering micron precision contours for woven labels, patches, and badges. Automatically heat-seals fabric edges during cutting to prevent any fraying during garment assembly.',
      fr: 'Système de découpe laser automatisé garantissant des contours parfaits pour étiquettes tissées, écussons et badges. Soudure thermique instantanée des bords empêchant tout effilochage lors du piquage.'
    },
    specs: {
      en: [
        'Optical camera vision system for contour tracking',
        'Simultaneous thermal edge sealing eliminates frayed threads',
        'Handles micro-patches, collar labels, and complex silhouettes',
        'Extreme repeatability with zero blade wear'
      ],
      fr: [
        'Système optique de repérage automatique par caméra',
        'Soudure thermique simultanée des arêtes sans effilochage',
        'Prise en charge des micro-vignettes, cols et écussons complexes',
        'Répétabilité absolue sans usure mécanique de lame'
      ]
    },
    image: '/assets/showcase/machines/laser_cutting_labels.jpg'
  },
  {
    id: 'laboratoire-prepresse-cao',
    title: {
      en: 'CAD Workstations, Film Plotters & Vacuum UV Screen Darkroom',
      fr: 'Postes CAO, Traceurs de Films & Chambre Noire UV sous Vide'
    },
    type: {
      en: 'Pre-Press Laboratory & Screen Tensioning Workshop',
      fr: 'Laboratoire Pré-Presse & Tension Pneumatique'
    },
    count: 'Calibrage Millimétré',
    brand: 'Lectra, Gerber & UV Insolation Laboratory',
    description: {
      en: 'In-house technical office equipped with CAD graphic design and digitizing stations, high-resolution film plotters, pneumatic screen tensioning tables up to 120T, and vacuum UV exposure frames.',
      fr: 'Bureau technique intégré doté de postes CAO, traceurs de films haute résolution, tables de tension pneumatique de toiles jusqu\'à 120 fils/cm et insoleuse UV sous vide pour un calage micrométrique parfait.'
    },
    specs: {
      en: [
        'Specialized software for Tajima/Barudan embroidery digitizing',
        'Computer-to-film high density plotting for screen printing',
        'Pneumatic screen mesh tensioning with digital Newton gauges',
        'Rapid tech-pack feasibility audit under 24 hours'
      ],
      fr: [
        'Logiciels de piquage et numérisation de broderie Tajima/Barudan',
        'Traceurs haute densité pour tirage de films de sérigraphie',
        'Tension pneumatique des toiles avec tensiomètre numérique',
        'Audit de faisabilité tech-pack sous 24 heures'
      ]
    },
    image: '/assets/showcase/machines/cad_prepress_office.jpg'
  }
];
