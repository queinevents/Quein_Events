import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CounterAnimation } from './CounterAnimation';

// Mock the hooks
jest.mock('@/hooks/useCounterAnimation');
jest.mock('@/hooks/useIntersectionAnimation');
jest.mock('framer-motion', () => ({
  useReducedMotion: jest.fn(),
}));

import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { useReducedMotion } from 'framer-motion';

const mockUseCounterAnimation = useCounterAnimation as jest.MockedFunction<typeof useCounterAnimation>;
const mockUseIntersectionAnimation = useIntersectionAnimation as jest.MockedFunction<typeof useIntersectionAnimation>;
const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;

describe('CounterAnimation Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Default mock implementations
    mockUseReducedMotion.mockReturnValue(false);
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });
    mockUseCounterAnimation.mockReturnValue(0);
  });

  it('renders with target value', () => {
    mockUseCounterAnimation.mockReturnValue(2000);
    
    render(<CounterAnimation targetValue={2000} />);
    
    expect(screen.getByText('2000', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('applies suffix correctly', () => {
    mockUseCounterAnimation.mockReturnValue(2000);
    
    render(<CounterAnimation targetValue={2000} suffix="+" />);
    
    expect(screen.getByText('2000+', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('applies prefix correctly', () => {
    mockUseCounterAnimation.mockReturnValue(100);
    
    render(<CounterAnimation targetValue={100} prefix="$" />);
    
    expect(screen.getByText('$100', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('applies both prefix and suffix', () => {
    mockUseCounterAnimation.mockReturnValue(50);
    
    render(<CounterAnimation targetValue={50} prefix="$" suffix="K" />);
    
    expect(screen.getByText('$50K', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('formats decimals correctly', () => {
    mockUseCounterAnimation.mockReturnValue(99.5);
    
    render(<CounterAnimation targetValue={99.5} decimals={1} />);
    
    expect(screen.getByText('99.5', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('formats multiple decimals correctly', () => {
    mockUseCounterAnimation.mockReturnValue(3.14159);
    
    render(<CounterAnimation targetValue={3.14159} decimals={2} />);
    
    expect(screen.getByText('3.14', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    mockUseCounterAnimation.mockReturnValue(100);
    
    const { container } = render(
      <CounterAnimation targetValue={100} className="custom-class" />
    );
    
    const span = container.querySelector('span');
    expect(span).toHaveClass('custom-class');
  });

  it('includes aria-live="polite" for accessibility', () => {
    mockUseCounterAnimation.mockReturnValue(100);
    
    const { container } = render(<CounterAnimation targetValue={100} />);
    
    const span = container.querySelector('span[aria-live="polite"]');
    expect(span).toBeInTheDocument();
  });

  it('includes aria-atomic="true" for accessibility', () => {
    mockUseCounterAnimation.mockReturnValue(100);
    
    const { container } = render(<CounterAnimation targetValue={100} />);
    
    const span = container.querySelector('span[aria-atomic="true"]');
    expect(span).toBeInTheDocument();
  });

  it('provides screen reader alternative with sr-only class', () => {
    mockUseCounterAnimation.mockReturnValue(2000);
    
    const { container } = render(
      <CounterAnimation targetValue={2000} suffix="+" />
    );
    
    const srOnly = container.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent('2000+');
  });

  it('respects prefers-reduced-motion setting', () => {
    mockUseReducedMotion.mockReturnValue(true);
    mockUseCounterAnimation.mockReturnValue(0); // Animation not started
    
    render(<CounterAnimation targetValue={2000} />);
    
    // Should show final value immediately
    expect(screen.getByText('2000', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('uses intersection observer with correct threshold', () => {
    render(<CounterAnimation targetValue={100} />);
    
    expect(mockUseIntersectionAnimation).toHaveBeenCalledWith(0.3, true);
  });

  it('passes correct props to useCounterAnimation', () => {
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });
    
    render(
      <CounterAnimation
        targetValue={2000}
        duration={2500}
        easing="easeOutExpo"
      />
    );
    
    expect(mockUseCounterAnimation).toHaveBeenCalledWith(
      2000,
      2500,
      true,
      'easeOutExpo'
    );
  });

  it('uses default duration of 2000ms', () => {
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });
    
    render(<CounterAnimation targetValue={100} />);
    
    expect(mockUseCounterAnimation).toHaveBeenCalledWith(
      100,
      2000,
      true,
      'easeOutExpo'
    );
  });

  it('uses default easing of easeOutExpo', () => {
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });
    
    render(<CounterAnimation targetValue={100} />);
    
    expect(mockUseCounterAnimation).toHaveBeenCalledWith(
      100,
      2000,
      true,
      'easeOutExpo'
    );
  });

  it('animates when element is in view', () => {
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });
    
    render(<CounterAnimation targetValue={100} />);
    
    expect(mockUseCounterAnimation).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      true,
      expect.any(String)
    );
  });

  it('does not animate when element is not in view', () => {
    mockUseIntersectionAnimation.mockReturnValue({
      ref: { current: null },
      isInView: false,
    });
    
    render(<CounterAnimation targetValue={100} />);
    
    expect(mockUseCounterAnimation).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      false,
      expect.any(String)
    );
  });

  it('handles zero as target value', () => {
    mockUseCounterAnimation.mockReturnValue(0);
    
    render(<CounterAnimation targetValue={0} />);
    
    expect(screen.getByText('0', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });

  it('handles large numbers correctly', () => {
    mockUseCounterAnimation.mockReturnValue(1000000);
    
    render(<CounterAnimation targetValue={1000000} />);
    
    expect(screen.getByText('1000000', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });
});
