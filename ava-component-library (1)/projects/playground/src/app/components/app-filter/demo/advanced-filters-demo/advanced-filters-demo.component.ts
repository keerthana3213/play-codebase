import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFilterComponent, AavaFilterOption, AavaFilterGroup } from '@aava/play-core';

@Component({
  selector: 'ava-advanced-filters-demo',
  standalone: true,
  imports: [CommonModule, AavaFilterComponent],
  templateUrl: './advanced-filters-demo.component.html',
  styleUrls: ['./advanced-filters-demo.component.scss']
})
export class AdvancedFiltersDemoComponent {
  // Advanced filter with icons and selection count
  advancedOptions: AavaFilterOption[] = [
    { id: 1, label: 'Active Users', value: 'active', selected: false, icon: 'check-circle' },
    { id: 2, label: 'Pending Review', value: 'pending', selected: false, icon: 'clock4' },
    { id: 3, label: 'Archived', value: 'archived', selected: false, icon: 'archive' },
    { id: 4, label: 'Inactive', value: 'inactive', selected: false, icon: 'circle-x' },
  ];

  // Status filter with radio buttons
  statusOptions: AavaFilterOption[] = [
    { id: 'draft', label: 'Draft', value: 'draft', selected: false, icon: 'file-text' },
    { id: 'published', label: 'Published', value: 'published', selected: true, icon: 'send' },
    { id: 'scheduled', label: 'Scheduled', value: 'scheduled', selected: false, icon: 'calendar' },
  ];

  // Priority filter with icons
  priorityOptions: AavaFilterOption[] = [
    { id: 'high', label: 'High Priority', value: 'high', selected: false, icon: 'alert-circle' },
    { id: 'medium', label: 'Medium Priority', value: 'medium', selected: false, icon: 'minus' },
    { id: 'low', label: 'Low Priority', value: 'low', selected: false, icon: 'info' },
  ];

  // Multi-group advanced filter
  multiGroupFilters: AavaFilterGroup[] = [
    {
      title: 'Category',
      selectionType: 'checkbox',
      options: [
        { id: 'cat1', label: 'Electronics', value: 'electronics', selected: false, icon: 'zap' },
        { id: 'cat2', label: 'Clothing', value: 'clothing', selected: false, icon: 'shopping-cart' },
        { id: 'cat3', label: 'Food', value: 'food', selected: false, icon: 'box' },
      ]
    },
    {
      title: 'Rating',
      selectionType: 'radio',
      options: [
        { id: 'rating5', label: '5 Stars', value: 5, selected: true, icon: 'star' },
        { id: 'rating4', label: '4 Stars', value: 4, selected: false, icon: 'star' },
        { id: 'rating3', label: '3 Stars', value: 3, selected: false, icon: 'star' },
      ]
    }
  ];

  // Label-only selection filter
  labelOnlyOptions: AavaFilterOption[] = [
    { id: 'opt1', label: 'Latest', value: 'latest', selected: false, icon: 'trending-up' },
    { id: 'opt2', label: 'Popular', value: 'popular', selected: false, icon: 'trending-up' },
    { id: 'opt3', label: 'Most Viewed', value: 'viewed', selected: false, icon: 'eye' },
  ];

  onSelectionChange(event: AavaFilterOption[]) {
    console.log('Selection changed:', event);
  }

  onClearAll() {
    console.log('All filters cleared');
    // Clear all selections
    this.advancedOptions.forEach(opt => opt.selected = false);
    this.statusOptions.forEach(opt => opt.selected = false);
    this.priorityOptions.forEach(opt => opt.selected = false);
  }

  onApply(event: AavaFilterOption[]) {
    console.log('Filters applied:', event);
  }
}
