import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';

/**
 * Badge state type options.
 */
export type BadgeState =
  | 'high-priority'
  | 'medium-priority'
  | 'low-priority'
  | 'neutral'
  | 'information'
  | 'online'
  | 'offline';

/**
 * Badge size type options.
 */
export type BadgeSize = 'lg' | 'md' | 'sm' | 'xs';

/**
 * Badge variant type options.
 */
export type BadgeVariant = 'default' | 'dots';

/**
 * Constants for component defaults and thresholds.
 */
const COUNT_THRESHOLD_99 = 99;
const COUNT_THRESHOLD_9 = 9;
const COUNT_DISPLAY_99 = '99+';
const COUNT_DISPLAY_9 = '9+';
const MIN_ICON_SIZE = 0;
const MIN_COUNT = 0;

/**
 * AavaBadgesComponent: A badge component for displaying status indicators, counts, or icons.
 * Supports multiple states, sizes, and variants with full accessibility features.
 */
@Component({
  selector: 'aava-badges',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-badges.component.html',
  styleUrls: ['./aava-badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaBadgesComponent implements OnInit, OnChanges {
  /** Badge state variant */
  @Input() state: BadgeState = 'neutral';

  /** Badge size variant */
  @Input() size: BadgeSize = 'md';

  /** Badge variant type */
  @Input() variant: BadgeVariant = 'default';

  /** Count to display on badge */
  @Input() count?: number;

  /** Icon name to display */
  @Input() iconName?: string;

  /** Icon color (default: 'white') */
  @Input() iconColor = 'white';

  /** Icon size in pixels */
  @Input() iconSize?: number;

  /** Custom styles for the badge */
  @Input() customStyles: Record<string, string> = {};

  /** Component ID */
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Constants
  private readonly _uniqueId = `aava-badge-${Math.random().toString(36).slice(2, 11)}`;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gets the unique ID for this badge component.
   * @returns The unique ID
   */
  get componentId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed aria-label for the badge.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    if (this.count !== undefined) {
      return `Badge: ${this.displayCount}`;
    }
    if (this.iconName) {
      return `Badge: ${this.iconName}`;
    }
    if (this.state !== 'neutral') {
      return `Badge: ${this.state}`;
    }
    return null;
  }

  /**
   * Gets the display count string.
   * @returns The formatted count string
   */
  get displayCount(): string {
    try {
      if (this.count === undefined || this.count === null) {
        return '';
      }

      const countNum = Number(this.count);

      if (isNaN(countNum) || countNum < MIN_COUNT) {
        return '';
      }

      if (countNum > COUNT_THRESHOLD_99) {
        return COUNT_DISPLAY_99;
      }

      if (countNum > COUNT_THRESHOLD_9) {
        return COUNT_DISPLAY_9;
      }

      return countNum.toString();
    } catch (error) {
      console.error('AavaBadgesComponent: Error in displayCount getter', error);
      return '';
    }
  }

  /**
   * Gets the badge CSS classes.
   * @returns The badge class string
   */
  get badgeClasses(): string {
    try {
      const baseClasses = `badge badge--${this.state} badge--${this.size} badge--${this.variant}`;

      // Add expanded class only for multi-character content
      if (this.count !== undefined && this.displayCount.length > 1) {
        return `${baseClasses} badge--expanded`;
      }

      return baseClasses;
    } catch (error) {
      console.error('AavaBadgesComponent: Error in badgeClasses getter', error);
      return 'badge badge--neutral badge--md badge--default';
    }
  }

  /**
   * Checks if badge has content to display.
   * @returns True if badge has content
   */
  get hasContent(): boolean {
    try {
      return (
        !!(this.count !== undefined || this.iconName) && this.variant !== 'dots'
      );
    } catch (error) {
      console.error('AavaBadgesComponent: Error in hasContent getter', error);
      return false;
    }
  }

  /**
   * Checks if badge is dots variant.
   * @returns True if badge is dots variant
   */
  get isDots(): boolean {
    try {
      return this.variant === 'dots';
    } catch (error) {
      console.error('AavaBadgesComponent: Error in isDots getter', error);
      return false;
    }
  }

  /**
   * Gets the icon color, falling back to default if not provided.
   * @returns The icon color
   */
  get computedIconColor(): string {
    return this.iconColor || 'white';
  }

  /**
   * Gets the icon size, with validation.
   * @returns The icon size or undefined
   */
  get computedIconSize(): number | string {
    if (this.iconSize !== undefined && this.iconSize > MIN_ICON_SIZE) {
      return this.iconSize;
    }
    return '';
  }

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.validateInputs();
    this.cdr.markForCheck();
  }

  /**
   * Handles input changes.
   * @param changes - The changes object
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state'] || changes['size'] || changes['variant']) {
      this.validateInputs();
    }
    this.cdr.markForCheck();
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate state
      const validStates: BadgeState[] = [
        'high-priority',
        'medium-priority',
        'low-priority',
        'neutral',
        'information',
        'online',
        'offline',
      ];
      if (!validStates.includes(this.state)) {
        console.warn(
          `AavaBadgesComponent: Invalid state '${this.state}'. Defaulting to 'neutral'.`
        );
        this.state = 'neutral';
      }

      // Validate size
      const validSizes: BadgeSize[] = ['lg', 'md', 'sm', 'xs'];
      if (!validSizes.includes(this.size)) {
        console.warn(
          `AavaBadgesComponent: Invalid size '${this.size}'. Defaulting to 'md'.`
        );
        this.size = 'md';
      }

      // Validate variant
      const validVariants: BadgeVariant[] = ['default', 'dots'];
      if (!validVariants.includes(this.variant)) {
        console.warn(
          `AavaBadgesComponent: Invalid variant '${this.variant}'. Defaulting to 'default'.`
        );
        this.variant = 'default';
      }

      // Validate count
      if (this.count !== undefined && (isNaN(Number(this.count)) || this.count < MIN_COUNT)) {
        console.warn(
          `AavaBadgesComponent: Invalid count '${this.count}'. Must be a non-negative number.`
        );
        this.count = undefined;
      }

      // Validate iconSize
      if (
        this.iconSize !== undefined &&
        (isNaN(Number(this.iconSize)) || this.iconSize < MIN_ICON_SIZE)
      ) {
        console.warn(
          `AavaBadgesComponent: Invalid iconSize '${this.iconSize}'. Must be a positive number.`
        );
        this.iconSize = undefined;
      }
    } catch (error) {
      console.error('AavaBadgesComponent: Error in validateInputs', error);
    }
  }
}
