import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaLoginComponent,
  LoginConfig,
  LoginCredentials,
  SocialProvider,
  LoginEvent,
  AavaCardComponent,
  AavaButtonComponent,
  AavaIconComponent
} from '@aava/play-core';

@Component({
  selector: 'ava-login-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaLoginComponent,
    AavaCardComponent,
    AavaButtonComponent,
    AavaIconComponent,
  ],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss',
})
export class AppLoginComponent {
  config: LoginConfig = {
    title: 'Welcome Back',
    subtitle: 'Sign in to your account to continue',
    logo: 'assets/ascendion_logo.svg',
    showLogo: true,
    showTitle: true,
    showSubtitle: true,
    showRememberMe: true,
    showForgotPassword: true,
    showSignUp: true,
    showSocialLogin: true,
    showDivider: true,
    emailPlaceholder: 'Enter your email address',
    passwordPlaceholder: 'Enter your password',
    rememberMeLabel: 'Keep me signed in',
    forgotPasswordLabel: 'Forgot your password?',
    signUpLabel: "Don't have an account? Sign up",
    signUpUrl: '/signup',
    loginButtonLabel: 'Sign In',
    theme: 'default',
    layout: 'centered',
    socialProviders: [
      {
        id: 'google',
        name: 'Continue with Google',
        icon: 'chrome',
        color: '#4285f4',
      },
      {
        id: 'facebook',
        name: 'Continue with Facebook',
        icon: 'facebook',
        color: '#1877f2',
      },
      {
        id: 'github',
        name: 'Continue with GitHub',
        icon: 'github',
        color: '#333',
      },
      {
        id: 'linkedin',
        name: 'Continue with LinkedIn',
        icon: 'linkedin',
        color: '#0077b5',
      },
    ],
    validationRules: {
      email: true,
      password: true,
      minPasswordLength: 8,
    },
    autoFocus: true,
    showPasswordToggle: true,
    loadingText: 'Signing in...',
  };

  loading = false;
  disabled = false;
  errorMessage = '';
  lastEvent: LoginEvent | null = null;

  // Demo configurations
  themes: { value: LoginConfig['theme']; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'modern', label: 'Modern' },
    { value: 'professional', label: 'Professional' },
  ];

  layouts: { value: LoginConfig['layout']; label: string }[] = [
    { value: 'centered', label: 'Centered' },
    { value: 'left-aligned', label: 'Left Aligned' },
    { value: 'split', label: 'Split' },
  ];

  // Event handlers
  onLogin(credentials: LoginCredentials) {
    console.log('Login attempt:', credentials);
    this.loading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      if (
        credentials.email === 'demo@example.com' &&
        credentials.password === 'password123'
      ) {
        this.errorMessage = 'Login successful! (Demo mode)';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      } else {
        this.errorMessage =
          'Invalid email or password. Try demo@example.com / password123';
      }
    }, 2000);
  }

  onSocialLogin(provider: SocialProvider) {
    console.log('Social login attempt:', provider);
    this.loading = true;
    this.errorMessage = '';

    // Simulate social login
    setTimeout(() => {
      this.loading = false;
      this.errorMessage = `Successfully logged in with ${provider.name}! (Demo mode)`;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }, 1500);
  }

  onForgotPassword(email: string) {
    console.log('Forgot password:', email);
    this.errorMessage = `Password reset link sent to ${email} (Demo mode)`;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  onSignUp() {
    console.log('Sign up clicked');
    this.errorMessage = 'Redirecting to sign up page... (Demo mode)';
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }

  onLoginEvent(event: LoginEvent) {
    console.log('Login event:', event);
    this.lastEvent = event;
  }

  // Configuration controls
  changeTheme(theme: LoginConfig['theme']) {
    this.config = { ...this.config, theme };
  }

  changeLayout(layout: LoginConfig['layout']) {
    this.config = { ...this.config, layout };
  }

  toggleSection(section: keyof LoginConfig) {
    if (typeof this.config[section] === 'boolean') {
      this.config = {
        ...this.config,
        [section]: !(this.config[section] as boolean),
      };
    }
  }

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading) {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  setError() {
    this.errorMessage = 'This is a demo error message to show error handling.';
  }

  clearError() {
    this.errorMessage = '';
  }

  // Social providers management
  addSocialProvider() {
    const newProvider: SocialProvider = {
      id: `provider-${Date.now()}`,
      name: 'Custom Provider',
      icon: 'user',
      color: '#6c757d',
    };
    this.config.socialProviders = [
      ...(this.config.socialProviders || []),
      newProvider,
    ];
  }

  removeSocialProvider(providerId: string) {
    this.config.socialProviders =
      this.config.socialProviders?.filter((p) => p.id !== providerId) || [];
  }

  // Validation rules
  changeMinPasswordLength(event: Event) {
    const target = event.target as HTMLInputElement;
    const length = +target.value;
    this.config.validationRules = {
      ...this.config.validationRules,
      minPasswordLength: length,
    };
  }

  // Demo credentials
  fillDemoCredentials() {
    // This would typically be handled by the form, but for demo purposes
    console.log('Demo credentials: demo@example.com / password123');
    this.errorMessage = 'Demo credentials: demo@example.com / password123';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
