import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textarea-variants-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent],
  templateUrl: './textarea-variants-demo.component.html',
  styleUrls: ['./textarea-variants-demo.component.scss'],
})
export class TextareaVariantsDemoComponent {
  defaultValue = '';
  primaryValue = '';
  successValue = '';
  errorValue = '';
  warningValue = '';
  infoValue = '';
  processingValue = '';
  processingDefaultValue = '';
  processingPrimaryValue = '';
  processingSuccessValue = '';
  processingWarningValue = '';
  processingErrorValue = '';
  processingInfoValue = '';

  onDefaultChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Default textarea value changed:', target.value);
  }

  onPrimaryChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Primary textarea value changed:', target.value);
  }

  onSuccessChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Success textarea value changed:', target.value);
  }

  onErrorChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Error textarea value changed:', target.value);
  }

  onWarningChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Warning textarea value changed:', target.value);
  }

  onInfoChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Info textarea value changed:', target.value);
  }

  onProcessingChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing textarea value changed:', target.value);
  }

  onProcessingDefaultChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing default textarea value changed:', target.value);
  }

  onProcessingPrimaryChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing primary textarea value changed:', target.value);
  }

  onProcessingSuccessChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing success textarea value changed:', target.value);
  }

  onProcessingWarningChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing warning textarea value changed:', target.value);
  }

  onProcessingErrorChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing error textarea value changed:', target.value);
  }

  onProcessingInfoChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Processing info textarea value changed:', target.value);
  }
}
