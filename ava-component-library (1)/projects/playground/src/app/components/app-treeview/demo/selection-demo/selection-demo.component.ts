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
    selector: 'app-treeview-selection-demo',
    standalone: true,
    imports: [CommonModule, AavaTreeviewComponent],
    templateUrl: './selection-demo.component.html',
    styleUrl: './selection-demo.component.scss',
})
export class SelectionDemoComponent {
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
                expanded: true,
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

    selectedNodeName = 'None';

    onNodeSelect(config: TreeviewConfig, node: TreeNode) {
        console.log('Selected node:', node);
        this.selectedNodeName = node.name;

        // Toggle the selected node and its children
        const newSelectedState = !node.selected;
        config.nodes = this.toggleNodeAndChildren(config.nodes, node.id!, newSelectedState);

        // Update parents selection based on children
        config.nodes = this.updateParentSelection(config.nodes);
    }

    private toggleNodeAndChildren(nodes: TreeNode[], targetId: string | number, selected: boolean): TreeNode[] {
        return nodes.map((node) => {
            if (node.id === targetId) {
                // Toggle this node and all its children
                return this.selectAllChildren(node, selected);
            }
            if (node.children?.length) {
                return {
                    ...node,
                    children: this.toggleNodeAndChildren(node.children, targetId, selected),
                };
            }
            return node;
        });
    }

    private selectAllChildren(node: TreeNode, selected: boolean): TreeNode {
        const newNode = { ...node, selected };
        if (newNode.children?.length) {
            newNode.children = newNode.children.map((child) => this.selectAllChildren(child, selected));
        }
        return newNode;
    }

    private updateParentSelection(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((node) => {
            let newNode = { ...node };
            if (newNode.children?.length) {
                newNode.children = this.updateParentSelection(newNode.children);
                // Parent is selected ONLY if ALL children are selected
                newNode.selected = newNode.children.every((child) => child.selected);
            }
            return newNode;
        });
    }
}
