import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Custom hook for creating parallax scroll effects
 * 
 * @param speed - Parallax speed factor between -1 and 1 (negative for reverse parallax)
 * @param elementRef - React ref to the element to apply parallax effect
 * @returns Transform style object with translateY value and willChange property
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { transform, willChange } = useParallaxScroll(0.5, ref);
 * 
 * return (
 *   <div ref={ref} style={{ transform, willChange }}>
 *     <BackgroundImage />
 *   </div>
 * );
 * ```
 * 
 * Speed values:
 * - 0.5: Slow parallax (background moves slower than scroll)
 * - -0.5: Reverse parallax (background moves opposite direction)
 * - 0: No parallax effect
 * - 1: Fast parallax (background moves at same speed as scroll)
 * 
 * Performance optimizations:
 * - Uses requestAnimationFrame for smooth 60fps updates
 * - Throttles scroll events to 16ms (60fps)
 * - Adds will-change during scroll, removes after scroll stops
 * - Uses CSS transforms (translateY) for GPU acceleration
 */
export function useParallaxScroll(
  speed: number,
  elementRef: RefObject<HTMLElement>
): { transform: string; willChange: string } {
  const [transformY, setTransformY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const scrollEndTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setTransformY(0);
      setIsScrolling(false);
      return;
    }

    // Validate speed parameter
    const clampedSpeed = Math.max(-1, Math.min(1, speed));

    const calculateParallax = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate element position relative to viewport
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = elementTop + elementHeight / 2;
      const distanceFromCenter = viewportCenter - elementCenter;

      // Apply parallax effect
      let transform = distanceFromCenter * clampedSpeed * 0.5;

      // Clamp to ±200px to prevent excessive movement
      const maxTransform = 200;
      transform = Math.max(-maxTransform, Math.min(maxTransform, transform));

      setTransformY(transform);
    };

    // Throttled scroll handler (16ms = 60fps) using requestAnimationFrame
    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      // Set scrolling state to true (adds will-change)
      setIsScrolling(true);

      // Clear existing scroll end timer
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }

      // Set timer to remove will-change after scroll stops (150ms debounce)
      scrollEndTimer.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Throttle to 16ms (60fps)
      if (timeSinceLastScroll >= 16) {
        lastScrollTime.current = now;
        
        // Cancel any pending animation frame
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
        }

        // Use requestAnimationFrame for smooth updates
        rafId.current = requestAnimationFrame(calculateParallax);
      }
    };

    // Initial calculation
    calculateParallax();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }
    };
  }, [speed, elementRef]);

  return {
    transform: `translateY(${transformY}px)`,
    willChange: isScrolling ? 'transform' : 'auto',
  };
}
