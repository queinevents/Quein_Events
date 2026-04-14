import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TeamMemberCard } from './TeamMemberCard';
import type { TeamMember } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  useReducedMotion: () => false,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...props} />;
  },
}));

const mockTeamMember: TeamMember = {
  id: 'test-member',
  name: 'John Doe',
  role: 'Event Director',
  bio: 'Experienced event director with 10+ years in the industry.',
  imageUrl: '/images/team/john-doe.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    email: 'john@example.com',
  },
};

describe('TeamMemberCard', () => {
  it('renders team member name and role', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Event Director')).toBeInTheDocument();
  });

  it('renders team member photo with correct alt text', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/team/john-doe.jpg');
  });

  it('renders bio text', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    expect(screen.getByText(/Experienced event director/)).toBeInTheDocument();
  });

  it('renders social links when provided', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const linkedinLink = screen.getByLabelText("John Doe's LinkedIn profile");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    
    const emailLink = screen.getByLabelText('Email John Doe');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
  });

  it('does not render social links when not provided', () => {
    const memberWithoutSocial: TeamMember = {
      ...mockTeamMember,
      socialLinks: undefined,
    };
    
    render(<TeamMemberCard member={memberWithoutSocial} />);
    
    expect(screen.queryByLabelText(/LinkedIn/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Email/)).not.toBeInTheDocument();
  });

  it('is keyboard accessible with proper role and aria attributes', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-pressed', 'false');
  });

  it('handles keyboard interaction (Enter key)', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const card = screen.getByRole('button');
    
    // Initially not flipped
    expect(card).toHaveAttribute('aria-pressed', 'false');
    
    // Press Enter
    fireEvent.keyDown(card, { key: 'Enter' });
    
    // Should flip
    expect(card).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles keyboard interaction (Space key)', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const card = screen.getByRole('button');
    
    // Initially not flipped
    expect(card).toHaveAttribute('aria-pressed', 'false');
    
    // Press Space
    fireEvent.keyDown(card, { key: ' ' });
    
    // Should flip
    expect(card).toHaveAttribute('aria-pressed', 'true');
  });

  it('announces flip state to screen readers', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    const announcement = screen.getByText(/Showing photo of John Doe/);
    expect(announcement).toBeInTheDocument();
    expect(announcement).toHaveClass('sr-only');
    expect(announcement).toHaveAttribute('aria-live', 'polite');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TeamMemberCard member={mockTeamMember} className="custom-class" />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('renders simplified layout when reduced motion is preferred', () => {
    // Mock useReducedMotion to return true
    jest.spyOn(require('framer-motion'), 'useReducedMotion').mockReturnValue(true);
    
    render(<TeamMemberCard member={mockTeamMember} />);
    
    // Should render all content in a single view
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Event Director')).toBeInTheDocument();
    expect(screen.getByText(/Experienced event director/)).toBeInTheDocument();
    
    // Should not have flip interaction
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
