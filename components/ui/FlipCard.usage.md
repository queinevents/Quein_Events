# FlipCard Component Usage Guide

## Overview

The `FlipCard` component is a 3D flip card designed for displaying service information with an interactive flip animation. It features a dark theme with vibrant accent colors (purple, blue, gold) and includes comprehensive accessibility support.

**Validates: Requirements 10.1, 10.2, 10.3, 10.7, 10.9, 15.10, 15.11**

## Features

- ✅ **3D Flip Animation (Desktop)**: Smooth 600ms rotateY(180deg) transition with preserve-3d
- ✅ **Stacked Layout (Mobile)**: Simplified expand/collapse interface for better UX
- ✅ **Dark Theme**: Card background (#1A1A1A) with subtle border (#2A2A2A)
- ✅ **Vibrant Accents**: Purple, blue, or gold glow effects based on service type
- ✅ **Responsive**: Hover to flip on desktop, expand/collapse on mobile
- ✅ **Touch-Friendly**: All buttons meet 48x48px minimum touch target size
- ✅ **Keyboard Accessible**: Enter/Space keys trigger flip/expand with focus indicators
- ✅ **Screen Reader Support**: aria-label, aria-expanded, and aria-controls attributes
- ✅ **Animated Elements**: Icon rotation, capacity badge pulse, smooth expansion

## Props

```typescript
interface FlipCardProps {
  // Front side content
  icon: string;              // Path to icon image
  iconAlt: string;           // Alt text for icon
  title: string;             // Service title (white, 24px)
  description: string;       // Service description (gray, 16px)
  capacity: string;          // Capacity badge text (e.g., "50-1,000+ guests")
  accentColor: 'purple' | 'blue' | 'gold';  // Accent color theme
  
  // Back side content
  features: string[];        // List of features with checkmarks
  ctaText: string;           // Call-to-action button text
  ctaHref?: string;          // CTA button link (default: '#contact')
  
  className?: string;        // Additional CSS classes
}
```

## Basic Usage

```tsx
import { FlipCard } from '@/components/ui/FlipCard';

export default function ServicesSection() {
  return (
    <FlipCard
      icon="/icons/wedding.svg"
      iconAlt="Wedding icon"
      title="Marriage Events"
      description="Weddings where every moment becomes a cherished memory"
      capacity="50-1,000+ guests"
      accentColor="purple"
      features={[
        'Traditional and modern wedding setups',
        'Floral design and décor',
        'Photography and videography coordination',
        'Entertainment and music',
        'Complete wedding planning',
      ]}
      ctaText="Plan Your Dream Wedding"
      ctaHref="#contact"
    />
  );
}
```

## Accent Colors

The component supports three accent colors, each with specific glow effects:

### Purple
- **Use for**: Private events, weddings, luxury services
- **Glow**: rgba(139, 92, 246, 0.5)
- **Gradient**: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)

```tsx
<FlipCard accentColor="purple" {...otherProps} />
```

### Blue
- **Use for**: Exhibitions, corporate events, professional services
- **Glow**: rgba(59, 130, 246, 0.5)
- **Gradient**: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)

```tsx
<FlipCard accentColor="blue" {...otherProps} />
```

### Gold
- **Use for**: Conferences, premium services, VIP events
- **Glow**: rgba(245, 158, 11, 0.5)
- **Gradient**: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)

```tsx
<FlipCard accentColor="gold" {...otherProps} />
```

## Grid Layout Example

Display multiple flip cards in a responsive grid:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {SERVICES.map((service) => (
    <FlipCard
      key={service.id}
      icon={service.icon}
      iconAlt={`${service.title} icon`}
      title={service.title}
      description={service.description}
      capacity={service.capacity}
      accentColor={service.accentColor}
      features={service.features}
      ctaText={service.ctaText}
    />
  ))}
