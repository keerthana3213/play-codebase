import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

// CLEAN TYPE SEPARATION: Interaction States vs Visual Variants vs Glass Intensity

// Visual/Semantic Variants (what the button represents)
export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'emerald'
  | 'tertiary';

// Button Sizes
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Glass Intensity (surface opacity level)
export type ButtonGlassVariant =
  | 'glass-10'
  | 'glass-50'
  | 'glass-75'
  | 'glass-100';

// Effects System Types
export type ButtonHoverEffect = 'torch' | 'glow' | 'tint' | 'scale' | 'none';
export type ButtonPressedEffect = 'ripple' | 'inset' | 'solid' | 'none';
export type ButtonProcessingEffect = 'pulse' | 'none';
export type ButtonFocusEffect = 'border' | 'none';
export type ButtonDisabledEffect = 'dim' | 'none';

/**
 * AavaButtonComponent - A fully accessible, feature-rich button component with multiple variants,
 * sizes, effects, and comprehensive accessibility support.
 * 
 * @example
 * // Basic button usage
 * <aava-button 
 *   label="Click Me" 
 *   variant="primary" 
 *   (userClick)="handleClick($event)">
 * </aava-button>
 * 
 * @example
 * // Icon-only button with accessible label
 * <aava-button
 *   iconName="close"
 *   iconPosition="only"
 *   ariaLabel="Close dialog"
 *   variant="primary"
 *   (userClick)="closeDialog()">
 * </aava-button>
 * 
 * @example
 * // Dropdown button with aria-controls linking to menu
 * <aava-button
 *   label="Options"
 *   [dropdown]="true"
 *   [ariaExpanded]="menuOpen"
 *   ariaControls="options-menu"
 *   ariaHasPopup="menu"
 *   (userClick)="toggleMenu()">
 * </aava-button>
 * <div id="options-menu" role="menu" *ngIf="menuOpen">
 *   <!-- Menu items -->
 * </div>
 * 
 * @example
 * // Button with processing state
 * <aava-button
 *   label="Submit"
 *   variant="primary"
 *   [processing]="isSubmitting"
 *   [disabled]="isSubmitting"
 *   (userClick)="submitForm()">
 * </aava-button>
 * 
 * @example
 * // Icon button with label
 * <aava-button
 *   label="Save"
 *   iconName="check"
 *   iconPosition="left"
 *   variant="success"
 *   (userClick)="save()">
 * </aava-button>
 */
