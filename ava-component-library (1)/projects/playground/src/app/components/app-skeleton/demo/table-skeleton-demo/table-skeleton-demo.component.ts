import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'app-table-skeleton-demo',
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './table-skeleton-demo.component.html',
  styleUrl: './table-skeleton-demo.component.scss',
})
export class TableSkeletonDemoComponent {
  @Input() rowSize: number = 5;
  @Input() columnSize: number = 5;
  @Input() isLoading: boolean = true;
}
