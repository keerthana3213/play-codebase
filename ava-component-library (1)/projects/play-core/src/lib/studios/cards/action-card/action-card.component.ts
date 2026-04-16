import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';

export interface ActionCardIcon {
  name: string;
  size?: number;
  color?: string;
}

export interface ActionCardIconBackground {
  color?: string;
  borderColor?: string;
}

export interface ActionCardStyling {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface ActionCardData {
  icon?: ActionCardIcon;
  title?: string;
  subtitle?: string;
  iconBackground?: ActionCardIconBackground;
  styling?: ActionCardStyling;
  action?: string;
  cardStyles?: Record<string, string>;
}

@Component({
  selector: 'aava-action-card',
  imports: [CommonModule, AavaDefaultCardComponent, AavaIconComponent],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionCardComponent {
  @Input() data: ActionCardData = {};

  get hasContent(): boolean {
    return !!(this.data.icon || this.data.title || this.data.subtitle);
  }

  get iconSize(): number {
    return this.data.icon?.size || 24;
  }

  get iconColor(): string {
    return this.data.icon?.color || '#8B5CF6';
  }

  get cardCustomStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      'border-radius': '12px',
      'box-shadow': 'none',
      'background': 'transparent',
      'border': 'none'
    };

    if (this.data.styling?.backgroundColor) {
      styles['background'] = this.data.styling.backgroundColor;
    }

    if (this.data.styling?.borderColor) {
      styles['border'] = `2px solid ${this.data.styling.borderColor}`;
    }

    return styles;
  }

  get textStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    if (this.data.styling?.textColor) {
      styles['color'] = this.data.styling.textColor;
    }

    return styles;
  }

  get iconBackgroundStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      'background-color': '#FFFFFF',
      'border': 'none',
      'box-shadow': 'none'
    };

    if (this.data.iconBackground?.color) {
      styles['background-color'] = this.data.iconBackground.color;
    }

    if (this.data.iconBackground?.borderColor) {
      styles['border'] = `1px solid ${this.data.iconBackground.borderColor}`;
    }

    return styles;
  }
}
