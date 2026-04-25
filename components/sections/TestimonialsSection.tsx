'use client';

import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsSectionProps {
  className?: string;
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className={cn(
        'relative py-20 md:py-28 overflow-hidden',
        'bg-[#0A0A0A]',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Side - Testimonial Card */}
          <FadeIn>
            <div className="relative">
              {/* Testimonial Card */}
              <div className="bg-[#1A2A2A]/40 backdrop-blur-sm border border-primary-gold/20 rounded-2xl p-8 md:p-10 relative">
                {/* Large Quote Icon */}
                <div className="mb-6">
                  <svg className="w-12 h-12 text-primary-gold/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Content with Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                      &quot;{currentTestimonial.quote}&quot;
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-background-primary ring-2 ring-primary-gold/30">
                        <img
                          src={currentTestimonial.imageUrl}
                          alt={currentTestimonial.clientName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {currentTestimonial.clientName}
                        </h4>
                        <p className="text-primary-gold text-sm">
                          {currentTestimonial.clientRole}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex gap-2 mt-8">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        index === currentIndex
                          ? "bg-primary-gold w-8"
                          : "bg-white/20 w-4 hover:bg-white/40"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Side - CTA */}
          <FadeIn delay={200}>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Need Help With{' '}
                <span className="text-primary-gold">Professional</span>
                <br />
                <span className="text-primary-gold">Event Management?</span>
                <br />
                Let&apos;s Work Together!
              </h2>

              {/* Decorative dots and line */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                </div>
                <div className="w-16 h-0.5 bg-primary-gold" />
              </div>

              <p className="text-white/70 text-lg mb-8 max-w-xl">
                Transform your vision into an unforgettable reality. Our expert team is ready to create 
                extraordinary experiences that celebrate your unique occasion.
              </p>

              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold/90 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-gold/25"
              >
                Contact Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">200+</div>
                  <div className="text-sm text-white/60">Events</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-white/60">Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">10+</div>
                  <div className="text-sm text-white/60">Categories</div>
                </div>
              </div> */}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