@Component({
  selector: 'aava-button',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-button.component.html',
  styleUrls: ['./aava-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  // === CORE BUTTON PROPS ===
  @Input() label = '';
  @Input() variant: ButtonVariant = 'default'; // Default fallback variant
  @Input() size: ButtonSize = 'md';
  // === GLASS SYSTEM PROPS ===
  @Input() glassVariant: ButtonGlassVariant = 'glass-10'; // Default recommended glass intensity

  // === EFFECTS SYSTEM PROPS ===
  @Input() hoverEffect: ButtonHoverEffect = 'torch'; // Default recommended hover effect
  @Input() pressedEffect: ButtonPressedEffect = 'ripple'; // Default recommended pressed effect
  @Input() processingEffect: ButtonProcessingEffect = 'pulse'; // Default processing effect
  @Input() focusEffect: ButtonFocusEffect = 'border'; // Default focus effect
  @Input() disabledEffect: ButtonDisabledEffect = 'dim'; // Default disabled effect

  // === STATE PROPS ===
  @Input() disabled = false;
  @Input() processing = false; // Processing state for loading/async operations

  // === STYLE OVERRIDE PROPS ===
  @Input() customStyles: Record<string, string> = {}; // CSS custom properties override
  @Input() pill = false;
  @Input() width?: string;
  @Input() height?: string;
  @Input() outlined = false; // New outlined prop
  @Input() clear = false; // New clear prop - transparent background, no border, uses variant text colors
  @Input() rounded = false;

  // === LEGACY PROPS (DEPRECATED) ===
  @Input() gradient?: string; // Legacy - use customStyles instead
  @Input() background?: string; // Legacy - use customStyles instead
  @Input() color?: string; // Legacy - use customStyles instead
  @Input() dropdown = false; // Legacy - use separate dropdown component

  @Input() iconName = '';
  @Input() iconColor = ''; // Manual override - leave empty for automatic color matching
  @Input() iconSize = 20;
  @Input() iconPosition: 'left' | 'right' | 'only' = 'left';
  @Input() cursor = false; // Enable cursor for icon interaction
  @Input() id = '';
  
  // === ACCESSIBILITY PROPS ===
  @Input() ariaLabel = ''; // Accessible label for icon-only buttons or override
  @Input() ariaDescribedBy = ''; // Link to description element
  @Input() ariaControls = ''; // ID of element controlled by this button (e.g., menu ID for dropdown buttons)
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type to prevent accidental form submission
  @Input() ariaExpanded?: boolean; // For dropdown/expandable buttons
  @Input() ariaHasPopup?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false'; // For dropdown buttons
  
  @Output() userClick = new EventEmitter<Event>();

  @ViewChild('buttonElement', { static: false }) buttonElement?: ElementRef<HTMLButtonElement>;

  isActive = false;
  timeoutRef: ReturnType<typeof setTimeout> | null = null;
  removeDefaultAnimation = false;
  private rippleTimeouts: ReturnType<typeof setTimeout>[] = [];
  private rippleElements: HTMLElement[] = [];
  private rippleAbortControllers: AbortController[] = [];
  
  // Animation constants
  private readonly ACTIVE_STATE_DURATION = 200;
  private readonly MOUSE_RIPPLE_COUNT = 2;
  private readonly KEYBOARD_RIPPLE_COUNT = 3;
  private readonly MOUSE_RIPPLE_DELAYS = [0, 150];
  private readonly KEYBOARD_RIPPLE_DELAYS = [0, 150, 300];
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Initializes the button component.
   * Sets initial active state to false.
   */
  ngOnInit(): void {
    // Glass effect is now default for all buttons
    // Active state now managed through interaction, not props
    this.isActive = false;
  }

  /**
   * Checks for playAnimate directive after view initialization.
   */
  ngAfterViewInit(): void {
    // Check if playAnimate directive is applied on this element
    if (this.elementRef.nativeElement.hasAttribute('playAnimate')) {
      // Remove the default animation class
      this.removeDefaultAnimation = true;
    } 
  }

  /**
   * Handles button click events.
   * Prevents clicks when disabled or processing, creates ripple effects, and emits userClick event.
   * @param event - The click event
   */
  handleClick(event: Event): void {
    // Prevent clicks when disabled or processing
    if (this.disabled || this.processing) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      // Create ripple effect if pressedEffect is 'ripple'
      if (this.pressedEffect === 'ripple' && event instanceof MouseEvent) {
        if (!this.removeDefaultAnimation) {
          this.createRipple(event);
        }
      }

      this.setActiveState();
      this.userClick.emit(event);
    } catch (error) {
      console.error('AavaButtonComponent: Error handling click', error);
    }
  }

  /**
   * Handles keyboard events for button activation.
   * Supports Enter and Space keys, respects disabled/processing state.
   * @param event - The keyboard event
   */
  onKeydown(event: KeyboardEvent): void {
    // Prevent keyboard activation when disabled or processing
    if (this.disabled || this.processing) {
      event.preventDefault();
      return;
    }

    try {
      // Handle Enter and Space keys for activation
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Create ripple at center for keyboard activation
        if (this.pressedEffect === 'ripple') {
          this.createKeyboardRipple();
        }
        this.setActiveState();
        this.userClick.emit(event);
      }
      // Escape key should not do anything on a button (parent can handle if needed)
    } catch (error) {
      console.error('AavaButtonComponent: Error handling keyboard event', error);
    }
  }

  /**
   * Sets the button to active state temporarily.
   * Automatically resets after a short duration.
   */
  setActiveState(): void {
    this.isActive = true;
    this.cdr.markForCheck();
    
    // Clear any existing timeout
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    
    this.timeoutRef = setTimeout(() => {
      this.isActive = false;
      this.cdr.markForCheck();
      this.timeoutRef = null;
    }, this.ACTIVE_STATE_DURATION);
  }

  /**
   * Creates a ripple effect at the mouse click position.
   * @param event - The mouse event containing click coordinates
   */
  createRipple(event: MouseEvent): void {
    try {
      const button = event.currentTarget as HTMLElement;
      
      if (!button) {
        console.warn('AavaButtonComponent: Button element not found for ripple effect');
        return;
      }

      const rect = button.getBoundingClientRect();

      // Get the button's current color for natural ripple effect
      const buttonStyle = window.getComputedStyle(button);
      const buttonColor = buttonStyle.color;

      // Calculate base size and position
      const baseSize = Math.max(rect.width, rect.height);
      const centerX = event.clientX - rect.left;
      const centerY = event.clientY - rect.top;

      // Create multiple concentric ripples with different sizes and delays
      const sizeMultipliers = [1.2, 0.9];
      const animationClasses = [
        'ava-button-ripple-1',
        'ava-button-ripple-2',
      ];

      // Create AbortController for managing event listeners
      const abortController = new AbortController();
      this.rippleAbortControllers.push(abortController);

      for (let i = 0; i < this.MOUSE_RIPPLE_COUNT; i++) {
        const timeoutId = setTimeout(() => {
          // Check if component is still alive and button exists
          if (!this.buttonElement?.nativeElement || !button.parentNode) {
            return;
          }

          const size = baseSize * sizeMultipliers[i];
          const x = centerX - size / 2;
          const y = centerY - size / 2;

          // Create ripple element
          const ripple = document.createElement('span');
          this.rippleElements.push(ripple);

          // Set position and size
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;

          // Set the button's color as a CSS custom property for the ripple
          ripple.style.setProperty('--ripple-color', buttonColor);

          // Add CSS class for specific animation timing
          ripple.classList.add(animationClasses[i]);

          // Add ripple to button
          button.appendChild(ripple);

          // Remove ripple after animation completes with abort signal support
          ripple.addEventListener('animationend', () => {
            if (ripple && ripple.parentNode) {
              ripple.remove();
            }
            // Remove from tracking array
            const index = this.rippleElements.indexOf(ripple);
            if (index > -1) {
              this.rippleElements.splice(index, 1);
            }
          }, { signal: abortController.signal });
        }, this.MOUSE_RIPPLE_DELAYS[i]);
        
        this.rippleTimeouts.push(timeoutId);
      }
    } catch (error) {
      console.error('AavaButtonComponent: Error creating ripple effect', error);
    }
  }

  /**
   * Creates a ripple effect at the center of the button for keyboard activation.
   */
  createKeyboardRipple(): void {
    try {
      // Use the ViewChild reference to get the actual button element
      if (!this.buttonElement?.nativeElement) {
        return;
      }
      
      const button = this.buttonElement.nativeElement;
      const rect = button.getBoundingClientRect();

      // Get the button's current color for natural ripple effect
      const buttonStyle = window.getComputedStyle(button);
      const buttonColor = buttonStyle.color;

      // Calculate base size and center position for keyboard activation
      const baseSize = Math.max(rect.width, rect.height);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Create multiple concentric ripples with same config as mouse ripples
      const sizeMultipliers = [1.2, 0.9, 0.6];
      const animationClasses = [
        'ava-button-ripple-1',
        'ava-button-ripple-2',
        'ava-button-ripple-3',
      ];

      // Create AbortController for managing event listeners
      const abortController = new AbortController();
      this.rippleAbortControllers.push(abortController);

      for (let i = 0; i < this.KEYBOARD_RIPPLE_COUNT; i++) {
        const timeoutId = setTimeout(() => {
          // Check if component is still alive and button exists
          if (!this.buttonElement?.nativeElement || !button.parentNode) {
            return;
          }

          const size = baseSize * sizeMultipliers[i];
          const x = centerX - size / 2;
          const y = centerY - size / 2;

          // Create ripple element
          const ripple = document.createElement('span');
          this.rippleElements.push(ripple);

          // Set position and size
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;

          // Set the button's color as a CSS custom property for the ripple
          ripple.style.setProperty('--ripple-color', buttonColor);

          // Add CSS class for specific animation timing
          ripple.classList.add(animationClasses[i]);

          // Add ripple to button
          button.appendChild(ripple);

          // Remove ripple after animation completes with abort signal support
          ripple.addEventListener('animationend', () => {
            if (ripple && ripple.parentNode) {
              ripple.remove();
            }
            // Remove from tracking array
            const index = this.rippleElements.indexOf(ripple);
            if (index > -1) {
              this.rippleElements.splice(index, 1);
            }
          }, { signal: abortController.signal });
        }, this.KEYBOARD_RIPPLE_DELAYS[i]);
        
        this.rippleTimeouts.push(timeoutId);
      }
    } catch (error) {
      console.error('AavaButtonComponent: Error creating keyboard ripple effect', error);
    }
  }

  // === COMPUTED PROPERTIES FOR TEMPLATE ===

  get hasIcon(): boolean {
    return !!this.iconName;
  }

  /**
   * Computed accessible label for the button
   * Ensures icon-only buttons always have an accessible name for WCAG compliance.
   * Returns ariaLabel if provided, label if provided, or icon name as fallback for icon-only buttons.
   */
  get computedAriaLabel(): string | null {
    // If ariaLabel is explicitly provided, use it
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    
    // If label is provided, use text content naturally (aria-haspopup already indicates menu functionality)
    if (this.label) {
      return null; // Let button use text content naturally
    }
    
    // Icon-only buttons must have an accessible name (WCAG requirement)
    if (this.iconPosition === 'only') {
      // Use icon name as fallback if no label provided
      // This provides basic accessibility, though ariaLabel is preferred for better UX
      if (this.iconName) {
        // Convert icon name to a readable label (e.g., "close" -> "Close", "chevron-down" -> "Chevron down")
        const readableLabel = this.iconName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return readableLabel;
      }
      // Last resort: provide generic label (should be avoided - developers should provide ariaLabel)
      return 'Button';
    }
    
    // For buttons with both icon and label, text content is sufficient
    return null;
  }

  /**
   * Computed aria-haspopup value
   * Returns the ariaHasPopup input, or 'menu' if dropdown is true
   */
  get computedAriaHasPopup(): string | null {
    if (this.ariaHasPopup) {
      return this.ariaHasPopup;
    }
    if (this.dropdown) {
      return 'menu';
    }
    return null;
  }

  /**
   * Computed tabindex for accessibility
   * Disabled or processing buttons should be removed from tab order
   * Native disabled attribute already prevents focus, but explicit tabindex ensures consistency
   * Returns -1 when disabled/processing, null otherwise to use native button behavior
   */
  get computedTabIndex(): number | null {
    if (this.disabled || this.processing) {
      return -1;
    }
    return null; // Use native button tabindex (0 for focusable buttons)
  }

  /**
   * Public method to programmatically focus the button.
   * Useful for accessibility and focus management in parent components.
   * Respects disabled/processing state.
   * 
   * @example
   * // Focus button after opening a dialog
   * @ViewChild('dialogButton') dialogButton!: AavaButtonComponent;
   * 
   * openDialog() {
   *   this.showDialog = true;
   *   setTimeout(() => this.dialogButton.focus(), 100);
   * }
   * 
   * @example
   * // Focus next button in form wizard
   * @ViewChild('nextButton') nextButton!: AavaButtonComponent;
   * 
   * onStepComplete() {
   *   if (this.nextButton && !this.nextButton.disabled) {
   *     this.nextButton.focus();
   *   }
   * }
   */
  focus(): void {
    if (!this.disabled && !this.processing && this.buttonElement?.nativeElement) {
      this.buttonElement.nativeElement.focus();
    }
  }

  /**
   * Public method to programmatically blur the button.
   * Useful for focus management in parent components.
   * 
   * @example
   * // Blur button when closing dropdown menu
   * @ViewChild('menuButton') menuButton!: AavaButtonComponent;
   * 
   * closeMenu() {
   *   this.showMenu = false;
   *   this.menuButton.blur();
   * }
   * 
   * @example
   * // Remove focus from button after action completes
   * @ViewChild('submitButton') submitButton!: AavaButtonComponent;
   * 
   * onSubmit() {
   *   this.submitButton.blur();
   *   // Process form...
   * }
   */
  blur(): void {
    if (this.buttonElement?.nativeElement) {
      this.buttonElement.nativeElement.blur();
    }
  }

  /**
   * Computes the icon color automatically based on button state and variant.
   *
   * Color Logic:
   * - Disabled: Uses disabled color token
   * - Manual override: Uses iconColor prop if provided
   * - Outlined & Clear buttons: Icon color matches variant color (primary = pink, success = green, etc.)
   * - Filled buttons: Icon color is white (matches text on colored backgrounds)
   *
   * This ensures icons always have proper contrast and semantic meaning.
   */
  get computedIconColor(): string {
    // Disabled state
    if (this.disabled) {
      return 'var(--button-icon-color-disabled)';

    } else if (this.variant === 'secondary') {
      return 'rgb(var(--rgb-brand-primary))';
    }

    // Manual color override
    if (this.iconColor && this.isValidColor(this.iconColor)) {
      return this.iconColor;
    }

    // Automatic color based on button state and variant
    // Tertiary variant is treated as primary with clear style
    const effectiveClear = this.variant === 'tertiary' ? true : this.clear;
    if (this.outlined || effectiveClear) {
      // Outlined and clear buttons: icon color matches variant color (same as text)
      const effectiveVariant = this.variant === 'tertiary' ? 'primary' : this.variant;
      switch (effectiveVariant) {
        case 'primary':
        case 'default':
          return 'rgb(var(--rgb-brand-primary))';
        case 'success':
          return 'rgb(var(--rgb-brand-success))';
        case 'warning':
          return 'rgb(var(--rgb-brand-warning))';
        case 'danger':
          return 'rgb(var(--rgb-brand-danger))';
        case 'info':
          return 'rgb(var(--rgb-brand-info))';
        default:
          return 'rgb(var(--rgb-brand-primary))';
      }
    } else {
      // Filled buttons: icon color should match text color for consistency
      return 'var(--button-text-on-color-primary)'; // Instead of 'var(--color-text-on-brand)'
    }
  }

  get buttonClasses(): string {
    // Compute effective variant and clear state without mutating actual properties
    // Tertiary variant is treated as primary with clear style for rendering
    const effectiveVariant = this.variant === 'tertiary' ? 'primary' : this.variant;
    const effectiveClear = this.variant === 'tertiary' ? true : this.clear;

    const classes = [
      'ava-button',
      // Only add variant class if it's not 'default'
      ...(effectiveVariant !== 'default' ? [effectiveVariant] : []), // primary, secondary, success, etc. (not default)
      this.size, // small, medium, large
      `ava-button--${this.glassVariant}`, // ava-button--glass-25, etc.
      `ava-button--hover-${this.hoverEffect}`, // ava-button--hover-torch, etc.
      `ava-button--pressed-${this.pressedEffect}`, // ava-button--pressed-ripple, etc.
      `ava-button--focus-${this.focusEffect}`, // ava-button--focus-border, etc.
      `ava-button--disabled-${this.disabledEffect}`, // ava-button--disabled-dim, etc.

    ];

    // Add conditional classes
    if (this.processing) {
      classes.push(`ava-button--processing-${this.processingEffect}`); // ava-button--processing-pulse
    }

    if (this.disabled) {
      classes.push('ava-button--disabled');
    }

    if (this.pill) {
      classes.push('ava-button--pill');
    }

    if (this.outlined) {
      classes.push('ava-button--outlined');
    }

    if (effectiveClear) {
      classes.push('ava-button--clear');
    }

    if (this.isActive) {
      classes.push('ava-button--active');
    }

    if (this.iconPosition === 'only') {
      classes.push('ava-button--icon-only');
    }

    if (this.rounded) {
      classes.push('ava-button--icon-only');
    }

    return classes.filter((cls) => cls).join(' ');
  }
  get wrapperComputedStyle(): Record<string, string> {
    const styles: Record<string, string> = {
      ...(this.width && { width: this.width }),
      ...(this.height && { height: this.height }),
    };

    return styles;
  }
  get computedStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      // Set button effect color for this variant (use correct semantic token name)
      '--button-effect-color': `var(--button-variant-${this.variant}-effect-color)`,

      // Apply custom width/height if provided
      ...(this.width && { width: this.width }),
      ...(this.height && { height: this.height }),

      // Legacy gradient support
      ...(this.gradient && { background: this.gradient }),
      ...(this.background && { background: this.background }),
      ...(this.color && { color: this.color }),

      // Apply custom styles (this allows CSS custom property overrides)
      ...this.customStyles,
    };

    return styles;
  }

  /**
   * Validates if a string is a valid CSS color value.
   * @param value - The color string to validate
   * @returns True if the value is a valid color, false otherwise
   */
  isValidColor(value: string): boolean {
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
  }

  /**
   * Gets the icon size based on button size.
   * @returns The icon size in pixels
   */
  getIconSize(): number {
    if (this.size === 'xl') {
      return 24;
    } else if (this.size === 'lg') {
      return 24;
    } else if (this.size === 'md') {
      return 20;
    } else if (this.size === 'sm') {
      return 16;
    } else if (this.size === 'xs') {
      return 12;
    }
    return this.iconSize;
  }

  ngOnDestroy(): void {
    // Clear active state timeout
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }

    // Clear all ripple timeouts
    this.rippleTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.rippleTimeouts = [];

    // Abort all event listeners
    this.rippleAbortControllers.forEach(controller => controller.abort());
    this.rippleAbortControllers = [];

    // Remove all ripple elements
    this.rippleElements.forEach(ripple => {
      if (ripple && ripple.parentNode) {
        ripple.remove();
      }
    });
    this.rippleElements = [];
  }
}
