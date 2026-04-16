import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedWithDifferentColumnsComponent } from './nested-with-different-columns.component';

describe('NestedWithDifferentColumnsComponent', () => {
  let component: NestedWithDifferentColumnsComponent;
  let fixture: ComponentFixture<NestedWithDifferentColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedWithDifferentColumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedWithDifferentColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
