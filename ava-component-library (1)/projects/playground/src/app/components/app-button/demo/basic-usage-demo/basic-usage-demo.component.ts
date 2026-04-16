import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="button-group">
        <aava-button
          label="Primary"
          variant="primary"
          (userClick)="onButtonClick($event)"
          [pill]="true"
        ></aava-button>
        <aava-button
          label="Primary"
          variant="primary"
          (userClick)="onButtonClick($event)"
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
        max-width: 870px;
        margin-top: 0;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .button-group {
        display: flex;
        gap: 0.5rem; // Reduced from 1rem since buttons now have 4px margins
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  constructor() {
    console.log('Basic Usage Demo Component loaded!');
  }

  onButtonClick(event: Event) {
    console.log('Button clicked:', event);
  }
}
