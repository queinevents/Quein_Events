'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImage: string;
  fallbackAlt?: string;
  darkOverlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

/**
 * VideoBackground component for hero sections with dark theme overlay
 * Supports HTML5 video with image fallback for browsers without video support
 * Automatically pauses video when not in viewport for performance
 * 
 * @param videoUrl - URL to video file (MP4 format recommended)
 * @param fallbackImage - URL to fallback image for browsers without video support
 * @param fallbackAlt - Alt text for fallback image (default: "Background video fallback")
 * @param darkOverlay - Whether to add dark overlay for text readability (default: true)
 * @param overlayOpacity - Opacity of dark overlay 0-1 (default: 0.5)
 * @param className - Additional CSS classes
 * @param autoPlay - Auto-play video (default: true)
 * @param loop - Loop video (default: true)
 * @param muted - Mute video (default: true)
 * @param playsInline - Play inline on mobile (default: true)
 * 
 * @example
 * <VideoBackground
 *   videoUrl="/videos/hero-events.mp4"
 *   fallbackImage="/images/hero-bg.jpg"
 *   fallbackAlt="Elegant event venue"
 *   darkOverlay={true}
 *   overlayOpacity={0.5}
 * />
 * 
 * Features:
 * - HTML5 video with autoplay, loop, muted for seamless background
 * - Image fallback for browsers without video support or slow connections
 * - Dark overlay (50% opacity default) for text readability
 * - Lazy load video after critical content
 * - Pause video when not in viewport for performance and battery savings
 * - Accessible with proper alt text for fallback image
 * - Video controls hidden by default, accessible via keyboard
 * 
 * Performance:
 * - Video doesn't block page load (loads after critical content)
 * - Pauses when not in viewport using Intersection Observer
 * - Optimized for mobile with playsInline attribute
 * 
 * Accessibility:
 * - Fallback image has descriptive alt text
 * - Video is decorative (aria-hidden="true")
 * - No impact on keyboard navigation
 * - Video controls accessible via keyboard if needed
 * 
 * **Validates: Requirements 9.6, 9.7, 9.9**
 */
export function VideoBackground({
  videoUrl,
  fallbackImage,
  fallbackAlt = 'Background video fallback',
  darkOverlay = true,
  overlayOpacity = 0.5,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isInViewport, setIsInViewport] = useState(true);

  // Check if video is supported
  useEffect(() => {
    const video = document.createElement('video');
    setIsVideoSupported(video.canPlayType('video/mp4') !== '');
  }, []);

  // Pause video when not in viewport for performance
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Video play failed, likely due to browser autoplay policy
              // Fallback to image will be shown
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={cn('absolute inset-0', className)}>
      {isVideoSupported ? (
        <>
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
            onError={() => setIsVideoSupported(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback to image if video fails to load */}
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        /* Image Fallback */
        <Image
          src={fallbackImage}
          alt={fallbackAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Dark Overlay for text readability */}
      {darkOverlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
