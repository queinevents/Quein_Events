import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  it("renders card with title and description", () => {
    render(
      <Card
        title="Test Card"
        description="This is a test description"
      />
    );

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("renders card with icon as string", () => {
    render(
      <Card
        icon="/test-icon.svg"
        iconAlt="Test icon"
        title="Test Card"
        description="Test description"
      />
    );

    const icon = screen.getByAltText("Test icon");
    expect(icon).toHaveAttribute("src", "/test-icon.svg");
  });

  it("renders decorative icon with empty alt text when iconAlt not provided", () => {
    render(
      <Card
        icon="/test-icon.svg"
        title="Test Card"
        description="Test description"
      />
    );

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveAttribute("src", "/test-icon.svg");
    expect(icon).toHaveAttribute("alt", "");
  });

  it("renders card with features list", () => {
    const features = ["Feature 1", "Feature 2", "Feature 3"];
    
    render(
      <Card
        title="Test Card"
        description="Test description"
        features={features}
      />
    );

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it("renders card without features when not provided", () => {
    render(
      <Card
        title="Test Card"
        description="Test description"
      />
    );

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });

  it("applies hover variant styles by default", () => {
    const { container } = render(
      <Card
        title="Test Card"
        description="Test description"
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("hover:shadow-2xl");
    expect(card).toHaveClass("hover:-translate-y-[8px]");
  });

  it("applies default variant styles when specified", () => {
    const { container } = render(
      <Card
        title="Test Card"
        description="Test description"
        variant="default"
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass("hover:shadow-2xl");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card
        title="Test Card"
        description="Test description"
        className="custom-class"
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });

  it("renders with React node as icon", () => {
    const IconComponent = () => <div data-testid="custom-icon">Icon</div>;
    
    render(
      <Card
        icon={<IconComponent />}
        title="Test Card"
        description="Test description"
      />
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("has correct transition duration", () => {
    const { container } = render(
      <Card
        title="Test Card"
        description="Test description"
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("duration-300");
  });

  it("renders checkmark icons for features", () => {
    const features = ["Feature 1"];
    
    const { container } = render(
      <Card
        title="Test Card"
        description="Test description"
        features={features}
      />
    );

    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
