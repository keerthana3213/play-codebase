import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-shapes-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="shape-examples">
          <div class="shape-item">
            <h4 style="color:var(--color-text-primary)">Pill (Circular)</h4>
            <aava-avatars
              size="lg"
              shape="pill"
             imageUrl="assets/1.svg"
              altText="Pill shape avatar"
            >
            </aava-avatars>
          </div>
          <div class="shape-item">
            <h4 style="color:var(--color-text-primary)">Square</h4>
            <aava-avatars
              size="lg"
              shape="square"
             imageUrl="assets/1.svg"
              altText="Square shape avatar"
            >
            </aava-avatars>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-section {
        margin-bottom: 2rem;
      }

      .demo-section h3 {
        color: #1f2937;
        margin-bottom: 1rem;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .shape-examples {
        display: flex;
        gap: 3rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0;
      }

      .shape-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .shape-item h4 {
        color: #374151;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
  ],
})
export class ShapesDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
