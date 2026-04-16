import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeState, BadgeSize, AavaBadgesComponent } from '../badges/aava-badges.component';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xs' | 'xl' | 'xxs' | 'xxl';
export type AvatarShape = 'pill' | 'square';
export type AvatarTextType = 'status' | 'profile' | 'additional';

@Component({
  selector: 'aava-avatars',
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './aava-avatars.component.html',
  styleUrl: './aava-avatars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaAvatarsComponent {
  @Input() size: AvatarSize = 'lg';
  @Input() shape: AvatarShape = 'pill';
  @Input() imageUrl: string = '';
  @Input() statusText?: string;
  @Input() profileText?: string;
  @Input() additionalText?: string;
  @Input() badgeState?: BadgeState;
  @Input() badgeSize?: BadgeSize;
  @Input() badgeCount?: number;
  @Input() initials = '';
  @Input() initialsBackground = '';
  @Input() initialsColor = '';
  @Input() customStyles: Record<string, string> = {};
  @Input() imageStyles: Record<string, string> = {};
  @Input() id = '';

  get avatarClasses(): string {
    return `avatar avatar--${this.size} avatar--${this.shape}`;
  }

  get hasBadge(): boolean {
    return !!(this.badgeState || this.badgeCount);
  }

  get hasStatusText(): boolean {
    return !!this.statusText;
  }

  get hasProfileText(): boolean {
    return !!this.profileText;
  }

  get hasAdditionalText(): boolean {
    return !!this.additionalText;
  }

  get hasAnyText(): boolean {
    return this.hasStatusText || this.hasProfileText || this.hasAdditionalText;
  }
}