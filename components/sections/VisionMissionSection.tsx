'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations';

interface VisionMissionSectionProps {
  className?: string;
}

export default function VisionMissionSection({ className = '' }: VisionMissionSectionProps) {
  return (
    <section
      id="vision-mission"
      className={`relative py-20 md:py-28 overflow-hidden bg-[#0F0F0F] ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 via-transparent to-[#3B82F6]/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* MISSION SECTION */}
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <p className="text-primary-gold text-sm font-medium tracking-wider uppercase mb-3">
              Our Foundation
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-primary-gold">Mission</span>
            </h2>
            {/* Decorative dots and line */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
              </div>
              <div className="w-20 h-0.5 bg-primary-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-32 max-w-6xl mx-auto">
            {/* Left: Content */}
            <div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                To transform visions into unforgettable realities by delivering world-class event 
                management services that celebrate Qatar's cultural richness while meeting 
                international standards of excellence.
              </p>
              
              {/* Decorative Element */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-primary-gold" />
                <div className="w-2 h-2 rounded-full bg-primary-gold" />
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-background-card">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/images/gallery/conference-01.jpg)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary-gold text-black px-6 py-4 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm">Events Delivered</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* VISION SECTION */}
        <FadeIn delay={200}>
          <div className="text-center mb-16">
            <p className="text-primary-gold text-sm font-medium tracking-wider uppercase mb-3">
              Our Aspiration
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-primary-gold">Vision</span>
            </h2>
            {/* Decorative dots and line */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
              </div>
              <div className="w-20 h-0.5 bg-primary-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-32 max-w-6xl mx-auto">
            {/* Left: Image */}
            <div className="relative lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-background-card">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/images/gallery/gala-01.jpg)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#3B82F6] text-white px-6 py-4 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm">Client Satisfaction</div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:order-2">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                To be Qatar's premier event management company, recognized for our cultural 
                sensitivity, innovative approach, and unwavering commitment to creating occasions 
                that find their grandeur in every detail.
              </p>
              
              {/* Decorative Element */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-[#3B82F6]" />
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* TAGLINE SECTION - Artistic Design with Large Background Text */}
        <FadeIn delay={400}>
          <div className="mb-32">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white/5 leading-none mb-8">
                  GRANDEUR
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-white italic leading-relaxed mb-6">
                      "Where Every Occasion
                      <span className="block text-primary-gold">Finds Its Grandeur"</span>
                    </blockquote>
                    <div className="text-lg text-primary-gold/80 font-medium">
                      — Quein Conference & Event Organization WLL
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* CORE VALUES SECTION */}
        <FadeIn delay={600}>
          <div className="text-center mb-16">
            <p className="text-primary-gold text-sm font-medium tracking-wider uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Core <span className="text-primary-gold">Values</span>
            </h2>
            {/* Decorative dots and line */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
              </div>
              <div className="w-20 h-0.5 bg-primary-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Cultural Respect',
                description: 'We honor traditions, customs, and cultural sensitivities in every event we create.',
                color: 'primary'
              },
              {
                title: 'Excellence',
                description: 'We pursue perfection in every detail, from initial planning to final execution.',
                color: 'secondary'
              },
              {
                title: 'Partnership',
                description: 'We work closely with clients to understand their vision and bring it to life.',
                color: 'primary'
              },
              {
                title: 'Innovation',
                description: 'We embrace creativity and new ideas to deliver unique, memorable experiences.',
                color: 'secondary'
              },
              {
                title: 'Precision',
                description: 'From the first consultation to the final cleanup, every detail is managed with care.',
                color: 'primary'
              },
              {
                title: 'Passion',
                description: 'We love what we do, and it shows in everything we create.',
                color: 'secondary'
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-[#1A2A2A]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 h-full hover:border-primary-gold/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-primary-gold transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Bottom Line */}
                  <div className={`mt-6 w-full h-0.5 ${
                    value.color === 'primary' ? 'bg-primary-gold/30' : 'bg-[#3B82F6]/30'
                  } group-hover:bg-primary-gold transition-colors duration-300`} />
                </div>
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                  value.color === 'primary' ? 'bg-primary-gold/20' : 'bg-[#3B82F6]/20'
                }`} />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={800}>
          <div className="text-center mt-16">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold/90 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-gold/25"
            >
              Let's Plan Your Event
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </FadeIn>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary-gold/10 blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full bg-[#3B82F6]/10 blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}