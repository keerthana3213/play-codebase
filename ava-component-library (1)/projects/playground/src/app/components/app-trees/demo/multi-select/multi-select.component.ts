import { Component } from '@angular/core';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'app-multi-select',
  imports: [AavaTreesComponent],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  selectedNodes: TreeNode[] = [];

  onSelectionChange(selection: TreeNode[]): void {
    this.selectedNodes = selection;
    console.log('Selected nodes:', selection);

    // You can now use the selected nodes data
    // For single selection: selection[0] (if exists)
    // For multi selection: selection array
  }

  treeData4 = [
    {
      id: 1,
      name: 'Root Node',
      icon: 'folder',
      isExpanded: true,
      children: [
        {
          id: 2,
          name: 'Child 1',
          icon: 'file',
        },
        {
          id: 3,
          name: 'Child 2',
          icon: 'file',
          children: [
            {
              id: 4,
              name: 'Grandchild',
              icon: 'file',
            },
          ],
        },
      ],
    },
  ];
}
