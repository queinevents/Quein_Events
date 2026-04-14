import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedSection } from './AnimatedSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  useReducedMotion: jest.fn(() => false),
}));

describe('AnimatedSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <AnimatedSection className="custom-class">
        <div>Test Content</div>
      </AnimatedSection>
    );
    const wrapper = screen.getByTestId('motion-div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('uses fade animation by default', () => {
    const { container } = render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );
    const motionDiv = container.querySelector('[data-testid="motion-div"]');
    expect(motionDiv).toBeInTheDocument();
  });

  it('accepts slide-up animation variant', () => {
    render(
      <AnimatedSection animation="slide-up">
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('accepts slide-left animation variant', () => {
    render(
      <AnimatedSection animation="slide-left">
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('accepts slide-right animation variant', () => {
    render(
      <AnimatedSection animation="slide-right">
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('accepts custom delay prop', () => {
    render(
      <AnimatedSection delay={0.5}>
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion setting', () => {
    const { useReducedMotion } = require('framer-motion');
    useReducedMotion.mockReturnValue(true);

    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );

    // When reduced motion is preferred, it should render a plain div
    const content = screen.getByText('Test Content');
    expect(content.parentElement).not.toHaveAttribute('data-testid', 'motion-div');
  });

  it('renders motion.div when reduced motion is not preferred', () => {
    const { useReducedMotion } = require('framer-motion');
    useReducedMotion.mockReturnValue(false);

    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('applies className when reduced motion is enabled', () => {
    const { useReducedMotion } = require('framer-motion');
    useReducedMotion.mockReturnValue(true);

    render(
      <AnimatedSection className="custom-class">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });
});
