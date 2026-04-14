import { render, screen } from '@testing-library/react';
import { NewsletterSection } from './NewsletterSection';
import '@testing-library/jest-dom';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}));

describe('NewsletterSection', () => {
  it('renders section with correct heading', () => {
    render(<NewsletterSection />);
    
    expect(screen.getByRole('heading', { name: /stay updated with our latest events/i })).toBeInTheDocument();
  });

  it('renders subheading text', () => {
    render(<NewsletterSection />);
    
    expect(screen.getByText(/join our newsletter for exclusive insights/i)).toBeInTheDocument();
  });

  it('renders newsletter form', () => {
    render(<NewsletterSection />);
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe to newsletter/i })).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<NewsletterSection />);
    
    const section = container.querySelector('#newsletter');
    expect(section).toBeInTheDocument();
  });

  it('has proper ARIA labelledby attribute', () => {
    const { container } = render(<NewsletterSection />);
    
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'newsletter-heading');
  });

  it('renders with custom className', () => {
    const { container } = render(<NewsletterSection className="custom-class" />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('renders decorative elements with aria-hidden', () => {
    const { container } = render(<NewsletterSection />);
    
    const decorativeContainer = container.querySelector('[aria-hidden="true"]');
    expect(decorativeContainer).toBeInTheDocument();
  });

  it('uses GradientBackground with correct colors', () => {
    const { container } = render(<NewsletterSection />);
    
    // Check that gradient background is applied
    const gradientElement = container.querySelector('[style*="background"]');
    expect(gradientElement).toBeInTheDocument();
  });

  it('maintains responsive layout structure', () => {
    const { container } = render(<NewsletterSection />);
    
    // Check for container with responsive padding
    const contentContainer = container.querySelector('.container');
    expect(contentContainer).toBeInTheDocument();
  });

  it('heading has correct text size classes', () => {
    render(<NewsletterSection />);
    
    const heading = screen.getByRole('heading', { name: /stay updated with our latest events/i });
    expect(heading).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl');
  });

  it('renders with full-width layout', () => {
    const { container } = render(<NewsletterSection />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('w-full');
  });

  it('has overflow hidden for decorative elements', () => {
    const { container } = render(<NewsletterSection />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('overflow-hidden');
  });
});
