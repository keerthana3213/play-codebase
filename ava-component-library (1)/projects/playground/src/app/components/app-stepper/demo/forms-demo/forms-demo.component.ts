import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    AvaStepperComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <h3>Form Integration</h3>
        <p class="description">
          Seamless integration with Angular forms for multi-step form workflows
          and wizards.
        </p>

        <div class="demo-item">
          <h4>Multi-Step Registration Form</h4>
          <aava-stepper
            [steps]="formSteps"
            [currentStep]="currentFormStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onFormStepChange($event)"
          >
          </aava-stepper>

          <div class="form-container">
            <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
              <!-- Step 1: Personal Information -->
              <div *ngIf="currentFormStep === 0" class="form-step">
                <h5>Personal Information</h5>
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    formControlName="firstName"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    formControlName="lastName"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="form-control"
                  />
                </div>
              </div>

              <!-- Step 2: Contact Details -->
              <div *ngIf="currentFormStep === 1" class="form-step">
                <h5>Contact Details</h5>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    formControlName="phone"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea
                    id="address"
                    formControlName="address"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <!-- Step 3: Preferences -->
              <div *ngIf="currentFormStep === 2" class="form-step">
                <h5>Preferences</h5>
                <div class="form-group">
                  <label for="newsletter">
                    <input
                      type="checkbox"
                      id="newsletter"
                      formControlName="newsletter"
                    />
                    Subscribe to newsletter
                  </label>
                </div>
                <div class="form-group">
                  <label for="notifications">
                    <input
                      type="checkbox"
                      id="notifications"
                      formControlName="notifications"
                    />
                    Enable notifications
                  </label>
                </div>
              </div>

              <!-- Step 4: Review -->
              <div *ngIf="currentFormStep === 3" class="form-step">
                <h5>Review Information</h5>
                <div class="review-data">
                  <p>
                    <strong>Name:</strong>
                    {{ registrationForm.value.firstName }}
                    {{ registrationForm.value.lastName }}
                  </p>
                  <p>
                    <strong>Email:</strong> {{ registrationForm.value.email }}
                  </p>
                  <p>
                    <strong>Phone:</strong> {{ registrationForm.value.phone }}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {{ registrationForm.value.address }}
                  </p>
                  <p>
                    <strong>Newsletter:</strong>
                    {{ registrationForm.value.newsletter ? 'Yes' : 'No' }}
                  </p>
                  <p>
                    <strong>Notifications:</strong>
                    {{ registrationForm.value.notifications ? 'Yes' : 'No' }}
                  </p>
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="previousStep()"
                  [disabled]="currentFormStep === 0"
                >
                  Previous
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  (click)="nextStep()"
                  [disabled]="currentFormStep === formSteps.length - 1"
                >
                  Next
                </button>
                <button
                  type="submit"
                  class="btn btn-success"
                  *ngIf="currentFormStep === formSteps.length - 1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: white;
        padding: 20px;
      }

      .demo-section {
        max-width: 800px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        h3 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
          font-size: 24px;
        }

        .description {
          text-align: center;
          margin-bottom: 30px;
          color: #666;
          font-size: 16px;
        }
      }

      .demo-item {
        margin-bottom: 40px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #fafafa;

        h4 {
          margin-bottom: 15px;
          color: #555;
          font-size: 18px;
        }
      }

      .form-container {
        margin-top: 20px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;

        .form-step {
          h5 {
            margin-bottom: 20px;
            color: #333;
            font-size: 18px;
          }
        }

        .form-group {
          margin-bottom: 15px;

          label {
            display: block;
            margin-bottom: 5px;
            color: #555;
            font-weight: 500;
          }

          .form-control {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;

            &:focus {
              outline: none;
              border-color: #007bff;
              box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }
          }
        }

        .review-data {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          border: 1px solid #e9ecef;

          p {
            margin-bottom: 8px;
            color: #333;
          }
        }

        .form-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: flex-end;

          .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;

            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            &.btn-secondary {
              background-color: #6c757d;
              color: white;

              &:hover:not(:disabled) {
                background-color: #5a6268;
              }
            }

            &.btn-primary {
              background-color: #007bff;
              color: white;

              &:hover:not(:disabled) {
                background-color: #0056b3;
              }
            }

            &.btn-success {
              background-color: #28a745;
              color: white;

              &:hover:not(:disabled) {
                background-color: #1e7e34;
              }
            }
          }
        }
      }
    `,
  ],
})
export class FormsDemoComponent {
  formSteps = ['Personal Info', 'Contact Details', 'Preferences', 'Review'];
  currentFormStep = 0;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      newsletter: [false],
      notifications: [false],
    });
  }

  onFormStepChange(step: number) {
    this.currentFormStep = step;
    console.log('Form step changed to:', step + 1);
  }

  nextStep() {
    if (this.currentFormStep < this.formSteps.length - 1) {
      this.currentFormStep++;
    }
  }

  previousStep() {
    if (this.currentFormStep > 0) {
      this.currentFormStep--;
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      alert('Registration completed successfully!');
    } else {
      console.log('Form is invalid');
    }
  }
}
