import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaTagComponent } from '../../../components/tags/aava-tags.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';

export interface SummaryCardIcon {
  name: string;
  color?: string;
  size?: number;
}

export interface SummaryCardTag {
  label: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' | string;
  variant?: 'filled' | 'outlined';
  bg?: string;
  textColor?: string;
}

export interface SummaryCardData {
  icon?: SummaryCardIcon;
  title?: string;
  subtitle?: string;
  tag?: SummaryCardTag;
  rating?: {
    value: string;
    icon: {
      name: string;
      color?: string;
    };
  };
}

@Component({
  selector: 'aava-summary-card',
  imports: [CommonModule, AavaDefaultCardComponent, AavaTagComponent, AavaIconComponent],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCardComponent {
  @Input() data: SummaryCardData = {};

  get hasContent(): boolean {
    return !!(this.data.title || this.data.subtitle);
  }

  get hasTag(): boolean {
    return !!(this.data.tag);
  }

  get hasRating(): boolean {
    return !!(this.data.rating);
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

  getTagCustomStyle(tag: SummaryCardTag): Record<string, string> {
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
