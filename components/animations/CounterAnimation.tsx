'use client';

import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CounterAnimationProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutExpo';
  className?: string;
}

/**
 * CounterAnimation component that animates a number from 0 to target value
 * Uses useCounterAnimation hook for animation logic
 * Uses useIntersectionAnimation to trigger when element enters viewport
 * Respects prefers-reduced-motion setting
 * 
 * @param targetValue - The final value to count to
 * @param duration - Animation duration in milliseconds (default: 2000)
 * @param suffix - Text to append after the number (e.g., '+', '%')
 * @param prefix - Text to prepend before the number (e.g., '$')
 * @param decimals - Number of decimal places to display (default: 0)
 * @param easing - Easing function (default: 'easeOutExpo')
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <CounterAnimation
 *   targetValue={2000}
 *   duration={2500}
 *   suffix="+"
 *   easing="easeOutExpo"
 * />
 * ```
 * 
 * Accessibility:
 * - Includes aria-live="polite" for screen reader announcements
 * - Provides static text alternative for screen readers
 * - Respects prefers-reduced-motion setting
 * 
 * **Validates: Requirements 1.1, 1.2, 1.13, 2.8, 2.9, 14.1, 14.3**
 */
export function CounterAnimation({
  targetValue,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  easing = 'easeOutExpo',
  className,
}: CounterAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useIntersectionAnimation(0.3, true);
  
  // Use counter animation hook
  const currentValue = useCounterAnimation(
    targetValue,
    duration,
    isInView,
    easing
  );

  // Format number with decimals
  const formatNumber = (value: number): string => {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.floor(value).toString();
  };

  // If reduced motion is preferred, show final value immediately
  const displayValue = shouldReduceMotion ? targetValue : currentValue;
  const formattedValue = formatNumber(displayValue);
  const displayText = `${prefix}${formattedValue}${suffix}`;

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn(className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Visible animated counter */}
      <span aria-hidden="true">{displayText}</span>
      
      {/* Screen reader alternative - only announces final value */}
      <span className="sr-only">
        {prefix}{formatNumber(targetValue)}{suffix}
      </span>
    </span>
  );
}
