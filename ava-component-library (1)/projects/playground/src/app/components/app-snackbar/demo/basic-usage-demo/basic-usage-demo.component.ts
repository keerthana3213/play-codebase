import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-snackbar-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <aava-button
        label="Show Snackbar"
        variant="primary"
        size="md"
        state="default"
        (click)="showSnackbar()"
      >
      </aava-button>
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
    `,
  ],
})
export class SnackbarBasicUsageDemoComponent {
  private snackbar = inject(SnackbarService);

  showSnackbar() {
    this.snackbar.show('This is a snackbar message', 'top-center');
  }
}
