import { Component } from '@angular/core';
import { AavaPaginationControlsComponent } from '@aava/play-core';
@Component({
  selector: 'app-test-pagination',
  standalone: true,
  imports: [AavaPaginationControlsComponent],
  templateUrl: './test-pagination.component.html',
  styleUrl: './test-pagination.component.scss'
})
export class TestPaginationComponent {
  // Current pages for different variants
  basicPage = 1;
  unfilledPage = 1;
  basicUnfilledPage = 1;
  pageInfoPage = 1;
  pageInfoFilledPage = 1;

  onPageChange(variant: string, page: number) {
    switch (variant) {
      case 'basic':
        this.basicPage = page;
        break;
      case 'unfilled':
        this.unfilledPage = page;
        break;
      case 'basicunfilled':
        this.basicUnfilledPage = page;
        break;
      case 'pageinfo':
        this.pageInfoPage = page;
        break;
      case 'pageinfofilled':
        this.pageInfoFilledPage = page;
        break;
    }
  }
}
