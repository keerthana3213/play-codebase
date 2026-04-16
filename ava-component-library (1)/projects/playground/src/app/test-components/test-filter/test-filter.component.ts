import { Component } from '@angular/core';
import { AavaFilterComponent, AavaFilterOption, AavaFilterGroup } from '../../../../../play-core/src/public-api';
// import { AavaFilterComponent, AavaFilterOption, AavaFilterGroup } from '@aava/play-core';

@Component({
  selector: 'app-test-filter',
  standalone: true,
  imports: [AavaFilterComponent],
  templateUrl: './test-filter.component.html',
  styleUrl: './test-filter.component.scss'
})
export class TestFilterComponent {
  // Width for custom flyout width testing
  customWidth = 300;

  // Basic options for testing
  basicOptions: AavaFilterOption[] = [
    { id: 1, label: 'Active Users', value: 'active' },
    { id: 2, label: 'Inactive Users', value: 'inactive' },
    { id: 3, label: 'Pending Approval', value: 'pending' },
    { id: 4, label: 'Suspended', value: 'suspended' }
  ];

  // Status options for radio testing
  statusOptions: AavaFilterOption[] = [
    { id: 'draft', label: 'Draft', value: 'draft' },
    { id: 'published', label: 'Published', value: 'published' },
    { id: 'archived', label: 'Archived', value: 'archived' }
  ];

  // Category options for checkbox testing
  categoryOptions: AavaFilterOption[] = [
    { id: 'tech', label: 'Technology', value: 'tech' },
    { id: 'business', label: 'Business', value: 'business' },
    { id: 'design', label: 'Design', value: 'design' },
    { id: 'marketing', label: 'Marketing', value: 'marketing' }
  ];

  // Priority options for label-only testing
  priorityOptions: AavaFilterOption[] = [
    { id: 'high', label: 'High Priority', value: 'high' },
    { id: 'medium', label: 'Medium Priority', value: 'medium' },
    { id: 'low', label: 'Low Priority', value: 'low' }
  ];

  // Demo data for comprehensive testing
  demoOptions: AavaFilterOption[] = [
    { id: 'electronics', label: 'Electronics', value: 'electronics', selected: false },
    { id: 'clothing', label: 'Clothing & Fashion', value: 'clothing', selected: true },
    { id: 'books', label: 'Books & Media', value: 'books', selected: false },
    { id: 'home', label: 'Home & Garden', value: 'home', selected: false },
    { id: 'sports', label: 'Sports & Outdoors', value: 'sports', selected: true },
    { id: 'automotive', label: 'Automotive', value: 'automotive', selected: false }
  ];

  // Options with custom icons
  optionsWithIcons: AavaFilterOption[] = [
    { id: 'user', label: 'Active Users', value: 'active', icon: 'home', selected: true },
    { id: 'inactive', label: 'Inactive Users', value: 'inactive', icon: 'home', selected: false },
    { id: 'pending', label: 'Pending Approval', value: 'pending', icon: 'home', selected: false },
    { id: 'suspended', label: 'Suspended', value: 'suspended', icon: 'home', selected: false }
  ];

  // Multi-group filter data
  filterGroups: AavaFilterGroup[] = [
    {
      title: "User Status",
      selectionType: "radio",
      options: [
        { id: 'active', label: 'Active', value: 'active', selected: true },
        { id: 'inactive', label: 'Inactive', value: 'inactive', selected: false },
        { id: 'pending', label: 'Pending', value: 'pending', selected: false }
      ]
    },
    {
      title: "Categories",
      selectionType: "checkbox",
      options: [
        { id: 'tech', label: 'Technology', value: 'tech', icon: 'home', selected: true },
        { id: 'business', label: 'Business', value: 'business', icon: 'home', selected: false },
        { id: 'design', label: 'Design', value: 'design', icon: 'home', selected: true },
        { id: 'marketing', label: 'Marketing', value: 'marketing', icon: 'home', selected: false }
      ]
    },
    {
      title: "Priority Level",
      selectionType: "none",
      options: [
        { id: 'high', label: 'High Priority', value: 'high', icon: 'home', selected: false },
        { id: 'medium', label: 'Medium Priority', value: 'medium', icon: 'home', selected: true },
        { id: 'low', label: 'Low Priority', value: 'low', icon: 'home', selected: false }
      ]
    }
  ];

  // Event handlers
  onBasicFilterChange(options: AavaFilterOption[]): void {
    console.log('Basic filter changed:', options.filter(opt => opt.selected));
  }

  onStatusFilterChange(options: AavaFilterOption[]): void {
    console.log('Status filter changed:', options.filter(opt => opt.selected));
  }

  onCategoryFilterChange(options: AavaFilterOption[]): void {
    console.log('Category filter changed:', options.filter(opt => opt.selected));
  }

  onPriorityFilterChange(options: AavaFilterOption[]): void {
    console.log('Priority filter changed:', options.filter(opt => opt.selected));
  }

  onClearAll(): void {
    console.log('Clear all clicked');
  }

  onApply(options: AavaFilterOption[]): void {
    console.log('Apply clicked with options:', options.filter(opt => opt.selected));
  }

  onDemoFilterChange(options: AavaFilterOption[]): void {
    console.log('Demo filter changed:', options.filter(opt => opt.selected));
  }

  onIconFilterChange(options: AavaFilterOption[]): void {
    console.log('Icon filter changed:', options.filter(opt => opt.selected));
  }

  onMultiGroupFilterChange(options: AavaFilterOption[]): void {
    console.log('Multi-group filter changed:', options.filter(opt => opt.selected));
  }
}
