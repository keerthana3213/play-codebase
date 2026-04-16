import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaIconComponent],
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.scss'],
})
export class AppGridComponent {
  demoPages = [
    {
      title: 'Basic Grid',
      description: 'Simple grid layout with equal-width columns',
      route: '/app-grid/basic-usage',
      icon: 'grid',
    },
    {
      title: 'Responsive Grid',
      description: 'Grid layout that adapts to different screen sizes',
      route: '/app-grid/responsive',
      icon: 'smartphone',
    },
    {
      title: 'Flexbox Utilities',
      description: 'Advanced flexbox utilities for layout control',
      route: '/app-grid/flexbox',
      icon: 'align-center-horizontal',
    },
    {
      title: 'Alignment',
      description: 'Flexbox alignment utilities for positioning',
      route: '/app-grid/alignment',
      icon: 'align-center',
    },
    {
      title: 'Ordering',
      description: 'CSS order utilities for controlling visual order',
      route: '/app-grid/ordering',
      icon: 'list',
    },
    {
      title: 'Nested Grids',
      description: 'Complex layouts with nested grid containers',
      route: '/app-grid/nested',
      icon: 'layers',
    },
  ];
}
