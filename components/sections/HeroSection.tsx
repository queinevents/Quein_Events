'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ParallaxSection, TextReveal } from '@/components/animations';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Check for mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background with Artistic Dark Overlay */}
      <ParallaxSection speed={0.5} className="absolute inset-0 z-0">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) contrast(1.1) saturate(0.8)' }}
          aria-hidden="true"
        >
          <source src="/images/hero/banner.mov" type="video/mp4" />
        </video>
        
        {/* Artistic Dark Overlay - Multiple Layers for Better Text Visibility */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        {/* Subtle Noise Texture for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />
      </ParallaxSection>

      {/* Animated Gradient Orbs - Subtle */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-gold/5 blur-3xl"
          animate={prefersReducedMotion || isMobile ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-blue/5 blur-3xl"
          animate={prefersReducedMotion || isMobile ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Artistic Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content - Artistic & Minimal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Premium Subtitle */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {/* <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary-gold/20 bg-black/30 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
            <span className="text-primary-gold/90 text-xs md:text-sm font-medium tracking-[0.25em] uppercase">
              Qatar's Premier Event Management
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
          </div> */}
        </motion.div>

        {/* MASSIVE Main Title - Logo Display */}
        <div className="relative mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Image
              src="/images/logo_light.png"
              alt="Quein Events - Where Every Occasion Finds Its Grandeur"
              width={0}
              height={0}
              className="w-auto h-20 md:h-20 lg:h-20 xl:h-20 max-w-full object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(245, 158, 11, 0.3))',
              }}
              priority
            />
          </motion.div>
          
          {/* Artistic Underline */}
          <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary-gold" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
          </motion.div>
        </div>

        {/* Tagline - Elegant & Minimal */}
        <motion.div
          className="mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
        >
          <p 
            className="text-xl font-bold md:text-2xl lg:text-3xl font-light text-white/90 tracking-[0.15em] uppercase max-w-4xl mx-auto"
            style={{ 
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
              letterSpacing: '0.2em'
            }}
          >
            Where Every Occasion Finds Its Grandeur
          </p>
        </motion.div>

        {/* CTA Button - Minimal & Artistic */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <button
            onClick={handleCTAClick}
            className="group relative overflow-hidden px-12 py-5 bg-transparent border-2 border-primary-gold/40 text-white font-bold tracking-[0.15em] uppercase text-sm rounded-full transition-all duration-500 hover:border-primary-gold hover:shadow-2xl hover:shadow-primary-gold/30 focus:outline-none"
          >
            <span className="relative z-10 flex items-center gap-3">
              EXPLORE SERVICES
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            {/* Hover Fill Effect */}
            <div className="absolute inset-0 bg-primary-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </button>
        </motion.div>

        {/* Decorative Bottom Element */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary-gold/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary-gold/50" />
        </motion.div>
      </div>
    </section>
  );
}
