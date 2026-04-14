/**
 * Navigation Component Examples
 * 
 * This file demonstrates the usage of the Navigation component
 * with various scenarios and configurations.
 */

import Navigation from './Navigation';

/**
 * Example 1: Basic Navigation (Default)
 * 
 * The Navigation component works out of the box with no props required.
 * It automatically:
 * - Displays the company logo
 * - Shows all navigation links from NAV_LINKS constant
 * - Handles responsive behavior (desktop/mobile)
 * - Manages scroll-based background overlay
 * - Provides smooth scrolling to sections
 */
export function BasicNavigationExample() {
  return <Navigation />;
}

/**
 * Example 2: Navigation with Custom ClassName
 * 
 * You can add custom styling by passing a className prop.
 * This is useful for adding additional styles or overrides.
 */
export function CustomStyledNavigationExample() {
  return <Navigation className="border-b border-primary-purple/20" />;
}

/**
 * Example 3: Navigation in Layout
 * 
 * Typical usage in a Next.js layout file.
 * The Navigation component is fixed and will stay at the top
 * while content scrolls beneath it.
 */
export function NavigationInLayoutExample() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Page content goes here */}
        {/* pt-20 accounts for the fixed navigation height */}
      </main>
    </>
  );
}

/**
 * Example 4: Testing Scroll Behavior
 * 
 * The Navigation component automatically detects scroll position:
 * - When scrollY <= 100px: Transparent background
 * - When scrollY > 100px: Dark background with backdrop blur
 * 
 * This provides a clean look at the top of the page while
 * ensuring readability when scrolling through content.
 */
export function ScrollBehaviorExample() {
  return (
    <div>
      <Navigation />
      <div style={{ height: '200vh' }}>
        <p className="pt-24 px-4">
          Scroll down to see the navigation background change at 100px
        </p>
      </div>
    </div>
  );
}

/**
 * Example 5: Mobile Menu Behavior
 * 
 * On screens smaller than 768px (md breakpoint):
 * - Desktop navigation links are hidden
 * - Hamburger menu button appears
 * - Clicking the button opens a slide-in drawer from the right
 * - Clicking a link or the overlay closes the menu
 * - Body scroll is prevented when menu is open
 * 
 * Accessibility features:
 * - Focus trap keeps keyboard navigation within the menu
 * - Escape key closes the menu
 * - ARIA attributes for screen readers
 * - Proper focus management
 */
export function MobileMenuExample() {
  return (
    <div className="max-w-md mx-auto">
      <Navigation />
      <div className="pt-24 px-4">
        <p>Resize your browser to less than 768px to see the mobile menu</p>
      </div>
    </div>
  );
}

/**
 * Example 6: Accessibility Features
 * 
 * The Navigation component includes comprehensive accessibility support:
 * 
 * 1. Semantic HTML:
 *    - Uses <nav> element with aria-label
 *    - Proper heading hierarchy
 * 
 * 2. Keyboard Navigation:
 *    - All interactive elements are keyboard accessible
 *    - Visible focus indicators
 *    - Logical tab order
 *    - Focus trap in mobile menu
 * 
 * 3. Screen Reader Support:
 *    - ARIA labels for buttons and navigation
 *    - aria-expanded for menu state
 *    - aria-controls for menu relationship
 *    - Screen reader only text for context
 * 
 * 4. Mobile Menu:
 *    - Escape key closes menu
 *    - Focus returns to toggle button on close
 *    - Tab cycles through menu items only
 */
export function AccessibilityExample() {
  return (
    <div>
      <Navigation />
      <div className="pt-24 px-4">
        <h1>Accessibility Features</h1>
        <ul className="list-disc pl-6 space-y-2">
          <li>Try navigating with Tab key</li>
          <li>Open mobile menu and press Escape</li>
          <li>Use a screen reader to hear ARIA labels</li>
          <li>Check focus indicators on all interactive elements</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Example 7: Smooth Scroll Behavior
 * 
 * When clicking navigation links:
 * - Prevents default anchor behavior
 * - Calculates target section position
 * - Accounts for fixed header offset (80px)
 * - Scrolls smoothly to the target
 * - Closes mobile menu if open
 * 
 * Logo click behavior:
 * - Always scrolls to top of page
 * - Uses smooth scroll animation
 */
export function SmoothScrollExample() {
  return (
    <div>
      <Navigation />
      <section id="home" className="h-screen pt-20 px-4">
        <h2>Home Section</h2>
      </section>
      <section id="services" className="h-screen pt-20 px-4 bg-background-card">
        <h2>Services Section</h2>
      </section>
      <section id="portfolio" className="h-screen pt-20 px-4">
        <h2>Portfolio Section</h2>
      </section>
      <section id="about" className="h-screen pt-20 px-4 bg-background-card">
        <h2>About Section</h2>
      </section>
      <section id="contact" className="h-screen pt-20 px-4">
        <h2>Contact Section</h2>
      </section>
    </div>
  );
}

/**
 * Requirements Validation
 * 
 * This component satisfies the following requirements:
 * 
 * Requirement 4.1: Navigation includes links to Home, Services, Portfolio, About, Contact ✓
 * Requirement 4.2: Smooth scroll to target section on link click ✓
 * Requirement 4.3: Displays company logo ✓
 * Requirement 4.4: Background overlay appears after 100px scroll ✓
 * Requirement 4.5: Mobile menu toggle opens/closes menu ✓
 * Requirement 2.2: Mobile menu displays below 768px ✓
 * Requirement 2.3: Desktop menu displays at 768px and above ✓
 * Requirement 11.1: Company logo displayed in navigation ✓
 * Requirement 15.1: Uses semantic <nav> element ✓
 * Requirement 15.3: Supports keyboard navigation ✓
 * Requirement 15.4: Maintains focus indicators ✓
 * Requirement 15.5: Logical focus order ✓
 */
