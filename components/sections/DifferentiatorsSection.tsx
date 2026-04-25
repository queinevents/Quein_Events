'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations';
import { DIFFERENTIATORS } from '@/lib/constants';
import Image from 'next/image';

export default function DifferentiatorsSection() {
  return (
    <section
      id="differentiators"
      className="relative py-20 md:py-28 overflow-hidden bg-[#050505]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary-gold/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary-blue/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
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
                WHY CHOOSE
              </h2>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 pt-16 md:pt-20">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-primary-gold text-sm font-bold uppercase tracking-[0.3em] mb-4"
              >
                Our Differentiators
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="text-white">Why Choose </span>
                <span className="text-primary-gold">Quein</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
              >
                Seven compelling reasons why we&apos;re Qatar&apos;s most trusted event management company
              </motion.p>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '120px', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 bg-gradient-to-r from-transparent via-primary-gold to-transparent mx-auto mt-8"
              />
            </div>
          </div>
        </FadeIn>

        {/* Artistic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {DIFFERENTIATORS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 overflow-hidden transition-all duration-500 hover:border-primary-gold/50 hover:-translate-y-2">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/0 to-primary-blue/0 group-hover:from-primary-gold/5 group-hover:to-primary-blue/5 transition-all duration-500" />
                
                {/* Icon with Artistic Background */}
                <div className="relative mb-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-gold/20 to-primary-blue/20 p-4 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={item.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-contain brightness-0 invert opacity-90"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-gold/30 blur-md group-hover:bg-primary-gold/50 transition-all duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-gold transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-base text-white/70 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-gold/0 to-transparent group-hover:via-primary-gold/100 transition-all duration-500" />

                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 font-bold text-sm group-hover:bg-primary-gold/20 group-hover:text-primary-gold transition-all duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Floating Shadow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-gold/0 to-primary-blue/0 blur-xl opacity-0 group-hover:opacity-30 group-hover:from-primary-gold/20 group-hover:to-primary-blue/20 transition-all duration-500 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <FadeIn delay={800}>
          <div className="text-center mt-20">
            <p className="text-lg text-white/60 mb-6">
              Experience the Quein difference in your next event
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold/90 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-gold/30"
            >
              Start Your Journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </FadeIn> */}
      </div>
    </section>
  );
}
