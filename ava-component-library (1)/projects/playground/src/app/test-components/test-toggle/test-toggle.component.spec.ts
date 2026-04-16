import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToggleComponent } from './test-toggle.component';

describe('TestToggleComponent', () => {
  let component: TestToggleComponent;
  let fixture: ComponentFixture<TestToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
