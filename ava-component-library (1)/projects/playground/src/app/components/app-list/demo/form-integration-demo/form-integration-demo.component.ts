import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AavaListComponent,
  ListItem,
  ListSelectionEvent,
} from '@aava/play-core';

@Component({
  selector: 'ava-list-form-integration-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AavaListComponent],
  template: `
    <form class="demo" [formGroup]="form" (ngSubmit)="onSubmit()">
      <aava-list
        [items]="items"
        [title]="'Team Selection (Required)'"
        [multiSelect]="true"
        [height]="'280px'"
        [width]="'460px'"
        formControlName="team"
        (onSelectionChanged)="onSelectionChanged($event)"
      ></aava-list>

      <div class="status">
        Form valid: {{ form.valid ? 'Yes' : 'No' }} | Selected:
        {{ selected.length }}
      </div>

      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `,
  styles: [
    `
      .demo {
        max-width: 500px;
        margin: 2rem auto;
        display: grid;
        gap: 12px;
      }
      .status {
        font-size: 14px;
      }
      button {
        padding: 8px 12px;
      }
    `,
  ],
})
export class FormIntegrationDemoComponent {
  form: FormGroup;
  selected: ListItem[] = [];

  items: ListItem[] = [
    { id: '1', title: 'John Doe', subtitle: 'Software Engineer' },
    { id: '2', title: 'Jane Smith', subtitle: 'Product Manager' },
    { id: '3', title: 'Bob Johnson', subtitle: 'UX Designer' },
    { id: '4', title: 'Alice Brown', subtitle: 'Data Scientist' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      team: [[], Validators.required],
    });
  }

  onSelectionChanged(event: ListSelectionEvent): void {
    this.selected = event.selectedItems;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitted:', this.form.value);
    }
  }
}
