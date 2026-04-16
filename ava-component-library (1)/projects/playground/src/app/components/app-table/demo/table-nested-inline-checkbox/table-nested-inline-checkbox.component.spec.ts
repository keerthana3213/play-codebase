import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNestedInlineCheckboxComponent } from './table-nested-inline-checkbox.component';

describe('TableNestedInlineCheckboxComponent', () => {
  let component: TableNestedInlineCheckboxComponent;
  let fixture: ComponentFixture<TableNestedInlineCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNestedInlineCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNestedInlineCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
