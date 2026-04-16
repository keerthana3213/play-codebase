import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaTagComponent } from '../../../components/tags/aava-tags.component';

export interface ReviewCardIcon {
  name: string;
  color?: string;
  size?: number;
}

export interface ReviewCardTag {
  label: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' | string;
  variant?: 'filled' | 'outlined';
  bg?: string;
  textColor?: string;
  iconName?: string;
  iconColor?: string;
}

export interface ReviewCardData {
  icon?: ReviewCardIcon;
  text?: string;
  topTag?: ReviewCardTag;
  description?: string;
  byText?: string;
  target?: string;           // New field for security alerts (just the value, e.g., "admin@company.com")
  variant?: 'default' | 'security';  // New variant prop
}

@Component({
  selector: 'aava-review-card',
  imports: [CommonModule, AavaIconComponent, AavaDefaultCardComponent, AavaTagComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewCardComponent {
  @Input() data: ReviewCardData = {};

  get hasFirstLine(): boolean {
    return !!(this.data.icon || this.data.text || this.data.topTag);
  }

  get hasSecondLine(): boolean {
    return !!this.data.description;
  }

  get hasThirdLine(): boolean {
    return !!(this.data.byText || this.data.target);
  }

  get isSecurityVariant(): boolean {
    return this.data.variant === 'security';
  }

  get iconSize(): number {
    return this.data.icon?.size || 24;
  }

  get iconColor(): string {
    return this.data.icon?.color || 'var(--Colors-Text-primary, #3B3F46)';
  }

  getTagColor(color?: string): 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' {
    const validColors = ['default', 'primary', 'success', 'warning', 'error', 'info', 'custom'];
    return validColors.includes(color || '') ? color as any : 'default';
  }

  getTagCustomStyle(tag: ReviewCardTag): Record<string, string> {
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
