/**
 * Button Component Usage Examples
 * 
 * This file demonstrates all the variants and states of the Button component.
 * Use these examples as a reference when implementing buttons throughout the website.
 */

import Button from "./Button";

export default function ButtonExamples() {
  return (
    <div className="p-8 space-y-8 bg-background-dark min-h-screen">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Button Component Examples
      </h1>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Loading States
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" loading>
            Loading Primary
          </Button>
          <Button variant="secondary" loading>
            Loading Secondary
          </Button>
          <Button variant="outline" loading>
            Loading Outline
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Disabled States
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </div>
      </section>

      {/* Size + Variant Combinations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Size + Variant Combinations
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
            <Button variant="primary" size="md">
              Medium Primary
            </Button>
            <Button variant="primary" size="lg">
              Large Primary
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="md">
              Medium Secondary
            </Button>
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm">
              Small Outline
            </Button>
            <Button variant="outline" size="md">
              Medium Outline
            </Button>
            <Button variant="outline" size="lg">
              Large Outline
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Interactive Example
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            onClick={() => alert("Primary button clicked!")}
          >
            Click Me
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log("Secondary button clicked")}
          >
            Log to Console
          </Button>
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Scroll to Top
          </Button>
        </div>
      </section>

      {/* Real-world Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Real-world Usage Examples
        </h2>
        <div className="space-y-4">
          <div className="p-6 bg-background-card rounded-lg">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Hero Section CTA
            </h3>
            <Button variant="primary" size="lg">
              Plan Your Event
            </Button>
          </div>
          <div className="p-6 bg-background-card rounded-lg">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Contact Form Submit
            </h3>
            <Button variant="primary" size="md" loading>
              Sending Message...
            </Button>
          </div>
          <div className="p-6 bg-background-card rounded-lg">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Navigation Actions
            </h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Learn More
              </Button>
              <Button variant="secondary" size="sm">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
