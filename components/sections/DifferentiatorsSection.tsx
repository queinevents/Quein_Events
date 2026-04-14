'use client';

import { FadeIn } from '@/components/animations';
import { DIFFERENTIATORS } from '@/lib/constants';
import Image from 'next/image';

export default function DifferentiatorsSection() {
  return (
    <section
      id="differentiators"
      className="relative py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-background-primary/80 to-background-primary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <FadeIn delay={0} duration={600}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Why Choose Quein
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto px-4" style={{ color: '#A0A0A0' }}>
              Seven reasons why we're Qatar's most trusted event management company
            </p>
          </div>
        </FadeIn>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {DIFFERENTIATORS.map((item, index) => (
            <FadeIn key={item.id} delay={index * 100} duration={600}>
              <div
                className="group relative p-6 rounded-lg transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                }}
              >
                {/* Icon */}
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-3">
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#A0A0A0' }}>
                  {item.description}
                </p>

                {/* Hover Effect Border */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
