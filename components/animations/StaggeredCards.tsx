'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { cn } from '@/lib/utils';
import { Children, ReactNode } from 'react';

interface StaggeredCardsProps {
  children: ReactNode;
  baseDelay?: number;
  staggerDelay?: number;
  animation?: 'fade' | 'slide-up' | 'scale';
  className?: string;
}

/**
 * StaggeredCards component that animates children with sequential delays
 * Uses Framer Motion's stagger feature for smooth sequential animations
 * Uses Intersection Observer to trigger when element enters viewport
 * Respects prefers-reduced-motion setting
 * 
 * @param children - Child elements to animate with stagger effect
 * @param baseDelay - Initial delay before first animation starts in ms (default: 0)
 * @param staggerDelay - Delay between each child animation in ms (default: 100)
 * @param animation - Animation variant: 'fade', 'slide-up', or 'scale' (default: 'slide-up')
 * @param className - Additional CSS classes for container
 * 
 * @example
 * ```tsx
 * <StaggeredCards baseDelay={0} staggerDelay={100} animation="slide-up">
 *   {items.map(item => (
 *     <Card key={item.id} {...item} />
 *   ))}
 * </StaggeredCards>
 * ```
 * 
 * Animation variants:
 * - 'fade': Fade in from opacity 0 to 1
 * - 'slide-up': Slide up from below with fade (default)
 * - 'scale': Scale from 0.8 to 1 with fade
 * 
 * Performance:
 * - Uses Intersection Observer for scroll-triggered animations
 * - Respects prefers-reduced-motion setting
 * - Uses Framer Motion for GPU-accelerated animations
 * - Triggers when 20% of container is visible
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion setting
 * - Shows content immediately when reduced motion is preferred
 * - No impact on keyboard navigation or screen readers
 * 
 * **Validates: Requirements 1.5, 1.6, 1.13, 3.8, 14.1**
 */
export function StaggeredCards({
  children,
  baseDelay = 0,
  staggerDelay = 100,
  animation = 'slide-up',
  className,
}: StaggeredCardsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useIntersectionAnimation(0.2, true);

  // Convert children to array for mapping
  const childrenArray = Children.toArray(children);

  // Define animation variants based on animation prop
  const getVariants = () => {
    const baseVariants = {
      hidden: {},
      visible: {},
    };

    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return baseVariants;
    }
  };

  const variants = getVariants();

  // Container variants for stagger effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: baseDelay / 1000, // Convert ms to seconds
        staggerChildren: staggerDelay / 1000, // Convert ms to seconds
      },
    },
  };

  // Item transition configuration
  const itemTransition = {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
  };

  // If reduced motion is preferred, show all children immediately without animation
  if (shouldReduceMotion) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
        {childrenArray.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={itemTransition}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
