import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FlipCard } from './FlipCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockFlipCardProps = {
  icon: '/icons/wedding.svg',
  iconAlt: 'Wedding icon',
  title: 'Marriage Events',
  description: 'Weddings where every moment becomes a cherished memory',
  capacity: '50-1,000+ guests',
  accentColor: 'purple' as const,
  features: [
    'Traditional and modern wedding setups',
    'Floral design and décor',
    'Photography and videography coordination',
    'Entertainment and music',
    'Complete wedding planning',
  ],
  ctaText: 'Plan Your Dream Wedding',
  ctaHref: '#contact',
};

describe('FlipCard', () => {
  beforeEach(() => {
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('Rendering', () => {
    it('renders front side with title and description', () => {
      render(<FlipCard {...mockFlipCardProps} />);
      
      expect(screen.getByText('Marriage Events')).toBeInTheDocument();
      expect(screen.getByText(/Weddings where every moment/)).toBeInTheDocument();
    });

    it('renders icon with correct alt text', () => {
      render(<FlipCard {...mockFlipCardProps} />);
      
      const icon = screen.getByAltText('Wedding icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/icons/wedding.svg');
    });

    it('renders capacity badge', () => {
      render(<FlipCard {...mockFlipCardProps} />);
      
      expect(screen.getByText('50-1,000+ guests')).toBeInTheDocument();
    });

    it('renders all features on back side', () => {
      render(<FlipCard {...mockFlipCardProps} />);
      
      mockFlipCardProps.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it('renders CTA button with correct text', () => {
      render(<FlipCard {...mockFlipCardProps} />);
      
      const ctaButton = screen.getByText('Plan Your Dream Wedding');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });
  });

  describe('Accent Colors', () => {
    it('applies purple accent color correctly', () => {
      const { container } = render(
        <FlipCard {...mockFlipCardProps} accentColor="purple" />
      );
      
      const frontSide = container.querySelector('[style*="boxShadow"]');
      expect(frontSide?.getAttribute('style')).toContain('rgba(139, 92, 246, 0.5)');
    });

    it('applies blue accent color correctly', () => {
      const { container } = render(
        <FlipCard {...mockFlipCardProps} accentColor="blue" />
      );
      
      const frontSide = container.querySelector('[style*="boxShadow"]');
      expect(frontSide?.getAttribute('style')).toContain('rgba(59, 130, 246, 0.5)');
    });

    it('applies gold accent color correctly', () => {
      const { container } = render(
        <FlipCard {...mockFlipCardProps} accentColor="gold" />
      );
      
      const frontSide = container.querySelector('[style*="boxShadow"]');
      expect(frontSide?.getAttribute('style')).toContain('rgba(245, 158, 11, 0.5)');
    });
  });
});
