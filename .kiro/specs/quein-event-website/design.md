# Design Document: Quein Conference and Event Organization WLL Website

## Overview

The Quein Conference and Event Organization WLL website is a static, single-page Next.js application showcasing a premium event management company based in Doha, Qatar. The website features a dark animated theme with purple, blue, and orange-gold accents, smooth animations, and a fully responsive design optimized for devices from mobile to desktop. The brand tagline "Where Every Occasion Finds Its Grandeur" conveys luxury, grandeur, and professional expertise.

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3.x
- **Language**: TypeScript
- **Animation**: Framer Motion + CSS transitions
- **Image Optimization**: Next.js Image component
- **Form Handling**: React Hook Form + Zod validation
- **Media Assets**: Unsplash/Pexels for placeholder images
- **Video**: HTML5 video with fallback support

### Design Principles

1. **Luxury & Elegance**: Dark theme with sophisticated color palette and smooth animations
2. **Performance First**: Optimized images, lazy loading, and efficient rendering
3. **Accessibility**: WCAG AA compliance, keyboard navigation, semantic HTML
4. **Responsive**: Mobile-first approach with breakpoints at 640px, 768px, 1024px, 1280px
5. **User-Centric**: Clear navigation, intuitive interactions, and fast load times

## Architecture

### Application Structure

