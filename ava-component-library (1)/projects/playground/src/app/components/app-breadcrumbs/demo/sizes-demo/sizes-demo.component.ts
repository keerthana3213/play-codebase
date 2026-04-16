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
  selector: 'ava-breadcrumbs-sizes-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss'],
})
export class SizesDemoComponent {
  // Standard breadcrumb data for size comparison
  sampleBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Products', url: '/products', active: false },
    {
      icon: 'tag',
      label: 'Category',
      url: '/products/category',
      active: false,
    },
    {
      icon: 'package',
      label: 'Item Details',
      url: '/products/category/item',
      active: true,
    },
  ];
}
