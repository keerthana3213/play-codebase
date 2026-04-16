import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

export type TextboxVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
export type TextboxSize = 'sm' | 'md' | 'lg' | 'xl' | 'xs';
export type IconPosition = 'start' | 'end';

// Text Input Specification Types (Spec-Compliant Only)
export type GlassVariant = 'glass-10' | 'glass-50'; // Surface 10 (recommended), Surface 50 (allowed)
export type HoverEffect = 'tint' | 'glow'; // Tint (recommended), Glow (allowed)
export type PressedEffect = 'solid'; // Solid (recommended and only allowed)
export type ProcessingEffect = 'shimmer'; // Text shimmer (alternative to default border pulse)
export type DecorativeEffect = 'glowBox' | 'borderFlow' | 'attention' | 'wave'; // Keep for future components
export type DisabledState = 'grey'; // Grey (recommended and only allowed)

// Legacy Types (for backward compatibility)
export type PersonalityTheme =
  | 'minimal'
  | 'professional'
  | 'modern'
  | 'vibrant';
export type MetaphorIntensity = 0 | 10 | 25 | 50 | 75 | 100;
export type InputKind = 'text' | 'phone' | 'currency';

@Component({
  selector: 'aava-textbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AavaIconComponent,
    NgxMaskDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './aava-textbox.component.html',
  styleUrl: './aava-textbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaTextboxComponent),
      multi: true,
    },
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fadeIcon', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '180ms cubic-bezier(0.4,0,0.2,1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '180ms cubic-bezier(0.4,0,0.2,1)',
          style({ opacity: 0, transform: 'scale(0.8)' })
        ),
      ]),
    ]),
  ],
})
export class AavaTextboxComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy 
  {
  // Host bindings - Apply CSS classes to component element
  @HostBinding('class') get hostClasses(): string {
    return this.wrapperClasses;
  }

  // Constants for extractRawValue regex patterns
  private readonly MASK_FORMAT_CHARS_PATTERN = /[()\s\-_./]/g;
  private readonly MASK_FORMAT_CHARS_PATTERN_CUSTOM = /[()\s\-_/]/g;

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.closeDropdowns();
    }
  }

  @Input() label = '';
  @Input() mapper = '';
  @Input() placeholder = '';
  @Input() variant: TextboxVariant = 'default';
  @Input() size: TextboxSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = '';
  @Input() helper = '';
  @Input() icon = '';
  @Input() iconPosition: IconPosition = 'start';
  @Input() iconColor = 'var(--textbox-icon-color)';
  @Input() iconSeparator = false; // Add separator between icon and text area
  @Input() iconSpacing: 'compact' | 'normal' | 'relaxed' = 'normal'; // Icon spacing variant
  @Input() id = '';
  @Input() name = '';
  @Input() autocomplete = '';
  @Input() type = 'text';
  @Input() maxlength: number | null  = null;
  @Input() minlength: number | null  = null;
  @Input() required = false;
  @Input() fullWidth = false;
  @Input() style?: Record<string, string>;
  @Input() inputKind = 'text';
  @Input() inputKindLabel = '';

  // NGX-MASK inputs (kept optional; active only when mask provided)
  @Input() mask: string | null = null;
  @Input() maskPrefix?: string;
  @Input() maskSuffix?: string;
  @Input() maskDropSpecialCharacters?: boolean | string[];
  @Input() maskShowMaskTyped?: boolean;
  @Input() maskThousandSeparator?: string;
  @Input() maskDecimalMarker?: '.' | ',' | ['.', ','];
  @Input() maskPatterns?: Record<
    string,
    { pattern: RegExp; optional?: boolean; symbol?: string }
  >;
  @Input() maskValidation?: boolean;
  @Input() maskAllowNegativeNumbers?: boolean;
  @Input() maskLeadZeroDateTime?: boolean;

  // Phone variant specific inputs
  @Input() phone = false; // Enable phone functionality
  @Input() labelPosition: 'start' | 'end' = 'start'; // Position of country prefix

  // Dropdown functionality for prefix and suffix
  @Input() prefixDropdown = false; // Enable dropdown for prefix
  @Input() suffixDropdown = false; // Enable dropdown for suffix
  @Input() prefixDropdownOptions: { label: string; value: string }[] = []; // Dropdown options for prefix
  @Input() suffixDropdownOptions: { label: string; value: string }[] = []; // Dropdown options for suffix
  @Input() selectedPrefixOption: { label: string; value: string } | null = null; // Selected prefix option
  @Input() selectedSuffixOption: { label: string; value: string } | null = null; // Selected suffix option

  // Accessibility inputs
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Value input with setter to ensure proper updates
  private _value = ''; // Stores raw value (for form controls)
  showPassword = false;
  requiredError = false;
  private contentCheckTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly _uniqueId = `ava-textbox-${Math.random().toString(36).slice(2, 11)}`;
  @Input()
  set value(val: string) {
    if (this._value !== val) {
      this._value = val || '';
      if (this._value.trim().length > 0) {
        this.requiredError = false;
      }
      this.cdr.markForCheck();
    }
  }
  get value(): string {
    return this._value; // Always return raw value for form controls
  }

  // New Effects System Props - Text Input Specifications
  @Input() glassVariant: GlassVariant = 'glass-50'; // Default: Surface 10
  @Input() hoverEffect?: HoverEffect; // Default: 'tint' + 'glow' combination
  @Input() pressedEffect?: PressedEffect; // Default: 'solid'
  @Input() processing = false; // Processing state - triggers border pulse by default
  @Input() processingEffect?: ProcessingEffect; // Alternative: 'shimmer' for text animation
  @Input() decorativeEffect?: DecorativeEffect; // For ambient effects
  @Input() disabledState: DisabledState = 'grey'; // Default: Grey only
  @Input() customStyles?: Record<string, string>; // CSS custom properties override
  /**
   * If true, shows an animated gradient border for processing state
   */
  @Input() processingGradientBorder = false;
  /**
   * Colors for the animated processing gradient border (as array of CSS color strings)
   */
  @Input() processingGradientColors: string[] = [
    '#e91e63',
    '#fee140',
    '#ff9800',
    '#047857',
    '#ff9800',
    '#fee140',
    '#e91e63',
  ];

  // Legacy Props (for backward compatibility)
  @Input() personality?: PersonalityTheme; // DEPRECATED: Use new effect props instead
  @Input() glassIntensity?: MetaphorIntensity; // DEPRECATED: Use glassVariant instead
  @Input() lightIntensity?: MetaphorIntensity; // DEPRECATED: Use hoverEffect instead
  @Input() liquidIntensity?: MetaphorIntensity; // DEPRECATED: Use pressedEffect instead
  @Input() gradientIntensity?: MetaphorIntensity; // DEPRECATED
  @Input() enableMetaphors = true; // DEPRECATED: Effects are always enabled
  @Input() respectsGlobalPersonality = true; // DEPRECATED
  @Input() metaphor: string | string[] = ''; // DEPRECATED: Use new effect props

  // Legacy outputs (deprecated - use new outputs below)
  /** @deprecated Use `blur` instead */
  @Output() textboxBlur = new EventEmitter<Event>();
  /** @deprecated Use `focus` instead */
  @Output() textboxFocus = new EventEmitter<Event>();
  /** @deprecated Use `input` instead */
  @Output() textboxInput = new EventEmitter<Event>();
  /** @deprecated Use `prefixSelect` instead */
  @Output() prefixDropdownSelect = new EventEmitter<{
    label: string;
    value: string;
  }>();
  /** @deprecated Use `suffixSelect` instead */
  @Output() suffixDropdownSelect = new EventEmitter<{
    label: string;
    value: string;
  }>();
  /** @deprecated Use `change` instead */
  @Output() textboxChange = new EventEmitter<Event>();

  // Updated outputs
  @Output() iconStartClick = new EventEmitter<Event>();
  @Output() iconEndClick = new EventEmitter<Event>();
  @Output() clickOutSide = new EventEmitter<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<Event>();

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() focus = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() input = new EventEmitter<Event>();
  @Output() prefixSelect = new EventEmitter<{
    label: string;
    value: string;
  }>();
  @Output() suffixSelect = new EventEmitter<{
    label: string;
    value: string;
  }>();

  @ViewChild('prefixContainer', { static: true }) prefixContainer?: ElementRef<HTMLElement>;
  @ViewChild('suffixContainer', { static: true }) suffixContainer?: ElementRef<HTMLElement>;
  @ViewChild('iconStartContainer', { static: true }) iconStartContainer?: ElementRef<HTMLElement>;
  @ViewChild('iconEndContainer', { static: true }) iconEndContainer?: ElementRef<HTMLElement>;
  @ViewChild('maskedInput', { static: false }) maskedInput?: ElementRef<HTMLInputElement>;
  @ViewChild('plainInput', { static: false }) plainInput?: ElementRef<HTMLInputElement>;

  isFocused = false;
  hasProjectedPrefix = false;
  hasProjectedSuffix = false;
  hasProjectedStartIcon = false;
  hasProjectedEndIcon = false;

  // Dropdown state
  isPrefixDropdownOpen = false;
  isSuffixDropdownOpen = false;


  private onChange: (value: string) => void = () => {
    /* noop */
  };
  private onTouched: () => void = () => {
    /* noop */
  };

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  /**
   * Initializes the component after view initialization.
   * Sets password type if inputKind is password and checks for projected content.
   */
  ngAfterViewInit(): void {
    if (this.inputKind === 'password') {
      this.type = 'password';
    }
    // Validate inputs
    this.validateInputs();
    // Check for projected content in containers
    this.checkProjectedContent();
  }

  /**
   * Checks for projected content in containers.
   * Uses setTimeout to ensure content projection has completed.
   */
  private checkProjectedContent(): void {
    try {
      // Clear existing timeout before setting new one
      if (this.contentCheckTimeout) {
        clearTimeout(this.contentCheckTimeout);
      }

      // Use setTimeout to ensure content projection has completed
      this.contentCheckTimeout = setTimeout(() => {
        if (!this.prefixContainer?.nativeElement || !this.suffixContainer?.nativeElement) {
          return;
        }

        const prefixEl = this.prefixContainer.nativeElement;
        const suffixEl = this.suffixContainer.nativeElement;
        const startIconEl = this.iconStartContainer?.nativeElement;
        const endIconEl = this.iconEndContainer?.nativeElement;

        this.hasProjectedPrefix = (prefixEl?.children?.length ?? 0) > 0;
        this.hasProjectedSuffix = (suffixEl?.children?.length ?? 0) > 0;
        this.hasProjectedStartIcon = (startIconEl?.children?.length ?? 0) > 0;
        this.hasProjectedEndIcon = (endIconEl?.children?.length ?? 0) > 0;
        this.cdr.markForCheck();
      });
    } catch (error) {
      console.error('AavaTextboxComponent: Error checking projected content', error);
    }
  }

  /**
   * ControlValueAccessor implementation: Writes a value from the form control to the component.
   * @param value - The value to write (raw value from form control)
   */
  writeValue(value: string): void {
    // Store raw value (from form control)
    // ngx-mask will automatically format it for display when mask is present
    this._value = value || '';

    // Clear required error if value is now present
    if (this._value.trim().length > 0) {
      this.requiredError = false;
    }

    this.cdr.markForCheck();
  }

  /**
   * ControlValueAccessor implementation: Registers a callback function for value changes.
   * @param fn - The callback function to register
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * ControlValueAccessor implementation: Registers a callback function for touch events.
   * @param fn - The callback function to register
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor implementation: Sets the disabled state of the component.
   * @param isDisabled - Whether the component should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  /**
   * Extracts raw value from masked input string by removing mask characters.
   * @param maskedValue - The masked/formatted value from the input
   * @returns The raw value without mask formatting
   */
  private extractRawValue(maskedValue: string): string {
    try {
      if (!this.mask || !maskedValue) {
        return maskedValue || '';
      }

      let rawValue = maskedValue;

      // Remove prefix and suffix if they exist
      if (this.maskPrefix) {
        rawValue = rawValue.replace(new RegExp(`^${this.maskPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), '');
      }
      if (this.maskSuffix) {
        rawValue = rawValue.replace(new RegExp(`${this.maskSuffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'g'), '');
      }

      // For separator masks like currency (e.g., "separator.2")
      if (this.mask === 'separator.2' || this.mask.includes('separator')) {
        // Keep decimal point and digits, remove thousand separators
        if (this.maskThousandSeparator) {
          rawValue = rawValue.replace(new RegExp(`\\${this.maskThousandSeparator}`, 'g'), '');
        }
        // Normalize decimal marker if needed
        if (this.maskDecimalMarker) {
          const decimalMarkers = Array.isArray(this.maskDecimalMarker)
            ? this.maskDecimalMarker
            : [this.maskDecimalMarker];
          decimalMarkers.forEach((marker, index) => {
            if (index > 0) {
              rawValue = rawValue.replace(new RegExp(`\\${marker}`, 'g'), decimalMarkers[0]);
            }
          });
        }
        return rawValue;
      }

      // For pattern-based masks, extract only the characters that match the pattern
      // Remove common mask formatting characters
      // This keeps digits, letters (for custom patterns), and decimal points for numbers
      if (this.maskPatterns) {
        // For custom patterns, we keep the characters that match pattern symbols
        // But remove mask formatting characters
        rawValue = rawValue.replace(this.MASK_FORMAT_CHARS_PATTERN_CUSTOM, '');
      } else {
        // For standard masks, remove common formatting characters
        // Keep digits and letters
        rawValue = rawValue.replace(this.MASK_FORMAT_CHARS_PATTERN, '');

        // If it's a number mask, preserve decimal point
        if (this.maskDecimalMarker) {
          const decimalMarkers = Array.isArray(this.maskDecimalMarker)
            ? this.maskDecimalMarker
            : [this.maskDecimalMarker];
          // Check if the value has a decimal part
          const hasDecimal = decimalMarkers.some(marker => maskedValue.includes(marker));
          if (hasDecimal) {
            // Find the decimal marker position and preserve it
            for (const marker of decimalMarkers) {
              if (maskedValue.includes(marker)) {
                const parts = maskedValue.split(marker);
                if (parts.length === 2) {
                  // Keep the decimal marker
                  const beforeDecimal = parts[0].replace(/[^\d]/g, '');
                  const afterDecimal = parts[1].replace(/[^\d]/g, '');
                  return beforeDecimal + marker + afterDecimal;
                }
              }
            }
          }
        }
      }

      // Remove thousand separators
      if (this.maskThousandSeparator) {
        rawValue = rawValue.replace(new RegExp(`\\${this.maskThousandSeparator}`, 'g'), '');
      }

      return rawValue;
    } catch (error) {
      console.error('AavaTextboxComponent: Error extracting raw value', error);
      // Return the masked value as fallback if extraction fails
      return maskedValue || '';
    }
  }

  /**
   * Handles input events.
   * Extracts raw value when masking is applied and emits to form control.
   * @param event - The input event
   */
  onInput(event: Event): void {
    try {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const inputValue = target.value || '';

      // When mask is applied, extract raw value (without mask characters)
      // The input shows masked value (handled by ngx-mask), but form control gets raw value
      if (this.mask) {
        this._value = this.extractRawValue(inputValue);
      } else {
        this._value = inputValue;
      }

      // Always emit raw value to form controls
      if (this._value.trim().length > 0) {
        this.requiredError = false;
        this.cdr.markForCheck();
      }

      this.onChange(this._value);
      this.textboxInput.emit(event);
      this.input.emit(event);
    } catch (error) {
      console.error('AavaTextboxComponent: Error handling input', error);
    }
  }

  /**
   * Handles model changes from ngModel binding (used with masked inputs).
   * ngx-mask formats the value, so we need to extract raw value from the input element.
   */
  onInputModelChange(): void {


    this.cdr.markForCheck();

  }

  /**
   * Handles focus events
   */
  onFocus(event: Event): void {
    this.isFocused = true;
    this.textboxFocus.emit(event);
    this.focus.emit(event);
  }

  /**
   * Handles blur events
   */
  onBlur(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    if (this.required && input.value.trim().length === 0) {
      this.requiredError = true;
    } else {
      this.requiredError = false;
    }
    this.isFocused = false;
    this.onTouched();
    this.cdr.markForCheck();
    this.textboxBlur.emit(event);
    this.blur.emit(event);
  }

  /**
   * Handles change events.
   * @param event - The change event
   */
  onChange_(event: Event): void {
    this.textboxChange.emit(event);
    this.change.emit(event);
  }

  /**
   * Handles icon start click events
   */
  onIconStartClick(event: Event): void {
    if (this.disabled || this.readonly) return;
    event.preventDefault();
    event.stopPropagation();
    this.iconStartClick.emit(event);
  }

  /**
   * Handles icon end click events
   */
  onIconEndClick(event: Event): void {
    if (this.disabled || this.readonly) return;
    event.preventDefault();
    event.stopPropagation();
    this.iconEndClick.emit(event);
  }

  /**
   * Handles keyboard events for icon accessibility
   */
  onIconKeydown(event: KeyboardEvent, position: 'start' | 'end'): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (position === 'start') this.onIconStartClick(event);
      else this.onIconEndClick(event);
    }
  }

  // Computed properties
  get hasError(): boolean {
    return !!this.error;
  }

  get hasHelper(): boolean {
    return !!this.helper && !this.hasError;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get isPhone(): boolean {
    return this.inputKind === 'phone';
  }

  get isCurrency(): boolean {
    return this.inputKind === 'currency';
  }

  get isEmail(): boolean {
    return this.inputKind === 'email';
  }

  get isPassword(): boolean {
    return this.inputKind === 'password';
  }

  get hasKindLabel(): boolean {
    return ['phone', 'currency', 'email', 'password'].includes(this.inputKind);
  }

  /**
   * Gets the unique ID for this input element
   */
  get inputId(): string {
    return this.id || this._uniqueId;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get helperId(): string {
    return `${this.inputId}-helper`;
  }

  /**
   * Gets the aria-describedby attribute value
   */
  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.ariaDescribedby) ids.push(this.ariaDescribedby);
    if (this.hasError) ids.push(this.errorId);
    if (this.hasHelper) ids.push(this.helperId);
    return ids.join(' ') || '';
  }

  /**
   * Get effective hover effect (with defaults) - Text Input Spec: Tint (recommended)
   */
  get effectiveHoverEffect(): HoverEffect {
    return this.hoverEffect || 'tint'; // Default to tint (recommended)
  }

  /**
   * Get effective pressed effect (with defaults) - Text Input Spec: Solid (only allowed)
   */
  get effectivePressedEffect(): PressedEffect {
    return this.pressedEffect || 'solid'; // Default to solid (only allowed)
  }

  /**
   * Get effective processing effect - Text Input Spec: Border pulse (default) or Shimmer (alternative)
   */
  get effectiveProcessingEffect():
    | ProcessingEffect
    | 'border-pulse'
    | undefined {
    if (!this.processing) return undefined;
    return this.processingEffect || 'border-pulse'; // Default to border pulse when processing=true
  }

  /**
   * Generate effect classes based on Text Input Specifications
   */
  get effectClasses(): string[] {
    const classes: string[] = [];

    // Glass variant - Text Input Spec: glass-10 (recommended), glass-50 (allowed)
    classes.push(`ava-textbox--${this.glassVariant}`);

    // Hover effect - Text Input Spec: tint (recommended), glow (allowed)
    classes.push(`ava-textbox--hover-${this.effectiveHoverEffect}`);

    // Pressed effect - Text Input Spec: solid (only allowed)
    classes.push(`ava-textbox--pressed-${this.effectivePressedEffect}`);

    // Processing effect - Text Input Spec: border-pulse (default), shimmer (alternative)
    const processingEffect = this.effectiveProcessingEffect;
    if (processingEffect) {
      classes.push(`ava-textbox--processing-${processingEffect}`);
    }

    // Processing gradient border effect
    if (this.processingGradientBorder) {
      classes.push('ava-textbox--processing-gradient-border');
    }

    // Disabled state - Text Input Spec: grey (only allowed)
    if (this.disabled) {
      classes.push(`ava-textbox--disabled-${this.disabledState}`);
    }

    return classes;
  }

  /**
   * Generate legacy metaphor classes for backward compatibility
   */
  get legacyMetaphorClasses(): string[] {
    const classes: string[] = [];

    // Legacy personality support
    if (this.personality) {
      classes.push(`ava-textbox--personality-${this.personality}`);
    }

    // Legacy intensity support
    if (this.glassIntensity !== undefined) {
      classes.push(`ava-textbox--glass-${this.glassIntensity}`);
    }
    if (this.lightIntensity !== undefined) {
      classes.push(`ava-textbox--light-${this.lightIntensity}`);
    }
    if (this.liquidIntensity !== undefined) {
      classes.push(`ava-textbox--liquid-${this.liquidIntensity}`);
    }
    if (this.gradientIntensity !== undefined) {
      classes.push(`ava-textbox--gradient-${this.gradientIntensity}`);
    }

    // Legacy metaphor string support
    if (this.metaphor) {
      if (Array.isArray(this.metaphor)) {
        classes.push(...this.metaphor.map((m) => `ava-textbox--${m}`));
      } else {
        classes.push(`ava-textbox--${this.metaphor}`);
      }
    }

    return classes;
  }

  /**
   * Get computed CSS custom properties for style overrides
   */
  get computedStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    // Apply any custom style overrides
    if (this.customStyles) {
      Object.assign(styles, this.customStyles);
    }

    // Apply legacy style prop
    if (this.style) {
      Object.assign(styles, this.style);
    }

    // Add processing gradient colors as a CSS variable if set
    if (
      this.processingGradientColors &&
      this.processingGradientColors.length > 0
    ) {
      styles['--processing-gradient-colors'] =
        this.processingGradientColors.join(', ');
    }

    return styles;
  }

  get inputClasses(): string {
    const classes = ['ava-textbox__input'];

    if (this.size) classes.push(`ava-textbox__input--${this.size}`);
    if (this.variant) classes.push(`ava-textbox__input--${this.variant}`);
    if (this.hasError) classes.push('ava-textbox__input--error');
    if (this.disabled) classes.push('ava-textbox__input--disabled');
    if (this.isFocused) classes.push('ava-textbox__input--focused');
    if (this.fullWidth) classes.push('ava-textbox__input--full-width');

    // Add classes based on projected content
    if (this.hasProjectedStartIcon)
      classes.push('ava-textbox__input--icon-start');
    if (this.hasProjectedEndIcon) classes.push('ava-textbox__input--icon-end');
    if (this.hasProjectedPrefix)
      classes.push('ava-textbox__input--with-prefix');
    if (this.hasProjectedSuffix)
      classes.push('ava-textbox__input--with-suffix');
    if (this.inputKind && this.value && this.value.length > 0)
      classes.push(`ava-textbox__input--${this.inputKind}`);
    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = ['ava-textbox'];

    if (this.size) classes.push(`ava-textbox--${this.size}`);
    if (this.variant) classes.push(`ava-textbox--${this.variant}`);
    if (this.hasError) classes.push('ava-textbox--error');
    if (this.disabled) classes.push('ava-textbox--disabled');
    if (this.readonly) classes.push('ava-textbox--readonly');
    if (this.isFocused) classes.push('ava-textbox--focused');
    if (this.fullWidth) classes.push('ava-textbox--full-width');

    // Add icon spacing and separator classes
    if (this.iconSeparator) classes.push('ava-textbox--icon-separator');
    if (this.iconSpacing !== 'normal')
      classes.push(`ava-textbox--icon-spacing-${this.iconSpacing}`);
    if (this.hasKindLabel) {
      classes.push(`ava-textbox--label-${this.labelPosition}`);
    }

    // Add new effect classes
    const effectClasses = this.effectClasses;
    const legacyClasses = this.legacyMetaphorClasses;

    return [...classes, ...effectClasses, ...legacyClasses].join(' ');
  }

  get labelIconSize(): number {
    return (
      ({ xl: 24, lg: 24, md: 20, xs: 16 } as Record<string, number>)[
      this.size
      ] ?? 16
    );
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  /**
   * Toggles the prefix dropdown
   */
  togglePrefixDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled || this.readonly) return;
    this.isPrefixDropdownOpen = !this.isPrefixDropdownOpen;
    if (this.isPrefixDropdownOpen) {
      this.isSuffixDropdownOpen = false; // Close suffix dropdown if open
    }
    this.cdr.markForCheck();
  }

  /**
   * Toggles the suffix dropdown
   */
  toggleSuffixDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled || this.readonly) return;
    this.isSuffixDropdownOpen = !this.isSuffixDropdownOpen;
    if (this.isSuffixDropdownOpen) {
      this.isPrefixDropdownOpen = false; // Close prefix dropdown if open
    }
    this.cdr.markForCheck();
  }

  /**
   * Selects a prefix option.
   * @param option - The prefix option to select
   * @param event - Optional event that triggered the selection
   */
  selectPrefixOption(
    option: { label: string; value: string },
    event?: Event
  ): void {
    try {
      if (event) {
        event.stopPropagation();
      }
      this.selectedPrefixOption = option;
      this.isPrefixDropdownOpen = false;
      this.prefixDropdownSelect.emit(option);
      this.prefixSelect.emit(option);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTextboxComponent: Error selecting prefix option', error);
    }
  }

  /**
   * Selects a suffix option.
   * @param option - The suffix option to select
   * @param event - Optional event that triggered the selection
   */
  selectSuffixOption(
    option: { label: string; value: string },
    event?: Event
  ): void {
    try {
      if (event) {
        event.stopPropagation();
      }
      this.selectedSuffixOption = option;
      this.isSuffixDropdownOpen = false;
      this.suffixDropdownSelect.emit(option);
      this.suffixSelect.emit(option);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTextboxComponent: Error selecting suffix option', error);
    }
  }

  /**
   * Closes all dropdowns
   */
  closeDropdowns(): void {
    this.isPrefixDropdownOpen = false;
    this.isSuffixDropdownOpen = false;
    this.cdr.markForCheck();
  }

  /**
   * Handles click outside events.
   */
  onClickOutside(): void {
    this.clickOutSide.emit(true);
  }

  /**
   * Validates input constraints.
   * Checks maxlength and minlength consistency.
   */
  private validateInputs(): void {
    if (this.maxlength !== null && this.minlength !== null && this.maxlength < this.minlength) {
      console.warn('AavaTextboxComponent: maxlength should be greater than or equal to minlength');
    }

    if (this.maxlength !== null && this.maxlength < 0) {
      console.warn('AavaTextboxComponent: maxlength should be a positive number');
    }

    if (this.minlength !== null && this.minlength < 0) {
      console.warn('AavaTextboxComponent: minlength should be a positive number');
    }
  }

  /**
   * Cleanup on component destruction
   */
  ngOnDestroy(): void {
    if (this.contentCheckTimeout) {
      clearTimeout(this.contentCheckTimeout);
      this.contentCheckTimeout = null;
    }
  }
}
