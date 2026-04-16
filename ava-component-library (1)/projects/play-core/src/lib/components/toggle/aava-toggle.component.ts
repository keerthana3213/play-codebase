import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  forwardRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg';
export type TogglePosition = 'left' | 'right';

@Component({
  selector: 'aava-toggle',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-toggle.component.html',
  styleUrls: ['./aava-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaToggleComponent),
      multi: true
    }
  ]
})
export class AavaToggleComponent implements ControlValueAccessor {
  @Input() size: ToggleSize = 'md';
  @Input() title = '';
  @Input() position: TogglePosition = 'left';
  @Input() disabled = false;
  @Input() animation = true;
  @Input() showIcons = false;
  @Input() uncheckedIcon = 'x';
  @Input() checkedIcon = 'check';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  @Input() required = false;
  @Input() name = '';
  @Input() ariaDescribedby: string | null = null;

  @Output() checkedChange = new EventEmitter<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<boolean>();

  /** internal state */
  @Input() checked = false;

  /** CVA callbacks */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: boolean) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => { };

  /**
   * Centralized function to emit toggle state changes.
   * Emits to both outputs: checkedChange and change
   */
  private emitToggleChange(value: boolean): void {
    this.checkedChange.emit(value);
    this.change.emit(value);
  }

  private readonly _uniqueId = `ava-toggle-${Math.random()
    .toString(36)
    .slice(2, 11)}`;

  constructor(private cdr: ChangeDetectorRef) {}

  // === ControlValueAccessor API ===
  writeValue(value: boolean): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // === User interactions ===
  /**
   * Toggles the checked state of the toggle switch.
   * Emits change events and updates form control value.
   */
  onToggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.emitToggleChange(this.checked);
  }

  /**
   * Handles label click events.
   * Prevents default behavior and stops event propagation to avoid double toggling.
   * @param event - The click event from the label
   */
  onLabelClick(event: Event): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.onToggle();
  }

  /**
   * Handles keyboard events for the toggle switch.
   * Supports Space and Enter keys to toggle the switch.
   * @param event - The keyboard event
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle();
    }
  }

  // === getters ===
  /**
   * Generates a unique ID for the label element based on position.
   * Ensures unique IDs even if both left and right labels exist in template.
   */
  get titleName(): string | null {
    if (!this.title) return null;
    return `${this._uniqueId}-label-${this.position}`;
  }

  get toggleId(): string {
    return this._uniqueId;
  }

  /**
   * Returns the appropriate icon size based on the toggle size.
   * @returns Icon size in pixels
   */
  getIconSize(): number {
    switch (this.size) {
      case 'xs':
        return 8;
      case 'sm':
        return 10;
      case 'md':
        return 12;
      case 'lg':
        return 14;
      default:
        return 12;
    }
  }

  /**
   * Returns the color for the checked icon.
   * @returns CSS color value
   */
  getCheckedIconColor(): string {
    return 'rgba(var(--rgb-brand-primary))';
  }

  /**
   * Returns the color for the unchecked icon.
   * @returns CSS color value
   */
  getUncheckedIconColor(): string {
    return 'color-mix(in srgb, rgba(var(--rgb-brand-primary)) 60%, var(--text-color-secondary, #666666))';
  }
}
