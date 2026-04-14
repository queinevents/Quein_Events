import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const hasError = !!error;

    const baseStyles =
      "w-full px-4 py-3 rounded-lg bg-background-card border-2 text-text-primary placeholder:text-text-secondary transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const stateStyles = hasError
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-text-secondary/30 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              hasError ? "text-red-500" : "text-text-primary"
            )}
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(baseStyles, stateStyles, className)}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
