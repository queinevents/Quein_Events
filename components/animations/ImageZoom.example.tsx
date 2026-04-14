import Image from 'next/image';
import { ImageZoom } from './ImageZoom';

/**
 * Example usage of the ImageZoom component
 * Demonstrates hover zoom effects with various configurations
 */
export default function ImageZoomExample() {
  return (
    <div className="min-h-screen bg-background-dark p-8 space-y-16">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        ImageZoom Component Examples
      </h1>

      {/* Basic image zoom */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Basic Image Zoom (1.1x scale)
        </h2>
        <ImageZoom className="max-w-md">
          <Image
            src="/images/portfolio/event-1.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          Hover over the image to see the default 1.1x zoom effect
        </p>
      </div>

      {/* Custom scale */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Custom Scale (1.15x)
        </h2>
        <ImageZoom scale={1.15} className="max-w-md">
          <Image
            src="/images/portfolio/event-2.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          This image zooms to 1.15x on hover
        </p>
      </div>

      {/* Custom duration */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Slower Zoom (800ms duration)
        </h2>
        <ImageZoom duration={800} className="max-w-md">
          <Image
            src="/images/portfolio/event-3.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          This image has a slower, more dramatic zoom effect
        </p>
      </div>

      {/* With overlay */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Zoom with Color Overlay
        </h2>
        <ImageZoom overlay className="max-w-md">
          <Image
            src="/images/portfolio/event-4.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          Purple overlay appears on hover (default color)
        </p>
      </div>

      {/* Custom overlay color */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Custom Overlay Color
        </h2>
        <ImageZoom
          overlay
          overlayColor="rgba(59, 130, 246, 0.4)"
          className="max-w-md"
        >
          <Image
            src="/images/portfolio/event-5.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          Blue overlay with custom color
        </p>
      </div>

      {/* Grid of images */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Image Grid with Zoom
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageZoom overlay scale={1.15} duration={500}>
            <Image
              src="/images/portfolio/event-1.svg"
              alt="Event 1"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </ImageZoom>
          <ImageZoom overlay scale={1.15} duration={500}>
            <Image
              src="/images/portfolio/event-2.svg"
              alt="Event 2"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </ImageZoom>
          <ImageZoom overlay scale={1.15} duration={500}>
            <Image
              src="/images/portfolio/event-3.svg"
              alt="Event 3"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </ImageZoom>
        </div>
        <p className="text-text-secondary mt-2">
          Portfolio-style grid with consistent zoom effects
        </p>
      </div>

      {/* With content overlay */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Zoom with Content Overlay
        </h2>
        <ImageZoom overlay scale={1.1} duration={400} className="max-w-md relative">
          <Image
            src="/images/portfolio/event-6.svg"
            alt="Event example"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Event Title</h3>
              <p className="text-sm">Click to view details</p>
            </div>
          </div>
        </ImageZoom>
        <p className="text-text-secondary mt-2">
          Combine with custom content overlay for interactive cards
        </p>
      </div>

      {/* Accessibility note */}
      <div className="bg-background-card p-8 rounded-lg border-l-4 border-primary-gold">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Accessibility Note
        </h3>
        <p className="text-text-secondary">
          This component respects the user&apos;s <code className="text-primary-purple">prefers-reduced-motion</code> setting.
          If a user has enabled reduced motion in their system preferences, the zoom animation will be disabled
          and images will remain static on hover.
        </p>
      </div>
    </div>
  );
}
