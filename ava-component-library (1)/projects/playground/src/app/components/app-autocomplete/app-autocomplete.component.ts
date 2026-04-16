import {
  Component,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AavaAutocompleteComponent,
  ],
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAutocompleteComponent {
  // Basic options
  options: AavaAutocompleteOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
    { label: 'Honeydew', value: 'honeydew' },
  ];

  // Async options (mock API)
  apiOptions$: Observable<AavaAutocompleteOption[]>;

  // Demo values
  value = '';
  multiValue: string[] = [];
  asyncValue = '';
  error = '';
  helper = 'Pick a fruit or search for a user.';
  loading = false;
  iconValue = '';

  @ViewChild('customOption', { static: true })
  customOption!: TemplateRef<unknown>;

  constructor(private http: HttpClient) {
    // Example: fetch users from JSONPlaceholder and map to options
    this.apiOptions$ = this.http
      .get<{ name: string; id: string }[]>(
        'https://jsonplaceholder.typicode.com/users'
      )
      .pipe(
        map((users) =>
          users.map((u) => ({ label: u.name, value: u.id, icon: 'user' }))
        )
      );
  }

  onOptionSelected() {
    // Optionally handle selection
  }

  onValueChange() {
    console.log('onValueChange', this.value);
    // Optionally handle value change
  }

  onCleared() {
    // Optionally handle clear
  }
}
