// Content data structure for Al Salamah Transportation website
// This structure allows easy migration to backend/CMS later

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    logo: string;
    parentCompany: string;
  };
  contact: {
    headOffice: {
      city: string;
      address: string;
      phone: string;
      email: string;
      whatsapp: string;
    };
    socialMedia: {
      linkedin: string;
    };
  };
}

export interface Achievement {
  number: string;
  label: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Vehicle {
  type: string;
  description: string;
  count: string;
  image: string;
}

export interface TechFeature {
  name: string;
  description: string;
}

export interface Hub {
  city: string;
  status: string;
}

export interface Industry {
  name: string;
  description: string;
  icon: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  client: string;
  quote: string;
  author: string;
  position: string;
  company: string;
}

export const siteConfig: SiteConfig = {
  company: {
    name: "Al Salamah Transportation",
    tagline: "Driving Reliable Distribution Across Saudi Arabia & Beyond",
    logo: "/img/logo.png",
    parentCompany: "Part of Wazaran Group"
  },

  contact: {
    headOffice: {
      city: "Jeddah",
      address: "Jeddah, Kingdom of Saudi Arabia",
      phone: "+966 50 946 3389",
      email: "alsalamahtrans@sbtcgroup.com",
      whatsapp: "+966 50 946 3389"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/company/alsalamah"
    }
  }
};

export const homeContent = {
  // Part 1: Hero Section
  hero: {
    yearText: "IN 30 YEARS",
    mainTitle: "Driving Reliable Distribution",
    subtitle: "Across Saudi Arabia & Beyond",
    scrollText: "SCROLL DOWN"
  },

  // Part 2: Truck Reveal with Vision
  truckReveal: {
    title: "Our Vision",
    content: "For over 32 years, Al Salamah Transportation (AST) has been a trusted partner in the movement of goods and materials across Saudi Arabia and beyond. From nationwide distribution to specialized transportation solutions, AST combines a modern fleet, advanced logistics planning, and a customer- first approach to ensure that every delivery meets the highest standards of speed, reliability, and safety. With strategically located operational hubs and a team of highly trained professionals, AST supports industries from FMCG to industrial goods — serving both local businesses and multinational corporations. Our success is built on deep market knowledge, operational efficiency, and long- standing client relationships that stand the test of time.",
  },

// Part 3: Truck Rotation with 3 sections
truckRotation: {
  sections: [
    {
      number: "01",
      title: "VISION",
      subtitle: "To be the most trusted and innovative transportation partner in Saudi Arabia.",
      content: "Recognized for operational excellence, technological advancement, and an unwavering commitment to safety."
    },
    {
      number: "02",
      title: "MISSION", 
      subtitle: "To provide reliable transportation and distribution services.",
      content: "Empowering businesses, strengthen supply chains, and connect communities across Saudi Arabia and the region — delivering on time, every time."
    },
    {
      number: "03",
      title: "COMMITMENT",
      subtitle: "Reliability and safety are more than promises — they are our operating principles.",
      content: "We invest in a well-maintained, modern fleet equipped with real-time tracking technology, ensuring predictable delivery schedules and transparent communication."
    }
  ],
  stats: [
    { number: "30+", label: "Years of Experience" },
    { number: "500+", label: "Satisfied Clients" },
    { number: "24/7", label: "Support Available" }
  ] as Achievement[]
},

partners: {
  title: "Trusted Partners",
    logos: [
      { name: "SBTC", logo: "/img/partners/sbtc-logo.png" },
      { name: "Indomie", logo: "/img/partners/indomie-logo.png" },
      { name: "DSB", logo: "/img/partners/dsb-logo.png" }
    ] as Partner[]
},

// Area Coverage sections
areaCoverage: {
  section1: {
    title: "AREA COVERAGE",
    subtitle: "Comprehensive Distribution Network",
    content: "Our extensive network spans across all major regions of Saudi Arabia, ensuring reliable delivery to every corner of the Kingdom.",
    regions: [
      {
        name: "WESTERN Region",
        branches: 6,
        subBranches: 2,
        color: "#FFB84D", // Orange
        coordinates: [21.4225, 39.8262] // Jeddah area
      },
      {
        name: "CENTRAL Region", 
        branches: 5,
        subBranches: 2,
        color: "#E6A8E6", // Pink
        coordinates: [24.7136, 46.6753] // Riyadh area
      },
      {
        name: "EASTERN Region",
        branches: 4,
        subBranches: 1,
        color: "#9F7FD1", // Purple
        coordinates: [26.4207, 50.0888] // Dammam area
      },
      {
        name: "SOUTHERN Region",
        branches: 4,
        subBranches: 2,
        color: "#B8860B", // Dark golden
        coordinates: [18.2465, 42.6516] // Southern region
      },
      {
        name: "NORTHERN Region",
        branches: 2,
        subBranches: 3,
        color: "#5FB3A3", // Teal
        coordinates: [29.9759, 41.0216] // Northern region
      }
    ],
    headquarters: {
      name: "JEDDAH",
      coordinates: [21.4858, 39.1925],
      color: "#FF0000" // Red
    }
  },
  section2: {
    title: "DISTRIBUTION NETWORK",
    subtitle: "Strategic Hub Locations",
    content: "Our strategically positioned hubs ensure optimal coverage and efficient distribution across the Kingdom's diverse landscape.",
    totalBranches: 21,
    totalSubBranches: 10,
    coverage: "100% Kingdom Coverage"
  }
}
};

export const aboutContent = {
  title: "About Al Salamah",

  companyProfile: {
    title: "Company Profile",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },

  mission: {
    title: "Our Mission",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },

  vision: {
    title: "Our Vision",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  commitment: {
    title: "Commitment to Reliability & Safety",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  }
};

export const servicesContent = {
  title: "Our Services",
  subtitle: "Comprehensive logistics solutions tailored to your needs",

  services: [
    {
      id: "cold-chain",
      title: "Cold Chain Transportation",
      description: "For perishables: mushrooms, tuna, ready-to-eat meals, and temperature-sensitive products",
      icon: "❄️",
      features: [
        "Temperature-controlled vehicles",
        "Real-time monitoring",
        "SFDA compliance",
        "24/7 tracking"
      ]
    },
    {
      id: "dry-goods",
      title: "Dry Goods Distribution",
      description: "FMCG, retail products, shelf-stable food items and general cargo",
      icon: "📦",
      features: [
        "Secure packaging",
        "Efficient routing",
        "Inventory management",
        "Flexible scheduling"
      ]
    },
    {
      id: "last-mile",
      title: "Last-Mile Delivery",
      description: "Retailers, horeca, institutional clients and final destination delivery",
      icon: "🚚",
      features: [
        "Urban delivery expertise",
        "Same-day options",
        "Proof of delivery",
        "Customer notifications"
      ]
    },
    {
      id: "fleet-leasing",
      title: "Fleet Leasing Services",
      description: "Vehicles with or without drivers for internal group use or external contract clients",
      icon: "🔑",
      features: [
        "Flexible lease terms",
        "Maintenance included",
        "Driver training",
        "Insurance coverage"
      ]
    }
  ] as Service[]
};

export const fleetContent = {
  title: "Fleet & Infrastructure",
  subtitle: "Modern vehicles and advanced technology for reliable transportation",

  vehicles: [
    {
      type: "Reefer Trucks",
      description: "Temperature-controlled vehicles for cold chain logistics",
      count: "50+",
      image: "/img/fleet/reefer-truck.jpg"
    },
    {
      type: "Box Vans",
      description: "Versatile cargo vehicles for dry goods distribution",
      count: "75+",
      image: "/img/fleet/box-van.jpg"
    },
    {
      type: "Long-Haul Trucks",
      description: "Heavy-duty vehicles for intercity transportation",
      count: "30+",
      image: "/img/fleet/long-haul.jpg"
    }
  ] as Vehicle[],

  technology: {
    title: "Advanced Technology",
    features: [
      {
        name: "Fleet Maintenance System",
        description: "Predictive maintenance for optimal vehicle performance"
      },
      {
        name: "GPS Tracking & Route Optimization",
        description: "Real-time tracking and intelligent route planning"
      },
      {
        name: "Cold Chain Monitoring",
        description: "Continuous temperature monitoring and alerts"
      }
    ] as TechFeature[]
  },

  hubs: {
    title: "Regional Hubs",
    locations: [
      { city: "Jeddah", status: "Operational" },
      { city: "Riyadh", status: "Operational" },
      { city: "Makkah", status: "Operational" },
      { city: "Dammam", status: "Operational" }
    ] as Hub[]
  }
};

export const industriesContent = {
  title: "Industries We Serve",
  subtitle: "Specialized solutions across diverse market sectors",

  industries: [
    {
      name: "FMCG Distribution",
      description: "Fast-moving consumer goods with rapid turnover requirements",
      icon: "🛒"
    },
    {
      name: "Food & Beverage",
      description: "Fresh and processed food products with strict quality standards",
      icon: "🍽️"
    },
    {
      name: "Catering & Institutional Clients",
      description: "Bulk food service for hotels, restaurants, and institutions",
      icon: "🏨"
    },
    {
      name: "Retail Chains & Supermarkets",
      description: "Multi-location distribution for retail operations",
      icon: "🏪"
    },
    {
      name: "Pharmaceutical & Sensitive Goods",
      description: "Temperature-sensitive medical and pharmaceutical products",
      icon: "⚕️"
    }
  ] as Industry[]
};

export const whyUsContent = {
  title: "Why Choose Al Salamah",
  subtitle: "Your trusted partner for reliable logistics solutions",

  advantages: [
    {
      title: "Proven Track Record",
      description: "Consistent delivery performance in critical logistics operations",
      icon: "✅"
    },
    {
      title: "In-House Logistics Team",
      description: "Dedicated team ensuring rapid dispatch and seamless operations",
      icon: "👥"
    },
    {
      title: "Warehousing Partners",
      description: "Seamless coordination with strategic warehousing facilities",
      icon: "🏭"
    },
    {
      title: "SFDA Compliance",
      description: "Full adherence to Saudi Food and Drug Authority protocols",
      icon: "🔒"
    },
    {
      title: "Growing Brand Trust",
      description: "Trusted by national brands for their logistics requirements",
      icon: "🤝"
    }
  ] as Advantage[]
};

export const testimonialsContent = {
  title: "Client Success Stories",
  subtitle: "Real experiences from our valued partners",

  testimonials: [
    {
      id: 1,
      client: "Major FMCG Company",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Al Salamah has been instrumental in our distribution success across Saudi Arabia.",
      author: "Mohammed Al-Ahmed",
      position: "Supply Chain Director",
      company: "Leading Consumer Goods Co."
    },
    {
      id: 2,
      client: "Restaurant Chain",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Their cold chain expertise ensures our ingredients arrive fresh every time.",
      author: "Sara Al-Mansouri",
      position: "Operations Manager",
      company: "Premium Restaurant Group"
    }
  ] as Testimonial[],

  caseStudy: {
    title: "Ramadan Delivery Scale-Up",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. During Ramadan 2024, we successfully scaled operations by 300% to meet increased demand.",
    results: [
      "300% increase in daily deliveries",
      "99.8% on-time delivery rate",
      "Zero temperature excursions",
      "100% customer satisfaction"
    ]
  }
};

export const footerContent = {
  quickLinks: [
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
    { name: "About", href: "#about" },
    { name: "Fleet", href: "#fleet" }
  ],

  legal: {
    copyright: "© 2025 Al Salamah Transportation",
    parentCompany: "Part of Wazaran Group"
  }
};