import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-orientation-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">
            Horizontal Orientation (Default)
          </h4>
          <aava-stepper
            [steps]="horizontalSteps"
            [currentStep]="horizontalCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onHorizontalStepChange($event)"
          >
          </aava-stepper>
        </div>

        <div class="demo-item vertical-container">
          <h4 style="color:var(--color-text-primary)">Vertical Orientation</h4>
          <div class="vertical-stepper-wrapper">
            <aava-stepper
              [steps]="verticalSteps"
              [currentStep]="verticalCurrentStep"
              orientation="vertical"
              size="md"
              [iconColor]="'#fff'"
              [iconSize]="'20'"
              (stepChange)="onVerticalStepChange($event)"
            >
            </aava-stepper>
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
        border-radius: 8px;

        h4 {
          margin-bottom: 15px;
          color: #555;
          font-size: 18px;
        }

        .status-text {
          margin-top: 15px;
          color: #666;
          font-weight: 500;
        }
      }

      .vertical-container {
        .vertical-stepper-wrapper {
          display: flex;
          justify-content: center;
          min-height: 300px;
        }
      }
    `,
  ],
})
export class OrientationDemoComponent {
  horizontalSteps = [
    'Personal Info',
    'Contact Details',
    'Preferences',
    'Review',
    'Submit',
  ];
  horizontalCurrentStep = 0;

  verticalSteps = [
    'Account Setup',
    'Profile Info',
    'Preferences',
    'Confirmation',
  ];
  verticalCurrentStep = 0;

  onHorizontalStepChange(step: number) {
    this.horizontalCurrentStep = step;
    console.log('Horizontal step changed to:', step + 1);
  }

  onVerticalStepChange(step: number) {
    this.verticalCurrentStep = step;
    console.log('Vertical step changed to:', step + 1);
  }
}
