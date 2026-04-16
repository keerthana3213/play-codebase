import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-hover-effects-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="button-group">
        <aava-button
          label="Torch (Recommended)"
          variant="primary"
          hoverEffect="torch"
          [pill]="true"
        ></aava-button>
        <aava-button
          label="Glow Effect"
          variant="warning"
          hoverEffect="glow"
          [pill]="true"
        ></aava-button>
        <aava-button
          label="Tint Effect"
          variant="success"
          hoverEffect="tint"
          [pill]="true"
        ></aava-button>
        <aava-button
          label="Scale Effect"
          variant="danger"
          hoverEffect="scale"
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
        border-radius: 8px;
        max-width: 870px;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .button-group {
        display: flex;
        gap: 0.5rem; // Reduced from 1.5rem since buttons now have margins
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class HoverEffectsDemoComponent { }
