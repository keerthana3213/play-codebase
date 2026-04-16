import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="toast-container">
      <div class="header">
        <h1>Toast Component</h1>
        <p>
          A comprehensive toast notification system with multiple variants,
          positions, animations, and action buttons for providing user feedback
          and system notifications.
        </p>
      </div>

      <div class="demo-links">
        <h3>Demo Pages</h3>
        <div class="demo-grid">
          <a routerLink="./basic-usage" class="demo-link">
            <div class="demo-card">
              <h4>Basic Usage</h4>
              <p>Simple toast notifications with default configurations</p>
            </div>
          </a>

          <a routerLink="./variants" class="demo-link">
            <div class="demo-card">
              <h4>Variants</h4>
              <p>
                Six distinct toast variants for different notification types
              </p>
            </div>
          </a>

          <a routerLink="./sizes" class="demo-link">
            <div class="demo-card">
              <h4>Sizes</h4>
              <p>Three size variants for different content lengths</p>
            </div>
          </a>

          <a routerLink="./theme" class="demo-link">
            <div class="demo-card">
              <h4>Theme Options</h4>
              <p>Light and dark theme support for different contexts</p>
            </div>
          </a>

          <a routerLink="./animation" class="demo-link">
            <div class="demo-card">
              <h4>Animation</h4>
              <p>Smooth entrance/exit animations with configurable timing</p>
            </div>
          </a>

          <a routerLink="./action-links" class="demo-link">
            <div class="demo-card">
              <h4>Action Links</h4>
              <p>Interactive toasts with clickable action buttons and links</p>
            </div>
          </a>
        </div>
      </div>

      <div class="features">
        <h3>Key Features</h3>
        <ul class="feature-list">
          <li>
            Multiple toast variants (success, error, warning, info, default,
            custom)
          </li>
          <li>Three size variants (small, medium, large)</li>
          <li>Light and dark theme support</li>
          <li>Smooth entrance and exit animations</li>
          <li>Action buttons and learn more links</li>
          <li>Retry functionality for error toasts</li>
          <li>Custom action configurations</li>
          <li>Progress bar for auto-dismiss</li>
          <li>Hover pause/resume functionality</li>
          <li>Service-based architecture</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .header h1 {
        color: #333;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .header p {
        color: #666;
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-links {
        margin-bottom: 3rem;
      }

      .demo-links h3 {
        color: #333;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .demo-link {
        text-decoration: none;
        color: inherit;
      }

      .demo-card {
        padding: 1.5rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        height: 100%;
      }

      .demo-card:hover {
        border-color: #007bff;
        background-color: #e3f2fd;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
      }

      .demo-card h4 {
        color: #333;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .demo-card p {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }

      .features {
        background-color: #f8f9fa;
        padding: 2rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      .features h3 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .feature-list {
        margin: 0;
        padding-left: 1.5rem;
        color: #666;
        line-height: 1.8;
      }

      .feature-list li {
        margin-bottom: 0.5rem;
      }

      @media (max-width: 768px) {
        .toast-container {
          padding: 1rem;
        }

        .header h1 {
          font-size: 2rem;
        }

        .demo-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppToastComponent {
  constructor() {
    console.log('App Toast Component loaded!');
  }
}
