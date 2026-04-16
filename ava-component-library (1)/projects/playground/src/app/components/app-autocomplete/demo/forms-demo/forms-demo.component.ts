import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AavaAutocompleteComponent,
  AavaAutocompleteOption,
} from '@aava/play-core';
import { validationOptions } from '../autocomplete-demo.data';

@Component({
  selector: 'ava-autocomplete-forms-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AavaAutocompleteComponent],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.scss'],
})
export class AppAutocompleteFormsDemoComponent {
  form: FormGroup;
  formSubmitted = false;
  validationOptions = validationOptions;
  emailOptions: AavaAutocompleteOption[] = [
    { label: 'john.doe@example.com', value: 'john.doe@example.com' },
    { label: 'jane.smith@example.com', value: 'jane.smith@example.com' },
    { label: 'bob.johnson@example.com', value: 'bob.johnson@example.com' },
  ];
  phoneOptions: AavaAutocompleteOption[] = [
    { label: '+1 (555) 123-4567', value: '+1 (555) 123-4567' },
    { label: '+1 (555) 987-6543', value: '+1 (555) 987-6543' },
    { label: '+1 (555) 456-7890', value: '+1 (555) 456-7890' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      validationType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\+?[\d\s\-()]+$/)],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  resetForm() {
    this.form.reset();
    this.formSubmitted = false;
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  }
}
