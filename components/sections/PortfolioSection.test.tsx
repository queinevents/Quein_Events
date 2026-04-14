import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PortfolioSection from "./PortfolioSection";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock the animation components
jest.mock("@/components/animations", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ImageZoom: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("PortfolioSection Component", () => {
  beforeEach(() => {
    // Mock window.innerWidth for mobile/desktop detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("renders the portfolio section", () => {
    render(<PortfolioSection />);
    const section = document.getElementById("portfolio");
    expect(section).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<PortfolioSection />);
    const heading = screen.getByRole("heading", { name: /our portfolio/i });
    expect(heading).toBeInTheDocument();
  });

  it("initially displays only 9 items on desktop", () => {
    render(<PortfolioSection />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeLessThanOrEqual(9);
  });

  it("displays Load More button when there are more items", () => {
    render(<PortfolioSection />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it("shows loading state when Load More is clicked", async () => {
    render(<PortfolioSection />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    
    fireEvent.click(loadMoreButton);
    
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });

  it("loads more items when Load More button is clicked", async () => {
    render(<PortfolioSection />);
    const initialImages = screen.getAllByRole("img");
    const initialCount = initialImages.length;
    
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    fireEvent.click(loadMoreButton);
    
    await waitFor(() => {
      const updatedImages = screen.getAllByRole("img");
      expect(updatedImages.length).toBeGreaterThan(initialCount);
    }, { timeout: 2000 });
  });

  it("hides Load More button when all items are displayed", async () => {
    render(<PortfolioSection />);
    
    // Click Load More until all items are loaded
    while (screen.queryByRole("button", { name: /load more/i })) {
      const loadMoreButton = screen.getByRole("button", { name: /load more/i });
      fireEvent.click(loadMoreButton);
      await waitFor(() => {
        expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument();
      }, { timeout: 2000 });
    }
    
    // Check for "All events displayed" message
    expect(screen.getByText(/all events displayed/i)).toBeInTheDocument();
  });

  it("displays gold gradient on Load More button", () => {
    render(<PortfolioSection />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    expect(loadMoreButton).toHaveStyle({
      backgroundImage: 'linear-gradient(135deg, #F59E0B, #D97706)',
    });
  });

  it("renders filter buttons", () => {
    render(<PortfolioSection />);
    expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /private events/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /exhibitions/i })).toBeInTheDocument();
  });

  it("filters items when filter button is clicked", () => {
    render(<PortfolioSection />);
    const exhibitionFilter = screen.getByRole("tab", { name: /exhibitions/i });
    
    fireEvent.click(exhibitionFilter);
    
    // Should reset to initial page size after filtering
    const images = screen.getAllByRole("img");
    expect(images.length).toBeLessThanOrEqual(9);
  });

  it("uses responsive grid layout", () => {
    render(<PortfolioSection />);
    const grid = screen.getByRole("heading", { name: /our portfolio/i }).parentElement?.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
  });

  it("applies lazy loading to images", () => {
    render(<PortfolioSection />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("loading", "lazy");
    });
  });

  it("sets correct aspect ratio for portfolio cards", () => {
    render(<PortfolioSection />);
    const cards = document.querySelectorAll('[style*="aspect-ratio"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it("displays hover overlay on mouse enter", () => {
    render(<PortfolioSection />);
    const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
    
    if (firstCard) {
      fireEvent.mouseEnter(firstCard);
      const overlay = firstCard.querySelector(".absolute.inset-0");
      expect(overlay).toBeInTheDocument();
    }
  });

  it("hides overlay on mouse leave", () => {
    render(<PortfolioSection />);
    const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
    
    if (firstCard) {
      fireEvent.mouseEnter(firstCard);
      fireEvent.mouseLeave(firstCard);
      const overlay = firstCard.querySelector(".absolute.inset-0");
      expect(overlay).toHaveStyle({ opacity: 0 });
    }
  });

  it("displays event title in hover overlay", () => {
    render(<PortfolioSection />);
    const titles = PORTFOLIO_ITEMS.slice(0, 9).map(item => item.title);
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("displays event category in hover overlay", () => {
    render(<PortfolioSection />);
    const categories = PORTFOLIO_ITEMS.slice(0, 9).map(item => item.category);
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("handles image error with placeholder fallback", () => {
    render(<PortfolioSection />);
    const firstImage = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`);
    
    // Trigger error event
    fireEvent.error(firstImage);
    
    // Check for placeholder text
    expect(screen.getByText(/image coming soon/i)).toBeInTheDocument();
  });

  it("displays placeholder icon when image fails to load", () => {
    render(<PortfolioSection />);
    const firstImage = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`);
    
    // Trigger error event
    fireEvent.error(firstImage);
    
    // Check for emoji icon
    expect(screen.getByText("🎭")).toBeInTheDocument();
  });

  it("has section id 'portfolio'", () => {
    render(<PortfolioSection />);
    const section = document.getElementById("portfolio");
    expect(section).toBeInTheDocument();
  });

  it("has proper spacing with padding", () => {
    render(<PortfolioSection />);
    const section = document.getElementById("portfolio");
    expect(section).toHaveClass("py-12");
  });

  it("applies transition duration of 300ms to overlay", () => {
    render(<PortfolioSection />);
    const overlay = document.querySelector(".transition-opacity.duration-300");
    expect(overlay).toBeInTheDocument();
  });

  it("displays spinner icon in loading state", () => {
    render(<PortfolioSection />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    
    fireEvent.click(loadMoreButton);
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it("disables Load More button during loading", () => {
    render(<PortfolioSection />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    
    fireEvent.click(loadMoreButton);
    
    expect(loadMoreButton).toBeDisabled();
  });

  describe("Lightbox Modal", () => {
    it("opens lightbox when portfolio card is clicked", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        // Check for lightbox modal
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
      }
    });

    it("displays full-size image in lightbox", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        // Check for priority image in lightbox
        const lightboxImage = screen.getAllByRole("img").find(img => 
          img.getAttribute("src")?.includes(PORTFOLIO_ITEMS[0].imageUrl)
        );
        expect(lightboxImage).toBeInTheDocument();
      }
    });

    it("displays event details in lightbox", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        // Check for title in lightbox
        const title = screen.getByText(PORTFOLIO_ITEMS[0].title);
        expect(title).toBeInTheDocument();
      }
    });

    it("closes lightbox when close button is clicked", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const closeButton = screen.getByLabelText(/close lightbox/i);
        fireEvent.click(closeButton);
        
        // Dialog should be removed
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      }
    });

    it("closes lightbox when Escape key is pressed", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const dialog = screen.getByRole("dialog");
        fireEvent.keyDown(dialog, { key: 'Escape' });
        
        // Dialog should be removed
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      }
    });

    it("navigates to previous image when left arrow is pressed", () => {
      render(<PortfolioSection />);
      const secondCard = screen.getByAltText(`${PORTFOLIO_ITEMS[1].title} - ${PORTFOLIO_ITEMS[1].category} event`).closest("div");
      
      if (secondCard) {
        fireEvent.click(secondCard);
        
        const dialog = screen.getByRole("dialog");
        fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
        
        // Should show first item
        expect(screen.getByText(PORTFOLIO_ITEMS[0].title)).toBeInTheDocument();
      }
    });

    it("navigates to next image when right arrow is pressed", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const dialog = screen.getByRole("dialog");
        fireEvent.keyDown(dialog, { key: 'ArrowRight' });
        
        // Should show second item
        expect(screen.getByText(PORTFOLIO_ITEMS[1].title)).toBeInTheDocument();
      }
    });

    it("navigates to previous image when prev button is clicked", () => {
      render(<PortfolioSection />);
      const secondCard = screen.getByAltText(`${PORTFOLIO_ITEMS[1].title} - ${PORTFOLIO_ITEMS[1].category} event`).closest("div");
      
      if (secondCard) {
        fireEvent.click(secondCard);
        
        const prevButton = screen.getByLabelText(/previous image/i);
        fireEvent.click(prevButton);
        
        // Should show first item
        expect(screen.getByText(PORTFOLIO_ITEMS[0].title)).toBeInTheDocument();
      }
    });

    it("navigates to next image when next button is clicked", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const nextButton = screen.getByLabelText(/next image/i);
        fireEvent.click(nextButton);
        
        // Should show second item
        expect(screen.getByText(PORTFOLIO_ITEMS[1].title)).toBeInTheDocument();
      }
    });

    it("wraps to last image when navigating prev from first image", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const prevButton = screen.getByLabelText(/previous image/i);
        fireEvent.click(prevButton);
        
        // Should show last item
        const lastItem = PORTFOLIO_ITEMS[PORTFOLIO_ITEMS.length - 1];
        expect(screen.getByText(lastItem.title)).toBeInTheDocument();
      }
    });

    it("wraps to first image when navigating next from last image", () => {
      render(<PortfolioSection />);
      const lastCard = screen.getByAltText(`${PORTFOLIO_ITEMS[PORTFOLIO_ITEMS.length - 1].title} - ${PORTFOLIO_ITEMS[PORTFOLIO_ITEMS.length - 1].category} event`).closest("div");
      
      if (lastCard) {
        fireEvent.click(lastCard);
        
        const nextButton = screen.getByLabelText(/next image/i);
        fireEvent.click(nextButton);
        
        // Should show first item
        expect(screen.getByText(PORTFOLIO_ITEMS[0].title)).toBeInTheDocument();
      }
    });

    it("has dark modal background with backdrop blur", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveStyle({
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(8px)',
        });
      }
    });

    it("has close button with gold accent and 48x48px size", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const closeButton = screen.getByLabelText(/close lightbox/i);
        expect(closeButton).toHaveStyle({
          width: '48px',
          height: '48px',
          border: '2px solid #F59E0B',
        });
      }
    });

    it("has navigation buttons with purple/blue accents", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const prevButton = screen.getByLabelText(/previous image/i);
        const nextButton = screen.getByLabelText(/next image/i);
        
        expect(prevButton).toHaveStyle({ border: '2px solid #8B5CF6' });
        expect(nextButton).toHaveStyle({ border: '2px solid #3B82F6' });
      }
    });

    it("prevents body scroll when lightbox is open", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        expect(document.body.style.overflow).toBe('hidden');
      }
    });

    it("restores body scroll when lightbox is closed", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        const closeButton = screen.getByLabelText(/close lightbox/i);
        fireEvent.click(closeButton);
        
        expect(document.body.style.overflow).toBe('unset');
      }
    });

    it("displays category badge in event details", () => {
      render(<PortfolioSection />);
      const firstCard = screen.getByAltText(`${PORTFOLIO_ITEMS[0].title} - ${PORTFOLIO_ITEMS[0].category} event`).closest("div");
      
      if (firstCard) {
        fireEvent.click(firstCard);
        
        // Category should be displayed in lightbox
        const categoryBadges = screen.getAllByText(PORTFOLIO_ITEMS[0].category);
        expect(categoryBadges.length).toBeGreaterThan(0);
      }
    });
  });
});
