import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-form-integration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AavaTextboxComponent,
  ],
  templateUrl: './textbox-form-integration.component.html',
  styleUrls: ['./textbox-form-integration.component.scss'],
})
export class TextboxFormIntegrationComponent {
  demoForm: FormGroup;
  templateValue = '';
  usernameErrorMessage = signal('');

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      message: [''],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      age: ['', [Validators.min(18), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form submitted:', this.demoForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.demoForm.markAllAsTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.demoForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors?.['pattern']) {
        return `Please enter a valid ${fieldName}`;
      }
      if (field.errors?.['min']) {
        return `${fieldName} must be at least ${field.errors['min'].min}`;
      }
      if (field.errors?.['max']) {
        return `${fieldName} must be at most ${field.errors['max'].max}`;
      }
    }
    return '';
  }

  onTemplateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Template-driven form value changed:', target.value);
  }

  usernameError() {
    const field = this.demoForm.get('username');
    console.log('field', field);
    if (field?.hasError('required')) {
      this.usernameErrorMessage.set('You must enter a value');
    } else if (field?.errors?.['minlength']) {
      this.usernameErrorMessage.set(
        `Username must be at least ${field?.errors['minlength'].requiredLength} characters`
      );
    } else {
      this.usernameErrorMessage.set('');
    }
  }
}
