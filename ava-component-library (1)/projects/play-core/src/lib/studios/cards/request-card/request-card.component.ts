import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaButtonComponent } from '../../../components/button/aava-button.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';

export interface RequestCardIcon {
  name: string;
  color?: string;
  size?: number;
}

export interface RequestCardButton {
  label: string;
  color?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  action?: string;
}

export interface RequestCardData {
  icon?: RequestCardIcon;
  name?: string;
  department?: string;
  buttons?: RequestCardButton[];
}

@Component({
  selector: 'aava-request-card',
  imports: [CommonModule, AavaDefaultCardComponent, AavaButtonComponent, AavaIconComponent],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestCardComponent {
  @Input() data: RequestCardData = {};
  @Output() buttonClick = new EventEmitter<{ action: string, request: RequestCardData }>();

  get hasContent(): boolean {
    return !!(this.data.icon || this.data.name || this.data.department);
  }

  get hasButtons(): boolean {
    return !!(this.data.buttons && this.data.buttons.length > 0);
  }

  get iconSize(): number {
    return this.data.icon?.size || 24;
  }

  get iconColor(): string {
    return this.data.icon?.color || 'var(--Colors-Text-primary, #3B3F46)';
  }

  onButtonClick(button: RequestCardButton): void {
    if (button.action) {
      this.buttonClick.emit({
        action: button.action,
        request: this.data
      });
    }
  }

  getButtonStyle(button: RequestCardButton): Record<string, string> {
    const style: Record<string, string> = {};

    if (button.color) {
      // For outlined buttons, set border and text color
      style['border-color'] = button.color;
      style['color'] = button.color;
    }

    return style;
  }
}
