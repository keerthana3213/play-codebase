import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaFlyoutComponent } from '../../components/flyout/aava-flyout.component';
import { AavaCheckboxComponent } from '../../components/checkbox/aava-checkbox.component';
import { AavaRadioButtonComponent } from '../../components/radio-button/aava-radio-button.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaDividersComponent } from '../../components/dividers/aava-dividers.component';
import { CommonModule } from '@angular/common';

export interface AavaFilterOption {
  id: string | number;
  label: string;
  value: any;
  selected?: boolean; // Essential for state management and UI rendering
  icon?: string; // Custom icon for the option (displayed on right side)
}

export interface AavaFilterGroup {
  title: string;
  selectionType: SelectionType;
  options: AavaFilterOption[];
}

export type FilterSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SelectionType = 'checkbox' | 'radio' | 'none';

@Component({
  selector: 'aava-filter',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaFlyoutComponent,
    AavaCheckboxComponent,
    AavaRadioButtonComponent,
    AavaIconComponent,
    AavaDividersComponent
  ],
  templateUrl: './aava-filter.component.html',
  styleUrl: './aava-filter.component.scss'
})
export class AavaFilterComponent {
  // Core inputs
  @Input() size: FilterSize = 'md';
  @Input() label: string = ''; // Changed from 'title' to 'label' as per requirements
  @Input() options: AavaFilterOption[] = []; // For single-group mode (backward compatibility)
  @Input() filterGroups: AavaFilterGroup[] = []; // For multi-group mode
  @Input() disabled: boolean = false;

  // Selection behavior inputs (only used in single-group mode)
  @Input() selectionType?: SelectionType;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() showActionButtons: boolean = false;
  @Input() allowMultipleSelection: boolean = false;
  @Input() showSelectionCount: boolean = false;
  @Input() width = 0;

  // Event emitters
  @Output() selectionChange = new EventEmitter<AavaFilterOption[]>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() apply = new EventEmitter<AavaFilterOption[]>();

  // Get button size based on filter size (1:1 mapping)
  getButtonSize(): FilterSize {
    return this.size;
  }

  // Get checkbox/radio button size based on filter size
  getSelectionControlSize(): 'sm' | 'md' | 'lg' {
    const sizeMap: Record<FilterSize, 'sm' | 'md' | 'lg'> = {
      'xs': 'sm',
      'sm': 'sm',
      'md': 'md',
      'lg': 'md',
      'xl': 'lg'
    };
    return sizeMap[this.size];
  }

  // Get action button size based on filter size
  getActionButtonSize(): 'xs' | 'md' {
    return this.size === 'lg' || this.size === 'xl' ? 'md' : 'xs';
  }

  // Get selected options count
  getSelectedCount(): number {
    return this.getAllOptions().filter(option => option.selected).length;
  }

  // Get button label with optional count
  getButtonLabel(): string {
    if (!this.label) {
      return '';
    }

    if (this.showSelectionCount) {
      const count = this.getSelectedCount();
      return count > 0 ? `${this.label} (${count})` : this.label;
    }
    return this.label;
  }

  // Get icon size based on filter component size
  getOptionIconSize(): number {
    const sizeMap: Record<FilterSize, number> = {
      'xs': 12,
      'sm': 16,
      'md': 20,
      'lg': 24,
      'xl': 24
    };
    return sizeMap[this.size];
  }

  // Check if component is in multi-group mode
  isMultiGroupMode(): boolean {
    return this.filterGroups.length > 0;
  }

  // Get all options from all groups
  getAllOptions(): AavaFilterOption[] {
    return this.isMultiGroupMode()
      ? this.filterGroups.flatMap(group => group.options)
      : this.options;
  }

  // Handle checkbox selection changes
  onCheckboxChange(option: AavaFilterOption, isChecked: boolean): void {
    option.selected = isChecked;
    this.emitSelectionChange();
  }

  onRadioOptionChange(selectedOption: AavaFilterOption, groupIndex?: number): void {
    const options = groupIndex !== undefined ? this.filterGroups[groupIndex]?.options : this.options;
    if (options) {
      // Clear all selections first (radio allows only one)
      options.forEach(option => option.selected = false);
      // Select the clicked option
      selectedOption.selected = true;
      this.emitSelectionChange();
    }
  }

  onLabelClick(option: AavaFilterOption): void {
    if (this.allowMultipleSelection) {
      option.selected = !option.selected;
    } else {
      // For single selection, clear others and select clicked option
      this.getAllOptions().forEach(opt => opt.selected = false);
      option.selected = true;
    }
    this.emitSelectionChange();
  }

  // Clear all selections
  onClearAll(): void {
    this.getAllOptions().forEach(option => option.selected = false);
    this.clearAll.emit();
    this.emitSelectionChange();
  }

  // Apply current selections
  onApply(): void {
    this.apply.emit([...this.getAllOptions()]);
  }

  // Emit selection change event
  private emitSelectionChange(): void {
    this.selectionChange.emit([...this.getAllOptions()]);
  }

  // Get radio group name for unique identification
  getRadioGroupName(groupIndex?: number): string {
    return groupIndex !== undefined
      ? `filter-radio-group-${groupIndex}`
      : `filter-radio-${this.label || 'default'}`;
  }
}