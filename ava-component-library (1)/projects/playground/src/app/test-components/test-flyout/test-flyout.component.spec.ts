import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFlyoutComponent } from './test-flyout.component';

describe('TestFlyoutComponent', () => {
  let component: TestFlyoutComponent;
  let fixture: ComponentFixture<TestFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFlyoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
