import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPaginationControlsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-pagination-extended-demo',
  standalone: true,
  imports: [CommonModule, AavaPaginationControlsComponent],
  template: `
    <div class="demo-section">
      <div class="demo-container">
        <aava-pagination-controls
          [type]="'basicunfilled'"
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          (pageChange)="onPageChange($event)"
        >
        </aava-pagination-controls>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-section {
        max-width: 800px;
        margin: 2rem auto;
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

      .demo-container {
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
      }

      .demo-output {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      }

      .demo-output h4 {
        color: #374151;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .output-item {
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: #fff;
        border-radius: 6px;
        border-left: 3px solid #3b82f6;
      }

      .output-item strong {
        color: #374151;
        margin-right: 0.5rem;
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
export class AppPaginationExtendedDemoComponent {
  currentPage = 1;
  totalPages = 10;

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
