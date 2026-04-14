# EventGallerySection Component

## Overview

The `EventGallerySection` component displays an event portfolio in a masonry grid layout with category filtering and lightbox functionality. It provides an engaging way to showcase past events with smooth animations and interactive features.

## Features

- **Masonry Grid Layout**: Pinterest-style layout using `react-masonry-css`
- **Category Filtering**: Filter events by type with smooth transitions
- **Hover Effects**: Image brightness increase and overlay slide-up animation
- **Staggered Animations**: Sequential fade and scale animations for gallery items
- **Timeline Markers**: Pulse animation indicators for chronological context
- **Lightbox Modal**: Full-size image viewing with navigation
- **Lazy Loading**: Performance optimization for images
- **Responsive Design**: Adapts from 1 column (mobile) to 4 columns (desktop)
- **Keyboard Accessible**: Full keyboard navigation support

## Requirements Validated

- **7.2**: Masonry grid layout (Pinterest-style)
- **7.3**: Filter buttons for event categories
- **7.4**: Filter transition with fade and scale (400ms)
- **7.5**: Hover effects with brightness increase and overlay slide up
- **7.6**: Staggered fade and scale in animation
- **7.8**: Responsive layout (1 col mobile, 2 col tablet, 3-4 col desktop)
- **7.9**: Timeline markers with pulse animation
- **7.10**: Timeline markers with pulse animation
- **7.11**: Lazy load images
- **7.12**: Lightbox modal for full-size viewing
- **14.5**: Focus trap within modal
- **15.7**: Responsive design across all breakpoints

## Usage

### Basic Usage

```tsx
import { EventGallerySection } from '@/components/sections/EventGallerySection';

export default function Page() {
  return (
    <main>
      <EventGallerySection />
    </main>
  );
}
```

### With Custom Styling

```tsx
<EventGallerySection className="my-custom-class" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes to apply to the section |

## Data Source

The component uses `GALLERY_ITEMS` from `@/lib/constants`, which contains:

```typescript
interface GalleryItem {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  description?: string;
}
```

## Category Filters

The component includes the following category filters:

- **All Events**: Shows all gallery items
- **Concerts**: Live music and performance events
- **Exhibitions**: Trade shows and exhibitions
- **Conferences**: Business conferences and seminars
- **Weddings**: Wedding ceremonies and receptions
- **Festivals**: Multi-day festivals and cultural events

## Responsive Breakpoints

The masonry grid adapts to different screen sizes:

- **Mobile (< 640px)**: 1 column
- **Tablet (640px - 767px)**: 1 column
- **Tablet (768px - 1279px)**: 2 columns
- **Desktop (1280px - 1919px)**: 3 columns
- **Large Desktop (≥ 1920px)**: 4 columns

## Lightbox Features

When a gallery item is clicked, a lightbox modal opens with:

- **Full-size image display**
- **Image information** (title, description, date, category)
- **Navigation buttons** (Previous/Next)
- **Close button** (top-right corner)
- **Keyboard shortcuts**:
  - `Escape`: Close lightbox
  - `Arrow Left`: Previous image
  - `Arrow Right`: Next image
- **Focus trap**: Keeps focus within modal
- **Body scroll prevention**: Prevents background scrolling

## Animation Details

### Gallery Items

- **Initial Animation**: Fade and scale in with 50ms stagger delay
- **Hover Effect**: 
  - Image scales to 105% and brightness increases to 110%
  - Overlay fades in with event details
  - Details slide up from bottom
  - Duration: 300-500ms

### Filter Transitions

- **Filter Change**: Fade and scale transition (400ms)
- **Active Filter**: Gradient background with shadow effect

### Timeline Markers

- **Pulse Animation**: Continuous pulse effect on timeline dots
- **Ping Animation**: Expanding ring effect for visual interest

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate through filter buttons
- **Enter/Space**: Activate filter button
- **Escape**: Close lightbox modal
- **Arrow Left/Right**: Navigate between images in lightbox

### ARIA Attributes

- `aria-pressed`: Indicates active filter button state
- `role="dialog"`: Identifies lightbox as modal dialog
- `aria-modal="true"`: Indicates modal behavior
- `aria-labelledby`: Links modal to title
- `aria-label`: Provides accessible names for buttons

### Screen Reader Support

- Descriptive alt text for all images
- Semantic HTML structure
- Focus management in modal
- Announced state changes

## Performance Optimizations

1. **Lazy Loading**: All gallery images use `loading="lazy"`
2. **Next.js Image**: Automatic image optimization
3. **Staggered Rendering**: Prevents layout thrashing
4. **CSS Transforms**: Hardware-accelerated animations
5. **AnimatePresence**: Smooth filter transitions

## Styling

The component uses Tailwind CSS with the following color scheme:

- **Background**: Gradient from black via gray-900 to black
- **Primary Accent**: Purple (#8B5CF6)
- **Secondary Accent**: Blue (#3B82F6)
- **Text**: White and gray shades
- **Overlays**: Black with opacity

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Requires JavaScript for interactivity
- Graceful degradation for older browsers

## Dependencies

- `react`: ^18.3.1
- `next`: ^14.2.0
- `framer-motion`: ^11.0.0
- `react-masonry-css`: ^1.0.16

## Related Components

- `GALLERY_ITEMS` constant in `lib/constants.ts`
- `GalleryItem` type in `types/index.ts`

## Examples

See `EventGallerySection.example.tsx` for complete usage examples.

## Testing

See `EventGallerySection.test.tsx` for component tests covering:

- Rendering and display
- Filter functionality
- Lightbox modal behavior
- Keyboard navigation
- Accessibility features
