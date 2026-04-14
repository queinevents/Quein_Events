import { GradientBackground } from './GradientBackground';

/**
 * Example usage of the GradientBackground component
 * Demonstrates animated gradient backgrounds with various configurations
 */
export default function GradientBackgroundExample() {
  return (
    <div className="min-h-screen bg-background-dark p-8 space-y-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        GradientBackground Component Examples
      </h1>

      {/* Basic gradient - diagonal */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Basic Diagonal Gradient (Default)
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Animated Gradient Background</h3>
            <p className="text-lg opacity-90">
              This gradient smoothly animates over 10 seconds
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Horizontal gradient */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Horizontal Gradient
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6']}
          direction="horizontal"
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Horizontal Animation</h3>
            <p className="text-lg opacity-90">
              Gradient moves from left to right
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Vertical gradient */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Vertical Gradient
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6']}
          direction="vertical"
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Vertical Animation</h3>
            <p className="text-lg opacity-90">
              Gradient moves from top to bottom
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Fast animation */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Fast Animation (5 seconds)
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
          animationDuration={5000}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Faster Movement</h3>
            <p className="text-lg opacity-90">
              This gradient completes its cycle in 5 seconds
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Slow animation */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Slow Animation (20 seconds)
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
          animationDuration={20000}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Subtle Movement</h3>
            <p className="text-lg opacity-90">
              This gradient takes 20 seconds for a full cycle
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Newsletter-style section */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Newsletter Section Example
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
          animationDuration={10000}
          direction="diagonal"
          className="rounded-lg p-16"
        >
          <div className="max-w-2xl mx-auto text-center text-white">
            <h3 className="text-4xl font-bold mb-4">
              Stay Updated with Our Latest Events
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Join our newsletter for exclusive insights and event updates
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-primary-purple font-semibold rounded-lg hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Multiple colors */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Multi-Color Gradient (5 colors)
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Rainbow Gradient</h3>
            <p className="text-lg opacity-90">
              Five colors create a vibrant, dynamic background
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Two colors - simple */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Simple Two-Color Gradient
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6']}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Purple to Blue</h3>
            <p className="text-lg opacity-90">
              Classic two-color gradient with smooth animation
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* Dark theme gradient */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Dark Theme Gradient
        </h2>
        <GradientBackground
          colors={['#1E1B4B', '#312E81', '#4C1D95']}
          className="rounded-lg p-12"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Deep Purple Tones</h3>
            <p className="text-lg opacity-90">
              Darker colors for a more subtle effect
            </p>
          </div>
        </GradientBackground>
      </div>

      {/* With complex content */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Complex Content Example
        </h2>
        <GradientBackground
          colors={['#8B5CF6', '#3B82F6', '#F59E0B']}
          className="rounded-lg p-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-2xl font-bold mb-2">15+</h4>
                <p className="opacity-90">Years Experience</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-2xl font-bold mb-2">2000+</h4>
                <p className="opacity-90">Events Completed</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-2xl font-bold mb-2">200+</h4>
                <p className="opacity-90">Happy Clients</p>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>

      {/* Accessibility note */}
      <div className="bg-background-card p-8 rounded-lg border-l-4 border-primary-gold">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Accessibility Note
        </h3>
        <p className="text-text-secondary mb-4">
          This component respects the user&apos;s <code className="text-primary-purple">prefers-reduced-motion</code> setting.
          If a user has enabled reduced motion in their system preferences, the gradient animation will be disabled
          and a static gradient will be displayed instead.
        </p>
        <p className="text-text-secondary">
          <strong>Important:</strong> Ensure text content on gradient backgrounds maintains WCAG AA contrast ratios (at least 4.5:1).
          Consider using semi-transparent overlays or adjusting gradient colors for better readability.
        </p>
      </div>
    </div>
  );
}
