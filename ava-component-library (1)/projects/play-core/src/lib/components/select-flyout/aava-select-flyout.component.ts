import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaFlyoutComponent } from '../flyout/aava-flyout.component';

export interface SelectOption {
  value: any;
  label: string;
  icon?: string;
  disabled?: boolean;
  children?: SelectOption[];
}

export type SelectFlyoutSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'aava-select-flyout',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaIconComponent, AavaFlyoutComponent],
  templateUrl: './aava-select-flyout.component.html',
  styleUrls: ['./aava-select-flyout.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaSelectFlyoutComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaSelectFlyoutComponent implements ControlValueAccessor {
  @ViewChild('selectTrigger') selectTrigger!: ElementRef<HTMLElement>;
  @ViewChild('flyout') flyout!: AavaFlyoutComponent;

  @Input() placeholder = 'Select an option';
  @Input() label = '';
  @Input() id = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() size: SelectFlyoutSize = 'md';
  @Input() error = '';
  @Input() dropdownIcon = 'chevron-down';
  @Input() clearable = false;
  @Input() searchable = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() options: SelectOption[] = [];
  @Input() displayField = 'label'; // Field name to display from the option object
  @Input() customStyles: {
    trigger?: Record<string, string>;
    flyout?: Record<string, string>;
    option?: Record<string, string>;
    parentOption?: Record<string, string>;
  } = {};

  @Output() selectionChange = new EventEmitter<SelectOption>();
  @Output() flyoutOpen = new EventEmitter<void>();
  @Output() flyoutClose = new EventEmitter<void>();

  // Internal state
  selectedOption: SelectOption | null = null;
  searchTerm = '';
  isOpen = false;
  expandedCategories: Set<string> = new Set();
  requiredError = false;

  // ControlValueAccessor properties
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.selectedOption = this.findOptionByValue(this.options, value) || null;
    } else {
      this.selectedOption = null;
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Component methods
  toggleFlyout(): void {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeFlyout();
    } else {
      this.openFlyout();
    }
  }

  openFlyout(): void {
    if (this.disabled) return;

    this.isOpen = true;
    this.flyoutOpen.emit();

    setTimeout(() => {
      if (this.selectTrigger && this.flyout) {
        this.flyout.open(this.selectTrigger.nativeElement);
      }
    });

    this.cdr.markForCheck();
  }

  closeFlyout(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.expandedCategories.clear();
    if (this.flyout) {
      this.flyout.close();
    }
    this.flyoutClose.emit();
    this.cdr.markForCheck();
    if (this.required && this.selectedOption === null) {
      this.requiredError = true;
    } else {
      this.requiredError = false;
    }
  }

  // Handle external close events from flyout
  onFlyoutClose(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.expandedCategories.clear();
    this.cdr.markForCheck();
  }

  // Handle clicks outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen) return;

    const target = event.target as HTMLElement;

    // Don't close if clicking on option items or their children
    if (target.closest('.option-item') || target.closest('.expand-chevron')) {
      return;
    }

    const componentElement = this.selectTrigger?.nativeElement?.closest(
      '.aava-select-flyout'
    );

    // Close if click is outside the component
    if (componentElement && !componentElement.contains(target)) {
      this.closeFlyout();
    }
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    this.selectedOption = option;
    this.onChange(option.value);
    this.onTouched();
    this.selectionChange.emit(option);
    this.closeFlyout();
  }

  clearSelection(): void {
    if (this.required) {
      this.requiredError = true;
    }
    this.selectedOption = null;
    this.onChange(null);
    this.onTouched();
    this.selectionChange.emit(null as any);
    this.cdr.markForCheck();
  }

  toggleCategory(categoryValue: string, event: Event): void {
    event.stopPropagation();
    if (this.expandedCategories.has(categoryValue)) {
      this.expandedCategories.delete(categoryValue);
    } else {
      this.expandedCategories.add(categoryValue);
    }
    this.cdr.markForCheck();
  }

  isCategoryExpanded(categoryValue: string): boolean {
    return this.expandedCategories.has(categoryValue);
  }

  get filteredOptions(): SelectOption[] {
    if (!this.searchable || !this.searchTerm.trim()) {
      return this.options;
    }

    const searchLower = this.searchTerm.toLowerCase();
    return this.filterOptionsRecursive(this.options, searchLower);
  }

  get displayValue(): string {
    if (this.selectedOption) {
      return (
        (this.selectedOption[
          this.displayField as keyof SelectOption
        ] as string) || this.selectedOption.label
      );
    }
    return this.placeholder;
  }

  get hasValue(): boolean {
    return this.selectedOption !== null;
  }

  trackByValue(index: number, option: SelectOption): any {
    return option.value;
  }

  // Helper methods
  private findOptionByValue(
    options: SelectOption[],
    value: any
  ): SelectOption | null {
    for (const option of options) {
      if (option.value === value) {
        return option;
      }
      if (option.children) {
        const found = this.findOptionByValue(option.children, value);
        if (found) return found;
      }
    }
    return null;
  }

  private filterOptionsRecursive(
    options: SelectOption[],
    searchTerm: string
  ): SelectOption[] {
    return options.filter((option) => {
      const displayValue =
        (option[this.displayField as keyof SelectOption] as string) ||
        option.label;
      const matchesSearch = displayValue.toLowerCase().includes(searchTerm);
      const hasMatchingChildren =
        option.children &&
        this.filterOptionsRecursive(option.children, searchTerm).length > 0;

      if (option.children) {
        option.children = this.filterOptionsRecursive(
          option.children,
          searchTerm
        );
      }

      return matchesSearch || hasMatchingChildren;
    });
  }

  hasChildren(option: SelectOption): boolean {
    return !!(option.children && option.children.length > 0);
  }

  /** Get icon size based on component size */
  get getIconSize(): number {
    switch (this.size) {
      case 'xs':
        return 16;
      case 'sm':
        return 20;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      default:
        return 12;
    }
  }
}
