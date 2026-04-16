import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTimepickerComponent } from './app-timepicker.component';

describe('AppTimepickerComponent', () => {
  let component: AppTimepickerComponent;
  let fixture: ComponentFixture<AppTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTimepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
