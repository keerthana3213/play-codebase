import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-events-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="events-examples">
        <div class="example-group">
          <h4 style="color: var(--text-primary)">Event Handling</h4>
          <p style="color: var(--text-secondary)" class="example-description">
            Basic event handling with console logging and state tracking.
          </p>

          <div class="checkbox-group">
            <aava-checkbox
              label="Event Demo Checkbox"
              [(isChecked)]="eventStates.demo"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Another Event Checkbox"
              [(isChecked)]="eventStates.another"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
          </div>

          <div class="event-log">
            <h5 style="color: var(--text-primary)">Event Log:</h5>
            <div class="log-entries">
              <div *ngFor="let entry of eventLog" class="log-entry">
                <span class="timestamp">{{ entry.timestamp }}</span>
                <span style="color: var(--text-secondary)" class="message">{{
                  entry.message
                }}</span>
              </div>
              <div
                style="color: var(--text-secondary)"
                *ngIf="eventLog.length === 0"
                class="no-events"
              >
                No events yet. Try clicking the checkboxes above.
              </div>
            </div>
            <button class="clear-log" (click)="clearEventLog()">
              Clear Log
            </button>
          </div>
        </div>

        <!-- <div class="example-group">
          <h4>Event Timing by Variant</h4>
          <p class="example-description">
            Different variants have different animation timings that affect when
            events are emitted.
          </p>

          <div class="timing-examples">
            <div class="timing-item">
              <h5>Default Variant</h5>
              <p>Immediate for checking, 300ms delay for unchecking</p>
              <aava-checkbox
                label="Default timing"
                variant="default"
                [(isChecked)]="timingStates.default"
                (isCheckedChange)="onTimingChange('default', $event)"
              >
              </aava-checkbox>
            </div>

            <div class="timing-item">
              <h5>With-bg Variant</h5>
              <p>150ms delay for both checking and unchecking</p>
              <aava-checkbox
                label="With-bg timing"
                variant="with-bg"
                [(isChecked)]="timingStates.withBg"
                (isCheckedChange)="onTimingChange('with-bg', $event)"
              >
              </aava-checkbox>
            </div>

            <div class="timing-item">
              <h5>Animated Variant</h5>
              <p>600ms delay for checking, 300ms delay for unchecking</p>
              <aava-checkbox
                label="Animated timing"
                variant="animated"
                [(isChecked)]="timingStates.animated"
                (isCheckedChange)="onTimingChange('animated', $event)"
              >
              </aava-checkbox>
            </div>
          </div>
        </div>

        <div class="example-group">
          <h4>Indeterminate Event Handling</h4>
          <p class="example-description">
            Special event handling for indeterminate state transitions.
          </p>

          <div class="indeterminate-example">
            <aava-checkbox
              label="Parent checkbox"
              [isChecked]="indeterminateStates.parent"
              [indeterminate]="indeterminateStates.indeterminate"
              (isCheckedChange)="onIndeterminateChange($event)"
            >
            </aava-checkbox>

            <div class="child-checkboxes">
              <aava-checkbox
                *ngFor="let child of indeterminateChildren; let i = index"
                [label]="child.label"
                [isChecked]="child.checked"
                (isCheckedChange)="onIndeterminateChildChange(i, $event)"
              >
              </aava-checkbox>
            </div>

            <div class="indeterminate-info">
              <p>
                <strong>Current State:</strong>
                <span *ngIf="indeterminateStates.parent">Checked</span>
                <span
                  *ngIf="
                    !indeterminateStates.parent &&
                    !indeterminateStates.indeterminate
                  "
                  >Unchecked</span
                >
                <span *ngIf="indeterminateStates.indeterminate"
                  >Indeterminate</span
                >
              </p>
            </div>
          </div>
        </div>

        <div class="events-info">
          <h4>Event Details</h4>
          <div class="info-grid">
            <div class="info-item">
              <h5>isCheckedChange Event</h5>
              <ul>
                <li><strong>Type:</strong> EventEmitter&lt;boolean&gt;</li>
                <li>
                  <strong>Emitted when:</strong> User clicks checkbox or uses
                  keyboard
                </li>
                <li>
                  <strong>Value:</strong> true when checked, false when
                  unchecked
                </li>
                <li>
                  <strong>Indeterminate:</strong> Emits true when transitioning
                  from indeterminate
                </li>
              </ul>
            </div>
            <div class="info-item">
              <h5>Event Timing</h5>
              <ul>
                <li>
                  <strong>Default:</strong> Immediate for checking, 300ms delay
                  for unchecking
                </li>
                <li>
                  <strong>With-bg:</strong> 150ms delay for both checking and
                  unchecking
                </li>
                <li>
                  <strong>Animated:</strong> 600ms delay for checking, 300ms
                  delay for unchecking
                </li>
              </ul>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
      }
      .demo-section {
        margin-bottom: 2rem;
        padding: 2rem;
        margin-top: 0;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #666;
        margin-bottom: 2rem;
        text-align: center;
      }
      .events-examples {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .example-group {
        padding: 1.5rem;
        margin-top: 0;
      }
      .example-group h4 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .example-description {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .event-log {
        background: var(--background-secondary);
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .event-log h5 {
        margin: 0 0 0.75rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .log-entries {
        max-height: 200px;
        overflow-y: auto;
        margin-bottom: 1rem;
      }
      .log-entry {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      }
      .timestamp {
        color: #6b7280;
        min-width: 80px;
      }
      .message {
        color: #1f2937;
      }
      .no-events {
        color: #9ca3af;
        font-style: italic;
      }
      .clear-log {
        background: var(--button-primary-color);
        color: red;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .clear-log:hover {
        background: var(--button-primary-color-hover);
      }
      .timing-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      .timing-item {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .timing-item h5 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .timing-item p {
        margin: 0 0 0.75rem 0;
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      .indeterminate-example {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .child-checkboxes {
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .indeterminate-info {
        background: #f9fafb;
        padding: 0.75rem;
        border-radius: 4px;
        border: 1px solid #e5e7eb;
      }
      .indeterminate-info p {
        margin: 0;
        font-size: 0.9rem;
      }
      .events-info {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }
      .events-info h4 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      .info-item {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .info-item h5 {
        margin: 0 0 0.75rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .info-item ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .info-item li {
        margin-bottom: 0.25rem;
        line-height: 1.4;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class EventsDemoComponent {
  eventStates = {
    demo: false,
    another: false,
  };

  timingStates = {
    default: false,
    withBg: false,
    animated: false,
  };

  indeterminateStates = {
    parent: false,
    indeterminate: false,
  };

  indeterminateChildren = [
    { label: 'Child 1', checked: false },
    { label: 'Child 2', checked: false },
    { label: 'Child 3', checked: false },
  ];

  eventLog: Array<{ timestamp: string; message: string }> = [];

  onCheckboxChange(checked: boolean) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({
      timestamp,
      message: `Checkbox changed to: ${checked}`,
    });
    console.log('Checkbox changed:', checked);
  }

  onTimingChange(variant: string, checked: boolean) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({
      timestamp,
      message: `${variant} variant changed to: ${checked}`,
    });
    console.log(`${variant} variant changed:`, checked);
  }

  onIndeterminateChange(checked: boolean) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({
      timestamp,
      message: `Parent checkbox changed to: ${checked}`,
    });
    console.log('Parent checkbox changed:', checked);
  }

  onIndeterminateChildChange(index: number, checked: boolean) {
    this.indeterminateChildren[index].checked = checked;
    this.updateIndeterminateState();

    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({
      timestamp,
      message: `Child ${index + 1} changed to: ${checked}`,
    });
  }

  updateIndeterminateState() {
    const total = this.indeterminateChildren.length;
    const checkedCount = this.indeterminateChildren.filter(
      (c) => c.checked
    ).length;

    if (checkedCount === total) {
      this.indeterminateStates.parent = true;
      this.indeterminateStates.indeterminate = false;
    } else if (checkedCount === 0) {
      this.indeterminateStates.parent = false;
      this.indeterminateStates.indeterminate = false;
    } else {
      this.indeterminateStates.parent = false;
      this.indeterminateStates.indeterminate = true;
    }
  }

  clearEventLog() {
    this.eventLog = [];
  }
}
