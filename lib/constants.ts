import { Statistic, EventCategory, Testimonial, ExpertiseItem, TeamMember, GalleryItem } from "@/types";

export const BRAND_COLORS = {
  primary: {
    purple: "#F59E0B", // Changed to loading/gold color
    blue: "#3B82F6",   // Secondary color
    gold: "#F59E0B",   // Primary loading color
  },
  background: {
    dark: "#0A0A0A",
    darker: "#050505",
    card: "#1A1A1A",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#A0A0A0",
    accent: "#F59E0B", // Changed to primary loading color
  },
};

export const CONTACT_INFO = {
  email: "contact@queinevents.com",
  phone: "+974 51635552",
  whatsapp: "97451635552", // WhatsApp number without spaces or special characters
  address: "1st Floor, No:5, Building No:143, Street No:150, Zone:22, Doha, Qatar",
  socialMedia: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
  },
};

export const COMPANY_INFO = {
  name: "Quein Conference and Event Organization WLL",
  tagline: "Where Every Occasion Finds Its Grandeur",
  copyright: "© 2024 Quein Conference and Event Organization WLL. All rights reserved.",
};

/**
 * Official Quein Brand Content
 * Centralized brand content for consistent messaging across all sections
 * Content from official Quein Conference & Event Organization WLL blueprint
 */
