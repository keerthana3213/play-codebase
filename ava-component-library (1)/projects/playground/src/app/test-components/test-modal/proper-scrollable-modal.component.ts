import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AavaButtonComponent, AavaDialogService, AavaCheckboxComponent } from '@aava/play-core';
import { AavaSelectComponent } from '../../../../../play-core/src/lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../../../play-core/src/lib/components/select/select-option/aava-select-option.component';

@Component({
  selector: 'app-proper-scrollable-modal',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent, 
    AavaCheckboxComponent,
    ReactiveFormsModule,
    AavaSelectComponent,
    AavaSelectOptionComponent
  ],
  template: `
  <div style="padding:24px;
  overflow-y: auto;
  max-height: 80vh;
  ">

  <div style="display:flex;
    flex-direction: column;
    gap:24px;"
    >
    <div 
    dialog-header 
    style="
    color: #3B3F46;
    font-family: Mulish;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 
    justify-content:flex-start;
    ">
      <h3 style="margin-bottom:0px;">Heading</h3>
    </div>
    <div dialog-body  >
      <form [formGroup]="form">
      <div>
        <h4 >Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Heading small</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <div style="margin: 16px 0;">
          <aava-select 
            size="md" 
            label="Select User" 
            placeholder="Choose a user"
            formControlName="selectedUser">
            <aava-select-option *ngFor="let user of users" [value]="user.value">
              {{ user.label }}
            </aava-select-option>
          </aava-select>
        </div>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
      </div>
      <div>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
      </div>
      <div style="
      display: flex;
      height: 24px;
      padding: 0 0;
      align-items: center;
      gap: 8px;
      align-self: stretch;"
      >
        <aava-checkbox variant="default" size="sm"></aava-checkbox>
        <label> Accept Terms and Conditions</label>
      </div>
      </form>
    </div>
    <div dialog-footer style="
    display:flex;
    justify-content: flex-end;
    flex-direction: row;
    gap: 10px;
    align-items: flex-end;
    align-self: stretch;">
      <aava-button
        label="Label"
        variant="secondary"
        size="md"
        (userClick)="onClose()"
      ></aava-button>
      <aava-button
        label="Label"
        variant="primary"
        size="md"
        (userClick)="onClose()"
      ></aava-button>
    </div>
  </div>
  </div>
  `
})
export class ProperScrollableModalComponent {
  form: FormGroup;
  
  users = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Bob Johnson' },
    { value: 4, label: 'Alice Williams' },
    { value: 5, label: 'Charlie Brown' },
  ];

  constructor(
    private dialogService: AavaDialogService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      selectedUser: ['']
    });
  }

  onClose() {
    console.log('Form value:', this.form.value);
    this.dialogService.close();
  }
}
