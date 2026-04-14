/**
 * Input Component Usage Examples
 * 
 * This file demonstrates all the variants and states of the Input component.
 * Use these examples as a reference when implementing form inputs throughout the website.
 */

"use client";

import { useState } from "react";
import Input from "./Input";

export default function InputExamples() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  return (
    <div className="p-8 space-y-8 bg-background-dark min-h-screen">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Input Component Examples
      </h1>

      {/* Basic Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Basic Inputs</h2>
        <div className="max-w-md space-y-4">
          <Input placeholder="Enter text..." />
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Email" type="email" placeholder="your@email.com" />
          <Input label="Phone" type="tel" placeholder="+974 XXXX XXXX" />
        </div>
      </section>

      {/* Required Fields */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Required Fields
        </h2>
        <div className="max-w-md space-y-4">
          <Input label="Full Name" required placeholder="John Doe" />
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="john@example.com"
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="+974 1234 5678"
          />
        </div>
      </section>

      {/* Error States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Error States
        </h2>
        <div className="max-w-md space-y-4">
          <Input
            label="Name"
            error="Name must be at least 2 characters"
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            type="email"
            error="Please enter a valid email address"
            placeholder="your@email.com"
          />
          <Input
            label="Phone"
            type="tel"
            error="Please enter a valid phone number"
            placeholder="+974 XXXX XXXX"
          />
        </div>
      </section>

      {/* Helper Text */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Helper Text
        </h2>
        <div className="max-w-md space-y-4">
          <Input
            label="Username"
            helperText="Choose a unique username for your account"
            placeholder="username"
          />
          <Input
            label="Email"
            type="email"
            helperText="We'll never share your email with anyone"
            placeholder="your@email.com"
          />
          <Input
            label="Phone"
            type="tel"
            helperText="Include country code (e.g., +974)"
            placeholder="+974 XXXX XXXX"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Disabled State
        </h2>
        <div className="max-w-md space-y-4">
          <Input
            label="Disabled Input"
            disabled
            value="This field is disabled"
          />
          <Input
            label="Email"
            type="email"
            disabled
            placeholder="Disabled email input"
          />
        </div>
      </section>

      {/* Interactive Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Interactive Example
        </h2>
        <div className="max-w-md space-y-4">
          <Input
            label="Text Input"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type something..."
            helperText={`Character count: ${textValue.length}`}
          />
          <Input
            label="Email Input"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="your@email.com"
            error={
              emailValue && !emailValue.includes("@")
                ? "Please enter a valid email"
                : undefined
            }
          />
          <Input
            label="Phone Input"
            type="tel"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            placeholder="+974 XXXX XXXX"
            helperText="Enter your phone number with country code"
          />
        </div>
      </section>

      {/* Contact Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Contact Form Example
        </h2>
        <div className="max-w-md p-6 bg-background-card rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Get in Touch
          </h3>
          <Input
            label="Full Name"
            required
            placeholder="John Doe"
            helperText="Enter your first and last name"
          />
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="john@example.com"
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="+974 1234 5678"
            helperText="Include country code"
          />
        </div>
      </section>

      {/* Focus States Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Focus States
        </h2>
        <div className="max-w-md space-y-4">
          <p className="text-text-secondary text-sm">
            Click on the inputs below to see the focus styles with purple ring
            and border
          </p>
          <Input label="Normal Focus" placeholder="Click to focus" />
          <Input
            label="Error Focus"
            error="This field has an error"
            placeholder="Click to focus"
          />
        </div>
      </section>

      {/* Different Input Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Different Input Types
        </h2>
        <div className="max-w-md space-y-4">
          <Input label="Text" type="text" placeholder="Text input" />
          <Input label="Email" type="email" placeholder="email@example.com" />
          <Input label="Telephone" type="tel" placeholder="+974 XXXX XXXX" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Number" type="number" placeholder="123" />
          <Input label="URL" type="url" placeholder="https://example.com" />
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Real-world Usage - Event Inquiry Form
        </h2>
        <div className="max-w-2xl p-6 bg-background-card rounded-lg space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">
            Plan Your Event
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              required
              placeholder="John"
            />
            <Input
              label="Last Name"
              required
              placeholder="Doe"
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="john.doe@example.com"
            helperText="We'll send event details to this email"
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="+974 1234 5678"
            helperText="For quick follow-up on your inquiry"
          />
          <Input
            label="Company Name"
            placeholder="Your Company LLC"
            helperText="Optional - for corporate events"
          />
        </div>
      </section>
    </div>
  );
}
