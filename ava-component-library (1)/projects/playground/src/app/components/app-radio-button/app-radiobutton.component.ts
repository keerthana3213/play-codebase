import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaIconComponent } from '@aava/play-core';
import { AavaRadioButtonComponent } from '@aava/play-core';
interface RadioButtonDocSection {
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
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ava-app-radiobutton',
  standalone: true,
  imports: [
    AavaRadioButtonComponent,
    CommonModule,
    AavaIconComponent,
    RouterModule,
  ],
  templateUrl: './app-radiobutton.component.html',
  styleUrl: './app-radiobutton.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppRadiobuttonComponent {
  basic: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];
  disabled: RadioOption[] = [
    { label: 'Option 1', value: 'a', disabled: true },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c', disabled: true },
  ];
  horizontal: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];
  vertical: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];
  small_dot: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];
  medium_dot: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];
  large_dot: RadioOption[] = [
    { label: 'Option 1', value: 'a' },
    { label: 'Option 2', value: 'b' },
    { label: 'Option 3', value: 'c' },
  ];

  selectedValues: { [key: string]: string } = {
    basic: '',
    horizontal: '',
    vertical: '',
    disabled: '',
    small_dot: '',
    medium_dot: '',
    large_dot: '',
  };

  onRadioChange(group: string, value: string) {
    this.selectedValues[group] = value;
    console.log(`Selected value for ${group}:`, value);
  }

  // Documentation sections
  sections: RadioButtonDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple radio button group with default configuration.',
      showCode: false,
    },
    {
      title: 'Orientation',
      description: 'Radio buttons in horizontal and vertical layouts.',
      showCode: false,
    },
    {
      title: 'Size Variants',
      description: 'Radio buttons with different sizes.',
      showCode: false,
    },
    {
      title: 'Radio Button Variants',
      description:
        'Different radio button configurations including disabled and animated options.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'options',
      type: 'RadioButtonOption[]',
      default: '[]',
      description: 'Array of radio button options.',
    },
    {
      name: 'name',
      type: 'string',
      default: '"radioGroup"',
      description: 'Name attribute for the radio button group.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable entire radio button group.',
    },

    {
      name: 'size',
      type: 'string',
      default: 'medium',
      description:
        'Size of the radio button. Options: "small", "medium", "large".',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: 'horizontal',
      description: 'Layout orientation of radio buttons.',
    },
    {
      name: 'customClass',
      type: 'string',
      default: '""',
      description: 'Apply custom CSS class to radio button group.',
    },
  ];

  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `// Basic radio button example
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-radio-button',
  standalone: true,
  imports: [RadioButtonComponent],
  template: \`
    <awe-radio-button
      [options]="options"
      (selectionChange)="onSelectionChange($event)"
    ></awe-radio-button>
  \`
})
export class BasicRadioButtonComponent {
  options = signal([
    { value: 'option1', label: 'Option 1', checked: true },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]);

  onSelectionChange(value: string): void {
    console.log('Selected value:', value);
  }
}`,

      'radio button variants': `// Radio button variants example
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-radio-button-variants',
  standalone: true,
  imports: [RadioButtonComponent],
  template: \`
    <div class="radio-variants-container">
      <h3>Disabled Options</h3>
      <awe-radio-button [options]="disabledOptions"></awe-radio-button>

      <h3>Animated Options</h3>
      <awe-radio-button [options]="animatedOptions"></awe-radio-button>
    </div>
  \`,
  styles: [\`
    .radio-variants-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  \`]
})
export class RadioButtonVariantsComponent {
  disabledOptions = signal([
    { value: 'option1', label: 'Disabled Option', disabled: true },
    { value: 'option2', label: 'Enabled Option', checked: true }
  ]);

  animatedOptions = signal([
    { value: 'option3', label: 'Animated Option', enableAnimation: true },
    { value: 'option4', label: 'Static Option', enableAnimation: false }
  ]);
}`,

      orientation: `// Radio button orientation example
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-radio-button-orientation',
  standalone: true,
  imports: [RadioButtonComponent],
  template: \`
    <div class="orientation-container">
     <h3>Vertical Layout</h3>
      <awe-radio-button 
        [options]="verticalOptions"
        orientation="vertical"
      ></awe-radio-button>
    </div>
  \`,
  styles: [\`
    .orientation-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  \`]
})
export class RadioButtonOrientationComponent {
  verticalOptions = signal([
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5', checked: true },
    { value: 'option6', label: 'Option 6' }
  ]);
}`,

      customization: `// Radio button customization example
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-radio-button-customization',
  standalone: true,
  imports: [RadioButtonComponent],
  template: \`
    <div class="customization-container">
      <h3>Theme Customization</h3>
      <awe-radio-button 
        [options]="customizationOptions"
        name="theme-selector"
      ></awe-radio-button>
    </div>
  \`,
  styles: [\`
    /* Custom theme styles */
    :host ::ng-deep .custom-light-theme {
      color: #333;
      background-color: #f4f4f4;
    }

    :host ::ng-deep .custom-dark-theme {
      color: #fff;
      background-color: #333;
    }

    :host ::ng-deep .custom-colorful-theme {
      color: #fff;
      background-color: #007bff;
    }
  \`]
})
export class RadioButtonCustomizationComponent {
  customizationOptions = signal([
    { 
      value: 'theme1', 
      label: 'Light Theme', 
      checked: true,
      customClass: 'custom-light-theme'
    },
    { 
      value: 'theme2', 
      label: 'Dark Theme', 
      customClass: 'custom-dark-theme'
    },
    { 
      value: 'theme3', 
      label: 'Colorful Theme', 
      customClass: 'custom-colorful-theme'
    }
  ]);
}`,

      accessibility: `// Radio button accessibility example
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-radio-button-accessibility',
  standalone: true,
  imports: [RadioButtonComponent],
  template: \`
    <div class="accessibility-container">
      <h3>Accessibility Options</h3>
      <awe-radio-button 
        [options]="accessibilityOptions"
        name="accessibility-settings"
      ></awe-radio-button>
    </div>
  \`,
  styles: [\`
    /* High contrast option styling */
    :host ::ng-deep .high-contrast-option {
      border: 2px solid #000;
      background-color: #fff;
      color: #000;
    }
  \`]
})
export class RadioButtonAccessibilityComponent {
  accessibilityOptions = signal([
    { 
      value: 'screen-reader', 
      label: 'Screen Reader Friendly', 
      ariaLabel: 'Enable screen reader support',
      checked: true
    },
    { 
      value: 'high-contrast', 
      label: 'High Contrast Mode', 
      ariaLabel: 'Enable high contrast accessibility',
      customClass: 'high-contrast-option'
    },
    { 
      value: 'keyboard-nav', 
      label: 'Keyboard Navigation', 
      ariaLabel: 'Enable enhanced keyboard navigation'
    }
  ]);
}`,
    };

    return examples[section.toLowerCase()] || '';
  }

  // Method to copy code to clipboard
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
}