```
quein-event-website/
├── app/
│   ├── layout.tsx           # Root layout with metadata and SEO
│   ├── page.tsx             # Homepage (single-page app)
│   ├── globals.css          # Global styles and Tailwind imports
│   └── favicon.ico          # Brand favicon
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx   # Header navigation component
│   │   └── Footer.tsx       # Footer component
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── StatisticsSection.tsx      # NEW: Key metrics with counter animations
│   │   ├── DifferentiatorsSection.tsx # NEW: 7 key differentiators
│   │   ├── TestimonialsSection.tsx    # NEW: Client reviews
│   │   ├── TeamSection.tsx            # NEW: Optional team showcase
│   │   ├── NewsletterSection.tsx      # NEW: Optional email subscription
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Button.tsx       # Reusable button component
│   │   ├── Card.tsx         # Service/portfolio card component
│   │   ├── Input.tsx        # Form input component
│   │   ├── Select.tsx       # NEW: Form select dropdown
│   │   ├── Textarea.tsx     # Form textarea component
│   │   ├── StatCard.tsx     # NEW: Statistics display card
│   │   ├── TestimonialCard.tsx  # NEW: Testimonial display card
│   │   └── TeamMemberCard.tsx   # NEW: Team member display card
│   └── animations/
│       ├── FadeIn.tsx       # Scroll-triggered fade-in wrapper
│       ├── AnimatedSection.tsx  # Section animation wrapper
│       ├── CounterAnimation.tsx # NEW: Number counter animation
│       └── VideoBackground.tsx  # NEW: Video background with fallback
├── lib/
│   ├── constants.ts         # Brand colors, content, contact info
│   ├── schemas.ts           # Zod validation schemas
│   └── utils.ts             # Utility functions (cn, etc.)
├── hooks/
│   ├── useIntersectionAnimation.ts  # Intersection observer hook
│   └── useCounterAnimation.ts       # NEW: Counter animation hook
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   ├── hero-video.mp4   # NEW: Optional hero video
│   │   └── portfolio/       # Portfolio images
│   └── icons/               # Service icons
├── types/
│   └── index.ts             # TypeScript type definitions
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

### Page Flow

The website is a single-page application with smooth scroll navigation:

1. **Hero Section** → Initial landing with tagline and CTA (with optional video background)
2. **Services Section** → Four service categories (Private Events, Exhibitions, Conferences, Marriage Events)
3. **Portfolio Section** → Grid of past events with category filtering
4. **Statistics Section** → Key metrics with animated counters (200+ Events, 98% Satisfaction, 10+ Categories)
5. **Differentiators Section** → Seven reasons to choose Quein
6. **Testimonials Section** → Client reviews and social proof
7. **Team Section** → Optional team member showcase
8. **About Section** → Company background and mission
9. **Newsletter Section** → Optional email subscription
10. **Contact Section** → Enhanced contact form with detailed fields
11. **Footer** → Company details and links

## Components and Interfaces

### 1. Navigation Component

**Purpose**: Provides site navigation with responsive mobile/desktop views

**Props Interface**:
```typescript
interface NavigationProps {
  className?: string;
}
```

**State**:
- `isScrolled`: boolean - tracks if page scrolled beyond 100px
- `isMobileMenuOpen`: boolean - tracks mobile menu state

**Behavior**:
- Desktop (≥768px): Horizontal menu with logo and nav links
- Mobile (<768px): Hamburger menu with slide-in drawer
- Smooth scroll to sections on link click
- Background overlay appears after 100px scroll
- Logo links to top of page

**Accessibility**:
- Semantic `<nav>` element
- ARIA labels for mobile menu toggle
- Keyboard navigation support
- Focus trap in mobile menu when open

### 2. Hero Section Component

**Purpose**: Primary landing section with headline, tagline, and CTA with optional video background

**Props Interface**:
```typescript
interface HeroSectionProps {
  className?: string;
  videoUrl?: string;        // Optional video background URL
  fallbackImageUrl?: string; // Fallback image if video fails/unsupported
}
```

**Content**:
- Company tagline: "Where Every Occasion Finds Its Grandeur"
- Headline: Compelling statement about event management excellence
- Primary CTA button: "Plan Your Event"
- Optional video background with fallback to static image
- Animated entrance on page load

**Video Background Specifications**:
- Format: MP4 (H.264 codec for broad compatibility)
- Resolution: 1920x1080 (Full HD)
- File size: <5MB (optimized for web)
- Autoplay: Yes (muted for browser autoplay policies)
- Loop: Yes
- Controls: Hidden (decorative background)
- Fallback: Static image for unsupported browsers or slow connections
- Accessibility: Video is decorative, does not convey essential information

**Animations**:
- Staggered fade-in for headline and CTA (300ms delay between elements)
- Parallax effect on background (optional enhancement)
- Video fade-in on load

**Accessibility**:
- Video background is decorative (aria-hidden="true")
- All text content has sufficient contrast over video overlay
- CTA button has clear focus indicator

### 3. Services Section Component

**Purpose**: Displays four primary service categories

**Props Interface**:
```typescript
interface ServicesSectionProps {
  className?: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl?: string; // Placeholder from Unsplash/Pexels
}
```

**Service Categories**:
1. **Private Events**
   - VIP celebrations, corporate galas, milestone parties
   - Intimate gatherings to large-scale celebrations
   - Bespoke experiences tailored to client vision
   
2. **Exhibitions**
   - Trade shows, product launches, brand activations
   - Booth design and setup
   - Attendee engagement strategies
   
3. **Conferences**
   - Corporate conferences, seminars, workshops
   - Speaker coordination and AV management
   - Networking event facilitation
   
4. **Marriage Events**
   - Luxury weddings, engagement parties, receptions
   - Cultural ceremony coordination
   - End-to-end wedding planning

**Layout**:
- Grid: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
- Each card includes icon/image, title, description, and feature list

**Interactions**:
- Hover effect: Card lifts with shadow (transform: translateY(-8px))
- Fade-in animation when scrolled into view
- Staggered animation for each card (100ms delay)

**Image Specifications**:
- Source: Unsplash/Pexels (free stock images)
- Aspect ratio: 16:9
- Optimization: Next.js Image component with lazy loading
- Alt text: Descriptive text for each service category

### 4. Portfolio Section Component

**Purpose**: Showcases past events in a responsive grid with category filtering

**Props Interface**:
```typescript
interface PortfolioSectionProps {
  className?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: 'all' | 'private-events' | 'exhibitions' | 'conferences' | 'marriage-events';
  imageUrl: string;
  description?: string;
  galleryImages?: string[]; // Additional images for lightbox/modal
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
}
```

**Filter System**:
- Filter options: All, Private Events, Exhibitions, Conferences, Marriage Events
- Active filter highlighted with accent color
- Smooth transition when filtering (fade out/in)
- Filter state managed with React state
- URL parameter support for shareable filtered views (optional enhancement)

**Layout**:
- Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Minimum 6 placeholder items (at least 1-2 per category)
- Aspect ratio: 4:3 for images
- Masonry layout option for varied image heights (optional enhancement)

**Interactions**:
- Click filter button: Update displayed items
- Hover portfolio item: Overlay with event title and category
- Click portfolio item: Open image gallery modal (optional enhancement)
- Smooth transition (300ms) for filter changes
- Lazy loading for images

**Image Gallery Specifications**:
- Source: Unsplash/Pexels (free event photography)
- Format: WebP with JPEG fallback
- Sizes: Thumbnail (600x450), Full (1200x900)
- Alt text: Event title and category
- Attribution: Include photographer credit in image metadata

**Accessibility**:
- Filter buttons are keyboard accessible
- Active filter has aria-current="true"
- Portfolio items have descriptive alt text
- Focus management when filtering

### 5. Statistics Section Component

**Purpose**: Displays key company metrics with animated counters

**Props Interface**:
```typescript
interface StatisticsSectionProps {
  className?: string;
}

