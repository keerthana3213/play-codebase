import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-states-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="states-grid">
        <div class="state-group">
          <h4 style="color: var(--text-primary)">Default States</h4>
          <div class="checkbox-examples">
            <aava-checkbox
              label="Unchecked"
              [isChecked]="false"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Checked"
              [isChecked]="true"
            >
            </aava-checkbox>
          </div>
        </div>

        <div class="state-group">
          <h4 style="color: var(--text-primary)">Disabled States</h4>
          <div class="checkbox-examples">
            <aava-checkbox
              label="Disabled Unchecked"
              [disable]="true"
              [isChecked]="false"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Disabled Checked"
              [disable]="true"
              [isChecked]="true"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Disabled Indeterminate"
              [disable]="true"
              [indeterminate]="true"
            >
            </aava-checkbox>
          </div>
        </div>

        <div class="state-group">
          <h4 style="color: var(--text-primary)">Indeterminate State</h4>
          <div class="checkbox-examples">
            <aava-checkbox label="Indeterminate" [indeterminate]="true">
            </aava-checkbox>
            <aava-checkbox
              label="Indeterminate (With-bg)"
              variant="with-bg"
              [indeterminate]="true"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Indeterminate (Animated)"
              variant="animated"
              [indeterminate]="true"
            >
            </aava-checkbox>
          </div>
        </div>
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
        max-width: 870px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #666;
        margin-bottom: 2rem;
        text-align: center;
      }
      .states-grid {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 2rem;
      }
      .state-group {
        padding: 1.5rem;
        margin-top: 0;
      }
      .state-group h4 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .checkbox-examples {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .state-info {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }
      .state-info h4 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .state-info ul {
        margin: 0;
        padding-left: 1.5rem;
      }
      .state-info li {
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }
    `,
  ],
})
export class StatesDemoComponent {
  defaultStates = {
    unchecked: false,
    checked: true,
  };

  disabledStates = {
    unchecked: false,
    checked: true,
  };

  onCheckboxChange(checked: boolean) {
    console.log('Checkbox changed:', checked);
  }
}
