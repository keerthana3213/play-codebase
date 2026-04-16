import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})
export class ApiDemoComponent {
  apiProperties = [
    { name: 'label', type: 'string', default: 'Filter', description: 'Label text displayed on the filter trigger button.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: 'Size of the filter component.' },
    { name: 'options', type: 'AavaFilterOption[]', default: '[]', description: 'Array of filter options for single-group mode.' },
    { name: 'filterGroups', type: 'AavaFilterGroup[]', default: '[]', description: 'Array of filter groups for multi-group mode.' },
    { name: 'selectionType', type: "'checkbox' | 'radio' | 'none'", default: 'checkbox', description: 'Type of selection control.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the filter is disabled.' },
    { name: 'showActionButtons', type: 'boolean', default: 'false', description: 'Whether to show Clear All and Apply buttons.' },
    { name: 'showSelectionCount', type: 'boolean', default: 'false', description: 'Whether to display the count of selected items.' },
  ];

  events = [
    { name: 'selectionChange', description: 'Emitted when filter selection changes', payload: 'AavaFilterOption[]' },
    { name: 'clearAll', description: 'Emitted when Clear All button is clicked', payload: 'void' },
    { name: 'apply', description: 'Emitted when Apply button is clicked', payload: 'AavaFilterOption[]' },
  ];
}
