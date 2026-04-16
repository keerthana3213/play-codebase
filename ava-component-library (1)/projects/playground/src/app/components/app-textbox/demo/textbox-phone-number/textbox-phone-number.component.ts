import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-phone-number',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-phone-number.component.html',
  styleUrls: ['./textbox-phone-number.component.scss']
})
export class TextboxPhoneNumberComponent {
  // Start position (left side) values
  phoneDefault = '';
  phoneError = '';
  phoneSuccess = '';
  phoneWarning = '';
  phoneInfo = '';

  // End position (right side) values
  phoneDefaultEnd = '';
  phoneErrorEnd = '';
  phoneSuccessEnd = '';
  phoneWarningEnd = '';
  phoneInfoEnd = '';

  onPhoneInput(event: any, variant: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Update the corresponding property based on variant
    switch (variant) {
      case 'default':
        this.phoneDefault = value;
        break;
      case 'error':
        this.phoneError = value;
        break;
      case 'success':
        this.phoneSuccess = value;
        break;
      case 'warning':
        this.phoneWarning = value;
        break;
      case 'info':
        this.phoneInfo = value;
        break;
      case 'defaultEnd':
        this.phoneDefaultEnd = value;
        break;
      case 'errorEnd':
        this.phoneErrorEnd = value;
        break;
      case 'successEnd':
        this.phoneSuccessEnd = value;
        break;
      case 'warningEnd':
        this.phoneWarningEnd = value;
        break;
      case 'infoEnd':
        this.phoneInfoEnd = value;
        break;
    }

    console.log(`Phone ${variant} input:`, value);
  }
}
