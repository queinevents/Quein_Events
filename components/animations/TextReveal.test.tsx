import { render, screen } from '@testing-library/react';
import { TextReveal } from './TextReveal';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useReducedMotion: jest.fn(() => false),
}));

describe('TextReveal', () => {
  it('renders text content', () => {
    render(<TextReveal>Hello World</TextReveal>);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/World/)).toBeInTheDocument();
  });

  it('splits text by words by default', () => {
    const { container } = render(<TextReveal>Hello World Test</TextReveal>);
    const spans = container.querySelectorAll('span span');
    // Should have 3 word spans (Hello, World, Test) plus spaces
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });

  it('splits text by characters when specified', () => {
    const { container } = render(
      <TextReveal splitBy="character">Hi</TextReveal>
    );
    const spans = container.querySelectorAll('span span');
    // Should have 2 character spans (H, i)
    expect(spans.length).toBe(2);
  });

  it('applies custom className', () => {
    const { container } = render(
      <TextReveal className="custom-class">Test</TextReveal>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('respects reduced motion preference', () => {
    const { useReducedMotion } = require('framer-motion');
    useReducedMotion.mockReturnValue(true);

    const { container } = render(<TextReveal>Test Content</TextReveal>);
    expect(container.textContent).toBe('Test Content');
  });

  it('handles empty children gracefully', () => {
    const { container } = render(<TextReveal>{''}</TextReveal>);
    expect(container).toBeInTheDocument();
  });

  it('accepts delay prop', () => {
    const { container } = render(
      <TextReveal delay={0.5}>Delayed Text</TextReveal>
    );
    expect(container).toBeInTheDocument();
  });

  it('accepts stagger prop', () => {
    const { container } = render(
      <TextReveal stagger={0.1}>Staggered Text</TextReveal>
    );
    expect(container).toBeInTheDocument();
  });

  it('supports slide-up animation variant', () => {
    const { container } = render(
      <TextReveal animation="slide-up">Slide Up</TextReveal>
    );
    expect(container).toBeInTheDocument();
  });

  it('supports fade animation variant', () => {
    const { container } = render(
      <TextReveal animation="fade">Fade In</TextReveal>
    );
    expect(container).toBeInTheDocument();
  });

  it('supports scale animation variant', () => {
    const { container } = render(
      <TextReveal animation="scale">Scale In</TextReveal>
    );
    expect(container).toBeInTheDocument();
  });

  it('preserves spaces between words', () => {
    const { container } = render(<TextReveal>Word One Word Two</TextReveal>);
    const text = container.textContent;
    expect(text).toContain(' ');
  });

  it('includes aria-label for accessibility', () => {
    const { container } = render(<TextReveal>Accessible Text</TextReveal>);
    const element = container.querySelector('[aria-label]');
    expect(element).toHaveAttribute('aria-label', 'Accessible Text');
  });
});
