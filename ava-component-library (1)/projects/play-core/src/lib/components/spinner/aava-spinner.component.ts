import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  HostBinding,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Spinner size options.
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Spinner type options.
 */
export type SpinnerType = 'linear-gradient' | 'blob';

/**
 * Size map constants for spinner sizes.
 */
const SIZE_XS = 16;
const SIZE_SM = 20;
const SIZE_MD = 24;
const SIZE_LG = 48;
const SIZE_XL = 64;

/**
 * AavaSpinnerComponent: A versatile and accessible loading spinner component.
 * Supports multiple sizes, types, colors, and animations with full accessibility features.
 */
@Component({
  selector: 'aava-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-spinner.component.html',
  styleUrls: ['./../../styles/tokens/components/_spinner.css', './aava-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class AavaSpinnerComponent implements OnInit, OnChanges {
  /** Spinner color variant or custom color */
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | string = 'primary';

  /** Spinner size */
  @Input() size: SpinnerSize = 'md';

  /** Enable animation */
  @Input() animation = false;

  /** Spinner type variant */
  @Input() type: SpinnerType = 'linear-gradient';

  /** Progress index (0-100) for progress indicators */
  @Input() progressIndex = 25;

  /** Custom styles object */
  @Input() customStyles: Record<string, string> = {};

  /** Component ID */
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Constants
  private readonly _uniqueId = `aava-spinner-${Math.random().toString(36).slice(2, 11)}`;
  private readonly _instanceId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  /** Gradient ID for SVG gradients */
  public gradientId: string;

  /** Size map for spinner sizes */
  private readonly sizeMap: Record<SpinnerSize, number> = {
    xs: SIZE_XS,
    sm: SIZE_SM,
    md: SIZE_MD,
    lg: SIZE_LG,
    xl: SIZE_XL,
  };

  constructor(private cdr: ChangeDetectorRef) {
    this.gradientId = `ava_spinner_gradient_${this._instanceId}`;
  }

  /**
   * Gets the unique ID for this spinner component.
   * @returns The unique ID
   */
  get spinnerId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed aria-label for the spinner.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    return 'Loading';
  }

  /**
   * Gets whether the SVG should be hidden from screen readers.
   * @returns True if SVG should be hidden
   */
  get isSvgAriaHidden(): boolean {
    return !!this.computedAriaLabel;
  }

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.validateInputs();
  }

  /**
   * Handles input changes.
   * @param changes - The changes object
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size'] || changes['type'] || changes['color'] || changes['progressIndex']) {
      this.validateInputs();
    }
    if (changes['animation']) {
      this.cdr.markForCheck();
    }
  }

  /**
   * Gets the color value based on the color input.
   * @returns The color CSS variable or custom color value
   */
  get colors(): string {
    try {
      if (!this.color) {
        return 'var(--spinner-primary-fill)';
      }

      if (typeof this.color === 'string' && (this.color.startsWith('#') || this.color.startsWith('rgb'))) {
        return this.color;
      }

      switch (this.color) {
        case 'primary':
          return 'var(--spinner-primary-fill)';
        case 'secondary':
          return 'var(--spinner-secondary-fill)';
        case 'success':
          return 'var(--spinner-success-fill)';
        case 'warning':
          return 'var(--spinner-warning-fill)';
        case 'danger':
          return 'var(--spinner-error-fill)';
        default:
          return 'var(--spinner-primary-fill)';
      }
    } catch (error) {
      console.error('AavaSpinnerComponent: Error in colors getter', error);
      return 'var(--spinner-primary-fill)';
    }
  }

  /**
   * Gets the size in pixels.
   * @returns The size in pixels
   */
  get sizePx(): number {
    try {
      if (typeof this.size === 'number') {
        return this.size;
      }

      if (this.sizeMap[this.size]) {
        return this.sizeMap[this.size];
      }

      return SIZE_MD; // Default size
    } catch (error) {
      console.error('AavaSpinnerComponent: Error in sizePx getter', error);
      return SIZE_MD;
    }
  }

  /**
   * Gets whether the spinner is currently spinning.
   * @returns True if animation is enabled
   */
  @HostBinding('class.spin')
  get spinning(): boolean {
    return this.animation;
  }

  /**
   * Gets the stroke color for the path.
   */
  get pathStroke(): string {
    if (this.type === 'blob') {
      return this.colors;
    }
    return `url(#${this.gradientId})`;
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate size
      const validSizes: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
      if (!validSizes.includes(this.size)) {
        console.warn(`AavaSpinnerComponent: Invalid size '${this.size}'. Defaulting to 'md'.`);
        this.size = 'md';
      }

      // Validate type
      const validTypes: SpinnerType[] = ['linear-gradient', 'blob'];
      if (!validTypes.includes(this.type)) {
        console.warn(`AavaSpinnerComponent: Invalid type '${this.type}'. Defaulting to 'linear-gradient'.`);
        this.type = 'linear-gradient';
      }

      // Validate progressIndex - clamp to 0-100 range
      if (typeof this.progressIndex !== 'number' || isNaN(this.progressIndex)) {
        console.warn(`AavaSpinnerComponent: Invalid progressIndex '${this.progressIndex}'. Defaulting to 25.`);
        this.progressIndex = 25;
      } else if (this.progressIndex < 0) {
        console.warn(`AavaSpinnerComponent: progressIndex ${this.progressIndex} is less than 0. Clamping to 0.`);
        this.progressIndex = 0;
      } else if (this.progressIndex > 100) {
        console.warn(`AavaSpinnerComponent: progressIndex ${this.progressIndex} is greater than 100. Clamping to 100.`);
        this.progressIndex = 100;
      }
    } catch (error) {
      console.error('AavaSpinnerComponent: Error in validateInputs', error);
    }
  }
}
