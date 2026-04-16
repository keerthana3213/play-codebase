import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="ratings-container">
      <div class="header">
        <h1>Rating Component</h1>
        <p>
          A flexible and accessible rating component with support for half-star
          ratings, multiple sizes, and comprehensive keyboard navigation for
          user feedback and reviews.
        </p>
      </div>

      <div class="demo-links">
        <h3>Demo Pages</h3>
        <div class="demo-grid">
          <a routerLink="./basic-usage" class="demo-link">
            <div class="demo-card">
              <h4>Basic Usage</h4>
              <p>Simple rating implementation with default 5-star scale</p>
            </div>
          </a>

          <a routerLink="./sizes" class="demo-link">
            <div class="demo-card">
              <h4>Sizes</h4>
              <p>Four size variants for different interface densities</p>
            </div>
          </a>

          <a routerLink="./half-star" class="demo-link">
            <div class="demo-card">
              <h4>Half-Star Ratings</h4>
              <p>
                Support for precise half-star ratings with click positioning
              </p>
            </div>
          </a>

          <a routerLink="./readonly" class="demo-link">
            <div class="demo-card">
              <h4>Readonly Mode</h4>
              <p>Display-only mode for showing existing ratings</p>
            </div>
          </a>

          <a routerLink="./show-value" class="demo-link">
            <div class="demo-card">
              <h4>Show Value</h4>
              <p>Display numeric rating alongside visual stars</p>
            </div>
          </a>

          <a routerLink="./custom-maximum" class="demo-link">
            <div class="demo-card">
              <h4>Custom Maximum</h4>
              <p>Flexible rating scales beyond 5-star system</p>
            </div>
          </a>
        </div>
      </div>

      <div class="features">
        <h3>Key Features</h3>
        <ul class="feature-list">
          <li>Half-star rating support with intuitive click positioning</li>
          <li>Multiple size variants (xsmall, small, medium, large)</li>
          <li>Custom maximum rating scales</li>
          <li>Readonly mode for display purposes</li>
          <li>Numeric value display option</li>
          <li>Full keyboard navigation support</li>
          <li>WCAG compliant accessibility features</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .ratings-container {
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
        .ratings-container {
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
export class AppRatingsComponent {
  constructor() {
    console.log('App Ratings Component loaded!');
  }
}
