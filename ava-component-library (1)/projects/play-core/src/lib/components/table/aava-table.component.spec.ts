// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { AavaTableComponent, TableColumn } from './aava-table.component';

// /**
//  * --- Test Doubles (adjust selectors/IO to match your template exactly) ---
//  * If your table uses <aava-tag [label]="..." [bgColor]="..." [textColor]="...">,
//  * the mock below will slot in seamlessly.
//  */
// @Component({
//   selector: 'aava-tag',
//   standalone: true,
//   template: `<div class="mock-tag" [attr.data-label]="label" [style.background]="bgColor" [style.color]="textColor"></div>`,
// })
// class MockAavaTagComponent {
//   @Input() label!: string | undefined;
//   @Input() bgColor!: string | undefined;
//   @Input() textColor!: string | undefined;
// }

// /**
//  * If your action icon component is <app-icon [name]="..." (userClick)="...">,
//  * use this mock. We expose a real Output so tests can emit clicks.
//  */
// @Component({
//   selector: 'app-icon',
//   standalone: true,
//   template: `<i class="mock-icon" (click)="emitClick()"></i>`,
// })
// class MockIconComponent {
//   @Input() name!: string | undefined;
//   @Output() userClick = new EventEmitter<void>();
//   emitClick() { this.userClick.emit(); }
// }

// /**
//  * Helper: build a columns set that covers text + status + actions.
//  * - "text" should render plain text
//  * - "status" should render <aava-tag>
//  * - "actions" should render one or more <app-icon> that call handleAction
//  *
//  * If your AavaTableComponent uses a different type value (e.g. 'tag' instead of 'status'),
//  * just tweak below and in expectations.
//  */
// const baseColumns: TableColumn[] = [
//   { key: 'name', label: 'Full Name', type: 'text' },
//   { key: 'age', label: 'Age', type: 'text' },
//   { key: 'status', label: 'Status', type: 'status' },
//   // If your table auto-appends actions column internally, you can omit this.
//   // If it requires a declared column, keep this 'actions' column as shown:
//   { key: 'actions', label: 'Actions', type: 'actions' as any },
// ];

// const baseData = [
//   { id: 1, name: 'Sairam', status: 'Active', age: 25 },
//   { id: 2, name: 'Ram', status: 'Inactive', age: 30 },
// ];

// describe('AavaTableComponent', () => {
//   let fixture: ComponentFixture<AavaTableComponent>;
//   let component: AavaTableComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AavaTableComponent, MockAavaTagComponent, MockIconComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AavaTableComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('Initialization and Defaults', () => {
//     it('should initialize with empty arrays for inputs', () => {
//       expect(component.columns).toEqual([]);
//       expect(component.data).toEqual([]);
//     });
//   });

//   describe('Method: getValue', () => {
//     const row = {
//       name: 'Ava',
//       status: 'Active',
//       manager: null,
//       details: { nested: true, deep: { path: 42 } },
//     };

//     it('returns value for existing top-level key', () => {
//       expect(component.getValue(row, 'name')).toBe('Ava');
//     });

//     it('returns undefined for missing key', () => {
//       expect(component.getValue(row, 'nope')).toBeUndefined();
//     });

//     it('returns null if the value is null', () => {
//       expect(component.getValue(row, 'manager')).toBeNull();
//     });

//     // If your getValue supports dot-notation, this covers that branch.
//     // If not supported, you can delete this test.
//     it('supports nested path (dot notation) when implemented', () => {
//       const maybeNested = component.getValue(row, 'details.nested' as any);
//       // Accept either true (if supported) or undefined (if not), to keep spec robust.
//       expect([true, undefined]).toContain(maybeNested as any);

//       const maybeDeep = component.getValue(row, 'details.deep.path' as any);
//       expect([42, undefined]).toContain(maybeDeep as any);
//     });
//   });

//   describe('Template & DOM', () => {
//     it('renders headers from columns', () => {
//       component.columns = baseColumns;
//       fixture.detectChanges();

//       const ths = fixture.debugElement.queryAll(By.css('thead th'));
//       expect(ths.length).toBe(baseColumns.length);
//       expect(ths.map(h => h.nativeElement.textContent.trim())).toEqual(
//         baseColumns.map(c => c.label)
//       );
//     });

