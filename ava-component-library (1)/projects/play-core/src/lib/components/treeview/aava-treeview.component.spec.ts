import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaTreeviewComponent,TreeNode } from './aava-treeview.component';
describe('AavaTreeviewComponent', () => {
  let component: AavaTreeviewComponent;
  let fixture: ComponentFixture<AavaTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTreeviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTreeviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.nodes).toEqual([]);
    expect(component.size).toBe('md');
    expect(component.iconPosition).toBe('left');
    expect(component.level).toBe(0);
  });

  describe('toggleExpand', () => {
    it('should toggle expanded property if node has children', () => {
      const node: TreeNode = { name: 'node', expanded: false, children: [{ name: 'child' }] };
      component.nodes = [node];
      component.toggleExpand(node);
      expect(node.expanded).toBeTrue();
      // Nodes array reference should change
      expect(component.nodes).not.toBe([node]);
    });

    it('should not change expanded property if node has no children', () => {
      const node: TreeNode = { name: 'node', expanded: false };
      component.nodes = [node];
      component.toggleExpand(node);
      expect(node.expanded).toBeFalse();
    });
  });

  describe('selectNode', () => {
    it('should emit nodeSelect event with the node', () => {
      spyOn(component.nodeSelect, 'emit');
      const node: TreeNode = { name: 'test' };
      component.selectNode(node);
      expect(component.nodeSelect.emit).toHaveBeenCalledWith(node);
    });
  });

  describe('calculateIndent', () => {
    const nodeLevel = 2;

    it('should calculate indent for size xs', () => {
      component.size = 'xs';
      expect(component.calculateIndent(nodeLevel)).toBe(nodeLevel * 24);
    });

    it('should calculate indent for size sm', () => {
      component.size = 'sm';
      expect(component.calculateIndent(nodeLevel)).toBe(nodeLevel * 25);
    });

    it('should calculate indent for size md', () => {
      component.size = 'md';
      expect(component.calculateIndent(nodeLevel)).toBe(nodeLevel * 25);
    });

    it('should calculate indent for size lg', () => {
      component.size = 'lg';
      expect(component.calculateIndent(nodeLevel)).toBe(nodeLevel * 20);
    });

    it('should calculate indent for size xl', () => {
      component.size = 'xl';
      expect(component.calculateIndent(nodeLevel)).toBe(nodeLevel * 24);
    });

    it('should use component.level if no level argument', () => {
      component.size = 'md';
      component.level = 3;
      expect(component.calculateIndent()).toBe(3 * 25);
    });

    it('should return default indent if unknown size', () => {
      (component as any).size = 'unknown';
      expect(component.calculateIndent(1)).toBe(16); // default 16 * 1
    });
  });

  describe('handleKeyDown', () => {
    let node: TreeNode;

    beforeEach(() => {
      node = { name: 'node', expanded: false, children: [{ name: 'child' }] };
      component.nodes = [node];
    });

    function createKeyboardEvent(key: string): KeyboardEvent {
      return new KeyboardEvent('keydown', { key, bubbles: true });
    }

    it('should prevent default and stop propagation', () => {
      const event = createKeyboardEvent('Enter');
      spyOn(event, 'stopPropagation').and.callThrough();
      spyOn(event, 'preventDefault').and.callThrough();
      component.handleKeyDown(event, node);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should select node on Enter key', () => {
      spyOn(component, 'selectNode');
      const event = createKeyboardEvent('Enter');
      component.handleKeyDown(event, node);
      expect(component.selectNode).toHaveBeenCalledWith(node);
    });

    it('should select node on Space key', () => {
      spyOn(component, 'selectNode');
      const event = createKeyboardEvent(' ');
      component.handleKeyDown(event, node);
      expect(component.selectNode).toHaveBeenCalledWith(node);
    });

    it('should expand node on ArrowRight if collapsed and has children', () => {
      node.expanded = false;
      spyOn(component, 'toggleExpand');
      const event = createKeyboardEvent('ArrowRight');
      component.handleKeyDown(event, node);
      expect(component.toggleExpand).toHaveBeenCalledWith(node);
    });

    it('should not expand node on ArrowRight if already expanded', () => {
      node.expanded = true;
      spyOn(component, 'toggleExpand');
      const event = createKeyboardEvent('ArrowRight');
      component.handleKeyDown(event, node);
      expect(component.toggleExpand).not.toHaveBeenCalled();
    });

    it('should collapse node on ArrowLeft if expanded and has children', () => {
      node.expanded = true;
      spyOn(component, 'toggleExpand');
      const event = createKeyboardEvent('ArrowLeft');
      component.handleKeyDown(event, node);
      expect(component.toggleExpand).toHaveBeenCalledWith(node);
    });

    it('should not collapse node on ArrowLeft if collapsed', () => {
      node.expanded = false;
      spyOn(component, 'toggleExpand');
      const event = createKeyboardEvent('ArrowLeft');
      component.handleKeyDown(event, node);
      expect(component.toggleExpand).not.toHaveBeenCalled();
    });

    it('should not call toggleExpand or selectNode on other keys', () => {
      spyOn(component, 'toggleExpand');
      spyOn(component, 'selectNode');
      const event = createKeyboardEvent('Escape');
      component.handleKeyDown(event, node);
      expect(component.toggleExpand).not.toHaveBeenCalled();
      expect(component.selectNode).not.toHaveBeenCalled();
    });
  });

});

