import { useRef } from 'react';
import { useParallaxScroll } from './useParallaxScroll';

/**
 * Example 1: Basic Parallax Background
 * Background moves slower than scroll (speed: 0.5)
 */
export function ParallaxBackgroundExample() {
  const ref = useRef<HTMLDivElement>(null);
  const transform = useParallaxScroll(0.5, ref);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={ref}
        style={transform}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900"
      >
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Parallax Effect</h1>
      </div>
    </div>
  );
}

/**
 * Example 2: Reverse Parallax
 * Element moves opposite to scroll direction (speed: -0.5)
 */
export function ReverseParallaxExample() {
  const ref = useRef<HTMLDivElement>(null);
  const transform = useParallaxScroll(-0.5, ref);

  return (
    <section className="relative py-20">
      <div
        ref={ref}
        style={transform}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
      />
      <div className="relative z-10 container mx-auto">
        <h2 className="text-4xl font-bold text-center">Reverse Parallax</h2>
        <p className="text-center mt-4">The background moves opposite to scroll</p>
      </div>
    </section>
  );
}

/**
 * Example 3: Multiple Parallax Layers
 * Different speeds create depth effect
 */
export function MultiLayerParallaxExample() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  const layer1Transform = useParallaxScroll(0.2, layer1Ref);
  const layer2Transform = useParallaxScroll(0.5, layer2Ref);
  const layer3Transform = useParallaxScroll(0.8, layer3Ref);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slowest layer (background) */}
      <div
        ref={layer1Ref}
        style={layer1Transform}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent"
      />
      
      {/* Medium speed layer */}
      <div
        ref={layer2Ref}
        style={layer2Transform}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-2xl" />
      </div>
      
      {/* Fastest layer (foreground) */}
      <div
        ref={layer3Ref}
        style={layer3Transform}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-48 h-48 bg-purple-500/20 rounded-full blur-xl" />
      </div>

      {/* Static content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Multi-Layer Depth</h1>
      </div>
    </div>
  );
}

/**
 * Example 4: Hero Section with Parallax
 * Practical use case for hero sections
 */
export function HeroWithParallaxExample() {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const bgTransform = useParallaxScroll(0.5, bgRef);
  const overlayTransform = useParallaxScroll(0.3, overlayRef);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax background image */}
      <div
        ref={bgRef}
        style={bgTransform}
        className="absolute inset-0"
      >
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Parallax gradient overlay */}
      <div
        ref={overlayRef}
        style={overlayTransform}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-blue-900/50"
      />

      {/* Static content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
          Where Every Occasion is Crafted with Purpose
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Experience the magic of perfectly executed events
        </p>
        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
          Explore Our Work
        </button>
      </div>
    </section>
  );
}

/**
 * Example 5: Subtle Parallax for Sections
 * Gentle effect for content sections
 */
export function SectionWithParallaxExample() {
  const decorRef = useRef<HTMLDivElement>(null);
  const decorTransform = useParallaxScroll(0.3, decorRef);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Subtle parallax decoration */}
      <div
        ref={decorRef}
        style={decorTransform}
        className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service cards */}
          <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Audio Systems</h3>
            <p>Professional sound engineering for any event size</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Lighting Design</h3>
            <p>Creative lighting solutions that set the mood</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">LED Screens</h3>
            <p>High-resolution displays for maximum impact</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Example 6: No Parallax (Speed 0)
 * Useful for conditional parallax or static elements
 */
export function NoParallaxExample() {
  const ref = useRef<HTMLDivElement>(null);
  const transform = useParallaxScroll(0, ref);

  return (
    <div className="relative h-96">
      <div
        ref={ref}
        style={transform}
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-2xl">No parallax effect (speed: 0)</p>
        </div>
      </div>
    </div>
  );
}
