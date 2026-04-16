import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPaginationControlsComponent } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'app-compact-demo',
  standalone: true,
  imports: [CommonModule, AavaPaginationControlsComponent],
  templateUrl: './compact-demo.component.html',
  styleUrl: './compact-demo.component.scss'
})
export class AppPaginationCompactDemoComponent {
  currentPage = 1;

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
