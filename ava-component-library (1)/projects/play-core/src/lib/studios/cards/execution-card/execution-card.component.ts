import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaTagComponent } from '../../../components/tags/aava-tags.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';


export interface ExecutionCardIcon {
  name: string;
  color?: string;
  size?: number;
}

export interface ExecutionCardData {
  icon?: ExecutionCardIcon;
  title?: string;
  subtitle?: string;
  status?: {
    label: string;
    color: string;
    variant?: 'filled' | 'outlined';
    bg?: string;           // Custom background color
    textColor?: string;    // Custom text color
  };
  author?: string;
  timestamp?: string;
}

@Component({
  selector: 'aava-execution-card',
  imports: [CommonModule, AavaDefaultCardComponent, AavaTagComponent, AavaIconComponent],
  templateUrl: './execution-card.component.html',
  styleUrl: './execution-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutionCardComponent {
  @Input() data: ExecutionCardData = {};

  get hasContent(): boolean {
    return !!(this.data.title || this.data.subtitle);
  }

  get hasStatus(): boolean {
    return !!(this.data.status);
  }

  get hasMetadata(): boolean {
    return !!(this.data.author || this.data.timestamp);
  }

  get iconSize(): number {
    return this.data.icon?.size || 24;
  }

  get iconColor(): string {
    return this.data.icon?.color || 'var(--Colors-Text-primary, #3B3F46)';
  }

  getStatusColor(color: string): string {
    // Map common status colors to design system colors
    const colorMap: Record<string, string> = {
      'running': '#06B6D4',
      'completed': '#10B981',
      'failed': '#EF4444',
      'pending': '#F59E0B',
      'warning': '#F59E0B'
    };

    return colorMap[color.toLowerCase()] || color;
  }

  getStatusCustomStyle(status: any): Record<string, string> {
    const style: Record<string, string> = {};

    if (status.bg) {
      style['background-color'] = status.bg;
    }

    if (status.textColor) {
      style['color'] = status.textColor;
    }

    return style;
  }
}
