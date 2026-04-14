'use client';

import React from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  className?: string;
}

/**
 * AboutSection component - Enhanced with images and visual elements
 */
export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={cn(
        'py-16 md:py-20 lg:py-24',
        'bg-background-primary relative overflow-hidden',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-transparent to-primary-blue/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Image */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-card">
                {/* Using background image instead of Next Image for compatibility */}
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80)'
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/60 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary-purple text-white px-6 py-4 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm">Successful Events</div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-purple/10 text-primary-purple text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Based in Doha, Qatar
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                About {COMPANY_INFO.name}
              </h2>
              
              <p className="text-xl md:text-2xl text-primary-purple font-medium mb-6">
                {COMPANY_INFO.tagline}
              </p>

              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                At Quein Conference and Event Organization WLL, we believe that every occasion—whether 
                intimate or grand—deserves to be celebrated with distinction and cultural authenticity.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Based in the heart of Doha, Qatar, we specialize in creating extraordinary experiences 
                that honor tradition while embracing innovation.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={600}>
          <div className="text-center mt-16 md:mt-20">
            <p className="text-lg md:text-xl text-text-secondary mb-6">
              Ready to create something extraordinary together?
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4',
                'bg-primary-purple hover:bg-primary-purple/90',
                'text-white font-semibold text-lg',
                'rounded-lg',
                'transition-all duration-300',
                'hover:scale-105 hover:shadow-lg hover:shadow-primary-purple/25'
              )}
            >
              Let's Plan Your Event
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default AboutSection;
