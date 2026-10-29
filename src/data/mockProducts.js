// High quality local SVG product graphics generator (zero external network dependency)
function createSvgDataUri(title, category, color1, color2, iconType) {
  let iconSvg = '';
  switch (iconType) {
    case 'headphones':
      iconSvg = `
        <circle cx="100" cy="95" r="45" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
        <rect x="50" y="85" width="22" height="40" rx="10" fill="white" opacity="0.95"/>
        <rect x="128" y="85" width="22" height="40" rx="10" fill="white" opacity="0.95"/>
        <path d="M 72 105 Q 100 80 128 105" fill="none" stroke="white" stroke-width="4" opacity="0.4"/>
      `;
      break;
    case 'watch':
      iconSvg = `
        <rect x="75" y="30" width="50" height="140" rx="8" fill="white" opacity="0.4"/>
        <rect x="65" y="65" width="70" height="70" rx="20" fill="white" opacity="0.95"/>
        <circle cx="100" cy="100" r="26" fill="${color1}" opacity="0.85"/>
        <polyline points="100,85 100,100 112,100" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
      `;
      break;
    case 'laptop':
      iconSvg = `
        <rect x="45" y="60" width="110" height="70" rx="6" fill="white" opacity="0.95"/>
        <rect x="52" y="67" width="96" height="56" rx="3" fill="${color1}" opacity="0.75"/>
        <polygon points="35,134 165,134 175,142 25,142" fill="white" opacity="0.9"/>
        <rect x="90" y="136" width="20" height="3" rx="1.5" fill="${color1}"/>
      `;
      break;
    case 'keyboard':
      iconSvg = `
        <rect x="35" y="70" width="130" height="65" rx="10" fill="white" opacity="0.95"/>
        <rect x="45" y="80" width="15" height="10" rx="2" fill="${color1}"/>
        <rect x="65" y="80" width="15" height="10" rx="2" fill="${color1}"/>
        <rect x="85" y="80" width="15" height="10" rx="2" fill="${color1}"/>
        <rect x="105" y="80" width="15" height="10" rx="2" fill="${color1}"/>
        <rect x="125" y="80" width="30" height="10" rx="2" fill="${color1}"/>
        <rect x="45" y="96" width="20" height="10" rx="2" fill="${color1}"/>
        <rect x="70" y="96" width="60" height="10" rx="2" fill="${color1}"/>
        <rect x="135" y="96" width="20" height="10" rx="2" fill="${color1}"/>
      `;
      break;
    case 'camera':
      iconSvg = `
        <rect x="40" y="70" width="120" height="75" rx="14" fill="white" opacity="0.95"/>
        <circle cx="100" cy="108" r="28" fill="${color1}"/>
        <circle cx="100" cy="108" r="16" fill="white" opacity="0.9"/>
        <circle cx="138" cy="84" r="6" fill="${color1}" opacity="0.8"/>
        <rect x="75" y="56" width="35" height="14" rx="4" fill="white" opacity="0.9"/>
      `;
      break;
    case 'mouse':
      iconSvg = `
        <path d="M 70 70 C 70 45, 130 45, 130 70 L 130 120 C 130 150, 70 150, 70 120 Z" fill="white" opacity="0.95"/>
        <line x1="100" y1="48" x2="100" y2="85" stroke="${color1}" stroke-width="4"/>
        <rect x="96" y="65" width="8" height="16" rx="4" fill="${color2}"/>
      `;
      break;
    case 'flask':
      iconSvg = `
        <rect x="85" y="45" width="30" height="15" rx="3" fill="white" opacity="0.8"/>
        <rect x="70" y="60" width="60" height="105" rx="14" fill="white" opacity="0.95"/>
        <line x1="70" y1="90" x2="130" y2="90" stroke="${color1}" stroke-width="3" opacity="0.6"/>
        <line x1="70" y1="120" x2="130" y2="120" stroke="${color1}" stroke-width="3" opacity="0.6"/>
      `;
      break;
    case 'backpack':
      iconSvg = `
        <path d="M 60 70 C 60 45, 140 45, 140 70 L 145 145 C 145 155, 55 155, 55 145 Z" fill="white" opacity="0.95"/>
        <rect x="70" y="95" width="60" height="40" rx="8" fill="${color1}" opacity="0.85"/>
        <line x1="70" y1="110" x2="130" y2="110" stroke="white" stroke-width="3"/>
        <path d="M 80 45 L 80 35 C 80 30, 120 30, 120 35 L 120 45" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
      `;
      break;
    case 'speaker':
      iconSvg = `
        <rect x="65" y="45" width="70" height="115" rx="16" fill="white" opacity="0.95"/>
        <circle cx="100" cy="80" r="16" fill="${color1}"/>
        <circle cx="100" cy="122" r="22" fill="${color1}"/>
        <circle cx="100" cy="122" r="8" fill="white" opacity="0.7"/>
      `;
      break;
    case 'carabiner':
    default:
      iconSvg = `
        <path d="M 75 55 C 60 70, 60 130, 75 145 C 90 160, 125 155, 130 135 L 130 95 C 130 75, 120 50, 95 45 Z" fill="none" stroke="white" stroke-width="12" stroke-linejoin="round"/>
        <rect x="122" y="85" width="12" height="30" rx="4" fill="${color1}"/>
      `;
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </radialGradient>
    </defs>
    <rect width="200" height="200" rx="20" fill="url(#grad)" />
    <rect width="200" height="200" rx="20" fill="url(#glow)" />
    <g transform="translate(0, 0)">
      ${iconSvg}
    </g>
    <text x="100" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="white" opacity="0.75" text-anchor="middle" letter-spacing="1.5">${category.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'AeroPulse Wireless Noise-Canceling Headphones',
    category: 'Audio',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewsCount: 142,
    stock: 24,
    badge: 'Best Seller',
    featured: true,
    description: 'Immersive sound with 40mm beryllium drivers, active hybrid noise cancellation, and up to 45 hours of ultra-long battery life.',
    image: createSvgDataUri('AeroPulse Headphones', 'Audio', '#4f46e5', '#7c3aed', 'headphones'),
    specs: {
      battery: '45 Hours',
      connectivity: 'Bluetooth 5.3 + 3.5mm Aux',
      weight: '240g',
      color: 'Midnight Obsidian',
      warranty: {
        durationMonths: 24,
        type: 'Comprehensive Manufacturer Care'
      }
    }
  },
  {
    id: 'prod-002',
    name: 'Vanguard Chrono Smart Fitness Watch',
    category: 'Wearables',
    price: 149.50,
    originalPrice: 199.00,
    rating: 4.7,
    reviewsCount: 98,
    stock: 18,
    badge: 'Popular',
    featured: true,
    description: 'Aircraft-grade titanium bezel, 1.43-inch AMOLED display with always-on mode, ECG biometric monitoring, and 5ATM water resistance.',
    image: createSvgDataUri('Vanguard Chrono', 'Wearables', '#0284c7', '#06b6d4', 'watch'),
    specs: {
      battery: '14 Days Typical',
      connectivity: 'Bluetooth 5.2 LE',
      weight: '48g',
      color: 'Graphite Black',
      warranty: {
        durationMonths: 12,
        type: 'Standard Limited Warranty'
      }
    }
  },
  {
    id: 'prod-003',
    name: 'Zenith Pro 16 Ultrabook Laptop',
    category: 'Electronics',
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.9,
    reviewsCount: 64,
    stock: 9,
    badge: 'Editor Choice',
    featured: true,
    description: 'Next-gen octa-core silicon, 32GB LPDDR5X RAM, 1TB NVMe Gen4 SSD, and razor-sharp 3.2K 120Hz micro-edge OLED display.',
    image: createSvgDataUri('Zenith Pro 16', 'Electronics', '#0f172a', '#334155', 'laptop'),
    specs: {
      battery: '82Wh Up to 18 Hours',
      connectivity: 'Wi-Fi 7, Thunderbolt 4, HDMI 2.1',
      weight: '1.42kg',
      color: 'Space Gray',
      warranty: {
        durationMonths: 36,
        type: 'Pro Support Plus'
      }
    }
  },
  {
    id: 'prod-004',
    name: 'Lumik Keyforge Mechanical Keyboard',
    category: 'Electronics',
    price: 119.00,
    originalPrice: 139.00,
    rating: 4.6,
    reviewsCount: 83,
    stock: 31,
    badge: 'Hot Deal',
    featured: false,
    description: '75% gasket-mounted mechanical keyboard with hot-swappable tactile pre-lubed switches and sound-dampening acoustic foams.',
    image: createSvgDataUri('Lumik Keyforge', 'Electronics', '#ea580c', '#f59e0b', 'keyboard'),
    specs: {
      battery: '4000mAh Wireless',
      connectivity: 'Tri-Mode (Type-C, 2.4GHz, BT)',
      weight: '890g',
      color: 'Retro Chalk',
      warranty: {
        durationMonths: 12,
        type: 'Limited Hardware Care'
      }
    }
  },
  {
    id: 'prod-005',
    name: 'Titanium EDC Precision Carabiner Tool',
    category: 'Accessories',
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.5,
    reviewsCount: 39,
    stock: 55,
    badge: '',
    featured: false,
    description: 'CNC machined grade-5 titanium alloy with integrated bottle opener, pry bar, ruler, and stainless steel wire gate.',
    image: createSvgDataUri('EDC Carabiner', 'Accessories', '#475569', '#64748b', 'carabiner'),
    specs: {
      material: 'Grade-5 Ti-6Al-4V Titanium',
      dimensions: '78 x 35 x 4 mm',
      weight: '32g',
      color: 'Stonewashed Gray'
      // Note: warranty field deliberately undefined for testing / intentional bug BUG-11!
    }
  },
  {
    id: 'prod-006',
    name: 'HyperGlide Wireless Optical Gaming Mouse',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewsCount: 117,
    stock: 42,
    badge: 'Pro Grade',
    featured: false,
    description: 'Ultra-lightweight 54-gram honeycomb chassis, 26,000 DPI optical sensor, optical switches rated for 90 million clicks.',
    image: createSvgDataUri('HyperGlide Mouse', 'Electronics', '#16a34a', '#10b981', 'mouse'),
    specs: {
      battery: 'Up to 90 Hours Continuous',
      connectivity: '2.4GHz HyperSpeed + USB-C',
      weight: '54g',
      color: 'Ghost White',
      warranty: {
        durationMonths: 24,
        type: 'Replacement Guarantee'
      }
    }
  },
  {
    id: 'prod-007',
    name: 'Nomad Roll-Top Weatherproof Commuter Backpack',
    category: 'Accessories',
    price: 89.95,
    originalPrice: 115.00,
    rating: 4.7,
    reviewsCount: 76,
    stock: 22,
    badge: 'Durable',
    featured: false,
    description: '28-liter expandable weatherproof Cordura fabric with magnetic Fidlock buckle, hidden passport pocket, and suspended 16" laptop sleeve.',
    image: createSvgDataUri('Nomad Backpack', 'Accessories', '#0d9488', '#14b8a6', 'backpack'),
    specs: {
      capacity: '28 Liters (Expandable to 32L)',
      material: '1000D Recycled Cordura Ballistic Nylon',
      weight: '980g',
      color: 'Canyon Olive',
      warranty: {
        durationMonths: 36,
        type: 'Lifetime Workmanship Guarantee'
      }
    }
  },
  {
    id: 'prod-008',
    name: 'HydroShield Vacuum Insulated Flask 750ml',
    category: 'Accessories',
    price: 29.50,
    originalPrice: 38.00,
    rating: 4.6,
    reviewsCount: 52,
    stock: 63,
    badge: 'Eco Friendly',
    featured: false,
    description: 'Double-wall copper-plated vacuum insulation keeps drinks ice cold for 24 hours or steaming hot for 12 hours. Zero condensation.',
    image: createSvgDataUri('HydroShield Flask', 'Accessories', '#db2777', '#f43f5e', 'flask'),
    specs: {
      capacity: '750 ml (25.4 oz)',
      material: '18/8 Pro-Grade Stainless Steel',
      weight: '340g',
      color: 'Sunset Coral'
      // Note: warranty field deliberately undefined for testing / intentional bug BUG-11!
    }
  },
  {
    id: 'prod-009',
    name: 'Sonus Mini High-Fidelity 360 Bluetooth Speaker',
    category: 'Audio',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviewsCount: 91,
    stock: 35,
    badge: 'Outdoor Ready',
    featured: false,
    description: 'Omnidirectional acoustic soundstage with dual passive radiators, IPX7 submersible waterproof rating, and PartySync multi-link pairing.',
    image: createSvgDataUri('Sonus Mini', 'Audio', '#7c2d12', '#c2410c', 'speaker'),
    specs: {
      battery: '20 Hours Playback',
      connectivity: 'Bluetooth 5.3, TWS Pairing',
      weight: '490g',
      color: 'Terracotta Red',
      warranty: {
        durationMonths: 12,
        type: 'Manufacturer Care'
      }
    }
  },
  {
    id: 'prod-010',
    name: 'Apex 4K Creator Mirrorless Cinema Lens Kit',
    category: 'Electronics',
    price: 849.00,
    originalPrice: 999.00,
    rating: 4.9,
    reviewsCount: 44,
    stock: 7,
    badge: 'Creator Choice',
    featured: true,
    description: 'Ultra-fast f/1.4 aperture cinema prime kit with smooth step-less aperture ring, weather-sealed brass mount, and 8K resolve resolution.',
    image: createSvgDataUri('Apex Cinema Lens', 'Electronics', '#1e293b', '#475569', 'camera'),
    specs: {
      focalLength: '35mm / 85mm Prime Duo',
      aperture: 'f/1.4 - f/16',
      weight: '620g',
      color: 'Anodized Black',
      warranty: {
        durationMonths: 36,
        type: 'Full Camera Lens Care'
      }
    }
  },
  {
    id: 'prod-011',
    name: 'EchoPods Sport True Wireless Earbuds',
    category: 'Audio',
    price: 79.00,
    originalPrice: 109.00,
    rating: 4.5,
    reviewsCount: 88,
    stock: 48,
    badge: 'Sweat Proof',
    featured: false,
    description: 'Ergonomic secure ear hooks, IPX8 waterproof rating, ENC dual microphone clarity, and fast Qi wireless charging case.',
    image: createSvgDataUri('EchoPods Sport', 'Audio', '#2563eb', '#38bdf8', 'headphones'),
    specs: {
      battery: '8h + 32h with Case',
      connectivity: 'Bluetooth 5.3 Low Latency',
      weight: '5.2g per earbud',
      color: 'Electric Blue',
      warranty: {
        durationMonths: 12,
        type: 'Standard Replacement'
      }
    }
  },
  {
    id: 'prod-012',
    name: 'PulseTrack GPS Cardio Smart Band',
    category: 'Wearables',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewsCount: 65,
    stock: 39,
    badge: 'Value Pick',
    featured: false,
    description: 'Continuous heart rate tracking, built-in dual GPS for outdoor phone-free runs, sleep stage scoring, and water resistance up to 50m.',
    image: createSvgDataUri('PulseTrack Band', 'Wearables', '#059669', '#34d399', 'watch'),
    specs: {
      battery: '10 Days Regular Use',
      connectivity: 'Bluetooth 5.0 BLE',
      weight: '24g',
      color: 'Forest Green',
      warranty: {
        durationMonths: 12,
        type: 'Hardware Care'
      }
    }
  }
];

export const CATEGORIES = ['All', 'Audio', 'Electronics', 'Wearables', 'Accessories'];
