'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { EXPERTISE_ITEMS } from '@/lib/constants';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

/**
 * ExpertiseSection component showcasing detailed service offerings
 * Features split-screen layout with alternating sides, animated icons, and staggered feature lists
 * 
 * Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 15.4
 * 
 * Animations:
 * - Icon: 360° rotation with scale 0 to 1
 * - Feature list: Slide-in from left with 60ms stagger
 * - Background pattern: Subtle parallax effect
 * - CTA button: Pulse animation on hover
 * 
 * Layout:
 * - Desktop: Split-screen with alternating image/content sides
 * - Mobile: Stacked vertically
 */
export default function ExpertiseSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section
      id="expertise"
      className="relative py-16 md:py-24 lg:py-32 bg-background-darker overflow-hidden"
    >
      {/* Background Pattern with Parallax */}
      <ParallaxSection speed={0.3} className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </ParallaxSection>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Our Expertise
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Comprehensive event production services with cutting-edge technology and expert execution
          </p>
        </div>

        {/* Expertise Items */}
        <div className="space-y-16 md:space-y-24">
          {EXPERTISE_ITEMS.map((item, index) => (
            <ExpertiseItem
              key={item.id}
              item={item}
              reverse={index % 2 === 1}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExpertiseItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    imageUrl?: string;
  };
  reverse: boolean;
  prefersReducedMotion: boolean;
}

function ExpertiseItem({ item, reverse, prefersReducedMotion }: ExpertiseItemProps) {
  const { ref, isInView } = useIntersectionAnimation(0.2, true);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center',
        reverse && 'lg:grid-flow-dense'
      )}
    >
      {/* Image Column */}
      <div className={cn('relative', reverse && 'lg:col-start-2')}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-card">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-purple/20 to-primary-blue/20">
              <div className="text-6xl opacity-20">🎭</div>
            </div>
          )}
        </div>
      </div>

      {/* Content Column */}
      <div className={cn('space-y-6', reverse && 'lg:col-start-1 lg:row-start-1')}>
        {/* Animated Icon */}
        <AnimatedIcon
          src={item.icon}
          alt={`${item.title} icon`}
          isInView={isInView}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          {item.description}
        </p>

        {/* Feature List with Staggered Animation */}
        <ul className="space-y-3">
          {item.features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              index={index}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </ul>

        {/* CTA Button with Pulse Animation */}
        <div className="pt-4">
          <Button
            variant="primary"
            className={cn(
              'group relative',
              !prefersReducedMotion && 'hover:animate-pulse'
            )}
          >
            Learn More
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AnimatedIconProps {
  src: string;
  alt: string;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

function AnimatedIcon({ src, alt, isInView, prefersReducedMotion }: AnimatedIconProps) {
  return (
    <div
      className="w-16 h-16 md:w-20 md:h-20 relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'rotate(360deg) scale(1)'
          : 'rotate(0deg) scale(0)',
        transition: prefersReducedMotion
          ? 'none'
          : 'opacity 600ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-purple to-primary-blue rounded-2xl opacity-20" />
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert"
        />
      </div>
    </div>
  );
}

interface FeatureItemProps {
  feature: string;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

function FeatureItem({ feature, index, isInView, prefersReducedMotion }: FeatureItemProps) {
  const delay = index * 60; // 60ms stagger

  return (
    <li
      className="flex items-start gap-3"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
      }}
    >
      {/* Checkmark Icon */}
      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-primary-purple/20 flex items-center justify-center">
        <svg
          className="w-3 h-3 text-primary-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-text-secondary text-sm md:text-base">
        {feature}
      </span>
    </li>
  );
}
