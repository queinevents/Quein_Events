# Animation Components

This directory contains reusable animation wrapper components for the Quein Event Website.

## Components

### CounterAnimation

An animated number counter component that counts from 0 to a target value when scrolled into view.

**Features:**
- Animates from 0 to target value using requestAnimationFrame
- Triggers when 30% of element is visible in viewport
- Multiple easing functions (easeOutExpo, linear, easeOut, easeInOut)
- Supports prefix, suffix, and decimal formatting
- Respects `prefers-reduced-motion` media query
- Includes ARIA live region for accessibility
- Provides screen reader alternative

**Props:**
- `targetValue`: number - The final value to count to (required)
- `duration?`: number - Animation duration in milliseconds (default: 2000)
- `suffix?`: string - Text to append after the number (e.g., '+', '%')
- `prefix?`: string - Text to prepend before the number (e.g., '$')
- `decimals?`: number - Number of decimal places to display (default: 0)
- `easing?`: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutExpo' - Easing function (default: 'easeOutExpo')
- `className?`: string - Additional CSS classes

**Usage:**
```tsx
import { CounterAnimation } from '@/components/animations';

// Basic usage
<CounterAnimation targetValue={2000} suffix="+" />

// With prefix and decimals
<CounterAnimation 
  targetValue={4.8} 
  decimals={1} 
  suffix="/5" 
  duration={2500}
/>

// Currency example
<CounterAnimation 
  targetValue={500} 
  prefix="$" 
  suffix="K" 
/>
```

**Easing Functions:**
- `easeOutExpo`: Dramatic deceleration (recommended for statistics)
- `linear`: Constant speed throughout
- `easeOut`: Smooth deceleration
- `easeInOut`: Slow start and end, fast middle

**Requirements Validated:**
- 1.1: CounterAnimation component for animated number counters
- 1.2: Animates from 0 to target value using easeOutExpo easing
- 1.13: Respects prefers-reduced-motion setting
- 2.8: Includes aria-live="polite" for counter updates
- 2.9: Provides static text alternative for screen readers
- 14.1: Respects prefers-reduced-motion media query
- 14.3: Provides static alternatives when animations disabled

---

### FadeIn

A scroll-triggered fade-in animation component using the Intersection Observer API.

**Features:**
- Triggers animation when 20% of element is visible in viewport
- Configurable delay and duration
- Respects `prefers-reduced-motion` media query
- Fails silently if Intersection Observer is not supported
- Lightweight and performant

**Props:**
- `children`: React.ReactNode - Content to animate
- `delay?`: number - Animation delay in milliseconds (default: 0)
- `duration?`: number - Animation duration in milliseconds (default: 600)
- `className?`: string - Additional CSS classes

**Usage:**
```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={200} duration={600}>
  <div>Your content here</div>
</FadeIn>
```

**Requirements Validated:**
- 10.1: Fade-in animation when section enters viewport
- 10.3: CSS transitions with durations between 200ms and 600ms
- 10.4: Respects prefers-reduced-motion setting

---

### AnimatedSection

A flexible animation wrapper component using Framer Motion with multiple animation variants.

**Features:**
- Multiple animation variants: fade, slide-up, slide-left, slide-right
- Configurable delay
- Powered by Framer Motion for smooth animations
- Respects `prefers-reduced-motion` setting
- Triggers once when scrolled into view

**Props:**
- `children`: React.ReactNode - Content to animate
- `animation?`: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' - Animation variant (default: 'fade')
- `delay?`: number - Animation delay in seconds (default: 0)
- `className?`: string - Additional CSS classes

**Usage:**
```tsx
import { AnimatedSection } from '@/components/animations';

<AnimatedSection animation="slide-up" delay={0.2}>
  <div>Your content here</div>
</AnimatedSection>
```

**Animation Variants:**
- `fade`: Simple opacity fade-in
- `slide-up`: Slides up from below while fading in
- `slide-left`: Slides in from the right while fading in
- `slide-right`: Slides in from the left while fading in

**Requirements Validated:**
- 10.1: Animation when section enters viewport
- 10.3: Smooth transitions with appropriate durations
- 10.4: Respects prefers-reduced-motion setting

---

## Accessibility

All components are designed with accessibility in mind:

1. **Reduced Motion Support**: All components check for the `prefers-reduced-motion` media query and disable animations when users have this preference enabled.

2. **Screen Reader Support**: CounterAnimation includes ARIA live regions and static text alternatives for screen readers.

3. **Graceful Degradation**: FadeIn fails silently if Intersection Observer is not supported, showing content immediately without animation.

4. **Performance**: Animations are optimized and trigger only once when elements enter the viewport.

## Testing

Unit tests are provided for all components:
- `CounterAnimation.test.tsx`: Tests for CounterAnimation component
- `FadeIn.test.tsx`: Tests for FadeIn component
- `AnimatedSection.test.tsx`: Tests for AnimatedSection component

Run tests with your configured test runner (Jest/Vitest).

## Examples

Example files demonstrate various use cases:
- `CounterAnimation.example.tsx`: Examples of CounterAnimation usage
- `FadeIn.example.tsx`: Examples of FadeIn usage
- `AnimatedSection.example.tsx`: Examples of AnimatedSection usage

## When to Use Which Component

**Use CounterAnimation when:**
- You need to display animated statistics or metrics
- You want numbers to count up from 0
- You need formatted numbers with prefixes/suffixes
- You're building statistics sections or dashboards

**Use FadeIn when:**
- You want a simple, lightweight fade-in effect
- You don't need Framer Motion's advanced features
- You want minimal bundle size impact
- You need a basic scroll-triggered animation

**Use AnimatedSection when:**
- You need different animation variants (slide directions)
- You're already using Framer Motion in your project
- You want more complex animation capabilities
- You need consistent animation behavior across components

## Implementation Notes

- CounterAnimation triggers when 30% of element is visible (optimized for statistics sections)
- FadeIn and AnimatedSection trigger when 20% of element is visible
- CounterAnimation uses requestAnimationFrame for smooth 60fps animation
- FadeIn uses native CSS transitions for better performance
- AnimatedSection uses Framer Motion for more complex animations
- All components unobserve/stop watching elements after animation triggers
- Animation durations follow the design specification (200ms-600ms range for transitions, 2000-2500ms for counters)
