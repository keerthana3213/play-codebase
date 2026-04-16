import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'ava-treeview-file-system-demo',
  standalone: true,
  imports: [CommonModule, AavaTreesComponent],
  templateUrl: './file-system-demo.component.html',
  styleUrl: './file-system-demo.component.scss',
})
export class FileSystemDemoComponent {
  fileSystemNodes: TreeNode[] = [
    {
      id: 'root',
      name: 'C:',
      icon: 'hard-drive',
      isExpanded: true,
      children: [
        {
          id: 'programs',
          name: 'Program Files',
          icon: 'folder',
          isExpanded: false,
          children: [
            { id: 'chrome', name: 'Google Chrome', icon: 'globe' },
            { id: 'vscode', name: 'Visual Studio Code', icon: 'code' },
            { id: 'office', name: 'Microsoft Office', icon: 'briefcase' },
          ],
        },
        {
          id: 'users',
          name: 'Users',
          icon: 'users',
          isExpanded: false,
          children: [
            {
              id: 'user1',
              name: 'John Doe',
              icon: 'user',
              isExpanded: false,
              children: [
                { id: 'desktop', name: 'Desktop', icon: 'monitor' },
                { id: 'documents', name: 'Documents', icon: 'folder' },
                { id: 'downloads', name: 'Downloads', icon: 'download' },
                { id: 'pictures', name: 'Pictures', icon: 'image' },
              ],
            },
          ],
        },
        {
          id: 'windows',
          name: 'Windows',
          icon: 'folder',
          isExpanded: false,
          children: [
            { id: 'system32', name: 'System32', icon: 'settings' },
            { id: 'temp', name: 'Temp', icon: 'clock' },
          ],
        },
      ],
    },
  ];

  selectedNode: TreeNode | null = null;

  onNodeSelect(node: TreeNode): void {
    console.log('File system node selected:', node);
    this.selectedNode = node;
  }
}
