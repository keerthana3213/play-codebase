import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-form-integration-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AavaSelectComponent, AavaSelectOptionComponent, AavaButtonComponent],
  templateUrl: './form-integration-demo.component.html',
  styleUrls: ['./form-integration-demo.component.scss']
})
export class FormIntegrationDemoComponent {
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      userId: [null, Validators.required]
    });

    console.log('Form Integration Demo Component loaded!');
  }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Reactive form submitted:', this.reactiveForm.value);
    } else {
      this.reactiveForm.markAllAsTouched();
      console.log('Reactive form is invalid');
    }
  }

  resetReactiveForm() {
    this.reactiveForm.reset();
  }

  getFieldError(fieldName: string): string {
    const field = this.reactiveForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return 'This field is required';
      }
    }
    return '';
  }
}
