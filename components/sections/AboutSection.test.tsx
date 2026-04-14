import { render, screen } from '@testing-library/react';
import AboutSection from './AboutSection';
import { DIFFERENTIATORS, CONTACT_INFO } from '@/lib/constants';

// Mock the FadeIn component to avoid animation complexity in tests
jest.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('AboutSection', () => {
  it('renders the section heading', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('displays company introduction paragraph', () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/professionally licensed event management company/i)
    ).toBeInTheDocument();
  });

  it('highlights location in Doha, Qatar', () => {
    render(<AboutSection />);
    expect(screen.getByText(new RegExp(CONTACT_INFO.address, 'i'))).toBeInTheDocument();
  });

  it('renders all five differentiators', () => {
    render(<AboutSection />);
    expect(DIFFERENTIATORS).toHaveLength(5);
    
    DIFFERENTIATORS.forEach((differentiator) => {
      expect(screen.getByText(differentiator.title)).toBeInTheDocument();
      expect(screen.getByText(differentiator.description)).toBeInTheDocument();
    });
  });

  it('displays icon for each differentiator', () => {
    render(<AboutSection />);
    
    DIFFERENTIATORS.forEach((differentiator) => {
      const icon = screen.getByAltText(`${differentiator.title} icon`);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', differentiator.icon);
    });
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
  });
});
