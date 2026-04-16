import { Component } from '@angular/core';
import { AavaRadioButtonComponent } from '@aava/play-core';


export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-test-radio-button',
  imports: [AavaRadioButtonComponent],
  templateUrl: './test-radio-button.component.html',
  styleUrl: './test-radio-button.component.scss'
})
export class TestRadioButtonComponent {


  disabled: RadioOption[] = [
    { label: 'Option 1', value: 'a', disabled: true },
    { label: 'Option 2', value: 'b', disabled: true },
    { label: 'Option 3', value: 'c', disabled: true },
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
  no_label: RadioOption[] = [
    { value: 'a' },
    { value: 'b' },
    { value: 'c' },
  ];

  selectedValues: { [key: string]: string } = {
    basic: '',
    horizontal: '',
    vertical: '',
    disabled: 'c',
    small_dot: 'a',
    medium_dot: 'b',
    large_dot: 'c',
  };

  onRadioChange(group: string, value: string) {
    this.selectedValues[group] = value;
    console.log(`Selected value for ${group}:`, value);
  }
}
