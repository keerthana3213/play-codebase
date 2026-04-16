import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface TreeNode {
  name: string;
  icon?: string | null;
  children?: TreeNode[];
  isExpanded?: boolean;
  id?: string | number; // Add unique identifier for selection
}

type SelectionMode = 'single' | 'multi';

@Component({
  selector: 'aava-tree',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-trees.component.html',
  styleUrl: './aava-trees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaTreesComponent {
  @Input() data: TreeNode[] = [];
  @Input() selectionMode: SelectionMode = 'single';
  @Input() selectedNodes: TreeNode[] = [];
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  
  @Output() selectionChange = new EventEmitter<TreeNode[]>();
  @Output() nodeClick = new EventEmitter<TreeNode>();

  // Icon colors using CSS custom properties
  get defaultIconColor(): string {
    return 'var(--tree-primary-color )';
  }

  get selectedIconColor(): string {
    return 'var(--tree-selected-text-color)';
  }

  constructor(private cdr: ChangeDetectorRef) { }

  toggleExpand(node: TreeNode): void {
    node.isExpanded = !node.isExpanded;
    this.cdr.markForCheck();
  }

  onNodeClick(node: TreeNode, event: Event): void {
    // Check if click is on toggle icon
    const target = event.target as HTMLElement;
    if (target.closest('.toggle-icon')) {
      this.toggleExpand(node);
      return;
    }

    // Handle selection
    this.selectNode(node);

    // Always emit node click event
    this.nodeClick.emit(node);
  }

  selectNode(node: TreeNode): void {
    let newSelection: TreeNode[] = [...this.selectedNodes];

    if (this.selectionMode === 'single') {
      // Single selection - replace current selection or unselect if already selected
      if (this.isSelected(node)) {
        newSelection = []; // Unselect if already selected
      } else {
        newSelection = [node]; // Select the new node
      }
    } else if (this.selectionMode === 'multi') {
      // Multi selection - toggle node in selection
      const index = newSelection.findIndex(selected => this.isSameNode(selected, node));
      if (index > -1) {
        // Node is already selected, remove it
        newSelection.splice(index, 1);
      } else {
        // Node is not selected, add it
        newSelection.push(node);
      }
    }

    this.selectionChange.emit(newSelection);
  }


  isSelected(node: TreeNode): boolean {
    return this.selectedNodes.some(selected => this.isSameNode(selected, node));
  }

  private isSameNode(node1: TreeNode, node2: TreeNode): boolean {
    // Compare by id if available, otherwise by reference
    if (node1.id && node2.id) {
      return node1.id === node2.id;
    }
    return node1 === node2;
  }

  onChildSelectionChange(selection: TreeNode[]): void {
    // Propagate selection change from child components to root
    this.selectionChange.emit(selection);
  }

  onChildNodeClick(node: TreeNode): void {
    // Propagate node click event from child components to root
    this.nodeClick.emit(node);
  }
}