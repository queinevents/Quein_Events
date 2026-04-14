# Animation Hooks

This directory contains custom React hooks for animations and interactive effects used throughout the Quein Event Website.

## Available Hooks

### `useCounterAnimation`

A custom hook for animating a counter from 0 to a target value with configurable easing functions.

#### Features

- ✨ Smooth animation using `requestAnimationFrame` for optimal performance
- 🎯 Configurable target value, duration, and easing function
- 👁️ Triggers animation based on viewport visibility (using Intersection Observer)
- 🔄 Automatic reset when element leaves viewport
- 🧹 Automatic cleanup on component unmount
- 🎨 Multiple easing functions: `easeOutExpo`, `linear`, `easeOut`, `easeInOut`
- ✅ Ensures final value matches target exactly

#### Usage

```tsx
import { useInView } from 'react-intersection-observer';
import { useCounterAnimation } from '@/hooks';

function StatisticsCard() {
  // Set up Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0.3,      // Trigger when 30% visible
    triggerOnce: true,   // Only animate once
  });

  // Animate counter
  const count = useCounterAnimation(
    2000,         // Target value
    2500,         // Duration in milliseconds
    inView,       // Trigger when in view
    'easeOutExpo' // Easing function
  );

  return (
    <div ref={ref}>
      <span className="text-6xl font-bold">{count}+</span>
      <p>Events Completed</p>
    </div>
  );
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetValue` | `number` | - | The final value to count to (required) |
| `duration` | `number` | `2000` | Animation duration in milliseconds |
| `isInView` | `boolean` | `false` | Whether the element is in viewport (triggers animation) |
| `easing` | `'linear' \| 'easeOut' \| 'easeInOut' \| 'easeOutExpo'` | `'easeOutExpo'` | Easing function to use |

#### Return Value

Returns the current animated counter value as a `number`.

#### Easing Functions

- **`easeOutExpo`** (default): Dramatic deceleration effect
  - Formula: `1 - 2^(-10 * progress)`
  - Best for: Statistics, impressive numbers
  - Effect: Fast start, very slow end

- **`linear`**: Constant speed throughout
  - Formula: `progress`
  - Best for: Simple, predictable animations
  - Effect: Uniform speed

- **`easeOut`**: Smooth deceleration
  - Formula: `1 - (1 - progress)^2`
  - Best for: Natural-feeling animations
  - Effect: Fast start, smooth slow down

- **`easeInOut`**: Slow start and end, fast middle
  - Formula: `progress < 0.5 ? 2 * progress^2 : 1 - 2 * (1 - progress)^2`
  - Best for: Elegant, balanced animations
  - Effect: Smooth acceleration and deceleration

#### Examples

See `useCounterAnimation.example.tsx` for a complete working example with multiple counters and different configurations.

#### Implementation Details

**Algorithm:**
1. When `isInView` becomes `true`, start animation
2. Use `requestAnimationFrame` for smooth 60fps animation
3. Calculate elapsed time and progress (0 to 1)
4. Apply easing function to progress
5. Calculate current value: `floor(targetValue * easedProgress)`
6. Continue until progress reaches 1.0
7. Set final value to exactly `targetValue`
8. Clean up animation frame on unmount or when `isInView` becomes `false`

**Performance:**
- Uses `requestAnimationFrame` for optimal performance
- Automatically syncs with browser refresh rate (typically 60fps)
- Minimal re-renders (only updates when value changes)
- Proper cleanup prevents memory leaks

**Accessibility:**
- Works seamlessly with `prefers-reduced-motion` when used with appropriate wrapper components
- Provides smooth visual feedback for users
- Can be combined with `aria-live` regions for screen reader announcements

#### Requirements Satisfied

This hook satisfies the following requirements from the visual-enhancements-v2 spec:

- **Requirement 1.1**: Animation Library includes CounterAnimation component
- **Requirement 1.2**: CounterAnimation animates from 0 to target value using easeOutExpo easing
- **Requirement 2.3**: Counter animation triggers when section enters viewport
- **Requirement 2.4**: Counter animation duration between 2000ms and 2500ms
- **Requirement 2.5**: Counters use easeOutExpo easing function for dramatic effect

#### Testing

Tests are located in `useCounterAnimation.test.ts` and cover:
- Initial state (returns 0 when not in view)
- Animation from 0 to target value
- Different easing functions
- Reset behavior when leaving viewport
- Different target values and durations
- Cleanup on unmount
- Value never exceeds target

#### Related Components

This hook is used by:
- `CounterAnimation` component (to be implemented in Task 3.1)
- `StatisticsSection` component (to be implemented in Task 4.3)
- Any component requiring animated number counters

### `useParallaxScroll`

A custom hook for creating smooth parallax scroll effects with configurable speed and automatic performance optimization.

#### Features

- 🎢 Smooth parallax scrolling effect based on element position
- ⚡ Throttled scroll listener (16ms = 60fps) for optimal performance
- 🎯 Configurable speed parameter (-1 to 1) for different parallax intensities
- 🔒 Automatic clamping to ±200px to prevent excessive movement
- ♿ Respects `prefers-reduced-motion` accessibility setting
- 🧹 Automatic cleanup of scroll listeners on unmount
- 🎨 Returns transform style object ready for inline styles

