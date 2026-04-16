import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';

@Component({
  selector: 'aava-confirmation',
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-confirmation.component.html',
  styleUrl: './aava-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaConfirmationComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed with this action?';
  @Input() icon = 'help-circle';
  @Input() iconColor = 'var(--dialog-text-color)';
  @Input() iconSize = 50;
  @Input() confirmButtonText = 'Confirm';
  @Input() cancelButtonText = 'Cancel';
  @Input() confirmButtonVariant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() cancelButtonVariant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'secondary';
  @Input() destructive = false; // For dangerous actions
  @Input() bottomBorder = false;
  @Input() size: 'lg' | 'md' | 'sm' = 'lg';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';


  @Output() closed = new EventEmitter<{ action: string; confirmed?: boolean }>();

  get effectiveConfirmVariant() {
    return this.destructive ? 'danger' : this.confirmButtonVariant;
  }

  get effectiveIconColor() {
    return this.destructive ? 'var(--dialog-error-color)' : this.iconColor;
  }

  get effectiveIcon() {
    return this.destructive ? 'alert-triangle' : this.icon;
  }

  onConfirm() {
    this.closed.emit({ action: 'confirm', confirmed: true });
  }

  onCancel() {
    this.closed.emit({ action: 'cancel', confirmed: false });
  }
}
