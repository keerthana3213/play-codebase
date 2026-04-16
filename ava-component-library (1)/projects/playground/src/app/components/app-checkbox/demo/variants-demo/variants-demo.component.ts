import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="variants-grid">
        <div class="variant-group">
          <div class="checkbox-examples">
              <aava-checkbox
              label="Default Checked"
              variant="default"
              [isChecked]="true"
              >
              </aava-checkbox>
              <aava-checkbox
              label="With-bg Checked"
              variant="with-bg"
              [isChecked]="true"
              >
              </aava-checkbox>
              <aava-checkbox
              label="Animated Checked"
              variant="animated"
              [isChecked]="true"
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
        color: #666;
        margin-bottom: 2rem;
        text-align: center;
      }
      .variants-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
      .variant-group {
        padding: 1.5rem;
        margin-top: 0;
      }
      .variant-group h4 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .variant-description {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }
      .checkbox-examples {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    `,
  ],
})
export class VariantsDemoComponent {

}
