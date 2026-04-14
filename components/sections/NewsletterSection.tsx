'use client';

import React from 'react';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface NewsletterSectionProps {
  className?: string;
}

/**
 * NewsletterSection component for email subscription
 * 
 * Features:
 * - Centered layout with gradient background
 * - Compelling headline and subheading
 * - Email subscription form with validation
 * - Success/error message handling
 * - Privacy notice
 * - Fade-in animations
 * - Responsive design
 * 
 * Uses NewsletterForm component with:
 * - Email validation using Zod schema
 * - Loading states and success messages
 * - Form reset after successful submission
 * - Accessibility features
 * 
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <NewsletterSection />
 * ```
 * 
 * **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 2.5**
 */
export function NewsletterSection({ className }: NewsletterSectionProps) {
  return (
    <section
      id="newsletter"
      className={cn(
        'py-16 md:py-20 lg:py-24',
        'bg-gradient-to-br from-background-secondary via-background-primary to-background-secondary',
        'relative overflow-hidden',
        className
      )}
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background-secondary/90 via-background-primary/95 to-background-secondary/90" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 via-transparent to-primary-blue/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <FadeIn>
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                Stay Updated
              </h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Be the first to know about our latest events, exclusive offers, and industry insights. 
                Join our community of event enthusiasts across Qatar.
              </p>
            </div>
          </FadeIn>

          {/* Newsletter Form */}
          <FadeIn delay={200}>
            <div className="mb-8 md:mb-12">
              <NewsletterForm />
            </div>
          </FadeIn>

          {/* Benefits List */}
          <FadeIn delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-purple/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-purple"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Event Updates
                </h3>
                <p className="text-sm text-text-secondary">
                  Get notified about upcoming events and exclusive invitations
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Special Offers
                </h3>
                <p className="text-sm text-text-secondary">
                  Receive exclusive discounts and early bird pricing
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-gold/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Industry Insights
                </h3>
                <p className="text-sm text-text-secondary">
                  Learn about event trends and planning tips from our experts
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Additional CTA */}
          <FadeIn delay={600}>
            <div className="mt-12 md:mt-16">
              <p className="text-sm text-text-secondary mb-4">
                Join over 1,000+ event organizers who trust our expertise
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-text-secondary/70">
                <span>✓ No spam, ever</span>
                <span>✓ Unsubscribe anytime</span>
                <span>✓ Qatar-focused content</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}