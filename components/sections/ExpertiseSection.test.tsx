import { render, screen } from '@testing-library/react';
import ExpertiseSection from './ExpertiseSection';
import { EXPERTISE_ITEMS } from '@/lib/constants';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock ParallaxSection component
jest.mock('@/components/animations/ParallaxSection', () => ({
  ParallaxSection: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock useIntersectionAnimation hook
jest.mock('@/hooks/useIntersectionAnimation', () => ({
  useIntersectionAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

describe('ExpertiseSection', () => {
  beforeEach(() => {
    // Mock matchMedia for prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders the section heading', () => {
    render(<ExpertiseSection />);
    expect(screen.getByText('Our Expertise')).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive event production services/i)
    ).toBeInTheDocument();
  });

  it('renders all expertise items from constants', () => {
    render(<ExpertiseSection />);
    
    EXPERTISE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('renders feature lists for each expertise item', () => {
    render(<ExpertiseSection />);
    
    EXPERTISE_ITEMS.forEach((item) => {
      item.features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  it('renders Learn More buttons for each item', () => {
    render(<ExpertiseSection />);
    
    const buttons = screen.getAllByRole('button', { name: /Learn More/i });
    expect(buttons).toHaveLength(EXPERTISE_ITEMS.length);
  });

  it('renders icons for each expertise item', () => {
    render(<ExpertiseSection />);
    
    EXPERTISE_ITEMS.forEach((item) => {
      const icon = screen.getByAltText(`${item.title} icon`);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', item.icon);
    });
  });

  it('alternates layout direction for each item', () => {
    const { container } = render(<ExpertiseSection />);
    
    const items = container.querySelectorAll('.grid');
    items.forEach((item, index) => {
      if (index % 2 === 1) {
        expect(item).toHaveClass('lg:grid-flow-dense');
      }
    });
  });

  it('renders checkmark icons for feature list items', () => {
    const { container } = render(<ExpertiseSection />);
    
    const checkmarks = container.querySelectorAll('svg');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('applies correct section id for navigation', () => {
    const { container } = render(<ExpertiseSection />);
    const section = container.querySelector('#expertise');
    expect(section).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion setting', () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<ExpertiseSection />);
    
    // Component should still render without animations
    expect(screen.getByText('Our Expertise')).toBeInTheDocument();
  });

  it('renders placeholder when imageUrl is not provided', () => {
    const { container } = render(<ExpertiseSection />);
    
    // Check if any items without imageUrl render placeholder
    const placeholders = container.querySelectorAll('.bg-gradient-to-br');
    expect(placeholders.length).toBeGreaterThan(0);
  });
});
