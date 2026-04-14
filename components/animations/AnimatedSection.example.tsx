import { AnimatedSection } from './AnimatedSection';

/**
 * Example usage of the AnimatedSection component
 * Demonstrates different animation variants using Framer Motion
 */
export default function AnimatedSectionExample() {
  return (
    <div className="min-h-screen bg-background-dark p-8 space-y-16">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        AnimatedSection Component Examples
      </h1>

      {/* Fade animation */}
      <AnimatedSection animation="fade">
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Fade Animation
          </h2>
          <p className="text-text-secondary">
            This section uses the fade animation variant. It simply fades in without any movement.
          </p>
        </div>
      </AnimatedSection>

      {/* Slide-up animation */}
      <AnimatedSection animation="slide-up">
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Slide Up Animation
          </h2>
          <p className="text-text-secondary">
            This section slides up from below while fading in. Perfect for content that should feel like it&apos;s rising into view.
          </p>
        </div>
      </AnimatedSection>

      {/* Slide-left animation */}
      <AnimatedSection animation="slide-left">
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Slide Left Animation
          </h2>
          <p className="text-text-secondary">
            This section slides in from the right while fading in. Great for content that should appear to come from the side.
          </p>
        </div>
      </AnimatedSection>

      {/* Slide-right animation */}
      <AnimatedSection animation="slide-right">
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Slide Right Animation
          </h2>
          <p className="text-text-secondary">
            This section slides in from the left while fading in. The opposite of slide-left.
          </p>
        </div>
      </AnimatedSection>

      {/* Animation with delay */}
      <AnimatedSection animation="slide-up" delay={0.3}>
        <div className="bg-background-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Animation with Delay
          </h2>
          <p className="text-text-secondary">
            This section has a 0.3 second delay before the animation starts. Useful for creating staggered effects.
          </p>
        </div>
      </AnimatedSection>

      {/* Grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="bg-primary-purple p-6 rounded-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-2">Card 1</h3>
            <p className="text-white/80">No delay</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up" delay={0.2}>
          <div className="bg-primary-blue p-6 rounded-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-2">Card 2</h3>
            <p className="text-white/80">0.2s delay</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up" delay={0.4}>
          <div className="bg-primary-gold p-6 rounded-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-2">Card 3</h3>
            <p className="text-white/80">0.4s delay</p>
          </div>
        </AnimatedSection>
      </div>

      {/* Custom className */}
      <AnimatedSection animation="fade" className="max-w-3xl mx-auto">
        <div className="bg-background-card p-8 rounded-lg border-2 border-primary-purple">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Custom Styling
          </h2>
          <p className="text-text-secondary">
            This section demonstrates how custom classes can be applied to the AnimatedSection wrapper.
            The content is centered and has a purple border.
          </p>
        </div>
      </AnimatedSection>

      {/* Accessibility note */}
      <AnimatedSection animation="slide-up">
        <div className="bg-background-card p-8 rounded-lg border-l-4 border-primary-gold">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Accessibility & Performance
          </h3>
          <ul className="text-text-secondary space-y-2">
            <li>• Respects <code className="text-primary-purple">prefers-reduced-motion</code> setting</li>
            <li>• Uses Framer Motion for smooth, performant animations</li>
            <li>• Animations trigger only once when scrolled into view</li>
            <li>• 20% of the element must be visible to trigger the animation</li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
}
