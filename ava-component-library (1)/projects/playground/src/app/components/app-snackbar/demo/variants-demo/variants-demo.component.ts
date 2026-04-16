import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-snackbar-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <h2>Snackbar Variants & Types</h2>
      <p class="demo-description">
        Show snackbars with different surface variants and types.
      </p>
      <div class="variants-grid">
        <aava-button
          label="Surface Bold / Medium"
          variant="primary"
          size="md"
          state="default"
          (click)="showVariant('surface-bold', 'medium')"
        >
        </aava-button>
        <aava-button
          label="Surface Bold / Strong"
          variant="primary"
          size="md"
          state="default"
          (click)="showVariant('surface-bold', 'strong')"
        >
        </aava-button>
        <aava-button
          label="Surface Bold / Max"
          variant="primary"
          size="md"
          state="default"
          (click)="showVariant('surface-bold', 'max')"
        >
        </aava-button>
        <aava-button
          label="Custom Variant / Medium"
          variant="secondary"
          size="md"
          state="default"
          (click)="showVariant('custom', 'medium')"
        >
        </aava-button>
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
      .variants-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
      }
    `,
  ],
})
export class SnackbarVariantsDemoComponent {
  private snackbar = inject(SnackbarService);

  showVariant(variant: string, type: string) {
    this.snackbar.show(
      `Snackbar: ${variant} / ${type}`,
      'bottom-center',
      4000,
      '',
      '',
      { variant, type }
    );
  }
}
