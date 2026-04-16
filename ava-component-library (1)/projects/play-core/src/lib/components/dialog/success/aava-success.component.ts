import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';

export interface SuccessButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  action?: string;
  disabled?: boolean;
}

@Component({
  selector: 'aava-success',
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-success.component.html',
  styleUrl: './aava-success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaSuccessComponent {
  @Input() title = 'Success';
  @Input() message = 'Operation completed successfully!';
  @Input() icon = 'circle-check';
  @Input() iconColor = 'var(--dialog-success-color)';
  @Input() size: 'lg' | 'md' | 'sm' | 'xl' = 'lg';
  @Input() buttons: SuccessButton[] = [];
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

  onClose() {
    this.closed.emit({ action: 'close' });
  }

  onButtonClick(action: string): void {
    this.buttonClick.emit(action);
    this.closed.emit({ action });
  }
}
