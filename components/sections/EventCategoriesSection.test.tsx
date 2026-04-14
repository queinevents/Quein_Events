import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EventCategoriesSection from './EventCategoriesSection';
import { EVENT_CATEGORIES } from '@/lib/constants';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

// Mock hooks
vi.mock('@/hooks/useIntersectionAnimation', () => ({
  useIntersectionAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

// Mock CategoryCard component
vi.mock('@/components/ui/CategoryCard', () => ({
  CategoryCard: ({ category, size }: any) => (
    <div data-testid={`category-card-${category.id}`} data-size={size}>
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <span>{category.eventCount} Events</span>
      {category.tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  ),
}));

// Mock StaggeredCards component
vi.mock('@/components/animations/StaggeredCards', () => ({
  StaggeredCards: ({ children, staggerDelay }: any) => (
    <div data-testid="staggered-cards" data-stagger-delay={staggerDelay}>
      {children}
    </div>
  ),
}));

describe('EventCategoriesSection', () => {
  it('renders the section with correct heading', () => {
    render(<EventCategoriesSection />);
    
    expect(screen.getByText('Event Expertise')).toBeInTheDocument();
    expect(screen.getByText(/From intimate gatherings to large-scale productions/)).toBeInTheDocument();
  });

  it('renders all event categories from constants', () => {
    render(<EventCategoriesSection />);
    
    EVENT_CATEGORIES.forEach(category => {
      expect(screen.getByTestId(`category-card-${category.id}`)).toBeInTheDocument();
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });

  it('renders featured category with large size', () => {
    render(<EventCategoriesSection />);
    
    const featuredCategory = EVENT_CATEGORIES.find(cat => cat.featured);
    if (featuredCategory) {
      const featuredCard = screen.getByTestId(`category-card-${featuredCategory.id}`);
      expect(featuredCard).toHaveAttribute('data-size', 'large');
    }
  });

  it('renders regular categories with small size', () => {
    render(<EventCategoriesSection />);
    
    const regularCategories = EVENT_CATEGORIES.filter(cat => !cat.featured);
    regularCategories.forEach(category => {
      const card = screen.getByTestId(`category-card-${category.id}`);
      expect(card).toHaveAttribute('data-size', 'small');
    });
  });

  it('uses StaggeredCards with 80ms stagger delay', () => {
    render(<EventCategoriesSection />);
    
    const staggeredCards = screen.getByTestId('staggered-cards');
    expect(staggeredCards).toHaveAttribute('data-stagger-delay', '80');
  });

  it('has correct accessibility attributes', () => {
    render(<EventCategoriesSection />);
    
    const section = screen.getByRole('region', { name: /event categories showcase/i });
    expect(section).toBeInTheDocument();
  });

  it('displays event count for each category', () => {
    render(<EventCategoriesSection />);
    
    EVENT_CATEGORIES.forEach(category => {
      expect(screen.getByText(`${category.eventCount} Events`)).toBeInTheDocument();
    });
  });

  it('displays category tags', () => {
    render(<EventCategoriesSection />);
    
    EVENT_CATEGORIES.forEach(category => {
      category.tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });
  });

  it('renders at least 5 event categories', () => {
    render(<EventCategoriesSection />);
    
    const categoryCards = screen.getAllByTestId(/category-card-/);
    expect(categoryCards.length).toBeGreaterThanOrEqual(5);
  });

  it('has exactly one featured category', () => {
    render(<EventCategoriesSection />);
    
    const largeCards = screen.getAllByTestId(/category-card-/).filter(
      card => card.getAttribute('data-size') === 'large'
    );
    expect(largeCards.length).toBe(1);
  });
});
