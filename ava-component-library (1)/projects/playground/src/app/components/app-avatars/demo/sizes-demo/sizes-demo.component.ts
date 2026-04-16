import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="size-examples">
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Ultra Small</h4>
            <aava-avatars
              size="xxs"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Ultra Small avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Extra Small</h4>
            <aava-avatars
              size="xs"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Extra Small avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Small</h4>
            <aava-avatars
              size="sm"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Small avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Medium</h4>
            <aava-avatars
              size="md"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Medium avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Large</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Large avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Extra Large</h4>
            <aava-avatars
              size="xl"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Extra Large avatar"
            >
            </aava-avatars>
          </div>
          <div class="size-item">
            <h4 style="color:var(--color-text-primary)">Ultra Large</h4>
            <aava-avatars
              size="xxl"
              shape="pill"
              imageUrl="assets/1.svg"
              altText="Ultra Large avatar"
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

      .size-examples {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0;
      }

      .size-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .size-item h4 {
        color: #374151;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
  ],
})
export class SizesDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
