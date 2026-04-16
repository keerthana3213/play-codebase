import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToastService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-toast-action-links-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-description">
        <h3>Action Links</h3>
        <p>Interactive toasts with clickable action buttons and links.</p>
      </div>

      <div class="action-links-demo">
        <div class="demo-section">
          <h4>Action Buttons</h4>
          <p class="action-description">Custom buttons for user interactions</p>
          <div class="button-group">
            <aava-button
              label="Success with Action"
              variant="success"
              (userClick)="showSuccessWithAction()"
            ></aava-button>
            <aava-button
              label="Warning with Action"
              variant="warning"
              (userClick)="showWarningWithAction()"
            ></aava-button>
            <aava-button
              label="Info with Action"
              variant="info"
              (userClick)="showInfoWithAction()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Learn More Links</h4>
          <p class="action-description">
            Expandable content and external links
          </p>
          <div class="button-group">
            <aava-button
              label="Info with Learn More"
              variant="info"
              (userClick)="showInfoWithLearnMore()"
            ></aava-button>
            <aava-button
              label="Success with Learn More"
              variant="success"
              (userClick)="showSuccessWithLearnMore()"
            ></aava-button>
            <aava-button
              label="Custom with Learn More"
              variant="primary"
              (userClick)="showCustomWithLearnMore()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Retry Functionality</h4>
          <p class="action-description">Error toasts with retry options</p>
          <div class="button-group">
            <aava-button
              label="Error with Retry"
              variant="danger"
              (userClick)="showErrorWithRetry()"
            ></aava-button>
            <aava-button
              label="Network Error Retry"
              variant="danger"
              (userClick)="showNetworkErrorRetry()"
            ></aava-button>
            <aava-button
              label="Validation Error Retry"
              variant="danger"
              (userClick)="showValidationErrorRetry()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Custom Actions</h4>
          <p class="action-description">
            Fully customizable action configurations
          </p>
          <div class="button-group">
            <aava-button
              label="Custom Actions"
              variant="primary"
              (userClick)="showCustomActions()"
            ></aava-button>
            <aava-button
              label="Multiple Actions"
              variant="primary"
              (userClick)="showMultipleActions()"
            ></aava-button>
            <aava-button
              label="Action with Data"
              variant="primary"
              (userClick)="showActionWithData()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Action Results</h4>
          <p class="action-description">
            Handle action button clicks and responses
          </p>
          <div class="button-group">
            <aava-button
              label="Show Action Results"
              variant="secondary"
              (userClick)="showActionResults()"
            ></aava-button>
            <aava-button
              label="Toast with Callback"
              variant="secondary"
              (userClick)="showToastWithCallback()"
            ></aava-button>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h4>Action Features</h4>
        <ul class="feature-list">
          <li>
            <strong>Action Buttons:</strong> Custom buttons for user
            interactions
          </li>
          <li>
            <strong>Learn More Links:</strong> Expandable content and external
            links
          </li>
          <li>
            <strong>Retry Functionality:</strong> Error toasts with retry
            options
          </li>
          <li>
            <strong>Custom Actions:</strong> Fully customizable action
            configurations
          </li>
          <li>
            <strong>Action Results:</strong> Handle button clicks and responses
          </li>
          <li>
            <strong>Multiple Actions:</strong> Support for multiple action
            buttons
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
        margin-top: 3rem;
        text-align: center;
      }

      .demo-description {
        margin-bottom: 2rem;
      }

      .demo-description h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 24px;
      }

      .demo-description p {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
      }

      .action-links-demo {
        margin-bottom: 2rem;
      }

      .demo-section {
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
      }

      .demo-section h4 {
        color: #333;
        margin-bottom: 0.5rem;
        font-size: 20px;
        font-weight: 500;
      }

      .action-description {
        color: #666;
        font-size: 14px;
        margin-bottom: 1.5rem;
        font-style: italic;
      }

      .button-group {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .info-section {
        padding: 1.5rem;
        background-color: #e3f2fd;
        border-radius: 8px;
        border-left: 4px solid #2196f3;
        text-align: left;
      }

      .info-section h4 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 18px;
        font-weight: 500;
      }

      .feature-list {
        margin: 0;
        padding-left: 1.5rem;
        color: #666;
        line-height: 1.6;
      }

      .feature-list li {
        margin-bottom: 0.5rem;
      }

      .feature-list strong {
        color: #333;
      }
    `,
  ],
})
export class ActionLinksDemoComponent {
  constructor(private toastService: AavaToastService) { }

  showSuccessWithAction() {
    this.toastService
      .custom({
        title: 'Success with Action',
        message: 'Operation completed. Would you like to view details?',
        customBackground: '#10b981',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'view-details', text: 'View Details', variant: 'primary' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'view-details') {
          this.toastService.info({
            title: 'Action Taken',
            message: 'You clicked the View Details button.',
            duration: 3000,
          });
        }
      });
  }

  showWarningWithAction() {
    this.toastService
      .custom({
        title: 'Warning with Action',
        message: 'Please review the information carefully before proceeding.',
        customBackground: '#f59e0b',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'review', text: 'Review Now', variant: 'warning' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'review') {
          this.toastService.success({
            title: 'Review Started',
            message: 'You can now review the information.',
            duration: 3000,
          });
        }
      });
  }

  showInfoWithAction() {
    this.toastService
      .custom({
        title: 'Information with Action',
        message: 'New features are available. Would you like to explore them?',
        customBackground: '#3b82f6',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'explore', text: 'Explore', variant: 'info' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'explore') {
          this.toastService.success({
            title: 'Exploration Started',
            message: 'Enjoy exploring the new features!',
            duration: 3000,
          });
        }
      });
  }

  showInfoWithLearnMore() {
    this.toastService
      .info({
        title: 'Information with Learn More',
        message: 'New features are available. Learn more about them.',
        showLearnMoreButton: true,
        learnMoreButtonText: 'Learn More',
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'discover') {
          this.toastService.info({
            title: 'Learn More Clicked',
            message: 'Opening detailed information about new features.',
            duration: 3000,
          });
        }
      });
  }

  showSuccessWithLearnMore() {
    this.toastService
      .custom({
        title: 'Success with Learn More',
        message: 'Your profile has been updated successfully.',
        customBackground: '#10b981',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'view-changes', text: 'View Changes', variant: 'primary' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'view-changes') {
          this.toastService.info({
            title: 'Changes View',
            message: 'Showing you the changes made to your profile.',
            duration: 3000,
          });
        }
      });
  }

  showCustomWithLearnMore() {
    this.toastService
      .custom({
        title: 'Custom with Learn More',
        message: 'This is a custom toast with learn more functionality.',
        customBackground: '#6366f1',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'discover', text: 'Discover More', variant: 'primary' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'discover') {
          this.toastService.info({
            title: 'Discovery Mode',
            message: 'Entering discovery mode for more information.',
            duration: 3000,
          });
        }
      });
  }

  showErrorWithRetry() {
    this.toastService
      .error({
        title: 'Error with Retry',
        message: 'Failed to save your changes. Please try again.',
        showRetryButton: true,
        retryButtonText: 'Retry Save',
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'retry') {
          this.toastService.success({
            title: 'Retry Successful',
            message: 'Your changes have been saved successfully.',
            duration: 3000,
          });
        }
      });
  }

  showNetworkErrorRetry() {
    this.toastService
      .error({
        title: 'Network Error',
        message: 'Connection lost. Please check your internet connection.',
        showRetryButton: true,
        retryButtonText: 'Reconnect',
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'retry') {
          this.toastService.info({
            title: 'Reconnecting',
            message: 'Attempting to reconnect to the server.',
            duration: 3000,
          });
        }
      });
  }

  showValidationErrorRetry() {
    this.toastService
      .error({
        title: 'Validation Error',
        message:
          'Some fields contain invalid data. Please review and try again.',
        showRetryButton: true,
        retryButtonText: 'Review & Retry',
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'retry') {
          this.toastService.warning({
            title: 'Review Mode',
            message:
              'Please review the highlighted fields and correct any errors.',
            duration: 4000,
          });
        }
      });
  }

  showCustomActions() {
    this.toastService
      .custom({
        title: 'Custom Actions',
        message:
          'This toast has custom action buttons for unique interactions.',
        showCustomActions: true,
        customActions: [
          { action: 'save', text: 'Save Draft', variant: 'primary' },
          {
            action: 'publish',
            text: 'Publish Now',
            variant: 'success',
          },
          { action: 'cancel', text: 'Cancel', variant: 'secondary' },
        ],
        customBackground: '#8b5cf6',
        customTextColor: '#ffffff',
        duration: 8000,
      })
      .then((result) => {
        switch (result.action) {
          case 'save':
            this.toastService.success({
              title: 'Draft Saved',
              message: 'Your draft has been saved successfully.',
              duration: 3000,
            });
            break;
          case 'publish':
            this.toastService.success({
              title: 'Published!',
              message: 'Your content has been published successfully.',
              duration: 3000,
            });
            break;
          case 'cancel':
            this.toastService.info({
              title: 'Cancelled',
              message: 'Operation has been cancelled.',
              duration: 3000,
            });
            break;
        }
      });
  }

  showMultipleActions() {
    this.toastService
      .custom({
        title: 'Multiple Actions',
        message: 'Choose from multiple action options for this operation.',
        showCustomActions: true,
        customActions: [
          { action: 'approve', text: 'Approve', variant: 'success' },
          { action: 'reject', text: 'Reject', variant: 'danger' },
          {
            action: 'request-changes',
            text: 'Request Changes',
            variant: 'warning',
          },
          { action: 'hold', text: 'Put on Hold', variant: 'secondary' },
        ],
        customBackground: '#059669',
        customTextColor: '#ffffff',
        duration: 8000,
      })
      .then((result) => {
        this.toastService.info({
          title: 'Action Taken',
          message: `You selected: ${result.action}`,
          duration: 3000,
        });
      });
  }

  showActionWithData() {
    this.toastService
      .custom({
        title: 'Action with Data',
        message:
          'This toast includes data that can be used when actions are taken.',
        showCustomActions: true,
        customActions: [
          {
            action: 'process',
            text: 'Process Item',
            variant: 'primary',
          },
          {
            action: 'archive',
            text: 'Archive',
            variant: 'secondary',
          },
        ],
        customBackground: '#dc2626',
        customTextColor: '#ffffff',
        duration: 6000,
      })
      .then((result) => {
        if (result.data) {
          this.toastService.info({
            title: 'Data Received',
            message: `Processing item ID: ${result.data.id}, Type: ${result.data.type}`,
            duration: 3000,
          });
        }
      });
  }

  showActionResults() {
    this.toastService
      .custom({
        title: 'Action Results',
        message: 'Click the action button to see the result.',
        customBackground: '#10b981',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          { action: 'show-result', text: 'Show Result', variant: 'primary' },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'show-result') {
          this.toastService.info({
            title: 'Result',
            message: 'This is the result of clicking the action button.',
            duration: 3000,
          });
        }
      });
  }

  showToastWithCallback() {
    this.toastService
      .custom({
        title: 'Toast with Callback',
        message: 'This toast demonstrates callback functionality.',
        customBackground: '#f59e0b',
        customTextColor: '#ffffff',
        showCustomActions: true,
        customActions: [
          {
            action: 'execute-callback',
            text: 'Execute Callback',
            variant: 'warning',
          },
        ],
        duration: 6000,
      })
      .then((result) => {
        if (result.action === 'execute-callback') {
          // Simulate some processing
          this.toastService.info({
            title: 'Processing',
            message: 'Executing callback function...',
            duration: 2000,
          });

          // Show final result
          setTimeout(() => {
            this.toastService.success({
              title: 'Callback Complete',
              message: 'The callback function has been executed successfully.',
              duration: 3000,
            });
          }, 2000);
        }
      });
  }
}
