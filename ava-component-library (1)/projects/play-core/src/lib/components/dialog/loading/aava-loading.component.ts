import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-loading',
  imports: [AavaButtonComponent, CommonModule],
  templateUrl: './aava-loading.component.html',
  styleUrl: './aava-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaLoadingComponent {
  @Input() title = 'Loading...';
  @Input() message = 'Please wait while we process your request.';
  @Input() showProgress = false;
  @Input() progress = 0; // 0-100
  @Input() showCancelButton = false;
  @Input() cancelButtonText = 'Cancel';
  @Input() spinnerColor = 'var(--dialog-primary-color)';
  @Input() indeterminate = true; // For indeterminate progress
  @Input() bottomBorder = false;
  @Input() customStyles: Record<string, string> = {};
  @Input() id ='';

  get progressPercentage(): string {
    return Math.min(Math.max(this.progress, 0), 100) + '%';
  }

  get progressText(): string {
    if (this.indeterminate) {
      return '';
    }
    return `${Math.round(this.progress)}%`;
  }

  @Output() closed = new EventEmitter<{ action: string }>();

  onCancel() {
    this.closed.emit({ action: 'cancel' });
  }
}
