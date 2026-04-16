import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-forms-integration-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent, ReactiveFormsModule, FormsModule],
  template: `
    <div class="demo-container">
      <h2>Forms Integration</h2>
      <p>
        Seamless integration with Angular reactive and template-driven forms.
      </p>

      <div class="forms-grid">
        <div class="form-section">
          <h3>Reactive Form Example</h3>
          <form [formGroup]="reactiveForm" (ngSubmit)="onReactiveSubmit()">
            <div class="form-field">
              <label for="eventName">Event Name:</label>
              <input
                type="text"
                id="eventName"
                formControlName="eventName"
                placeholder="Enter event name"
              />
            </div>

            <div class="form-field">
              <label>Event Date:</label>
              <aava-datepicker
                [alwaysOpen]="true"
                formControlName="eventDate"
                (dateSelected)="onDateSelected($event)"
              >
              </aava-datepicker>
            </div>

            <div class="form-field">
              <label for="description">Description:</label>
              <textarea
                id="description"
                formControlName="description"
                placeholder="Enter event description"
                rows="3"
              >
              </textarea>
            </div>

            <button type="submit" [disabled]="!reactiveForm.valid">
              Create Event
            </button>
          </form>

          <div class="form-status" *ngIf="reactiveFormData">
            <h4>Form Data:</h4>
            <pre>{{ reactiveFormData | json }}</pre>
          </div>
        </div>

        <div class="form-section">
          <h3>Template-Driven Form Example</h3>
          <form #templateForm="ngForm" (ngSubmit)="onTemplateSubmit()">
            <div class="form-field">
              <label for="templateEventName">Event Name:</label>
              <input
                type="text"
                id="templateEventName"
                name="eventName"
                [(ngModel)]="templateFormData.eventName"
                required
                placeholder="Enter event name"
              />
            </div>

            <div class="form-field">
              <label>Event Date:</label>
              <aava-datepicker
                [alwaysOpen]="true"
                [(ngModel)]="templateFormData.eventDate"
                name="eventDate"
                (dateSelected)="onTemplateDateSelected($event)"
              >
              </aava-datepicker>
            </div>

            <div class="form-field">
              <label for="templateDescription">Description:</label>
              <textarea
                id="templateDescription"
                name="description"
                [(ngModel)]="templateFormData.description"
                placeholder="Enter event description"
                rows="3"
              >
              </textarea>
            </div>

            <button type="submit" [disabled]="!templateForm.valid">
              Create Event
            </button>
          </form>

          <div class="form-status" *ngIf="submittedTemplateData">
            <h4>Form Data:</h4>
            <pre>{{ submittedTemplateData | json }}</pre>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3>Forms Integration Features:</h3>
        <ul>
          <li>
            <strong>ControlValueAccessor:</strong> Implements Angular's
            ControlValueAccessor interface
          </li>
          <li>
            <strong>Reactive Forms:</strong> Full support for FormControl,
            FormGroup, and FormArray
          </li>
          <li>
            <strong>Template Forms:</strong> Works with ngModel for two-way data
            binding
          </li>
          <li>
            <strong>Validation:</strong> Integrates with Angular's validation
            system
          </li>
          <li>
            <strong>Error Handling:</strong> Proper error state management
          </li>
          <li>
            <strong>Accessibility:</strong> Maintains accessibility in form
            contexts
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        text-align: center;
      }

      p {
        color: var(--text-color-secondary);
        margin-bottom: 2rem;
        text-align: center;
      }

      .forms-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .form-section {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
      }

      .form-section h3 {
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .form-field {
        margin-bottom: 1.5rem;
      }

      .form-field label {
        display: block;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .form-field input,
      .form-field textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        background: var(--surface-ground);
        color: var(--text-primary);
        font-family: inherit;
      }

      .form-field input:focus,
      .form-field textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
      }

      .form-field textarea {
        resize: vertical;
        min-height: 80px;
      }

      button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-weight: 500;
        width: 100%;
      }

      button:hover:not(:disabled) {
        background: var(--primary-color-dark);
      }

      button:disabled {
        background: var(--surface-border);
        color: var(--text-color-secondary);
        cursor: not-allowed;
      }

      .form-status {
        margin-top: 1.5rem;
        padding: 1rem;
        background: var(--surface-ground);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
      }

      .form-status h4 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .form-status pre {
        background: var(--surface);
        padding: 0.5rem;
        border-radius: var(--border-radius);
        font-size: 0.8rem;
        overflow-x: auto;
        margin: 0;
      }

      .info-box {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
      }

      .info-box h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }

      .info-box ul {
        margin: 0;
        padding-left: 1.5rem;
        color: var(--text-color-secondary);
      }

      .info-box li {
        margin-bottom: 0.5rem;
      }

      @media (max-width: 768px) {
        .forms-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FormsIntegrationDemoComponent {
  reactiveForm: FormGroup;
  reactiveFormData: Record<string, unknown> | null = null;

  templateFormData = {
    eventName: '',
    eventDate: null as Date | null,
    description: '',
  };
  submittedTemplateData: Record<string, unknown> | null = null;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: [null, Validators.required],
      description: [''],
    });
  }

  onDateSelected(date: Date) {
    console.log('Reactive form date selected:', date);
  }

  onTemplateDateSelected(date: Date) {
    console.log('Template form date selected:', date);
  }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      this.reactiveFormData = this.reactiveForm.value;
      console.log('Reactive form submitted:', this.reactiveFormData);
    }
  }

  onTemplateSubmit() {
    this.submittedTemplateData = { ...this.templateFormData };
    console.log('Template form submitted:', this.submittedTemplateData);
  }
}
