import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPaginationControlsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-pagination-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaPaginationControlsComponent],
  template: `
    <div class="demo-section">
      <div class="accessibility-examples">
        <!-- Keyboard Navigation Example -->
        <div class="example-item">
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="keyboardPage"
            [totalPages]="10"
            (pageChange)="keyboardPage = $event"
          >
          </aava-pagination-controls>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-section {
        max-width: 1000px;
        margin: 2rem auto;
        margin-top: 0;
        padding: 2rem;
      }

      .demo-description {
        margin-bottom: 2rem;
        text-align: center;
      }

      .demo-description h3 {
        color: #1f2937;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .demo-description p {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .accessibility-examples {
        display: grid;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .example-item {
        margin-top: 0;
        padding: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .example-item h4 {
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .example-item p {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }

      .keyboard-instructions,
      .sr-instructions,
      .contrast-instructions {
        margin-top: 1rem;
        padding: 1rem;
        background: #f3f4f6;
        border-radius: 6px;
        font-size: 0.9rem;
      }

      .keyboard-instructions strong,
      .sr-instructions strong,
      .contrast-instructions strong {
        color: #374151;
        display: block;
        margin-bottom: 0.5rem;
      }

      .keyboard-instructions ul,
      .sr-instructions ul,
      .contrast-instructions ul {
        margin: 0;
        padding-left: 1.5rem;
        color: #6b7280;
      }

      .keyboard-instructions li,
      .sr-instructions li,
      .contrast-instructions li {
        margin-bottom: 0.25rem;
      }

      .features-list {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
        padding: 1.5rem;
      }

      .features-list h4 {
        color: #0369a1;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .features-list ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .features-list li {
        margin-bottom: 0.5rem;
        color: #0c4a6e;
        line-height: 1.5;
      }

      .features-list li strong {
        color: #0369a1;
      }

      :host {
        display: block;
        min-height: 100vh;
        padding: 1rem;
      }
    `,
  ],
})
export class AppPaginationAccessibilityDemoComponent {
  keyboardPage = 1;
  screenReaderPage = 1;
  highContrastPage = 1;
}
