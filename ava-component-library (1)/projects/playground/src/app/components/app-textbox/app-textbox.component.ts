import {
  Component,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AavaTextboxComponent,
  TextboxVariant,
  TextboxSize,
} from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'ava-app-textbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AavaTextboxComponent,
    AavaIconComponent,
  ],
  providers: [],
  templateUrl: './app-textbox.component.html',
  styleUrls: ['./app-textbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppTextboxComponent {
  // Demo form
  demoForm: FormGroup;

  // Basic usage values
  basicValue = '';
  emailValue = '';

  // Variant values
  defaultValue = '';
  primaryValue = '';
  successValue = '';
  errorValue = '';
  warningValue = '';
  infoValue = '';

  // Size values
  smallValue = '';
  mediumValue = '';
  largeValue = '';

  // Icons & affixes values
  searchValue = '';
  currencyValue = '';
  emailWithIconValue = '';
  percentageValue = '';

  // States & validation values
  helperValue = '';
  errorStateValue = '';
  requiredValue = '';
  maxLengthValue = '';

  // Processing effects values
  processingValue = '';
  shimmerValue = '';
  gradientValue = '';
  customGradientValue = '';

  // Glass & effects values
  glass10Value = '';
  glass50Value = '';
  tintValue = '';
  glowValue = '';

  // Available options for demo
  variants: TextboxVariant[] = [
    'default',
    'primary',
    'success',
    'error',
    'warning',
    'info',
  ];
  sizes: TextboxSize[] = ['sm', 'md', 'lg'];

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  // Event handlers
  clearSearch(): void {
    this.searchValue = '';
    console.log('Search cleared');
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form submitted:', this.demoForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.demoForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
  // Real password value (actual text)
  private _realPasswordValue = '';

  // Password form control
  passwordControl = new FormControl('');

  showPassword = false;

  get realPasswordValue(): string {
    return this._realPasswordValue;
  }

  /**
   * Handle password input with JavaScript masking
   * Converts characters to dots while preserving the real value
   */
  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const currentDisplayValue = input.value;
    const cursorPosition = input.selectionStart || 0;

    if (this.showPassword) {
      // When visible, just update the real value directly
      this._realPasswordValue = currentDisplayValue;
      this.passwordControl.setValue(currentDisplayValue, { emitEvent: false });
    } else {
      // When masked, we need to figure out what changed
      const previousDisplayValue = this.passwordControl.value || '';
      const previousLength = previousDisplayValue.length;
      const currentLength = currentDisplayValue.length;

      if (currentLength > previousLength) {
        // Characters were added
        const charsAdded = currentLength - previousLength;
        const addPosition = cursorPosition - charsAdded;
        const newChars = currentDisplayValue.substring(addPosition, cursorPosition);

        // Update real value
        this._realPasswordValue =
          this._realPasswordValue.substring(0, addPosition) +
          newChars +
          this._realPasswordValue.substring(addPosition);

      } else if (currentLength < previousLength) {
        // Characters were deleted
        const charsDeleted = previousLength - currentLength;

        // Update real value
        this._realPasswordValue =
          this._realPasswordValue.substring(0, cursorPosition) +
          this._realPasswordValue.substring(cursorPosition + charsDeleted);

      } else {
        // Length same - might be replacement/selection delete
        // For simplicity, we'll handle this as the value at cursor changed
        const newChar = currentDisplayValue.charAt(cursorPosition - 1);
        if (newChar && newChar !== '•') {
          this._realPasswordValue =
            this._realPasswordValue.substring(0, cursorPosition - 1) +
            newChar +
            this._realPasswordValue.substring(cursorPosition);
        }
      }

      // Update display value with dots
      const maskedValue = '•'.repeat(this._realPasswordValue.length);
      this.passwordControl.setValue(maskedValue, { emitEvent: false });

      // Restore cursor position
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      // Show real password
      this.passwordControl.setValue(this._realPasswordValue, { emitEvent: false });
    } else {
      // Show dots
      this.passwordControl.setValue('•'.repeat(this._realPasswordValue.length), { emitEvent: false });
    }
  }
}
