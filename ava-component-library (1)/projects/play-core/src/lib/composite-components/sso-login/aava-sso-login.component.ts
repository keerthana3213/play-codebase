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
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaTextboxComponent } from '../../components/textbox/aava-textbox.component';
import { AavaCheckboxComponent } from '../../components/checkbox/aava-checkbox.component';
import { AavaLinkComponent } from '../../components/link/aava-link.component';
import { AavaDividersComponent } from '../../components/dividers/aava-dividers.component';

export interface SSOLoginCredentials {
  username: string;
  password: string;
  keepSignedIn?: boolean;
}

export interface SSOLoginEvent {
  type: 'login' | 'sso-login' | 'forgot-password' | 'trouble-signin';
  data: unknown;
  credentials?: SSOLoginCredentials;
}

export type SSOLoginVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-sso-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AavaButtonComponent,
    AavaTextboxComponent,
    AavaCheckboxComponent,
    AavaLinkComponent,
    AavaDividersComponent,
  ],
  templateUrl: './aava-sso-login.component.html',
  styleUrl: './aava-sso-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaSSOLoginComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() errorMessage = '';

  private _variant: SSOLoginVariant = 'md';
  private _variantExplicitlySet = false;

  @Input()
  set variant(value: SSOLoginVariant) {
    this._variant = value;
    this._variantExplicitlySet = true;
  }
  get variant(): SSOLoginVariant {
    return this._variant;
  }

  @Output() login = new EventEmitter<SSOLoginCredentials>();
  @Output() ssoLogin = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<string>();
  @Output() troubleSignin = new EventEmitter<void>();
  @Output() loginEvent = new EventEmitter<SSOLoginEvent>();

  loginForm: FormGroup;
  showPassword = false;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      keepSignedIn: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get keepSignedIn() {
    return this.loginForm.get('keepSignedIn');
  }

  get isFormValid(): boolean {
    return this.loginForm.valid && !this.loading && !this.disabled;
  }

  get usernameError(): string {
    if (this.username?.hasError('required')) {
      return 'Username or email is required';
    }
    return '';
  }

  get passwordError(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const credentials: SSOLoginCredentials = {
        username: this.username?.value,
        password: this.password?.value,
        keepSignedIn: this.keepSignedIn?.value,
      };

      this.login.emit(credentials);
      this.emitLoginEvent('login', { credentials });
    }
  }

  onSSOLogin() {
    if (!this.loading && !this.disabled) {
      this.ssoLogin.emit();
      this.emitLoginEvent('sso-login', {});
    }
  }

  onForgotPassword() {
    if (!this.loading && !this.disabled) {
      this.forgotPassword.emit(this.username?.value || '');
      this.emitLoginEvent('forgot-password', {
        username: this.username?.value,
      });
    }
  }

  onTroubleSigningIn() {
    if (!this.loading && !this.disabled) {
      this.troubleSignin.emit();
      this.emitLoginEvent('trouble-signin', {});
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onUsernameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.username?.setValue(target.value);
  }

  onPasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password?.setValue(target.value);
  }

  onKeepSignedInChange(event: boolean) {
    this.keepSignedIn?.setValue(event);
  }

  getContainerClasses(): string {
    const classes = ['sso-login-container'];

    // Only apply variant class if variant was explicitly set
    if (this._variantExplicitlySet) {
      classes.push(`sso-login-container--${this.variant}`);
    }

    return classes.join(' ');
  }

  private emitLoginEvent(type: SSOLoginEvent['type'], data: unknown) {
    const event: SSOLoginEvent = {
      type,
      data,
      credentials:
        type === 'login'
          ? (data as { credentials: SSOLoginCredentials }).credentials
          : undefined,
    };
    this.loginEvent.emit(event);
  }

  getTroubleTextClasses(): string {
    return `trouble-text trouble-text--${this.variant}`;
  }

  getButtonSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    switch (this.variant) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      case 'xl':
        return 'xl';
    }
  }

  getCheckboxSize(): 'sm' | 'md' | 'lg' {
    switch (this.variant) {
      case 'xl':
        return 'lg';
      case 'lg':
      case 'md':
        return 'md';
      case 'sm':
      case 'xs':
        return 'sm';
    }
  }

  getHyperlinkSize(): 'sm' | 'md' | 'lg' {
    switch (this.variant) {
      case 'xl':
      case 'lg':
        return 'sm';
      case 'md':
      case 'sm':
      case 'xs':
        return 'sm';
    }
  }
}
