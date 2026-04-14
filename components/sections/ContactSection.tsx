'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FadeIn } from '@/components/animations';
import { Button, Input, Select, Textarea } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission (client-side confirmation only)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form data:', data);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      reset();
      setShowSuccess(false);
    }, 3000);
  };

  const eventTypeOptions = [
    { value: 'private-events', label: 'Private Events' },
    { value: 'exhibitions', label: 'Exhibitions' },
    { value: 'conferences', label: 'Conferences' },
    { value: 'marriage-events', label: 'Marriage Events' },
    { value: 'other', label: 'Other' },
  ];

  const guestCountOptions = [
    { value: '1-50', label: '1-50 guests' },
    { value: '51-100', label: '51-100 guests' },
    { value: '101-250', label: '101-250 guests' },
    { value: '251-500', label: '251-500 guests' },
    { value: '501-1000', label: '501-1000 guests' },
    { value: '1000+', label: '1000+ guests' },
  ];

  const hearAboutUsOptions = [
    { value: 'google-search', label: 'Google Search' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'referral', label: 'Referral from Friend/Colleague' },
    { value: 'previous-client', label: 'Previous Client' },
    { value: 'website', label: 'Company Website' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/95 to-[#0A0A0A]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} duration={600}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-4 md:mb-6">
            Get In Touch
          </h2>
          <p className="text-text-secondary text-base md:text-lg text-center max-w-2xl mx-auto mb-12 md:mb-16 px-2">
            Ready to create an unforgettable event? Contact us today to discuss your vision
          </p>
        </FadeIn>

        {/* Contact Form and Info Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <FadeIn delay={100} duration={600}>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 md:p-8 rounded-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                {/* Success Message */}
                {showSuccess && (
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">Message sent successfully! We&apos;ll get back to you soon.</span>
                    </div>
                  </div>
                )}

                {/* Name Field */}
                <Input
                  label="Name"
                  placeholder="Your full name"
                  error={errors.name?.message}
                  required
                  {...register('name')}
                />

                {/* Email Field */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />

                {/* Phone Field */}
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone?.message}
                  required
                  {...register('phone')}
                />

                {/* Event Type Field */}
                <Select
                  label="Event Type"
                  placeholder="Select an event type"
                  options={eventTypeOptions}
                  error={errors.eventType?.message}
                  required
                  {...register('eventType')}
                />

                {/* Event Date Field */}
                <Input
                  label="Event Date (Optional)"
                  type="date"
                  error={errors.eventDate?.message}
                  {...register('eventDate')}
                />

                {/* Guest Count Field */}
                <Select
                  label="Expected Guest Count (Optional)"
                  placeholder="Select guest count range"
                  options={guestCountOptions}
                  error={errors.guestCount?.message}
                  {...register('guestCount')}
                />

                {/* How did you hear about us Field */}
                <Select
                  label="How did you hear about us? (Optional)"
                  placeholder="Select an option"
                  options={hearAboutUsOptions}
                  error={errors.hearAboutUs?.message}
                  {...register('hearAboutUs')}
                />

                {/* Message Field */}
                <Textarea
                  label="Message"
                  placeholder="Tell us about your event..."
                  rows={5}
                  error={errors.message?.message}
                  required
                  {...register('message')}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </FadeIn>

          {/* Contact Information */}
          <FadeIn delay={200} duration={600}>
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
                Contact Information
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center flex-shrink-0 purple-glow">
                  <svg
                    className="w-6 h-6 text-[#8B5CF6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#A0A0A0] hover:text-[#8B5CF6] transition-colors duration-300"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0 blue-glow">
                  <svg
                    className="w-6 h-6 text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Phone
                  </h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="text-[#A0A0A0] hover:text-[#3B82F6] transition-colors duration-300"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center flex-shrink-0 gold-glow">
                  <svg
                    className="w-6 h-6 text-[#F59E0B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Address
                  </h4>
                  <p className="text-[#A0A0A0]">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
