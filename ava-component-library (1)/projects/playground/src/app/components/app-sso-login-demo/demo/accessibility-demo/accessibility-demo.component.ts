import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSSOLoginComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sso-login-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaSSOLoginComponent],
  template: `
    <div class="sso-login-accessibility-demo-wrapper">
      <div class="demo-description">
        <h3>SSO Login Accessibility</h3>
        <p>Explore the accessibility features of the SSO Login component including keyboard navigation, screen reader support, and semantic structure.</p>
      </div>
      
      <div class="accessibility-features">
        <div class="feature-section">
          <h4>Keyboard Navigation</h4>
          <div class="feature-content">
            <p>Use the following keyboard shortcuts to navigate the SSO Login component:</p>
            <ul>
              <li><strong>Tab:</strong> Navigate between form elements</li>
              <li><strong>Enter:</strong> Submit the form or activate buttons</li>
              <li><strong>Space:</strong> Toggle checkbox and activate buttons</li>
              <li><strong>Arrow Keys:</strong> Navigate within form controls</li>
            </ul>
          </div>
        </div>

        <div class="feature-section">
          <h4>Screen Reader Support</h4>
          <div class="feature-content">
            <p>The component provides comprehensive screen reader support:</p>
            <ul>
              <li>Proper form labels and associations</li>
              <li>Clear error message announcements</li>
              <li>Descriptive button and link text</li>
              <li>Status updates for loading and errors</li>
            </ul>
          </div>
        </div>

        <div class="feature-section">
          <h4>Semantic Structure</h4>
          <div class="feature-content">
            <p>Built with proper semantic HTML structure:</p>
            <ul>
              <li>Form elements with proper labels</li>
              <li>Button roles and purposes clearly defined</li>
              <li>Logical heading hierarchy</li>
              <li>Proper ARIA attributes where needed</li>
            </ul>
          </div>
        </div>

        <div class="feature-section">
          <h4>Color and Contrast</h4>
          <div class="feature-content">
            <p>Accessibility-compliant design:</p>
            <ul>
              <li>WCAG AA contrast ratios</li>
              <li>High contrast mode support</li>
              <li>Color-independent information</li>
              <li>Clear visual hierarchy</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="demo-component">
        <h4>Interactive Demo</h4>
        <p>Try navigating this SSO Login component using only your keyboard to experience the accessibility features.</p>
        
        <aava-sso-login
          (login)="onLogin($event)"
          (ssoLogin)="onSSOLogin()"
          (forgotPassword)="onForgotPassword($event)"
          (troubleSignin)="onTroubleSigningIn()"
        ></aava-sso-login>
      </div>

      <div class="accessibility-checklist">
        <h4>Accessibility Checklist</h4>
        <div class="checklist-grid">
          <div class="checklist-item">
            <input type="checkbox" id="keyboard-nav" checked disabled />
            <label for="keyboard-nav">Full keyboard navigation</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="screen-reader" checked disabled />
            <label for="screen-reader">Screen reader support</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="semantic-html" checked disabled />
            <label for="semantic-html">Semantic HTML structure</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="aria-labels" checked disabled />
            <label for="aria-labels">Proper ARIA labels</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="color-contrast" checked disabled />
            <label for="color-contrast">WCAG AA contrast ratios</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="focus-indicators" checked disabled />
            <label for="focus-indicators">Clear focus indicators</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="error-announcements" checked disabled />
            <label for="error-announcements">Error message announcements</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="form-validation" checked disabled />
            <label for="form-validation">Form validation feedback</label>
          </div>
        </div>
      </div>

      <div class="demo-output" *ngIf="lastEvent">
        <h4>Last Event:</h4>
        <pre>{{ lastEvent | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .sso-login-accessibility-demo-wrapper {
        max-width: 1000px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      .demo-description {
        text-align: center;
        max-width: 600px;
      }

      .demo-description h3 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .demo-description p {
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .accessibility-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
        width: 100%;
      }

      .feature-section {
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 1.5rem;
        border: 1px solid var(--color-border-subtle);
      }

      .feature-section h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .feature-content p {
        margin-bottom: 1rem;
        color: var(--color-text-secondary);
        line-height: 1.5;
      }

      .feature-content ul {
        list-style-type: disc;
        margin-left: 1.5rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .feature-content li {
        margin-bottom: 0.5rem;
      }

      .feature-content strong {
        color: var(--color-text-primary);
      }

      .demo-component {
        width: 100%;
        text-align: center;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 2rem;
        border: 1px solid var(--color-border-subtle);
      }

      .demo-component h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .demo-component p {
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .accessibility-checklist {
        width: 100%;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 1.5rem;
        border: 1px solid var(--color-border-subtle);
      }

      .accessibility-checklist h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        text-align: center;
      }

      .checklist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }

      .checklist-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-sm);
        border: 1px solid var(--color-border-subtle);
      }

      .checklist-item input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--color-success);
      }

      .checklist-item label {
        color: var(--color-text-primary);
        font-size: var(--global-font-size-sm);
        cursor: pointer;
        flex: 1;
      }

      .demo-output {
        width: 100%;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-md);
        padding: 1rem;
        margin-top: 1rem;
      }

      .demo-output h4 {
        margin-bottom: 0.5rem;
        color: var(--color-text-primary);
      }

      .demo-output pre {
        background: var(--color-surface);
        padding: 1rem;
        border-radius: var(--global-radius-sm);
        overflow-x: auto;
        font-size: var(--global-font-size-sm);
        color: var(--color-text-secondary);
      }

      @media (max-width: 768px) {
        .accessibility-features {
          grid-template-columns: 1fr;
        }
        
        .checklist-grid {
          grid-template-columns: 1fr;
        }
      }

      :host {
        display: block;
        margin-top: 0;
      }
    `,
  ],
})
export class AppSSOLoginAccessibilityDemoComponent {
  lastEvent: unknown = null;

  onLogin(credentials: unknown) {
    console.log('Login event:', credentials);
    this.lastEvent = { type: 'login', data: credentials };
  }

  onSSOLogin() {
    console.log('SSO Login event');
    this.lastEvent = { type: 'sso-login', data: null };
  }

  onForgotPassword(email: string) {
    console.log('Forgot Password event:', email);
    this.lastEvent = { type: 'forgot-password', data: email };
  }

  onTroubleSigningIn() {
    console.log('Trouble Signing In event');
    this.lastEvent = { type: 'trouble-signin', data: null };
  }
}
