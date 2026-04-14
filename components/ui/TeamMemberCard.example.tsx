import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import type { TeamMember } from '@/types';

/**
 * TeamMemberCard Component Examples
 * 
 * Demonstrates various use cases of the TeamMemberCard component
 */

// Example 1: Basic team member card
const basicMember: TeamMember = {
  id: 'example-1',
  name: 'Sarah Johnson',
  role: 'Event Director',
  bio: 'Sarah brings 10+ years of experience in orchestrating large-scale events. Her meticulous attention to detail and creative vision ensure every event exceeds expectations.',
  imageUrl: '/images/team/sarah-johnson.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    email: 'sarah@example.com',
  },
};

export function BasicTeamMemberCard() {
  return (
    <div className="max-w-sm">
      <TeamMemberCard member={basicMember} />
    </div>
  );
}

// Example 2: Team member without social links
const memberWithoutSocial: TeamMember = {
  id: 'example-2',
  name: 'Michael Chen',
  role: 'Technical Lead',
  bio: 'Michael is our technical mastermind, specializing in audio, lighting, and AV systems. His expertise ensures flawless technical execution for every event.',
  imageUrl: '/images/team/michael-chen.jpg',
};

export function TeamMemberCardWithoutSocial() {
  return (
    <div className="max-w-sm">
      <TeamMemberCard member={memberWithoutSocial} />
    </div>
  );
}

// Example 3: Grid of team member cards
const teamMembers: TeamMember[] = [
  {
    id: 'grid-1',
    name: 'Emma Wilson',
    role: 'Creative Designer',
    bio: 'Emma transforms concepts into stunning visual experiences with her innovative designs.',
    imageUrl: '/images/team/emma-wilson.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emmawilson',
      email: 'emma@example.com',
    },
  },
  {
    id: 'grid-2',
    name: 'David Martinez',
    role: 'Operations Manager',
    bio: 'David ensures seamless logistics and operations for all our events.',
    imageUrl: '/images/team/david-martinez.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidmartinez',
      email: 'david@example.com',
    },
  },
  {
    id: 'grid-3',
    name: 'Lisa Anderson',
    role: 'Client Relations',
    bio: 'Lisa builds strong relationships with clients and ensures their vision comes to life.',
    imageUrl: '/images/team/lisa-anderson.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lisaanderson',
      email: 'lisa@example.com',
    },
  },
];

export function TeamMemberCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

// Example 4: Custom styled team member card
export function CustomStyledTeamMemberCard() {
  return (
    <div className="max-w-sm">
      <TeamMemberCard
        member={basicMember}
        className="shadow-2xl shadow-primary-purple/20"
      />
    </div>
  );
}

// Example 5: Team member card with only email
const memberWithEmailOnly: TeamMember = {
  id: 'example-5',
  name: 'Robert Taylor',
  role: 'Audio Engineer',
  bio: 'Robert specializes in professional sound engineering for events of all sizes.',
  imageUrl: '/images/team/robert-taylor.jpg',
  socialLinks: {
    email: 'robert@example.com',
  },
};

export function TeamMemberCardEmailOnly() {
  return (
    <div className="max-w-sm">
      <TeamMemberCard member={memberWithEmailOnly} />
    </div>
  );
}

// Example 6: Team member card with only LinkedIn
const memberWithLinkedInOnly: TeamMember = {
  id: 'example-6',
  name: 'Jennifer Lee',
  role: 'Marketing Director',
  bio: 'Jennifer leads our marketing efforts and brand strategy.',
  imageUrl: '/images/team/jennifer-lee.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/jenniferlee',
  },
};

export function TeamMemberCardLinkedInOnly() {
  return (
    <div className="max-w-sm">
      <TeamMemberCard member={memberWithLinkedInOnly} />
    </div>
  );
}
