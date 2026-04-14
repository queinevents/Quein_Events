'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import { StaggeredCards } from '@/components/animations/StaggeredCards';
import { TEAM_MEMBERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * TeamSection component displays team member profiles with flip cards
 * 
 * Features:
 * - Imports team data from constants
 * - Gradient background (purple to blue)
 * - Uses StaggeredCards with 120ms delay
 * - Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)
 * - Section heading "Meet Our Team"
 * - 3D flip cards on hover
 * 
 * Requirements: 5.1, 5.6, 5.8, 5.9, 15.5
 * 
 * **Validates: Requirements 5.1, 5.6, 5.8, 5.9, 15.5, 14.1**
 */
export default function TeamSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-label="Meet our team"
    >
      {/* Gradient background (purple to blue) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 via-primary-blue/5 to-background-darker" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Passionate professionals dedicated to creating unforgettable experiences
          </p>
        </motion.div>

        {/* Team Grid with StaggeredCards */}
        <StaggeredCards
          baseDelay={0}
          staggerDelay={120}
          animation="slide-up"
          className={cn(
            'grid gap-6 md:gap-8',
            // Mobile: 1 column
            'grid-cols-1',
            // Tablet: 2 columns
            'md:grid-cols-2',
            // Desktop: 3 columns
            'lg:grid-cols-3'
          )}
        >
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </StaggeredCards>

        {/* Optional: Join Our Team CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-text-secondary text-base mb-4">
            Want to join our talented team?
          </p>
          <a
            href="mailto:careers@queinevents.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-purple hover:bg-primary-purple/90 text-text-primary font-medium rounded-lg transition-colors duration-300"
          >
            <span>View Open Positions</span>
            <svg
              className="w-5 h-5"
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
