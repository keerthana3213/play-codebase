import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { AavaTreesComponent, TreeNode } from './aava-trees.component';

describe('AavaTreesComponent', () => {
  let component: AavaTreesComponent;
  let fixture: ComponentFixture<AavaTreesComponent>;

  const sampleNode: TreeNode = { name: 'Node 1', id: 1, children: [], isExpanded: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTreesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return default icon color', () => {
    expect(component.defaultIconColor).toBe('var(--tree-primary-color )');
  });

  it('should return selected icon color', () => {
    expect(component.selectedIconColor).toBe('var(--tree-selected-text-color)');
  });

  it('should toggle node expansion', () => {
    spyOn((component as any).cdr, 'markForCheck');
    const node = { ...sampleNode };
    expect(node.isExpanded).toBeFalse();
    component.toggleExpand(node);
    expect(node.isExpanded).toBeTrue();
    expect((component as any).cdr.markForCheck).toHaveBeenCalled();
  });

  it('should call toggleExpand if click is on toggle-icon', () => {
    const node = { ...sampleNode };
    spyOn(component, 'toggleExpand');
    const event = {
      target: {
        closest: (selector: string) => (selector === '.toggle-icon' ? {} : null),
      },
    } as unknown as Event;
    component.onNodeClick(node, event);
    expect(component.toggleExpand).toHaveBeenCalledWith(node);
  });

  it('should handle node click and emit events when not toggle-icon', () => {
    const node = { ...sampleNode };
    spyOn(component, 'selectNode');
    spyOn(component.nodeClick, 'emit');
    const event = {
      target: {
        closest: () => null,
      },
    } as unknown as Event;

    component.onNodeClick(node, event);
    expect(component.selectNode).toHaveBeenCalledWith(node);
    expect(component.nodeClick.emit).toHaveBeenCalledWith(node);
  });

  describe('selectNode (single selection)', () => {
    it('should select a new node if not selected', () => {
      component.selectionMode = 'single';
      component.selectedNodes = [];
      spyOn(component.selectionChange, 'emit');
      component.selectNode(sampleNode);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([sampleNode]);
    });

    it('should unselect if node is already selected', () => {
      component.selectionMode = 'single';
      component.selectedNodes = [sampleNode];
      spyOn(component.selectionChange, 'emit');
      component.selectNode(sampleNode);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([]);
    });
  });

  describe('selectNode (multi selection)', () => {
    it('should add node if not selected', () => {
      component.selectionMode = 'multi';
      component.selectedNodes = [];
      spyOn(component.selectionChange, 'emit');
      component.selectNode(sampleNode);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([sampleNode]);
    });

    it('should remove node if already selected', () => {
      component.selectionMode = 'multi';
      component.selectedNodes = [sampleNode];
      spyOn(component.selectionChange, 'emit');
      component.selectNode(sampleNode);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([]);
    });
  });

  it('should return true from isSelected if node is selected', () => {
    component.selectedNodes = [sampleNode];
    expect(component.isSelected(sampleNode)).toBeTrue();
  });

  it('should return false from isSelected if node is not selected', () => {
    component.selectedNodes = [];
    expect(component.isSelected(sampleNode)).toBeFalse();
  });

  it('should compare nodes by id in isSameNode', () => {
    const node1 = { name: 'A', id: 1 };
    const node2 = { name: 'B', id: 1 };
    const result = (component as any).isSameNode(node1, node2);
    expect(result).toBeTrue();
  });

  it('should compare nodes by reference in isSameNode if no id', () => {
    const node1 = { name: 'A' };
    const node2 = node1;
    const result = (component as any).isSameNode(node1, node2);
    expect(result).toBeTrue();
  });

  it('should emit selectionChange on child selection change', () => {
    spyOn(component.selectionChange, 'emit');
    const selection: TreeNode[] = [sampleNode];
    component.onChildSelectionChange(selection);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(selection);
  });

  it('should emit nodeClick on child node click', () => {
    spyOn(component.nodeClick, 'emit');
    component.onChildNodeClick(sampleNode);
    expect(component.nodeClick.emit).toHaveBeenCalledWith(sampleNode);
  });
});
