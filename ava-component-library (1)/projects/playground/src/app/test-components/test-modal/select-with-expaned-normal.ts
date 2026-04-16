import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AavaDialogService } from '@aava/play-core';
import { AavaSelectComponent } from '../../../../../play-core/src/lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../../../play-core/src/lib/components/select/select-option/aava-select-option.component';

@Component({
  selector: 'app-select-modal-example1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AavaSelectComponent,
    AavaSelectOptionComponent,
  ],
  template: `
      <div style="padding:15px;margin-top: 20px;">
        <div style="background:yellow;padding:10px">
            <aava-select mode="normal" [inModal] = "true" [expanded]="true" >
                <aava-select-option *ngFor="let opt of users" [value]="opt.value">
                    {{opt.label}}
                </aava-select-option>
            </aava-select>
        </div>    
      </div>
  `,
})
export class SelectWithModalExampleComponent {
  users = [
    { value: 1, label: 'John Doe' },
  ];
  constructor(
    private fb: FormBuilder,
    private dialogService: AavaDialogService
  ) {

  }




} 