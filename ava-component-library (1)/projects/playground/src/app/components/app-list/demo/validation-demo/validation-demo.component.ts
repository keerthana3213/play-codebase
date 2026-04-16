import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AavaListComponent,
  AavaButtonComponent,
  ListItem,
  ListSelectionEvent,
} from '@aava/play-core';

@Component({
  selector: 'ava-list-validation-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AavaListComponent,
    AavaButtonComponent
  ],
  template: `
    <div class="validation-demo-wrapper">
      <div class="demo-description">
        <h3>List Validation</h3>
        <p>
          Built-in validation system with customizable error messages, positioning, and timing control.
        </p>
      </div>

      <div class="validation-examples">
        <!-- Required Validation -->
        <div class="validation-section">
          <h4>Required Validation</h4>
          <p>Basic required field validation with custom error message.</p>
          
          <aava-list
            [items]="requiredItems"
            [title]="'Select a Team Member (Required)'"
            [required]="true"
            [errorMessage]="'Please select a team member to continue'"
            [errorPosition]="'bottom'"
            [showErrorImmediately]="false"
            (onOptionSelected)="onRequiredItemSelected($event)"
            (onSelectionChanged)="onRequiredSelectionChanged($event)"
          ></aava-list>

          <div class="validation-status">
            <p><strong>Status:</strong> {{ requiredValidationStatus }}</p>
            <p><strong>Selected:</strong> {{ requiredSelectedItem ? requiredSelectedItem.title : 'None' }}</p>
          </div>
        </div>

        <!-- Multi-Selection Validation -->
        <div class="validation-section">
          <h4>Multi-Selection Validation</h4>
          <p>Validation with selection limits and custom error positioning.</p>
          
          <aava-list
            [items]="multiSelectItems"
            [title]="'Select Team Members (2-4 required)'"
            [multiSelect]="true"
            [maxSelections]="4"
            [required]="true"
            [errorMessage]="'Please select between 2 and 4 team members'"
            [errorPosition]="'top'"
            [showErrorImmediately]="true"
            (onSelectionChanged)="onMultiSelectionChanged($event)"
          ></aava-list>

          <div class="validation-status">
            <p><strong>Status:</strong> {{ multiValidationStatus }}</p>
            <p><strong>Selected:</strong> {{ multiSelectedItems.length }} items</p>
            <p><strong>Can Select More:</strong> {{ canSelectMore() ? 'Yes' : 'No' }}</p>
          </div>
        </div>

        <!-- Form Integration with Validation -->
        <div class="validation-section">
          <h4>Form Integration with Validation</h4>
          <p>Reactive form with validation and error handling.</p>
          
          <form [formGroup]="validationForm" (ngSubmit)="onFormSubmit()">
            <aava-list
              [items]="formItems"
              [title]="'Project Team Selection'"
              [multiSelect]="true"
              [required]="true"
              [errorMessage]="'Please select at least one team member for the project'"
              [errorPosition]="'bottom'"
              [showErrorImmediately]="false"
              formControlName="teamMembers"
              (onSelectionChanged)="onFormSelectionChanged($event)"
            ></aava-list>

            <div class="form-actions">
              <aava-button
                label="Submit Form"
                variant="primary"
                [disabled]="!validationForm.valid"
                (userClick)="onFormSubmit()"
              ></aava-button>
              
              <aava-button
                label="Reset Form"
                variant="secondary"
                (userClick)="resetForm()"
              ></aava-button>
            </div>

            <div class="form-status">
              <p><strong>Form Valid:</strong> {{ validationForm.valid ? 'Yes' : 'No' }}</p>
              <p><strong>Form Touched:</strong> {{ validationForm.touched ? 'Yes' : 'No' }}</p>
              <p><strong>Form Dirty:</strong> {{ validationForm.dirty ? 'Yes' : 'No' }}</p>
              <p><strong>Selected Members:</strong> {{ formSelectedItems.length }}</p>
            </div>
          </form>
        </div>

        <!-- Programmatic Validation Control -->
        <div class="validation-section">
          <h4>Programmatic Validation Control</h4>
          <p>Manual validation triggering and state management.</p>
          
          <aava-list
            #programmaticList
            [items]="programmaticItems"
            [title]="'Manual Validation Control'"
            [required]="true"
            [errorMessage]="'This list requires manual validation'"
            [errorPosition]="'bottom'"
            [showErrorImmediately]="false"
            (onSelectionChanged)="onProgrammaticSelectionChanged($event)"
          ></aava-list>

          <div class="validation-controls">
            <aava-button
              label="Validate Now"
              variant="primary"
              (userClick)="triggerValidation()"
            ></aava-button>
            
            <aava-button
              label="Reset Validation"
              variant="secondary"
              (userClick)="resetValidation()"
            ></aava-button>
            
            <aava-button
              label="Show Error"
              variant="danger"
              (userClick)="showErrorImmediately()"
            ></aava-button>
          </div>

          <div class="validation-status">
            <p><strong>Validation Status:</strong> {{ programmaticValidationStatus }}</p>
            <p><strong>Selected:</strong> {{ programmaticSelectedItems.length }} items</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .validation-demo-wrapper {
        max-width: 1200px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-description {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .demo-description h3 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-2xl);
      }

      .demo-description p {
        color: var(--color-text-secondary);
        line-height: 1.6;
        font-size: var(--global-font-size-lg);
      }

      .validation-examples {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .validation-section {
        // background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 2rem;
        border: 1px solid var(--color-border-subtle);
      }

      .validation-section h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-xl);
      }

      .validation-section p {
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .validation-status {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        border: 1px solid var(--color-border-subtle);
      }

      .validation-status p {
        margin: 0.5rem 0;
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
      }

      .validation-status strong {
        color: var(--color-text-primary);
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
      }

      .form-status {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        border: 1px solid var(--color-border-subtle);
      }

      .form-status p {
        margin: 0.5rem 0;
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
      }

      .form-status strong {
        color: var(--color-text-primary);
      }

      .validation-controls {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
      }

      @media (max-width: 768px) {
        .validation-demo-wrapper {
          margin: 1rem;
        }
        
        .validation-section {
          padding: 1rem;
        }
        
        .form-actions,
        .validation-controls {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class ValidationDemoComponent {
  requiredSelectedItem: ListItem | null = null;
  multiSelectedItems: ListItem[] = [];
  formSelectedItems: ListItem[] = [];
  programmaticSelectedItems: ListItem[] = [];

  requiredValidationStatus = 'No selection made';
  multiValidationStatus = 'No selection made';
  programmaticValidationStatus = 'No validation triggered';

  validationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validationForm = this.fb.group({
      teamMembers: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  // Sample data
  requiredItems: ListItem[] = [
    {
      id: '1',
      title: 'John Doe',
      subtitle: 'Software Engineer',
      avatar: {
        profileText: 'JD',
        size: 'md',
        shape: 'pill',
        active: true
      }
    },
    {
      id: '2',
      title: 'Jane Smith',
      subtitle: 'Product Manager',
      avatar: {
        profileText: 'JS',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '3',
      title: 'Bob Johnson',
      subtitle: 'UX Designer',
      avatar: {
        profileText: 'BJ',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  multiSelectItems: ListItem[] = [
    {
      id: '1',
      title: 'Alice Brown',
      subtitle: 'Data Scientist',
      avatar: {
        profileText: 'AB',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '2',
      title: 'Charlie Wilson',
      subtitle: 'DevOps Engineer',
      avatar: {
        profileText: 'CW',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '3',
      title: 'Diana Miller',
      subtitle: 'QA Engineer',
      avatar: {
        profileText: 'DM',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '4',
      title: 'Evan Davis',
      subtitle: 'Frontend Developer',
      avatar: {
        profileText: 'ED',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '5',
      title: 'Fiona Garcia',
      subtitle: 'Backend Developer',
      avatar: {
        profileText: 'FG',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  formItems: ListItem[] = [
    {
      id: '1',
      title: 'Grace Lee',
      subtitle: 'UI Designer',
      avatar: {
        profileText: 'GL',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '2',
      title: 'Henry Taylor',
      subtitle: 'Mobile Developer',
      avatar: {
        profileText: 'HT',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '3',
      title: 'Ivy Chen',
      subtitle: 'Product Owner',
      avatar: {
        profileText: 'IC',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  programmaticItems: ListItem[] = [
    {
      id: '1',
      title: 'Jack Anderson',
      subtitle: 'Scrum Master',
      avatar: {
        profileText: 'JA',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '2',
      title: 'Kate Martinez',
      subtitle: 'Business Analyst',
      avatar: {
        profileText: 'KM',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  // Event handlers
  onRequiredItemSelected(item: ListItem): void {
    this.requiredSelectedItem = item;
    this.requiredValidationStatus = `Selected: ${item.title}`;
    console.log('Required item selected:', item);
  }

  onRequiredSelectionChanged(event: ListSelectionEvent): void {
    console.log('Required selection changed:', event);
  }

  onMultiSelectionChanged(event: ListSelectionEvent): void {
    this.multiSelectedItems = event.selectedItems;
    this.multiValidationStatus = `Selected ${event.selectedItems.length} items`;
    console.log('Multi-selection changed:', event);
  }

  onFormSelectionChanged(event: ListSelectionEvent): void {
    this.formSelectedItems = event.selectedItems;
    console.log('Form selection changed:', event);
  }

  onProgrammaticSelectionChanged(event: ListSelectionEvent): void {
    this.programmaticSelectedItems = event.selectedItems;
    console.log('Programmatic selection changed:', event);
  }

  // Form methods
  onFormSubmit(): void {
    if (this.validationForm.valid) {
      console.log('Form submitted successfully:', this.validationForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form validation failed');
      this.validationForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.validationForm.reset();
    this.formSelectedItems = [];
  }

  // Validation control methods
  triggerValidation(): void {
    this.programmaticValidationStatus = 'Validation triggered';
    console.log('Manual validation triggered');
  }

  resetValidation(): void {
    this.programmaticValidationStatus = 'Validation reset';
    console.log('Validation reset');
  }

  showErrorImmediately(): void {
    this.programmaticValidationStatus = 'Error shown immediately';
    console.log('Error shown immediately');
  }

  canSelectMore(): boolean {
    return this.multiSelectedItems.length < 4;
  }
}
