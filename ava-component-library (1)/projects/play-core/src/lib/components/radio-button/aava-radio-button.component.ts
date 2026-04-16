import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

/**
 * Focus index constants
 */
const NO_FOCUS = -1;
const FIRST_INDEX = 0;

@Component({
  selector: 'aava-radio-button',
  imports: [CommonModule],
  templateUrl: './aava-radio-button.component.html',
  styleUrl: './aava-radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaRadioButtonComponent),
      multi: true,
    },
  ],
})
export class AavaRadioButtonComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() options: RadioOption[] = [];
  @Input() name = '';
  @Input() selectedValue = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() color = '';
  @Input() labelColor = '';
  @Input() radio: 'dot' | 'none' = 'dot';
  @Input() animation: 'none' | 'shadow' = 'none';
  @Input() id = '';
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;
  @Input() required = false;

  focusedIndex = NO_FOCUS;
  @Output() selectedValueChange = new EventEmitter<string>();

  private readonly _uniqueId = `aava-radio-button-${Math.random().toString(36).slice(2, 11)}`;
  private onChange: (value: string) => void = () => { }; // eslint-disable-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => { }; // eslint-disable-line @typescript-eslint/no-empty-function
  isDisabled = false;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gets unique ID for the component instance
   */
  get componentId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets computed aria-label for the radio group
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    if (this.ariaLabelledby) {
      return null; // aria-labelledby takes precedence
    }
    // Fallback to auto-generated label if options are available
    if (this.options && this.options.length > 0) {
      return `Radio button group with ${this.options.length} option${this.options.length === 1 ? '' : 's'}`;
    }
    return null;
  }

  /**
   * Validates that options array is valid
   */
  private validateOptions(): boolean {
    if (!this.options || !Array.isArray(this.options) || this.options.length === 0) {
      return false;
    }
    return true;
  }

  /**
   * Validates that selectedValue exists in options
   */
  private validateSelectedValue(): boolean {
    if (!this.selectedValue || !this.validateOptions()) {
      return false;
    }
    return this.options.some(option => option?.value === this.selectedValue);
  }

  /**
   * Validates and resets focus index if it becomes invalid
   */
  private validateFocusIndex(): void {
    if (!this.validateOptions()) {
      this.focusedIndex = NO_FOCUS;
      return;
    }

    // Check if current focus index is valid
    if (this.focusedIndex >= 0 && this.focusedIndex < this.options.length) {
      const option = this.options[this.focusedIndex];
      // If focused option is disabled, reset focus
      if (option?.disabled) {
        this.initializeFocus();
      }
      return;
    }

    // Focus index is out of bounds, reinitialize
    this.initializeFocus();
  }

  /**
   * Initializes component on start
   */
  ngOnInit(): void {
    this.validateOptions();
    this.initializeFocus();
  }

  /**
   * Handles changes to input properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['selectedValue']) {
      // Validate options
      if (!this.validateOptions()) {
        this.focusedIndex = NO_FOCUS;
        this.cdr.markForCheck();
        return;
      }

      // Validate selected value
      if (!this.validateSelectedValue() && this.selectedValue) {
        // Selected value doesn't exist in options, reset it
        this.selectedValue = '';
        this.onChange('');
        this.cdr.markForCheck();
      }

      // Reinitialize focus when options change
      this.validateFocusIndex();
      this.cdr.markForCheck();
    }

    if (changes['id']) {
      this.cdr.markForCheck();
    }
  }

  /**
   * Ensures focus is properly set after view initialization
   */
  ngAfterViewInit(): void {
    if (this.focusedIndex === NO_FOCUS) {
      this.initializeFocus();
      this.cdr.markForCheck();
    }
  }

  /**
   * Initializes focus to selected option or first enabled option
   */
  private initializeFocus(): void {
    if (!this.validateOptions()) {
      this.focusedIndex = NO_FOCUS;
      return;
    }

    // Set focus to selected option if it exists and is enabled
    if (this.selectedValue) {
      const selectedIndex = this.options.findIndex(
        (option) => option?.value === this.selectedValue
      );

      if (selectedIndex >= 0 && selectedIndex < this.options.length) {
        const selectedOption = this.options[selectedIndex];
        if (selectedOption && !selectedOption.disabled) {
          this.focusedIndex = selectedIndex;
          return;
        }
      }
    }

    // Find first enabled option
    const firstEnabledIndex = this.options.findIndex(
      (option) => option && !option.disabled
    );

    // Only set focus if we have at least one enabled option
    if (firstEnabledIndex >= 0) {
      this.focusedIndex = firstEnabledIndex;
    } else {
      // All options are disabled, don't set focus
      this.focusedIndex = NO_FOCUS;
    }
  }

  /**
   * Handles focus on the radio group
   */
  onGroupFocus(): void {
    if (!this.validateOptions()) {
      return;
    }
    // When the group receives focus, ensure we have a focused option
    if (this.focusedIndex === NO_FOCUS) {
      this.initializeFocus();
      this.cdr.markForCheck();
    }
  }

  /**
   * Handles selection change
   */
  onSelectionChange(value: string): void {
    if (this.isDisabled || !value) {
      return;
    }

    // Validate that the value exists in options
    if (!this.validateOptions() || !this.options.some(opt => opt?.value === value)) {
      return;
    }

    this.selectedValue = value;
    this.selectedValueChange.emit(this.selectedValue);
    this.onChange(this.selectedValue);
    this.onTouched();
    this.cdr.markForCheck();
  }

  /**
   * Handles keyboard navigation
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled || !this.validateOptions()) {
      return;
    }

    const enabledOptions = this.options
      .map((option, index) => ({ option, index }))
      .filter((item) => item.option && !item.option.disabled);

    if (enabledOptions.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.focusNextOption(enabledOptions);
        this.cdr.markForCheck();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.focusPreviousOption(enabledOptions);
        this.cdr.markForCheck();
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (this.focusedIndex >= 0 && this.focusedIndex < this.options.length) {
          const option = this.options[this.focusedIndex];
          if (option && !option.disabled && option.value) {
            this.onSelectionChange(option.value);
          }
        }
        break;
    }
  }

  /**
   * Moves focus to the next enabled option
   */
  private focusNextOption(
    enabledOptions: { option: RadioOption; index: number }[]
  ): void {
    if (!enabledOptions || enabledOptions.length === 0) {
      return;
    }

    const currentEnabledIndex = enabledOptions.findIndex(
      (item) => item.index === this.focusedIndex
    );
    const nextIndex = (currentEnabledIndex + 1) % enabledOptions.length;
    if (enabledOptions[nextIndex] && enabledOptions[nextIndex].index >= 0) {
      this.focusedIndex = enabledOptions[nextIndex].index;
    }
  }

  /**
   * Moves focus to the previous enabled option
   */
  private focusPreviousOption(
    enabledOptions: { option: RadioOption; index: number }[]
  ): void {
    if (!enabledOptions || enabledOptions.length === 0) {
      return;
    }

    const currentEnabledIndex = enabledOptions.findIndex(
      (item) => item.index === this.focusedIndex
    );
    const prevIndex =
      currentEnabledIndex <= FIRST_INDEX
        ? enabledOptions.length - 1
        : currentEnabledIndex - 1;
    if (enabledOptions[prevIndex] && enabledOptions[prevIndex].index >= 0) {
      this.focusedIndex = enabledOptions[prevIndex].index;
    }
  }

  /**
   * Gets a unique ID for a radio option by index
   */
  getOptionId(index: number): string {
    return `${this.componentId}-option-${index}`;
  }

  /**
   * Gets a unique ID for a radio label by index
   */
  getLabelId(index: number): string {
    return `${this.componentId}-label-${index}`;
  }

  // ControlValueAccessor methods
  /**
   * Writes a new value to the component
   */
  writeValue(value: string): void {
    if (value !== this.selectedValue) {
      // Validate value exists in options
      if (value && this.validateOptions() && !this.options.some(opt => opt?.value === value)) {
        // Value doesn't exist in options, ignore it
        return;
      }
      this.selectedValue = value || '';
      this.validateFocusIndex();
      this.cdr.markForCheck();
    }
  }

  /**
   * Registers a callback function for value changes
   */
  registerOnChange(fn: (value: string) => void): void {
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
    if (this.isDisabled !== isDisabled) {
      this.isDisabled = isDisabled;
      this.cdr.markForCheck();
    }
  }

  /**
   * Get computed styles for custom color effects including glow
   */
  get customStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    // Set custom glow color based on the color input
    if (this.color) {
      styles['--radio-custom-glow-color'] = this.color;
    }
    return styles;
  }
}
