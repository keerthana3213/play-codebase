import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ava-textbox-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textbox-otp.component.html',
  styleUrls: ['./textbox-otp.component.scss'],
})
export class TextboxOtpComponent {
  // OTP values for different variants
  otpDefault = '';
  otpError = '';
  otpSuccess = '';
  otpWarning = '';
  otpInfo = '';
  otpDisabled = '123456';

  // Different OTP lengths
  otp4Digit = '';
  otp6Digit = '';
  otp8Digit = '';

  // Size variants
  otpSmall = '';
  otpMedium = '';
  otpLarge = '';

  onOtpChange(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    console.log(`${type} OTP value changed:`, target.value);
  }

  onOtpInput(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    console.log(`${type} OTP input:`, target.value);
  }

  clearOtp(type: string) {
    switch (type) {
      case 'default':
        this.otpDefault = '';
        break;
      case 'error':
        this.otpError = '';
        break;
      case 'success':
        this.otpSuccess = '';
        break;
      case 'warning':
        this.otpWarning = '';
        break;
      case 'info':
        this.otpInfo = '';
        break;
      case '4digit':
        this.otp4Digit = '';
        break;
      case '6digit':
        this.otp6Digit = '';
        break;
      case '8digit':
        this.otp8Digit = '';
        break;
      case 'small':
        this.otpSmall = '';
        break;
      case 'medium':
        this.otpMedium = '';
        break;
      case 'large':
        this.otpLarge = '';
        break;
    }
    console.log(`${type} OTP cleared`);
  }
}
