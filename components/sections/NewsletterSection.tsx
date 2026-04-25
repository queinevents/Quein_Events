'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface NewsletterSectionProps {
  className?: string;
}

/**
 * NewsletterSection component - Artistic & Modern Design
 */
export function NewsletterSection({ className }: NewsletterSectionProps) {
  return (
    <section
      id="newsletter"
      className={cn(
        'py-20 md:py-28',
        'bg-[#0A0A0A] relative overflow-hidden',
        className
      )}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary-gold/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-primary-blue/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Artistic Header */}
          <FadeIn>
            <div className="relative text-center mb-16">
              {/* Large Background Text */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <h2 
                  className="text-[80px] md:text-[120px] lg:text-[160px] font-black leading-none select-none whitespace-nowrap"
                  style={{
                    WebkitTextStroke: '2px rgba(245, 158, 11, 0.08)',
                    color: 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  SUBSCRIBE
                </h2>
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 pt-12 md:pt-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-gold/10 text-primary-gold text-sm font-bold mb-6 border border-primary-gold/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Join Our Community
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  Stay <span className="text-primary-gold">Updated</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                >
                  Be the first to know about our latest events, exclusive offers, and industry insights. 
                  Join our community of event enthusiasts across Qatar.
                </motion.p>
              </div>
            </div>
          </FadeIn>

          {/* Newsletter Form with Artistic Container */}
          <FadeIn delay={200}>
            <div className="relative mb-16">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-primary-blue/20 to-primary-gold/20 rounded-3xl blur-2xl opacity-30" />
              
              {/* Form Container */}
              <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 rounded-3xl p-8 md:p-12">
                <NewsletterForm />
              </div>
            </div>
          </FadeIn>

          {/* Benefits Grid with Artistic Cards */}
          <FadeIn delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Event Updates',
                  description: 'Get notified about upcoming events and exclusive invitations',
                  color: 'gold',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  ),
                  title: 'Special Offers',
                  description: 'Receive exclusive discounts and early bird pricing',
                  color: 'blue',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: 'Industry Insights',
                  description: 'Learn about event trends and planning tips from our experts',
                  color: 'gold',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 hover:border-primary-gold/50 transition-all duration-300 hover:-translate-y-2">
                    {/* Icon */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
                      benefit.color === 'gold' ? 'bg-primary-gold/10 text-primary-gold' : 'bg-primary-blue/10 text-primary-blue'
                    )}>
                      {benefit.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-gold transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Bottom Accent */}
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300",
                      benefit.color === 'gold' 
                        ? 'bg-gradient-to-r from-transparent via-primary-gold/0 to-transparent group-hover:via-primary-gold/100' 
                        : 'bg-gradient-to-r from-transparent via-primary-blue/0 to-transparent group-hover:via-primary-blue/100'
                    )} />
                  </div>

                  {/* Floating Shadow */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10",
                    benefit.color === 'gold' ? 'bg-primary-gold/20' : 'bg-primary-blue/20'
                  )} />
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <FadeIn delay={600}>
            <div className="mt-16 text-center">
              <p className="text-white/60 text-lg mb-6">
                Join over <span className="text-primary-gold font-bold">1,000+</span> event organizers who trust our expertise
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Qatar-focused content</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}