interface Statistic {
  id: string;
  value: number;
  suffix?: string;      // e.g., "+", "%"
  label: string;
  icon?: string;
  description?: string;
}
```

**Statistics to Display**:
1. **200+ Events**
   - Label: "Events Delivered"
   - Icon: Calendar or trophy icon
   
2. **98% Client Satisfaction**
   - Label: "Client Satisfaction"
   - Icon: Star or heart icon
   
3. **10+ Event Categories**
   - Label: "Event Categories"
   - Icon: Grid or category icon

**Counter Animation Specifications**:
- Trigger: When section enters viewport (Intersection Observer)
- Duration: 2000ms (2 seconds)
- Easing: Ease-out for natural deceleration
- Start value: 0
- End value: Target number
- Format: Comma-separated for large numbers (e.g., 1,000)
- Suffix: Animated after number completes (e.g., "+", "%")

**Layout**:
- Grid: 1 column (mobile), 3 columns (tablet/desktop)
- Equal spacing between stat cards
- Centered alignment
- Background: Subtle gradient or pattern

**Interactions**:
- Counter animates once when first visible
- No re-animation on subsequent scrolls
- Hover effect: Subtle scale or glow (optional)

**Accessibility**:
- Use aria-live="polite" for counter updates
- Provide static text alternative for screen readers
- Respect prefers-reduced-motion (show final value immediately)

### 6. Differentiators Section Component

**Purpose**: Highlights seven key reasons to choose Quein

**Props Interface**:
```typescript
interface DifferentiatorsSectionProps {
  className?: string;
}

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
}
```

**Seven Differentiators**:
1. **End-to-End Management**
   - Description: Complete event lifecycle management from concept to execution
   - Icon: Circular arrow or workflow icon
   
2. **Tailored Concepts**
   - Description: Bespoke event designs customized to client vision and brand
   - Icon: Palette or design icon
   
3. **Premium Vendor Network**
   - Description: Curated partnerships with Qatar's finest venues and suppliers
   - Icon: Network or handshake icon
   
4. **Bilingual Team**
   - Description: Fluent in English and Arabic for seamless communication
   - Icon: Language or globe icon
   
5. **Cultural Sensitivity**
   - Description: Deep understanding of local customs and international protocols
   - Icon: Cultural symbol or diversity icon
   
6. **On-the-Day Coordination**
   - Description: Dedicated team ensuring flawless execution and real-time problem solving
   - Icon: Checklist or coordination icon
   
7. **Transparent Budgeting**
   - Description: Clear pricing with no hidden costs and detailed breakdowns
   - Icon: Calculator or transparency icon

**Layout**:
- Grid: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Icon above title
- Short description below title
- Consistent card height

**Animations**:
- Staggered fade-in when section enters viewport
- Delay: 100ms between each card
- Hover effect: Subtle lift and shadow

**Accessibility**:
- Semantic heading structure (h3 for titles)
- Icons are decorative (aria-hidden="true")
- Clear, concise descriptions

### 7. Testimonials Section Component

**Purpose**: Displays client reviews and social proof

**Props Interface**:
```typescript
interface TestimonialsSectionProps {
  className?: string;
  layout?: 'carousel' | 'grid'; // Display mode
}

interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  rating: number;        // 1-5 stars
  review: string;
  date?: string;
  clientPhoto?: string;  // Optional client photo
  eventPhoto?: string;   // Optional event photo
}
```

**Testimonial Content** (Placeholder examples):
1. **Sarah Al-Mansouri** - Private Event
   - Rating: 5/5
   - Review: "Quein transformed our corporate gala into an unforgettable experience. Every detail was perfect."
   
2. **Ahmed Hassan** - Conference
   - Rating: 5/5
   - Review: "Professional, responsive, and creative. Our conference exceeded all expectations."
   
3. **Fatima Al-Thani** - Wedding
   - Rating: 5/5
   - Review: "They made our dream wedding a reality. The team's cultural sensitivity and attention to detail were exceptional."

**Layout Options**:

**Grid Layout** (Default):
- Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Fixed height cards with overflow handling
- All testimonials visible at once

**Carousel Layout** (Optional):
- Single testimonial displayed at a time
- Navigation arrows (previous/next)
- Dot indicators for testimonial count
- Auto-advance every 5 seconds (pausable)
- Swipe gesture support on mobile

**Card Design**:
- Quote icon at top
- Star rating display
- Review text (max 150-200 characters)
- Client name and event type at bottom
- Optional client/event photo

**Interactions**:
- Hover: Subtle shadow or border highlight
- Carousel: Click arrows or dots to navigate
- Pause auto-advance on hover (carousel mode)

**Accessibility**:
- Star rating has aria-label (e.g., "5 out of 5 stars")
- Carousel has proper ARIA roles and labels
- Keyboard navigation for carousel controls
- Pause button for auto-advancing carousel

### 8. Team Section Component (Optional)

**Purpose**: Showcases team members and their roles

**Props Interface**:
```typescript
interface TeamSectionProps {
  className?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}
