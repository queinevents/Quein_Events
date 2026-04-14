'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageZoomProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
}

/**
 * ImageZoom component that applies zoom effect on hover
 * Uses CSS transform for performant scaling
 * Supports optional color overlay on hover
 * Respects prefers-reduced-motion setting
 * 
 * @param children - Image or content to zoom
 * @param scale - Scale factor on hover (default: 1.1)
 * @param duration - Transition duration in milliseconds (default: 400)
 * @param overlay - Whether to show color overlay on hover (default: false)
 * @param overlayColor - Color of overlay (default: 'rgba(139, 92, 246, 0.3)')
 * @param className - Additional CSS classes for container
 * 
 * @example
 * <ImageZoom scale={1.15} duration={500} overlay overlayColor="rgba(139, 92, 246, 0.3)">
 *   <Image src="/event.jpg" alt="Event" />
 * </ImageZoom>
 */
export function ImageZoom({
  children,
  scale = 1.1,
  duration = 400,
  overlay = false,
  overlayColor = 'rgba(139, 92, 246, 0.3)',
  className,
}: ImageZoomProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes to the preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Calculate actual scale (1 if reduced motion, otherwise use prop)
  const actualScale = prefersReducedMotion ? 1 : (isHovered ? scale : 1);
  const actualDuration = prefersReducedMotion ? 0 : duration;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with zoom effect */}
      <div
        style={{
          transform: `scale(${actualScale})`,
          transition: `transform ${actualDuration}ms ease-out`,
          // will-change only added during hover for performance
          willChange: isHovered && !prefersReducedMotion ? 'transform' : 'auto',
        }}
      >
        {children}
      </div>

      {/* Optional color overlay */}
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: overlayColor,
            opacity: isHovered && !prefersReducedMotion ? 1 : 0,
            transition: `opacity ${Math.min(actualDuration, 200)}ms ease-out`,
          }}
        />
      )}
    </div>
  );
}
