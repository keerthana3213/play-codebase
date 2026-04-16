import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="button-group">
        <aava-button label="Extra Small" variant="primary" size="xs"></aava-button>
        <aava-button label="Small" variant="primary" size="sm"></aava-button>
        <aava-button label="Medium" variant="primary" size="md"></aava-button>
        <aava-button label="Large" variant="primary" size="lg"></aava-button>
        <aava-button label="Extra Large" variant="primary" size="xl"></aava-button>
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        display: flex;
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
        gap: 1rem; // Reduced from 1.5rem since buttons now have 4px margins
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class SizesDemoComponent { }
