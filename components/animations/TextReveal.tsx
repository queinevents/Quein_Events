'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  animation?: 'slide-up' | 'fade' | 'scale';
  className?: string;
  splitBy?: 'word' | 'character';
}

/**
 * TextReveal component that animates text word by word or character by character
 * Uses Framer Motion for smooth staggered animations
 * Respects prefers-reduced-motion setting
 * 
 * @param children - Text content to animate (string or ReactNode)
 * @param delay - Initial delay before animation starts in seconds (default: 0)
 * @param stagger - Delay between each word/character in seconds (default: 0.05)
 * @param animation - Animation variant: 'slide-up', 'fade', or 'scale' (default: 'slide-up')
 * @param className - Additional CSS classes
 * @param splitBy - Split text by 'word' or 'character' (default: 'word')
 * 
 * @example
 * <TextReveal delay={0.2} stagger={0.05} animation="slide-up">
 *   Discover Our Expertise
 * </TextReveal>
 */
export function TextReveal({
  children,
  delay = 0,
  stagger = 0.05,
  animation = 'slide-up',
  className,
  splitBy = 'word',
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Extract text content from children
  const textContent = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }
    // If children is a ReactNode, try to extract text
    if (children && typeof children === 'object' && 'props' in children) {
      const props = (children as any).props;
      if (props && typeof props.children === 'string') {
        return props.children;
      }
    }
    return '';
  }, [children]);

  // Split text into words or characters
  const units = useMemo(() => {
    if (!textContent) return [];
    
    if (splitBy === 'character') {
      return textContent.split('');
    }
    
    // Split by words, preserving spaces
    return textContent.split(/(\s+)/);
  }, [textContent, splitBy]);

  // Animation variants for different effects
  const variants = {
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  // Container variants for stagger effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // If reduced motion is preferred, render static content
  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  // If no text content could be extracted, render children as-is
  if (!textContent || units.length === 0) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      aria-label={textContent}
    >
      {units.map((unit: string, index: number) => {
        // Preserve spaces without animation
        if (unit.match(/^\s+$/)) {
          return <span key={`space-${index}`}>{unit}</span>;
        }

        return (
          <motion.span
            key={`${unit}-${index}`}
            className="inline-block"
            variants={variants[animation]}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            // will-change removed - Framer Motion handles this internally
          >
            {unit}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
