import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TestimonialsSection from './TestimonialsSection';
import { TESTIMONIALS } from '@/lib/constants';

// Mock embla-carousel-react
const mockScrollPrev = vi.fn();
const mockScrollNext = vi.fn();
const mockScrollTo = vi.fn();
const mockSelectedScrollSnap = vi.fn(() => 0);
const mockOn = vi.fn();
const mockOff = vi.fn();
const mockRootNode = vi.fn(() => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

vi.mock('embla-carousel-react', () => ({
  default: () => [
    vi.fn(),
    {
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      scrollTo: mockScrollTo,
      selectedScrollSnap: mockSelectedScrollSnap,
      on: mockOn,
      off: mockOff,
      rootNode: mockRootNode,
    },
  ],
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

// Mock TestimonialCard component
vi.mock('@/components/ui/TestimonialCard', () => ({
  TestimonialCard: ({ clientName, quote }: any) => (
    <div data-testid="testimonial-card">
      <p>{clientName}</p>
      <p>{quote}</p>
    </div>
  ),
}));

describe('TestimonialsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders the section heading', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Client Stories')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Hear from our satisfied clients/i)).toBeInTheDocument();
  });

  it('renders all testimonials from constants', () => {
    render(<TestimonialsSection />);
    
    const testimonialCards = screen.getAllByTestId('testimonial-card');
    expect(testimonialCards).toHaveLength(TESTIMONIALS.length);
  });

  it('renders previous navigation button', () => {
    render(<TestimonialsSection />);
    
    const prevButton = screen.getByLabelText('Previous testimonial');
    expect(prevButton).toBeInTheDocument();
  });

  it('renders next navigation button', () => {
    render(<TestimonialsSection />);
    
    const nextButton = screen.getByLabelText('Next testimonial');
    expect(nextButton).toBeInTheDocument();
  });

  it('calls scrollPrev when previous button is clicked', () => {
    render(<TestimonialsSection />);
    
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);
    
    expect(mockScrollPrev).toHaveBeenCalled();
  });

  it('calls scrollNext when next button is clicked', () => {
    render(<TestimonialsSection />);
    
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    expect(mockScrollNext).toHaveBeenCalled();
  });

  it('renders dot indicators for each testimonial', () => {
    render(<TestimonialsSection />);
    
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(TESTIMONIALS.length);
  });

  it('calls scrollTo when dot indicator is clicked', () => {
    render(<TestimonialsSection />);
    
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[2]);
    
    expect(mockScrollTo).toHaveBeenCalledWith(2);
  });

  it('has proper ARIA attributes for carousel', () => {
    const { container } = render(<TestimonialsSection />);
    
    const carousel = container.querySelector('[role="region"]');
    expect(carousel).toHaveAttribute('aria-label', 'Testimonials carousel');
    expect(carousel).toHaveAttribute('aria-live', 'polite');
    expect(carousel).toHaveAttribute('aria-atomic', 'true');
  });

  it('has proper ARIA attributes for slides', () => {
    const { container } = render(<TestimonialsSection />);
    
    const slides = container.querySelectorAll('[role="group"]');
    expect(slides).toHaveLength(TESTIMONIALS.length);
    
    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute('aria-roledescription', 'slide');
      expect(slide).toHaveAttribute('aria-label', `Slide ${index + 1} of ${TESTIMONIALS.length}`);
    });
  });

  it('renders gradient background overlay', () => {
    const { container } = render(<TestimonialsSection />);
    const gradient = container.querySelector('.bg-gradient-to-br');
    
    expect(gradient).toBeInTheDocument();
  });

  it('has keyboard navigation support', () => {
    const { container } = render(<TestimonialsSection />);
    
    const carousel = container.querySelector('[role="region"]');
    expect(carousel).toHaveAttribute('tabIndex', '0');
  });

  it('renders screen reader announcement', () => {
    render(<TestimonialsSection />);
    
    const announcement = screen.getByText(/Showing testimonial 1 of/);
    expect(announcement).toBeInTheDocument();
    expect(announcement.parentElement).toHaveClass('sr-only');
  });

  it('navigation buttons have proper focus styles', () => {
    render(<TestimonialsSection />);
    
    const prevButton = screen.getByLabelText('Previous testimonial');
    const nextButton = screen.getByLabelText('Next testimonial');
    
    expect(prevButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-purple');
    expect(nextButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-purple');
  });

  it('dot indicators have proper focus styles', () => {
    render(<TestimonialsSection />);
    
    const dots = screen.getAllByRole('tab');
    dots.forEach(dot => {
      expect(dot).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-purple');
    });
  });

  it('has proper section ID for navigation', () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector('section');
    
    expect(section).toHaveAttribute('id', 'testimonials');
  });

  it('renders with dark background', () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector('section');
    
    expect(section).toHaveClass('bg-background-darker');
  });

  it('has proper spacing classes', () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector('section');
    
    expect(section).toHaveClass('py-16', 'md:py-24', 'lg:py-32');
  });
});
