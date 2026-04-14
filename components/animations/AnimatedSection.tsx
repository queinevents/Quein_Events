'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right';
  delay?: number;
  className?: string;
}

/**
 * AnimatedSection component with multiple animation variants
 * Uses Framer Motion for smooth animations
 * Respects prefers-reduced-motion setting
 * 
 * @param children - Content to animate
 * @param animation - Animation variant (default: 'fade')
 * @param delay - Animation delay in seconds (default: 0)
 * @param className - Additional CSS classes
 */
export function AnimatedSection({ 
  children, 
  animation = 'fade', 
  delay = 0, 
  className 
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for different effects
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
  };

  // If reduced motion is preferred, disable animations
  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[animation]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth motion
      }}
    >
      {children}
    </motion.div>
  );
}
