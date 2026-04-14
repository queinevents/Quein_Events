import React from 'react';
import TestimonialsSection from './TestimonialsSection';

/**
 * TestimonialsSection Component Example
 * 
 * This file demonstrates the usage of the TestimonialsSection component.
 * 
 * Features:
 * - Auto-rotating carousel (6 seconds per slide)
 * - Pauses on hover and focus
 * - Keyboard navigation (arrow keys)
 * - Previous/next navigation buttons
 * - Dot indicators for each testimonial
 * - Screen reader accessible
 * - Respects prefers-reduced-motion
 * 
 * The component uses testimonials data from lib/constants.ts (TESTIMONIALS array).
 */

export default function TestimonialsSectionExample() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Example 1: Default Usage */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8 pt-8">
          Default Testimonials Section
        </h2>
        <TestimonialsSection />
      </div>

      {/* Usage Instructions */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-background-card p-8 rounded-lg border border-text-secondary/10">
          <h3 className="text-xl font-bold text-text-primary mb-4">
            Usage Instructions
          </h3>
          
          <div className="space-y-4 text-text-secondary">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Basic Usage:</h4>
              <pre className="bg-background-darker p-4 rounded overflow-x-auto">
                <code>{`import { TestimonialsSection } from '@/components/sections';

<TestimonialsSection />`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Auto-rotates every 6 seconds</li>
                <li>Pauses on hover or focus</li>
                <li>Navigate with arrow keys (← →)</li>
                <li>Click previous/next buttons</li>
                <li>Click dot indicators to jump to specific slide</li>
                <li>Fully keyboard accessible</li>
                <li>Screen reader announces slide changes</li>
                <li>Respects prefers-reduced-motion setting</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Data Source:</h4>
              <p>
                Testimonials are loaded from <code className="bg-background-darker px-2 py-1 rounded">lib/constants.ts</code> (TESTIMONIALS array).
                Update the array to add, remove, or modify testimonials.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Accessibility:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Carousel has proper ARIA labels and roles</li>
                <li>Each slide is announced to screen readers</li>
                <li>Navigation buttons have descriptive labels</li>
                <li>Auto-rotation pauses on hover and focus</li>
                <li>Keyboard navigation with arrow keys</li>
                <li>Focus indicators on all interactive elements</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Customization:</h4>
              <p>
                To customize testimonials, edit the TESTIMONIALS array in <code className="bg-background-darker px-2 py-1 rounded">lib/constants.ts</code>:
              </p>
              <pre className="bg-background-darker p-4 rounded overflow-x-auto mt-2">
                <code>{`export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Client Name",
    clientRole: "Role",
    clientCompany: "Company",
    quote: "Testimonial quote...",
    rating: 5,
    eventType: "Event Type",
    imageUrl: "/images/testimonials/client.jpg",
  },
  // Add more testimonials...
];`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