```

**Team Member Content** (Placeholder examples):
1. **Noor Al-Kuwari** - Founder & CEO
   - Bio: "15+ years of experience in luxury event management"
   - Photo: Professional headshot (Unsplash placeholder)
   
2. **Khalid Rahman** - Creative Director
   - Bio: "Award-winning designer specializing in immersive experiences"
   - Photo: Professional headshot
   
3. **Layla Ahmed** - Operations Manager
   - Bio: "Expert in logistics and on-day coordination"
   - Photo: Professional headshot

**Layout**:
- Grid: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Centered alignment
- Equal card heights

**Card Design**:
- Photo at top (circular or square)
- Name and role below photo
- Optional short bio
- Social links at bottom (LinkedIn, email)

**Interactions**:
- Hover: Photo zoom or overlay effect
- Click social icons: Open in new tab
- Fade-in animation when scrolled into view

**Image Specifications**:
- Source: Unsplash/Pexels (professional portraits)
- Aspect ratio: 1:1 (square)
- Size: 300x300px
- Format: WebP with JPEG fallback

**Accessibility**:
- Alt text: "{Name}, {Role}"
- Social links have descriptive aria-labels
- Keyboard accessible

### 9. Newsletter Section Component (Optional)

**Purpose**: Email subscription for updates and news

**Props Interface**:
```typescript
interface NewsletterSectionProps {
  className?: string;
}

interface NewsletterFormData {
  email: string;
}
```

**Content**:
- Headline: "Stay Updated"
- Subheading: "Subscribe to receive event tips, company news, and exclusive offers"
- Email input field
- Subscribe button
- Privacy notice: "We respect your privacy. Unsubscribe anytime."

**Form Validation**:
- Email required
- Valid email format
- Real-time validation feedback
- Error message: "Please enter a valid email address"
- Success message: "Thank you for subscribing!"

**Layout**:
- Centered content
- Single column layout
- Email input and button inline (desktop) or stacked (mobile)
- Background: Accent color or gradient

**Interactions**:
- Submit: Validate and show success/error message
- Loading state on button during submission
- Form resets after successful submission
- Focus returns to input after error

**Accessibility**:
- Label associated with input
- Error messages announced to screen readers
- Success message has role="status"
- Button disabled during submission

**Future Integration**:
- Email service: Mailchimp, SendGrid, or ConvertKit
- Double opt-in confirmation
- Welcome email automation

### 10. About Section Component

**Purpose**: Describes company background and mission

**Props Interface**:
```typescript
interface AboutSectionProps {
  className?: string;
}
```

**Content Structure**:
- Company name: Quein Conference and Event Organization WLL
- Location: Doha, Qatar
- Tagline: "Where Every Occasion Finds Its Grandeur"
- Mission statement: Premium event management services
- Brand positioning: Luxury, grandeur, professional expertise
- Company introduction paragraph (2-3 sentences)

**Layout**:
- Introduction text (full width or centered)
- Optional company photo or brand imagery
- Single column layout with generous spacing

**Note**: Detailed differentiators are now in the dedicated Differentiators Section (Section 6)

### 11. Contact Form Component

**Purpose**: Collects detailed visitor inquiries with enhanced fields

**Props Interface**:
```typescript
interface ContactFormProps {
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;      // NEW: Approximate event date
  guestCount: string;     // NEW: Estimated guest count
  hearAboutUs: string;    // NEW: How did you hear about us
  message: string;
}
```

**Form Fields**:
1. **Name** (required)
   - Type: Text input
   - Validation: Min 2 characters
   - Placeholder: "Your full name"

2. **Email** (required)
   - Type: Email input
   - Validation: Valid email format
   - Placeholder: "your.email@example.com"

3. **Phone** (required)
   - Type: Tel input
   - Validation: Valid phone format
   - Placeholder: "+974 XXXX XXXX"

4. **Event Type** (required)
   - Type: Select dropdown
   - Options: Private Events, Exhibitions, Conferences, Marriage Events, Other
   - Default: "Select event type"

5. **Approximate Event Date** (optional)
   - Type: Date input
   - Placeholder: "Select date"
   - Min date: Today

6. **Estimated Guest Count** (optional)
   - Type: Number input or select
   - Options: 1-50, 51-100, 101-200, 201-500, 500+
   - Placeholder: "Select guest count"

7. **How Did You Hear About Us?** (optional)
   - Type: Select dropdown
   - Options: Google Search, Social Media, Referral, Previous Client, Event, Other
   - Default: "Select option"

8. **Message** (required)
   - Type: Textarea
   - Validation: Min 10 characters
   - Placeholder: "Tell us about your event..."
   - Rows: 5

**Validation Schema**:
```typescript
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  eventType: z.enum(['private-events', 'exhibitions', 'conferences', 'marriage-events', 'other'], {
    errorMap: () => ({ message: 'Please select an event type' })
  }),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  hearAboutUs: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

**Validation**:
- Client-side validation using Zod schema
- Real-time error display below each field
- Submit button disabled until required fields are valid
- Field-level validation on blur
- Form-level validation on submit

**Submission Flow**:
1. Validate all fields
2. Display loading state on button ("Sending...")
3. Show success message (for now, just client-side confirmation)
4. Reset form after 3 seconds
5. Scroll to success message

**Contact Information Display**:
- Email: info@queinevents.com (placeholder)
- Phone: +974 XXXX XXXX (placeholder)
- Address: Doha, Qatar
- Office hours: Sunday - Thursday, 9:00 AM - 6:00 PM

