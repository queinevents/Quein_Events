/**
 * Performance monitoring utilities
 * Tracks and reports performance metrics for optimization
 */

/**
 * Performance metric types
 */
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Web Vitals thresholds
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

/**
 * Get rating based on value and thresholds
 */
function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report performance metric
 */
function reportMetric(metric: PerformanceMetric) {
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
  }

  // In production, send to analytics
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Example: Send to Google Analytics
    if ('gtag' in window) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
      });
    }
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;

      const metric: PerformanceMetric = {
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: getRating(
          lastEntry.renderTime || lastEntry.loadTime,
          THRESHOLDS.LCP
        ),
      };

      reportMetric(metric);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const metric: PerformanceMetric = {
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          rating: getRating(
            entry.processingStart - entry.startTime,
            THRESHOLDS.FID
          ),
        };

        reportMetric(metric);
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    let clsValue = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
      };

      reportMetric(metric);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: entry.startTime,
          rating: getRating(entry.startTime, THRESHOLDS.FCP),
        };

        reportMetric(metric);
      });
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any;

    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;

      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
      };

      reportMetric(metric);
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error);
  }
}

/**
 * Measure component render time
 */
export function measureComponentRender(componentName: string, startTime: number) {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  if (process.env.NODE_ENV === 'development') {
    const emoji = renderTime < 16 ? '✅' : renderTime < 50 ? '⚠️' : '❌';
    console.log(`${emoji} ${componentName} render: ${renderTime.toFixed(2)}ms`);
  }

  return renderTime;
}

/**
 * Initialize all performance measurements
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') {
    return;
  }

  measureLCP();
  measureFID();
  measureCLS();
  measureFCP();
  measureTTFB();
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): Record<string, number> {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return {};
  }

  const navigation = performance.getEntriesByType('navigation')[0] as any;
  const paint = performance.getEntriesByType('paint');

  return {
    // Navigation timing
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
    loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
    
    // Paint timing
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    
    // Resource timing
    totalResources: performance.getEntriesByType('resource').length,
  };
}
