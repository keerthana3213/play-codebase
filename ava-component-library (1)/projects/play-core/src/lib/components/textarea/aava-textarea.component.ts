import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type AavaTextareaVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'processing';
export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-textarea',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-textarea.component.html',
  styleUrl: './aava-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaTextareaComponent),
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AavaTextareaComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  // Constants
  private readonly DEFAULT_ROWS = 3;
  private readonly DEFAULT_MAX_HEIGHT = 0;
  private readonly _uniqueId = `ava-textarea-${Math.random().toString(36).slice(2, 11)}`;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() variant: AavaTextareaVariant = 'default';
  @Input() size: TextareaSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = '';
  @Input() helper = '';
  @Input() rows = this.DEFAULT_ROWS;
  @Input() id = '';
  @Input() name = '';
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input() required = false;
  @Input() fullWidth = false;
  @Input() style?: Record<string, string>;
  @Input() resizable = true;
  @Input() autoResize = false;
  @Input() maxHeight = this.DEFAULT_MAX_HEIGHT;
  @Input() processing = false;
  @Input() processingGradientBorder = false;
  @Input() processingGradientColors: string[] = [
    '#e91e63',
    '#fee140',
    '#ff9800',
    '#047857',
    '#ff9800',
    '#fee140',
    '#e91e63',
  ];
  @Input() customStyles: Record<string, string> = {};

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  /**
   * @deprecated Use `blur` output instead. This will be removed in a future version.
   */
  @Output() textareaBlur = new EventEmitter<Event>();
  /**
   * @deprecated Use `focus` output instead. This will be removed in a future version.
   */
  @Output() textareaFocus = new EventEmitter<Event>();
  /**
   * @deprecated Use `input` output instead. This will be removed in a future version.
   */
  @Output() textareaInput = new EventEmitter<Event>();
  /**
   * @deprecated Use `change` output instead. This will be removed in a future version.
   */
  @Output() textareaChange = new EventEmitter<Event>();

  // Updated outputs
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() focus = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() input = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<Event>();
  @Output() iconStartClick = new EventEmitter<Event>();
  @Output() iconEndClick = new EventEmitter<Event>();

  value = '';
  isFocused = false;
  requiredError = false;

  @ViewChild('textareaElement')
  textareaElement?: ElementRef<HTMLTextAreaElement>;

  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Initializes the component.
   * Validates input properties.
   */
  ngOnInit(): void {
    this.validateInputs();
  }

  /**
   * Initializes the component after view initialization.
   * Sets up auto-resize functionality if enabled.
   */
  ngAfterViewInit(): void {
    try {
      // Initialize auto-resize for existing content
      if (this.autoResize && this.textareaElement?.nativeElement) {
        this.resizeTimeout = setTimeout(() => {
          if (this.textareaElement?.nativeElement) {
            this.adjustTextareaHeight(this.textareaElement.nativeElement);
          }
        }, 0);
      }
    } catch (error) {
      console.error('AavaTextareaComponent: Error in ngAfterViewInit', error);
    }
  }

  /**
   * Cleans up resources on component destruction.
   * Clears any pending timeouts to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  /**
   * Writes a new value to the form control.
   * @param value - The value to write
   */
  writeValue(value: string): void {
    this.value = value || '';
    this.cdr.markForCheck();
  }

  // These are set by Angular forms
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /**
   * Registers a callback function that should be called when the control's value changes.
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control.
   * @param isDisabled - Whether the control should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  /**
   * Handles input event on the textarea.
   * @param event - The input event
   */
  onInput(event: Event): void {
    try {
      const target = event.target as HTMLTextAreaElement;
      if (!target) return;

      this.value = target.value;
      this.onChange(this.value);

      // Auto-resize functionality
      if (this.autoResize) {
        this.adjustTextareaHeight(target);
      }

      this.textareaInput.emit(event);
      this.input.emit(event);
    } catch (error) {
      console.error('AavaTextareaComponent: Error in onInput', error);
    }
  }

  /**
   * Handles focus event on the textarea.
   * @param event - The focus event
   */
  onFocus(event: Event): void {
    try {
      this.isFocused = true;
      this.textareaFocus.emit(event);
      this.focus.emit(event);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTextareaComponent: Error in onFocus', error);
    }
  }

  /**
   * Handles blur event on the textarea.
   * Validates required field and updates error state.
   * @param event - The blur event
   */
  onBlur(event: Event): void {
    try {
      const textarea = event.target as HTMLTextAreaElement;
      if (!textarea) return;

      if (this.required && textarea.value.trim().length === 0) {
        this.requiredError = true;
      } else {
        this.requiredError = false;
      }
      this.isFocused = false;
      this.onTouched();
      this.textareaBlur.emit(event);
      this.blur.emit(event);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTextareaComponent: Error in onBlur', error);
    }
  }

  /**
   * Handles change event on the textarea.
   * @param event - The change event
   */
  onChange_(event: Event): void {
    this.textareaChange.emit(event);
    this.change.emit(event);
  }

  /**
   * Adjusts the textarea height based on content.
   * Supports maxHeight constraint if specified.
   * @param textarea - The textarea element to adjust
   */
  private adjustTextareaHeight(textarea: HTMLTextAreaElement | null): void {
    if (!textarea) return;

    try {
      // Reset height to auto to get the correct scrollHeight
      if (this.maxHeight === 0) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      } else {
        textarea.style.height = 'auto'; // reset
        textarea.style.height =
          Math.min(textarea.scrollHeight, this.maxHeight) + 'px';
      }
    } catch (error) {
      console.error('AavaTextareaComponent: Error in adjustTextareaHeight', error);
    }
  }

  /**
   * Handles click on the start icon.
   * @param event - The click event
   */
  onIconStartClick(event: Event): void {
    try {
      if (this.disabled || this.readonly) return;
      event.stopPropagation();
      this.iconStartClick.emit(event);
    } catch (error) {
      console.error('AavaTextareaComponent: Error in onIconStartClick', error);
    }
  }

  /**
   * Handles click on the end icon.
   * @param event - The click event
   */
  onIconEndClick(event: Event): void {
    try {
      if (this.disabled || this.readonly) return;
      event.stopPropagation();
      this.iconEndClick.emit(event);
    } catch (error) {
      console.error('AavaTextareaComponent: Error in onIconEndClick', error);
    }
  }

  /**
   * Handles keyboard events on icons.
   * @param event - The keyboard event
   * @param position - The icon position ('start' or 'end')
   */
  onIconKeydown(event: KeyboardEvent, position: 'start' | 'end'): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (position === 'start') this.onIconStartClick(event);
      else this.onIconEndClick(event);
    }
  }

  /**
   * Gets the unique ID for this textarea component.
   * @returns The unique ID
   */
  get inputId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the label ID for this textarea.
   * @returns The label ID
   */
  get labelId(): string {
    return `${this.inputId}-label`;
  }

  /**
   * Gets the error message ID.
   * @returns The error ID
   */
  get errorId(): string {
    return `${this.inputId}-error`;
  }

  /**
   * Gets the helper message ID.
   * @returns The helper ID
   */
  get helperId(): string {
    return `${this.inputId}-helper`;
  }

  /**
   * Checks if the textarea has an error.
   * @returns True if error exists
   */
  get hasError(): boolean {
    return !!this.error;
  }

  /**
   * Checks if the textarea has a helper message.
   * @returns True if helper exists
   */
  get hasHelper(): boolean {
    return !!this.helper;
  }

  /**
   * Gets the computed aria-describedby value.
   * Combines error, helper, and custom aria-describedby.
   * @returns The aria-describedby string
   */
  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.ariaDescribedby) ids.push(this.ariaDescribedby);
    if (this.hasError) ids.push(this.errorId);
    if (this.hasHelper) ids.push(this.helperId);
    return ids.join(' ') || '';
  }

  /**
   * Gets the computed aria-labelledby value.
   * @returns The aria-labelledby string or null
   */
  get computedAriaLabelledby(): string | null {
    if (this.ariaLabelledby) return this.ariaLabelledby;
    if (this.label) return this.labelId;
    return null;
  }
  /**
   * Gets the CSS classes for the textarea input element.
   * @returns The class string
   */
  get inputClasses(): string {
    const classes = ['ava-textarea__input'];
    if (this.size) classes.push(`ava-textarea__input--${this.size}`);
    if (this.variant) classes.push(`ava-textarea__input--${this.variant}`);
    if (this.hasError) classes.push('ava-textarea__input--error');
    if (this.disabled) classes.push('ava-textarea__input--disabled');
    if (this.readonly) classes.push('ava-textarea__input--readonly');
    if (this.isFocused) classes.push('ava-textarea__input--focused');
    if (this.fullWidth) classes.push('ava-textarea__input--full-width');
    if (this.autoResize) classes.push('auto-expand-textarea');

    return classes.join(' ');
  }

  /**
   * Gets the CSS classes for the wrapper element.
   * @returns The class string
   */
  get wrapperClasses(): string {
    const classes = ['ava-textarea'];
    if (this.size) classes.push(`ava-textarea--${this.size}`);
    if (this.variant) classes.push(`ava-textarea--${this.variant}`);
    if (this.hasError) classes.push('ava-textarea--error');
    if (this.disabled) classes.push('ava-textarea--disabled');
    if (this.readonly) classes.push('ava-textarea--readonly');
    if (this.isFocused) classes.push('ava-textarea--focused');
    if (this.fullWidth) classes.push('ava-textarea--full-width');
    if (this.autoResize) classes.push('ava-textarea--auto-resize');
    if (this.processing) classes.push('ava-textarea--processing');
    if (this.processingGradientBorder) {
      classes.push('ava-textarea--processing-gradient-border');
    }
    return classes.join(' ');
  }

  /**
   * Gets the computed styles for the component.
   * @returns The styles object
   */
  get computedStyles(): Record<string, string> {
    const styles: Record<string, string> = { ...this.style };
    if (
      this.processingGradientColors &&
      this.processingGradientColors.length > 0
    ) {
      styles['--processing-gradient-colors'] =
        this.processingGradientColors.join(', ');
    }
    return styles;
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    // Validate rows
    if (this.rows < 1) {
      console.warn('AavaTextareaComponent: rows must be at least 1. Defaulting to 3.');
      this.rows = this.DEFAULT_ROWS;
    }

    // Validate maxHeight
    if (this.maxHeight < 0) {
      console.warn('AavaTextareaComponent: maxHeight cannot be negative. Setting to 0.');
      this.maxHeight = this.DEFAULT_MAX_HEIGHT;
    }

    // Validate maxlength and minlength relationship
    if (this.maxlength !== undefined && this.minlength !== undefined) {
      if (this.minlength > this.maxlength) {
        console.warn('AavaTextareaComponent: minlength cannot be greater than maxlength. Adjusting maxlength.');
        this.maxlength = this.minlength;
      }
    }

    // Validate size
    const validSizes: TextareaSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    if (!validSizes.includes(this.size)) {
      console.warn(`AavaTextareaComponent: Invalid size '${this.size}'. Defaulting to 'md'.`);
      this.size = 'md';
    }
  }
}
