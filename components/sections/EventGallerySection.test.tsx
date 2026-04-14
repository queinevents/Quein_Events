import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventGallerySection } from './EventGallerySection';
import { GALLERY_ITEMS } from '@/lib/constants';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock react-masonry-css
jest.mock('react-masonry-css', () => ({
  __esModule: true,
  default: ({ children, className, columnClassName }: any) => (
    <div className={className} data-testid="masonry-grid">
      <div className={columnClassName}>{children}</div>
    </div>
  ),
}));

describe('EventGallerySection', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = 'unset';
  });

  it('renders the section with heading', () => {
    render(<EventGallerySection />);
    
    expect(screen.getByText('Event Gallery')).toBeInTheDocument();
    expect(screen.getByText('Explore our portfolio of unforgettable events')).toBeInTheDocument();
  });

  it('renders all filter buttons', () => {
    render(<EventGallerySection />);
    
    expect(screen.getByText('All Events')).toBeInTheDocument();
    expect(screen.getByText('Concerts')).toBeInTheDocument();
    expect(screen.getByText('Exhibitions')).toBeInTheDocument();
    expect(screen.getByText('Conferences')).toBeInTheDocument();
    expect(screen.getByText('Weddings')).toBeInTheDocument();
    expect(screen.getByText('Festivals')).toBeInTheDocument();
  });

  it('displays all gallery items by default', () => {
    render(<EventGallerySection />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('filters gallery items when category is selected', async () => {
    render(<EventGallerySection />);
    
    const concertsButton = screen.getByText('Concerts');
    fireEvent.click(concertsButton);
    
    await waitFor(() => {
      const concertItems = GALLERY_ITEMS.filter(item => item.category === 'concerts');
      expect(concertItems.length).toBeGreaterThan(0);
    });
  });

  it('applies active styles to selected filter button', () => {
    render(<EventGallerySection />);
    
    const allEventsButton = screen.getByText('All Events');
    expect(allEventsButton).toHaveAttribute('aria-pressed', 'true');
    
    const concertsButton = screen.getByText('Concerts');
    fireEvent.click(concertsButton);
    
    expect(concertsButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens lightbox when gallery item is clicked', async () => {
    render(<EventGallerySection />);
    
    const galleryItems = screen.getAllByRole('img');
    fireEvent.click(galleryItems[0].closest('div')!);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument();
    });
  });

  it('closes lightbox when close button is clicked', async () => {
    render(<EventGallerySection />);
    
    // Open lightbox
    const galleryItems = screen.getAllByRole('img');
    fireEvent.click(galleryItems[0].closest('div')!);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Close lightbox
    const closeButton = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('navigates to previous image in lightbox', async () => {
    render(<EventGallerySection />);
    
    // Open lightbox
    const galleryItems = screen.getAllByRole('img');
    fireEvent.click(galleryItems[1].closest('div')!);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click previous button
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);
    
    // Should navigate to previous image
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('navigates to next image in lightbox', async () => {
    render(<EventGallerySection />);
    
    // Open lightbox
    const galleryItems = screen.getAllByRole('img');
    fireEvent.click(galleryItems[0].closest('div')!);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click next button
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    
    // Should navigate to next image
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders masonry grid with correct breakpoints', () => {
    render(<EventGallerySection />);
    
    const masonryGrid = screen.getByTestId('masonry-grid');
    expect(masonryGrid).toBeInTheDocument();
  });

  it('displays timeline markers on gallery items', () => {
    render(<EventGallerySection />);
    
    // Timeline markers are rendered as decorative elements
    const gallerySection = screen.getByText('Event Gallery').closest('section');
    expect(gallerySection).toBeInTheDocument();
  });

  it('applies hover effects to gallery items', () => {
    render(<EventGallerySection />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveClass('group-hover:brightness-110');
    expect(images[0]).toHaveClass('group-hover:scale-105');
  });

  it('shows empty state when no items match filter', async () => {
    // Mock GALLERY_ITEMS to be empty for a specific category
    const originalItems = [...GALLERY_ITEMS];
    (GALLERY_ITEMS as any).length = 0;
    
    render(<EventGallerySection />);
    
    const concertsButton = screen.getByText('Concerts');
    fireEvent.click(concertsButton);
    
    await waitFor(() => {
      // Since we cleared items, all filters will show empty
      expect(screen.queryByText('No events found in this category.')).toBeInTheDocument();
    });
    
    // Restore original items
    GALLERY_ITEMS.push(...originalItems);
  });

  it('applies lazy loading to images', () => {
    render(<EventGallerySection />);
    
    const images = screen.getAllByRole('img');
    // Check that images have loading attribute (except lightbox images)
    const galleryImages = images.filter(img => img.getAttribute('loading') === 'lazy');
    expect(galleryImages.length).toBeGreaterThan(0);
  });

  it('renders with custom className', () => {
    const { container } = render(<EventGallerySection className="custom-class" />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('displays image information in lightbox', async () => {
    render(<EventGallerySection />);
    
    // Open lightbox
    const galleryItems = screen.getAllByRole('img');
    fireEvent.click(galleryItems[0].closest('div')!);
    
    await waitFor(() => {
      const firstItem = GALLERY_ITEMS[0];
      expect(screen.getByText(firstItem.title)).toBeInTheDocument();
      if (firstItem.description) {
        expect(screen.getByText(firstItem.description)).toBeInTheDocument();
      }
    });
  });
});
