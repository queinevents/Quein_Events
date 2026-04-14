import { ParallaxSection } from './ParallaxSection';
import Image from 'next/image';

/**
 * Example usage of ParallaxSection component
 * 
 * This file demonstrates various use cases for the ParallaxSection component
 * including different speed values, content types, and layout patterns.
 */

export function ParallaxSectionExamples() {
  return (
    <div className="space-y-0">
      {/* Example 1: Hero Section with Parallax Background */}
      <section className="relative h-screen overflow-hidden">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Hero Section with Parallax Background (speed: 0.5)
        </h2>
        <ParallaxSection speed={0.5} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Unforgettable Events</h1>
            <p className="text-2xl">Scroll down to see the parallax effect</p>
          </div>
        </div>
      </section>

      {/* Example 2: Slow Parallax (speed: 0.3) */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Slow Parallax (speed: 0.3)
        </h2>
        <ParallaxSection speed={0.3} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Subtle Movement</h2>
            <p className="text-xl">Lower speed values create a more subtle parallax effect</p>
          </div>
        </div>
      </section>

      {/* Example 3: Fast Parallax (speed: 0.8) */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Fast Parallax (speed: 0.8)
        </h2>
        <ParallaxSection speed={0.8} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-orange-600 via-red-600 to-pink-600" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Dynamic Movement</h2>
            <p className="text-xl">Higher speed values create a more dramatic parallax effect</p>
          </div>
        </div>
      </section>

      {/* Example 4: Reverse Parallax (negative speed) */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Reverse Parallax (speed: -0.5)
        </h2>
        <ParallaxSection speed={-0.5} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-green-600 via-teal-600 to-blue-600" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Reverse Direction</h2>
            <p className="text-xl">Negative speed values move the background in the opposite direction</p>
          </div>
        </div>
      </section>

      {/* Example 5: Multiple Parallax Layers */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Multiple Parallax Layers
        </h2>
        {/* Background layer - slowest */}
        <ParallaxSection speed={0.2} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900" />
        </ParallaxSection>
        {/* Middle layer - medium speed */}
        <ParallaxSection speed={0.5} className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        </ParallaxSection>
        {/* Foreground content - no parallax */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Layered Depth</h2>
            <p className="text-xl">Combine multiple parallax sections with different speeds for depth</p>
          </div>
        </div>
      </section>

      {/* Example 6: Parallax with Content Cards */}
      <section className="relative min-h-screen overflow-hidden bg-gray-900 py-20">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Parallax with Content Cards
        </h2>
        <ParallaxSection speed={0.4} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        </ParallaxSection>
        <div className="relative z-10 container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Feature {i}</h3>
                <p className="text-gray-300">
                  Content cards remain static while the background moves with parallax effect.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example 7: No Parallax (speed: 0) */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          No Parallax (speed: 0)
        </h2>
        <ParallaxSection speed={0} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Static Background</h2>
            <p className="text-xl">Speed of 0 means no parallax effect - background stays fixed</p>
          </div>
        </div>
      </section>

      {/* Example 8: Parallax with Pattern Background */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Parallax with Pattern
        </h2>
        <ParallaxSection speed={0.6} className="absolute inset-0">
          <div 
            className="w-full h-full bg-purple-900"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(255,255,255,.05) 35px,
                rgba(255,255,255,.05) 70px
              )`
            }}
          />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-4">Pattern Background</h2>
            <p className="text-xl">Parallax works great with pattern backgrounds</p>
          </div>
        </div>
      </section>

      {/* Example 9: Newsletter Section with Parallax */}
      <section className="relative min-h-screen overflow-hidden">
        <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10 bg-black/50 p-4 rounded">
          Newsletter Section with Parallax
        </h2>
        <ParallaxSection speed={0.5} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-gold-500" />
        </ParallaxSection>
        <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
          <div className="text-center text-white max-w-2xl px-8">
            <h2 className="text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8">Join our newsletter for exclusive insights</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30"
              />
              <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/80 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-8 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Implementation Notes</h2>
          <div className="space-y-4 text-gray-700">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Speed Values</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>0.5:</strong> Slow parallax (background moves slower than scroll)</li>
                <li><strong>-0.5:</strong> Reverse parallax (background moves opposite direction)</li>
                <li><strong>0:</strong> No parallax effect</li>
                <li><strong>1:</strong> Fast parallax (background moves at same speed as scroll)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Performance</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Automatically disabled on mobile devices (viewport width &lt; 768px)</li>
                <li>Respects prefers-reduced-motion setting</li>
                <li>Uses throttled scroll listeners (60fps)</li>
                <li>Uses CSS transforms for GPU acceleration</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Accessibility</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Respects prefers-reduced-motion setting</li>
                <li>No impact on keyboard navigation</li>
                <li>Content remains accessible when parallax is disabled</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Usage in a page or component:
// import { ParallaxSectionExamples } from '@/components/animations/ParallaxSection.example';
// 
// export default function ExamplesPage() {
//   return <ParallaxSectionExamples />;
// }
