/**
 * Dynamic imports for animation components
 * This file provides code-split versions of heavy animation components
 * to reduce initial bundle size and improve performance
 */

import dynamic from 'next/dynamic';

/**
 * Dynamically imported animation components
 * These are loaded on-demand when used, reducing initial bundle size
 */

export const CounterAnimation = dynamic(
  () => import('./CounterAnimation').then((mod) => mod.CounterAnimation),
  {
    ssr: true, // Enable SSR for above-the-fold counters
  }
);

export const ParallaxSection = dynamic(
  () => import('./ParallaxSection').then((mod) => mod.ParallaxSection),
  {
    ssr: false, // Parallax requires client-side scroll events
  }
);

export const StaggeredCards = dynamic(
  () => import('./StaggeredCards').then((mod) => mod.StaggeredCards),
  {
    ssr: true, // Enable SSR for initial render
  }
);

export const ImageZoom = dynamic(
  () => import('./ImageZoom').then((mod) => mod.ImageZoom),
  {
    ssr: true, // Enable SSR for images
  }
);

export const TextReveal = dynamic(
  () => import('./TextReveal').then((mod) => mod.TextReveal),
  {
    ssr: false, // Text reveal requires client-side animation
  }
);

export const GradientBackground = dynamic(
  () => import('./GradientBackground').then((mod) => mod.GradientBackground),
  {
    ssr: true, // Enable SSR for background
  }
);

export const VideoBackground = dynamic(
  () => import('./VideoBackground').then((mod) => mod.VideoBackground),
  {
    ssr: false, // Video requires client-side playback
  }
);

export const FadeIn = dynamic(
  () => import('./FadeIn').then((mod) => mod.FadeIn),
  {
    ssr: true, // Enable SSR for initial render
  }
);

export const AnimatedSection = dynamic(
  () => import('./AnimatedSection').then((mod) => mod.AnimatedSection),
  {
    ssr: true, // Enable SSR for initial render
  }
);

/**
 * Preload critical animation components
 * Call this function to preload animations that will be needed soon
 */
export function preloadCriticalAnimations() {
  if (typeof window !== 'undefined') {
    // Preload animations used in hero and statistics sections
    import('./CounterAnimation');
    import('./FadeIn');
    import('./AnimatedSection');
  }
}

/**
 * Preload below-the-fold animations
 * Call this function after critical content has loaded
 */
export function preloadBelowFoldAnimations() {
  if (typeof window !== 'undefined') {
    // Preload animations used in below-the-fold sections
    setTimeout(() => {
      import('./ParallaxSection');
      import('./StaggeredCards');
      import('./ImageZoom');
      import('./TextReveal');
      import('./GradientBackground');
    }, 2000); // Delay to prioritize critical content
  }
}
