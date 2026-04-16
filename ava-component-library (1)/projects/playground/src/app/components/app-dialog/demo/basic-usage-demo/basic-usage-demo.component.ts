import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'app-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-content">
        <div class="demo-section">
          <aava-button
            label="Show Warning Dialog"
            variant="warning"
            (userClick)="showWarningDialog()"
          ></aava-button>
        </div>
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

      .demo-header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .demo-header h2 {
        color: var(--color-text-primary);
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      .demo-header p {
        color: var(--color-text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }

      .demo-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-section {
        text-align: center;
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
        margin: 0.5rem;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  showSuccessDialog() {
    this.dialogService
      .success({
        title: 'Message Sent Successfully!',
        message: 'Thank you for contacting us. We will get back to you soon.',
        bottomBorder: true,
      })
      .then((result) => {
        console.log('Success dialog closed:', result);
      });
  }

  showErrorDialog() {
    this.dialogService
      .error({
        title: 'Connection Failed',
        message:
          'Unable to connect to the server. Please check your internet connection and try again.',
        showRetryButton: true,
        retryButtonText: 'Retry',
      })
      .then((result) => {
        console.log('Error dialog closed:', result);
        if (result.action === 'retry') {
          console.log(
            'User clicked Retry! You can implement retry logic here.'
          );
        }
      });
  }

  showWarningDialog() {
    this.dialogService
      .warning({
        title: 'Unsaved Changes',
        message:
          'You have unsaved changes that will be lost if you continue. Are you sure you want to proceed?',
        showProceedButton: true,
        proceedButtonText: 'Discard Changes',
      })
      .then((result) => {
        console.log('Warning dialog closed:', result);
        if (result.action === 'proceed') {
          console.log('User chose to discard changes!');
        }
      });
  }

  showInfoDialog() {
    this.dialogService
      .info({
        title: 'New Feature Available',
        message:
          'We have added new features to improve your experience. Would you like to learn more?',
        showLearnMoreButton: true,
        learnMoreButtonText: 'Learn More',
      })
      .then((result) => {
        console.log('Info dialog closed:', result);
      });
  }

  showConfirmationDialog() {
    this.dialogService
      .confirmation({
        title: 'Delete Account',
        message:
          'This action cannot be undone. All your data will be permanently deleted.',
        confirmButtonText: 'Delete Account',
        cancelButtonText: 'Keep Account',
        destructive: true,
      })
      .then((result) => {
        console.log('Confirmation dialog closed:', result);
        if (result.confirmed === true) {
          console.log('User confirmed deletion!');
        } else {
          console.log('User cancelled deletion!');
        }
      });
  }

  showLoadingDialog() {
    const loadingDialog = this.dialogService.loading({
      title: 'Processing...',
      message: 'Please wait while we process your request.',
      showProgress: true,
      showCancelButton: true,
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        this.dialogService.close();
      }
    }, 500);

    loadingDialog.then((result) => {
      clearInterval(interval);
      console.log('Loading dialog closed:', result);
    });
  }
}
