import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'ava-treeview-custom-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaTreesComponent],
  templateUrl: './custom-icons-demo.component.html',
  styleUrl: './custom-icons-demo.component.scss',
})
export class CustomIconsDemoComponent {
  customIconNodes: TreeNode[] = [
    {
      id: 'root',
      name: 'Project Structure',
      icon: 'folder-open',
      isExpanded: true,
      children: [
        {
          id: 'src',
          name: 'Source Code',
          icon: 'code',
          isExpanded: false,
          children: [
            {
              id: 'components',
              name: 'Components',
              icon: 'puzzle',
              isExpanded: false,
              children: [
                { id: 'button', name: 'Button Component', icon: 'square' },
                { id: 'input', name: 'Input Component', icon: 'type' },
                { id: 'modal', name: 'Modal Component', icon: 'maximize-2' },
              ],
            },
            {
              id: 'services',
              name: 'Services',
              icon: 'zap',
              isExpanded: false,
              children: [
                { id: 'api', name: 'API Service', icon: 'globe' },
                { id: 'auth', name: 'Auth Service', icon: 'shield' },
                { id: 'storage', name: 'Storage Service', icon: 'database' },
              ],
            },
            {
              id: 'utils',
              name: 'Utilities',
              icon: 'tool',
              isExpanded: false,
              children: [
                { id: 'helpers', name: 'Helper Functions', icon: 'wrench' },
                { id: 'constants', name: 'Constants', icon: 'hash' },
                { id: 'types', name: 'Type Definitions', icon: 'tag' },
              ],
            },
          ],
        },
        {
          id: 'assets',
          name: 'Assets',
          icon: 'image',
          isExpanded: false,
          children: [
            { id: 'images', name: 'Images', icon: 'image' },
            { id: 'icons', name: 'Icons', icon: 'star' },
            { id: 'fonts', name: 'Fonts', icon: 'type' },
          ],
        },
        {
          id: 'docs',
          name: 'Documentation',
          icon: 'book',
          isExpanded: false,
          children: [
            { id: 'readme', name: 'README', icon: 'file-text' },
            { id: 'api-docs', name: 'API Docs', icon: 'file-text' },
            { id: 'guides', name: 'User Guides', icon: 'help-circle' },
          ],
        },
      ],
    },
  ];

  selectedNode: TreeNode | null = null;

  onNodeSelect(node: TreeNode): void {
    console.log('Custom icon node selected:', node);
    this.selectedNode = node;
  }

  getIconDescription(iconName: string): string {
    const iconDescriptions: { [key: string]: string } = {
      'folder-open': 'Opened folder icon',
      'code': 'Source code icon',
      'puzzle': 'Component pieces icon',
      'zap': 'Lightning bolt for services',
      'tool': 'Utility tools icon',
      'image': 'Image/media icon',
      'star': 'Star icon for special items',
      'book': 'Documentation icon',
      'square': 'Button shape icon',
      'type': 'Text input icon',
      'maximize-2': 'Modal window icon',
      'globe': 'Global API icon',
      'shield': 'Security icon',
      'database': 'Data storage icon',
      'wrench': 'Tool/helper icon',
      'hash': 'Constant value icon',
      'tag': 'Type definition icon',
      'help-circle': 'Help/guide icon',
    };

    return iconDescriptions[iconName] || 'Default icon';
  }
}
