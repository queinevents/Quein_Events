# Navigation Component

A fully responsive, accessible navigation component for the Quein Events website with mobile menu support, smooth scrolling, and scroll-based background overlay.

## Features

### Responsive Design
- **Desktop (≥768px)**: Horizontal menu with logo and navigation links
- **Mobile (<768px)**: Hamburger menu with slide-in drawer from the right
- Smooth transitions between breakpoints

### Scroll Behavior
- Transparent background at page top
- Dark background with backdrop blur appears after scrolling 100px
- Provides better readability while maintaining clean aesthetics

### Navigation
- Smooth scroll to page sections on link click
- Logo links to top of page
- Mobile menu closes automatically after navigation
- Accounts for fixed header offset (80px)

### Accessibility
- Semantic `<nav>` element with ARIA labels
- Full keyboard navigation support
- Focus trap in mobile menu when open
- Escape key closes mobile menu
- Visible focus indicators on all interactive elements
- Logical tab order
- Screen reader friendly with proper ARIA attributes

## Usage

### Basic Usage

```tsx
import { Navigation } from '@/components/layout';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}
```

### With Custom Styling

```tsx
<Navigation className="border-b border-primary-purple/20" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes to apply to the nav element |

## Component Structure

```
Navigation
├── Logo (links to #home)
├── Desktop Navigation (hidden on mobile)
│   └── Nav Links (Home, Services, Portfolio, About, Contact)
├── Mobile Menu Toggle (hidden on desktop)
└── Mobile Menu Drawer
    ├── Nav Links
    └── Overlay (closes menu on click)
```

## State Management

The component manages two key states:

1. **isScrolled**: Tracks if page has scrolled beyond 100px
   - Updates on scroll event
   - Controls background overlay visibility

2. **isMobileMenuOpen**: Tracks mobile menu state
   - Toggles on hamburger button click
   - Closes on link click, overlay click, or Escape key
   - Prevents body scroll when open

## Keyboard Navigation

### Desktop
- `Tab`: Navigate through links
- `Enter/Space`: Activate focused link
- All links have visible focus indicators

### Mobile Menu
- `Tab`: Cycle through menu items (focus trapped)
- `Shift+Tab`: Cycle backwards
- `Escape`: Close menu and return focus to toggle button
- `Enter/Space`: Activate focused link and close menu

## Accessibility Features

### ARIA Attributes
- `aria-label="Main navigation"` on nav element
- `aria-expanded` on mobile menu toggle (true/false)
- `aria-controls="mobile-menu"` links toggle to menu
- `aria-hidden` on mobile menu when closed
- `aria-label` on logo and toggle button

### Screen Reader Support
- Descriptive labels for all interactive elements
- Screen reader only text (`.sr-only`) for context
- Semantic HTML structure
- Proper heading hierarchy

### Focus Management
- Focus trap in mobile menu prevents tabbing outside
- Focus returns to toggle button when menu closes
- Visible focus indicators meet WCAG contrast requirements
- Logical focus order follows visual layout

## Styling

The component uses Tailwind CSS with custom theme colors:

### Colors
- Background (scrolled): `bg-background-darker/95`
- Text: `text-text-primary`, `text-text-secondary`
- Hover: `hover:text-text-primary`
- Focus ring: `focus:ring-primary-purple`

### Transitions
- Background: 300ms
- Menu drawer: 300ms ease-in-out
- Text colors: 300ms
- All transitions respect `prefers-reduced-motion`

## Requirements Satisfied

This component satisfies the following requirements from the spec:

- **4.1**: Navigation includes links to Home, Services, Portfolio, About, Contact
- **4.2**: Smooth scroll to target section on link click
- **4.3**: Displays company logo
- **4.4**: Background overlay appears after 100px scroll
- **4.5**: Mobile menu toggle opens/closes menu
- **2.2**: Mobile menu displays below 768px
- **2.3**: Desktop menu displays at 768px and above
- **11.1**: Company logo displayed in navigation
- **15.1**: Uses semantic `<nav>` element
- **15.3**: Supports keyboard navigation
- **15.4**: Maintains focus indicators
- **15.5**: Logical focus order

## Browser Support

- Modern browsers with ES6+ support
- Intersection Observer API (graceful degradation)
- CSS Grid and Flexbox
- CSS Transitions and Transforms

## Performance Considerations

- Scroll event listener added/removed properly
- Mobile menu focus trap only active when menu is open
- Body scroll prevention only when needed
- Smooth scroll respects `prefers-reduced-motion`
- Minimal re-renders with proper state management

## Testing

See `Navigation.test.tsx` for comprehensive test coverage including:
- Rendering tests
- Scroll behavior tests
- Mobile menu functionality
- Accessibility tests
- Keyboard navigation tests
- Focus management tests

## Examples

See `Navigation.example.tsx` for detailed usage examples including:
- Basic usage
- Custom styling
- Layout integration
- Scroll behavior demonstration
- Mobile menu behavior
- Accessibility features
- Smooth scroll demonstration
