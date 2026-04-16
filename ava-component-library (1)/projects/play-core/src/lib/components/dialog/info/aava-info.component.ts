import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
export interface InfoButton {
  label: string;
  action?: string;
  variant?: 'primary' | 'secondary' | 'info' | 'warning';
  disabled?: boolean;
}

@Component({
  selector: 'aava-info',
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-info.component.html',
  styleUrl: './aava-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaInfoComponent {
  @Input() title = 'Information';
  @Input() message = 'Here is some important information.';
  @Input() icon = 'info';
  @Input() iconColor = 'var(--dialog-info-color)';
  @Input() size: 'lg' | 'md' | 'sm' | 'xl' = 'lg';
  @Input() buttons: InfoButton[] = [];
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