</div>
```

## Interaction Behavior

### Desktop (≥768px - Hover)
- Hover over card → Flips to back side with 3D animation
- Move mouse away → Flips back to front side
- Smooth 600ms transition with preserve-3d
- Full 3D flip effect (rotateY 180deg)

### Mobile (<768px - Expand/Collapse)
**Requirement 15.10**: 3D flip animations are simplified on mobile devices

- **No 3D flip animation** - prevents touch interaction issues
- **Stacked layout** - front side always visible
- **"Show More" button** - gold accent button reveals features
- **Smooth expansion** - 400ms height + opacity animation
- **Auto-scroll** - smoothly scrolls to expanded content
- **"Show Less" button** - collapses expanded content
- **Clear separation** - 16px margin between sections
- **Touch-friendly** - all buttons are minimum 48x48px (Requirement 15.11)

### Keyboard
- **Tab**: Focus on card or button
- **Enter** or **Space**: Toggle flip (desktop) or expand/collapse (mobile)
- **Focus visible**: Clear focus indicator
- **Prevents default**: Space key doesn't scroll page

## Accessibility

### ARIA Attributes

**Desktop:**
```tsx
role="button"
tabIndex={0}
aria-label="Flip card to see more details about {title}"
aria-live="polite"
```

**Mobile:**
```tsx
// Show More/Less button
aria-expanded={isExpanded}  // "true" when expanded, "false" when collapsed
aria-controls="card-details"  // Links to expanded content

// Expanded content
id="card-details"  // Linked from button
```

### Screen Reader Announcements
- Card flip state changes are announced via aria-live region (desktop)
- Expansion state is announced via aria-expanded attribute (mobile)
- CTA button is properly labeled and accessible
- Feature list uses semantic list markup

### Touch Targets (Requirement 15.11)
All interactive elements meet WCAG 2.1 Level AA requirements:
- **Show More/Less button**: `min-h-[48px]` (48x48px minimum)
- **CTA button**: `min-h-[48px]` on mobile
- **Proper spacing**: Adequate padding for easy tapping

### Keyboard Navigation
```
Desktop:
Tab       → Focus card
Enter     → Flip card
Space     → Flip card
Tab       → Move to next element

Mobile:
Tab       → Focus "Show More" button
Enter     → Expand/collapse content
Space     → Expand/collapse content
Tab       → Move to CTA button (when expanded)
```

## Design Specifications

### Desktop Front Side
- **Background**: #1A1A1A (dark card)
- **Border**: 1px solid #2A2A2A (subtle)
- **Icon Container**: 80x80px circle with gradient background
- **Icon**: 40x40px with 360° rotation animation
- **Title**: 24px, white (#FFFFFF), bold
- **Description**: 16px, gray (#A0A0A0)
- **Capacity Badge**: Rounded pill with pulse animation
- **Glow Shadow**: Accent color with 0.5 opacity
- **Height**: 400px (mobile), 450px (desktop)

### Desktop Back Side
- **Background**: #1A1A1A (dark card)
- **Border**: 2px solid accent color
- **Title**: 20px, white (#FFFFFF), bold
- **Features**: List with checkmark icons in accent color
- **CTA Button**: Gradient background with accent color
- **Glow Shadow**: Accent color with 0.5 opacity
- **Transform**: rotateY(180deg)

### Mobile Stacked Layout
- **Front Side**: Same as desktop front, always visible
- **Show More Button**: 
  - Gold gradient background (#F59E0B to #D97706)
  - Minimum height: 48px (touch-friendly)
  - Full width with rounded corners
  - Hover/active scale effects
- **Expanded Content**:
  - Separate card below front side
  - 16px margin-top for visual separation
  - Border: 2px solid accent color
  - "What's Included" heading
  - Animated feature list (staggered fade-in)
  - CTA button with 48px minimum height
- **Animation**: 400ms height + opacity transition

### Animation Details
- **Desktop Flip Duration**: 600ms
- **Mobile Expansion**: 400ms
- **Transform**: rotateY(180deg) (desktop only)
- **Transform Style**: preserve-3d (desktop only)
- **Backface Visibility**: hidden (desktop only)
- **Icon Animation**: 0.8s with spring easing
- **Badge Pulse**: 2s infinite loop
- **Feature Stagger**: 100ms delay per item (mobile)

## Integration with Official Content

Use with official Quein service data from constants:

```tsx
import { SERVICES } from '@/lib/constants';

export default function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVICES.map((service, index) => (
        <FlipCard
          key={service.id}
          icon={service.icon}
          iconAlt={`${service.title} icon`}
          title={service.title}
          description={service.description}
          capacity={service.capacity}
          accentColor={service.accentColor}
          features={service.features}
          ctaText={service.ctaText}
        />
      ))}
    </div>
  );
}
```

## Performance Considerations

- **CSS Transforms**: Uses GPU-accelerated transforms for smooth animation (desktop)
- **Conditional Rendering**: Different layouts for mobile vs desktop
- **Backface Visibility**: Hidden to prevent rendering both sides simultaneously (desktop)
- **Mobile Detection**: Automatically detects viewport width < 768px and adjusts behavior
- **Event Cleanup**: Properly removes resize listeners on unmount
- **AnimatePresence**: Smooth exit animations for mobile expansion
- **Smooth Scroll**: Native scrollIntoView for expanded content visibility

## Browser Support

- ✅ Modern browsers with CSS 3D transforms support
- ✅ Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Fallback: Static card display for browsers without 3D transform support

## Common Patterns

### With Staggered Animation
```tsx
import { FadeIn } from '@/components/animations';

