import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNestedSplitedComponent } from './table-nested-splited.component';

describe('TableNestedSplitedComponent', () => {
  let component: TableNestedSplitedComponent;
  let fixture: ComponentFixture<TableNestedSplitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNestedSplitedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNestedSplitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
