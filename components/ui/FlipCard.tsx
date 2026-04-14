'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  // Front side content
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  capacity: string;
  accentColor: 'purple' | 'blue' | 'gold';
  
  // Back side content
  features: string[];
  ctaText: string;
  ctaHref?: string;
  
  className?: string;
}

const accentColors = {
  purple: {
    glow: 'rgba(139, 92, 246, 0.5)',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    border: '#8B5CF6',
  },
  blue: {
    glow: 'rgba(59, 130, 246, 0.5)',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
    border: '#3B82F6',
  },
  gold: {
    glow: 'rgba(245, 158, 11, 0.5)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    border: '#F59E0B',
  },
};

/**
 * FlipCard component with 3D flip animation for service cards
 * Features dark theme styling with vibrant accent colors
 * Flips on hover (desktop) or shows stacked layout with expand/collapse on mobile
 * Keyboard accessible with Enter/Space support
 * 
 * @example
 * ```tsx
 * <FlipCard
 *   icon="/icons/wedding.svg"
 *   iconAlt="Wedding icon"
 *   title="Marriage Events"
 *   description="Weddings where every moment becomes a cherished memory"
 *   capacity="50-1,000+ guests"
 *   accentColor="purple"
 *   features={["Traditional and modern wedding setups", "Floral design and décor"]}
 *   ctaText="Plan Your Dream Wedding"
 * />
 * ```
 * 
 * **Validates: Requirements 10.1, 10.2, 10.3, 10.7, 10.9, 15.10, 15.11**
 */
export function FlipCard({
  icon,
  iconAlt,
  title,
  description,
  capacity,
  accentColor,
  features,
  ctaText,
  ctaHref = '#contact',
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  const colors = accentColors[accentColor];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Smooth scroll to expanded content after a short delay
    if (!isExpanded) {
      setTimeout(() => {
        expandedContentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isMobile) {
        handleToggleExpand();
      } else {
        handleFlip();
      }
    }
  };

  // Mobile: Stacked layout with expand/collapse
  if (isMobile) {
    return (
      <div
        ref={cardRef}
        className={cn('relative', className)}
      >
        {/* Front Side - Always Visible on Mobile */}
        <div
          className="rounded-xl p-6 flex flex-col items-center text-center"
          style={{
            backgroundColor: '#1A1A1A',
            border: `1px solid #2A2A2A`,
            boxShadow: `0 8px 32px ${colors.glow}`,
          }}
        >
          {/* Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 360 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: colors.gradient,
                boxShadow: `0 4px 20px ${colors.glow}`,
                filter: `drop-shadow(0 0 8px ${colors.glow})`,
              }}
            >
              <img 
                src={icon} 
                alt={iconAlt} 
                className="w-10 h-10"
                style={{
                  filter: `drop-shadow(0 0 4px ${colors.glow})`,
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-base mb-4" style={{ color: '#A0A0A0' }}>
            {description}
          </p>

          {/* Capacity Badge with pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: `${colors.glow}`,
              color: colors.border,
            }}
          >
            {capacity}
          </motion.div>

          {/* Show More/Less Button - Touch-friendly (48x48px minimum) */}
          <button
            onClick={handleToggleExpand}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[48px] py-3 px-6 rounded-lg text-center font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: accentColors.gold.gradient,
              boxShadow: `0 4px 20px ${accentColors.gold.glow}`,
            }}
            aria-expanded={isExpanded}
            aria-controls="card-details"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Expanded Content - Back Side Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              ref={expandedContentRef}
              id="card-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-6 flex flex-col mt-4"
                style={{
                  backgroundColor: '#1A1A1A',
                  border: `2px solid ${colors.border}`,
                  boxShadow: `0 8px 32px ${colors.glow}`,
                }}
              >
                {/* Features List */}
                <h4 className="text-lg font-bold mb-4 text-center" style={{ color: '#FFFFFF' }}>
                  What&apos;s Included
                </h4>
                <ul className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <svg
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke={colors.border}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm" style={{ color: '#A0A0A0' }}>
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button - Touch-friendly (48x48px minimum) */}
                <a
                  href={ctaHref}
                  className="block w-full min-h-[48px] py-3 px-6 rounded-lg text-center font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: colors.gradient,
                    boxShadow: `0 4px 20px ${colors.glow}`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {ctaText}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop: 3D Flip Animation
  return (
    <div
      ref={cardRef}
      className={cn('relative h-[400px] md:h-[450px] perspective-1000', className)}
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => !isMobile && setIsFlipped(false)}
      onClick={() => isMobile && handleFlip()}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Flip card to see more details about ${title}`}
      aria-live="polite"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 600ms',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          // will-change only during flip animation
          willChange: isFlipped ? 'transform' : 'auto',
        }}
        onTransitionEnd={() => {
          // Remove will-change after animation completes
          if (cardRef.current) {
            const motionDiv = cardRef.current.querySelector('.relative.w-full.h-full') as HTMLElement;
            if (motionDiv) {
              motionDiv.style.willChange = 'auto';
            }
          }
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col items-center text-center"
          style={{
            backgroundColor: '#1A1A1A',
            border: `1px solid #2A2A2A`,
            backfaceVisibility: 'hidden',
            boxShadow: isFlipped ? 'none' : `0 8px 32px ${colors.glow}`,
          }}
        >
          {/* Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 360 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: colors.gradient,
                boxShadow: `0 4px 20px ${colors.glow}`,
                filter: `drop-shadow(0 0 8px ${colors.glow})`,
              }}
            >
              <img 
                src={icon} 
                alt={iconAlt} 
                className="w-10 h-10"
                style={{
                  filter: `drop-shadow(0 0 4px ${colors.glow})`,
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-base mb-4 flex-grow" style={{ color: '#A0A0A0' }}>
            {description}
          </p>

          {/* Capacity Badge with pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: `${colors.glow}`,
              color: colors.border,
            }}
          >
            {capacity}
          </motion.div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col"
          style={{
            backgroundColor: '#1A1A1A',
            border: `2px solid ${colors.border}`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: `0 8px 32px ${colors.glow}`,
          }}
        >
          {/* Title on back */}
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#FFFFFF' }}>
            {title}
          </h3>

          {/* Features List */}
          <ul className="space-y-3 mb-6 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke={colors.border}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm" style={{ color: '#A0A0A0' }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="block w-full py-3 px-6 rounded-lg text-center font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: colors.gradient,
              boxShadow: `0 4px 20px ${colors.glow}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {ctaText}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
