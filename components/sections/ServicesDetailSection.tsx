'use client';

import React from 'react';
import { SERVICES } from '@/lib/constants';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface ServicesDetailSectionProps {
  className?: string;
}

/**
 * ServicesDetailSection component displaying detailed service information
 * 
 * Features:
 * - Detailed service descriptions with images
 * - Feature lists for each service
 * - Alternating layout (image left/right)
 * - Call-to-action buttons
 * - Responsive design
 * 
 * @param className - Additional CSS classes
 */
export function ServicesDetailSection({ className }: ServicesDetailSectionProps) {
  // Free images from Unsplash for each service
  const serviceImages = {
    'private-events': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    'exhibitions': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'conferences': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'marriage-events': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  };

  return (
    <section
      id="services-details"
      className={cn(
        'py-16 md:py-20 lg:py-24',
        'bg-[#0F0F0F]',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-primary-gold text-sm font-medium tracking-wider uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Service <span className="text-primary-gold">Details</span>
            </h2>
            {/* Decorative dots and line */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-8">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
              </div>
              <div className="w-20 h-0.5 bg-primary-gold" />
            </div>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Discover how we bring your vision to life with meticulous planning, 
              creative excellence, and flawless execution
            </p>
          </div>
        </FadeIn>

        {/* Services Detail Cards */}
        <div className="space-y-20 md:space-y-32">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            const imageUrl = serviceImages[service.id as keyof typeof serviceImages];

            return (
              <FadeIn key={service.id} delay={200}>
                <div
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center',
                    !isEven && 'lg:grid-flow-dense'
                  )}
                >
                  {/* Image */}
                  <div className={cn('relative', !isEven && 'lg:col-start-2')}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-card">
                      {/* Using background image for compatibility */}
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${imageUrl})`
                        }}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 to-transparent" />
                      
                      {/* Capacity badge on image */}
                      <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-background-primary/90 backdrop-blur-sm border border-text-secondary/20">
                        <span className="text-text-primary font-medium">{service.capacity}</span>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div
                      className={cn(
                        'absolute -z-10 w-full h-full rounded-2xl',
                        'top-4 -right-4',
                        service.accentColor === 'purple' && 'bg-primary-purple/10',
                        service.accentColor === 'blue' && 'bg-primary-blue/10',
                        service.accentColor === 'gold' && 'bg-primary-gold/10'
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div className={cn(!isEven && 'lg:col-start-1 lg:row-start-1')}>
                    {/* Service Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <h4 className="text-lg font-semibold text-text-primary mb-4">
                        What We Offer:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div
                              className={cn(
                                'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                                service.accentColor === 'purple' && 'bg-primary-purple/20',
                                service.accentColor === 'blue' && 'bg-primary-blue/20',
                                service.accentColor === 'gold' && 'bg-primary-gold/20'
                              )}
                            >
                              <svg
                                className={cn(
                                  'w-3 h-3',
                                  service.accentColor === 'purple' && 'text-primary-purple',
                                  service.accentColor === 'blue' && 'text-primary-blue',
                                  service.accentColor === 'gold' && 'text-primary-gold'
                                )}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-text-secondary text-sm md:text-base">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={cn(
                        'inline-flex items-center gap-2 px-6 py-3',
                        'rounded-lg font-semibold',
                        'transition-all duration-300',
                        'hover:scale-105 hover:shadow-lg',
                        service.accentColor === 'purple' && 'bg-primary-purple hover:bg-primary-purple/90 hover:shadow-primary-purple/25',
                        service.accentColor === 'blue' && 'bg-primary-blue hover:bg-primary-blue/90 hover:shadow-primary-blue/25',
                        service.accentColor === 'gold' && 'bg-primary-gold hover:bg-primary-gold/90 hover:shadow-primary-gold/25',
                        'text-white'
                      )}
                    >
                      {service.ctaText}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}