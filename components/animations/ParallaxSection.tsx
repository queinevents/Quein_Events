'use client';

import { useRef, useEffect, useState } from 'react';
import { useParallaxScroll } from '@/hooks/useParallaxScroll';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  speed: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * ParallaxSection component that creates parallax scroll effects
 * Uses useParallaxScroll hook for parallax calculations
 * Automatically disables on mobile devices for performance
 * Respects prefers-reduced-motion setting
 * 
 * @param speed - Parallax speed factor between -1 and 1 (negative for reverse parallax)
 * @param children - Content to apply parallax effect to
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <ParallaxSection speed={0.5}>
 *   <BackgroundImage src="/hero-bg.jpg" />
 * </ParallaxSection>
 * ```
 * 
 * Speed values:
 * - 0.5: Slow parallax (background moves slower than scroll)
 * - -0.5: Reverse parallax (background moves opposite direction)
 * - 0: No parallax effect
 * - 1: Fast parallax (background moves at same speed as scroll)
 * 
 * Performance:
 * - Disabled on mobile devices (viewport width < 768px)
 * - Respects prefers-reduced-motion setting
 * - Uses throttled scroll listeners (60fps)
 * - Uses CSS transforms for GPU acceleration
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion setting
 * - No impact on keyboard navigation
 * - Content remains accessible when parallax is disabled
 * 
 * **Validates: Requirements 1.3, 1.4, 1.13, 9.1, 9.8, 12.13, 14.1**
 */
export function ParallaxSection({
  speed,
  children,
  className,
}: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for mobile viewport and reduced motion preference
  useEffect(() => {
    // Check viewport width (mobile breakpoint: 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Initial checks
    checkMobile();

    // Listen for viewport resize
    window.addEventListener('resize', checkMobile);

    // Listen for changes to reduced motion preference
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Get parallax transform and willChange (will return 0 and 'auto' if reduced motion is preferred)
  const { transform, willChange } = useParallaxScroll(speed, elementRef);

  // Disable parallax on mobile or when reduced motion is preferred
  const shouldDisableParallax = isMobile || prefersReducedMotion;

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        transform: shouldDisableParallax ? 'none' : transform,
        transition: shouldDisableParallax ? 'none' : undefined,
        willChange: shouldDisableParallax ? 'auto' : willChange,
      }}
    >
      {children}
    </div>
  );
}
