import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  AavaUserTableComponent,
  ColumnConfig,
  User,
  ActionConfig,
} from './aava-user-table.component';

describe('AavaUserTableComponent', () => {
  let fixture: ComponentFixture<AavaUserTableComponent>;
  let component: AavaUserTableComponent;
  let sanitizer: DomSanitizer;

  const editAction: ActionConfig = {
    enabled: true,
    label: 'Edit',
    icon: 'edit',
    inline: true,
  };

  const menuAction: ActionConfig = {
    enabled: true,
    label: 'More',
    icon: 'more',
    inline: false,
  };

  const userAlice: User = {
    id: '1',
    name: { value: 'Alice', iconName: '', clickable: true },
    email: { value: 'alice@mail.com', iconName: '', clickable: false },
    access: { value: 'Admin', iconName: '', clickable: false },
    authorized: { value: 'Yes', iconName: '', clickable: false },
    action: { edit: editAction, menu: menuAction },
    sortOrder: 1,
    isSelected: false,
  };

  const userBob: User = {
    id: '2',
    name: { value: 'Bob', iconName: '', clickable: true },
    email: { value: 'bob@mail.com', iconName: '', clickable: false },
    access: { value: 'User', iconName: '', clickable: false },
    authorized: { value: 'No', iconName: '', clickable: false },
    action: { edit: editAction },
    sortOrder: 2,
    isSelected: false,
  };

  const columns: ColumnConfig[] = [
    { field: 'name', label: 'Name', sortable: true, filterable: true, visible: true },
    { field: 'email', label: 'Email', sortable: true, filterable: true, visible: true },
    { field: 'access', label: 'Access', sortable: true, filterable: true, visible: true },
    { field: 'authorized', label: 'Authorized', sortable: true, filterable: true, visible: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaUserTableComponent], // standalone component
      // Do NOT provide DomSanitizer yourself — let Angular give the real one.
      schemas: [NO_ERRORS_SCHEMA], // ignore unknown elements/attrs if any
    })
      // Avoid running the actual template (Lucide/child deps); we test class logic.
      .overrideComponent(AavaUserTableComponent, {
        set: { template: '' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaUserTableComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);

    component.columns = columns;
    component.data = [userAlice, userBob];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------------- Sorting ----------------
  it('onSort should toggle sortDirection and set sortColumn', () => {
    expect(component.sortDirection).toBe('');
    component.onSort(columns[0]); // name
    expect(component.sortColumn).toBe('name');
    expect(component.sortDirection).toBe('asc');
    component.onSort(columns[0]); // toggle
    expect(component.sortDirection).toBe('desc');
  });

  it('onSort should ignore non-sortable columns', () => {
    const nonSortable = { ...columns[0], sortable: false };
    component.onSort(nonSortable);
    expect(component.sortColumn).not.toBe(nonSortable.field);
  });

  it('applySortingAndPagination should sort by current column/direction', () => {
    component.sortColumn = 'name';
    component.sortDirection = 'asc';
    component.applySortingAndPagination();
    expect(component.paginatedData[0].name.value).toBe('Alice');
    component.sortDirection = 'desc';
    component.applySortingAndPagination();
    expect(component.paginatedData[0].name.value).toBe('Bob');
  });

  // ---------------- Default Filter ----------------
  it('applyDefaultFilter should filter with "Starts With"', () => {
    component.defaultColumnFilters = {
      name: { value: 'Al', type: 'Starts With' },
    };
    component.applyDefaultFilter();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData?.[0]?.name?.value).toBe('Alice');
    // pagination gets updated
    expect(component.paginatedData.length).toBe(1);
  });

  it('isFilterTypeEmpty should detect Empty / Not Empty', () => {
    expect(component.isFilterTypeEmpty('Empty')).toBeTrue();
    expect(component.isFilterTypeEmpty('Not Empty')).toBeTrue();
    expect(component.isFilterTypeEmpty('Contains')).toBeFalse();
  });

  it('clearDefaultFilter should reset the open field and data', () => {
    component.openFilterField = 'name';
    component.defaultColumnFilters = { name: { value: 'Al', type: 'Starts With' } };
    component.clearDefaultFilter();
    expect(component.openFilterField).toBeNull();
    expect(component.filteredData.length).toBe(2);
  });

  it('isFilterActive should reflect active default filter', () => {
    component.defaultColumnFilters = { name: { value: 'A', type: 'Starts With' } };
    expect(component.isFilterActive('name')).toBeTrue();
    expect(component.isFilterActive('email')).toBeFalse();
  });

  // ---------------- Custom Filter (checkbox-style) ----------------
  it('extractColumnFilterOptions should build unique lists', () => {
    component.extractColumnFilterOptions(component.data);
    expect(Array.isArray(component.columnFilters['name'])).toBeTrue();
    expect(component.columnFilters['name']).toContain('Alice');
    expect(component.columnFilters['name']).toContain('Bob');
  });

  it('applyActiveFilters should filter using active checkbox-style filters', () => {
    component.activeFilters = { name: new Set(['Alice']) } as any;
    component.applyActiveFilters();
    expect(component.filteredData.length).toBeGreaterThan(0);
    expect(component.filteredData?.[0]?.name?.value).toBe('Alice');
  });

  it('updateFilter should sync temp → active and apply sorting/pagination', () => {
    // prepare
    component.extractColumnFilterOptions(component.data);
    component.tempSelectedFilters = { name: new Set(['Bob']) } as any;
    component.updateFilter();
    expect(component.activeFilters['name'].has('Bob')).toBeTrue();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0]!.name!.value).toBe('Bob');
    expect(component.page).toBe(0);
  });

  it('toggleFilterValue / isIndeterminate / toggleAllFilterValues work correctly', () => {
    component.extractColumnFilterOptions(component.data);
    // start with empty selection
    component.tempSelectedFilters = { name: new Set<string>() } as any;

    // toggle one
    component.toggleFilterValue('name', 'Alice', true);
    expect(component.tempSelectedFilters['name'].has('Alice')).toBeTrue();
    expect(component.isIndeterminate('name')).toBeTrue();

    // select all
    component.toggleAllFilterValues('name', true);
    expect(component.isAllFilterSelected('name')).toBeTrue();
    expect(component.isIndeterminate('name')).toBeFalse();

    // clear all
    component.toggleAllFilterValues('name', false);
    expect(component.tempSelectedFilters['name'].size).toBe(0);
  });

  // ---------------- Cell & Actions ----------------
  it('handleCellClick should emit cellClick', () => {
    const spy = jasmine.createSpy('cellClick');
    component.cellClick.subscribe(spy);
    component.handleCellClick(userAlice, 'name');
    expect(spy).toHaveBeenCalledWith({ row: userAlice, field: 'name' });
  });

  it('getInlineActions should return enabled inline actions only', () => {
    const inline = component.getInlineActions(userAlice);
    expect(inline.length).toBeGreaterThan(0);
    expect(inline[0][1].inline).toBeTrue();
  });

  it('getDropdownActions should return enabled non-inline actions only', () => {
    const dd = component.getDropdownActions(userAlice);
    expect(dd.length).toBe(1);
    expect(dd[0][1].inline).toBeFalse();
  });

  it('handleAction should emit actionTriggered and close dropdown', () => {
    const spy = jasmine.createSpy('actionTriggered');
    component.actionTriggered.subscribe(spy);
    component.dropdownRow = userAlice;
    component.handleAction(userAlice, 'edit');
    expect(spy).toHaveBeenCalled();
    expect(component.dropdownRow).toBeNull();
  });

  it('toggleDropdown should open and close on same row toggle', () => {
    component.toggleDropdown(userAlice);
    expect(component.dropdownRow).toBe(userAlice);
    component.toggleDropdown(userAlice);
    expect(component.dropdownRow).toBeNull();
  });

  // ---------------- HostListeners ----------------
  it('onClickOutside should close dropdown & filter panel when click is outside table', () => {
    component.tableRef = { nativeElement: { contains: () => false } } as any;
    component.dropdownRow = userAlice;
    component.openFilterField = 'name';
    component.onClickOutside(new MouseEvent('click'));
    expect(component.dropdownRow).toBeNull();
    expect(component.openFilterField).toBeNull();
  });

  it('onEscape should close dropdownRow', () => {
    component.dropdownRow = userBob;
    component.onEscape();
    expect(component.dropdownRow).toBeNull();
  });

  // ---------------- Selection (checkbox logic) ----------------
  it('onSelectAllChange should select/deselect visible rows', () => {
    const emitSpy = jasmine.createSpy('selectedRowsChange');
    component.selectedRowsChange.subscribe(emitSpy);

    component.paginatedData = [...component.data];
    component.onSelectAllChange(true);
    expect(component.parentChecked).toBeTrue();
    expect(component.indeterminate).toBeFalse();
    expect(component.paginatedData.every(r => r.isSelected)).toBeTrue();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('onRowCheckboxChange should update parent/indeterminate states', () => {
    const emitSpy = jasmine.createSpy('selectedRowsChange');
    component.selectedRowsChange.subscribe(emitSpy);

    component.paginatedData = [...component.data];
    component.onRowCheckboxChange(component.paginatedData[0], true);
    component.updateSelectAllState();

  });

  // ---------------- Utilities ----------------
  it('getFieldValue should return inner .value for objects and empty string for null', () => {
    expect(component.getFieldValue({ value: 'X' })).toBe('X');
    // @ts-ignore
    expect(component.getFieldValue(undefined)).toBe('');
  });

  it('getCellValue should return empty for action/select and proper value otherwise', () => {
    expect(component.getCellValue(userAlice, 'action')).toBe('');
    expect(component.getCellValue(userAlice, 'select')).toBe('');
    expect(component.getCellValue(userAlice, 'name')).toBe('Alice');
  });

  it('isUrl should correctly detect http/https', () => {
    expect(component.isUrl('http://x')).toBeTrue();
    expect(component.isUrl('https://x')).toBeTrue();
    expect(component.isUrl('ftp://x')).toBeFalse();
    expect(component.isUrl('x')).toBeFalse();
  });

  it('getSelectedFilterLabel should map filter type to label', () => {
    component.defaultColumnFilters = { name: { value: '', type: 'Starts With' } };
    expect(component.getSelectedFilterLabel('name')).toBe('Starts With');
  });


  it('getActionIconHtml should call DomSanitizer.bypassSecurityTrustHtml and return SafeHtml', () => {
    const url = 'http://test/action.png';
    const expected =
      `<img src="${url}" width="16" height="16" style="vertical-align: middle;" />`;
    const spy = spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();

    const result = component.getActionIconHtml(url);
    expect(spy).toHaveBeenCalledWith(expected);
    expect(result).toBeTruthy();
  });
});
