import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { basicOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
})
export class AppAutocompleteBasicUsageDemoComponent {
  options = basicOptions;
  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }
}
