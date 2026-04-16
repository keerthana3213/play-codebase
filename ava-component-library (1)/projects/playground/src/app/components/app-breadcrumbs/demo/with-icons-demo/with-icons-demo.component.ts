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
  selector: 'ava-breadcrumbs-with-icons-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './with-icons-demo.component.html',
  styleUrls: ['./with-icons-demo.component.scss'],
})
export class WithIconsDemoComponent {
  // Icons only navigation
  iconsOnlyBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', url: '/home', active: false },
    { icon: 'folder', url: '/category', active: false },
    { icon: 'file', url: '/product', active: true },
  ];

  // Mixed icons and text
  mixedBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Category', url: '/category', active: false },
    { icon: 'file', label: 'Product', url: '/product', active: true },
  ];

  // File system navigation with icons
  fileSystemBreadcrumbs: BreadcrumbItem[] = [
    {
      icon: 'hard-drive',
      label: 'Documents',
      url: '/documents',
      active: false,
    },
    {
      icon: 'folder',
      label: 'Projects',
      url: '/documents/projects',
      active: false,
    },
    {
      icon: 'folder',
      label: 'Web App',
      url: '/documents/projects/webapp',
      active: false,
    },
    {
      icon: 'file-code',
      label: 'index.html',
      url: '/documents/projects/webapp/index.html',
      active: true,
    },
  ];

  // E-commerce with category icons
  ecommerceIconsBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    {
      icon: 'laptop',
      label: 'Electronics',
      url: '/electronics',
      active: false,
    },
    {
      icon: 'monitor',
      label: 'Computers',
      url: '/electronics/computers',
      active: false,
    },
    {
      icon: 'laptop',
      label: 'Gaming Laptop',
      url: '/electronics/computers/gaming-laptop',
      active: true,
    },
  ];
}
