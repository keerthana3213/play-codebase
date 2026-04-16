import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type OtpVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning';

export type OtpSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-otp',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-otp.component.html',
  styleUrls: ['./aava-otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaOtpComponent),
      multi: true,
    },
  ],
})
export class AavaOtpComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() label = '';
  @Input() variant: OtpVariant = 'default';
  @Input() size: OtpSize = 'md';
  @Input() length = 6;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = '';
  @Input() helper = '';
  @Input() mask = false;
  @Input() id = ''; // Optional: for accessibility and form integration
  @Input() name = ''; // Optional: for form integration
  @Input() autocomplete = 'one-time-code'; // Helps browsers suggest OTP codes
  @Input() customStyles: Record<string, string> = {};

  @Output() complete = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();
  @Output() otpFocus = new EventEmitter<Event>();
  @Output() otpBlur = new EventEmitter<Event>();

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private _value = '';
  otpValues: string[] = [];
  currentIndex = -1; // Initialize to -1 so no box is focused by default

  private onChange: (value: string) => void = () => {
    /* noop */
  };
  private onTouched: () => void = () => {
    /* noop */
  };

  constructor(private cdr: ChangeDetectorRef) {
    // Don't initialize here - wait for OnInit when inputs are set
  }

  ngOnInit(): void {
    this.initializeOtpValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-initialize when length changes
    if (changes['length'] && !changes['length'].firstChange) {
      this.initializeOtpValues();
      this._value = this.getValueFromOtpArray();
      this.onChange(this._value);
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    // Don't auto-focus on initialization to avoid unwanted border colors
    // Users can click on the input they want to start with
  }

  private initializeOtpValues(): void {
    this.otpValues = Array.from({ length: this.length }, () => '');
  }

  private updateOtpValuesFromString(value: string): void {
    this.otpValues = Array.from({ length: this.length }, (_, i) => value[i] || '');
    this.cdr.markForCheck();
  }

  private getValueFromOtpArray(): string {
    return this.otpValues.join('');
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value = value || '';
    // Ensure otpValues array is properly sized before updating
    if (this.otpValues.length !== this.length) {
      this.initializeOtpValues();
    }
    this.updateOtpValuesFromString(this._value);
  }

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

  // Event handlers
  onOtpInput(event: Event, index: number): void {
    if (this.disabled || this.readonly) return;

    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Only allow single digit/character
    if (value.length > 1) {
      target.value = value.slice(-1);
    }

    this.otpValues[index] = target.value;
    this._value = this.getValueFromOtpArray();
    this.onChange(this._value);
    this.change.emit(this._value);

    // Auto-focus next input
    if (target.value && index < this.length - 1) {
      this.focusInput(index + 1);
    }

    // Check if OTP is complete
    if (this._value.length === this.length) {
      this.complete.emit(this._value);
    }

    this.cdr.markForCheck();
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (this.disabled || this.readonly) return;

    const target = event.target as HTMLInputElement;

    // Handle backspace
    if (event.key === 'Backspace') {
      if (!target.value && index > 0) {
        // Move to previous input if current is empty
        this.focusInput(index - 1);
      } else {
        // Clear current input
        this.otpValues[index] = '';
        target.value = '';
        this._value = this.getValueFromOtpArray();
        this.onChange(this._value);
        this.change.emit(this._value);
        this.cdr.markForCheck();
      }
    }

    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }

    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    }

    // Handle delete
    if (event.key === 'Delete') {
      this.otpValues[index] = '';
      target.value = '';
      this._value = this.getValueFromOtpArray();
      this.onChange(this._value);
      this.change.emit(this._value);
      this.cdr.markForCheck();
    }
  }

  onOtpPaste(event: ClipboardEvent, index: number): void {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';

    // Fill inputs starting from current index
    for (let i = 0; i < pastedData.length && (index + i) < this.length; i++) {
      this.otpValues[index + i] = pastedData[i];
      const inputElement = this.otpInputs.toArray()[index + i]?.nativeElement;
      if (inputElement) {
        inputElement.value = pastedData[i];
      }
    }

    this._value = this.getValueFromOtpArray();
    this.onChange(this._value);
    this.change.emit(this._value);

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = this.otpValues.findIndex((val, i) => i >= index && !val);
    if (nextEmptyIndex !== -1) {
      this.focusInput(nextEmptyIndex);
    } else {
      this.focusInput(Math.min(index + pastedData.length, this.length - 1));
    }

    // Check if OTP is complete
    if (this._value.length === this.length) {
      this.complete.emit(this._value);
    }

    this.cdr.markForCheck();
  }

  onOtpFocus(event: Event, index: number): void {
    this.currentIndex = index;
    this.otpFocus.emit(event);
  }

  onOtpBlur(event: Event): void {
    this.onTouched();
    this.otpBlur.emit(event);
  }

  private focusInput(index: number): void {
    if (index >= 0 && index < this.length) {
      setTimeout(() => {
        const inputElement = this.otpInputs.toArray()[index]?.nativeElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.select();
        }
      });
    }
  }

  // Computed properties
  get hasError(): boolean {
    return !!this.error;
  }

  get hasHelper(): boolean {
    return !!this.helper && !this.hasError;
  }

  get inputId(): string {
    return this.id || `ava-otp-${Math.random().toString(36).substr(2, 9)}`;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get helperId(): string {
    return `${this.inputId}-helper`;
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.hasError) ids.push(this.errorId);
    if (this.hasHelper) ids.push(this.helperId);
    return ids.join(' ') || '';
  }

  get wrapperClasses(): string {
    const classes = [
      'ava-otp',
      `ava-otp--${this.size}`,
      `ava-otp--${this.variant}`,
    ];

    if (this.disabled) classes.push('ava-otp--disabled');
    if (this.readonly) classes.push('ava-otp--readonly');
    if (this.hasError) classes.push('ava-otp--error');

    return classes.join(' ');
  }

  get inputClasses(): string {
    return [
      'ava-otp__input',
      `ava-otp__input--${this.size}`,
    ].join(' ');
  }

  get otpBoxes(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }

  // Clear all OTP values
  clear(): void {
    this.initializeOtpValues(); // Use the centralized initialization method
    this._value = '';
    this.onChange(this._value);
    this.change.emit(this._value);

    // Clear all input elements
    this.otpInputs.forEach(input => {
      input.nativeElement.value = '';
    });

    // Focus first input
    if (!this.disabled && this.otpInputs.length > 0) {
      this.focusInput(0);
    }

    this.cdr.markForCheck();
  }
}
