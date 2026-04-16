import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaFilterComponent, AavaFilterOption, AavaFilterGroup } from '@aava/play-core';

interface FilterDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'awe-app-filter',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaFilterComponent],
  templateUrl: './app-filter.component.html',
  styleUrls: ['./app-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppFilterComponent {
  // Documentation sections
  sections: FilterDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Simple filter component with single option group and basic functionality.',
      showCode: false,
    },
    {
      title: 'Single-Group Mode',
      description:
        'Filter with one group of options using checkbox or radio selection.',
      showCode: false,
    },
    {
      title: 'Multi-Group Mode',
      description:
        'Advanced filter with multiple groups of options and different selection types.',
      showCode: false,
    },
    {
      title: 'Selection Types',
      description:
        'Different selection modes: checkboxes for multiple selection and radio buttons for single selection.',
      showCode: false,
    },
    {
      title: 'Sizes & Variants',
      description:
        'Different filter sizes (xs to xl) and visual variants.',
      showCode: false,
    },
    {
      title: 'Advanced Filters',
      description:
        'Complex filter scenarios with action buttons, icons, and dynamic options.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: 'Filter',
      description: 'Label text displayed on the filter trigger button.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the filter component and its contents.',
    },
    {
      name: 'options',
      type: 'AavaFilterOption[]',
      default: '[]',
      description: 'Array of filter options for single-group mode.',
    },
    {
      name: 'filterGroups',
      type: 'AavaFilterGroup[]',
      default: '[]',
      description: 'Array of filter groups for multi-group mode.',
    },
    {
      name: 'selectionType',
      type: "'checkbox' | 'radio' | 'none'",
      default: 'checkbox',
      description: 'Type of selection control for single-group mode.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the filter component is disabled.',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'list-filter',
      description: 'Icon name to display on the filter button.',
    },
    {
      name: 'iconColor',
      type: 'string',
      default: '',
      description: 'Color of the icon displayed on the button.',
    },
    {
      name: 'showActionButtons',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show Clear All and Apply buttons.',
    },
    {
      name: 'allowMultipleSelection',
      type: 'boolean',
      default: 'false',
      description: 'Whether to allow multiple selections in single-group mode.',
    },
    {
      name: 'showSelectionCount',
      type: 'boolean',
      default: 'false',
      description: 'Whether to display the count of selected items on the button.',
    },
    {
      name: 'width',
      type: 'number',
      default: '0',
      description: 'Custom width for the filter flyout panel (0 = auto).',
    },
  ];

  // Sample data - Categories
  categories: AavaFilterOption[] = [
    { id: 1, label: 'Electronics', value: 'electronics', selected: false },
    { id: 2, label: 'Clothing', value: 'clothing', selected: false },
    { id: 3, label: 'Food & Beverage', value: 'food', selected: false },
    { id: 4, label: 'Home & Garden', value: 'home', selected: false },
    { id: 5, label: 'Sports', value: 'sports', selected: false },
  ];

  // Sample data - Price Ranges
  priceRanges: AavaFilterOption[] = [
    { id: 1, label: 'Under $50', value: 'under-50', selected: false },
    { id: 2, label: '$50 - $100', value: '50-100', selected: false },
    { id: 3, label: '$100 - $500', value: '100-500', selected: false },
    { id: 4, label: 'Over $500', value: 'over-500', selected: false },
  ];

  // Sample data - Ratings
  ratings: AavaFilterOption[] = [
    { id: 5, label: '⭐⭐⭐⭐⭐ 5 Stars', value: '5-stars', selected: false },
    { id: 4, label: '⭐⭐⭐⭐ 4+ Stars', value: '4-stars', selected: false },
    { id: 3, label: '⭐⭐⭐ 3+ Stars', value: '3-stars', selected: false },
    { id: 2, label: '⭐⭐ 2+ Stars', value: '2-stars', selected: false },
  ];

  // Sample data - Multi-Group Filter
  multiGroupFilters: AavaFilterGroup[] = [
    {
      title: 'Category',
      selectionType: 'checkbox',
      options: [
        { id: 1, label: 'Electronics', value: 'electronics', selected: false },
        { id: 2, label: 'Clothing', value: 'clothing', selected: false },
        { id: 3, label: 'Food & Beverage', value: 'food', selected: false },
      ],
    },
    {
      title: 'Price Range',
      selectionType: 'radio',
      options: [
        { id: 1, label: 'Under $50', value: 'under-50', selected: false },
        { id: 2, label: '$50 - $100', value: '50-100', selected: false },
        { id: 3, label: '$100 - $500', value: '100-500', selected: false },
        { id: 4, label: 'Over $500', value: 'over-500', selected: false },
      ],
    },
    {
      title: 'Availability',
      selectionType: 'radio',
      options: [
        { id: 1, label: 'In Stock', value: 'in-stock', selected: false },
        { id: 2, label: 'Out of Stock', value: 'out-of-stock', selected: false },
        { id: 3, label: 'Pre-order', value: 'pre-order', selected: false },
      ],
    },
  ];

  // Toggle code visibility
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Handle filter selection changes
  onFilterSelectionChange(event: AavaFilterOption[]): void {
    console.log('Filter selection changed:', event);
  }

  // Handle filter clear all
  onFilterClearAll(): void {
    console.log('Filter cleared');
  }

  // Handle filter apply
  onFilterApply(event: AavaFilterOption[]): void {
    console.log('Filter applied:', event);
  }

  // Copy code to clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  // Example code snippets
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
import { Component } from '@angular/core';
import { AavaFilterComponent, AavaFilterOption } from '@aava/play-core';

