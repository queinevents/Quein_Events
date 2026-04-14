import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary-purple");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary-blue");
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-2", "border-primary-purple");
  });

  it("renders with small size", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-4", "py-2", "text-sm");
  });

  it("renders with medium size by default", () => {
    render(<Button>Medium Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-6", "py-3", "text-base");
  });

  it("renders with large size", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-8", "py-4", "text-lg");
  });

  it("shows loading spinner when loading prop is true", () => {
    render(<Button loading>Loading Button</Button>);
    const spinner = screen.getByRole("button").querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("disables button when loading", () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies disabled styles when disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Button
      </Button>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("includes hover and focus styles", () => {
    render(<Button>Hover Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-purple-600", "focus:ring-2");
  });

  it("includes transition styles", () => {
    render(<Button>Transition Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-all", "duration-300");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
