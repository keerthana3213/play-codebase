import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStepperComponent } from './app-stepper.component';

describe('AppStepperComponent', () => {
  let component: AppStepperComponent;
  let fixture: ComponentFixture<AppStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
