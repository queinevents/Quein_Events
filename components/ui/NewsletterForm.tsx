'use client';

import { useState, FormEvent } from 'react';
import { newsletterFormSchema, NewsletterFormData } from '@/lib/schemas';
import Input from './Input';
import Button from './Button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  className?: string;
}

/**
 * NewsletterForm component for email subscription
 * Features email validation, loading states, success/error messages
 * Includes ripple effect on button click and checkmark animation on success
 * Fully keyboard accessible with proper ARIA labels
 * 
 * @param className - Additional CSS classes for container
 * 
 * @example
 * <NewsletterForm />
 * 
 * Features:
 * - Email validation using Zod schema
 * - Loading state during submission
 * - Success message with checkmark animation
 * - Error message display
 * - Form reset after successful submission
 * - Ripple effect on button click
 * - Privacy notice
 * - Keyboard accessible
 * 
 * Accessibility:
 * - Proper form labels and ARIA attributes
 * - Error messages announced to screen readers
 * - Focus management
 * - Keyboard navigation support
 * 
 * **Validates: Requirements 8.1, 8.6, 8.7, 8.8, 8.9, 18.1-18.12**
 */
export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    // Validate email using Zod schema
    const result = newsletterFormSchema.safeParse({ email });

    if (!result.success) {
      const emailError = result.error.errors.find(err => err.path[0] === 'email');
      setError(emailError?.message || 'Invalid email address');
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Simulate API call (placeholder for Phase 1)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success state
      setIsSuccess(true);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              disabled={isLoading || isSuccess}
              required
              aria-label="Email address"
              className="h-14 text-base"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading || isSuccess}
            onClick={handleButtonClick}
            className="relative overflow-hidden sm:w-auto w-full h-14"
            aria-label={isLoading ? 'Subscribing...' : 'Subscribe to newsletter'}
          >
            {/* Ripple effects */}
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 0,
                  height: 0,
                }}
              />
            ))}
            {isSuccess ? 'Subscribed!' : 'Subscribe'}
          </Button>
        </div>

        {/* Success message with checkmark animation */}
        {isSuccess && (
          <div
            className="flex items-center gap-2 text-green-400 animate-fade-in"
            role="status"
            aria-live="polite"
          >
            <svg
              className="w-5 h-5 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium">
              Thank you for subscribing! Check your email for confirmation.
            </span>
          </div>
        )}

        {/* Privacy notice */}
        <p className="text-xs text-text-secondary text-center sm:text-left">
          We respect your privacy. Unsubscribe anytime.{' '}
          <a
            href="#privacy"
            className="text-primary-purple hover:text-purple-400 underline transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </form>

      <style jsx>{`
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 100, 0;
            stroke-dashoffset: 0;
          }
        }

        :global(.animate-ripple) {
          animation: ripple 600ms ease-out;
        }

        :global(.animate-fade-in) {
          animation: fade-in 400ms ease-out;
        }

        :global(.animate-checkmark) {
          animation: checkmark 400ms ease-out;
        }
      `}</style>
    </div>
  );
}
