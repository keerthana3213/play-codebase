import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'aava-datepicker-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="documentation">
      <div class="row">
        <div class="col-12">
          <header class="doc-header">
            <h1>Calendar Component</h1>
            <p class="description">
              A highly customizable Angular calendar component supporting single
              date and range selection, keyboard navigation, accessibility,
              glassmorphism effects, and seamless Angular forms integration with
              structured input fields.
            </p>
          </header>
        </div>
      </div>

    

      <div class="row">
        <div class="col-12">
          <section class="doc-section">
            <h2>Demo Pages</h2>
            <div class="demo-navigation">
              <div class="demo-grid">
                <a routerLink="/calendar/basic" class="demo-link">
                  <div class="demo-card">
                    <h3>Basic Usage</h3>
                    <p>
                      Simple calendar for single date selection with structured
                      input fields
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/range" class="demo-link">
                  <div class="demo-card">
                    <h3>Range Selection</h3>
                    <p>
                      Enable range mode for selecting a start and end date with
                      dual structured inputs
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/always-open" class="demo-link">
                  <div class="demo-card">
                    <h3>Always Open / Embedded Mode</h3>
                    <p>
                      Display the calendar inline for dashboards and embedded
                      views
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/customization" class="demo-link">
                  <div class="demo-card">
                    <h3>Customization Options</h3>
                    <p>
                      Showcase selector shape and various customization options
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/surface-effects" class="demo-link">
                  <div class="demo-card">
                    <h3>Surface Effects</h3>
                    <p>
                      Glassmorphism effects with different strength levels for
                      modern UI designs
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/keyboard-navigation" class="demo-link">
                  <div class="demo-card">
                    <h3>Keyboard Navigation</h3>
                    <p>
                      Advanced keyboard navigation with structured input field
                      support
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/accessibility" class="demo-link">
                  <div class="demo-card">
                    <h3>Accessibility Features</h3>
                    <p>
                      Built-in accessibility features ensuring WCAG compliance
                      and inclusive user experience
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/forms-integration" class="demo-link">
                  <div class="demo-card">
                    <h3>Forms Integration</h3>
                    <p>
                      Seamless integration with Angular reactive and
                      template-driven forms
                    </p>
                  </div>
                </a>
                 <a routerLink="/calendar/size" class="demo-link">
                  <div class="demo-card">
                    <h3>Calendar Sizes</h3>
                    <p>
                      Calendar with customizable sizes.
                    </p>
                  </div>
                </a>
                <a routerLink="/calendar/min-max" class="demo-link">
                  <div class="demo-card">
                    <h3>Min/Max Date Constraints</h3>
                    <p>
                      Date range restrictions with static dates and dynamic functions
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="doc-section api-reference">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-item">
            <h3>📅 Date Selection</h3>
            <p>Single date and range selection with visual range indicators</p>
          </div>
          <div class="feature-item">
            <h3>⌨️ Keyboard Navigation</h3>
            <p>
              Arrow keys, Enter, Tab, Escape for full keyboard accessibility
            </p>
          </div>
          <div class="feature-item">
            <h3>🎨 Customization</h3>
            <p>Selector shape, weekday format, and glassmorphism effects</p>
          </div>
          <div class="feature-item">
            <h3>♿ Accessibility</h3>
            <p>ARIA labels, focus management, screen reader support</p>
          </div>
          <div class="feature-item">
            <h3>📝 Forms Integration</h3>
            <p>ControlValueAccessor implementation for Angular forms</p>
          </div>
          <div class="feature-item">
            <h3>📱 Responsive Design</h3>
            <p>Mobile-friendly interactions and responsive behavior</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .documentation {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;
        overflow-x: hidden;
      }

      .doc-header {
        margin-bottom: 3rem;
      }

      .doc-header h1 {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .doc-header .description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--text-color-secondary);
      }

      .doc-section {
        margin-bottom: 3rem;
      }

      .doc-section h2 {
        font-size: 1.8rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }

      .code-block {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1rem;
        margin-bottom: 2rem;
      }

      .code-block pre {
        margin: 0;
        color: var(--text-primary);
      }

      .demo-navigation {
        margin: 2rem 0;
      }

      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .demo-link {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .demo-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .demo-card {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        height: 100%;
        transition: all 0.2s ease;
      }

      .demo-card h3 {
        color: var(--text-primary);
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .demo-card p {
        color: var(--text-color-secondary);
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
      }

      .demo-card:hover {
        border-color: var(--primary-color);
        background: var(--surface-hover);
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .feature-item {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
      }

      .feature-item h3 {
        color: var(--text-primary);
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .feature-item p {
        color: var(--text-color-secondary);
        margin: 0;
        line-height: 1.4;
      }

      @media (max-width: 768px) {
        .documentation {
          padding: 1rem;
        }

        .demo-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppCalendarDemoComponent { }
