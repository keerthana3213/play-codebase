import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AavaButtonComponent, AavaDialogService, AavaIconComponent } from '@aava/play-core';
import { AavaSelectComponent } from '../../../../../play-core/src/lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../../../play-core/src/lib/components/select/select-option/aava-select-option.component';

@Component({
  selector: 'app-select-modal-example',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AavaButtonComponent,
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaIconComponent
  ],
  template: `
      <div style="padding:24px;">

      <div dialog-header>
        <h4 style="
          color: #111827;
          font-family: Inter;
          font-size: 20px;
          font-weight: 700;
          line-height: 28px;
          margin: 0;
        ">
          Select User Preferences
        </h4>
      </div>

      <!-- Modal Body -->
      <div dialog-body>
        <form [formGroup]="form">

          <!-- User Selection -->
          <div style="margin-bottom: 20px;">
            <aava-select
              size="md"
              label="Select User"
              placeholder="Choose a user"
              formControlName="selectedUser"
              [error]="getFieldError('selectedUser')"
              [required]="true">
              <aava-select-option *ngFor="let user of users" [value]="user.value">
                <div class="option-row">
                  <div class="option-left">
                    <aava-icon iconSize="20" iconName="user"></aava-icon>
                    {{ user.label }}
                  </div>
                </div>
              </aava-select-option>
            </aava-select>
          </div>   
        </form>
      </div>

      <!-- Modal Footer -->
      <div dialog-footer style="display: flex; gap: 12px; justify-content: flex-end;">
        <aava-button
          label="Cancel"
          variant="secondary"
          size="md"
          (userClick)="onCancel()"
          height="44px"
          width="120px">
        </aava-button>
        <aava-button
          label="Save"
          variant="primary"
          size="md"
          (userClick)="onSave()"
          height="44px"
          width="120px"
          [disabled]="!form.valid">
        </aava-button>

      </div>
      </div>
  `,
})
export class SelectModalExampleComponent {
  form: FormGroup;

  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Mike Johnson' },
    { value: 4, label: 'Sarah Wilson' },
    { value: 5, label: 'David Brown' }
  ];

  statusOptions = [
    { value: 'active', label: 'Active', icon: 'circle-check', color: '#10B981' },
    { value: 'inactive', label: 'Inactive', icon: 'x-circle', color: '#EF4444' },
    { value: 'pending', label: 'Pending', icon: 'clock', color: '#F59E0B' },
    { value: 'suspended', label: 'Suspended', icon: 'pause', color: '#6B7280' }
  ];

  categories = [
    { value: 'admin', label: 'Administrator', icon: 'shield-check' },
    { value: 'user', label: 'Standard User', icon: 'user' },
    { value: 'guest', label: 'Guest', icon: 'user-plus' },
    { value: 'moderator', label: 'Moderator', icon: 'eye' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogService: AavaDialogService
  ) {
    this.form = this.fb.group({
      selectedUser: ['', Validators.required],
      status: ['', Validators.required],
      category: ['']
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }

  onSave(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData);

      // Here you would typically:
      // 1. Send data to your API
      // 2. Show success message
      // 3. Close the modal

      this.dialogService.close();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogService.close();
  }
} 