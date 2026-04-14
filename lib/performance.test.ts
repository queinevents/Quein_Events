/**
 * Tests for performance monitoring utilities
 */

import {
  measureComponentRender,
  getPerformanceMetrics,
  initPerformanceMonitoring,
} from './performance';

describe('Performance Utilities', () => {
  describe('measureComponentRender', () => {
    it('should measure component render time', () => {
      const startTime = performance.now();
      
      // Simulate some work
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += i;
      }
      
      const renderTime = measureComponentRender('TestComponent', startTime);
      
      expect(renderTime).toBeGreaterThan(0);
      expect(typeof renderTime).toBe('number');
    });

    it('should return undefined in non-browser environment', () => {
      const originalPerformance = global.performance;
      delete (global as any).performance;
      
      const result = measureComponentRender('TestComponent', 0);
      
      expect(result).toBeUndefined();
      
      global.performance = originalPerformance;
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return performance metrics object', () => {
      const metrics = getPerformanceMetrics();
      
      expect(typeof metrics).toBe('object');
      expect(metrics).toHaveProperty('totalResources');
    });

    it('should return empty object in non-browser environment', () => {
      const originalPerformance = global.performance;
      delete (global as any).performance;
      
      const metrics = getPerformanceMetrics();
      
      expect(metrics).toEqual({});
      
      global.performance = originalPerformance;
    });
  });

  describe('initPerformanceMonitoring', () => {
    it('should not throw errors when called', () => {
      expect(() => {
        initPerformanceMonitoring();
      }).not.toThrow();
    });

    it('should handle missing PerformanceObserver gracefully', () => {
      const originalPerformanceObserver = global.PerformanceObserver;
      delete (global as any).PerformanceObserver;
      
      expect(() => {
        initPerformanceMonitoring();
      }).not.toThrow();
      
      global.PerformanceObserver = originalPerformanceObserver;
    });
  });
});
