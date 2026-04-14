/**
 * EventCategoriesSection Usage Examples
 * 
 * This file demonstrates how to use the EventCategoriesSection component
 * in your Next.js application.
 */

import EventCategoriesSection from './EventCategoriesSection';

/**
 * Example 1: Basic Usage
 * 
 * Simply import and use the component in your page.
 * The component automatically loads event categories from constants.
 */
export function BasicUsageExample() {
  return (
    <main>
      <EventCategoriesSection />
    </main>
  );
}

/**
 * Example 2: Integration in Full Page Layout
 * 
 * The EventCategoriesSection is designed to be used between other sections
 * in a full page layout. It works well after the Services section.
 */
export function FullPageExample() {
  return (
    <main>
      {/* Other sections */}
      <section id="hero">Hero Content</section>
      <section id="statistics">Statistics Content</section>
      <section id="services">Services Content</section>
      
      {/* Event Categories Section */}
      <EventCategoriesSection />
      
      {/* More sections */}
      <section id="portfolio">Portfolio Content</section>
      <section id="contact">Contact Content</section>
    </main>
  );
}

/**
 * Example 3: Customizing Event Categories Data
 * 
 * To customize the event categories displayed, edit the EVENT_CATEGORIES
 * constant in lib/constants.ts:
 * 
 * ```typescript
 * export const EVENT_CATEGORIES: EventCategory[] = [
 *   {
 *     id: "concerts",
 *     title: "Concerts & Live Shows",
 *     description: "From intimate acoustic sessions to large-scale music festivals...",
 *     imageUrl: "/images/categories/concerts.jpg",
 *     eventCount: 150,
 *     tags: ["Music", "Entertainment", "Live Performance"],
 *     featured: true, // This will be the large 2x2 card
 *   },
 *   {
 *     id: "exhibitions",
 *     title: "Exhibitions & Trade Shows",
 *     description: "Professional exhibition management...",
 *     imageUrl: "/images/categories/exhibitions.jpg",
 *     eventCount: 320,
 *     tags: ["Business", "B2B", "Networking"],
 *     // featured: false (default)
 *   },
 *   // Add more categories...
 * ];
 * ```
 */

/**
 * Features:
 * 
 * 1. Asymmetric Grid Layout
 *    - Mobile: 1 column (all cards same size)
 *    - Tablet: 2 columns (featured card spans 2 rows)
 *    - Desktop: 3 columns (featured card spans 2x2)
 * 
 * 2. Staggered Animation
 *    - Cards animate in sequentially with 80ms delay
 *    - Uses slide-up animation with fade
 *    - Respects prefers-reduced-motion setting
 * 
 * 3. Interactive Cards
 *    - Image zoom effect on hover (1.1x scale)
 *    - Event count badge appears on hover
 *    - Category tags with spring animation
 *    - Gradient overlay for text readability
 * 
 * 4. Responsive Design
 *    - Fully responsive from 320px to 2560px
 *    - Touch-friendly on mobile devices
 *    - Optimized image sizes for each breakpoint
 * 
 * 5. Accessibility
 *    - Semantic HTML with proper ARIA labels
 *    - Keyboard accessible
 *    - Screen reader friendly
 *    - Respects reduced motion preferences
 */

/**
 * Requirements Validated:
 * - 3.1: Displays at least 5 event categories ✓
 * - 3.2: Uses asymmetric grid layout with one featured category ✓
 * - 3.8: Cards animate with staggered fade and slide up (80ms stagger) ✓
 * - 3.9: Responsive layout: 1 col (mobile), 2 col (tablet), 3 col (desktop) ✓
 * - 3.10: Featured card spans 2 rows on tablet and desktop layouts ✓
 * - 15.3: Adapts to all screen sizes ✓
 */
