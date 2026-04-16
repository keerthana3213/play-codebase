import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-validation-demo',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './validation-demo.component.html',
  styleUrls: ['./validation-demo.component.scss'],
})
export class ValidationDemoComponent {
  selectedTime = '';

  errorStyles = {
    '--timepicker-background': '#fef2f2',
    '--timepicker-border': '2px solid #ef4444',
    '--timepicker-display-text': '#dc2626',
    '--timepicker-icon-color': '#ef4444',
  };

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }
}
