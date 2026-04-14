# Code Splitting Guide

This guide explains the code splitting strategy implemented for the Quein Event Website to optimize bundle size and improve performance.

## Overview

Code splitting divides the application into smaller chunks that are loaded on-demand, reducing initial bundle size and improving Time to Interactive (TTI).

## Strategy

### 1. Critical vs Non-Critical Components

**Critical Components (Preloaded):**
- Hero Section
- Statistics Section
- Services Section
- Navigation
- Footer

These components are loaded immediately as they are above-the-fold and essential for First Contentful Paint (FCP).

**Non-Critical Components (Lazy Loaded):**
- Team Section
- Testimonials Section
- Event Gallery Section
- Newsletter Section
- Below-the-fold sections

These components are loaded on-demand using dynamic imports.

### 2. Dynamic Import Implementation

#### Section Components

```typescript
import dynamic from 'next/dynamic';

// Lazy load with loading state
const TeamSection = dynamic(
  () => import('@/components/sections/TeamSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: false, // Disable SSR for below-fold content
  }
);
```

#### Animation Components

```typescript
// Use the dynamic animation exports
import { ParallaxSection, TextReveal } from '@/components/animations/dynamic';

// Or import directly with dynamic
const ParallaxSection = dynamic(
  () => import('@/components/animations/ParallaxSection'),
  { ssr: false }
);
```

### 3. Progressive Loading

Use the `useProgressiveLoad` hook for fine-grained control:

```typescript
import { useProgressiveLoad } from '@/hooks';

function MyComponent() {
  const shouldLoad = useProgressiveLoad({ 
    delay: 1000, 
    waitForIdle: true 
  });
  
  if (!shouldLoad) {
    return <Skeleton />;
  }
  
  return <HeavyComponent />;
}
```

### 4. Preloading Strategy

Preload critical animations after initial render:

```typescript
import { preloadCriticalAnimations, preloadBelowFoldAnimations } from '@/components/animations/dynamic';

// In your main component
useEffect(() => {
  preloadCriticalAnimations(); // Immediate
  preloadBelowFoldAnimations(); // Delayed
}, []);
```

## Bundle Analysis

### Running Bundle Analyzer

```bash
npm run build:analyze
```

This generates an interactive visualization of your bundle composition.

### Interpreting Results

- **Target**: Keep main bundle under 200KB (gzipped)
- **First Load JS**: Should be under 100KB for critical path
- **Route Chunks**: Each dynamic import creates a separate chunk

### Optimization Checklist

- [ ] Main bundle < 200KB gzipped
- [ ] First Load JS < 100KB
- [ ] Heavy libraries (framer-motion, embla-carousel) are code-split
- [ ] Below-the-fold sections use dynamic imports
- [ ] Animation components are lazy-loaded
- [ ] No duplicate dependencies across chunks

## Performance Metrics

### Before Code Splitting
- Main bundle: ~350KB
- First Load JS: ~180KB
- TTI: ~4.5s

### After Code Splitting (Target)
- Main bundle: ~180KB
- First Load JS: ~90KB
- TTI: ~2.5s

## Best Practices

### 1. SSR Configuration

```typescript
// Enable SSR for above-the-fold content
const HeroSection = dynamic(() => import('./HeroSection'), {
  ssr: true, // Server-side render
});

// Disable SSR for below-the-fold content
const TeamSection = dynamic(() => import('./TeamSection'), {
  ssr: false, // Client-side only
});
```

### 2. Loading States

Always provide loading states for better UX:

```typescript
const Section = dynamic(() => import('./Section'), {
  loading: () => <Skeleton />,
});
```

### 3. Chunk Naming

Use webpack magic comments for better debugging:

```typescript
const Section = dynamic(
  () => import(/* webpackChunkName: "team-section" */ './TeamSection')
);
```

### 4. Avoid Over-Splitting

Don't split components that are:
- Very small (< 10KB)
- Always needed together
- Critical for initial render

### 5. Monitor Bundle Size

Run bundle analysis regularly:

```bash
# After adding new features
npm run build:analyze

# Check bundle sizes
npm run build
```

## Common Issues

### Issue: Component Flashing

**Problem**: Component briefly shows loading state then content

**Solution**: Use SSR for above-the-fold content:

```typescript
const Section = dynamic(() => import('./Section'), {
  ssr: true, // Prevents flash
});
```

### Issue: Hydration Mismatch

**Problem**: Server and client render different content

**Solution**: Ensure consistent rendering:

```typescript
// Bad: Different content on server/client
const Section = dynamic(() => import('./Section'), {
  ssr: false,
  loading: () => <div>Loading...</div>, // Only shows on client
});

// Good: Consistent rendering
const Section = dynamic(() => import('./Section'), {
  ssr: true,
  loading: () => null, // No loading state
});
```

### Issue: Large Initial Bundle

**Problem**: Main bundle still too large after splitting

**Solution**: Check for:
1. Unused dependencies in package.json
2. Large libraries imported in critical path
3. Missing dynamic imports for heavy components

## Testing

### Network Throttling

Test with slow 3G to verify lazy loading:

1. Open Chrome DevTools
2. Network tab → Throttling → Slow 3G
3. Reload page
4. Verify chunks load progressively

### Lighthouse Audit

Run Lighthouse to verify improvements:

```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Run audit
```

Target scores:
- Performance: > 90
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Total Blocking Time: < 300ms

## Maintenance

### Adding New Sections

When adding new sections:

1. Determine if above or below-the-fold
2. Use dynamic import for below-the-fold
3. Add loading skeleton
4. Run bundle analysis
5. Verify performance metrics

### Updating Dependencies

After updating heavy dependencies:

1. Run bundle analysis
2. Check for size increases
3. Consider code splitting if needed
4. Test performance on slow networks

## Resources

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Web.dev Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
