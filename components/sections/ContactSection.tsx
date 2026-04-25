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
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setShowSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      className="relative py-20 md:py-28 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary-gold/5 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary-blue/5 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Artistic Section Heading */}
        <FadeIn delay={0} duration={600}>
          <div className="relative text-center mb-20">
            {/* Large Background Text */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <h2 
                className="text-[100px] md:text-[140px] lg:text-[180px] font-black leading-none select-none whitespace-nowrap"
                style={{
                  WebkitTextStroke: '2px rgba(245, 158, 11, 0.08)',
                  color: 'transparent',
                  letterSpacing: '0.05em',
                }}
              >
                CONTACT
              </h2>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 pt-16 md:pt-20">
              <p className="text-primary-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
                Let&apos;s Connect
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get In <span className="text-primary-gold">Touch</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Ready to create an unforgettable event? Contact us today to discuss your vision
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
                <div className="w-2 h-2 rounded-full bg-primary-gold" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Contact Form and Info Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form with Artistic Container */}
          <FadeIn delay={100} duration={600}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-primary-blue/10 rounded-3xl blur-xl opacity-50" />
              
              {/* Form Container */}
              <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 p-6 md:p-8 rounded-3xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary-gold rounded-full" />
                  Send Us a Message
                </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
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
          </div>
          </FadeIn>

          {/* Contact Information with Artistic Cards */}
          <FadeIn delay={200} duration={600}>
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-blue rounded-full" />
                Contact Information
              </h3>

              {/* Email Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 hover:border-primary-gold/50 transition-all duration-300">
                  <div className="w-11 h-11 bg-primary-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-primary-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-primary-gold transition-colors duration-300">
                      Email
                    </h4>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white/70 hover:text-primary-gold transition-colors duration-300 text-sm"
                    >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

              {/* Phone Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 hover:border-primary-blue/50 transition-all duration-300">
                  <div className="w-11 h-11 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-primary-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-primary-blue transition-colors duration-300">
                      Phone
                    </h4>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                      className="text-white/70 hover:text-primary-blue transition-colors duration-300 text-sm"
                    >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

              {/* Address Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 hover:border-primary-gold/50 transition-all duration-300">
                  <div className="w-11 h-11 bg-primary-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-primary-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-primary-gold transition-colors duration-300">
                      Address
                    </h4>
                    <p className="text-white/70 text-sm">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="relative mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary-gold/5 to-primary-blue/5 border border-white/5">
                <p className="text-white/60 text-xs text-center italic">
                  &quot;We&apos;re here to make your event extraordinary. Reach out and let&apos;s start planning!&quot;
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
