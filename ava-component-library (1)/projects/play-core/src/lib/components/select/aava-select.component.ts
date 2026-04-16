import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnInit,
  forwardRef,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AavaSelectOptionComponent } from './select-option/aava-select-option.component';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
import { Subscription } from 'rxjs';
export type SelectboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Interface for hierarchical select options
export interface SelectHierarchicalOption {
  value: any;
  label: string;
  parent?: boolean;
  children?: SelectHierarchicalOption[];
  disabled?: boolean;
  icon?: string;
}

// Interface for tracking expanded state
export type SelectExpandedState = Record<string, boolean>;
@Component({
  selector: 'aava-select',
  standalone: true,
  templateUrl: './aava-select.component.html',
  styleUrls: ['./aava-select.component.scss'],
  imports: [CommonModule, AavaIconComponent, AavaTextboxComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaSelectComponent
  implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy
{
  // Static registry to track all open dropdowns
  private static openDropdowns: AavaSelectComponent[] = [];
  private valueSetFromOutside = false;
  private focusTimeoutId?: number;
  private saveLabelsTimeoutId?: number;
  private positionTimeoutId?: number;
  private blurTimeoutId?: number;
  private tabTimeoutIds: number[] = [];
  private scrollTimeoutId?: number;

  // Register this dropdown as open
  private registerAsOpen(): void {
    AavaSelectComponent.openDropdowns.push(this);
  }

  // Unregister this dropdown as open
  private unregisterAsOpen(): void {
    const index = AavaSelectComponent.openDropdowns.indexOf(this);
    if (index > -1) {
      AavaSelectComponent.openDropdowns.splice(index, 1);
    }
  }

  // Close all other open dropdowns except this one
  private closeOtherDropdowns(): void {
    AavaSelectComponent.openDropdowns.forEach((dropdown) => {
      if (dropdown !== this && dropdown.isOpen) {
        if (!dropdown.defaultOpen) {
          dropdown.closeDropdown();
        }
      }
    });
  }

  @ViewChild('inputSearchElement') inputRef!: ElementRef<HTMLInputElement>;
  @Input() placeholder = 'Select';
  @Input() label = '';
  @Input() id = '';
  @Input() required = false;
  @Input() dropdownIcon = 'chevron-down';
  @Input() error = '';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() size: SelectboxSize = 'md';
  @Input() showSearch = true;
  @Input() inModal = false;
  @Input() mode: 'flyout' | 'normal' = 'flyout';
  @Input() removeSearchGap = false;
  defaultOpen = false;
  initialLoad = false;
  @Input() set expanded(isOpen: boolean) {
    if (isOpen) {
      if (this.mode === 'flyout') {
        this.isOpen = false;
        this.toggleDropdown();
      } else {
        this.initialLoad = true;
        this.defaultOpen = true;
      }
    }
  }

  @Input() set alwaysOpen(isOpen: boolean) {
    if (isOpen) {
      this.isOpen = false;
      this.toggleDropdown();
      this.openAlways = true;
    }
  }
  @Input() optionOnly = false;
  hideSelect = false;
  openAlways = false;
  requiredError = false;

  // Hierarchical select properties
  @Input() parent = false;
  @Input() child = false;
  @Input() hierarchicalOptions: SelectHierarchicalOption[] = [];
  @Input() customStyles: Record<string, string> = {};
  @Input() allText = 'All';
  @Input() allValue = 'all';

  displayText = this.placeholder;
  searchTerm = '';

  private originalLabels = new Map<AavaSelectOptionComponent, string>();
  private optionSubscriptions = new Map<AavaSelectOptionComponent, Subscription>();
  hasSearchedOptions = true;
  highlightedIndex = -1; // Track highlighted option for keyboard navigation
  private searchActive = false;
  selectedText = '';

  @ContentChildren(AavaSelectOptionComponent, { descendants: true })
  options!: QueryList<AavaSelectOptionComponent>;
  selectedValue: any[] = [];
  isOpen = false;
  private _inputId!: string;
  hasValue = true;
  @Output() selectionChange = new EventEmitter<any>();
  private scrollHandlers: Map<HTMLElement, () => void> | null = null;
  private animationFrameId?: number;
  private optionsChangesSubscription?: Subscription;
  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  @ViewChild('selectContainer') selectContainer!: ElementRef<HTMLElement>;

  onChange = (_: any) => {};
  onTouched = () => {};
  
  // ARIA-related properties
  private _listboxId!: string;
  private _searchInputId!: string;
  liveRegionMessage = '';

  ngOnInit(): void {
    this._inputId = `aava-select-${Math.random().toString(36).slice(2, 11)}`;
    this._listboxId = `${this._inputId}-listbox`;
    this._searchInputId = `${this._inputId}-search`;
  }

  get listboxId(): string {
    return this._listboxId;
  }

  get searchInputId(): string {
    return this._searchInputId;
  }

  get activeDescendant(): string | null {
    if (!this.isOpen || this.highlightedIndex < 0) return null;
    const visibleOptions = this.getVisibleOptions();
    if (this.highlightedIndex < visibleOptions.length) {
      const highlightedOption = visibleOptions[this.highlightedIndex];
      return highlightedOption.optionId;
    }
    return null;
  }

  ngAfterContentInit(): void {
    this.optionsChangesSubscription = this.options.changes.subscribe(() => {
      this.bindOptions();
    });
    Promise.resolve().then(() => {
      this.bindOptions();
    });
  }

  private saveOriginalLabels() {
    this.originalLabels.clear();

    // Clear any existing timeout
    if (this.saveLabelsTimeoutId) {
      clearTimeout(this.saveLabelsTimeoutId);
    }

    // Use setTimeout to ensure DOM is fully rendered
    this.saveLabelsTimeoutId = window.setTimeout(() => {
      this.options.forEach((opt) => {
        // Get the actual text content from the element
        const labelText = opt.elementRef.nativeElement.textContent?.trim() || '';
        this.originalLabels.set(opt, labelText.toLowerCase());
        // ensure initial visible state is set
        if (opt.visible === undefined) opt.visible = true;
      });

      this.cdr.markForCheck();
      this.saveLabelsTimeoutId = undefined;
    }, 0);
  }

  bindOptions() {
    // Cleanup old subscriptions first
    this.optionSubscriptions.forEach(sub => sub.unsubscribe());
    this.optionSubscriptions.clear();
    
    this.options.forEach((option, index) => {
      // Subscribe to option selection and store subscription
      const subscription = option.optionSelected.subscribe((val: any) => {
        this.selectValue(val);
        this.searchActive = false;

      });
      this.optionSubscriptions.set(option, subscription);

      // Initialize visibility to true for all options
      if (option.visible === undefined) {
        option.visible = true;
      }

      // Assign unique ID for ARIA purposes
      if (!option.optionId) {
        option.optionId = `${this._inputId}-option-${index}`;
      }
    });

    // Only apply [selected] fallback if no ngModel/formControl has set a value
    if (!this.valueSetFromOutside) {
      const defaultSelectedOptions = this.options.filter((opt) => opt.selected);
      if (defaultSelectedOptions.length > 0) {
        if (this.multiple) {
          this.selectedValue = defaultSelectedOptions.map((opt) => opt.value);
          this.onChange(this.selectedValue.join(','));
        } else {
          this.selectedValue = [defaultSelectedOptions[0].value];

          // Clear all selections first - no action needed
          // (option.selected = false; was commented out)

          // Set only the first one as selected
          defaultSelectedOptions[0].selected = true;
          this.onChange(defaultSelectedOptions[0].value);
        }
      }
    }
    this.updateSelectedStates();
    this.updateHasValue();
    this.saveOriginalLabels();

    this.cdr.markForCheck();
  }
  focus(): void {
    this.clearFocusTimeout(); // clear any previous timeout
    this.focusTimeoutId = window.setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
      this.focusTimeoutId = undefined; // clear after use
    });
    if (this.selectedValue.length === 0 && this.required) {
      this.requiredError = true;
    } else {
      this.requiredError = false;
    }
  }

  clearFocusTimeout(): void {
    if (this.focusTimeoutId) {
      clearTimeout(this.focusTimeoutId);
      this.focusTimeoutId = undefined;
    }
  }
  private updateDropdownPosition(): void {
    if (this.isOpen) {
      this.positionDropdown();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateDropdownPosition();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateDropdownPosition();
  }

  // Use a more robust approach to detect any scroll or layout changes
  private setupPositionObservers(): void {
    if (!this.isOpen) return;
    
    // Cancel any existing animation frame
    this.cancelPositionObserver();

    // Find all scrollable parents and add scroll listeners
    this.addScrollListenersToParents();

    // Use requestAnimationFrame as a fallback for any missed scroll events
    const updatePosition = () => {
      if (this.isOpen) {
        this.positionDropdown();
        this.animationFrameId = requestAnimationFrame(updatePosition);
      } else {
        this.animationFrameId = undefined;
      }
    };

    this.animationFrameId = requestAnimationFrame(updatePosition);
  }
  
  private cancelPositionObserver(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  private addScrollListenersToParents(): void {
    // Find all scrollable parent elements
    const scrollableParents = this.findScrollableParents();

    // Add scroll listeners to each scrollable parent
    scrollableParents.forEach((parent) => {
      const scrollHandler = () => this.updateDropdownPosition();
      parent.addEventListener('scroll', scrollHandler, { passive: true });

      // Store the handler for cleanup
      if (!this.scrollHandlers) {
        this.scrollHandlers = new Map();
      }
      this.scrollHandlers.set(parent, scrollHandler);
    });
  }

  private findScrollableParents(): HTMLElement[] {
    const scrollableParents: HTMLElement[] = [];
    let currentElement = this.elementRef.nativeElement.parentElement;

    while (currentElement && currentElement !== document.body) {
      const computedStyle = window.getComputedStyle(currentElement);
      const overflow =
        computedStyle.overflow +
        computedStyle.overflowY +
        computedStyle.overflowX;

      // Check if element is scrollable
      if (overflow.includes('scroll') || overflow.includes('auto')) {
        const hasScroll =
          currentElement.scrollHeight > currentElement.clientHeight ||
          currentElement.scrollWidth > currentElement.clientWidth;

        if (hasScroll) {
          scrollableParents.push(currentElement);
        }
      }

      currentElement = currentElement.parentElement;
    }

    // Also include window for global scroll
    scrollableParents.push(window as any);

    return scrollableParents;
  }

  private removeScrollListeners(): void {
    if (this.scrollHandlers) {
      this.scrollHandlers.forEach((handler, element) => {
        element.removeEventListener('scroll', handler);
      });
      this.scrollHandlers.clear();
    }
  }

  toggleDropdown() {
    if (this.defaultOpen) {
      this.defaultOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
    if (this.isOpen) {
      // Close all other dropdowns before opening this one
      this.closeOtherDropdowns();

      // Register this dropdown as open
      this.registerAsOpen();

      this.highlightedIndex = this.getSelectedOptionIndex();
      
      // Clear any existing timeout
      if (this.positionTimeoutId) {
        clearTimeout(this.positionTimeoutId);
      }
      
      this.positionTimeoutId = window.setTimeout(() => {
        this.positionDropdown();
        this.setupPositionObservers();
        this.positionTimeoutId = undefined;
      }, 0);
    } else {
      // Unregister this dropdown as closed
      this.unregisterAsOpen();
      this.highlightedIndex = -1;
    }
    this.updateHighlightedStates();
    this.focus();
    // Note: onTouched() is now called by the blur handler to properly manage form touched state
    this.cdr.detectChanges();
  }

  /**
   * Check if element or any parent has overflow that would clip the dropdown
   */
  private hasOverflowContainer(element: HTMLElement): boolean {
    let current: HTMLElement | null = element;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const overflowX = style.overflowX;
      const overflowY = style.overflowY;
      const overflow = style.overflow;
      
      // Check if any overflow property is set to auto, scroll, or hidden
      if (
        overflow === 'auto' ||
        overflow === 'scroll' ||
        overflow === 'hidden' ||
        overflowX === 'auto' ||
        overflowX === 'scroll' ||
        overflowX === 'hidden' ||
        overflowY === 'auto' ||
        overflowY === 'scroll' ||
        overflowY === 'hidden'
      ) {
        return true;
      }
      current = current.parentElement;
    }
    return false;
  }

  private positionDropdown(): void {
    if (!this.selectContainer) return;

    const selectElement = this.selectContainer.nativeElement;
    const selectRect = selectElement.getBoundingClientRect();
    const dropdown = this.elementRef.nativeElement.querySelector(
      '.aava-select-panel'
    ) as HTMLElement;

    if (!dropdown) return;

    const selectOptionContainer = this.elementRef.nativeElement.querySelector(
      '.select-option-container'
    ) as HTMLElement;

    if (!selectOptionContainer) return;

    const dropdownWidth = selectRect.width;
    const dropdownRect = dropdown.getBoundingClientRect();
    const dropdownHeight = dropdownRect.height || 200;

    const spaceBelow = window.innerHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;

    const shouldOpenUpward =
      (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) ||
      (spaceAbove > spaceBelow && spaceAbove > dropdownHeight + 50);

    // Check if we're inside a scrollable container
    const hasOverflow = this.hasOverflowContainer(selectElement);
    //const useFixedPosition = hasOverflow || this.mode === 'flyout';
    const useFixedPosition = hasOverflow ; 

    let finalTop: number;
    let finalLeft: number;
    const GAP_BETWEEN_TRIGGER_AND_PANEL = 4;

    if (useFixedPosition) {
      // Use viewport coordinates for fixed positioning
      if (shouldOpenUpward) {
        finalTop = selectRect.top - dropdownHeight - GAP_BETWEEN_TRIGGER_AND_PANEL;
      } else {
        finalTop = selectRect.bottom + GAP_BETWEEN_TRIGGER_AND_PANEL;
      }
      finalLeft = selectRect.left;
      
      this.renderer.setStyle(dropdown, 'position', 'fixed');
      this.renderer.setStyle(dropdown, 'top', `${finalTop}px`);
      this.renderer.setStyle(dropdown, 'left', `${finalLeft}px`);
    } else {
      // Use container-relative coordinates for absolute positioning
      const containerRect = selectOptionContainer.getBoundingClientRect();
      const selectTopRelative = selectRect.top - containerRect.top;
      const selectLeftRelative = selectRect.left - containerRect.left;
      const selectBottomRelative = selectTopRelative + selectRect.height;

      if (shouldOpenUpward) {
        finalTop = selectTopRelative - dropdownHeight - GAP_BETWEEN_TRIGGER_AND_PANEL;
      } else {
        finalTop = selectBottomRelative + GAP_BETWEEN_TRIGGER_AND_PANEL;
      }
      finalLeft = selectLeftRelative;

      if (this.mode === 'flyout') {
        this.renderer.setStyle(dropdown, 'position', 'absolute');
        this.renderer.setStyle(dropdown, 'top', `${finalTop}px`);
        this.renderer.setStyle(dropdown, 'left', `${finalLeft}px`);
      }
    }

    this.renderer.setStyle(dropdown, 'width', `${dropdownWidth}px`);
    this.renderer.setStyle(dropdown, 'z-index', '99999');

    if (shouldOpenUpward) {
      this.renderer.addClass(dropdown, 'select-dropdown-upward');
      
      setTimeout(() => {
        if (dropdown) {
          this.renderer.addClass(dropdown, 'animation-complete');
        }
      }, 500);
    } else {
      this.renderer.removeClass(dropdown, 'select-dropdown-upward');
      this.renderer.removeClass(dropdown, 'animation-complete');
    }
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  selectValue(val: any) {
    // Guard: if value is undefined/null, do nothing (e.g. button-style options with no [value])
    if (val === undefined || val === null) return;

    this.requiredError = false;
    if (this.multiple) {
      if (val?.toString() === this.allValue) {
        const exists = this.selectedValue.some((v) =>
          this.compare(v, this.allValue)
        );
        if (exists) {
          this.deSelectAll();
          this.selectedValue = [];
          this.markSelectedMultiple();
        } else {
          this.selectAll();
          this.selectedValue = [this.allValue];
          this.cdr.detectChanges();
        }
      } else {
        this.selectedValue = this.selectedValue.filter(
          (v) => v !== this.allValue
        );
        const exists = this.selectedValue.some((v) => this.compare(v, val));
        if (exists) {
          this.selectedValue = this.selectedValue.filter(
            (v) => !this.compare(v, val)
          );
        } else {
          // Store the value as-is (object or primitive)
          this.selectedValue = [...this.selectedValue, val];
        }
        this.markSelectedMultiple();
      }
      // Handle onChange for form integration
      if (this.selectedValue.length > 0 && typeof this.selectedValue[0] === 'object') {
        // For object values, emit the array directly
        this.onChange(this.selectedValue);
      } else {
        // For primitive values, join as comma-separated string
        this.onChange(this.selectedValue.join(','));
      }
      this.selectionChange.emit(this.selectedValue);
    } else {
      this.selectedValue = [val];
      this.markSelected(val);
      this.onChange(val);
      this.selectionChange.emit(val);
      if (!this.openAlways) this.isOpen = false;
    }

    this.updateHasValue();
    if (this.options) {
      this.options.forEach((option) => (option.visible = true));
    }
    this.onTouched();
    this.cdr.markForCheck();
  }
  private compare(a: any, b: any): boolean {
    // Handle object comparison
    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
      return this.isObjectEqual(a, b);
    }
    // Handle primitive comparison
    return a?.toString() === b?.toString();
  }

  writeValue(val: any): void {
    this.valueSetFromOutside = true;
    if (this.multiple) {
      this.selectedValue = Array.isArray(val)
        ? val
        : typeof val === 'string' && val.length > 0
        ? val.split(',').map((v) => v.trim())
        : [val];
      this.markSelectedMultiple();
    } else {
      this.selectedValue = val ? [val] : [];
      this.markSelected(val);
    }
    this.updateHasValue();
    this.cdr.markForCheck();
  }

  private markSelectedMultiple() {
    this.options?.forEach((option) => {
      option.selected = this.selectedValue.some((val) =>
        this.compare(val, option.value)
      );
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private markSelected(val: any) {
    this.options?.forEach((option) => {
      option.selected = option.value === val;
    });
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    // Check if click is outside this component
    if (!this.elementRef.nativeElement.contains(target)) {
      if (this.isOpen) {
        // Mark as touched when closing via outside click - ensures required validation
        // error shows when user opens select, interacts (e.g. with search), then clicks outside.
        // Blur may not fire on select container when focus was on search input.
        this.onTouched();
      }
      this.closeDropdown();
      this.initialLoad = false;
    }
  }

  /**
   * Handle blur event on the select container
   * This is called when focus leaves the select container element
   */
  onContainerBlur(event: FocusEvent): void {
    // Clear any existing timeout
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId);
    }
    
    // Use setTimeout to check focus state after blur event completes
    // This ensures we can accurately determine where focus moved
    this.blurTimeoutId = window.setTimeout(() => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      const activeElement = document.activeElement as HTMLElement;
      
      // Get the component root element
      const componentElement = this.elementRef.nativeElement;
      
      // If relatedTarget is null (Tab key or programmatic blur)
      // Check if current active element is outside the component
      if (relatedTarget === null) {
        // If active element is null or outside component, mark as touched
        if (!activeElement || !componentElement.contains(activeElement)) {
          this.onTouched();
        }
        this.blurTimeoutId = undefined;
        return;
      }
      
      // Check if focus is moving to an element inside this component
      // (e.g., search input or dropdown options)
      const isMovingInside = componentElement.contains(relatedTarget);
      
      // If focus is moving outside this component, mark as touched
      if (!isMovingInside) {
        this.onTouched();
      }
      this.blurTimeoutId = undefined;
    }, 0);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) {
      // Open dropdown with Enter or Space when closed
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleDropdown();
        return;
      }
      // Open dropdown and navigate with arrow keys
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.isOpen = true;
        this.highlightedIndex =
          event.key === 'ArrowDown' ? 0 : this.getVisibleOptionsCount() - 1;
        this.updateHighlightedStates();
        this.focus();
        return;
      }
      // Tab key - close dropdown and mark as touched
      if (event.key === 'Tab') {
        if (this.isOpen) {
          this.closeDropdown();
        }
        // Explicitly mark as touched when Tab is pressed (before blur fires)
        // This ensures touched state is set even if blur event doesn't fire properly
        const tabTimeoutId = window.setTimeout(() => {
          this.onTouched();
          this.tabTimeoutIds = this.tabTimeoutIds.filter(id => id !== tabTimeoutId);
        }, 0);
        this.tabTimeoutIds.push(tabTimeoutId);
      }
    }

    if (this.isOpen) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.navigateDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.navigateUp();
          break;
        case 'Enter':
          event.preventDefault();
           this.searchActive = false;
          this.selectHighlightedOption();
          break;
        case 'Escape':
          event.preventDefault();
          this.closeDropdown();
          break;
        case 'Tab': {
          this.closeDropdown();
          // Explicitly mark as touched when Tab is pressed (before blur fires)
          // This ensures touched state is set even if blur event doesn't fire properly
          const tabTimeoutId = window.setTimeout(() => {
            this.onTouched();
            this.tabTimeoutIds = this.tabTimeoutIds.filter(id => id !== tabTimeoutId);
          }, 0);
          this.tabTimeoutIds.push(tabTimeoutId);
          break;
        }
      }
    }
  }

  private updateHasValue(): void {
    this.hasValue = this.selectedValue.length > 0;
  }

  getDisplayText(): string {
    if (this.searchActive) {
      // When search is active, show selected text if available, otherwise show placeholder
      return this.selectedText || this.placeholder;
    }
    // Handle standard options (non-hierarchical)
    if (this.multiple && this.selectedValue.length) {
      // Check for "All" selection (only for primitive values)
      const selectedStrValues = this.selectedValue.map((v) => v?.toString());
      if (selectedStrValues.includes(this.allValue)) {
        return this.allText;
      }

      // Filter options based on whether values are objects or primitives
      this.selectedText = this.options
        .filter((option) => {
          if (option.value === undefined || option.value === null) return false;
          return this.selectedValue.some((selectedVal) => {
            if (selectedVal === undefined || selectedVal === null) return false;
            // Handle object comparison
            if (typeof selectedVal === 'object') {
              return this.isObjectEqual(option.value, selectedVal);
            }
            // Handle primitive comparison
            return option.value?.toString() === selectedVal?.toString();
          });
        })
        .map((option) => option.elementRef.nativeElement.textContent.trim())
        .join(', ');
      return this.selectedText;
    }

    if (!this.multiple && this.selectedValue.length) {
      const firstVal = this.selectedValue[0];
      // If the stored value is undefined/null, show placeholder
      if (firstVal === undefined || firstVal === null) {
        return this.placeholder;
      }
      let selected;
      if (typeof firstVal === 'object') {
        selected = this.options.find(opt =>
          this.isObjectEqual(opt.value, firstVal)
        );
      } else {
        selected = this.options.find(
          (opt) => opt.value != null && opt.value?.toString() === firstVal?.toString()
        );
      }
      this.selectedText =
        selected?.elementRef.nativeElement.textContent.trim() ||
        this.placeholder;
      return this.selectedText;
    }

    return this.placeholder;
  }

  private updateSelectedStates() {
    if (!this.options) return;
    if (this.multiple) {
      this.markSelectedMultiple();
    } else {
      this.options.forEach((option) => {
        option.selected =
          this.selectedValue.length > 0 &&
          option.value != null &&
          this.compare(option.value, this.selectedValue[0]);
      });
    }
    this.cdr.markForCheck();
  }

  get inputId(): string {
    return this.id ?? this._inputId;
  }

  get hasError(): boolean {
    return !!this.error;
  }
  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get inputClasses(): string {
    const classes = ['aava-select__input'];
    if (this.hasError) classes.push('aava-select__input--error');
    if (this.disabled) classes.push('aava-select__input--disabled');
    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = [];
    if (this.hasError) classes.push('aava-select--error');
    if (this.disabled) classes.push('aava-select--disabled');

    return [...classes].join(' ');
  }

  // onSearchChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   this.searchTerm = input.value.toLowerCase();
  //   this.options.forEach(option => {
  //     const label = option.label.toLowerCase();
  //     option.visible = !this.searchTerm || label.includes(this.searchTerm);
  //   });
  //   this.hasSearchedOptions = this.options.some((option) => option.visible);

  //   // Reset highlighted index when search changes
  //   this.highlightedIndex = 0;
  //   this.updateHighlightedStates();
  //   this.cdr.markForCheck();
  //   console.log("o", this.options)
  // }
  onSearchChange(event: Event) {
    const term = ((event.target as HTMLInputElement).value || '')
      .trim()
      .toLowerCase();
    this.searchTerm = term;

    // Set searchActive to true only if there's actual search text
    this.searchActive = term.length > 0;

    this.options.forEach((opt) => {
      // Get the stored lowercase label or fallback to getting it directly
      const label = this.originalLabels.get(opt) ??
        (opt.elementRef.nativeElement.textContent?.trim().toLowerCase() || '');
      const isVisible = !term || label.includes(term);
      opt.visible = isVisible;

      // Trigger change detection on the option component
      (opt as any).cdr?.markForCheck();
    });

    this.hasSearchedOptions = this.options.some((opt) => opt.visible);
    
    // Announce search results count for screen readers
    const visibleCount = this.options.filter((opt) => opt.visible).length;
    if (term.length > 0) {
      this.liveRegionMessage = visibleCount === 0 
        ? 'No options found' 
        : `${visibleCount} option${visibleCount !== 1 ? 's' : ''} available`;
    } else {
      this.liveRegionMessage = '';
    }
    
    this.highlightedIndex = 0;
    this.updateHighlightedStates();
    this.cdr.markForCheck();
  }

  // Keyboard navigation helper methods
  private navigateDown() {
    const visibleOptions = this.getVisibleOptions();
    if (visibleOptions.length === 0) return;

    this.highlightedIndex = (this.highlightedIndex + 1) % visibleOptions.length;
    this.updateHighlightedStates();
    this.scrollToHighlightedOption();
  }

  private navigateUp() {
    const visibleOptions = this.getVisibleOptions();
    if (visibleOptions.length === 0) return;

    this.highlightedIndex =
      this.highlightedIndex <= 0
        ? visibleOptions.length - 1
        : this.highlightedIndex - 1;
    this.updateHighlightedStates();
    this.scrollToHighlightedOption();
  }

  private selectHighlightedOption() {
    const visibleOptions = this.getVisibleOptions();
    if (
      this.highlightedIndex >= 0 &&
      this.highlightedIndex < visibleOptions.length
    ) {
      const highlightedOption = visibleOptions[this.highlightedIndex];
      this.selectValue(highlightedOption.value);
    }
  }

  private closeDropdown() {
    if (!this.initialLoad && this.mode === 'normal') {
      this.defaultOpen = false;
    } else if (this.mode === 'flyout') {
      this.defaultOpen = false;
    } else if (!this.inModal && this.mode === 'normal') {
      this.defaultOpen = false;
    }
    if (!this.openAlways) {
      this.isOpen = false;
      this.highlightedIndex = -1;
      this.searchTerm = ''; // Clear the search term
      this.searchActive = false; // Reset search active state

      // Reset all options visibility when closing
      if (this.options) {
        this.options.forEach((option) => (option.visible = true));
      }

      this.hasSearchedOptions = true;
      this.unregisterAsOpen();
      this.removeScrollListeners();
      this.cancelPositionObserver();
      this.updateHighlightedStates();
      this.cdr.markForCheck();
    }
  }

  private getVisibleOptions(): AavaSelectOptionComponent[] {
    return this.options?.filter((option) => option.visible) || [];
  }

  private getVisibleOptionsCount(): number {
    return this.getVisibleOptions().length;
  }

  private getSelectedOptionIndex(): number {
    if (!this.selectedValue.length) return -1;

    const visibleOptions = this.getVisibleOptions();
    const selectedValue = this.selectedValue[0];

    const index = visibleOptions.findIndex(
      (option) => this.compare(option.value, selectedValue)
    );

    // If the option is found but has noSelected set, don't use it for initial highlight
    if (index >= 0 && visibleOptions[index].noSelected) {
      return -1;
    }

    return index >= 0 ? index : 0;
  }

  private scrollToHighlightedOption() {
    // Clear any existing timeout
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }
    
    // Scroll the highlighted option into view if needed
    this.scrollTimeoutId = window.setTimeout(() => {
      // Query within component's element to avoid selecting wrong panel
      const panel = this.elementRef.nativeElement.querySelector('.aava-select-panel') as HTMLElement;
      const highlightedElement = panel?.querySelector('.option.highlighted') as HTMLElement;

      if (panel && highlightedElement) {
        const panelRect = panel.getBoundingClientRect();
        const optionRect = highlightedElement.getBoundingClientRect();

        if (optionRect.bottom > panelRect.bottom) {
          panel.scrollTop += optionRect.bottom - panelRect.bottom + 5;
        } else if (optionRect.top < panelRect.top) {
          panel.scrollTop -= panelRect.top - optionRect.top + 5;
        }
      }
      this.scrollTimeoutId = undefined;
    });
  }

  // Update highlighted states for all options
  private updateHighlightedStates() {
    const visibleOptions = this.getVisibleOptions();
    this.options?.forEach((option) => {
      const visibleIndex = visibleOptions.findIndex(
        (visibleOption) => visibleOption === option
      );
      option.highlighted =
        visibleIndex === this.highlightedIndex && this.isOpen;
    });
    this.cdr.markForCheck();
  }

  /** Get icon size based on tag size */
  get getIconSize(): number {
    switch (this.size) {
      case 'xs':
        return 12;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      case 'xl':
        return 24;
      default:
        return 12;
    }
  }

  /** Get search icon size based on tag size */
  get getSearchIconSize(): number {
    switch (this.size) {
      case 'xs':
        return 12;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      case 'xl':
        return 24;
      default:
        return 20;
    }
  }
  ngOnDestroy(): void {
    // Cleanup all timeouts
    if (this.focusTimeoutId) {
      clearTimeout(this.focusTimeoutId);
    }
    if (this.saveLabelsTimeoutId) {
      clearTimeout(this.saveLabelsTimeoutId);
    }
    if (this.positionTimeoutId) {
      clearTimeout(this.positionTimeoutId);
    }
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId);
    }
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }
    // Cleanup tab timeout IDs
    this.tabTimeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    this.tabTimeoutIds = [];
    
    // Cleanup option subscriptions
    this.optionSubscriptions.forEach(sub => sub.unsubscribe());
    this.optionSubscriptions.clear();
    
    // Cleanup options changes subscription
    this.optionsChangesSubscription?.unsubscribe();
    
    // Cancel animation frame loop
    this.cancelPositionObserver();
    
    this.removeScrollListeners();
    this.unregisterAsOpen();
  }
  checkAllSelectedExceptAll(): boolean {
    const nonAllOptions = this.options.filter(
      (opt) => opt.value !== this.allValue
    );
   
    return (
      nonAllOptions.length > 0 && nonAllOptions.every((opt) => opt.selected)
    );
  }

  selectAll(): void {
    this.options.forEach((option) => {
      option.selected = true;
    });
    this.cdr.detectChanges();
  }
  deSelectAll(): void {
    this.options.forEach((option) => {
      option.selected = false;
    });
  }

    isObjectEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]);
  }
}