**Layout**:
- Two-column layout (desktop): Form on left, contact info on right
- Single column (mobile): Form above, contact info below
- Generous spacing between fields
- Clear visual hierarchy

**Accessibility**:
- All fields have associated labels
- Error messages have role="alert"
- Required fields marked with asterisk and aria-required
- Focus management on validation errors
- Success message announced to screen readers

### 12. Footer Component

**Purpose**: Displays company information and links

**Props Interface**:
```typescript
interface FooterProps {
  className?: string;
}
```

**Content**:
- Company name: Quein Conference and Event Organization WLL
- Tagline: "Where Every Occasion Finds Its Grandeur"
- Contact information (email, phone, address in Doha, Qatar)
- Social media links (placeholders for Instagram, LinkedIn, Facebook)
- Copyright notice: "© 2024 Quein Conference and Event Organization WLL. All rights reserved."

**Layout**:
- Single column (mobile)
- Multi-column grid (desktop): Logo/tagline | Contact | Social

### 13. Animation Components

**VideoBackground Component**:
```typescript
interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl: string;
  className?: string;
  overlay?: boolean;      // Dark overlay for text readability
  overlayOpacity?: number; // 0-1
}
```

**Purpose**: Provides video background with fallback support

**Implementation**:
- HTML5 video element
- Autoplay, loop, muted attributes
- Object-fit: cover for full coverage
- Fallback to image on error or unsupported
- Lazy loading for video
- Preload: metadata

**CounterAnimation Component**:
```typescript
interface CounterAnimationProps {
  end: number;
  duration?: number;      // Default: 2000ms
  suffix?: string;        // e.g., "+", "%"
  prefix?: string;        // e.g., "$"
  separator?: string;     // Default: ","
  decimals?: number;      // Default: 0
  className?: string;
}
```

**Purpose**: Animates numbers counting up from zero

**Implementation**:
- Uses requestAnimationFrame for smooth animation
- Easing function: easeOutQuad
- Triggers on intersection (useIntersectionObserver)
- Respects prefers-reduced-motion
- Formats numbers with separators

**FadeIn Component**:
```typescript
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
```

**Purpose**: Wraps content to fade in when scrolled into view

**Implementation**:
- Uses Intersection Observer API
- Triggers animation when 20% of element is visible
- Respects `prefers-reduced-motion` media query

**AnimatedSection Component**:
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right';
  delay?: number;
  className?: string;
}
```

**Purpose**: Provides various animation options for sections

## Data Models

### Theme Configuration

```typescript
interface ThemeColors {
  primary: {
    purple: string;    // #8B5CF6
    blue: string;      // #3B82F6
    gold: string;      // #F59E0B (orange-gold accent)
  };
  background: {
    dark: string;      // #0A0A0A
    darker: string;    // #050505
    card: string;      // #1A1A1A
  };
  text: {
    primary: string;   // #FFFFFF
    secondary: string; // #A0A0A0
    accent: string;    // #8B5CF6
  };
}
```

### Content Models

```typescript
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: 'all' | 'private-events' | 'exhibitions' | 'conferences' | 'marriage-events';
  imageUrl: string;
  description?: string;
  date?: string;
  galleryImages?: string[];
}

interface Statistic {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon?: string;
  description?: string;
}

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  rating: number;
  review: string;
  date?: string;
  clientPhoto?: string;
  eventPhoto?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  officeHours?: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}
```

### Form Validation Schemas

```typescript
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  eventType: z.enum(['private-events', 'exhibitions', 'conferences', 'marriage-events', 'other'], {
    errorMap: () => ({ message: 'Please select an event type' })
  }),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  hearAboutUs: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
```

### SEO and Metadata Models

```typescript
interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  structuredData: {
    '@context': 'https://schema.org';
    '@type': 'LocalBusiness';
    name: string;
    description: string;
    address: {
      '@type': 'PostalAddress';
      addressLocality: string;
      addressCountry: string;
    };
    telephone: string;
    email: string;
    url: string;
  };
}
```

## Error Handling

### Form Validation Errors

**Strategy**: Client-side validation with clear error messages

**Error Types**:
1. **Required Field**: "This field is required"
2. **Invalid Email**: "Please enter a valid email address"
3. **Invalid Phone**: "Please enter a valid phone number"
4. **Minimum Length**: "{Field} must be at least {n} characters"
5. **Invalid Selection**: "Please select a valid option"

**Display**:
- Error messages appear below each field in red text
- Field border changes to red when invalid
- Error icon displayed next to field label

### Image Loading Errors

**Strategy**: Graceful fallback with placeholder

**Implementation**:
```typescript
<Image
  src={imageUrl}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  }}
/>
```

### Video Loading Errors

**Strategy**: Automatic fallback to static image

**Implementation**:
```typescript
<video
  onError={() => setVideoError(true)}
  src={videoUrl}
>
  {videoError && <img src={fallbackImageUrl} alt="Hero background" />}
