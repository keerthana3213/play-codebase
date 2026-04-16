import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPaginationControlsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-pagination-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaPaginationControlsComponent],
  template: `
    <div class="demo-section">
      <div class="variants-container">
        <!-- Basic Variant -->
        <div class="variant-item">
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="basicPage"
            [totalPages]="10"
            [size]="'xl'"
            (pageChange)="onPageChange($event)"
          ></aava-pagination-controls>
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="basicPage"
            [totalPages]="10"
            [size]="'lg'"
            (pageChange)="onPageChange($event)"
          ></aava-pagination-controls>
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="basicPage"
            [totalPages]="10"
            [size]="'md'"
            (pageChange)="onPageChange($event)"
          ></aava-pagination-controls>
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="basicPage"
            [totalPages]="10"
            [size]="'sm'"
            (pageChange)="onPageChange($event)"
          ></aava-pagination-controls>
          <aava-pagination-controls
            [type]="'basic'"
            [currentPage]="basicPage"
            [totalPages]="10"
            [size]="'xs'"
            (pageChange)="onPageChange($event)"
          ></aava-pagination-controls>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-section {
        max-width: 1000px;
        padding: 2rem;
      }

      .demo-description {
        margin-bottom: 2rem;
        text-align: center;
      }

      .demo-description h3 {
        color: #1f2937;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .demo-description p {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .variants-container {
        display: grid;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .variant-item {
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
      }

      .variant-item h4 {
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .variant-item p {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }

      .features-list {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
        padding: 1.5rem;
      }

      .features-list h4 {
        color: #0369a1;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .features-list ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .features-list li {
        margin-bottom: 0.5rem;
        color: #0c4a6e;
        line-height: 1.5;
      }

      .features-list li strong {
        color: #0369a1;
      }

      :host {
        display: block;
        min-height: 100vh;
        padding: 1rem;
      }
    `,
  ],
})
export class AppPaginationVariantsDemoComponent {
  basicPage = 1;

  onPageChange(page: number) {
    this.basicPage = page;
  }
}
