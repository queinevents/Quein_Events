import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestimonialCard } from './TestimonialCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  useReducedMotion: () => false,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('TestimonialCard', () => {
  const defaultProps = {
    clientName: 'Sarah Al-Mansoori',
    clientRole: 'Marketing Director',
    clientCompany: 'Qatar Tech Solutions',
    quote: 'Quein transformed our annual conference into an unforgettable experience.',
    rating: 5,
    eventType: 'Conference',
  };

  it('renders with required props', () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(screen.getByText('Sarah Al-Mansoori')).toBeInTheDocument();
    expect(screen.getByText('Marketing Director, Qatar Tech Solutions')).toBeInTheDocument();
    expect(screen.getByText(/Quein transformed our annual conference/)).toBeInTheDocument();
    expect(screen.getByText('Conference')).toBeInTheDocument();
  });

  it('displays quote with proper formatting', () => {
    render(<TestimonialCard {...defaultProps} />);

    const quote = screen.getByText(/Quein transformed our annual conference/);
    expect(quote.textContent).toContain('"');
    expect(quote.textContent).toContain(defaultProps.quote);
  });

  it('renders star rating with correct count', () => {
    render(<TestimonialCard {...defaultProps} rating={5} />);

    const ratingElement = screen.getByRole('img', { name: '5 out of 5 stars' });
    expect(ratingElement).toBeInTheDocument();
  });

  it('renders partial star rating', () => {
    render(<TestimonialCard {...defaultProps} rating={4} />);

    const ratingElement = screen.getByRole('img', { name: '4 out of 5 stars' });
    expect(ratingElement).toBeInTheDocument();
  });

  it('renders client image when provided', () => {
    render(
      <TestimonialCard
        {...defaultProps}
        imageUrl="/images/testimonials/client-1.jpg"
      />
    );

    const image = screen.getByAltText('Sarah Al-Mansoori');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/testimonials/client-1.jpg');
  });

  it('renders without client image', () => {
    render(<TestimonialCard {...defaultProps} />);

    const image = screen.queryByAltText('Sarah Al-Mansoori');
    expect(image).not.toBeInTheDocument();
  });

  it('displays event type badge', () => {
    render(<TestimonialCard {...defaultProps} eventType="Wedding" />);

    const badge = screen.getByText('Wedding');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary-purple/10');
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestimonialCard {...defaultProps} className="custom-class" />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('has proper styling classes', () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-background-card');
    expect(card).toHaveClass('rounded-2xl');
    expect(card).toHaveClass('flex', 'flex-col', 'items-center');
  });

  it('renders quote icon', () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);

    const quoteIcon = container.querySelector('svg');
    expect(quoteIcon).toBeInTheDocument();
  });

  it('displays client role and company together', () => {
    render(<TestimonialCard {...defaultProps} />);

    const roleCompany = screen.getByText(/Marketing Director, Qatar Tech Solutions/);
    expect(roleCompany).toBeInTheDocument();
  });

  it('renders all 5 star elements', () => {
    const { container } = render(<TestimonialCard {...defaultProps} rating={3} />);

    const stars = container.querySelectorAll('svg[width="24"][height="24"]');
    // 5 stars + 1 quote icon = 6 total SVGs
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it('handles long quotes', () => {
    const longQuote = 'This is a very long testimonial quote that spans multiple lines and contains a lot of text to test how the component handles longer content. It should wrap properly and maintain readability.';
    
    render(<TestimonialCard {...defaultProps} quote={longQuote} />);

    expect(screen.getByText(new RegExp(longQuote.substring(0, 50)))).toBeInTheDocument();
  });

  it('handles different event types', () => {
    const eventTypes = ['Conference', 'Wedding', 'Exhibition', 'Festival'];
    
    eventTypes.forEach(eventType => {
      const { rerender } = render(
        <TestimonialCard {...defaultProps} eventType={eventType} />
      );
      
      expect(screen.getByText(eventType)).toBeInTheDocument();
      
      rerender(<TestimonialCard {...defaultProps} eventType="Different" />);
    });
  });
});
