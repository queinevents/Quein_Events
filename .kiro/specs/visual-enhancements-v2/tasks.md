# Implementation Plan: Visual Enhancements V2

## Overview

This implementation plan breaks down the visual enhancements for the Quein Event Website into discrete, actionable tasks. The enhancements include 7 new sections, 6 advanced animation components, enhanced existing sections, and comprehensive performance and accessibility improvements. Tasks are organized in phases to build incrementally from animation foundations through new sections to final polish.

## Tasks

### Phase 1: Animation Library Foundation

- [x] 1. Install new dependencies and update configuration
  - Install react-intersection-observer for scroll triggers
  - Install react-masonry-css for gallery layout
  - Install embla-carousel-react for testimonial carousel
  - Update package.json with new dependencies
  - Update tsconfig.json if needed for new libraries
  - _Requirements: 19.6_

- [x] 2. Create core animation hooks
  - [x] 2.1 Create hooks/useCounterAnimation.ts
    - Implement counter animation from 0 to target value
    - Support configurable duration and easing function
    - Use requestAnimationFrame for smooth animation
    - Trigger animation based on isInView parameter
    - Support easeOutExpo easing: 1 - 2^(-10 * progress)
    - Return current animated value
    - _Requirements: 1.1, 1.2, 2.3, 2.4, 2.5_
  
  - [x] 2.2 Create hooks/useParallaxScroll.ts
    - Implement parallax scroll effect calculation
    - Accept speed parameter (-1 to 1)
    - Calculate transform based on scroll position and element offset
    - Clamp transform values to ±200px
    - Throttle scroll listener to 16ms (60fps)
    - Return transform style object
    - Respect prefers-reduced-motion setting
    - _Requirements: 1.3, 1.4, 9.2, 9.8, 12.4_
  
  - [x] 2.3 Create hooks/useIntersectionAnimation.ts
    - Implement Intersection Observer wrapper
    - Accept threshold and triggerOnce parameters
    - Return ref and isInView state
    - Disconnect observer on unmount or when triggerOnce triggered
    - Support configurable threshold (0-1)
    - _Requirements: 1.13, 2.10, 12.5_

- [x] 3. Create animation wrapper components
  - [x] 3.1 Create components/animations/CounterAnimation.tsx
    - Accept targetValue, duration, suffix, prefix, decimals, easing props
    - Use useCounterAnimation hook
    - Use useIntersectionAnimation for trigger
    - Format number with suffix/prefix
    - Include aria-live="polite" for accessibility
    - Provide static text alternative for screen readers
    - Respect prefers-reduced-motion
    - _Requirements: 1.1, 1.2, 1.13, 2.8, 2.9, 14.1, 14.3_
  
  - [x] 3.2 Create components/animations/ParallaxSection.tsx
    - Accept speed and children props
    - Use useParallaxScroll hook
    - Apply transform to container element
    - Disable on mobile devices (check viewport width)
    - Respect prefers-reduced-motion
    - _Requirements: 1.3, 1.4, 1.13, 9.1, 9.8, 12.13, 14.1_
  
  - [x] 3.3 Create components/animations/StaggeredCards.tsx
    - Accept children, baseDelay, staggerDelay, animation props
    - Calculate delay for each child element
    - Use Framer Motion's stagger feature
    - Support animation variants: fade, slide-up, scale
    - Use Intersection Observer for trigger
    - Respect prefers-reduced-motion
    - _Requirements: 1.5, 1.6, 1.13, 3.8, 14.1_
  
  - [x] 3.4 Create components/animations/ImageZoom.tsx
    - Accept scale, duration, overlay, overlayColor props
    - Apply overflow hidden to container
    - Use CSS transform for zoom effect on hover
    - Optional color overlay on hover
    - Smooth transition with configurable duration
    - Default scale: 1.1x, default duration: 400ms
    - _Requirements: 1.7, 1.8, 3.4, 3.5, 11.1, 11.2_
  
  - [x] 3.5 Create components/animations/TextReveal.tsx
    - Accept children, delay, stagger, animation props
    - Split text into words or characters
    - Animate each unit with stagger delay
    - Use Framer Motion for smooth animation
    - Support animation variants: slide-up, fade, scale
    - Respect prefers-reduced-motion
    - _Requirements: 1.9, 1.10, 1.13, 8.4, 9.3, 14.1_
  
  - [x] 3.6 Create components/animations/GradientBackground.tsx
    - Accept colors array, animationDuration, direction props
    - Create CSS gradient with multiple colors
    - Animate gradient position with keyframes
    - Support directions: horizontal, vertical, diagonal
    - Default duration: 10000ms
    - Respect prefers-reduced-motion
    - _Requirements: 1.11, 1.12, 1.13, 8.2, 8.3, 14.1_

### Phase 2: New Section Components - Part 1

- [x] 4. Create Statistics Section
  - [x] 4.1 Add statistics data to lib/constants.ts
    - Define STATISTICS array with id, value, suffix, label, icon, animationDuration
    - Include: 15+ Years Experience, 2000+ Events Completed, 200+ Happy Clients
    - Use TypeScript interface for type safety
    - _Requirements: 2.1, 17.1_
  
  - [x] 4.2 Create components/ui/StatCard.tsx
    - Accept statistic data props
    - Use CounterAnimation component for value
    - Display icon above counter
    - Display label below counter
    - Style with dark theme and purple accents
    - Responsive typography
    - _Requirements: 2.2, 2.6_
  
  - [x] 4.3 Create components/sections/StatisticsSection.tsx
    - Import statistics data from constants
    - Use responsive grid: 1 column (mobile), 3 columns (desktop)
    - Map through statistics and render StatCard for each
    - Include section heading "Our Impact"
    - Add subtle gradient background overlay
    - Trigger animations when 30% visible
    - _Requirements: 2.1, 2.7, 2.10, 15.2_

- [x] 5. Create Event Categories Section
  - [x] 5.1 Add event categories data to lib/constants.ts
    - Define EVENT_CATEGORIES array with id, title, description, imageUrl, eventCount, tags
    - Include: Concerts, Exhibitions, Conferences, Weddings, Festivals
    - Mark one category as featured
    - Use TypeScript interface for type safety
    - _Requirements: 3.1, 17.2_
  
  - [x] 5.2 Create components/ui/CategoryCard.tsx
    - Accept category data and size props (large/small)
    - Use ImageZoom component for hover effect
    - Display image with gradient overlay
    - Show event count on hover
    - Display category tags as pills
    - Animate tags with spring effect
    - Support large (2x) and small sizes
    - _Requirements: 3.3, 3.4, 3.5, 3.7_
  
  - [x] 5.3 Create components/sections/EventCategoriesSection.tsx
    - Import categories data from constants
    - Use asymmetric grid layout
    - Featured card spans 2x2 on desktop
    - Use StaggeredCards with 80ms stagger
    - Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop)
    - Featured card spans 2 rows on tablet/desktop
    - _Requirements: 3.1, 3.2, 3.8, 3.9, 3.10, 15.3_

