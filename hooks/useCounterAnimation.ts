import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for animating a counter from 0 to a target value
 * 
 * @param targetValue - The final value to count to
 * @param duration - Animation duration in milliseconds
 * @param isInView - Whether the element is in viewport (triggers animation)
 * @param easing - Easing function to use (default: 'easeOutExpo')
 * @returns The current animated counter value
 * 
 * @example
 * ```tsx
 * const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
 * const count = useCounterAnimation(2000, 2500, inView);
 * 
 * return <div ref={ref}>{count}</div>;
 * ```
 * 
 * Easing functions:
 * - easeOutExpo: 1 - 2^(-10 * progress) - Dramatic deceleration
 * - linear: progress - Constant speed
 * - easeOut: 1 - (1 - progress)^2 - Smooth deceleration
 * - easeInOut: progress < 0.5 ? 2 * progress^2 : 1 - 2 * (1 - progress)^2
 */
export function useCounterAnimation(
  targetValue: number,
  duration: number = 2000,
  isInView: boolean = false,
  easing: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutExpo' = 'easeOutExpo'
): number {
  const [currentValue, setCurrentValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset if not in view
    if (!isInView) {
      setCurrentValue(0);
      startTimeRef.current = null;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Easing function implementations
    const easingFunctions = {
      linear: (t: number) => t,
      easeOut: (t: number) => 1 - Math.pow(1 - t, 2),
      easeInOut: (t: number) => 
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      easeOutExpo: (t: number) => 
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    };

    const easingFunction = easingFunctions[easing];

    // Animation update function
    const updateCounter = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1.0);

      // Apply easing function
      const easedProgress = easingFunction(progress);

      // Calculate current value
      const newValue = Math.floor(targetValue * easedProgress);
      setCurrentValue(newValue);

      // Continue animation if not complete
      if (progress < 1.0) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        // Ensure we end exactly at target value
        setCurrentValue(targetValue);
        animationFrameRef.current = null;
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(updateCounter);

    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetValue, duration, isInView, easing]);

  return currentValue;
}
