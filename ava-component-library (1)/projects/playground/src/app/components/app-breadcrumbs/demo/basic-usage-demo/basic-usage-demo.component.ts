import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaBreadcrumbsComponent, AavaIconComponent } from '@aava/play-core';
import { BreadcrumbsDemoCardComponent } from '../breadcrumbs-demo-card/breadcrumbs-demo-card.component';

interface BreadcrumbItem {
  label?: string;
  icon?: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'ava-breadcrumbs-basic-usage-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
})
export class BasicUsageDemoComponent {
  // Simple 3-level navigation
  simpleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/home', active: false },
    { label: 'Category', url: '/category', active: false },
    { label: 'Product', url: '/product', active: true },
  ];

  // E-commerce category navigation
  ecommerceBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/home', active: false },
    { label: 'Electronics', url: '/electronics', active: false },
    { label: 'Computers', url: '/electronics/computers', active: false },
    { label: 'Laptops', url: '/electronics/computers/laptops', active: true },
  ];

  // Documentation site navigation
  documentationBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Docs', url: '/docs', active: false },
    { label: 'Components', url: '/docs/components', active: false },
    { label: 'Navigation', url: '/docs/components/navigation', active: false },
    {
      label: 'Breadcrumbs',
      url: '/docs/components/navigation/breadcrumbs',
      active: true,
    },
  ];

  // User dashboard navigation
  dashboardBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard', active: false },
    { label: 'Settings', url: '/dashboard/settings', active: false },
    { label: 'Account', url: '/dashboard/settings/account', active: false },
    {
      label: 'Profile',
      url: '/dashboard/settings/account/profile',
      active: true,
    },
  ];
}
