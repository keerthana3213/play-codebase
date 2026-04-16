import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

/**
 * Shimmer shape options for skeleton loader.
 */
export type ShimmerShape = 'rectangle' | 'circle' | 'rounded' | 'square';

/**
 * Shimmer animation options for skeleton loader.
 */
export type ShimmerAnimation = 'wave' | 'pulse';

/**
 * Default values for skeleton component.
 */
const DEFAULT_ROWS = 5;
const DEFAULT_COLUMNS = 5;
const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '20px';
const DEFAULT_BACKGROUND_COLOR = '#e0e0e0';

/**
 * AavaSkeletonComponent: A versatile and accessible skeleton loading component.
 * Supports multiple shapes, animations, and table layouts with full accessibility features.
 */
@Component({
  selector: 'aava-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-skeleton.component.html',
  styleUrls: ['./aava-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaSkeletonComponent implements OnInit, OnChanges {
  /** Width of the skeleton loader */
  @Input() width = DEFAULT_WIDTH;

  /** Height of the skeleton loader */
  @Input() height = DEFAULT_HEIGHT;

  /** Shape variant of the skeleton */
  @Input() shape: ShimmerShape = 'rectangle';

  /** Animation variant */
  @Input() animation: ShimmerAnimation = 'wave';

  /** Background color of the skeleton */
  @Input() backgroundColor = DEFAULT_BACKGROUND_COLOR;

  /** Skeleton type variant */
  @Input() skeletonType: 'tableList' | 'table' = 'tableList';

  /** Number of rows for table skeleton */
  @Input() rows = DEFAULT_ROWS;

  /** Number of columns for table skeleton */
  @Input() columns = DEFAULT_COLUMNS;

  /** Whether the skeleton is currently loading */
  @Input() isLoading = true;

  /** Custom styles object */
  @Input() customStyles: Record<string, string> = {};

  /** Component ID */
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Constants
  private readonly _uniqueId = `aava-skeleton-${Math.random().toString(36).slice(2, 11)}`;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gets the unique ID for this skeleton component.
   * @returns The unique ID
   */
  get skeletonId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed aria-label for the skeleton.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    return 'Loading content';
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
    if (changes['rows'] || changes['columns'] || changes['shape'] || changes['animation'] || changes['skeletonType']) {
      this.validateInputs();
    }
    if (changes['isLoading']) {
      this.cdr.markForCheck();
    }
  }

  /**
   * Gets an array of row indices for table skeleton.
   * @returns Array of numbers representing row indices
   */
  get rowArray(): number[] {
    try {
      const validRows = Math.max(1, Math.floor(this.rows || DEFAULT_ROWS));
      return Array.from({ length: validRows }, (_, i) => i);
    } catch (error) {
      console.error('AavaSkeletonComponent: Error in rowArray getter', error);
      return Array.from({ length: DEFAULT_ROWS }, (_, i) => i);
    }
  }

  /**
   * Gets an array of column indices for table skeleton.
   * @returns Array of numbers representing column indices
   */
  get colArray(): number[] {
    try {
      const validColumns = Math.max(1, Math.floor(this.columns || DEFAULT_COLUMNS));
      return Array.from({ length: validColumns }, (_, i) => i);
    } catch (error) {
      console.error('AavaSkeletonComponent: Error in colArray getter', error);
      return Array.from({ length: DEFAULT_COLUMNS }, (_, i) => i);
    }
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate rows - ensure positive integer
      if (typeof this.rows !== 'number' || isNaN(this.rows) || this.rows < 1) {
        console.warn(`AavaSkeletonComponent: Invalid rows value '${this.rows}'. Defaulting to ${DEFAULT_ROWS}.`);
        this.rows = DEFAULT_ROWS;
      } else {
        this.rows = Math.floor(this.rows); // Ensure integer
      }

      // Validate columns - ensure positive integer
      if (typeof this.columns !== 'number' || isNaN(this.columns) || this.columns < 1) {
        console.warn(`AavaSkeletonComponent: Invalid columns value '${this.columns}'. Defaulting to ${DEFAULT_COLUMNS}.`);
        this.columns = DEFAULT_COLUMNS;
      } else {
        this.columns = Math.floor(this.columns); // Ensure integer
      }

      // Validate shape
      const validShapes: ShimmerShape[] = ['rectangle', 'circle', 'rounded', 'square'];
      if (!validShapes.includes(this.shape)) {
        console.warn(`AavaSkeletonComponent: Invalid shape '${this.shape}'. Defaulting to 'rectangle'.`);
        this.shape = 'rectangle';
      }

      // Validate animation
      const validAnimations: ShimmerAnimation[] = ['wave', 'pulse'];
      if (!validAnimations.includes(this.animation)) {
        console.warn(`AavaSkeletonComponent: Invalid animation '${this.animation}'. Defaulting to 'wave'.`);
        this.animation = 'wave';
      }

      // Validate skeletonType
      const validTypes: ('tableList' | 'table')[] = ['tableList', 'table'];
      if (!validTypes.includes(this.skeletonType)) {
        console.warn(`AavaSkeletonComponent: Invalid skeletonType '${this.skeletonType}'. Defaulting to 'tableList'.`);
        this.skeletonType = 'tableList';
      }

      // Validate width and height (basic checks)
      if (this.width && typeof this.width !== 'string') {
        console.warn(`AavaSkeletonComponent: Invalid width type. Expected string, got ${typeof this.width}.`);
        this.width = DEFAULT_WIDTH;
      }

      if (this.height && typeof this.height !== 'string') {
        console.warn(`AavaSkeletonComponent: Invalid height type. Expected string, got ${typeof this.height}.`);
        this.height = DEFAULT_HEIGHT;
      }
    } catch (error) {
      console.error('AavaSkeletonComponent: Error in validateInputs', error);
    }
  }
}
