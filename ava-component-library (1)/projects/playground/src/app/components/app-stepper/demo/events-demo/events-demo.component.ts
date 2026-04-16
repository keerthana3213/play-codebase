import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'ava-events-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Step Change Events</h4>
          <aava-stepper
            [steps]="eventSteps"
            [currentStep]="eventCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onStepChange($event)"
          >
          </aava-stepper>
          <p class="status-text">
            Current Step: {{ eventCurrentStep + 1 }} of {{ eventSteps.length }}
          </p>
          <div class="event-log">
            <h5 style="color:var(--color-text-primary)">Event Log:</h5>
            <div class="log-entries">
              <div *ngFor="let log of eventLogs" class="log-entry">
                {{ log }}
              </div>
            </div>
          </div>
        </div>

        <div class="demo-item">
          <h4 style="color:var(--color-text-primary)">Workflow Completion</h4>
          <aava-stepper
            [steps]="completionSteps"
            [currentStep]="completionCurrentStep"
            orientation="horizontal"
            size="md"
            [iconColor]="'#fff'"
            [iconSize]="'20'"
            (stepChange)="onCompletionStepChange($event)"
          >
          </aava-stepper>
          <p class="status-text">
            Current Step: {{ completionCurrentStep + 1 }} of
            {{ completionSteps.length }}
          </p>
          <div *ngIf="workflowCompleted" class="completion-message">
            Workflow completed! All steps finished.
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
          color: var(--color-text-primary);
          font-size: 18px;
        }

        .status-text {
          margin-top: 15px;
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .event-log {
          margin-top: 20px;

          h5 {
            margin-bottom: 10px;
            color: var(--color-text-primary);
            font-size: 16px;
          }

          .log-entries {
            max-height: 150px;
            overflow-y: auto;
            border-radius: 4px;
            padding: 10px;

            .log-entry {
              font-family: monospace;
              font-size: 12px;
              color: var(--color-text-primary);
              margin-bottom: 5px;
              padding: 2px 0;
            }
          }
        }

        .completion-message {
          margin-top: 15px;
          padding: 10px;
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          border-radius: 4px;
          color: #155724;
          font-weight: 500;
        }
      }
    `,
  ],
})
export class EventsDemoComponent {
  eventSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  eventCurrentStep = 0;
  eventLogs: string[] = [];

  completionSteps = ['Setup', 'Configure', 'Test', 'Deploy', 'Complete'];
  completionCurrentStep = 0;
  workflowCompleted = false;

  onStepChange(step: number) {
    this.eventCurrentStep = step;
    const timestamp = new Date().toLocaleTimeString();
    this.eventLogs.unshift(`[${timestamp}] Step changed to: ${step + 1}`);

    // Keep only last 10 logs
    if (this.eventLogs.length > 10) {
      this.eventLogs = this.eventLogs.slice(0, 10);
    }

    console.log('Step change event:', step + 1);
  }

  onCompletionStepChange(step: number) {
    this.completionCurrentStep = step;

    if (step === this.completionSteps.length - 1) {
      this.workflowCompleted = true;
      console.log('Workflow completed!');
    } else {
      this.workflowCompleted = false;
    }

    console.log('Completion step change:', step + 1);
  }
}
