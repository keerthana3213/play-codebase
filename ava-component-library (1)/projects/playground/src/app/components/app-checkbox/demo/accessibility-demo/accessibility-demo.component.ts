import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="accessibility-examples">
        <div class="example-group">
          <h4 style="color: var(--text-primary)">Keyboard Navigation</h4>
          <p style="color: var(--text-secondary)" class="example-description">
            Use Tab to navigate between checkboxes, Space or Enter to toggle
            states.
          </p>

          <div class="checkbox-group">
            <aava-checkbox
              label="First checkbox (Tab to focus)"
              [(isChecked)]="keyboardStates.first"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Second checkbox (Space/Enter to toggle)"
              [(isChecked)]="keyboardStates.second"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Third checkbox (Try keyboard navigation)"
              [(isChecked)]="keyboardStates.third"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
          </div>
        </div>

        <div class="example-group">
          <h4 style="color: var(--text-primary)">ARIA Compliance</h4>
          <p style="color: var(--text-secondary)" class="example-description">
            Proper ARIA attributes for screen readers and assistive
            technologies.
          </p>

          <div class="aria-examples">
            <aava-checkbox
              label="Standard checkbox with ARIA"
              [(isChecked)]="ariaStates.standard"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Indeterminate checkbox (aria-checked='mixed')"
              [indeterminate]="true"
            >
            </aava-checkbox>
            <aava-checkbox
              label="Disabled checkbox (aria-disabled='true')"
              [disable]="true"
              [isChecked]="true"
            >
            </aava-checkbox>
          </div>
        </div>

        <div class="example-group">
          <h4 style="color: var(--text-primary)">Label Examples</h4>
          <p style="color: var(--text-secondary)" class="example-description">
            Different ways to provide accessible labels for checkboxes.
          </p>

          <div class="label-examples">
            <aava-checkbox
              label="Checkbox with visible label"
              [(isChecked)]="labelStates.visible"
              (isCheckedChange)="onCheckboxChange($event)"
            >
            </aava-checkbox>

            <aava-checkbox
              label="Clickable label (clicking label toggles checkbox)"
              [(isChecked)]="labelStates.clickable"
              (isCheckedChange)="onCheckboxChange($event)"
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
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #4b5563;
        margin-bottom: 2rem;
        text-align: center;
      }
      .accessibility-examples {
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
        color: #1e40af;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .example-description {
        color: #374151;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }
      .checkbox-group,
      .aria-examples,
      .label-examples {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .accessibility-info {
        background: #f8fafc;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }
      .accessibility-info h4 {
        margin: 0 0 1rem 0;
        color: #1e40af;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      .feature-item {
        padding: 1rem;
        background: #f1f5f9;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
      }
      .feature-item h5 {
        margin: 0 0 0.75rem 0;
        color: #1e40af;
        font-size: 1rem;
        font-weight: 600;
      }
      .feature-item ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .feature-item li {
        margin-bottom: 0.25rem;
        line-height: 1.4;
        font-size: 0.9rem;
      }
      .feature-item code {
        background: #e0e7ff;
        color: #3730a3;
        padding: 0.125rem 0.25rem;
        border-radius: 3px;
        font-size: 0.85rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      }
    `,
  ],
})
export class AccessibilityDemoComponent {
  keyboardStates = {
    first: false,
    second: true,
    third: false,
  };

  ariaStates = {
    standard: false,
  };

  labelStates = {
    visible: true,
    noVisible: false,
    clickable: false,
  };

  onCheckboxChange(checked: boolean) {
    console.log('Checkbox changed:', checked);
  }
}
