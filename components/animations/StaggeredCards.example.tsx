import { StaggeredCards } from './StaggeredCards';

/**
 * Example usage of StaggeredCards component
 * Demonstrates different animation variants and configurations
 */

// Example 1: Basic usage with default settings (slide-up animation)
export function BasicStaggeredCards() {
  const items = [
    { id: 1, title: 'Card 1', description: 'First card' },
    { id: 2, title: 'Card 2', description: 'Second card' },
    { id: 3, title: 'Card 3', description: 'Third card' },
  ];

  return (
    <StaggeredCards>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-6 bg-gray-800 rounded-lg border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </div>
      ))}
    </StaggeredCards>
  );
}

// Example 2: Fade animation with custom delays
export function FadeStaggeredCards() {
  const categories = [
    { id: 1, name: 'Concerts', count: 150 },
    { id: 2, name: 'Exhibitions', count: 80 },
    { id: 3, name: 'Conferences', count: 120 },
    { id: 4, name: 'Weddings', count: 200 },
  ];

  return (
    <StaggeredCards
      animation="fade"
      baseDelay={200}
      staggerDelay={150}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-8 bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl text-center"
        >
          <h4 className="text-2xl font-bold text-white mb-2">{category.name}</h4>
          <p className="text-purple-300">{category.count} events</p>
        </div>
      ))}
    </StaggeredCards>
  );
}

// Example 3: Scale animation with grid layout
export function ScaleStaggeredCards() {
  const services = [
    { id: 1, icon: '🎵', title: 'Audio Systems', description: 'Professional sound' },
    { id: 2, icon: '💡', title: 'Lighting Design', description: 'Creative lighting' },
    { id: 3, icon: '📺', title: 'LED Screens', description: 'High-resolution displays' },
    { id: 4, icon: '🎭', title: 'Stage Construction', description: 'Custom stages' },
    { id: 5, icon: '🔧', title: 'Truss & Rigging', description: 'Safe structures' },
    { id: 6, icon: '🎬', title: 'AV Contracting', description: 'Complete AV services' },
  ];

  return (
    <StaggeredCards
      animation="scale"
      baseDelay={0}
      staggerDelay={80}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((service) => (
        <div
          key={service.id}
          className="p-6 bg-gray-900 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-colors"
        >
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
          <p className="text-gray-400">{service.description}</p>
        </div>
      ))}
    </StaggeredCards>
  );
}

// Example 4: Event categories with asymmetric grid
export function EventCategoriesStaggered() {
  const categories = [
    { id: 1, title: 'Concerts', featured: true, image: '/concerts.jpg' },
    { id: 2, title: 'Exhibitions', featured: false, image: '/exhibitions.jpg' },
    { id: 3, title: 'Conferences', featured: false, image: '/conferences.jpg' },
    { id: 4, title: 'Weddings', featured: false, image: '/weddings.jpg' },
    { id: 5, title: 'Festivals', featured: false, image: '/festivals.jpg' },
  ];

  return (
    <StaggeredCards
      animation="slide-up"
      staggerDelay={100}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          className={`
            relative overflow-hidden rounded-xl group cursor-pointer
            ${category.featured ? 'md:col-span-2 md:row-span-2' : ''}
          `}
        >
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">{category.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </StaggeredCards>
  );
}

// Example 5: Team members with staggered cards
export function TeamMembersStaggered() {
  const team = [
    { id: 1, name: 'John Doe', role: 'Founder & CEO', bio: 'Event industry veteran' },
    { id: 2, name: 'Jane Smith', role: 'Event Director', bio: 'Creative visionary' },
    { id: 3, name: 'Mike Johnson', role: 'Technical Lead', bio: 'AV expert' },
    { id: 4, name: 'Sarah Williams', role: 'Operations Manager', bio: 'Logistics pro' },
  ];

  return (
    <StaggeredCards
      animation="slide-up"
      baseDelay={100}
      staggerDelay={120}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {team.map((member) => (
        <div
          key={member.id}
          className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
        >
          <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500" />
          <div className="p-6">
            <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
            <p className="text-purple-400 text-sm mb-2">{member.role}</p>
            <p className="text-gray-400 text-sm">{member.bio}</p>
          </div>
        </div>
      ))}
    </StaggeredCards>
  );
}

// Example 6: Statistics with staggered animation
export function StatisticsStaggered() {
  const stats = [
    { id: 1, value: '15+', label: 'Years Experience', icon: '📅' },
    { id: 2, value: '2000+', label: 'Events Completed', icon: '✅' },
    { id: 3, value: '200+', label: 'Happy Clients', icon: '👥' },
  ];

  return (
    <StaggeredCards
      animation="scale"
      baseDelay={0}
      staggerDelay={100}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="text-center p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl"
        >
          <div className="text-5xl mb-4">{stat.icon}</div>
          <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-gray-400 text-lg">{stat.label}</div>
        </div>
      ))}
    </StaggeredCards>
  );
}