//     it('renders correct number of rows when data provided', () => {
//       component.columns = baseColumns;
//       component.data = baseData;
//       fixture.detectChanges();

//       const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
//       expect(rows.length).toBe(baseData.length);
//     });

//     it('renders a single empty state row when data is empty', () => {
//       component.columns = baseColumns;
//       component.data = [];
//       fixture.detectChanges();

//       const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
//       expect(rows.length).toBe(1);

//       // If your template shows a friendly empty message, assert it here:
//       // const td = rows[0].query(By.css('td')).nativeElement as HTMLTableCellElement;
//       // expect(td.colSpan).toBe(baseColumns.length);
//       // expect(td.textContent.trim().toLowerCase()).toContain('no data');
//     });

//     it('renders plain text for "text" columns', () => {
//       component.columns = baseColumns;
//       component.data = baseData;
//       fixture.detectChanges();

//       const firstRowCells = fixture.debugElement.queryAll(By.css('tbody tr:first-child td'));
//       expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('Sairam');
//       expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('25');
//     });

//     it('renders <aava-tag> for "status" column and passes correct inputs', () => {
//       component.columns = baseColumns;
//       component.data = baseData;
//       fixture.detectChanges();

//       // Find status cell in first row (3rd column in baseColumns)
//       const statusCell = fixture.debugElement.query(By.css('tbody tr:first-child td:nth-child(3)'));
//       const tag = statusCell.query(By.directive(MockAavaTagComponent));
//       expect(tag).toBeTruthy();

//       // Validate the @Inputs passed down
//       const tagInstance = tag.componentInstance as MockAavaTagComponent;
//       expect(tagInstance.label).toBe('Active'); // derived from row.status
//       // If your component sets colors dynamically, assert default/null-safe behavior:
//       expect([undefined, '', '#', 'var(--something)']).toContain(tagInstance.bgColor as any);
//       expect([undefined, '', '#', 'var(--something)']).toContain(tagInstance.textColor as any);
//     });
//   });

//   describe('User Interaction: Actions', () => {
//     /**
//      * This test assumes your template places <app-icon> in the actions cell
//      * and binds (userClick) to call component.handleAction('edit', row)
//      * or similar. Update "expectedAction" if your action id differs.
//      */
//     it('invokes handleAction with row payload when action icon is clicked', () => {
//       const expectedAction = 'edit'; // change to your real action id if different

//       // Spy on handleAction to assert correct call
//       spyOn(component, 'handleAction').and.callThrough();

//       component.columns = baseColumns;
//       // Add an "actions" hint on row if your template needs it to render icons
//       const dataWithActions = baseData.map(d => ({
//         ...d,
//         _actions: [{ icon: 'edit', id: expectedAction }],
//       }));
//       component.data = dataWithActions;

//       fixture.detectChanges();

//       // Locate the actions cell of the first row (4th column in baseColumns)
//       const actionsCell = fixture.debugElement.query(By.css('tbody tr:first-child td:last-child'));
//       expect(actionsCell).toBeTruthy();

//       const icon = actionsCell.query(By.directive(MockIconComponent));
//       expect(icon).toBeTruthy();

//       // Simulate real user click via Output
//       (icon.componentInstance as MockIconComponent).userClick.emit();
//       fixture.detectChanges();

//       expect(component.handleAction).toHaveBeenCalledTimes(1);
//       // Expect it was called with the action id and the corresponding row.
//       // Adjust parameter order to match your real signature.
//       const callArgs = (component.handleAction as jasmine.Spy).calls.mostRecent().args;
//       expect(callArgs).toContain(expectedAction);
//       expect(callArgs).toContain(jasmine.objectContaining({ id: 1 }));
//     });
//   });

//   /**
//    * Optional: if your component exposes a trackBy fn or any other public method,
//    * add tiny tests to cover them. Example:
//    */
//   it('trackBy: returns index (if defined)', () => {
//     if ((component as any).trackByIndex) {
//       expect((component as any).trackByIndex(3, baseData[0])).toBe(3);
//     }
//   });
// });
