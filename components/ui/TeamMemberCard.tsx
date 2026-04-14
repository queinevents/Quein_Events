'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/types';

export interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

/**
 * TeamMemberCard component with 3D flip effect
 * 
 * Features:
 * - 3D flip card with front and back sides
 * - Front: circular photo, name, role
 * - Back: bio, social links
 * - Flip on hover with 3D transform (600ms)
 * - Scale social icons on hover
 * - Keyboard accessible (flip on Enter/Space)
 * - Announce flip state to screen readers
 * 
 * Requirements: 5.2, 5.3, 5.4, 5.5, 5.7, 10.9
 * 
 * **Validates: Requirements 5.2, 5.3, 5.4, 5.5, 5.7, 10.9, 14.1**
 * 
 * @param member - Team member data
 * @param className - Additional CSS classes
 */
export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  // If reduced motion is preferred, show simplified card without flip
  if (shouldReduceMotion) {
    return (
      <div
        className={cn(
          'relative bg-background-card rounded-lg overflow-hidden border border-text-secondary/10',
          className
        )}
      >
        {/* Simplified layout without flip */}
        <div className="p-6">
          {/* Photo */}
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          {/* Name and Role */}
          <h3 className="text-xl font-semibold text-text-primary text-center mb-1">
            {member.name}
          </h3>
          <p className="text-primary-purple text-sm font-medium text-center mb-4">
            {member.role}
          </p>

          {/* Bio */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {member.bio}
          </p>

          {/* Social Links */}
          {member.socialLinks && (
            <div className="flex justify-center gap-4">
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary-purple transition-colors"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <LinkedInIcon />
                </a>
              )}
              {member.socialLinks.email && (
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className="text-text-secondary hover:text-primary-purple transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <EmailIcon />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('relative h-[400px] perspective-1000', className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`Team member card for ${member.name}. Press Enter or Space to flip.`}
      onKeyDown={handleKeyDown}
    >
      {/* Screen reader announcement */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isFlipped ? `Showing bio for ${member.name}` : `Showing photo of ${member.name}`}
      </span>

      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-background-card to-background-darker rounded-lg overflow-hidden border border-text-secondary/10 p-6 flex flex-col items-center justify-center">
            {/* Circular photo */}
            <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden ring-4 ring-primary-purple/20">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Name */}
            <h3 className="text-2xl font-semibold text-text-primary text-center mb-2">
              {member.name}
            </h3>

            {/* Role */}
            <p className="text-primary-purple text-base font-medium text-center">
              {member.role}
            </p>

            {/* Hover hint */}
            <p className="text-text-secondary text-xs text-center mt-4 opacity-60">
              Hover or press Enter to learn more
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 backdrop-blur-sm rounded-lg overflow-hidden border border-primary-purple/20 p-6 flex flex-col justify-between">
            {/* Bio */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {member.name}
              </h3>
              <p className="text-primary-purple text-sm font-medium mb-4">
                {member.role}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Social Links */}
            {member.socialLinks && (
              <div className="flex justify-center gap-6 mt-4">
                {member.socialLinks.linkedin && (
                  <motion.a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary-purple transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkedInIcon />
                  </motion.a>
                )}
                {member.socialLinks.email && (
                  <motion.a
                    href={`mailto:${member.socialLinks.email}`}
                    className="text-text-secondary hover:text-primary-purple transition-colors"
                    aria-label={`Email ${member.name}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <EmailIcon />
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// LinkedIn Icon Component
function LinkedInIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Email Icon Component
function EmailIcon() {
  return (
    <svg
      className="w-6 h-6"
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
