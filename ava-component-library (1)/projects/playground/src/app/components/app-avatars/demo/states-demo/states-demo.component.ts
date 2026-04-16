import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAvatarsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-avatars-states-demo',
  standalone: true,
  imports: [CommonModule, AavaAvatarsComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="state-examples">
          <div class="state-item">
            <h4 style="color:var(--color-text-primary)">Default</h4>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              altText="Default avatar state"
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

      .state-examples {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0;
      }

      .state-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .state-item h4 {
        color: #374151;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
  ],
})
export class StatesDemoComponent {
  sampleImageUrl = 'assets/1.svg';
}
