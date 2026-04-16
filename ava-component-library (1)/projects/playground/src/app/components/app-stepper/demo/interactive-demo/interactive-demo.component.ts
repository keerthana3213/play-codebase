import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-interactive-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">
            Interactive Stepper (Default)
          </h4>
          <aava-stepper
            [steps]="interactiveSteps"
            [currentStep]="interactiveCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            [interactive]="true"
            (stepChange)="onInteractiveStepChange($event)"
          >
          </aava-stepper>
        </div>

        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">
            Non-Interactive Stepper (Display Only)
          </h4>
          <aava-stepper
            [steps]="nonInteractiveSteps"
            [currentStep]="nonInteractiveCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            [interactive]="false"
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

        .status-text {
          margin-top: 15px;
          color: #666;
          font-weight: 500;

          small {
            color: #888;
            font-size: 14px;
          }
        }
      }
    `,
  ],
})
export class InteractiveDemoComponent {
  interactiveSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  interactiveCurrentStep = 0;

  disabledSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  disabledCurrentStep = 0;

  nonInteractiveSteps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  nonInteractiveCurrentStep = 2;

  onInteractiveStepChange(step: number) {
    this.interactiveCurrentStep = step;
    console.log('Interactive step changed to:', step + 1);
  }

  onDisabledStepChange(step: number) {
    this.disabledCurrentStep = step;
    console.log('Disabled step changed to:', step + 1);
  }
}
