import { NewsletterForm } from './NewsletterForm';

/**
 * NewsletterForm Component Examples
 * 
 * This file demonstrates various use cases of the NewsletterForm component.
 */

export default function NewsletterFormExamples() {
  return (
    <div className="space-y-12 p-8 bg-background-dark min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Basic Usage</h2>
        <p className="text-text-secondary mb-6">
          Default newsletter form with email validation and submission handling
        </p>
        <div className="bg-background-card p-8 rounded-lg">
          <NewsletterForm />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">With Custom Styling</h2>
        <p className="text-text-secondary mb-6">
          Newsletter form with custom className for additional styling
        </p>
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-lg">
          <NewsletterForm className="max-w-xl" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Features Demonstration</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Key Features:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>Email format validation using Zod schema</li>
            <li>Real-time error display for invalid input</li>
            <li>Loading state with spinner during submission</li>
            <li>Success message with animated checkmark</li>
            <li>Ripple effect on button click</li>
            <li>Form reset after successful submission</li>
            <li>Privacy notice with policy link</li>
            <li>Fully keyboard accessible</li>
            <li>Responsive layout (stacks on mobile)</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Validation Examples</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">Try these test cases:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li><strong>Valid:</strong> test@example.com</li>
            <li><strong>Invalid:</strong> invalid-email (missing @)</li>
            <li><strong>Invalid:</strong> test@ (incomplete domain)</li>
            <li><strong>Invalid:</strong> @example.com (missing local part)</li>
            <li><strong>Empty:</strong> Submit without entering email</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Accessibility Features</h2>
        <div className="bg-background-card p-8 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-white">WCAG Compliance:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>Proper ARIA labels for screen readers</li>
            <li>Error messages announced with role=&quot;alert&quot;</li>
            <li>Success messages with aria-live=&quot;polite&quot;</li>
            <li>Keyboard navigation support (Tab, Enter)</li>
            <li>Focus indicators on all interactive elements</li>
            <li>Disabled state properly communicated</li>
            <li>Required field indication</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