export const QUEIN_BRAND = {
  companyName: "Quein Conference and Event Organization WLL",
  tagline: "Where Every Occasion Finds Its Grandeur",
  description: "Qatar's Most Trusted Event Management Company",
  location: "Doha, Qatar",
  
  hero: {
    headline: "Qatar's Most Trusted Event Management Company",
    tagline: "Where Every Occasion Finds Its Grandeur",
    subheading: "Private Events | Exhibitions | Conferences | Weddings | Doha, Qatar",
    ctaPrimary: "Explore Our Services",
    ctaSecondary: "Get a Free Quote",
  },
  
  // About Us Content (Official from Blueprint)
  about: {
    story: "Quein Conference and Event Organization WLL was founded with a singular belief: that the state of Qatar — a nation of global ambition, cultural richness, and extraordinary hospitality — deserves an event management company that matches its character in every way. We are a Doha-based, Qatari-registered company built on a foundation of passion, professionalism, and an intimate understanding of what it means to celebrate. From the very beginning, we have dedicated ourselves to mastering every dimension of event management — private gatherings, public exhibitions, corporate conferences, and the most sacred of all celebrations: the wedding day.",
    
    vision: "To be Qatar's most celebrated event management company — a name synonymous with flawless execution, creative excellence, and the kind of warmth and professionalism that transforms every occasion into a cherished memory for a lifetime.",
    
    mission: "To deliver end-to-end event management services of the highest standard — private events, exhibitions, conferences, and weddings — through creative design, meticulous planning, and a client-first approach that places your satisfaction above all else.",
    
    values: [
      {
        title: "Excellence",
        description: "We set the bar high and we clear it. Every time.",
      },
      {
        title: "Integrity",
        description: "Our word is our contract. We deliver what we promise, without exception.",
      },
      {
        title: "Creativity",
        description: "Every event begins with an idea. We make sure that idea is worth remembering.",
      },
      {
        title: "Client Centricity",
        description: "Your vision is our brief. We listen deeply before we design.",
      },
      {
        title: "Cultural Respect",
        description: "We honour the traditions, customs, and sensitivities that make each event unique.",
      },
      {
        title: "Precision",
        description: "From the first consultation to the final cleanup, every detail is managed with care.",
      },
      {
        title: "Passion",
        description: "We love what we do. And it shows in everything we create.",
      },
    ],
  },
  
  services: {
    privateEvents: {
      title: "Private Events",
      description: "From exclusive birthday celebrations and luxury corporate retreats to family milestones and VIP gatherings — we create personalised private experiences that feel effortlessly extraordinary.",
      capacity: "10-500+ guests",
      features: [
        "We create premium, bespoke private events defined by extraordinary live shows.",
        "VIP Birthday Celebrations & Milestone Events",
        "Luxury Family Gatherings & Private Dinners",
        "Corporate Private Retreats & Executive Functions",
        "National Day & Seasonal Celebrations",
        "Farewell & Welcome Parties",
        "Private Beach & Outdoor Events",
        "Anniversary Celebrations & Personal Milestones",
        "Themed Private Parties & Gala Evenings",
      ],
      icon: "/icons/private-events.svg",
      accentColor: "purple" as const,
      ctaText: "Plan My Private Event",
    },
    exhibitions: {
      title: "Exhibitions",
      description: "We design and manage world-class exhibition experiences — from product showcases and trade fairs to art expositions — with seamless logistics, stunning booth design, and maximum visitor engagement.",
      capacity: "100-10,000+ attendees",
      features: [
        "Trade Fair & Business Exhibition Management",
        "Product Launch Events & Brand Showcases",
        "Art Expositions & Cultural Exhibitions",
        "Government & Institutional Exhibitions",
        "Exhibition Booth Design & Construction",
        "Exhibition Space Layout & Traffic Flow Planning",
        "Full AV, Lighting & Multimedia Production",
        "Visitor Registration & Crowd Management",
        "Catering & Hospitality for Exhibition Visitors",
        "Post-Exhibition Reporting & Feedback Collection",
      ],
      icon: "/icons/exhibitions.svg",
      accentColor: "blue" as const,
      ctaText: "Plan My Exhibition",
    },
    conferences: {
      title: "Conferences",
      description: "Professional, polished, and powerfully organised. Our conference management services cover every detail from keynote staging and AV production to delegate registration and multi-session scheduling.",
      capacity: "50-5,000+ attendees",
      features: [
        "International Conferences & Global Summits",
        "Corporate Conferences & Annual General Meetings",
        "Government & Institutional Conferences",
        "Academic Conferences & Symposiums",
        "Panel Discussions & Roundtable Events",
        "Hybrid & Virtual Conference Integration",
        "Keynote Stage Design & Speaker Management",
        "Delegate Registration & Credential Systems",
        "Multi-Track Session Management",
        "Full AV, Interpretation & Simultaneous Translation Services",
        "Conference Branding & Signage Production",
        "Delegate Hospitality, Transportation & Accommodation Coordination",
        "Conference Photography & Videography",
        "Post-Conference Report & Feedback Management",
      ],
      icon: "/icons/conferences.svg",
      accentColor: "gold" as const,
      ctaText: "Plan My Conference",
    },
    marriageEvents: {
      title: "Marriage Events",
      description: "Your wedding day deserves nothing less than perfection. Our dedicated wedding team orchestrates every element — from floral design and venue dressing to entertainment and ceremony management — with cultural sensitivity and timeless grace.",
      capacity: "50-1,000+ guests",
      features: [
        "Traditional Qatari Wedding Planning & Management",
        "Arabic & Gulf Wedding Events",
        "Contemporary & International Weddings",
        "Multicultural & Cross-Cultural Wedding Celebrations",
        "Grand Ballroom Wedding Setup & Design",
        "Outdoor & Garden Wedding Events",
        "Complete Bridal & Groom Experience Coordination",
        "Floral Design, Décor & Theme Creation",
        "Wedding Lighting & AV Production",
        "Catering Management & Menu Curation",
        "Wedding Entertainment — Live Music, Nasheed, DJ, Performers",
        "Photography & Videography Coordination",
        "Bridal Party Logistics & On-Day Coordination",
        "Honeymoon Planning & Concierge Services",
        "Invitation Design & Guest Management",
      ],
      icon: "/icons/marriage-events.svg",
      accentColor: "purple" as const,
      ctaText: "Begin Wedding Planning",
    },
  },
};

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  // { id: "statistics", label: "Statistics", href: "#statistics" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  // { id: "event-categories", label: "Event Categories", href: "#event-categories" },
  // { id: "expertise", label: "Expertise", href: "#expertise" }, // Removed - not in blueprint
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  // { id: "differentiators", label: "Why Choose Us", href: "#differentiators" },
  // { id: "team", label: "Team", href: "#team" },
  // { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  // { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    id: "private-events",
    ...QUEIN_BRAND.services.privateEvents,
  },
  {
    id: "exhibitions",
    ...QUEIN_BRAND.services.exhibitions,
  },
  {
    id: "conferences",
    ...QUEIN_BRAND.services.conferences,
  },
  {
    id: "marriage-events",
    ...QUEIN_BRAND.services.marriageEvents,
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: "portfolio-1",
    title: "International Trade Exhibition",
    category: "exhibitions",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    description: "Large-scale trade exhibition with 200+ exhibitors",
  },
  {
    id: "portfolio-2",
    title: "Corporate Annual Conference",
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    description: "Multi-day corporate conference for 500+ attendees",
  },
  {
    id: "portfolio-3",
    title: "Luxury Wedding Celebration",
    category: "marriage-events",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    description: "Elegant wedding celebration with 300 guests",
  },
  {
    id: "portfolio-4",
    title: "Private Gala Dinner",
    category: "private-events",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    description: "Exclusive gala dinner for VIP guests",
  },
  {
    id: "portfolio-5",
    title: "Product Launch Event",
    category: "exhibitions",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    description: "High-profile product launch with media coverage",
  },
  {
    id: "portfolio-6",
    title: "Business Summit",
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    description: "International business summit with global delegates",
  },
  {
    id: "portfolio-7",
    title: "Traditional Qatari Wedding",
    category: "marriage-events",
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    description: "Traditional wedding with cultural elements",
  },
  {
    id: "portfolio-8",
    title: "VIP Birthday Celebration",
    category: "private-events",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    description: "Milestone birthday celebration for 150 guests",
  },
];

