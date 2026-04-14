'use client';

import { FadeIn } from '@/components/animations';
import { SERVICES } from '@/lib/constants';

export default function ServicesSection() {
  // Service images from Unsplash
  const serviceImages = {
    'private-events': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    'exhibitions': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    'conferences': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
    'marriage-events': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  };

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Elegant Section Heading */}
        <FadeIn delay={0} duration={600}>
          <div className="text-center mb-16">
            <p className="text-primary-gold text-sm font-medium tracking-wider uppercase mb-3">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Perfect <span className="text-primary-gold">Services</span>
            </h2>
            {/* Decorative dots and line */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
              </div>
              <div className="w-20 h-0.5 bg-primary-gold" />
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
