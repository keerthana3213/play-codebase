import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaginationcontrolsComponent } from './app-paginationcontrols.component';

describe('AppPaginationcontrolsComponent', () => {
  let component: AppPaginationcontrolsComponent;
  let fixture: ComponentFixture<AppPaginationcontrolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPaginationcontrolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPaginationcontrolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
