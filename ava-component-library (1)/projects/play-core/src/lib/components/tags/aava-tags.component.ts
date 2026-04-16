import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaAvatarsComponent } from '../avatars/aava-avatars.component';

/**
 * AvaTagComponent: Modern, accessible, and highly customizable tag/chip component.
 * Supports filled/outlined, color variants, pill/rect, removable, icons, avatars, sizes, and custom styles.
 */
@Component({
  selector: 'aava-tag',
  templateUrl: './aava-tags.component.html',
  styleUrls: ['./aava-tags.component.scss'],
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaAvatarsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaTagComponent implements OnInit {
  // Constants
  private readonly ICON_SIZE_XS = 12;
  private readonly ICON_SIZE_SM = 12;
  private readonly ICON_SIZE_MD = 14;
  private readonly ICON_SIZE_LG = 16;
  private readonly ICON_SIZE_XL = 20;
  private readonly REMOVE_TAG_LABEL = 'Remove tag';
  private readonly _uniqueId = `aava-tag-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Gets the remove tag label for accessibility.
   * @returns The remove tag label
   */
  get removeTagLabel(): string {
    return this.REMOVE_TAG_LABEL;
  }

  /** Tag label text */
  @Input() label = '';
  /** Color variant */
  @Input() color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom' = 'default';
  /** Outlined or filled */
  @Input() variant: 'filled' | 'outlined' = 'filled';
  /** Tag size */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  /** Pill/rounded shape */
  @Input() pill = false;
  /** Removable (shows close icon) */
  @Input() removable = false;
  /** Disabled state */
  @Input() disabled = false;
  /** Icon name (ava-icon) */
  @Input() icon?: string;
  /** Icon position (end position only shows when removable=false) */
  @Input() iconPosition: 'start' | 'end' = 'start';
  /** Avatar: image URL or initials */
  @Input() avatar?: string;
  /** Custom icon color */
  @Input() iconColor?: string;
  /** Custom style object for CSS vars */
  @Input() customStyle?: Record<string, string>;
  /** Custom class for tag */
  @Input() customClass?: string;
  /** Tag type: tag or badge */
  @Input() type: 'badge' | 'tag' = 'tag';
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  /** Emits when tag is removed (close icon) */
  @Output() removed = new EventEmitter<void>();
  /** Emits when tag is clicked (if handler provided) */
  @Output() clicked = new EventEmitter<void>();

  /** Internal hover state */
  isHovered = false;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.validateInputs();
  }

  /**
   * Gets the unique ID for this tag component.
   * @returns The unique ID
   */
  get tagId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed aria-label for the tag.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    if (this.label) return this.label;
    return null;
  }

  /** True if tag is clickable (handler attached and not disabled) */
  get clickable(): boolean {
    return this.clicked.observed && !this.disabled;
  }

  /**
   * Get icon size based on tag size.
   * @returns The icon size in pixels
   */
  getIconSize(): number {
    try {
      switch (this.size) {
        case 'xs':
          return this.ICON_SIZE_XS;
        case 'sm':
          return this.ICON_SIZE_SM;
        case 'md':
          return this.ICON_SIZE_MD;
        case 'lg':
          return this.ICON_SIZE_LG;
        case 'xl':
          return this.ICON_SIZE_XL;
        default:
          return this.ICON_SIZE_SM;
      }
    } catch (error) {
      console.error('AavaTagComponent: Error in getIconSize', error);
      return this.ICON_SIZE_SM;
    }
  }

  /**
   * Get icon color based on position and hover state.
   * @param position - The icon position ('start' or 'end')
   * @returns The icon color CSS variable or value
   */
  getIconColor(position: 'start' | 'end'): string {
    try {
      // Return custom iconColor if set
      if (this.iconColor) {
        return this.iconColor;
      }

      // Handle disabled state
      if (this.disabled) {
        return 'var(--global-color-gray-400)';
      }

      // Handle start icons (always black)
      if (position === 'start') {
        return 'var(--global-color-black)';
      }

      // Handle end icons (gray by default, black on hover)
      if (position === 'end') {
        return this.isHovered ? 'var(--global-color-black)' : 'var(--global-color-gray-400)';
      }

      return 'var(--global-color-gray-400)';
    } catch (error) {
      console.error('AavaTagComponent: Error in getIconColor', error);
      return 'var(--global-color-gray-400)';
    }
  }

  /**
   * Check if avatar should be shown.
   * @returns True if avatar should be displayed
   */
  get shouldShowAvatar(): boolean {
    return !!this.avatar;
  }

  /**
   * Get avatar size based on tag size.
   * @returns The avatar size
   */
  getAvatarSize(): 'sm' | 'md' | 'lg' | 'xs' | 'xl' | 'xxs' | 'xxl' {
    try {
      switch (this.size) {
        case 'xl':
          return 'xs';
        case 'lg':
          return 'xxs';
        case 'md':
          return 'xxs';
        case 'sm':
          return 'xxs';
        case 'xs':
          return 'xxs';
        default:
          return 'xxs';
      }
    } catch (error) {
      console.error('AavaTagComponent: Error in getAvatarSize', error);
      return 'xxs';
    }
  }

  /**
   * Handles keyboard events for clickable tags.
   * @param event - The keyboard event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }

  /**
   * Handles keyboard events for remove button.
   * @param event - The keyboard event
   */
  onRemoveKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onRemove(event);
    }
  }

  /**
   * Remove handler (close icon).
   * @param event - The event object
   */
  onRemove(event: Event): void {
    try {
      event.stopPropagation();
      if (!this.disabled) {
        this.removed.emit();
      }
    } catch (error) {
      console.error('AavaTagComponent: Error in onRemove', error);
    }
  }

  /**
   * Click handler (entire tag).
   */
  onClick(): void {
    try {
      if (this.clickable) {
        this.clicked.emit();
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaTagComponent: Error in onClick', error);
    }
  }

  /**
   * Mouse enter handler.
   */
  onMouseEnter(): void {
    if (!this.disabled) {
      this.isHovered = true;
      this.cdr.markForCheck();
    }
  }

  /**
   * Mouse leave handler.
   */
  onMouseLeave(): void {
    this.isHovered = false;
    this.cdr.markForCheck();
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    // Validate size
    const validSizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    if (!validSizes.includes(this.size)) {
      console.warn(`AavaTagComponent: Invalid size '${this.size}'. Defaulting to 'sm'.`);
      this.size = 'sm';
    }

    // Validate color
    const validColors: ('default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom')[] = ['default', 'primary', 'success', 'warning', 'error', 'info', 'custom'];
    if (!validColors.includes(this.color)) {
      console.warn(`AavaTagComponent: Invalid color '${this.color}'. Defaulting to 'default'.`);
      this.color = 'default';
    }

    // Validate variant
    const validVariants: ('filled' | 'outlined')[] = ['filled', 'outlined'];
    if (!validVariants.includes(this.variant)) {
      console.warn(`AavaTagComponent: Invalid variant '${this.variant}'. Defaulting to 'filled'.`);
      this.variant = 'filled';
    }

    // Validate type
    const validTypes: ('badge' | 'tag')[] = ['badge', 'tag'];
    if (!validTypes.includes(this.type)) {
      console.warn(`AavaTagComponent: Invalid type '${this.type}'. Defaulting to 'tag'.`);
      this.type = 'tag';
    }

    // Validate iconPosition
    const validIconPositions: ('start' | 'end')[] = ['start', 'end'];
    if (!validIconPositions.includes(this.iconPosition)) {
      console.warn(`AavaTagComponent: Invalid iconPosition '${this.iconPosition}'. Defaulting to 'start'.`);
      this.iconPosition = 'start';
    }
  }
} 