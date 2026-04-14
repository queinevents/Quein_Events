/**
 * Tests for useProgressiveLoad hook
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useProgressiveLoad, useLoadWhenIdle } from './useProgressiveLoad';

describe('useProgressiveLoad', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useProgressiveLoad());
    expect(result.current).toBe(false);
  });

  it('should return true after delay', async () => {
    const { result } = renderHook(() => useProgressiveLoad({ delay: 1000 }));
    
    expect(result.current).toBe(false);
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should return true immediately with no delay', async () => {
    const { result } = renderHook(() => useProgressiveLoad({ delay: 0 }));
    
    jest.advanceTimersByTime(0);
    
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should cleanup timer on unmount', () => {
    const { unmount } = renderHook(() => useProgressiveLoad({ delay: 1000 }));
    
    unmount();
    
    // Should not throw or cause issues
    jest.advanceTimersByTime(1000);
  });
});

describe('useLoadWhenIdle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should use idle callback when available', async () => {
    const mockRequestIdleCallback = jest.fn((callback) => {
      setTimeout(callback, 0);
      return 1;
    });
    const mockCancelIdleCallback = jest.fn();

    global.requestIdleCallback = mockRequestIdleCallback as any;
    global.cancelIdleCallback = mockCancelIdleCallback;

    const { result } = renderHook(() => useLoadWhenIdle(0));
    
    expect(mockRequestIdleCallback).toHaveBeenCalled();
    
    jest.advanceTimersByTime(0);
    
    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    delete (global as any).requestIdleCallback;
    delete (global as any).cancelIdleCallback;
  });

  it('should fallback when requestIdleCallback is not available', async () => {
    const { result } = renderHook(() => useLoadWhenIdle(500));
    
    expect(result.current).toBe(false);
    
    jest.advanceTimersByTime(1500); // delay + 1000ms fallback
    
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
