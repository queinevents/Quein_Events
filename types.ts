/**
 * Type definitions for the Quein Event Website
 */

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  iconAlt: string;
  animationDuration: number;
}

export interface EventCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  eventCount: number;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  quote: string;
  rating: number;
  eventType: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  description?: string;
}
