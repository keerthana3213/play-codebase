import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SnackbarService,
  SnackbarPosition,
} from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-snackbar-positions-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="positions-grid">
        <!-- Top Row -->
        <div class="position-row">
          <aava-button
            label="top-left"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('top-left')"
          >
          </aava-button>
          <aava-button
            label="top-center"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('top-center')"
          >
          </aava-button>
          <aava-button
            label="top-right"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('top-right')"
          >
          </aava-button>
        </div>

        <!-- Center Row -->
        <div class="position-row">
          <aava-button
            label="center"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('center')"
          >
          </aava-button>
        </div>

        <!-- Bottom Row -->
        <div class="position-row">
          <aava-button
            label="bottom-left"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('bottom-left')"
          >
          </aava-button>
          <aava-button
            label="bottom-center"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('bottom-center')"
          >
          </aava-button>
          <aava-button
            label="bottom-right"
            variant="primary"
            size="md"
            state="default"
            (click)="showSnackbar('bottom-right')"
          >
          </aava-button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
        margin-top: 3rem;
        text-align: center;
      }
      .positions-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2rem;
      }
      .position-row {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
      }
      .position-row:nth-child(2) {
        justify-content: center;
      }
    `,
  ],
})
export class SnackbarPositionsDemoComponent {
  private snackbar = inject(SnackbarService);

  showSnackbar(position: SnackbarPosition) {
    this.snackbar.show(`Snackbar at ${position}`, position);
  }
}
