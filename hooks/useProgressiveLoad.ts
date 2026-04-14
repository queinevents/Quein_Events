/**
 * Hook for progressive component loading
 * Delays loading of non-critical components until after initial render
 */

import { useState, useEffect } from 'react';

interface UseProgressiveLoadOptions {
  /**
   * Delay in milliseconds before loading the component
   * @default 0
   */
  delay?: number;
  
  /**
   * Whether to wait for the page to be idle before loading
   * @default false
   */
  waitForIdle?: boolean;
  
  /**
   * Whether to load only when the component is in viewport
   * @default false
   */
  inViewport?: boolean;
}

/**
 * Progressive loading hook
 * Returns true when the component should be loaded
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const shouldLoad = useProgressiveLoad({ delay: 1000, waitForIdle: true });
 *   
 *   if (!shouldLoad) {
 *     return <Skeleton />;
 *   }
 *   
 *   return <HeavyComponent />;
 * }
 * ```
 */
export function useProgressiveLoad(options: UseProgressiveLoadOptions = {}): boolean {
  const { delay = 0, waitForIdle = false, inViewport = false } = options;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // If no special conditions, load immediately after delay
    if (!waitForIdle && !inViewport) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(timer);
    }

    // Wait for page to be idle (requestIdleCallback)
    if (waitForIdle && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(
        () => {
          setTimeout(() => {
            setShouldLoad(true);
          }, delay);
        },
        { timeout: 3000 } // Fallback timeout
      );

      return () => window.cancelIdleCallback(idleCallback);
    }

    // Fallback for browsers without requestIdleCallback
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay + 1000);

    return () => clearTimeout(timer);
  }, [delay, waitForIdle, inViewport]);

  return shouldLoad;
}

/**
 * Hook for loading components when they enter viewport
 * Combines progressive loading with intersection observer
 */
export function useLoadInViewport(options: Omit<UseProgressiveLoadOptions, 'inViewport'> = {}) {
  return useProgressiveLoad({ ...options, inViewport: true });
}

/**
 * Hook for loading components after page is idle
 * Useful for non-critical below-the-fold content
 */
export function useLoadWhenIdle(delay: number = 0) {
  return useProgressiveLoad({ delay, waitForIdle: true });
}
