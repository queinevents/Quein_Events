'use client';

/**
 * PerformanceMonitor Component
 * Initializes performance monitoring for Web Vitals and custom metrics
 */

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/lib/performance';

/**
 * PerformanceMonitor initializes performance tracking
 * Should be included once in the root layout
 * 
 * Usage:
 * ```tsx
 * <PerformanceMonitor />
 * ```
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring on mount
    initPerformanceMonitoring();
  }, []);

  // This component doesn't render anything
  return null;
}
