import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTimepickerComponent } from './test-timepicker.component';

describe('TestTimepickerComponent', () => {
  let component: TestTimepickerComponent;
  let fixture: ComponentFixture<TestTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTimepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
