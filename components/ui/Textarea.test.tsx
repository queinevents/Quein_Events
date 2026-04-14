import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Textarea from "./Textarea";

describe("Textarea Component", () => {
  it("renders with default props", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Textarea label="Message" />);
    const label = screen.getByText(/message/i);
    expect(label).toBeInTheDocument();
  });

  it("associates label with textarea using htmlFor", () => {
    render(<Textarea label="Message" id="message-textarea" />);
    const label = screen.getByText(/message/i);
    const textarea = screen.getByLabelText(/message/i);
    expect(label).toHaveAttribute("for", "message-textarea");
    expect(textarea).toHaveAttribute("id", "message-textarea");
  });

  it("generates id from label when id is not provided", () => {
    render(<Textarea label="Your Message" />);
    const textarea = screen.getByLabelText(/your message/i);
    expect(textarea).toHaveAttribute("id", "textarea-your-message");
  });

  it("shows required asterisk when required prop is true", () => {
    render(<Textarea label="Message" required />);
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass("text-red-500");
  });

  it("renders with default 4 rows", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("renders with custom rows", () => {
    render(<Textarea rows={6} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "6");
  });

  it("applies vertical resize by default", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-y");
  });

  it("applies none resize when specified", () => {
    render(<Textarea resize="none" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-none");
  });

  it("applies horizontal resize when specified", () => {
    render(<Textarea resize="horizontal" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-x");
  });

  it("applies both resize when specified", () => {
    render(<Textarea resize="both" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize");
  });

  it("displays error message when error prop is provided", () => {
    render(<Textarea label="Message" error="Message is required" />);
    const errorMessage = screen.getByText(/message is required/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });

  it("displays error icon when error is present", () => {
    render(<Textarea error="Error message" />);
    const errorMessage = screen.getByRole("alert");
    const icon = errorMessage.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("applies error styles to textarea when error is present", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-red-500");
  });

  it("applies error styles to label when error is present", () => {
    render(<Textarea label="Message" error="Invalid message" />);
    const label = screen.getByText(/message/i);
    expect(label).toHaveClass("text-red-500");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby to error id when error is present", () => {
    render(<Textarea label="Message" error="Invalid message" />);
    const textarea = screen.getByRole("textbox");
    const errorId = textarea.getAttribute("aria-describedby");
    expect(errorId).toBe("textarea-message-error");
  });

  it("displays helper text when provided", () => {
    render(<Textarea helperText="Enter your message here" />);
    const helperText = screen.getByText(/enter your message here/i);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-text-secondary");
  });

  it("does not display helper text when error is present", () => {
    render(
      <Textarea
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.queryByText(/helper text/i)).not.toBeInTheDocument();
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it("applies focus styles", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("focus:border-primary-purple", "focus:ring-2");
  });

  it("applies disabled styles when disabled", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
  });

  it("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "test value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("updates value when typing", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "new value" } });
    expect(textarea.value).toBe("new value");
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  it("includes transition styles", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("transition-all", "duration-300");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("applies placeholder text", () => {
    render(<Textarea placeholder="Enter your message" />);
    const textarea = screen.getByPlaceholderText(/enter your message/i);
    expect(textarea).toBeInTheDocument();
  });

  it("renders with dark theme background", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("bg-background-card");
  });
});
