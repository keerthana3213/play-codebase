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
  componentProps = [
    {
      name: 'placeholder',
      type: 'string',
      default: 'Select',
      description: 'Placeholder text displayed when no option is selected.'
    },
    {
      name: 'label',
      type: 'string',
      default: '',
      description: 'Label text displayed above the select component.'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the select field is required for form validation.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the select component is disabled.'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enable multiple selection with checkboxes.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the select component.'
    },
    {
      name: 'showSearch',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the search input for filtering options.'
    },
    {
      name: 'error',
      type: 'string',
      default: '',
      description: 'Error message to display below the select component.'
    },
    {
      name: 'dropdownIcon',
      type: 'string',
      default: 'chevron-down',
      description: 'Icon name for the dropdown arrow.'
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.'
    }
  ];

  events = [
    {
      name: 'selectionChange',
      type: 'EventEmitter<any>',
      description: 'Emitted when the selection changes. Returns the selected value(s).'
    },
    {
      name: 'ngModelChange',
      type: 'EventEmitter<any>',
      description: 'Two-way binding event for ngModel integration.'
    }
  ];

  optionProps = [
    {
      name: 'value',
      type: 'any',
      default: 'undefined',
      description: 'The value associated with this option.'
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      description: 'Whether this option is currently selected.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether this option is disabled.'
    },
    {
      name: 'visible',
      type: 'boolean',
      default: 'true',
      description: 'Whether this option is visible (used for search filtering).'
    }
  ];

  basicUsageExample = `<aava-select 
  label="Select User" 
  placeholder="Select a user" 
  [(ngModel)]="selectedUser">
  <aava-select-option *ngFor="let user of users" [value]="user.value">
    {{ user.label }}
  </aava-select-option>
</aava-select>`;

  multipleSelectionExample = `<aava-select 
  [multiple]="true" 
  label="Select Users" 
  placeholder="Select users"
  [(ngModel)]="selectedUsers">
  <aava-select-option *ngFor="let user of users" [value]="user.value">
    {{ user.label }}
  </aava-select-option>
</aava-select>`;

  formIntegrationExample = `<form [formGroup]="form">
  <aava-select 
    label="Select User" 
    placeholder="Select a user" 
    formControlName="userId"
    [required]="true"
    [error]="getFieldError('userId')">
    <aava-select-option *ngFor="let user of users" [value]="user.value">
      {{ user.label }}
    </aava-select-option>
  </aava-select>
</form>`;

  iconsValidationExample = `<aava-select 
  label="Select Status" 
  placeholder="Select status"
  [(ngModel)]="selectedStatus"
  [error]="statusError">
  <aava-select-option *ngFor="let status of statusOptions" [value]="status.value">
    <aava-icon 
      iconSize="15" 
      [iconName]="status.icon" 
      [iconColor]="status.color">
    </aava-icon>
    {{ status.label }}
  </aava-select-option>
</aava-select>`;

  constructor() {
    console.log('API Demo Component loaded!');
  }
}
