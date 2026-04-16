import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AavaButtonComponent } from '../button/aava-button.component';

@Component({
  selector: 'aava-pagination-controls',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './aava-pagination-controls.component.html',
  styleUrl: './aava-pagination-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaPaginationControlsComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() totalPages = 10;
  @Input() type:
    | 'basic'
    | 'unfilled'
    | 'basicunfilled'
    | 'pageinfo'
    | 'pageinfofilled' = 'basic';
  @Input() compact = false;
  @Input() showNavigationButtons = true;
  @Input() rounded = false;
  @Input() iconOnly = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() pageChange = new EventEmitter<number>();
  iconColor = '';

  ngOnInit(): void {
    this.iconColor = this.getCssVariableValue('--color-text-on-secondary');
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  // Return pages depending on type
  get pages(): (number | string)[] {
    if (this.compact) {
      return this.getCompactPages();
    }
    switch (this.type) {
      case 'basic':
      case 'unfilled':
      case 'basicunfilled':
        return this.getMUIStylePages();
      default:
        return [];
    }
  }

  private getMUIStylePages(): (number | string)[] {
    const { currentPage, totalPages } = this;
    const pages: (number | string)[] = [];

    // MUI-style pagination logic
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Near the beginning: 1 2 3 4 5 ... last
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 6) {
          pages.push('...');
        }
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end: 1 ... (last-4) (last-3) (last-2) (last-1) last
        pages.push('...');
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... (current-1) current (current+1) ... last
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }

  private getCompactPages(): (number | string)[] {
    const { currentPage, totalPages } = this;
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage <= 2) {
      // Near beginning: 1 2 3 ... last
      pages.push(2);
      pages.push(3);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 1) {
      // Near end: 1 ... total-2 total-1 total
      pages.push('...');
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    } else {
      // In middle: 1 ... current current+1 ... last
      pages.push('...');
      pages.push(currentPage);
      pages.push(currentPage + 1);
      if (currentPage + 1 < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }





  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  getCssVariableValue(variableName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }

  // TrackBy function to prevent flickering
  trackByPage(index: number, page: number | string): string {
    return `${page}-${index}`;
  }

  // Get font size based on size prop
  getFontSize(): string {
    switch (this.size) {
      case 'xs':
        return '12px';
      case 'sm':
        return '14px';
      case 'md':
        return '16px';
      case 'lg':
        return '20px';
      case 'xl':
        return '24px';
      default:
        return '16px';
    }
  }
}
