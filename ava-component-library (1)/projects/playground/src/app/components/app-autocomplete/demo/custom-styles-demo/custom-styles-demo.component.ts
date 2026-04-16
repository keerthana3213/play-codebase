import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { colorOptions, techStackOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-custom-styles-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './custom-styles-demo.component.html',
  styleUrls: ['./custom-styles-demo.component.scss'],
})
export class AppAutocompleteCustomStylesDemoComponent {
  colorOptions = colorOptions;
  techStackOptions = techStackOptions;
  selectedColor: AavaAutocompleteOption | null = null;
  selectedTechStack: string[] = [];
  selectedDarkTheme: AavaAutocompleteOption | null = null;
  selectedMinimal: AavaAutocompleteOption | null = null;

  onColorSelected(option: AavaAutocompleteOption) {
    this.selectedColor = option;
  }

  onTechStackChange(value: string | string[]) {
    this.selectedTechStack = Array.isArray(value) ? value : [];
  }

  onDarkThemeSelected(option: AavaAutocompleteOption) {
    this.selectedDarkTheme = option;
  }

  onMinimalSelected(option: AavaAutocompleteOption) {
    this.selectedMinimal = option;
  }
}
