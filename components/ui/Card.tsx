import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string | React.ReactNode;
  iconAlt?: string;
  title: string;
  description: string;
  features?: string[];
  variant?: "default" | "hover";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      icon,
      iconAlt,
      title,
      description,
      features,
      variant = "hover",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "bg-background-card rounded-lg p-6 border border-text-secondary/10 transition-all duration-300";

    const variantStyles = {
      default: "",
      hover:
        "hover:shadow-2xl hover:shadow-primary-purple/20 hover:-translate-y-[8px] hover:border-primary-purple/30 will-change-transform",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-primary-purple/10">
            {typeof icon === "string" ? (
              <Image
                src={icon}
                alt={iconAlt || ""}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            ) : (
              icon
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold text-text-primary mb-3">
          {title}
        </h3>

        <p className="text-text-secondary leading-relaxed mb-4">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <svg
                  className="w-5 h-5 text-primary-purple flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
