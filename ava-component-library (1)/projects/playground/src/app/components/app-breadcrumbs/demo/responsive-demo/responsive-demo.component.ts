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
  selector: 'ava-breadcrumbs-responsive-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    AavaIconComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './responsive-demo.component.html',
  styleUrls: ['./responsive-demo.component.scss'],
})
export class ResponsiveDemoComponent {
  // Mobile-optimized breadcrumbs (shorter labels)
  mobileBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Shop', url: '/shop', active: false },
    { icon: 'package', label: 'Product', url: '/product', active: true },
  ];

  // Tablet breadcrumbs (balanced labels)
  tabletBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Categories', url: '/categories', active: false },
    { icon: 'tag', label: 'Electronics', url: '/electronics', active: false },
    {
      icon: 'package',
      label: 'Product Details',
      url: '/product',
      active: true,
    },
  ];

  // Desktop breadcrumbs (full descriptive labels)
  desktopBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    {
      icon: 'folder',
      label: 'Product Categories',
      url: '/categories',
      active: false,
    },
    {
      icon: 'laptop',
      label: 'Electronics & Technology',
      url: '/electronics',
      active: false,
    },
    {
      icon: 'monitor',
      label: 'Computer Hardware',
      url: '/computers',
      active: false,
    },
    {
      icon: 'cpu',
      label: 'Processors & Components',
      url: '/processors',
      active: false,
    },
    {
      icon: 'package',
      label: 'Intel Core i7 Processor Details',
      url: '/product',
      active: true,
    },
  ];

  // Responsive with collapsible (adapts based on content)
  responsiveCollapsibleBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Dashboard', url: '/dashboard', active: false },
    { icon: 'users', label: 'User Management', url: '/users', active: false },
    {
      icon: 'settings',
      label: 'Account Settings',
      url: '/settings',
      active: false,
    },
    {
      icon: 'shield',
      label: 'Security & Privacy',
      url: '/security',
      active: false,
    },
    {
      icon: 'key',
      label: 'Password Management',
      url: '/passwords',
      active: false,
    },
    {
      icon: 'lock',
      label: 'Two-Factor Authentication',
      url: '/2fa',
      active: true,
    },
  ];
}
