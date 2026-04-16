import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="accessibility-examples">
          <div class="accessibility-item">
            <h4>Screen Reader Support</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              altText="User profile picture for John Doe"
              statusText="Online"
              profileText="John Doe"
              altText="Avatar with proper alt text for screen readers"
            >
            </aava-avatars>
          </div>
          <div class="accessibility-item">
            <h4>Keyboard Navigation</h4>
      
          </div>
          <div class="accessibility-item">
            <h4>High Contrast</h4>
            <aava-avatars
              size="lg"
              shape="square"
              [imageUrl]="sampleImageUrl"
              badgeState="high-priority"
              badgeSize="lg"
              [badgeCount]="3"
              altText="Avatar with high contrast badge for better visibility"
            >
            </aava-avatars>
          </div>
        </div>
      </div>

      <div class="accessibility-info">
        <h4>Accessibility Features Demonstrated:</h4>
        <ul>
          <li>
            <strong>Alt Text:</strong> Descriptive alternative text for screen
            readers
          </li>
          <li>
            <strong>ARIA Labels:</strong> Proper ARIA attributes for interactive
            elements
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Full keyboard accessibility
            with focus indicators
          </li>
          <li>
            <strong>High Contrast:</strong> Enhanced visibility for users with
            visual impairments
          </li>
          <li>
            <strong>Semantic HTML:</strong> Proper HTML structure and roles
          </li>
        </ul>
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

      .accessibility-examples {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .accessibility-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .accessibility-item h4 {
      color: var(--color-text-primary);
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .accessibility-info {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
        padding: 1.5rem;
      }

      .accessibility-info h4 {
        color: #0369a1;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .accessibility-info ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .accessibility-info li {
        margin-bottom: 0.5rem;
        color: #0c4a6e;
        line-height: 1.5;
      }

      .accessibility-info li strong {
        color: #0369a1;
      }
    `,
  ],
})
export class AccessibilityDemoComponent {
  sampleImageUrl = 'assets/1.png';

  handleAvatarClick(): void {
    console.log('Avatar clicked - accessibility demo');
    // In a real application, this would navigate to the user profile
  }
}
