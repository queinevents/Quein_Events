# Manual Testing Guide - Task 20

## Prerequisites

**CRITICAL:** You must upgrade Node.js before proceeding.

- Current: Node.js v16.15.0
- Required: Node.js >= v18.17.0
- Download: https://nodejs.org/

After upgrading:
```bash
node --version  # Verify version
npm install     # Reinstall dependencies
```

---

## Quick Start Testing

### 1. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 2. Build Production Version

```bash
npm run build
npx serve out
```

Open the served URL (usually http://localhost:3000 or http://localhost:8080).

---

## 20.1 Cross-Browser Testing Checklist

### Chrome Testing
1. Open http://localhost:3000 in Chrome
2. Test navigation:
   - [ ] Click each nav link (Home, Services, Portfolio, About, Contact)
   - [ ] Verify smooth scroll to each section
   - [ ] Test mobile menu (resize to <768px width)
   - [ ] Verify mobile menu opens/closes
3. Test form:
   - [ ] Fill out contact form with valid data
   - [ ] Submit and verify success message appears
   - [ ] Test validation errors (empty fields, invalid email)
4. Test animations:
   - [ ] Scroll through page
   - [ ] Verify sections fade in when visible
   - [ ] Hover over service cards (should lift up)
   - [ ] Hover over portfolio items (should show overlay)
   - [ ] Hover over buttons (should scale up)
5. Test images:
   - [ ] Verify all images load correctly
   - [ ] Check hero background image
   - [ ] Check portfolio images
   - [ ] Check service icons

### Firefox Testing
Repeat all Chrome tests in Firefox.

### Safari Testing (macOS/iOS)
Repeat all Chrome tests in Safari.
- Pay special attention to backdrop-blur effect on navigation
- Test on iPhone/iPad if available

### Edge Testing
Repeat all Chrome tests in Edge.

---

## 20.2 Visual Polish Verification

### Brand Colors Check
1. Open the website
2. Verify purple (#8B5CF6) is used for:
   - [ ] Navigation hover states
   - [ ] Hero CTA button
   - [ ] Service capacity badges
   - [ ] Form focus states
   - [ ] Footer hover states
3. Verify blue (#3B82F6) is used for:
   - [ ] Contact section phone icon
4. Verify gold (#F59E0B) is used for:
   - [ ] Contact section address icon

### Spacing Check
1. Scroll through the page
2. Verify consistent spacing:
   - [ ] Sections have adequate padding
   - [ ] Content is centered and not touching edges
   - [ ] Grid items have consistent gaps
   - [ ] Text blocks have proper line height

### Typography Check
1. Review text throughout the page:
   - [ ] Headings are bold and prominent
   - [ ] Body text is readable
   - [ ] Font sizes scale appropriately on mobile
   - [ ] No text is cut off or overlapping

### Hover States Check
1. Hover over interactive elements:
   - [ ] Buttons scale up smoothly
   - [ ] Service cards lift up with shadow
   - [ ] Portfolio items show overlay
   - [ ] Links change color
   - [ ] All transitions are smooth (300ms)

---

## 20.3 Accessibility Testing

### Keyboard Navigation Test
1. Open the website
2. Press Tab repeatedly:
   - [ ] Focus moves through all interactive elements
   - [ ] Focus indicators are visible (purple ring)
   - [ ] Focus order is logical (top to bottom, left to right)
   - [ ] No elements are skipped
3. Test mobile menu:
   - [ ] Tab to hamburger button
   - [ ] Press Enter to open menu
   - [ ] Tab through menu links
   - [ ] Press Escape to close menu
   - [ ] Focus returns to hamburger button
4. Test form:
   - [ ] Tab through all form fields
   - [ ] Press Enter on submit button
   - [ ] Error messages are accessible

### Screen Reader Test (Optional)
1. Enable screen reader:
   - Windows: NVDA (free) or JAWS
   - macOS: VoiceOver (Cmd+F5)
   - iOS: VoiceOver (Settings > Accessibility)
   - Android: TalkBack (Settings > Accessibility)
2. Navigate through the page:
   - [ ] Headings are announced correctly
   - [ ] Images have descriptive alt text
   - [ ] Form labels are read
   - [ ] Buttons are identified
   - [ ] Links are descriptive

### Automated Accessibility Audit
1. Install browser extension:
   - axe DevTools: https://www.deque.com/axe/devtools/
   - WAVE: https://wave.webaim.org/extension/
2. Run the audit:
   - [ ] No critical errors
   - [ ] No serious errors
   - [ ] Review and address any warnings
3. Run Lighthouse:
   - Open Chrome DevTools (F12)
   - Go to Lighthouse tab
   - Select "Accessibility" category
   - Click "Analyze page load"
   - [ ] Score should be 95-100

---

## 20.4 Performance Testing

### Lighthouse Performance Audit
1. Build production version:
   ```bash
   npm run build
   npx serve out
   ```
2. Open in Chrome
3. Open DevTools (F12)
4. Go to Lighthouse tab
5. Select all categories:
   - [x] Performance
   - [x] Accessibility
   - [x] Best Practices
   - [x] SEO
6. Select "Desktop" mode
7. Click "Analyze page load"
8. Wait for results (30-60 seconds)

### Expected Scores
- **Performance:** 80-95 ✓
- **Accessibility:** 95-100 ✓
- **Best Practices:** 90-100 ✓
- **SEO:** 90-100 ✓

### Performance Metrics
- [ ] First Contentful Paint (FCP): < 2s
- [ ] Largest Contentful Paint (LCP): < 3s
- [ ] Total Blocking Time (TBT): < 300ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Speed Index: < 4s

### Mobile Performance Test
1. Run Lighthouse again
2. Select "Mobile" mode
3. Click "Analyze page load"
4. Verify scores (mobile scores are typically 10-20 points lower)

---

## Common Issues and Solutions

### Issue: Images not loading
**Solution:** Verify images exist in public/images/ directory

### Issue: Animations not working
**Solution:** Check browser console for JavaScript errors

### Issue: Form not submitting
**Solution:** Check browser console for validation errors

### Issue: Mobile menu not opening
**Solution:** Verify viewport width is < 768px

### Issue: Low performance score
**Possible causes:**
- Large image file sizes
- Slow network connection
- Browser extensions interfering

**Solutions:**
- Convert images to WebP format
- Test in incognito mode
- Test on fast network connection

### Issue: Accessibility warnings
**Common warnings:**
- Color contrast (verify with contrast checker)
- Missing alt text (add descriptive alt text)
- Missing ARIA labels (add where needed)

---

## Testing Completion Checklist

### Cross-Browser Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] All animations work consistently
- [ ] Form submission works in all browsers
- [ ] No layout issues found

### Visual Polish
- [ ] Brand colors used consistently
- [ ] Spacing and alignment reviewed
- [ ] Typography hierarchy clear
- [ ] All hover states smooth
- [ ] All transitions are 300ms

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels appropriate
- [ ] Automated audit passed (95-100)
- [ ] Screen reader test completed (optional)

### Performance
- [ ] Lighthouse performance score > 80
- [ ] FCP < 2s
- [ ] LCP < 3s
- [ ] CLS < 0.1
- [ ] Mobile performance tested

---

## Next Steps After Testing

1. **Address any issues found** during testing
2. **Document any browser-specific issues**
3. **Update TASK_20_FINAL_CHECKPOINT.md** with test results
4. **Prepare for deployment** (Task 19 if not completed)
5. **Deploy to production** hosting

---

## Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify Node.js version (node --version)
3. Clear browser cache and reload
4. Test in incognito mode
5. Check TASK_20_FINAL_CHECKPOINT.md for detailed information

