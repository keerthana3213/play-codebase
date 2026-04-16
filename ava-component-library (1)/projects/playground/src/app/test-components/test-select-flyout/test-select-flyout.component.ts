import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaSelectFlyoutComponent,
  SelectOption,
  AavaButtonComponent,
} from '@aava/play-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-test-select-flyout',
  imports: [
    AavaSelectFlyoutComponent,
    AavaButtonComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './test-select-flyout.component.html',
  styleUrl: './test-select-flyout.component.scss',
})
export class TestSelectFlyoutComponent {
  form: FormGroup;

  // Sample data for different test scenarios
  simpleOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1', icon: 'star' },
    { value: 'option2', label: 'Option 2', icon: 'heart' },
    { value: 'option3', label: 'Option 3', icon: 'check' },
    { value: 'option4', label: 'Option 4', icon: 'user' },
  ];

  twoLevelOptions: SelectOption[] = [
    {
      value: 'category1',
      label: 'Category 1',
      icon: 'folder',
      children: [
        { value: 'sub1', label: 'Sub Option 1', icon: 'file' },
        { value: 'sub2', label: 'Sub Option 2', icon: 'file-text' },
        { value: 'sub3', label: 'Sub Option 3', icon: 'file-code' },
      ],
    },
    {
      value: 'category2',
      label: 'Category 2',
      icon: 'folder',
      children: [
        { value: 'sub4', label: 'Sub Option 4', icon: 'file' },
        { value: 'sub5', label: 'Sub Option 5', icon: 'file-text' },
      ],
    },
    { value: 'standalone', label: 'Standalone Option', icon: 'star' },
  ];

  threeLevelOptions: SelectOption[] = [
    {
      value: 'main1',
      label: 'Main Category 1',
      icon: 'folder',
      children: [
        {
          value: 'sub1',
          label: 'Sub Category 1',
          icon: 'folder-open',
          children: [
            { value: 'item1', label: 'Item 1.1', icon: 'file' },
            { value: 'item2', label: 'Item 1.2', icon: 'file-text' },
            { value: 'item3', label: 'Item 1.3', icon: 'file-code' },
          ],
        },
        {
          value: 'sub2',
          label: 'Sub Category 2',
          icon: 'folder-open',
          children: [
            { value: 'item4', label: 'Item 2.1', icon: 'file' },
            { value: 'item5', label: 'Item 2.2', icon: 'file-text' },
          ],
        },
      ],
    },
    {
      value: 'main2',
      label: 'Main Category 2',
      icon: 'folder',
      children: [
        {
          value: 'sub3',
          label: 'Sub Category 3',
          icon: 'folder-open',
          children: [
            { value: 'item6', label: 'Item 3.1', icon: 'file' },
            { value: 'item7', label: 'Item 3.2', icon: 'file-text' },
          ],
        },
      ],
    },
    { value: 'standalone2', label: 'Standalone Option 2', icon: 'star' },
  ];

  mixedOptions: SelectOption[] = [
    // Level 1: Simple options
    { value: 'simple1', label: 'Simple Option 1', icon: 'circle' },
    { value: 'simple2', label: 'Simple Option 2', icon: 'square' },

    // Level 2: Options with children
    {
      value: 'parent1',
      label: 'Parent Option 1',
      icon: 'folder',
      children: [
        { value: 'child1', label: 'Child 1.1', icon: 'file' },
        { value: 'child2', label: 'Child 1.2', icon: 'file-text' },
      ],
    },

    // Level 3: Options with nested children
    {
      value: 'parent2',
      label: 'Parent Option 2',
      icon: 'folder',
      children: [
        {
          value: 'subparent1',
          label: 'Sub Parent 2.1',
          icon: 'folder-open',
          children: [
            { value: 'grandchild1', label: 'Grandchild 2.1.1', icon: 'file' },
            { value: 'grandchild2', label: 'Grandchild 2.1.2', icon: 'file-text' },
          ],
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      simple: ['', Validators.required],
      twoLevel: ['', Validators.required],
      threeLevel: ['', Validators.required],
      mixed: ['', Validators.required],
      searchable: [''],
      clearable: [''],
      disabled: [''],
      error: [''],
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }

  triggerError() {
    const control = this.form.get('simple');
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  clearError() {
    const control = this.form.get('simple');
    if (control) {
      control.reset();
    }
  }

  onSelectionChange(option: SelectOption, fieldName: string) {
    console.log(`${fieldName} selected:`, option);
  }

  onSimpleChange(option: SelectOption) {
    this.onSelectionChange(option, 'Simple');
  }

  onTwoLevelChange(option: SelectOption) {
    this.onSelectionChange(option, 'Two Level');
  }

  onThreeLevelChange(option: SelectOption) {
    this.onSelectionChange(option, 'Three Level');
  }

  onMixedChange(option: SelectOption) {
    this.onSelectionChange(option, 'Mixed');
  }

  onSearchableChange(option: SelectOption) {
    this.onSelectionChange(option, 'Searchable');
  }

  onClearableChange(option: SelectOption) {
    this.onSelectionChange(option, 'Clearable');
  }
}
