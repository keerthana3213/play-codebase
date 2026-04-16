import { Component } from '@angular/core';
import {
  PasswordRule,
  PasswordValidationState,
  AavaResetPasswordComponent,
} from '@aava/play-core';

@Component({
  selector: 'app-custom',
  imports: [AavaResetPasswordComponent],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss',
})
export class CustomComponent {
  onPasswordChange(state: PasswordValidationState): void {
    console.log('Custom Password State:', state);
  }

  customPasswordRules: PasswordRule[] = [
    {
      message: 'Between 10-20 characters',
      validator: (pwd) => pwd.length >= 10 && pwd.length <= 20,
    },
    {
      message: 'No spaces allowed',
      validator: (pwd) => !/\s/.test(pwd),
    },
    {
      message: 'Must contain "Corp" or "Dept"',
      validator: (pwd) => /Corp|Dept/i.test(pwd),
    },
  ];
}
