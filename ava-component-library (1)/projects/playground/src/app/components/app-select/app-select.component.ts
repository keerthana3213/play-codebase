import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';
import { FormsModule } from '@angular/forms';

interface SelectDocSection {
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
  selector: 'awe-app-select',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaSelectComponent, AavaSelectOptionComponent, FormsModule],
  templateUrl: './app-select.component.html',
  styleUrls: [
    './app-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppSelectComponent {
  // Documentation sections
  sections: SelectDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Simple select component with keyboard navigation and basic functionality.',
      showCode: false,
    },
    {
      title: 'Form Integration',
      description:
        'Integration with Angular reactive forms and template-driven forms with validation.',
      showCode: false,
    },
    {
      title: 'Multiple Selection',
      description:
        'Multi-select functionality with checkboxes and array value handling.',
      showCode: false,
    },
    {
      title: 'Icons & Visual Indicators',
      description:
        'Options with icons, colors, and additional visual information.',
      showCode: false,
    },
    {
      title: 'States & Validation',
      description:
        'Different states: disabled, error, loading, and validation feedback.',
      showCode: false,
    },
    {
      title: 'Search & Large Datasets',
      description:
        'Searchable select with filtering for large datasets and performance optimization.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'placeholder',
      type: 'string',
      default: 'Select',
      description: 'Placeholder text displayed when no option is selected.',
    },
    {
      name: 'label',
      type: 'string',
      default: '',
      description: 'Label text displayed above the select component.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the select field is required for form validation.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the select component is disabled.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enable multiple selection with checkboxes.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the select component.',
    },
    {
      name: 'showSearch',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the search input for filtering options.',
    },
    {
      name: 'error',
      type: 'string',
      default: '',
      description: 'Error message to display below the select component.',
    },
    {
      name: 'dropdownIcon',
      type: 'string',
      default: 'chevron-down',
      description: 'Icon name for the dropdown arrow.',
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.',
    },
  ];

  // Sample data for quick demos
  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Jack Wilson' },
    { value: 4, label: 'James Brown' }
  ];

  selectedUser = 1;
  selectedUsers: number[] = [1, 2];

  // Simple example handlers
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  onSelectionChange(event: any) {
    console.log('Selection changed:', event);
  }

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
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'app-basic-select',
  standalone: true,
  imports: [AavaSelectComponent, AavaSelectOptionComponent],
  template: \`
    <aava-select
      label="Select User"
      placeholder="Select a user"
      [(ngModel)]="selectedUser">
      <aava-select-option *ngFor="let user of users" [value]="user.value">
        {{ user.label }}
      </aava-select-option>
    </aava-select>
  \`
})
export class BasicSelectComponent {
  selectedUser = 1;
  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Jack Wilson' }
  ];
}`,
      'multiple selection': `
import { Component } from '@angular/core';
import { AavaSelectComponent, AavaSelectOptionComponent, AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [AavaSelectComponent, AavaSelectOptionComponent, AavaCheckboxComponent],
  template: \`
    <aava-select
      [multiple]="true"
      label="Select Users"
      placeholder="Select users"
      [(ngModel)]="selectedUsers">
      <aava-select-option *ngFor="let user of users" [value]="user.value">
        <aava-checkbox [isChecked]="selectedUsers.includes(user.value)">
        </aava-checkbox>
        {{ user.label }}
      </aava-select-option>
    </aava-select>
  \`
})
export class MultiSelectComponent {
  selectedUsers: number[] = [1, 2];
  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Jack Wilson' }
  ];
}`,
    };

    return examples[section.toLowerCase()] || '';
  }
}
