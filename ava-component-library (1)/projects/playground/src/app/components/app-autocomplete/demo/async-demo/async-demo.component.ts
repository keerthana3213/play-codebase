import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, delay, map } from 'rxjs';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { userOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-async-demo',
  standalone: true,
  imports: [CommonModule, AavaAutocompleteComponent],
  templateUrl: './async-demo.component.html',
  styleUrls: ['./async-demo.component.scss'],
})
export class AppAutocompleteAsyncDemoComponent implements OnInit {
  // Simple approach like the working example
  apiOptions$: Observable<AavaAutocompleteOption[]> = of([]);
  localOptions$: Observable<AavaAutocompleteOption[]> = of([]);

  selectedOption: AavaAutocompleteOption | null = null;
  currentValue = '';
  apiCallCount = 0;
  searchMode: 'api' | 'local' = 'api';

  ngOnInit() {
    // API options - simulate API call
    this.apiOptions$ = of([]).pipe(
      delay(500),
      map(() => userOptions.slice(0, 8))
    );

    // Local options - immediate
    this.localOptions$ = of(userOptions);
  }

  get options$(): Observable<AavaAutocompleteOption[]> {
    return this.searchMode === 'api' ? this.apiOptions$ : this.localOptions$;
  }

  onOptionSelected(option: AavaAutocompleteOption) {
    this.selectedOption = option;
  }

  onValueChange(value: string | string[]) {
    this.currentValue = Array.isArray(value) ? value.join(', ') : value;
  }

  setSearchMode(mode: 'api' | 'local') {
    this.searchMode = mode;
  }

  resetDemo() {
    this.selectedOption = null;
    this.currentValue = '';
    this.apiCallCount = 0;
  }
}
