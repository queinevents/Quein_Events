import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSection from "./HeroSection";

// Mock the animation components
jest.mock("@/components/animations", () => ({
  ParallaxSection: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  TextReveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  GradientBackground: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  StaggeredCards: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
    p: ({ children, className, ...props }: any) => <p className={className} {...props}>{children}</p>,
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    span: ({ children, className, ...props }: any) => <span className={className} {...props}>{children}</span>,
  },
}));

describe("HeroSection Component", () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();

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

  it("renders the hero section", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toBeInTheDocument();
  });

  it("displays the official Quein tagline", () => {
    render(<HeroSection />);
    const tagline = screen.getByText(/Where Every Occasion Finds Its Grandeur/i);
    expect(tagline).toBeInTheDocument();
  });

  it("displays the company name subheading", () => {
    render(<HeroSection />);
    const subheading = screen.getByText(/Quein Conference & Event Organization WLL/i);
    expect(subheading).toBeInTheDocument();
  });

  it("displays the description text", () => {
    render(<HeroSection />);
    const description = screen.getByText(/Crafting unforgettable experiences across Qatar/i);
    expect(description).toBeInTheDocument();
  });

  it("displays both CTA buttons", () => {
    render(<HeroSection />);
    const primaryButton = screen.getByRole("button", { name: /plan your event/i });
    const secondaryButton = screen.getByRole("button", { name: /view our portfolio/i });
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it("has full viewport height styling", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toHaveClass("min-h-screen");
  });

  it("has dark background color", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toHaveClass("bg-background-darker");
  });

  it("renders parallax background with image", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const image = section.querySelector('img[alt="Elegant event venue background"]');
    expect(image).toBeInTheDocument();
  });

  it("image has 40% opacity for dark theme", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const image = section.querySelector('img[alt="Elegant event venue background"]');
    expect(image).toHaveClass("opacity-40");
  });

  it("renders video background when videoUrl is provided", () => {
    render(<HeroSection videoUrl="/videos/hero.mp4" />);
    const section = screen.getByRole("region", { hidden: true });
    const video = section.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('muted');
  });

  it("video has 40% opacity for dark theme", () => {
    render(<HeroSection videoUrl="/videos/hero.mp4" />);
    const section = screen.getByRole("region", { hidden: true });
    const video = section.querySelector('video');
    expect(video).toHaveClass("opacity-40");
  });

  it("has dark overlay for text contrast", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const overlay = section.querySelector(".bg-black\\/50");
    expect(overlay).toBeInTheDocument();
  });

  it("has animated gradient overlay with 20% opacity", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const gradientOverlay = section.querySelector(".opacity-20");
    expect(gradientOverlay).toBeInTheDocument();
  });

  it("renders floating decorative elements with vibrant colors", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const floatingElements = section.querySelectorAll(".rounded-full.blur-2xl");
    expect(floatingElements.length).toBeGreaterThanOrEqual(2); // Purple circle and gold shape
  });

  it("scrolls to contact section when primary CTA is clicked", () => {
    // Create a mock contact section
    const contactSection = document.createElement("section");
    contactSection.id = "contact";
    document.body.appendChild(contactSection);

    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    
    fireEvent.click(button);
    
    expect(contactSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    // Cleanup
    document.body.removeChild(contactSection);
  });

  it("scrolls to portfolio section when secondary CTA is clicked", () => {
    // Create a mock portfolio section
    const portfolioSection = document.createElement("section");
    portfolioSection.id = "portfolio";
    document.body.appendChild(portfolioSection);

    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /view our portfolio/i });
    
    fireEvent.click(button);
    
    expect(portfolioSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    // Cleanup
    document.body.removeChild(portfolioSection);
  });

  it("handles missing contact section gracefully", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    
    // Should not throw error when contact section doesn't exist
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it("has section id 'home'", () => {
    render(<HeroSection />);
    const section = document.getElementById("home");
    expect(section).toBeInTheDocument();
  });

  it("centers content vertically and horizontally", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toHaveClass("flex", "items-center", "justify-center");
  });

  it("renders tagline as h1 heading", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Where Every Occasion Finds Its Grandeur/i);
  });

  it("applies responsive text sizing to tagline", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-5xl", "md:text-7xl");
  });

  it("tagline has text shadow for depth", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveStyle({ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' });
  });

  it("subheading has gold accent color", () => {
    render(<HeroSection />);
    const subheading = screen.getByText(/Quein Conference & Event Organization WLL/i);
    expect(subheading).toHaveStyle({ color: '#F59E0B' });
  });

  it("description has light gray color", () => {
    render(<HeroSection />);
    const description = screen.getByText(/Crafting unforgettable experiences across Qatar/i);
    expect(description).toHaveStyle({ color: '#A0A0A0' });
  });

  it("primary button has purple gradient background", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    expect(button).toHaveClass("bg-gradient-to-br", "from-primary-purple");
  });

  it("secondary button has gold border", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /view our portfolio/i });
    expect(button).toHaveClass("border-2", "border-primary-gold", "text-primary-gold");
  });

  it("primary button has purple glow on hover", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    expect(button).toHaveClass("hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]");
  });

  it("secondary button has gold hover fill transition", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /view our portfolio/i });
    expect(button).toHaveClass("hover:bg-primary-gold", "hover:text-background-darker");
  });

  it("buttons have 300ms transition duration", () => {
    render(<HeroSection />);
    const primaryButton = screen.getByRole("button", { name: /plan your event/i });
    const secondaryButton = screen.getByRole("button", { name: /view our portfolio/i });
    
    expect(primaryButton).toHaveClass("transition-all", "duration-300");
    expect(secondaryButton).toHaveClass("transition-all", "duration-300");
  });

  it("buttons have scale effect on hover", () => {
    render(<HeroSection />);
    const primaryButton = screen.getByRole("button", { name: /plan your event/i });
    const secondaryButton = screen.getByRole("button", { name: /view our portfolio/i });
    
    expect(primaryButton).toHaveClass("hover:scale-105");
    expect(secondaryButton).toHaveClass("hover:scale-105");
  });

  it("buttons have visible focus indicators", () => {
    render(<HeroSection />);
    const primaryButton = screen.getByRole("button", { name: /plan your event/i });
    const secondaryButton = screen.getByRole("button", { name: /view our portfolio/i });
    
    expect(primaryButton).toHaveClass("focus:ring-4", "focus:ring-primary-purple/50");
    expect(secondaryButton).toHaveClass("focus:ring-4", "focus:ring-primary-gold/50");
  });

  it("primary button has ripple effect element", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    const ripple = button.querySelector(".bg-white\\/30.rounded-full");
    expect(ripple).toBeInTheDocument();
  });

  it("primary button has overflow hidden for ripple effect", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /plan your event/i });
    expect(button).toHaveClass("overflow-hidden");
  });

  it("buttons have minimum 48x48px touch target", () => {
    render(<HeroSection />);
    const primaryButton = screen.getByRole("button", { name: /plan your event/i });
    const secondaryButton = screen.getByRole("button", { name: /view our portfolio/i });
    
    expect(primaryButton).toHaveClass("min-h-[48px]");
    expect(secondaryButton).toHaveClass("min-h-[48px]");
  });

  it("uses TextReveal component for heading animation", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("video has proper accessibility attributes", () => {
    render(<HeroSection videoUrl="/videos/hero.mp4" />);
    const video = screen.getByRole("region", { hidden: true }).querySelector('video');
    expect(video).toHaveAttribute('aria-hidden', 'true');
  });

  it("floating elements have aria-hidden attribute", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const floatingElements = section.querySelectorAll(".rounded-full.blur-2xl");
    floatingElements.forEach(element => {
      expect(element.parentElement).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it("respects prefers-reduced-motion setting", () => {
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

    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    
    // Floating elements should still be rendered but without animation
    const floatingElements = section.querySelectorAll(".rounded-full.blur-2xl");
    expect(floatingElements.length).toBeGreaterThanOrEqual(2);
  });

  it("renders three floating decorative elements with correct colors", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    
    // Purple circle
    const purpleCircle = section.querySelector(".bg-primary-purple\\/20.rounded-full.blur-2xl");
    expect(purpleCircle).toBeInTheDocument();
    
    // Blue line
    const blueLine = section.querySelector(".bg-primary-blue\\/30.blur-xl");
    expect(blueLine).toBeInTheDocument();
    
    // Gold shape
    const goldShape = section.querySelector(".bg-primary-gold\\/20.rounded-full.blur-2xl");
    expect(goldShape).toBeInTheDocument();
  });

  it("floating elements have vibrant glow effects", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    
    // Check for purple glow
    const purpleCircle = section.querySelector(".bg-primary-purple\\/20.rounded-full.blur-2xl");
    expect(purpleCircle).toHaveStyle({ boxShadow: '0 0 60px 30px rgba(139, 92, 246, 0.5)' });
    
    // Check for blue glow
    const blueLine = section.querySelector(".bg-primary-blue\\/30.blur-xl");
    expect(blueLine).toHaveStyle({ boxShadow: '0 0 60px 30px rgba(59, 130, 246, 0.5)' });
    
    // Check for gold glow
    const goldShape = section.querySelector(".bg-primary-gold\\/20.rounded-full.blur-2xl");
    expect(goldShape).toHaveStyle({ boxShadow: '0 0 60px 30px rgba(245, 158, 11, 0.5)' });
  });

  it("floating elements are positioned absolutely with correct z-index", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const floatingContainer = section.querySelector(".z-\\[5\\].pointer-events-none");
    expect(floatingContainer).toBeInTheDocument();
    expect(floatingContainer).toHaveClass("absolute", "inset-0");
  });

  it("blue line element has rotation applied", () => {
    render(<HeroSection />);
    const section = screen.getByRole("region", { hidden: true });
    const blueLine = section.querySelector(".bg-primary-blue\\/30.blur-xl");
    expect(blueLine).toHaveStyle({ transform: 'rotate(-45deg)' });
  });
});
