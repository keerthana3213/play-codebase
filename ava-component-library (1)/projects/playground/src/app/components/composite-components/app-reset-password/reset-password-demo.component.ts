import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRule, PasswordValidationState } from '@aava/play-core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AavaResetPasswordComponent } from '@aava/play-core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ava-reset-password-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AavaResetPasswordComponent,
    RouterModule,
  ],
  templateUrl: './reset-password-demo.component.html',
  styleUrls: ['./reset-password-demo.component.scss'],
})
export class ResetPasswordDemoComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', []],
    });
  }
  // Example 1: Basic password with standard rules
  basicPasswordRules: PasswordRule[] = [
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

  // Example 2: Strong password with additional rules
  strongPasswordRules: PasswordRule[] = [
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

  // Example 3: Standard comprehensive rules
  standardPasswordRules: PasswordRule[] = [
    {
      message: 'At least 1 uppercase letter (A-Z)',
      validator: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      message: 'At least 1 lowercase letter (a-z)',
      validator: (pwd) => /[a-z]/.test(pwd),
    },
    {
      message: 'At least 1 number (0-9)',
      validator: (pwd) => /[0-9]/.test(pwd),
    },
    {
      message: 'At least 1 special character (e.g., @, #, %)',
      validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
    {
      message: 'Between 8 and 32 characters in length',
      validator: (pwd) => pwd.length >= 8 && pwd.length <= 32,
    },
  ];

  // Example 4: Custom business rules
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

  // Callback handlers
  onBasicPasswordChange(state: PasswordValidationState): void {
    console.log('Basic Password State:', state);
  }

  onStrongPasswordChange(state: PasswordValidationState): void {
    console.log('Strong Password State:', state);
  }

  onStandardPasswordChange(state: PasswordValidationState): void {
    console.log('Standard Password State:', state);
  }

  onCustomPasswordChange(state: PasswordValidationState): void {
    console.log('Custom Password State:', state);
  }

  onValidationChange(isValid: boolean): void {
    console.log('Password is valid:', isValid);
  }
  onFormSubmit() {
    console.log(this.form.value);
  }

  // Usage example for display
  usageExample = `// Define your password rules
passwordRules: PasswordRule[] = [
  {
    message: 'At least 8 characters',
    validator: (pwd) => pwd.length >= 8
  },
  {
    message: 'One uppercase letter',
    validator: (pwd) => /[A-Z]/.test(pwd)
  },
  {
    message: 'One number',
    validator: (pwd) => /\\d/.test(pwd)
  }
];

// Use in template
<aava-reset-password
  label="New Password"
  [rules]="passwordRules"
  [showConfirmPassword]="true"
  [showPasswordStrength]="true"
  (passwordChange)="onPasswordChange($event)"
  (validationChange)="onValidationChange($event)"
>
</aava-reset-password>

// Handle validation state
onPasswordChange(state: PasswordValidationState) {
  console.log('Password:', state.password);
  console.log('Is Valid:', state.isValid);
  console.log('Passwords Match:', state.passwordsMatch);
}`;
}
