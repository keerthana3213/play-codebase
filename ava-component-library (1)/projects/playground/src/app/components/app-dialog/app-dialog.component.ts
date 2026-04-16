import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dialog-container">
      <div class="header">
        <h1>Dialog Component</h1>
        <p>
          A comprehensive dialog system with multiple variants, modal support,
          and flexible configuration options for user interactions,
          confirmations, and information display.
        </p>
      </div>

      <div class="demo-links">
        <h3>Demo Pages</h3>
        <div class="demo-grid">
          <a routerLink="./basic-usage" class="demo-link">
            <div class="demo-card">
              <h4>Basic Usage</h4>
              <p>Simple dialog implementation with default settings</p>
            </div>
          </a>
          <a routerLink="./variants" class="demo-link">
            <div class="demo-card">
              <h4>Dialog Variants</h4>
              <p>Seven distinct dialog variants for different scenarios</p>
            </div>
          </a>
          <a routerLink="./modal" class="demo-link">
            <div class="demo-card">
              <h4>Modal Dialogs</h4>
              <p>Advanced modal dialog support with content projection</p>
            </div>
          </a>
          <a routerLink="./confirmation" class="demo-link">
            <div class="demo-card">
              <h4>Confirmation Dialogs</h4>
              <p>Specialized confirmation dialogs for user decisions</p>
            </div>
          </a>
          <a routerLink="./loading" class="demo-link">
            <div class="demo-card">
              <h4>Loading Dialogs</h4>
              <p>Interactive loading states with progress indicators</p>
            </div>
          </a>
          <a routerLink="./custom" class="demo-link">
            <div class="demo-card">
              <h4>Custom Dialogs</h4>
              <p>Fully customizable dialogs with custom content</p>
            </div>
          </a>
        </div>
      </div>

      <div class="features-section">
        <h3>Key Features</h3>
        <div class="features-grid">
          <div class="feature-item">
            <h4>🎯 Service-Based</h4>
            <p>Programmatic dialog creation via DialogService</p>
          </div>
          <div class="feature-item">
            <h4>🔧 Multiple Variants</h4>
            <p>
              Success, error, warning, info, confirmation, loading, and custom
              dialogs
            </p>
          </div>
          <div class="feature-item">
            <h4>📱 Modal Support</h4>
            <p>Full modal dialog capabilities with content projection</p>
          </div>
          <div class="feature-item">
            <h4>♿ Accessibility</h4>
            <p>Built-in accessibility features and keyboard navigation</p>
          </div>
          <div class="feature-item">
            <h4>📐 Flexible Sizing</h4>
            <p>Configurable width, height, and max dimensions</p>
          </div>
          <div class="feature-item">
            <h4>🎨 Custom Styling</h4>
            <p>Customizable colors, icons, and visual variants</p>
          </div>
        </div>
      </div>
     
    </div>
  `,
  styles: [
    `
      .dialog-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .header h1 {
        color: var(--color-text-primary);
        margin-bottom: 1rem;
        font-size: 2.5rem;
      }

      .header p {
        color: var(--color-text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }

      .demo-links {
        margin-bottom: 3rem;
      }

      .demo-links h3 {
        color: var(--color-text-primary);
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
        background: var(--color-background-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        height: 100%;
      }

      .demo-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--color-primary);
      }

      .demo-card h4 {
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }

      .demo-card p {
        color: var(--color-text-secondary);
        margin: 0;
        line-height: 1.5;
      }

      .features-section {
        margin-bottom: 3rem;
      }

      .features-section h3 {
        color: var(--color-text-primary);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .feature-item {
        background: var(--color-background-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
      }

      .feature-item h4 {
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }

      .feature-item p {
        color: var(--color-text-secondary);
        margin: 0;
        line-height: 1.5;
      }

      .usage-section {
        background: var(--color-background-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 2rem;
      }

      .usage-section h3 {
        color: var(--color-text-primary);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .code-example h4 {
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        margin-top: 1.5rem;
      }

      .code-example pre {
        background: var(--color-background-primary);
        border: 1px solid var(--color-border);
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin-bottom: 1rem;
      }

      .code-example code {
        color: var(--color-text-primary);
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .dialog-container {
          padding: 1rem;
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
export class AppDialogComponent { }
