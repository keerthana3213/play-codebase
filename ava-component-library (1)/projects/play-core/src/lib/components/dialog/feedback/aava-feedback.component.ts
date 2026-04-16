import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaTextareaComponent } from '../../textarea/aava-textarea.component';
@Component({
  selector: 'aava-feedback',
  imports: [CommonModule, AavaButtonComponent, AavaTextareaComponent],
  templateUrl: './aava-feedback.component.html',
  styleUrl: './aava-feedback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaFeedbackComponent {
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
  @Input() label = '';
  @Input() bottomBorder = false;
  @Input() customStyles: Record<string, string> = {};
  @Input() id=''

  @Output() closed = new EventEmitter<{ action: string; confirmed?: boolean, feedback?: string }>();
  @ViewChild('feedbackText') feedbackTextRef!: AavaTextareaComponent;
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
    const feedbackValue = this.feedbackTextRef ? this.feedbackTextRef.value : '';
    this.closed.emit({ action: 'feedback', confirmed: true, feedback: feedbackValue });
  }

  onCancel() {
    this.closed.emit({ action: 'cancel', confirmed: false });
  }
}

