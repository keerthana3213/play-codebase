import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFilterComponent, AavaFilterGroup } from '@aava/play-core';

@Component({
  selector: 'ava-multi-group-demo',
  standalone: true,
  imports: [CommonModule, AavaFilterComponent],
  templateUrl: './multi-group-demo.component.html',
  styleUrls: ['./multi-group-demo.component.scss']
})
export class MultiGroupDemoComponent {
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

  onSelectionChange(event: any) {
    console.log('Selection changed:', event);
  }

  onClearAll() {
    console.log('All filters cleared');
  }

  onApply(event: any) {
    console.log('Filters applied:', event);
  }
}
