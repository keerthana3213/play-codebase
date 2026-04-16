import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <aava-stepper
            [steps]="steps"
            [currentStep]="currentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onStepChange($event)"
          >
          </aava-stepper>
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
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  currentStep = 0;

  verticalSteps = ['Login', 'Profile', 'Settings', 'Review', 'Complete'];
  verticalCurrentStep = 0;

  onStepChange(step: number) {
    this.currentStep = step;
    console.log('Step changed to:', step + 1);
  }

  onVerticalStepChange(step: number) {
    this.verticalCurrentStep = step;
    console.log('Vertical step changed to:', step + 1);
  }
}
