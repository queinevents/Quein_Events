'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageZoom } from '@/components/animations/ImageZoom';
import { cn } from '@/lib/utils';
import type { EventCategory } from '@/types';

export interface CategoryCardProps {
  category: EventCategory;
  size?: 'large' | 'small';
  className?: string;
}

/**
 * CategoryCard component for displaying event categories
 * Features:
 * - Image zoom effect on hover using ImageZoom component
 * - Gradient overlay for text readability
 * - Event count display on hover
 * - Category tags as animated pills
 * - Support for large (2x) and small sizes
 * 
 * Requirements: 3.3, 3.4, 3.5, 3.7
 * 
 * @param category - Event category data
 * @param size - Card size: 'large' (featured, 2x) or 'small' (default)
 * @param className - Additional CSS classes
 */
export function CategoryCard({
  category,
  size = 'small',
  className,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const sizeClasses = {
    large: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2 h-[600px] md:h-[800px]',
    small: 'col-span-1 row-span-1 h-[280px] md:h-[380px]',
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-lg overflow-hidden group cursor-pointer',
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with zoom effect */}
      <ImageZoom
        scale={1.1}
        duration={400}
        overlay={false}
        className="absolute inset-0"
      >
        <Image
          src={category.imageUrl}
          alt={category.title}
          fill
          className="object-cover"
          sizes={size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
      </ImageZoom>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        {/* Title */}
        <h3
          className={cn(
            'font-semibold text-text-primary mb-2 transition-all duration-300',
            size === 'large' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl',
            isHovered && 'transform -translate-y-1'
          )}
        >
          {category.title}
        </h3>

        {/* Description - only show on large cards or on hover */}
        <motion.p
          className={cn(
            'text-text-secondary text-sm md:text-base mb-4 line-clamp-2',
            size === 'small' && 'hidden md:block'
          )}
          initial={{ opacity: size === 'large' ? 1 : 0 }}
          animate={{ opacity: isHovered || size === 'large' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {category.description}
        </motion.p>

        {/* Event count badge - shows on hover */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-purple/20 backdrop-blur-sm border border-primary-purple/30">
            <svg
              className="w-4 h-4 text-primary-purple"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-text-primary">
              {category.eventCount} Events
            </span>
          </span>
        </motion.div>

        {/* Category tags as pills with spring animation */}
        <div className="flex flex-wrap gap-2">
          {category.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="px-3 py-1 rounded-full bg-background-card/60 backdrop-blur-sm border border-text-secondary/20 text-xs font-medium text-text-secondary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-primary-purple/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
