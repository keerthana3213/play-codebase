import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

interface AvatarExample {
  title: string;
  description: string;
  tags: {
    label: string;
    color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    avatar?: string;
    icon?: string;
    iconPosition?: 'start' | 'end';
  }[];
}

interface UseCaseAvatarExample {
  label: string;
  color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  avatar: string;
  icon?: string;
}

@Component({
  selector: 'ava-tags-avatars',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-avatars.component.html',
  styleUrls: ['./tags-avatars.component.scss'],
})
export class TagsAvatarsComponent {
  avatarExamples: AvatarExample[] = [
    {
      title: 'User Avatars',
      description: 'Tags with user profile images for personal identification',
      tags: [
        {
          label: 'John Smith',
          color: 'primary',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
          label: 'Kane Smith',
          color: 'success',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          label: 'Bob Wilson',
          color: 'info',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        },
        {
          label: 'Alice Brown',
          color: 'warning',
          avatar: 'AB',
        },
      ],
    },
  ];

  useCaseExamples = [
    {
      title: 'User Mentions',
      description: 'Tags for mentioning users in comments and discussions',
      examples: [
        {
          label: '@john.doe',
          color: 'primary',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
          label: '@jane.smith',
          color: 'success',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          label: '@bob.wilson',
          color: 'info',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        },
      ] as UseCaseAvatarExample[],
    },
    {
      title: 'Assignee Tags',
      description: 'Tags showing task assignments and responsibilities',
      examples: [
        {
          label: 'Assigned to John',
          color: 'primary' as const,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          icon: 'check-circle',
        },
        {
          label: 'Reviewed by Jane',
          color: 'success' as const,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          icon: 'eye',
        },
        {
          label: 'Approved by Bob',
          color: 'info',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          icon: 'thumbs-up',
        },
      ] as UseCaseAvatarExample[],
    },
    {
      title: 'Collaborators',
      description: 'Tags for showing collaboration and team work',
      examples: [
        {
          label: 'Co-author',
          color: 'primary' as const,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          icon: 'users',
        },
        {
          label: 'Contributor',
          color: 'success' as const,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          icon: 'plus',
        },
        {
          label: 'Reviewer',
          color: 'warning',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          icon: 'search',
        },
      ] as UseCaseAvatarExample[],
    },
  ];

  avatarGuidelines = [
    {
      title: 'Avatar Quality',
      items: [
        'Use high-quality, properly sized avatar images',
        'Ensure avatars are square and properly cropped',
        'Provide fallback for missing or failed avatar loads',
        'Consider using initials as avatar fallback',
      ],
    },
    {
      title: 'Accessibility',
      items: [
        'Include proper alt text for avatar images',
        'Ensure sufficient contrast between avatar and background',
        'Provide text alternatives for avatar-only information',
        'Consider users who may not see avatar images',
      ],
    },
    {
      title: 'User Experience',
      items: [
        'Use avatars to enhance personal identification',
        'Combine avatars with meaningful labels',
        'Consider avatar size relative to tag size',
        'Use consistent avatar styling across your application',
      ],
    },
  ];

  onTagClick(label: string) {
    console.log(`Avatar tag clicked: ${label}`);
    alert(`Demo: ${label} tag was clicked!`);
  }

  getAvatarDescription(type: string): string {
    const descriptions: Record<string, string> = {
      user: 'User profile images for personal identification',
      team: 'Team member representation with roles',
      status: 'Status indicators combined with user avatars',
    };
    return descriptions[type] || 'Avatar representation';
  }
}
