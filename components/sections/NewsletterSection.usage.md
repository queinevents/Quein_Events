# NewsletterSection Component Usage Guide

## Overview

The `NewsletterSection` component is a full-width CTA section for email newsletter subscription. It features an animated gradient background, text reveal animations, and an integrated newsletter form with validation.

## Features

- **Animated Gradient Background**: Smooth color transitions between purple, blue, and gold
- **Text Reveal Animation**: Heading animates word by word on scroll
- **Form Animation**: Newsletter form slides up with bounce effect
- **Decorative Elements**: Animated lines and shapes for visual interest
- **Responsive Design**: Adapts to all screen sizes (320px to 2560px+)
- **Accessibility**: WCAG AA compliant with proper ARIA labels
- **Reduced Motion Support**: Respects user's motion preferences

## Basic Usage

```tsx
import { NewsletterSection } from '@/components/sections';

export default function HomePage() {
  return (
    <main>
      <NewsletterSection />
    </main>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes for the section |

## Styling

### Custom Spacing

```tsx
<NewsletterSection className="my-20" />
```

### Integration with Other Sections

```tsx
<main>
  <HeroSection />
  <StatisticsSection />
  <ServicesSection />
  {/* ... other sections ... */}
  <NewsletterSection />
  <ContactSection />
</main>
```

## Animation Specifications

### Gradient Background
- **Colors**: Purple (#8B5CF6), Blue (#3B82F6), Gold (#F59E0B)
- **Duration**: 10000ms (10 seconds)
- **Direction**: Diagonal (135deg)
- **Loop**: Infinite

### Text Reveal
- **Delay**: 0.2s
- **Stagger**: 0.05s between words
- **Animation**: Slide up with fade

### Form Animation
- **Easing**: Bounce (cubic-bezier(0.34, 1.56, 0.64, 1))
- **Duration**: 0.6s
- **Effect**: Slide up with bounce

### Decorative Elements
- **Lines**: Fade in over 0.8s
- **Shapes**: Scale and fade with staggered delays (0.3s - 0.4s)

## Responsive Behavior

### Mobile (320px - 639px)
- Heading: `text-3xl` (30px)
- Subheading: `text-lg` (18px)
- Padding: `py-20` (80px vertical)
- Form: Stacked vertically

### Tablet (640px - 1023px)
- Heading: `text-4xl` (36px)
- Subheading: `text-xl` (20px)
- Padding: `py-28` (112px vertical)
- Form: Horizontal layout

### Desktop (1024px+)
- Heading: `text-6xl` (60px)
- Subheading: `text-xl` (20px)
- Padding: `py-32` (128px vertical)
- Form: Horizontal layout with max-width

## Accessibility

### ARIA Attributes
- Section has `aria-labelledby="newsletter-heading"`
- Heading has `id="newsletter-heading"`
- Decorative elements have `aria-hidden="true"`

### Keyboard Navigation
- All form elements are keyboard accessible
- Tab order follows logical flow
- Focus indicators visible on all interactive elements

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Form validation errors announced
- Success messages announced with `aria-live="polite"`

### Color Contrast
- White text on gradient background: >4.5:1 ratio (WCAG AA)
- All interactive elements meet contrast requirements

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Animations disabled when user prefers reduced motion
- Static content displayed instead

## Form Validation

The integrated `NewsletterForm` component includes:

- **Email Validation**: Uses Zod schema for format validation
- **Error Messages**: Clear, actionable error messages
- **Loading State**: Visual feedback during submission
- **Success State**: Animated checkmark with confirmation message
- **Form Reset**: Automatically resets after successful submission

### Validation Rules
- Email must be valid format (user@domain.com)
- Email field is required
- Real-time validation on blur and submit

## Performance Considerations

### Optimization Techniques
- CSS transforms for animations (GPU accelerated)
- Intersection Observer for scroll-triggered animations
- Lazy loading of decorative elements
- Efficient gradient animation using CSS keyframes

### Performance Metrics
- Animation frame rate: 60fps target
- No layout shifts during animations
- Minimal JavaScript execution
- Optimized for Core Web Vitals

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch optimization

## Examples

### Basic Implementation
```tsx
<NewsletterSection />
```

### With Custom Spacing
```tsx
<NewsletterSection className="my-16 lg:my-24" />
```

### In Full Page Layout
```tsx
export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <EventCategoriesSection />
      <ExpertiseSection />
      <PortfolioSection />
      <TeamSection />
      <TestimonialsSection />
      <EventGallerySection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </>
  );
}
```

## Testing

### Manual Testing Checklist
- [ ] Gradient animation plays smoothly
- [ ] Text reveals word by word on scroll
- [ ] Form slides up with bounce effect
- [ ] Email validation works correctly
- [ ] Success message displays after submission
- [ ] Form resets after successful submission
- [ ] Decorative elements animate properly
- [ ] Responsive layout works on all screen sizes
- [ ] Keyboard navigation functions correctly
- [ ] Screen reader announces content properly
- [ ] Reduced motion preference is respected

### Automated Testing
See `NewsletterSection.test.tsx` for unit tests covering:
- Component rendering
- Props handling
- Accessibility attributes
- Responsive classes
- Integration with child components

## Troubleshooting

### Animations Not Playing
- Check if `prefers-reduced-motion` is enabled
- Verify Framer Motion is installed
- Ensure component is in viewport

### Form Not Submitting
- Check browser console for errors
- Verify Zod schema is imported correctly
- Ensure email validation is working

### Gradient Not Animating
- Check if CSS animations are supported
- Verify gradient colors are valid
- Ensure animation duration is set

## Related Components

- `GradientBackground`: Animated gradient background component
- `TextReveal`: Text reveal animation component
- `NewsletterForm`: Email subscription form component
- `Input`: Form input component
- `Button`: Button component with loading states

## Requirements Validation

This component validates the following requirements:
- **8.2**: Animated gradient background
- **8.3**: Gradient colors (purple, blue, gold)
- **8.4**: Text reveal for heading
- **8.5**: Form slide up with bounce
- **8.10**: Decorative elements
- **8.11**: Full-width section
- **8.12**: WCAG AA contrast
- **15.8**: Responsive design

## Version History

- **v1.0.0**: Initial implementation with all core features
