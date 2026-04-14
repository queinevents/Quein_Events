import React from 'react';
import { TestimonialCard } from './TestimonialCard';

/**
 * TestimonialCard Component Examples
 * 
 * This file demonstrates various usage patterns for the TestimonialCard component.
 */

export default function TestimonialCardExamples() {
  return (
    <div className="space-y-12 p-8 bg-background-dark">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Basic Testimonial Card
        </h2>
        <TestimonialCard
          clientName="Sarah Al-Mansoori"
          clientRole="Marketing Director"
          clientCompany="Qatar Tech Solutions"
          quote="Quein transformed our annual conference into an unforgettable experience. Their attention to detail and seamless execution exceeded all expectations."
          rating={5}
          eventType="Conference"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Testimonial with Client Photo
        </h2>
        <TestimonialCard
          clientName="Mohammed Al-Thani"
          clientRole="CEO"
          clientCompany="Heritage Exhibitions"
          quote="Working with Quein on our cultural exhibition was a pleasure. They understood our vision perfectly and brought it to life with stunning lighting and stage design."
          rating={5}
          eventType="Exhibition"
          imageUrl="/images/testimonials/client-2.jpg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          4-Star Rating Testimonial
        </h2>
        <TestimonialCard
          clientName="Fatima Al-Kuwari"
          clientRole="Event Coordinator"
          clientCompany="Qatar Business Forum"
          quote="Professional, reliable, and creative - that's Quein in three words. They managed our corporate gala with 300+ VIP guests and everything ran like clockwork."
          rating={4}
          eventType="Corporate Event"
          imageUrl="/images/testimonials/client-5.jpg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Wedding Testimonial
        </h2>
        <TestimonialCard
          clientName="Layla Hassan"
          clientRole="Bride"
          clientCompany="Private Client"
          quote="Our wedding was absolutely magical thanks to Quein. From the elegant décor to the perfect lighting, every detail was executed flawlessly. Our guests are still talking about how beautiful everything was."
          rating={5}
          eventType="Wedding"
          imageUrl="/images/testimonials/client-3.jpg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Long Quote Example
        </h2>
        <TestimonialCard
          clientName="David Chen"
          clientRole="Festival Director"
          clientCompany="Doha Music Festival"
          quote="Quein handled the production for our three-day music festival with incredible professionalism. The sound quality was exceptional, the lighting design was breathtaking, and their team managed the complex logistics seamlessly. From load-in to load-out, everything was executed with precision and care. We'll definitely work with them again for future events."
          rating={5}
          eventType="Festival"
          imageUrl="/images/testimonials/client-4.jpg"
        />
      </div>
    </div>
  );
}
