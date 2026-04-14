import React from 'react';
import { VideoBackground } from './VideoBackground';

/**
 * VideoBackground Component Examples
 * 
 * This file demonstrates various use cases for the VideoBackground component
 * in hero sections and other full-screen background scenarios.
 */

export default function VideoBackgroundExamples() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">VideoBackground Component Examples</h1>

      {/* Example 1: Basic Video Background */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 1: Basic Video Background</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Elegant event venue"
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white">Welcome to Our Events</h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Default configuration with 50% dark overlay for text readability
        </p>
      </section>

      {/* Example 2: Custom Overlay Opacity */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 2: Custom Overlay Opacity</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Event venue with dramatic lighting"
            overlayOpacity={0.7}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white">Darker Overlay (70%)</h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Increased overlay opacity for better text contrast
        </p>
      </section>

      {/* Example 3: No Overlay */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 3: No Overlay</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Bright event venue"
            darkOverlay={false}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white drop-shadow-lg">
              No Overlay
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          No overlay - use when video is dark enough or text has its own shadow
        </p>
      </section>

      {/* Example 4: Light Overlay */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 4: Light Overlay</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Event venue with subtle overlay"
            overlayOpacity={0.3}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white">Light Overlay (30%)</h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Lighter overlay for when you want more video visibility
        </p>
      </section>

      {/* Example 5: Custom Video Props */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 5: Custom Video Props</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Event venue"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white">Custom Video Settings</h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Explicit video props for fine-tuned control
        </p>
      </section>

      {/* Example 6: Hero Section Integration */}
      <section className="relative h-screen">
        <h2 className="text-2xl font-semibold mb-4">Example 6: Hero Section Integration</h2>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <VideoBackground
            videoUrl="/videos/hero-events.mp4"
            fallbackImage="/images/hero-bg.jpg"
            fallbackAlt="Elegant event venue background"
            overlayOpacity={0.5}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h3 className="text-5xl font-bold text-white mb-4">
              Where Every Occasion Finds Its Grandeur
            </h3>
            <p className="text-xl text-gray-200 mb-6">
              Quein Conference & Event Organization WLL
            </p>
            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Plan Your Event
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Complete hero section with video background, overlay, and content
        </p>
      </section>

      {/* Usage Notes */}
      <section className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Usage Notes</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Performance:</strong> Video automatically pauses when not in viewport to save
            battery and bandwidth
          </li>
          <li>
            <strong>Fallback:</strong> Image fallback is shown for browsers without video support
            or if video fails to load
          </li>
          <li>
            <strong>Accessibility:</strong> Video is decorative (aria-hidden), fallback image has
            descriptive alt text
          </li>
          <li>
            <strong>Mobile:</strong> Use playsInline={'{true}'} for iOS compatibility
          </li>
          <li>
            <strong>Overlay:</strong> Dark overlay ensures WCAG AA text contrast (4.5:1 minimum)
          </li>
          <li>
            <strong>Video Format:</strong> MP4 format recommended for broad browser support
          </li>
        </ul>
      </section>
    </div>
  );
}
