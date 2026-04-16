import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaTimePickerComponent } from '@aava/play-core';

interface TimePickerDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-app-timepicker',
  imports: [CommonModule, RouterModule, AavaTimePickerComponent],
  standalone: true,
  templateUrl: './app-timepicker.component.html',
  styleUrls: ['./app-timepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppTimepickerComponent {
  // Documentation sections
  sections: TimePickerDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple time picker with default behavior and display mode.',
      showCode: false,
    },
    {
      title: 'Size Variants',
      description: 'Different sizes for various use cases and layouts.',
      showCode: false,
    },
    {
      title: 'Scroll Mode Interface',
      description: 'Interactive scroll-based time selection with smooth animations.',
      showCode: false,
    },
    {
      title: 'Keyboard Navigation',
      description: 'Full keyboard accessibility with arrow keys and focus management.',
      showCode: false,
    },
    {
      title: 'Validation & Constraints',
      description: 'Input validation and time range constraints.',
      showCode: false,
    },
    {
      title: 'Custom Styling',
      description: 'Customizable appearance with CSS custom properties.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the time picker component.',
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.',
    },
    {
      name: 'timeSelected',
      type: 'EventEmitter<string>',
      default: '-',
      description: 'Event emitted when a time is selected. Returns time in HH:MM AM/PM format.',
    },
  ];

  // Sample data and state
  selectedTime = '';

  // Custom styling examples
  disabledStyles = {
    '--timepicker-background': '#f5f5f5',
    '--timepicker-border': '1px solid #d1d5db',
    '--timepicker-display-text': '#9ca3af',
  };

  darkStyles = {
    '--timepicker-background': '#374151',
    '--timepicker-border': '1px solid #4b5563',
    '--timepicker-display-text': '#f9fafb',
    '--timepicker-icon-color': '#f9fafb',
    '--timepicker-scroll-background': '#1f2937',
    '--timepicker-time-item-text': '#d1d5db',
    '--timepicker-time-item-selected-text': '#60a5fa',
  };

  // Event handlers
  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  // Example code snippets
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
import { Component } from '@angular/core';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'app-basic-timepicker',
  standalone: true,
  imports: [AavaTimePickerComponent],
  template: \`
    <aava-time-picker
      (timeSelected)="onTimeSelected($event)">
    </aava-time-picker>
  \`
})
export class BasicTimePickerComponent {
  onTimeSelected(time: string) {
    console.log('Selected time:', time);
  }
}`,
      'size variants': `
import { Component } from '@angular/core';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'app-size-timepicker',
  standalone: true,
  imports: [AavaTimePickerComponent],
  template: \`
    <aava-time-picker
      size="sm"
      (timeSelected)="onTimeSelected($event)">
    </aava-time-picker>

    <aava-time-picker
      size="lg"
      (timeSelected)="onTimeSelected($event)">
    </aava-time-picker>
  \`
})
export class SizeTimePickerComponent {
  onTimeSelected(time: string) {
    console.log('Selected time:', time);
  }
}`,
      'custom styling': `
import { Component } from '@angular/core';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'app-styled-timepicker',
  standalone: true,
  imports: [AavaTimePickerComponent],
  template: \`
    <aava-time-picker
      [customStyles]="darkStyles"
      (timeSelected)="onTimeSelected($event)">
    </aava-time-picker>
  \`
})
export class StyledTimePickerComponent {
  darkStyles = {
    '--timepicker-background': '#374151',
    '--timepicker-border': '1px solid #4b5563',
    '--timepicker-display-text': '#f9fafb',
    '--timepicker-icon-color': '#f9fafb'
  };

  onTimeSelected(time: string) {
    console.log('Selected time:', time);
  }
}`,
    };

    return examples[section.toLowerCase()] || '';
  }
}
