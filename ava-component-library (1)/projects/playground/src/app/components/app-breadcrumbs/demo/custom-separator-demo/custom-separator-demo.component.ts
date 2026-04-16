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
  selector: 'ava-breadcrumbs-custom-separator-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaBreadcrumbsComponent,
    BreadcrumbsDemoCardComponent,
  ],
  templateUrl: './custom-separator-demo.component.html',
  styleUrls: ['./custom-separator-demo.component.scss'],
})
export class CustomSeparatorDemoComponent {
  // Standard breadcrumb data for separator demonstration
  sampleBreadcrumbs: BreadcrumbItem[] = [
    { icon: 'home', label: 'Home', url: '/home', active: false },
    { icon: 'folder', label: 'Category', url: '/category', active: false },
    { icon: 'tag', label: 'Subcategory', url: '/subcategory', active: false },
    { icon: 'package', label: 'Product', url: '/product', active: true },
  ];
}
