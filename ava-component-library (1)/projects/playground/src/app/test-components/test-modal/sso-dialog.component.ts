import { Component, Input } from '@angular/core';
import { AavaDialogService } from '@aava/play-core';
import { AavaSSOLoginComponent } from '@aava/play-core';

@Component({
  selector: 'app-sso-dialog',
  standalone: true,
  imports: [AavaSSOLoginComponent],
  template: `
    <div style="padding: 24px;">
      <aava-sso-login
        [variant]="variant"
        (login)="onLogin($event)"
        (ssoLogin)="onSSOLogin()"
        (forgotPassword)="onForgotPassword($event)"
        (troubleSignin)="onTroubleSignin()"
      ></aava-sso-login>
    </div>
  `
})
export class SSODialogComponent {
  @Input() variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  constructor(private dialogService: AavaDialogService) { }

  onLogin(credentials: any) {
    console.log('Login credentials:', credentials);
    this.dialogService.close();
  }

  onSSOLogin() {
    console.log('SSO Login clicked');
    this.dialogService.close();
  }

  onForgotPassword(username: string) {
    console.log('Forgot password for:', username);
  }

  onTroubleSignin() {
    console.log('Trouble signing in clicked');
  }
}
