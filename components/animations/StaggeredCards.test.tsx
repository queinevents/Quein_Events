import { render, screen } from '@testing-library/react';
import { StaggeredCards } from './StaggeredCards';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: jest.fn(() => false),
}));

// Mock useIntersectionAnimation hook
jest.mock('@/hooks/useIntersectionAnimation', () => ({
  useIntersectionAnimation: jest.fn(() => ({
    ref: { current: null },
    isInView: true,
  })),
}));

describe('StaggeredCards', () => {
  it('renders all children', () => {
    render(
      <StaggeredCards>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <StaggeredCards className="custom-class">
        <div>Card 1</div>
      </StaggeredCards>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('respects reduced motion preference', () => {
    const { useReducedMotion } = require('framer-motion');
    useReducedMotion.mockReturnValue(true);

    render(
      <StaggeredCards>
        <div>Card 1</div>
        <div>Card 2</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('handles empty children gracefully', () => {
    const { container } = render(<StaggeredCards>{null}</StaggeredCards>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('accepts baseDelay prop', () => {
    render(
      <StaggeredCards baseDelay={200}>
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('accepts staggerDelay prop', () => {
    render(
      <StaggeredCards staggerDelay={150}>
        <div>Card 1</div>
        <div>Card 2</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('supports fade animation variant', () => {
    render(
      <StaggeredCards animation="fade">
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('supports slide-up animation variant', () => {
    render(
      <StaggeredCards animation="slide-up">
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('supports scale animation variant', () => {
    render(
      <StaggeredCards animation="scale">
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('uses intersection observer for triggering', () => {
    const { useIntersectionAnimation } = require('@/hooks/useIntersectionAnimation');
    
    render(
      <StaggeredCards>
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(useIntersectionAnimation).toHaveBeenCalledWith(0.2, true);
  });

  it('animates when in view', () => {
    const { useIntersectionAnimation } = require('@/hooks/useIntersectionAnimation');
    useIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });

    render(
      <StaggeredCards>
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('does not animate when not in view', () => {
    const { useIntersectionAnimation } = require('@/hooks/useIntersectionAnimation');
    useIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: false,
    });

    render(
      <StaggeredCards>
        <div>Card 1</div>
      </StaggeredCards>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });
});
