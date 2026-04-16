import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-timepicker',
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './test-timepicker.component.html',
  styleUrl: './test-timepicker.component.scss',
})
export class TestTimepickerComponent {
  selectedTime = '';
  validationMessages: string[] = [];

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }
  onValidationEvent(message: string) {
    this.validationMessages.unshift(
      `Validation: ${message} - ${new Date().toLocaleTimeString()}`
    );
    if (this.validationMessages.length > 5) {
      this.validationMessages.pop();
    }
  }
}
