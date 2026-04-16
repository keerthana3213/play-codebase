// treeview.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface TreeNode {
  id?: string | number;
  name: string;
  icon?: string;
  expanded?: boolean;
  selected?: boolean;
  level?: number;
  children?: TreeNode[];
}

@Component({
  selector: 'aava-treeview',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-treeview.component.html',
  styleUrls: ['./aava-treeview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaTreeviewComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() level = 0;
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  

  @Output() nodeSelect = new EventEmitter<TreeNode>();

  toggleExpand(node: TreeNode) {
    if (node.children?.length) {
      node.expanded = !node.expanded;
      // Trigger a view update by creating a new array reference
      this.nodes = [...this.nodes];
    }
  }

  selectNode(node: TreeNode) {
    this.nodeSelect.emit(node);
  }

  calculateIndent(level?: number): number {
    const nodeLevel = level ?? this.level;
    const sizeIndentMap: Record<typeof this.size, number> = {
      xs: 24,
      sm: 25,
      md: 25,
      lg: 20,
      xl: 24,
    };
    return nodeLevel * (sizeIndentMap[this.size] || 16);
  }

  handleKeyDown(event: KeyboardEvent, node: TreeNode) {
    event.stopPropagation();
    event.preventDefault(); // Prevents default browser actions like scrolling

    switch (event.key) {
      case 'Enter':
      case ' ':
        this.selectNode(node);
        break;
      case 'ArrowRight':
        if (node.children?.length && !node.expanded) {
          this.toggleExpand(node);
        }
        break;
      case 'ArrowLeft':
        if (node.children?.length && node.expanded) {
          this.toggleExpand(node);
        }
        break;
    }
  }

  getIconSize(): number {
    const sizeMap: Record<typeof this.size, string> = {
      xs: 'var(--tree-icon-size-xs)',
      sm: 'var(--tree-icon-size-sm)',
      md: 'var(--tree-icon-size-md)',
      lg: 'var(--tree-icon-size-lg)',
      xl: 'var(--tree-icon-size-xl)',

    };

    const cssVar = sizeMap[this.size] || 'var(--tree-icon-size-md)';

    // Read computed value of the CSS variable (e.g. "0.75rem" or "12px")
    const rawValue = getComputedStyle(document.documentElement).getPropertyValue(
      cssVar.replace(/var\((.*?)\)/, '$1')
    ).trim();

    if (!rawValue) return 0;

    // Convert rem → px → number
    if (rawValue.endsWith('rem')) {
      const rem = parseFloat(rawValue);
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      ); // usually 16px
      return rem * rootFontSize;
    }

    if (rawValue.endsWith('px')) {
      return parseFloat(rawValue);
    }

    // fallback: just return numeric portion
    return parseFloat(rawValue);
  }
}