@Component({
  selector: 'app-basic-filter',
  standalone: true,
  imports: [AavaFilterComponent],
  template: \`
    <aava-filter
      label="Filter"
      [options]="categories"
      selectionType="checkbox"
      (selectionChange)="onSelectionChange($event)">
    </aava-filter>
  \`
})
export class BasicFilterComponent {
  categories: AavaFilterOption[] = [
    { id: 1, label: 'Electronics', value: 'electronics', selected: false },
    { id: 2, label: 'Clothing', value: 'clothing', selected: false },
    { id: 3, label: 'Food', value: 'food', selected: false },
  ];

  onSelectionChange(event: AavaFilterOption[]) {
    console.log('Selected:', event);
  }
}`,
      'multi-group mode': `
import { Component } from '@angular/core';
import { AavaFilterComponent, AavaFilterGroup } from '@aava/play-core';

@Component({
  selector: 'app-multi-group-filter',
  standalone: true,
  imports: [AavaFilterComponent],
  template: \`
    <aava-filter
      label="Advanced Filter"
      [filterGroups]="groups"
      [showActionButtons]="true"
      (selectionChange)="onSelectionChange($event)"
      (apply)="onApply($event)">
    </aava-filter>
  \`
})
export class MultiGroupFilterComponent {
  groups: AavaFilterGroup[] = [
    {
      title: 'Category',
      selectionType: 'checkbox',
      options: [
        { id: 1, label: 'Electronics', value: 'electronics' },
        { id: 2, label: 'Clothing', value: 'clothing' },
      ],
    },
    {
      title: 'Price',
      selectionType: 'radio',
      options: [
        { id: 1, label: 'Under $50', value: 'under-50' },
        { id: 2, label: '$50-$100', value: '50-100' },
      ],
    },
  ];

  onSelectionChange(event: any) {
    console.log('Selection changed:', event);
  }

  onApply(event: any) {
    console.log('Filters applied:', event);
  }
}`,
      'sizes': `
import { Component } from '@angular/core';
import { AavaFilterComponent, AavaFilterOption } from '@aava/play-core';

@Component({
  selector: 'app-size-filter',
  standalone: true,
  imports: [AavaFilterComponent],
  template: \`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aava-filter size="xs" label="XS Filter" [options]="options"></aava-filter>
      <aava-filter size="sm" label="SM Filter" [options]="options"></aava-filter>
      <aava-filter size="md" label="MD Filter" [options]="options"></aava-filter>
      <aava-filter size="lg" label="LG Filter" [options]="options"></aava-filter>
      <aava-filter size="xl" label="XL Filter" [options]="options"></aava-filter>
    </div>
  \`
})
export class SizeFilterComponent {
  options: AavaFilterOption[] = [
    { id: 1, label: 'Option 1', value: 'opt1' },
    { id: 2, label: 'Option 2', value: 'opt2' },
  ];
}`,
    };

    return examples[section.toLowerCase()] || '';
  }

  // Get selected count for demo
  getSelectedCount(options: AavaFilterOption[]): number {
    return options.filter(opt => opt.selected).length;
  }

  // Get selected count from filter groups
  getSelectedCountFromGroups(groups: AavaFilterGroup[]): number {
    return groups.reduce((total, group) => {
      return total + group.options.filter(opt => opt.selected).length;
    }, 0);
  }
}
