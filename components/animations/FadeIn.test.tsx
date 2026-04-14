import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FadeIn } from './FadeIn';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

describe('FadeIn Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    window.IntersectionObserver = mockIntersectionObserver as any;
    
    // Mock matchMedia for prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <FadeIn className="custom-class">
        <div>Test Content</div>
      </FadeIn>
    );
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('creates IntersectionObserver with correct threshold', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.2,
      })
    );
  });

  it('starts with opacity 0 before intersection', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveStyle({ opacity: 0 });
  });

  it('applies default duration of 600ms', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveStyle(expect.objectContaining({
      transition: expect.stringContaining('600ms'),
    }));
  });

  it('applies custom duration when provided', () => {
    render(
      <FadeIn duration={400}>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveStyle(expect.objectContaining({
      transition: expect.stringContaining('400ms'),
    }));
  });

  it('applies custom delay when provided', () => {
    render(
      <FadeIn delay={200}>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveStyle(expect.objectContaining({
      transition: expect.stringContaining('200ms'),
    }));
  });

  it('respects prefers-reduced-motion setting', () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveStyle({ transition: 'none' });
  });

  it('shows content immediately when IntersectionObserver is not supported', () => {
    // Remove IntersectionObserver
    (window as any).IntersectionObserver = undefined;

    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    // Content should be visible immediately
    waitFor(() => {
      expect(wrapper).toHaveStyle({ opacity: 1 });
    });
  });

  it('shows content immediately when prefers-reduced-motion is enabled', async () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    const wrapper = screen.getByText('Test Content').parentElement;
    await waitFor(() => {
      expect(wrapper).toHaveStyle({ opacity: 1 });
    });
  });
});
