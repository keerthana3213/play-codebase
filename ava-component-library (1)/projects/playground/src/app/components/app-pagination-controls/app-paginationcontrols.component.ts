import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AavaPaginationControlsComponent } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-app-paginationcontrols',
  imports: [AavaPaginationControlsComponent, CommonModule, RouterModule],
  templateUrl: './app-paginationcontrols.component.html',
  styleUrl: './app-paginationcontrols.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppPaginationcontrolsComponent {
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  // fullPage=1;
  // basicPage=1;
  // simple=1;
  // page=1;

  basic_Page = 1;
  unfilled_page = 1;
  extended_Page = 1;
  standard_Page = 1;
  pageinfo_Page = 1;
  simplepageinfo_Page = 1;

  currentPage = 1;
  totalPages = 10;

  currentPage1 = 1;
  totalPages1 = 10;
  // Pagination Properties
  pageSize1 = 10;

  pageSize2 = 10;
  currentPage2 = 1;

  pageSize3 = 10;
  currentPage3 = 1;

  onPageChange(page: number): void {
    this.currentPage = page;
    // optionally reload data
  }
  // Event Handlers
  // onPageChange1(page: number): void {
  //   this.currentPage1 = page;
  // }

  onPageSizeChange1(pageSize: number): void {
    this.pageSize1 = pageSize;
  }

  onPageChange2(page: number): void {
    this.currentPage2 = page;
  }

  onPageSizeChange2(pageSize: number): void {
    this.pageSize2 = pageSize;
  }

  onPageChange3(page: number): void {
    this.currentPage3 = page;
  }

  onPageSizeChange3(pageSize: number): void {
    this.pageSize3 = pageSize;
  }

  // Documentation Sections
  sections = [
    {
      title: 'Basic Usage',
      description:
        'Basic implementation of pagination controls with default settings.',
      showCode: false,
    },
    {
      title: 'Custom Size Pagination',
      description: 'Pagination controls with custom size and total items.',
      showCode: false,
    },
    {
      title: 'Console Pagination',
      description: 'Pagination controls without labels and page size options.',
      showCode: false,
    },

    {
      title: 'Card Page Info',
      description:
        'Pagination Card Page Info without labels and page size options.',
      showCode: false,
    },
    {
      title: 'Page Info',
      description: 'Pagination Page Info without labels and page size options.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'totalItems',
      type: 'number',
      default: '0',
      description: 'The total number of items to be paginated.',
    },
    {
      name: 'pageSize',
      type: 'number',
      default: '10',
      description: 'Number of items to display per page.',
    },
    {
      name: 'currentPage',
      type: 'number',
      default: '1',
      description: 'The current active page number.',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the label for page size.',
    },
    {
      name: 'labelText',
      type: 'string',
      default: 'Page Size:',
      description: 'The text to display for the page size label.',
    },
    {
      name: 'showPageSizeOptions',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the page size options.',
    },
    {
      name: 'showTotalPages',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the total number of pages.',
    },
  ];

  // Events Documentation
  events = [
    {
      name: 'pageChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the page number changes.',
    },
    {
      name: 'pageSizeChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the page size changes.',
    },
  ];

  // Toggle Section Expansion
  toggleSection(index: number): void {
    this.sections.forEach((section, i) => {
      section.showCode = i === index ? !section.showCode : false;
    });
  }

  // Toggle Code Visibility
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Get Code Examples
  getPaginationCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'Basic Usage': `
import { Component } from '@angular/core';
import { PaginationControlsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-pagination',
  standalone: true,
  imports: [PaginationControlsComponent],
  template: \`
    <awe-pagination-controls
      [totalItems]="100"
      [pageSize]="pageSize1"
      [currentPage]="currentPage1"
      [showLabel]="true"
      [labelText]="'page size:'"
      [showPageSizeOptions]="true"
      [showTotalPages]="true"
      (pageChange)="onPageChange1($event)"
      (pageSizeChange)="onPageSizeChange1($event)">
    </awe-pagination-controls>
  \`
})
export class BasicPaginationComponent {
  pageSize1 = 10;
  currentPage1 = 1;

  onPageChange1(page: number): void {
    this.currentPage1 = page;
  }

  onPageSizeChange1(pageSize: number): void {
    this.pageSize1 = pageSize;
  }
}`,
      'Custom Size Pagination': `
import { Component } from '@angular/core';
import { PaginationControlsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-custom-pagination',
  standalone: true,
  imports: [PaginationControlsComponent],
  template: \`
    <awe-pagination-controls
      [totalItems]="200"
      [pageSize]="pageSize3"
      [currentPage]="currentPage3"
      [showLabel]="true"
      [labelText]="'page size:'"
      [showPageSizeOptions]="true"
      [showTotalPages]="false"
      (pageChange)="onPageChange3($event)"
      (pageSizeChange)="onPageSizeChange3($event)">
    </awe-pagination-controls>
  \`
})
export class CustomPaginationComponent {
  pageSize3 = 10;
  currentPage3 = 1;

  onPageChange3(page: number): void {
    this.currentPage3 = page;
  }

  onPageSizeChange3(pageSize: number): void {
    this.pageSize3 = pageSize;
  }
}`,
      'Console Pagination': `
import { Component } from '@angular/core';
import { PaginationControlsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-console-pagination',
  standalone: true,
  imports: [PaginationControlsComponent],
  template: \`
    <awe-pagination-controls
      [totalItems]="100"
      [pageSize]="pageSize2"
      [currentPage]="currentPage2"
      [showLabel]="false"
      [showPageSizeOptions]="false"
      [showTotalPages]="false"
      (pageChange)="onPageChange2($event)"
      (pageSizeChange)="onPageSizeChange2($event)">
    </awe-pagination-controls>
  \`
})
export class ConsolePaginationComponent {
  pageSize2 = 10;
  currentPage2 = 1;

  onPageChange2(page: number): void {
    this.currentPage2 = page;
  }

  onPageSizeChange2(pageSize: number): void {
    this.pageSize2 = pageSize;
  }
}`,
    };

    return examples[sectionTitle] || '';
  }

  // Copy Code to Clipboard
  copyCode(sectionTitle: string): void {
    const code = this.getPaginationCode(sectionTitle);
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
    document.body.removeChild(textarea);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      this.codeBlock &&
      !this.codeBlock.nativeElement.contains(event.target)
    ) {
      this.sections.forEach((section) => (section.showCode = false));
    }
  }
}