</video>
```

### Navigation Errors

**Strategy**: Smooth scroll with fallback

**Implementation**:
- If section ID not found, scroll to top
- Log warning in development mode
- No error shown to user

### Animation Errors

**Strategy**: Fail silently, display content without animation

**Implementation**:
- Wrap animation logic in try-catch
- If Intersection Observer not supported, show content immediately
- Respect `prefers-reduced-motion` setting

## Media Asset Specifications

### Image Guidelines

**Sources**:
- Unsplash (https://unsplash.com) - Free high-quality images
- Pexels (https://pexels.com) - Free stock photos and videos

**Search Keywords for Placeholder Images**:
- Hero: "luxury event", "elegant venue", "conference hall"
- Services: "private party", "exhibition booth", "conference room", "wedding venue"
- Portfolio: "corporate event", "trade show", "wedding reception", "gala dinner"
- Team: "professional portrait", "business headshot"

**Image Specifications**:
- Format: WebP with JPEG fallback
- Hero images: 1920x1080 (Full HD)
- Service cards: 800x600 (4:3 ratio)
- Portfolio thumbnails: 600x450 (4:3 ratio)
- Portfolio full: 1200x900 (4:3 ratio)
- Team photos: 300x300 (1:1 ratio)
- Optimization: Compress to <200KB per image
- Alt text: Descriptive, includes relevant keywords

**Attribution**:
- Include photographer credit in image metadata
- Add attribution link in footer or credits page
- Format: "Photo by [Photographer Name] on Unsplash/Pexels"

### Video Guidelines

**Hero Video Specifications**:
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 (Full HD)
- Frame rate: 30fps
- Duration: 10-30 seconds (looping)
- File size: <5MB (optimized for web)
- Bitrate: 2-4 Mbps
- Audio: None (muted)

**Video Sources**:
- Pexels Videos (https://pexels.com/videos)
- Pixabay Videos (https://pixabay.com/videos)

**Search Keywords**:
- "luxury event", "elegant venue", "conference", "celebration", "gala"

**Fallback Image**:
- Extract frame from video or use related static image
- Same resolution as video (1920x1080)
- Format: JPEG, optimized to <300KB

**Implementation**:
```html
<video autoplay loop muted playsinline>
  <source src="/videos/hero-bg.mp4" type="video/mp4">
  <img src="/images/hero-bg-fallback.jpg" alt="Elegant event venue">
