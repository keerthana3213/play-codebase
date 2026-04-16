import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-custom-styling-demo',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './custom-styling-demo.component.html',
  styleUrls: ['./custom-styling-demo.component.scss'],
})
export class CustomStylingDemoComponent {
  selectedTime = '';

  darkStyles = {
    '--timepicker-background': '#374151',
    '--timepicker-border': '1px solid #4b5563',
    '--timepicker-display-text': '#f9fafb',
    '--timepicker-icon-color': '#f9fafb',
    '--timepicker-scroll-background': '#1f2937',
    '--timepicker-time-item-text': '#d1d5db',
    '--timepicker-time-item-selected-text': '#60a5fa',
  };

  blueStyles = {
    '--timepicker-background': '#dbeafe',
    '--timepicker-border': '1px solid #3b82f6',
    '--timepicker-display-text': '#1e40af',
    '--timepicker-icon-color': '#3b82f6',
    '--timepicker-scroll-background': '#bfdbfe',
    '--timepicker-time-item-text': '#1e3a8a',
    '--timepicker-time-item-selected-text': '#1d4ed8',
  };

  greenStyles = {
    '--timepicker-background': '#dcfce7',
    '--timepicker-border': '1px solid #22c55e',
    '--timepicker-display-text': '#15803d',
    '--timepicker-icon-color': '#22c55e',
    '--timepicker-scroll-background': '#bbf7d0',
    '--timepicker-time-item-text': '#166534',
    '--timepicker-time-item-selected-text': '#16a34a',
  };

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }
}