export const DIFFERENTIATORS = [
  {
    id: "end-to-end-management",
    title: "End-to-End Management",
    description: "We handle everything, so you handle nothing. Complete event lifecycle management from concept to execution.",
    icon: "/icons/management.svg",
  },
  {
    id: "tailored-concepts",
    title: "Tailored Concepts",
    description: "No two events are alike. Every concept is born from your unique vision and customized to your brand.",
    icon: "/icons/bespoke.svg",
  },
  {
    id: "premium-vendor-network",
    title: "Premium Vendor Network",
    description: "Exclusive relationships with Qatar's best venues, caterers, and AV professionals for unmatched quality.",
    icon: "/icons/network.svg",
  },
  {
    id: "bilingual-team",
    title: "Bilingual Team",
    description: "Fluent in English and Arabic, serving a diverse client base across Doha with seamless communication.",
    icon: "/icons/language.svg",
  },
  {
    id: "cultural-sensitivity",
    title: "Cultural Sensitivity",
    description: "Deep understanding of Qatari traditions and international event standards, honoring every custom with reverence.",
    icon: "/icons/culture.svg",
  },
  {
    id: "on-the-day-coordination",
    title: "On-the-Day Coordination",
    description: "A dedicated event director on-site from setup to the final farewell, ensuring flawless execution.",
    icon: "/icons/coordination.svg",
  },
  {
    id: "transparent-budgeting",
    title: "Transparent Budgeting",
    description: "No hidden costs. No surprises. Just honest, detailed proposals with clear pricing breakdowns.",
    icon: "/icons/budget.svg",
  },
];

/**
 * Statistics data for the Statistics Section
 * Displays key company metrics with animated counters
 * Official data from Quein blueprint
 */
export const STATISTICS: Statistic[] = [
  {
    id: "events-delivered",
    value: 200,
    suffix: "+",
    label: "Events Delivered",
    icon: "/icons/calendar-icon.svg",
    iconAlt: "Calendar icon representing events delivered",
    animationDuration: 2000,
  },
  {
    id: "client-satisfaction",
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: "/icons/star-icon.svg",
    iconAlt: "Star icon representing client satisfaction",
    animationDuration: 2500,
  },
  {
    id: "event-categories",
    value: 10,
    suffix: "+",
    label: "Event Categories",
    icon: "/icons/grid-icon.svg",
    iconAlt: "Grid icon representing event categories",
    animationDuration: 2000,
  },
];

/**
 * Event Categories data for the Event Categories Showcase Section
 * Displays different event types with visual examples
 * Requirements: 3.1, 17.2
 */
