import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaTagComponent } from '../../../components/tags/aava-tags.component';
import { AavaAvatarsComponent } from '../../../components/avatars/aava-avatars.component';


export interface SubmissionCardIcon {
  name: string;
  color?: string;
  size?: number;
}

export interface SubmissionCardTag {
  label: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' | string;
  variant?: 'filled' | 'outlined';
  bg?: string;
  textColor?: string;
  timeStamp?: string;
  iconName?: string;
  iconColor?: string;
}

export interface SubmissionCardAvatar {
  imageUrl?: string;
  initials?: string;
  initialsBackground?: string;
  initialsColor?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  shape?: 'pill' | 'square';
}

export interface SubmissionCardData {
  icon?: SubmissionCardIcon;
  text?: string;
  topTag?: SubmissionCardTag;
  tags?: SubmissionCardTag[];
  avatar?: SubmissionCardAvatar;
  label?: string;
}

@Component({
  selector: 'aava-submission-card',
  imports: [CommonModule, AavaIconComponent, AavaDefaultCardComponent, AavaTagComponent, AavaAvatarsComponent],
  templateUrl: './submission-card.component.html',
  styleUrl: './submission-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionCardComponent {
  @Input() data: SubmissionCardData = {};

  get hasFirstLine(): boolean {
    return !!(this.data.icon || this.data.text || this.data.topTag);
  }

  get hasSecondLine(): boolean {
    return !!(this.data.tags && this.data.tags.length > 0);
  }

  get hasThirdLine(): boolean {
    return !!(this.data.avatar || this.data.label);
  }

  get iconSize(): number {
    return this.data.icon?.size || 24;
  }

  get iconColor(): string {
    return this.data.icon?.color || 'var(--Colors-Text-primary, #3B3F46)';
  }

  get avatarSize(): 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
    return this.data.avatar?.size || 'xxs';
  }

  get avatarShape(): 'pill' | 'square' {
    return this.data.avatar?.shape || 'pill';
  }

  getTagColor(color?: string): 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' {
    const validColors = ['default', 'primary', 'success', 'warning', 'error', 'info', 'custom'];
    return validColors.includes(color || '') ? color as any : 'default';
  }

  getTagCustomStyle(tag: SubmissionCardTag): Record<string, string> {
    const style: Record<string, string> = {};

    if (tag.bg) {
      style['background-color'] = tag.bg;
    }

    if (tag.textColor) {
      style['color'] = tag.textColor;
    }

    return style;
  }
}
