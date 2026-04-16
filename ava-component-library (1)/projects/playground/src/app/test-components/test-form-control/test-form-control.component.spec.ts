import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormControlComponent } from './test-form-control.component';

describe('TestFormControlComponent', () => {
  let component: TestFormControlComponent;
  let fixture: ComponentFixture<TestFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
