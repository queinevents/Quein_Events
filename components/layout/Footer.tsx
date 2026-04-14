'use client';

import React from 'react';
import { COMPANY_INFO, CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

/**
 * Footer component displaying company information and links
 * 
 * Features:
 * - Company name and tagline
 * - Contact information (email, phone, address)
 * - Social media link placeholders
 * - Copyright notice
 * - Responsive layout (single column mobile, multi-column desktop)
 * - Dark theme styling with accent colors
 * - Hover effects on links
 * 
 * Uses company and contact information from constants:
 * - Company name: Quein Conference and Event Organization WLL
 * - Tagline: "Where Every Occasion Finds Its Grandeur"
 * - Contact details: email, phone, address in Doha Qatar
 * 
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <Footer />
 * ```
 * 
 * **Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5, 2.5**
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-background-secondary border-t border-text-secondary/10',
        'py-12 md:py-16 lg:py-20',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                {COMPANY_INFO.name}
              </h3>
              <p className="text-lg text-primary-purple font-medium">
                {COMPANY_INFO.tagline}
              </p>
            </div>
            
            <p className="text-text-secondary leading-relaxed max-w-md">
              Creating extraordinary experiences that honor tradition while embracing innovation. 
              Based in Doha, Qatar, we specialize in events that celebrate cultural richness 
              with international excellence.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#instagram"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'bg-text-secondary/10 hover:bg-primary-purple/20',
                  'flex items-center justify-center',
                  'text-text-secondary hover:text-primary-purple',
                  'transition-all duration-300',
                  'hover:scale-110'
                )}
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807s.105-.595.315-.807c.21-.21.49-.315.807-.315s.595.105.807.315c.21.21.315.49.315.807s-.105.595-.315.807c-.21.193-.49.315-.807.315z"/>
                </svg>
              </a>

              <a
                href="#linkedin"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'bg-text-secondary/10 hover:bg-primary-blue/20',
                  'flex items-center justify-center',
                  'text-text-secondary hover:text-primary-blue',
                  'transition-all duration-300',
                  'hover:scale-110'
                )}
                aria-label="Connect with us on LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="#facebook"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'bg-text-secondary/10 hover:bg-primary-gold/20',
                  'flex items-center justify-center',
                  'text-text-secondary hover:text-primary-gold',
                  'transition-all duration-300',
                  'hover:scale-110'
                )}
                aria-label="Like us on Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">
              Contact Info
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-purple mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-text-secondary hover:text-primary-purple transition-colors duration-300"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="text-text-secondary hover:text-primary-blue transition-colors duration-300"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-text-secondary">
                  {CONTACT_INFO.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">
              Quick Links
            </h4>
            
            <nav className="space-y-2">
              <a
                href="#services"
                className="block text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Our Services
              </a>
              <a
                href="#portfolio"
                className="block text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="block text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="#testimonials"
                className="block text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-text-secondary/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className="text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}