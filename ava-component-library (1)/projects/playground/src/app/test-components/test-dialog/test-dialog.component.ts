import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'test-dialog',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.scss'
})
export class TestDialogComponent {

  constructor(private dialogService: AavaDialogService) { }

  // Simple Alert Examples
  showSuccessAlert() {
    this.dialogService.success({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Success alert closed:', result);
    });
  }

  showWarningAlert() {
    this.dialogService.warning({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Warning alert closed:', result);
    });
  }

  showErrorAlert() {
    this.dialogService.error({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Error alert closed:', result);
    });
  }

  // Size Variant Methods - Large (lg)
  showSuccessLarge() {
    this.dialogService.success({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'lg',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Success Large dialog closed:', result);
    });
  }

  showWarningLarge() {
    this.dialogService.warning({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'lg',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Warning Large dialog closed:', result);
    });
  }

  showErrorLarge() {
    this.dialogService.error({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'lg',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Error Large dialog closed:', result);
    });
  }

  // Size Variant Methods - Medium (md)
  showSuccessMedium() {
    this.dialogService.success({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'md',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Success Medium dialog closed:', result);
    });
  }

  showWarningMedium() {
    this.dialogService.warning({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'md',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Warning Medium dialog closed:', result);
    });
  }

  showErrorMedium() {
    this.dialogService.error({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'md',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Error Medium dialog closed:', result);
    });
  }

  // Size Variant Methods - Small (sm)
  showSuccessSmall() {
    this.dialogService.success({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'sm',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Success Small dialog closed:', result);
    });
  }

  showWarningSmall() {
    this.dialogService.warning({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'sm',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Warning Small dialog closed:', result);
    });
  }

  showErrorSmall() {
    this.dialogService.error({
      title: 'Saved Successfully',
      message: 'Your changes have been saved successfully',
      size: 'sm',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Error Small dialog closed:', result);
    });
  }

  // Alert with Action Examples
  showActionRequiredAlert() {
    this.dialogService.warning({
      title: 'Action Required',
      message: 'Incomplete fields. Please fill in all required information now',
      bottomBorder: true,
      buttons: [
        { label: 'Label', variant: 'secondary', action: 'label1' },
        { label: 'Label', variant: 'warning', action: 'label2' }
      ],
      showButtons: true
    }).then((result: any) => {
      console.log('Action required alert closed:', result);
    });
  }

  showCompletedSuccessfullyAlert() {
    this.dialogService.success({
      title: 'Completed Successfully',
      message: 'Incomplete fields. Please fill in all required information now',
      bottomBorder: true,
      buttons: [
        { label: 'Label', variant: 'secondary', action: 'label1' },
        { label: 'Label', variant: 'success', action: 'label2' }
      ],
      showButtons: true
    }).then((result: any) => {
      console.log('Completed successfully alert closed:', result);
    });
  }

  showCompletedSuccessfullyAlert2() {
    this.dialogService.success({
      title: 'Completed Successfully',
      message: 'Incomplete fields. Please fill in all required information now',
      bottomBorder: true,
      buttons: [
        { label: 'Label', variant: 'secondary', action: 'label1' },
        { label: 'Label', variant: 'success', action: 'label2' }
      ],
      showButtons: true
    }).then((result: any) => {
      console.log('Completed successfully alert 2 closed:', result);
    });
  }

  // Default Border Color Examples (Primary Color)
  showConfirmationWithBorder() {
    this.dialogService.confirmation({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      bottomBorder: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      destructive: true
    }).then((result: any) => {
      console.log('Confirmation with border closed:', result);
    });
  }

  showConfirmationWithoutBorder() {
    this.dialogService.confirmation({
      title: 'Save Changes',
      message: 'Do you want to save your changes before leaving?',
      bottomBorder: false,
      confirmButtonText: 'Save',
      cancelButtonText: 'Discard'
    }).then((result: any) => {
      console.log('Confirmation without border closed:', result);
    });
  }

