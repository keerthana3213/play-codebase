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
  label: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconPosition: 'left' | 'right';
  nodes: TreeNode[];
}

@Component({
  selector: 'app-test-treeview',
  standalone: true,
  imports: [CommonModule, AavaTreeviewComponent],
  templateUrl: './test-treeview.component.html',
  styleUrls: ['./test-treeview.component.scss']
})
export class TestTreeviewComponent {
  treeConfigs: TreeviewConfig[] = [
    {
      label: 'Extra Small (Left Icons)',
      size: 'xs',
      iconPosition: 'left',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Extra Small (Right Icons)',
      size: 'xs',
      iconPosition: 'right',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Small (Left Icons)',
      size: 'sm',
      iconPosition: 'left',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Small (Right Icons)',
      size: 'sm',
      iconPosition: 'right',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Medium (Left Icons)',
      size: 'md',
      iconPosition: 'left',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Medium (Right Icons)',
      size: 'md',
      iconPosition: 'right',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Large (Left Icons)',
      size: 'lg',
      iconPosition: 'left',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Large (Right Icons)',
      size: 'lg',
      iconPosition: 'right',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Extra Large (Left Icons)',
      size: 'xl',
      iconPosition: 'left',
      nodes: this.makeSampleTree()
    },
    {
      label: 'Extra Large (Right Icons)',
      size: 'xl',
      iconPosition: 'right',
      nodes: this.makeSampleTree()
    }
  ];

  // Reusable sample tree
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
          { id: '1.2', name: 'Backend', icon: 'folder', selected: false }
        ]
      },
      {
        id: '2',
        name: 'Mobile',
        icon: 'folder',
        expanded: false,
        selected: false,
        children: [
          { id: '2.1', name: 'UI', icon: 'folder', selected: false },
          { id: '2.2', name: 'Sap', icon: 'folder', selected: false }
        ]
      },
      { id: '3', name: 'Marketing', icon: 'folder', selected: false },
      { id: '4', name: 'Operations', icon: 'folder', selected: false }
    ];
  }

  onNodeSelect(config: TreeviewConfig, node: TreeNode) {
    console.log('Selected from', config.label, ':', node);

    // update selection state
    config.nodes = this.updateTreeSelection(config.nodes, node);
  }

  private updateTreeSelection(nodes: TreeNode[], targetNode: TreeNode): TreeNode[] {
    if (!nodes) return [];
    return nodes.map(n => {
      const newNode: TreeNode = { ...n };
      if (newNode.children?.length) {
        newNode.children = this.updateTreeSelection(newNode.children, targetNode);
      }
      newNode.selected = newNode.id === targetNode.id;
      return newNode;
    });
  }
}
