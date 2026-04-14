import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageZoom } from './ImageZoom';

describe('ImageZoom Component', () => {
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
      <ImageZoom>
        <img src="/test.jpg" alt="Test Image" />
      </ImageZoom>
    );
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('applies overflow hidden to container', () => {
    render(
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const container = screen.getByTestId('content').parentElement?.parentElement;
    expect(container).toHaveClass('overflow-hidden');
  });

  it('applies custom className to container', () => {
    render(
      <ImageZoom className="custom-class">
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const container = screen.getByTestId('content').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('applies default scale of 1.1 on hover', () => {
    render(
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const container = screen.getByTestId('content').parentElement?.parentElement;
    const imageContainer = screen.getByTestId('content').parentElement;

    // Before hover
    expect(imageContainer).toHaveStyle({ transform: 'scale(1)' });

    // On hover
    if (container) {
      fireEvent.mouseEnter(container);
    }
    expect(imageContainer).toHaveStyle({ transform: 'scale(1.1)' });

    // After hover
    if (container) {
      fireEvent.mouseLeave(container);
    }
    expect(imageContainer).toHaveStyle({ transform: 'scale(1)' });
  });

  it('applies custom scale when provided', () => {
    render(
      <ImageZoom scale={1.15}>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const container = screen.getByTestId('content').parentElement?.parentElement;
    const imageContainer = screen.getByTestId('content').parentElement;

    if (container) {
      fireEvent.mouseEnter(container);
    }
    expect(imageContainer).toHaveStyle({ transform: 'scale(1.15)' });
  });

  it('applies default duration of 400ms', () => {
    render(
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const imageContainer = screen.getByTestId('content').parentElement;
    expect(imageContainer).toHaveStyle({
      transition: 'transform 400ms ease-out',
    });
  });

  it('applies custom duration when provided', () => {
    render(
      <ImageZoom duration={500}>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const imageContainer = screen.getByTestId('content').parentElement;
    expect(imageContainer).toHaveStyle({
      transition: 'transform 500ms ease-out',
    });
  });

  it('does not show overlay by default', () => {
    const { container } = render(
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const overlays = container.querySelectorAll('.absolute.inset-0');
    expect(overlays.length).toBe(0);
  });

  it('shows overlay when overlay prop is true', () => {
    const { container } = render(
      <ImageZoom overlay>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const overlays = container.querySelectorAll('.absolute.inset-0');
    expect(overlays.length).toBe(1);
  });

  it('applies default overlay color', () => {
    const { container } = render(
      <ImageZoom overlay>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const overlay = container.querySelector('.absolute.inset-0');
    expect(overlay).toHaveStyle({
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
    });
  });

  it('applies custom overlay color when provided', () => {
    const { container } = render(
      <ImageZoom overlay overlayColor="rgba(255, 0, 0, 0.5)">
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const overlay = container.querySelector('.absolute.inset-0');
    expect(overlay).toHaveStyle({
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
    });
  });

  it('fades in overlay on hover', () => {
    const { container } = render(
      <ImageZoom overlay>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const mainContainer = screen.getByTestId('content').parentElement?.parentElement;
    const overlay = container.querySelector('.absolute.inset-0') as HTMLElement;

    // Before hover
    expect(overlay).toHaveStyle({ opacity: 0 });

    // On hover
    if (mainContainer) {
      fireEvent.mouseEnter(mainContainer);
    }
    expect(overlay).toHaveStyle({ opacity: 1 });

    // After hover
    if (mainContainer) {
      fireEvent.mouseLeave(mainContainer);
    }
    expect(overlay).toHaveStyle({ opacity: 0 });
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
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );

    const container = screen.getByTestId('content').parentElement?.parentElement;
    const imageContainer = screen.getByTestId('content').parentElement;

    await waitFor(() => {
      expect(imageContainer).toHaveStyle({ transition: 'transform 0ms ease-out' });
    });

    // Hover should not scale when reduced motion is preferred
    if (container) {
      fireEvent.mouseEnter(container);
    }
    await waitFor(() => {
      expect(imageContainer).toHaveStyle({ transform: 'scale(1)' });
    });
  });

  it('disables overlay when prefers-reduced-motion is enabled', async () => {
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
      <ImageZoom overlay>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );

    const mainContainer = screen.getByTestId('content').parentElement?.parentElement;
    const overlay = container.querySelector('.absolute.inset-0') as HTMLElement;

    // Hover should not show overlay when reduced motion is preferred
    if (mainContainer) {
      fireEvent.mouseEnter(mainContainer);
    }
    await waitFor(() => {
      expect(overlay).toHaveStyle({ opacity: 0 });
    });
  });

  it('uses will-change property appropriately', () => {
    render(
      <ImageZoom>
        <div data-testid="content">Test Content</div>
      </ImageZoom>
    );
    const container = screen.getByTestId('content').parentElement?.parentElement;
    const imageContainer = screen.getByTestId('content').parentElement;

    // Before hover - will-change should be auto
    expect(imageContainer).toHaveStyle({ willChange: 'auto' });

    // On hover - will-change should be transform
    if (container) {
      fireEvent.mouseEnter(container);
    }
    expect(imageContainer).toHaveStyle({ willChange: 'transform' });

    // After hover - will-change should be auto again
    if (container) {
      fireEvent.mouseLeave(container);
    }
    expect(imageContainer).toHaveStyle({ willChange: 'auto' });
  });
});
