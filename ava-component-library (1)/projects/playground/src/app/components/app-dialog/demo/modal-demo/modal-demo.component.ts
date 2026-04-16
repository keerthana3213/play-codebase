import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `

      <div class="demo-content">
        <div class="demo-section">
          <h3>Basic Modal</h3>
          <p>Simple modal with custom content and close button.</p>
          <aava-button
            label="Open Basic Modal"
            variant="primary"
            (userClick)="openBasicModal()"
          ></aava-button>
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
export class ModalDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  openBasicModal() {
    this.dialogService
      .openModal(ModalContentComponent, {
        width: '500px',
        maxWidth: '90vw',
        showCloseButton: true,
      })
      .then((result: unknown) => {
        console.log('Basic modal closed:', result);
      });
  }
}

// Simple modal content component
@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Modal Content</h3>
      </div>
      <div class="modal-body">
        <p>This is the content of the modal dialog.</p>
        <p *ngIf="data">Received data: {{ data.name }} (ID: {{ data.id }})</p>
        <p>{{ data?.description }}</p>
      </div>
      <div class="modal-footer">
        <aava-button
          label="Close"
          variant="secondary"
          (userClick)="close()"
        ></aava-button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-content {
        padding: 1rem;
      }

      .modal-header {
        border-bottom: 1px solid var(--color-border);
      }

      .modal-header h3 {
        color: var(--color-text-primary);
        margin: 0;
        font-size: 1.5rem;
      }

      .modal-body {
        line-height: 1.6;
      }

      .modal-body p {
        color: var(--color-text-secondary);
      }

      .modal-footer {
        text-align: right;
        border-top: 1px solid var(--color-border);
      }
    `,
  ],
})
export class ModalContentComponent {
  data: any;

  constructor(private dialogService: AavaDialogService) {
    // Get data passed to the modal
    this.data = (this.dialogService as any).getModalData?.();
  }

  close() {
    this.dialogService.close();
  }
}