export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "concerts",
    title: "Concerts & Live Shows",
    description: "From intimate acoustic sessions to large-scale music festivals, we deliver unforgettable live entertainment experiences with world-class production.",
    imageUrl: "/images/categories/concerts.jpg",
    imageAlt: "Live concert with dramatic stage lighting and enthusiastic crowd",
    eventCount: 150,
    tags: ["Music", "Entertainment", "Live Performance"],
    featured: true,
  },
  {
    id: "exhibitions",
    title: "Exhibitions & Trade Shows",
    description: "Professional exhibition management with custom booth design, visitor engagement, and seamless logistics for trade shows and expos.",
    imageUrl: "/images/categories/exhibitions.jpg",
    imageAlt: "Modern exhibition booth with LED displays and vibrant lighting",
    eventCount: 320,
    tags: ["Business", "B2B", "Networking"],
  },
  {
    id: "conferences",
    title: "Conferences & Seminars",
    description: "Corporate conferences and seminars with cutting-edge AV technology, professional staging, and comprehensive event coordination.",
    imageUrl: "/images/categories/conferences.jpg",
    imageAlt: "Professional conference hall with stage and audience",
    eventCount: 280,
    tags: ["Corporate", "Professional", "Education"],
  },
  {
    id: "weddings",
    title: "Weddings & Celebrations",
    description: "Bespoke wedding planning and execution, creating magical moments with elegant décor, lighting, and flawless coordination.",
    imageUrl: "/images/categories/weddings.jpg",
    imageAlt: "Elegant wedding venue with floral arrangements and ambient lighting",
    eventCount: 450,
    tags: ["Luxury", "Private", "Celebration"],
  },
  {
    id: "festivals",
    title: "Festivals & Cultural Events",
    description: "Multi-day festivals and cultural celebrations with comprehensive production, vendor management, and crowd coordination.",
    imageUrl: "/images/categories/festivals.jpg",
    imageAlt: "Outdoor festival with stage, crowd, and colorful lighting",
    eventCount: 95,
    tags: ["Culture", "Community", "Entertainment"],
  },
];

/**
 * Testimonials data for the Testimonials Section
 * Client feedback with ratings and event types
 * Placeholder testimonials from Quein blueprint
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Sarah Al-Mansouri",
    clientRole: "Corporate Client",
    clientCompany: "Private Event",
    quote: "Quein transformed our corporate gala into an unforgettable experience. Every detail was perfect.",
    rating: 5,
    eventType: "Private Event",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    imageAlt: "Sarah Al-Mansouri, satisfied corporate client",
  },
  {
    id: "testimonial-2",
    clientName: "Ahmed Hassan",
    clientRole: "Corporate Client",
    clientCompany: "International Conference",
    quote: "Professional, responsive, and creative. Our conference exceeded all expectations.",
    rating: 5,
    eventType: "Conference",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    imageAlt: "Ahmed Hassan, satisfied conference client",
  },
  {
    id: "testimonial-3",
    clientName: "Fatima Al-Thani",
    clientRole: "Bride",
    clientCompany: "Traditional Qatari Wedding",
    quote: "They made our dream wedding a reality. The team's cultural sensitivity and attention to detail were exceptional.",
    rating: 5,
    eventType: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    imageAlt: "Fatima Al-Thani, satisfied wedding client",
  },
];

/**
 * Expertise Items data for the Detailed Expertise Section
 * Showcases specific services with icons, features, and images
 * TODO: Determine if this section is needed for Quein blueprint
 */
