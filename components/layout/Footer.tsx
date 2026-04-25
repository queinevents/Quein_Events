'use client';

import React from 'react';
import Image from 'next/image';
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
            {/* Full Logo */}
            <div className="mb-6">
              <Image
                src="/images/full_logo.png"
                alt="Quein Conference and Event Organization WLL Logo"
                width={200}
                height={80}
                className="h-[20px] md:h-[40px] w-auto object-contain"
              />
            </div>
            
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
                href="https://www.instagram.com/quein_events?igsh=MWc3NDFxaHZhb2t4YQ=="
                target="_blank"
                rel="noopener noreferrer"
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-text-primary">
              Contact Info
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-primary-purple mt-0.5 flex-shrink-0"
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
                  className="text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-primary-blue mt-0.5 flex-shrink-0"
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
                  className="text-sm text-text-secondary hover:text-primary-blue transition-colors duration-300"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-primary-gold mt-0.5 flex-shrink-0"
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
                <span className="text-sm text-text-secondary">
                  {CONTACT_INFO.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-text-primary">
              Quick Links
            </h4>
            
            <nav className="space-y-1.5">
              <a
                href="#services"
                className="block text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Our Services
              </a>
              <a
                href="#portfolio"
                className="block text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="block text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="#testimonials"
                className="block text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block text-sm text-text-secondary hover:text-primary-purple transition-colors duration-300"
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