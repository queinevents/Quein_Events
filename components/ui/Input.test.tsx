import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Name" />);
    const label = screen.getByText(/name/i);
    expect(label).toBeInTheDocument();
  });

  it("associates label with input using htmlFor", () => {
    render(<Input label="Email" id="email-input" />);
    const label = screen.getByText(/email/i);
    const input = screen.getByLabelText(/email/i);
    expect(label).toHaveAttribute("for", "email-input");
    expect(input).toHaveAttribute("id", "email-input");
  });

  it("generates id from label when id is not provided", () => {
    render(<Input label="Full Name" />);
    const input = screen.getByLabelText(/full name/i);
    expect(input).toHaveAttribute("id", "input-full-name");
  });

  it("shows required asterisk when required prop is true", () => {
    render(<Input label="Email" required />);
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass("text-red-500");
  });

  it("renders with text type by default", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with email type", () => {
    render(<Input type="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  it("renders with tel type", () => {
    render(<Input type="tel" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "tel");
  });

  it("displays error message when error prop is provided", () => {
    render(<Input label="Email" error="Invalid email address" />);
    const errorMessage = screen.getByText(/invalid email address/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });

  it("displays error icon when error is present", () => {
    render(<Input error="Error message" />);
    const errorMessage = screen.getByRole("alert");
    const icon = errorMessage.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("applies error styles to input when error is present", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-500");
  });

  it("applies error styles to label when error is present", () => {
    render(<Input label="Email" error="Invalid email" />);
    const label = screen.getByText(/email/i);
    expect(label).toHaveClass("text-red-500");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby to error id when error is present", () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByRole("textbox");
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBe("input-email-error");
  });

  it("displays helper text when provided", () => {
    render(<Input helperText="Enter your email address" />);
    const helperText = screen.getByText(/enter your email address/i);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-text-secondary");
  });

  it("does not display helper text when error is present", () => {
    render(
      <Input
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.queryByText(/helper text/i)).not.toBeInTheDocument();
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it("applies focus styles", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("focus:border-primary-purple", "focus:ring-2");
  });

  it("applies disabled styles when disabled", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
  });

  it("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("updates value when typing", () => {
    render(<Input />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("includes transition styles", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("transition-all", "duration-300");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies placeholder text", () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText(/enter your name/i);
    expect(input).toBeInTheDocument();
  });

  it("renders with dark theme background", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("bg-background-card");
  });
});
