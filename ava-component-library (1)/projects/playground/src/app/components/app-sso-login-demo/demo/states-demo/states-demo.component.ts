import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSSOLoginComponent } from '@aava/play-core';
import { ssoLoginStates } from '../../sso-login-demo.data';

@Component({
  selector: 'ava-sso-login-states-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSSOLoginComponent],
  template: `
    <div class="sso-login-states-demo-wrapper">
      <div class="demo-description">
        <h3>SSO Login States</h3>
        <p>Explore different states of the SSO Login component including loading, disabled, and error states.</p>
      </div>
      
      <div class="states-grid">
        <div 
          class="state-item" 
          *ngFor="let state of states"
        >
          <div class="state-header">
            <h4>{{ state.title }}</h4>
            <p>{{ state.description }}</p>
          </div>
          
          <div class="state-component">
            <aava-sso-login
              [loading]="state.loading || false"
              [disabled]="state.disabled || false"
              [errorMessage]="state.errorMessage || ''"
              (login)="onLogin($event, state.id)"
              (ssoLogin)="onSSOLogin(state.id)"
              (forgotPassword)="onForgotPassword($event, state.id)"
              (troubleSignin)="onTroubleSigningIn(state.id)"
            ></aava-sso-login>
          </div>
        </div>
      </div>

      <div class="demo-output" *ngIf="lastEvent">
        <h4>Last Event:</h4>
        <pre>{{ lastEvent | json }}</pre>
      </div>

      <div class="state-controls">
        <h4>Interactive State Controls</h4>
        <div class="controls-grid">
          <div class="control-item">
            <label>
              <input type="checkbox" [(ngModel)]="customLoading" />
              Loading State
            </label>
          </div>
          <div class="control-item">
            <label>
              <input type="checkbox" [(ngModel)]="customDisabled" />
              Disabled State
            </label>
          </div>
          <div class="control-item">
            <label>
              <input type="text" [(ngModel)]="customErrorMessage" placeholder="Custom error message" />
            </label>
          </div>
        </div>
        
        <div class="interactive-component">
          <aava-sso-login
            [loading]="customLoading"
            [disabled]="customDisabled"
            [errorMessage]="customErrorMessage"
            (login)="onInteractiveLogin($event)"
            (ssoLogin)="onInteractiveSSOLogin()"
            (forgotPassword)="onInteractiveForgotPassword($event)"
            (troubleSignin)="onInteractiveTroubleSigningIn()"
          ></aava-sso-login>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .sso-login-states-demo-wrapper {
        max-width: 1200px;
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

      .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 2rem;
        width: 100%;
      }

      .state-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        border: 1px solid var(--color-border-subtle);
      }

      .state-header {
        text-align: center;
      }

      .state-header h4 {
        margin-bottom: 0.5rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .state-header p {
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
        line-height: 1.4;
      }

      .state-component {
        display: flex;
        justify-content: center;
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

      .state-controls {
        width: 100%;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 1.5rem;
        margin-top: 1rem;
      }

      .state-controls h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        text-align: center;
      }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .control-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .control-item label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-sm);
        cursor: pointer;
      }

      .control-item input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }

      .control-item input[type="text"] {
        padding: 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--global-radius-sm);
        font-size: var(--global-font-size-sm);
        background: var(--color-surface);
        color: var(--color-text-primary);
        width: 100%;
      }

      .interactive-component {
        display: flex;
        justify-content: center;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        border: 1px solid var(--color-border-subtle);
      }

      @media (max-width: 768px) {
        .states-grid {
          grid-template-columns: 1fr;
        }
        
        .state-item {
          padding: 1rem;
        }

        .controls-grid {
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
export class AppSSOLoginStatesDemoComponent {
  states = ssoLoginStates;
  lastEvent: { type: string; stateId: string; data: unknown } | null = null;

  customLoading = false;
  customDisabled = false;
  customErrorMessage = '';

  onLogin(credentials: unknown, stateId: string) {
    console.log('Login event for state:', stateId, credentials);
    this.lastEvent = { type: 'login', stateId, data: credentials };
  }

  onSSOLogin(stateId: string) {
    console.log('SSO Login event for state:', stateId);
    this.lastEvent = { type: 'sso-login', stateId, data: null };
  }

  onForgotPassword(email: string, stateId: string) {
    console.log('Forgot Password event for state:', stateId, email);
    this.lastEvent = { type: 'forgot-password', stateId, data: email };
  }

  onTroubleSigningIn(stateId: string) {
    console.log('Trouble Signing In event for state:', stateId);
    this.lastEvent = { type: 'trouble-signin', stateId, data: null };
  }

  onInteractiveLogin(credentials: unknown) {
    console.log('Interactive Login event:', credentials);
    this.lastEvent = { type: 'interactive-login', stateId: 'custom', data: credentials };
  }

  onInteractiveSSOLogin() {
    console.log('Interactive SSO Login event');
    this.lastEvent = { type: 'interactive-sso-login', stateId: 'custom', data: null };
  }

  onInteractiveForgotPassword(email: string) {
    console.log('Interactive Forgot Password event:', email);
    this.lastEvent = { type: 'interactive-forgot-password', stateId: 'custom', data: email };
  }

  onInteractiveTroubleSigningIn() {
    console.log('Interactive Trouble Signing In event');
    this.lastEvent = { type: 'interactive-trouble-signin', stateId: 'custom', data: null };
  }
}
