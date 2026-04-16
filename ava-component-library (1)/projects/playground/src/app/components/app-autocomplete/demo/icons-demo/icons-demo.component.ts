import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { iconOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './icons-demo.component.html',
  styleUrls: ['./icons-demo.component.scss'],
})
export class AppAutocompleteIconsDemoComponent {
  options = iconOptions;
  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }
}
