import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, delay, map } from 'rxjs';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { userOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-loading-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './loading-demo.component.html',
  styleUrls: ['./loading-demo.component.scss'],
})
export class AppAutocompleteLoadingDemoComponent implements OnInit {
  // Simple Observable approach like the working example
  options$: Observable<AavaAutocompleteOption[]> = of([]);
  loading = false;
  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';

  ngOnInit() {
    // Simple Observable with loading simulation
    this.options$ = of(userOptions).pipe(
      delay(1000), // Simulate loading delay
      map((options) => {
        this.loading = false;
        return options.slice(0, 8);
      })
    );

    // Start with loading state
    this.loading = true;
  }

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }

  resetDemo() {
    this.selectedOption = null;
    this.currentValue = '';
    this.loading = true;

    // Recreate the observable to simulate fresh loading
    this.options$ = of(userOptions).pipe(
      delay(1000),
      map((options) => {
        this.loading = false;
        return options.slice(0, 8);
      })
    );
  }
}
