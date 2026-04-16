import { Component } from '@angular/core';
import { AavaResetPasswordComponent } from '@aava/play-core';
import { PasswordRule, PasswordValidationState } from '@aava/play-core';

@Component({
  selector: 'app-basic',
  imports: [AavaResetPasswordComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent {
  passwordRules: PasswordRule[] = [
    {
      message: 'At least 8 characters',
      validator: (pwd) => pwd.length >= 8,
    },
    {
      message: 'One uppercase letter (A-Z)',
      validator: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      message: 'One lowercase letter (a-z)',
      validator: (pwd) => /[a-z]/.test(pwd),
    },
    {
      message: 'One number (0-9)',
      validator: (pwd) => /\d/.test(pwd),
    },
  ];

  onPasswordChange(state: PasswordValidationState): void {
    console.log('Basic Password State:', state);
  }
}
