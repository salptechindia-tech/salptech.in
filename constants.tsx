import { NavItem, Service, ProcessStep } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Custom websites built with modern technologies like React, Next.js, and TypeScript.',
    icon: 'fa-code',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Complex SaaS products and internal tools designed for performance and scale.',
    icon: 'fa-laptop-code',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Full-featured online stores optimized for conversion and seamless user journeys.',
    icon: 'fa-shopping-cart',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User-centric designs that are visually stunning and highly functional.',
    icon: 'fa-bezier-curve',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: '24/7 support and updates to keep your digital products running smoothly.',
    icon: 'fa-tools',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, target audience, and market landscape.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Crafting a roadmap with clear milestones and defined technical architectures.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Creating high-fidelity wireframes and visual designs for your approval.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building your solution with clean, efficient, and scalable code.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deployment, optimization, and hand-off to ensure a successful start.',
  },
];

// ─── Businesses We Help Grow ──────────────────────────────────────────────────
// To add a new business: copy one entry, update all fields, and drop your image
// in /public/images/businesses/. Replace `image` with the correct path.
//
// IMAGE PROMPTS (generate one per business, ~800×600px, photorealistic):
//  gym          : "Modern Indian gym interior with fitness equipment, energetic lighting, people working out in the background, photorealistic"
//  pest-control : "Professional pest control technician in uniform spraying inside a clean modern Indian home, bright natural lighting, photorealistic"
//  clinic       : "Modern Indian medical clinic reception area with doctor and patient smiling, clean white interior, professional lighting, photorealistic"
//  salon        : "Stylish Indian hair salon interior with a stylist working on a client, warm lighting, modern decor, photorealistic"
//  restaurant   : "Vibrant Indian restaurant interior with wooden tables, warm ambient lighting, happy diners, photorealistic"
//  construction : "Indian construction site with workers in safety gear working on a modern building, golden hour lighting, photorealistic"
//  local-shop      : "Bright and organized Indian local retail shop with a smiling shopkeeper behind the counter, photorealistic"
//  academy         : "Vibrant Indian academy classroom with students learning music and arts, colourful instruments and artwork visible, warm lighting, photorealistic"
//  play-school     : "Cheerful and colourful Indian play school classroom with young children playing and learning, soft natural light, photorealistic"

export interface Business {
  id: string;
  name: string;
  icon: string;           // Font Awesome class e.g. 'fa-bug'
  image: string;          // Path e.g. '/images/businesses/pest-control.jpg'
  tagline: string;        // Short one-liner shown on the card
  accentColor: string;    // Tailwind text color class for icon
  accentBg: string;       // Tailwind bg color class for icon container
}

export const BUSINESSES: Business[] = [
  {
    id: 'gym',
    name: 'Gyms & Fitness',
    icon: 'fa-dumbbell',
    image: '/gym.webp',
    tagline: 'Attract members & grow your fitness brand',
    accentColor: 'text-red-600',
    accentBg: 'bg-red-50',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: 'fa-bug',
    image: '/pest.webp',
    tagline: 'Book more jobs with local SEO',
    accentColor: 'text-green-600',
    accentBg: 'bg-green-50',
  },
  {
    id: 'clinic',
    name: 'Clinics & Hospitals',
    icon: 'fa-stethoscope',
    image: '/clinic.webp',
    tagline: 'Attract patients & build trust online',
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-50',
  },
  {
    id: 'salon',
    name: 'Salons & Spas',
    icon: 'fa-scissors',
    image: '/saloon.webp',
    tagline: 'Fill your appointment calendar',
    accentColor: 'text-pink-600',
    accentBg: 'bg-pink-50',
  },
  {
    id: 'restaurant',
    name: 'Restaurants',
    icon: 'fa-utensils',
    image: '/restaurant.webp',
    tagline: 'Drive foot traffic & online orders',
    accentColor: 'text-orange-600',
    accentBg: 'bg-orange-50',
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: 'fa-helmet-safety',
    image: '/construction.webp',
    tagline: 'Win more contracts with a strong web presence',
    accentColor: 'text-yellow-700',
    accentBg: 'bg-yellow-50',
  },
  {
    id: 'local-shop',
    name: 'Super Markets',
    icon: 'fa-store',
    image: '/supermarket.webp',
    tagline: 'Stand out in your neighbourhood',
    accentColor: 'text-purple-600',
    accentBg: 'bg-purple-50',
  },
  {
    id: 'academy',
    name: 'Academies',
    icon: 'fa-graduation-cap',
    image: '/arts.webp',
    tagline: 'Music, arts & skill classes — fill every batch',
    accentColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
  },
  {
    id: 'play-school',
    name: 'Play Schools',
    icon: 'fa-children',
    image: '/playschool.webp',
    tagline: 'Build trust with parents & boost admissions',
    accentColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
  },
];

// ─── Our Work / Portfolio ─────────────────────────────────────────────────────
// To add a new project: copy one entry, fill in all fields, place your
// screenshot in /public/images/work/. One image per project.
//
// IMAGE PROMPTS (generate these as clean website screenshots / mockups, ~1200×800px):
//  pestfx    : "Clean professional pest control company website screenshot on a laptop mockup, modern design with green and white color scheme, showing homepage with hero section"
//  (add more prompts here as you add projects)

export interface Project {
  id: string;
  title: string;
  client: string;            // Business / client name
  category: string;          // e.g. 'Web Development'
  description: string;
  result: string;            // Key result / outcome line
  image: string;             // Path e.g. '/images/work/pestfx.jpg'
  tags: string[];            // Technology / service tags shown as chips
  liveUrl?: string;          // Optional live site link
}

export const PROJECTS: Project[] = [
  {
    id: 'pestfx',
    title: 'PestFX Website',
    client: 'PestFX Pest Control',
    category: 'Web Development',
    description:
      'Designed and developed a modern, mobile-first website for a local pest control company. Focused on fast load times, clear calls-to-action, and local SEO to drive inbound leads.',
    result: 'Increased customer inquiries significantly after launch 🚀',
    image: '/images/work/pestfx.jpg',
    tags: ['React', 'SEO', 'Local Business', 'Responsive'],
    liveUrl: '',   // ← paste the live URL here when available
  },
  // Add more projects below ↓
  // {
  //   id: 'project-id',
  //   title: 'Project Title',
  //   client: 'Client Name',
  //   category: 'Web Development',
  //   description: 'Project description...',
  //   result: 'Key outcome...',
  //   image: '/images/work/project.jpg',
  //   tags: ['Tag1', 'Tag2'],
  //   liveUrl: 'https://...',
  // },
];

// ─── Stats / Social Proof ─────────────────────────────────────────────────────
export const STATS = [
  { value: '5–7', label: 'Day Avg. Delivery' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Post-Launch Support' },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
// Add real testimonials here once you have them.
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string; // Path or initials fallback handled in the component
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ramesh Kumar',
    role: 'Owner',
    company: 'PestFX Pest Control',
    quote:
      'SalpTech delivered our website in under a week. The calls started coming in almost immediately. Best investment we made for our business.',
    avatar: '/images/testimonials/ramesh.jpg', // replace with real photo or leave as-is for initials
  },
  // Add more testimonials below ↓
];