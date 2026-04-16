import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-text-labels-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="text-examples">
          <div class="text-item">
            <h4 style="color:var(--color-text-primary)">Status Text</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              statusText="Online"
              altText="Avatar with status text"
            >
            </aava-avatars>
          </div>
          <div class="text-item">
            <h4 style="color:var(--color-text-primary)">Profile Text</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              profileText="Marie Jane"
              altText="Avatar with profile text"
            >
            </aava-avatars>
          </div>
          <div class="text-item">
            <h4 style="color:var(--color-text-primary)">Both Labels</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              statusText="Online"
              profileText="Marie Jane"
              altText="Avatar with both status and profile text"
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

      .text-examples {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0;
      }

      .text-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .text-item h4 {
        color: #374151;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
  ],
})
export class TextLabelsDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
