import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-animation-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <h3>Animation Effects</h3>
        <p class="description">
          Advanced animation system with smooth transitions and progress
          visualization.
        </p>

        <div class="demo-item">
          <h4>Animated Progress Stepper</h4>
          <aava-stepper
            [steps]="animatedSteps"
            [currentStep]="animatedCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onAnimatedStepChange($event)"
          >
          </aava-stepper>
          <p class="status-text">
            Current Step: {{ animatedCurrentStep + 1 }} of
            {{ animatedSteps.length }}
          </p>
          <div class="animation-controls">
            <button
              class="btn btn-primary"
              (click)="autoProgress()"
              [disabled]="isAutoProgressing"
            >
              {{ isAutoProgressing ? 'Progressing...' : 'Auto Progress' }}
            </button>
            <button class="btn btn-secondary" (click)="resetProgress()">
              Reset
            </button>
          </div>
        </div>

        <div class="demo-item">
          <h4>Vertical Animated Stepper</h4>
          <div class="vertical-container">
            <aava-stepper
              [steps]="verticalAnimatedSteps"
              [currentStep]="verticalAnimatedCurrentStep"
              orientation="vertical"
              size="lg"
              [iconColor]="'#fff'"
              [iconSize]="'24'"
              (stepChange)="onVerticalAnimatedStepChange($event)"
            >
            </aava-stepper>
          </div>
          <p class="status-text">
            Current Step: {{ verticalAnimatedCurrentStep + 1 }} of
            {{ verticalAnimatedSteps.length }}
          </p>
        </div>

        <div class="demo-item">
          <h4>Large Animated Stepper</h4>
          <aava-stepper
            [steps]="largeAnimatedSteps"
            [currentStep]="largeAnimatedCurrentStep"
            orientation="horizontal"
            size="lg"
            [iconColor]="'#fff'"
            [iconSize]="'24'"
            (stepChange)="onLargeAnimatedStepChange($event)"
          >
          </aava-stepper>
          <p class="status-text">
            Current Step: {{ largeAnimatedCurrentStep + 1 }} of
            {{ largeAnimatedSteps.length }}
          </p>
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

        .status-text {
          margin-top: 15px;
          color: #666;
          font-weight: 500;
        }

        .animation-controls {
          margin-top: 15px;
          display: flex;
          gap: 10px;

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

            &.btn-primary {
              background-color: #007bff;
              color: white;

              &:hover:not(:disabled) {
                background-color: #0056b3;
              }
            }

            &.btn-secondary {
              background-color: #6c757d;
              color: white;

              &:hover:not(:disabled) {
                background-color: #5a6268;
              }
            }
          }
        }

        .vertical-container {
          display: flex;
          justify-content: center;
          min-height: 300px;
        }
      }
    `,
  ],
})
export class AnimationDemoComponent {
  animatedSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  animatedCurrentStep = 0;
  isAutoProgressing = false;

  verticalAnimatedSteps = ['Setup', 'Configure', 'Test', 'Deploy'];
  verticalAnimatedCurrentStep = 0;

  largeAnimatedSteps = ['Research', 'Design', 'Develop', 'Test', 'Launch'];
  largeAnimatedCurrentStep = 0;

  onAnimatedStepChange(step: number) {
    this.animatedCurrentStep = step;
    console.log('Animated step changed to:', step + 1);
  }

  onVerticalAnimatedStepChange(step: number) {
    this.verticalAnimatedCurrentStep = step;
    console.log('Vertical animated step changed to:', step + 1);
  }

  onLargeAnimatedStepChange(step: number) {
    this.largeAnimatedCurrentStep = step;
    console.log('Large animated step changed to:', step + 1);
  }

  autoProgress() {
    if (this.isAutoProgressing) return;

    this.isAutoProgressing = true;
    let currentStep = this.animatedCurrentStep;

    const interval = setInterval(() => {
      if (currentStep < this.animatedSteps.length - 1) {
        currentStep++;
        this.animatedCurrentStep = currentStep;
      } else {
        clearInterval(interval);
        this.isAutoProgressing = false;
      }
    }, 1500);
  }

  resetProgress() {
    this.animatedCurrentStep = 0;
    this.isAutoProgressing = false;
  }
}
