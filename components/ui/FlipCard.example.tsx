/**
 * FlipCard Component Examples
 * 
 * Demonstrates various use cases of the FlipCard component with different
 * accent colors and service types.
 */

import { FlipCard } from './FlipCard';

export default function FlipCardExamples() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          FlipCard Component Examples
        </h1>
        
        <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">
          Interactive 3D flip cards with dark theme styling. Hover (desktop) or click (mobile) to flip.
          Fully keyboard accessible with Enter/Space support.
        </p>

        {/* Example 1: Purple Accent - Marriage Events */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Example 1: Purple Accent - Marriage Events
          </h2>
          <div className="max-w-sm mx-auto">
            <FlipCard
              icon="/icons/wedding.svg"
              iconAlt="Wedding icon"
              title="Marriage Events"
              description="Weddings where every moment becomes a cherished memory"
              capacity="50-1,000+ guests"
              accentColor="purple"
              features={[
                'Traditional and modern wedding setups',
                'Floral design and décor',
                'Photography and videography coordination',
                'Entertainment and music',
                'Complete wedding planning',
              ]}
              ctaText="Plan Your Dream Wedding"
              ctaHref="#contact"
            />
          </div>
        </section>

        {/* Example 2: Blue Accent - Exhibitions */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Example 2: Blue Accent - Exhibitions
          </h2>
          <div className="max-w-sm mx-auto">
            <FlipCard
              icon="/icons/exhibition.svg"
              iconAlt="Exhibition icon"
              title="Exhibitions"
              description="Trade shows and exhibitions that captivate and engage"
              capacity="100-10,000+ attendees"
              accentColor="blue"
              features={[
                'Custom booth design and construction',
                'LED screens and digital displays',
                'Audio-visual integration',
                'Lighting and stage setup',
                'On-site technical support',
              ]}
              ctaText="Explore Exhibition Services"
              ctaHref="#contact"
            />
          </div>
        </section>

        {/* Example 3: Gold Accent - Conferences */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Example 3: Gold Accent - Conferences
          </h2>
          <div className="max-w-sm mx-auto">
            <FlipCard
              icon="/icons/event-management.svg"
              iconAlt="Conference icon"
              title="Conferences"
              description="Professional conferences with seamless execution"
              capacity="50-5,000+ attendees"
              accentColor="gold"
              features={[
                'Venue selection and setup',
                'Registration and attendee management',
                'Audio-visual and presentation systems',
                'Breakout room coordination',
                'Catering and hospitality services',
              ]}
              ctaText="Organize Your Conference"
              ctaHref="#contact"
            />
          </div>
        </section>

        {/* Example 4: Grid Layout - Multiple Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Example 4: Grid Layout - Multiple Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FlipCard
              icon="/icons/wedding.svg"
              iconAlt="Private Events icon"
              title="Private Events"
              description="Intimate celebrations crafted with elegance and precision"
              capacity="10-500+ guests"
              accentColor="purple"
              features={[
                'Milestone celebrations and anniversaries',
                'Corporate gatherings and VIP events',
                'Customized themes and décor',
                'Premium catering and entertainment',
              ]}
              ctaText="Plan Your Private Event"
            />
            
            <FlipCard
              icon="/icons/exhibition.svg"
              iconAlt="Exhibition icon"
              title="Exhibitions"
              description="Trade shows and exhibitions that captivate and engage"
              capacity="100-10,000+ attendees"
              accentColor="blue"
              features={[
                'Custom booth design and construction',
                'LED screens and digital displays',
                'Audio-visual integration',
                'On-site technical support',
              ]}
              ctaText="Explore Exhibition Services"
            />
            
            <FlipCard
              icon="/icons/event-management.svg"
              iconAlt="Conference icon"
              title="Conferences"
              description="Professional conferences with seamless execution"
              capacity="50-5,000+ attendees"
              accentColor="gold"
              features={[
                'Venue selection and setup',
                'Registration and attendee management',
                'Audio-visual and presentation systems',
                'Catering and hospitality services',
              ]}
              ctaText="Organize Your Conference"
            />
          </div>
        </section>

        {/* Accessibility Notes */}
        <section className="mt-16 p-6 rounded-lg" style={{ backgroundColor: '#1A1A1A' }}>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Accessibility Features
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li>✓ Keyboard accessible: Use Tab to focus, Enter or Space to flip</li>
            <li>✓ Screen reader support: aria-label describes flip interaction</li>
            <li>✓ Live region: aria-live=&quot;polite&quot; announces state changes</li>
            <li>✓ Focus visible: Clear focus indicators for keyboard navigation</li>
            <li>✓ Semantic HTML: Proper role=&quot;button&quot; for interactive element</li>
            <li>✓ Mobile friendly: Click to flip on touch devices</li>
            <li>✓ Desktop friendly: Hover to flip on desktop devices</li>
          </ul>
        </section>

        {/* Design Specifications */}
        <section className="mt-8 p-6 rounded-lg" style={{ backgroundColor: '#1A1A1A' }}>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Design Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Colors</h3>
              <ul className="space-y-1 text-sm">
                <li>Card Background: #1A1A1A</li>
                <li>Border: #2A2A2A</li>
                <li>Title: #FFFFFF (24px)</li>
                <li>Description: #A0A0A0 (16px)</li>
                <li>Purple Glow: rgba(139, 92, 246, 0.5)</li>
                <li>Blue Glow: rgba(59, 130, 246, 0.5)</li>
                <li>Gold Glow: rgba(245, 158, 11, 0.5)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Animation</h3>
              <ul className="space-y-1 text-sm">
                <li>Transform: rotateY(180deg)</li>
                <li>Duration: 600ms</li>
                <li>Transform Style: preserve-3d</li>
                <li>Backface Visibility: hidden</li>
                <li>Icon Animation: 360° rotation + scale</li>
                <li>Capacity Badge: Pulse animation (2s loop)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
