import {
  Component,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaTextareaComponent } from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-app-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AavaTextareaComponent,
    AavaIconComponent,
  ],
  templateUrl: './app-textarea.component.html',
  styleUrls: ['./app-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppTextareaComponent {
  // Demo values
  basicValue = '';
  disabledValue = 'Disabled textarea';
  readonlyValue = 'Read-only textarea';
  errorValue = '';
  helperValue = '';
  iconValue = '';
  prefixSuffixValue = '';
  rows = 3;
  error = '';
  helper = 'Helper text for textarea';
  isProcessing = false;
  autoResizeValue = '';
  regularValue = '';

  // Event handlers for demo
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTextareaInput(): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTextareaFocus(): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTextareaBlur(): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTextareaChange(): void { }
  onEditClick() {
    alert('Edit icon clicked!');
  }
  onClearClick() {
    alert('Clear icon clicked!');
    this.iconValue = '';
  }
  onSendClick() {
    alert('Send icon clicked!');
  }

  toggleProcessing() {
    this.isProcessing = !this.isProcessing;
  }
}
