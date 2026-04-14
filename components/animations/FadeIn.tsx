'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeIn component that triggers animation when element enters viewport
 * Uses Intersection Observer API for scroll-triggered animations
 * Respects prefers-reduced-motion setting
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in milliseconds (default: 0)
 * @param duration - Animation duration in milliseconds (default: 600)
 * @param className - Additional CSS classes
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 600, 
  className 
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // If reduced motion is preferred, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check if Intersection Observer is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fail silently - show content immediately
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Create observer that triggers when 20% of element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: prefersReducedMotion 
          ? 'none' 
          : `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
