import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';

@Component({
  selector: 'aava-checkbox',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-checkbox.component.html',
  styleUrls: ['./aava-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaCheckboxComponent),
      multi: true
    }
  ]
})
export class AavaCheckboxComponent implements ControlValueAccessor, OnDestroy {
  @Input() variant: 'default' | 'with-bg' | 'animated' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() alignment: 'vertical' | 'horizontal' = 'vertical';
  @Input() label = '';
  @Input() indeterminate = false;
  @Input() disable = false;
  @Input() customStyles: Record<string, string> = {};
  @Input() error = '';
  @Input() id = '';
  @Input() required = false;
  @Input() name = '';
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  /** Current checked state */
  @Input() isChecked = false;
  @Output() isCheckedChange = new EventEmitter<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<boolean>();

  isAnimating = false;
  isUnchecking = false;

  /** Timeout tracking for cleanup */
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  /** ControlValueAccessor callbacks */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (value: boolean) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn: () => void = () => { };

  /** Unique ID for this component instance */
  private readonly _uniqueId = `ava-checkbox-${Math.random()
    .toString(36)
    .slice(2, 11)}`;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Centralized function to emit checkbox state changes.
   * Emits to both outputs: isCheckedChange and change
   */
  private emitCheckboxChange(value: boolean): void {
    this.isCheckedChange.emit(value);
    this.change.emit(value);
  }

  // ==== ControlValueAccessor API ====
  writeValue(value: boolean): void {
    this.isChecked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    // Clear all pending timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }

  // ==== Getters for classes ====
  get containerClasses(): Record<string, boolean> {
    return {
      'with-bg': this.variant === 'with-bg',
      animated: this.variant === 'animated',
      horizontal: this.alignment === 'horizontal',
      sm: this.size === 'sm',
      md: this.size === 'md',
      lg: this.size === 'lg',
      disabled: this.disable,
    };
  }

  get checkboxClasses(): Record<string, boolean> {
    return {
      checked: this.isChecked && !this.isUnchecking,
      indeterminate: this.indeterminate,
      checking: this.isAnimating && this.isChecked,
      unchecking: this.isUnchecking,
    };
  }

  get showIcon(): boolean {
    return this.isChecked || this.indeterminate || this.isUnchecking;
  }

  get showCheckmark(): boolean {
    return (this.isChecked || this.isUnchecking) && !this.indeterminate;
  }

  // ==== Core toggle logic ====
  /**
   * Toggles the checked state of the checkbox.
   * Handles indeterminate state, different variants, and emits change events.
   */
  toggleCheckbox(): void {
    if (this.disable) return;

    this.onTouchedFn(); // mark as touched

    if (this.indeterminate) {
      this.isChecked = true;
      this.indeterminate = false;
      this.onChangeFn(this.isChecked);
      this.emitCheckboxChange(this.isChecked);
      this.cdr.markForCheck();
      return;
    }

    if (this.variant === 'animated') {
      if (this.isChecked) {
        this.handleUnchecking();
      } else {
        this.handleChecking();
      }
    } else if (this.variant === 'with-bg') {
      if (this.isChecked) {
        this.handleWithBgUnchecking();
      } else {
        this.isChecked = true;
        this.onChangeFn(this.isChecked);
        this.emitCheckboxChange(this.isChecked);
      }
    } else {
      // Default variant
      if (this.isChecked) {
        this.isUnchecking = true;

        const timeoutId = setTimeout(() => {
          this.isChecked = false;
          this.isUnchecking = false;
          this.onChangeFn(this.isChecked);
          this.emitCheckboxChange(this.isChecked);
          this.cdr.markForCheck();
        }, 300); // Wait for erase animation (300ms)
        this.timeouts.push(timeoutId);
      } else {
        this.isChecked = true;
        this.onChangeFn(this.isChecked);
        this.emitCheckboxChange(this.isChecked);
        this.cdr.markForCheck();
      }
    }
  }

  /**
   * Handles keyboard events for the checkbox.
   * Supports Space and Enter keys to toggle the checkbox.
   * @param event - The keyboard event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleCheckbox();
    }
  }

  /**
   * Handles the checking animation for animated variant.
   * Sets animation state and updates after animation completes.
   */
  private handleChecking(): void {
    this.isAnimating = true;
    this.isChecked = true;

    const timeoutId = setTimeout(() => {
      this.isAnimating = false;
      this.onChangeFn(this.isChecked);
      this.emitCheckboxChange(this.isChecked);
      this.cdr.markForCheck();
    }, 600);
    this.timeouts.push(timeoutId);
  }

  /**
   * Handles the unchecking animation for animated variant.
   * Updates state after animation completes.
   */
  private handleUnchecking(): void {
    this.isUnchecking = true;

    const timeoutId = setTimeout(() => {
      this.isChecked = false;
      this.isUnchecking = false;
      this.onChangeFn(this.isChecked);
      this.emitCheckboxChange(this.isChecked);
      this.cdr.markForCheck();
    }, 300);
    this.timeouts.push(timeoutId);
  }

  /**
   * Handles the unchecking animation for with-bg variant.
   * Updates state after shorter animation delay.
   */
  private handleWithBgUnchecking(): void {
    this.isUnchecking = true;

    const timeoutId = setTimeout(() => {
      this.isChecked = false;
      this.isUnchecking = false;
      this.onChangeFn(this.isChecked);
      this.emitCheckboxChange(this.isChecked);
      this.cdr.markForCheck();
    }, 150);
    this.timeouts.push(timeoutId);
  }
  get hasError(): boolean {
    return !!this.error;
  }
  get errorId(): string {
    return `${this.inputId}-error`;
  }
  get inputId(): string {
    return this.id || this._uniqueId;
  }

  get labelId(): string {
    return `${this.inputId}-label`;
  }

  get inputClasses(): string {
    const classes = ['aava-checkbox'];
    if (this.size) classes.push(`aava-checkbox--${this.size}`);
    return classes.join(' ');
  }
}
