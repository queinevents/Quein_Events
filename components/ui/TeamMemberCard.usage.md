# TeamMemberCard Component Usage Guide

## Overview

The `TeamMemberCard` component displays team member profiles with an interactive 3D flip card effect. The front shows the member's photo, name, and role, while the back displays their bio and social links.

## Features

- **3D Flip Animation**: Card flips on hover with smooth 600ms transition
- **Circular Photo**: Professional circular photo display on front
- **Social Links**: LinkedIn and email links with hover scale effect
- **Keyboard Accessible**: Flip on Enter/Space key press
- **Screen Reader Support**: Announces flip state changes
- **Reduced Motion**: Simplified layout when user prefers reduced motion
- **Responsive**: Works on all screen sizes

## Basic Usage

```tsx
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import type { TeamMember } from '@/types';

const member: TeamMember = {
  id: 'john-doe',
  name: 'John Doe',
  role: 'Event Director',
  bio: 'Experienced event director with 10+ years in the industry.',
  imageUrl: '/images/team/john-doe.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    email: 'john@example.com',
  },
};

function MyComponent() {
  return <TeamMemberCard member={member} />;
}
```

## Props

### `member` (required)

Type: `TeamMember`

The team member data object containing:

- `id` (string): Unique identifier
- `name` (string): Full name
- `role` (string): Job title/role
- `bio` (string): Biography text
- `imageUrl` (string): Path to profile photo
- `socialLinks` (optional): Object with `linkedin` and/or `email` URLs

### `className` (optional)

Type: `string`

Additional CSS classes to apply to the card container.

## Examples

### Basic Team Member

```tsx
<TeamMemberCard
  member={{
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Creative Designer',
    bio: 'Sarah transforms concepts into stunning visual experiences.',
    imageUrl: '/images/team/sarah.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah@example.com',
    },
  }}
/>
```

### Without Social Links

```tsx
<TeamMemberCard
  member={{
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Technical Lead',
    bio: 'Michael ensures flawless technical execution.',
    imageUrl: '/images/team/michael.jpg',
  }}
/>
```

### With Only Email

```tsx
<TeamMemberCard
  member={{
    id: 'robert-taylor',
    name: 'Robert Taylor',
    role: 'Audio Engineer',
    bio: 'Robert specializes in professional sound engineering.',
    imageUrl: '/images/team/robert.jpg',
    socialLinks: {
      email: 'robert@example.com',
    },
  }}
/>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {teamMembers.map((member) => (
    <TeamMemberCard key={member.id} member={member} />
  ))}
</div>
```

### Custom Styling

```tsx
<TeamMemberCard
  member={member}
  className="shadow-2xl shadow-primary-purple/20"
/>
```

## Accessibility

### Keyboard Navigation

- **Tab**: Focus on card
- **Enter/Space**: Flip card to show bio
- **Tab again**: Move to social links
- **Shift+Tab**: Navigate backwards

### Screen Reader Support

- Card announces as button with flip state
- Flip state changes are announced via `aria-live="polite"`
- Social links have descriptive labels
- Images have proper alt text

### Reduced Motion

When user prefers reduced motion:
- No flip animation
- All content displayed in single view
- Simplified layout without 3D transforms

## Styling

The component uses Tailwind CSS classes and can be customized via:

1. **Custom className**: Pass additional classes via `className` prop
2. **Global CSS**: Modify 3D flip utilities in `app/globals.css`
3. **Theme colors**: Uses design system colors from `tailwind.config.ts`

### 3D Flip CSS Classes

The following utility classes are used for the 3D flip effect:

- `.perspective-1000`: Sets 3D perspective
- `.preserve-3d`: Preserves 3D transforms
- `.backface-hidden`: Hides back of card during flip
- `.rotate-y-180`: Rotates card 180 degrees on Y axis

## Performance

- Uses Framer Motion for GPU-accelerated animations
- Images should be optimized (400x400px recommended)
- Lazy loads images below the fold
- Respects user's motion preferences

## Requirements Validated

- **5.2**: 3D flip card with front and back
- **5.3**: Front displays circular photo, name, role
- **5.4**: Back displays bio and social links
- **5.5**: Flip on hover with 3D transform (600ms)
- **5.7**: Social icons scale on hover
- **10.9**: Keyboard accessible (flip on Enter/Space)
- **14.1**: Respects prefers-reduced-motion

## Related Components

- `TeamSection`: Section component that displays multiple team cards
- `StaggeredCards`: Animation wrapper for sequential card animations
- `Card`: Base card component for other use cases

## Tips

1. **Image Optimization**: Use 400x400px circular images for best results
2. **Bio Length**: Keep bios concise (2-3 sentences) for readability
3. **Social Links**: Include at least one contact method
4. **Grid Layout**: Use 3-column grid on desktop for optimal display
5. **Accessibility**: Always test with keyboard and screen reader
