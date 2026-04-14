import { EventGallerySection } from './EventGallerySection';

/**
 * Event Gallery Section Examples
 * 
 * This file demonstrates how to use the EventGallerySection component
 */

// Example 1: Basic Usage
export function BasicExample() {
  return (
    <div>
      <EventGallerySection />
    </div>
  );
}

// Example 2: With Custom Styling
export function CustomStyledExample() {
  return (
    <div>
      <EventGallerySection className="my-custom-class" />
    </div>
  );
}

// Example 3: In Page Layout
export function PageLayoutExample() {
  return (
    <main>
      <section id="hero">
        {/* Hero content */}
      </section>
      
      <EventGallerySection />
      
      <section id="contact">
        {/* Contact content */}
      </section>
    </main>
  );
}

/**
 * Features Demonstrated:
 * 
 * 1. Masonry Grid Layout
 *    - Responsive breakpoints: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)
 *    - Pinterest-style layout with varying image heights
 * 
 * 2. Category Filtering
 *    - Filter buttons for: All, Concerts, Exhibitions, Conferences, Weddings, Festivals
 *    - Smooth fade and scale transitions (400ms)
 *    - Active state styling with gradient background
 * 
 * 3. Gallery Item Hover Effects
 *    - Image brightness increase on hover
 *    - Overlay slides up with event details
 *    - Smooth transitions (300-500ms)
 * 
 * 4. Timeline Markers
 *    - Pulse animation on each gallery item
 *    - Visual indicator for chronological context
 * 
 * 5. Lightbox Modal
 *    - Full-size image viewing
 *    - Previous/Next navigation
 *    - Close button and Escape key support
 *    - Focus trap within modal
 *    - Body scroll prevention
 * 
 * 6. Performance Optimizations
 *    - Lazy loading for all gallery images
 *    - Staggered animations (50ms delay between items)
 *    - Optimized with Next.js Image component
 * 
 * 7. Accessibility Features
 *    - Keyboard navigation in lightbox (Arrow keys, Escape)
 *    - ARIA labels and roles
 *    - Focus management
 *    - Screen reader support
 */

export default BasicExample;
