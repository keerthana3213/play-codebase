import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaBreadcrumbsComponent } from '@aava/play-core';
import { BreadcrumbsDemoCardComponent } from '../breadcrumbs-demo-card/breadcrumbs-demo-card.component';

interface BreadcrumbItem {
  label?: string;
  icon?: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'ava-breadcrumbs-collapsible-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './collapsible-demo.component.html',
  styleUrls: ['./collapsible-demo.component.scss'],
})
export class CollapsibleDemoComponent {
  // Long breadcrumb path (7 items)
  longBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    {
      icon: 'building',
      label: 'Organization',
      url: '/organization',
      active: false,
    },
    { icon: 'folder', label: 'Projects', url: '/projects', active: false },
    {
      icon: 'folder',
      label: 'Web Development',
      url: '/web-dev',
      active: false,
    },
    { icon: 'folder', label: 'Frontend', url: '/frontend', active: false },
    { icon: 'folder', label: 'Components', url: '/components', active: false },
    {
      icon: 'package',
      label: 'Breadcrumbs',
      url: '/breadcrumbs',
      active: true,
    },
  ];

  // Very long breadcrumb path (10 items)
  veryLongBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'building', label: 'Company', url: '/company', active: false },
    {
      icon: 'folder',
      label: 'Departments',
      url: '/departments',
      active: false,
    },
    {
      icon: 'folder',
      label: 'Engineering',
      url: '/engineering',
      active: false,
    },
    {
      icon: 'folder',
      label: 'Frontend Team',
      url: '/frontend-team',
      active: false,
    },
    { icon: 'folder', label: 'Projects', url: '/projects', active: false },
    {
      icon: 'folder',
      label: 'Design System',
      url: '/design-system',
      active: false,
    },
    { icon: 'folder', label: 'Components', url: '/components', active: false },
    { icon: 'folder', label: 'Navigation', url: '/navigation', active: false },
    {
      icon: 'package',
      label: 'Breadcrumbs Implementation',
      url: '/breadcrumbs-impl',
      active: true,
    },
  ];

  // Short breadcrumbs (won't collapse)
  shortBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Products', url: '/products', active: false },
    { icon: 'package', label: 'Details', url: '/details', active: true },
  ];
}
