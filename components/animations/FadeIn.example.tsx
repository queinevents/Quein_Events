import { FadeIn } from './FadeIn';

/**
 * Example usage of the FadeIn component
 * Demonstrates scroll-triggered fade-in animations
 */
export default function FadeInExample() {
  return (
    <div className="min-h-screen bg-background-dark p-8 space-y-16">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        FadeIn Component Examples
      </h1>

      {/* Basic fade-in */}
      <FadeIn>
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Basic Fade In
          </h2>
          <p className="text-text-secondary">
            This content fades in when it enters the viewport. Scroll down to see more examples.
          </p>
        </div>
      </FadeIn>

      {/* Fade-in with custom delay */}
      <FadeIn delay={200}>
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Fade In with Delay
          </h2>
          <p className="text-text-secondary">
            This content has a 200ms delay before the animation starts.
          </p>
        </div>
      </FadeIn>

      {/* Fade-in with custom duration */}
      <FadeIn duration={1000}>
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Fade In with Custom Duration
          </h2>
          <p className="text-text-secondary">
            This content takes 1000ms (1 second) to complete the fade-in animation.
          </p>
        </div>
      </FadeIn>

      {/* Multiple elements with staggered delays */}
      <div className="space-y-4">
        <FadeIn delay={0}>
          <div className="bg-primary-purple p-6 rounded-lg">
            <p className="text-white">First element (no delay)</p>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="bg-primary-blue p-6 rounded-lg">
            <p className="text-white">Second element (150ms delay)</p>
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="bg-primary-gold p-6 rounded-lg">
            <p className="text-white">Third element (300ms delay)</p>
          </div>
        </FadeIn>
      </div>

      {/* Fade-in with custom className */}
      <FadeIn className="max-w-2xl mx-auto">
        <div className="bg-background-card p-8 rounded-lg border-2 border-primary-purple">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Fade In with Custom Styling
          </h2>
          <p className="text-text-secondary">
            This content is centered and has a purple border, demonstrating how custom classes work with FadeIn.
          </p>
        </div>
      </FadeIn>

      {/* Note about accessibility */}
      <FadeIn>
        <div className="bg-background-card p-8 rounded-lg border-l-4 border-primary-gold">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Accessibility Note
          </h3>
          <p className="text-text-secondary">
            This component respects the user&apos;s <code className="text-primary-purple">prefers-reduced-motion</code> setting.
            If a user has enabled reduced motion in their system preferences, the animation will be disabled
            and content will appear immediately.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
