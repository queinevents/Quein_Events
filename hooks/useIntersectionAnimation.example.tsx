'use client';

import { useIntersectionAnimation } from './useIntersectionAnimation';
import { useCounterAnimation } from './useCounterAnimation';

/**
 * Example demonstrating the useIntersectionAnimation hook
 * 
 * This example shows how to use the hook to detect element visibility
 * and trigger animations when elements enter the viewport.
 */
export default function IntersectionAnimationExample() {
  // Example 1: Basic usage with default settings (threshold: 0.3, triggerOnce: true)
  const { ref: ref1, isInView: isInView1 } = useIntersectionAnimation();
  const count1 = useCounterAnimation(100, 2000, isInView1);

  // Example 2: Custom threshold (50% visibility required)
  const { ref: ref2, isInView: isInView2 } = useIntersectionAnimation(0.5, true);
  const count2 = useCounterAnimation(250, 2000, isInView2);

  // Example 3: Trigger multiple times (triggerOnce: false)
  const { ref: ref3, isInView: isInView3 } = useIntersectionAnimation(0.3, false);
  const count3 = useCounterAnimation(500, 2000, isInView3);

  // Example 4: High threshold (entire element must be visible)
  const { ref: ref4, isInView: isInView4 } = useIntersectionAnimation(1.0, true);

  // Example 5: Low threshold (trigger as soon as element appears)
  const { ref: ref5, isInView: isInView5 } = useIntersectionAnimation(0, true);

  return (
    <div className="min-h-screen bg-background-dark py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-text-primary">
          Intersection Animation Examples
        </h1>

        {/* Spacer to allow scrolling */}
        <div className="h-screen flex items-center justify-center">
          <p className="text-2xl text-text-secondary">
            Scroll down to see animations trigger
          </p>
        </div>

        {/* Example 1: Default Settings */}
        <div
          ref={ref1 as React.RefObject<HTMLDivElement>}
          className="mb-32 bg-background-light p-12 rounded-lg text-center transform transition-all duration-500"
          style={{
            opacity: isInView1 ? 1 : 0,
            transform: isInView1 ? 'translateY(0)' : 'translateY(50px)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-purple">
            Example 1: Default Settings
          </h2>
          <div className="text-6xl font-bold text-primary-purple mb-4">
            {count1}
          </div>
          <p className="text-text-secondary mb-2">
            Threshold: 0.3 (30% visible) | Trigger Once: true
          </p>
          <p className="text-sm text-text-muted">
            Animation triggers when 30% of element is visible and only once
          </p>
        </div>

        {/* Example 2: Custom Threshold */}
        <div
          ref={ref2 as React.RefObject<HTMLDivElement>}
          className="mb-32 bg-background-light p-12 rounded-lg text-center transform transition-all duration-500"
          style={{
            opacity: isInView2 ? 1 : 0,
            transform: isInView2 ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-blue">
            Example 2: Custom Threshold
          </h2>
          <div className="text-6xl font-bold text-primary-blue mb-4">
            {count2}
          </div>
          <p className="text-text-secondary mb-2">
            Threshold: 0.5 (50% visible) | Trigger Once: true
          </p>
          <p className="text-sm text-text-muted">
            Animation triggers when 50% of element is visible
          </p>
        </div>

        {/* Example 3: Repeating Animation */}
        <div
          ref={ref3 as React.RefObject<HTMLDivElement>}
          className="mb-32 bg-background-light p-12 rounded-lg text-center transform transition-all duration-500"
          style={{
            opacity: isInView3 ? 1 : 0.3,
            transform: isInView3 ? 'translateX(0)' : 'translateX(-50px)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-accent-gold">
            Example 3: Repeating Animation
          </h2>
          <div className="text-6xl font-bold text-accent-gold mb-4">
            {count3}
          </div>
          <p className="text-text-secondary mb-2">
            Threshold: 0.3 (30% visible) | Trigger Once: false
          </p>
          <p className="text-sm text-text-muted">
            Animation triggers every time element enters/exits viewport
          </p>
          <p className="text-xs text-text-muted mt-2">
            Scroll up and down to see the animation repeat
          </p>
        </div>

        {/* Example 4: High Threshold */}
        <div
          ref={ref4 as React.RefObject<HTMLDivElement>}
          className="mb-32 bg-background-light p-12 rounded-lg text-center transform transition-all duration-500"
          style={{
            opacity: isInView4 ? 1 : 0,
            transform: isInView4 ? 'rotate(0deg)' : 'rotate(-5deg)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-purple">
            Example 4: High Threshold
          </h2>
          <div className="text-2xl text-text-secondary mb-4">
            {isInView4 ? '✓ Fully Visible' : '⏳ Waiting...'}
          </div>
          <p className="text-text-secondary mb-2">
            Threshold: 1.0 (100% visible) | Trigger Once: true
          </p>
          <p className="text-sm text-text-muted">
            Animation triggers only when entire element is visible
          </p>
        </div>

        {/* Example 5: Low Threshold */}
        <div
          ref={ref5 as React.RefObject<HTMLDivElement>}
          className="mb-32 bg-background-light p-12 rounded-lg text-center transform transition-all duration-500"
          style={{
            opacity: isInView5 ? 1 : 0,
            transform: isInView5 ? 'translateY(0)' : 'translateY(100px)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-blue">
            Example 5: Low Threshold
          </h2>
          <div className="text-2xl text-text-secondary mb-4">
            {isInView5 ? '✓ Triggered!' : '⏳ Waiting...'}
          </div>
          <p className="text-text-secondary mb-2">
            Threshold: 0 (any part visible) | Trigger Once: true
          </p>
          <p className="text-sm text-text-muted">
            Animation triggers as soon as any part of element appears
          </p>
        </div>

        {/* Usage Instructions */}
        <div className="max-w-4xl mx-auto mt-16 bg-background-light p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            How to Use
          </h2>
          <pre className="bg-background-dark p-4 rounded overflow-x-auto text-sm">
            <code className="text-text-secondary">{`import { useIntersectionAnimation } from '@/hooks';
import { useCounterAnimation } from '@/hooks';

function MyComponent() {
  // Get ref and isInView state
  const { ref, isInView } = useIntersectionAnimation(
    0.3,    // threshold (0-1)
    true    // triggerOnce
  );

  // Use isInView to trigger animations
  const count = useCounterAnimation(100, 2000, isInView);

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(50px)',
      }}
    >
      <span>{count}</span>
    </div>
  );
}`}</code>
          </pre>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              Parameters:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong>threshold</strong> (0-1): Percentage of element that must be visible
                <ul className="list-circle list-inside ml-6 mt-1 text-sm">
                  <li>0: Trigger as soon as any part is visible</li>
                  <li>0.3: Trigger when 30% is visible (recommended)</li>
                  <li>0.5: Trigger when 50% is visible</li>
                  <li>1.0: Trigger only when entire element is visible</li>
                </ul>
              </li>
              <li>
                <strong>triggerOnce</strong> (boolean): Whether to trigger only once
                <ul className="list-circle list-inside ml-6 mt-1 text-sm">
                  <li>true: Animation triggers once and observer disconnects (better performance)</li>
                  <li>false: Animation can trigger multiple times as element enters/exits viewport</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              Features:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Uses native Intersection Observer API for performance</li>
              <li>Configurable visibility threshold (0-1)</li>
              <li>Optional trigger-once mode for better performance</li>
              <li>Automatic cleanup on unmount</li>
              <li>Graceful fallback for SSR and unsupported browsers</li>
              <li>Automatic threshold clamping to valid range</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              Use Cases:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Trigger counter animations when statistics section enters viewport</li>
              <li>Fade in content as user scrolls down the page</li>
              <li>Lazy load images or heavy components</li>
              <li>Track which sections user has viewed</li>
              <li>Implement scroll-triggered animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
