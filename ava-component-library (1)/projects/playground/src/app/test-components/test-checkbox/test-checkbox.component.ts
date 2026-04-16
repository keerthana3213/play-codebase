import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AavaCheckboxComponent } from '@aava/play-core';


@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent, ReactiveFormsModule],
  templateUrl: './test-checkbox.component.html',
  styleUrl: './test-checkbox.component.scss'
})
export class TestCheckboxComponent {
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
