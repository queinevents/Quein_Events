# Build Scripts

This directory contains utility scripts for analyzing and optimizing the application build.

## Available Scripts

### analyze-bundle.js

Analyzes the Next.js build output and provides a detailed report of bundle sizes.

**Usage:**

```bash
# Build the application first
npm run build

# Run the analysis
npm run analyze
```

**Output:**

The script provides:
- Main bundle sizes
- Framework bundle sizes
- Page bundle sizes
- Dynamic chunk sizes (top 10 largest)
- Total size summary
- Recommendations for optimization

**Thresholds:**

- Main bundle: 200KB (warning threshold)
- First load JS: 100KB (warning threshold)
- Individual chunks: 50KB (warning threshold)

**Color Coding:**

- 🟢 Green: Size is < 70% of threshold (good)
- 🟡 Yellow: Size is 70-100% of threshold (acceptable)
- 🔴 Red: Size exceeds threshold (needs optimization)

## Bundle Analysis Workflow

1. **Make changes** to the codebase
2. **Build** the application: `npm run build`
3. **Analyze** bundle sizes: `npm run analyze`
4. **Review** the report and identify large chunks
5. **Optimize** by:
   - Adding dynamic imports for large components
   - Removing unused dependencies
   - Code splitting heavy libraries
6. **Repeat** steps 2-5 until sizes are within thresholds

## Interactive Bundle Analyzer

For a visual, interactive analysis:

```bash
npm run build:analyze
```

This opens an interactive treemap visualization in your browser showing:
- Bundle composition
- Module sizes
- Dependency relationships
- Duplicate modules

## Tips for Optimization

### 1. Identify Large Dependencies

Look for large chunks in the analysis report. Common culprits:
- Animation libraries (framer-motion)
- Carousel libraries (embla-carousel)
- Form libraries (react-hook-form)
- Icon libraries

### 2. Apply Code Splitting

For large dependencies:

```typescript
// Before: Direct import
import { HeavyComponent } from 'heavy-library';

// After: Dynamic import
const HeavyComponent = dynamic(() => import('heavy-library'));
```

### 3. Check for Duplicates

If the same library appears in multiple chunks:
- Ensure consistent import paths
- Use barrel exports carefully
- Check for multiple versions in package.json

### 4. Monitor Over Time

Run analysis regularly:
- After adding new features
- After updating dependencies
- Before major releases

### 5. Set CI/CD Checks

Add bundle size checks to your CI/CD pipeline:

```bash
# In your CI script
npm run build
npm run analyze > bundle-report.txt

# Fail if main bundle exceeds threshold
# (implement custom check based on your needs)
```

## Troubleshooting

### "Build directory not found"

**Solution:** Run `npm run build` before analyzing

### "No JavaScript chunks found"

**Solution:** Ensure the build completed successfully

### Large main bundle

**Possible causes:**
- Heavy dependencies imported in critical path
- Missing dynamic imports for below-the-fold content
- Unused dependencies not tree-shaken

**Solutions:**
- Move heavy imports to dynamic imports
- Use `next/dynamic` for below-the-fold sections
- Remove unused dependencies from package.json

### Many small chunks

**Not necessarily a problem:** Many small chunks can be better than few large chunks for caching and parallel loading.

**When to consolidate:** If you have hundreds of tiny chunks (< 5KB), consider consolidating related components.