- [x] 6. Create Detailed Expertise Section
  - [x] 6.1 Add expertise data to lib/constants.ts
    - Define EXPERTISE_ITEMS array with id, title, description, icon, features, imageUrl
    - Include: Audio Systems, Lighting Design, LED Screens, Stage Construction, Truss & Rigging, AV Contractor
    - Use TypeScript interface for type safety
    - _Requirements: 4.1, 17.3_
  
  - [x] 6.2 Create components/sections/ExpertiseSection.tsx
    - Import expertise data from constants
    - Use split-screen layout alternating sides
    - Animate icon with 360° rotation and scale 0 to 1
    - Animate feature list with slide-in and 60ms stagger
    - Add subtle parallax to background pattern
    - Add pulse animation to CTA button on hover
    - Stack vertically on mobile
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 15.4_

### Phase 3: New Section Components - Part 2

- [x] 7. Create Team/Founder Section
  - [x] 7.1 Add team members data to lib/constants.ts
    - Define TEAM_MEMBERS array with id, name, role, bio, imageUrl, socialLinks
    - Include founder and 4-5 key team members
    - Use TypeScript interface for type safety
    - _Requirements: 5.1, 17.4_
  
  - [x] 7.2 Create components/ui/TeamMemberCard.tsx
    - Implement 3D flip card with front and back
    - Front: circular photo, name, role
    - Back: bio, social links
    - Flip on hover with 3D transform (600ms)
    - Scale social icons on hover
    - Keyboard accessible (flip on Enter/Space)
    - Announce flip state to screen readers
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.7, 10.9_
  
  - [x] 7.3 Create components/sections/TeamSection.tsx
    - Import team data from constants
    - Use gradient background (purple to blue)
    - Use StaggeredCards with 120ms delay
    - Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)
    - Include section heading "Meet Our Team"
    - _Requirements: 5.1, 5.6, 5.8, 5.9, 15.5_

- [x] 8. Create Testimonials Section
  - [x] 8.1 Add testimonials data to lib/constants.ts
    - Define TESTIMONIALS array with id, clientName, clientRole, clientCompany, quote, rating, eventType, imageUrl
    - Include at least 5 testimonials
    - Use TypeScript interface for type safety
    - _Requirements: 6.1, 17.5_
  
  - [x] 8.2 Create components/ui/TestimonialCard.tsx
    - Display large quote marks with scale bounce animation
    - Display quote text
    - Display star rating with fill animation
    - Display client photo (circular), name, role, company
    - Display event type badge
    - Style with dark theme
    - _Requirements: 6.5, 6.6, 6.7_
  
  - [x] 8.3 Create components/sections/TestimonialsSection.tsx
    - Use embla-carousel-react for carousel
    - Auto-rotate every 6 seconds
    - Pause on hover and focus
    - Slide transition: fade + horizontal slide (500ms)
    - Include previous/next navigation buttons
    - Keyboard accessible (arrow keys)
    - Announce slide changes to screen readers
    - _Requirements: 6.2, 6.3, 6.4, 6.8, 6.9, 6.10, 6.11, 6.12, 14.4, 14.12_

- [-] 9. Create Event Gallery Section
  - [x] 9.1 Add gallery items data to lib/constants.ts
    - Define GALLERY_ITEMS array with id, title, date, category, imageUrl, description
    - Include 20-30 event photos
    - Use TypeScript interface for type safety
    - _Requirements: 7.1, 17.6_
  
  - [x] 9.2 Create components/sections/EventGallerySection.tsx
    - Use react-masonry-css for masonry layout
    - Include filter buttons for categories
    - Filter transition: fade and scale (400ms)
    - Hover: brightness increase + overlay slide up
    - Staggered fade and scale in animation
    - Timeline markers with pulse animation
    - Responsive: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)
    - Lazy load images
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6, 7.8, 7.9, 7.10, 7.11, 15.7_
  
  - [x] 9.3 Create lightbox modal for gallery
    - Display full-size image in modal
    - Include close button and navigation
    - Trap focus within modal
    - Close on Escape key
    - Prevent body scroll when open
    - _Requirements: 7.12, 14.5_

- [x] 10. Create Newsletter CTA Section
  - [x] 10.1 Create components/ui/NewsletterForm.tsx
    - Email input field with validation
    - Subscribe button with ripple effect
    - Validate email format (Zod schema)
    - Display error messages for invalid input
    - Show loading state during submission
    - Show success message with checkmark animation
    - Reset form after successful submission
    - Include privacy notice
    - Keyboard accessible
    - _Requirements: 8.1, 8.6, 8.7, 8.8, 8.9, 18.1-18.12_
  
  - [x] 10.2 Create components/sections/NewsletterSection.tsx
    - Use GradientBackground component
    - Gradient colors: purple, blue, gold
    - Animation duration: 10000ms
    - Use TextReveal for heading
    - Form slides up with bounce effect
    - Include decorative elements (lines, shapes)
    - Full-width section
    - Maintain WCAG AA contrast on gradient
    - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.10, 8.11, 8.12, 15.8_

### Phase 4: Enhance Existing Sections with Dark Theme

