import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNestedInlineComponent } from './table-nested-inline.component';

describe('TableNestedInlineComponent', () => {
  let component: TableNestedInlineComponent;
  let fixture: ComponentFixture<TableNestedInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNestedInlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNestedInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
