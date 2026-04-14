import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Custom hook for detecting element visibility using Intersection Observer
 * 
 * @param threshold - Percentage of element visibility required to trigger (0-1)
 * @param triggerOnce - Whether to trigger animation only once (default: true)
 * @returns Object containing ref to attach to element and isInView state
 * 
 * @example
 * ```tsx
 * const { ref, isInView } = useIntersectionAnimation(0.3, true);
 * const count = useCounterAnimation(2000, 2500, isInView);
 * 
 * return (
 *   <div ref={ref}>
 *     <h2>{count}+</h2>
 *   </div>
 * );
 * ```
 * 
 * Threshold values:
 * - 0: Trigger as soon as any part of element is visible
 * - 0.3: Trigger when 30% of element is visible (recommended for sections)
 * - 0.5: Trigger when 50% of element is visible
 * - 1.0: Trigger only when entire element is visible
 * 
 * TriggerOnce behavior:
 * - true: Animation triggers once and observer disconnects (performance optimization)
 * - false: Animation can trigger multiple times as element enters/exits viewport
 */
export function useIntersectionAnimation(
  threshold: number = 0.3,
  triggerOnce: boolean = true
): { ref: RefObject<HTMLElement>; isInView: boolean } {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Validate threshold parameter
    const clampedThreshold = Math.max(0, Math.min(1, threshold));

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: assume element is in view if observer not supported
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // Disconnect observer if triggerOnce is true
          if (triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        } else {
          // Only update isInView to false if not triggerOnce
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: clampedThreshold,
    };

    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Start observing the element
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, triggerOnce]);

  return {
    ref: elementRef,
    isInView,
  };
}
