import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge
 * Handles conditional classes and resolves Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if user prefers reduced motion
 * Used to respect accessibility preferences for animations
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Formats a phone number for display
 * Example: "+974 1234 5678" or formats based on input
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format based on length
  if (cleaned.length === 0) return "";
  
  // International format with country code
  if (cleaned.startsWith("974") && cleaned.length >= 11) {
    return `+974 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  // Generic formatting for other numbers
  if (cleaned.length >= 8) {
    return cleaned.replace(/(\d{4})(\d{4})/, "$1 $2");
  }
  
  return phone;
}

/**
 * Formats an email address for display (lowercase)
 */
export function formatEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Smooth scroll to an element by ID
 * Used for navigation link clicks
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }
}

/**
 * Debounce function for performance optimization
 * Useful for scroll and resize event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
