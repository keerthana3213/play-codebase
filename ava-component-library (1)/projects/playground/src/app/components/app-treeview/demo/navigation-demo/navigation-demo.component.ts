import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'ava-treeview-navigation-demo',
  standalone: true,
  imports: [CommonModule, AavaTreesComponent],
  templateUrl: './navigation-demo.component.html',
  styleUrl: './navigation-demo.component.scss',
})
export class NavigationDemoComponent {
  navigationNodes: TreeNode[] = [
    {
      id: 'home',
      name: 'Home',
      icon: 'home',
      isExpanded: true,
      children: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          icon: 'activity',
          isExpanded: false,
          children: [
            { id: 'overview', name: 'Overview', icon: 'eye' },
            { id: 'analytics', name: 'Analytics', icon: 'bar-chart' },
            { id: 'reports', name: 'Reports', icon: 'file-text' },
          ],
        },
        {
          id: 'users',
          name: 'User Management',
          icon: 'users',
          isExpanded: false,
          children: [
            { id: 'user-list', name: 'User List', icon: 'list' },
            { id: 'user-roles', name: 'User Roles', icon: 'shield' },
            { id: 'permissions', name: 'Permissions', icon: 'lock' },
          ],
        },
        {
          id: 'settings',
          name: 'Settings',
          icon: 'settings',
          isExpanded: false,
          children: [
            { id: 'general', name: 'General', icon: 'sliders' },
            { id: 'security', name: 'Security', icon: 'key' },
            { id: 'notifications', name: 'Notifications', icon: 'bell' },
          ],
        },
      ],
    },
  ];

  selectedNode: TreeNode | null = null;
  breadcrumbPath: string = '';

  onNodeSelect(node: TreeNode): void {
    console.log('Navigation node selected:', node);
    this.selectedNode = node;
    this.breadcrumbPath = this.getBreadcrumbPath(node);
  }

  private getBreadcrumbPath(node: TreeNode): string {
    if (!node) return '';

    // For now, just return the node name since we don't have parent references
    // In a real implementation, you might want to build the path differently
    return node.name;
  }
}
