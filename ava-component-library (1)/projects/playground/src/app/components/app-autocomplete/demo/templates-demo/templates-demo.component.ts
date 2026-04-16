import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAutocompleteOption,
  AavaAutocompleteComponent,
  AavaIconComponent
} from '@aava/play-core';
import { programmingLanguages } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-templates-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent, AavaIconComponent],
  templateUrl: './templates-demo.component.html',
  styleUrls: ['./templates-demo.component.scss'],
})
export class AppAutocompleteTemplatesDemoComponent {
  options = programmingLanguages;
  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }

  getPopularityColor(popularity: number): string {
    if (popularity >= 90) return '#10b981'; // Green
    if (popularity >= 80) return '#3b82f6'; // Blue
    if (popularity >= 70) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }
}
