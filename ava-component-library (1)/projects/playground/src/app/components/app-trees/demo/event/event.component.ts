import { Component } from '@angular/core';
import { AavaTreesComponent, SnackbarService, TreeNode } from '@aava/play-core';

@Component({
  selector: 'app-event',
  imports: [AavaTreesComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  constructor(private snackbarService: SnackbarService) {}

  treeDataWithSnackbar = [
    {
      id: 21,
      name: 'Projects',
      icon: 'folder',
      isExpanded: true,
      children: [
        {
          id: 22,
          name: 'Website Redesign',
          icon: 'globe',
        },
        {
          id: 23,
          name: 'Mobile App',
          icon: 'smartphone',
        },
      ],
    },
    {
      id: 24,
      name: 'Resources',
      icon: 'book',
      isExpanded: false,
      children: [
        {
          id: 25,
          name: 'Documentation',
          icon: 'file-text',
        },
      ],
    },
  ];

  selectedNodes: TreeNode[] = [];

  onSelectionChange(selection: TreeNode[]): void {
    this.selectedNodes = selection;
    console.log('Selected nodes:', selection);

    // You can now use the selected nodes data
    // For single selection: selection[0] (if exists)
    // For multi selection: selection array
  }

  onNodeClickWithSnackbar(node: TreeNode): void {
    this.snackbarService.show(
      `You clicked on: ${node.name}`,
      'top-right',
      3000,
      '#fff',
      '#059669',
      {
        icon: {
          name: 'info',
          color: '#fff',
          size: 16,
        },
        dismissible: true,
      }
    );
  }
}
