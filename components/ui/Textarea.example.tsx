/**
 * Textarea Component Usage Examples
 * 
 * This file demonstrates all the variants and states of the Textarea component.
 * Use these examples as a reference when implementing form textareas throughout the website.
 */

"use client";

import { useState } from "react";
import Textarea from "./Textarea";

export default function TextareaExamples() {
  const [messageValue, setMessageValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  return (
    <div className="p-8 space-y-8 bg-background-dark min-h-screen">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Textarea Component Examples
      </h1>

      {/* Basic Textareas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Basic Textareas</h2>
        <div className="max-w-md space-y-4">
          <Textarea placeholder="Enter your message..." />
          <Textarea label="Message" placeholder="Type your message here" />
          <Textarea label="Description" placeholder="Describe your event" />
        </div>
      </section>

      {/* Required Fields */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Required Fields
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea 
            label="Event Details" 
            required 
            placeholder="Tell us about your event"
          />
          <Textarea
            label="Special Requirements"
            required
            placeholder="Any special requirements or preferences"
          />
        </div>
      </section>

      {/* Different Row Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Different Row Sizes
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea 
            label="Small (3 rows)" 
            rows={3}
            placeholder="Short message"
          />
          <Textarea 
            label="Default (4 rows)" 
            placeholder="Default size message"
          />
          <Textarea 
            label="Large (6 rows)" 
            rows={6}
            placeholder="Longer message"
          />
          <Textarea 
            label="Extra Large (8 rows)" 
            rows={8}
            placeholder="Very long message"
          />
        </div>
      </section>

      {/* Resize Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Resize Behavior
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea 
            label="Vertical Resize (Default)" 
            resize="vertical"
            placeholder="Can be resized vertically"
            helperText="Drag the bottom-right corner to resize vertically"
          />
          <Textarea 
            label="No Resize" 
            resize="none"
            placeholder="Cannot be resized"
            helperText="This textarea has a fixed size"
          />
          <Textarea 
            label="Horizontal Resize" 
            resize="horizontal"
            placeholder="Can be resized horizontally"
            helperText="Drag the bottom-right corner to resize horizontally"
          />
          <Textarea 
            label="Both Directions" 
            resize="both"
            placeholder="Can be resized in both directions"
            helperText="Drag the bottom-right corner to resize freely"
          />
        </div>
      </section>

      {/* Error States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Error States
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Message"
            error="Message must be at least 10 characters"
            placeholder="Enter your message"
          />
          <Textarea
            label="Event Description"
            error="Please provide more details about your event"
            placeholder="Describe your event"
          />
          <Textarea
            label="Special Requirements"
            error="This field is required"
            placeholder="Any special requirements"
          />
        </div>
      </section>

      {/* Helper Text */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Helper Text
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Event Details"
            helperText="Provide as much detail as possible about your event"
            placeholder="Describe your event"
          />
          <Textarea
            label="Additional Notes"
            helperText="Include any special requests or requirements"
            placeholder="Any additional information"
          />
          <Textarea
            label="Venue Preferences"
            helperText="Let us know your preferred venue or location"
            placeholder="Venue preferences"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Disabled State
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Disabled Textarea"
            disabled
            value="This field is disabled and cannot be edited"
          />
          <Textarea
            label="Message"
            disabled
            placeholder="Disabled textarea"
          />
        </div>
      </section>

      {/* Interactive Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Interactive Example
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Your Message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder="Type your message..."
            helperText={`Character count: ${messageValue.length}`}
          />
          <Textarea
            label="Event Description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            placeholder="Describe your event..."
            error={
              descriptionValue && descriptionValue.length < 10
                ? "Description must be at least 10 characters"
                : undefined
            }
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
            Event Inquiry
          </h3>
          <Textarea
            label="Event Details"
            required
            rows={5}
            placeholder="Tell us about your event - type, date, number of guests, etc."
            helperText="Provide as much detail as possible"
          />
          <Textarea
            label="Special Requirements"
            rows={4}
            placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
            helperText="Optional - let us know if you have any special requests"
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
            Click on the textareas below to see the focus styles with purple ring
            and border
          </p>
          <Textarea label="Normal Focus" placeholder="Click to focus" />
          <Textarea
            label="Error Focus"
            error="This field has an error"
            placeholder="Click to focus"
          />
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Real-world Usage - Event Planning Form
        </h2>
        <div className="max-w-2xl p-6 bg-background-card rounded-lg space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">
            Plan Your Event with Quein
          </h3>
          <Textarea
            label="Event Description"
            required
            rows={5}
            resize="vertical"
            placeholder="Describe your event in detail - type of event, theme, expected number of guests, preferred date, etc."
            helperText="The more details you provide, the better we can serve you"
          />
          <Textarea
            label="Venue Preferences"
            rows={3}
            resize="vertical"
            placeholder="Do you have a venue in mind? Indoor or outdoor? Any specific location requirements?"
            helperText="Optional - we can help you find the perfect venue"
          />
          <Textarea
            label="Budget and Timeline"
            rows={3}
            resize="vertical"
            placeholder="What is your budget range? When do you need the event to take place?"
            helperText="This helps us provide accurate recommendations"
          />
          <Textarea
            label="Additional Notes"
            rows={4}
            resize="vertical"
            placeholder="Any other information you'd like to share - special requests, concerns, questions, etc."
            helperText="Optional - feel free to share anything else on your mind"
          />
        </div>
      </section>

      {/* Different Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Different Use Cases
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Feedback"
            rows={4}
            placeholder="Share your feedback with us"
            helperText="We value your opinion"
          />
          <Textarea
            label="Comments"
            rows={3}
            resize="none"
            placeholder="Leave a comment"
          />
          <Textarea
            label="Bio"
            rows={5}
            placeholder="Tell us about yourself"
            helperText="Maximum 500 characters"
          />
          <Textarea
            label="Address"
            rows={3}
            resize="none"
            placeholder="Enter your full address"
          />
        </div>
      </section>

      {/* Validation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Validation Example
        </h2>
        <div className="max-w-md space-y-4">
          <Textarea
            label="Message (Min 10 characters)"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder="Type at least 10 characters"
            error={
              messageValue.length > 0 && messageValue.length < 10
                ? `Please enter at least ${10 - messageValue.length} more characters`
                : undefined
            }
            helperText={
              messageValue.length >= 10
                ? "✓ Looks good!"
                : `${messageValue.length}/10 characters`
            }
          />
        </div>
      </section>
    </div>
  );
}
