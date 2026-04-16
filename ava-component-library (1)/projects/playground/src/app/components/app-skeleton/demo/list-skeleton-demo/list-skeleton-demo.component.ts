import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-list-skeleton-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './list-skeleton-demo.component.html',
  styleUrl: './list-skeleton-demo.component.scss',
})
export class ListSkeletonDemoComponent {
  // Demo data for list skeleton
  listItems = [1, 2, 3, 4, 5]; // Number of list items to show

  // Individual list item skeleton elements
  listItemElements = [
    {
      width: '60px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'ID',
    },
    {
      width: '150px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Name',
    },
    {
      width: '100px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Status',
    },
    {
      width: '80px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Actions',
    },
  ];
}
