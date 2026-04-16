import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTreeviewComponent } from '@aava/play-core';

export interface TreeNode {
  id?: string | number;
  name: string;
  icon?: string;
  expanded?: boolean;
  selected?: boolean;
  level?: number;
  children?: TreeNode[];
}

interface TreeviewConfig {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconPosition: 'left' | 'right';
  nodes: TreeNode[];
}

@Component({
  selector: 'app-treeview-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaTreeviewComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  treeConfigs: TreeviewConfig[] = [
    {
      size: 'md',
      iconPosition: 'left',
      nodes: this.makeSampleTree(),
    },
  ];

  private makeSampleTree(): TreeNode[] {
    return [
      {
        id: '1',
        name: 'Engineering',
        icon: 'folder',
        expanded: false,
        selected: false,
        children: [
          { id: '1.1', name: 'Frontend', icon: 'folder', selected: false },
          { id: '1.2', name: 'Backend', icon: 'folder', selected: false },
        ],
      },
      {
        id: '2',
        name: 'Mobile',
        icon: 'folder',
        expanded: false,
        selected: false,
        children: [
          { id: '2.1', name: 'UI', icon: 'folder', selected: false },
          { id: '2.2', name: 'Sap', icon: 'folder', selected: false },
        ],
      },
      { id: '3', name: 'Marketing', icon: 'folder', selected: false },
      { id: '4', name: 'Operations', icon: 'folder', selected: false },
    ];
  }

  onNodeSelect(config: TreeviewConfig, node: TreeNode) {
    console.log('Selected from', ':', node);

    // update selection state
    config.nodes = this.updateTreeSelection(config.nodes, node);
  }

  private updateTreeSelection(
    nodes: TreeNode[],
    targetNode: TreeNode
  ): TreeNode[] {
    if (!nodes) return [];
    return nodes.map((n) => {
      const newNode: TreeNode = { ...n };
      if (newNode.children?.length) {
        newNode.children = this.updateTreeSelection(
          newNode.children,
          targetNode
        );
      }
      newNode.selected = newNode.id === targetNode.id;
      return newNode;
    });
  }
}
