import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-states-validation',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-states-validation.component.html',
  styleUrls: ['./textbox-states-validation.component.scss'],
})
export class TextboxStatesValidationComponent {
  helperValue = '';
  errorStateValue = '';
  requiredValue = '';
  maxLengthValue = '';
  minLengthValue = '';
  emailValidationValue = '';

  onHelperChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Helper textbox value changed:', target.value);
  }

  onErrorChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Error state textbox value changed:', target.value);
  }

  onRequiredChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Required textbox value changed:', target.value);
  }

  onMaxLengthChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Max length textbox value changed:', target.value);
  }

  onMinLengthChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Min length textbox value changed:', target.value);
  }

  onEmailValidationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Email validation textbox value changed:', target.value);
  }
}
