import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaOtpComponent } from '@aava/play-core';


@Component({
  selector: 'app-test-otp',
  standalone: true,
  imports: [CommonModule, AavaOtpComponent],
  templateUrl: './test-otp.component.html',
  styleUrls: ['./test-otp.component.scss'],
})
export class TestOtpComponent {
  @ViewChild('autoDisableOtp') autoDisableOtp!: AavaOtpComponent;

  // Auto-disable demo state
  isAutoDisableOtpDisabled = false;

  onOtpComplete(value: string, type: string) {
    console.log(`${type} OTP completed:`, value);

    // Auto-disable functionality for the demo
    if (type === 'auto-disable') {
      this.isAutoDisableOtpDisabled = true;
      console.log('OTP auto-disabled after completion');
    }
  }

  onOtpChange(value: string, type: string) {
    console.log(`${type} OTP changed:`, value);
  }

  resetAutoDisableOtp() {
    this.isAutoDisableOtpDisabled = false;
    if (this.autoDisableOtp) {
      this.autoDisableOtp.clear();
    }
  }
}
