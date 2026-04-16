import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef, forwardRef, ChangeDetectorRef, SimpleChanges, OnChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaCheckboxComponent } from '../checkbox/aava-checkbox.component';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface DropdownOption {
  name: string;
  value: string | number;
  icon?: string; // Optional icon for the option
  disabled?: boolean; // Optional disabled state for individual options
}

@Component({
  selector: 'aava-dropdown',
  imports: [CommonModule, FormsModule, AavaCheckboxComponent, AavaIconComponent],
  templateUrl: './aava-dropdown.component.html',
  styleUrls: ['./../../styles/tokens/components/_dropdown.css','./aava-dropdown.component.scss'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush, // Temporarily disabled for debugging
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaDropdownComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AavaDropdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dropdownTitle: string = 'Select a Category';
  @Input() options: DropdownOption[] = [];
  @Input() suboptions: { [key: string]: DropdownOption[] } = {};
  @Input() checkboxOptions: string[] = [];
  @Input() iconOptions: string[] = [];
  @Input() search: boolean = false;
  @Input() enableSearch: boolean = false;
  @Input() selectedValue: string = '';
  @Input() selectedValues: string[] = []; // Array of pre-selected values
  @Input() singleSelect: boolean = false;
  @Input() width: string = ''; // Fixed width for dropdown
  @Input() dropdownIcon: string = 'chevron-down'; // Icon for dropdown toggle
  @Input() disabled: boolean = false; // Disable entire dropdown
  @Input() label: string = ''; // Label to display above dropdown
  @Input() required: boolean = false; // Whether field is required
  @Input() error: string = ''; // Custom error message to display
  showCustomError: boolean = false
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() selectionChange = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();

  isOpen = false;
  searchTerm = '';
  selectedOptions: DropdownOption[] = [];
  filteredOptions: DropdownOption[] = [];
  expandedOption: string | null = null;

  // Validation properties
  showValidationError = false;
  hasBeenTouched = false;

  // Keyboard navigation properties
  focusedOptionIndex = -1;
  focusedSubOptionIndex = -1;
  isNavigatingSubOptions = false;
  private pendingSelectedValue: string | null = null;

  // Static property to track all dropdown instances
  private static allDropdowns: AavaDropdownComponent[] = [];

  value = '';
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    // Add this instance to the static array
    AavaDropdownComponent.allDropdowns.push(this);
  }
  // ControlValueAccessor 
  private onChange = (value: any) => { };
  private onTouched = () => { };

  // Required by ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
    // Optional: update internal state/UI if needed
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  //

  checkForError() {
    this.showValidationError = this.required && !this.selectedValue;
  }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && changes['options'].currentValue) {
      this.filteredOptions = [...this.options];
      // Reset search term when options change
      this.searchTerm = '';
      // Trigger change detection to ensure UI updates
      this.cdr.detectChanges();

      // After options are loaded, try to set the selected value
      if (this.selectedValue) {
        this.updateSelectedOptionsFromValue(this.selectedValue);
      }

      // Also try to set any pending selected value
      if (this.pendingSelectedValue) {
        this.updateSelectedOptionsFromValue(this.pendingSelectedValue);
        this.pendingSelectedValue = null;
      }
      this.handleValidation();
    }

    // Handle selectedValue changes
    if (changes['selectedValue'] && changes['selectedValue'].currentValue !== undefined) {
      this.updateSelectedOptionsFromValue(changes['selectedValue'].currentValue);
      this.handleValidation();
    }

    // Handle selectedValues array changes
    if (changes['selectedValues']) {
      // Always update, even if the array is empty (currentValue could be [])
      const newSelectedValues = changes['selectedValues'].currentValue || [];
      this.updateSelectedOptionsFromValues(newSelectedValues);
      this.handleValidation();
    }
  }


  ngOnDestroy() {
    // Remove this instance from the static array
    const index = AavaDropdownComponent.allDropdowns.indexOf(this);
    if (index > -1) {
      AavaDropdownComponent.allDropdowns.splice(index, 1);
    }
  }

  // Static method to close all other dropdowns except the current one
  private static closeAllDropdownsExcept(currentDropdown: AavaDropdownComponent) {
    AavaDropdownComponent.allDropdowns.forEach(dropdown => {
      if (dropdown !== currentDropdown && dropdown.isOpen) {
        dropdown.isOpen = false;
        dropdown.expandedOption = null;
        dropdown.resetFocusStates();
        // Trigger change detection for the closed dropdown
        dropdown.cdr.detectChanges();
      }
    });
  }

  toggleDropdown() {
    // Don't toggle if dropdown is disabled
    if (this.disabled) {
      return;
    }

    if (this.isOpen) {
      // Closing dropdown
      this.isOpen = false;
      this.expandedOption = null;
      this.resetFocusStates();
      this.handleValidation();
    } else {
      // Opening dropdown - this will automatically close others
      AavaDropdownComponent.closeAllDropdownsExcept(this);
      this.isOpen = true;
      this.hasBeenTouched = true;
    }
  }

  closeDropdown() {
    this.isOpen = false;
    this.searchTerm = '';
    this.filteredOptions = [...this.options];
    this.expandedOption = null;
    this.resetFocusStates();
    this.handleValidation();
  }

  private handleValidation() {
    // Handle validation error
    if (this.required && this.hasBeenTouched) {
      this.showValidationError = this.selectedOptions.length === 0;
    }

    // Handle custom error
    if (this.error && this.hasBeenTouched) {
      this.showCustomError = this.selectedOptions.length === 0;
    } else {
      this.showCustomError = false;
    }
  }

  private clearValidationError() {
    this.showValidationError = false;
  }

  private resetFocusStates() {
    this.focusedOptionIndex = -1;
    this.focusedSubOptionIndex = -1;
    this.isNavigatingSubOptions = false;
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredOptions = [...this.options];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter(option => {
      // Check if main option matches
      const mainOptionMatches = option.name.toLowerCase().includes(searchLower);

      // Check if any sub-option matches
      const subOptionsMatch = this.suboptions[option.name]?.some(subOption =>
        subOption.name.toLowerCase().includes(searchLower)
      ) || false;

      return mainOptionMatches || subOptionsMatch;
    });
  }

  selectOption(option: DropdownOption) {
    // Don't select if option is disabled or dropdown is disabled
    if (option.disabled || this.disabled) {
      return;
    }

    if (this.checkboxOptions.includes(option.name)) {
      this.handleCheckboxSelection(option);
    } else {
      this.selectedOptions = [option];
      this.selectedValue = option.name;
      // Close dropdown for single select options and reset expanded state
      this.isOpen = false;
      this.expandedOption = null;
      this.clearValidationError();
      this.clearCustomError(); // Clear custom error
      this.emitChanges();
    }

    this.value = this.selectedValue;
    this.onChange(this.selectedValue);
    this.onTouched();
  }

  handleCheckboxSelection(option: DropdownOption) {
    // Don't handle if option is disabled
    if (option.disabled) {
      return;
    }

    const index = this.selectedOptions.findIndex(opt => opt.value === option.value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      if (this.singleSelect) {
        this.selectedOptions = [option];
      } else {
        this.selectedOptions.push(option);
      }
    }

    // Clear validation error if we have selections
    if (this.selectedOptions.length > 0) {
      this.clearValidationError();
      this.clearCustomError();
    }

    this.emitChanges();
  }

  selectSubOption(subOption: DropdownOption) {
    // Don't select if sub-option is disabled or dropdown is disabled
    if (subOption.disabled || this.disabled) {
      return;
    }

    // Treat sub-option selection like regular option selection
    this.selectedOptions = [subOption];
    this.selectedValue = subOption.name;
    // Close dropdown after selecting sub-option
    this.isOpen = false;
    this.expandedOption = null;
    this.clearValidationError();
    this.clearCustomError();
    this.emitChanges();
  }

  clearCustomError() {
    this.showCustomError = false;
  }




  toggleSubOptions(optionName: string) {
    // Don't toggle if dropdown is disabled
    if (this.disabled) {
      return;
    }

    // If clicking the same option, close it; otherwise, open the new one
    this.expandedOption = this.expandedOption === optionName ? null : optionName;
  }

  isOptionSelected(option: DropdownOption): boolean {
    return this.selectedOptions.some(opt => opt.value === option.value);
  }

  isSubOptionSelected(subOption: DropdownOption): boolean {
    return this.selectedOptions.some(opt => opt.value === subOption.value);
  }

  hasSubOptions(optionName: string): boolean {
    return !!(this.suboptions[optionName] && this.suboptions[optionName].length > 0);
  }

  getOptionIcon(option: DropdownOption): string {
    // If option has a custom icon, use it
    if (option.icon) {
      return option.icon;
    }
    // Otherwise, use the default icon for options in iconOptions array
    return 'circle-check';
  }

  shouldShowIcon(option: DropdownOption): boolean {
    // Show icon if option has custom icon or if it's in iconOptions array
    return !!(option.icon || this.iconOptions.includes(option.name));
  }

  isOptionDisabled(option: DropdownOption): boolean {
    return !!(option.disabled || this.disabled);
  }

  isSubOptionDisabled(subOption: DropdownOption): boolean {
    return !!(subOption.disabled || this.disabled);
  }

  getDisplayText(): string {
    if (this.options.length === 0)
      return this.dropdownTitle;
    if (this.selectedOptions.length === 0) {
      return this.dropdownTitle;
    }
    if (this.selectedOptions.length === 1) {
      return this.selectedOptions[0].name;
    }
    // Display all selected option names separated by commas
    return this.selectedOptions.map(option => option.name).join(', ');
  }

  private updateSelectedOptionsFromValue(selectedValue: string): void {
    // If options are not loaded yet, store the value to set later
    if (!this.options || this.options.length === 0) {
      this.pendingSelectedValue = selectedValue;
      return;
    }

    // Handle empty string - clear selection
    if (selectedValue === '') {
      this.selectedOptions = [];
      this.selectedValue = '';
      return;
    }

    // Find the option that matches the selectedValue (by name)
    const selectedOption = this.options.find(option => option.name === selectedValue);
    if (selectedOption) {
      this.selectedOptions = [selectedOption];
      this.selectedValue = selectedOption.name;
    } else {
    }
  }

  private updateSelectedOptionsFromValues(selectedValues: string[]): void {
    // If options are not loaded yet, return
    if (!this.options || this.options.length === 0) {
      return;
    }

    // Find all options that match the selectedValues (by name)
    const matchedOptions = this.options.filter(option =>
      selectedValues.includes(option.name)
    );

    if (matchedOptions.length > 0) {
      this.selectedOptions = matchedOptions;
      this.selectedValue = matchedOptions.map(opt => opt.name).join(', ');
    } else {
      this.selectedOptions = [];
    }
  }

  emitChanges() {
    const data = {
      selectedOptions: this.selectedOptions,
      selectedValue: this.selectedValue,
      selectedValues: this.selectedOptions.map(option => option.value), // Array of selected values
      selectedNames: this.selectedOptions.map(option => option.name)    // Array of selected names
    };
    this.selectionChange.emit(data);
    this.valueChange.emit(data);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedDropdown = target.closest('ava-dropdown');

    // If clicked outside this dropdown, close it
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeDropdown();
    }

    // If a dropdown toggle was clicked, close all other dropdowns
    if (clickedDropdown && target.closest('.dropdown-toggle')) {
      AavaDropdownComponent.allDropdowns.forEach(dropdown => {
        if (dropdown.elementRef.nativeElement !== clickedDropdown && dropdown.isOpen) {
          dropdown.isOpen = false;
          dropdown.expandedOption = null;
          dropdown.resetFocusStates();
          dropdown.cdr.detectChanges();
        }
      });
    }
  }

  // Close dropdown when clicking on the toggle button while open
  onToggleClick(event: Event) {
    event.stopPropagation();
    this.onTouched();
    this.toggleDropdown();

  }

  // Keyboard navigation methods
  onToggleKeyDown(event: KeyboardEvent) {
    const actions: Record<string, () => void> = {
      'Enter': () => this.handleToggleActivation(),
      ' ': () => this.handleToggleActivation(),
      'ArrowDown': () => this.openAndFocus('first'),
      'ArrowUp': () => this.openAndFocus('last'),
      'Escape': () => this.isOpen && this.closeDropdown()
    };

    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  onDropdownKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    const actions: Record<string, () => void> = {
      'Escape': () => { this.closeDropdown(); this.focusToggle(); },
      'Tab': () => this.closeDropdown()
    };

    const action = actions[event.key];
    if (action) {
      if (event.key !== 'Tab') event.preventDefault();
      action();
    }
  }

  onSearchKeyDown(event: KeyboardEvent) {
    const actions: Record<string, () => void> = {
      'ArrowDown': () => {
        if (this.filteredOptions.length > 0) {
          this.focusOption(0);
        }
      },
      'ArrowUp': () => {
        if (this.filteredOptions.length > 0) {
          this.focusOption(this.filteredOptions.length - 1);
        }
      },
      'Escape': () => {
        this.closeDropdown();
        this.focusToggle();
      },
      'Enter': () => {
        if (this.filteredOptions.length > 0) {
          this.selectOption(this.filteredOptions[0]);
        }
      }
    };

    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  onOptionKeyDown(event: KeyboardEvent, option: DropdownOption) {
    const actions: Record<string, () => void> = {
      'Enter': () => this.handleOptionActivation(option),
      ' ': () => this.handleOptionActivation(option),
      'ArrowDown': () => this.navigateOptions(1),
      'ArrowUp': () => this.navigateOptions(-1),
      'ArrowRight': () => this.expandSubOptions(option),
      'Escape': () => { this.closeDropdown(); this.focusToggle(); },
      'Home': () => this.focusOption(0),
      'End': () => this.focusOption(this.filteredOptions.length - 1)
    };

    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  onSubOptionKeyDown(event: KeyboardEvent, subOption: DropdownOption) {
    const actions: Record<string, () => void> = {
      'Enter': () => this.selectSubOption(subOption),
      ' ': () => this.selectSubOption(subOption),
      'ArrowDown': () => this.navigateSubOptions(1),
      'ArrowUp': () => this.navigateSubOptions(-1),
      'ArrowLeft': () => { this.expandedOption = null; this.focusOption(this.focusedOptionIndex); },
      'Escape': () => { this.closeDropdown(); this.focusToggle(); }
    };

    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  // Optimized helper methods
  private handleToggleActivation() {
    this.toggleDropdown();
    if (this.isOpen) {
      if (this.search || this.enableSearch) {
        this.focusSearchInput();
      } else {
        this.focusOption(0);
      }
    }
  }

  private openAndFocus(position: 'first' | 'last') {
    if (!this.isOpen) this.toggleDropdown();

    if (this.search || this.enableSearch) {
      this.focusSearchInput();
    } else {
      this.focusOption(position === 'first' ? 0 : this.filteredOptions.length - 1);
    }
  }

  private handleOptionActivation(option: DropdownOption) {
    if (this.hasSubOptions(option.name)) {
      this.toggleSubOptions(option.name);
      if (this.expandedOption === option.name) this.focusSubOption(0);
    } else {
      this.selectOption(option);
    }
  }

  private expandSubOptions(option: DropdownOption) {
    if (this.hasSubOptions(option.name)) {
      this.expandedOption = option.name;
      this.focusSubOption(0);
    }
  }

  private navigateOptions(direction: number) {
    const newIndex = this.focusedOptionIndex + direction;

    // If going up from first option and search is enabled, focus search
    if (direction === -1 && this.focusedOptionIndex === 0 && (this.search || this.enableSearch)) {
      this.focusSearchInput();
      this.resetFocusStates();
      return;
    }

    if (newIndex >= 0 && newIndex < this.filteredOptions.length) {
      this.focusOption(newIndex);
    }
  }

  private navigateSubOptions(direction: number) {
    const currentOption = this.filteredOptions[this.focusedOptionIndex];
    const subOptions = this.suboptions[currentOption.name];
    if (!subOptions) return;

    const newIndex = this.focusedSubOptionIndex + direction;
    if (newIndex >= 0 && newIndex < subOptions.length) {
      this.focusSubOption(newIndex);
    }
  }

  private focusOption(index: number) {
    this.focusedOptionIndex = index;
    this.isNavigatingSubOptions = false;
    this.focusedSubOptionIndex = -1;
    setTimeout(() => this.focusElement('.option', index), 0);
  }

  private focusSubOption(index: number) {
    this.focusedSubOptionIndex = index;
    this.isNavigatingSubOptions = true;
    setTimeout(() => this.focusElement('.suboption', index), 0);
  }

  private focusElement(selector: string, index: number) {
    const elements = this.elementRef.nativeElement.querySelectorAll(selector);
    if (elements[index]) {
      (elements[index] as HTMLElement).focus();
    }
  }

  private focusSearchInput() {
    setTimeout(() => {
      const searchInput = this.elementRef.nativeElement.querySelector('.search-box input');
      if (searchInput) (searchInput as HTMLElement).focus();
    }, 0);
  }

  private focusToggle() {
    const toggle = this.elementRef.nativeElement.querySelector('.dropdown-toggle');
    if (toggle) (toggle as HTMLElement).focus();
  }

  // Calculate position for sub-options based on option index
  getSuboptionPosition(optionIndex: number): number {
    // Calculate position relative to the dropdown 
    const toggleHeight = 50;
    const dropdownMenuTop = 2;
    const searchBoxHeight = (this.search || this.enableSearch) ? 40 : 0;
    const optionHeight = 40; // Height of each option
    const optionsContainerPadding = 0; // No padding on options container

    // Position to align the first sub-option with the hovered main option
    return toggleHeight + dropdownMenuTop + searchBoxHeight + optionsContainerPadding + (optionIndex * optionHeight);
  }
}
