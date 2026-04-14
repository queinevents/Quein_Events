'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { StaggeredCards } from '@/components/animations/StaggeredCards';
import { EVENT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * EventCategoriesSection component displays different event types with visual examples
 * 
 * Features:
 * - Asymmetric grid layout with one featured category (2x2 on desktop)
 * - Uses StaggeredCards with 80ms stagger delay for sequential animations
 * - Responsive: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Featured card spans 2 rows on tablet/desktop
 * - Image zoom effects on hover
 * - Event count and category tags display
 * 
 * Requirements: 3.1, 3.2, 3.8, 3.9, 3.10, 15.3
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.8, 3.9, 3.10, 15.3**
 */
export default function EventCategoriesSection() {
  const shouldReduceMotion = useReducedMotion();

  // Separate featured and regular categories
  const featuredCategory = EVENT_CATEGORIES.find(cat => cat.featured);
  const regularCategories = EVENT_CATEGORIES.filter(cat => !cat.featured);

  return (
    <section
      id="event-categories"
      className="relative py-16 md:py-24 lg:py-32 bg-background-darker overflow-hidden"
      aria-label="Event categories showcase"
    >
      {/* Subtle gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-primary-purple/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          {...(shouldReduceMotion ? {} : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.6 }
          })}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Event Expertise
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            From intimate gatherings to large-scale productions, we bring your vision to life
          </p>
        </motion.div>

        {/* Asymmetric Grid with StaggeredCards */}
        <StaggeredCards
          baseDelay={0}
          staggerDelay={80}
          animation="slide-up"
          className={cn(
            'grid gap-4 md:gap-6',
            // Mobile: 1 column
            'grid-cols-1',
            // Tablet: 2 columns, featured spans 2 rows
            'md:grid-cols-2 md:auto-rows-[minmax(380px,auto)]',
            // Desktop: 3 columns, featured spans 2x2
            'lg:grid-cols-3 lg:auto-rows-[minmax(380px,auto)]'
          )}
        >
          {/* Featured Category - Renders first, spans 2x2 on desktop */}
          {featuredCategory && (
            <CategoryCard
              category={featuredCategory}
              size="large"
            />
          )}

          {/* Regular Categories */}
          {regularCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              size="small"
            />
          ))}
        </StaggeredCards>
      </div>
    </section>
  );
}
