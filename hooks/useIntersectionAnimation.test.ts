import { renderHook, act } from '@testing-library/react';
import { useIntersectionAnimation } from './useIntersectionAnimation';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];
  
  private callback: IntersectionObserverCallback;
  private elements: Set<Element> = new Set();

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.thresholds = options?.threshold 
      ? (Array.isArray(options.threshold) ? options.threshold : [options.threshold])
      : [0];
  }

  observe(target: Element): void {
    this.elements.add(target);
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  disconnect(): void {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  // Helper method to trigger intersection
  triggerIntersection(isIntersecting: boolean): void {
    const entries: IntersectionObserverEntry[] = Array.from(this.elements).map(
      (target) => ({
        target,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry)
    );
    this.callback(entries, this);
  }
}

describe('useIntersectionAnimation', () => {
  let mockObserver: MockIntersectionObserver;
  let observerInstances: MockIntersectionObserver[] = [];

  beforeEach(() => {
    observerInstances = [];
    
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn((callback, options) => {
      mockObserver = new MockIntersectionObserver(callback, options);
      observerInstances.push(mockObserver);
      return mockObserver;
    }) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return ref and isInView state', () => {
    const { result } = renderHook(() => useIntersectionAnimation());

    expect(result.current).toHaveProperty('ref');
    expect(result.current).toHaveProperty('isInView');
    expect(result.current.isInView).toBe(false);
  });

  it('should set isInView to true when element intersects', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3, true));

    // Initially not in view
    expect(result.current.isInView).toBe(false);

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    expect(result.current.isInView).toBe(true);
  });

  it('should use default threshold of 0.3', () => {
    renderHook(() => useIntersectionAnimation());

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.3,
      })
    );
  });

  it('should accept custom threshold parameter', () => {
    renderHook(() => useIntersectionAnimation(0.5));

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
      })
    );
  });

  it('should clamp threshold to 0-1 range', () => {
    const { rerender } = renderHook(
      ({ threshold }) => useIntersectionAnimation(threshold),
      { initialProps: { threshold: 1.5 } }
    );

    // Should clamp to 1
    expect(observerInstances[0].thresholds).toContain(1);

    rerender({ threshold: -0.5 });

    // Should clamp to 0
    expect(observerInstances[1].thresholds).toContain(0);
  });

  it('should disconnect observer when triggerOnce is true', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3, true));

    const disconnectSpy = jest.spyOn(mockObserver, 'disconnect');

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    expect(result.current.isInView).toBe(true);
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should not disconnect observer when triggerOnce is false', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3, false));

    const disconnectSpy = jest.spyOn(mockObserver, 'disconnect');

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    expect(result.current.isInView).toBe(true);
    // Disconnect should not be called when triggerOnce is false
    expect(disconnectSpy).not.toHaveBeenCalled();
  });

  it('should update isInView to false when element leaves viewport and triggerOnce is false', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3, false));

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection (enter viewport)
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    expect(result.current.isInView).toBe(true);

    // Trigger leaving viewport
    act(() => {
      mockObserver.triggerIntersection(false);
    });

    expect(result.current.isInView).toBe(false);
  });

  it('should not update isInView to false when element leaves viewport and triggerOnce is true', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3, true));

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection (enter viewport)
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    expect(result.current.isInView).toBe(true);

    // Trigger leaving viewport (should not affect isInView when triggerOnce is true)
    act(() => {
      mockObserver.triggerIntersection(false);
    });

    expect(result.current.isInView).toBe(true);
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionAnimation());

    const disconnectSpy = jest.spyOn(mockObserver, 'disconnect');

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should handle missing IntersectionObserver support', () => {
    // Remove IntersectionObserver
    const originalIO = global.IntersectionObserver;
    (global as any).IntersectionObserver = undefined;

    const { result } = renderHook(() => useIntersectionAnimation());

    // Should fallback to isInView = true
    expect(result.current.isInView).toBe(true);

    // Restore
    global.IntersectionObserver = originalIO;
  });

  it('should handle SSR environment (no window)', () => {
    // This test simulates server-side rendering where window is undefined
    const originalWindow = global.window;
    (global as any).window = undefined;

    const { result } = renderHook(() => useIntersectionAnimation());

    // Should fallback to isInView = true
    expect(result.current.isInView).toBe(true);

    // Restore
    (global as any).window = originalWindow;
  });

  it('should use default triggerOnce value of true', () => {
    const { result } = renderHook(() => useIntersectionAnimation(0.3));

    const disconnectSpy = jest.spyOn(mockObserver, 'disconnect');

    // Simulate element being observed
    act(() => {
      if (result.current.ref.current) {
        mockObserver.observe(result.current.ref.current);
      }
    });

    // Trigger intersection
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    // Should disconnect by default (triggerOnce = true)
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should create new observer when threshold changes', () => {
    const { rerender } = renderHook(
      ({ threshold }) => useIntersectionAnimation(threshold),
      { initialProps: { threshold: 0.3 } }
    );

    expect(observerInstances).toHaveLength(1);

    // Change threshold
    rerender({ threshold: 0.5 });

    // Should create new observer
    expect(observerInstances).toHaveLength(2);
  });

  it('should create new observer when triggerOnce changes', () => {
    const { rerender } = renderHook(
      ({ triggerOnce }) => useIntersectionAnimation(0.3, triggerOnce),
      { initialProps: { triggerOnce: true } }
    );

    expect(observerInstances).toHaveLength(1);

    // Change triggerOnce
    rerender({ triggerOnce: false });

    // Should create new observer
    expect(observerInstances).toHaveLength(2);
  });

  it('should handle null ref gracefully', () => {
    const { result } = renderHook(() => useIntersectionAnimation());

    // Ref is initially null (no element attached)
    expect(result.current.ref.current).toBeNull();
    expect(result.current.isInView).toBe(false);

    // Should not throw error
    expect(() => {
      act(() => {
        // Simulate render cycle
      });
    }).not.toThrow();
  });
});
