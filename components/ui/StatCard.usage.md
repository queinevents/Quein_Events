# StatCard Component Usage Guide

## Overview

The `StatCard` component displays statistics with animated counters, icons, and labels. It's designed for the Statistics Section to showcase key company metrics with visual appeal.

## Features

- ✅ Animated counter using CounterAnimation component
- ✅ Optional icon display above counter
- ✅ Responsive typography (mobile, tablet, desktop)
- ✅ Dark theme with purple accents
- ✅ Hover effects with border and shadow
- ✅ Customizable animation duration
- ✅ Support for prefix and suffix
- ✅ Accessibility compliant

## Basic Usage

```tsx
import { StatCard } from '@/components/ui/StatCard';

<StatCard
  value={2000}
  suffix="+"
  label="Events Completed"
  icon="/icons/check-circle.svg"
  animationDuration={2500}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | The target value to count to |
| `suffix` | `string` | `''` | Text to append after the number (e.g., '+', '%') |
| `prefix` | `string` | `''` | Text to prepend before the number (e.g., '$') |
| `label` | `string` | required | Descriptive label below the counter |
| `icon` | `string` | `undefined` | Path to icon image (optional) |
| `animationDuration` | `number` | `2000` | Duration of counter animation in milliseconds |
| `className` | `string` | `undefined` | Additional CSS classes |

## Examples

### With Icon

```tsx
<StatCard
  value={15}
  suffix="+"
  label="Years Experience"
  icon="/icons/calendar.svg"
/>
```

### Without Icon

```tsx
<StatCard
  value={98}
  suffix="%"
  label="Success Rate"
/>
```

### With Prefix

```tsx
<StatCard
  value={5}
  prefix="$"
  suffix="M+"
  label="Revenue Generated"
/>
```

### Custom Animation Duration

```tsx
<StatCard
  value={1000}
  suffix="+"
  label="Projects"
  animationDuration={3000}
/>
```

### Custom Styling

```tsx
<StatCard
  value={500}
  suffix="+"
  label="Custom Style"
  className="border-2 border-primary-blue"
/>
```

## Layout Examples

### Three Column Grid (Desktop)

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard
    value={15}
    suffix="+"
    label="Years Experience"
    icon="/icons/calendar.svg"
  />
  <StatCard
    value={2000}
    suffix="+"
    label="Events Completed"
    icon="/icons/check-circle.svg"
  />
  <StatCard
    value={200}
    suffix="+"
    label="Happy Clients"
    icon="/icons/users.svg"
  />
</div>
```

### Single Column (Mobile-First)

```tsx
<div className="max-w-md mx-auto">
  <StatCard
    value={10000}
    suffix="+"
    label="Total Impressions"
    icon="/icons/event-management.svg"
  />
</div>
```

## Styling

The component uses the following design tokens:

- **Background**: `bg-background-card` (#1A1A1A)
- **Border**: `border-text-secondary/10` with hover state `border-primary-purple/30`
- **Counter Color**: `text-primary-purple` (#8B5CF6)
- **Label Color**: `text-text-secondary` (#A0A0A0)
- **Icon Background**: `bg-primary-purple/10`

## Responsive Behavior

- **Mobile (< 768px)**: 
  - Icon: 64px (w-16 h-16)
  - Counter: 36px (text-4xl)
  - Label: 14px (text-sm)
  - Padding: 24px (p-6)

- **Tablet (768px - 1024px)**:
  - Icon: 80px (w-20 h-20)
  - Counter: 48px (text-5xl)
  - Label: 16px (text-base)
  - Padding: 32px (p-8)

- **Desktop (> 1024px)**:
  - Icon: 80px (w-20 h-20)
  - Counter: 60px (text-6xl)
  - Label: 18px (text-lg)
  - Padding: 32px (p-8)

## Accessibility

- Counter animation respects `prefers-reduced-motion` setting
- Icon has `aria-hidden="true"` (decorative)
- Semantic HTML structure
- Screen reader accessible via CounterAnimation component

## Requirements Validation

**Validates: Requirements 2.2, 2.6**

- ✅ 2.2: Counter animation for each metric value
- ✅ 2.6: Icon displayed above each statistic

## Integration with StatisticsSection

```tsx
import { StatCard } from '@/components/ui/StatCard';
import { STATISTICS } from '@/lib/constants';

<section className="py-16 bg-background-dark">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STATISTICS.map((stat) => (
        <StatCard
          key={stat.id}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          icon={stat.icon}
          animationDuration={stat.animationDuration}
        />
      ))}
    </div>
  </div>
</section>
```

## Performance Considerations

- Uses CSS transforms for smooth animations
- Respects `prefers-reduced-motion` for accessibility
- Lazy loads images via Next.js Image component
- Optimized for 60fps animation performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Mobile browsers (iOS Safari, Chrome Mobile)