- [-] 11. Enhance Hero Section with dark theme and modern animations
  - [x] 11.1 Update HeroSection.tsx with dark theme foundation
    - Set background to deep dark (#050505) as primary base color
    - Add high-quality event image overlay (40% opacity) using Next.js Image component with priority loading
    - Wrap background in ParallaxSection component with speed 0.5 for subtle depth effect
    - Add animated gradient overlay using GradientBackground component (purple #8B5CF6 → blue #3B82F6 → gold #F59E0B, 15s loop, 20% opacity)
    - Update content to use official Quein tagline from QUEIN_BRAND.hero.headline: "Where Every Occasion Finds Its Grandeur"
    - Disable parallax on mobile (viewport width < 768px) for performance optimization
    - Ensure dark overlay maintains WCAG AA text contrast (4.5:1 minimum) for white text
    - Add subtle texture or pattern overlay in dark gray for visual depth
    - _Requirements: 9.1, 9.2, 9.8_
  
  - [x] 11.2 Add text reveal animation to hero heading with dark theme typography
    - Wrap main tagline in TextReveal component with word-by-word animation
    - Configure animation: 50ms stagger between words, 300ms initial delay, slide-up effect
    - Typography: text-7xl (72px desktop), text-5xl (48px mobile), white (#FFFFFF) with subtle text-shadow for depth
    - Add subheading with gold accent (#F59E0B) using QUEIN_BRAND.hero.subheading: "Quein Conference & Event Organization WLL"
    - Add description text in light gray (#A0A0A0) using QUEIN_BRAND.hero.description: "Crafting unforgettable experiences across Qatar"
    - Ensure text remains readable on all background states with proper contrast
    - Add letter-spacing to subheading for luxury feel
    - _Requirements: 9.3_
  
  - [x] 11.3 Add floating decorative elements with vibrant purple/blue/gold accents
    - Create 3 floating decorative SVG elements: circle (purple), line (blue), shape (gold)
    - Apply vibrant glow effects using CSS box-shadow: purple-glow (rgba(139, 92, 246, 0.5)), blue-glow (rgba(59, 130, 246, 0.5)), gold-glow (rgba(245, 158, 11, 0.5))
    - Implement vertical float animation with Framer Motion using translateY for GPU acceleration
    - Different animation speeds: 2s (circle), 3s (line), 2.5s (shape) with infinite loop
    - Position absolutely with z-index layering (behind text, above background)
    - Add blur effect to decorative elements for depth perception
    - Disable animations when prefers-reduced-motion is enabled (show static elements)
    - _Requirements: 9.4, 9.5_
  
  - [x] 11.4 Add CTA buttons with dark theme styling and vibrant accents
    - Primary button: Purple gradient background (linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)) with purple glow effect on hover
    - Secondary button: Gold outlined (border-2 border-gold #F59E0B) with hover fill transition to gold background
    - Use QUEIN_BRAND.hero.ctaPrimary ("Plan Your Event") and ctaSecondary ("View Our Portfolio") for button text
    - Implement staggered entrance animation using StaggeredCards (1200ms base delay, 150ms stagger)
    - Add ripple effect on click for primary button using Framer Motion
    - Ensure buttons have 48x48px minimum touch target on mobile for accessibility
    - Add visible focus indicators with 3:1 contrast (purple ring for primary, gold ring for secondary)
    - Add smooth hover transitions (300ms) with scale effect (1.05x)
    - _Requirements: 9.9_
  
  - [x] 11.5 Add optional video background support with dark theme overlay
    - Create VideoBackground component with HTML5 video element
    - Support video props: autoplay, loop, muted, playsInline for mobile compatibility
    - Implement image fallback for browsers without video support or slow connections
    - Add dark overlay (50% opacity, #000000) over video to ensure text readability
    - Ensure video doesn't block page load (lazy load, load after critical content)
    - Provide proper alt text for fallback image describing the event scene
    - Pause video when not in viewport for performance and battery savings
    - Add video controls for accessibility (hidden by default, accessible via keyboard)
    - _Requirements: 9.6, 9.7, 9.9_

- [ ] 12. Enhance Services Section with dark theme and 3D flip cards
  - [x] 12.1 Update ServicesSection.tsx with dark theme foundation
    - Set background to deep dark (#0A0A0A) as primary section background
    - Add subtle animated pattern (dots/lines SVG in dark gray #2A2A2A, 10% opacity) for visual texture
    - Wrap pattern in ParallaxSection with speed 0.2 for subtle depth movement on scroll
    - Update section heading with white text (#FFFFFF) and proper WCAG AA contrast (4.5:1)
    - Add section subheading in light gray (#A0A0A0): "Comprehensive event solutions across all categories"
    - Ensure responsive spacing on all breakpoints (mobile: py-12, tablet: py-16, desktop: py-24)
    - Add subtle border-top with gradient (purple to blue) for section separation
    - _Requirements: 10.6_
  
  - [x] 12.2 Implement 3D flip card component for services with dark theme
    - Create FlipCard component with dark card background (#1A1A1A) and subtle border (#2A2A2A)
    - Front side: vibrant icon (purple/blue/gold with glow), title (white, 24px), description (gray, 16px), capacity badge (gold accent)
    - Back side: dark background (#1A1A1A) with gradient accent border, feature list with checkmark icons, CTA button with gradient
    - Implement 3D flip on hover: rotateY(180deg), 600ms duration, preserve-3d transform style
    - Add vibrant glow shadow on hover: purple (rgba(139, 92, 246, 0.5)) or blue (rgba(59, 130, 246, 0.5)) based on service
    - Make keyboard accessible: flip on Enter/Space keypress with focus-visible indicator
    - Add aria-label="Flip card to see more details" describing flip interaction
    - Announce flip state to screen readers with aria-live="polite" region
    - Use official Quein service content from QUEIN_BRAND.services (privateEvents, exhibitions, conferences, marriageEvents)
    - _Requirements: 10.1, 10.2, 10.3, 10.7, 10.9_
  
  - [x] 12.3 Update service cards with official Quein content and vibrant accents
    - Private Events: Use QUEIN_BRAND.services.privateEvents with purple accent (#8B5CF6) and purple glow
      - Title: "Private Events", Description: "Intimate celebrations crafted with elegance and precision"
      - Capacity: "10-500+ guests", Features: 5 items from official content, CTA: "Plan Your Private Event"
    - Exhibitions: Use QUEIN_BRAND.services.exhibitions with blue accent (#3B82F6) and blue glow
      - Title: "Exhibitions", Description: "Trade shows and exhibitions that captivate and engage"
      - Capacity: "100-10,000+ attendees", Features: 5 items from official content, CTA: "Explore Exhibition Services"
    - Conferences: Use QUEIN_BRAND.services.conferences with gold accent (#F59E0B) and gold glow
      - Title: "Conferences", Description: "Professional conferences with seamless execution"
      - Capacity: "50-5,000+ attendees", Features: 5 items from official content, CTA: "Organize Your Conference"
    - Marriage Events: Use QUEIN_BRAND.services.marriageEvents with purple accent (#8B5CF6) and purple glow
      - Title: "Marriage Events", Description: "Weddings where every moment becomes a cherished memory"
      - Capacity: "50-1,000+ guests", Features: 5 items from official content, CTA: "Plan Your Dream Wedding"
    - Add capacity badges with pulse animation (gold accent, scale 1.0 to 1.05, 2s loop)
    - Display feature lists from official content with vibrant checkmark icons (matching service accent color)
    - Add CTA buttons on card back with service-specific text and gradient backgrounds
    - _Requirements: 10.2, 10.3, 10.5_
  
  - [x] 12.4 Add icon animation to service cards with vibrant colors
    - Animate icon on card entrance: 360° rotation (rotateZ) + scale 0 to 1 simultaneously
    - Duration: 800ms, initial delay: 200ms after card enters viewport
    - Use easing: cubic-bezier(0.68, -0.55, 0.265, 1.55) for bounce effect on scale
    - Apply vibrant colors based on service category: purple (#8B5CF6), blue (#3B82F6), gold (#F59E0B)
    - Add subtle glow effect to icons using drop-shadow filter with matching accent color
    - Trigger animation when card enters viewport using Intersection Observer (threshold: 0.3)
    - Icons: champagne-glasses (Private Events), exhibition-booth (Exhibitions), podium (Conferences), wedding-rings (Marriage Events)
    - _Requirements: 10.4_
  
  - [x] 12.5 Simplify flip animation on mobile for better UX
    - Disable 3D flip on mobile devices (viewport width < 768px) to prevent touch issues
    - Show both card sides stacked vertically on mobile with clear visual separation
    - Add "Show More" button (gold accent) to reveal back content on mobile with smooth expand animation
    - Maintain touch-friendly targets (48x48px minimum) for all interactive elements
    - Ensure smooth scroll to expanded content when "Show More" is clicked
    - Test on various mobile devices (iOS Safari, Chrome Android) for consistent behavior
    - Add collapse functionality with "Show Less" button after expansion
    - _Requirements: 15.10, 15.11_

- [ ] 13. Enhance Portfolio Section with dark theme and advanced hover effects
  - [x] 13.1 Update PortfolioSection.tsx with dark theme foundation
    - Set background to dark gradient (linear-gradient from #050505 to #0A0A0A, top to bottom)
    - Update section heading with white text (#FFFFFF, 48px desktop, 32px mobile) and proper hierarchy
    - Add section subheading in light gray (#A0A0A0, 20px): "Showcasing our finest events across Qatar"
    - Ensure portfolio cards have dark backgrounds (#1A1A1A) with subtle border (#2A2A2A)
    - Add subtle box-shadow to cards for depth perception on dark background
    - Maintain responsive grid layout: 1 col (mobile), 2 col (tablet), 3 col (desktop) with 24px gap
    - Add section padding: py-12 (mobile), py-16 (tablet), py-24 (desktop)
    - _Requirements: 11.1_
  
  - [x] 13.2 Add image zoom and vibrant overlay to portfolio items
    - Wrap portfolio images in ImageZoom component with overflow hidden container
    - Configure scale: 1.15x on hover, duration: 500ms with smooth easing
    - Add vibrant purple color overlay on hover (rgba(139, 92, 246, 0.3)) with fade-in transition
    - Increase image brightness on hover using CSS filter: brightness(1.1) for visual pop
    - Add card glow effect on hover with purple shadow (box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4))
    - Implement smooth transition for all hover effects (300-500ms) with ease-in-out
    - Ensure overlay doesn't block click events (pointer-events: none on overlay, auto on card)
    - Add event details overlay that slides up from bottom on hover (title, date, category)
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [x] 13.3 Add category filter with dark theme styling and vibrant accents
    - Create filter button group with dark backgrounds (#1A1A1A) and horizontal scroll on mobile
    - Active filter: Purple gradient background (linear-gradient(135deg, #8B5CF6, #6D28D9)) with purple glow effect
    - Inactive filters: Dark background (#1A1A1A) with vibrant borders (purple/blue/gold based on category) and hover glow
    - Implement filter transition: fade and scale (400ms) using AnimatePresence from Framer Motion
    - Update portfolio items based on active filter with staggered fade-in animation (80ms stagger)
    - Add keyboard navigation support (arrow keys for filter selection, Enter to activate)
    - Add visible focus indicators with 3:1 contrast (purple ring for focused filter)
    - Announce filter state changes to screen readers using aria-live="polite" region
    - Add "All" filter option to show all items (default active state)
    - Filter categories: All, Private Events, Exhibitions, Conferences, Marriage Events, Festivals
    - _Requirements: 11.4, 11.5, 11.10_
  
  - [x] 13.4 Add "Load More" functionality with dark theme and loading states
    - Implement pagination with "Load More" button at bottom of portfolio grid
    - Button styling: Gold gradient (linear-gradient(135deg, #F59E0B, #D97706)) with gold glow on hover
    - Show skeleton loading animation while loading: dark cards (#1A1A1A) with shimmer effect (gradient animation)
    - Load 6-9 items per page (6 on mobile, 9 on desktop) for optimal performance
    - Hide button when all items are loaded, show "All events displayed" message in gray
    - Add loading state to button: spinner icon (gold color) with "Loading..." text
    - Smooth scroll to newly loaded items after load completes (scroll to first new item)
    - Add fade-in animation for newly loaded items with stagger effect
    - _Requirements: 11.6, 11.7_
  
  - [x] 13.5 Add lightbox modal with dark theme for full-size viewing
    - Reuse lightbox modal component from gallery section with dark theme styling
    - Dark modal background (rgba(0, 0, 0, 0.95)) with backdrop blur for depth
    - Display full-size portfolio images with Next.js Image component (priority loading)
    - Add navigation buttons with purple/blue accents and glow effects on hover
    - Add close button with gold accent (top-right corner, 48x48px touch target)
    - Implement keyboard navigation (left/right arrow keys for navigation, Escape to close)
    - Trap focus within modal when open (cycle through close button, nav buttons, image)
    - Prevent body scroll when modal is open using CSS overflow: hidden
    - Add smooth fade transition for modal open/close (300ms) with scale effect
    - Display event details below image: title, date, category, description (white text on dark background)
    - _Requirements: 11.8_

### Phase 5: Image Assets and Dark Theme Content

- [x] 14. Prepare and optimize image assets with dark theme aesthetic
  - [x] 14.1 Create statistics section icons with vibrant colors and glow effects
    - Create calendar-icon.svg (48x48px) with purple accent (#8B5CF6) and purple glow using SVG filters
    - Create check-circle-icon.svg (48x48px) with blue accent (#3B82F6) and blue glow using SVG filters
    - Create users-icon.svg (48x48px) with gold accent (#F59E0B) and gold glow using SVG filters
    - Add glow effects using SVG <filter> elements with feGaussianBlur and feColorMatrix for vibrant appearance on dark backgrounds
    - Optimize SVGs (remove unnecessary metadata, compress paths, minify) using SVGO
    - Ensure icons are accessible with proper title and desc elements
    - Save to public/icons/ directory with descriptive filenames
    - _Requirements: 13.1_
  
  - [x] 14.2 Prepare event category images optimized for dark theme
    - Source or create high-quality images with dramatic lighting suitable for dark backgrounds:
      - private-events-featured.jpg (1200x800px) - Luxury private event with dramatic lighting and elegant décor
      - exhibitions-featured.jpg (800x600px) - Modern exhibition booth with LED displays and vibrant lighting
      - conferences-featured.jpg (800x600px) - Conference hall with stage, professional lighting, and audience
      - marriage-events-featured.jpg (800x600px) - Elegant wedding venue with floral arrangements and ambient lighting
      - festivals-featured.jpg (800x600px) - Outdoor festival with stage, crowd, and colorful lighting
    - Convert all images to WebP format with JPEG fallback for browser compatibility
    - Compress to <200KB each using image optimization tools (ImageOptim, Squoosh) while maintaining quality
    - Add dark gradient overlays in CSS (bottom: rgba(0,0,0,0.8), top: transparent) for text readability
    - Ensure images have good contrast and visual appeal on dark backgrounds (#0A0A0A, #1A1A1A)
    - Save to public/images/categories/ directory with descriptive filenames
    - Test images on dark backgrounds for visual quality and text overlay readability
    - _Requirements: 13.2, 13.8, 13.9_
  
  - [x] 14.3 Prepare expertise section images with dark aesthetic and dramatic lighting
    - Source or create service images with professional quality and dark venue aesthetics:
      - audio-systems.jpg (800x600px) - Professional audio equipment in dark venue with dramatic lighting
      - lighting-design.jpg (800x600px) - Dramatic stage lighting setup with vibrant colors (purple/blue/gold)
      - led-screens.jpg (800x600px) - High-resolution LED displays at event with vibrant content
      - stage-construction.jpg (800x600px) - Custom stage build with professional lighting and truss
      - truss-rigging.jpg (800x600px) - Professional rigging system with dramatic lighting
      - av-contractor.jpg (800x600px) - Complete AV setup at event with multiple screens and lighting
    - Convert to WebP with JPEG fallback for cross-browser support
    - Compress to <200KB each while maintaining professional quality
    - Ensure images have good contrast and work well with dark backgrounds and vibrant accent overlays
    - Add subtle vignette effect in post-processing for focus on center content
    - Save to public/images/expertise/ directory with descriptive filenames
    - _Requirements: 13.3, 13.8, 13.9_
  
  - [x] 14.4 Prepare team member photos optimized for dark theme
    - Source or create 5 team member photos (400x400px, circular crop) with professional quality
    - Ensure professional headshots with good lighting suitable for dark backgrounds (avoid harsh shadows)
    - Convert to WebP with JPEG fallback for optimal loading performance
    - Compress to <100KB each while maintaining facial detail and quality
    - Add subtle border glow effect in CSS using box-shadow (purple/blue/gold based on role)
    - Ensure photos have consistent lighting and color temperature for cohesive appearance
    - Save to public/images/team/ directory with descriptive filenames (e.g., founder-name.jpg, event-director-name.jpg)
    - Include descriptive filenames for accessibility and SEO
    - _Requirements: 13.4, 13.8, 13.9_
  
  - [x] 14.5 Prepare testimonial client photos for dark theme
    - Source or create 5 client photos (100x100px, circular crop) with professional quality
    - Professional headshots optimized for dark backgrounds with good contrast
    - Convert to WebP with JPEG fallback for fast loading
    - Compress to <50KB each while maintaining clarity
    - Ensure consistent lighting and color grading across all photos
    - Save to public/images/testimonials/ directory with descriptive filenames
    - Use placeholder images (professional avatars) if real client photos unavailable
    - Add subtle border in CSS for visual separation on dark backgrounds
    - _Requirements: 13.5, 13.8, 13.9_
  
  - [x] 14.6 Prepare gallery images showcasing Quein events with dark theme aesthetic
    - Source or create 20-30 event photos with varying aspect ratios for masonry layout:
      - Sizes: 600x400px (landscape), 600x800px (portrait), 800x600px (wide)
      - Include diverse event types: private events, exhibitions, conferences, weddings, festivals
      - Ensure dramatic lighting and vibrant colors (purple/blue/gold accents) suitable for dark theme
    - Convert to WebP with JPEG fallback for optimal performance
    - Compress to <200KB each using modern compression algorithms
    - Ensure images have good contrast and visual appeal on dark theme backgrounds
    - Add metadata for filtering: category, date, title, description
    - Save to public/images/gallery/ directory with descriptive filenames
    - Organize by category subdirectories if needed (private-events/, exhibitions/, etc.)
    - Test images in masonry layout for visual balance and loading performance
    - _Requirements: 13.6, 13.8, 13.9_
  
  - [x] 14.7 Create decorative SVG elements with vibrant purple/blue/gold accents
    - Create gradient-pattern.svg - Dots/lines pattern in dark gray (#2A2A2A) for subtle background texture
    - Create decorative-lines.svg - Floating lines with purple/blue/gold gradients and glow effects
    - Create floating-shapes.svg - Circles and geometric shapes with vibrant glow effects
    - Optimize all SVGs for performance (remove metadata, compress paths, minify) using SVGO
    - Ensure SVGs work well on dark backgrounds (#0A0A0A, #050505) with proper contrast
    - Add animation-friendly structure (separate layers for independent animation)
    - Save to public/icons/decorative/ directory with descriptive filenames
    - Test SVGs at various sizes and on different dark backgrounds
    - _Requirements: 13.7_
  
  - [x] 14.8 Add descriptive alt text to all images for accessibility
    - Write descriptive alt text for all images in constants file (lib/constants.ts)
    - Include alt text in QUEIN_BRAND data structures for consistency
    - Ensure alt text describes content meaningfully for screen reader users
    - Follow best practices: describe what's in the image, not "image of" or "picture of"
    - Keep alt text concise but informative (under 125 characters for optimal screen reader experience)
    - For decorative images, use empty alt text (alt="") to avoid clutter
    - Include context-specific details (event type, setting, key elements)
    - _Requirements: 13.10, 14.9_
  
  - [x] 14.9 Generate responsive image versions and configure Next.js for dark theme
    - Create 2x and 3x versions for retina displays using image optimization tools (Sharp, ImageMagick)
    - Configure Next.js Image component sizes in next.config.js for responsive loading
    - Set up proper image domains in next.config.js if using external images (CDN, external sources)
    - Define device sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840] for responsive breakpoints
    - Define image sizes: mobile (100vw), tablet (50vw), desktop (33vw) for optimal loading
    - Test responsive images on various devices and screen densities (1x, 2x, 3x)
    - Verify lazy loading works correctly (images load as they enter viewport)
    - Test image quality on dark backgrounds at different screen sizes
    - _Requirements: 13.11, 13.12_

### Phase 6: Integration and Dark Theme Page Updates

- [x] 15. Update main page with dark theme and new sections
  - [x] 15.1 Update app/page.tsx with dark theme foundation and section integration
    - Set global background to deep dark (#0A0A0A) in page wrapper
    - Import all new section components (Statistics, EventCategories, Expertise, Team, Testimonials, EventGallery, Newsletter)
    - Add sections in correct order:
      1. Navigation (existing - update with dark theme)
      2. Hero (enhanced with dark theme, parallax, animated gradient)
      3. Statistics (new - dark cards, animated counters)
      4. Services (enhanced with dark theme, 3D flip cards)
      5. Event Categories (new - asymmetric dark cards, image zoom)
      6. Expertise (new - split-screen dark layout)
      7. Portfolio (enhanced with dark theme, hover effects)
      8. Team (new - dark gradient background, 3D flip cards)
      9. About (existing - update with dark theme, Quein story)
      10. Testimonials (new - dark carousel)
      11. Gallery (new - dark masonry layout)
      12. Contact (existing - update with dark theme)
      13. Newsletter (new - animated gradient background)
      14. Footer (existing - update with dark theme)
    - Maintain semantic HTML structure (header, main, sections, footer)
    - Ensure smooth scroll between sections with scroll-behavior: smooth
    - Add section IDs for navigation anchors
    - _Requirements: 15.1-15.8_
  
  - [x] 15.2 Update app/globals.css with dark theme variables and utilities
    - Define CSS custom properties for dark theme colors:
      - --bg-primary: #0A0A0A (main dark background)
      - --bg-secondary: #050505 (darker sections)
      - --bg-card: #1A1A1A (card backgrounds)
      - --bg-elevated: #252525 (elevated elements)
      - --accent-purple: #8B5CF6 (primary accent)
      - --accent-blue: #3B82F6 (secondary accent)
      - --accent-gold: #F59E0B (tertiary accent)
      - --text-primary: #FFFFFF (main text)
      - --text-secondary: #A0A0A0 (secondary text)
      - --text-tertiary: #6B7280 (muted text)
      - --border-default: #2A2A2A (default borders)
    - Add glow effect utility classes:
      - .purple-glow: box-shadow with rgba(139, 92, 246, 0.5)
      - .blue-glow: box-shadow with rgba(59, 130, 246, 0.5)
      - .gold-glow: box-shadow with rgba(245, 158, 11, 0.5)
    - Add gradient utility classes:
      - .gradient-purple: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)
      - .gradient-blue: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)
      - .gradient-gold: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
      - .gradient-purple-blue: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)
    - Ensure all text maintains WCAG AA contrast (4.5:1) on dark backgrounds
    - Add smooth transition utilities for hover effects
    - _Requirements: 15.1-15.8_
  
  - [x] 15.3 Update navigation with dark theme styling and vibrant accents
    - Set navigation background to dark (#0A0A0A) with 80% opacity and backdrop-blur-md for glassmorphism
    - Style navigation text in white (#FFFFFF) with vibrant purple accent (#8B5CF6) on hover
    - Active link: Purple gradient underline (2px height) with glow effect (box-shadow)
    - Mobile menu: Dark background (#050505) with slide-in animation from right (300ms)
    - Add smooth scroll behavior to navigation links (scroll-behavior: smooth)
    - Update NAV_LINKS in lib/constants.ts to include new sections:
      - Home, Statistics, Services, Event Categories, Expertise, Portfolio, Team, About, Testimonials, Gallery, Contact, Newsletter
    - Ensure navigation is sticky on scroll with smooth transition (position: sticky, top: 0, z-index: 50)
    - Add visible focus indicators for keyboard navigation (3:1 contrast, purple ring)
    - Add hamburger menu icon with vibrant purple/blue/gold animation on mobile
    - _Requirements: 15.1-15.8_
  
  - [x] 15.4 Update About section with official Quein content and dark theme
    - Use QUEIN_BRAND.about.story for company background paragraph (white text, 18px, line-height 1.8)
    - Display vision and mission in dark cards (#1A1A1A) with vibrant purple/blue gradient borders
    - Show values as icon cards with vibrant purple/blue/gold accents and glow effects on hover
    - Display differentiators with animated icons (rotate + scale on entrance) and dark card backgrounds
    - Add section heading in white (48px desktop, 32px mobile) with proper hierarchy (h2)
    - Maintain dark theme aesthetic throughout with proper spacing (py-24 desktop, py-16 mobile)
    - Ensure all text has 4.5:1 contrast on dark backgrounds for WCAG AA compliance
    - Add subtle animations on scroll (fade-in, slide-up) using Intersection Observer
    - Add decorative elements (lines, shapes) with vibrant accents for visual interest
    - _Requirements: 15.1-15.8_
  
  - [x] 15.5 Update Contact section with dark theme and vibrant focus states
    - Set form background to dark card (#1A1A1A) with subtle border (#2A2A2A)
    - Style input fields: Dark background (#252525) with white text (#FFFFFF) and proper padding
    - Add vibrant purple focus glow to input fields (box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5))
    - Submit button: Purple gradient (linear-gradient(135deg, #8B5CF6, #6D28D9)) with glow effect on hover
    - Contact info cards: Dark backgrounds (#1A1A1A) with vibrant icons (purple/blue/gold) and glow effects
    - Add map section with dark theme styling if applicable (dark mode map tiles)
    - Maintain WCAG AA contrast (4.5:1) for all text on dark backgrounds
    - Add visible focus indicators for form fields (3:1 contrast, purple ring)
    - Display validation errors in red (#EF4444) with sufficient contrast (4.5:1)
    - Add smooth transitions for all interactive elements (300ms ease-in-out)
    - _Requirements: 15.1-15.8_
  
  - [x] 15.6 Update Footer with dark theme and vibrant social icons
    - Set footer background to deep dark (#050505) for visual separation from main content
    - Style main text in white (#FFFFFF), secondary text in gray (#A0A0A0) for hierarchy
    - Social icons with vibrant purple/blue/gold accents and glow effect on hover
    - Links with purple hover state (#8B5CF6) and smooth transition (300ms)
    - Copyright text in gray (#6B7280) with smaller font size (14px)
    - Add footer sections: About (company description), Services (links), Quick Links (navigation), Contact Info (email, phone, address)
    - Ensure responsive layout: stack vertically on mobile (1 col), multi-column on desktop (4 col)
    - Add subtle top border with gradient (linear-gradient(90deg, #8B5CF6, #3B82F6)) for visual separation
    - Add newsletter signup form in footer with dark input and purple button
    - Ensure all links have visible focus indicators (3:1 contrast, purple ring)
    - _Requirements: 15.1-15.8_

### Phase 7: Performance Optimization for Dark Theme

- [ ] 16. Implement performance optimizations for animations and dark theme
  - [x] 16.1 Optimize animation performance
    - Use CSS transforms (translateX, translateY, scale, rotate) exclusively for all animations
    - Add will-change property sparingly for complex animations only (flip cards, parallax)
    - Remove will-change after animation completes using JavaScript
    - Throttle scroll listeners to 16ms (60fps) using requestAnimationFrame
    - Use Intersection Observer for scroll-triggered animations instead of scroll listeners
    - Ensure animations maintain 30fps minimum on lower-end devices (target 60fps)
    - Test animation performance on various devices using Chrome DevTools Performance tab
    - Profile animations and identify bottlenecks
    - Optimize heavy animations (3D flips, parallax) for mobile
    - _Requirements: 12.3, 12.4, 12.5, 12.14_
  
  - [ ] 16.2 Implement image lazy loading and optimization
    - Configure Next.js Image component for lazy loading on all images
    - Add priority prop only to hero background image (above-the-fold)
    - Implement progressive loading with blur placeholder compatible with dark theme
    - Use WebP format with JPEG fallback for all images
    - Optimize image sizes for each breakpoint (mobile, tablet, desktop)
    - Lazy load all images except hero and first section
    - Test lazy loading behavior on slow network connections
    - Verify images load smoothly without layout shift
    - _Requirements: 12.6, 12.7, 12.8_
  
  - [x] 16.3 Implement code splitting for animations
    - Use dynamic imports (next/dynamic) for heavy animation components
    - Split animation library into separate chunks by component
    - Lazy load below-the-fold sections: Team, Testimonials, Gallery, Newsletter
    - Preload critical components: Hero, Statistics, Services
    - Monitor bundle size using Next.js build analyzer
    - Optimize bundle by removing unused dependencies
    - Test code splitting with network throttling
    - _Requirements: 12.11, 12.12_
  
  - [ ] 16.4 Optimize dark theme for mobile devices
    - Disable parallax effects on mobile (viewport width < 768px)
    - Simplify 3D flip animations on mobile (show stacked cards instead)
    - Reduce animation complexity on mobile (shorter durations, simpler easing)
    - Optimize gradient animations for mobile performance (reduce color stops)
    - Ensure touch targets are 48x48px minimum for all interactive elements
    - Test on various mobile devices (iOS Safari, Chrome Android)
    - Profile mobile performance using Chrome DevTools mobile emulation
    - Optimize for low-end devices (reduce animation complexity)
    - _Requirements: 12.13, 15.9, 15.10_
  
  - [ ] 16.5 Run Lighthouse performance audit
    - Run Lighthouse audit on desktop and mobile
    - Achieve performance score >80 on both platforms
    - Achieve Largest Contentful Paint (LCP) <2.5s
    - Achieve Cumulative Layout Shift (CLS) <0.1
    - Achieve First Input Delay (FID) <100ms
    - Maintain animation frame rate ≥30fps (target 60fps)
    - Test on both desktop and mobile devices
    - Document performance metrics in PERFORMANCE_OPTIMIZATION.md
    - Address any performance warnings or issues
    - _Requirements: 12.1, 12.2, 12.9, 12.10_
  
  - [ ] 16.6 Optimize dark theme CSS
    - Minimize CSS bundle size by removing unused styles
    - Use CSS custom properties for dark theme colors (already defined)
    - Optimize gradient animations with GPU acceleration (transform: translateZ(0))
    - Remove unused CSS classes and consolidate duplicate styles
    - Ensure critical CSS is inlined for above-the-fold content
    - Use CSS containment (contain: layout style paint) for isolated components
    - Test CSS performance with Chrome DevTools Coverage tab
    - _Requirements: 12.1, 12.2_

### Phase 8: Accessibility and Testing

- [ ] 17. Implement accessibility enhancements
  - [ ] 17.1 Add ARIA attributes to animations
    - Add aria-live="polite" to counter animations for dynamic updates
    - Add ARIA labels to carousel controls (aria-label="Previous testimonial", "Next testimonial")
    - Add ARIA labels to filter buttons (aria-label="Filter by [category]")
    - Add aria-current="true" to active filter button
    - Add role="region" and aria-label to major sections
    - Add aria-hidden="true" to decorative elements
    - Test ARIA attributes with screen readers (NVDA, JAWS)
    - _Requirements: 14.3, 14.4, 14.6_
  
  - [ ] 17.2 Implement focus management
    - Add visible focus indicators to all interactive elements (3:1 contrast minimum)
    - Implement focus trap in modals (lightbox, mobile menu)
    - Add skip links for long sections ("Skip to main content", "Skip to navigation")
    - Ensure focus order follows logical reading order
    - Test keyboard navigation through all interactive elements
    - Add focus-visible styles for keyboard-only focus indicators
    - Ensure focus is restored when modals close
    - _Requirements: 14.7, 14.8, 14.11_
  
  - [ ] 17.3 Verify color contrast
    - Test text on gradient backgrounds for 4.5:1 contrast ratio
    - Test focus indicators for 3:1 contrast ratio
    - Test all interactive elements (buttons, links, form fields)
    - Use automated tools (axe DevTools, WAVE) to check contrast
    - Manually verify contrast on all dark theme elements
    - Adjust colors if contrast is insufficient
    - Document contrast ratios in ACCESSIBILITY_VERIFICATION.md
    - _Requirements: 14.9_
  
  - [ ] 17.4 Test with screen readers
    - Test with NVDA (Windows) on Chrome and Firefox
    - Test with JAWS (Windows) on Chrome
    - Test with VoiceOver (macOS) on Safari
    - Verify announcements for dynamic content (counters, carousel, filters)
    - Verify all images have descriptive alt text
    - Verify form labels and error messages are announced
    - Verify modal focus trap and announcements
    - Document screen reader testing results
    - _Requirements: 14.14_
  
  - [ ] 17.5 Verify reduced motion support
    - Test all animations with prefers-reduced-motion enabled
    - Ensure static alternatives work correctly
    - Verify no essential content is hidden when animations are disabled
    - Test on browsers with reduced motion preference
    - Add CSS media query @media (prefers-reduced-motion: reduce)
    - Disable or simplify animations when preference is set
    - Document reduced motion behavior
    - _Requirements: 14.1, 14.2, 14.13_

- [ ] 18. Write tests for animation components
  - [ ] 18.1 Write unit tests for animation hooks
    - Test useCounterAnimation: verify final value equals target value
    - Test useCounterAnimation: verify animation duration
    - Test useParallaxScroll: verify transform calculations are correct
    - Test useParallaxScroll: verify respects reduced motion
    - Test useIntersectionAnimation: verify triggers at correct threshold
    - Test useIntersectionAnimation: verify triggerOnce behavior
    - Use Jest and React Testing Library
    - Achieve >80% coverage for hooks
    - _Requirements: 16.1, 16.2, 16.3_
  
  - [ ] 18.2 Write component tests for animations
    - Test CounterAnimation component: verify counter animates to target
    - Test ParallaxSection component: verify transform applied
    - Test StaggeredCards component: verify stagger delays
    - Test ImageZoom component: verify scale on hover
    - Test TextReveal component: verify text reveals
    - Test GradientBackground component: verify gradient animation
    - Use Jest and React Testing Library
    - Mock Intersection Observer for tests
    - _Requirements: 16.1, 16.4, 16.5, 16.6_
  
  - [ ] 18.3 Write E2E tests for sections
    - Test statistics counter animation triggers on scroll
    - Test carousel auto-rotation and manual controls
    - Test gallery filter functionality and transitions
    - Test newsletter form submission and validation
    - Test lightbox modal open/close
    - Use Playwright or Cypress for E2E tests
    - Test on multiple browsers (Chrome, Firefox, Safari)
    - _Requirements: 16.7_
  
  - [ ] 18.4 Write performance tests
    - Test animation frame rate using Performance API
    - Test scroll performance with throttling
    - Test image loading performance
    - Test bundle size and code splitting
    - Use Lighthouse CI for automated performance testing
    - Set performance budgets and fail builds if exceeded
    - _Requirements: 16.8_
  
  - [ ] 18.5 Write visual regression tests
    - Screenshot each new section in default state
    - Screenshot hover states for interactive elements
    - Screenshot responsive layouts (mobile, tablet, desktop)
    - Use Percy or Chromatic for visual regression testing
    - Test dark theme consistency across sections
    - Test gradient animations at different stages
    - _Requirements: 16.9_
  
  - [ ] 18.6 Write accessibility tests
    - Test keyboard navigation through all sections
    - Test focus management in modals
    - Test ARIA attributes with automated tools
    - Use axe-core for automated accessibility testing
    - Test with jest-axe in component tests
    - Run Pa11y or Lighthouse accessibility audit
    - _Requirements: 16.10_
  
  - [ ] 18.7 Verify test coverage
    - Achieve >80% coverage for animation components
    - Achieve >70% coverage for section components
    - Generate coverage report with Jest
    - Identify untested code paths
    - Add tests for critical paths
    - Document test coverage in README
    - _Requirements: 16.11, 16.12_

### Phase 9: Documentation and Polish

- [ ] 19. Create documentation
  - [ ] 19.1 Document animation components
    - Add JSDoc comments to all animation components with descriptions
    - Add usage examples in JSDoc comments showing common patterns
    - Document props with TypeScript interfaces and descriptions
    - Add @param and @returns tags for all functions
    - Document animation timing and easing functions
    - Add examples of reduced motion handling
    - _Requirements: 20.1, 20.2, 20.3_
  
  - [ ] 19.2 Create animation library README
    - Write overview of animation library architecture
    - Add examples for each component with code snippets
    - Document best practices for performance
    - Add troubleshooting section for common issues
    - Document how to add new animation components
    - Include performance considerations
    - _Requirements: 20.4, 20.5_
  
  - [ ] 19.3 Document new sections
    - Add component-level documentation for each section
    - Document data structures in lib/constants.ts with comments
    - Add usage examples for section components
    - Document props and configuration options
    - Add screenshots or diagrams of section layouts
    - Document responsive behavior
    - _Requirements: 20.6, 20.7_
  
  - [ ] 19.4 Create guide documents
    - Create ANIMATION_GUIDE.md with animation best practices
    - Create PERFORMANCE_GUIDE.md with optimization tips
    - Create ACCESSIBILITY_GUIDE.md for new features
    - Document dark theme color system and usage
    - Add troubleshooting guides for common issues
    - Document testing strategies
    - _Requirements: 20.8, 20.9, 20.10_

- [ ] 20. Final polish and deployment
  - [ ] 20.1 Cross-browser testing
    - Test in Chrome (latest and previous version)
    - Test in Firefox (latest and previous version)
    - Test in Safari (latest version on macOS and iOS)
    - Test in Edge (latest version)
    - Verify animations work consistently across browsers
    - Check for layout issues and CSS compatibility
    - Test dark theme rendering on all browsers
    - Document any browser-specific issues and workarounds
  
  - [ ] 20.2 Responsive design verification
    - Test all breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1920px, 2560px
    - Verify touch targets are at least 48x48px on mobile
    - Verify visual hierarchy at all sizes (typography scales correctly)
    - Test on real devices: iPhone, iPad, Android phone, Android tablet
    - Verify images scale correctly without distortion
    - Test navigation menu on mobile (hamburger menu)
    - Verify forms are usable on mobile
    - _Requirements: 15.1, 15.11, 15.12_
  
  - [ ] 20.3 Final visual polish
    - Review spacing and alignment across all sections
    - Verify brand colors (purple, blue, gold) used consistently
    - Check typography hierarchy (headings, body text, captions)
    - Verify all animations are smooth and performant
    - Check for visual inconsistencies in dark theme
    - Verify gradient transitions are smooth
    - Test hover states on all interactive elements
    - Ensure consistent card styling across sections
  
  - [ ] 20.4 Final performance check
    - Run final Lighthouse audit on production build
    - Verify all metrics meet targets (Performance >80, LCP <2.5s, CLS <0.1, FID <100ms)
    - Check animation frame rates on various devices
    - Verify image optimization is working correctly
    - Test on slow network connections (3G, slow 4G)
    - Check bundle sizes and code splitting
    - Verify lazy loading is working correctly
  
  - [ ] 20.5 Final accessibility check
    - Run automated accessibility audit with axe DevTools
    - Perform manual keyboard navigation test through entire site
    - Verify all ARIA labels are correct and meaningful
    - Test with screen readers (NVDA, JAWS, VoiceOver)
    - Verify color contrast meets WCAG AA standards
    - Test with prefers-reduced-motion enabled
    - Verify focus indicators are visible on all interactive elements
    - Test form validation and error messages
  
  - [ ] 20.6 Build and deployment configuration
    - Verify build completes successfully with no errors
    - Test production build locally (npm run build && npm run start)
    - Verify all features work in production mode
    - Check for console errors or warnings
    - Verify environment variables are configured correctly
    - Test static export if applicable (npm run build && npm run export)
    - Verify all images and assets are included in build
    - Document deployment process and requirements
    - _Requirements: 19.1-19.10_

## Notes

- This implementation follows a phased approach: Animation Foundation → New Sections → Enhancements → Optimization → Testing → Documentation
- All animation components respect prefers-reduced-motion for accessibility
- Performance is prioritized with lazy loading, code splitting, and optimized animations
- All new sections are fully responsive and accessible
- Image assets should be prepared and optimized before implementation with dark theme aesthetic in mind
- Testing should be performed incrementally throughout development
- Documentation should be written alongside implementation
- The project maintains a **dark theme as the primary aesthetic** with vibrant purple (#8B5CF6), blue (#3B82F6), and gold (#F59E0B) accents throughout
- All tasks reference specific requirements for traceability
- Official Quein content from QUEIN_BRAND constant should be used throughout all sections
- Dark backgrounds (#0A0A0A, #050505, #1A1A1A) create luxury positioning and modern appeal
- All text must maintain WCAG AA contrast (4.5:1) on dark backgrounds for accessibility
- Glow effects (purple-glow, blue-glow, gold-glow) and gradients enhance the modern, premium aesthetic
- 3D flip cards, parallax effects, and image zoom create interactive, engaging experiences
- Vibrant accent colors (purple/blue/gold) should be used consistently across all interactive elements
- All images should be optimized for dark backgrounds with proper contrast and visual appeal
