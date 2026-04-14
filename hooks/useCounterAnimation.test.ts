import { renderHook, act, waitFor } from '@testing-library/react';
import { useCounterAnimation } from './useCounterAnimation';

describe('useCounterAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return 0 when not in view', () => {
    const { result } = renderHook(() => 
      useCounterAnimation(100, 1000, false)
    );

    expect(result.current).toBe(0);
  });

  it('should animate from 0 to target value when in view', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView),
      { initialProps: { isInView: false } }
    );

    expect(result.current).toBe(0);

    // Trigger animation by setting isInView to true
    rerender({ isInView: true });

    // Fast-forward time and run animation frames
    await act(async () => {
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current).toBe(100), { timeout: 2000 });
    });

    expect(result.current).toBe(100);
  });

  it('should use easeOutExpo easing by default', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      // At 50% progress with easeOutExpo, value should be significantly higher than 50
      jest.advanceTimersByTime(500);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // With easeOutExpo, at 50% time we should have more than 50% of the value
    // easeOutExpo(0.5) ≈ 0.969, so value should be close to 97
    expect(result.current).toBeGreaterThan(50);
  });

  it('should support linear easing', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView, 'linear'),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      jest.advanceTimersByTime(500);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // With linear easing, at 50% time we should have approximately 50% of the value
    expect(result.current).toBeGreaterThanOrEqual(45);
    expect(result.current).toBeLessThanOrEqual(55);
  });

  it('should reset to 0 when isInView becomes false', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView),
      { initialProps: { isInView: true } }
    );

    await act(async () => {
      jest.advanceTimersByTime(500);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current).toBeGreaterThan(0);

    // Set isInView to false
    rerender({ isInView: false });

    expect(result.current).toBe(0);
  });

  it('should handle different target values', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(2000, 1000, isInView),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current).toBe(2000), { timeout: 2000 });
    });

    expect(result.current).toBe(2000);
  });

  it('should handle different durations', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 2000, isInView),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After 1000ms of 2000ms duration, should not be at target yet
    expect(result.current).toBeLessThan(100);

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current).toBe(100), { timeout: 2000 });
    });

    expect(result.current).toBe(100);
  });

  it('should cleanup animation frame on unmount', () => {
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    
    const { unmount } = renderHook(() => 
      useCounterAnimation(100, 1000, true)
    );

    unmount();

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    cancelAnimationFrameSpy.mockRestore();
  });

  it('should never exceed target value', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      // Advance time beyond duration
      jest.advanceTimersByTime(1500);
      await waitFor(() => expect(result.current).toBe(100), { timeout: 2000 });
    });

    expect(result.current).toBe(100);
    expect(result.current).not.toBeGreaterThan(100);
  });

  it('should support easeOut easing', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView, 'easeOut'),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current).toBe(100), { timeout: 2000 });
    });

    expect(result.current).toBe(100);
  });

  it('should support easeInOut easing', async () => {
    const { result, rerender } = renderHook(
      ({ isInView }) => useCounterAnimation(100, 1000, isInView, 'easeInOut'),
      { initialProps: { isInView: false } }
    );

    rerender({ isInView: true });

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current).toBe(100), { timeout: 2000 });
    });

    expect(result.current).toBe(100);
  });
});
