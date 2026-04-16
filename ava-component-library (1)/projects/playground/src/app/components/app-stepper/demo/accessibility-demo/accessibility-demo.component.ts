import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Keyboard Navigation</h4>
          <p class="accessibility-info">
            Use Tab to navigate to the stepper, then Enter or Space to activate
            steps.
          </p>
          <aava-stepper
            [steps]="keyboardSteps"
            [currentStep]="keyboardCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onKeyboardStepChange($event)"
          >
          </aava-stepper>
          <p style="color:var(--color-text-primary)" class="status-text">
            Current Step: {{ keyboardCurrentStep + 1 }} of
            {{ keyboardSteps.length }}
          </p>
          <div class="keyboard-instructions">
            <h5 style="color:var(--color-text-primary)">
              Keyboard Instructions:
            </h5>
            <ul>
              <li>
                <strong>Tab:</strong> Navigate to stepper and between steps
              </li>
              <li><strong>Enter/Space:</strong> Activate focused step</li>
            </ul>
          </div>
        </div>

        <!-- <div class="demo-item">
          <h4>Screen Reader Support</h4>
          <aava-stepper
            [steps]="screenReaderSteps"
            [currentStep]="screenReaderCurrentStep"
            orientation="horizontal"
            size="large"
            [iconColor]="'#fff'"
            [iconSize]="'24'"
            (stepChange)="onScreenReaderStepChange($event)"
          >
          </aava-stepper>
          <p class="status-text">
            Current Step: {{ screenReaderCurrentStep + 1 }} of
            {{ screenReaderSteps.length }}
          </p>
          <div class="screen-reader-info">
            <h5>Screen Reader Features:</h5>
            <ul>
              <li>Descriptive step labels for clear purpose indication</li>
              <li>Context about total number of steps</li>
              <li>Step change announcements</li>
              <li>Completion status in step descriptions</li>
            </ul>
          </div>
        </div> -->
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
          color: var(--color-text-primary);
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
        border-radius: 8px;

        h4 {
          margin-bottom: 15px;
          color: var(--color-text-primary);
          font-size: 18px;
        }

        .accessibility-info {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 4px;
          color: var(--color-text-primary);
          font-size: 14px;
        }

        .status-text {
          margin-top: 15px;
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .keyboard-instructions,
        .screen-reader-info,
        .contrast-info {
          margin-top: 20px;

          h5 {
            margin-bottom: 10px;
            color: var(--color-text-primary);
            font-size: 16px;
          }

          ul {
            list-style-type: none;
            padding-left: 0;

            li {
              margin-bottom: 8px;
              padding-left: 20px;
              position: relative;
              color: var(--color-text-primary);
              font-size: 14px;

              &:before {
                content: '•';
                position: absolute;
                left: 0;
                color: var(--color-primary);
                font-weight: bold;
              }

              strong {
                color: var(--color-text-primary);
              }
            }
          }
        }
      }
    `,
  ],
})
export class AccessibilityDemoComponent {
  keyboardSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  keyboardCurrentStep = 0;

  screenReaderSteps = [
    'Personal Information',
    'Contact Details',
    'Preferences',
    'Review & Submit',
  ];
  screenReaderCurrentStep = 0;

  highContrastSteps = [
    'Account Setup',
    'Profile Info',
    'Preferences',
    'Confirmation',
  ];
  highContrastCurrentStep = 0;

  onKeyboardStepChange(step: number) {
    this.keyboardCurrentStep = step;
    console.log('Keyboard step changed to:', step + 1);
  }

  onScreenReaderStepChange(step: number) {
    this.screenReaderCurrentStep = step;
    console.log('Screen reader step changed to:', step + 1);
  }

  onHighContrastStepChange(step: number) {
    this.highContrastCurrentStep = step;
    console.log('High contrast step changed to:', step + 1);
  }
}
