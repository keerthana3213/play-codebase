import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
import { AavaTagComponent } from '../tags/aava-tags.component';
import { Observable, isObservable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap, startWith, map } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface AavaAutocompleteOption {
  label: string;
  value: string;
  icon?: string;
  group?: string;
  [key: string]: string | boolean | number | undefined;
}

@Component({
  selector: 'aava-autocomplete',
  standalone: true,
  imports: [CommonModule, AavaTextboxComponent, AavaTagComponent, AavaIconComponent],
  templateUrl: './aava-autocomplete.component.html',
  styleUrl: './aava-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AavaAutocompleteComponent,
      multi: true,
    },
  ],
})
export class AavaAutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private _options:
    | AavaAutocompleteOption[]
    | Observable<AavaAutocompleteOption[]> = [];

  @Input()
  set options(
    value:
      | AavaAutocompleteOption[]
      | Observable<AavaAutocompleteOption[]>
      | Record<string, unknown>[]
  ) {
    if (!value) {
      this._options = [];
      return;
    }

    // Handle Observable - store as-is
    if (isObservable(value)) {
      this._options = value;
      return;
    }

    // Handle array - always map using labelKey and valueKey
    if (Array.isArray(value)) {
      if (value.length === 0) {
        this._options = [];
        return;
      }

      // Always map using the specified keys (defaults to 'label' and 'value')
      this._options = (value as Record<string, unknown>[]).map((item) =>
        this.mapToInternal(item)
      );
    }
  }

  get options():
    | AavaAutocompleteOption[]
    | Observable<AavaAutocompleteOption[]> {
    return this._options;
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() error = '';
  @Input() helper = '';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() clearable = true;
  @Input() closeButton = false;
  @Input() minLength = 1;
  @Input() maxOptions = 10;
  @Input() noResultsText = 'No results found';
  @Input() debounce = 200;
  @Input() optionTemplate?: TemplateRef<unknown>;
  @Input() multi = false;
  @Input() fullWidth = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() name = '';
  @Input() id = '';
  @Input() ariaLabel = '';
  @Input() ariaLabelledby = '';
  @Input() ariaDescribedby = '';
  @Input() showDefaultOptions = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() labelKey = 'label';
  @Input() valueKey = 'value';
  @Input() contentType: 'json' | 'normal' = 'json';
  @Input() hideFlyout = true;

  /** Props forwarded to ava-tag for multi-select customization */
  @Input() tagColor?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'custom';
  @Input() tagVariant?: 'filled' | 'outlined';
  @Input() tagSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input() tagPill?: boolean;
  @Input() tagRemovable?: boolean;
  @Input() tagDisabled?: boolean;
  @Input() tagIcon?: string;
  @Input() tagIconPosition?: 'start' | 'end';
  @Input() tagAvatar?: string;
  @Input() tagCustomStyle?: Record<string, string>;
  @Input() tagCustomClass?: string;
  @Input() tagIconColor?: string;


  /** Start icon for the input field */
  @Input() startIcon = '';
  @Input() startIconColor = '';
  @Input() startIconSize = '16px';

  /** Custom styles for the component */
  @Input() customStyles: Record<string, string> = {};

  @Output() optionSelected = new EventEmitter<AavaAutocompleteOption>();
  @Output() valueChange = new EventEmitter<string | string[]>();
  @Output() cleared = new EventEmitter<void>();

  @ViewChild('textboxRef', { static: true }) textboxRef!: AavaTextboxComponent;

  query = '';
  filteredOptions: AavaAutocompleteOption[] = [];
  showDropdown = false;
  highlightedIndex = 0;
  selectedOptions: AavaAutocompleteOption[] = [];
  loadingState = false;
  private isUpdatingProgrammatically = false;

  private input$ = new Subject<string>();
  private subscription?: Subscription;
  private blurTimeout?: number;
  private updateTimeout?: number;
  private readonly _uniqueId = `autocomplete-${Math.random().toString(36).slice(2, 11)}`;

  get dropdownId(): string {
    return `${this._uniqueId}-list`;
  }

  getOptionId(index: number): string {
    return `${this._uniqueId}-option-${index}`;
  }

  // ControlValueAccessor implementation
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: unknown) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  get showCloseButton(): boolean {
    return this.closeButton && this.query.trim().length > 0;
  }

  ngOnInit() {
    this.subscription = this.input$
      .pipe(
        startWith(this.query),
        debounceTime(this.debounce),
        switchMap((query) => this.getOptions(query))
      )
      .subscribe((options) => {
        this.filteredOptions = options.slice(0, this.maxOptions);
        this.loadingState = false;
        // Reset highlighted index and ensure it's within bounds
        this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.input$.complete();
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }

  getOptions(query: string): Observable<AavaAutocompleteOption[]> {
    if (this.loading) {
      this.loadingState = true;
    }
    if (isObservable(this.options)) {
      return (this.options as Observable<AavaAutocompleteOption[]>).pipe(
        map((opts) => this.filterOptions(opts, query))
      );
    } else {
      return of(
        this.filterOptions(this.options as AavaAutocompleteOption[], query)
      );
    }
  }

  filterOptions(
    options: AavaAutocompleteOption[],
    query: string
  ): AavaAutocompleteOption[] {
    if (!query) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Skip processing if we're updating programmatically
    if (this.isUpdatingProgrammatically) {
      return;
    }

    this.query = value;
    this.input$.next(value);
    this.valueChange.emit(value);
    this.onChange(
      this.multi ? this.selectedOptions.map((o) => o.value) : value
    );

    // Show dropdown if we have enough characters and options
    const hasMinLength = value.length >= this.minLength;
    const hasOptions = this.contentType === 'normal' || this.filteredOptions.length > 0;
    this.showDropdown = hasMinLength && hasOptions;



    // Reset highlighted index when typing
    if (hasMinLength) {
      this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
    }
  }

  onFocus() {
    if (this.showDefaultOptions) {
      // Show all options if showDefaultOptions is true and query is empty
      this.input$.next('');
      this.showDropdown = true;
    } else if (this.query.length >= this.minLength && (this.contentType === 'normal' || this.filteredOptions.length)) {
      this.showDropdown = true;
    }
  }

  onBlur() {
    // Clear any existing timeout
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    // Use a longer delay to prevent interference with option selection
    this.blurTimeout = window.setTimeout(() => {
      this.showDropdown = false;
      this.onTouched();
      this.cdr.markForCheck();
      this.blurTimeout = undefined;
    }, 200);
  }

  onOptionClick(option: AavaAutocompleteOption) {
    if (this.multi) {
      if (!this.selectedOptions.find((o) => o.value === option.value)) {
        this.selectedOptions.push(option);
        this.valueChange.emit(this.selectedOptions.map((o) => o.value));
        this.onChange(this.selectedOptions.map((o) => o.value));
      }
      this.query = '';
      this.input$.next('');
    } else {
      // Set flag to prevent onInput interference
      this.isUpdatingProgrammatically = true;

      // For single select, update the query to show the selected option label
      this.query = option.label;

      // Emit the option value (not the label)
      this.valueChange.emit(option.value);
      this.onChange(option.value);

      // Hide dropdown after selection
      this.showDropdown = false;

      // Clear any existing timeout
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      // Reset flag after a short delay to allow UI update
      this.updateTimeout = window.setTimeout(() => {
        this.isUpdatingProgrammatically = false;
        this.updateTimeout = undefined;
      }, 100);
    }

    // Emit the selected option
    this.optionSelected.emit(option);

    // Force change detection to ensure UI updates
    this.cdr.detectChanges();
  }

  /** 
   * Public method for Normal Mode. 
   * Updates the textbox, closes the dropdown, and notifies the form of the selection.
   */
  select(label: string, value?: unknown) {
    this.isUpdatingProgrammatically = true;
    this.query = label;
    this.showDropdown = false;

    // Notify the form and parent of the change
    const finalValue = value ?? label;
    this.onChange(finalValue);
    this.valueChange.emit(label);
    this.optionSelected.emit(value && typeof value === 'object' ? (value as AavaAutocompleteOption) : { label, value: String(finalValue) });

    // Reset flag after UI update to prevent search from re-triggering
    setTimeout(() => {
      this.isUpdatingProgrammatically = false;
    }, 150);

    this.cdr.markForCheck();
  }

  onClear() {
    this.query = '';
    this.selectedOptions = [];
    this.input$.next('');
    this.onChange(this.multi ? [] : '');
    this.cleared.emit();
    this.valueChange.emit(this.multi ? [] : '');
    this.cdr.markForCheck();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      // Close dropdown when tabbing away
      this.showDropdown = false;
      this.onTouched();
      return; // Allow default Tab behavior
    }

    if (!this.showDropdown || (this.contentType === 'json' && this.filteredOptions.length === 0)) return;

    if (event.key === 'ArrowDown') {
      this.highlightedIndex =
        (this.highlightedIndex + 1) % this.filteredOptions.length;
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.highlightedIndex =
        (this.highlightedIndex - 1 + this.filteredOptions.length) %
        this.filteredOptions.length;
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (this.highlightedIndex >= 0 && this.filteredOptions[this.highlightedIndex]) {
        this.onOptionClick(this.filteredOptions[this.highlightedIndex]);
      }
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.showDropdown = false;
      event.preventDefault();
    }
  }

  get activeDescendantId(): string | null {
    if (!this.showDropdown || (this.contentType === 'json' && this.filteredOptions.length === 0)) {
      return null;
    }
    // Validate that highlightedIndex is within bounds
    const validIndex = Math.max(0, Math.min(this.highlightedIndex, this.filteredOptions.length - 1));
    return this.getOptionId(validIndex);
  }

  trackByValue(_index: number, option: AavaAutocompleteOption) {
    return option.value;
  }

  removeSelectedOption(opt: AavaAutocompleteOption) {
    this.selectedOptions = this.selectedOptions.filter(
      (o) => o.value !== opt.value
    );
    this.valueChange.emit(this.selectedOptions.map((o) => o.value));
    this.onChange(this.selectedOptions.map((o) => o.value));
    this.cdr.markForCheck();
  }

  // ControlValueAccessor implementation
  writeValue(value: unknown): void {
    if (this.multi) {
      this.selectedOptions = Array.isArray(value)
        ? this.optionsArrayToSelected(value as unknown[])
        : [];
      this.query = '';
    } else {
      // For single select, find the option label that matches the value
      if (typeof value === 'string' && value) {
        // Handle Observable options: cannot resolve label synchronously
        if (isObservable(this.options)) {
          // For Observable options, show value as placeholder
          // Label will be resolved when options load and user interacts
          this.query = value;
        } else {
          // For array options, find and display the label
          const options = Array.isArray(this.options) ? this.options : [];
          const selectedOption = options.find((opt) => opt.value === value);
          this.query = selectedOption ? selectedOption.label : value;
        }
      } else {
        this.query = '';
      }
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Helper for multi-select
  private optionsArrayToSelected(values: unknown[]): AavaAutocompleteOption[] {
    // Handle Observable options: cannot resolve synchronously
    if (isObservable(this.options)) {
      // Return empty array - options will need to be resolved when Observable emits
      // This is a limitation: initial values won't work with Observable options
      return [];
    }
    const opts = Array.isArray(this.options) ? this.options : [];
    return opts.filter((opt) => values.includes(opt.value));
  }

  private mapToInternal(item: Record<string, unknown>): AavaAutocompleteOption {
    return {
      label: String(item[this.labelKey] ?? ''),
      value: String(item[this.valueKey] ?? ''),
      ...item // spread entire object so user props remain available
    };
  }
}
