import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-badges-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="badge-examples">
          <div class="badge-item">
            <h4 style="color:var(--color-text-primary)">Status Badge</h4>
            <aava-avatars
              size="lg"
              shape="pill"
             imageUrl="assets/1.svg"
              badgeState="online"
              badgeSize="sm"
              [badgeCount]=""
              altText="Avatar with status badge"
            >
            </aava-avatars>
          </div>
          <div class="badge-item">
            <h4 style="color:var(--color-text-primary)">Count Badge</h4>
            <aava-avatars
              size="lg"
              shape="pill"
             imageUrl="assets/1.svg"
              badgeState="information"
              badgeSize="sm"
              [badgeCount]="5"
              altText="Avatar with count badge"
            >
            </aava-avatars>
          </div>
          <div class="badge-item">
            <h4 style="color:var(--color-text-primary)">Notification Badge</h4>
            <aava-avatars
              size="lg"
              shape="square"
             imageUrl="assets/1.svg"
              badgeState="medium-priority"
              badgeSize="sm"
              [badgeCount]="12"
              altText="Avatar with notification badge"
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

      .badge-examples {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0;
      }

      .badge-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .badge-item h4 {
        color: #374151;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
  ],
})
export class BadgesDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
