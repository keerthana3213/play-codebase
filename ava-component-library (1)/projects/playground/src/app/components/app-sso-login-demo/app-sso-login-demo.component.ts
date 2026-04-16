import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaSSOLoginComponent } from '@aava/play-core';

@Component({
  selector: 'app-sso-login-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaSSOLoginComponent],
  templateUrl: './app-sso-login-demo.component.html',
  styleUrl: './app-sso-login-demo.component.scss',
})
export class AppSSOLoginDemoComponent {
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
