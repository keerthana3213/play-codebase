import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent, AavaAvatarsComponent, AavaCheckboxComponent } from '@aava/play-core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AavaSelectComponent } from '../../../../../play-core/src/lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../../../play-core/src/lib/components/select/select-option/aava-select-option.component';

@Component({
  selector: 'app-test-accordion',
  imports: [
    CommonModule, 
    AavaAccordionComponent, 
    AavaCheckboxComponent, 
    AavaAvatarsComponent,
    ReactiveFormsModule,
    AavaSelectComponent,
    AavaSelectOptionComponent
  ],
  templateUrl: './test-accordion.component.html',
  styleUrl: './test-accordion.component.scss'
})
export class TestAccordionComponent {
  sampleImageUrl = 'assets/1.svg';
  form: FormGroup;

  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Bob Johnson' },
    { value: 4, label: 'Alice Williams' },
    { value: 5, label: 'Charlie Brown' },
  ];

  // Arrays for ngFor loops
  scrollItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tableRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  contentParagraphs = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      accordionSelect: [''],
      accordionMultipleSelect: [[]]
    });
  }

  public settingsContent = `
    <h4>Account Settings</h4>
    <p>Manage your account preferences and security settings.</p>
    <ul>
      <li>Profile information</li>
      <li>Security settings</li>
      <li>Notification preferences</li>
      <li>Privacy controls</li>
    </ul>
  `;

  onAccordionToggle(event: any): void {
    console.log('Accordion toggled:', event);
  }

  onSelectChange(value: any): void {
    console.log('Select value changed:', value);
    console.log('Form value:', this.form.value);
  }
}
