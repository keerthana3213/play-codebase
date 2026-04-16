import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ava-skeleton-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-skeleton.component.html',
  styleUrl: './app-skeleton.component.scss',
})
export class AppSkeletonComponent {
  // Demo navigation data
  demos = [
    {
      path: 'basic-usage',
      title: 'Basic Usage',
      description: 'Simple skeleton with default settings',
    },
    {
      path: 'shapes',
      title: 'Shapes',
      description: 'Different skeleton shapes for various content types',
    },
    {
      path: 'animations',
      title: 'Animations',
      description: 'Wave and pulse animation effects',
    },
    {
      path: 'custom-styling',
      title: 'Custom Styling',
      description: 'Customize colors and styling',
    },
    {
      path: 'card-skeleton',
      title: 'Card Skeleton',
      description: 'Complete card skeleton example',
    },
    {
      path: 'list-skeleton',
      title: 'List Skeleton',
      description: 'Table and list skeleton patterns',
    },
    {
      path: 'table-skeleton',
      title: 'Table Skeleton',
      description: 'Table skeleton patterns',
    },
  ];
}
