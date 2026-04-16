import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSSOLoginComponent } from '@aava/play-core';
import { ssoLoginVariants } from '../../sso-login-demo.data';

@Component({
  selector: 'ava-sso-login-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaSSOLoginComponent],
  template: `
    <div class="sso-login-variants-demo-wrapper">
      <div class="demo-description">
        <h3>SSO Login Variants</h3>
        <p>
          Explore different size variants of the SSO Login component for various
          use cases and contexts.
        </p>
      </div>

      <div class="variants-grid">
        <div class="variant-item" *ngFor="let variant of variants">
          <div class="variant-header">
            <h4>{{ variant.title }}</h4>
            <p>{{ variant.description }}</p>
          </div>

          <div class="variant-component">
            <aava-sso-login
              [variant]="variant.variant || 'md'"
              (login)="onLogin($event, variant.id)"
              (ssoLogin)="onSSOLogin(variant.id)"
              (forgotPassword)="onForgotPassword($event, variant.id)"
              (troubleSignin)="onTroubleSigningIn(variant.id)"
            ></aava-sso-login>
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
      .sso-login-variants-demo-wrapper {
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

      .variants-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 2rem;
        width: 100%;
      }

      .variant-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        border: 1px solid var(--color-border-subtle);
      }

      .variant-header {
        text-align: center;
      }

      .variant-header h4 {
        margin-bottom: 0.5rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .variant-header p {
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
        line-height: 1.4;
      }

      .variant-component {
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

      @media (max-width: 768px) {
        .variants-grid {
          grid-template-columns: 1fr;
        }

        .variant-item {
          padding: 1rem;
        }
      }

      :host {
        display: block;
        margin-top: 0;
      }
    `,
  ],
})
export class AppSSOLoginVariantsDemoComponent {
  variants = ssoLoginVariants;
  lastEvent: { type: string; variant: string; data: unknown } | null = null;

  onLogin(credentials: unknown, variantId: string) {
    console.log('Login event for variant:', variantId, credentials);
    this.lastEvent = { type: 'login', variant: variantId, data: credentials };
  }

  onSSOLogin(variantId: string) {
    console.log('SSO Login event for variant:', variantId);
    this.lastEvent = { type: 'sso-login', variant: variantId, data: null };
  }

  onForgotPassword(email: string, variantId: string) {
    console.log('Forgot Password event for variant:', variantId, email);
    this.lastEvent = {
      type: 'forgot-password',
      variant: variantId,
      data: email,
    };
  }

  onTroubleSigningIn(variantId: string) {
    console.log('Trouble Signing In event for variant:', variantId);
    this.lastEvent = { type: 'trouble-signin', variant: variantId, data: null };
  }
}
