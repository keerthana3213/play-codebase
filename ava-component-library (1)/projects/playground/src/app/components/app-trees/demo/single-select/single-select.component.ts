import { Component } from '@angular/core';
import { AavaTreesComponent, TreeNode } from '@aava/play-core';

@Component({
  selector: 'app-single-select',
  imports: [AavaTreesComponent],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
})
export class SingleSelectComponent {
  selectedNodes: TreeNode[] = [];

  onSelectionChange(selection: TreeNode[]): void {
    this.selectedNodes = selection;
    console.log('Selected nodes:', selection);

    // You can now use the selected nodes data
    // For single selection: selection[0] (if exists)
    // For multi selection: selection array
  }

  treeData3 = [
    {
      id: 11,
      name: 'Root Node',
      icon: 'folder',
      isExpanded: true,
      children: [
        {
          id: 12,
          name: 'Child 1',
          icon: 'file',
        },
        {
          id: 13,
          name: 'Child 2',
          icon: 'file',
          children: [
            {
              id: 14,
              name: 'Grandchild',
              icon: 'file',
            },
          ],
        },
      ],
    },
  ];
}
