import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSSOLoginComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sso-login-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaSSOLoginComponent],
  template: `
    <div class="sso-login-demo-wrapper">
      <div class="demo-component">
        <aava-sso-login
          (login)="onLogin($event)"
          (ssoLogin)="onSSOLogin()"
          (forgotPassword)="onForgotPassword($event)"
          (troubleSignin)="onTroubleSigningIn()"
          (loginEvent)="onLoginEvent($event)"
        ></aava-sso-login>
      </div>
    </div>
  `,
  styles: [
    `
      .sso-login-demo-wrapper {
        max-width: 500px;
        margin: 2rem auto;
      }
    `,
  ],
})
export class AppSSOLoginBasicUsageDemoComponent {
  lastEvent: { type: string; data: unknown } | null = null;

  onLogin(credentials: { username: string; password: string }) {
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

  onLoginEvent(event: { type: string; data: unknown }) {
    console.log('Login Event:', event);
    this.lastEvent = event;
  }
}
