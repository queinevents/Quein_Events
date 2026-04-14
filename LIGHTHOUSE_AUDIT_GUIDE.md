# Lighthouse Audit Guide

## Prerequisites

- Node.js version >= 18.17.0 (required for Next.js 14)
- Chrome browser installed

## Steps to Run Lighthouse Audit

### 1. Build the Production Version

```bash
npm run build
```

This creates an optimized production build in the `out/` directory.

### 2. Serve the Production Build

Option A - Using npx serve:
```bash
npx serve out
```

Option B - Using http-server:
```bash
npx http-server out
```

The site will typically be available at `http://localhost:3000` or `http://localhost:8080`.

### 3. Run Lighthouse Audit

#### Method 1: Chrome DevTools (Recommended)

1. Open the served site in Chrome
2. Open Chrome DevTools (F12 or Right-click → Inspect)
3. Click on the "Lighthouse" tab
4. Select categories to audit:
   - ✓ Performance
   - ✓ Accessibility
   - ✓ Best Practices
   - ✓ SEO
5. Select "Desktop" or "Mobile" mode
6. Click "Analyze page load"
7. Wait for the audit to complete (30-60 seconds)

#### Method 2: Lighthouse CLI

Install Lighthouse globally:
```bash
npm install -g lighthouse
```

Run audit:
```bash
lighthouse http://localhost:3000 --view
```

For specific categories:
```bash
lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --view
```

### 4. Review Results

#### Performance Metrics to Check:
- **First Contentful Paint (FCP)**: Should be < 2s
- **Largest Contentful Paint (LCP)**: Should be < 3s
- **Total Blocking Time (TBT)**: Should be < 300ms
- **Cumulative Layout Shift (CLS)**: Should be < 0.1
- **Speed Index**: Should be < 4s

#### Target Scores:
- Performance: **> 80** (Requirement 13.3)
- Accessibility: **> 90**
- Best Practices: **> 90**
- SEO: **> 90**

### 5. Address Any Issues

If scores are below target:

#### Performance Issues:
- Check image sizes and formats
- Verify lazy loading is working
- Check for render-blocking resources
- Verify font loading strategy

#### Accessibility Issues:
- Check color contrast ratios
- Verify ARIA labels
- Test keyboard navigation
- Check alt text on images

#### SEO Issues:
- Verify meta tags are present
- Check title and description
- Ensure proper heading hierarchy
- Verify robots.txt is accessible

## Optimizations Already Implemented

✓ Next.js Image component for all images
✓ Priority loading for hero image
✓ Lazy loading for below-the-fold images
✓ Font optimization with display: swap
✓ GPU-accelerated animations
✓ Minified production builds
✓ Enhanced metadata and SEO tags
✓ Accessibility features (ARIA, semantic HTML, keyboard nav)

## Common Issues and Solutions

### Issue: Low Performance Score

**Possible Causes:**
- Large image file sizes
- Unoptimized fonts
- Render-blocking resources

**Solutions:**
- Convert images to WebP format
- Use image compression tools
- Verify Next.js Image optimization is working
- Check network throttling settings in Lighthouse

### Issue: Accessibility Warnings

**Possible Causes:**
- Missing alt text
- Low color contrast
- Missing ARIA labels

**Solutions:**
- Add descriptive alt text to all images
- Verify color contrast meets WCAG AA standards
- Add ARIA labels to interactive elements

### Issue: SEO Warnings

**Possible Causes:**
- Missing meta tags
- Improper heading hierarchy
- Missing robots.txt

**Solutions:**
- Verify all meta tags in app/layout.tsx
- Check heading structure (h1 → h2 → h3)
- Add robots.txt if needed

## Testing on Different Devices

### Mobile Testing:
```bash
lighthouse http://localhost:3000 --preset=mobile --view
```

### Desktop Testing:
```bash
lighthouse http://localhost:3000 --preset=desktop --view
```

## Continuous Monitoring

For production sites, consider:
- Google PageSpeed Insights
- Web Vitals Chrome Extension
- Lighthouse CI for automated testing
- Real User Monitoring (RUM) tools

## Notes

- Lighthouse scores can vary between runs (±5 points is normal)
- Run multiple audits and average the scores
- Test in incognito mode to avoid extension interference
- Ensure stable network connection during testing
- Mobile scores are typically lower than desktop scores

## Expected Results

Based on the optimizations implemented, you should see:
- **Performance**: 80-95 (depending on device and network)
- **Accessibility**: 95-100
- **Best Practices**: 90-100
- **SEO**: 90-100

If scores are significantly lower, review the specific recommendations in the Lighthouse report.
