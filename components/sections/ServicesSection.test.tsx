import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServicesSection from "./ServicesSection";
import { SERVICES } from "@/lib/constants";

// Mock the animation components
jest.mock("@/components/animations", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the Card component
jest.mock("@/components/ui/Card", () => {
  return function MockCard({ icon, title, description, features }: any) {
    return (
      <div data-testid="service-card">
        {icon && <img src={icon} alt="" />}
        <h3>{title}</h3>
        <p>{description}</p>
        {features && (
          <ul>
            {features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
});

describe("ServicesSection Component", () => {
  it("renders the services section", () => {
    render(<ServicesSection />);
    const section = document.getElementById("services");
    expect(section).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<ServicesSection />);
    const heading = screen.getByRole("heading", { name: /our services/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays the section description", () => {
    render(<ServicesSection />);
    const description = screen.getByText(/from intimate gatherings to large-scale exhibitions/i);
    expect(description).toBeInTheDocument();
  });

  it("renders all three service categories", () => {
    render(<ServicesSection />);
    const serviceCards = screen.getAllByTestId("service-card");
    expect(serviceCards).toHaveLength(3);
  });

  it("displays Exhibitions & Conferences service", () => {
    render(<ServicesSection />);
    const service = SERVICES.find(s => s.id === "exhibitions-conferences");
    expect(screen.getByText(service!.title)).toBeInTheDocument();
    expect(screen.getByText(service!.description)).toBeInTheDocument();
  });

  it("displays Weddings & Private Events service", () => {
    render(<ServicesSection />);
    const service = SERVICES.find(s => s.id === "weddings-private");
    expect(screen.getByText(service!.title)).toBeInTheDocument();
    expect(screen.getByText(service!.description)).toBeInTheDocument();
  });

  it("displays End-to-End Event Management service", () => {
    render(<ServicesSection />);
    const service = SERVICES.find(s => s.id === "end-to-end");
    expect(screen.getByText(service!.title)).toBeInTheDocument();
    expect(screen.getByText(service!.description)).toBeInTheDocument();
  });

  it("displays capacity information for each service", () => {
    render(<ServicesSection />);
    SERVICES.forEach(service => {
      expect(screen.getByText(service.capacity)).toBeInTheDocument();
    });
  });

  it("displays service features for each service", () => {
    render(<ServicesSection />);
    SERVICES.forEach(service => {
      service.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  it("uses responsive grid layout", () => {
    render(<ServicesSection />);
    const section = document.getElementById("services");
    const grid = section?.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
  });

  it("has section id 'services'", () => {
    render(<ServicesSection />);
    const section = document.getElementById("services");
    expect(section).toBeInTheDocument();
  });

  it("applies dark background styling", () => {
    render(<ServicesSection />);
    const section = document.getElementById("services");
    expect(section).toHaveClass("bg-background-dark");
  });

  it("renders service icons", () => {
    render(<ServicesSection />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(SERVICES.length);
    
    SERVICES.forEach((service, index) => {
      expect(images[index]).toHaveAttribute("src", service.icon);
    });
  });

  it("highlights capacity with styled badge", () => {
    render(<ServicesSection />);
    const capacityBadges = screen.getAllByText(/attendees|guests|event types/i);
    expect(capacityBadges.length).toBeGreaterThanOrEqual(SERVICES.length);
  });
});