</video>
```

### Icon Guidelines

**Sources**:
- Heroicons (https://heroicons.com) - Free MIT-licensed icons
- Lucide Icons (https://lucide.dev) - Open source icon library
- Font Awesome (free tier)

**Icon Usage**:
- Services: Calendar, Users, Briefcase, Heart icons
- Statistics: TrendingUp, Star, Grid icons
- Differentiators: CheckCircle, Sparkles, Globe, etc.
- Contact: Mail, Phone, MapPin icons

**Specifications**:
- Format: SVG (inline or component)
- Size: 24x24px (default), 32x32px (large)
- Color: Inherit from parent or theme colors
- Stroke width: 2px (consistent)

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Component Tests**:

1. **Navigation Component**
   - Renders all navigation links
   - Mobile menu toggles on button click
   - Smooth scroll triggered on link click
   - Background overlay appears after scroll threshold
   - Logo links to top of page

2. **Hero Section Component**
   - Renders tagline and CTA button
   - Video background loads when provided
   - Falls back to image when video unavailable
   - CTA button navigates to contact section
   - Respects prefers-reduced-motion

3. **Services Section Component**
   - Renders all four service categories
   - Each service card displays title, description, and features
   - Hover effects apply correctly
   - Images load with proper alt text

4. **Portfolio Section Component**
   - Renders portfolio grid
   - Filter buttons display all categories
   - Clicking filter updates displayed items
   - Active filter has correct styling
   - Portfolio items have proper alt text

5. **Statistics Section Component**
   - Renders all three statistics
   - Counter animation triggers on intersection
   - Numbers format correctly with separators
   - Respects prefers-reduced-motion (shows final value)
   - Suffix displays after number

6. **Differentiators Section Component**
   - Renders all seven differentiators
   - Each card displays icon, title, and description
   - Staggered animation applies correctly
   - Grid layout responsive

7. **Testimonials Section Component**
   - Renders testimonial cards
   - Star rating displays correctly
   - Carousel navigation works (if carousel mode)
   - Grid layout displays all testimonials (if grid mode)
   - Auto-advance pauses on hover (carousel mode)

8. **Team Section Component**
   - Renders team member cards
   - Photos load with proper alt text
   - Social links open in new tab
   - Grid layout responsive

9. **Newsletter Section Component**
   - Email input renders
   - Validation errors display for invalid email
   - Success message shows after valid submission
   - Form resets after submission

10. **Contact Form Component**
    - All form fields render correctly
    - Validation errors display for invalid inputs
    - Event type dropdown has all options
    - Date picker allows future dates only
    - Guest count options display correctly
    - Submit button disabled when form invalid
    - Success message displays after valid submission
    - Form resets after successful submission

11. **Button Component**
    - Renders with correct variant styles
    - Click handler fires correctly
    - Disabled state prevents clicks
    - Loading state displays spinner

12. **Counter Animation Component**
    - Animates from 0 to target value
    - Duration prop controls animation speed
    - Suffix and prefix display correctly
    - Number formatting with separators works
    - Respects prefers-reduced-motion

13. **Video Background Component**
    - Video element renders with correct attributes
    - Autoplay, loop, and muted attributes present
    - Falls back to image on error
    - Overlay applies when specified

### Integration Testing

**Framework**: Playwright

**Test Scenarios**:

1. **Full Page Navigation Flow**
   - Click each navigation link
   - Verify smooth scroll to correct section
   - Verify section is visible in viewport
   - Test all 11 sections (Hero, Services, Portfolio, Statistics, Differentiators, Testimonials, Team, About, Newsletter, Contact, Footer)

2. **Portfolio Filtering Flow**
   - Click each filter option
   - Verify correct items display
   - Verify smooth transition between filters
   - Test "All" filter shows all items

3. **Contact Form Submission Flow**
   - Fill out all required fields with valid data
   - Select event type from dropdown
   - Choose event date and guest count
   - Submit form
   - Verify success message appears
   - Verify form resets

4. **Newsletter Subscription Flow**
   - Enter valid email
   - Submit form
   - Verify success message
   - Verify form resets

5. **Testimonials Carousel Flow** (if carousel mode)
   - Click next/previous arrows
   - Verify testimonial changes
   - Click dot indicators
   - Verify auto-advance works
   - Verify pause on hover

6. **Video Background Loading**
   - Verify video loads and plays
   - Verify fallback image displays if video fails
   - Verify video is muted and loops

7. **Statistics Counter Animation**
   - Scroll to statistics section
   - Verify counters animate from 0 to target
   - Verify animation only plays once

8. **Responsive Layout Testing**
   - Test at mobile breakpoint (375px)
   - Test at tablet breakpoint (768px)
   - Test at desktop breakpoint (1280px)
   - Verify mobile menu works correctly
   - Verify grid layouts adjust correctly
   - Verify all new sections are responsive

9. **Animation Testing**
   - Scroll through page
   - Verify sections fade in when visible
   - Verify hero section animates on load
   - Verify hover effects work on interactive elements
   - Verify staggered animations in differentiators section

### Accessibility Testing

**Tools**: axe-core, WAVE, manual keyboard testing

**Test Cases**:

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Verify focus indicators visible
   - Verify focus order is logical
   - Verify mobile menu keyboard accessible

2. **Screen Reader Testing**
   - All images have alt text
   - Form labels properly associated
   - ARIA labels present where needed
   - Semantic HTML structure correct

3. **Color Contrast**
   - All text meets WCAG AA contrast ratios
   - Focus indicators have sufficient contrast
   - Error messages have sufficient contrast

4. **Motion Preferences**
   - Verify animations disabled when `prefers-reduced-motion` is set
   - Verify page still functional without animations

### Performance Testing

**Tools**: Lighthouse, WebPageTest

**Metrics**:
- Lighthouse Performance Score: >80
- First Contentful Paint: <2s
- Largest Contentful Paint: <3s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <4s

**Test Scenarios**:
1. Homepage load on 3G connection
2. Homepage load on desktop
3. Image lazy loading verification
4. Font loading optimization verification

### Visual Regression Testing

**Tool**: Percy or Chromatic

**Test Cases**:
- Homepage at mobile, tablet, desktop breakpoints
- Mobile menu open state
- Form validation error states
- Hover states for interactive elements
- Dark theme consistency across all sections

### SEO Testing

**Manual Checks**:
- Title tag present and descriptive: "Quein - Premium Event Management in Doha, Qatar"
- Meta description present (150-160 characters) with Qatar-specific keywords
- Open Graph tags present for social sharing
- Favicon loads correctly
- Semantic HTML structure
- Heading hierarchy (h1 → h2 → h3)
- LocalBusiness structured data schema with Qatar location
- Alt text for all images
- Canonical URL specified

## Deployment and Build

### Build Configuration

**Next.js Config** (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'images.pexels.com'], // Allow external images
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### Build Process

1. **Development**: `npm run dev`
2. **Build**: `npm run build` (generates static files in `out/`)
3. **Preview**: `npm run start` (preview production build)

### Deployment Options

**Recommended**: Vercel (optimized for Next.js)

**Alternatives**:
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Variables

For future API integration:
```
NEXT_PUBLIC_SITE_URL=https://queinevents.com
NEXT_PUBLIC_CONTACT_EMAIL=info@queinevents.com
NEXT_PUBLIC_COMPANY_NAME=Quein Conference and Event Organization WLL
```

### SEO Configuration

**Metadata in layout.tsx**:
```typescript
export const metadata: Metadata = {
  title: 'Quein - Premium Event Management in Doha, Qatar',
  description: 'Quein Conference and Event Organization WLL offers luxury event management services in Doha, Qatar. Specializing in private events, exhibitions, conferences, and weddings.',
  keywords: ['event management', 'Doha', 'Qatar', 'luxury events', 'conferences', 'exhibitions', 'weddings', 'private events'],
  openGraph: {
    title: 'Quein - Where Every Occasion Finds Its Grandeur',
    description: 'Premium event management services in Doha, Qatar',
    url: 'https://queinevents.com',
    siteName: 'Quein Events',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
```

**Structured Data (LocalBusiness Schema)**:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Quein Conference and Event Organization WLL",
  "description": "Premium event management services in Doha, Qatar",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Doha",
    "addressCountry": "QA"
  },
  "telephone": "+974-XXXX-XXXX",
  "email": "info@queinevents.com",
  "url": "https://queinevents.com",
  "priceRange": "$$$",
  "areaServed": {
    "@type": "City",
    "name": "Doha"
  }
}
```

## Future Enhancements

### Phase 2 Considerations

1. **CMS Integration**: Contentful or Sanity for portfolio and content management
2. **Form Backend**: Email service integration (SendGrid, Resend, Mailchimp)
3. **Analytics**: Google Analytics or Plausible for visitor tracking
4. **Multi-language**: Arabic language support for local market
5. **Blog Section**: Company news, event tips, and industry insights
6. **Client Portal**: Login area for existing clients to track event planning
7. **Online Booking**: Calendar integration for consultation scheduling
8. **Live Chat**: Customer support widget (Intercom, Drift)
9. **Image Gallery Modal**: Lightbox for portfolio item detail views
10. **Testimonial Video**: Video testimonials from clients
11. **Virtual Tours**: 360° venue tours
12. **Event Calculator**: Budget estimation tool

### Performance Optimizations

1. **Image Optimization**: Convert to WebP format with JPEG fallback
2. **Code Splitting**: Dynamic imports for heavy components (carousel, video)
3. **CDN**: Serve static assets from CDN (Cloudflare, AWS CloudFront)
4. **Caching**: Implement service worker for offline support
5. **Lazy Loading**: Defer loading of below-the-fold content
6. **Font Optimization**: Subset fonts, preload critical fonts
7. **Video Optimization**: Adaptive bitrate streaming for hero video

### Accessibility Enhancements

1. **Skip Links**: Add skip to main content link
2. **ARIA Live Regions**: For dynamic content updates (counters, form messages)
3. **High Contrast Mode**: Additional theme option for better visibility
4. **Font Scaling**: Support for user font size preferences
5. **Keyboard Shortcuts**: Quick navigation shortcuts
6. **Screen Reader Testing**: Comprehensive testing with NVDA, JAWS, VoiceOver

### Content Enhancements

1. **Real Portfolio**: Replace placeholder images with actual event photos
2. **Real Testimonials**: Collect and display genuine client reviews
3. **Team Bios**: Add detailed team member profiles
4. **Case Studies**: Detailed event planning stories
5. **FAQ Section**: Common questions about event planning
6. **Pricing Guide**: Transparent pricing information
7. **Venue Partners**: Showcase partner venues in Doha

## Conclusion

This design provides a comprehensive blueprint for building the Quein Conference and Event Organization WLL website. The architecture emphasizes performance, accessibility, and user experience while maintaining the luxury brand positioning through thoughtful design choices and smooth animations.

### Key Design Features

1. **Enhanced Hero Section**: Optional video background with fallback support
2. **Four Service Categories**: Private Events, Exhibitions, Conferences, Marriage Events
3. **Portfolio Filtering**: Category-based filtering for easy navigation
4. **Statistics with Counters**: Animated metrics showcasing company achievements
5. **Seven Differentiators**: Clear value propositions for potential clients
6. **Social Proof**: Testimonials section with flexible layout options
7. **Team Showcase**: Optional team member profiles
8. **Newsletter Integration**: Email subscription for lead generation
9. **Enhanced Contact Form**: Detailed fields for better lead qualification
10. **SEO Optimization**: LocalBusiness schema and Qatar-specific metadata

### Brand Identity

- **Company**: Quein Conference and Event Organization WLL
- **Location**: Doha, Qatar
- **Tagline**: "Where Every Occasion Finds Its Grandeur"
- **Theme**: Dark animated with purple, blue, and orange-gold accents
- **Positioning**: Premium, luxury, professional expertise

### Technical Highlights

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS for rapid development
- **Animations**: Framer Motion + CSS for smooth interactions
- **Media**: Unsplash/Pexels for placeholder assets
- **Forms**: React Hook Form + Zod for robust validation
- **SEO**: Comprehensive metadata and structured data

The component-based structure ensures maintainability and scalability for future enhancements, while the focus on accessibility and performance guarantees a high-quality user experience across all devices and user needs.
