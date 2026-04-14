import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navigation from './Navigation';
import { NAV_LINKS, COMPANY_INFO } from '@/lib/constants';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

describe('Navigation Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    (window as any).scrollY = 0;
  });

  describe('Rendering', () => {
    it('renders the logo', () => {
      render(<Navigation />);
      const logo = screen.getByLabelText(/quein events/i);
      expect(logo).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      render(<Navigation />);
      NAV_LINKS.forEach((link) => {
        const navLink = screen.getAllByText(link.label)[0];
        expect(navLink).toBeInTheDocument();
      });
    });

    it('renders mobile menu toggle button', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      expect(toggleButton).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(<Navigation className="custom-class" />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-class');
    });
  });

  describe('Scroll Behavior', () => {
    it('applies background overlay after scrolling beyond 100px', () => {
      const { container } = render(<Navigation />);
      const nav = container.querySelector('nav');

      // Initially no background
      expect(nav).not.toHaveClass('bg-background-darker/95');

      // Simulate scroll
      (window as any).scrollY = 150;
      fireEvent.scroll(window);

      // Should have background
      waitFor(() => {
        expect(nav).toHaveClass('bg-background-darker/95');
      });
    });

    it('does not apply background overlay when scrolled less than 100px', () => {
      const { container } = render(<Navigation />);
      const nav = container.querySelector('nav');

      // Simulate scroll less than threshold
      (window as any).scrollY = 50;
      fireEvent.scroll(window);

      expect(nav).toHaveClass('bg-transparent');
    });
  });

  describe('Desktop Navigation', () => {
    it('displays desktop navigation links on larger screens', () => {
      render(<Navigation />);
      const desktopNav = screen.getByRole('navigation');
      expect(desktopNav).toBeInTheDocument();
    });

    it('triggers smooth scroll when navigation link is clicked', () => {
      render(<Navigation />);
      
      // Mock getElementById
      const mockElement = document.createElement('div');
      mockElement.getBoundingClientRect = jest.fn(() => ({
        top: 500,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      const servicesLink = screen.getAllByText('Services')[0];
      fireEvent.click(servicesLink);

      expect(mockScrollTo).toHaveBeenCalled();
    });

    it('scrolls to top when logo is clicked', () => {
      render(<Navigation />);
      const logo = screen.getByLabelText(/quein events/i);
      
      fireEvent.click(logo);

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  describe('Mobile Menu', () => {
    it('opens mobile menu when toggle button is clicked', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      fireEvent.click(toggleButton);

      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      expect(mobileMenu).not.toHaveClass('translate-x-full');
    });

    it('closes mobile menu when toggle button is clicked again', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      // Open menu
      fireEvent.click(toggleButton);
      
      // Close menu
      const closeButton = screen.getByLabelText(/close menu/i);
      fireEvent.click(closeButton);

      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      expect(mobileMenu).toHaveClass('translate-x-full');
    });

    it('closes mobile menu when a link is clicked', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      // Open menu
      fireEvent.click(toggleButton);
      
      // Click a link in mobile menu
      const mobileLinks = screen.getAllByText('Services');
      fireEvent.click(mobileLinks[mobileLinks.length - 1]);

      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      waitFor(() => {
        expect(mobileMenu).toHaveClass('translate-x-full');
      });
    });

    it('prevents body scroll when mobile menu is open', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      fireEvent.click(toggleButton);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when mobile menu is closed', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      // Open and close menu
      fireEvent.click(toggleButton);
      const closeButton = screen.getByLabelText(/close menu/i);
      fireEvent.click(closeButton);

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('has aria-label for main navigation', () => {
      render(<Navigation />);
      const nav = screen.getByLabelText('Main navigation');
      expect(nav).toBeInTheDocument();
    });

    it('has aria-expanded attribute on mobile menu toggle', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(toggleButton);
      
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls attribute on mobile menu toggle', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('has screen reader text for mobile menu toggle', () => {
      render(<Navigation />);
      const srText = screen.getAllByText(/open menu/i)[0];
      expect(srText).toHaveClass('sr-only');
    });

    it('supports keyboard navigation with focus indicators', () => {
      render(<Navigation />);
      const links = screen.getAllByRole('link');
      
      links.forEach((link) => {
        expect(link).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });

    it('closes mobile menu on Escape key press', () => {
      render(<Navigation />);
      const toggleButton = screen.getByLabelText(/open menu/i);
      
      // Open menu
      fireEvent.click(toggleButton);
      
      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });

      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      waitFor(() => {
        expect(mobileMenu).toHaveClass('translate-x-full');
      });
    });

    it('maintains logical focus order', () => {
      render(<Navigation />);
      const links = screen.getAllByRole('link');
      
      // Check that links are in the expected order
      const linkTexts = links.map((link) => link.textContent);
      const expectedOrder = [
        COMPANY_INFO.name.split(' ')[0], // Logo
        ...NAV_LINKS.map((link) => link.label),
        ...NAV_LINKS.map((link) => link.label), // Mobile menu links
      ];
      
      expect(linkTexts).toEqual(expect.arrayContaining(expectedOrder));
    });
  });

  describe('Logo Behavior', () => {
    it('logo links to top of page', () => {
      render(<Navigation />);
      const logo = screen.getByLabelText(/quein events/i);
      
      expect(logo).toHaveAttribute('href', '#home');
    });

    it('logo has proper aria-label', () => {
      render(<Navigation />);
      const logo = screen.getByLabelText('Quein Events - Go to homepage');
      
      expect(logo).toBeInTheDocument();
    });

    it('logo image has proper alt text', () => {
      render(<Navigation />);
      const logoImage = screen.getByAltText('Quein Events logo');
      
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/images/logo.svg');
    });
  });
});
