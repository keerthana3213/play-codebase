import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface StepperStep {
  label: string;
  iconName?: string;
}

@Component({
  selector: 'aava-stepper',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-stepper.component.html',
  styleUrls: ['./aava-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvaStepperComponent implements OnInit, OnChanges, OnDestroy {
  @Input() steps: (string | StepperStep)[] = [];
  @Input() currentStep = 0;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() showNavigation = true;
  @Input() interactive = true;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() disabledSteps: number[] = [];
  @Input() iconColor = '#fff';
  @Input() iconSize = '20';
  @Input() stepVariant: 'default' | 'icon' = 'default';
  @Input() showLabel = true;
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Constants
  private readonly ANIMATION_STEP_DELAY_MS = 800;
  private readonly ANIMATION_NEXT_DELAY_MS = 100;
  private readonly _uniqueId = `aava-stepper-${Math.random().toString(36).slice(2, 11)}`;
  private readonly timeouts: ReturnType<typeof setTimeout>[] = [];
  private isDestroyed = false;

  isAnimating = false;
  previousStep = 0;
  visualCurrentStep = 0;
  animationDirection: 'forward' | 'backward' | null = null;
  targetStep = 0;
  currentAnimatingStep = 0;

  @Output() stepChange = new EventEmitter<number>();
  @Output() stepperComplete = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gets the unique ID for this stepper component.
   * @returns The unique ID
   */
  get stepperId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the unique ID for a step circle.
   * @param index - The step index
   * @returns The unique step ID
   */
  getStepId(index: number): string {
    return `${this.stepperId}-step-${index}`;
  }

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    this.validateInputs();
    this.previousStep = this.currentStep;
    this.visualCurrentStep = this.currentStep;
    this.targetStep = this.currentStep;
    this.currentAnimatingStep = this.currentStep;
  }

  /**
   * Handles input changes.
   * @param changes - The changes object
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep'] || changes['steps'] || changes['size'] || changes['orientation'] || changes['stepVariant']) {
      this.validateInputs();
    }

    // Trigger sequential animation for both forward and backward navigation
    if (changes['currentStep'] && this.currentStep !== this.previousStep) {
      this.targetStep = this.currentStep;
      this.animationDirection = this.currentStep > this.previousStep ? 'forward' : 'backward';
      this.triggerSequentialAnimation();
    }
    if (changes['currentStep']) {
      this.previousStep = this.currentStep;
    }
  }

  /**
   * Component cleanup.
   */
  ngOnDestroy(): void {
    this.isDestroyed = true;
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.length = 0;
    this.isAnimating = false;
  }

  /**
   * Checks if a step is disabled.
   * @param index - The step index
   * @returns True if the step is disabled
   */
  isDisabled(index: number): boolean {
    try {
      return this.disabledSteps.includes(index);
    } catch (error) {
      console.error('AvaStepperComponent: Error in isDisabled', error);
      return false;
    }
  }

  /**
   * Navigates to a specific step.
   * @param index - The target step index
   */
  goToStep(index: number): void {
    try {
      if (!this.steps || index < 0 || index >= this.steps.length) {
        console.warn(`AvaStepperComponent: Invalid step index ${index}`);
        return;
      }

      if (this.interactive && !this.isDisabled(index)) {
        this.stepChange.emit(index);
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AvaStepperComponent: Error in goToStep', error);
    }
  }

  /**
   * Gets the label for a step.
   * @param step - The step (string or StepperStep object)
   * @returns The step label
   */
  getStepLabel(step: string | StepperStep): string {
    try {
      if (!step) {
        return '';
      }
      return typeof step === 'string' ? step : (step.label || '');
    } catch (error) {
      console.error('AvaStepperComponent: Error in getStepLabel', error);
      return '';
    }
  }

  /**
   * Gets the icon name for a step.
   * @param step - The step (string or StepperStep object)
   * @returns The step icon name or undefined
   */
  getStepIcon(step: string | StepperStep): string | undefined {
    try {
      if (!step || typeof step === 'string') {
        return undefined;
      }
      return step.iconName;
    } catch (error) {
      console.error('AvaStepperComponent: Error in getStepIcon', error);
      return undefined;
    }
  }

  /**
   * Handles keyboard navigation for steps.
   * @param event - The keyboard event
   * @param currentIndex - The current step index
   */
  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    try {
      if (this.isDestroyed || !this.steps || this.steps.length === 0) {
        return;
      }

      const enabledSteps = this.steps
        .map((_, index) => index)
        .filter(index => !this.isDisabled(index));

      if (enabledSteps.length === 0) {
        return;
      }

      let targetIndex = currentIndex;
      let handled = false;

      // Handle Enter and Space for activation
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.goToStep(currentIndex);
        return;
      }

      // Handle arrow keys based on orientation
      if (this.orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          const currentPos = enabledSteps.indexOf(currentIndex);
          targetIndex = currentPos > 0 ? enabledSteps[currentPos - 1] : enabledSteps[enabledSteps.length - 1];
          handled = true;
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          const currentPos = enabledSteps.indexOf(currentIndex);
          targetIndex = currentPos < enabledSteps.length - 1 ? enabledSteps[currentPos + 1] : enabledSteps[0];
          handled = true;
        }
      } else {
        // Vertical orientation
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const currentPos = enabledSteps.indexOf(currentIndex);
          targetIndex = currentPos > 0 ? enabledSteps[currentPos - 1] : enabledSteps[enabledSteps.length - 1];
          handled = true;
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          const currentPos = enabledSteps.indexOf(currentIndex);
          targetIndex = currentPos < enabledSteps.length - 1 ? enabledSteps[currentPos + 1] : enabledSteps[0];
          handled = true;
        }
      }

      // Handle Home and End keys
      if (event.key === 'Home') {
        event.preventDefault();
        targetIndex = enabledSteps[0];
        handled = true;
      } else if (event.key === 'End') {
        event.preventDefault();
        targetIndex = enabledSteps[enabledSteps.length - 1];
        handled = true;
      }

      if (handled && targetIndex >= 0 && targetIndex < this.steps.length) {
        // Focus the target step
        const stepElement = document.getElementById(this.getStepId(targetIndex));
        if (stepElement) {
          stepElement.focus();
        }
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AvaStepperComponent: Error in onKeyDown', error);
    }
  }

  /**
   * Triggers sequential animation between steps.
   */
  private triggerSequentialAnimation(): void {
    try {
      if (this.isAnimating || this.isDestroyed) {
        return; // Prevent overlapping animations
      }

      this.isAnimating = true;
      this.currentAnimatingStep = this.visualCurrentStep;

      this.animateNextStep();
    } catch (error) {
      console.error('AvaStepperComponent: Error in triggerSequentialAnimation', error);
      this.isAnimating = false;
    }
  }

  /**
   * Animates to the next step in sequence.
   */
  private animateNextStep(): void {
    try {
      if (this.isDestroyed) {
        return;
      }

      // Check if we've reached the target
      if (this.currentAnimatingStep === this.targetStep) {
        this.isAnimating = false;
        this.animationDirection = null;
        this.cdr.markForCheck();
        return;
      }

      // Determine the next step to animate
      const nextStep = this.animationDirection === 'forward'
        ? this.currentAnimatingStep + 1
        : this.currentAnimatingStep - 1;

      // Validate next step
      if (nextStep < 0 || !this.steps || nextStep >= this.steps.length) {
        this.isAnimating = false;
        this.animationDirection = null;
        this.cdr.markForCheck();
        return;
      }

      // Update the animating step
      this.currentAnimatingStep = nextStep;

      const timeout1 = setTimeout(() => {
        if (!this.isDestroyed) {
          this.visualCurrentStep = nextStep;
          this.cdr.markForCheck();

          const timeout2 = setTimeout(() => {
            if (!this.isDestroyed) {
              this.animateNextStep();
            }
          }, this.ANIMATION_NEXT_DELAY_MS);

          this.timeouts.push(timeout2);
        }
      }, this.ANIMATION_STEP_DELAY_MS);

      this.timeouts.push(timeout1);
    } catch (error) {
      console.error('AvaStepperComponent: Error in animateNextStep', error);
      this.isAnimating = false;
      this.cdr.markForCheck();
    }
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate steps array
      if (!Array.isArray(this.steps) || this.steps.length === 0) {
        console.warn('AvaStepperComponent: steps array is empty or invalid. Defaulting to empty array.');
        this.steps = [];
      }

      // Validate currentStep - clamp to valid range
      if (!this.steps || this.steps.length === 0) {
        if (this.currentStep !== 0) {
          console.warn(`AvaStepperComponent: currentStep ${this.currentStep} is invalid for empty steps. Resetting to 0.`);
          this.currentStep = 0;
        }
      } else if (this.currentStep < 0 || this.currentStep >= this.steps.length) {
        const clampedStep = Math.max(0, Math.min(this.currentStep, this.steps.length - 1));
        console.warn(`AvaStepperComponent: currentStep ${this.currentStep} is out of bounds. Clamping to ${clampedStep}.`);
        this.currentStep = clampedStep;
      }

      // Validate size
      const validSizes: ('xs' | 'sm' | 'md' | 'lg')[] = ['xs', 'sm', 'md', 'lg'];
      if (!validSizes.includes(this.size)) {
        console.warn(`AvaStepperComponent: Invalid size '${this.size}'. Defaulting to 'md'.`);
        this.size = 'md';
      }

      // Validate orientation
      const validOrientations: ('horizontal' | 'vertical')[] = ['horizontal', 'vertical'];
      if (!validOrientations.includes(this.orientation)) {
        console.warn(`AvaStepperComponent: Invalid orientation '${this.orientation}'. Defaulting to 'horizontal'.`);
        this.orientation = 'horizontal';
      }

      // Validate stepVariant
      const validVariants: ('default' | 'icon')[] = ['default', 'icon'];
      if (!validVariants.includes(this.stepVariant)) {
        console.warn(`AvaStepperComponent: Invalid stepVariant '${this.stepVariant}'. Defaulting to 'default'.`);
        this.stepVariant = 'default';
      }

      // Validate disabledSteps
      if (!Array.isArray(this.disabledSteps)) {
        console.warn('AvaStepperComponent: disabledSteps must be an array. Defaulting to empty array.');
        this.disabledSteps = [];
      }
    } catch (error) {
      console.error('AvaStepperComponent: Error in validateInputs', error);
    }
  }
}
