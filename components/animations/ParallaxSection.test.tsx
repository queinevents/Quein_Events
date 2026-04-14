import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParallaxSection } from './ParallaxSection';

// Mock the hooks
jest.mock('@/hooks/useParallaxScroll');

import { useParallaxScroll } from '@/hooks/useParallaxScroll';

const mockUseParallaxScroll = useParallaxScroll as jest.MockedFunction<typeof useParallaxScroll>;

describe('ParallaxSection Component', () => {
  let originalInnerWidth: number;
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    // Store original window.innerWidth
    originalInnerWidth = window.innerWidth;

    // Reset mocks before each test
    jest.clearAllMocks();

    // Default mock implementation for useParallaxScroll
    mockUseParallaxScroll.mockReturnValue({
      transform: 'translateY(50px)',
    });

    // Mock matchMedia for prefers-reduced-motion
    matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    window.matchMedia = matchMediaMock;

    // Mock window.innerWidth for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    // Restore original window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('renders children correctly', () => {
    render(
      <ParallaxSection speed={0.5}>
        <div>Test Content</div>
      </ParallaxSection>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies parallax transform on desktop', () => {
    mockUseParallaxScroll.mockReturnValue({
      transform: 'translateY(50px)',
    });

    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    const parallaxDiv = container.firstChild as HTMLElement;
    expect(parallaxDiv).toHaveStyle({ transform: 'translateY(50px)' });
  });

  it('disables parallax on mobile devices', async () => {
    // Set mobile viewport width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    // Wait for useEffect to run
    await waitFor(() => {
      const parallaxDiv = container.firstChild as HTMLElement;
      expect(parallaxDiv).toHaveStyle({ transform: 'none' });
    });
  });

  it('respects prefers-reduced-motion setting', async () => {
    // Mock prefers-reduced-motion: reduce
    matchMediaMock.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    // Wait for useEffect to run
    await waitFor(() => {
      const parallaxDiv = container.firstChild as HTMLElement;
      expect(parallaxDiv).toHaveStyle({ transform: 'none' });
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <ParallaxSection speed={0.5} className="custom-class">
        <div>Content</div>
      </ParallaxSection>
    );

    const parallaxDiv = container.firstChild as HTMLElement;
    expect(parallaxDiv).toHaveClass('custom-class');
  });

  it('passes speed prop to useParallaxScroll hook', () => {
    render(
      <ParallaxSection speed={0.7}>
        <div>Content</div>
      </ParallaxSection>
    );

    expect(mockUseParallaxScroll).toHaveBeenCalledWith(
      0.7,
      expect.any(Object)
    );
  });

  it('handles negative speed values', () => {
    render(
      <ParallaxSection speed={-0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    expect(mockUseParallaxScroll).toHaveBeenCalledWith(
      -0.5,
      expect.any(Object)
    );
  });

  it('sets willChange to auto when parallax is disabled', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    await waitFor(() => {
      const parallaxDiv = container.firstChild as HTMLElement;
      expect(parallaxDiv).toHaveStyle({ willChange: 'auto' });
    });
  });

  it('sets willChange to transform when parallax is enabled', () => {
    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    const parallaxDiv = container.firstChild as HTMLElement;
    expect(parallaxDiv).toHaveStyle({ willChange: 'transform' });
  });

  it('handles zero speed value', () => {
    render(
      <ParallaxSection speed={0}>
        <div>Content</div>
      </ParallaxSection>
    );

    expect(mockUseParallaxScroll).toHaveBeenCalledWith(
      0,
      expect.any(Object)
    );
  });

  it('handles maximum speed value', () => {
    render(
      <ParallaxSection speed={1}>
        <div>Content</div>
      </ParallaxSection>
    );

    expect(mockUseParallaxScroll).toHaveBeenCalledWith(
      1,
      expect.any(Object)
    );
  });

  it('handles minimum speed value', () => {
    render(
      <ParallaxSection speed={-1}>
        <div>Content</div>
      </ParallaxSection>
    );

    expect(mockUseParallaxScroll).toHaveBeenCalledWith(
      -1,
      expect.any(Object)
    );
  });

  it('disables transition when parallax is disabled', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { container } = render(
      <ParallaxSection speed={0.5}>
        <div>Content</div>
      </ParallaxSection>
    );

    await waitFor(() => {
      const parallaxDiv = container.firstChild as HTMLElement;
      expect(parallaxDiv).toHaveStyle({ transition: 'none' });
    });
  });

  it('renders multiple children correctly', () => {
    render(
      <ParallaxSection speed={0.5}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ParallaxSection>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('maintains accessibility when parallax is disabled', async () => {
    matchMediaMock.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ParallaxSection speed={0.5}>
        <button>Accessible Button</button>
      </ParallaxSection>
    );

    await waitFor(() => {
      const button = screen.getByText('Accessible Button');
      expect(button).toBeInTheDocument();
    });
  });
});
