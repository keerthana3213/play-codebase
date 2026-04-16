import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'aava-avatars-basic-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="avatar-examples">
          <aava-avatars
            size="lg"
            shape="pill"
            imageUrl="assets/1.svg"
            altText="User avatar"
          >
          </aava-avatars>
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

      .avatar-examples {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
      }
    `,
  ],
})
export class BasicDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
