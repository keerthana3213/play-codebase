import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  WritableSignal,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type SliderSize = 'sm' | 'md';
export type SliderType = 'default' | 'input';

@Component({
  selector: 'aava-slider',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-slider.component.html',
  styleUrl: './aava-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaSliderComponent),
      multi: true,
    },
  ],
})
export class AavaSliderComponent implements ControlValueAccessor, OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() step = 1;
  @Input() showTooltip = true;
  @Input() size: SliderSize = 'md';
  @Input() type: SliderType = 'default';

  // Multi-range support
  @Input() multiRange = false;
  @Input() minValue = 20;
  @Input() maxValue = 80;
  @Output() minValueChange = new EventEmitter<number>();
  @Output() maxValueChange = new EventEmitter<number>();
  @Output() minChange = new EventEmitter<number>();
  @Output() maxChange = new EventEmitter<number>();

  // Icon support
  @Input() iconStart = '';
  @Input() iconEnd = '';
  @Input() handleIcon = '';
  @Input() handleIconStart = '';
  @Input() handleIconEnd = '';
  @Input() customStyles: Record<string, string> = {};
  @Input() disabled = false;
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;
  @Input() ariaValuetext: string | null = null;
  @Input() tooltipFormatter: ((value: number) => string) | null = null;

  @Output() valueChange = new EventEmitter<number>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<number>();
  @ViewChild('sliderTrack') sliderTrack?: ElementRef<HTMLElement>;

  isHovered = false;
  isDragging = false;
  draggingHandle: 'min' | 'max' | null = null;
  focusedHandle: 'min' | 'max' | null = null;

  private readonly _uniqueId = `aava-slider-${Math.random().toString(36).slice(2, 11)}`;
  private onChange: (value: number) => void = () => { }; // eslint-disable-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { }; // eslint-disable-line @typescript-eslint/no-empty-function

  /**
   * Centralized function to emit slider value changes.
   * Emits to both outputs: valueChange and change
   */
  private emitValueChange(value: number): void {
    this.valueChange.emit(value);
    this.change.emit(value);
  }

  /**
   * Centralized function to emit min value changes.
   * Emits to both outputs: minValueChange and minChange
   */
  private emitMinValueChange(value: number): void {
    this.minValueChange.emit(value);
    this.minChange.emit(value);
  }

  /**
   * Centralized function to emit max value changes.
   * Emits to both outputs: maxValueChange and maxChange
   */
  private emitMaxValueChange(value: number): void {
    this.maxValueChange.emit(value);
    this.maxChange.emit(value);
  }

  decimalStepValue: WritableSignal<number> = signal(1);

  /**
   * Gets unique ID for the component instance
   */
  get componentId(): string {
    return this.id || this._uniqueId;
  }

  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Validates that min is less than max
   */
  private validateRange(): void {
    if (this.min >= this.max) {
      console.warn('Slider: min must be less than max. Adjusting max to min + 1.');
      this.max = this.min + 1;
    }
  }

  /**
   * Validates that step is positive
   */
  private validateStep(): void {
    if (this.step <= 0) {
      console.warn('Slider: step must be positive. Using default step of 1.');
      this.step = 1;
    }
  }

  /**
   * Validates and clamps value to valid range
   */
  private validateValue(): void {
    if (this.value < this.min) {
      this.value = this.min;
    } else if (this.value > this.max) {
      this.value = this.max;
    }
  }

  /**
   * Validates multi-range values
   */
  private validateMultiRangeValues(): void {
    if (this.minValue < this.min) {
      this.minValue = this.min;
    }
    if (this.maxValue > this.max) {
      this.maxValue = this.max;
    }
    if (this.minValue > this.maxValue) {
      this.minValue = this.maxValue - this.step;
    }
    if (this.maxValue < this.minValue) {
      this.maxValue = this.minValue + this.step;
    }
  }

  /**
   * Handles changes to input properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] || changes['max']) {
      this.validateRange();
      this.validateValue();
      if (this.multiRange) {
        this.validateMultiRangeValues();
      }
      this.cdr.markForCheck();
    }

    if (changes['step']) {
      this.validateStep();
      this.cdr.markForCheck();
    }

    if (changes['value']) {
      this.validateValue();
      this.cdr.markForCheck();
    }

    if (changes['minValue'] || changes['maxValue']) {
      if (this.multiRange) {
        this.validateMultiRangeValues();
        this.cdr.markForCheck();
      }
    }
  }

  /**
   * Rounds a value to the nearest step with proper decimal precision
   * Fixes floating-point arithmetic issues
   */
  private roundToStep(value: number): number {
    // Calculate the number of decimal places in the step
    const stepStr = this.step.toString();
    const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;

    // Use precise rounding to avoid floating-point errors
    const factor = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round((value / this.step) * factor) / factor * this.step;

    // Round to the correct number of decimal places
    return parseFloat(roundedValue.toFixed(decimalPlaces));
  }

  /**
   * Gets percentage value for single range slider
   */
  get percentage(): number {
    const range = this.max - this.min;
    if (range === 0) {
      return 0;
    }
    return ((this.value - this.min) / range) * 100;
  }

  /**
   * Gets percentage value for multi-range min handle
   */
  get minPercentage(): number {
    const range = this.max - this.min;
    if (range === 0) {
      return 0;
    }
    return ((this.minValue - this.min) / range) * 100;
  }

  /**
   * Gets percentage value for multi-range max handle
   */
  get maxPercentage(): number {
    const range = this.max - this.min;
    if (range === 0) {
      return 100;
    }
    return ((this.maxValue - this.min) / range) * 100;
  }

  /**
   * Formats tooltip value
   */
  formatTooltip(value: number): string {
    if (this.tooltipFormatter) {
      return this.tooltipFormatter(value);
    }
    return `${value}%`;
  }

  /**
   * Gets computed aria-label for accessibility
   */
  get computedAriaLabel(): string | null {
    return this.ariaLabel || null;
  }

  /**
   * Gets computed aria-valuetext
   */
  getComputedAriaValuetext(value: number): string | null {
    if (this.ariaValuetext) {
      return this.ariaValuetext;
    }
    if (this.tooltipFormatter) {
      return this.tooltipFormatter(value);
    }
    return null;
  }

  // ControlValueAccessor methods
  /**
   * Writes a new value to the component
   */
  writeValue(value: number | null | undefined): void {
    if (value == null || isNaN(value)) {
      this.value = 0;
    } else {
      this.value = value;
      this.validateValue();
    }
    this.cdr.markForCheck();
  }

  /**
   * Registers a callback function for value changes
   */
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function for touched state
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component
   */
  setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
      this.cdr.markForCheck();
    }
  }

  /**
   * Handles track click events
   */
  onTrackClick(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    if (this.multiRange) {
      this.updateMultiValueFromEvent(event);
    } else {
      this.updateValueFromEvent(event);
    }
  }

  /**
   * Starts dragging operation
   */
  startDrag(event: MouseEvent, handle: 'min' | 'max' | null = null): void {
    if (this.disabled) {
      return;
    }
    event.preventDefault();
    this.isDragging = true;
    this.isHovered = true;
    this.draggingHandle = handle;
  }

  /**
   * Handles focus on min handle
   */
  onMinHandleFocus(): void {
    this.focusedHandle = 'min';
  }

  /**
   * Handles blur on min handle
   */
  onMinHandleBlur(): void {
    if (this.focusedHandle === 'min') {
      this.focusedHandle = null;
    }
  }

  /**
   * Handles focus on max handle
   */
  onMaxHandleFocus(): void {
    this.focusedHandle = 'max';
  }

  /**
   * Handles blur on max handle
   */
  onMaxHandleBlur(): void {
    if (this.focusedHandle === 'max') {
      this.focusedHandle = null;
    }
  }

  /**
   * Handles keyboard navigation
   */
  onKeyDown(event: KeyboardEvent, handle?: 'min' | 'max'): void {
    if (this.disabled) {
      return;
    }

    if (this.multiRange) {
      this.handleMultiRangeKeyDown(event, handle);
    } else {
      this.handleSingleRangeKeyDown(event);
    }
  }

  /**
   * Handles keyboard navigation for single range slider
   */
  private handleSingleRangeKeyDown(event: KeyboardEvent): void {
    let newValue = this.value;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = this.value + this.step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = this.value - this.step;
        break;
      case 'Home':
        newValue = this.min;
        break;
      case 'End':
        newValue = this.max;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.updateValue(newValue);
  }

  /**
   * Handles keyboard navigation for multi-range slider
   */
  private handleMultiRangeKeyDown(event: KeyboardEvent, handle?: 'min' | 'max'): void {
    const currentHandle = handle || this.focusedHandle || 'min';
    let newValue = currentHandle === 'min' ? this.minValue : this.maxValue;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = (currentHandle === 'min' ? this.minValue : this.maxValue) + this.step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = (currentHandle === 'min' ? this.minValue : this.maxValue) - this.step;
        break;
      case 'Home':
        newValue = currentHandle === 'min' ? this.min : this.minValue + this.step;
        break;
      case 'End':
        newValue = currentHandle === 'min' ? this.maxValue - this.step : this.max;
        break;
      case 'Tab':
        // Allow tab to move focus between handles
        return;
      default:
        return;
    }

    event.preventDefault();

    if (currentHandle === 'min') {
      const roundedValue = this.roundToStep(newValue);
      const clamped = Math.min(Math.max(this.min, roundedValue), this.maxValue - this.step);
      if (clamped !== this.minValue) {
        this.minValue = clamped;
        this.emitMinValueChange(this.minValue);
        this.cdr.markForCheck();
      }
    } else {
      const roundedValue = this.roundToStep(newValue);
      const clamped = Math.max(Math.min(this.max, roundedValue), this.minValue + this.step);
      if (clamped !== this.maxValue) {
        this.maxValue = clamped;
        this.emitMaxValueChange(this.maxValue);
        this.cdr.markForCheck();
      }
    }
  }

  /**
   * Handles mouse move events during dragging
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.disabled || !this.isDragging) {
      return;
    }
    if (this.multiRange) {
      this.updateMultiValueFromEvent(event, this.draggingHandle);
    } else {
      this.updateValueFromEvent(event);
    }
  }

  /**
   * Handles mouse up events to end dragging
   */
  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.disabled || !this.isDragging) {
      return;
    }
    this.isDragging = false;
    this.isHovered = false;
    this.draggingHandle = null;
    this.onTouched();
    this.cdr.markForCheck();
  }

  /**
   * Handles decimal step changes
   */
  onDecimalStepChange(value: number): void {
    const roundedValue = this.roundToStep(value);
    this.decimalStepValue.set(roundedValue);
  }

  /**
   * Handles input field changes
   */
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target || !target.value) {
      return;
    }

    const inputValue = parseFloat(target.value);
    if (!isNaN(inputValue)) {
      const clampedValue = Math.max(this.min, Math.min(this.max, inputValue));
      this.updateValue(clampedValue);
    }
  }

  /**
   * Updates value from mouse event for single range slider
   */
  private updateValueFromEvent(event: MouseEvent): void {
    if (!this.sliderTrack?.nativeElement) {
      return;
    }

    try {
      const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }
      const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const newValue = this.min + percentage * (this.max - this.min);
      this.updateValue(newValue);
    } catch (error) {
      console.error('Error updating slider value from event:', error);
    }
  }

  /**
   * Updates multi-range values from mouse event
   */
  private updateMultiValueFromEvent(
    event: MouseEvent,
    handle: 'min' | 'max' | null = null
  ): void {
    if (!this.sliderTrack?.nativeElement) {
      return;
    }

    try {
      const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }
      const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const newValue = this.min + percentage * (this.max - this.min);

      if (
        handle === 'min' ||
        (!handle &&
          Math.abs(newValue - this.minValue) < Math.abs(newValue - this.maxValue))
      ) {
        // Move min handle
        const roundedValue = this.roundToStep(newValue);
        const clamped = Math.min(
          Math.max(this.min, roundedValue),
          this.maxValue - this.step
        );
        if (clamped !== this.minValue) {
          this.minValue = clamped;
          this.emitMinValueChange(this.minValue);
          this.cdr.markForCheck();
        }
      } else {
        // Move max handle
        const roundedValue = this.roundToStep(newValue);
        const clamped = Math.max(
          Math.min(this.max, roundedValue),
          this.minValue + this.step
        );
        if (clamped !== this.maxValue) {
          this.maxValue = clamped;
          this.emitMaxValueChange(this.maxValue);
          this.cdr.markForCheck();
        }
      }
    } catch (error) {
      console.error('Error updating multi-range slider value from event:', error);
    }
  }

  /**
   * Updates the slider value with validation and clamping
   */
  private updateValue(value: number): void {
    const roundedValue = this.roundToStep(value);
    const clampedValue = Math.max(this.min, Math.min(this.max, roundedValue));
    if (clampedValue !== this.value) {
      this.value = clampedValue;
      this.onChange(this.value);
      this.emitValueChange(this.value);
      this.cdr.markForCheck();
    }
  }
}
