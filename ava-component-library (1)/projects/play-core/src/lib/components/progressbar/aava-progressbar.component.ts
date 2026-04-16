
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  HostListener,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Constants for component defaults and sizes.
 */
const STROKE_WIDTH_SM = 4;
const STROKE_WIDTH_MD = 12;
const STROKE_WIDTH_LG = 16;
const LINEAR_HEIGHT_SM = 4;
const LINEAR_HEIGHT_MD = 8;
const LINEAR_HEIGHT_LG = 12;
const CIRCLE_CENTER = 50;
const ANIMATION_DURATION_MULTIPLIER = 1.5;
const MIN_ANIMATION_DURATION = 1;
const INITIAL_UPDATE_DELAY = 100;
const ANIMATION_START_DELAY = 10;
const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;
const SVG_SIZE_MOBILE = 50;
const SVG_SIZE_TABLET = 75;
const SVG_SIZE_DESKTOP = 100;

/**
 * AavaProgressComponent: A versatile progress bar component supporting circular and linear progress indicators.
 * Supports multiple modes (determinate, indeterminate, buffer, query) and full accessibility features.
 */
@Component({
  selector: 'aava-progressbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-progressbar.component.html',
  styleUrl: './aava-progressbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaProgressComponent),
      multi: true,
    },
  ],
})
export class AavaProgressComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  @ViewChild('progressContainer') progressContainer?: ElementRef<HTMLElement>;
  @ViewChild('linearContainer') linearContainer?: ElementRef<HTMLElement>;

  /** Progress percentage (0-100) */
  @Input() percentage = 0;
  @Input() showValue = true;
  displayBufferValue = 0;

  /** Buffer value for buffer mode (0-100) */
  @Input() bufferValue = 0;

  /** Label text for the progress bar */
  @Input() label = '';

  /** Progress bar type */
  @Input() type: 'circular' | 'linear' = 'circular';

  /** Progress bar color - supports 'gradient(...)' syntax */
  @Input() color = 'var(--color-brand-primary)';

  /** Progress bar mode */
  @Input() mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

  /** SVG size override */
  @Input() svgSize?: number;

  /** Start position for circular progress (clock position or angle in degrees) */
  @Input() position: '12' | '3' | '6' | '9' | number = '12';

  /** Progress bar size */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Custom styles */
  @Input() customStyles: Record<string, string> = {};

  /** Component ID */
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Gradient support (added from working file)
  isGradient = false;
  gradientStops: { offset: string; color: string }[] = [];

  // Constants
  private readonly _uniqueId = `aava-progressbar-${Math.random().toString(36).slice(2, 11)}`;
  private isDestroyed = false;
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private animationFrameId: number | null = null;

  // Internal state
  progressId = '';
  gradientId = '';
  dashOffset = 0;
  currentDashArray: string | number = 0;
  errorMessage = '';
  displayPercentage = 0;
  rotationAngle = 0;

  // ControlValueAccessor properties
  private onChange: (value: number) => void = () => {
    // No-op
  };
  private onTouched: () => void = () => {
    // No-op
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    // Generate unique IDs in constructor
    this.progressId = `${this._uniqueId}-progress`;
    this.gradientId = `${this._uniqueId}-gradient`;
    // initialize dashOffset to circumference (safe access via getter)
    this.dashOffset = this.circumference;
    this.currentDashArray = this.circumference;
  }

  /**
   * Gets the unique ID for this progress component.
   * @returns The unique ID
   */
  get componentId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed stroke width based on size.
   * @returns The stroke width in pixels
   */
  get strokeWidth(): number {
    try {
      const sizeMap: Record<string, number> = {
        sm: STROKE_WIDTH_SM,
        md: STROKE_WIDTH_MD,
        lg: STROKE_WIDTH_LG,
      };
      return sizeMap[this.size] || STROKE_WIDTH_MD;
    } catch (error) {
      console.error('AavaProgressComponent: Error in strokeWidth getter', error);
      return STROKE_WIDTH_MD;
    }
  }

  /**
   * Gets the linear progress height based on size.
   * @returns The linear height in pixels
   */
  get linearHeight(): number {
    try {
      const sizeMap: Record<string, number> = {
        sm: LINEAR_HEIGHT_SM,
        md: LINEAR_HEIGHT_MD,
        lg: LINEAR_HEIGHT_LG,
      };
      return sizeMap[this.size] || LINEAR_HEIGHT_MD;
    } catch (error) {
      console.error('AavaProgressComponent: Error in linearHeight getter', error);
      return LINEAR_HEIGHT_MD;
    }
  }

  /**
   * Gets the radius for circular progress.
   * @returns The radius value
   */
  get radius(): number {
    try {
      return CIRCLE_CENTER - this.strokeWidth / 2;
    } catch (error) {
      console.error('AavaProgressComponent: Error in radius getter', error);
      return CIRCLE_CENTER - STROKE_WIDTH_MD / 2;
    }
  }

  /**
   * Gets the circumference for circular progress.
   * @returns The circumference value
   */
  get circumference(): number {
    try {
      return 2 * Math.PI * this.radius;
    } catch (error) {
      console.error('AavaProgressComponent: Error in circumference getter', error);
      return 2 * Math.PI * (CIRCLE_CENTER - STROKE_WIDTH_MD / 2);
    }
  }

  /**
   * Gets the computed aria-label for the progress bar.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    if (this.label) return this.label;
    return null;
  }

  /**
   * Gets the computed aria-valuetext for screen readers.
   * @returns The aria-valuetext string
   */
  get computedAriaValuetext(): string {
    if (this.mode === 'indeterminate' || this.mode === 'query') {
      return 'Loading';
    }
    return `${this.percentage}%`;
  }

  /**
   * Gets the linear gradient background string for CSS.
   * @returns The linear-gradient string or color or null
   */
  get linearGradientBackground(): string | null {
    if (this.isGradient) {
      return `linear-gradient(to right, ${this.gradientStops.map((s) => s.color).join(', ')})`;
    }
    return this.color ? this.color : 'linear-gradient(to right, var(--progress-gradient-start), var(--progress-gradient-end))';
  }

  /**
   * Gets the stroke value for circular progress SVG circle.
   * SVG stroke can accept either a color (e.g., "red", "#FF0000") or a gradient URL (e.g., "url(#gradientId)").
   * This getter ensures the value is computed correctly in compiled libraries.
   * @returns The stroke value - either a color string or a gradient URL string
   */
  get circularStroke(): string {
    if (this.isGradient) {
      return `url(#customGradient-${this.progressId})`;
    }
    if (this.color) {
      return this.color;
    }
    return `url(#${this.gradientId})`;
  }

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    try {
      this.validateInputs();
      this.updateSvgSize();
      this.updateRotationAngle();
      this.parseGradient();
      // Calculate initial dashOffset based on current percentage (important for consumer apps where ngOnChanges might not fire)
      if (this.mode === 'determinate' || this.mode === 'buffer') {
        // For clockwise animation: start at circumference (0% visible), animate to reveal percentage clockwise
        // stroke-dashoffset = circumference means nothing visible, decreasing reveals clockwise
        this.dashOffset = this.circumference * (1 - (this.percentage || 0) / 100);
        this.currentDashArray = this.circumference.toString();
      } else {
        // For indeterminate/query, set initial values
        this.dashOffset = this.circumference;
        this.currentDashArray = this.circumference;
      }
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaProgressComponent: Error in ngOnInit', error);
    }
  }

  /**
   * Handles input changes.
   * @param changes - The changes object
   */
  ngOnChanges(changes: SimpleChanges): void {
    try {
      // Always re-validate inputs
      this.validateInputs();

      if (changes['svgSize'] || changes['type']) {
        this.updateSvgSize();
      }

      if (changes['position']) {
        this.updateRotationAngle();
      }

      // parse gradient on color change
      if (changes['color']) {
        this.parseGradient();
      }

      // For circular/linear updates, refresh progress
      if (
        changes['percentage'] ||
        changes['mode'] ||
        changes['type'] ||
        changes['bufferValue']
      ) {
        this.updateProgress();
      }

      // For linear progress, start animation from 0 to target percentage
      if (this.type === 'linear' && (this.mode === 'determinate' || this.mode === 'buffer')) {
        this.animateLinearProgress();
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaProgressComponent: Error in ngOnChanges', error);
    }
  }

  /**
   * Component view initialization.
   */
  ngAfterViewInit(): void {
    try {
      // For circular progress, always ensure we start from 0% and animate to target
      // This is important when component is initialized with a value directly (ngOnChanges won't fire)
      if (this.type === 'circular' && (this.mode === 'determinate' || this.mode === 'buffer')) {
        // Recalculate dashOffset based on current percentage
        this.dashOffset = this.circumference * (1 - (this.percentage || 0) / 100);
        this.currentDashArray = this.circumference.toString();
      }
      
      // Ensure stroke, opacity, stroke-dasharray, and stroke-dashoffset are set programmatically for circular progress (works better in consumer apps)
      if (this.type === 'circular') {
        // Use double requestAnimationFrame to ensure DOM is fully ready (important for consumer apps)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Try multiple ways to find the circle element (works better in compiled libraries)
            let circle: SVGCircleElement | null = null;
            
            // Method 1: Via ViewChild progressContainer
            if (this.progressContainer?.nativeElement) {
              const svg = this.progressContainer.nativeElement.querySelector('svg');
              circle = svg?.querySelector(`circle[id="${this.progressId}"]`) as SVGCircleElement | null;
            }
            
            // Method 2: Via document.getElementById (fallback for consumer apps)
            if (!circle) {
              const element = document.getElementById(this.progressId);
              if (element && element.tagName.toLowerCase() === 'circle') {
                circle = element as unknown as SVGCircleElement;
              } else if (element) {
                // If it's the container, find the circle inside
                const svg = element.querySelector('svg');
                circle = svg?.querySelector(`circle[id="${this.progressId}"]`) as SVGCircleElement | null;
              }
            }
            
            // Method 3: Via component element (ultimate fallback)
            if (!circle && this.elementRef?.nativeElement) {
              const svg = this.elementRef.nativeElement.querySelector('svg');
              circle = svg?.querySelector(`circle[id="${this.progressId}"]`) as SVGCircleElement | null;
            }
            
            if (circle) {
              // Recalculate to ensure we have correct values (important when ngOnChanges didn't fire)
              if (this.mode === 'determinate' || this.mode === 'buffer') {
                // For clockwise filling from 0%: stroke-dashoffset decreases from circumference to reveal percentage
                this.dashOffset = this.circumference * (1 - (this.percentage || 0) / 100);
                this.currentDashArray = this.circumference.toString();
              }
              
              // Use both attribute and style to ensure stroke works everywhere
              const strokeValue = this.circularStroke;
              circle.setAttribute('stroke', strokeValue); // Direct DOM manipulation for reliability
              circle.style.stroke = strokeValue; // Also set as style using direct property
              
              // Ensure opacity is set (1 if percentage > 0, 0 if percentage is 0)
              const opacity = (this.percentage || 0) === 0 ? '0' : '1';
              circle.style.opacity = opacity;
              
              // Set stroke-dasharray as attribute (critical for progress to show)
              circle.setAttribute('stroke-dasharray', this.currentDashArray.toString());
              
              if (this.mode === 'determinate' || this.mode === 'buffer') {
                // CRITICAL: Always reset to 0% (circumference) before animating
                // This ensures proper animation when component is initialized with a value directly
                // Remove any existing transition and set to 0% immediately
                circle.style.transition = 'none';
                circle.style.strokeDashoffset = this.circumference.toString();
                
                // Force multiple reflows to ensure 0% state is fully painted
                void circle.getBoundingClientRect();
                void circle.getBoundingClientRect(); // Double reflow for extra safety
                
                // Small delay to ensure browser has painted the 0% state
                setTimeout(() => {
                  if (this.isDestroyed) return;
                  
                  // Now set transition and animate to target (fills from 0% to target percentage clockwise)
                  const duration = Math.max(
                    MIN_ANIMATION_DURATION,
                    ((this.percentage || 0) / 100) * ANIMATION_DURATION_MULTIPLIER
                  );
                  this.setCSSVariable('--progress-duration', `${duration}s`);
                  circle.style.transition = `stroke-dashoffset var(--progress-duration, 1.5s) ease-in-out`;
                  
                  // Use requestAnimationFrame to ensure initial state is painted before animating
                  requestAnimationFrame(() => {
                    if (this.isDestroyed) return;
                    circle.style.strokeDashoffset = this.dashOffset.toString();
                  });
                }, 10); // Small delay to ensure 0% state is painted
              } else {
                // For indeterminate/query modes
                circle.style.strokeDashoffset = this.dashOffset.toString();
              }
            }
          });
        });
      } else {
        // For non-circular, still call updateProgress to ensure everything is initialized
        const timeoutId = setTimeout(() => {
          this.updateProgress();
          this.removeTimeout(timeoutId);
        }, INITIAL_UPDATE_DELAY);
        this.timeouts.push(timeoutId);
      }
    } catch (error) {
      console.error('AavaProgressComponent: Error in ngAfterViewInit', error);
    }
  }

  /**
   * Component cleanup.
   */
  ngOnDestroy(): void {
    this.isDestroyed = true;
    // Clear all timeouts
    this.timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.timeouts = [];

    // Cancel animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Animates linear progress from 0 to target percentage (optimized RAF-based).
   */
  private animateLinearProgress(): void {
    try {
      if (this.isDestroyed) return;

      // Save target percentage and reset display to 0 if initial
      const targetPercentage = Math.max(0, Math.min(100, this.percentage || 0));
      const targetBuffer = Math.max(0, Math.min(100, this.bufferValue || 0));
      // If displayPercentage is already close to target, simply set and return
      if (Math.abs(this.displayPercentage - targetPercentage) < 1) {
        this.displayPercentage = targetPercentage;
        this.displayBufferValue = targetBuffer;
        this.cdr.markForCheck();
        return;
      }

      // Calculate animation duration based on percentage
      const duration = Math.max(
        MIN_ANIMATION_DURATION,
        (targetPercentage / 100) * ANIMATION_DURATION_MULTIPLIER
      );
      this.setCSSVariable('--progress-duration', `${duration}s`);

      // If we have a linear container and a child element to animate using CSS transition,
      // we set it up and use RAF to update the displayed numeric value smoothly.
      const element =
        this.linearContainer?.nativeElement?.querySelector(
          `.linear-progress[id="${this.progressId}"]`
        ) as HTMLElement;

      // Reset and apply transition using renderer if element exists
      if (element) {
        this.renderer.setStyle(element, 'width', '0%');
        this.renderer.setStyle(
          element,
          'transition',
          `width var(--progress-duration, ${duration}s) ease-in-out`
        );
        // Force reflow then set to target width to trigger CSS transition
        void element.offsetWidth;
        this.renderer.setStyle(element, 'width', `${targetPercentage}%`);
      }

      // Use RAF to update numeric display smoothly
      const startTime = performance.now();
      const animate = (time: number) => {
        if (this.isDestroyed) return;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        this.displayPercentage = Math.round(targetPercentage * progress);
        this.displayBufferValue = Math.round(targetBuffer * progress);
        this.cdr.markForCheck();

        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          this.displayPercentage = targetPercentage;
          this.displayBufferValue = targetBuffer;
          this.animationFrameId = null;
          this.cdr.markForCheck();
        }
      };

      // Start after a brief delay to ensure styles applied
      const timeoutId = setTimeout(() => {
        if (this.isDestroyed) {
          this.removeTimeout(timeoutId);
          return;
        }
        this.animationFrameId = requestAnimationFrame(animate);
        this.removeTimeout(timeoutId);
      }, ANIMATION_START_DELAY);

      this.timeouts.push(timeoutId);
    } catch (error) {
      console.error('AavaProgressComponent: Error in animateLinearProgress', error);
    }
  }

  /**
   * Updates the progress display.
   */
  public updateProgress(): void {
    try {
      if (this.isDestroyed) return;

      // Clamp numeric inputs
      this.percentage = Math.max(0, Math.min(100, this.percentage || 0));
      this.bufferValue = Math.max(0, Math.min(100, this.bufferValue || 0));

      if (this.mode === 'determinate' || this.mode === 'buffer') {
        // For clockwise filling from 0%: start at circumference (0% visible), animate to reveal percentage
        // stroke-dashoffset decreases from circumference to circumference * (1 - percentage/100) to fill clockwise
        this.dashOffset = this.circumference * (1 - this.percentage / 100);
        this.currentDashArray = this.circumference.toString();

        // Calculate duration dynamically (scale with percentage)
        const duration = Math.max(
          MIN_ANIMATION_DURATION,
          (this.percentage / 100) * ANIMATION_DURATION_MULTIPLIER
        );
        this.setCSSVariable('--progress-duration', `${duration}s`);

        if (this.type === 'circular') {
          const timeoutId = setTimeout(() => {
            if (this.isDestroyed) {
              this.removeTimeout(timeoutId);
              return;
            }

            // Prefer Renderer2 + ViewChild element selection
            let circle: HTMLElement | null = null;
            try {
              circle = this.progressContainer?.nativeElement?.querySelector(
                `circle[id="${this.progressId}"]`
              ) as HTMLElement;
            } catch {
              circle = null;
            }

            // Fallback to direct DOM access if required (rare)
            if (!circle) {
              circle = document.getElementById(this.progressId) as HTMLElement | null;
            }

            if (circle) {
              // Ensure stroke is set programmatically (works better in consumer apps)
              // Use both attribute and style to ensure it works everywhere - DIRECT DOM MANIPULATION
              const strokeValue = this.circularStroke;
              circle.setAttribute('stroke', strokeValue); // Direct DOM attribute
              circle.style.stroke = strokeValue; // Direct DOM style property
              
              // Ensure opacity is set (1 if percentage > 0, 0 if percentage is 0)
              const opacity = this.percentage === 0 ? '0' : '1';
              circle.style.opacity = opacity;
              
              // Set stroke-dasharray as attribute (SVG attribute) - CRITICAL for progress to show
              circle.setAttribute('stroke-dasharray', this.currentDashArray.toString());
              
              // CRITICAL: Always start from 0% (circumference) before animating
              // This ensures proper animation in consumer apps where timing can differ
              // Step 1: Remove any transition and set to 0% immediately
              circle.style.transition = 'none';
              circle.style.strokeDashoffset = this.circumference.toString();
              
              // Step 2: Force reflow multiple times to ensure 0% state is painted
              void circle.offsetWidth;
              void circle.getBoundingClientRect();
              
              // Step 3: Use multiple requestAnimationFrame calls to ensure browser has painted 0% state
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (this.isDestroyed) return;
                  
                  // Verify we're still at 0% (circumference) before starting animation
                  const currentOffset = parseFloat(circle.style.strokeDashoffset || this.circumference.toString());
                  if (Math.abs(currentOffset - this.circumference) > 1) {
                    // If not at 0%, reset again
                    circle.style.transition = 'none';
                    circle.style.strokeDashoffset = this.circumference.toString();
                    void circle.offsetWidth;
                  }
                  
                  // Step 4: Now set transition and animate to target
                  const duration = Math.max(
                    MIN_ANIMATION_DURATION,
                    (this.percentage / 100) * ANIMATION_DURATION_MULTIPLIER
                  );
                  this.setCSSVariable('--progress-duration', `${duration}s`);
                  circle.style.transition = `stroke-dashoffset var(--progress-duration, 1.5s) ease-in-out`;
                  
                  // Step 5: Trigger animation in next frame
                  requestAnimationFrame(() => {
                    if (this.isDestroyed) return;
                    circle.style.strokeDashoffset = this.dashOffset.toString();
                  });
                });
              });
            }

            // If buffer mode, also animate buffer value
            if (this.mode === 'buffer') {
              this.displayBufferValue = this.bufferValue;
            }

            this.removeTimeout(timeoutId);
          }, ANIMATION_START_DELAY);

          this.timeouts.push(timeoutId);
        }
      } else if (this.mode === 'indeterminate' || this.mode === 'query') {
        // Indeterminate: set a visible arc segment (half circle) and rotation as required
        this.dashOffset = 0;
        this.currentDashArray = `${this.circumference * 0.5} ${this.circumference * 0.5}`;

        if (this.type === 'circular') {
          const timeoutId = setTimeout(() => {
            if (this.isDestroyed) {
              this.removeTimeout(timeoutId);
              return;
            }

            let circle: HTMLElement | null = null;
            try {
              circle = this.progressContainer?.nativeElement?.querySelector(
                `circle[id="${this.progressId}"]`
              ) as HTMLElement;
            } catch {
              circle = null;
            }

            if (!circle) {
              circle = document.getElementById(this.progressId) as HTMLElement | null;
            }

            if (circle) {
              // Use both attribute and style to ensure stroke works everywhere
              const strokeValue = this.circularStroke;
              circle.setAttribute('stroke', strokeValue); // Direct DOM manipulation for reliability
              circle.style.stroke = strokeValue; // Also set as style using direct property
              
              // Ensure opacity is set to 1 for indeterminate/query modes
              circle.style.opacity = '1';
              
              // Set stroke-dasharray as attribute, stroke-dashoffset as style
              circle.setAttribute('stroke-dasharray', this.currentDashArray.toString());
              circle.style.strokeDashoffset = this.dashOffset.toString();
              // Not setting a long stroke-dashoffset transition for indeterminate; CSS animation (keyframes) should handle continuous rotation
            }

            this.removeTimeout(timeoutId);
          }, ANIMATION_START_DELAY);

          this.timeouts.push(timeoutId);
        }
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaProgressComponent: Error in updateProgress', error);
    }
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate percentage
      if (typeof this.percentage !== 'number' || this.percentage < 0 || this.percentage > 100) {
        this.errorMessage = 'Percentage value must be between 0 and 100.';
        this.percentage = Math.max(0, Math.min(100, this.percentage || 0));
      } else {
        this.errorMessage = '';
      }

      // Validate bufferValue
      if (
        typeof this.bufferValue !== 'number' ||
        this.bufferValue < 0 ||
        this.bufferValue > 100
      ) {
        console.warn(
          `AavaProgressComponent: Invalid bufferValue '${this.bufferValue}'. Clamping to 0-100.`
        );
        this.bufferValue = Math.max(0, Math.min(100, this.bufferValue || 0));
      }

      // Validate type
      const validTypes: ('circular' | 'linear')[] = ['circular', 'linear'];
      if (!validTypes.includes(this.type)) {
        console.warn(
          `AavaProgressComponent: Invalid type '${this.type}'. Defaulting to 'circular'.`
        );
        this.type = 'circular';
      }

      // Validate mode
      const validModes: ('determinate' | 'indeterminate' | 'buffer' | 'query')[] = [
        'determinate',
        'indeterminate',
        'buffer',
        'query',
      ];
      if (!validModes.includes(this.mode)) {
        console.warn(
          `AavaProgressComponent: Invalid mode '${this.mode}'. Defaulting to 'determinate'.`
        );
        this.mode = 'determinate';
      }

      // Validate size
      const validSizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
      if (!validSizes.includes(this.size)) {
        console.warn(
          `AavaProgressComponent: Invalid size '${this.size}'. Defaulting to 'md'.`
        );
        this.size = 'md';
      }

      // Validate color
      if (this.color && !this.isValidColor(this.color)) {
        console.warn(
          `AavaProgressComponent: Invalid color format '${this.color}'. Using default.`
        );
        this.color = '';
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaProgressComponent: Error in validateInputs', error);
    }
  }

  /**
   * Validates if a color string is valid.
   * @param color - The color string to validate
   * @returns True if the color is valid
   */
  private isValidColor(color: string): boolean {
    try {
      if (!color || typeof color !== 'string') return false;
      // Check for hex color
      if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) return true;
      // Check for rgb/rgba color
      if (/^rgba?\(/.test(color)) return true;
      // Check for named colors or CSS variables or gradient(...) syntax
      if (/^var\(--|^[a-z]+$/i.test(color)) return true;
      if (/gradient\(/i.test(color)) return true;
      return false;
    } catch (error) {
      console.error('AavaProgressComponent: Error in isValidColor', error);
      return false;
    }
  }

  /**
   * Parse gradient(...) color strings into stops (basic parsing).
   * Supports simple cases like: gradient(red, blue) or gradient(to right, red 0%, blue 100%)
   * This logic mirrors the working file but retained in optimized flow.
   */
  private parseGradient(): void {
    try {
      if (this.color && this.color.toLowerCase().includes('gradient(')) {
        this.isGradient = true;
        const match = this.color.match(/gradient\((.*)\)/i);
        if (match && match[1]) {
          // Split by commas but naive split may break rgba(). We'll handle common rgba by preserving parentheses.
          const raw = match[1].trim();
          const parts: string[] = [];
          let current = '';
          let depth = 0;
          for (let i = 0; i < raw.length; i++) {
            const ch = raw[i];
            if (ch === '(') depth++;
            if (ch === ')') depth = Math.max(0, depth - 1);
            if (ch === ',' && depth === 0) {
              parts.push(current.trim());
              current = '';
            } else {
              current += ch;
            }
          }
          if (current.trim()) parts.push(current.trim());

          // Remove direction if present (e.g., "to right", "45deg")
          if (parts.length > 1 && (parts[0].startsWith('to ') || /^\d+deg$/i.test(parts[0]))) {
            parts.shift();
          }

          this.gradientStops = parts.map((part, index) => {
            // Extract color and optional percentage
            const stopMatch = part.match(/^(.*?)\s*(\d+%|)$/);
            const color = stopMatch ? stopMatch[1].trim() : part;
            const offset =
              stopMatch && stopMatch[2]
                ? stopMatch[2]
                : `${(index / Math.max(1, parts.length - 1)) * 100}%`;
            return { offset, color };
          });
        } else {
          this.isGradient = false;
          this.gradientStops = [];
        }
      } else {
        this.isGradient = false;
        this.gradientStops = [];
      }
    } catch (error) {
      console.error('AavaProgressComponent: Error in parseGradient', error);
      this.isGradient = false;
      this.gradientStops = [];
    }
  }

  /**
   * Dynamically updates SVG size if not set by the parent component.
   */
  private updateSvgSize(): void {
    try {
      if (!this.svgSize && typeof window !== 'undefined') {
        // Only update if svgSize is NOT set by the parent
        const width = window.innerWidth;
        this.svgSize =
          width < MOBILE_BREAKPOINT
            ? SVG_SIZE_MOBILE
            : width < TABLET_BREAKPOINT
              ? SVG_SIZE_TABLET
              : SVG_SIZE_DESKTOP;
      }
    } catch (error) {
      console.error('AavaProgressComponent: Error in updateSvgSize', error);
    }
  }

  /**
   * Calculates rotation angle based on position input.
   */
  private updateRotationAngle(): void {
    try {
      // Map clock positions to degrees (SVG 0deg is 3 o'clock, so adjust accordingly)
      let angle = 0;
      switch (this.position) {
        case '12':
          angle = 0;
          break;
        case '3':
          angle = 90;
          break;
        case '6':
          angle = 180;
          break;
        case '9':
          angle = -90;
          break;
        default:
          angle = typeof this.position === 'number' ? this.position : -90;
      }
      this.rotationAngle = angle;
    } catch (error) {
      console.error('AavaProgressComponent: Error in updateRotationAngle', error);
    }
  }

  /**
   * Sets a CSS variable value.
   * @param name - The CSS variable name
   * @param value - The CSS variable value
   */
  private setCSSVariable(name: string, value: string): void {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.style.setProperty(name, value);
      }
    } catch (error) {
      console.error('AavaProgressComponent: Error in setCSSVariable', error);
    }
  }

  /**
   * Removes a timeout ID from the tracking array.
   * @param timeoutId - The timeout ID to remove
   */
  private removeTimeout(timeoutId: ReturnType<typeof setTimeout>): void {
    this.timeouts = this.timeouts.filter((id) => id !== timeoutId);
  }

  /**
   * Handles window resize events.
   */
  @HostListener('window:resize')
  onResize(): void {
    try {
      if (!this.svgSize) {
        this.updateSvgSize();
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaProgressComponent: Error in onResize', error);
    }
  }

  // ControlValueAccessor implementation

  /**
   * Writes a new value to the component.
   * @param value - The value to write
   */
  writeValue(value: number): void {
    try {
      this.percentage = value ?? 0;
      this.validateInputs();
      this.updateProgress();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaProgressComponent: Error in writeValue', error);
    }
  }

  /**
   * Registers a callback function that should be called when the control's value changes.
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a touch event.
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control.
   * (Progress bar doesn't have a disabled state.)
   * @param _isDisabled
   */
  setDisabledState(_isDisabled: boolean): void {
    // No-op
  }
}