  showCustomWithDefaultBorder() {
    this.dialogService.custom({
      title: 'Welcome to Our Platform',
      message: 'Thank you for joining us! Get started by exploring our features.',
      variant: 'default',
      bottomBorder: true,
      buttons: [
        { label: 'Skip Tour', variant: 'secondary', action: 'skip' },
        { label: 'Start Tour', variant: 'primary', action: 'tour' }
      ]
    }).then((result: any) => {
      console.log('Custom with default border closed:', result);
    });
  }

  showCustomWithoutBorder() {
    this.dialogService.custom({
      title: 'Quick Tip',
      message: 'You can use keyboard shortcuts to navigate faster.',
      variant: 'default',
      bottomBorder: false,
      buttons: [
        { label: 'Got it', variant: 'secondary', action: 'ok' }
      ]
    }).then((result: any) => {
      console.log('Custom without border closed:', result);
    });
  }

  showFeedbackWithDefaultBorder() {
    this.dialogService.feedback({
      title: 'Share Your Experience',
      message: 'Help us improve by sharing your feedback about our service.',
      label: 'Your feedback',
      confirmButtonText: 'Submit Feedback',
      cancelButtonText: 'Maybe Later',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Feedback with default border closed:', result);
    });
  }

  showFeedbackWithoutBorder() {
    this.dialogService.feedback({
      title: 'Quick Survey',
      message: 'How would you rate your experience?',
      label: 'Comments (optional)',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Skip',
      bottomBorder: false
    }).then((result: any) => {
      console.log('Feedback without border closed:', result);
    });
  }

  showLoadingWithDefaultBorder() {
    this.dialogService.loading({
      title: 'Processing Payment',
      message: 'Please wait while we process your payment...',
      bottomBorder: true,
    }).then((result: any) => {
      console.log('Loading with default border closed:', result);
    });
  }

  showLoadingWithoutBorder() {
    this.dialogService.loading({
      title: 'Uploading Files',
      message: 'Uploading your files to the cloud...',
      bottomBorder: false,
    }).then((result: any) => {
      console.log('Loading without border closed:', result);
    });
  }

  showInfoWithDefaultBorder() {
    this.dialogService.info({
      title: 'System Update Available',
      message: 'A new system update is available. Would you like to install it now?',
      bottomBorder: true,
      buttons: [
        { label: 'Later', variant: 'secondary', action: 'later' },
        { label: 'Install Now', variant: 'info', action: 'install' }
      ],
      showButtons: true
    }).then((result: any) => {
      console.log('Info with default border closed:', result);
    });
  }

  showInfoWithoutBorder() {
    this.dialogService.info({
      title: 'Tip of the Day',
      message: 'You can customize your dashboard by dragging and dropping widgets.',
      bottomBorder: false,
      buttons: [
        { label: 'Got it', variant: 'secondary', action: 'ok' }
      ],
      showButtons: true
    }).then((result: any) => {
      console.log('Info without border closed:', result);
    });
  }

  // Position Examples
  showCenterPosition() {
    this.dialogService.success({
      title: 'Center Position',
      message: 'This dialog appears in the center (default position)',
      position: 'center',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Center position dialog closed:', result);
    });
  }

  showLeftTopPosition() {
    this.dialogService.info({
      title: 'Left Top Position',
      message: 'This dialog appears in the top-left corner',
      position: 'left-top',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Left top position dialog closed:', result);
    });
  }

  showRightTopPosition() {
    this.dialogService.warning({
      title: 'Right Top Position',
      message: 'This dialog appears in the top-right corner',
      position: 'right-top',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Right top position dialog closed:', result);
    });
  }

  showRightBottomPosition() {
    this.dialogService.error({
      title: 'Right Bottom Position',
      message: 'This dialog appears in the bottom-right corner',
      position: 'right-bottom',
      bottomBorder: true
    }).then((result: any) => {
      console.log('Right bottom position dialog closed:', result);
    });
  }

  showLeftBottomPosition() {
    this.dialogService.custom({
      title: 'Left Bottom Position',
      message: 'This dialog appears in the bottom-left corner',
      position: 'left-bottom',
      variant: 'default',
      bottomBorder: true,
      buttons: [
        { label: 'Close', variant: 'primary', action: 'close' }
      ]
    }).then((result: any) => {
      console.log('Left bottom position dialog closed:', result);
    });
  }
}
