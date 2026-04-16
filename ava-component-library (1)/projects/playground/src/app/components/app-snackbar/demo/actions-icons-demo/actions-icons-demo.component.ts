import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-snackbar-actions-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="actions-grid">
        <aava-button
          label="Snackbar with Action"
          variant="primary"
          size="md"
          state="default"
          (click)="showActionSnackbar()"
        >
        </aava-button>
        <!-- <aava-button
          label="Snackbar with Icon"
          variant="primary"
          size="md"
          state="default"
          (click)="showIconSnackbar()"
        >
        </aava-button>
        <aava-button
          label="Dismissible Snackbar"
          variant="secondary"
          size="md"
          state="default"
          (click)="showDismissibleSnackbar()"
        >
        </aava-button>
        <aava-button
          label="Persistent Snackbar"
          variant="secondary"
          size="md"
          state="default"
          (click)="showPersistentSnackbar()"
        >
        </aava-button> -->
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      .actions-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
      }
    `,
  ],
})
export class SnackbarActionsIconsDemoComponent {
  private snackbar = inject(SnackbarService);

  showActionSnackbar() {
    this.snackbar.show('File uploaded!', 'bottom-center', 4000, '', '', {
      action: {
        text: 'Undo',
        color: 'primary',
        callback: () => alert('Undo clicked!'),
      },
    });
  }

  showIconSnackbar() {
    this.snackbar.show('Success!', 'bottom-center', 4000, '', '', {
      icon: {
        name: 'check-circle',
        color: '#16a34a',
        size: 20,
        position: 'left',
      },
    });
  }

  showDismissibleSnackbar() {
    this.snackbar.show('Dismissible snackbar', 'bottom-center', 4000, '', '', {
      dismissible: true,
    });
  }

  showPersistentSnackbar() {
    this.snackbar.show(
      'Persistent snackbar (must be dismissed)',
      'bottom-center',
      0,
      '',
      '',
      {
        persistent: true,
        dismissible: true,
      }
    );
  }
}