{SERVICES.map((service, index) => (
  <FadeIn key={service.id} delay={index * 100}>
    <FlipCard {...service} />
  </FadeIn>
))}
```

### With Custom Styling
```tsx
<FlipCard
  {...serviceProps}
  className="shadow-2xl hover:shadow-purple-500/50"
/>
```

### With Custom CTA Link
```tsx
<FlipCard
  {...serviceProps}
  ctaHref={`/services/${service.id}`}
/>
```

## Testing

The component includes comprehensive tests covering:
- ✅ Rendering of all content elements
- ✅ Dark theme styling verification
- ✅ Accent color application
- ✅ 3D flip animation behavior (desktop)
- ✅ Stacked layout with expand/collapse (mobile)
- ✅ Touch-friendly button sizes (48x48px minimum)
- ✅ Keyboard accessibility (both desktop and mobile)
- ✅ ARIA attributes (aria-expanded, aria-controls)
- ✅ Mobile/desktop interaction differences
- ✅ Feature list rendering with animations
- ✅ CTA button functionality
- ✅ Visual separation on mobile
- ✅ Smooth scroll behavior

Run tests:
```bash
npm test -- FlipCard.test.tsx
```

## Related Components

- **ServicesSection**: Uses FlipCard to display service offerings
- **FadeIn**: Animation wrapper for staggered entrance
- **ParallaxSection**: Background parallax effect for services section

## Requirements Validation

This component validates the following requirements from the design document:

- **10.1**: 3D flip card component with dark theme (desktop)
- **10.2**: Front side with vibrant icon, title, description, capacity badge
- **10.3**: Back side with feature list and CTA button
- **10.7**: Keyboard accessible with Enter/Space support
- **10.9**: Screen reader support with aria-label and aria-live
- **15.10**: 3D flip animations simplified on mobile devices (stacked layout instead)
- **15.11**: All touch targets at least 48x48px on mobile

## Troubleshooting

### Card doesn't flip on hover (Desktop)
- Check viewport width (hover disabled on mobile < 768px)
- Verify CSS 3D transforms are supported
- Check for conflicting z-index or overflow styles

### Expand/collapse not working (Mobile)
- Verify viewport width is < 768px
- Check that AnimatePresence is imported from framer-motion
- Ensure button onClick handler is not blocked

### Animation is choppy
- Ensure GPU acceleration is enabled
- Check for heavy JavaScript operations during animation
- Verify transform-style: preserve-3d is applied (desktop)
- Check mobile device performance

### Keyboard navigation not working
- Verify tabIndex={0} is present on interactive elements
- Check for event.preventDefault() on Space key
- Ensure no conflicting keyboard event handlers
- Test both desktop (flip) and mobile (expand) behaviors

### Touch targets too small
- Verify min-h-[48px] class is applied to buttons
- Check that padding doesn't reduce effective touch area
- Test on actual mobile devices, not just browser emulation

### Smooth scroll not working
- Check that expandedContentRef is properly attached
- Verify scrollIntoView is supported in target browsers
- Ensure no CSS scroll-behavior conflicts

## Best Practices

1. **Use official content**: Always use SERVICES constant from lib/constants.ts
2. **Consistent accent colors**: Match accent color to service type
3. **Limit features**: Keep feature list to 4-6 items for readability
4. **Descriptive CTAs**: Use action-oriented CTA text
5. **Proper alt text**: Provide descriptive alt text for icons
6. **Grid spacing**: Use adequate gap (6-8) between cards
7. **Mobile testing**: Test expand/collapse interaction on touch devices
8. **Desktop testing**: Test 3D flip on hover with mouse
9. **Keyboard testing**: Verify all interactions work with keyboard only
10. **Touch target testing**: Verify 48x48px minimum on actual mobile devices
11. **Viewport testing**: Test behavior at 768px breakpoint
12. **Accessibility testing**: Test with screen readers on both desktop and mobile
