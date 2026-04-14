/**
 * CategoryCard Component Examples
 * 
 * This file demonstrates various usage patterns for the CategoryCard component.
 * Requirements: 3.3, 3.4, 3.5, 3.7
 */

import React from 'react';
import { CategoryCard } from './CategoryCard';
import type { EventCategory } from '@/types';

// Example category data
const exampleCategories: EventCategory[] = [
  {
    id: 'concerts',
    title: 'Concerts & Live Shows',
    description: 'From intimate acoustic sessions to large-scale music festivals, we deliver unforgettable live entertainment experiences.',
    imageUrl: '/images/categories/concerts.jpg',
    eventCount: 150,
    tags: ['Music', 'Entertainment', 'Live Performance'],
    featured: true,
  },
  {
    id: 'exhibitions',
    title: 'Exhibitions & Trade Shows',
    description: 'Professional exhibition management with custom booth design and seamless logistics.',
    imageUrl: '/images/categories/exhibitions.jpg',
    eventCount: 320,
    tags: ['Business', 'B2B', 'Networking'],
  },
  {
    id: 'weddings',
    title: 'Weddings & Celebrations',
    description: 'Bespoke wedding planning and execution, creating magical moments with elegant décor.',
    imageUrl: '/images/categories/weddings.jpg',
    eventCount: 450,
    tags: ['Luxury', 'Private', 'Celebration'],
  },
];

/**
 * Example 1: Small Category Card (Default)
 * Standard size card for regular categories
 */
export function SmallCategoryCardExample() {
  return (
    <div className="w-full max-w-md">
      <CategoryCard category={exampleCategories[1]} size="small" />
    </div>
  );
}

/**
 * Example 2: Large Category Card (Featured)
 * Double-sized card for featured categories
 */
export function LargeCategoryCardExample() {
  return (
    <div className="w-full max-w-2xl">
      <CategoryCard category={exampleCategories[0]} size="large" />
    </div>
  );
}

/**
 * Example 3: Grid Layout with Mixed Sizes
 * Asymmetric grid with one large featured card and multiple small cards
 */
export function AsymmetricGridExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
      {/* Featured large card - spans 2 columns and 2 rows */}
      <CategoryCard category={exampleCategories[0]} size="large" />
      
      {/* Regular small cards */}
      <CategoryCard category={exampleCategories[1]} size="small" />
      <CategoryCard category={exampleCategories[2]} size="small" />
    </div>
  );
}

/**
 * Example 4: Responsive Grid Layout
 * Full responsive layout that adapts to screen size
 */
export function ResponsiveGridExample() {
  return (
    <section className="py-16 px-4 bg-background-dark">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
          Event Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {exampleCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              size={index === 0 ? 'large' : 'small'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Example 5: Custom Styling
 * CategoryCard with additional custom classes
 */
export function CustomStyledCategoryCardExample() {
  return (
    <div className="w-full max-w-md">
      <CategoryCard
        category={exampleCategories[1]}
        size="small"
        className="shadow-2xl border-2 border-primary-purple/20"
      />
    </div>
  );
}

/**
 * Example 6: Category with Many Tags
 * Demonstrates tag overflow handling
 */
export function ManyTagsExample() {
  const categoryWithManyTags: EventCategory = {
    id: 'festivals',
    title: 'Festivals & Cultural Events',
    description: 'Multi-day festivals and cultural celebrations with comprehensive production.',
    imageUrl: '/images/categories/festivals.jpg',
    eventCount: 95,
    tags: ['Culture', 'Community', 'Entertainment', 'Music', 'Food', 'Art'],
  };

  return (
    <div className="w-full max-w-md">
      <CategoryCard category={categoryWithManyTags} size="small" />
    </div>
  );
}

/**
 * Example 7: Minimal Category (Few Tags)
 * Category with minimal information
 */
export function MinimalCategoryExample() {
  const minimalCategory: EventCategory = {
    id: 'conferences',
    title: 'Conferences',
    description: 'Professional conference management.',
    imageUrl: '/images/categories/conferences.jpg',
    eventCount: 280,
    tags: ['Corporate'],
  };

  return (
    <div className="w-full max-w-md">
      <CategoryCard category={minimalCategory} size="small" />
    </div>
  );
}

/**
 * Example 8: Complete Section Implementation
 * Full section with heading and multiple cards
 */
export function CompleteSectionExample() {
  return (
    <section className="py-20 px-4 bg-background-darker">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Event Expertise
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our comprehensive range of event management services across various categories
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {exampleCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              size={category.featured ? 'large' : 'small'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Default export for easy importing
export default function CategoryCardExamples() {
  return (
    <div className="space-y-16 bg-background-dark min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-text-primary mb-8 text-center">
          CategoryCard Examples
        </h1>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-4">Small Card</h3>
            <SmallCategoryCardExample />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-4">Large Card</h3>
            <LargeCategoryCardExample />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-4">Asymmetric Grid</h3>
            <AsymmetricGridExample />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-4">Complete Section</h3>
            <CompleteSectionExample />
          </div>
        </div>
      </div>
    </div>
  );
}
