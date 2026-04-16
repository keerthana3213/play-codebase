import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaButtonComponent,
  ButtonVariant,
} from '@aava/play-core';

@Component({
  selector: 'ava-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './variants-demo.component.html',
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
        border-radius: 8px;
        max-width: 870px;
      }
      .description {
        color: #666;
        margin-bottom: 1.5rem;
      }
      .variants-grid {
        display: flex;
        gap: 0rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .variant-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
      }
      .variant-item h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `,
  ],
})
export class VariantsDemoComponent {
  variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'tertiary'
  ];
}
