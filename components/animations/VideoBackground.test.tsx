import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VideoBackground } from './VideoBackground';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe('VideoBackground Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }));

    // Mock HTMLVideoElement.prototype.play
    HTMLVideoElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    HTMLVideoElement.prototype.pause = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders video element with correct attributes', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('muted');
    expect(video).toHaveAttribute('playsinline');
  });

  it('renders video source with correct URL', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const source = container.querySelector('source');
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute('src', '/videos/hero.mp4');
    expect(source).toHaveAttribute('type', 'video/mp4');
  });

  it('renders dark overlay by default', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const overlay = container.querySelector('.bg-black');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({ opacity: 0.5 });
  });

  it('renders dark overlay with custom opacity', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        overlayOpacity={0.7}
      />
    );

    const overlay = container.querySelector('.bg-black');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({ opacity: 0.7 });
  });

  it('does not render overlay when darkOverlay is false', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        darkOverlay={false}
      />
    );

    const overlay = container.querySelector('.bg-black');
    expect(overlay).not.toBeInTheDocument();
  });

  it('video has aria-hidden attribute', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const video = container.querySelector('video');
    expect(video).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        className="custom-class"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('has absolute positioning', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('absolute', 'inset-0');
  });

  it('video has object-cover class for proper scaling', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const video = container.querySelector('video');
    expect(video).toHaveClass('object-cover');
  });

  it('video fills entire container', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const video = container.querySelector('video');
    expect(video).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full');
  });

  it('respects custom autoPlay prop', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        autoPlay={false}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('autoplay');
  });

  it('respects custom loop prop', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        loop={false}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('loop');
  });

  it('respects custom muted prop', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        muted={false}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('muted');
  });

  it('respects custom playsInline prop', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        playsInline={false}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('playsinline');
  });

  it('overlay has aria-hidden attribute', () => {
    const { container } = render(
      <VideoBackground
        videoUrl="/videos/hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
      />
    );

    const overlay = container.querySelector('.bg-black');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });
});
