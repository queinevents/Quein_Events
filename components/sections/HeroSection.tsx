'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ParallaxSection, TextReveal, GradientBackground } from '@/components/animations';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-darker"
    >
      {/* Parallax Background with Video */}
      <ParallaxSection speed={0.5} className="absolute inset-0 z-0">
        {/* Video Background - High quality event video from Pexels */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden="true"
        >
          {/* Primary video source - Elegant event venue */}
          <source src="https://www.pexels.com/download/video/34059053/" type="video/mp4" />
          {/* Fallback video source - Conference/event setting */}
          <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text contrast and dark theme consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </ParallaxSection>

      {/* Animated Gradient Overlay with dark theme colors */}
      <div className="absolute inset-0 z-[1] opacity-10 pointer-events-none">
        <GradientBackground
          colors={['#0A0A0A', '#1A1A1A', '#050505']}
          animationDuration={15000}
          direction="diagonal"
          className="w-full h-full"
        >
          <div className="w-full h-full" />
        </GradientBackground>
      </div>

      {/* Floating Decorative Elements with subtle dark theme accents */}
      <motion.div 
        className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gold Circle with subtle glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary-gold/10 blur-3xl"
          style={{
            boxShadow: '0 0 80px 40px rgba(245, 158, 11, 0.3)',
          }}
          animate={prefersReducedMotion || isMobile ? {} : {
            y: [0, -30, 0],
          }}
          transition={{
            duration: isMobile ? 3 : 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
          aria-hidden="true"
        />
        
        {/* Purple accent with subtle glow */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-2 bg-primary-purple/20 blur-xl"
          style={{
            boxShadow: '0 0 60px 30px rgba(139, 92, 246, 0.3)',
            transform: 'rotate(-45deg)',
          }}
          animate={prefersReducedMotion || isMobile ? {} : {
            y: [0, 40, 0],
          }}
          transition={{
            duration: isMobile ? 4 : 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
          aria-hidden="true"
        />
        
        {/* Blue accent with subtle glow */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-primary-blue/10 blur-3xl"
          style={{
            boxShadow: '0 0 80px 40px rgba(59, 130, 246, 0.2)',
          }}
          animate={prefersReducedMotion || isMobile ? {} : {
            y: [0, -25, 0],
          }}
          transition={{
            duration: isMobile ? 3.5 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content - Ultra Attractive with Maximum Impact */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Premium Subtitle with Glow */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary-gold/30 bg-black/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
            <span className="text-primary-gold text-sm md:text-base font-bold tracking-[0.25em] uppercase">
              Qatar's Premier Event Management
            </span>
            <div className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
          </div>
        </motion.div>

        {/* MASSIVE Main Title - SPYDER Style */}
        <div className="relative mb-6 md:mb-8">
          <TextReveal delay={0.6} stagger={0.12} animation="slide-up">
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] leading-[0.8] tracking-[-0.02em] select-none relative"
                style={{ 
                  fontWeight: '900',
                  color: '#FFFFFF',
                  textShadow: `
                    0 0 30px rgba(245, 158, 11, 0.6),
                    0 0 60px rgba(245, 158, 11, 0.4),
                    0 0 120px rgba(245, 158, 11, 0.2),
                    0 15px 120px rgba(0, 0, 0, 0.9)
                  `,
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                  WebkitTextStroke: '2px rgba(245, 158, 11, 0.3)',
                  filter: 'drop-shadow(0 0 40px rgba(245, 158, 11, 0.4))'
                }}>
              QUEIN
            </h1>
          </TextReveal>
          
          {/* Animated Underline */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '300px', opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Tagline - SPYDER Style */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-[0.2em] uppercase"
             style={{ 
               textShadow: '0 6px 25px rgba(0, 0, 0, 0.9)',
               fontWeight: '800',
               letterSpacing: '0.25em'
             }}>
            Where Every Occasion Finds Its Grandeur
          </p>
        </motion.div>

        {/* Single CTA Button - SPYDER Style */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <button
            onClick={handleCTAClick}
            className="group relative overflow-hidden px-12 py-5 bg-gradient-to-r from-primary-gold to-primary-gold/90 text-black font-black tracking-[0.15em] uppercase text-base rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl focus:outline-none transform hover:-translate-y-2"
            style={{ 
              fontWeight: '900',
              boxShadow: '0 15px 40px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              EXPLORE SERVICES
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
