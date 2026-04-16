import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaAvatarsComponent,
  AavaButtonComponent,
  AavaIconComponent,
  AavaCheckboxComponent,
} from '@aava/play-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AavaSelectComponent } from '../../../../../play-core/src/lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../../../play-core/src/lib/components/select/select-option/aava-select-option.component';

// Interface for nested hierarchical options
interface NestedOption {
  value: any;
  label: string;
  level: number;
  parent?: boolean;
  disabled?: boolean;
  selectparent?: boolean;
}
@Component({
  selector: 'app-test-select',
  imports: [
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaCheckboxComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    CommonModule,
    ReactiveFormsModule,
    AavaButtonComponent,
  ],
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss',
})
export class TestSelectComponent {
  form: FormGroup;
  valueAsObjectForm: FormGroup;
  statusOptions = [
    { value: 'active', label: 'Active', icon: 'circle-check', color: 'green' },
    { value: 'inactive', label: 'Inactive', icon: 'x-circle', color: 'red' },
    { value: 'pending', label: 'Pending', icon: 'clock', color: 'orange' },
    { value: 'suspended', label: 'Suspended', icon: 'pause', color: 'gray' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      category: ['', Validators.required],
      location: [''],
      users: [[]], // For multiple user selection
      checkboxUsers: [[]], // For checkbox test
      mediumUsers: [[]], // For medium size checkbox
      smallUsers: [[]], // For small size checkbox
      xsUsers: [[]], // For extra small size checkbox
      nestedFruits: [[]], // For nested hierarchical select
      nestedCategories: [[]], // For nested categories select
      nestedLocation: [''], // For single nested location select
      singleSelect: [''], // For single select example

    });
    this.valueAsObjectForm = this.fb.group({
      valueAsObject: ['', Validators.required],
      multipleValueAsObject: [[], Validators.required]
    })
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
    const control = this.form.get('status');
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }
  clearError() {
    const control = this.form.get('status');
    if (control) {
      control.reset();
    }
  }
  acceptTerms = false;
  onCheckboxChange(checked: boolean) {
    console.log('Checkbox changed:', checked);
  }
  sampleImageUrl = 'assets/1.svg';
  basicIcons = [
    { name: 'home', label: 'Home' },
    { name: 'user', label: 'User' },
    { name: 'settings', label: 'Settings' },
    { name: 'heart', label: 'Heart' },
    { name: 'star', label: 'Star' },
  ];
  onIconClick(event: Event): void {
    console.log('Icon clicked:', event);
  }
  users = [
    { value: 1, label: 'option 1' },
    { value: 2, label: 'option 2' },
    { value: 3, label: 'option 3' },
    { value: 4, label: 'option 4' },
  ];
  selectedUsers: number[] = [];

  // Example data structure for nested hierarchical select (as requested in the user requirements)
  nestedFruitsOptions: NestedOption[] = [
    { value: 1, label: 'Fruits', level: 0, parent: true, disabled: true },
    {
      value: 2,
      label: 'Mango',
      level: 1,
      parent: true,
      disabled: true,
      selectparent: true,
    },
    { value: 3, label: 'Salem mango', level: 2, disabled: true },
    { value: 4, label: 'Goa mango', level: 2, disabled: true },
    { value: 5, label: 'Vegetables', level: 0 },
    { value: 6, label: 'Tomato', level: 1 },
  ];

  fruits = [
    { value: 10, label: 'Apple' },
    { value: 3, label: 'Banana' },
    { value: 7, label: 'Cherry' },
    { value: 1, label: 'Mango' },
    { value: 5, label: 'Orange' }
  ];

  // More comprehensive nested categories example
  nestedCategoriesOptions: NestedOption[] = [
    { value: 'mobiles', label: 'Mobiles', level: 0, parent: true },
    { value: 'iphone', label: 'iPhone', level: 1, parent: true },
    { value: 'iphone14', label: 'iPhone 14', level: 2 },
    { value: 'iphone15', label: 'iPhone 15', level: 2 },
    { value: 'iphone16', label: 'iPhone 16', level: 2 },
    { value: 'samsung', label: 'Samsung', level: 1, parent: true },
    { value: 'galaxy-s24', label: 'Galaxy S24', level: 2 },
    { value: 'galaxy-note', label: 'Galaxy Note', level: 2 },
    { value: 'galaxy-fold', label: 'Galaxy Fold', level: 2 },
    { value: 'oneplus', label: 'OnePlus', level: 1 },
    { value: 'xiaomi', label: 'Xiaomi', level: 1 },

    { value: 'laptops', label: 'Laptops', level: 0, parent: true },
    { value: 'macbook', label: 'MacBook', level: 1, parent: true },
    { value: 'macbook-air', label: 'MacBook Air', level: 2 },
    { value: 'macbook-pro', label: 'MacBook Pro', level: 2 },
    { value: 'dell', label: 'Dell', level: 1 },
    { value: 'hp', label: 'HP', level: 1 },
    { value: 'lenovo', label: 'Lenovo', level: 1 },
  ];

  // Additional location example with nested structure
  locationOptions: NestedOption[] = [
    { value: 'usa', label: 'United States', level: 0, parent: true },
    { value: 'california', label: 'California', level: 1 },
    { value: 'texas', label: 'Texas', level: 1 },
    { value: 'newyork', label: 'New York', level: 1 },
    { value: 'florida', label: 'Florida', level: 1 },

    { value: 'canada', label: 'Canada', level: 0, parent: true },
    { value: 'ontario', label: 'Ontario', level: 1 },
    { value: 'quebec', label: 'Quebec', level: 1 },
    { value: 'british-columbia', label: 'British Columbia', level: 1 },

    { value: 'uk', label: 'United Kingdom', level: 0, parent: true },
    { value: 'england', label: 'England', level: 1 },
    { value: 'scotland', label: 'Scotland', level: 1 },
    { value: 'wales', label: 'Wales', level: 1 },
  ];

  onCategoryChange(value: any): void {
    console.log('Category selected:', value);
  }

  onLocationChange(value: any): void {
    console.log('Location selected:', value);
  }

  triggerCategoryError(): void {
    const control = this.form.get('category');
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  // Example event handler for library users
  onItemSelected(event: { value: any; label: string; option: any }) {
    console.log('🎯 Item Selected in Test Component:', event);

    // Users can add their custom logic here:
    // - Send API calls
    // - Update other components
    // - Show notifications
    // - Navigate to other pages
    // - etc.

    // Example: Show alert for demonstration
    // alert(`Selected: ${event.label} (${event.value})`);
  }
  f(event: any) {
    console.log(event);
  }

  fo(event: any) {
    console.log('fo', event);
  }

  // Helper method to check if a fruit is selected in multiple selection mode
  isFruitSelected(fruit: any): boolean {
    const selectedValues = this.valueAsObjectForm.get('multipleValueAsObject')?.value;
    if (!selectedValues || !Array.isArray(selectedValues)) {
      return false;
    }
    return selectedValues.some((v: any) => v.value === fruit.value);
  }

  // Method to print form value for single select
  printFormValue(): void {
    const singleSelectValue = this.form.get('singleSelect')?.value;
    console.log('Single Select Form Value:', singleSelectValue);
    console.log('Complete Form Value:', this.form.value);
    console.log('Form Value (JSON):', JSON.stringify(this.form.value, null, 2));
  }


  oClick() {
    console.log('click');
  }
  onOptionClick() {
    console.log("Aava Icon Clicked");
  }
  onTest() {
    console.log("Icon Clicked");
  }

}
