'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TestimonialCardProps {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  quote: string;
  rating: number;
  eventType: string;
  imageUrl?: string;
  className?: string;
}

/**
 * TestimonialCard component for displaying client testimonials
 * 
 * Features:
 * - Large quote marks with scale bounce animation
 * - Quote text display
 * - Star rating with fill animation
 * - Client photo (circular), name, role, company
 * - Event type badge
 * - Dark theme with purple accents
 * 
 * @param clientName - Name of the client
 * @param clientRole - Client's role/position
 * @param clientCompany - Client's company name
 * @param quote - Testimonial quote text
 * @param rating - Star rating (1-5)
 * @param eventType - Type of event
 * @param imageUrl - Path to client photo (optional)
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <TestimonialCard
 *   clientName="Sarah Al-Mansoori"
 *   clientRole="Marketing Director"
 *   clientCompany="Qatar Tech Solutions"
 *   quote="Quein transformed our annual conference..."
 *   rating={5}
 *   eventType="Conference"
 *   imageUrl="/images/testimonials/client-1.jpg"
 * />
 * ```
 * 
 * **Validates: Requirements 6.5, 6.6, 6.7**
 */
export function TestimonialCard({
  clientName,
  clientRole,
  clientCompany,
  quote,
  rating,
  eventType,
  imageUrl,
  className,
}: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'relative flex flex-col items-center',
        'p-8 md:p-12 lg:p-16',
        'bg-background-card',
        'rounded-2xl',
        'border border-text-secondary/10',
        'max-w-4xl mx-auto',
        className
      )}
    >
      {/* Quote Icon */}
      <motion.div
        className="mb-6 text-primary-purple/20"
        initial={shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        animate={shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        aria-hidden="true"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="currentColor"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <path d="M12 28c0-6.627 5.373-12 12-12h4v8h-4c-2.21 0-4 1.79-4 4v4h8v20H12V28zm24 0c0-6.627 5.373-12 12-12h4v8h-4c-2.21 0-4 1.79-4 4v4h8v20H36V28z" />
        </svg>
      </motion.div>

      {/* Quote Text */}
      <blockquote className="mb-8 text-center">
        <p className="text-base md:text-lg lg:text-xl text-text-primary leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Star Rating */}
      <div className="flex gap-1 mb-6" role="img" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.svg
            key={star}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              'w-5 h-5 md:w-6 md:h-6',
              star <= rating ? 'text-primary-gold' : 'text-text-secondary/30'
            )}
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.3 + star * 0.05,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </div>

      {/* Client Info */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {imageUrl && (
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary-purple/30">
            <Image
              src={imageUrl}
              alt={clientName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 64px, 80px"
            />
          </div>
        )}
        <div className="text-center">
          <p className="text-lg md:text-xl font-semibold text-text-primary mb-1">
            {clientName}
          </p>
          <p className="text-sm md:text-base text-text-secondary">
            {clientRole}, {clientCompany}
          </p>
        </div>
      </div>

      {/* Event Type Badge */}
      <div
        className={cn(
          'inline-flex items-center px-4 py-2',
          'bg-primary-purple/10',
          'border border-primary-purple/30',
          'rounded-full',
          'text-sm md:text-base text-primary-purple font-medium'
        )}
      >
        {eventType}
      </div>
    </div>
  );
}
