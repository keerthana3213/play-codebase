import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaTextboxComponent } from '../../components/textbox/aava-textbox.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';

export interface PasswordRule {
  message: string;
  validator: (password: string) => boolean;
}

export interface PasswordValidationState {
  password: string;
  confirmPassword: string;
  isValid: boolean;
  rulesValidation: RuleValidationResult[];
  passwordsMatch: boolean;
}

export interface RuleValidationResult {
  message: string;
  isValid: boolean;
}

@Component({
  selector: 'aava-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent, AavaIconComponent],
  templateUrl: './aava-reset-password.component.html',
  styleUrl: './aava-reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaResetPasswordComponent),
      multi: true
    }
  ]
})
export class AavaResetPasswordComponent implements ControlValueAccessor,OnInit {
  @Input() label = 'New Password';
  @Input() confirmLabel = 'Confirm Password';
  @Input() placeholder = 'Enter your password';
  @Input() confirmPlaceholder = 'Re-enter your password';
  @Input() rules: PasswordRule[] = [];
  @Input() showConfirmPassword = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() disabled = false;
  @Input() showPasswordStrength = false;
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null;

  @Output() passwordChange = new EventEmitter<PasswordValidationState>();
  @Output() validationChange = new EventEmitter<boolean>();

  password = '';
  confirmPassword = '';
  rulesValidation: RuleValidationResult[] = [];
  showPassword = false;
  showConfirmPasswordValue = false;

  constructor(private cdr: ChangeDetectorRef) { }



  // ControlValueAccessor implementation
  writeValue(value: PasswordValidationState): void {
    this.password = value.password || '';
    this.cdr.markForCheck();
  }

  onChange: (value: string) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.initializeRulesValidation();
  }

  private initializeRulesValidation(): void {
    this.rulesValidation = this.rules.map((rule) => ({
      message: rule.message,
      isValid: false,
    }));
  }

  onPasswordInput(): void {
    this.validatePassword();
    this.emitPasswordChange();
    
  }

  onConfirmPasswordInput(): void {
    this.emitPasswordChange();
  }

  private validatePassword(): void {
    this.rulesValidation = this.rules.map((rule) => ({
      message: rule.message,
      isValid: rule.validator(this.password),
    }));
    this.cdr.markForCheck();
  }

  private emitPasswordChange(): void {
    const state: PasswordValidationState = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      isValid: this.isPasswordValid,
      rulesValidation: this.rulesValidation,
      passwordsMatch: this.passwordsMatch,
    };
    this.onChange( this.password);

    this.passwordChange.emit(state);
    this.validationChange.emit(state.isValid);
  }

  get isPasswordValid(): boolean {
    const allRulesValid = this.rulesValidation.every((rule) => rule.isValid);
    const confirmValid = this.showConfirmPassword ? this.passwordsMatch : true;
    return allRulesValid && confirmValid && this.password.length > 0;
  }

  get passwordsMatch(): boolean {
    if (!this.showConfirmPassword) return true;
    return (
      this.password === this.confirmPassword && this.confirmPassword.length > 0
    );
  }

  get hasAnyRuleFailed(): boolean {
    return this.rulesValidation.some((rule) => !rule.isValid);
  }

  get passwordStrength(): 'weak' | 'medium' | 'strong' {
    const validRulesCount = this.rulesValidation.filter(
      (rule) => rule.isValid
    ).length;
    const totalRules = this.rules.length;

    if (validRulesCount === 0 || this.password.length === 0) return 'weak';
    if (validRulesCount === totalRules) return 'strong';
    return 'medium';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPasswordValue = !this.showConfirmPasswordValue;
  }
}
