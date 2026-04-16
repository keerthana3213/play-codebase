import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-sidebar-demo.component.html',
  styleUrl: './app-sidebar-demo.component.scss',
})
export class AppSidebarDemoComponent {
  sections = [
    {
      title: 'Basic Usage',
      description: 'Simple sidebar with basic navigation and user profile',
      route: '/app-sidebar/basic-usage',
      icon: '📱',
    },
  ];

  apiProps = [
    {
      property: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'large'",
      description: 'Sidebar size variant',
    },
    {
      property: 'height',
      type: 'string',
      default: "'100vh'",
      description: 'Sidebar height',
    },
    {
      property: 'showCollapseButton',
      type: 'boolean',
      default: 'false',
      description: 'Show collapse/expand button',
    },
    {
      property: 'buttonVariant',
      type: "'inside' | 'outside'",
      default: "'inside'",
      description: 'Collapse button position',
    },
    {
      property: 'showHeader',
      type: 'boolean',
      default: 'true',
      description: 'Show sidebar header',
    },
    {
      property: 'showFooter',
      type: 'boolean',
      default: 'true',
      description: 'Show sidebar footer',
    },
    {
      property: 'isCollapsed',
      type: 'boolean',
      default: 'false',
      description: 'Initial collapsed state',
    },
    {
      property: 'position',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Sidebar position',
    },
    {
      property: 'menuItems',
      type: 'MenuItem[]',
      default: '[]',
      description: 'Navigation menu items',
    },
    {
      property: 'userProfile',
      type: 'UserProfile | null',
      default: 'null',
      description: 'User profile information',
    },
    {
      property: 'headerTitle',
      type: 'string',
      default: "''",
      description: 'Header title text',
    },
    {
      property: 'headerSubtitle',
      type: 'string',
      default: "''",
      description: 'Header subtitle text',
    },
    {
      property: 'logoUrl',
      type: 'string',
      default: "''",
      description: 'Logo image URL',
    },
    {
      property: 'collapsedLogoUrl',
      type: 'string',
      default: "''",
      description: 'Logo URL for collapsed state',
    },
  ];

  showcaseSize = 'large';
  showcaseCollapsed = false;
  showcaseButtonVariant = 'inside';

  onSizeChange(size: 'sm' | 'md' | 'lg') {
    this.showcaseSize = size;
  }

  onCollapseToggle(collapsed: boolean) {
    this.showcaseCollapsed = collapsed;
  }

  onButtonVariantChange(variant: 'inside' | 'outside') {
    this.showcaseButtonVariant = variant;
  }
}
