import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaUserProfileCardComponent,
  UserProfile,
  ProfileConfig,
  ProfileAction,
  ProfileEvent,
} from '@aava/play-core';
import { AavaCardComponent } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-user-profile-card-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaUserProfileCardComponent,
    AavaCardComponent,
    AavaButtonComponent,
    AavaIconComponent,
  ],
  templateUrl: './app-user-profile-card.component.html',
  styleUrl: './app-user-profile-card.component.scss',
})
export class AppUserProfileCardComponent {
  selectedProfileIndex = 0;
  loading = false;
  disabled = false;
  lastEvent: ProfileEvent | null = null;

  // Sample user profiles
  profiles: UserProfile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate frontend developer with 8+ years of experience building modern web applications. Specialized in Angular, React, and TypeScript. Love creating intuitive user experiences and mentoring junior developers.',
      status: 'online',
      lastSeen: new Date(),
      joinDate: new Date('2020-03-15'),
      skills: [
        'Angular',
        'React',
        'TypeScript',
        'JavaScript',
        'CSS3',
        'HTML5',
        'Node.js',
        'Git',
        'Docker',
        'AWS',
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahdev',
        github: 'https://github.com/sarahjohnson',
        website: 'https://sarahjohnson.dev',
      },
      stats: {
        projects: 24,
        tasks: 156,
        contributions: 342,
        experience: 8,
      },
      preferences: {
        notifications: true,
        emailUpdates: true,
        publicProfile: true,
      },
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      phone: '+1 (555) 987-6543',
      bio: 'Product manager with a focus on user-centered design and data-driven decision making. Led successful product launches that increased user engagement by 40%.',
      status: 'away',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      joinDate: new Date('2019-08-22'),
      skills: [
        'Product Strategy',
        'User Research',
        'Data Analysis',
        'Agile',
        'JIRA',
        'Figma',
        'SQL',
        'A/B Testing',
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        twitter: 'https://twitter.com/michaelpm',
      },
      stats: {
        projects: 12,
        tasks: 89,
        contributions: 156,
        experience: 5,
      },
      preferences: {
        notifications: true,
        emailUpdates: false,
        publicProfile: true,
      },
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'UX Designer',
      department: 'Design',
      location: 'Austin, TX',
      bio: 'Creative UX designer passionate about creating meaningful user experiences. Specialized in user research, wireframing, and prototyping.',
      status: 'busy',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      joinDate: new Date('2021-01-10'),
      skills: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Figma',
        'Sketch',
        'Adobe Creative Suite',
        'Usability Testing',
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        website: 'https://emilyrodriguez.design',
      },
      stats: {
        projects: 18,
        tasks: 67,
        contributions: 123,
        experience: 4,
      },
      preferences: {
        notifications: false,
        emailUpdates: true,
        publicProfile: false,
      },
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Backend Engineer',
      department: 'Engineering',
      location: 'Seattle, WA',
      phone: '+1 (555) 456-7890',
      bio: 'Backend engineer with expertise in scalable systems and cloud architecture. Built microservices that handle millions of requests daily.',
      status: 'dnd',
      lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      joinDate: new Date('2018-11-05'),
      skills: [
        'Java',
        'Spring Boot',
        'Python',
        'Django',
        'PostgreSQL',
        'MongoDB',
        'Docker',
        'Kubernetes',
        'AWS',
        'Microservices',
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/davidkim',
        github: 'https://github.com/davidkim',
      },
      stats: {
        projects: 31,
        tasks: 203,
        contributions: 567,
        experience: 6,
      },
      preferences: {
        notifications: true,
        emailUpdates: true,
        publicProfile: true,
      },
    },
  ];

  // Configuration options
  config: ProfileConfig = {
    showAvatar: true,
    showStatus: true,
    showStats: true,
    showSkills: true,
    showSocialLinks: true,
    showActions: true,
    showBio: true,
    showContactInfo: true,
    avatarSize: 'lg',
    layout: 'vertical',
    theme: 'default',
    editable: true,
    showEditButton: true,
    showMoreButton: true,
    maxSkills: 5,
    maxBioLength: 150,
  };

  // Action buttons
  actions: ProfileAction[] = [
    {
      id: 'message',
      label: 'Send Message',
      icon: 'message-circle',
      variant: 'primary',
    },
    {
      id: 'schedule',
      label: 'Schedule Meeting',
      icon: 'calendar',
      variant: 'success',
    },
    {
      id: 'follow',
      label: 'Follow',
      icon: 'user-plus',
      variant: 'secondary',
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'flag',
      variant: 'danger',
    },
    {
      id: 'block',
      label: 'Block User',
      icon: 'slash',
      variant: 'warning',
    },
  ];

  get currentProfile(): UserProfile {
    return this.profiles[this.selectedProfileIndex];
  }

  // Event handlers
  onProfileView(userId: string) {
    console.log('Profile viewed:', userId);
    this.logEvent('profile-view', { userId });
  }

  onProfileEdit(userId: string) {
    console.log('Profile edit requested:', userId);
    this.logEvent('profile-edit', { userId });
  }

  onActionClick(event: { userId: string; actionId: string }) {
    console.log('Action clicked:', event);
    this.logEvent('action-click', event);

    // Simulate action processing
    const action = this.actions.find((a) => a.id === event.actionId);
    if (action) {
      action.loading = true;
      setTimeout(() => {
        action.loading = false;
        if (event.actionId === 'follow') {
          action.label = 'Following';
          action.variant = 'success';
        }
      }, 1000);
    }
  }

  onAvatarClick(userId: string) {
    console.log('Avatar clicked:', userId);
    this.logEvent('avatar-click', { userId });
  }

  onStatusChange(event: { userId: string; status: string }) {
    console.log('Status changed:', event);
    this.logEvent('status-change', event);

    // Update the profile status
    const profile = this.profiles.find((p) => p.id === event.userId);
    if (profile) {
      profile.status = event.status as UserProfile['status'];
    }
  }

  onContactClick(event: { userId: string; type: string; value: string }) {
    console.log('Contact clicked:', event);
    this.logEvent('contact-click', event);

    // Simulate contact action
    if (event.type === 'email') {
      window.open(`mailto:${event.value}`);
    } else if (event.type === 'phone') {
      window.open(`tel:${event.value}`);
    }
  }

  onSocialClick(event: { userId: string; platform: string; url: string }) {
    console.log('Social link clicked:', event);
    this.logEvent('social-click', event);

    // Open social link in new tab
    window.open(event.url, '_blank');
  }

  onProfileEvent(event: ProfileEvent) {
    console.log('Profile event:', event);
    this.lastEvent = event;
  }

  // Configuration controls
  toggleLoading() {
    this.loading = !this.loading;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  changeTheme(theme: 'default' | 'minimal' | 'modern' | 'professional') {
    this.config.theme = theme;
  }

  changeLayout(layout: 'horizontal' | 'vertical' | 'compact') {
    this.config.layout = layout;
  }

  changeAvatarSize(size: 'sm' | 'md' | 'lg') {
    this.config.avatarSize = size;
  }

  toggleSection(section: keyof ProfileConfig) {
    if (typeof this.config[section] === 'boolean') {
      (this.config[section] as boolean) = !(this.config[section] as boolean);
    }
  }

  changeMaxSkills(event: Event) {
    const target = event.target as HTMLInputElement;
    this.config.maxSkills = +target.value;
  }

  changeMaxBioLength(event: Event) {
    const target = event.target as HTMLInputElement;
    this.config.maxBioLength = +target.value;
  }

  selectProfile(index: number) {
    this.selectedProfileIndex = index;
  }

  private logEvent(type: string, data: unknown) {
    console.log(`[${type}]`, data);
  }
}
