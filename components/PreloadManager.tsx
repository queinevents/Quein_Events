'use client';

/**
 * PreloadManager Component
 * Handles preloading of critical and below-the-fold resources
 * to optimize performance and user experience
 */

import { useEffect } from 'react';
import { preloadCriticalAnimations, preloadBelowFoldAnimations } from './animations/dynamic';

interface PreloadManagerProps {
  /**
   * Delay before preloading below-the-fold content (ms)
   * @default 2000
   */
  belowFoldDelay?: number;
  
  /**
   * Whether to preload on idle
   * @default true
   */
  useIdleCallback?: boolean;
}

/**
 * PreloadManager handles progressive loading of application resources
 * 
 * Usage:
 * ```tsx
 * <PreloadManager belowFoldDelay={2000} useIdleCallback={true} />
 * ```
 */
export function PreloadManager({ 
  belowFoldDelay = 2000,
  useIdleCallback = true 
}: PreloadManagerProps) {
  useEffect(() => {
    // Preload critical animations immediately
    preloadCriticalAnimations();

    // Preload below-the-fold content after delay or when idle
    if (useIdleCallback && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(
        () => {
          preloadBelowFoldAnimations();
        },
        { timeout: belowFoldDelay + 1000 } // Fallback timeout
      );

      return () => window.cancelIdleCallback(idleCallback);
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(() => {
        preloadBelowFoldAnimations();
      }, belowFoldDelay);

      return () => clearTimeout(timer);
    }
  }, [belowFoldDelay, useIdleCallback]);

  // This component doesn't render anything
  return null;
}

/**
 * Hook for manual preload control
 * Use this when you need fine-grained control over preloading
 */
export function usePreloadControl() {
  const preloadCritical = () => {
    preloadCriticalAnimations();
  };

  const preloadBelowFold = () => {
    preloadBelowFoldAnimations();
  };

  const preloadAll = () => {
    preloadCriticalAnimations();
    preloadBelowFoldAnimations();
  };

  return {
    preloadCritical,
    preloadBelowFold,
    preloadAll,
  };
}
