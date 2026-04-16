import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'app-custom-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-content">
        <div class="demo-section">
          <aava-button
            label="Show Info Custom Dialog"
            variant="info"
            (userClick)="showInfoCustomDialog()"
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

      .demo-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-section {
        display: flex;
        justify-content: center;
      }

      aava-button {
        margin-top: auto;
      }
    `,
  ],
})
export class CustomDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  showDefaultCustomDialog() {
    this.dialogService
      .custom({
        title: 'Welcome to Our Platform',
        message:
          'Thank you for joining us! Get started by exploring our features.',
        variant: 'default',
        bottomBorder: true,
        buttons: [
          { label: 'Skip Tour', variant: 'secondary', action: 'skip' },
          { label: 'Start Tour', variant: 'primary', action: 'tour' },
        ],
      })
      .then((result: unknown) => {
        console.log('Default custom dialog closed:', result);
        const dialogResult = result as { action?: string };
        if (dialogResult.action === 'tour') {
          console.log('User chose to start tour');
        } else if (dialogResult.action === 'skip') {
          console.log('User chose to skip tour');
        }
      });
  }

  showSuccessCustomDialog() {
    this.dialogService
      .custom({
        title: 'Payment Successful!',
        message:
          'Your payment has been processed successfully. What would you like to do next?',
        variant: 'success',
        bottomBorder: true,
        buttons: [
          { label: 'View Receipt', variant: 'secondary', action: 'receipt' },
          { label: 'Continue Shopping', variant: 'primary', action: 'shop' },
          { label: 'Go to Dashboard', variant: 'success', action: 'dashboard' },
        ],
      })
      .then((result: unknown) => {
        console.log('Success custom dialog closed:', result);
        const dialogResult = result as { action?: string };
        switch (dialogResult.action) {
          case 'receipt':
            console.log('User chose to view receipt');
            break;
          case 'shop':
            console.log('User chose to continue shopping');
            break;
          case 'dashboard':
            console.log('User chose to go to dashboard');
            break;
        }
      });
  }

  showErrorCustomDialog() {
    this.dialogService
      .custom({
        title: 'Connection Error',
        message:
          'Unable to connect to the server. Please try one of the following options:',
        variant: 'error',
        bottomBorder: true,
        customContent: `
        <div style="text-align: left; margin: 1rem 0;">
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li>Check your internet connection</li>
            <li>Try refreshing the page</li>
            <li>Contact support if the problem persists</li>
          </ul>
        </div>
      `,
        buttons: [
          { label: 'Retry', variant: 'danger', action: 'retry' },
          { label: 'Refresh', variant: 'warning', action: 'refresh' },
          { label: 'Contact Support', variant: 'primary', action: 'support' },
        ],
      })
      .then((result: unknown) => {
        console.log('Error custom dialog closed:', result);
        const dialogResult = result as { action?: string };
        switch (dialogResult.action) {
          case 'retry':
            console.log('User chose to retry connection');
            break;
          case 'refresh':
            console.log('User chose to refresh page');
            break;
          case 'support':
            console.log('User chose to contact support');
            break;
        }
      });
  }

  showWarningCustomDialog() {
    this.dialogService
      .custom({
        title: 'Storage Warning',
        message: 'Your storage is almost full. Consider these options:',
        variant: 'warning',
        bottomBorder: true,
        customContent: `
        <div style="text-align: left; margin: 1rem 0;">
          <div style="background: #fef3c7; padding: 1rem; border-radius: 4px; border-left: 4px solid #f59e0b;">
            <strong>Current Usage:</strong> 8.7 GB / 10 GB (87%)
          </div>
        </div>
      `,
        buttons: [
          { label: 'Clean Up Files', variant: 'warning', action: 'cleanup' },
          { label: 'Upgrade Plan', variant: 'primary', action: 'upgrade' },
          { label: 'Dismiss', variant: 'secondary', action: 'dismiss' },
        ],
      })
      .then((result: unknown) => {
        console.log('Warning custom dialog closed:', result);
        const dialogResult = result as { action?: string };
        switch (dialogResult.action) {
          case 'cleanup':
            console.log('User chose to clean up files');
            break;
          case 'upgrade':
            console.log('User chose to upgrade plan');
            break;
          case 'dismiss':
            console.log('User dismissed the warning');
            break;
        }
      });
  }

  showInfoCustomDialog() {
    this.dialogService
      .custom({
        title: 'New Features Available',
        message:
          'We have added several new features to improve your experience:',
        variant: 'info',
        bottomBorder: true,
        customContent: `
        <div style="text-align: left; margin: 1rem 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #dbeafe; padding: 1rem; border-radius: 4px;">
              <strong>📱 Mobile App</strong><br>
              New mobile app with offline support
            </div>
            <div style="background: #dbeafe; padding: 1rem; border-radius: 4px;">
              <strong>🔒 Enhanced Security</strong><br>
              Two-factor authentication support
            </div>
          </div>
        </div>
      `,
        buttons: [
          { label: 'Learn More', variant: 'primary', action: 'learn' },
          { label: 'Try Now', variant: 'primary', action: 'try' },
          { label: 'Maybe Later', variant: 'secondary', action: 'later' },
        ],
      })
      .then((result: unknown) => {
        console.log('Info custom dialog closed:', result);
        const dialogResult = result as { action?: string };
        switch (dialogResult.action) {
          case 'learn':
            console.log('User chose to learn more');
            break;
          case 'try':
            console.log('User chose to try now');
            break;
          case 'later':
            console.log('User chose to try later');
            break;
        }
      });
  }

  showHtmlContentDialog() {
    this.dialogService
      .custom({
        title: 'Rich Content Dialog',
        message: 'This dialog demonstrates rich HTML content:',
        variant: 'default',
        bottomBorder: false,
        customContent: `
        <div style="text-align: left; margin: 1rem 0;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: white;">🎨 Beautiful Design</h4>
            <p style="margin: 0; opacity: 0.9;">This is a custom styled content area with gradient background.</p>
          </div>
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <div style="flex: 1; background: #f3f4f6; padding: 1rem; border-radius: 4px; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚀</div>
              <strong>Fast</strong>
            </div>
            <div style="flex: 1; background: #f3f4f6; padding: 1rem; border-radius: 4px; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛡️</div>
              <strong>Secure</strong>
            </div>
            <div style="flex: 1; background: #f3f4f6; padding: 1rem; border-radius: 4px; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">💡</div>
              <strong>Smart</strong>
            </div>
          </div>
        </div>
      `,
        buttons: [
          { label: 'Amazing!', variant: 'primary', action: 'amazing' },
          { label: 'Close', variant: 'secondary', action: 'close' },
        ],
      })
      .then((result: unknown) => {
        console.log('HTML content dialog closed:', result);
        const dialogResult = result as { action?: string };
        if (dialogResult.action === 'amazing') {
          console.log("User thinks it's amazing!");
        }
      });
  }
}
