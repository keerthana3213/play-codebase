import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { accessibilityOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './accessibility-demo.component.html',
  styleUrls: ['./accessibility-demo.component.scss'],
})
export class AppAutocompleteAccessibilityDemoComponent {
  options = accessibilityOptions;
  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }
}
