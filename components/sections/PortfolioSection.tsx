'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

interface PortfolioSectionProps {
  className?: string;
}

export default function PortfolioSection({ className = '' }: PortfolioSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className={`relative py-20 md:py-28 overflow-hidden bg-[#050505] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} duration={600}>
          <div className="text-center mb-16">
            <p className="text-white/60 text-sm font-medium tracking-wider uppercase mb-3">
              Our Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Recent </span>
              <span className="text-primary-gold">Projects</span>
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
        </FadeIn>

        {/* Masonry Grid - 2 rows, 4 columns */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {PORTFOLIO_ITEMS.slice(0, 8).map((item, index) => {
              // Define grid spans for masonry layout
              const gridSpans = [
                'col-span-1 row-span-1', // 0 - small
                'col-span-1 row-span-2', // 1 - tall
                'col-span-1 row-span-1', // 2 - small
                'col-span-1 row-span-1', // 3 - small
                'col-span-1 row-span-1', // 4 - small
                'col-span-1 row-span-1', // 5 - small
                'col-span-1 row-span-2', // 6 - tall
                'col-span-1 row-span-1', // 7 - small
              ];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                  className={`relative overflow-hidden rounded-none group cursor-pointer ${gridSpans[index]}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${item.imageUrl})`
                    }}
                  />
                  
                  {/* Dark Overlay */}
                  <div 
                    className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                    style={{
                      opacity: hoveredIndex === index ? 0.7 : 0.3
                    }}
                  />

                  {/* Content - Shows on hover */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300"
                    style={{
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                  >
                    <h3 className="text-white text-lg md:text-xl font-bold text-center mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm capitalize">
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 border border-white/20"
            aria-label="Previous projects"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 border border-white/20"
            aria-label="Next projects"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
