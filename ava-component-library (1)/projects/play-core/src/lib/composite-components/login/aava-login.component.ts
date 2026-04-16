import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AavaCardComponent } from '../../components/card/aava-card.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaTextboxComponent } from '../../components/textbox/aava-textbox.component';
import { AavaCheckboxComponent } from '../../components/checkbox/aava-checkbox.component';
import { AavaLinkComponent } from '../../components/link/aava-link.component';
import { AavaDividersComponent } from '../../components/dividers/aava-dividers.component';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

export interface LoginConfig {
  title?: string;
  subtitle?: string;
  logo?: string;
  showLogo?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showSignUp?: boolean;
  showSocialLogin?: boolean;
  showDivider?: boolean;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  rememberMeLabel?: string;
  forgotPasswordLabel?: string;
  signUpLabel?: string;
  signUpUrl?: string;
  loginButtonLabel?: string;
  theme?: 'default' | 'minimal' | 'modern' | 'professional';
  layout?: 'centered' | 'left-aligned' | 'split';
  socialProviders?: SocialProvider[];
  validationRules?: {
    email?: boolean;
    password?: boolean;
    minPasswordLength?: number;
  };
  autoFocus?: boolean;
  showPasswordToggle?: boolean;
  loadingText?: string;
  errorMessage?: string;
}

export interface LoginEvent {
  type:
  | 'login'
  | 'social-login'
  | 'forgot-password'
  | 'sign-up'
  | 'validation-error';
  data: unknown;
  credentials?: LoginCredentials;
  provider?: SocialProvider;
}

@Component({
  selector: 'aava-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AavaCardComponent,
    AavaButtonComponent,
    AavaIconComponent,
    AavaTextboxComponent,
    AavaCheckboxComponent,
    AavaLinkComponent,
    AavaDividersComponent,
  ],
  templateUrl: './aava-login.component.html',
  styleUrl: './aava-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaLoginComponent {
  @Input() config: LoginConfig = {
    title: 'Welcome Back',
    subtitle: 'Sign in to your account to continue',
    showLogo: true,
    showTitle: true,
    showSubtitle: true,
    showRememberMe: true,
    showForgotPassword: true,
    showSignUp: true,
    showSocialLogin: true,
    showDivider: true,
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    rememberMeLabel: 'Remember me',
    forgotPasswordLabel: 'Forgot password?',
    signUpLabel: "Don't have an account? Sign up",
    loginButtonLabel: 'Sign In',
    theme: 'default',
    layout: 'centered',
    socialProviders: [
      {
        id: 'google',
        name: 'Google',
        icon: 'chrome',
        color: '#4285f4',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: 'facebook',
        color: '#1877f2',
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: 'github',
        color: '#333',
      },
    ],
    validationRules: {
      email: true,
      password: true,
      minPasswordLength: 6,
    },
    autoFocus: true,
    showPasswordToggle: true,
    loadingText: 'Signing in...',
  };
  @Input() loading = false;
  @Input() disabled = false;
  @Input() errorMessage = '';

  @Output() login = new EventEmitter<LoginCredentials>();
  @Output() socialLogin = new EventEmitter<SocialProvider>();
  @Output() forgotPassword = new EventEmitter<string>();
  @Output() signUp = new EventEmitter<void>();
  @Output() loginEvent = new EventEmitter<LoginEvent>();

  loginForm: FormGroup;
  showPassword = false;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(
            this.config.validationRules?.minPasswordLength || 6
          ),
        ],
      ],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  get isFormValid(): boolean {
    return this.loginForm.valid && !this.loading && !this.disabled;
  }

  get hasError(): boolean {
    return this.submitted && this.loginForm.invalid;
  }

  get emailError(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  get passwordError(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return `Password must be at least ${this.config.validationRules?.minPasswordLength || 6
        } characters`;
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const credentials: LoginCredentials = {
        email: this.email?.value,
        password: this.password?.value,
        rememberMe: this.rememberMe?.value,
      };

      this.login.emit(credentials);
      this.emitLoginEvent('login', { credentials });
    } else {
      this.emitLoginEvent('validation-error', {
        errors: this.loginForm.errors,
      });
    }
  }

  onSocialLogin(provider: SocialProvider) {
    if (!this.loading && !this.disabled) {
      this.socialLogin.emit(provider);
      this.emitLoginEvent('social-login', { provider });
    }
  }

  onForgotPassword() {
    if (!this.loading && !this.disabled) {
      this.forgotPassword.emit(this.email?.value || '');
      this.emitLoginEvent('forgot-password', { email: this.email?.value });
    }
  }

  onSignUp() {
    if (!this.loading && !this.disabled) {
      this.signUp.emit();
      this.emitLoginEvent('sign-up', {});
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email?.setValue(target.value);
  }

  onPasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password?.setValue(target.value);
  }

  onRememberMeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.rememberMe?.setValue(target.checked);
  }

  clearError() {
    this.errorMessage = '';
    this.submitted = false;
  }

  private emitLoginEvent(type: LoginEvent['type'], data: unknown) {
    const event: LoginEvent = {
      type,
      data,
      credentials:
        type === 'login'
          ? (data as { credentials: LoginCredentials }).credentials
          : undefined,
      provider:
        type === 'social-login'
          ? (data as { provider: SocialProvider }).provider
          : undefined,
    };
    this.loginEvent.emit(event);
  }

  trackByProvider(index: number, provider: SocialProvider): string {
    return provider.id;
  }
}
