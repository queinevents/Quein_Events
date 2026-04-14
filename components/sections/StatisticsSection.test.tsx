import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatisticsSection from './StatisticsSection';
import { STATISTICS } from '@/lib/constants';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('StatisticsSection', () => {
  it('renders the section heading', () => {
    render(<StatisticsSection />);
    expect(screen.getByText('Our Impact')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<StatisticsSection />);
    expect(screen.getByText(/Delivering excellence in event management/i)).toBeInTheDocument();
  });

  it('renders all statistics from constants', () => {
    render(<StatisticsSection />);
    
    STATISTICS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('renders statistics in a grid layout', () => {
    const { container } = render(<StatisticsSection />);
    const grid = container.querySelector('.grid');
    
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });

  it('has proper ARIA attributes', () => {
    const { container } = render(<StatisticsSection />);
    const section = container.querySelector('section');
    
    expect(section).toHaveAttribute('aria-label', 'Company statistics');
  });

  it('includes aria-live region for counter updates', () => {
    const { container } = render(<StatisticsSection />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    
    expect(liveRegion).toBeInTheDocument();
  });

  it('renders gradient background overlay', () => {
    const { container } = render(<StatisticsSection />);
    const gradient = container.querySelector('.bg-gradient-to-br');
    
    expect(gradient).toBeInTheDocument();
  });

  it('renders correct number of StatCard components', () => {
    render(<StatisticsSection />);
    
    // Check that all stat labels are present (one per StatCard)
    expect(screen.getAllByText(/Years Experience|Events Completed|Happy Clients/)).toHaveLength(STATISTICS.length);
  });
});
