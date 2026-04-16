// Updated TypeScript Component
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvatarSize, AvatarShape } from '../avatars/aava-avatars.component';
import { ButtonVariant, ButtonSize } from '../button/aava-button.component';
import { BadgeState, BadgeSize } from '../badges/aava-badges.component';

export interface ListItemButton {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  iconPosition?: 'left' | 'right' | 'only';
  disabled?: boolean;
  processing?: boolean;
  pill?: boolean;
  width?: string;
  height?: string;
  id?: string;
  data?: any;
}

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;

  avatar?: {
    imageUrl?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    statusText?: string;
    profileText?: string;
    badgeState?: BadgeState;
    badgeSize?: BadgeSize;
    badgeCount?: number;
    active?: boolean;
    processedanddone?: boolean;
  };

  icon?: {
    iconName: string;
    color?: string;
    iconColor?: string;
    iconSize?: number | string;
    disabled?: boolean;
    cursor?: boolean;
  };

  buttons?: ListItemButton[];

  disabled?: boolean;
  data?: any;
}

export interface ListSelectionEvent {
  selectedItems: ListItem[];
  selectedIds: string[];
  lastSelectedItem: ListItem;
}

export interface ListButtonClickEvent {
  item: ListItem;
  button: ListItemButton;
  buttonIndex: number;
  event: Event;
}

export type ErrorMessagePosition = 'top' | 'bottom';

@Component({
  selector: 'aava-list',
  imports: [CommonModule],
  templateUrl: './aava-list.component.html',
  styleUrl: './aava-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaListComponent),
      multi: true,
    },
  ],
})
export class AavaListComponent implements ControlValueAccessor {
  @Input() title = '';
  @Input() items: ListItem[] = [];
  @Input() height = '400px';
  @Input() width = '100%';
  @Input() emptyLabel = 'No items available';

  @Input() multiSelect = false;
  @Input() maxSelections?: number;

  @Input() selectedItemId: string | null = null;
  @Input() selectedItemIds: string[] = [];

  @Input() showCheckboxes = false;
  @Input() selectionMode: 'click' | 'checkbox' = 'click';

  // New validation inputs
  @Input() required = false;
  @Input() errorMessage = 'Please select at least one item';
  @Input() errorPosition: ErrorMessagePosition = 'bottom';
  @Input() showErrorImmediately = true; // New input to control immediate error display
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() onOptionSelected = new EventEmitter<ListItem>();
  @Output() onSelectionChanged = new EventEmitter<ListSelectionEvent>();
  @Output() onButtonClick = new EventEmitter<ListButtonClickEvent>();
  @Output() onIconClick = new EventEmitter<{ item: ListItem; event: Event }>();

  private _value: string | string[] | null = null;
  private _disabled = false;
  private _touched = false;

  private onChange = (value: string | string[] | null) => { };
  private onTouched = () => { };

  get value(): string | string[] | null {
    return this._value;
  }

