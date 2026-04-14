'use client';

import React from 'react';
import Image from 'next/image';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
  animationDuration?: number;
  className?: string;
}

/**
 * StatCard component for displaying statistics with animated counters
 * 
 * Features:
 * - Displays icon above animated counter
 * - Uses CounterAnimation component for value animation
 * - Displays label below counter
 * - Dark theme with purple accents
 * - Responsive typography
 * 
 * @param value - The target value to count to
 * @param suffix - Text to append after the number (e.g., '+', '%')
 * @param prefix - Text to prepend before the number (e.g., '$')
 * @param label - Descriptive label below the counter
 * @param icon - Path to icon image (optional)
 * @param animationDuration - Duration of counter animation in ms (default: 2000)
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <StatCard
 *   value={2000}
 *   suffix="+"
 *   label="Events Completed"
 *   icon="/icons/check-circle.svg"
 *   animationDuration={2500}
 * />
 * ```
 * 
 * **Validates: Requirements 2.2, 2.6**
 */
export function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  icon,
  animationDuration = 2000,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'p-6 md:p-8',
        'bg-background-card',
        'rounded-lg',
        'border border-text-secondary/10',
        'transition-all duration-300',
        'hover:border-primary-purple/30',
        'hover:shadow-lg hover:shadow-primary-purple/10',
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-purple/10">
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 md:w-10 md:h-10"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Counter */}
      <CounterAnimation
        targetValue={value}
        duration={animationDuration}
        suffix={suffix}
        prefix={prefix}
        easing="easeOutExpo"
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-purple mb-2"
      />

      {/* Label */}
      <p className="text-sm md:text-base lg:text-lg text-text-secondary text-center">
        {label}
      </p>
    </div>
  );
}
