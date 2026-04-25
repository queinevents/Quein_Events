export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  capacity: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "private-events" | "exhibitions" | "conferences" | "marriage-events" | "other";
  imageUrl: string;
  description?: string;
  date?: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon?: string;
  animationDuration?: number;
}

export interface EventCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
  imageUrl?: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
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

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface ThemeColors {
  primary: {
    purple: string;
    blue: string;
    gold: string;
  };
  background: {
    dark: string;
    darker: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Component Props Interfaces
export interface NavigationProps {
  className?: string;
}

export interface HeroSectionProps {
  className?: string;
}

export interface ServicesSectionProps {
  className?: string;
}

export interface PortfolioSectionProps {
  className?: string;
}

export interface AboutSectionProps {
  className?: string;
}

export interface ContactFormProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right";
  delay?: number;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

// Form Data Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: "private-events" | "exhibitions" | "conferences" | "marriage-events" | "other";
  eventDate?: string;
  guestCount?: string;
  hearAboutUs?: string;
  message: string;
}
