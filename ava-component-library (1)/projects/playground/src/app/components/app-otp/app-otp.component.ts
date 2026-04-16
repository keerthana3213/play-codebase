import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-otp.component.html',
  styleUrls: ['./app-otp.component.scss'],
})
export class AppOtpComponent {
  // Demo values for different variants
  otpDefault = '';
  otpSuccess = '';
  otpError = '';
  otpWarning = '';
  otpInfo = '';
  otpDisabled = '123456';

  // Different lengths
  otp4Digit = '';
  otp6Digit = '';
  otp8Digit = '';

  // Size variants
  otpXSmall = '';
  otpSmall = '';
  otpMedium = '';
  otpLarge = '';
  otpXLarge = '';

  // Special variants
  otpMasked = '';
  otpReadonly = '654321';

  onOtpComplete(value: string, type: string) {
    console.log(`${type} OTP completed:`, value);
    // You could trigger form submission or validation here
  }

  onOtpChange(value: string, type: string) {
    console.log(`${type} OTP changed:`, value);
  }

  clearOtp(type: string) {
    switch (type) {
      case 'default':
        this.otpDefault = '';
        break;
      case 'success':
        this.otpSuccess = '';
        break;
      case 'error':
        this.otpError = '';
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
      case 'xsmall':
        this.otpXSmall = '';
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
      case 'xlarge':
        this.otpXLarge = '';
        break;
      case 'masked':
        this.otpMasked = '';
        break;
    }
  }

  // Code examples for documentation
  codeExamples = {
    basic: `
<ava-otp 
  label="Verification Code" 
  [(ngModel)]="otpValue"
  (complete)="onOtpComplete($event)"
></ava-otp>`,

    variants: `
<!-- Success variant -->
<ava-otp 
  label="Success OTP" 
  variant="success" 
  [(ngModel)]="otpSuccess"
></ava-otp>

<!-- Error variant -->
<ava-otp 
  label="Error OTP" 
  variant="error" 
  error="Invalid code"
  [(ngModel)]="otpError"
></ava-otp>`,

    sizes: `
<!-- Different sizes -->
<ava-otp size="xsmall" [(ngModel)]="otpXS"></ava-otp>
<ava-otp size="small" [(ngModel)]="otpSM"></ava-otp>
<ava-otp size="medium" [(ngModel)]="otpMD"></ava-otp>
<ava-otp size="large" [(ngModel)]="otpLG"></ava-otp>
<ava-otp size="xlarge" [(ngModel)]="otpXL"></ava-otp>`,

    lengths: `
<!-- Different lengths -->
<ava-otp [length]="4" [(ngModel)]="otp4"></ava-otp>
<ava-otp [length]="6" [(ngModel)]="otp6"></ava-otp>
<ava-otp [length]="8" [(ngModel)]="otp8"></ava-otp>`,

    features: `
<!-- Masked input -->
<ava-otp [mask]="true" [(ngModel)]="otpMasked"></ava-otp>

<!-- Disabled -->
<ava-otp [disabled]="true" value="123456"></ava-otp>

<!-- Readonly -->
<ava-otp [readonly]="true" value="654321"></ava-otp>

<!-- With helper text -->
<ava-otp 
  helper="Enter the 6-digit code sent to your phone"
  [(ngModel)]="otpValue"
></ava-otp>`
  };
}
