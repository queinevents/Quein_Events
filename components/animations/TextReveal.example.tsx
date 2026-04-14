import { TextReveal } from './TextReveal';

/**
 * TextReveal Component Examples
 * 
 * Demonstrates various usage patterns for the TextReveal animation component
 */

export default function TextRevealExamples() {
  return (
    <div className="space-y-16 p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Example 1: Basic slide-up animation */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Basic Slide-Up Animation
          </h2>
          <TextReveal animation="slide-up" delay={0} stagger={0.05}>
            <h1 className="text-5xl font-bold text-white">
              Where every occasion is crafted with purpose
            </h1>
          </TextReveal>
        </section>

        {/* Example 2: Fade animation with custom delay */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Fade Animation with Delay
          </h2>
          <TextReveal animation="fade" delay={0.3} stagger={0.08}>
            <h2 className="text-4xl font-bold text-purple-400">
              Discover Our Expertise
            </h2>
          </TextReveal>
        </section>

        {/* Example 3: Scale animation */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Scale Animation
          </h2>
          <TextReveal animation="scale" delay={0.2} stagger={0.06}>
            <h2 className="text-4xl font-bold text-blue-400">
              Unforgettable Events Start Here
            </h2>
          </TextReveal>
        </section>

        {/* Example 4: Character-by-character animation */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Character-by-Character Animation
          </h2>
          <TextReveal
            animation="slide-up"
            delay={0}
            stagger={0.03}
            splitBy="character"
          >
            <h2 className="text-4xl font-bold text-gold-400">QUEIN</h2>
          </TextReveal>
        </section>

        {/* Example 5: Fast stagger for subtitle */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Fast Stagger for Subtitle
          </h2>
          <TextReveal animation="fade" delay={0.5} stagger={0.03}>
            <p className="text-2xl text-gray-300">
              Professional event management and technical production services
            </p>
          </TextReveal>
        </section>

        {/* Example 6: Slow stagger for emphasis */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Slow Stagger for Emphasis
          </h2>
          <TextReveal animation="slide-up" delay={0} stagger={0.15}>
            <h2 className="text-5xl font-bold text-white">
              Create. Inspire. Deliver.
            </h2>
          </TextReveal>
        </section>

        {/* Example 7: Newsletter section heading */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Newsletter Section Heading
          </h2>
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-gold-500 p-12 rounded-lg">
            <TextReveal animation="slide-up" delay={0.2} stagger={0.05}>
              <h2 className="text-4xl font-bold text-white text-center">
                Stay Updated with Our Latest Events
              </h2>
            </TextReveal>
          </div>
        </section>

        {/* Example 8: Hero section heading */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Hero Section Heading
          </h2>
          <div className="bg-black/50 p-12 rounded-lg">
            <TextReveal animation="slide-up" delay={0.3} stagger={0.05}>
              <h1 className="text-6xl font-bold text-white leading-tight">
                Transform Your Vision Into Reality
              </h1>
            </TextReveal>
          </div>
        </section>

        {/* Example 9: Multiple lines with custom styling */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Multiple Lines with Custom Styling
          </h2>
          <div className="space-y-4">
            <TextReveal
              animation="slide-up"
              delay={0}
              stagger={0.05}
              className="block"
            >
              <h2 className="text-4xl font-bold text-purple-400">
                Professional Audio Systems
              </h2>
            </TextReveal>
            <TextReveal
              animation="fade"
              delay={0.5}
              stagger={0.03}
              className="block"
            >
              <p className="text-xl text-gray-300">
                Crystal clear sound for every occasion
              </p>
            </TextReveal>
          </div>
        </section>

        {/* Example 10: Accessibility note */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Accessibility Features
          </h2>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Respects prefers-reduced-motion setting</li>
            <li>✓ Includes aria-label for screen readers</li>
            <li>✓ Preserves text content for SEO</li>
            <li>✓ Smooth animations with custom easing</li>
            <li>✓ Viewport-triggered animations (once)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
