import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'ava-treeview-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaTreesComponent],
  templateUrl: './app-treeview-demo.component.html',
  styleUrl: './app-treeview-demo.component.scss',
})
export class AppTreeviewDemoComponent {
  showcaseNodes: TreeNode[] = [
    {
      id: '1',
      name: 'Root',
      icon: 'folder',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: 'Documents',
          icon: 'folder',
          isExpanded: false,
          children: [
            { id: '1-1-1', name: 'Work', icon: 'briefcase' },
            { id: '1-1-2', name: 'Personal', icon: 'user' },
          ],
        },
        {
          id: '1-2',
          name: 'Projects',
          icon: 'folder',
          isExpanded: false,
          children: [
            { id: '1-2-1', name: 'Web App', icon: 'globe' },
            { id: '1-2-2', name: 'Mobile App', icon: 'smartphone' },
          ],
        },
      ],
    },
  ];

  selectedNode: TreeNode | null = null;

  onShowcaseNodeSelect(node: TreeNode): void {
    console.log('Showcase node selected:', node);
    this.selectedNode = node;
  }
}
