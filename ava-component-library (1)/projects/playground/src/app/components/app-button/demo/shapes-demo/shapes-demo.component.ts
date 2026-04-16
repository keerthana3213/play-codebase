import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-shapes-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <!-- Icon-only buttons -->
      <!-- <div class="shape-section">
        <h3>Icon-only Buttons</h3>
        <div class="button-group">
          <aava-button
            variant="success"
            iconName="heart"
            iconColor="white"
            iconPosition="only"
            [pill]="true"
          ></aava-button>
          <aava-button
            variant="danger"
            iconName="x"
            iconColor="white"
            iconPosition="only"
            size="small"
          ></aava-button>
          <aava-button
            variant="info"
            iconName="info"
            iconColor="white"
            iconPosition="only"
            [pill]="true"
          ></aava-button>
        </div>
      </div> -->

      <!-- Pill buttons with text -->
      <div class="button-group">
        <aava-button
          label="Primary"
          variant="primary"
          [pill]="true"
          [customStyles]="{ 'max-width': '100px' }"
        ></aava-button>
        <aava-button
          label="Secondary"
          variant="secondary"
          [pill]="true"
          [customStyles]="{ 'max-width': '100px' }"
        ></aava-button>
      </div>

      <!-- Regular buttons -->

      <div class="button-group">
        <aava-button
          label="Primary"
          variant="primary"
          [customStyles]="{ 'max-width': '100px' }"
        ></aava-button>
        <aava-button
          label="Secondary"
          variant="secondary"
          [customStyles]="{ 'max-width': '100px' }"
        ></aava-button>
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
      }
      .shape-section {
        margin-bottom: 2rem;
      }
      .shape-section:last-child {
        margin-bottom: 0;
      }
      .shape-section h3 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .button-group {
        display: flex;
        gap: 1rem; // Reduced from 1.5rem since buttons now have 4px margins
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class ShapesDemoComponent { }
