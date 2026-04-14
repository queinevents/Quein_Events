import { renderHook } from '@testing-library/react';
import { useParallaxScroll } from './useParallaxScroll';
import { RefObject } from 'react';

describe('useParallaxScroll', () => {
  let mockElement: HTMLDivElement;
  let mockRef: RefObject<HTMLDivElement>;

  beforeEach(() => {
    // Create mock element
    mockElement = document.createElement('div');
    mockRef = { current: mockElement };

    // Mock getBoundingClientRect
    mockElement.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      height: 200,
      bottom: 300,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 100,
      toJSON: () => {}
    }));

    // Mock window properties
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    });

    // Mock matchMedia for prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return transform style object', () => {
    const { result } = renderHook(() => useParallaxScroll(0.5, mockRef));

    expect(result.current).toHaveProperty('transform');
    expect(typeof result.current.transform).toBe('string');
    expect(result.current.transform).toMatch(/translateY\(-?\d+(\.\d+)?px\)/);
  });

  it('should calculate transform based on scroll position', () => {
    const { result } = renderHook(() => useParallaxScroll(0.5, mockRef));

    // Initial transform should be calculated
    expect(result.current.transform).toBeDefined();
    
    // Transform should be a translateY value
    const match = result.current.transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    expect(match).not.toBeNull();
    
    if (match) {
      const transformValue = parseFloat(match[1]);
      expect(transformValue).toBeGreaterThanOrEqual(-200);
      expect(transformValue).toBeLessThanOrEqual(200);
    }
  });

  it('should clamp transform values to ±200px', () => {
    // Position element far from viewport center to test clamping
    mockElement.getBoundingClientRect = jest.fn(() => ({
      top: -1000,
      height: 200,
      bottom: -800,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: -1000,
      toJSON: () => {}
    }));

    const { result } = renderHook(() => useParallaxScroll(1, mockRef));

    const match = result.current.transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    expect(match).not.toBeNull();
    
    if (match) {
      const transformValue = parseFloat(match[1]);
      expect(transformValue).toBeGreaterThanOrEqual(-200);
      expect(transformValue).toBeLessThanOrEqual(200);
    }
  });

  it('should respect speed parameter', () => {
    const { result: result1 } = renderHook(() => useParallaxScroll(0, mockRef));
    const { result: result2 } = renderHook(() => useParallaxScroll(0.5, mockRef));

    // Speed 0 should result in no transform (0px)
    expect(result1.current.transform).toBe('translateY(0px)');

    // Speed 0.5 should result in some transform
    const match = result2.current.transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    expect(match).not.toBeNull();
  });

  it('should handle negative speed (reverse parallax)', () => {
    const { result } = renderHook(() => useParallaxScroll(-0.5, mockRef));

    expect(result.current.transform).toBeDefined();
    expect(result.current.transform).toMatch(/translateY\(-?\d+(\.\d+)?px\)/);
  });

  it('should clamp speed parameter to -1 to 1 range', () => {
    // Test speed > 1
    const { result: result1 } = renderHook(() => useParallaxScroll(2, mockRef));
    expect(result1.current.transform).toBeDefined();

    // Test speed < -1
    const { result: result2 } = renderHook(() => useParallaxScroll(-2, mockRef));
    expect(result2.current.transform).toBeDefined();

    // Both should still produce valid transforms within bounds
    const match1 = result1.current.transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    const match2 = result2.current.transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    
    if (match1) {
      const value1 = parseFloat(match1[1]);
      expect(value1).toBeGreaterThanOrEqual(-200);
      expect(value1).toBeLessThanOrEqual(200);
    }
    
    if (match2) {
      const value2 = parseFloat(match2[1]);
      expect(value2).toBeGreaterThanOrEqual(-200);
      expect(value2).toBeLessThanOrEqual(200);
    }
  });

  it('should respect prefers-reduced-motion setting', () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useParallaxScroll(0.5, mockRef));

    // Should return no transform when reduced motion is preferred
    expect(result.current.transform).toBe('translateY(0px)');
  });

  it('should handle null element ref gracefully', () => {
    const nullRef: RefObject<HTMLDivElement> = { current: null };
    
    const { result } = renderHook(() => useParallaxScroll(0.5, nullRef));

    // Should not throw and should return a valid transform
    expect(result.current.transform).toBeDefined();
    expect(result.current.transform).toBe('translateY(0px)');
  });

  it('should cleanup scroll listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useParallaxScroll(0.5, mockRef));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should add scroll listener with passive option', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    renderHook(() => useParallaxScroll(0.5, mockRef));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });
});
