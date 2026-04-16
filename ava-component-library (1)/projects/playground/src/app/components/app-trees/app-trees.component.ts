import { Component, ViewEncapsulation } from '@angular/core';
import { AavaTreesComponent } from '@aava/play-core';
import { TreeNode } from '@aava/play-core';

import { SnackbarService } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TreeDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'ava-trees-documentation',
  standalone: true,
  imports: [AavaTreesComponent, CommonModule, RouterModule],
  templateUrl: './app-trees.component.html',
  styleUrl: './app-trees.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppTreesComponent {

  constructor(private snackbarService: SnackbarService) { }

  // Properties for custom alert demo
  showCustomAlert = false;
  clickedNodeName = '';

  sections: TreeDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple tree structure with expandable nodes.',
      showCode: false,
    },
    {
      title: 'With Icons',
      description: 'Tree nodes with custom icons for better visual hierarchy.',
      showCode: false,
    },
    {
      title: 'Single Selection',
      description: 'Tree with single node selection capability.',
      showCode: false,
    },
    {
      title: 'Multi Selection',
      description: 'Tree with multiple node selection capability.',
      showCode: false,
    },
    {
      title: 'Event Handling',
      description: 'Tree with custom event handling and user feedback.',
      showCode: false,
    },
    {
      title: 'With Snackbar Integration',
      description: 'Tree that shows snackbar notifications on node clicks.',
      showCode: false,
    },
    {
      title: 'With Custom Alert',
      description: 'Tree with custom alert dialog integration.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'data',
      type: 'TreeNode[]',
      default: '[]',
      description: 'Array of tree nodes to display. Each node can have children for nested structure.',
    },
    {
      name: 'selectionMode',
      type: "'single' | 'multi'",
      default: "'single'",
      description: 'Selection mode for tree nodes. Single allows one selection, multi allows multiple.',
    },
    {
      name: 'selectedNodes',
      type: 'TreeNode[]',
      default: '[]',
      description: 'Array of currently selected nodes. Used for controlled selection state.',
    },
  ];

  events: ApiProperty[] = [
    {
      name: 'selectionChange',
      type: 'EventEmitter<TreeNode[]>',
      default: '-',
      description: 'Emitted when the selection changes. Returns array of selected nodes.',
    },
    {
      name: 'nodeClick',
      type: 'EventEmitter<TreeNode>',
      default: '-',
      description: 'Emitted when a node is clicked. Returns the clicked node.',
    },
  ];

  treeNodeInterface: ApiProperty[] = [
    {
      name: 'name',
      type: 'string',
      default: '-',
      description: 'Display name of the tree node.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Optional icon name for the node. Uses Lucide icon names.',
    },
    {
      name: 'children',
      type: 'TreeNode[]',
      default: 'undefined',
      description: 'Optional array of child nodes for nested structure.',
    },
    {
      name: 'isExpanded',
      type: 'boolean',
      default: 'false',
      description: 'Whether the node is expanded to show its children.',
    },
    {
      name: 'id',
      type: 'string | number',
      default: 'undefined',
      description: 'Optional unique identifier for the node. Required for selection functionality.',
    },
  ];
  treeData1 = [
    {
      name: 'Documents',
      isExpanded: false,
      children: [
        {
          name: 'Work',
          isExpanded: false,
          children: [
            { name: 'Expenses.doc' },
            { name: 'Resume.doc' }
          ]
        }
      ]
    },
    {
      name: 'Events',
      isExpanded: false,
      children: [
        { name: 'Meeting' },
        { name: 'Conference' }
      ]
    },
    {
      name: 'Movies',
      isExpanded: false,
      children: [
        { name: 'The Matrix' },
        { name: 'Inception' }
      ]
    }
  ];

  treeData2 = [
    {
      name: 'Documents',
      icon: 'file-text',
      isExpanded: false,
      children: [
        {
          name: 'Work',
          icon: 'briefcase',
          isExpanded: false,
          children: [
            { name: 'Expenses.doc', icon: null, },
            { name: 'Resume.doc', icon: 'file-text' }
          ]
        }
      ]
    },
    {
      name: 'Events',
      icon: 'calendar',
      isExpanded: false,
      children: [
        { name: 'Meeting', icon: 'calendar' },
        { name: 'Conference', icon: 'calendar' }
      ]
    }
  ];

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
          icon: 'file'
        },
        {
          id: 13,
          name: 'Child 2',
          icon: 'file',
          children: [
            {
              id: 14,
              name: 'Grandchild',
              icon: 'file'
            }
          ]
        }
      ]
    }
  ];

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
          icon: 'file'
        },
        {
          id: 3,
          name: 'Child 2',
          icon: 'file',
          children: [
            {
              id: 4,
              name: 'Grandchild',
              icon: 'file'
            }
          ]
        }
      ]
    }
  ];

  // Tree data for snackbar demo
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
          icon: 'globe'
        },
        {
          id: 23,
          name: 'Mobile App',
          icon: 'smartphone'
        }
      ]
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
          icon: 'file-text'
        }
      ]
    }
  ];

  // Tree data for custom alert demo
  treeDataWithAlert = [
    {
      id: 31,
      name: 'Tasks',
      icon: 'check-square',
      isExpanded: true,
      children: [
        {
          id: 32,
          name: 'Complete Design',
          icon: 'palette'
        },
        {
          id: 33,
          name: 'Review Code',
          icon: 'code'
        }
      ]
    }
  ];

  selectedNodes: TreeNode[] = [];

  onSelectionChange(selection: TreeNode[]): void {
    this.selectedNodes = selection;
    console.log('Selected nodes:', selection);

    // You can now use the selected nodes data
    // For single selection: selection[0] (if exists)
    // For multi selection: selection array
  }

  // Method for snackbar demo
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
          size: 16
        },
        dismissible: true
      }
    );
  }

  // Method for custom alert demo
  onNodeClickWithAlert(node: TreeNode): void {
    this.clickedNodeName = node.name;
    this.showCustomAlert = true;
  }

  // Method to close custom alert
  closeCustomAlert(): void {
    this.showCustomAlert = false;
    this.clickedNodeName = '';
  }

  // Toggle code visibility
  toggleCodeVisibility(index: number, event: Event): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Get code examples for each section
  getTreeCode(sectionTitle: string): string {
    const codeExamples: { [key: string]: string } = {
      'basic usage': `<ava-tree [data]="treeData1"></ava-tree>
 
// Component
treeData1 = [
  {
    name: 'Documents',
    isExpanded: false,
    children: [
      {
        name: 'Work',
        isExpanded: false,
        children: [
          { name: 'Expenses.doc'},
          { name: 'Resume.doc'}
        ]
      }
    ]
  },
  {
    name: 'Events',
    isExpanded: false,
    children: [
      { name: 'Meeting' },
      { name: 'Conference'}
    ]
  }
];`,

      'with icons': `<ava-tree [data]="treeData2"></ava-tree>
 
// Component
treeData2 = [
  {
    name: 'Documents',
    icon: 'file-text',
    isExpanded: false,
    children: [
      {
        name: 'Work',
        icon: 'briefcase',
        isExpanded: false,
        children: [
          { name: 'Expenses.doc', icon: null },
          { name: 'Resume.doc', icon: 'file-text' }
        ]
      }
    ]
  },
  {
    name: 'Events',
    icon: 'calendar',
    isExpanded: false,
    children: [
      { name: 'Meeting', icon: 'calendar' },
      { name: 'Conference', icon: 'calendar' }
    ]
  }
];`,

      'single selection': `<ava-tree
  [data]="treeData3"
  selectionMode="single"
  [selectedNodes]="selectedNodes"
  (selectionChange)="onSelectionChange($event)">
</ava-tree>
 
// Component
selectedNodes: TreeNode[] = [];
 
onSelectionChange(selection: TreeNode[]): void {
  this.selectedNodes = selection;
  console.log('Selected nodes:', selection);
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
        icon: 'file'
      },
      {
        id: 13,
        name: 'Child 2',
        icon: 'file',
        children: [
          {
            id: 14,
            name: 'Grandchild',
            icon: 'file'
          }
        ]
      }
    ]
  }
];`,

      'multi selection': `<ava-tree
  [data]="treeData4"
  selectionMode="multi"
  [selectedNodes]="selectedNodes"
  (selectionChange)="onSelectionChange($event)">
</ava-tree>
 
// Component
selectedNodes: TreeNode[] = [];
 
onSelectionChange(selection: TreeNode[]): void {
  this.selectedNodes = selection;
  console.log('Selected nodes:', selection);
  // For multi selection: selection array contains all selected nodes
}`,

      'event handling': `<ava-tree
  [data]="treeData"
  selectionMode="single"
  [selectedNodes]="selectedNodes"
  (selectionChange)="onSelectionChange($event)"
  (nodeClick)="onNodeClick($event)">
</ava-tree>
 
// Component
onNodeClick(node: TreeNode): void {
  console.log('Node clicked:', node);
  // Handle node click events
}
 
onSelectionChange(selection: TreeNode[]): void {
  this.selectedNodes = selection;
  // Handle selection changes
}`,

      'with snackbar integration': `<ava-tree
  [data]="treeDataWithSnackbar"
  selectionMode="single"
  [selectedNodes]="selectedNodes"
  (selectionChange)="onSelectionChange($event)"
  (nodeClick)="onNodeClickWithSnackbar($event)">
</ava-tree>
 
// Component
constructor(private snackbarService: SnackbarService) {}
 
onNodeClickWithSnackbar(node: TreeNode): void {
  this.snackbarService.show(
    \`You clicked on: \${node.name}\`,
    'top-right',
    3000,
    '#fff',
    '#059669',
    {
      icon: {
        name: 'info',
        color: '#fff',
        size: 16
      },
      dismissible: true
    }
  );
}`,

      'with custom alert': `<ava-tree
  [data]="treeDataWithAlert"
  selectionMode="single"
  [selectedNodes]="selectedNodes"
  (selectionChange)="onSelectionChange($event)"
  (nodeClick)="onNodeClickWithAlert($event)">
</ava-tree>
 
<!-- Custom alert content -->
<div class="custom-alert" *ngIf="showCustomAlert">
  <div class="alert-content">
    <h4>Node Clicked!</h4>
    <p>You clicked on: <strong>{{ clickedNodeName }}</strong></p>
    <button (click)="closeCustomAlert()">Close</button>
  </div>
</div>
 
// Component
showCustomAlert = false;
clickedNodeName = '';
 
onNodeClickWithAlert(node: TreeNode): void {
  this.clickedNodeName = node.name;
  this.showCustomAlert = true;
}
 
closeCustomAlert(): void {
  this.showCustomAlert = false;
  this.clickedNodeName = '';
}`
    };

    return codeExamples[sectionTitle] || '';
  }

  // Copy code to clipboard
  copyCode(sectionTitle: string): void {
    const code = this.getTreeCode(sectionTitle);
    navigator.clipboard.writeText(code).then(() => {
      // Could show a toast notification here
      console.log('Code copied to clipboard');
    });
  }
}

