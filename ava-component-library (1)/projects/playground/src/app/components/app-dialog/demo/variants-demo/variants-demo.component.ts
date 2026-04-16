import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'ava-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-content">
        <div class="demo-section">
          <aava-button
            label="Show Success Dialog"
            variant="success"
            (userClick)="showSuccessDialog()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            label="Show Error Dialog"
            variant="danger"
            (userClick)="showErrorDialog()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            label="Show Warning Dialog"
            variant="warning"
            (userClick)="showWarningDialog()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            label="Show Info Dialog"
            variant="primary"
            (userClick)="showInfoDialog()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            label="Show Confirmation Dialog"
            variant="secondary"
            (userClick)="showConfirmationDialog()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            label="Show Loading Dialog"
            variant="secondary"
            (userClick)="showLoadingDialog()"
          ></aava-button>
        </div>

        <!-- <div class="demo-section">
          <aava-button
            label="Show Custom Dialog"
            variant="primary"
            (userClick)="showCustomDialog()"
          ></aava-button>
        </div> -->
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }

      .demo-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .demo-section {
        display: flex;
        justify-content: center;
      }

      .demo-section h3 {
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
      }

      .demo-section p {
        color: var(--color-text-secondary);
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      aava-button {
        margin-top: auto;
      }
    `,
  ],
})
export class VariantsDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  showSuccessDialog() {
    this.dialogService
      .success({
        title: 'Operation Successful!',
        message: 'Your action has been completed successfully.',
        size: 'lg',
        bottomBorder: true,
      })
      .then((result: unknown) => {
        console.log('Success dialog closed:', result);
      });
  }

  showErrorDialog() {
    this.dialogService
      .error({
        title: 'Operation Failed',
        message: 'Something went wrong. Please try again.',
        showRetryButton: true,
        retryButtonText: 'Retry',
        size: 'md',
      })
      .then((result: unknown) => {
        console.log('Error dialog closed:', result);
      });
  }

  showWarningDialog() {
    this.dialogService
      .warning({
        title: 'Please Review',
        message: 'Please review the information carefully before proceeding.',
        showProceedButton: true,
        proceedButtonText: 'Proceed',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      })
      .then((result: unknown) => {
        console.log('Warning dialog closed:', result);
      });
  }

  showInfoDialog() {
    this.dialogService
      .info({
        title: 'Information',
        message: 'This is an informational message with helpful details.',
        showOkButton: true,
        okButtonText: 'Got it',
        showLearnMoreButton: true,
        learnMoreButtonText: 'Learn More',
      })
      .then((result: unknown) => {
        console.log('Info dialog closed:', result);
      });
  }

  showConfirmationDialog() {
    this.dialogService
      .confirmation({
        title: 'Confirm Action',
        message: 'Are you sure you want to perform this action?',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonVariant: 'primary',
        cancelButtonVariant: 'secondary',
      })
      .then((result: unknown) => {
        console.log('Confirmation dialog closed:', result);
      });
  }

  showLoadingDialog() {
    this.dialogService
      .loading({
        title: 'Processing',
        message: 'Please wait while we process your request.',
        showProgress: true,
        progress: 0,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      })
      .then((result: unknown) => {
        console.log('Loading dialog closed:', result);
      });
  }

  showCustomDialog() {
    this.dialogService
      .custom({
        title: 'Custom Dialog',
        message: 'This is a custom dialog with unique styling and content.',
        variant: 'success',
        customContent: '<div>Custom HTML content here</div>',
        buttons: [
          { label: 'OK', variant: 'primary', action: 'ok' },
          { label: 'Cancel', variant: 'secondary', action: 'cancel' },
        ],
      })
      .then((result: unknown) => {
        console.log('Custom dialog closed:', result);
      });
  }
}
