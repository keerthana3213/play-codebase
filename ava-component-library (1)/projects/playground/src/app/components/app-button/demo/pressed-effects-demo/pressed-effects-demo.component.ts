import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-pressed-effects-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="button-group">
        <aava-button
          label="Ripple (Recommended)"
          variant="primary"
          pressedEffect="ripple"
          [pill]="true"
        ></aava-button>
        <aava-button
          label="Inset Effect"
          variant="warning"
          pressedEffect="inset"
          [pill]="true"
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
        gap: 1rem; // Reduced from 1.5rem since buttons now have margins
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class PressedEffectsDemoComponent { }
