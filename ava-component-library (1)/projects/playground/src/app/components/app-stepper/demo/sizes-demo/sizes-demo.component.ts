import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Extra Small Stepper</h4>
          <aava-stepper
            [steps]="xsmallSteps"
            [currentStep]="xsmallCurrentStep"
            orientation="horizontal"
            size="xs"
            [iconColor]="'#fff'"
            [iconSize]="'16'"
            (stepChange)="onXsmallStepChange($event)"
          >
          </aava-stepper>
        </div>
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Small Stepper</h4>
          <aava-stepper
            [steps]="smallSteps"
            [currentStep]="smallCurrentStep"
            orientation="horizontal"
            size="sm"
            [iconColor]="'#fff'"
            [iconSize]="'16'"
            (stepChange)="onSmallStepChange($event)"
          >
          </aava-stepper>
        </div>

        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">
            Medium Stepper (Default)
          </h4>
          <aava-stepper
            [steps]="mediumSteps"
            [currentStep]="mediumCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onMediumStepChange($event)"
          >
          </aava-stepper>
        </div>

        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Large Stepper</h4>
          <aava-stepper
            [steps]="largeSteps"
            [currentStep]="largeCurrentStep"
            orientation="horizontal"
            size="lg"
            [iconColor]="'#fff'"
            [iconSize]="'24'"
            (stepChange)="onLargeStepChange($event)"
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
          color: #555;
          font-size: 18px;
        }

        .status-text {
          margin-top: 15px;
          color: #666;
          font-weight: 500;
        }
      }
    `,
  ],
})
export class SizesDemoComponent {
  xsmallSteps = ['One', 'Two', 'Three', 'Four', 'Five'];
  xsmallCurrentStep = 0;

  smallSteps = ['One', 'Two', 'Three', 'Four', 'Five'];
  smallCurrentStep = 0;

  mediumSteps = ['Goal', 'Steps', 'Progress', 'Review', 'Finish'];
  mediumCurrentStep = 0;

  largeSteps = ['Research', 'Define', 'Ideate', 'Prototype', 'Test'];
  largeCurrentStep = 0;

  onXsmallStepChange(step: number) {
    this.xsmallCurrentStep = step;
    console.log('Xsmall step changed to:', step + 1);
  }

  onSmallStepChange(step: number) {
    this.smallCurrentStep = step;
    console.log('Small step changed to:', step + 1);
  }

  onMediumStepChange(step: number) {
    this.mediumCurrentStep = step;
    console.log('Medium step changed to:', step + 1);
  }

  onLargeStepChange(step: number) {
    this.largeCurrentStep = step;
    console.log('Large step changed to:', step + 1);
  }
}
