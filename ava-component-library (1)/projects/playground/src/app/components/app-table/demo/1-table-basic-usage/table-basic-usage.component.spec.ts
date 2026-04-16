import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBasicUsageComponent } from './table-basic-usage.component';

describe('TableBasicUsageComponent', () => {
  let component: TableBasicUsageComponent;
  let fixture: ComponentFixture<TableBasicUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBasicUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBasicUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