// export const EXPERTISE_ITEMS: ExpertiseItem[] = [
//   {
//     id: "audio-systems",
//     title: "Audio Systems",
//     description: "Professional sound engineering and audio solutions for events of all sizes. From intimate gatherings to large-scale concerts, we deliver crystal-clear sound quality with state-of-the-art equipment and expert technicians.",
//     icon: "/icons/audio.svg",
//     iconAlt: "Audio systems icon",
//     features: [
//       "Professional sound engineering",
//       "Line array speaker systems",
//       "Wireless microphone systems",
//       "Digital mixing consoles",
//       "Acoustic treatment and optimization",
//       "Live sound monitoring",
//     ],
//     imageUrl: "/images/expertise/audio-systems.jpg",
//     imageAlt: "Professional audio equipment and sound system at event venue",
//   },
//   {
//     id: "lighting-design",
//     title: "Lighting Design",
//     description: "Creative lighting solutions that transform spaces and create unforgettable atmospheres. Our expert designers craft custom lighting schemes that enhance your event's mood, highlight key elements, and captivate your audience.",
//     icon: "/icons/lighting.svg",
//     iconAlt: "Lighting design icon",
//     features: [
//       "Custom lighting design",
//       "Intelligent moving lights",
//       "LED wash and spot fixtures",
//       "Architectural lighting",
//       "DMX control systems",
//       "Atmospheric effects (fog, haze)",
//     ],
//     imageUrl: "/images/expertise/lighting-design.jpg",
//     imageAlt: "Dramatic stage lighting setup with vibrant purple and blue colors",
//   },
//   {
//     id: "led-screens",
//     title: "LED Screens",
//     description: "High-resolution LED display solutions for impactful visual presentations. From video walls to stage backdrops, our LED screens deliver stunning visuals that engage audiences and amplify your message with brilliant clarity.",
//     icon: "/icons/led-screen.svg",
//     iconAlt: "LED screens icon",
//     features: [
//       "High-resolution LED walls",
//       "Indoor and outdoor displays",
//       "Custom screen configurations",
//       "Video content management",
//       "Real-time graphics integration",
//       "Curved and creative shapes",
//     ],
//     imageUrl: "/images/expertise/led-screens.jpg",
//     imageAlt: "High-resolution LED display screens at event with vibrant content",
//   },
//   {
//     id: "stage-construction",
//     title: "Stage Construction",
//     description: "Custom stage builds tailored to your event's unique requirements. Our experienced team designs and constructs stages of all sizes, from intimate platforms to grand performance stages, ensuring safety, stability, and stunning aesthetics.",
//     icon: "/icons/stage.svg",
//     iconAlt: "Stage construction icon",
//     features: [
//       "Custom stage design",
//       "Modular staging systems",
//       "Elevated platforms",
//       "Stage skirting and dressing",
//       "Ramps and accessibility features",
//       "Weather-resistant outdoor stages",
//     ],
//     imageUrl: "/images/expertise/stage-construction.jpg",
//     imageAlt: "Custom stage build with professional lighting and truss system",
//   },
//   {
//     id: "truss-rigging",
//     title: "Truss & Rigging",
//     description: "Safe and reliable structural systems for suspending lighting, audio, and visual equipment. Our certified riggers ensure all installations meet strict safety standards while providing flexible configurations for any venue or event type.",
//     icon: "/icons/truss.svg",
//     iconAlt: "Truss and rigging icon",
//     features: [
//       "Certified rigging professionals",
//       "Aluminum truss systems",
//       "Ground support structures",
//       "Suspended rigging solutions",
//       "Load calculations and engineering",
//       "Safety inspections and compliance",
//     ],
//     imageUrl: "/images/expertise/truss-rigging.jpg",
//     imageAlt: "Professional rigging and truss system with dramatic lighting",
//   },
//   {
//     id: "av-contractor",
//     title: "AV Contractor",
//     description: "Complete audiovisual contracting services for seamless event production. We handle all technical aspects from planning to execution, coordinating equipment, crew, and logistics to deliver flawless AV experiences for your events.",
//     icon: "/icons/av-contractor.svg",
//     iconAlt: "AV contractor icon",
//     features: [
//       "Full AV project management",
//       "Equipment procurement and logistics",
//       "Technical crew coordination",
//       "Site surveys and planning",
//       "Installation and setup",
//       "On-site technical support",
//     ],
//     imageUrl: "/images/expertise/av-contractor.jpg",
//     imageAlt: "Complete audiovisual setup with multiple screens and lighting",
//   },
// ];

// Temporary empty array until decision is made on expertise section
export const EXPERTISE_ITEMS: ExpertiseItem[] = [];

