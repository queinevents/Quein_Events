import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GradientBackground } from './GradientBackground';

describe('GradientBackground Component', () => {
  beforeEach(() => {
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
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']} className="custom-class">
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('creates gradient with multiple colors', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6', '#F59E0B']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    const background = container?.style.background;
    
    expect(background).toContain('#8B5CF6');
    expect(background).toContain('#3B82F6');
    expect(background).toContain('#F59E0B');
  });

  it('uses solid background when only one color provided', () => {
    render(
      <GradientBackground colors={['#8B5CF6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.background).toBe('#8B5CF6');
  });

  it('applies default animation duration of 10000ms', async () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    
    await waitFor(() => {
      const animation = container?.style.animation;
      expect(animation).toContain('10000ms');
    });
  });

  it('applies custom animation duration when provided', async () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']} animationDuration={5000}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    
    await waitFor(() => {
      const animation = container?.style.animation;
      expect(animation).toContain('5000ms');
    });
  });

  it('applies horizontal gradient direction', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']} direction="horizontal">
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.background).toContain('90deg');
  });

  it('applies vertical gradient direction', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']} direction="vertical">
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.background).toContain('180deg');
  });

  it('applies diagonal gradient direction by default', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.background).toContain('135deg');
  });

  it('applies diagonal gradient direction when specified', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']} direction="diagonal">
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.background).toContain('135deg');
  });

  it('applies background-size for animation', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.backgroundSize).toBe('200% 200%');
  });

  it('respects prefers-reduced-motion setting', async () => {
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
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;

    await waitFor(() => {
      expect(container?.style.animation).toBe('none');
      expect(container?.style.backgroundSize).toBe('100% 100%');
      expect(container?.style.willChange).toBe('auto');
    });
  });

  it('uses will-change property when animation is enabled', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container?.style.willChange).toBe('background-position');
  });

  it('injects keyframes style when animation is enabled', async () => {
    const { container } = render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );

    await waitFor(() => {
      const styles = container.querySelectorAll('style');
      expect(styles.length).toBeGreaterThan(0);
      
      // Check if keyframes are present
      const hasKeyframes = Array.from(styles).some(style => 
        style.innerHTML.includes('@keyframes')
      );
      expect(hasKeyframes).toBe(true);
    });
  });

  it('does not inject keyframes when prefers-reduced-motion is enabled', async () => {
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

    const { container } = render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );

    await waitFor(() => {
      const styles = container.querySelectorAll('style');
      // Should not have any keyframes injected
      const hasKeyframes = Array.from(styles).some(style => 
        style.innerHTML.includes('@keyframes')
      );
      expect(hasKeyframes).toBe(false);
    });
  });

  it('handles empty colors array gracefully', () => {
    render(
      <GradientBackground colors={[]}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    // Should fallback to default color
    expect(container?.style.background).toBe('#8B5CF6');
  });

  it('applies relative positioning to container', () => {
    render(
      <GradientBackground colors={['#8B5CF6', '#3B82F6']}>
        <div data-testid="content">Test Content</div>
      </GradientBackground>
    );
    const container = screen.getByTestId('content').parentElement;
    expect(container).toHaveClass('relative');
  });
});
