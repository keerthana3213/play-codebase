import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
export interface WarningButton {
  label: string;
  action?: string;
  variant?: 'primary' | 'secondary' | 'warning' | 'danger';
  disabled?: boolean;
}

@Component({
  selector: 'aava-warning',
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-warning.component.html',
  styleUrl: './aava-warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaWarningComponent {
  @Input() title = 'Warning';
  @Input() message = 'Please review the following information carefully.';
  @Input() icon = 'alert-triangle';
  @Input() iconColor = 'var(--dialog-warning-color)';
  @Input() size: 'lg' | 'md' | 'sm' | 'xl' = 'lg';
  @Input() buttons: WarningButton[] = [];
  @Input() showButtons = false;
  @Input() bottomBorder = true;
  @Input() customStyles: Record<string, string> = {};
  @Input() id='';

  @Output() closed = new EventEmitter<{ action: string }>();
  @Output() buttonClick = new EventEmitter<string>();

  get effectiveIconSize(): number {
    switch (this.size) {
      case 'lg':
        return 24;
      case 'md':
        return 20;
      case 'sm':
        return 16;
      default:
        return 24;
    }
  }

  onButtonClick(action: string): void {
    this.buttonClick.emit(action);
    this.closed.emit({ action });
  }
}