/**
 * Team Members data for the Team/Founder Section
 * Displays team member profiles with flip cards
 * TODO: Replace with actual team member data from client
 */
// export const TEAM_MEMBERS: TeamMember[] = [
//   {
//     id: "founder-ceo",
//     name: "Noor Al-Kuwari",
//     role: "Founder & CEO",
//     bio: "15+ years of experience in luxury event management",
//     imageUrl: "/images/team/founder.jpg",
//     imageAlt: "Noor Al-Kuwari, Founder and CEO of Quein Events",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/noor-alkuwari",
//       email: "noor@queinevents.com",
//     },
//   },
//   {
//     id: "creative-director",
//     name: "Khalid Rahman",
//     role: "Creative Director",
//     bio: "Award-winning designer specializing in immersive experiences",
//     imageUrl: "/images/team/creative-director.jpg",
//     imageAlt: "Khalid Rahman, Creative Director at Quein Events",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/khalid-rahman",
//       email: "khalid@queinevents.com",
//     },
//   },
//   {
//     id: "operations-manager",
//     name: "Layla Ahmed",
//     role: "Operations Manager",
//     bio: "Expert in logistics and on-day coordination",
//     imageUrl: "/images/team/operations-manager.jpg",
//     imageAlt: "Layla Ahmed, Operations Manager at Quein Events",
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/layla-ahmed",
//       email: "layla@queinevents.com",
//     },
//   },
// ];

// Temporary empty array until real team data is provided
export const TEAM_MEMBERS: TeamMember[] = [];

/**
 * Gallery Items data for the Event Gallery/Timeline Section
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "International Tech Conference",
    date: "2024-01",
    category: "conferences",
    imageUrl: "/images/gallery/conference-01.jpg",
    imageAlt: "International tech conference with stage, lighting, and large audience",
    description: "Large-scale tech conference with 1000+ attendees",
  },
  {
    id: "gallery-2",
    title: "Luxury Wedding Reception",
    date: "2024-02",
    category: "weddings",
    imageUrl: "/images/gallery/wedding-01.jpg",
    imageAlt: "Luxury wedding reception with red and gold theme decoration",
    description: "Elegant wedding reception with luxury red and gold theme",
  },
  {
    id: "gallery-3",
    title: "Corporate Gala Dinner",
    date: "2023-11",
    category: "concerts",
    imageUrl: "/images/gallery/gala-01.jpg",
    imageAlt: "Corporate gala dinner with elegant table settings and stage lighting",
    description: "VIP gala dinner with elegant decor and stage lighting",
  },
  {
    id: "gallery-4",
    title: "Trade Exhibition Hall",
    date: "2024-01",
    category: "exhibitions",
    imageUrl: "/images/gallery/exhibition-01.jpg",
    imageAlt: "Trade exhibition hall with modern building space and displays",
    description: "Modern exhibition space with professional displays",
  },
  {
    id: "gallery-5",
    title: "Business Conference Summit",
    date: "2024-03",
    category: "conferences",
    imageUrl: "/images/gallery/conference-02.jpg",
    imageAlt: "International business conference with professional staging",
    description: "International business conference with expert speakers",
  },
  {
    id: "gallery-6",
    title: "Romantic Wedding Ceremony",
    date: "2024-01",
    category: "weddings",
    imageUrl: "/images/gallery/wedding-02.jpg",
    imageAlt: "Romantic wedding ceremony with candlelit aisle and elegant decor",
    description: "Romantic wedding ceremony with candlelit aisle",
  },
  {
    id: "gallery-7",
    title: "Social Event Photography",
    date: "2023-12",
    category: "concerts",
    imageUrl: "/images/gallery/party-01.jpg",
    imageAlt: "Social event with party atmosphere and professional photography",
    description: "Vibrant social event with professional photography coverage",
  },
  {
    id: "gallery-8",
    title: "Tech Conference & Events",
    date: "2024-02",
    category: "conferences",
    imageUrl: "/images/gallery/conference-03.jpg",
    imageAlt: "Technology conference with modern staging and attendee engagement",
    description: "Technology conference with modern staging and networking",
  },
];
