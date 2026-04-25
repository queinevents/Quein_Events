'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { STATISTICS } from '@/lib/constants';

// Counter animation hook
const useCounter = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView, hasAnimated]);

  return count;
};

interface StatCardProps {
  stat: typeof STATISTICS[0];
  index: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}

function StatCard({ stat, index, isInView, shouldReduceMotion }: StatCardProps) {
  const animatedValue = useCounter(stat.value, stat.animationDuration, isInView);
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="text-center group"
    >
      <div className="relative">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-gold mb-2 transition-all duration-300 group-hover:scale-110">
          {animatedValue}
          {stat.suffix}
        </div>
        <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">
          {stat.label}
        </div>
        
        {/* Decorative element */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary-gold/50 transition-all duration-300 group-hover:w-12 group-hover:bg-primary-gold" />
      </div>
    </motion.div>
  );
}

export default function StatisticsSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Event images
  const overlayImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
  ];

  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="relative h-screen flex flex-col bg-[#0A0A0A] overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Statistics Numbers Row - Top */}
      <div className="relative w-full z-20 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {STATISTICS.map((stat, index) => (
              <StatCard
                key={stat.id}
                stat={stat}
                index={index}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CREATIVE Text with Images - Centered Vertically */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Container for text and images */}
        <div className="relative w-full h-full">
          {/* CREATIVE Text - Full Width Outlined */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h2
              className="text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] xl:text-[280px] font-black text-center leading-none select-none w-full"
              style={{
                WebkitTextStroke: '2px rgba(245, 158, 11, 0.5)',
                color: 'transparent',
                letterSpacing: '0.05em',
              }}
            >
              CREATIVE
            </h2>
          </motion.div>

          {/* Images - Starting from Center of Text, Overlaying Bottom Half */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex w-full gap-4 px-4" style={{ marginTop: '0%' }}>
              {overlayImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 50 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex-1 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden shadow-2xl"
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}