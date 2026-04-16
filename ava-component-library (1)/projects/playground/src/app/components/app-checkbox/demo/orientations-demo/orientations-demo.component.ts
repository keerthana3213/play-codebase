import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

interface VerticalStates {
  tools: boolean;
  design: boolean;
  project: boolean;
  communication: boolean;
}

interface HorizontalStates {
  react: boolean;
  angular: boolean;
  vue: boolean;
  svelte: boolean;
  nextjs: boolean;
  nuxtjs: boolean;
}

@Component({
  selector: 'ava-orientations-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="orientations-grid">
        <div class="orientation-group">
          <h4 style="color: var(--text-primary)">Vertical Layout (Default)</h4>
          <div class="checkbox-container vertical">
            <aava-checkbox
              alignment="vertical"
              label="Development Tools"
              [isChecked]="false" 
            ></aava-checkbox>
            <aava-checkbox
              alignment="vertical"
              label="Design Software"
              [isChecked]="true"
            ></aava-checkbox>
            <aava-checkbox
              alignment="vertical"
              label="Project Management"
              [isChecked]="false"
            ></aava-checkbox>
            <aava-checkbox
              alignment="vertical"
              label="Communication Apps"
              [isChecked]="true"
            ></aava-checkbox>
          </div>
          <h4 style="margin-top: 40px; color: var(--text-primary)">
            Horizontal Layout
          </h4>
          <div class="checkbox-container horizontal">
            <aava-checkbox
              alignment="horizontal"
              label="React"
              [isChecked]="true"
            ></aava-checkbox>
            <aava-checkbox
              alignment="horizontal"
              label="Angular"
              [isChecked]="false"
            ></aava-checkbox>
            <aava-checkbox
              alignment="horizontal"
              label="Vue.js"
              [isChecked]="true"
            ></aava-checkbox>
            <aava-checkbox
              alignment="horizontal"
              label="Svelte"
              [isChecked]="false"
            ></aava-checkbox>
            <aava-checkbox
              alignment="horizontal"
              label="Next.js"
              [isChecked]="false"
            ></aava-checkbox>
            <aava-checkbox
              alignment="horizontal"
              label="Nuxt.js"
              [isChecked]="false"
            ></aava-checkbox>
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
        min-height: 100vh;
        padding: 40px 20px;
      }

      .demo-section {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
      }

      .page-title {
        text-align: center;
        margin-bottom: 16px;
        color: #1e293b;
        font-size: 32px;
        font-weight: 700;
      }

      .page-description {
        text-align: center;
        margin-bottom: 48px;
        color: #64748b;
        font-size: 18px;
        line-height: 1.6;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }

      .orientations-grid {
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 100%;
      }

      .orientation-group {
        padding: 32px;
        margin-top: 0;
      }

      .orientation-group h4 {
        margin: 0 0 12px 0;
        color: #1e293b;
        font-size: 24px;
        font-weight: 600;
      }

      .checkbox-container.vertical {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .checkbox-container.horizontal {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
      }

      @media (max-width: 768px) {
        .center-demo {
          padding: 20px 16px;
        }

        .orientation-group {
          padding: 24px 20px;
        }

        .checkbox-container.horizontal {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
      }
    `,
  ],
})
export class OrientationsDemoComponent {

}
