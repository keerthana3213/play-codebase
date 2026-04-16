import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { CommonModule } from '@angular/common';
import { DialogButton } from '../aava-dialog-service';

@Component({
  selector: 'aava-custom',
  imports: [AavaIconComponent, AavaButtonComponent, CommonModule],
  templateUrl: './aava-custom.component.html',
  styleUrl: './aava-custom.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaCustomComponent {
  @Input() title = 'Dialog';
  @Input() message = '';
  @Input() icon?: string;
  @Input() iconColor = 'var(--dialog-text-color)';
  @Input() iconSize = 50;
  @Input() showIcon = true;
  @Input() buttons: DialogButton[] = [];
  @Input() variant: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default';
  @Input() customContent?: string; // For HTML content
  @Input() showTitle = true;
  @Input() showMessage = true;
  @Input() bottomBorder = false;
  @Input() size: 'lg' | 'md' | 'sm' = 'lg';
  @Input() customStyles: Record<string, string> = {};
    @Input() id = '';


  @Output() buttonClick = new EventEmitter<string>();

  get variantIcon(): string {
    if (this.icon) return this.icon;

    switch (this.variant) {
      case 'success': return 'circle-check';
      case 'error': return 'alert-circle';
      case 'warning': return 'alert-triangle';
      case 'info': return 'info';
      default: return 'help-circle';
    }
  }

  get variantIconColor(): string {
    switch (this.variant) {
      case 'success': return 'var(--dialog-success-color)';
      case 'error': return 'var(--dialog-error-color)';
      case 'warning': return 'var(--dialog-warning-color)';
      case 'info': return 'var(--dialog-info-color)';
      default: return this.iconColor;
    }
  }

  get titleClass(): string {
    return `popup-title ${this.variant}`;
  }

  onButtonClick(button: DialogButton) {
    if (!button.disabled) {
      this.buttonClick.emit(button.action || button.label);
    }
  }

  trackByButton(index: number, button: DialogButton): string {
    return button.label + index;
  }
}
