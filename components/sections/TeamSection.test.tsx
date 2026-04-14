import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamSection from './TeamSection';
import { TEAM_MEMBERS } from '@/lib/constants';

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

// Mock child components
jest.mock('@/components/ui/TeamMemberCard', () => ({
  TeamMemberCard: ({ member }: any) => (
    <div data-testid={`team-card-${member.id}`}>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </div>
  ),
}));

jest.mock('@/components/animations/StaggeredCards', () => ({
  StaggeredCards: ({ children, staggerDelay }: any) => (
    <div data-testid="staggered-cards" data-stagger-delay={staggerDelay}>
      {children}
    </div>
  ),
}));

describe('TeamSection', () => {
  it('renders section heading', () => {
    render(<TeamSection />);
    
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<TeamSection />);
    
    expect(screen.getByText(/Passionate professionals dedicated/)).toBeInTheDocument();
  });

  it('renders all team members from constants', () => {
    render(<TeamSection />);
    
    TEAM_MEMBERS.forEach((member) => {
      expect(screen.getByTestId(`team-card-${member.id}`)).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    });
  });

  it('uses StaggeredCards with correct stagger delay', () => {
    render(<TeamSection />);
    
    const staggeredCards = screen.getByTestId('staggered-cards');
    expect(staggeredCards).toBeInTheDocument();
    expect(staggeredCards).toHaveAttribute('data-stagger-delay', '120');
  });

  it('renders correct number of team member cards', () => {
    render(<TeamSection />);
    
    const teamCards = screen.getAllByTestId(/team-card-/);
    expect(teamCards).toHaveLength(TEAM_MEMBERS.length);
  });

  it('has proper semantic HTML structure', () => {
    render(<TeamSection />);
    
    const section = screen.getByRole('region', { name: /meet our team/i });
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveAttribute('id', 'team');
  });

  it('renders join team CTA', () => {
    render(<TeamSection />);
    
    expect(screen.getByText(/Want to join our talented team/)).toBeInTheDocument();
    
    const ctaLink = screen.getByText('View Open Positions').closest('a');
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', 'mailto:careers@queinevents.com');
  });

  it('applies responsive grid classes', () => {
    const { container } = render(<TeamSection />);
    
    const staggeredCards = screen.getByTestId('staggered-cards');
    expect(staggeredCards).toHaveClass('grid');
    expect(staggeredCards).toHaveClass('grid-cols-1');
    expect(staggeredCards).toHaveClass('md:grid-cols-2');
    expect(staggeredCards).toHaveClass('lg:grid-cols-3');
  });

  it('has gradient background styling', () => {
    const { container } = render(<TeamSection />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Check for gradient background div
    const gradientBg = container.querySelector('.bg-gradient-to-br');
    expect(gradientBg).toBeInTheDocument();
  });

  it('renders decorative gradient orbs', () => {
    const { container } = render(<TeamSection />);
    
    const orbs = container.querySelectorAll('.rounded-full.blur-3xl');
    expect(orbs.length).toBeGreaterThanOrEqual(2);
  });
});
