'use client';

import { useInView } from 'react-intersection-observer';
import { useCounterAnimation } from './useCounterAnimation';

/**
 * Example demonstrating the useCounterAnimation hook
 * 
 * This example shows how to use the hook with Intersection Observer
 * to trigger the animation when the element comes into view.
 */
export default function CounterAnimationExample() {
  // Use Intersection Observer to detect when element is in view
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Animate counters with different configurations
  const yearsCount = useCounterAnimation(15, 2000, inView1, 'easeOutExpo');
  const eventsCount = useCounterAnimation(2000, 2500, inView2, 'easeOutExpo');
  const clientsCount = useCounterAnimation(200, 2000, inView3, 'easeOutExpo');
  const linearCount = useCounterAnimation(100, 2000, inView4, 'linear');

  return (
    <div className="min-h-screen bg-background-dark py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-text-primary">
          Counter Animation Examples
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Example 1: Years Experience */}
          <div
            ref={ref1}
            className="bg-background-light p-8 rounded-lg text-center"
          >
            <div className="text-6xl font-bold text-primary-purple mb-4">
              {yearsCount}+
            </div>
            <div className="text-xl text-text-secondary">Years Experience</div>
            <div className="text-sm text-text-muted mt-2">
              Duration: 2000ms | Easing: easeOutExpo
            </div>
          </div>

          {/* Example 2: Events Completed */}
          <div
            ref={ref2}
            className="bg-background-light p-8 rounded-lg text-center"
          >
            <div className="text-6xl font-bold text-primary-blue mb-4">
              {eventsCount}+
            </div>
            <div className="text-xl text-text-secondary">Events Completed</div>
            <div className="text-sm text-text-muted mt-2">
              Duration: 2500ms | Easing: easeOutExpo
            </div>
          </div>

          {/* Example 3: Happy Clients */}
          <div
            ref={ref3}
            className="bg-background-light p-8 rounded-lg text-center"
          >
            <div className="text-6xl font-bold text-accent-gold mb-4">
              {clientsCount}+
            </div>
            <div className="text-xl text-text-secondary">Happy Clients</div>
            <div className="text-sm text-text-muted mt-2">
              Duration: 2000ms | Easing: easeOutExpo
            </div>
          </div>
        </div>

        {/* Example 4: Linear Easing Comparison */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">
            Linear Easing Example
          </h2>
          <div
            ref={ref4}
            className="bg-background-light p-8 rounded-lg text-center"
          >
            <div className="text-6xl font-bold text-primary-purple mb-4">
              {linearCount}
            </div>
            <div className="text-xl text-text-secondary">
              Linear Animation (Constant Speed)
            </div>
            <div className="text-sm text-text-muted mt-2">
              Duration: 2000ms | Easing: linear
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="max-w-4xl mx-auto mt-16 bg-background-light p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            How to Use
          </h2>
          <pre className="bg-background-dark p-4 rounded overflow-x-auto text-sm">
            <code className="text-text-secondary">{`import { useInView } from 'react-intersection-observer';
import { useCounterAnimation } from '@/hooks';

function MyComponent() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const count = useCounterAnimation(
    2000,        // target value
    2500,        // duration in ms
    inView,      // trigger when in view
    'easeOutExpo' // easing function
  );

  return (
    <div ref={ref}>
      <span>{count}+</span>
    </div>
  );
}`}</code>
          </pre>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              Available Easing Functions:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong>easeOutExpo</strong>: Dramatic deceleration (1 - 2^(-10 * progress))
              </li>
              <li>
                <strong>linear</strong>: Constant speed throughout
              </li>
              <li>
                <strong>easeOut</strong>: Smooth deceleration
              </li>
              <li>
                <strong>easeInOut</strong>: Slow start and end, fast middle
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              Features:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Smooth animation using requestAnimationFrame</li>
              <li>Configurable duration and easing functions</li>
              <li>Triggers based on viewport visibility</li>
              <li>Automatic cleanup on unmount</li>
              <li>Resets when element leaves viewport</li>
              <li>Ensures final value matches target exactly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
