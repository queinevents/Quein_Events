'use client';

import { FadeIn } from '@/components/animations';
import { SERVICES } from '@/lib/constants';

export default function ServicesSection() {
  // Service images from local assets
  const serviceImages = {
    'private-events': '/images/services/private-events.jpg',
    'exhibitions': '/images/services/exhibitions.jpg',
    'conferences': '/images/services/conferences.jpg',
    'marriage-events': '/images/services/marriage-events.jpg',
  };

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-gold/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-blue/5 blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Artistic Section Heading */}
        <FadeIn delay={0} duration={600}>
          <div className="relative text-center mb-20">
            {/* Large Background Text */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <h2 
                className="text-[100px] md:text-[140px] lg:text-[200px] font-black leading-none select-none whitespace-nowrap"
                style={{
                  WebkitTextStroke: '2px rgba(245, 158, 11, 0.08)',
                  color: 'transparent',
                  letterSpacing: '0.05em',
                }}
              >
                SERVICES
              </h2>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 pt-16 md:pt-20">
              <p className="text-primary-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Our Perfect <span className="text-primary-gold">Services</span>
              </h2>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
                <div className="w-2 h-2 rounded-full bg-primary-gold" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Overlapping Image Cards Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {SERVICES.map((service, index) => {
              const imageUrl = serviceImages[service.id as keyof typeof serviceImages];
              
              return (
                <FadeIn key={service.id} delay={index * 150} duration={600}>
                  <div 
                    className="group relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg cursor-pointer"
                    style={{
                      transform: index % 2 === 0 ? 'translateY(0)' : 'translateY(2rem)',
                    }}
                  >
                    {/* Image Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${imageUrl})`
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                        {service.title}
                      </h3>
                      
                      {/* Description - Shows on hover */}
                      <p className="text-white/80 text-sm leading-relaxed opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 mb-4">
                        {service.description.split('.')[0]}.
                      </p>

                      {/* Capacity Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs w-fit opacity-0 transform translate-y-4 transition-all duration-300 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {service.capacity}
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-primary-gold/0 group-hover:border-primary-gold/50 transition-all duration-300 rounded-lg" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* View All Services Button */}
        <FadeIn delay={600}>
          <div className="text-center mt-16">
            <button
              onClick={() => {
                const detailsSection = document.getElementById('services-details');
                if (detailsSection) {
                  detailsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold/90 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-gold/25"
            >
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