#### Usage

```tsx
import { useRef } from 'react';
import { useParallaxScroll } from '@/hooks';

function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const transform = useParallaxScroll(0.5, bgRef);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        style={transform}
        className="absolute inset-0"
      >
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Static content */}
      <div className="relative z-10">
        <h1>Welcome to Quein Events</h1>
      </div>
    </section>
  );
}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `speed` | `number` | Parallax speed factor between -1 and 1 (required) |
| `elementRef` | `RefObject<HTMLElement>` | React ref to the element to apply parallax effect (required) |

#### Speed Values

- **`0.5`**: Slow parallax - Background moves slower than scroll (recommended for backgrounds)
- **`-0.5`**: Reverse parallax - Background moves opposite to scroll direction
- **`0`**: No parallax effect - Element remains static
- **`1`**: Fast parallax - Background moves at same speed as scroll
- **`-1`**: Fast reverse - Background moves opposite at same speed

Values outside -1 to 1 are automatically clamped to this range.

#### Return Value

Returns an object with a `transform` property:

```typescript
{
  transform: string; // e.g., "translateY(45.5px)"
}
```

This can be spread directly into the `style` prop of an element.

#### Examples

See `useParallaxScroll.example.tsx` for complete working examples including:
- Basic parallax background
- Reverse parallax effect
- Multi-layer parallax with depth
- Hero section with parallax
- Subtle parallax for content sections

#### Implementation Details

**Algorithm:**
1. Check `prefers-reduced-motion` - return zero transform if enabled
2. Clamp speed parameter to -1 to 1 range
3. On scroll (throttled to 16ms):
   - Get element's bounding rectangle
   - Calculate viewport center
   - Calculate element center position
   - Calculate distance from viewport center
   - Apply parallax formula: `distanceFromCenter * speed * 0.5`
   - Clamp result to ±200px
   - Update transform state
4. Use `requestAnimationFrame` for smooth updates
5. Clean up scroll listener on unmount

**Performance Optimizations:**
- Scroll listener throttled to 16ms (60fps maximum)
- Uses `requestAnimationFrame` for smooth rendering
- Passive event listener for better scroll performance
- Automatic cleanup prevents memory leaks
- Transform calculations cached until next scroll event

**Accessibility:**
- Automatically detects `prefers-reduced-motion: reduce`
- Returns zero transform when reduced motion is preferred
- No animation or movement for users who prefer reduced motion

**Clamping:**
- Transform values clamped to ±200px maximum
- Prevents excessive off-screen movement
- Ensures consistent behavior across different viewport sizes
- Maintains visual quality and performance

#### Requirements Satisfied

This hook satisfies the following requirements from the visual-enhancements-v2 spec:

- **Requirement 1.3**: ParallaxSection component accepts speed parameter between -1 and 1
- **Requirement 1.4**: Animation components respect prefers-reduced-motion setting
- **Requirement 9.2**: Hero Section includes parallax background image with speed 0.5
- **Requirement 9.8**: Hero Section parallax effect disabled on mobile for performance
- **Requirement 12.4**: Scroll event listeners throttled to maximum 60fps (16ms)

#### Testing

Tests are located in `useParallaxScroll.test.ts` and cover:
- Returns transform style object
- Calculates transform based on scroll position
- Clamps transform values to ±200px
- Respects speed parameter
- Handles negative speed (reverse parallax)
- Clamps speed parameter to -1 to 1 range
- Respects prefers-reduced-motion setting
- Handles null element ref gracefully
- Cleanup scroll listeners on unmount
- Adds scroll listener with passive option

#### Related Components

This hook is used by:
- `ParallaxSection` component (to be implemented in Task 3.2)
- `HeroSection` component enhancements (Task 5.1)
- Any component requiring parallax scroll effects

#### Common Patterns

**Multi-layer Parallax:**
```tsx
const layer1 = useParallaxScroll(0.2, layer1Ref); // Slowest
const layer2 = useParallaxScroll(0.5, layer2Ref); // Medium
const layer3 = useParallaxScroll(0.8, layer3Ref); // Fastest
```

**Conditional Parallax:**
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const speed = isMobile ? 0 : 0.5; // Disable on mobile
const transform = useParallaxScroll(speed, ref);
```

**Reverse Effect:**
```tsx
const transform = useParallaxScroll(-0.5, ref); // Moves opposite direction
```

## Future Hooks

Additional hooks to be implemented in subsequent tasks:

- `useIntersectionAnimation` - Intersection Observer wrapper (Task 2.3)

## Contributing

When adding new hooks:

1. Create the hook file: `hooks/useHookName.ts`
2. Add comprehensive JSDoc comments
3. Create test file: `hooks/useHookName.test.ts`
4. Create example file: `hooks/useHookName.example.tsx`
5. Export from `hooks/index.ts`
6. Update this README with documentation

## License

Part of the Quein Event Website project.
