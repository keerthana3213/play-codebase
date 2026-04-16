import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="search-bar-container">
      <div class="header">
        <h1>Search Bar Component</h1>
        <p>
          A comprehensive search input component with integrated search and send
          icons, built on top of the textbox component for consistent styling
          and behavior.
        </p>
      </div>

      <div class="demo-links">
        <h3>Demo Pages</h3>
        <div class="demo-grid">
          <a routerLink="./basic-usage" class="demo-link">
            <div class="demo-card">
              <h4>Basic Usage</h4>
              <p>Simple search bar implementation with default settings</p>
            </div>
          </a>
          <a routerLink="./sizes" class="demo-link">
            <div class="demo-card">
              <h4>Sizes</h4>
              <p>Four size variants for different interface densities</p>
            </div>
          </a>
          <a routerLink="./variants" class="demo-link">
            <div class="demo-card">
              <h4>Variants</h4>
              <p>Different visual variants and color schemes</p>
            </div>
          </a>
          <a routerLink="./icons" class="demo-link">
            <div class="demo-card">
              <h4>Icons</h4>
              <p>Icon configurations and customizations</p>
            </div>
          </a>
          <a routerLink="./states" class="demo-link">
            <div class="demo-card">
              <h4>States</h4>
              <p>Different interaction states and accessibility</p>
            </div>
          </a>
          <a routerLink="./suggestions" class="demo-link">
            <div class="demo-card">
              <h4>Suggestions</h4>
              <p>Search suggestions with flyout integration</p>
            </div>
          </a>
        </div>
      </div>

      <div class="features-section">
        <h3>Key Features</h3>
        <div class="features-grid">
          <div class="feature-item">
            <h4>🔍 Integrated Icons</h4>
            <p>Built-in search and send icons for intuitive user experience</p>
          </div>
          <div class="feature-item">
            <h4>📱 Multiple Sizes</h4>
            <p>
              Four size variants (xs, md, lg, xl) for different interface
              requirements
            </p>
          </div>
          <div class="feature-item">
            <h4>🎨 Customizable Colors</h4>
            <p>Flexible icon color customization for brand integration</p>
          </div>
          <div class="feature-item">
            <h4>♿ Accessibility</h4>
            <p>Full keyboard navigation and screen reader support</p>
          </div>
          <div class="feature-item">
            <h4>📦 Textbox Foundation</h4>
            <p>Inherits all textbox functionality and styling</p>
          </div>
          <div class="feature-item">
            <h4>⚡ Event Handling</h4>
            <p>Emits search events when users click the send icon</p>
          </div>
        </div>
      </div>

      <div class="usage-section"></div>
    </div>
  `,
  styles: [
    `
      .search-bar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        margin-top: 2rem;
      }

      .header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .header h1 {
        color: #333;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
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
        background: #f8f9fa;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        height: 100%;
      }

      .demo-card:hover {
        border-color: #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        transform: translateY(-2px);
      }

      .demo-card h4 {
        color: #333;
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .demo-card p {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }

      .features-section {
        margin-bottom: 3rem;
      }

      .features-section h3 {
        color: #333;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }

      .feature-item {
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .feature-item h4 {
        color: #333;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .feature-item p {
        color: #666;
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
      }

      .usage-section {
        margin-bottom: 2rem;
      }

      .usage-section h3 {
        color: #333;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .code-example {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid #e9ecef;
      }

      .code-example h4 {
        color: #333;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .code-example pre {
        background: #2d3748;
        color: #e2e8f0;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 0.5rem 0 1rem 0;
      }

      .code-example code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      @media (max-width: 768px) {
        .search-bar-container {
          padding: 1rem;
        }

        .header h1 {
          font-size: 2rem;
        }

        .demo-grid {
          grid-template-columns: 1fr;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppSearchBarComponent {}
