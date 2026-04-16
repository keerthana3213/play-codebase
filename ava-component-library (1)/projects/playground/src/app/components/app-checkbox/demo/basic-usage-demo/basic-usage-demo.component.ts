import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="checkbox-group">
        <aava-checkbox
          label="Accept terms and conditions"
          [isChecked]="false"
        >
        </aava-checkbox>
        <aava-checkbox
          label="Subscribe to newsletter"
          [isChecked]="true"
        >
        </aava-checkbox>
        <aava-checkbox
          label="Enable notifications"
          [isChecked]="false"
        >
        </aava-checkbox>
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
        border-radius: 8px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #666;
        margin-bottom: 1.5rem;
        text-align: center;
      }
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .status-display {
        background: #fff;
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .status-display ul {
        margin: 0.5rem 0 0 0;
        padding-left: 1.5rem;
      }
      .status-display li {
        margin-bottom: 0.25rem;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  acceptTerms = false;
  subscribeNewsletter = false;
  enableNotifications = false;

  onCheckboxChange(checked: boolean) {
    console.log('Checkbox changed:', checked);
  }
}
