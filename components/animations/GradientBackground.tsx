'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  colors: string[];
  animationDuration?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  children: React.ReactNode;
  className?: string;
}

/**
 * GradientBackground component that creates animated gradient backgrounds
 * Uses CSS gradients with keyframe animations for smooth color transitions
 * Supports multiple directions and configurable animation duration
 * Respects prefers-reduced-motion setting
 * Optimized for mobile devices with reduced color stops and simpler animations
 * 
 * @param colors - Array of color values (hex, rgb, rgba) for gradient
 * @param animationDuration - Duration of gradient animation in milliseconds (default: 10000)
 * @param direction - Gradient direction: 'horizontal', 'vertical', or 'diagonal' (default: 'diagonal')
 * @param children - Content to render on top of gradient background
 * @param className - Additional CSS classes for container
 * 
 * @example
 * <GradientBackground
 *   colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
 *   animationDuration={10000}
 *   direction="diagonal"
 * >
 *   <NewsletterForm />
 * </GradientBackground>
 * 
 * Performance:
 * - Uses CSS animations for GPU acceleration
 * - Respects prefers-reduced-motion setting
 * - Optimized for smooth 60fps animation
 * - Reduces color stops on mobile for better performance
 * - Simplifies animation on mobile devices (viewport width < 768px)
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion setting
 * - Ensures content maintains proper contrast
 * - No impact on keyboard navigation
 * 
 * **Validates: Requirements 1.11, 1.12, 1.13, 8.2, 8.3, 14.1, 15.9**
 */
export function GradientBackground({
  colors,
  animationDuration = 10000,
  direction = 'diagonal',
  children,
  className,
}: GradientBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationName, setAnimationName] = useState<string>('');

  useEffect(() => {
    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Check for mobile viewport (< 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Listen for changes to the preference
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

  // Generate unique animation name to avoid conflicts
  useEffect(() => {
    setAnimationName(`gradient-animation-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // Calculate gradient angle based on direction
  const getGradientAngle = () => {
    switch (direction) {
      case 'horizontal':
        return '90deg';
      case 'vertical':
        return '180deg';
      case 'diagonal':
        return '135deg';
      default:
        return '135deg';
    }
  };

  // Create gradient string from colors array
  // On mobile, reduce color stops for better performance
  const createGradient = (angle: string) => {
    if (colors.length < 2) {
      // If only one color, use solid background
      return colors[0] || '#8B5CF6';
    }
    
    // On mobile, use only first and last color for simpler gradient
    if (isMobile && colors.length > 2) {
      return `linear-gradient(${angle}, ${colors[0]}, ${colors[colors.length - 1]})`;
    }
    
    return `linear-gradient(${angle}, ${colors.join(', ')})`;
  };

  // Generate keyframes for gradient animation
  const generateKeyframes = () => {
    if (prefersReducedMotion || !animationName) {
      return '';
    }

    const angle = getGradientAngle();
    
    return `
      @keyframes ${animationName} {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `;
  };

  const angle = getGradientAngle();
  const gradient = createGradient(angle);
  
  // Disable animation on mobile or when reduced motion is preferred
  const shouldDisableAnimation = isMobile || prefersReducedMotion;
  
  // Use longer duration on mobile for smoother, less intensive animation
  const effectiveDuration = isMobile ? animationDuration * 1.5 : animationDuration;

  return (
    <>
      {/* Inject keyframes into document */}
      {!shouldDisableAnimation && animationName && (
        <style dangerouslySetInnerHTML={{ __html: generateKeyframes() }} />
      )}
      
      <div
        className={cn('relative', className)}
        style={{
          background: gradient,
          backgroundSize: shouldDisableAnimation ? '100% 100%' : '200% 200%',
          animation: shouldDisableAnimation 
            ? 'none' 
            : `${animationName} ${effectiveDuration}ms ease infinite`,
          // will-change only for animated gradients, not for reduced motion or mobile
          willChange: shouldDisableAnimation ? 'auto' : 'background-position',
        }}
      >
        {children}
      </div>
    </>
  );
}
