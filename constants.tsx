
import { NavItem, Service, ProcessStep } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
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
