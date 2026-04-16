import { Component } from '@angular/core';
import { AavaResetPasswordComponent } from '@aava/play-core';
import { PasswordRule, PasswordValidationState } from '@aava/play-core';

@Component({
  selector: 'app-with-confirmation',
  imports: [AavaResetPasswordComponent],
  templateUrl: './with-confirmation.component.html',
  styleUrl: './with-confirmation.component.scss',
})
export class WithConfirmationComponent {
  onPasswordChange(state: PasswordValidationState): void {
    console.log('Strong Password State:', state);
  }
  onValidationChange(isValid: boolean): void {
    console.log('Password is valid:', isValid);
  }
  passwordRules: PasswordRule[] = [
    {
      message: 'At least 12 characters',
      validator: (pwd) => pwd.length >= 12,
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
    {
      message: 'One special character (!@#$%^&*)',
      validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
    {
      message: 'No common words (password, 123456)',
      validator: (pwd) => {
        const commonWords = ['password', '123456', 'qwerty', 'admin'];
        return !commonWords.some((word) => pwd.toLowerCase().includes(word));
      },
    },
  ];
}