  set value(val: string | string[] | null) {
    if (val !== this._value) {
      this._value = val;

      if (this.multiSelect) {
        this.selectedItemIds = Array.isArray(val) ? val : val ? [val] : [];
      } else {
        this.selectedItemId = Array.isArray(val) ? val[0] || null : val;
      }

      this.onChange(val);
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get touched(): boolean {
    return this._touched;
  }

  // Check if component has validation error
  get hasError(): boolean {
    if (!this.required) return false;

    // Show error immediately if showErrorImmediately is true, otherwise wait for touch
    const shouldShowError = this.showErrorImmediately || this._touched;

    return shouldShowError && this.isEmpty();
  }

  // Check if selection is empty
  private isEmpty(): boolean {
    if (this.multiSelect) {
      return !this.selectedItemIds || this.selectedItemIds.length === 0;
    } else {
      return !this.selectedItemId && !this._value;
    }
  }

  trackByFn(index: number, item: ListItem): string {
    return item.id;
  }

  trackByButtonFn(index: number, button: ListItemButton): string {
    return button.id || index.toString();
  }

  onItemClick(item: ListItem, event?: Event): void {
    if (this.disabled || item.disabled) {
      return;
    }

    if (event && this.isClickOnActionElement(event)) {
      return;
    }

    this.markAsTouched();

    if (this.multiSelect) {
      this.handleMultiSelect(item);
    } else {
      this.handleSingleSelect(item);
    }
  }

  private markAsTouched(): void {
    if (!this._touched) {
      this._touched = true;
      this.onTouched();
    }
  }

  private isClickOnActionElement(event: Event): boolean {
    const target = event.target as HTMLElement;
    return (
      target.closest('.item-buttons') !== null ||
      target.closest('.item-icon.clickable') !== null
    );
  }

  private handleSingleSelect(item: ListItem): void {
    this.value = item.id;
    this.onOptionSelected.emit(item);
    this.emitSelectionChange([item]);
  }

  private handleMultiSelect(item: ListItem): void {
    const currentSelections = [...this.selectedItemIds];
    const itemIndex = currentSelections.indexOf(item.id);

    if (itemIndex > -1) {
      currentSelections.splice(itemIndex, 1);
    } else {
      if (
        !this.maxSelections ||
        currentSelections.length < this.maxSelections
      ) {
        currentSelections.push(item.id);
      } else {
        return;
      }
    }

    this.value = currentSelections;
    this.onOptionSelected.emit(item);

    const selectedItems = this.items.filter((i) =>
      currentSelections.includes(i.id)
    );
    this.emitSelectionChange(selectedItems, item);
  }

  private emitSelectionChange(
    selectedItems: ListItem[],
    lastSelectedItem?: ListItem
  ): void {
    this.onSelectionChanged.emit({
      selectedItems,
      selectedIds: selectedItems.map((item) => item.id),
      lastSelectedItem:
        lastSelectedItem || selectedItems[selectedItems.length - 1],
    });
  }

  isItemSelected(item: ListItem): boolean {
    if (this.multiSelect) {
      return this.selectedItemIds.includes(item.id);
    } else {
      return this.selectedItemId === item.id || this.value === item.id;
    }
  }

  onCheckboxChange(item: ListItem, event: Event): void {
    event.stopPropagation();
    this.onItemClick(item);
  }

  onItemButtonClick(
    item: ListItem,
    button: ListItemButton,
    buttonIndex: number,
    event: Event
  ): void {
    event.stopPropagation();
    this.onButtonClick.emit({ item, button, buttonIndex, event });
  }

  onItemIconClick(item: ListItem, event: Event): void {
    event.stopPropagation();
    this.onIconClick.emit({ item, event });
  }

  hasAvatar(item: ListItem): boolean {
    return !!item.avatar;
  }

  hasIcon(item: ListItem): boolean {
    return !!item.icon;
  }

  hasButtons(item: ListItem): boolean {
    return !!item.buttons && item.buttons.length > 0;
  }

  isIconClickable(item: ListItem): boolean {
    return item.icon?.cursor === true;
  }

  canSelectMore(): boolean {
    if (!this.multiSelect || !this.maxSelections) {
      return true;
    }
    return this.selectedItemIds.length < this.maxSelections;
  }

  writeValue(value: string | string[] | null): void {
    this._value = value;

    if (this.multiSelect) {
      this.selectedItemIds = Array.isArray(value)
        ? value
        : value
          ? [value]
          : [];
    } else {
      this.selectedItemId = Array.isArray(value) ? value[0] || null : value;
    }
  }

  registerOnChange(fn: (value: string | string[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  selectAll(): void {
    if (!this.multiSelect) return;

    this.markAsTouched();

    const selectableItems = this.items.filter((item) => !item.disabled);
    const idsToSelect = this.maxSelections
      ? selectableItems.slice(0, this.maxSelections).map((item) => item.id)
      : selectableItems.map((item) => item.id);

    this.value = idsToSelect;
    this.emitSelectionChange(
      selectableItems.filter((item) => idsToSelect.includes(item.id))
    );
  }

  clearSelection(): void {
    this.markAsTouched();
    this.value = this.multiSelect ? [] : null;
    this.emitSelectionChange([]);
  }

  selectItems(itemIds: string[]): void {
    this.markAsTouched();

    if (this.multiSelect) {
      const validIds = itemIds.filter((id) =>
        this.items.some((item) => item.id === id && !item.disabled)
      );

      if (this.maxSelections) {
        validIds.splice(this.maxSelections);
      }

      this.value = validIds;
      const selectedItems = this.items.filter((item) =>
        validIds.includes(item.id)
      );
      this.emitSelectionChange(selectedItems);
    } else if (itemIds.length > 0) {
      const validId = itemIds.find((id) =>
        this.items.some((item) => item.id === id && !item.disabled)
      );

      if (validId) {
        this.value = validId;
        const selectedItem = this.items.find((item) => item.id === validId);
        if (selectedItem) {
          this.emitSelectionChange([selectedItem]);
        }
      }
    }
  }

  // Method to manually trigger validation (useful for forms)
  validate(): boolean {
    this.markAsTouched();
    return !this.hasError;
  }

  // Method to reset validation state
  resetValidation(): void {
    this._touched = false;
  }

  // Method to hide error immediately (useful for conditional error display)
  hideErrorImmediately(): void {
    this.showErrorImmediately = false;
  }

  // Method to show error immediately
  showErrorImmediatelyMethod(): void {
    this.showErrorImmediately = true;
  }
}
