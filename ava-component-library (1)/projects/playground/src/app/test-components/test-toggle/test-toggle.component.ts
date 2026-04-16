import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AavaToggleComponent } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'app-test-toggle',
  imports: [CommonModule, ReactiveFormsModule, AavaToggleComponent],
  templateUrl: './test-toggle.component.html',
  styleUrl: './test-toggle.component.scss'
})
export class TestToggleComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      chk1: [false],
      chk2: [false],
    });
  }
  pf() {
    this.form.patchValue({
      chk1: true,
      chk2: true
    })
  }
  pc() {
    this.form.controls['chk1'].patchValue(true);
  }

}
