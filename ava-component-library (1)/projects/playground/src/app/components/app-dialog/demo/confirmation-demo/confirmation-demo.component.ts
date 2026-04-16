import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'app-confirmation-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Confirmation Dialogs</h2>
        <p>
          Specialized confirmation dialogs for user decisions and destructive
          actions.
        </p>
      </div>

      <div class="demo-content">
        <div class="demo-section">
          <h3>Basic Confirmation</h3>
          <p>Simple confirmation with default confirm and cancel buttons.</p>
          <aava-button
            label="Show Basic Confirmation"
            variant="primary"
            (userClick)="showBasicConfirmation()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Destructive Action</h3>
          <p>Confirmation for dangerous operations with warning styling.</p>
          <aava-button
            label="Show Destructive Confirmation"
            variant="danger"
            (userClick)="showDestructiveConfirmation()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Custom Button Text</h3>
          <p>Confirmation with custom button labels and variants.</p>
          <aava-button
            label="Show Custom Button Confirmation"
            variant="warning"
            (userClick)="showCustomButtonConfirmation()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Save Changes Confirmation</h3>
          <p>Confirmation for saving or discarding changes.</p>
          <aava-button
            label="Show Save Changes Confirmation"
            variant="info"
            (userClick)="showSaveChangesConfirmation()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Account Deletion Confirmation</h3>
          <p>Confirmation for permanent account deletion.</p>
          <aava-button
            label="Show Account Deletion Confirmation"
            variant="danger"
            (userClick)="showAccountDeletionConfirmation()"
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
        background: var(--color-background-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 1.5rem;
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
export class ConfirmationDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  showBasicConfirmation() {
    this.dialogService
      .confirmation({
        title: 'Confirm Action',
        message: 'Are you sure you want to perform this action?',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      })
      .then((result: unknown) => {
        console.log('Basic confirmation result:', result);
        const dialogResult = result as { confirmed?: boolean };
        if (dialogResult.confirmed) {
          console.log('User confirmed the action');
        } else {
          console.log('User cancelled the action');
        }
      });
  }

  showDestructiveConfirmation() {
    this.dialogService
      .confirmation({
        title: 'Delete Item',
        message:
          'This action cannot be undone. Are you sure you want to delete this item?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonVariant: 'danger',
        destructive: true,
      })
      .then((result: unknown) => {
        console.log('Destructive confirmation result:', result);
        const dialogResult = result as { confirmed?: boolean };
        if (dialogResult.confirmed) {
          console.log('User confirmed deletion');
        } else {
          console.log('User cancelled deletion');
        }
      });
  }

  showCustomButtonConfirmation() {
    this.dialogService
      .confirmation({
        title: 'Custom Confirmation',
        message: 'This is a confirmation with custom button text and styling.',
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Go Back',
        confirmButtonVariant: 'success',
        cancelButtonVariant: 'secondary',
      })
      .then((result: unknown) => {
        console.log('Custom button confirmation result:', result);
        const dialogResult = result as { confirmed?: boolean };
        if (dialogResult.confirmed) {
          console.log('User chose to proceed');
        } else {
          console.log('User chose to go back');
        }
      });
  }

  showSaveChangesConfirmation() {
    this.dialogService
      .confirmation({
        title: 'Unsaved Changes',
        message:
          'You have unsaved changes. Do you want to save them before leaving?',
        confirmButtonText: 'Save',
        cancelButtonText: 'Discard',
        confirmButtonVariant: 'primary',
        cancelButtonVariant: 'warning',
      })
      .then((result: unknown) => {
        console.log('Save changes confirmation result:', result);
        const dialogResult = result as { confirmed?: boolean };
        if (dialogResult.confirmed) {
          console.log('User chose to save changes');
        } else {
          console.log('User chose to discard changes');
        }
      });
  }

  showAccountDeletionConfirmation() {
    this.dialogService
      .confirmation({
        title: 'Delete Account',
        message:
          'This action will permanently delete your account and all associated data. This cannot be undone. Are you absolutely sure?',
        confirmButtonText: 'Delete Account',
        cancelButtonText: 'Keep Account',
        confirmButtonVariant: 'danger',
        destructive: true,
      })
      .then((result: unknown) => {
        console.log('Account deletion confirmation result:', result);
        const dialogResult = result as { confirmed?: boolean };
        if (dialogResult.confirmed) {
          console.log('User confirmed account deletion');
        } else {
          console.log('User cancelled account deletion');
        }
      });
  }
}
