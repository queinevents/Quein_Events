import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import {
  HeroSection,
  ServicesSection,
  StatisticsSection,
} from '@/components/sections';
import { PreloadManager } from '@/components/PreloadManager';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import VisionMissionSection from '@/components/sections/VisionMissionSection';

// Lazy load below-the-fold sections with loading states
const PortfolioSection = dynamic(
  () => import('@/components/sections/PortfolioSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

const DifferentiatorsSection = dynamic(
  () => import('@/components/sections/DifferentiatorsSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

const ServicesDetailSection = dynamic(
  () => import('@/components/sections').then(mod => ({ default: mod.ServicesDetailSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);

// const AboutSection = dynamic(
//   () => import('@/components/sections').then(mod => ({ default: mod.AboutSection })),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );

// const TestimonialsSection = dynamic(
//   () => import('@/components/sections').then(mod => ({ default: mod.TestimonialsSection })),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );

const NewsletterSection = dynamic(
  () => import('@/components/sections').then(mod => ({ default: mod.NewsletterSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);

// Lightweight loading skeleton for sections
function SectionSkeleton() {
  return (
    <div className="w-full py-24 bg-background-dark animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-12 bg-background-card rounded w-1/3 mx-auto mb-8"></div>
        <div className="h-6 bg-background-card rounded w-2/3 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-64 bg-background-card rounded"></div>
          <div className="h-64 bg-background-card rounded"></div>
          <div className="h-64 bg-background-card rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-background-primary min-h-screen">
      <PreloadManager belowFoldDelay={2000} useIdleCallback={true} />
      <Navigation />
      <main className="scroll-smooth">
        <section id="home">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="vision-mission">
          <VisionMissionSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="services-details">
          <ServicesDetailSection />
        </section>
        <section id="differentiators">
          <DifferentiatorsSection />
        </section>
        <section id="portfolio">
          <PortfolioSection />
        </section>
        <section id="statistics">
          <StatisticsSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        {/* Team section commented out - team members array is empty */}
        {/* <section id="team">
          <TeamSection />
        </section> */}
        <section id="newsletter">
          <NewsletterSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
