import { Component } from '@angular/core';
import {
  AavaButtonComponent,
  AavaIconComponent,
  SnackbarService,
} from '@aava/play-core';

@Component({
  selector: 'app-test-snackbar',
  imports: [AavaButtonComponent],
  templateUrl: './test-snackbar.component.html',
  styleUrl: './test-snackbar.component.scss',
})
export class TestSnackbarComponent {
  onButtonClick(event: Event) {
    console.log('Button clicked:', event);
  }

  constructor(private snackbarService: SnackbarService) { }

  showLargeSuccess() {
    this.snackbarService.show(
      'Your changes have been saved successfully',
      'center',
      4000,
      '#fff',
      '#f0f1f2', //background color
      {
        styleType: 'success',
        type: 'custom',
        size: 'lg',
        title: 'Saved Successfully',
        buttonLabel: 'Next',
        buttonSize: 'lg',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'circle-check',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showMediumSuccess() {
    this.snackbarService.show(
      'Your changes have been saved successfully',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'success',
        type: 'custom',
        size: 'md',
        title: 'Saved Successfully',
        buttonLabel: 'Next',
        buttonSize: 'md',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'circle-check',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showSmallSuccess() {
    this.snackbarService.show(
      'Your changes have been saved successfully',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'success',
        type: 'custom',
        size: 'sm',
        title: 'Saved Successfully',
        buttonLabel: 'Next',
        buttonSize: 'sm',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'circle-check',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  //warning
  showLargeWarning() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'warning',
        type: 'custom',
        size: 'lg',
        title: 'Action Required',
        buttonLabel: 'Next',
        buttonSize: 'lg',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'alert-triangle',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showMediumWarning() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'warning',
        type: 'custom',
        size: 'md',
        title: 'Action Required',
        buttonLabel: 'Next',
        buttonSize: 'md',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'alert-triangle',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showSmallWarning() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'warning',
        type: 'custom',
        size: 'sm',
        title: 'Action Required',
        buttonLabel: 'Next',
        buttonSize: 'sm',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'alert-triangle',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  //error
  showLargeError() {
    this.snackbarService.show(
      'Connection error. Unable to connect to the server at present.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'danger',
        type: 'custom',
        size: 'lg',
        title: 'Error Occurred',
        buttonLabel: 'Retry',
        buttonSize: 'lg',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showMediumError() {
    this.snackbarService.show(
      'Connection error. Unable to connect to the server at present.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'danger',
        type: 'custom',
        size: 'md',
        title: 'Error Occurred',
        buttonLabel: 'Retry',
        buttonSize: 'md',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showSmallError() {
    this.snackbarService.show(
      'Connection error. Unable to connect to the server at present.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'danger',
        type: 'custom',
        size: 'sm',
        title: 'Error Occurred',
        buttonLabel: 'Retry',
        buttonSize: 'sm',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  //info

  showLargeInfo() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information now.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'info',
        type: 'custom',
        size: 'lg',
        title: 'Action Required',
        buttonLabel: 'Retry',
        buttonSize: 'lg',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showMediumInfo() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information now.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'info',
        type: 'custom',
        size: 'md',
        title: 'Action Required',
        buttonLabel: 'Retry',
        buttonSize: 'md',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  showSmallInfo() {
    this.snackbarService.show(
      'Incomplete fields. Please fill in all required information now.',
      'center',
      4000,
      '#fff',
      '#f0f1f2',
      {
        styleType: 'info',
        type: 'custom',
        size: 'sm',
        title: 'Action Required',
        buttonLabel: 'Retry',
        buttonSize: 'sm',
        onButtonClick: (event) => {
          console.log('Next clicked!');
          this.snackbarService.dismiss();
        },
        persistent: true,
        icon: {
          name: 'info',
          color: '#fff',
          size: 18,
        },
      }
    );
  }
}
