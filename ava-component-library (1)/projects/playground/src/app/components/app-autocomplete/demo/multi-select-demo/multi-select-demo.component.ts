import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteOption,
  AavaAutocompleteComponent,
} from '@aava/play-core';
import { countryOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-multi-select-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './multi-select-demo.component.html',
  styleUrls: ['./multi-select-demo.component.scss'],
})
export class AppAutocompleteMultiSelectDemoComponent {
  options = countryOptions;
  selectedOptions: AavaAutocompleteOption[] = [];
  currentValue = '';

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
    // Update selected options based on the emitted values
    this.selectedOptions = this.options.filter((option) =>
      Array.isArray(value)
        ? value.includes(option.value)
        : value === option.value
    );
  }
}
