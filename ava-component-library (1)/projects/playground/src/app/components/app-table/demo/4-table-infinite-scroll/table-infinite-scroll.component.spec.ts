import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfiniteScrollComponent } from './table-infinite-scroll.component';

describe('TableInfiniteScrollComponent', () => {
  let component: TableInfiniteScrollComponent;
  let fixture: ComponentFixture<TableInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInfiniteScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
