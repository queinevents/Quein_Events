import { NewsletterSection } from './NewsletterSection';

/**
 * NewsletterSection Component Examples
 * 
 * This file demonstrates various use cases of the NewsletterSection component.
 */

export default function NewsletterSectionExamples() {
  return (
    <div className="space-y-12 bg-background-dark min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-white p-8">Basic Usage</h2>
        <p className="text-text-secondary px-8 pb-4">
          Default newsletter section with gradient background and animations
        </p>
        <NewsletterSection />
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">With Custom Styling</h2>
        <p className="text-text-secondary mb-6">
          Newsletter section with custom className for additional spacing
        </p>
        <NewsletterSection className="my-16" />
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Features Demonstration</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Key Features:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>Animated gradient background (purple, blue, gold)</li>
            <li>10-second gradient animation loop</li>
            <li>Text reveal animation for heading (word by word)</li>
            <li>Form slides up with bounce effect</li>
            <li>Decorative lines and shapes with fade-in</li>
            <li>Full-width responsive layout</li>
            <li>WCAG AA contrast compliance</li>
            <li>Respects prefers-reduced-motion setting</li>
            <li>Semantic HTML with proper ARIA labels</li>
          </ul>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Animation Details</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Animation Specifications:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li><strong>Gradient Background:</strong> 10000ms duration, diagonal direction</li>
            <li><strong>Text Reveal:</strong> 0.2s delay, 0.05s stagger between words</li>
            <li><strong>Subheading:</strong> 0.4s delay, slide up animation</li>
            <li><strong>Form:</strong> Bounce easing with 0.6s duration</li>
            <li><strong>Decorative Lines:</strong> Fade in with 0.8s duration</li>
            <li><strong>Decorative Shapes:</strong> Scale and fade with staggered delays</li>
          </ul>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Responsive Behavior</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Breakpoint Adaptations:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li><strong>Mobile (320px+):</strong> Single column, smaller heading (3xl)</li>
            <li><strong>Small (640px+):</strong> Heading increases to 4xl</li>
            <li><strong>Medium (768px+):</strong> Heading increases to 5xl, more padding</li>
            <li><strong>Large (1024px+):</strong> Heading increases to 6xl, maximum padding</li>
            <li><strong>Form:</strong> Stacks vertically on mobile, horizontal on desktop</li>
          </ul>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Accessibility Features</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">WCAG Compliance:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>Section has proper landmark with aria-labelledby</li>
            <li>Heading has unique ID for ARIA reference</li>
            <li>Decorative elements marked with aria-hidden</li>
            <li>Text maintains 4.5:1 contrast on gradient (white on colors)</li>
            <li>Animations respect prefers-reduced-motion</li>
            <li>Keyboard navigation fully supported</li>
            <li>Focus indicators visible on all interactive elements</li>
          </ul>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Integration Example</h2>
        <div className="bg-background-card p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Usage in Page:</h3>
          <pre className="bg-background-darker p-4 rounded text-sm text-text-secondary overflow-x-auto">
{`import { NewsletterSection } from '@/components/sections';

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <NewsletterSection />
      {/* Footer */}
    </main>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
