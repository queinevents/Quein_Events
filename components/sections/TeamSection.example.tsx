import React from 'react';
import TeamSection from './TeamSection';

/**
 * TeamSection Component Examples
 * 
 * Demonstrates the TeamSection component in different contexts
 */

// Example 1: Basic TeamSection (default usage)
export function BasicTeamSection() {
  return <TeamSection />;
}

// Example 2: TeamSection in a full page layout
export function TeamSectionInLayout() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Other sections would go here */}
      <TeamSection />
      {/* More sections would follow */}
    </div>
  );
}

// Example 3: TeamSection with custom spacing
export function TeamSectionCustomSpacing() {
  return (
    <div className="py-32">
      <TeamSection />
    </div>
  );
}

// Example 4: Multiple sections showing context
export function TeamSectionWithContext() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* About Section */}
      <section className="py-24 bg-background-darker">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            About Our Company
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We are a leading event management company with years of experience
            creating unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <section className="py-24 bg-background-darker">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ready to work with our talented team? Contact us today.
          </p>
        </div>
      </section>
    </div>
  );
}

// Example 5: TeamSection with scroll behavior
export function TeamSectionScrollDemo() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Spacer to demonstrate scroll-triggered animations */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Scroll Down
          </h1>
          <p className="text-text-secondary">
            See the team section animate into view
          </p>
          <div className="mt-8 animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-primary-purple"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}
