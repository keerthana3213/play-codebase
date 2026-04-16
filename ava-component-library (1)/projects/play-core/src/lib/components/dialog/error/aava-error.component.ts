import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
export interface ErrorButton {
  label: string;
  action?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning';
  disabled?: boolean;
}

@Component({
  selector: 'aava-error',
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-error.component.html',
  styleUrl: './aava-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaErrorComponent {
  @Input() title = 'Error';
  @Input() message = 'An error occurred. Please try again.';
  @Input() icon = 'x-circle';
  @Input() iconColor = 'var(--dialog-error-color)';
  @Input() size: 'lg' | 'md' | 'sm' | 'xl' = 'lg';
  @Input() buttons: ErrorButton[] = [];
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
