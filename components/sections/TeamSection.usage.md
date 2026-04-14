# TeamSection Component Usage Guide

## Overview

The `TeamSection` component displays team member profiles in a responsive grid layout with gradient background and staggered animations. It uses the `TeamMemberCard` component to show 3D flip cards for each team member.

## Features

- **Gradient Background**: Purple to blue gradient with decorative orbs
- **Staggered Animations**: Cards animate in sequentially with 120ms delay
- **Responsive Grid**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Team Data**: Automatically imports team members from constants
- **Join Team CTA**: Optional call-to-action for careers
- **Accessibility**: Full keyboard navigation and screen reader support

## Basic Usage

```tsx
import TeamSection from '@/components/sections/TeamSection';

export default function HomePage() {
  return (
    <>
      {/* Other sections */}
      <TeamSection />
      {/* More sections */}
    </>
  );
}
```

## Layout Structure

```
TeamSection
├── Gradient Background Layer
│   ├── Purple to Blue gradient
│   └── Decorative gradient orbs
├── Section Heading
│   ├── "Meet Our Team"
│   └── Descriptive subheading
├── Team Grid (StaggeredCards)
│   ├── TeamMemberCard (Founder)
│   ├── TeamMemberCard (Event Director)
│   ├── TeamMemberCard (Technical Lead)
│   ├── TeamMemberCard (Creative Designer)
│   └── TeamMemberCard (Operations Manager)
└── Join Team CTA
    ├── Description text
    └── Email link button
```

## Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Full-width cards
- Vertical stacking
- Touch-friendly interactions

### Tablet (768px - 1024px)
- 2-column grid
- 32px gap between cards
- Balanced layout

### Desktop (> 1024px)
- 3-column grid
- 32px gap between cards
- Optimal viewing experience

## Customization

### Modifying Team Members

Edit the `TEAM_MEMBERS` array in `lib/constants.ts`:

```typescript
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'unique-id',
    name: 'Team Member Name',
    role: 'Job Title',
    bio: 'Brief biography...',
    imageUrl: '/images/team/photo.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/username',
      email: 'email@example.com',
    },
  },
  // Add more team members...
];
```

### Changing Stagger Delay

The stagger delay is set to 120ms by default. To change it, modify the `staggerDelay` prop in `TeamSection.tsx`:

```tsx
<StaggeredCards
  baseDelay={0}
  staggerDelay={150} // Change to desired delay in ms
  animation="slide-up"
>
```

### Customizing Gradient Background

The gradient colors can be adjusted in the component:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 via-primary-blue/5 to-background-darker" />
```

### Removing Join Team CTA

To remove the "Join Our Team" section, delete or comment out the CTA block in `TeamSection.tsx`:

```tsx
{/* Optional: Join Our Team CTA */}
<motion.div className="text-center mt-12 md:mt-16">
  {/* CTA content */}
</motion.div>
```

## Animation Details

### Entrance Animation
- **Type**: Slide up with fade
- **Stagger**: 120ms between cards
- **Duration**: 500ms per card
- **Easing**: easeOutQuad [0.25, 0.46, 0.45, 0.94]

### Scroll Trigger
- **Threshold**: 30% of section visible
- **Trigger Once**: Yes (animation plays once)
- **Viewport Margin**: Default

### Reduced Motion
When user prefers reduced motion:
- No stagger animation
- Cards appear immediately
- Flip cards show simplified layout

## Accessibility

### Keyboard Navigation
1. **Tab**: Navigate to section
2. **Tab**: Focus on first team card
3. **Enter/Space**: Flip card to see bio
4. **Tab**: Navigate to social links
5. **Tab**: Move to next card
6. **Shift+Tab**: Navigate backwards

### Screen Reader Support
- Section has `aria-label="Meet our team"`
- Proper heading hierarchy (h2 for section title)
- Each card announces flip state
- Social links have descriptive labels

### Focus Management
- Visible focus indicators on all interactive elements
- Focus trap within flipped cards
- Logical tab order through team members

## Integration Examples

### Full Page Layout

```tsx
export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
```

### With Custom Spacing

```tsx
<div className="py-32">
  <TeamSection />
</div>
```

### Between Other Sections

```tsx
<>
  <ExpertiseSection />
  <TeamSection />
  <TestimonialsSection />
</>
```

## Performance

### Optimization Tips
1. **Image Optimization**: Use 400x400px WebP images
2. **Lazy Loading**: Images below fold load on scroll
3. **Code Splitting**: Section can be dynamically imported
4. **Animation Performance**: Uses GPU-accelerated transforms

### Dynamic Import

```tsx
import dynamic from 'next/dynamic';

const TeamSection = dynamic(
  () => import('@/components/sections/TeamSection'),
  { loading: () => <div>Loading team...</div> }
);
```

## Styling

### Theme Colors Used
- `primary-purple`: Gradient and accents
- `primary-blue`: Gradient blend
- `text-primary`: Headings
- `text-secondary`: Descriptions
- `background-darker`: Base background

### Spacing
- Section padding: 64px (mobile), 96px (tablet), 128px (desktop)
- Grid gap: 24px (mobile), 32px (desktop)
- Heading margin: 48px (mobile), 64px (desktop)

## Requirements Validated

- ✅ **5.1**: Displays at least 5 team members including founder
- ✅ **5.6**: Team cards animate with staggered entrance (120ms)
- ✅ **5.8**: Uses gradient background (purple to blue)
- ✅ **5.9**: Responsive grid layout
- ✅ **15.5**: Proper responsive breakpoints
- ✅ **14.1**: Respects prefers-reduced-motion

## Related Components

- `TeamMemberCard`: Individual flip card component
- `StaggeredCards`: Animation wrapper for sequential animations
- `AboutSection`: Company information section
- `ContactSection`: Contact form section

## Troubleshooting

### Cards Not Animating
- Check if `prefers-reduced-motion` is enabled
- Verify `StaggeredCards` component is imported
- Ensure Framer Motion is installed

### Images Not Loading
- Verify image paths in `TEAM_MEMBERS` constant
- Check images exist in `/public/images/team/`
- Ensure Next.js Image component is configured

### Layout Issues
- Check Tailwind CSS is properly configured
- Verify responsive classes are applied
- Test at different breakpoints

## Best Practices

1. **Image Quality**: Use high-quality, professional photos
2. **Bio Length**: Keep bios concise (2-3 sentences)
3. **Consistent Roles**: Use clear, descriptive job titles
4. **Social Links**: Include at least one contact method
5. **Accessibility**: Test with keyboard and screen reader
6. **Performance**: Optimize images before deployment

## Future Enhancements

Potential improvements for future iterations:
- Add team member filtering by department
- Include team member detail modal
- Add video introductions
- Implement team member search
- Add "Load More" for large teams
- Include team statistics/achievements
