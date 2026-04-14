# TestimonialsSection Component

## Overview

The `TestimonialsSection` component displays client testimonials in an auto-rotating carousel with full keyboard and screen reader accessibility. It uses `embla-carousel-react` for smooth carousel functionality and includes navigation controls, dot indicators, and auto-rotation that pauses on hover/focus.

## Features

- ✅ Auto-rotating carousel (6 seconds per slide)
- ✅ Pauses on hover and focus
- ✅ Slide transition: fade + horizontal slide (500ms)
- ✅ Previous/next navigation buttons
- ✅ Dot indicators for direct navigation
- ✅ Keyboard accessible (arrow keys)
- ✅ Screen reader announces slide changes
- ✅ Respects prefers-reduced-motion setting
- ✅ Dark theme with purple/blue gradient accents

## Requirements Validated

**Validates: Requirements 6.2, 6.3, 6.4, 6.8, 6.9, 6.10, 6.11, 6.12, 14.4, 14.12**

- 6.2: Carousel/slider layout ✅
- 6.3: Auto-rotate every 6 seconds ✅
- 6.4: Pause on hover ✅
- 6.8: Fade and horizontal slide transition (500ms) ✅
- 6.9: Keyboard accessible (arrow keys) ✅
- 6.10: Announces slide changes to screen readers ✅
- 6.11: Navigation buttons (previous/next) ✅
- 6.12: Auto-rotation pauses when carousel receives focus ✅
- 14.4: Carousel controls keyboard accessible ✅
- 14.12: Auto-playing carousel pauses on focus or hover ✅

## Usage

### Basic Usage

```tsx
import { TestimonialsSection } from '@/components/sections';

export default function Page() {
  return (
    <main>
      <TestimonialsSection />
    </main>
  );
}
```

### Data Source

The component automatically loads testimonials from `lib/constants.ts`:

```typescript
import { TESTIMONIALS } from '@/lib/constants';
```

### Adding/Editing Testimonials

Edit the `TESTIMONIALS` array in `lib/constants.ts`:

```typescript
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Sarah Al-Mansoori",
    clientRole: "Marketing Director",
    clientCompany: "Qatar Tech Solutions",
    quote: "Quein transformed our annual conference...",
    rating: 5,
    eventType: "Conference",
    imageUrl: "/images/testimonials/client-1.jpg",
  },
  // Add more testimonials...
];
```

## Carousel Controls

### Mouse/Touch Controls
- **Hover**: Pauses auto-rotation
- **Click Previous/Next**: Navigate between slides
- **Click Dots**: Jump to specific slide

### Keyboard Controls
- **Arrow Left (←)**: Previous slide
- **Arrow Right (→)**: Next slide
- **Tab**: Focus navigation controls
- **Enter/Space**: Activate focused button

### Auto-Rotation
- Rotates every 6 seconds
- Pauses when:
  - Mouse hovers over carousel
  - Carousel or controls receive focus
  - User prefers reduced motion

## Accessibility

### ARIA Attributes
- `role="region"` with `aria-label="Testimonials carousel"`
- `aria-live="polite"` for slide change announcements
- `aria-atomic="true"` for complete announcements
- Each slide has `role="group"` and descriptive labels
- Navigation buttons have descriptive `aria-label` attributes

### Screen Reader Support
- Announces current slide number (e.g., "Showing testimonial 1 of 6")
- Navigation buttons clearly labeled
- Dot indicators have descriptive labels
- Auto-rotation pauses when carousel receives focus

### Keyboard Navigation
- Carousel container is focusable (`tabIndex={0}`)
- Arrow keys navigate between slides
- Tab key moves through navigation controls
- All interactive elements have visible focus indicators

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Disables auto-rotation when reduced motion is preferred
- Animations are simplified or removed

## Component Structure

```
TestimonialsSection
├── Section Heading
├── Carousel Container
│   ├── Embla Carousel
│   │   └── Testimonial Cards (slides)
│   └── Navigation Controls
│       ├── Previous Button
│       ├── Dot Indicators
│       └── Next Button
└── Screen Reader Announcement
```

## Styling

### Theme Colors
- Background: `bg-background-darker`
- Gradient overlay: Purple to blue
- Card background: `bg-background-card`
- Accent color: `primary-purple`
- Text: `text-primary` and `text-secondary`

### Responsive Design
- Mobile: Single column, full-width slides
- Tablet: Same layout, larger controls
- Desktop: Same layout, maximum width container

### Transitions
- Slide transition: 500ms (25 frames × 20ms)
- Button hover: 300ms
- Dot indicator: 300ms

## Dependencies

- `embla-carousel-react`: Carousel functionality
- `framer-motion`: Animations and reduced motion detection
- `@/components/ui/TestimonialCard`: Individual testimonial display
- `@/lib/constants`: Testimonials data (TESTIMONIALS array)

## Performance

- Carousel uses CSS transforms for smooth transitions
- Auto-rotation uses `setInterval` (cleaned up on unmount)
- Event listeners properly cleaned up
- Respects reduced motion preference

## Testing

Run tests with:
```bash
npm test components/sections/TestimonialsSection.test.tsx
```

Test coverage includes:
- Rendering all testimonials
- Navigation button functionality
- Dot indicator functionality
- Keyboard navigation
- ARIA attributes
- Screen reader announcements
- Accessibility features

## Related Components

- `TestimonialCard`: Individual testimonial display
- `StatisticsSection`: Similar section layout pattern
- `TeamSection`: Similar carousel-like functionality

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Keyboard navigation in all browsers
- Screen reader support (NVDA, JAWS, VoiceOver)
- Touch support on mobile devices

## Notes

- Auto-rotation interval: 6000ms (6 seconds)
- Transition duration: 500ms
- Carousel loops infinitely
- Minimum 1 testimonial required
- Images are optional (gracefully handles missing images)
