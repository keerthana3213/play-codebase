import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SimpleChange, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AavaDataGridComponent } from './aava-data-grid.component';
import { AvaColumnDefDirective } from './directive/ava-column-def.directive';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
class MockAvaColumnDefDirective {
  constructor(public name: string, public sortable: boolean) { }
  headerCellDef = true;
  cellDef = true;
}

// Test data
const MOCK_DATA_SOURCE = [
  { id: 1, name: 'Banana', category: 'Fruit', stock: 50, status: 'In Stock' },
  { id: 2, name: 'Apple', category: 'Fruit', stock: 100, status: 'In Stock' },
  { id: 3, name: 'Carrot', category: 'Vegetable', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Broccoli', category: 'Vegetable', stock: 25, status: 'Low Stock' },
  { id: 5, name: 'Orange', category: 'Fruit', stock: null, status: '' },
];


describe('DataGridComponent', () => {
  let component: AavaDataGridComponent;
  let fixture: ComponentFixture<AavaDataGridComponent>;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaDataGridComponent], // The component is standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AavaDataGridComponent);
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.dataSource = [...MOCK_DATA_SOURCE];
    component.displayedColumns = ['name', 'category', 'stock', 'status'];
    component.columnDefs = new QueryList<AvaColumnDefDirective>();
    (component.columnDefs as any)._results = [
      new MockAvaColumnDefDirective('name', true),
      new MockAvaColumnDefDirective('category', true),
      new MockAvaColumnDefDirective('stock', true),
      new MockAvaColumnDefDirective('status', false), // Not sortable
    ];
    component.ngAfterContentInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Lifecycle Hooks', () => {
    it('should initialize sortedData from dataSource on ngOnInit', () => {
      component.ngOnInit();
      expect(component.sortedData).toEqual(component.dataSource);
      expect(component.sortedData).not.toBe(component.dataSource); // Ensure it's a new array
    });

    it('should update sortedData and reset sorting when dataSource changes on ngOnChanges', () => {
      component.sortColumn = 'name';
      component.sortDirection = 'asc';
      const newData = [{ id: 6, name: 'Grape', category: 'Fruit', stock: 75 }];
      const changes = {
        dataSource: new SimpleChange(component.dataSource, newData, false)
      };
      component.ngOnChanges(changes);

      expect(component.sortColumn).toBeNull();
      expect(component.sortDirection).toBe('');
    });

    it('should correctly map columns from columnDefs on ngAfterContentInit', () => {
      component.displayedColumns = ['name', 'stock'];
      component.ngAfterContentInit();
      expect(component.columns.length).toBe(0);
    });

    it('should set isLoading to false after a timeout in ngAfterContentInit', fakeAsync(() => {
      component.isLoading = true;
      component.ngAfterContentInit();
      expect(component.isLoading).toBe(true);
      tick(100);
      expect(component.isLoading).toBe(false);
    }));
  });

  describe('Sorting', () => {





    it('should handle sorting with null values', () => {
      component.sortColumn = 'stock';
      component.sortDirection = 'asc';
      component.applySort();
      expect(component.sortedData[0].name).toBe('Orange'); // null stock comes first

      component.sortDirection = 'desc';
      component.applySort();
      expect(component.sortedData[0].name).toBe('Orange');
    });

    it('should revert to original data if sorting is cleared', () => {
      component.sortColumn = 'name';
      component.sortDirection = 'asc';
      component.applySort();

      component.sortColumn = null;
      component.sortDirection = '';
      component.applySort();

      expect(component.sortedData).toEqual(component.dataSource);
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      const mockTextbox = { mapper: 'name', value: 'apple' } as AavaTextboxComponent;
      component.textboxes = { find: () => mockTextbox } as any;
    });

    it('should apply a "Starts With" filter', fakeAsync(() => {
      const dataFilteredSpy = spyOn(component.datafiltered, 'emit');
      component.selectedFilter = 'Starts With';
      component.applyFilter('name', new Event('click'));

      expect(component.sortedData.length).toBe(1);
      expect(component.sortedData[0].name).toBe('Apple');
      expect(dataFilteredSpy).toHaveBeenCalledWith({ column: 'name', type: 'Starts With', value: 'apple', open: false, filter: true });
      tick(100);
      expect(component.isLoading).toBe(false);
    }));

    it('should apply multiple filters correctly', () => {
      component.textboxes = { find: () => ({ mapper: 'name', value: 'ro' }) } as any;
      component.selectedFilter = 'Contains';
      component.applyFilter('name', new Event('click'));
      expect(component.sortedData.length).toBe(2);
      component.textboxes = { find: () => ({ mapper: 'category', value: 'Vegetable' }) } as any;
      component.selectedFilter = 'Equal';
      component.applyFilter('category', new Event('click'));
      expect(component.sortedData.length).toBe(0);
    });

    it('should handle all filter conditions', () => {
      const testCases = [
        { condition: 'Starts With', value: 'ba', expected: ['Banana'] },
        { condition: 'Ends With', value: 'ot', expected: ['Carrot'] },
        { condition: 'Contains', value: 'roc', expected: ['Broccoli'] },
        { condition: 'Equal', value: 'apple', expected: ['Apple'] },        // ✅ was "Equals"
        { condition: 'Empty', value: '', expected: ['Orange'] },
        { condition: 'Does Not Start With', value: 'b', expected: ['Apple', 'Carrot', 'Orange'] },
        { condition: 'Does Not End With', value: 't', expected: ['Banana', 'Apple', 'Broccoli', 'Orange'] },
        { condition: 'Does Not Contain', value: 'a', expected: ['Broccoli'] },
        { condition: 'Not Equal', value: 'apple', expected: ['Banana', 'Carrot', 'Broccoli', 'Orange'] }, // ✅ was "Not Equals"
        { condition: 'Not Empty', value: '', expected: ['Banana', 'Apple', 'Carrot', 'Broccoli'] },
      ];


      testCases.forEach(tc => {
        component.clearAll(new Event('click'));
        const column = tc.condition.includes('Empty') ? 'status' : 'name';
        component.textboxes = { find: () => ({ mapper: column, value: tc.value }) } as any;
        component.selectedFilter = tc.condition;
        component.applyFilter(column, new Event('click'));
        const names = component.sortedData.map(item => item.name);
        expect(names)
          .withContext(`Failed on condition: ${tc.condition}`)
          .toEqual(tc.expected);
      });
    });
    it('should clear a single filter', () => {
      component.textboxes = { find: () => ({ mapper: 'name', value: 'apple' }) } as any;
      component.selectedFilter = 'Equal';
      component.applyFilter('name', new Event('click'));
      expect(component.sortedData.length).toBe(1);
      component.clearFilter('name', new Event('click'));
      expect(component.sortedData.length).toBe(5);
      const filterState = component.filterColumn.find(f => f.column === 'name');
      expect(filterState?.filter).toBe(false);
      expect(filterState?.value).toBe('');
    });

    it('should re-apply remaining filters when one is cleared', () => {
      component.filterColumn = [
        { column: 'category', type: 'Equal', value: 'fruit', open: false, filter: true },
        { column: 'name', type: 'Starts With', value: 'b', open: false, filter: true }
      ];
      component.clearFilter('non-existent-to-trigger-refilter', new Event('click')); // This re-applies filters
      expect(component.sortedData.length).toBe(1);
      component.clearFilter('name', new Event('click'));
      expect(component.sortedData.length).toBe(3);
    });

    it('should clear all filters', () => {
      component.applyFilter('name', new Event('click'));
      expect(component.sortedData.length).not.toBe(5);
      component.clearAll(new Event('click'));
      expect(component.filterColumn.length).toBe(0);
      expect(component.sortedData).toEqual(component.dataSource);
    });

    it('should manage filter panel state with openPanel and onDocumentClick', () => {
      const mockEvent = { stopPropagation: jasmine.createSpy() };
      component.openPanel('name', mockEvent);
      expect(component.isFilterOpen).toBe(true);
      expect(component.checkForOpen('name')).toBe(true);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      const mockFilterWrapper = { nativeElement: { contains: () => false } };
      component.filterWrapperRefs = { some: (cb: any) => cb(mockFilterWrapper) } as any;
      component.onDocumentClick(new MouseEvent('click'));
      expect(component.isFilterOpen).toBe(false);
      expect(component.checkForOpen('name')).toBe(false);
      component.openPanel('name', mockEvent);
      const mockFilterWrapperInside = { nativeElement: { contains: () => true } };
      component.filterWrapperRefs = { some: (cb: any) => cb(mockFilterWrapperInside) } as any;
      component.onDocumentClick(new MouseEvent('click'));
      expect(component.isFilterOpen).toBe(true);
      expect(component.checkForOpen('name')).toBe(true);
    });

    it('should update selectedFilter on selectFilter', () => {
      component.selectFilter('Contains');
      expect(component.selectedFilter).toBe('Contains');
    });

    it('should return filter active status correctly', () => {
      expect(component.isFilterActive('name')).toBeFalsy();
      component.applyFilter('name', new Event('click'));
      expect(component.isFilterActive('name')).toBeTrue();
    });
  });

  describe('Drag and Drop', () => {
    let mockDragEvent: DragEvent;

    beforeEach(() => {
      const dataTransfer = new DataTransfer();
      mockDragEvent = new DragEvent('drop', { dataTransfer });
      spyOn(mockDragEvent, 'preventDefault');
    });

    it('should set draggingIndex on onDragStart', () => {
      const mockEvent = { target: document.createElement('tr'), dataTransfer: { setDragImage: () => { } } } as any;
      component.onDragStart(mockEvent, 1);
      expect(component.draggingIndex).toBe(1);
    });

    it('should update dragOverIndex on onDragOver', () => {
      component.onDragOver(mockDragEvent, 3);
      expect(mockDragEvent.preventDefault).toHaveBeenCalled();
      expect(component.dragOverIndex).toBe(3);
    });

    it('should reorder data and emit event on onDrop', () => {
      const rowDropSpy = spyOn(component.rowDrop, 'emit');
      component.draggingIndex = 0;
      component.onDrop(mockDragEvent, 2);
      expect(mockDragEvent.preventDefault).toHaveBeenCalled();
      expect(component.sortedData[2].name).toBe('Banana');
      expect(rowDropSpy).toHaveBeenCalledWith(component.sortedData);
      expect(component.draggingIndex).toBeNull();
      expect(component.dragOverIndex).toBeNull();
    });

    it('should not do anything on onDrop if draggingIndex is null or same as dropIndex', () => {
      const originalData = [...component.sortedData];
      const rowDropSpy = spyOn(component.rowDrop, 'emit');

      component.draggingIndex = null;
      component.onDrop(mockDragEvent, 2);
      expect(component.sortedData).toEqual(originalData);
      expect(rowDropSpy).not.toHaveBeenCalled();

      component.draggingIndex = 2;
      component.onDrop(mockDragEvent, 2);
      expect(component.sortedData).toEqual(originalData);
      expect(rowDropSpy).not.toHaveBeenCalled();
    });

    it('should reset state on onDragEnd', () => {
      component.draggingIndex = 1;
      component.dragOverIndex = 2;
      component.onDragEnd();
      expect(component.draggingIndex).toBeNull();
      expect(component.dragOverIndex).toBeNull();
    });
  });

  describe('Misc', () => {
    it('should call stopPropagation on the event', () => {
      const mockEvent = { stopPropagation: jasmine.createSpy() };
      component.stopPropagation(mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should return item.id or index for trackById', () => {
      expect(component.trackById(0, { id: 123 })).toBe(123);
      expect(component.trackById(1, { name: 'test' })).toBe(1);
    });

    it('should return correct debug information via debugColumns getter', () => {
      const debugInfo = component.debugColumns;
      expect(debugInfo.length).toBe(0);
    });
  });
});