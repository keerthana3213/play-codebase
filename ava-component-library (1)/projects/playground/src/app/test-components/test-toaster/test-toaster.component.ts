import { Component } from '@angular/core';
import {
  AavaButtonComponent,
  AavaIconComponent,
  AavaToastService,
} from '@aava/play-core';

@Component({
  selector: 'app-test-toaster',
  imports: [AavaButtonComponent],
  templateUrl: './test-toaster.component.html',
  styleUrl: './test-toaster.component.scss',
})
export class TestToasterComponent {
  constructor(private toastService: AavaToastService) { }

  //success
  showBasicSuccesslarge() {
    this.toastService.success({
      title: 'Successfully created!',
      message: 'Your changes have been saved successfully',
      duration: 4000,
      design: 'modern',
      size: 'sm',
      showCloseButton: false
    });
  }
  showBasicSuccessMedium() {
    this.toastService.success({
      title: 'Successfully created!',
      message: 'Your changes have been saved successfully',
      duration: 4000,
      design: 'modern',
      size: 'md',
      showCloseButton: true

    });
  }
  showBasicSuccessSmall() {
    this.toastService.success({
      title: 'Successfully created!',
      message: 'Your changes have been saved successfully',
      duration: 4000,
      design: 'modern',
      size: 'lg',
      showCloseButton: false

    });
  }

  //warning

  showBasicWarninglarge() {
    this.toastService.warning({
      title: 'Action Required',
      message: 'Incomplete fields.Please fill in all required information.',
      duration: 4000,
      design: 'modern',
      size: 'small',
      showCloseButton: false

    });
  }
  showBasicWarningMedium() {
    this.toastService.warning({
      title: 'Action Required',
      message: 'Incomplete fields.Please fill in all required information.',
      duration: 4000,
      design: 'modern',
      size: 'medium',
      showCloseButton: false

    });
  }
  showBasicWarningSmall() {
    this.toastService.warning({
      title: 'Action Required',
      message: 'Incomplete fields.Please fill in all required information.',
      duration: 4000,
      design: 'modern',
      size: 'large',
      showCloseButton: false

    });
  }

  //error

  showBasicErrorlarge() {
    this.toastService.error({
      title: 'Error Occurred',
      message: 'Connection error. Unable to connect to the server at present',
      duration: 4000,
      customWidth: '400px',
      design: 'modern',
      size: 'large',
      showCloseButton: false

    });
  }
  showBasicErrorMedium() {
    this.toastService.error({
      title: 'Error Occurred',
      message: 'Connection error. Unable to connect to the server at present',
      duration: 4000,
      customWidth: '350px',
      design: 'modern',
      size: 'medium',
      showCloseButton: false

    });
  }
  showBasicErrorSmall() {
    this.toastService.error({
      title: 'Error Occurred',
      message: 'Connection error. Unable to connect to the server at present',
      duration: 4000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
      showCloseButton: false

    });
  }

  //info

  showBasicInfoLarge() {
    this.toastService.info({
      title: 'Action Required',
      message: 'Incomplete fields. Please fill in all required information now',
      duration: 4000,
      customWidth: '400px',
      design: 'modern',
      size: 'large',
      showCloseButton: false

    });
  }
  showBasicInfoMedium() {
    this.toastService.info({
      title: 'Action Required',
      message: 'Incomplete fields. Please fill in all required information now',
      duration: 4000,
      customWidth: '350px',
      design: 'modern',
      size: 'medium',
      showCloseButton: false

    });
  }
  showBasicInfoSmall() {
    this.toastService.info({
      title: 'Action Required',
      message: 'Incomplete fields. Please fill in all required information now',
      duration: 4000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
      showCloseButton: false

    });
  }
}
