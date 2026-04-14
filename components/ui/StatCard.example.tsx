import React from 'react';
import { StatCard } from './StatCard';

/**
 * StatCard Component Examples
 * 
 * Demonstrates various usage patterns for the StatCard component
 */

export default function StatCardExamples() {
  return (
    <div className="min-h-screen bg-background-darker p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Example 1: Basic StatCard */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Basic StatCard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={15}
              suffix="+"
              label="Years Experience"
              icon="/icons/calendar.svg"
            />
            <StatCard
              value={2000}
              suffix="+"
              label="Events Completed"
              icon="/icons/check-circle.svg"
              animationDuration={2500}
            />
            <StatCard
              value={200}
              suffix="+"
              label="Happy Clients"
              icon="/icons/users.svg"
            />
          </div>
        </section>

        {/* Example 2: Without Icons */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Without Icons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={500}
              suffix="+"
              label="Projects"
            />
            <StatCard
              value={98}
              suffix="%"
              label="Success Rate"
            />
            <StatCard
              value={50}
              suffix="+"
              label="Team Members"
            />
          </div>
        </section>

        {/* Example 3: With Prefix */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            With Prefix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={5}
              prefix="$"
              suffix="M+"
              label="Revenue Generated"
            />
            <StatCard
              value={1000}
              prefix=">"
              label="Attendees"
            />
            <StatCard
              value={24}
              suffix="/7"
              label="Support"
            />
          </div>
        </section>

        {/* Example 4: Different Animation Durations */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Different Animation Durations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={100}
              suffix="+"
              label="Fast Animation (1s)"
              animationDuration={1000}
            />
            <StatCard
              value={100}
              suffix="+"
              label="Normal Animation (2s)"
              animationDuration={2000}
            />
            <StatCard
              value={100}
              suffix="+"
              label="Slow Animation (3s)"
              animationDuration={3000}
            />
          </div>
        </section>

        {/* Example 5: Custom Styling */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Custom Styling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              value={999}
              suffix="+"
              label="Custom Border"
              className="border-2 border-primary-blue"
            />
            <StatCard
              value={888}
              suffix="+"
              label="Custom Background"
              className="bg-primary-purple/5"
            />
          </div>
        </section>

        {/* Example 6: Single Column Layout */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Single Column Layout
          </h2>
          <div className="max-w-md mx-auto">
            <StatCard
              value={10000}
              suffix="+"
              label="Total Impressions"
              icon="/icons/event-management.svg"
              animationDuration={3000}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
