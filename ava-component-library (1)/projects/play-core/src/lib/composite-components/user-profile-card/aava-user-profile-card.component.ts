import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCardComponent } from '../../components/card/aava-card.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaAvatarsComponent } from '../../components/avatars/aava-avatars.component';
import { AavaTagComponent } from '../../components/tags/aava-tags.component';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  location?: string;
  phone?: string;
  bio?: string;
  status: 'online' | 'offline' | 'away' | 'busy' | 'dnd';
  lastSeen?: Date;
  joinDate?: Date;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  stats?: {
    projects?: number;
    tasks?: number;
    contributions?: number;
    experience?: number;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    publicProfile: boolean;
  };
}

export interface ProfileAction {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

export interface ProfileConfig {
  showAvatar?: boolean;
  showStatus?: boolean;
  showStats?: boolean;
  showSkills?: boolean;
  showSocialLinks?: boolean;
  showActions?: boolean;
  showBio?: boolean;
  showContactInfo?: boolean;
  avatarSize?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical' | 'compact';
  theme?: 'default' | 'minimal' | 'modern' | 'professional';
  editable?: boolean;
  showEditButton?: boolean;
  showMoreButton?: boolean;
  maxSkills?: number;
  maxBioLength?: number;
}

export interface ProfileEvent {
  type:
  | 'profile-view'
  | 'profile-edit'
  | 'action-click'
  | 'avatar-click'
  | 'status-change'
  | 'contact-click'
  | 'social-click';
  data: unknown;
  userId?: string;
  actionId?: string;
}

@Component({
  selector: 'aava-user-profile-card',
  standalone: true,
  imports: [
    CommonModule,
    AavaCardComponent,
    AavaButtonComponent,
    AavaIconComponent,
    AavaAvatarsComponent,
    //BadgesComponent,
    AavaTagComponent,
  ],
  templateUrl: './aava-user-profile-card.component.html',
  styleUrl: './aava-user-profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaUserProfileCardComponent {
  @Input() profile: UserProfile | null = null;
  @Input() config: ProfileConfig = {
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
    editable: false,
    showEditButton: true,
    showMoreButton: true,
    maxSkills: 5,
    maxBioLength: 150,
  };
  @Input() actions: ProfileAction[] = [];
  @Input() loading = false;
  @Input() disabled = false;

  @Output() profileView = new EventEmitter<string>();
  @Output() profileEdit = new EventEmitter<string>();
  @Output() actionClick = new EventEmitter<{
    userId: string;
    actionId: string;
  }>();
  @Output() avatarClick = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{
    userId: string;
    status: string;
  }>();
  @Output() contactClick = new EventEmitter<{
    userId: string;
    type: string;
    value: string;
  }>();
  @Output() socialClick = new EventEmitter<{
    userId: string;
    platform: string;
    url: string;
  }>();
  @Output() profileEvent = new EventEmitter<ProfileEvent>();

  isExpanded = false;
  showMoreActions = false;

  get statusColor(): string {
    switch (this.profile?.status) {
      case 'online':
        return '#28a745';
      case 'away':
        return '#ffc107';
      case 'busy':
        return '#dc3545';
      case 'dnd':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  }

  get statusIcon(): string {
    switch (this.profile?.status) {
      case 'online':
        return 'circle';
      case 'away':
        return 'clock';
      case 'busy':
        return 'minus-circle';
      case 'dnd':
        return 'slash';
      default:
        return 'circle';
    }
  }

  get statusText(): string {
    switch (this.profile?.status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'busy':
        return 'Busy';
      case 'dnd':
        return 'Do Not Disturb';
      default:
        return 'Offline';
    }
  }

  get displaySkills(): string[] {
    if (!this.profile?.skills) return [];
    return this.profile.skills.slice(0, this.config.maxSkills || 5);
  }

  get hasMoreSkills(): boolean {
    return (this.profile?.skills?.length || 0) > (this.config.maxSkills || 5);
  }

  get displayBio(): string {
    if (!this.profile?.bio) return '';
    const maxLength = this.config.maxBioLength || 150;
    return this.profile.bio.length > maxLength
      ? this.profile.bio.substring(0, maxLength) + '...'
      : this.profile.bio;
  }

  get hasMoreBio(): boolean {
    return (this.profile?.bio?.length || 0) > (this.config.maxBioLength || 150);
  }

  get visibleActions(): ProfileAction[] {
    if (this.showMoreActions) return this.actions;
    return this.actions.slice(0, 3);
  }

  get hasMoreActions(): boolean {
    return this.actions.length > 3;
  }

  onProfileView() {
    if (this.profile) {
      this.profileView.emit(this.profile.id);
      this.emitProfileEvent('profile-view', { userId: this.profile.id });
    }
  }

  onProfileEdit() {
    if (this.profile) {
      this.profileEdit.emit(this.profile.id);
      this.emitProfileEvent('profile-edit', { userId: this.profile.id });
    }
  }

  onActionClick(action: ProfileAction) {
    if (this.profile && !action.disabled && !action.loading) {
      this.actionClick.emit({ userId: this.profile.id, actionId: action.id });
      this.emitProfileEvent('action-click', {
        userId: this.profile.id,
        actionId: action.id,
      });
    }
  }

  onAvatarClick() {
    if (this.profile) {
      this.avatarClick.emit(this.profile.id);
      this.emitProfileEvent('avatar-click', { userId: this.profile.id });
    }
  }

  onStatusClick() {
    if (this.profile && this.config.editable) {
      // Cycle through status options
      const statuses: UserProfile['status'][] = [
        'online',
        'away',
        'busy',
        'dnd',
        'offline',
      ];
      const currentIndex = statuses.indexOf(this.profile.status);
      const nextStatus = statuses[(currentIndex + 1) % statuses.length];

      this.statusChange.emit({ userId: this.profile.id, status: nextStatus });
      this.emitProfileEvent('status-change', {
        userId: this.profile.id,
        status: nextStatus,
      });
    }
  }

  onContactClick(type: string, value: string) {
    if (this.profile) {
      this.contactClick.emit({ userId: this.profile.id, type, value });
      this.emitProfileEvent('contact-click', {
        userId: this.profile.id,
        type,
        value,
      });
    }
  }

  onSocialClick(platform: string, url: string) {
    if (this.profile) {
      this.socialClick.emit({ userId: this.profile.id, platform, url });
      this.emitProfileEvent('social-click', {
        userId: this.profile.id,
        platform,
        url,
      });
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMoreActions() {
    this.showMoreActions = !this.showMoreActions;
  }

  getJoinDateText(): string {
    if (!this.profile?.joinDate) return '';
    const date = new Date(this.profile.joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `Joined ${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Joined ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `Joined ${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  getLastSeenText(): string {
    if (!this.profile?.lastSeen) return '';
    const date = new Date(this.profile.lastSeen);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  private emitProfileEvent(type: ProfileEvent['type'], data: unknown) {
    const event: ProfileEvent = {
      type,
      data,
      userId: this.profile?.id,
    };
    this.profileEvent.emit(event);
  }

  trackByAction(index: number, action: ProfileAction): string {
    return action.id;
  }

  trackBySkill(index: number, skill: string): string {
    return skill;
  }
}
