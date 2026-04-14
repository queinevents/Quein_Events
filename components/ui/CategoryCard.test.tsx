import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryCard } from './CategoryCard';
import type { EventCategory } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock ImageZoom component
jest.mock('@/components/animations/ImageZoom', () => ({
  ImageZoom: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('CategoryCard', () => {
  const mockCategory: EventCategory = {
    id: 'test-category',
    title: 'Test Category',
    description: 'This is a test category description',
    imageUrl: '/images/test-category.jpg',
    eventCount: 150,
    tags: ['Tag1', 'Tag2', 'Tag3'],
  };

  it('renders category title', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders category description', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('This is a test category description')).toBeInTheDocument();
  });

  it('renders event count', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('150 Events')).toBeInTheDocument();
  });

  it('renders all category tags', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('Tag3')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<CategoryCard category={mockCategory} />);
    const image = screen.getByAltText('Test Category');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-category.jpg');
  });

  it('applies large size classes when size is large', () => {
    const { container } = render(<CategoryCard category={mockCategory} size="large" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('col-span-1');
    expect(card.className).toContain('row-span-2');
  });

  it('applies small size classes when size is small', () => {
    const { container } = render(<CategoryCard category={mockCategory} size="small" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('col-span-1');
    expect(card.className).toContain('row-span-1');
  });

  it('applies default small size when size prop is not provided', () => {
    const { container } = render(<CategoryCard category={mockCategory} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('row-span-1');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <CategoryCard category={mockCategory} className="custom-class" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });

  it('renders with featured category', () => {
    const featuredCategory: EventCategory = {
      ...mockCategory,
      featured: true,
    };
    render(<CategoryCard category={featuredCategory} size="large" />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders multiple tags correctly', () => {
    const categoryWithManyTags: EventCategory = {
      ...mockCategory,
      tags: ['Music', 'Entertainment', 'Live Performance', 'Festival'],
    };
    render(<CategoryCard category={categoryWithManyTags} />);
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Live Performance')).toBeInTheDocument();
    expect(screen.getByText('Festival')).toBeInTheDocument();
  });

  it('handles category with no tags', () => {
    const categoryWithNoTags: EventCategory = {
      ...mockCategory,
      tags: [],
    };
    render(<CategoryCard category={categoryWithNoTags} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('displays event count with correct formatting', () => {
    const categoryWithLargeCount: EventCategory = {
      ...mockCategory,
      eventCount: 2500,
    };
    render(<CategoryCard category={categoryWithLargeCount} />);
    expect(screen.getByText('2500 Events')).toBeInTheDocument();
  });
});
